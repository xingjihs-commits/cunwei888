/**
 * cloudfunctions/getLostFoundList/index.js - 失物招领列表
 * 用途：查询失物招领信息列表
 * 改造点：pageSize 封顶 + 去除 _openid
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { safePaging, stripOpenid } = require('./common/listUtils')

exports.main = async (event, context) => {
  const { subType = '' } = event
  const { page, pageSize } = safePaging(event, 20)

  try {
    const conditions = [{ type: '失物招领', isPublic: true, auditStatus: _.neq('待复审') }]
    if (subType) conditions.push({ subType: subType })
    const where = _.and(conditions)

    const query = db.collection('records').where(where)
    const total = await query.count()
    const list = await query
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()

    return { success: true, data: stripOpenid(list.data), total: total.total, page, pageSize }
  } catch (err) {
    console.error('[getLostFoundList] 查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
