/**
 * cloudfunctions/getServiceGuides/index.js - 办事指南列表
 * 用途：查询村级办事指南
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { category = '', keyword = '' } = event
  
  try {
    let query = db.collection('service_guides').where({ enabled: true })
    if (category) query = query.where({ category: category })
    if (keyword) {
      query = query.where({
        title: db.RegExp({ regexp: keyword, options: 'i' })
      })
    }
    
    const res = await query
      .orderBy('sortOrder', 'asc')
      .orderBy('createTime', 'desc')
      .limit(100)
      .get()
    
    return { success: true, data: res.data }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, data: [] }
  }
}
