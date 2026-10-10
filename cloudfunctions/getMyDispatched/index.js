/**
 * cloudfunctions/getMyDispatched/index.js - 查询我负责的工单
 * 用途：责任人查看分配给自己的工单（含duty显示"姓名（管什么）"）
 * 入参：page, pageSize, status
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { expandStatuses } = require('./common/constants')
const { safePaging } = require('./common/listUtils')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { status = '' } = event
  const { page, pageSize } = safePaging(event, 20)
  
  try {
    let query = db.collection('records').where({
      assigneeOpenid: OPENID,
      isSecret: _.neq(true)
    })
    
    if (status) {
      query = query.where({ status: _.in(expandStatuses([status])) })
    }
    
    const total = await query.count()
    const list = await query
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    return {
      success: true,
      data: list.data,
      total: total.total,
      page: page,
      pageSize: pageSize
    }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
