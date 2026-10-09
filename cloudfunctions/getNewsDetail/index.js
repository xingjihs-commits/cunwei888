/**
 * cloudfunctions/getNewsDetail/index.js - 新闻详情
 * 用途：获取新闻详情，阅读量+1
 */
const cloud = require('wx-server-sdk')
const { fail } = require('../common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { newsId } = event
  
  if (!newsId) {
    return fail('INVALID_PARAMS')
  }
  
  try {
    await db.collection('news').doc(newsId).update({
      data: { viewCount: _.inc(1) }
    })
    
    const res = await db.collection('news').doc(newsId).get()
    if (res.data.length === 0) {
      return { success: false, message: '新闻不存在' }
    }
    
    return { success: true, data: res.data[0] }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, message: '查询失败' }
  }
}
