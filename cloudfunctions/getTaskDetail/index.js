/**
 * cloudfunctions/getTaskDetail/index.js - 任务详情
 * 用途：查询任务详情含进度（待复审内容不对村民公开）
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
const { pluckDoc } = require('./common/docUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { taskId } = event

  if (!taskId) {
    return fail('INVALID_PARAMS')
  }

  try {
    const taskRes = await db.collection('tasks').doc(taskId).get()
    const task = pluckDoc(taskRes)
    if (!task || task.auditStatus === '待复审') {
      return { success: false, message: '任务不存在' }
    }

    // 查询办理进度
    const progress = await db.collection('task_progress')
      .where({ taskId: taskId })
      .orderBy('createTime', 'desc')
      .limit(20)
      .get()

    return {
      success: true,
      data: {
        ...task,
        progressList: progress.data
      }
    }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, message: '查询失败' }
  }
}
