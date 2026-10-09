/**
 * cloudfunctions/likeNews/index.js - 新闻点赞
 * 改造点：用 runTransaction 防并发，避免重复点赞 / 重复取消
 */
const cloud = require('wx-server-sdk')
const { fail } = require('../common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { newsId } = event

  if (!newsId) {
    return fail('INVALID_PARAMS')
  }

  try {
    const result = await db.runTransaction(async transaction => {
      const newsRes = await transaction.collection('news').doc(newsId).get()
      if (newsRes.data.length === 0) {
        throw new Error('新闻不存在')
      }

      const news = newsRes.data[0]
      const likeUsers = news.likeUsers || []
      const liked = likeUsers.includes(OPENID)

      if (liked) {
        // 取消点赞
        await transaction.collection('news').doc(newsId).update({
          data: {
            likeCount: _.inc(-1),
            likeUsers: _.pull(OPENID)
          }
        })
        return { liked: false }
      } else {
        // 点赞
        await transaction.collection('news').doc(newsId).update({
          data: {
            likeCount: _.inc(1),
            likeUsers: _.push(OPENID)
          }
        })
        return { liked: true }
      }
    })

    return { success: true, liked: result.liked }
  } catch (err) {
    console.error('[likeNews] 失败:', err)
    return { success: false, message: err.message || '操作失败' }
  }
}
