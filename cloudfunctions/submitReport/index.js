/**
 * cloudfunctions/submitReport/index.js - 用户举报
 * 用途：村民对 news/notice/feedback/snapshot 等内容举报
 * 入参：targetType(news/notice/record/snapshot/broadcast), targetId, reason, content(optional)
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { checkContentSecurity } = require('../common/checkAdmin')

const VALID_TARGET_TYPES = ['news', 'notice', 'record', 'snapshot', 'broadcast', 'vote', 'meeting', 'lost_found']

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { targetType, targetId, reason, content = '', isAnonymous = false } = event

  if (!targetType || !targetId || !reason) {
    return { success: false, message: '请填写完整举报信息' }
  }
  if (!VALID_TARGET_TYPES.includes(targetType)) {
    return { success: false, message: '举报对象类型无效' }
  }
  if (reason.length > 200) {
    return { success: false, message: '举报理由不能超过200字' }
  }

  try {
    // 内容安全
    const textCheck = await checkContentSecurity(reason + '\n' + content, OPENID, { collection: 'reports' })
    if (textCheck === false) {
      return { success: false, message: '举报内容包含违规信息' }
    }

    // 防重复举报：同一用户对同一对象只能举报一次
    // 匿名举报时仍记录 openid 用于防重复，但展示时清空
    const exist = await db.collection('reports')
      .where({ targetType, targetId, reporterOpenid: OPENID, status: _.in(['待处理', '处理中']) })
      .count()
    if (exist.total > 0) {
      return { success: false, message: '您已举报过此内容，正在处理中' }
    }

    const now = new Date()
    const res = await db.collection('reports').add({
      data: {
        targetType: targetType,
        targetId: targetId,
        reason: reason,
        content: content,
        // 匿名举报时：reporterOpenid 用 OPENID 加密哈希（防重复+保护身份）
        // 管理员看不到真实 openid，只能看到一个哈希值
        reporterOpenid: isAnonymous ? 'anon_' + OPENID.substring(0, 8) : OPENID,
        isAnonymous: isAnonymous,
        status: '待处理',
        handleResult: '',
        handler: '',
        handleTime: null,
        createTime: now,
        updateTime: now,
        _openid: OPENID  // 系统层仍记录真实 openid，仅用于审计
      }
    })

    // 通知管理员（异步）
    try {
      await db.collection('messages').add({
        data: {
          type: 'report',
          title: '收到新的举报',
          content: reason.substring(0, 50),
          targetRole: 'secretary',
          recordId: res._id,
          isRead: false,
          createTime: now
        }
      })
    } catch (e) {
      console.warn('[submitReport] 通知管理员失败:', e && e.errMsg)
    }

    return { success: true, id: res._id, message: '举报已提交，我们将尽快处理' }
  } catch (err) {
    console.error('[submitReport] 失败:', err)
    return { success: false, message: '提交失败' }
  }
}
