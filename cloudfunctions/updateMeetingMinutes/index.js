/**
 * cloudfunctions/updateMeetingMinutes/index.js - 更新会议纪要
 * 改造点：
 *   1. status 归一化为中文
 *   2. 纪要内容安全检测
 *   3. 决议内容安全
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { MEETING_STATUS, normalizeStatus } = require('../common/constants')
const { checkAdmin, checkContentSecurity } = require('../common/checkAdmin')

const ALLOWED_STATUSES = [
  MEETING_STATUS.SCHEDULED, MEETING_STATUS.HOLDING, MEETING_STATUS.ENDED, MEETING_STATUS.CANCELLED,
  // 兼容老英文
  'scheduled', 'holding', 'ended', 'cancelled'
]

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, message: '无操作权限' }
  }

  const { meetingId, minutes, minutesImages = [], decisions = [], signRecords = [], status = '', attendance = 0 } = event

  if (!meetingId) {
    return { success: false, message: '参数不完整' }
  }

  // 内容安全检测
  if (minutes) {
    const checkText = minutes + ' ' + decisions.map(d => typeof d === 'string' ? d : (d.content || '')).join(' ')
    const textCheck = await checkContentSecurity(checkText, OPENID, { collection: 'meetings', recordId: meetingId })
    if (textCheck === false) {
      return { success: false, message: '纪要内容包含违规信息' }
    }
  }

  try {
    const now = new Date()
    const updateData = { updateTime: now }

    if (minutes !== undefined) updateData.minutes = minutes
    if (minutesImages.length) updateData.minutesImages = minutesImages
    if (decisions.length) updateData.decisions = decisions
    if (signRecords.length) updateData.signRecords = signRecords
    if (status) {
      const normalizedStatus = normalizeStatus(status)
      if (!ALLOWED_STATUSES.includes(normalizedStatus)) {
        return { success: false, message: '会议状态值不合法' }
      }
      updateData.status = normalizedStatus
    }
    if (attendance) updateData.attendance = attendance

    await db.collection('meetings').doc(meetingId).update({ data: updateData })

    // 写日志
    await db.collection('logs').add({
      data: {
        action: 'update_meeting_minutes',
        meetingId: meetingId,
        operator: OPENID,
        createTime: now
      }
    })

    return { success: true, message: '纪要更新成功' }
  } catch (err) {
    console.error('[updateMeetingMinutes] 失败:', err)
    return { success: false, message: '更新失败' }
  }
}
