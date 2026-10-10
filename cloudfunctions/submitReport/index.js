/**
 * cloudfunctions/submitReport/index.js - 用户举报
 * 用途：村民对 news/notice/feedback/snapshot 等内容举报
 * 入参：targetType(news/notice/record/snapshot/broadcast), targetId, reason, content(optional)
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { checkContentSecurity, attachQueueRecord } = require('./common/checkAdmin')
const { isBlocked } = require('./common/blocked')
const { hashId } = require('./common/docUtils')

const VALID_TARGET_TYPES = ['news', 'notice', 'record', 'snapshot', 'broadcast', 'vote', 'meeting', 'lost_found']

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  // 封禁校验：被临时锁定的用户拒绝提交
  if (await isBlocked(OPENID)) {
    return { success: false, message: '账号已被临时限制，请稍后再试', code: 'BLOCKED' }
  }
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
  if (content.length > 500) {
    return { success: false, message: '补充说明不能超过500字' }
  }

  try {
    // 内容安全
    const textCheck = await checkContentSecurity(reason + '\n' + content, OPENID, { collection: 'reports' })
    if (textCheck.result === false) {
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
        // 匿名举报：reporterOpenid 用 sha256 短哈希（防重复+防低熵反推），
        // 管理端列表保留 _openid 字段可关联（产品决策：匿名仅对普通村民生效）
        reporterOpenid: isAnonymous ? hashId(OPENID) : OPENID,
        isAnonymous: isAnonymous,
        status: '待处理',
        auditStatus: textCheck.result === 'review' ? '待复审' : '',
        handleResult: '',
        handler: '',
        handleTime: null,
        createTime: now,
        updateTime: now,
        _openid: OPENID  // 系统层仍记录真实 openid，仅用于审计
      }
    })

    // 复审队列回填
    if (textCheck.result === 'review') {
      await attachQueueRecord(textCheck.queueId, 'reports', res._id)
    }

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
