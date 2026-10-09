/**
 * cloudfunctions/publishNews/index.js - 发布村务新闻
 * 改造点：内容安全 + 图片安全
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { checkAdmin, checkContentSecurity, checkImageSecurity, checkImagesSecurity } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { title, content, category, coverImage, images = [], source = '村委办', isTop = false } = event

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, message: '无发布权限' }
  }

  if (!title || !content) {
    return { success: false, message: '请填写完整信息' }
  }
  if (title.length > 50) {
    return { success: false, message: '标题不能超过50字' }
  }
  if (content.length > 5000) {
    return { success: false, message: '内容不能超过5000字' }
  }

  try {
    // 1. 文本内容安全
    const textCheck = await checkContentSecurity(title + '\n' + content, OPENID, { collection: 'news' })
    if (textCheck === false) {
      return { success: false, message: '内容包含违规信息' }
    }
    // 2. 封面图安全
    if (coverImage) {
      const imgCheck = await checkImageSecurity(coverImage, { collection: 'news' })
      if (imgCheck === false) {
        return { success: false, message: '封面图包含违规内容' }
      }
    }
    // 3. 内容图片安全（并行检测）
    if (images && images.length) {
      const imgRes = await checkImagesSecurity(images, { collection: 'news' })
      if (!imgRes.ok) {
        return { success: false, message: '图片包含违规内容' }
      }
    }

    const now = new Date()
    const res = await db.collection('news').add({
      data: {
        title: title,
        content: content,
        category: category || '村务',
        coverImage: coverImage || '',
        images: images,
        source: source,
        isTop: isTop,
        viewCount: 0,
        likeCount: 0,
        likeUsers: [],
        auditStatus: textCheck === 'review' ? '待复审' : '',
        publisher: OPENID,
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    return { success: true, id: res._id, message: '新闻发布成功' }
  } catch (err) {
    console.error('[publishNews] 失败:', err)
    return { success: false, message: '发布失败' }
  }
}
