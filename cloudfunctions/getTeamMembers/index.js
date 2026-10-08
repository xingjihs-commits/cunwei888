/**
 * cloudfunctions/getTeamMembers/index.js - 查询班子成员
 * 用途：按类型查询班子成员列表
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { type = 'committee', page = 1, pageSize = 50 } = event
  
  // type: committee(班子) / party(党员) / rep(村民代表) / supervisor(监督委员会)
  try {
    let query = db.collection('team_members').where({ type: type, enabled: true })
    
    const total = await query.count()
    const list = await query
      .orderBy('sortOrder', 'asc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    return { success: true, data: list.data, total: total.total }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
