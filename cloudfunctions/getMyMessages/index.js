/**
 * cloudfunctions/getMyMessages/index.js - 我的消息
 * 用途：聚合所有通知消息，统一消息中心
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { checkAdmin } = require('./common/checkAdmin')


exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { page = 1, pageSize = 20, type = '', onlyUnread = false } = event
  const safePage = Math.max(1, parseInt(page) || 1)
  const safeSize = Math.min(Math.max(1, parseInt(pageSize) || 20), 100)

  try {
    // 管理员额外可见 targetRole 类广播通知（新举报/新来信等，原实现无人可读）
    let baseCondition = { targetOpenid: OPENID }
    if (await checkAdmin(OPENID)) {
      baseCondition = _.or([
        { targetOpenid: OPENID },
        { targetRole: _.exists(true), targetOpenid: _.eq('') },
        { targetRole: _.exists(true), targetOpenid: _.exists(false) }
      ])
    }

    let query = db.collection('messages').where(baseCondition)
    if (type) query = query.where({ type: type })
    if (onlyUnread) query = query.where({ isRead: false })
    
    const total = await query.count()
    const unreadRes = await db.collection('messages')
      .where(_.and([baseCondition, { isRead: false }]))
      .count()
    
    const list = await query
      .orderBy('createTime', 'desc')
      .skip((safePage - 1) * safeSize)
      .limit(safeSize)
      .get()
    
    return {
      success: true,
      data: list.data,
      total: total.total,
      unreadCount: unreadRes.total
    }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, data: [], total: 0, unreadCount: 0 }
  }
}
