/**
 * cloudfunctions/updateModuleSwitch/index.js - 更新模块开关
 * 拆分自 updateModuleConfig
 * 入参：{ modules: { feedback: true, snapshot: false, ... } }
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { checkAdminWeight } = require('./common/checkAdmin')
const { writeLog } = require('./common/db')

// 允许开关的业务模块 key（功能配置如 village_info/subscribe_templates 不允许被开关，防误禁）
const ALLOWED_MODULE_KEYS = [
  'feedback', 'snapshot', 'notice', 'project',
  'market', 'task', 'team', 'news'
]

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  // 门槛统一：与代理层 updateModuleConfig 一致（weight≥90）
  const isAdmin = await checkAdminWeight(OPENID, 90)
  if (!isAdmin) return fail('FORBIDDEN')

  const { modules } = event
  if (!modules || typeof modules !== 'object') {
    return { success: false, message: 'modules 参数不正确' }
  }
  // key 白名单：拒绝创建/禁用任意配置项
  const safeModules = {}
  for (const [k, v] of Object.entries(modules)) {
    if (ALLOWED_MODULE_KEYS.includes(k)) safeModules[k] = v
  }
  if (Object.keys(safeModules).length === 0) {
    return { success: false, message: '无可更新的模块开关' }
  }

  const now = new Date()
  try {
    for (const [key, enabled] of Object.entries(safeModules)) {
      const existing = await db.collection('module_config').where({ moduleKey: key }).get()
      if (existing.data.length > 0) {
        await db.collection('module_config').doc(existing.data[0]._id).update({
          data: { enabled: !!enabled, updateTime: now }
        })
      } else {
        await db.collection('module_config').add({
          data: { moduleKey: key, enabled: !!enabled, createTime: now, updateTime: now }
        })
      }
    }
    await writeLog('update_module_switch', { operator: OPENID, modules: safeModules })
    return { success: true, message: '模块开关已保存' }
  } catch (err) {
    console.error('[updateModuleSwitch] 失败:', err)
    return { success: false, message: '保存失败' }
  }
}
