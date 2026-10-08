/**
 * cloudfunctions/subscribePriceAlert/index.js - 订阅价格提醒
 * 用途：村民订阅某品种价格更新
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { productName } = event
  
  if (!productName) {
    return { success: false, message: '请指定品种' }
  }
  
  try {
    // 检查是否已订阅
    const existing = await db.collection('subscriptions').where({
      _openid: OPENID,
      productName: productName,
      type: 'price_alert'
    }).count()
    
    if (existing.total > 0) {
      // 取消订阅
      await db.collection('subscriptions').where({
        _openid: OPENID,
        productName: productName,
        type: 'price_alert'
      }).remove()
      return { success: true, subscribed: false, message: '已取消订阅' }
    } else {
      // 订阅
      await db.collection('subscriptions').add({
        data: {
          _openid: OPENID,
          productName: productName,
          type: 'price_alert',
          createTime: new Date()
        }
      })
      return { success: true, subscribed: true, message: '订阅成功' }
    }
  } catch (err) {
    console.error('订阅失败:', err)
    return { success: false, message: '操作失败' }
  }
}
