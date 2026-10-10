/**
 * cloudfunctions/dispatchRecord/index.js - 书记手动分配工单
 * 入参：recordId, assigneeOpenid, assigneeName, assigneeDuty, note
 * 改造点：superviseLevel 用中文'督办'
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
const { pluckDoc } = require('./common/docUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { RECORD_STATUS, SUPERVISE_LEVEL } = require('./common/constants')
const { checkAdmin, checkSecretary } = require('./common/checkAdmin')
const { INTERNAL_TOKEN } = require('./common/internal')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  const { recordId, assigneeOpenid, assigneeName, assigneeDuty, note = '' } = event

  if (!recordId || !assigneeOpenid || !assigneeName) {
    return fail('INVALID_PARAMS')
  }

  try {
    const now = new Date()

    // 校验记录存在（防止 update 静默成功造成假反馈）
    const recordRes = await db.collection('records').doc(recordId).get()
    const record = pluckDoc(recordRes)
    if (!record) {
      return { success: false, message: '工单不存在' }
    }

    // 亲阅件保护：重新派单会把 isSecret 洗掉，仅书记可操作
    if (record.isSecret) {
      const isSecretary = await checkSecretary(OPENID)
      if (!isSecretary) {
        return { success: false, message: '亲阅件仅书记可重新派单' }
      }
    }

    await db.collection('records').doc(recordId).update({
      data: {
        assignee: assigneeName,
        assigneeOpenid: assigneeOpenid,
        assigneeName: assigneeName,
        assigneeDuty: assigneeDuty || '',
        assigneeRole: '',
        dispatchType: 'manual',
        dispatchNote: note,
        dispatchTime: now,
        status: RECORD_STATUS.PROCESSING,
        isSecret: false,
        superviseLevel: SUPERVISE_LEVEL.SUPERVISE,
        updateTime: now
      }
    })

    // 直接用已读记录组装通知（不再二次 get）
    try {
      await cloud.callFunction({
        name: 'sendDispatchNotice',
        data: {
          recordId: recordId,
          assigneeOpenid: assigneeOpenid,
          type: record.type,
          urgentLevel: record.urgentLevel || '普通',
          handleDeadline: record.handleDeadline,
          note: note,
          _internal: INTERNAL_TOKEN
        }
      })
    } catch (e) {
      console.warn('[dispatchRecord] 通知发送失败:', e && e.errMsg)
    }

    await db.collection('logs').add({
      data: {
        action: 'dispatch_record',
        recordId: recordId,
        assigneeName: assigneeName,
        assigneeDuty: assigneeDuty,
        operator: OPENID,
        note: note,
        createTime: now
      }
    }).catch((e) => console.warn('[dispatchRecord] 日志写入失败:', e && e.errMsg))

    return { success: true, message: `已分配给${assigneeName}（${assigneeDuty || ''}）` }
  } catch (err) {
    console.error('[dispatchRecord] 分配失败:', err)
    return { success: false, message: '分配失败' }
  }
}
