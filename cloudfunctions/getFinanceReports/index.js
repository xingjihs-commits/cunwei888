/**
 * cloudfunctions/getFinanceReports/index.js - 财务报表列表
 * 用途：查询财务三资公示列表
 * 改造点：pageSize 封顶 + 去除 _openid
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { safePaging, stripOpenid } = require('./common/listUtils')

exports.main = async (event, context) => {
  const { year = '' } = event
  const { page, pageSize } = safePaging(event, 20)

  try {
    // review 阻断：待复审内容不对村民公开
    const conditions = [{ auditStatus: _.neq('待复审') }]
    if (year) conditions.push({ year: parseInt(year) })
    const where = conditions.length === 0 ? {} : (conditions.length === 1 ? conditions[0] : _.and(conditions))

    const query = db.collection('finance_reports').where(where)
    const total = await query.count()
    const list = await query
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()

    return { success: true, data: stripOpenid(list.data), total: total.total, page, pageSize }
  } catch (err) {
    console.error('[getFinanceReports] 查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
