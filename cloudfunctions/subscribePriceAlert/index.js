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
  if (String(productName).length > 30) {
    return { success: false, message: '品种名称不能超过30字' }
  }

  try {
    // 事务内查重+订阅/退订，防并发双击造成重复订阅
    const result = await db.runTransaction(async transaction => {
      const existing = await transaction.collection('subscriptions')
        .where({ _openid: OPENID, productName: productName, type: 'price_alert' })
        .get()
      if (existing.data.length > 0) {
        await transaction.collection('subscriptions')
          .where({ _openid: OPENID, productName: productName, type: 'price_alert' })
          .remove()
        return { subscribed: false }
      }
      await transaction.collection('subscriptions').add({
        data: {
          _openid: OPENID,
          productName: productName,
          type: 'price_alert',
          createTime: new Date()
        }
      })
      return { subscribed: true }
    })

    return { success: true, subscribed: result.subscribed, message: result.subscribed ? '订阅成功' : '已取消订阅' }
  } catch (err) {
    console.error('订阅失败:', err)
    return { success: false, message: '操作失败' }
  }
}
