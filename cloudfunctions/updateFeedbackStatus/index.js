/**
 * cloudfunctions/updateFeedbackStatus/index.js - 更新工单状态
 * 改造点：
 *   1. status 全中文，前端传英文会被映射
 *   2. 回复内容安全检测
 *   3. 完成/驳回状态写日志
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_STATUS, normalizeStatus } = require('../common/constants')
const { checkAdmin, checkContentSecurity } = require('../common/checkAdmin')
const { INTERNAL_TOKEN } = require('../common/internal')

// 允许的状态白名单（中文 + 英文兼容映射）
const ALLOWED_STATUSES = [
  RECORD_STATUS.PENDING, RECORD_STATUS.ASSIGNED, RECORD_STATUS.PROCESSING,
  RECORD_STATUS.COMPLETED, RECORD_STATUS.EVALUATED, RECORD_STATUS.REJECTED,
  // 兼容老前端可能传的英文
  'pending', 'assigned', 'processing', 'completed', 'evaluated', 'rejected'
]

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { recordId, status, assignee = '', assigneeRole = '', reply = '', replyImages = [], overdueReason = '' } = event

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, message: '无操作权限' }
  }

  if (!recordId || !status) {
    return { success: false, message: '参数不完整' }
  }

  // 归一化为中文 status
  const normalizedStatus = normalizeStatus(status)
  if (!ALLOWED_STATUSES.includes(normalizedStatus)) {
    return { success: false, message: '状态值不合法' }
  }

  try {
    const now = new Date()
    const updateData = { status: normalizedStatus, updateTime: now }

    if (assignee) {
      updateData.assignee = assignee
      updateData.assigneeRole = assigneeRole
      // 注意：管理员派单时不应覆盖 assigneeOpenid
      // updateData.assigneeOpenid = OPENID   // 已删除：这会错误覆盖原指派人
    }

    if (reply) {
      // 回复内容安全检测
      const check = await checkContentSecurity(reply, OPENID, { collection: 'records', recordId })
      if (check === false) {
        return { success: false, message: '回复内容包含违规信息' }
      }
      updateData.reply = reply
      updateData.replyImages = replyImages
    }

    if (normalizedStatus === RECORD_STATUS.COMPLETED) {
      const record = await db.collection('records').doc(recordId).get()
      if (record.data.length > 0) {
        const createTime = record.data[0].createTime
        const duration = (now - new Date(createTime)) / (1000 * 60 * 60)
        updateData.handleDuration = Math.round(duration * 10) / 10
      }
    }

    if (overdueReason) {
      updateData.overdueReason = overdueReason
      updateData.isOverdue = true
    }

    await db.collection('records').doc(recordId).update({ data: updateData })

    // 写日志
    await db.collection('logs').add({
      data: {
        action: 'update_feedback_status',
        recordId: recordId,
        status: normalizedStatus,
        operator: OPENID,
        createTime: now
      }
    })

    // 通知提交者
    try {
      await cloud.callFunction({
        name: 'sendSubscribeMessage',
        data: {
          type: 'status_update',
          recordId: recordId,
          status: normalizedStatus,
          _internal: INTERNAL_TOKEN
        }
      })
    } catch (e) {
      console.warn('[updateFeedbackStatus] 通知跳过:', e && e.errMsg)
    }

    return { success: true, message: '操作成功' }
  } catch (err) {
    console.error('[updateFeedbackStatus] 失败:', err)
    return { success: false, message: '操作失败' }
  }
}
