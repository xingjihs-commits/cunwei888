/**
 * cloudfunctions/getTeamMemberDetail/index.js - 成员详情
 * 用途：查询班子成员详情
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { memberId } = event
  
  if (!memberId) {
    return { success: false, message: '参数不完整' }
  }
  
  try {
    const res = await db.collection('team_members').doc(memberId).get()
    if (res.data.length === 0) {
      return { success: false, message: '成员不存在' }
    }
    return { success: true, data: res.data[0] }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, message: '查询失败' }
  }
}
