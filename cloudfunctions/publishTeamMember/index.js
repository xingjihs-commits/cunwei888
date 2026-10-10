/**
 * cloudfunctions/publishTeamMember/index.js - 新增/编辑成员
 * 改造点：名字/职务/分工/承诺内容安全
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { checkAdmin, checkContentSecurity, attachQueueRecord } = require('./common/checkAdmin')
const { pluckDoc } = require('./common/docUtils')

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { memberId = '', name, role, type, avatar = '', phone = '', division = '', commitment = '', sortOrder = 0 } = event

  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
  }

  if (!name || !role || !type) {
    return { success: false, message: '请填写完整信息' }
  }
  if (!['committee', 'party'].includes(type)) {
    return { success: false, message: '成员类型无效（committee/party）' }
  }
  if (name.length > 20) {
    return { success: false, message: '姓名不能超过20字' }
  }
  if (role.length > 20) {
    return { success: false, message: '职务不能超过20字' }
  }
  if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
    return { success: false, message: '手机号格式不正确' }
  }
  if (commitment.length > 200) {
    return { success: false, message: '承诺不能超过200字' }
  }

  try {
    // 名字+职务+分工+承诺 内容安全
    const checkText = `${name}\n${role}\n${division}\n${commitment}`
    const textCheck = await checkContentSecurity(checkText, OPENID, { collection: 'team_members' })
    if (textCheck.result === false) {
      return { success: false, message: '内容包含违规信息' }
    }

    const now = new Date()
    const auditStatus = textCheck.result === 'review' ? '待复审' : '已通过'

    if (memberId) {
      // 编辑：先校验存在（防静默成功），并重置审核状态
      const existing = pluckDoc(await db.collection('team_members').doc(memberId).get())
      if (!existing) {
        return { success: false, message: '成员不存在' }
      }
      await db.collection('team_members').doc(memberId).update({
        data: {
          name: name, role: role, type: type, avatar: avatar,
          phone: phone, division: division, commitment: commitment,
          sortOrder: sortOrder, auditStatus: auditStatus, updateTime: now
        }
      })
      if (textCheck.result === 'review') {
        await attachQueueRecord(textCheck.queueId, 'team_members', memberId)
      }
      return { success: true, message: '编辑成功' }
    } else {
      const res = await db.collection('team_members').add({
        data: {
          name: name, role: role, type: type, avatar: avatar,
          phone: phone, division: division, commitment: commitment,
          sortOrder: sortOrder, enabled: true,
          auditStatus: auditStatus,
          createTime: now, updateTime: now, _openid: OPENID
        }
      })
      if (textCheck.result === 'review') {
        await attachQueueRecord(textCheck.queueId, 'team_members', res._id)
      }
      return { success: true, id: res._id, message: '新增成功' }
    }
  } catch (err) {
    console.error('[publishTeamMember] 失败:', err)
    return { success: false, message: '操作失败' }
  }
}
