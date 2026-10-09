/**
 * cloudfunctions/getProjects/index.js - 查询项目收益
 * 用途：分页查询项目收益列表
 * 改造点：pageSize 封顶 + 去除 _openid
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { safePaging, stripOpenid } = require('../common/listUtils')

exports.main = async (event, context) => {
  const { year = '' } = event
  const { page, pageSize } = safePaging(event, 20)

  try {
    const conditions = []
    if (year) conditions.push({ year: parseInt(year) })
    const where = conditions.length === 0 ? {} : (conditions.length === 1 ? conditions[0] : _.and(conditions))

    const query = db.collection('projects').where(where)
    const total = await query.count()
    const list = await query
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()

    return { success: true, data: stripOpenid(list.data), total: total.total, page, pageSize }
  } catch (err) {
    console.error('[getProjects] 查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
