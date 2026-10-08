/**
 * cloudfunctions/getBroadcasts/index.js - 广播列表
 * 用途：查询书记广播列表
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { page = 1, pageSize = 10 } = event
  
  try {
    const query = db.collection('broadcasts').where({ published: true })
    const total = await query.count()
    const list = await query
      .orderBy('urgent', 'desc')
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    return { success: true, data: list.data, total: total.total }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
