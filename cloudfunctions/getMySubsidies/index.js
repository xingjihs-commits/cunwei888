/**
 * cloudfunctions/getMySubsidies/index.js - 我的惠农补贴
 * 用途：查询当前用户的惠农补贴发放记录
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { safePaging } = require('./common/listUtils')


exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { page, pageSize } = safePaging(event, 20)
  
  try {
    const query = db.collection('subsidies').where({ _openid: OPENID })
    const total = await query.count()
    const list = await query
      .orderBy('issueTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    return { success: true, data: list.data, total: total.total }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
