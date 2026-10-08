/**
 * cloudfunctions/getLostFoundList/index.js - 失物招领列表
 * 用途：查询失物招领信息列表
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { page = 1, pageSize = 20, subType = '' } = event
  
  try {
    let query = db.collection('records').where({
      type: '失物招领',
      isPublic: true
    })
    
    if (subType) {
      query = query.where({ subType: subType })
    }
    
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
