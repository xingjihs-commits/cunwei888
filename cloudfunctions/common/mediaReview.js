/**
 * cloudfunctions/common/mediaReview.js - 媒体（视频/音频）复审分发
 * 用途：reviewContent 复审通过后，按 audit_queue 条的 collection 把媒体记录置为已发布；
 *      对广播补群发通知（音频入队时跳过了群发）。
 * 说明：leader_content → published:true；broadcasts → published:true 并补发村民通知。
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

/**
 * 广播发布后补发村民通知（分批写入，每批 20 条）
 * @param {string} broadcastId
 * @returns {Promise<number>} 通知人数（失败返回 0）
 */
async function notifyBroadcast(broadcastId) {
  const doc = await db.collection('broadcasts').doc(broadcastId).get().catch(() => null)
  const b = doc && doc.data
  if (!b) return 0

  const now = new Date()
  const verifiedUsers = await db.collection('users')
    .where({ isVerified: true })
    .field({ _openid: true })
    .get()

  const total = verifiedUsers.data.length
  let processed = 0
  const batchSize = 20

  while (processed < total) {
    const batch = verifiedUsers.data.slice(processed, processed + batchSize)
    const addOps = batch.map(user =>
      db.collection('messages').add({
        data: {
          type: 'broadcast',
          title: b.urgent ? '【紧急广播】' + b.title : b.title,
          content: (b.content || '').substring(0, 50),
          targetOpenid: user._openid,
          recordId: broadcastId,
          isRead: false,
          createTime: now
        }
      })
    )
    try {
      await Promise.all(addOps)
    } catch (e) {
      console.warn('[mediaReview] 批量消息插入部分失败:', e && e.errMsg)
    }
    processed += batch.length
  }
  return total
}

/**
 * 复审结果分发到媒体集合
 * @param {{collection:string, recordId:string, type?:string}} item audit_queue 条目
 * @param {boolean} passed 是否通过
 * @returns {Promise<{handled:boolean, notified?:number, message?:string}>}
 */
async function applyMediaReview(item, passed) {
  const collection = item && item.collection
  const recordId = item && item.recordId
  if (!collection || !recordId) {
    return { handled: false, message: '队列条目缺少 collection/recordId' }
  }

  const now = new Date()

  if (collection === 'leader_content') {
    await db.collection('leader_content').doc(recordId).update({
      data: passed
        ? { published: true, auditStatus: '已通过', updateTime: now }
        : { published: false, auditStatus: '已驳回', updateTime: now }
    })
    return { handled: true }
  }

  if (collection === 'broadcasts') {
    await db.collection('broadcasts').doc(recordId).update({
      data: passed
        ? { published: true, updateTime: now }
        : { published: false, updateTime: now }
    })
    if (passed) {
      const notified = await notifyBroadcast(recordId).catch((e) => {
        console.warn('[mediaReview] 广播群发失败:', e && e.errMsg)
        return 0
      })
      return { handled: true, notified }
    }
    return { handled: true }
  }

  // 其他集合（records 等由 reviewContent 处理）
  return { handled: false, message: '非媒体集合: ' + collection }
}

module.exports = { applyMediaReview, notifyBroadcast }
