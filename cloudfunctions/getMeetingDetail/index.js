/**
 * cloudfunctions/getMeetingDetail/index.js - 会议详情
 * 用途：查询会议详情含纪要和决议
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
const { pluckDoc } = require('./common/docUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { meetingId } = event
  
  if (!meetingId) {
    return fail('INVALID_PARAMS')
  }
  
  try {
    const res = await db.collection('meetings').doc(meetingId).get()
    const meeting = pluckDoc(res)
    if (!meeting || meeting.auditStatus === '待复审') {
      return { success: false, message: '会议不存在' }
    }
    return { success: true, data: meeting }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, message: '查询失败' }
  }
}
