/**
 * cloudfunctions/publishFinanceReport/index.js - 发布财务报表
 * 改造点：内容安全（财务数据敏感）
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { checkAdminWeight, checkContentSecurity, attachQueueRecord } = require('./common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdminWeight(OPENID, 90)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  const { title, period, incomes = [], expenses = [], assets = [], resources = [], summary = '', audited = false, auditor = '' } = event

  if (!title || !period) {
    return { success: false, message: '请填写完整信息' }
  }
  if (title.length > 50) {
    return { success: false, message: '标题不能超过50字' }
  }
  if (summary.length > 1000) {
    return { success: false, message: '摘要不能超过1000字' }
  }
  if (incomes.length + expenses.length > 100) {
    return { success: false, message: '收支明细条目过多' }
  }

  try {
    // 标题+备注汇总内容安全检测
    const checkText = title + '\n' + (summary || '') + incomes.map(i => i.remark || '').join(' ') + expenses.map(i => i.remark || '').join(' ')
    const textCheck = await checkContentSecurity(checkText, OPENID, { collection: 'finance_reports' })
    if (textCheck.result === false) {
      return { success: false, message: '内容包含违规信息' }
    }

    const now = new Date()

    const totalIncome = incomes.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0)
    const totalExpense = expenses.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0)
    const balance = totalIncome - totalExpense

    const res = await db.collection('finance_reports').add({
      data: {
        title: title,
        period: period,
        year: now.getFullYear(),
        incomes: incomes,
        expenses: expenses,
        assets: assets,
        resources: resources,
        summary: summary,
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        balance: balance,
        audited: !!audited,
        auditor: auditor,
        auditStatus: textCheck.result === 'review' ? '待复审' : '',
        publisher: OPENID,
        viewCount: 0,
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    // 复审队列回填
    if (textCheck.result === 'review') await attachQueueRecord(textCheck.queueId, 'finance_reports', res._id)

    return { success: true, id: res._id, message: '财务公示发布成功' }
  } catch (err) {
    console.error('[publishFinanceReport] 失败:', err)
    return { success: false, message: '发布失败' }
  }
}
