/**
 * cloudfunctions/sendDispatchNotice/index.js - 给责任人发派单通知
 * 用途：工单分配后通知责任人，含类型、紧急程度、内容摘要、处理时限、批示
 * 入参：recordId, assigneeOpenid, type, urgentLevel, handleDeadline, note
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
const { pluckDoc } = require('./common/docUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { isInternalCall, INTERNAL_TOKEN } = require('./common/internal')

exports.main = async (event, context) => {
  // 仅允许云函数内部互调，拒绝前端直接调用（防伪造派单通知）
  if (!isInternalCall(event)) {
    return { success: false, message: '无权调用', code: 'FORBIDDEN' }
  }

  const { recordId, assigneeOpenid, type, urgentLevel, handleDeadline, note = '' } = event
  
  if (!recordId || !assigneeOpenid) {
    return fail('INVALID_PARAMS')
  }
  
  try {
    // 查询工单摘要
    const recordRes = await db.collection('records').doc(recordId).get()
    const r = pluckDoc(recordRes)
    if (!r) {
      return { success: false, message: '工单不存在' }
    }
    
    // 组装通知内容
    const urgentText = { normal: '一般', urgent: '紧急', critical: '特急' }[urgentLevel] || '一般'
    const deadlineText = handleDeadline 
      ? new Date(handleDeadline).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
      : ''
    
    // 写入消息通知（消息中心）
    await db.collection('messages').add({
      data: {
        type: 'dispatch_notice',
        title: `新工单待处理：${type}`,
        content: `紧急程度：${urgentText} | 内容：${(r.content || '').substring(0, 30)}`,
        targetOpenid: assigneeOpenid,
        recordId: recordId,
        isRead: false,
        createTime: new Date()
      }
    })
    
    // 调用订阅消息发送
    try {
      await cloud.callFunction({
        name: 'sendSubscribeMessage',
        data: {
          type: 'new_task',
          recordId: recordId,
          assigneeOpenid: assigneeOpenid,
          title: `${type}·${urgentText}`,
          content: (r.content || '').substring(0, 30),
          deadline: deadlineText,
          note: note,
          _internal: INTERNAL_TOKEN
        }
      })
    } catch (e) { console.warn('订阅消息发送跳过:', e && e.errMsg) }
    
    return { success: true, message: '通知已发送' }
  } catch (err) {
    console.error('派单通知失败:', err)
    return { success: false, message: '通知失败' }
  }
}
