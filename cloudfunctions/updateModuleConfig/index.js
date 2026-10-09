/**
 * cloudfunctions/updateModuleConfig/index.js - 模块配置统一入口（代理层）
 * 改造点：拆分为 4 个独立云函数后，本函数仅做参数分发；并新增 3 类配置
 * 实际职责：
 *   - villageInfo / villageName / villagePhone / icpNumber / policeIcpNumber / emergencyPhones
 *       → 调用 updateVillageInfo
 *   - modules → 调用 updateModuleSwitch
 *   - subscribeTemplates / templates → 调用 updateSubscribeTemplates
 *   - dispatchMap / feedbackTypes / snapshotTypes → 本地处理（仍保留原逻辑）
 *   - displayNames → 本地 upsert moduleKey='display_names'
 *   - uiModules → 本地 upsert moduleKey='ui_modules'
 *   - phones → 本地 upsert moduleKey='village_info' 的 config.phones
 */
const cloud = require('wx-server-sdk')
const { fail } = require('../common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { checkAdmin } = require('../common/checkAdmin')
const { writeLog } = require('../common/db')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) return fail('FORBIDDEN')

  const {
    villageName, villagePhone, villageInfo = {},
    modules = {},
    emergencyPhones = [],
    feedbackTypes = null, snapshotTypes = null,
    dispatchMap = null,
    subscribeTemplates = null, templates = null,
    displayNames = null,
    uiModules = null,
    phones = null
  } = event

  const now = new Date()
  const results = []

  // 1. 村基础信息 → updateVillageInfo
  const villageData = {}
  if (villageName) villageData.villageName = villageName
  if (villagePhone) villageData.villagePhone = villagePhone
  if (villageInfo.villageName) villageData.villageName = villageInfo.villageName
  if (villageInfo.villagePhone) villageData.villagePhone = villageInfo.villagePhone
  if (villageInfo.icpNumber !== undefined) villageData.icpNumber = villageInfo.icpNumber
  if (villageInfo.policeIcpNumber !== undefined) villageData.policeIcpNumber = villageInfo.policeIcpNumber
  if (emergencyPhones.length > 0) villageData.emergencyPhones = emergencyPhones
  if (villageInfo.office_hours !== undefined) villageData.office_hours = villageInfo.office_hours
  if (villageInfo.office_address !== undefined) villageData.office_address = villageInfo.office_address
  if (villageInfo.duty_phone !== undefined) villageData.duty_phone = villageInfo.duty_phone
  if (villageInfo.county_code !== undefined) villageData.county_code = villageInfo.county_code
  if (Object.keys(villageData).length > 0) {
    try {
      const res = await cloud.callFunction({ name: 'updateVillageInfo', data: villageData })
      results.push('villageInfo: ' + (res.result.success ? 'OK' : res.result.message))
    } catch (e) { results.push('villageInfo: 失败') }
  }

  // 2. 模块开关（旧扁平）→ updateModuleSwitch
  if (Object.keys(modules).length > 0) {
    try {
      const res = await cloud.callFunction({ name: 'updateModuleSwitch', data: { modules } })
      results.push('modules: ' + (res.result.success ? 'OK' : res.result.message))
    } catch (e) { results.push('modules: 失败') }
  }

  // 3. 订阅模板 → updateSubscribeTemplates
  const tmpl = subscribeTemplates || templates
  if (tmpl) {
    try {
      const res = await cloud.callFunction({ name: 'updateSubscribeTemplates', data: { templates: tmpl } })
      results.push('subscribeTemplates: ' + (res.result.success ? 'OK' : res.result.message))
    } catch (e) { results.push('subscribeTemplates: 失败') }
  }

  // 4. dispatchMap / feedbackTypes / snapshotTypes → 本地处理
  if (feedbackTypes || dispatchMap) {
    try {
      const existing = await db.collection('module_config').where({ moduleKey: 'feedback' }).get()
      const updateData = { updateTime: now }
      if (feedbackTypes) updateData.feedbackTypes = feedbackTypes
      if (dispatchMap) updateData.dispatchMap = dispatchMap
      if (existing.data.length > 0) {
        await db.collection('module_config').doc(existing.data[0]._id).update({ data: updateData })
      } else {
        await db.collection('module_config').add({
          data: { moduleKey: 'feedback', enabled: true, ...updateData, createTime: now }
        })
      }
      results.push('feedbackConfig: OK')
    } catch (e) { results.push('feedbackConfig: 失败') }
  }

  if (snapshotTypes) {
    try {
      const existing = await db.collection('module_config').where({ moduleKey: 'snapshot' }).get()
      if (existing.data.length > 0) {
        await db.collection('module_config').doc(existing.data[0]._id).update({ data: { snapshotTypes, updateTime: now } })
      } else {
        await db.collection('module_config').add({
          data: { moduleKey: 'snapshot', enabled: true, snapshotTypes, createTime: now, updateTime: now }
        })
      }
      results.push('snapshotConfig: OK')
    } catch (e) { results.push('snapshotConfig: 失败') }
  }

  // 5. 展示名称（display_names）
  if (displayNames) {
    try {
      const existing = await db.collection('module_config').where({ moduleKey: 'display_names' }).get()
      if (existing.data.length > 0) {
        await db.collection('module_config').doc(existing.data[0]._id).update({ data: { config: { names: displayNames }, updateTime: now } })
      } else {
        await db.collection('module_config').add({
          data: { moduleKey: 'display_names', enabled: true, config: { names: displayNames }, createTime: now, updateTime: now }
        })
      }
      results.push('displayNames: OK')
    } catch (e) { results.push('displayNames: 失败') }
  }

  // 6. 模块开关（嵌套 modules）
  if (uiModules) {
    try {
      const existing = await db.collection('module_config').where({ moduleKey: 'modules' }).get()
      if (existing.data.length > 0) {
        await db.collection('module_config').doc(existing.data[0]._id).update({ data: { config: { switches: uiModules }, updateTime: now } })
      } else {
        await db.collection('module_config').add({
          data: { moduleKey: 'modules', enabled: true, config: { switches: uiModules }, createTime: now, updateTime: now }
        })
      }
      results.push('uiModules: OK')
    } catch (e) { results.push('uiModules: 失败') }
  }

  // 7. 常用电话（village_info.config.phones）
  if (Array.isArray(phones)) {
    try {
      const existing = await db.collection('module_config').where({ moduleKey: 'village_info' }).get()
      if (existing.data.length > 0) {
        const cur = existing.data[0].config || {}
        await db.collection('module_config').doc(existing.data[0]._id).update({
          data: { config: { ...cur, phones }, updateTime: now }
        })
      } else {
        await db.collection('module_config').add({
          data: { moduleKey: 'village_info', enabled: true, config: { phones }, createTime: now, updateTime: now }
        })
      }
      results.push('phones: OK')
    } catch (e) { results.push('phones: 失败') }
  }

  await writeLog('update_module_config', { operator: OPENID, results })
  return { success: true, message: '配置已保存', results }
}
