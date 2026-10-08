/**
 * cloudfunctions/updateDispatchMap/index.js - 更新分配地图
 * 用途：书记配置各类型工单对应的责任人（显示"姓名（管什么）"）
 * 入参：dispatchMap(对象，如{ "环境卫生": {openid,name,duty}, ... })
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  
  // 校验管理员权限
  const checkAdmin = require('../common/checkAdmin')
  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, message: '无操作权限' }
  }
  
  const { dispatchMap } = event
  
  if (!dispatchMap || typeof dispatchMap !== 'object') {
    return { success: false, message: '参数不完整' }
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
