/**
 * cloudfunctions/getMySnapshots/index.js - 查询我的随手拍
 * 用途：分页查询当前用户的随手拍记录
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { safePaging } = require('./common/listUtils')


exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { page, pageSize } = safePaging(event, 10)
  
  try {
    const query = db.collection('records').where({ 
      _openid: OPENID,
      'extra.category': 'snapshot'
    })
    
    const total = await query.count()
    const list = await query
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
