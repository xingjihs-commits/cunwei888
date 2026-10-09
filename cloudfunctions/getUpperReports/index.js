/**
 * cloudfunctions/getUpperReports/index.js - 对上汇报列表
 * 用途：查询历史汇报记录
 */
const cloud = require('wx-server-sdk')
const { fail } = require('../common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  
  const checkAdmin = require('../common/checkAdmin')
  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return Object.assign(fail('FORBIDDEN'), { data: [] })
  }
  
  const { page = 1, pageSize = 20 } = event
  
  try {
    const query = db.collection('upper_reports')
    const total = await query.count()
    const list = await query
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    return { success: true, data: list.data, total: total.total }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
