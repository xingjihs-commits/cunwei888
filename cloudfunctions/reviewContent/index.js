/**
 * cloudfunctions/reviewContent/index.js - 人工复审
 * 改造点：
 *   1. AUDIT_STATUS 全中文
 *   2. 复审后回写 audit_queue 原条 status='已处理'，避免重复复审
 *   3. 媒体（视频/音频）复审通过后分发到 mediaReview 自动发布
 *   4. 支持 queueId（图片等无 recordId 的复审）
 */
const cloud = require('wx-server-sdk')
const { fail } = require('../common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { AUDIT_STATUS, RECORD_STATUS } = require('../common/constants')
const { checkAdmin } = require('../common/checkAdmin')
const { applyMediaReview } = require('../common/mediaReview')

const MEDIA_COLLECTIONS = ['leader_content', 'broadcasts']

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { recordId, queueId, passed, reason = '' } = event

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  if (!recordId && !queueId) {
    return fail('INVALID_PARAMS')
  }

  try {
    const now = new Date()

    // 定位队列条目（优先显式 queueId）
    let queueItem = null
    if (queueId) {
      const doc = await db.collection('audit_queue').doc(queueId).get().catch(() => null)
      queueItem = doc && doc.data ? doc.data : null
      if (queueItem) queueItem._id = queueItem._id || queueId
    }
    if (!queueItem && recordId) {
      const qRes = await db.collection('audit_queue')
        .where({ recordId, status: '待复审' })
        .orderBy('createTime', 'desc')
        .limit(1)
        .get()
        .catch(() => ({ data: [] }))
      queueItem = (qRes.data && qRes.data[0]) || null
    }

    // 复审记录（保留原行为）
    await db.collection('audit_queue').add({
      data: {
        recordId: recordId || '',
        reviewer: OPENID,
        passed: passed,
        reason: reason,
        reviewTime: now
      }
    }).catch((e) => console.warn('[reviewContent] 复审记录写入失败:', e && e.errMsg))

    const isMedia = queueItem && MEDIA_COLLECTIONS.indexOf(queueItem.collection) > -1
    if (isMedia) {
      // 视频/音频：分发到对应集合，置 published 并补群发
      const r = await applyMediaReview(queueItem, passed)
      if (!r.handled) {
        console.warn('[reviewContent] 媒体分发未处理:', r.message)
      }
    } else if (queueItem && !queueItem.recordId && queueItem.fileID) {
      // 图片类（无 recordId）：驳回时尽力删除云存储文件
      if (!passed) {
        await cloud.deleteFile({ fileList: [queueItem.fileID] }).catch((e) => {
          console.warn('[reviewContent] 删除违规文件失败:', e && e.errMsg)
        })
      }
    } else if (recordId) {
      // records 集合（文本/图片记录）
      if (passed) {
        await db.collection('records').doc(recordId).update({
          data: { auditStatus: AUDIT_STATUS.PASSED, updateTime: now }
        })
      } else {
        await db.collection('records').doc(recordId).update({
          data: { auditStatus: AUDIT_STATUS.REJECTED, status: RECORD_STATUS.REJECTED, updateTime: now }
        })
      }
    }

    // 回写队列条状态，避免重复复审
    if (queueItem && queueItem._id) {
      await db.collection('audit_queue').doc(queueItem._id).update({
        data: { status: '已处理', reviewTime: now, reviewer: OPENID }
      }).catch((e) => console.warn('[reviewContent] 回写队列状态失败:', e && e.errMsg))
    }

    await db.collection('logs').add({
      data: {
        action: 'review_content',
        recordId: recordId || '',
        queueId: queueItem ? queueItem._id : '',
        passed: passed,
        operator: OPENID,
        createTime: now
      }
    }).catch((e) => console.warn('[reviewContent] 日志写入失败:', e && e.errMsg))

    return { success: true, message: passed ? '复审通过' : '复审驳回' }
  } catch (err) {
    console.error('[reviewContent] 失败:', err)
    return { success: false, message: '操作失败' }
  }
}
