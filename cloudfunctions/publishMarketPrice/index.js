/**
 * cloudfunctions/publishMarketPrice/index.js - 发布惠农价格
 * 改造点：productName/remark 内容安全
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { PRICE_TREND } = require('../common/constants')
const { checkAdmin, checkContentSecurity } = require('../common/checkAdmin')
const { INTERNAL_TOKEN } = require('../common/internal')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { productName, price, unit, market = '', trend = '稳定', remark = '' } = event

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, message: '无发布权限' }
  }

  if (!productName || !price || !unit) {
    return { success: false, message: '请填写完整信息' }
  }

  try {
    // 价格名称+备注内容安全
    const textCheck = await checkContentSecurity(productName + '\n' + remark, OPENID, { collection: 'market_prices' })
    if (textCheck === false) {
      return { success: false, message: '内容包含违规信息' }
    }

    const now = new Date()

    await db.collection('market_prices').where({
      productName: productName,
      expired: false
    }).update({
      data: { expired: true, updateTime: now }
    })

    const res = await db.collection('market_prices').add({
      data: {
        productName: productName,
        price: parseFloat(price),
        unit: unit,
        market: market,
        trend: trend,
        remark: remark,
        expired: false,
        publisher: OPENID,
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    try {
      await cloud.callFunction({
        name: 'sendSubscribeMessage',
        data: { type: 'price_update', productName: productName, price: price, _internal: INTERNAL_TOKEN }
      })
    } catch (e) {
      console.warn('[publishMarketPrice] 通知跳过:', e && e.errMsg)
    }

    return { success: true, id: res._id, message: '价格发布成功' }
  } catch (err) {
    console.error('[publishMarketPrice] 失败:', err)
    return { success: false, message: '发布失败' }
  }
}
