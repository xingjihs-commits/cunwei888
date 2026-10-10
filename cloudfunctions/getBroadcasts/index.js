/**
 * cloudfunctions/getBroadcasts/index.js - 广播列表
 * 用途：查询书记广播列表
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { safePaging } = require('./common/listUtils')


exports.main = async (event, context) => {
  const { page, pageSize } = safePaging(event, 10)
  
  try {
    // published 已排除未复审广播；auditStatus 兜底排除待复审
    const query = db.collection('broadcasts').where(_.and([{ published: true }, { auditStatus: _.neq('待复审') }]))
    const total = await query.count()
    const list = await query
      .orderBy('urgent', 'desc')
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()

    return { success: true, data: list.data, total: total.total }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
