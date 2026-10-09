/**
 * cloudfunctions/approveUser/index.js - 审核认证
 * 改造点：
 *   1. 防重复审核：校验当前 verifyStatus === '待审核'
 *   2. 写日志审计
 *   3. 拒绝原因内容安全
 */
const cloud = require('wx-server-sdk')
const { fail } = require('../common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { VERIFY_STATUS } = require('../common/constants')
const { checkAdminWeight, checkContentSecurity } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { userId, approved, reason = '' } = event

  const isAdmin = await checkAdminWeight(OPENID, 90)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  if (!userId) {
    return fail('INVALID_PARAMS')
  }

  try {
    // 先查询当前状态，防止重复审核
    const userRes = await db.collection('users').doc(userId).get()
    if (userRes.data.length === 0) {
      return { success: false, message: '用户不存在' }
    }
    const current = userRes.data[0]
    if (current.verifyStatus && current.verifyStatus !== VERIFY_STATUS.PENDING && current.verifyStatus !== '待审核') {
      return { success: false, message: `该用户已审核过（当前状态：${current.verifyStatus}），不可重复审核` }
    }

    // 拒绝原因内容安全检测
    if (!approved && reason) {
      const check = await checkContentSecurity(reason, OPENID, { collection: 'users', recordId: userId })
      if (check === false) {
        return { success: false, message: '驳回原因包含违规信息' }
      }
    }

    const now = new Date()
    await db.collection('users').doc(userId).update({
      data: {
        isVerified: approved,
        verifyStatus: approved ? VERIFY_STATUS.APPROVED : VERIFY_STATUS.REJECTED,
        rejectReason: reason,
        approvedBy: OPENID,
        approvedTime: now,
        updateTime: now
      }
    })

    // 写日志
    await db.collection('logs').add({
      data: {
        action: 'approve_user',
        userId: userId,
        approved: approved,
        reason: reason,
        operator: OPENID,
        createTime: now
      }
    }).catch((e) => console.warn('[approveUser] 日志写入失败:', e && e.errMsg))

    return { success: true, message: approved ? '已通过认证' : '已驳回' }
  } catch (err) {
    console.error('[approveUser] 失败:', err)
    return { success: false, message: '操作失败' }
  }
}
