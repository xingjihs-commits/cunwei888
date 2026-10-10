/**
 * cloudfunctions/getNoticeDetail/index.js - 公示详情
 * 用途：获取公示详情，阅读量+1（待复审内容不对村民公开）
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
const { pluckDoc } = require('./common/docUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { noticeId } = event

  if (!noticeId) {
    return fail('INVALID_PARAMS')
  }

  try {
    // 阅读量+1
    await db.collection('notices').doc(noticeId).update({
      data: { viewCount: _.inc(1) }
    })

    const res = await db.collection('notices').doc(noticeId).get()
    const doc = pluckDoc(res)
    if (!doc || doc.auditStatus === '待复审') {
      return { success: false, message: '公示不存在' }
    }

    return { success: true, data: doc }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, message: '查询失败' }
  }
}
