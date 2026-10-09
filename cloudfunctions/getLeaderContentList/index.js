/**
 * cloudfunctions/getLeaderContentList/index.js - 书记风采/领导关怀查询
 * 用途：按 type 分页查询 leader_content；传 id 时返回单条详情
 * 改造点：过滤掉 published=false（视频待复审）的记录，未配置 published 的旧数据仍可见
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { page = 1, pageSize = 10, type = '', id = '' } = event

  try {
    if (id) {
      const doc = await db.collection('leader_content').doc(id).get()
      return { success: true, data: doc.data }
    }

    const conditions = [{ published: _.neq(false) }]
    if (type) conditions.push({ type: type })
    const where = _.and(conditions)

    const query = db.collection('leader_content').where(where)
    const total = await query.count()
    const list = await query
      .orderBy('publishTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()

    return { success: true, data: list.data, total: total.total }
  } catch (err) {
    console.error('[getLeaderContentList] 查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
