/**
 * cloudfunctions/updateDispatchMap/index.js - 更新分配地图
 * 用途：书记配置各类型工单对应的责任人（显示"姓名（管什么）"）
 * 入参：dispatchMap(对象，如{ "环境卫生": {openid,name,duty}, ... })
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
const { checkAdminWeight } = require('./common/checkAdmin')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { FEEDBACK_TYPES } = require('./common/constants')

// dispatchMap 允许的 key（与工单类型白名单一致）
const ALLOWED_MAP_KEYS = FEEDBACK_TYPES.concat(['其他'])

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  
  // 门槛统一：与代理层 updateModuleConfig 一致（weight≥90），防低权重绕过
  const isAdmin = await checkAdminWeight(OPENID, 90)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }
  
  const { dispatchMap } = event
  
  if (!dispatchMap || typeof dispatchMap !== 'object') {
    return fail('INVALID_PARAMS')
  }
  // 结构校验：key 限工单类型，元素字段限长
  for (const [key, val] of Object.entries(dispatchMap)) {
    if (!ALLOWED_MAP_KEYS.includes(key)) {
      return { success: false, message: `未知的工单类型：${key}` }
    }
    if (typeof val !== 'object' || !val) {
      return { success: false, message: `${key} 的配置格式无效` }
    }
    if (val.name && String(val.name).length > 20) {
      return { success: false, message: `${key} 责任人姓名过长` }
    }
    if (val.duty && String(val.duty).length > 30) {
      return { success: false, message: `${key} 职责描述过长` }
    }
    if (val.openid && String(val.openid).length > 64) {
      return { success: false, message: `${key} 责任人 openid 无效` }
    }
  }
  
  try {
    const now = new Date()
    
    // 查询feedback模块配置
    const existing = await db.collection('module_config')
      .where({ moduleKey: 'feedback' })
      .get()
    
    if (existing.data.length > 0) {
      // 更新
      await db.collection('module_config').doc(existing.data[0]._id).update({
        data: {
          dispatchMap: dispatchMap,
          updateTime: now
        }
      })
    } else {
      // 新增
      await db.collection('module_config').add({
        data: {
          moduleKey: 'feedback',
          moduleName: '村民反映',
          enabled: true,
          dispatchMap: dispatchMap,
          createTime: now,
          updateTime: now
        }
      })
    }
    
    // 写入操作日志
    await db.collection('logs').add({
      data: {
        action: 'update_dispatch_map',
        operator: OPENID,
        createTime: now
      }
    })
    
    return { success: true, message: '分配地图已更新' }
  } catch (err) {
    console.error('更新失败:', err)
    return { success: false, message: '更新失败' }
  }
}
