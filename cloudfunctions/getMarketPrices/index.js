/**
 * cloudfunctions/getMarketPrices/index.js - 查询有效价格
 * 用途：查询未过期的惠农价格
 * 改造点：去除 _openid
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { safePaging, stripOpenid } = require('./common/listUtils')
const { escapeRegExp } = require('./common/docUtils')

exports.main = async (event, context) => {
  const { productName = '' } = event
  const { page, pageSize } = safePaging(event, 100)

  try {
    const conditions = [{ expired: false }, { auditStatus: _.neq('待复审') }]
    if (productName) {
      conditions.push({ productName: db.RegExp({ regexp: escapeRegExp(productName), options: 'i' }) })
    }
    const where = _.and(conditions)

    const res = await db.collection('market_prices')
      .where(where)
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()

    return { success: true, data: stripOpenid(res.data) }
  } catch (err) {
    console.error('[getMarketPrices] 查询失败:', err)
    return { success: false, data: [] }
  }
}
