/**
 * cloudfunctions/getTasks/index.js - 查询任务列表
 * 用途：分页查询政策落实任务
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { TASK_STATUS, normalizeStatus } = require('./common/constants')
const { safePaging } = require('./common/listUtils')


exports.main = async (event, context) => {
  const { status = '' } = event
  const { page, pageSize } = safePaging(event, 20)
  
  try {
    // review 阻断：待复审任务不对村民公开
    let query = db.collection('tasks').where({ auditStatus: _.neq('待复审') })
    if (status) query = query.where({ status: status })
    
    const total = await query.count()
    const list = await query
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    // 检查是否超时（状态归一化后判断，兼容中英文）
    const now = new Date()
    for (const task of list.data) {
      if (task.deadline && new Date(task.deadline) < now && normalizeStatus(task.status) !== TASK_STATUS.COMPLETED) {
        task.isOverdue = true
      }
    }
    
    return { success: true, data: list.data, total: total.total }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
