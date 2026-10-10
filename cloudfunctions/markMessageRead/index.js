/**
 * cloudfunctions/markMessageRead/index.js - 标记已读
 * 用途：标记消息为已读
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { messageIds = [], markAll = false } = event
  
  try {
    if (markAll) {
      // 全部标记已读
      await db.collection('messages')
        .where({ targetOpenid: OPENID, isRead: false })
        .update({ data: { isRead: true, readTime: new Date() } })
    } else {
      if (!messageIds.length) {
        return { success: false, message: '缺少消息 ID', code: 'INVALID_PARAMS' }
      }
      if (messageIds.length > 100) {
        return { success: false, message: '单次最多标记100条', code: 'INVALID_PARAMS' }
      }
      // 仅标记属于当前用户的消息（防越权标记他人消息）
      await db.collection('messages')
        .where({ _id: _.in(messageIds), targetOpenid: OPENID })
        .update({ data: { isRead: true, readTime: new Date() } })
    }
    
    return { success: true, message: '已标记' }
  } catch (err) {
    console.error('标记失败:', err)
    return { success: false, message: '操作失败' }
  }
}
