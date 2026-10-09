/**
 * cloudfunctions/publishProject/index.js - 发布项目收益
 * 改造点：内容安全
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { checkAdmin, checkContentSecurity, checkImagesSecurity } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { title, content, totalAmount, beneficiaries, images = [], year } = event

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

  try {
    const textCheck = await checkContentSecurity(title + '\n' + content, OPENID, { collection: 'projects' })
    if (textCheck === false) {
      return { success: false, message: '内容包含违规信息' }
    }
    if (images && images.length) {
      const imgRes = await checkImagesSecurity(images, { collection: 'projects' })
      if (!imgRes.ok) {
        return { success: false, message: '图片包含违规内容' }
      }
    }

    const now = new Date()
    const res = await db.collection('projects').add({
      data: {
        title: title,
        content: content,
        totalAmount: totalAmount || 0,
        beneficiaries: beneficiaries || '',
        images: images,
        year: year || now.getFullYear(),
        viewCount: 0,
        auditStatus: textCheck === 'review' ? '待复审' : '',
        publisher: OPENID,
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    return { success: true, id: res._id, message: '发布成功' }
  } catch (err) {
    console.error('[publishProject] 失败:', err)
    return { success: false, message: '发布失败' }
  }
}
