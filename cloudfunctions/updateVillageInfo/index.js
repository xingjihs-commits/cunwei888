/**
 * cloudfunctions/updateVillageInfo/index.js - 更新村基础信息
 * 拆分自 updateModuleConfig（212 行 → 4 个独立函数，每个 ≤80 行）
 * 入参：{ villageName, villagePhone, icpNumber, policeIcpNumber, emergencyPhones }
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { checkAdminWeight, checkContentSecurity } = require('./common/checkAdmin')
const { writeLog } = require('./common/db')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  // 门槛统一：与代理层 updateModuleConfig 一致（weight≥90），防低权重管理员绕过
  const isAdmin = await checkAdminWeight(OPENID, 90)
  if (!isAdmin) return fail('FORBIDDEN')

  const {
    villageName, villagePhone, icpNumber, policeIcpNumber, emergencyPhones,
    office_hours, office_address, duty_phone, county_code
  } = event
  if (!villageName && !villagePhone && !icpNumber && !policeIcpNumber && !emergencyPhones &&
    office_hours === undefined && office_address === undefined &&
    duty_phone === undefined && county_code === undefined) {
    return { success: false, message: '无更新字段' }
  }

  // 字段限长校验
  const LEN_RULES = [
    ['villageName', 30], ['villagePhone', 20], ['icpNumber', 40],
    ['policeIcpNumber', 40], ['office_hours', 50], ['office_address', 60],
    ['duty_phone', 20], ['county_code', 10]
  ]
  for (const [field, max] of LEN_RULES) {
    const v = event[field]
    if (v !== undefined && v !== null && String(v).length > max) {
      return { success: false, message: `${field} 不能超过 ${max} 字` }
    }
  }
  if (emergencyPhones !== undefined) {
    if (!Array.isArray(emergencyPhones) || emergencyPhones.length > 20) {
      return { success: false, message: '紧急电话列表无效（最多20项）' }
    }
    for (const p of emergencyPhones) {
      if (!p || typeof p !== 'object' || !p.name || !p.number) {
        return { success: false, message: '紧急电话格式无效（需含 name/number）' }
      }
      if (String(p.name).length > 10 || String(p.number).length > 20) {
        return { success: false, message: '紧急电话名称或号码过长' }
      }
    }
  }

  // 村名内容安全
  if (villageName) {
    const check = await checkContentSecurity(villageName, OPENID, { collection: 'module_config' })
    if (check.result === false) return { success: false, message: '村名包含违规信息' }
  }

  const now = new Date()
  const configData = {}
  if (villageName) configData.villageName = villageName
  if (villagePhone) configData.villagePhone = villagePhone
  if (icpNumber !== undefined) configData.icpNumber = icpNumber
  if (policeIcpNumber !== undefined) configData.policeIcpNumber = policeIcpNumber
  if (emergencyPhones) configData.emergencyPhones = emergencyPhones
  if (office_hours !== undefined) configData.office_hours = office_hours
  if (office_address !== undefined) configData.office_address = office_address
  if (duty_phone !== undefined) configData.duty_phone = duty_phone
  if (county_code !== undefined) configData.county_code = county_code

  try {
    const existing = await db.collection('module_config').where({ moduleKey: 'village_info' }).get()
    if (existing.data.length > 0) {
      const oldConfig = existing.data[0].config || {}
      await db.collection('module_config').doc(existing.data[0]._id).update({
        data: { config: { ...oldConfig, ...configData }, updateTime: now }
      })
    } else {
      await db.collection('module_config').add({
        data: { moduleKey: 'village_info', enabled: true, config: configData, createTime: now, updateTime: now }
      })
    }
    await writeLog('update_village_info', { operator: OPENID })
    return { success: true, message: '村信息已保存' }
  } catch (err) {
    console.error('[updateVillageInfo] 失败:', err)
    return { success: false, message: '保存失败' }
  }
}
