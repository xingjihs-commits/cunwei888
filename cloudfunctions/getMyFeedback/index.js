/**
 * cloudfunctions/getMyFeedback/index.js - 查询我的反映
 * 改造点：FEEDBACK_TYPES 使用中文常量
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { FEEDBACK_TYPES } = require('../common/constants')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { page = 1, pageSize = 10, status = '' } = event

  try {
    let query = db.collection('records').where({ _openid: OPENID, type: _.in(FEEDBACK_TYPES) })

    if (status) {
      query = query.where({ status: status })
    }

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
    console.error('[getMyFeedback] 失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
