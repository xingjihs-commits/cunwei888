/**
 * cloudfunctions/generateUpperReport/index.js - 生成对上汇报
 * 改造点：使用 expandStatuses 兼容中英文老数据；tasks 状态全中文
 */
const cloud = require('wx-server-sdk')
const { fail } = require('../common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_DONE_STATUSES, TASK_DONE_STATUSES, expandStatuses } = require('../common/constants')
const { checkAdmin } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  const { year, month, reportType = '月报' } = event
  const now = new Date()
  const y = year || now.getFullYear()
  const m = month || (now.getMonth() + 1)

  try {
    const startDate = new Date(y, m - 1, 1)
    const endDate = new Date(y, m, 1)

    const doneStatuses = expandStatuses(RECORD_DONE_STATUSES)
    const taskDoneStatuses = expandStatuses(TASK_DONE_STATUSES)

    const [
      feedbackTotal, feedbackCompleted, feedbackOverdue,
      newsCount, noticeCount, snapshotCount,
      taskTotal, taskCompleted, projectCount,
      partyMemberCount
    ] = await Promise.all([
      db.collection('records').where({ createTime: _.gte(startDate).and(_.lt(endDate)) }).count(),
      db.collection('records').where({ createTime: _.gte(startDate).and(_.lt(endDate)), status: _.in(doneStatuses) }).count(),
      db.collection('records').where({ createTime: _.gte(startDate).and(_.lt(endDate)), isOverdue: true }).count(),
      db.collection('news').where({ createTime: _.gte(startDate).and(_.lt(endDate)) }).count(),
      db.collection('notices').where({ createTime: _.gte(startDate).and(_.lt(endDate)) }).count(),
      db.collection('records').where({ createTime: _.gte(startDate).and(_.lt(endDate)), 'extra.category': 'snapshot' }).count(),
      db.collection('tasks').where({ createTime: _.gte(startDate).and(_.lt(endDate)) }).count(),
      db.collection('tasks').where({ createTime: _.gte(startDate).and(_.lt(endDate)), status: _.in(taskDoneStatuses) }).count(),
      db.collection('projects').where({ createTime: _.gte(startDate).and(_.lt(endDate)) }).count(),
      db.collection('team_members').where({ type: 'party', enabled: true }).count()
    ])

    const evalRecords = await db.collection('records')
      .where({ createTime: _.gte(startDate).and(_.lt(endDate)), evaluation: _.gt(0) })
      .get()
    let avgEval = 0
    if (evalRecords.data.length > 0) {
      const sum = evalRecords.data.reduce((s, r) => s + (r.evaluation || 0), 0)
      avgEval = Math.round((sum / evalRecords.data.length) * 10) / 10
    }

    // 从 module_config 读取村名
    let villageName = '示范村'
    try {
      const info = await db.collection('module_config')
        .where({ moduleKey: 'village_info' })
        .get()
      if (info.data.length > 0 && info.data[0].config && info.data[0].config.villageName) {
        villageName = info.data[0].config.villageName
      }
    } catch (e) {}

    const reportData = {
      year: y, month: m, type: reportType,
      villageName: villageName,
      summary: {
        feedback: {
          total: feedbackTotal.total,
          completed: feedbackCompleted.total,
          overdue: feedbackOverdue.total,
          onTimeRate: feedbackTotal.total > 0
            ? Math.round(((feedbackCompleted.total - feedbackOverdue.total) / feedbackTotal.total) * 100)
            : 0,
          avgSatisfaction: avgEval
        },
        publicity: {
          newsCount: newsCount.total,
          noticeCount: noticeCount.total,
          snapshotCount: snapshotCount.total
        },
        task: {
          total: taskTotal.total,
          completed: taskCompleted.total
        },
        project: { count: projectCount.total },
        party: { memberCount: partyMemberCount.total }
      },
      generatedBy: OPENID,
      createTime: now
    }

    const res = await db.collection('upper_reports').add({ data: reportData })

    return { success: true, id: res._id, data: reportData, message: '汇报生成成功' }
  } catch (err) {
    console.error('[generateUpperReport] 失败:', err)
    return { success: false, message: '生成失败' }
  }
}
