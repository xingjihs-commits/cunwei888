/**
 * cloudfunctions/getResolvedFeedback/index.js - 为民办实事（公开成果）
 * 前台首页「为民办实事」板块专用：
 *   ① 只返回 已完成/已评价 状态的工单
 *   ② 只返回村民评价满意（evaluation >= 4）的记录
 *   ③ 只返回 superviseLevel = 普通 的记录（督办/亲阅件绝不公开）
 *   ④ 输出白名单脱敏字段：不返回提交人 openid / 电话 / 原始评价文本
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_DONE_STATUSES, expandStatuses } = require('./common/constants')

exports.main = async (event, context) => {
  try {
    const query = db.collection('records').where(
      _.and([
        { status: _.in(expandStatuses(RECORD_DONE_STATUSES)) },
        { evaluation: _.gte(4) },
        { superviseLevel: '普通' },
        { auditStatus: _.neq('待复审') }
      ])
    )

    const list = await query
      .orderBy('updateTime', 'desc')
      .limit(5)
      .get()

    // 白名单脱敏输出
    const data = list.data.map(r => ({
      _id: r._id,
      type: r.type || '民生事项',
      resultTitle: r.title || `${r.type || '民生'}事项已办结`,
      finishTime: r.updateTime || r.createTime,
      satisfied: true
    }))

    return { success: true, data }
  } catch (err) {
    console.error('[getResolvedFeedback] 查询失败:', err)
    // 降级返回空列表（degraded 供前端感知）
    return { success: true, degraded: true, data: [] }
  }
}
