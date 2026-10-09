/**
 * cloudfunctions/submitSnapshot/index.js - 提交随手拍
 * 改造点：
 *   1. status 全中文（待处理）
 *   2. 图片内容安全检测
 *   3. 自动派单到对应类型责任人
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_STATUS, SUPERVISE_LEVEL } = require('../common/constants')
const { checkContentSecurity, checkImagesSecurity } = require('../common/checkAdmin')
const { INTERNAL_TOKEN } = require('../common/internal')
const { isBlocked } = require('../common/blocked')

// 随手拍类型默认派单映射
const SNAPSHOT_DISPATCH = {
  '垃圾乱堆': { name: '村委委员', duty: '管环境卫生' },
  '道路安全': { name: '村委委员', duty: '管道路水利' },
  '路灯损坏': { name: '村委委员', duty: '管道路水利' },
  '污水乱排': { name: '村委委员', duty: '管环境卫生' },
  '违建': { name: '治保主任', duty: '管违建' },
  '其他': { name: '村主任', duty: '村主任兜底' }
}

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  // 封禁校验：被临时锁定的用户拒绝提交
  if (await isBlocked(OPENID)) {
    return { success: false, message: '账号已被临时限制，请稍后再试', code: 'BLOCKED' }
  }
  const { content = '', images = [], type, location = null, urgentLevel = '普通' } = event

  if (!images || images.length === 0) {
    return { success: false, message: '请至少上传1张照片' }
  }
  if (!type) {
    return { success: false, message: '请选择问题类型' }
  }
  if (images.length > 9) {
    return { success: false, message: '最多上传9张照片' }
  }
  if (content.length > 500) {
    return { success: false, message: '描述不能超过500字' }
  }

  try {
    // 1. 文本内容安全
    let auditStatus = ''
    if (content) {
      const textCheck = await checkContentSecurity(content, OPENID, { collection: 'records' })
      if (textCheck === false) {
        return { success: false, message: '内容包含违规信息' }
      }
      if (textCheck === 'review') auditStatus = '待复审'
    }
    // 2. 图片内容安全（并行检测）
    if (images && images.length) {
      const imgRes = await checkImagesSecurity(images, { collection: 'records' })
      if (!imgRes.ok) {
        return { success: false, message: '图片包含违规内容' }
      }
    }

    // 3. 自动匹配责任人
    let assignee = { openid: '', name: '', duty: '' }
    let dispatchType = 'manual'
    try {
      const configRes = await db.collection('module_config')
        .where({ moduleKey: 'snapshot' })
        .get()
      if (configRes.data.length > 0 && configRes.data[0].dispatchMap) {
        const matched = configRes.data[0].dispatchMap[type]
        if (matched) {
          assignee = matched
          dispatchType = 'auto'
        }
      }
    } catch (e) {}
    if (!assignee.openid) {
      const def = SNAPSHOT_DISPATCH[type] || SNAPSHOT_DISPATCH['其他']
      assignee = { openid: '', name: def.name, duty: def.duty }
    }

    const now = new Date()
    const deadline = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)

    const res = await db.collection('records').add({
      data: {
        type: type,
        title: '随手拍-' + (content || '无描述'),
        content: content,
        images: images,
        location: location,
        status: RECORD_STATUS.PENDING,
        assignee: assignee.name,
        assigneeName: assignee.name,
        assigneeDuty: assignee.duty,
        assigneeOpenid: assignee.openid,
        assigneeRole: '',
        reply: '',
        replyImages: [],
        handleDeadline: deadline,
        isOverdue: false,
        overdueReason: '',
        handleDuration: 0,
        evaluation: 0,
        evaluationText: '',
        urgentLevel: urgentLevel,
        villageGroup: '',
        isPublic: true,
        likeCount: 0,
        likeUsers: [],
        auditStatus: auditStatus,
        superviseLevel: SUPERVISE_LEVEL.NORMAL,
        extra: { category: 'snapshot' },
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    // 通知责任人
    if (assignee.openid) {
      try {
        await cloud.callFunction({
          name: 'sendDispatchNotice',
          data: {
            recordId: res._id,
            assigneeOpenid: assignee.openid,
            type: type,
            urgentLevel: urgentLevel,
            handleDeadline: deadline,
            note: '',
            _internal: INTERNAL_TOKEN
          }
        })
      } catch (e) {
        console.warn('[submitSnapshot] 派单通知失败:', e && e.errMsg)
      }
    }

    return { success: true, id: res._id, message: '随手拍已提交，将公示并派单处理' }
  } catch (err) {
    console.error('[submitSnapshot] 提交失败:', err)
    return { success: false, message: '提交失败' }
  }
}
