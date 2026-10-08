/**
 * cloudfunctions/getNoticeDetail/index.js - 公示详情
 * 用途：获取公示详情，阅读量+1
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { noticeId } = event
  
  if (!noticeId) {
    return { success: false, message: '参数不完整' }
  }
  
  try {
    // 阅读量+1
    await db.collection('notices').doc(noticeId).update({
      data: { viewCount: _.inc(1) }
    })
    
    const res = await db.collection('notices').doc(noticeId).get()
    
    if (res.data.length === 0) {
      return { success: false, message: '公示不存在' }
    }
    
    return { success: true, data: res.data[0] }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, message: '查询失败' }
  }
}
