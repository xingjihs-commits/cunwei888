/**
 * cloudfunctions/replySecretaryMail/index.js - 书记回信
 * 改造点：
 *   1. status 用中文 '已回复'
 *   2. 回复内容安全检测
 */
const cloud = require('wx-server-sdk')
const { fail } = require('../common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { MAIL_STATUS } = require('../common/constants')
const { checkAdmin, checkContentSecurity } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  const { mailId, reply, isPublic = false } = event

  if (!mailId || !reply) {
    return { success: false, message: '请填写回复内容' }
  }
  if (reply.length > 2000) {
    return { success: false, message: '回复内容不能超过2000字' }
  }

  try {
    // 回复内容安全检测
    const textCheck = await checkContentSecurity(reply, OPENID, { collection: 'secretary_mails', recordId: mailId })
    if (textCheck === false) {
      return { success: false, message: '回复内容包含违规信息' }
    }

    const now = new Date()
    await db.collection('secretary_mails').doc(mailId).update({
      data: {
        reply: reply,
        replyTime: now,
        repliedBy: OPENID,
        status: MAIL_STATUS.REPLIED,
        isPublic: isPublic,
        updateTime: now
      }
    })

    // 通知来信人
    const mail = await db.collection('secretary_mails').doc(mailId).get()
    if (mail.data.length > 0 && mail.data[0].senderOpenid) {
      await db.collection('messages').add({
        data: {
          type: 'secretary_reply',
          title: '书记给您回信了',
          content: reply.substring(0, 50),
          targetOpenid: mail.data[0].senderOpenid,
          recordId: mailId,
          isRead: false,
          createTime: now
        }
      }).catch(() => {})
    }

    // 写日志
    await db.collection('logs').add({
      data: {
        action: 'reply_secretary_mail',
        mailId: mailId,
        operator: OPENID,
        createTime: now
      }
    })

    return { success: true, message: '回复成功' }
  } catch (err) {
    console.error('[replySecretaryMail] 失败:', err)
    return { success: false, message: '回复失败' }
  }
}
