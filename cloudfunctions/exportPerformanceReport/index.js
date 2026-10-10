/**
 * cloudfunctions/exportPerformanceReport/index.js - 导出考核报表CSV
 * 改造点：使用 STATUS_MAP 兼容老英文 status
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
const { fetchAll } = require('./common/db')
const { csvEscape } = require('./common/docUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_DONE_STATUSES, normalizeStatus } = require('./common/constants')
const { checkAdmin } = require('./common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  const { period } = event
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

  try {
    const startDate = new Date(y, m - 1, 1)
    const endDate = new Date(y, m, 1)

    // fetchAll 分页拉取，破单次 get 100 条上限
    const data = await fetchAll(
      'records',
      {
        createTime: _.gte(startDate).and(_.lt(endDate)),
        isSecret: _.neq(true)
      },
      { max: 5000 }
    )

    const doneSet = new Set(RECORD_DONE_STATUSES)
    const isDone = (r) => doneSet.has(normalizeStatus(r.status))
    const completed = data.filter(isDone)
    const overdue = data.filter(r => r.isOverdue)
    const badReviews = data.filter(r => r.evaluation > 0 && r.evaluation <= 2)
    const scored = data.filter(r => r.evaluation > 0)
    const avgScore = scored.length > 0
      ? (scored.reduce((s, r) => s + r.evaluation, 0) / scored.length).toFixed(1)
      : '0.0'
    // 按时率口径统一：完成且未超时 / 总数
    const onTimeDone = data.filter(r => isDone(r) && !r.isOverdue).length

    let csv = ''

    csv += '【概览统计】\n'
    csv += `统计周期,${y}年${m}月\n`
    csv += `工单总数,${data.length}\n`
    csv += `已完成,${completed.length}\n`
    csv += `超时数,${overdue.length}\n`
    csv += `差评数,${badReviews.length}\n`
    csv += `平均满意度,${avgScore}\n`
    csv += `按时办结率,${data.length > 0 ? Math.round(onTimeDone / data.length * 100) : 0}%\n\n`

    csv += '【按责任人统计】\n'
    csv += '姓名,负责事项,总单数,已完成,超时数,好评数,差评数,平均满意度,按时率\n'
    const personMap = {}
    data.forEach(r => {
      const key = r.assigneeName || '未分配'
      if (!personMap[key]) personMap[key] = { name: key, duty: r.assigneeDuty || '', total: 0, completed: 0, onTime: 0, overdue: 0, good: 0, bad: 0, scoreSum: 0, scoreCount: 0 }
      const p = personMap[key]
      p.total++
      if (isDone(r)) p.completed++
      if (isDone(r) && !r.isOverdue) p.onTime++
      if (r.isOverdue) p.overdue++
      if (r.evaluation >= 4) p.good++
      if (r.evaluation <= 2 && r.evaluation > 0) p.bad++
      if (r.evaluation > 0) { p.scoreSum += r.evaluation; p.scoreCount++ }
    })
    Object.values(personMap).forEach(p => {
      const avg = p.scoreCount > 0 ? (p.scoreSum / p.scoreCount).toFixed(1) : '0.0'
      const rate = p.total > 0 ? Math.round(p.onTime / p.total * 100) + '%' : '0%'
      csv += `${csvEscape(p.name)},${csvEscape(p.duty)},${p.total},${p.completed},${p.overdue},${p.good},${p.bad},${avg},${rate}\n`
    })
    csv += '\n'

    csv += '【按事项类型统计】\n'
    csv += '类型,总数,已完成,超时数\n'
    const typeMap = {}
    data.forEach(r => {
      const key = r.type || '其他'
      if (!typeMap[key]) typeMap[key] = { type: key, total: 0, completed: 0, overdue: 0 }
      typeMap[key].total++
      if (isDone(r)) typeMap[key].completed++
      if (r.isOverdue) typeMap[key].overdue++
    })
    Object.values(typeMap).forEach(t => {
      csv += `${csvEscape(t.type)},${t.total},${t.completed},${t.overdue}\n`
    })
    csv += '\n'

    csv += '【逾期明细】\n'
    csv += '承办人,负责事项,类型,标题,超时天数\n'
    overdue.forEach(r => {
      const days = r.handleDeadline ? Math.floor((now - new Date(r.handleDeadline)) / (24*60*60*1000)) : 0
      csv += `${csvEscape(r.assigneeName || '未分配')},${csvEscape(r.assigneeDuty || '')},${csvEscape(r.type || '')},${csvEscape(r.title || '')},${days}\n`
    })
    csv += '\n'

    csv += '【差评明细】\n'
    csv += '承办人,负责事项,类型,标题,评分,评价内容\n'
    badReviews.forEach(r => {
      csv += `${csvEscape(r.assigneeName || '未分配')},${csvEscape(r.assigneeDuty || '')},${csvEscape(r.type || '')},${csvEscape(r.title || '')},${r.evaluation}星,${csvEscape(r.evaluationText || '')}\n`
    })

    const fileName = `performance_${y}_${String(m).padStart(2,'0')}.csv`
    const res = await cloud.uploadFile({
      cloudPath: `reports/${fileName}`,
      fileContent: Buffer.from('\ufeff' + csv, 'utf-8')
    })

    await db.collection('logs').add({
      data: { action: 'export_report', period: `${y}-${m}`, operator: OPENID, fileID: res.fileID, createTime: now }
    })

    return { success: true, fileID: res.fileID, fileName: fileName, message: '导出成功' }
  } catch (err) {
    console.error('[exportPerformanceReport] 失败:', err)
    return { success: false, message: '导出失败' }
  }
}
