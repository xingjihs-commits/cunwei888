/**
 * cloudfunctions/getFeedbackList/index.js - 管理端工单列表
 * 改造点：FEEDBACK_TYPES 使用中文常量，无需 _.in() 过滤（直接查中文 type）
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

  try {
    let query = db.collection('records').where({ type: _.in(FEEDBACK_TYPES) })

    if (status) query = query.where({ status: status })
    if (type) query = query.where({ type: type })
    if (urgentLevel) query = query.where({ urgentLevel: urgentLevel })

    const total = await query.count()

    const list = await query
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()

    return {
      success: true,
      data: list.data,
      total: total.total,
      page: page,
      pageSize: pageSize
    }
  } catch (err) {
    console.error('[getFeedbackList] 失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
