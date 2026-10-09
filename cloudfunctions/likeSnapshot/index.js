/**
 * cloudfunctions/likeSnapshot/index.js - 随手拍点赞
 * 改造点：用 runTransaction 防并发
 */
const cloud = require('wx-server-sdk')
const { fail } = require('../common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { recordId } = event

  if (!recordId) {
    return fail('INVALID_PARAMS')
  }

  try {
    const result = await db.runTransaction(async transaction => {
      const recordRes = await transaction.collection('records').doc(recordId).get()
      if (recordRes.data.length === 0) {
        throw new Error('记录不存在')
      }

      const record = recordRes.data[0]
      const likeUsers = record.likeUsers || []
      const liked = likeUsers.includes(OPENID)

      if (liked) {
        await transaction.collection('records').doc(recordId).update({
          data: {
            likeCount: _.inc(-1),
            likeUsers: _.pull(OPENID)
          }
        })
        return { liked: false }
      } else {
        await transaction.collection('records').doc(recordId).update({
          data: {
            likeCount: _.inc(1),
            likeUsers: _.push(OPENID)
          }
        })
        return { liked: true }
      }
    })

    return { success: true, liked: result.liked, message: result.liked ? '点赞成功' : '已取消点赞' }
  } catch (err) {
    console.error('[likeSnapshot] 失败:', err)
    return { success: false, message: err.message || '操作失败' }
  }
}
