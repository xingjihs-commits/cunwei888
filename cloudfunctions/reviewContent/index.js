/**
 * cloudfunctions/reviewContent/index.js - 人工复审
 * 闭环设计：
 *   1. 提交/发布时疑似违规（review）内容先入库（auditStatus='待复审'），复审队列
 *      条目由 attachQueueRecord 回填 collection + recordId（媒体类入队自带）。
 *   2. 本函数按 queueItem.collection 分发回写：
 *      - 媒体类（broadcasts/leader_content）→ mediaReview.applyMediaReview（置 published 并补群发）
 *      - 内容类（news/notices/projects/finance_reports/market_prices/tasks/
 *        team_members/meetings/votes）→ 通过=auditStatus 已通过；驳回=删除文档
 *      - 业务类（records/reports/secretary_mails/users/task_progress）→ 按集合语义回写
 *   3. 回写后置队列条目 status='已处理'，避免重复复审。
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
const { pluckDoc } = require('./common/docUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { AUDIT_STATUS, RECORD_STATUS, VERIFY_STATUS, MAIL_STATUS } = require('./common/constants')
const { checkAdmin } = require('./common/checkAdmin')
const { applyMediaReview } = require('./common/mediaReview')

const MEDIA_COLLECTIONS = ['leader_content', 'broadcasts']

// 删除型集合：复审驳回即删除文档（违规内容不公开）
const REMOVE_ON_REJECT = [
  'news', 'notices', 'projects', 'market_prices', 'finance_reports',
  'tasks', 'team_members', 'meetings', 'votes'
]

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { recordId, queueId, passed: passedRaw, reason = '' } = event
  const passed = !!passedRaw

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
      queueItem = pluckDoc(doc)
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

    const targetCollection = (queueItem && queueItem.collection) || 'records'
    const targetRecordId = (queueItem && queueItem.recordId) || recordId || ''

    // 写复审记录（补 collection 便于追溯）
    await db.collection('audit_queue').add({
      data: {
        recordId: targetRecordId,
        collection: targetCollection,
        reviewer: OPENID,
        passed: passed,
        reason: reason,
        reviewTime: now
      }
    }).catch((e) => console.warn('[reviewContent] 复审记录写入失败:', e && e.errMsg))

    if (targetRecordId && targetCollection) {
      if (MEDIA_COLLECTIONS.indexOf(targetCollection) > -1 && queueItem) {
        // 视频/音频：分发到对应集合，置 published 并补群发
        const r = await applyMediaReview(queueItem, passed)
        if (!r.handled) {
          console.warn('[reviewContent] 媒体分发未处理:', r.message)
        }
      } else if (!queueItem && !targetRecordId) {
        // 无定位信息（历史遗留条目）
        console.warn('[reviewContent] 队列条目缺少定位信息，跳过回写')
      } else if (targetCollection === 'records') {
        // 工单/随手拍/失物招领：驳回置已驳回
        await db.collection('records').doc(targetRecordId).update({
          data: passed
            ? { auditStatus: AUDIT_STATUS.PASSED, updateTime: now }
            : { auditStatus: AUDIT_STATUS.REJECTED, status: RECORD_STATUS.REJECTED, updateTime: now }
        })
      } else if (targetCollection === 'reports') {
        await db.collection('reports').doc(targetRecordId).update({
          data: passed
            ? { auditStatus: AUDIT_STATUS.PASSED, updateTime: now }
            : { status: RECORD_STATUS.REJECTED, auditStatus: AUDIT_STATUS.REJECTED, updateTime: now }
        })
      } else if (targetCollection === 'secretary_mails') {
        await db.collection('secretary_mails').doc(targetRecordId).update({
          data: passed
            ? { auditStatus: AUDIT_STATUS.PASSED, updateTime: now }
            : { auditStatus: AUDIT_STATUS.REJECTED, status: MAIL_STATUS.CLOSED, updateTime: now }
        })
      } else if (targetCollection === 'users') {
        await db.collection('users').doc(targetRecordId).update({
          data: passed
            ? { auditStatus: AUDIT_STATUS.PASSED, updateTime: now }
            : { isVerified: false, verifyStatus: VERIFY_STATUS.REJECTED, auditStatus: AUDIT_STATUS.REJECTED, updateTime: now }
        })
      } else if (targetCollection === 'task_progress') {
        if (!passed) {
          await db.collection('task_progress').doc(targetRecordId).remove()
        }
      } else if (REMOVE_ON_REJECT.indexOf(targetCollection) > -1) {
        if (passed) {
          await db.collection(targetCollection).doc(targetRecordId).update({
            data: { auditStatus: AUDIT_STATUS.PASSED, updateTime: now }
          })
        } else {
          // 驳回即删除（违规内容不对外公开）
          await db.collection(targetCollection).doc(targetRecordId).remove()
        }
      } else {
        console.warn('[reviewContent] 未知集合，仅标记队列已处理:', targetCollection)
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
        recordId: targetRecordId,
        collection: targetCollection,
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
