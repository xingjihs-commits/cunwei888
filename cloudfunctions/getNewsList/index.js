/**
 * cloudfunctions/getNewsList/index.js - 新闻列表
 * 用途：分页查询村务新闻
 * 改造点：pageSize 封顶 + 去除 _openid
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { safePaging, stripOpenid } = require('../common/listUtils')

exports.main = async (event, context) => {
  const { category = '' } = event
  const { page, pageSize } = safePaging(event, 10)

  try {
    const conditions = []
    if (category) conditions.push({ category: category })
    const where = conditions.length === 0 ? {} : (conditions.length === 1 ? conditions[0] : _.and(conditions))

    const query = db.collection('news').where(where)
    const total = await query.count()
    const list = await query
      .orderBy('isTop', 'desc')
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()

    return { success: true, data: stripOpenid(list.data), total: total.total, page, pageSize }
  } catch (err) {
    console.error('[getNewsList] 查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
