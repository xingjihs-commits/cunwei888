/**
 * cloudfunctions/getRecordDetail/index.js - 查询单条记录详情
 * 改造点：
 *   1. 责任人（assigneeOpenid === OPENID）也能查看分配给自己的工单
 *   2. 公示墙（isPublic=true）所有人可看
 *   3. 创建者本人可看
 *   4. 管理员可看所有
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { recordId } = event

  if (!recordId) {
    return { success: false, message: '参数不完整' }
  }

  try {
    const res = await db.collection('records').doc(recordId).get()
    if (res.data.length === 0) {
      return { success: false, message: '记录不存在' }
    }

    const record = res.data[0]

    // 权限校验：创建者 / 责任人 / 管理员 / 公示记录 都可查看
    const checkAdmin = require('../common/checkAdmin')
    const isAdmin = await checkAdmin(OPENID)
    const isOwner = record._openid === OPENID
    const isAssignee = record.assigneeOpenid === OPENID
    const isPublic = record.isPublic === true

    if (!isOwner && !isAssignee && !isAdmin && !isPublic) {
      return { success: false, message: '无权查看' }
    }

    // 增加浏览计数（仅公开记录）
    if (isPublic && !isOwner && !isAssignee) {
      try {
        await db.collection('records').doc(recordId).update({
          data: { viewCount: _.inc(1) }
        })
        record.viewCount = (record.viewCount || 0) + 1
      } catch (e) {}
    }

    return { success: true, data: record }
  } catch (err) {
    console.error('[getRecordDetail] 查询失败:', err)
    return { success: false, message: '查询失败' }
  }
}
