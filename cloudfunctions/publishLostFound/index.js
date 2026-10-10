/**
 * cloudfunctions/publishLostFound/index.js - 发布失物招领
 * 改造点：
 *   1. status 全中文（进行中/已结束）
 *   2. 内容安全补全：标题+正文+图片全部检测（原仅查正文）
 *   3. subType 白名单（寻物/招领）、contactInfo 限长、封禁校验
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { LOST_FOUND_STATUS } = require('./common/constants')
const { checkContentSecurity, checkImagesSecurity, attachQueueRecord } = require('./common/checkAdmin')
const { isBlocked } = require('./common/blocked')

const VALID_SUB_TYPES = ['寻物', '招领']

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  // 封禁校验：被临时锁定的用户拒绝提交
  if (await isBlocked(OPENID)) {
    return { success: false, message: '账号已被临时限制，请稍后再试', code: 'BLOCKED' }
  }
  const { type, title, content, images = [], contactInfo = '', location = '' } = event

  if (!type || !title || !content) {
    return { success: false, message: '请填写完整信息' }
  }
  if (!VALID_SUB_TYPES.includes(type)) {
    return { success: false, message: '类型无效（寻物/招领）' }
  }
  if (title.length > 50) {
    return { success: false, message: '标题不能超过50字' }
  }
  if (content.length > 500) {
    return { success: false, message: '内容不能超过500字' }
  }
  if (contactInfo.length > 100) {
    return { success: false, message: '联系方式不能超过100字' }
  }
  if (images.length > 9) {
    return { success: false, message: '最多上传9张图片' }
  }

  try {
    let imageQueueIds = []
    // 标题+正文内容安全
    const textCheck = await checkContentSecurity(title + '\n' + content, OPENID, { collection: 'records' })
    if (textCheck.result === false) {
      return { success: false, message: '内容包含违规信息' }
    }
    // 图片内容安全（并行检测）
    if (images && images.length) {
      const imgRes = await checkImagesSecurity(images, { collection: 'records' })
      if (!imgRes.ok) {
        return { success: false, message: '图片包含违规内容' }
      }
      if (imgRes.queueIds && imgRes.queueIds.length) imageQueueIds = imgRes.queueIds
    }

    const now = new Date()
    const res = await db.collection('records').add({
      data: {
        type: '失物招领',
        subType: type,
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
        auditStatus: textCheck.result === 'review' ? '待复审' : '',
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    // 复审队列回填
    if (textCheck.result === 'review') {
      await attachQueueRecord(textCheck.queueId, 'records', res._id)
    }
    for (const qid of imageQueueIds) {
      await attachQueueRecord(qid, 'records', res._id)
    }

    return { success: true, id: res._id, message: '发布成功' }
  } catch (err) {
    console.error('[publishLostFound] 失败:', err)
    return { success: false, message: '发布失败' }
  }
}
