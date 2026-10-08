/**
 * cloudfunctions/updateSnapshotStatus/index.js - 更新随手拍状态
 * 改造点：status 全中文，兼容老数据
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_STATUS, normalizeStatus } = require('../common/constants')
const { checkAdmin, checkContentSecurity } = require('../common/checkAdmin')

const ALLOWED_STATUSES = [
  RECORD_STATUS.PENDING, RECORD_STATUS.PROCESSING, RECORD_STATUS.COMPLETED, RECORD_STATUS.REJECTED,
  'pending', 'assigned', 'processing', 'completed', 'rejected'
]

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { recordId, status, assignee = '', reply = '', replyImages = [] } = event

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, message: '无操作权限' }
  }

  if (!recordId || !status) {
    return { success: false, message: '参数不完整' }
  }

  const normalizedStatus = normalizeStatus(status)
  if (!ALLOWED_STATUSES.includes(normalizedStatus)) {
    return { success: false, message: '状态值不合法' }
  }

  try {
    const now = new Date()
    const updateData = { status: normalizedStatus, updateTime: now }

    if (assignee) updateData.assignee = assignee
    if (reply) {
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
        const duration = (now - new Date(record.data[0].createTime)) / (1000 * 60 * 60)
        updateData.handleDuration = Math.round(duration * 10) / 10
      }
    }

    await db.collection('records').doc(recordId).update({ data: updateData })
    return { success: true, message: '处理成功' }
  } catch (err) {
    console.error('[updateSnapshotStatus] 失败:', err)
    return { success: false, message: '操作失败' }
  }
}
