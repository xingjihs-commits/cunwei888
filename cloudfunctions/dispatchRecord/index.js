/**
 * cloudfunctions/dispatchRecord/index.js - 书记手动分配工单
 * 入参：recordId, assigneeOpenid, assigneeName, assigneeDuty, note
 * 改造点：superviseLevel 用中文'督办'
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { RECORD_STATUS, SUPERVISE_LEVEL } = require('../common/constants')
const { checkAdmin } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, message: '无操作权限' }
  }

  const { recordId, assigneeOpenid, assigneeName, assigneeDuty, note = '' } = event

  if (!recordId || !assigneeOpenid || !assigneeName) {
    return { success: false, message: '参数不完整' }
  }

  try {
    const now = new Date()

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

    // 查询工单详情用于通知
    const record = await db.collection('records').doc(recordId).get()
    const r = record.data[0]

    try {
      await cloud.callFunction({
        name: 'sendDispatchNotice',
        data: {
          recordId: recordId,
          assigneeOpenid: assigneeOpenid,
          type: r.type,
          urgentLevel: r.urgentLevel || '普通',
          handleDeadline: r.handleDeadline,
          note: note
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
    })

    return { success: true, message: `已分配给${assigneeName}（${assigneeDuty || ''}）` }
  } catch (err) {
    console.error('[dispatchRecord] 分配失败:', err)
    return { success: false, message: '分配失败' }
  }
}
