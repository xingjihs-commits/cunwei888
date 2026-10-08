/**
 * cloudfunctions/getMeetings/index.js - 会议列表
 * 用途：查询会议列表
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { page = 1, pageSize = 20, type = '', status = '' } = event
  
  try {
    let query = db.collection('meetings')
    if (type) query = query.where({ type: type })
    if (status) query = query.where({ status: status })
    
    const total = await query.count()
    const list = await query
      .orderBy('meetingTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    return { success: true, data: list.data, total: total.total }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
