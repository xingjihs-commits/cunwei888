/**
 * cloudfunctions/getUserInfo/index.js - 获取用户信息
 * 用途：查询当前用户信息
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { openid } = event
  
  const targetOpenid = openid || OPENID
  
  try {
    const res = await db.collection('users').where({ _openid: targetOpenid }).get()
    if (res.data.length === 0) {
      return { success: true, data: null }
    }
    
    // 检查管理员
    const checkAdmin = require('../common/checkAdmin')
    const isAdmin = await checkAdmin(targetOpenid)
    
    return {
      success: true,
      data: {
        ...res.data[0],
        isAdmin: isAdmin
      }
    }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, data: null }
  }
}
