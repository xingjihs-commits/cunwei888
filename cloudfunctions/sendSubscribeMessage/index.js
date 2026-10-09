/**
 * cloudfunctions/sendSubscribeMessage/index.js - 发送订阅消息
 * 改造点：
 *   1. 模板 ID 从 module_config 动态加载（避免硬编码占位符）
 *   2. 找不到模板时跳过并记录日志，不阻断业务
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { isInternalCall } = require('../common/internal')

// 默认模板 ID 映射（如未在 module_config 配置则用这里的占位）
// 上线前需在 module_config 表 subscribe_templates 字段配置真实模板 ID
const DEFAULT_TEMPLATES = {
  new_feedback: '',
  status_update: '',
  new_task: '',
  price_update: '',
  overdue_reminder: '',
  dispatch_notice: '',
  overdue_escalation: ''
}

// 内存缓存（云函数实例级）
let _templateCache = null
let _templateCacheTime = 0
const CACHE_TTL = 5 * 60 * 1000  // 5 分钟

async function loadTemplates() {
  // 用缓存避免每次都查库
  const now = Date.now()
  if (_templateCache && (now - _templateCacheTime) < CACHE_TTL) {
    return _templateCache
  }
  try {
    const res = await db.collection('module_config')
      .where({ moduleKey: 'subscribe_templates' })
      .get()
    if (res.data.length > 0 && res.data[0].templates) {
      _templateCache = { ...DEFAULT_TEMPLATES, ...res.data[0].templates }
    } else {
      _templateCache = DEFAULT_TEMPLATES
    }
  } catch (e) {
    console.warn('[sendSubscribeMessage] 加载模板配置失败:', e && e.errMsg)
    _templateCache = DEFAULT_TEMPLATES
  }
  _templateCacheTime = now
  return _templateCache
}

exports.main = async (event, context) => {
  // 仅允许云函数内部互调，拒绝前端直接调用（防订阅消息轰炸）
  if (!isInternalCall(event)) {
    return { success: false, message: '无权调用', code: 'FORBIDDEN' }
  }

  const { type, recordId, targetOpenid, targetRole, ...data } = event

  const TEMPLATES = await loadTemplates()
  const templateId = TEMPLATES[type]

  if (!templateId) {
    // 模板未配置，跳过并记录日志，不阻断业务
    console.warn(`[sendSubscribeMessage] 模板未配置：${type}，请在 module_config.subscribe_templates 中配置`)
    await db.collection('logs').add({
      data: {
        action: 'subscribe_message_skip',
        type: type,
        reason: 'template_not_configured',
        createTime: new Date()
      }
    }).catch(() => {})
    return { success: true, sent: 0, message: '模板未配置，已跳过' }
  }

  try {
    let openids = []

    if (targetOpenid) {
      openids = [targetOpenid]
    } else if (targetRole === 'secretary') {
      const admins = await db.collection('admins').where({ enabled: true }).get()
      openids = admins.data.map(a => a._openid)
    } else if (type === 'new_feedback') {
      const admins = await db.collection('admins').where({ enabled: true }).get()
      openids = admins.data.map(a => a._openid)
    } else if (type === 'status_update' && recordId) {
      const record = await db.collection('records').doc(recordId).get()
      if (record.data.length > 0) openids = [record.data[0]._openid]
    } else if (type === 'price_update' && data.productName) {
      const subs = await db.collection('subscriptions').where({ productName: data.productName, type: 'price_alert' }).get()
      openids = subs.data.map(s => s._openid)
    }

    let sent = 0
    for (const openid of openids) {
      try {
        await cloud.openapi.subscribeMessage.send({
          touser: openid,
          templateId: templateId,
          page: 'pages/admin/feedback-list',
          data: buildMessageData(type, data)
        })
        sent++
      } catch (e) {
        console.warn(`[sendSubscribeMessage] 发送给${openid}失败:`, e && e.errMsg)
      }
    }

    return { success: true, sent: sent }
  } catch (err) {
    console.error('[sendSubscribeMessage] 失败:', err)
    return { success: false, message: '发送失败' }
  }
}

function buildMessageData(type, data) {
  const now = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })

  if (type === 'new_feedback') {
    return {
      thing1: { value: (data.title || '新工单').substring(0, 20) },
      time2: { value: now },
      thing3: { value: '请尽快处理' }
    }
  } else if (type === 'status_update') {
    return {
      thing1: { value: '您的反映' },
      phrase2: { value: data.status || '已更新' },
      time3: { value: now }
    }
  } else if (type === 'new_task' || type === 'dispatch_notice') {
    return {
      thing1: { value: (data.title || '新工单').substring(0, 20) },
      thing2: { value: (data.content || '').substring(0, 20) },
      time3: { value: data.deadline || now },
      thing4: { value: (data.note || '无批示').substring(0, 20) }
    }
  } else if (type === 'price_update') {
    return {
      thing1: { value: data.productName || '' },
      amount2: { value: data.price + '元' },
      time3: { value: now }
    }
  } else if (type === 'overdue_reminder') {
    return {
      thing1: { value: '工单超时提醒' },
      time2: { value: now },
      thing3: { value: (data.title || '工单').substring(0, 20) }
    }
  } else if (type === 'overdue_escalation') {
    return {
      thing1: { value: (data.title || '超时工单').substring(0, 20) },
      thing2: { value: (data.content || '').substring(0, 20) },
      number3: { value: String(data.overdueDays || 3) }
    }
  }
  return {}
}
