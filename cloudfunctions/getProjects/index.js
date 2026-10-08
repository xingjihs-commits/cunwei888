/**
 * cloudfunctions/getProjects/index.js - 查询项目收益
 * 用途：分页查询项目收益列表
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { page = 1, pageSize = 20, year = '' } = event
  
  try {
    let query = db.collection('projects')
    if (year) query = query.where({ year: parseInt(year) })
    
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
