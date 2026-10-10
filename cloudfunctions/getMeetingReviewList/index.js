/**
 * cloudfunctions/getMeetingReviewList/index.js - 会上研究清单
 * 改造点：使用 expandStatuses 兼容中英文老数据
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_OPEN_STATUSES, expandStatuses } = require('./common/constants')
const { checkAdmin } = require('./common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  const { period } = event
  const now = new Date()

  let startDate = null
  if (period) {
    const parts = period.split('-')
    startDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 1)
  }

  try {
    const openStatuses = expandStatuses(RECORD_OPEN_STATUSES)

    let overdueQuery = db.collection('records').where({
      status: _.in(openStatuses),
      isOverdue: true,
      isSecret: _.neq(true)
    })
    if (startDate) overdueQuery = overdueQuery.where({ createTime: _.gte(startDate) })

    const overdueRes = await overdueQuery
      .orderBy('handleDeadline', 'asc')
      .limit(50)
      .get()

    const overdue = overdueRes.data.map(r => ({
      recordId: r._id,
      name: r.assigneeName || r.assignee || '未分配',
      duty: r.assigneeDuty || '',
      type: r.type,
      title: r.title || (r.content || '').substring(0, 20),
      urgentLevel: r.urgentLevel,
      handleDeadline: r.handleDeadline,
      overdueDays: r.handleDeadline
        ? Math.floor((now - new Date(r.handleDeadline)) / (24*60*60*1000))
        : 0
    }))

    let badQuery = db.collection('records').where({
      // 只算真实差评：evaluation>0 且 ≤2（0 分是未评价，不能混入）
      evaluation: _.and(_.gt(0), _.lte(2)),
      isSecret: _.neq(true)
    })
    if (startDate) badQuery = badQuery.where({ createTime: _.gte(startDate) })

    const badRes = await badQuery
      .orderBy('updateTime', 'desc')
      .limit(50)
      .get()

    const badReviews = badRes.data.map(r => ({
      recordId: r._id,
      name: r.assigneeName || r.assignee || '未分配',
      duty: r.assigneeDuty || '',
      type: r.type,
      title: r.title || (r.content || '').substring(0, 20),
      evaluation: r.evaluation,
      evaluationText: r.evaluationText || ''
    }))

    return {
      success: true,
      overdue: overdue,
      badReviews: badReviews,
      period: period || `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`
    }
  } catch (err) {
    console.error('[getMeetingReviewList] 失败:', err)
    return { success: false, message: '查询失败' }
  }
}
