/**
 * cloudfunctions/getSecretaryMails/index.js - 书记信箱列表
 * 用途：书记/管理员查看所有来信
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  
  const checkAdmin = require('../common/checkAdmin')
  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, data: [], message: '无权限' }
  }
  
  const { page = 1, pageSize = 20, status = '' } = event
  
  try {
    let query = db.collection('secretary_mails')
    if (status) query = query.where({ status: status })
    
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
