/**
 * cloudfunctions/getMeetings/index.js - 会议列表
 * 用途：查询会议列表
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { safePaging } = require('./common/listUtils')


exports.main = async (event, context) => {
  const { type = '', status = '' } = event
  const { page, pageSize } = safePaging(event, 20)
  
  try {
    // review 阻断：待复审会议不对村民公开
    let query = db.collection('meetings').where({ auditStatus: _.neq('待复审') })
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
