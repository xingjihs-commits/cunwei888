/**
 * cloudfunctions/getAuditQueue/index.js - 查询人工复审队列
 * 用途：管理员查看机器标记的疑似违规内容
 * 入参：{ page, pageSize, status }
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { checkAdmin } = require('./common/checkAdmin')
const { safePaging } = require('./common/listUtils')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  const { status = '待复审' } = event
  const { page, pageSize } = safePaging(event, 20)

  try {
    let query = db.collection('audit_queue')
    if (status) {
      query = query.where({ status })
    } else {
      query = query.where({ status: _.neq('已处理') })
    }

    const total = await query.count()

    const list = await query
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
      .catch(() => ({ data: [] }))

    return {
      success: true,
      data: list.data,
      total: total.total,
      page,
      pageSize
    }
  } catch (err) {
    console.error('[getAuditQueue] 失败:', err)
    return { success: false, data: [], total: 0, message: '查询失败' }
  }
}
