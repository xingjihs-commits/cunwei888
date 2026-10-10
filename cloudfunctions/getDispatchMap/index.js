/**
 * cloudfunctions/getDispatchMap/index.js - 获取分配地图
 * 用途：查询各类型工单对应的责任人配置
 * 入参：无
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

// 默认分配地图（数据库未配置时返回）
const DEFAULT_MAP = {
  '环境卫生': { openid: '', name: '村委委员', duty: '管环境卫生' },
  '道路水利': { openid: '', name: '村委委员', duty: '管道路水利' },
  '矛盾纠纷': { openid: '', name: '治保主任', duty: '管矛盾纠纷' },
  '干部作风': { openid: '', name: '书记', duty: '书记亲阅' },
  '安全隐患': { openid: '', name: '村委委员', duty: '管安全隐患' },
  '其他': { openid: '', name: '村主任', duty: '村主任兜底' }
}

exports.main = async (event, context) => {
  try {
    const res = await db.collection('module_config')
      .where({ moduleKey: 'feedback' })
      .get()
    
    if (res.data.length > 0 && res.data[0].dispatchMap) {
      return { success: true, data: res.data[0].dispatchMap }
    }
    
    // 返回默认配置
    return { success: true, data: DEFAULT_MAP }
  } catch (err) {
    console.error('查询失败:', err)
    // 降级返回默认配置（degraded 供前端感知非权威数据）
    return { success: true, degraded: true, data: DEFAULT_MAP }
  }
}
