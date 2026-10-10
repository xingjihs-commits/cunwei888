/**
 * cloudfunctions/getSnapshotWall/index.js - 随手拍公示墙
 * 改造点：status 用中文常量，并 expandStatuses 兼容老英文数据；pageSize 封顶 + 去除 _openid
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_STATUS, expandStatuses } = require('./common/constants')
const { safePaging, stripOpenid } = require('./common/listUtils')

// 公示墙只显示待处理/已派单/处理中/已完成（不显示已驳回，保护村民隐私）
const WALL_STATUSES = expandStatuses([
  RECORD_STATUS.PENDING,
  RECORD_STATUS.ASSIGNED,
  RECORD_STATUS.PROCESSING,
  RECORD_STATUS.COMPLETED
])

exports.main = async (event, context) => {
  const { type = '' } = event
  const { page, pageSize } = safePaging(event, 20)

  try {
    const conditions = [{ 'extra.category': 'snapshot', isPublic: true, status: _.in(WALL_STATUSES), auditStatus: _.neq('待复审') }]
    if (type) conditions.push({ type: type })
    const where = _.and(conditions)

    const query = db.collection('records').where(where)
    const total = await query.count()
    const list = await query
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()

    return { success: true, data: stripOpenid(list.data), total: total.total, page, pageSize }
  } catch (err) {
    console.error('[getSnapshotWall] 失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
