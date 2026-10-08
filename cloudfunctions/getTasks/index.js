/**
 * cloudfunctions/getTasks/index.js - 查询任务列表
 * 用途：分页查询政策落实任务
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { page = 1, pageSize = 20, status = '' } = event
  
  try {
    let query = db.collection('tasks')
    if (status) query = query.where({ status: status })
    
    const total = await query.count()
    const list = await query
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    // 检查是否超时
    const now = new Date()
    for (const task of list.data) {
      if (task.deadline && new Date(task.deadline) < now && task.status !== 'completed') {
        task.isOverdue = true
      }
    }
    
    return { success: true, data: list.data, total: total.total }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
