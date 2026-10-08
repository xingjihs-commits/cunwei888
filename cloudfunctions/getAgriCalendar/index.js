/**
 * cloudfunctions/getAgriCalendar/index.js - 农事日历
 * 用途：按月份查询农事提醒和节气
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { month = 0 } = event
  
  try {
    let query = db.collection('agri_calendar').where({ enabled: true })
    if (month > 0) {
      query = query.where({ month: month })
    }
    
    const res = await query
      .orderBy('sortOrder', 'asc')
      .limit(100)
      .get()
    
    return { success: true, data: res.data }
  } catch (err) {
    console.error('查询失败:', err)
    // 返回默认数据
    return {
      success: true,
      data: getDefaultCalendar(month)
    }
  }
}

function getDefaultCalendar(month) {
  const defaults = [
    { month: 1, title: '小寒大寒，防冻保暖', content: '注意越冬作物防冻，畜禽保暖', term: '小寒' },
    { month: 2, title: '立春雨水，备耕开始', content: '准备种子化肥，检修农机', term: '立春' },
    { month: 3, title: '惊蛰春分，春播春种', content: '水稻育秧，玉米播种', term: '惊蛰' },
    { month: 4, title: '清明谷雨，插秧忙种', content: '水稻插秧，防治病虫害', term: '清明' },
    { month: 5, title: '立夏小满，田间管理', content: '中耕除草，追施肥料', term: '立夏' },
    { month: 6, title: '芒种夏至，抢收抢种', content: '夏收夏种，防汛排涝', term: '芒种' },
    { month: 7, title: '小暑大暑，抗旱防涝', content: '灌溉防旱，防治病虫', term: '小暑' },
    { month: 8, title: '立秋处暑，秋收开始', content: '早稻收割，晚稻管理', term: '立秋' },
    { month: 9, title: '白露秋分，秋收秋种', content: '秋粮收割，秋冬播种', term: '白露' },
    { month: 10, title: '寒露霜降，晚秋收获', content: '晚稻收割，秋菜管理', term: '寒露' },
    { month: 11, title: '立冬小雪，冬修水利', content: '农田基本建设，蓄水保墒', term: '立冬' },
    { month: 12, title: '大雪冬至，越冬管理', content: '越冬作物管理，冬修', term: '大雪' }
  ]
  return month > 0 ? defaults.filter(d => d.month === month) : defaults
}
