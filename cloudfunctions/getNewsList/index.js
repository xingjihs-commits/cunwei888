/**
 * cloudfunctions/getNewsList/index.js - 新闻列表
 * 用途：分页查询村务新闻
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { page = 1, pageSize = 10, category = '' } = event
  
  try {
    let query = db.collection('news')
    if (category) query = query.where({ category: category })
    
    const total = await query.count()
    
    // 置顶在前
    const list = await query
      .orderBy('isTop', 'desc')
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
