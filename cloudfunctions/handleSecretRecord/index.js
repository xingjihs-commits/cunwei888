/**
 * cloudfunctions/handleSecretRecord/index.js - 书记亲阅敏感件
 * 入参：recordId, action(mark_secret/resolve), note
 * 改造点：status 全中文
 */
const cloud = require('wx-server-sdk')
const { fail } = require('../common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { RECORD_STATUS, SUPERVISE_LEVEL } = require('../common/constants')
const { checkAdmin } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  const { recordId, action, note = '' } = event

  if (!recordId || !action) {
    return fail('INVALID_PARAMS')
  }

  try {
    const now = new Date()

    if (action === 'mark_secret') {
      await db.collection('records').doc(recordId).update({
        data: {
          isSecret: true,
          dispatchType: 'self',
          superviseLevel: SUPERVISE_LEVEL.SECRET,
          status: RECORD_STATUS.PROCESSING,
          assignee: '书记亲阅',
          assigneeName: '书记',
          assigneeDuty: '书记亲阅',
          dispatchTime: now,
          updateTime: now
        }
      })

      await db.collection('logs').add({
        data: {
          action: 'mark_secret',
          recordId: recordId,
          operator: OPENID,
          createTime: now
        }
      }).catch((e) => console.warn('[handleSecretRecord] 日志写入失败:', e && e.errMsg))

      return { success: true, message: '已标记为亲阅件' }

    } else if (action === 'resolve') {
      await db.collection('records').doc(recordId).update({
        data: {
          status: RECORD_STATUS.COMPLETED,
          reply: note,
          replyImages: [],
          handleDuration: 0,
          updateTime: now
        }
      })

      await db.collection('logs').add({
        data: {
          action: 'resolve_secret',
          recordId: recordId,
          operator: OPENID,
          createTime: now
        }
      }).catch((e) => console.warn('[handleSecretRecord] 日志写入失败:', e && e.errMsg))

      return { success: true, message: '亲阅件已处理完成' }

    } else {
      return { success: false, message: '未知操作类型' }
    }
  } catch (err) {
    console.error('[handleSecretRecord] 失败:', err)
    return { success: false, message: '操作失败' }
  }
}
