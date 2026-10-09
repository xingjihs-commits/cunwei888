/**
 * cloudfunctions/getMarketPrices/index.js - 查询有效价格
 * 用途：查询未过期的惠农价格
 * 改造点：去除 _openid
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { stripOpenid } = require('../common/listUtils')

exports.main = async (event, context) => {
  const { productName = '' } = event

  try {
    const conditions = [{ expired: false }]
    if (productName) {
      conditions.push({ productName: db.RegExp({ regexp: productName, options: 'i' }) })
    }
    const where = _.and(conditions)

    const res = await db.collection('market_prices')
      .where(where)
      .orderBy('createTime', 'desc')
      .limit(100)
      .get()

    return { success: true, data: stripOpenid(res.data) }
  } catch (err) {
    console.error('[getMarketPrices] 查询失败:', err)
    return { success: false, data: [] }
  }
}
