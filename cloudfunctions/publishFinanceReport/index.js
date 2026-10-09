/**
 * cloudfunctions/publishFinanceReport/index.js - 发布财务报表
 * 改造点：内容安全（财务数据敏感）
 */
const cloud = require('wx-server-sdk')
const { fail } = require('../common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { checkAdmin, checkContentSecurity } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  const { title, period, incomes = [], expenses = [], assets = [], resources = [], summary = '' } = event

  if (!title || !period) {
    return { success: false, message: '请填写完整信息' }
  }
  if (title.length > 50) {
    return { success: false, message: '标题不能超过50字' }
  }

  try {
    // 标题+备注汇总内容安全检测
    const checkText = title + '\n' + (summary || '') + incomes.map(i => i.remark || '').join(' ') + expenses.map(i => i.remark || '').join(' ')
    const textCheck = await checkContentSecurity(checkText, OPENID, { collection: 'finance_reports' })
    if (textCheck === false) {
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
        audited: true,
        auditor: '村务监督委员会',
        auditStatus: textCheck === 'review' ? '待复审' : '',
        publisher: OPENID,
        viewCount: 0,
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    return { success: true, id: res._id, message: '财务公示发布成功' }
  } catch (err) {
    console.error('[publishFinanceReport] 失败:', err)
    return { success: false, message: '发布失败' }
  }
}
