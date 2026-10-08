/**
 * cloudfunctions/getMarketPrices/index.js - 查询有效价格
 * 用途：查询未过期的惠农价格
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { productName = '' } = event
  
  try {
    let query = db.collection('market_prices').where({ expired: false })
    if (productName) {
      query = query.where({ productName: db.RegExp({ regexp: productName, options: 'i' }) })
    }
    
    const res = await query
      .orderBy('createTime', 'desc')
      .limit(100)
      .get()
    
    return { success: true, data: res.data }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, data: [] }
  }
}
