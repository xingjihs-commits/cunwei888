/**
 * cloudfunctions/getLeaderContentList/index.js - 书记风采/领导关怀查询
 * 用途：按 type 分页查询 leader_content；传 id 时返回单条详情
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { page = 1, pageSize = 10, type = '', id = '' } = event

  try {
    if (id) {
      const doc = await db.collection('leader_content').doc(id).get()
      return { success: true, data: doc.data }
    }

    let query = db.collection('leader_content')
    if (type) {
      query = query.where({ type: type })
    }

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
