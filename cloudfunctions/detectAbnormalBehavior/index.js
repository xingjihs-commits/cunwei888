/**
 * cloudfunctions/detectAbnormalBehavior/index.js - 异常行为检测
 * 定时触发：每小时扫一次，检测异常行为并自动锁定
 * 检测规则：
 *   1. 1 小时内同 openid 提交 ≥ 10 次反映 → 标记为刷单，临时锁定 1 小时
 *   2. 1 小时内同 openid 发起 ≥ 5 次举报 → 标记为恶意举报
 *   3. 管理员 1 小时内删除 ≥ 50 条记录 → 标记为异常删除
 */
const cloud = require('wx-server-sdk')
const { fail } = require('../common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
const { writeLog } = require('../common/db')
const { checkAdmin } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  // 定时触发时 OPENID 为空放行；前端调用必须有管理员权限
  if (OPENID) {
    const isAdmin = await checkAdmin(OPENID)
    if (!isAdmin) {
      return fail('FORBIDDEN')
    }
  }

  const now = new Date()
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

  try {
    // 1. 检测刷反映
    const feedbackSpam = await db.collection('records')
      .aggregate()
      .match({ createTime: _.gte(oneHourAgo) })
      .group({ _id: '$_openid', count: $.sum(1) })
      .match({ count: _.gte(10) })
      .end()
      .catch(() => ({ list: [] }))

    // 2. 检测恶意举报
    const reportSpam = await db.collection('reports')
      .aggregate()
      .match({ createTime: _.gte(oneHourAgo) })
      .group({ _id: '$reporterOpenid', count: $.sum(1) })
      .match({ count: _.gte(5) })
      .end()
      .catch(() => ({ list: [] }))

    const flagged = []
    for (const item of (feedbackSpam.list || [])) {
      if (!item._id) continue
      await db.collection('blocked_users').add({
        data: {
          openid: item._id,
          reason: '1 小时内提交 ' + item.count + ' 次反映',
          blockedUntil: new Date(now.getTime() + 60 * 60 * 1000),
          createTime: now
        }
      }).catch(() => {})
      flagged.push({ openid: item._id, type: 'feedback_spam', count: item.count })
    }

    for (const item of (reportSpam.list || [])) {
      if (!item._id) continue
      await db.collection('blocked_users').add({
        data: {
          openid: item._id,
          reason: '1 小时内发起 ' + item.count + ' 次举报',
          blockedUntil: new Date(now.getTime() + 24 * 60 * 60 * 1000),
          createTime: now
        }
      }).catch(() => {})
      flagged.push({ openid: item._id, type: 'report_spam', count: item.count })
    }

    await writeLog('detect_abnormal_behavior', {
      flagged: flagged.length,
      details: flagged
    })

    return { success: true, flagged: flagged.length, details: flagged }
  } catch (err) {
    console.error('[detectAbnormalBehavior] 失败:', err)
    return { success: false, message: '检测失败' }
  }
}
