/**
 * cloudfunctions/publishBroadcast/index.js - 书记广播发布
 * 改造点：
 *   1. 疑似违规文本/图片（review）→ published:false 入复审，人工通过后才群发（阻断先发后审）
 *   2. 音频无官方内容安全 API → 强制人工复审（published:false）
 *   3. 认证村民分页拉取（fetchAll），破单次 get 100 条上限；消息分批写入
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
const { fetchAll } = require('./common/db')
const { checkAdmin, checkContentSecurity, checkImagesSecurity, attachQueueRecord } = require('./common/checkAdmin')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
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
  if (images.length > 9) {
    return { success: false, message: '最多上传9张图片' }
  }

  try {
    let imageQueueIds = []
    // 1. 文本内容安全（分段检测）
    const textCheck = await checkContentSecurity(title + '\n' + content, OPENID, { collection: 'broadcasts' })
    if (textCheck.result === false) {
      return { success: false, message: '内容包含违规信息' }
    }
    // 2. 图片内容安全（并行检测）
    if (images && images.length) {
      const imgRes = await checkImagesSecurity(images, { collection: 'broadcasts' })
      if (!imgRes.ok) {
        return { success: false, message: '图片包含违规内容' }
      }
      if (imgRes.queueIds && imgRes.queueIds.length) imageQueueIds = imgRes.queueIds
    }

    const now = new Date()
    const needAudioReview = !!audioFileID
    // 文本/图片/音频任一待复审 → 先不发布、不群发
    const needReview = needAudioReview || textCheck.result === 'review' || imageQueueIds.length > 0
    const res = await db.collection('broadcasts').add({
      data: {
        title: title,
        content: content,
        audioFileID: audioFileID,
        images: images,
        urgent: urgent,
        published: !needReview,
        publisher: OPENID,
        viewCount: 0,
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    // 复审队列回填（此时记录已入库，recordId 可用）
    if (textCheck.result === 'review') {
      await attachQueueRecord(textCheck.queueId, 'broadcasts', res._id)
    }
    for (const qid of imageQueueIds) {
      await attachQueueRecord(qid, 'broadcasts', res._id)
    }

    // 音频无官方内容安全 API，强制人工审核通过后才发布
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
      return { success: true, id: res._id, reviewed: true, message: '广播已提交人工复审，通过后发布' }
    }

    if (needReview) {
      return { success: true, id: res._id, reviewed: true, message: '内容疑似违规，已提交人工复审，通过后发布' }
    }

    // 给所有认证村民生成消息通知（fetchAll 分页拉取 + 分批写入）
    const verifiedUsers = await fetchAll('users', { isVerified: true }, { max: 5000 })
    const totalCount = verifiedUsers.length
    let processed = 0
    const batchSize = 20

    while (processed < totalCount) {
      const batch = verifiedUsers.slice(processed, processed + batchSize)
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
