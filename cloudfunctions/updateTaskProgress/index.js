/**
 * cloudfunctions/updateTaskProgress/index.js - 更新办理进度
 * 改造点：
 *   1. 鉴权：必须 task.assigneeOpenid === OPENID 或管理员
 *   2. status 全中文（待办/已派单/进行中/已完成/已取消）
 *   3. 内容安全检测
 */
const cloud = require('wx-server-sdk')
const { pluckDoc } = require('./common/docUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { TASK_STATUS, normalizeStatus } = require('./common/constants')
const { checkAdmin, checkContentSecurity } = require('./common/checkAdmin')

const ALLOWED_TASK_STATUSES = [
  TASK_STATUS.TODO, TASK_STATUS.ASSIGNED, TASK_STATUS.DOING, TASK_STATUS.COMPLETED, TASK_STATUS.CANCELLED,
  // 兼容老英文
  'todo', 'assigned', 'doing', 'completed', 'cancelled'
]

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { taskId, progress, content, images = [], status = '' } = event

  if (!taskId || !content) {
    return { success: false, message: '请填写办理情况' }
  }
  if (content.length > 500) {
    return { success: false, message: '办理说明不能超过500字' }
  }

  try {
    // 1. 鉴权：必须是任务指派人或管理员
    const taskRes = await db.collection('tasks').doc(taskId).get()
    const task = pluckDoc(taskRes)
    if (!task) {
      return { success: false, message: '任务不存在' }
    }

    const isAdmin = await checkAdmin(OPENID)
    const isAssignee = task.assigneeOpenid && task.assigneeOpenid === OPENID
    if (!isAdmin && !isAssignee) {
      return { success: false, message: '无操作权限，仅任务指派人或管理员可更新' }
    }

    // 2. 内容安全检测
    const check = await checkContentSecurity(content, OPENID, { collection: 'task_progress', recordId: taskId })
    if (check.result === false) {
      return { success: false, message: '办理说明包含违规信息' }
    }

    const now = new Date()

    // 3. 写入进度记录
    await db.collection('task_progress').add({
      data: {
        taskId: taskId,
        content: content,
        images: images,
        progress: progress || 0,
        operator: OPENID,
        createTime: now,
        _openid: OPENID
      }
    })

    // 4. 更新任务
    const updateData = {
      progress: progress || 0,
      updateTime: now
    }
    if (status) {
      const normalizedStatus = normalizeStatus(status)
      if (!ALLOWED_TASK_STATUSES.includes(normalizedStatus)) {
        return { success: false, message: '任务状态值不合法' }
      }
      updateData.status = normalizedStatus
    }

    // 如果标记完成，记录完成时间
    if (updateData.status === TASK_STATUS.COMPLETED) {
      updateData.completedTime = now
    }

    await db.collection('tasks').doc(taskId).update({ data: updateData })

    // 写日志
    await db.collection('logs').add({
      data: {
        action: 'update_task_progress',
        taskId: taskId,
        progress: progress || 0,
        status: updateData.status || '',
        operator: OPENID,
        createTime: now
      }
    }).catch((e) => console.warn('[updateTaskProgress] 日志写入失败:', e && e.errMsg))

    return { success: true, message: '进度更新成功' }
  } catch (err) {
    console.error('[updateTaskProgress] 失败:', err)
    return { success: false, message: '更新失败' }
  }
}
