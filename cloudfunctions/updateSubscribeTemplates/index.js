/**
 * cloudfunctions/updateSubscribeTemplates/index.js - 更新订阅消息模板 ID
 * 拆分自 updateModuleConfig
 * 入参：{ templates: { new_feedback: 'tmpl_xxx', status_update: 'tmpl_yyy', ... } }
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { checkAdmin } = require('../common/checkAdmin')
const { writeLog } = require('../common/db')

// 7 个允许的模板 key
const ALLOWED_TEMPLATE_KEYS = [
  'new_feedback', 'status_update', 'new_task', 'price_update',
  'overdue_reminder', 'dispatch_notice', 'overdue_escalation'
]

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) return { success: false, message: '无操作权限' }

  const { templates } = event
  if (!templates || typeof templates !== 'object') {
    return { success: false, message: 'templates 参数不正确' }
  }

  // 过滤非法 key
  const safeTemplates = {}
  for (const [k, v] of Object.entries(templates)) {
    if (ALLOWED_TEMPLATE_KEYS.includes(k) && typeof v === 'string') {
      safeTemplates[k] = v
    }
  }

  const now = new Date()
  try {
    const existing = await db.collection('module_config').where({ moduleKey: 'subscribe_templates' }).get()
    if (existing.data.length > 0) {
      const old = existing.data[0].templates || {}
      await db.collection('module_config').doc(existing.data[0]._id).update({
        data: { templates: { ...old, ...safeTemplates }, updateTime: now }
      })
    } else {
      await db.collection('module_config').add({
        data: { moduleKey: 'subscribe_templates', enabled: true, templates: safeTemplates, createTime: now, updateTime: now }
      })
    }
    await writeLog('update_subscribe_templates', { operator: OPENID })
    return { success: true, message: '订阅模板配置已保存' }
  } catch (err) {
    console.error('[updateSubscribeTemplates] 失败:', err)
    return { success: false, message: '保存失败' }
  }
}
