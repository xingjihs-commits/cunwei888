/**
 * cloudfunctions/getVotes/index.js - 表决列表
 * 用途：查询表决列表
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { safePaging } = require('./common/listUtils')


exports.main = async (event, context) => {
  const { status = '' } = event
  const { page, pageSize } = safePaging(event, 20)
  
  try {
    // review 阻断：待复审表决不对村民公开
    let query = db.collection('votes').where({ auditStatus: _.neq('待复审') })
    if (status) query = query.where({ status: status })
    
    const total = await query.count()
    const list = await query
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()

    // 剥离 voters（谁投了哪票是投票人隐私，不对外返回）
    const data = list.data.map(v => ({
      ...v,
      options: (v.options || []).map(opt => ({
        key: opt.key,
        label: opt.label,
        count: opt.count || 0
      }))
    }))

    return { success: true, data: data, total: total.total }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
