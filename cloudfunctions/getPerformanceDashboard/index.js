/**
 * cloudfunctions/getPerformanceDashboard/index.js - 考核看板
 * 改造点：使用 expandStatuses 兼容中英文老数据
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_DONE_STATUSES, expandStatuses } = require('./common/constants')
const { checkAdmin } = require('./common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  const { year, month } = event
  const now = new Date()
  const y = year || now.getFullYear()
  const m = month || (now.getMonth() + 1)

  try {
    const startDate = new Date(y, m - 1, 1)
    const endDate = new Date(y, m, 1)

    const doneStatuses = expandStatuses(RECORD_DONE_STATUSES)

    const totalRes = await db.collection('records')
      .where({ createTime: _.gte(startDate).and(_.lt(endDate)) })
      .count()

    const completedRes = await db.collection('records')
      .where({
        createTime: _.gte(startDate).and(_.lt(endDate)),
        status: _.in(doneStatuses)
      })
      .count()

    const overdueRes = await db.collection('records')
      .where({
        createTime: _.gte(startDate).and(_.lt(endDate)),
        isOverdue: true
      })
      .count()

    // 按时率口径统一：完成且未超时 / 总数（用 count 联合条件直接算）
    const onTimeRes = await db.collection('records')
      .where({
        createTime: _.gte(startDate).and(_.lt(endDate)),
        status: _.in(doneStatuses),
        isOverdue: _.neq(true)
      })
      .count()

    const perfList = await db.collection('performance')
      .where({ year: y, month: m })
      .orderBy('completedOnTime', 'desc')
      .limit(20)
      .get()

    return {
      success: true,
      data: {
        year: y, month: m,
        overview: {
          total: totalRes.total,
          completed: completedRes.total,
          overdue: overdueRes.total,
          onTimeRate: totalRes.total > 0
            ? Math.round((onTimeRes.total / totalRes.total) * 100)
            : 0
        },
        ranking: perfList.data
      }
    }
  } catch (err) {
    console.error('[getPerformanceDashboard] 失败:', err)
    return { success: false, message: '查询失败' }
  }
}
