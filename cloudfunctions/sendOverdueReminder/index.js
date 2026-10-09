/**
 * cloudfunctions/sendOverdueReminder/index.js - 定时催办
 * 改造点：使用 expandStatuses 兼容中英文老数据
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_OPEN_STATUSES, expandStatuses, RECTIFICATION_STATUS } = require('../common/constants')
const { INTERNAL_TOKEN } = require('../common/internal')

exports.main = async (event, context) => {
  try {
    const now = new Date()

    // 兼容中英文老数据
    const openStatuses = expandStatuses(RECORD_OPEN_STATUSES)

    const overdueRecords = await db.collection('records')
      .where({
        status: _.in(openStatuses),
        handleDeadline: _.lt(now),
        isOverdue: false,
        isSecret: _.neq(true)
      })
      .get()

    let count = 0

    for (const record of overdueRecords.data) {
      const recordId = record._id
      await db.collection('records').doc(recordId).update({
        data: { isOverdue: true, updateTime: now }
      })

      const deadline = new Date(record.handleDeadline)
      const overdueDays = Math.floor((now - deadline) / (24 * 60 * 60 * 1000))

      if (record.assigneeOpenid) {
        try {
          await cloud.callFunction({
            name: 'sendSubscribeMessage',
            data: {
              type: 'overdue_reminder',
              recordId: recordId,
              targetOpenid: record.assigneeOpenid,
              title: (record.title || '工单').substring(0, 20),
              overdueDays: overdueDays,
              _internal: INTERNAL_TOKEN
            }
          })
        } catch (e) {
          console.warn('[sendOverdueReminder] 催办通知跳过:', e && e.errMsg)
        }
      }

      if (overdueDays >= 3) {
        await db.collection('rectifications').add({
          data: {
            recordId: recordId,
            assigneeOpenid: record.assigneeOpenid || '',
            assigneeName: record.assigneeName || record.assignee || '',
            overdueDays: overdueDays,
            reason: '',
            status: RECTIFICATION_STATUS.DOING,
            createTime: now
          }
        })

        try {
          await cloud.callFunction({
            name: 'sendSubscribeMessage',
            data: {
              type: 'overdue_escalation',
              recordId: recordId,
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

      count++
    }

    await db.collection('logs').add({
      data: {
        action: 'overdue_reminder',
        count: count,
        operator: 'system',
        createTime: now
      }
    })

    return { success: true, count: count, message: `处理${count}条超时工单` }
  } catch (err) {
    console.error('[sendOverdueReminder] 失败:', err)
    return { success: false, message: '催办失败' }
  }
}
