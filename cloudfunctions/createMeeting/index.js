/**
 * cloudfunctions/createMeeting/index.js - 创建会议
 * 改造点：status 全中文（待召开）+ 内容安全
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { MEETING_STATUS } = require('../common/constants')
const { checkAdmin, checkContentSecurity } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, message: '无创建权限' }
  }

  const { title, type, meetingTime, location, attendees = [], agenda = '', content = '' } = event

  if (!title || !meetingTime || !location) {
    return { success: false, message: '请填写完整信息' }
  }
  if (title.length > 50) {
    return { success: false, message: '标题不能超过50字' }
  }

  try {
    const checkText = title + '\n' + (agenda || '') + '\n' + (content || '')
    const textCheck = await checkContentSecurity(checkText, OPENID, { collection: 'meetings' })
    if (textCheck === false) {
      return { success: false, message: '内容包含违规信息' }
    }

    const now = new Date()
    const res = await db.collection('meetings').add({
      data: {
        title: title,
        type: type || '村委会议', // 村委会议/支部会议/代表会议/专题会议
        meetingTime: new Date(meetingTime),
        location: location,
        attendees: attendees,
        agenda: agenda,
        content: content,
        minutes: '',
        minutesImages: [],
        decisions: [],
        signRecords: [],
        status: MEETING_STATUS.SCHEDULED,
        attendance: 0,
        auditStatus: textCheck === 'review' ? '待复审' : '',
        publisher: OPENID,
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    return { success: true, id: res._id, message: '会议创建成功' }
  } catch (err) {
    console.error('[createMeeting] 失败:', err)
    return { success: false, message: '创建失败' }
  }
}
