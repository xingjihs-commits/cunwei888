/**
 * cloudfunctions/submitSecretaryMail/index.js - 书记信箱提交
 * 改造点：status 全中文（待处理）+ 图片内容安全
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { MAIL_STATUS } = require('./common/constants')
const { checkContentSecurity, attachQueueRecord } = require('./common/checkAdmin')
const { isBlocked } = require('./common/blocked')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  // 封禁校验：被临时锁定的用户拒绝提交
  if (await isBlocked(OPENID)) {
    return { success: false, message: '账号已被临时限制，请稍后再试', code: 'BLOCKED' }
  }
  const { content, subject = '', urgentLevel = '普通', isAnonymous = false } = event

  if (!content || content.trim().length < 5) {
    return { success: false, message: '请输入至少5个字的内容' }
  }
  if (content.length > 1000) {
    return { success: false, message: '内容不能超过1000字' }
  }
  if (subject.length > 50) {
    return { success: false, message: '主题不能超过50字' }
  }
  if (!['普通', '紧急', '特急'].includes(urgentLevel)) {
    return { success: false, message: '紧急程度无效' }
  }

  try {
    const textCheck = await checkContentSecurity(content, OPENID, { collection: 'secretary_mails' })
    if (textCheck.result === false) {
      return { success: false, message: '内容包含违规信息' }
    }

    const now = new Date()
    const res = await db.collection('secretary_mails').add({
      data: {
        subject: subject || content.substring(0, 20),
        content: content,
        urgentLevel: urgentLevel,
        isAnonymous: isAnonymous,
        status: MAIL_STATUS.PENDING,
        reply: '',
        replyTime: null,
        repliedBy: '',
        isPublic: false,
        senderOpenid: isAnonymous ? '' : OPENID,
        senderInfo: '',
        auditStatus: textCheck.result === 'review' ? '待复审' : '',
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    // 复审队列回填
    if (textCheck.result === 'review') {
      await attachQueueRecord(textCheck.queueId, 'secretary_mails', res._id)
    }

    await db.collection('messages').add({
      data: {
        type: 'secretary_mail',
        title: '收到新的书记信箱来信',
        content: subject || content.substring(0, 30),
        targetRole: 'secretary',
        recordId: res._id,
        isRead: false,
        createTime: now
      }
    }).catch((e) => console.warn('[submitSecretaryMail] 消息写入失败:', e && e.errMsg))

    return { success: true, id: res._id, message: '信件已送达书记，感谢您的建言' }
  } catch (err) {
    console.error('[submitSecretaryMail] 失败:', err)
    return { success: false, message: '提交失败' }
  }
}
