/**
 * cloudfunctions/publishLostFound/index.js - 发布失物招领
 * 改造点：status 全中文（进行中/已结束），内容安全已具备
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { LOST_FOUND_STATUS } = require('../common/constants')
const { checkContentSecurity } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { type, title, content, images = [], contactInfo = '', location = '' } = event

  // type: '寻物' / '招领'
  if (!type || !title || !content) {
    return { success: false, message: '请填写完整信息' }
  }
  if (title.length > 50) {
    return { success: false, message: '标题不能超过50字' }
  }
  if (content.length > 500) {
    return { success: false, message: '内容不能超过500字' }
  }

  try {
    if (content) {
      const isSafe = await checkContentSecurity(content, OPENID, { collection: 'records' })
      if (isSafe === false) return { success: false, message: '内容包含违规信息' }
    }

    const now = new Date()
    const res = await db.collection('records').add({
      data: {
        type: '失物招领',
        subType: type, // type 是中文 '寻物' 或 '招领'
        title: title,
        content: content,
        images: images,
        location: location,
        contactInfo: contactInfo,
        status: LOST_FOUND_STATUS.OPEN,
        isPublic: true,
        likeCount: 0,
        likeUsers: [],
        extra: { category: 'lost_found' },
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    return { success: true, id: res._id, message: '发布成功' }
  } catch (err) {
    console.error('[publishLostFound] 失败:', err)
    return { success: false, message: '发布失败' }
  }
}
