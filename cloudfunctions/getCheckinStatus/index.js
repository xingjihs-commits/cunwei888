/**
 * cloudfunctions/getCheckinStatus/index.js - 签到状态
 * 用途：查询今日签到状态和连续签到天数
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  
  try {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    
    // 今日是否签到
    const todayRes = await db.collection('checkin_records')
      .where({ _openid: OPENID, checkinDate: _.gte(today) })
      .get()
    
    // 最近7天签到记录
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const recentRes = await db.collection('checkin_records')
      .where({ _openid: OPENID, checkinDate: _.gte(sevenDaysAgo) })
      .orderBy('checkinDate', 'desc')
      .get()
    
    // 计算连续签到天数
    let streak = 0
    const checkinDates = recentRes.data.map(r => {
      const d = new Date(r.checkinDate)
      return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
    })
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000).getTime()
      if (checkinDates.includes(checkDate)) {
        streak++
      } else if (i > 0) {
        break
      }
    }
    
    return {
      success: true,
      data: {
        todayChecked: todayRes.data.length > 0,
        todayRecord: todayRes.data[0] || null,
        streak: streak,
        recentRecords: recentRes.data
      }
    }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, message: '查询失败' }
  }
}
