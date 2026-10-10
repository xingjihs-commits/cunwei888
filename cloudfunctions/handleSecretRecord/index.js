/**
 * cloudfunctions/handleSecretRecord/index.js - 书记亲阅敏感件
 * 入参：recordId, action(mark_secret/resolve), note
 * 改造点：status 全中文
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { RECORD_STATUS, SUPERVISE_LEVEL } = require('./common/constants')
const { checkAdmin, checkSecretary } = require('./common/checkAdmin')
const { pluckDoc } = require('./common/docUtils')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  // 双重校验：必须是管理员且必须是书记（亲阅件专属操作）
  const isAdmin = await checkAdmin(OPENID)
  const isSecretary = await checkSecretary(OPENID)
  if (!isAdmin || !isSecretary) {
    return fail('FORBIDDEN')
  }

  const { recordId, action, note = '' } = event

  if (!recordId || !action) {
    return fail('INVALID_PARAMS')
  }

  try {
    const now = new Date()

    // 校验记录存在（防 update 静默成功）
    const record = pluckDoc(await db.collection('records').doc(recordId).get())
    if (!record) {
      return { success: false, message: '工单不存在' }
    }

    if (action === 'mark_secret') {
      // 标记亲阅：清空原 assigneeOpenid，防止原责任人仍可通过 assignee 分支查看
      await db.collection('records').doc(recordId).update({
        data: {
          isSecret: true,
          dispatchType: 'self',
          superviseLevel: SUPERVISE_LEVEL.SECRET,
          status: RECORD_STATUS.PROCESSING,
          assignee: '书记亲阅',
          assigneeName: '书记',
          assigneeDuty: '书记亲阅',
          assigneeOpenid: '',
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
          handleDuration: Math.round((now - new Date(record.createTime)) / (1000 * 60 * 60) * 10) / 10,
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
