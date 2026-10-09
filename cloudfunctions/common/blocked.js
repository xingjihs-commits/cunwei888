/**
 * cloudfunctions/common/blocked.js - 临时封禁校验
 * 用途：消费 detectAbnormalBehavior 写入的 blocked_users 记录，
 *      对被临时锁定的用户拒绝提交类操作（刷反映 / 恶意举报）。
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

async function isBlocked(openid) {
  if (!openid) return false
  try {
    const res = await db.collection('blocked_users')
      .where({ openid: openid, blockedUntil: _.gt(new Date()) })
      .count()
    return res.total > 0
  } catch (err) {
    // 集合不存在或查询异常时不阻断正常用户
    return false
  }
}

module.exports = { isBlocked }
