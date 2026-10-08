/**
 * cloudfunctions/updateModuleSwitch/index.js - 更新模块开关
 * 拆分自 updateModuleConfig
 * 入参：{ modules: { feedback: true, snapshot: false, ... } }
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { checkAdmin } = require('../common/checkAdmin')
const { writeLog } = require('../common/db')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) return { success: false, message: '无操作权限' }

  const { modules } = event
  if (!modules || typeof modules !== 'object') {
    return { success: false, message: 'modules 参数不正确' }
  }

  const now = new Date()
  try {
    for (const [key, enabled] of Object.entries(modules)) {
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
    await writeLog('update_module_switch', { operator: OPENID, modules })
    return { success: true, message: '模块开关已保存' }
  } catch (err) {
    console.error('[updateModuleSwitch] 失败:', err)
    return { success: false, message: '保存失败' }
  }
}
