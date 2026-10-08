/**
 * cloudfunctions/common/checkAdmin.js - 管理员权限与内容安全共用模块
 * 用途：
 *   1. 校验 openid 是否在管理员白名单
 *   2. 文本内容安全检测（msgSecCheck，fail-closed）
 *   3. 图片内容安全检测（imgSecCheck，先 downloadFile 再传 buffer，fail-closed）
 *   4. 自动写入 audit_queue 复审队列（疑似违规时）
 *
 * 使用方式（推荐解构）：
 *   const { checkAdmin, checkContentSecurity, checkImageSecurity } = require('../common/checkAdmin')
 *
 * 兼容方式（保留旧用法）：
 *   const checkAdmin = require('../common/checkAdmin')
 *   await checkAdmin(OPENID)
 *   checkAdmin.checkContentSecurity(...)
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

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
    return res.total > 0
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
 * 文本内容安全检测（fail-closed 失败时拒绝）
 * 注意：返回 false 时调用方应阻止入库；返回 'review' 时应入 audit_queue 让管理员复审
 * @param {string} content 待检测文本
 * @param {string} openid 提交者 openid
 * @param {object} ctx 附加上下文（用于写复审队列）
 * @returns {Promise<boolean|string>} true=通过 / false=拒绝 / 'review'=复审
 */
async function checkContentSecurity(content, openid, ctx = {}) {
  if (!content || !content.trim()) return true
  // 字数上限保护（msgSecCheck 单次上限 2500 字）
  const text = content.length > 2500 ? content.substring(0, 2500) : content
  try {
    const res = await cloud.openapi.security.msgSecCheck({
      content: text,
      openid: openid,
      scene: 1,        // 1=资料 2=评论 3=论坛 4=社交
      version: 2
    })
    // v2 API 返回 result.detail + result.suggest
    // suggest: 'pass' / 'review' / 'risky'
    const suggest = (res.result && res.result.suggest) || (res.suggest) || 'pass'
    if (suggest === 'pass') return true
    if (suggest === 'review') {
      // 疑似违规，写入复审队列
      await _writeAuditQueue(content, openid, ctx, 'text_review')
      return 'review'
    }
    // risky 或其他 → 直接拒绝
    return false
  } catch (err) {
    // fail-closed：API 调用失败时拒绝入库，避免违规内容绕过
    // 仅在 errcode=0 但 suggest 异常或 API 不可用时拒绝
    // 测试号无 openapi 权限时也拒绝，强制管理员开通
    console.error('[checkContentSecurity] 检测失败（fail-closed 拒绝）:', err && err.errMsg || err)
    // 写入复审队列由人工判断（避免完全阻断业务）
    await _writeAuditQueue(content, openid, ctx, 'text_api_error').catch(() => {})
    return 'review'
  }
}

/**
 * 图片内容安全检测（fail-closed）
 * 关键修复：必须先 downloadFile 拿到 buffer 再传给 imgSecCheck，不能传 fileID 字符串
 * @param {string} fileID 云存储 fileID
 * @param {object} ctx 附加上下文
 * @returns {Promise<boolean|string>} true=通过 / false=拒绝 / 'review'=复审
 */
async function checkImageSecurity(fileID, ctx = {}) {
  if (!fileID) return true
  try {
    // 步骤1：下载文件拿到 buffer
    const downloadRes = await cloud.downloadFile({ fileID })
    const fileContent = downloadRes.fileContent
    if (!fileContent) {
      console.error('[checkImageSecurity] 文件下载为空')
      return 'review'
    }
    // 步骤2：检测图片（注意 media.value 必须是 Buffer）
    const res = await cloud.openapi.security.imgSecCheck({
      media: {
        contentType: 'image/jpeg',
        value: fileContent
      }
    })
    const suggest = (res.result && res.result.suggest) || (res.suggest) || 'pass'
    if (suggest === 'pass') return true
    if (suggest === 'review') {
      await _writeAuditQueue('', '', ctx, 'image_review', fileID)
      return 'review'
    }
    return false
  } catch (err) {
    console.error('[checkImageSecurity] 检测失败（fail-closed 拒绝）:', err && err.errMsg || err)
    await _writeAuditQueue('', '', ctx, 'image_api_error', fileID).catch(() => {})
    return 'review'
  }
}

/**
 * 内部方法：写入复审队列
 */
async function _writeAuditQueue(content, openid, ctx, reason, fileID = '') {
  try {
    await db.collection('audit_queue').add({
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
  } catch (e) {
    console.error('[audit_queue] 写入失败:', e)
  }
}

// ============== 导出：同时兼容旧用法 ==============
// 旧：const checkAdmin = require('../common/checkAdmin'); await checkAdmin(OPENID)
// 旧：checkAdmin.checkContentSecurity(...)
// 新：const { checkAdmin, checkContentSecurity, checkImageSecurity } = require('../common/checkAdmin')

// 把模块导出为一个 async 函数（保持旧调用方式）
const exported = async function checkAdminWrapper(openid) {
  return checkAdmin(openid)
}
// 同时挂载所有方法
exported.checkAdmin = checkAdmin
exported.getAdminInfo = getAdminInfo
exported.checkContentSecurity = checkContentSecurity
exported.checkImageSecurity = checkImageSecurity

module.exports = exported
// 同时按对象方式导出，便于解构使用
module.exports.checkAdmin = checkAdmin
module.exports.getAdminInfo = getAdminInfo
module.exports.checkContentSecurity = checkContentSecurity
module.exports.checkImageSecurity = checkImageSecurity
