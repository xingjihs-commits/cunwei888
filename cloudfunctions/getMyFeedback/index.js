/**
 * cloudfunctions/getMyFeedback/index.js - 查询我的反映
 * 改造点：FEEDBACK_TYPES 使用中文常量
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { FEEDBACK_TYPES, expandStatuses } = require('./common/constants')
const { safePaging } = require('./common/listUtils')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { status = '' } = event
  const { page, pageSize } = safePaging(event, 10)

  try {
    let query = db.collection('records').where({ _openid: OPENID, type: _.in(FEEDBACK_TYPES) })

    if (status) {
      // expandStatuses 兼容中英文老数据
      query = query.where({ status: _.in(expandStatuses([status])) })
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
