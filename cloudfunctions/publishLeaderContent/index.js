/**
 * cloudfunctions/publishLeaderContent/index.js - 发布书记风采/领导关怀
 * 用途：发布 leader_content（type = 'secretary' | 'leader'），checkAdmin + 内容安全
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { checkAdmin, checkContentSecurity, checkImageSecurity } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { type = 'secretary', title, content, coverImage = '', videoFileID = '' } = event

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, message: '无发布权限' }
  }

  if (type !== 'secretary' && type !== 'leader') {
    return { success: false, message: '类型不合法' }
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
    const textCheck = await checkContentSecurity(title + '\n' + content, OPENID, { collection: 'leader_content' })
    if (textCheck === false) {
      return { success: false, message: '内容包含违规信息' }
    }
    // 2. 封面图安全
    if (coverImage) {
      const imgCheck = await checkImageSecurity(coverImage, { collection: 'leader_content' })
      if (imgCheck === false) {
        return { success: false, message: '封面图包含违规内容' }
      }
    }

    const now = new Date()
    const res = await db.collection('leader_content').add({
      data: {
        type: type,
        title: title,
        content: content,
        coverImage: coverImage,
        videoFileID: videoFileID,
        auditStatus: textCheck === 'review' ? '待复审' : '',
        publisher: OPENID,
        publishTime: now,
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    return { success: true, id: res._id, message: '发布成功' }
  } catch (err) {
    console.error('[publishLeaderContent] 失败:', err)
    return { success: false, message: '发布失败' }
  }
}
