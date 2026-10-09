/**
 * cloudfunctions/getUserInfo/index.js - 获取用户信息
 * 用途：查询用户信息
 * 安全：
 *   1. 默认仅返回调用者自身信息，忽略前端传入的 openid（防越权读取任意用户 PII）
 *   2. 查询他人 / listAll 需管理员权限
 *   3. 不返回 err.message，避免泄露内部细节
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { checkAdmin, getAdminRole } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { listAll = false, openid: targetOpenid } = event

  try {
    const isAdmin = await checkAdmin(OPENID)
    const roleInfo = await getAdminRole(OPENID)

    // 管理员拉取用户列表（实名审核 auth-list 用，需主任及以上 weight>=90）
    if (listAll) {
      if (!isAdmin || roleInfo.weight < 90) {
        return { success: false, message: '无权查看用户列表', code: 'FORBIDDEN' }
      }
      const res = await db.collection('users')
        .orderBy('createTime', 'desc')
        .limit(100)
        .get()
      return { success: true, data: { list: res.data } }
    }

    // 仅允许查询自己；查他人需管理员
    const queryOpenid = targetOpenid && targetOpenid !== OPENID ? targetOpenid : OPENID
    if (queryOpenid !== OPENID && !isAdmin) {
      return { success: false, message: '无权查看他人信息', code: 'FORBIDDEN' }
    }

    const res = await db.collection('users').where({ _openid: queryOpenid }).get()
    if (res.data.length === 0) {
      return { success: true, data: null }
    }

    const userData = { ...res.data[0] }
    if (queryOpenid === OPENID) {
      userData.isAdmin = isAdmin
      userData.committeeWeight = roleInfo.weight
    }

    return { success: true, data: userData }
  } catch (err) {
    console.error('[getUserInfo] 查询失败:', err)
    return { success: false, data: null, message: '查询失败', code: 'INTERNAL' }
  }
}
