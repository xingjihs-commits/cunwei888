/**
 * cloudfunctions/createVote/index.js - 发起表决
 * 改造点：status 全中文（进行中）+ 内容安全
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { VOTE_STATUS } = require('./common/constants')
const { checkAdmin, checkContentSecurity, attachQueueRecord } = require('./common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  const { title, description, options = [], deadline, meetingId = '', voterScope = '村民代表' } = event

  if (!title || !description || options.length < 2) {
    return { success: false, message: '请填写完整信息，至少2个选项' }
  }
  if (title.length > 50) {
    return { success: false, message: '标题不能超过50字' }
  }
  if (description.length > 500) {
    return { success: false, message: '描述不能超过500字' }
  }
  if (options.length > 10) {
    return { success: false, message: '选项不能超过10个' }
  }
  if (!options.every(opt => typeof opt === 'string' && opt.length > 0 && opt.length <= 30)) {
    return { success: false, message: '每个选项须为不超过30字的文本' }
  }
  let deadlineDate = null
  if (deadline) {
    deadlineDate = new Date(deadline)
    if (isNaN(deadlineDate.getTime())) {
      return { success: false, message: '截止时间无效' }
    }
  }

  try {
    // 表决标题、描述、选项内容安全
    const checkText = title + '\n' + description + '\n' + options.join('\n')
    const textCheck = await checkContentSecurity(checkText, OPENID, { collection: 'votes' })
    if (textCheck.result === false) {
      return { success: false, message: '内容包含违规信息' }
    }

    const now = new Date()
    const voteOptions = options.map((opt, i) => ({
      key: 'opt_' + i,
      label: opt,
      count: 0,
      voters: []
    }))

    const res = await db.collection('votes').add({
      data: {
        title: title,
        description: description,
        options: voteOptions,
        deadline: deadlineDate,
        meetingId: meetingId,
        voterScope: voterScope,
        status: VOTE_STATUS.OPEN,
        totalVotes: 0,
        auditStatus: textCheck.result === 'review' ? '待复审' : '',
        creator: OPENID,
        createTime: now,
        updateTime: now,
        _openid: OPENID
      }
    })

    // 复审队列回填
    if (textCheck.result === 'review') {
      await attachQueueRecord(textCheck.queueId, 'votes', res._id)
    }

    return { success: true, id: res._id, message: '表决已发起' }
  } catch (err) {
    console.error('[createVote] 失败:', err)
    return { success: false, message: '发起失败' }
  }
}
