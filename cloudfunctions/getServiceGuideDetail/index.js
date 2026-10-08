/**
 * cloudfunctions/getServiceGuideDetail/index.js - 办事指南详情
 * 用途：查询办事指南详情，阅读量+1
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { guideId } = event
  
  if (!guideId) {
    return { success: false, message: '参数不完整' }
  }
  
  try {
    await db.collection('service_guides').doc(guideId).update({
      data: { viewCount: _.inc(1) }
    })
    
    const res = await db.collection('service_guides').doc(guideId).get()
    if (res.data.length === 0) {
      return { success: false, message: '指南不存在' }
    }
    
    return { success: true, data: res.data[0] }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, message: '查询失败' }
  }
}
