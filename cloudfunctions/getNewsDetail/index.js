/**
 * cloudfunctions/getNewsDetail/index.js - 新闻详情
 * 用途：获取新闻详情，阅读量+1（待复审内容不对村民公开）
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
const { pluckDoc } = require('./common/docUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { newsId } = event

  if (!newsId) {
    return fail('INVALID_PARAMS')
  }

  try {
    await db.collection('news').doc(newsId).update({
      data: { viewCount: _.inc(1) }
    })

    const res = await db.collection('news').doc(newsId).get()
    const doc = pluckDoc(res)
    if (!doc || doc.auditStatus === '待复审') {
      return { success: false, message: '新闻不存在' }
    }

    return { success: true, data: doc }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, message: '查询失败' }
  }
}
