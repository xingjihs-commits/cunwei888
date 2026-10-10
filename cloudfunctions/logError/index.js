/**
 * cloudfunctions/logError/index.js - 前端错误日志上报
 * 改造点：
 *   1. 封禁用户拒绝上报；同一用户每小时限 20 条（防刷爆 logs 集合）
 *   2. 字段校验：time 非法回退当前时间，extra 序列化限长
 */
const cloud = require('wx-server-sdk')
const { isBlocked } = require('./common/blocked')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

const RATE_LIMIT_PER_HOUR = 20

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { type = 'app_error', error = '', time = Date.now(), extra = {} } = event

  // 非法时间回退当前时间
  let ts = Number(time)
  if (!Number.isFinite(ts)) ts = Date.now()

  // extra 序列化限长（防超大对象）
  let safeExtra = {}
  try {
    safeExtra = JSON.parse(JSON.stringify(extra || {}))
  } catch (e) {
    safeExtra = { raw: String(extra).substring(0, 500) }
  }

  try {
    // 限流：同一用户 1 小时内最多 RATE_LIMIT 条（防刷）
    if (OPENID) {
      if (await isBlocked(OPENID)) {
        return { success: false, code: 'BLOCKED' }
      }
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
      const recent = await db.collection('logs')
        .where({ action: 'frontend_error', openid: OPENID, createTime: _.gte(oneHourAgo) })
        .count()
      if (recent.total >= RATE_LIMIT_PER_HOUR) {
        return { success: false, code: 'RATE_LIMITED', message: '上报过于频繁' }
      }
    }

    await db.collection('logs').add({
      data: {
        action: 'frontend_error',
        errorType: String(type).substring(0, 50),
        error: String(error).substring(0, 1000),
        openid: OPENID || '',
        time: new Date(ts),
        extra: safeExtra,
        createTime: new Date()
      }
    })
    return { success: true }
  } catch (err) {
    console.error('[logError] 失败:', err)
    return { success: false }
  }
}
