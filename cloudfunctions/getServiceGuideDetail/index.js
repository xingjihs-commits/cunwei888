/**
 * cloudfunctions/getServiceGuideDetail/index.js - 办事指南详情
 * 用途：查询办事指南详情，阅读量+1
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
const { pluckDoc } = require('./common/docUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { guideId } = event
  
  if (!guideId) {
    return fail('INVALID_PARAMS')
  }
  
  try {
    await db.collection('service_guides').doc(guideId).update({
      data: { viewCount: _.inc(1) }
    })
    
    const res = await db.collection('service_guides').doc(guideId).get()
    const guide = pluckDoc(res)
    if (!guide || guide.auditStatus === '待复审') {
      return { success: false, message: '指南不存在' }
    }
    
    return { success: true, data: guide }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, message: '查询失败' }
  }
}
