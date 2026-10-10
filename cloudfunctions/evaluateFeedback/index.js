/**
 * cloudfunctions/evaluateFeedback/index.js - 评价工单
 * 改造点：status 全中文，兼容老数据 'completed' 英文
 */
const cloud = require('wx-server-sdk')
const { pluckDoc } = require('./common/docUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_STATUS, RECORD_DONE_STATUSES, normalizeStatus, expandStatuses } = require('./common/constants')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { recordId, evaluation, evaluationText = '' } = event

  // 评分强转数字并校验（防字符串/非整数绕过）
  const score = Number(evaluation)
  if (!recordId || !Number.isInteger(score) || score < 1 || score > 5) {
    return { success: false, message: '请选择1-5星评分' }
  }

  if (evaluationText.length > 200) {
    return { success: false, message: '评价内容不能超过200字' }
  }

  try {
    const recordRes = await db.collection('records').doc(recordId).get()
    const record = pluckDoc(recordRes)
    if (!record) {
      return { success: false, message: '工单不存在' }
    }

    if (record._openid !== OPENID) {
      return { success: false, message: '只能评价自己的工单' }
    }

    // 兼容老数据：英文 'completed' 也算已完成
    const currentStatus = normalizeStatus(record.status)
    if (!RECORD_DONE_STATUSES.includes(currentStatus)) {
      return { success: false, message: '工单未完成，无法评价' }
    }

    if (record.evaluation > 0) {
      return { success: false, message: '已评价过，不能重复评价' }
    }

    // 评价内容安全检测（防止评价里夹带违规内容）
    if (evaluationText) {
      const { checkContentSecurity } = require('./common/checkAdmin')
      const check = await checkContentSecurity(evaluationText, OPENID, { collection: 'records', recordId })
      if (check.result === false) {
        return { success: false, message: '评价内容包含违规信息' }
      }
    }

    await db.collection('records').doc(recordId).update({
      data: {
        evaluation: score,
        evaluationText: evaluationText,
        status: RECORD_STATUS.EVALUATED,
        updateTime: new Date()
      }
    })

    return { success: true, message: '评价成功，感谢您的反馈' }
  } catch (err) {
    console.error('[evaluateFeedback] 失败:', err)
    return { success: false, message: '评价失败' }
  }
}
