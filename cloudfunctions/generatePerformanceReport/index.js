/**
 * cloudfunctions/generatePerformanceReport/index.js - 按月生成考核统计
 * 改造点：使用 normalizeStatus 兼容老英文 status
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_DONE_STATUSES, normalizeStatus } = require('../common/constants')

const STATUS_MAP = {
  'pending': '待处理', 'assigned': '已派单', 'processing': '处理中',
  'completed': '已完成', 'evaluated': '已评价', 'rejected': '已驳回'
}

exports.main = async (event, context) => {
  const { period } = event

  const now = new Date()
  let y, m
  if (period) {
    const parts = period.split('-')
    y = parseInt(parts[0])
    m = parseInt(parts[1])
  } else {
    y = now.getFullYear()
    m = now.getMonth()
    if (m === 0) { y--; m = 12 }
  }

  try {
    const startDate = new Date(y, m - 1, 1)
    const endDate = new Date(y, m, 1)

    const records = await db.collection('records')
      .where({
        createTime: _.gte(startDate).and(_.lt(endDate)),
        isSecret: _.neq(true)
      })
      .get()

    const stats = {}
    const doneSet = new Set(RECORD_DONE_STATUSES)
    for (const r of records.data) {
      const key = r.assigneeOpenid || 'unassigned'
      if (!stats[key]) {
        stats[key] = {
          assigneeOpenid: r.assigneeOpenid || '',
          assigneeName: r.assigneeName || r.assignee || '未分配',
          assigneeDuty: r.assigneeDuty || '',
          totalCases: 0,
          completedOnTime: 0,
          overdueCases: 0,
          goodReviews: 0,
          badReviews: 0,
          totalScore: 0,
          scoredCount: 0
        }
      }
      const s = stats[key]
      s.totalCases++
      const normStatus = STATUS_MAP[r.status] || r.status
      if (doneSet.has(normStatus)) {
        if (!r.isOverdue) s.completedOnTime++
      }
      if (r.isOverdue) s.overdueCases++
      if (r.evaluation > 0) {
        s.totalScore += r.evaluation
        s.scoredCount++
        if (r.evaluation >= 4) s.goodReviews++
        if (r.evaluation <= 2) s.badReviews++
      }
    }

    await db.collection('performance')
      .where({ period: `${y}-${String(m).padStart(2, '0')}` })
      .remove()

    let count = 0
    for (const [openid, s] of Object.entries(stats)) {
      const avgSatisfaction = s.scoredCount > 0
        ? (s.totalScore / s.scoredCount).toFixed(1)
        : '0.0'
      const onTimeRate = s.totalCases > 0
        ? Math.round((s.completedOnTime / s.totalCases) * 100) + '%'
        : '0%'

      await db.collection('performance').add({
        data: {
          period: `${y}-${String(m).padStart(2, '0')}`,
          year: y, month: m,
          assigneeOpenid: s.assigneeOpenid,
          assigneeName: s.assigneeName,
          assigneeDuty: s.assigneeDuty,
          totalCases: s.totalCases,
          completedOnTime: s.completedOnTime,
          overdueCases: s.overdueCases,
          goodReviews: s.goodReviews,
          badReviews: s.badReviews,
          totalScore: s.totalScore,
          scoredCount: s.scoredCount,
          avgSatisfaction: avgSatisfaction,
          onTimeRate: onTimeRate,
          updateTime: now
        }
      })
      count++
    }

    return { success: true, count: count, period: `${y}-${String(m).padStart(2, '0')}` }
  } catch (err) {
    console.error('[generatePerformanceReport] 失败:', err)
    return { success: false, message: '生成失败' }
  }
}
