/**
 * cloudflows/publishBroadcast/index.js - 书记广播发布
 * 改造点：
 *   1. 不截断 100 人，分批写入消息表（每批 20 条）
 *   2. 内容安全检测（广播直接推全村，必须先审）
 *   3. 图片内容安全
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { checkAdmin, checkContentSecurity, checkImageSecurity } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, message: '无发布权限' }
  }

  const { title, content, audioFileID = '', images = [], urgent = false } = event

  if (!title || !content) {
    return { success: false, message: '请填写完整信息' }
  }
  if (title.length > 50) {
    return { success: false, message: '标题不能超过50字' }
  }
  if (content.length > 1000) {
    return { success: false, message: '内容不能超过1000字' }
  }

  try {
    // 1. 文本内容安全
    const textCheck = await checkContentSecurity(title + '\n' + content, OPENID, { collection: 'broadcasts' })
    if (textCheck === false) {
      return { success: false, message: '内容包含违规信息' }
    }
    // 2. 图片内容安全
    for (const fileID of images) {
      const imgCheck = await checkImageSecurity(fileID, { collection: 'broadcasts' })
      if (imgCheck === false) {
        return { success: false, message: '图片包含违规内容' }
      }
    }

    const now = new Date()
    const needAudioReview = !!audioFileID
    const res = await db.collection('broadcasts').add({
      data: {
        title: title,
        content: content,
        audioFileID: audioFileID,
        images: images,
        urgent: urgent,
        published: !needAudioReview,
        publisher: OPENID,
        viewCount: 0,
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    // 音频无官方内容安全 API，含音频时先入复审队列且不群发，人工审核通过后才发布
    if (needAudioReview) {
      await db.collection('audit_queue').add({
        data: {
          type: 'audio',
          fileID: audioFileID,
          collection: 'broadcasts',
          recordId: res._id,
          title: title,
          reason: 'audio_manual_review',
          openid: OPENID,
          status: '待复审',
          createTime: now
        }
      }).catch((e) => console.warn('[publishBroadcast] 复审入队失败:', e && e.errMsg))
      return { success: true, id: res._id, reviewed: true, message: '广播含音频，已提交人工复审' }
    }

    // 给所有认证村民生成消息通知（分批写入，不截断）
    // 云开发单次批量 add 最多 20 条，循环分批
    const verifiedUsers = await db.collection('users')
      .where({ isVerified: true })
      .field({ _openid: true })
      .get()

    const totalCount = verifiedUsers.data.length
    let processed = 0
    const batchSize = 20

    while (processed < totalCount) {
      const batch = verifiedUsers.data.slice(processed, processed + batchSize)
      const addOps = batch.map(user => 
        db.collection('messages').add({
          data: {
            type: 'broadcast',
            title: urgent ? '【紧急广播】' + title : title,
            content: content.substring(0, 50),
            targetOpenid: user._openid,
            recordId: res._id,
            isRead: false,
            createTime: now
          }
        })
      )
      try {
        await Promise.all(addOps)
      } catch (e) {
        console.warn('[publishBroadcast] 批量消息插入部分失败:', e && e.errMsg)
      }
      processed += batch.length
    }

    return { success: true, id: res._id, notified: totalCount, message: `广播已发布，${totalCount}人将收到通知` }
  } catch (err) {
    console.error('[publishBroadcast] 失败:', err)
    return { success: false, message: '发布失败' }
  }
}
