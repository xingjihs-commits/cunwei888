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
    const needVideoReview = !!videoFileID
    const res = await db.collection('leader_content').add({
      data: {
        type: type,
        title: title,
        content: content,
        coverImage: coverImage,
        videoFileID: videoFileID,
        published: !needVideoReview,
        auditStatus: needVideoReview || textCheck === 'review' ? '待复审' : '',
        publisher: OPENID,
        publishTime: now,
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    // 视频无官方内容安全 API，强制入复审队列，人工审核通过后才发布
    if (needVideoReview) {
      await db.collection('audit_queue').add({
        data: {
          type: 'video',
          fileID: videoFileID,
          collection: 'leader_content',
          recordId: res._id,
          title: title,
          reason: 'video_manual_review',
          openid: OPENID,
          status: '待复审',
          createTime: now
        }
      }).catch((e) => console.warn('[publishLeaderContent] 复审入队失败:', e && e.errMsg))
    }

    return {
      success: true,
      id: res._id,
      message: needVideoReview ? '已提交，视频审核通过后才发布' : '发布成功'
    }
  } catch (err) {
    console.error('[publishLeaderContent] 失败:', err)
    return { success: false, message: '发布失败' }
  }
}
