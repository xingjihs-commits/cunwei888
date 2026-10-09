/**
 * cloudfunctions/getVoteDetail/index.js - 表决详情
 * 用途：查询表决详情含各选项票数
 */
const cloud = require('wx-server-sdk')
const { fail } = require('../common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { voteId } = event
  
  if (!voteId) {
    return fail('INVALID_PARAMS')
  }
  
  try {
    const res = await db.collection('votes').doc(voteId).get()
    if (res.data.length === 0) {
      return { success: false, message: '表决不存在' }
    }
    
    const vote = res.data[0]
    
    // 检查当前用户是否已投票
    let myVote = null
    for (const opt of vote.options) {
      if (opt.voters && opt.voters.includes(OPENID)) {
        myVote = opt.key
        break
      }
    }
    
    // 检查是否超时
    if (vote.deadline && new Date(vote.deadline) < new Date() && normalizeStatus(vote.status) === VOTE_STATUS.OPEN) {
      await db.collection('votes').doc(voteId).update({ data: { status: VOTE_STATUS.CLOSED } })
      vote.status = 'closed'
    }
    
    return {
      success: true,
      data: { ...vote, myVote }
    }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, message: '查询失败' }
  }
}
