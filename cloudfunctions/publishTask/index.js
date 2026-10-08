/**
 * cloudfunctions/publishTask/index.js - 发布落实任务
 * 改造点：status 全中文（已派单）+ 内容安全
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { TASK_STATUS } = require('../common/constants')
const { checkAdmin, checkContentSecurity } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { title, content, assignee, assigneeOpenid, deadline, urgentLevel = '普通', policySource = '' } = event

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, message: '无发布权限' }
  }

  if (!title || !content || !assignee) {
    return { success: false, message: '请填写完整信息' }
  }
  if (title.length > 50) {
    return { success: false, message: '标题不能超过50字' }
  }
  if (content.length > 2000) {
    return { success: false, message: '内容不能超过2000字' }
  }

  try {
    const textCheck = await checkContentSecurity(title + '\n' + content, OPENID, { collection: 'tasks' })
    if (textCheck === false) {
      return { success: false, message: '内容包含违规信息' }
    }

    const now = new Date()
    const res = await db.collection('tasks').add({
      data: {
        title: title,
        content: content,
        assignee: assignee,
        assigneeOpenid: assigneeOpenid || '',
        assigneeRole: '',
        deadline: deadline ? new Date(deadline) : null,
        urgentLevel: urgentLevel,
        policySource: policySource,
        status: TASK_STATUS.ASSIGNED,
        progress: 0,
        isOverdue: false,
        auditStatus: textCheck === 'review' ? '待复审' : '',
        publisher: OPENID,
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    try {
      await cloud.callFunction({
        name: 'sendSubscribeMessage',
        data: { type: 'new_task', taskId: res._id, assigneeOpenid: assigneeOpenid, title, content: content.substring(0, 50) }
      })
    } catch (e) {
      console.warn('[publishTask] 通知跳过:', e && e.errMsg)
    }

    return { success: true, id: res._id, message: '任务发布成功' }
  } catch (err) {
    console.error('[publishTask] 失败:', err)
    return { success: false, message: '发布失败' }
  }
}
