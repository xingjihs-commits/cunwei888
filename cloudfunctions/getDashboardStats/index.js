/**
 * cloudfunctions/getDashboardStats/index.js - 数据看板统计
 * 改造点：使用 expandStatuses 兼容中英文 status，确保老数据也能被统计
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
const { fetchAll } = require('./common/db')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_STATUS, RECORD_DONE_STATUSES, RECORD_OPEN_STATUSES, normalizeStatus } = require('./common/constants')
const { checkAdmin } = require('./common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  const { period, dimension = 'person' } = event

  const now = new Date()
  let y, m
  if (period) {
    const parts = String(period).split('-')
    y = parseInt(parts[0])
    m = parseInt(parts[1])
    if (!Number.isInteger(y) || !Number.isInteger(m) || m < 1 || m > 12) {
      return { success: false, message: 'period 参数无效（格式 YYYY-MM）' }
    }
  } else {
    y = now.getFullYear()
    m = now.getMonth() + 1
  }
  const startDate = new Date(y, m - 1, 1)
  const endDate = new Date(y, m, 1)

  try {
    // fetchAll 分页拉取，破单次 get 100 条上限（月工单量大时统计才不失真）
    const records = await fetchAll(
      'records',
      { createTime: _.gte(startDate).and(_.lt(endDate)), isSecret: _.neq(true) },
      { max: 5000 }
    )

    // 归一化 status 后统计（兼容老英文数据，统一走 constants.normalizeStatus）
    const doneSet = new Set(RECORD_DONE_STATUSES)
    const openSet = new Set(RECORD_OPEN_STATUSES)
    const normalize = (s) => normalizeStatus(s)

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
    // 按时率口径：完成且未超时 / 总数（与 generatePerformanceReport 一致）
    const onTimeDone = records.filter(r => doneSet.has(normalize(r.status)) && !r.isOverdue).length
    overview.onTimeRate = overview.total > 0
      ? Math.round(onTimeDone / overview.total * 100) + '%'
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
            total: 0, completed: 0, completedOnTime: 0, overdue: 0,
            scoreSum: 0, scoreCount: 0, badReviews: 0
          }
        }
        const p = map[key]
        p.total++
        const isDone = doneSet.has(normalize(r.status))
        if (isDone) p.completed++
        if (isDone && !r.isOverdue) p.completedOnTime++
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
        // 按时率口径统一：完成且未超时 / 总数
        onTimeRate: p.total > 0 ? Math.round(p.completedOnTime / p.total * 100) + '%' : '0%'
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
