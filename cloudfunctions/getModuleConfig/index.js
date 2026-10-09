/**
 * cloudfunctions/getModuleConfig/index.js - 获取模块配置
 * 用途：查询村务配置（模块开关 / 展示名称 / 常用电话 / 村基础信息）
 * 返回结构：
 *   { success, data: {
 *       modules: { <moduleKey>: enabled },   // 兼容旧的扁平开关
 *       uiModules: { tab, category, entry, homeBlock },  // 新嵌套开关
 *       displayNames: { tab, category, subCategory, entry, pageTitle, button, status, messageType, menuGroup, emptyState, phone },
 *       phones: [{ key, name, number }],
 *       villageName, villagePhone, icpNumber, policeIcpNumber
 *   }}
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const res = await db.collection('module_config').where({ enabled: true }).get()

    // 转为键值对
    const config = { modules: {} }
    for (const item of res.data) {
      config.modules[item.moduleKey] = item.enabled
      if (item.config) {
        Object.assign(config, item.config)
      }

      // 展示名称（moduleKey = display_names）
      if (item.moduleKey === 'display_names' && item.config && item.config.names) {
        config.displayNames = item.config.names
      }

      // 模块开关（嵌套，moduleKey = modules）
      if (item.moduleKey === 'modules' && item.config && item.config.switches) {
        config.uiModules = item.config.switches
      }

      // 村基础信息 + 常用电话
      if (item.moduleKey === 'village_info' && item.config) {
        const c = item.config
        config.villageName = c.villageName || config.villageName || '示范村'
        config.villagePhone = c.villagePhone || config.villagePhone || ''
        if (c.icpNumber !== undefined) config.icpNumber = c.icpNumber
        if (c.policeIcpNumber !== undefined) config.policeIcpNumber = c.policeIcpNumber
        if (Array.isArray(c.phones)) config.phones = c.phones
        if (Array.isArray(c.emergencyPhones)) config.emergencyPhones = c.emergencyPhones
      }

      // 订阅消息模板（moduleKey = subscribe_templates）
      if (item.moduleKey === 'subscribe_templates' && item.templates) {
        config.subscribeTemplates = item.templates
      }
    }

    return { success: true, data: config }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: true, data: { modules: {} } }
  }
}
