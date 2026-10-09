/**
 * cloudfunctions/getFeedbackList/index.js - 管理端工单列表
 * 改造点：
 *   1. 亲阅件（isSecret）仅书记可见，其余管理员不可见
 *   2. pageSize 上限封顶，防全表导出
 *   3. 条件用 _.and 组合，避免链式 where
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { FEEDBACK_TYPES } = require('../common/constants')
const { checkAdmin } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, data: [], total: 0, message: '无权限' }
  }

  const { page = 1, pageSize = 20, status = '', type = '', urgentLevel = '' } = event
  const safePage = Math.max(1, parseInt(page) || 1)
  const safeSize = Math.min(parseInt(pageSize) || 20, 100)

  try {
    // 是否书记：admins.role === '书记'；非书记看不到亲阅件（fail-closed）
    const adminDoc = await db.collection('admins')
      .where({ _openid: OPENID, enabled: true })
      .limit(1)
      .get()
    const isSecretary = !!(adminDoc.data[0] && adminDoc.data[0].role === '书记')

    const conditions = [{ type: _.in(FEEDBACK_TYPES) }]
    if (!isSecretary) conditions.push({ isSecret: _.neq(true) })
    if (status) conditions.push({ status: status })
    if (type && FEEDBACK_TYPES.includes(type)) conditions.push({ type: type })
    if (urgentLevel) conditions.push({ urgentLevel: urgentLevel })
    const where = _.and(conditions)

    const query = db.collection('records').where(where)
    const total = await query.count()

    const list = await query
      .orderBy('createTime', 'desc')
      .skip((safePage - 1) * safeSize)
      .limit(safeSize)
      .get()

    return {
      success: true,
      data: list.data,
      total: total.total,
      page: safePage,
      pageSize: safeSize
    }
  } catch (err) {
    console.error('[getFeedbackList] 失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
