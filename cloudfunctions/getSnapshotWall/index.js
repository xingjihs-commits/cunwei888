/**
 * cloudfunctions/getSnapshotWall/index.js - 随手拍公示墙
 * 改造点：status 用中文常量，并 expandStatuses 兼容老英文数据
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_STATUS, expandStatuses } = require('../common/constants')

// 公示墙只显示待处理/已派单/处理中/已完成（不显示已驳回，保护村民隐私）
const WALL_STATUSES = expandStatuses([
  RECORD_STATUS.PENDING,
  RECORD_STATUS.ASSIGNED,
  RECORD_STATUS.PROCESSING,
  RECORD_STATUS.COMPLETED
])

exports.main = async (event, context) => {
  const { page = 1, pageSize = 20, type = '' } = event

  try {
    let query = db.collection('records').where({
      'extra.category': 'snapshot',
      isPublic: true,
      status: _.in(WALL_STATUSES)
    })

    if (type) {
      query = query.where({ type: type })
    }

    const total = await query.count()
    const list = await query
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()

    return { success: true, data: list.data, total: total.total }
  } catch (err) {
    console.error('[getSnapshotWall] 失败:', err)
    return { success: false, data: [], total: 0 }
  }
}
