/**
 * cloudfunctions/getDashboardStats/index.js - 数据看板统计
 * 改造点：使用 expandStatuses 兼容中英文 status，确保老数据也能被统计
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_STATUS, RECORD_DONE_STATUSES, RECORD_OPEN_STATUSES, expandStatuses } = require('../common/constants')
const { checkAdmin } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, message: '无查看权限' }
  }

  const { period, dimension = 'person' } = event

  const now = new Date()
  let y, m
  if (period) {
    const parts = period.split('-')
    y = parseInt(parts[0])
    m = parseInt(parts[1])
  } else {
    y = now.getFullYear()
    m = now.getMonth() + 1
  }
  const startDate = new Date(y, m - 1, 1)
  const endDate = new Date(y, m, 1)

  try {
    const res = await db.collection('records')
      .where({
        createTime: _.gte(startDate).and(_.lt(endDate)),
        isSecret: _.neq(true)
      })
      .get()

    const records = res.data

    // 归一化 status 后统计（兼容老英文数据）
    const doneSet = new Set(RECORD_DONE_STATUSES)
    const openSet = new Set(RECORD_OPEN_STATUSES)
    const normalize = (s) => {
      const map = { 'pending': '待处理', 'assigned': '已派单', 'processing': '处理中', 'completed': '已完成', 'evaluated': '已评价', 'rejected': '已驳回' }
      return map[s] || s
    }

    const overview = {
      total: records.length,
      completed: records.filter(r => doneSet.has(normalize(r.status))).length,
      pending: records.filter(r => openSet.has(normalize(r.status))).length,
      overdue: records.filter(r => r.isOverdue).length,
      badReviews: records.filter(r => r.evaluation > 0 && r.evaluation <= 2).length
    }
    const scored = records.filter(r => r.evaluation > 0)
    overview.avgScore = scored.length > 0
      ? (scored.reduce((s, r) => s + r.evaluation, 0) / scored.length).toFixed(1)
      : '0.0'
    overview.onTimeRate = overview.total > 0
      ? Math.round((overview.completed - overview.overdue) / overview.total * 100) + '%'
      : '0%'

    let dimensionData = []

    if (dimension === 'person') {
      const map = {}
      records.forEach(r => {
        const key = r.assigneeName || '未分配'
        if (!map[key]) {
          map[key] = {
            name: r.assigneeName || '未分配',
            duty: r.assigneeDuty || '',
            openid: r.assigneeOpenid || '',
            total: 0, completed: 0, overdue: 0,
            scoreSum: 0, scoreCount: 0, badReviews: 0
          }
        }
        const p = map[key]
        p.total++
        if (doneSet.has(normalize(r.status))) p.completed++
        if (r.isOverdue) p.overdue++
        if (r.evaluation > 0) {
          p.scoreSum += r.evaluation
          p.scoreCount++
          if (r.evaluation <= 2) p.badReviews++
        }
      })
      dimensionData = Object.values(map).map(p => ({
        ...p,
        avgScore: p.scoreCount > 0 ? (p.scoreSum / p.scoreCount).toFixed(1) : '0.0',
        onTimeRate: p.total > 0 ? Math.round((p.completed - p.overdue) / p.total * 100) + '%' : '0%'
      })).sort((a, b) => b.completed - a.completed)

    } else if (dimension === 'module' || dimension === 'group') {
      const map = {}
      const field = dimension === 'module' ? 'type' : 'villageGroup'
      const label = dimension === 'module' ? 'typeName' : 'group'
      const def = dimension === 'module' ? '其他' : '未填'
      records.forEach(r => {
        const key = r[field] || def
        if (!map[key]) map[key] = { [label]: key, total: 0, completed: 0, overdue: 0 }
        map[key].total++
        if (doneSet.has(normalize(r.status))) map[key].completed++
        if (r.isOverdue) map[key].overdue++
      })
      dimensionData = Object.values(map)

    } else if (dimension === 'overdue') {
      dimensionData = records
        .filter(r => r.isOverdue)
        .map(r => ({
          recordId: r._id,
          name: r.assigneeName || '未分配',
          duty: r.assigneeDuty || '',
          type: r.type,
          title: r.title,
          overdueDays: r.handleDeadline
            ? Math.floor((now - new Date(r.handleDeadline)) / (24*60*60*1000))
            : 0
        }))
        .sort((a, b) => b.overdueDays - a.overdueDays)

    } else if (dimension === 'badReview') {
      dimensionData = records
        .filter(r => r.evaluation > 0 && r.evaluation <= 2)
        .map(r => ({
          recordId: r._id,
          name: r.assigneeName || '未分配',
          duty: r.assigneeDuty || '',
          type: r.type,
          title: r.title,
          evaluation: r.evaluation,
          evaluationText: r.evaluationText || ''
        }))
    }

    return {
      success: true,
      overview: overview,
      dimension: dimension,
      dimensionData: dimensionData,
      period: `${y}-${String(m).padStart(2, '0')}`
    }
  } catch (err) {
    console.error('[getDashboardStats] 失败:', err)
    return { success: false, message: '统计失败' }
  }
}
