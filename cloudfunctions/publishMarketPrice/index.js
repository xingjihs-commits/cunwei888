/**
 * cloudfunctions/publishMarketPrice/index.js - 发布惠农价格
 * 改造点：productName/remark 内容安全
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { PRICE_TREND } = require('./common/constants')
const { checkAdmin, checkContentSecurity, attachQueueRecord } = require('./common/checkAdmin')
const { INTERNAL_TOKEN } = require('./common/internal')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { productName, price, unit, market = '', trend = '稳定', remark = '' } = event

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  if (!productName || !price || !unit) {
    return { success: false, message: '请填写完整信息' }
  }
  if (productName.length > 30) {
    return { success: false, message: '品种名称不能超过30字' }
  }
  if (remark.length > 200) {
    return { success: false, message: '备注不能超过200字' }
  }
  const priceNum = Number(price)
  if (!Number.isFinite(priceNum) || priceNum < 0 || priceNum > 1000000) {
    return { success: false, message: '价格数值无效' }
  }
  const trendVal = PRICE_TREND[trend] || (Object.values(PRICE_TREND).includes(trend) ? trend : null)
  if (!trendVal) {
    return { success: false, message: '价格趋势无效（上涨/下跌/稳定）' }
  }

  try {
    // 价格名称+备注内容安全
    const textCheck = await checkContentSecurity(productName + '\n' + remark, OPENID, { collection: 'market_prices' })
    if (textCheck.result === false) {
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
        price: priceNum,
        unit: unit,
        market: market,
        trend: trendVal,
        remark: remark,
        expired: false,
        publisher: OPENID,
        auditStatus: textCheck.result === 'review' ? '待复审' : '',
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    // 复审队列回填
    if (textCheck.result === 'review') {
      await attachQueueRecord(textCheck.queueId, 'market_prices', res._id)
    }

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
