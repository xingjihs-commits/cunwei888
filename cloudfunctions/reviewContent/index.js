/**
 * cloudfunctions/reviewContent/index.js - 人工复审
 * 改造点：AUDIT_STATUS 全中文
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { AUDIT_STATUS, RECORD_STATUS } = require('../common/constants')
const { checkAdmin } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { recordId, passed, reason = '' } = event

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, message: '无复审权限' }
  }

  if (!recordId) {
    return { success: false, message: '参数不完整' }
  }

  try {
    const now = new Date()

    await db.collection('audit_queue').add({
      data: {
        recordId: recordId,
        reviewer: OPENID,
        passed: passed,
        reason: reason,
        reviewTime: now
      }
    })

    if (passed) {
      await db.collection('records').doc(recordId).update({
        data: { auditStatus: AUDIT_STATUS.PASSED, updateTime: now }
      })
    } else {
      await db.collection('records').doc(recordId).update({
        data: { auditStatus: AUDIT_STATUS.REJECTED, status: RECORD_STATUS.REJECTED, updateTime: now }
      })
    }

    await db.collection('logs').add({
      data: {
        action: 'review_content',
        recordId: recordId,
        passed: passed,
        operator: OPENID,
        createTime: now
      }
    })

    return { success: true, message: passed ? '复审通过' : '复审驳回' }
  } catch (err) {
    console.error('[reviewContent] 失败:', err)
    return { success: false, message: '操作失败' }
  }
}
