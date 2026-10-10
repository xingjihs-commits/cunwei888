/**
 * cloudfunctions/getTeamMembers/index.js - 查询班子成员
 * 用途：按类型查询班子成员列表
 * 改造点：pageSize 封顶 + 去除 _openid
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { safePaging, stripOpenid } = require('./common/listUtils')

exports.main = async (event, context) => {
  const { type = 'committee' } = event
  const { page, pageSize } = safePaging(event, 50)

  // type: committee(班子) / party(党员) / rep(村民代表) / supervisor(监督委员会)
  try {
    // review 阻断：待复审成员不对村民公开
    const query = db.collection('team_members').where({ type: type, enabled: true, auditStatus: _.neq('待复审') })
    const total = await query.count()
    const list = await query
      .orderBy('sortOrder', 'asc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()

    return { success: true, data: stripOpenid(list.data), total: total.total, page, pageSize }
  } catch (err) {
    console.error('[getTeamMembers] 查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
