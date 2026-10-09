/**
 * cloudfunctions/getHomeData/index.js - 首页聚合数据
 * 改造点：每个 Promise 都加 .catch 降级，避免单个查询失败导致整个首页空
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

const EMPTY = { data: [] }

exports.main = async (event, context) => {
  try {
    // 用 allSettled 思路：每个都 catch 兜底
    const [newsRes, noticeRes, priceRes, teamRes, broadcastRes, unreadRes] = await Promise.all([
      db.collection('news')
        .orderBy('isTop', 'desc')
        .orderBy('createTime', 'desc')
        .limit(5)
        .get()
        .catch(() => EMPTY),
      db.collection('notices')
        .orderBy('createTime', 'desc')
        .limit(3)
        .get()
        .catch(() => EMPTY),
      db.collection('market_prices')
        .where({ expired: false })
        .orderBy('createTime', 'desc')
        .limit(3)
        .get()
        .catch(() => EMPTY),
      db.collection('team_members')
        .where({ type: 'committee', enabled: true })
        .orderBy('sortOrder', 'asc')
        .limit(10)
        .get()
        .catch(() => EMPTY),
      db.collection('broadcasts')
        .where({ published: true })
        .orderBy('createTime', 'desc')
        .limit(1)
        .get()
        .catch(() => EMPTY),
      OPENID
        ? db.collection('messages').where({ targetOpenid: OPENID, isRead: false }).count().catch(() => ({ total: 0 }))
        : Promise.resolve({ total: 0 })
    ])

    let villageInfo = { villageName: '示范村', villagePhone: '', icpNumber: '' }
    try {
      const info = await db.collection('module_config')
        .where({ moduleKey: 'village_info' })
        .get()
      if (info.data.length > 0 && info.data[0].config) {
        villageInfo = { ...villageInfo, ...info.data[0].config }
      }
    } catch (e) {
      console.warn('[getHomeData] 加载村信息失败:', e && e.errMsg)
    }

    return {
      success: true,
      data: {
        villageInfo,
        news: newsRes.data,
        notices: noticeRes.data,
        prices: priceRes.data,
        team: teamRes.data,
        latestBroadcast: (broadcastRes.data && broadcastRes.data[0]) || null,
        unreadCount: (unreadRes && unreadRes.total) || 0,
        phones: Array.isArray(villageInfo.emergencyPhones) ? villageInfo.emergencyPhones : []
      }
    }
  } catch (err) {
    console.error('[getHomeData] 失败:', err)
    return { success: false, data: null, message: '加载失败' }
  }
}
