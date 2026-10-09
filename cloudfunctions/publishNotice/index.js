/**
 * cloudfunctions/publishNotice/index.js - 发布公示
 * 改造点：内容安全 + 图片安全
 */
const cloud = require('wx-server-sdk')
const { fail } = require('../common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { checkAdmin, checkContentSecurity, checkImagesSecurity } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { title, content, category, images = [], attachments = [], responsible = '', audited = false } = event

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  if (!title || !content || !category) {
    return { success: false, message: '请填写完整信息' }
  }
  if (title.length > 50) {
    return { success: false, message: '标题不能超过50字' }
  }

  try {
    const textCheck = await checkContentSecurity(title + '\n' + content, OPENID, { collection: 'notices' })
    if (textCheck === false) {
      return { success: false, message: '内容包含违规信息' }
    }
    if (images && images.length) {
      const imgRes = await checkImagesSecurity(images, { collection: 'notices' })
      if (!imgRes.ok) {
        return { success: false, message: '图片包含违规内容' }
      }
    }

    const now = new Date()
    const year = now.getFullYear()

    const res = await db.collection('notices').add({
      data: {
        title: title,
        content: content,
        category: category,
        images: images,
        attachments: attachments,
        responsible: responsible,
        audited: audited,
        year: year,
        viewCount: 0,
        auditStatus: textCheck === 'review' ? '待复审' : '',
        publisher: OPENID,
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    return { success: true, id: res._id, message: '公示发布成功' }
  } catch (err) {
    console.error('[publishNotice] 失败:', err)
    return { success: false, message: '发布失败' }
  }
}
