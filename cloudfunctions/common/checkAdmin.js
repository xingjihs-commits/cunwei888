/**
 * cloudfunctions/common/checkAdmin.js - 管理员权限与内容安全共用模块
 * 用途：
 *   1. 校验 openid 是否在管理员白名单（checkAdmin / checkAdminWeight / checkSecretary）
 *   2. 文本内容安全检测（msgSecCheck，>2400 字自动分段逐段检测，fail-closed）
 *   3. 图片内容安全检测（imgSecCheck，先 downloadFile 再传 buffer，fail-closed）
 *   4. 自动写入 audit_queue 复审队列（疑似违规时），并支持入库后回填 recordId
 *
 * 返回值约定（v2）：
 *   checkContentSecurity / checkImageSecurity → { result: true|false|'review', queueId }
 *   checkImagesSecurity → { ok, risky, queueIds }
 *   调用方在业务记录入库成功后，若 result==='review'（或 queueIds 非空），
 *   必须调用 attachQueueRecord(queueId, collection, recordId) 回填，
 *   否则复审时无法定位业务记录（复审闭环断裂）。
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { decideSecurity, isAdminCount } = require('./securityLogic')

/**
 * 校验管理员权限（必须在 admins 集合且 enabled=true）
 * @param {string} openid
 * @returns {Promise<boolean>}
 */
async function checkAdmin(openid) {
  if (!openid) return false
  try {
    const res = await db.collection('admins')
      .where({ _openid: openid, enabled: true })
      .count()
    return isAdminCount(res)
  } catch (err) {
    console.error('[checkAdmin] 管理员校验失败:', err)
    return false
  }
}

/**
 * 获取管理员信息
 */
async function getAdminInfo(openid) {
  if (!openid) return null
  try {
    const res = await db.collection('admins')
      .where({ _openid: openid, enabled: true })
      .limit(1)
      .get()
    return res.data[0] || null
  } catch (err) {
    console.error('[getAdminInfo] 失败:', err)
    return null
  }
}

/**
 * 获取管理员角色与权重（4 档：50 网格员 / 70 委员 / 90 主任 / 100 支书）
 * 兼容：未设置 weight 的历史管理员视为 100（全权），避免升级误伤
 */
async function getAdminRole(openid) {
  const doc = await getAdminInfo(openid)
  if (!doc) return { enabled: false, role: '', weight: 0 }
  const weight = typeof doc.weight === 'number' ? doc.weight : 100
  return { enabled: true, role: doc.role || '', weight }
}

/**
 * 权限门槛校验（在 checkAdmin 基础上按 weight 收紧）
 */
async function checkAdminWeight(openid, minWeight = 0) {
  if (!openid) return false
  const info = await getAdminRole(openid)
  return info.enabled && info.weight >= minWeight
}

/**
 * 校验是否为书记（亲阅件专属操作使用：mark_secret / resolve / 重派亲阅件）
 * @param {string} openid
 * @returns {Promise<boolean>}
 */
async function checkSecretary(openid) {
  if (!openid) return false
  try {
    const res = await db.collection('admins')
      .where({ _openid: openid, enabled: true, role: '书记' })
      .count()
    return isAdminCount(res)
  } catch (err) {
    console.error('[checkSecretary] 书记校验失败:', err)
    return false
  }
}

// ============== 内容安全 ==============

// msgSecCheck 单次上限 2500 字，按 2400 字分段留余量
const MAX_SEGMENT = 2400

function splitSegments(text) {
  if (text.length <= MAX_SEGMENT) return [text]
  const segs = []
  for (let i = 0; i < text.length; i += MAX_SEGMENT) {
    segs.push(text.substring(i, i + MAX_SEGMENT))
  }
  return segs
}

/**
 * 文本内容安全检测（分段并行，fail-closed）
 * @param {string} content 待检测文本
 * @param {string} openid 提交者 openid
 * @param {object} ctx { collection, recordId? } 复审队列入队上下文
 * @returns {Promise<{result: boolean|'review', queueId: string}>}
 */
async function checkContentSecurity(content, openid, ctx = {}) {
  if (!content || !String(content).trim()) return { result: true, queueId: '' }
  const segments = splitSegments(String(content))
  try {
    const results = await Promise.all(
      segments.map(seg =>
        cloud.openapi.security.msgSecCheck({
          content: seg,
          openid: openid,
          scene: 1,        // 1=资料 2=评论 3=论坛 4=社交
          version: 2
        })
      )
    )
    const decisions = results.map(decideSecurity)
    if (decisions.includes(false)) {
      // 任一段明确违规 → 整体拒绝（修复"后 2500 字绕过"）
      return { result: false, queueId: '' }
    }
    if (decisions.includes('review')) {
      const queueId = await _writeAuditQueue(content, openid, ctx, 'text_review')
      return { result: 'review', queueId: queueId || '' }
    }
    return { result: true, queueId: '' }
  } catch (err) {
    // fail-closed：API 调用失败时入复审队列由人工判断，不直接放行
    console.error('[checkContentSecurity] 检测失败（fail-closed）:', err && err.errMsg || err)
    const queueId = await _writeAuditQueue(content, openid, ctx, 'text_api_error').catch(() => '')
    return { result: 'review', queueId: queueId || '' }
  }
}

/**
 * 图片内容安全检测（fail-closed）
 * 关键：必须先 downloadFile 拿到 buffer 再传给 imgSecCheck，不能传 fileID 字符串
 * @returns {Promise<{result: boolean|'review', queueId: string}>}
 */
async function checkImageSecurity(fileID, ctx = {}) {
  if (!fileID) return { result: true, queueId: '' }
  try {
    const downloadRes = await cloud.downloadFile({ fileID })
    const fileContent = downloadRes.fileContent
    if (!fileContent) {
      console.error('[checkImageSecurity] 文件下载为空')
      const queueId = await _writeAuditQueue('', '', ctx, 'image_empty', fileID)
      return { result: 'review', queueId: queueId || '' }
    }
    const res = await cloud.openapi.security.imgSecCheck({
      media: {
        contentType: 'image/jpeg',
        value: fileContent
      }
    })
    const decision = decideSecurity(res)
    if (decision === true) return { result: true, queueId: '' }
    if (decision === 'review') {
      const queueId = await _writeAuditQueue('', '', ctx, 'image_review', fileID)
      return { result: 'review', queueId: queueId || '' }
    }
    return { result: false, queueId: '' }
  } catch (err) {
    console.error('[checkImageSecurity] 检测失败（fail-closed）:', err && err.errMsg || err)
    const queueId = await _writeAuditQueue('', '', ctx, 'image_api_error', fileID).catch(() => '')
    return { result: 'review', queueId: queueId || '' }
  }
}

/**
 * 图片批量内容安全检测（并行，避免多图串行导致云函数超时）
 * @returns {Promise<{ok: boolean, risky: string[], queueIds: string[]}>}
 *          ok=false 表示存在明确违规图片
 */
async function checkImagesSecurity(fileIDs, ctx = {}) {
  if (!fileIDs || !fileIDs.length) return { ok: true, risky: [], queueIds: [] }
  const results = await Promise.all(
    fileIDs.map((f) => checkImageSecurity(f, ctx).catch(() => ({ result: 'review', queueId: '' })))
  )
  const risky = fileIDs.filter((_, i) => results[i].result === false)
  const queueIds = results.map((r) => r.queueId).filter(Boolean)
  return { ok: risky.length === 0, risky: risky, queueIds: queueIds }
}

/**
 * 复审条目回填：业务记录入库后，把 recordId 补写到复审队列条目。
 * 调用时机：checkContentSecurity/checkImageSecurity 返回 review 且记录已入库。
 * @param {string} queueId 复审队列条目 _id
 * @param {string} collection 业务集合名
 * @param {string} recordId 业务记录 _id
 */
async function attachQueueRecord(queueId, collection, recordId) {
  if (!queueId || !collection || !recordId) return
  try {
    await db.collection('audit_queue').doc(queueId).update({
      data: { collection: collection, recordId: recordId, updateTime: new Date() }
    })
  } catch (e) {
    console.warn('[attachQueueRecord] 回填失败:', e && e.errMsg)
  }
}

/**
 * 内部方法：写入复审队列，返回条目 _id（失败返回 ''）
 */
async function _writeAuditQueue(content, openid, ctx, reason, fileID = '') {
  try {
    const res = await db.collection('audit_queue').add({
      data: {
        content: (content || '').substring(0, 500),
        openid: openid || '',
        fileID: fileID,
        reason: reason,
        collection: ctx.collection || '',
        recordId: ctx.recordId || '',
        status: '待复审',
        createTime: new Date()
      }
    })
    return res._id
  } catch (e) {
    console.error('[audit_queue] 写入失败:', e)
    return ''
  }
}

// ============== 导出：同时兼容旧用法 ==============
const exported = async function checkAdminWrapper(openid) {
  return checkAdmin(openid)
}
exported.checkAdmin = checkAdmin
exported.getAdminInfo = getAdminInfo
exported.getAdminRole = getAdminRole
exported.checkAdminWeight = checkAdminWeight
exported.checkSecretary = checkSecretary
exported.checkContentSecurity = checkContentSecurity
exported.checkImageSecurity = checkImageSecurity
exported.checkImagesSecurity = checkImagesSecurity
exported.attachQueueRecord = attachQueueRecord

module.exports = exported
module.exports.checkAdmin = checkAdmin
module.exports.getAdminInfo = getAdminInfo
module.exports.getAdminRole = getAdminRole
module.exports.checkAdminWeight = checkAdminWeight
module.exports.checkSecretary = checkSecretary
module.exports.checkContentSecurity = checkContentSecurity
module.exports.checkImageSecurity = checkImageSecurity
module.exports.checkImagesSecurity = checkImagesSecurity
module.exports.attachQueueRecord = attachQueueRecord
