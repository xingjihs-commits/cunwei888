/**
 * cloudfunctions/getMyMessages/index.js - 我的消息
 * 用途：聚合所有通知消息，统一消息中心
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { page = 1, pageSize = 20, type = '', onlyUnread = false } = event
  
  try {
    let query = db.collection('messages').where({ targetOpenid: OPENID })
    if (type) query = query.where({ type: type })
    if (onlyUnread) query = query.where({ isRead: false })
    
    const total = await query.count()
    const unreadRes = await db.collection('messages')
      .where({ targetOpenid: OPENID, isRead: false })
      .count()
    
    const list = await query
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    return {
      success: true,
      data: list.data,
      total: total.total,
      unreadCount: unreadRes.total
    }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, data: [], total: 0, unreadCount: 0 }
  }
}
