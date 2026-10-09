/**
 * cloudfunctions/verifyUser/index.js - 提交认证（宽进严管）
 * 改造点（V1.7）：
 *   1. 宽进：提交即通过（isVerified=true），不再等待人工审核
 *   2. 支持微信手机号一键授权（phoneCode → openapi 换号）
 *   3. phone 唯一（防重复注册）、openid 唯一
 *   4. 驳回后 24 小时内不可重复提交
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

const { checkContentSecurity } = require('../common/checkAdmin')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  let { realName, phone, villageGroup, address = '', phoneCode = '' } = event

  // 1. 微信手机号一键授权（可选）
  if (!phone && phoneCode) {
    try {
      const r = await cloud.openapi.phonenumber.getPhoneNumber({ code: phoneCode })
      if (r && r.phoneInfo && r.phoneInfo.phoneNumber) phone = r.phoneInfo.phoneNumber
    } catch (e) {
      console.warn('[verifyUser] 手机号解密失败:', e && e.errMsg)
    }
  }

  if (!realName || !phone || !villageGroup) {
    return { success: false, message: '请填写姓名、手机号和村组' }
  }
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    return { success: false, message: '手机号格式不正确' }
  }

  // 实名信息内容安全检测（fail-closed：API 异常时入复审队列，不直接放行）
  let textCheck = true
  try {
    textCheck = await checkContentSecurity(`${realName}\n${villageGroup}\n${address}`, OPENID, { collection: 'users' })
  } catch (e) {
    textCheck = 'review'
  }
  if (textCheck === false) {
    return { success: false, message: '提交的内容包含违规信息，请修改', code: 'CONTENT_RISKY' }
  }

  try {
    const now = new Date()

    // 2. openid 唯一：查已有记录
    const existing = await db.collection('users').where({ _openid: OPENID }).get()
    if (existing.data.length > 0) {
      const u = existing.data[0]
      if (u.isVerified) {
        return { success: false, message: '您已通过认证' }
      }
      // 3. 驳回后 24h 限重提
      if (u.verifyStatus === '已驳回' && u.rejectTime && (now - new Date(u.rejectTime)) < 24 * 3600 * 1000) {
        return { success: false, message: '驳回后 24 小时内不可重复提交' }
      }
    }

    // 4. phone 唯一：该手机号是否被其他账号占用
    const phoneUsed = await db.collection('users').where({ phone: phone, _openid: _.neq(OPENID) }).count()
    if (phoneUsed.total > 0) {
      return { success: false, message: '该手机号已被其他账号注册' }
    }

    const data = {
      realName: realName,
      phone: phone,
      villageGroup: villageGroup,
      address: address,
      isVerified: true,          // 宽进：提交即通过
      verifyStatus: '正常',
      verifyTime: now,
      auditStatus: textCheck === 'review' ? '待复审' : '',
      updateTime: now
    }

    if (existing.data.length > 0) {
      await db.collection('users').doc(existing.data[0]._id).update({ data })
    } else {
      await db.collection('users').add({
        data: { _openid: OPENID, ...data, createTime: now }
      })
    }

    return { success: true, isVerified: true, message: '认证成功' }
  } catch (err) {
    console.error('[verifyUser] 失败:', err)
    return { success: false, message: '提交失败' }
  }
}
