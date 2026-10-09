/**
 * cloudfunctions/sendOverdueReminder/index.js - 定时催办
 * 改造点：
 *   1. 定时触发 OPENID 为空放行；前端调用需管理员权限
 *   2. 分批处理（每批 50，单次上限 200），避免无 limit 的 100 条截断
 *   3. 批内并发处理通知，避免逐条串行 callFunction 超时
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_OPEN_STATUSES, expandStatuses, RECTIFICATION_STATUS } = require('../common/constants')
const { INTERNAL_TOKEN } = require('../common/internal')
const { checkAdmin } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  // 定时触发 OPENID 为空放行；前端调用必须有管理员权限
  if (OPENID) {
    const isAdmin = await checkAdmin(OPENID)
    if (!isAdmin) {
      return { success: false, message: '无权限', code: 'FORBIDDEN' }
    }
  }

  try {
    const now = new Date()
    const openStatuses = expandStatuses(RECORD_OPEN_STATUSES)
    const batchSize = 50
    const maxTotal = 200

    let processed = 0
    let notified = 0

    // 每轮取前 batchSize 条未标记超时的工单；处理后 isOverdue=true 不再命中，无需 skip
    while (processed < maxTotal) {
      const overdueRes = await db.collection('records')
        .where({
          status: _.in(openStatuses),
          handleDeadline: _.lt(now),
          isOverdue: false,
          isSecret: _.neq(true)
        })
        .limit(batchSize)
        .get()
        .catch(() => ({ data: [] }))

      if (!overdueRes.data.length) break

      const ids = overdueRes.data.map(r => r._id)
      // 批量置超时
      await db.collection('records')
        .where({ _id: _.in(ids) })
        .update({ data: { isOverdue: true, updateTime: now } })

      // 批内并发处理通知与整改，避免串行超时
      await Promise.all(overdueRes.data.map(async (record) => {
        const deadline = new Date(record.handleDeadline)
        const overdueDays = Math.floor((now - deadline) / (24 * 60 * 60 * 1000))

        if (record.assigneeOpenid) {
          try {
            await cloud.callFunction({
              name: 'sendSubscribeMessage',
              data: {
                type: 'overdue_reminder',
                recordId: record._id,
                targetOpenid: record.assigneeOpenid,
                title: (record.title || '工单').substring(0, 20),
                overdueDays: overdueDays,
                _internal: INTERNAL_TOKEN
              }
            })
            notified++
          } catch (e) {
            console.warn('[sendOverdueReminder] 催办通知跳过:', e && e.errMsg)
          }
        }

        if (overdueDays >= 3) {
          await db.collection('rectifications').add({
            data: {
              recordId: record._id,
              assigneeOpenid: record.assigneeOpenid || '',
              assigneeName: record.assigneeName || record.assignee || '',
              overdueDays: overdueDays,
              reason: '',
              status: RECTIFICATION_STATUS.DOING,
              createTime: now
            }
          }).catch(() => {})

          try {
            await cloud.callFunction({
              name: 'sendSubscribeMessage',
              data: {
                type: 'overdue_escalation',
                recordId: record._id,
                targetRole: 'secretary',
                title: `超时${overdueDays}天：${(record.title || '').substring(0, 20)}`,
                content: `${record.assigneeName || ''}（${record.assigneeDuty || ''}）`,
                overdueDays: overdueDays,
                _internal: INTERNAL_TOKEN
              }
            })
          } catch (e) {
            console.warn('[sendOverdueReminder] 升级通知跳过:', e && e.errMsg)
          }
        }
      }))

      processed += overdueRes.data.length
      if (overdueRes.data.length < batchSize) break
    }

    await db.collection('logs').add({
      data: {
        action: 'overdue_reminder',
        count: processed,
        notified: notified,
        operator: 'system',
        createTime: now
      }
    }).catch(() => {})

    return { success: true, count: processed, notified: notified, message: `处理${processed}条超时工单` }
  } catch (err) {
    console.error('[sendOverdueReminder] 失败:', err)
    return { success: false, message: '催办失败' }
  }
}
