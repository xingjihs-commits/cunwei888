/**
 * cloudfunctions/getVoteDetail/index.js - 表决详情
 * 用途：查询表决详情含各选项票数（剥离 voters，保护投票人隐私）
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
const { pluckDoc } = require('./common/docUtils')
const { VOTE_STATUS, normalizeStatus } = require('./common/constants')
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
    const vote = pluckDoc(res)
    if (!vote || vote.auditStatus === '待复审') {
      return { success: false, message: '表决不存在' }
    }
    
    // 检查当前用户是否已投票（基于原始 voters 计算后再剥离）
    let myVote = null
    for (const opt of vote.options || []) {
      if (opt.voters && opt.voters.includes(OPENID)) {
        myVote = opt.key
        break
      }
    }
    
    // 检查是否超时（兼容老英文 'open'）
    if (vote.deadline && new Date(vote.deadline) < new Date() && normalizeStatus(vote.status) === VOTE_STATUS.OPEN) {
      await db.collection('votes').doc(voteId).update({ data: { status: VOTE_STATUS.CLOSED } })
      vote.status = VOTE_STATUS.CLOSED
    }
    
    // 剥离 voters（谁投了哪票是投票人隐私，不对外返回）
    const safeOptions = (vote.options || []).map(opt => ({
      key: opt.key,
      label: opt.label,
      count: opt.count || 0
    }))
    
    return {
      success: true,
      data: { ...vote, options: safeOptions, myVote }
    }
  } catch (err) {
    console.error('查询失败:', err)
    return { success: false, message: '查询失败' }
  }
}
