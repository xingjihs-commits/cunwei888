/**
 * cloudfunctions/submitVote/index.js - 提交表决
 * 改造点：
 *   1. vote.status 用中文常量 '进行中'，兼容老英文 'open'
 *   2. 本函数只写 voters 数组 + count++，无用户提交文本，不需内容安全
 *   3. 投票人黑名单检查（如有违规举报记录则禁止投票）
 *   4. 用 runTransaction 防并发
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
const { pluckDoc } = require('./common/docUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { VOTE_STATUS } = require('./common/constants')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { voteId, optionKey } = event

  if (!voteId || !optionKey) {
    return fail('INVALID_PARAMS')
  }

  try {
    // 投票人黑名单：举报被认定违规 3 次以上的用户禁止投票
    try {
      const blacklist = await db.collection('reports')
        .where({ reporterOpenid: OPENID, status: '违规确认' })
        .count()
      if (blacklist.total >= 3) {
        return { success: false, message: '您的账号存在多次违规举报，已被限制投票功能' }
      }
    } catch (e) {
      // reports 集合不存在时跳过
    }

    const result = await db.runTransaction(async transaction => {
      const voteRes = await transaction.collection('votes').doc(voteId).get()
      const vote = pluckDoc(voteRes)
      if (!vote) {
        throw new Error('表决不存在')
      }

      // 兼容老英文 'open'
      const status = vote.status
      if (status !== VOTE_STATUS.OPEN && status !== 'open') {
        throw new Error('表决已结束')
      }

      if (vote.deadline && new Date(vote.deadline) < new Date()) {
        throw new Error('表决已截止')
      }

      // 校验选项存在（防止无效 optionKey 造成假成功 + 计数脱钩）
      const targetOpt = (vote.options || []).find(opt => opt.key === optionKey)
      if (!targetOpt) {
        throw new Error('投票选项不存在')
      }

      // 检查是否已投票
      for (const opt of vote.options) {
        if (opt.voters && opt.voters.includes(OPENID)) {
          throw new Error('您已投过票')
        }
      }

      // 找到选项并更新
      const newOptions = vote.options.map(opt => {
        if (opt.key === optionKey) {
          return {
            ...opt,
            count: opt.count + 1,
            voters: [...(opt.voters || []), OPENID]
          }
        }
        return opt
      })

      await transaction.collection('votes').doc(voteId).update({
        data: {
          options: newOptions,
          totalVotes: _.inc(1),
          updateTime: new Date()
        }
      })

      return true
    })

    return { success: true, message: '投票成功' }
  } catch (err) {
    console.error('[submitVote] 失败:', err)
    const bizMsgs = ['表决不存在', '表决已结束', '表决已截止', '投票选项不存在', '您已投过票', '您的账号存在多次违规举报，已被限制投票功能']
    return { success: false, message: bizMsgs.includes(err.message) ? err.message : '投票失败' }
  }
}
