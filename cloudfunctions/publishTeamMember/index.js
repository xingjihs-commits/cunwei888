/**
 * cloudfunctions/publishTeamMember/index.js - 新增/编辑成员
 * 改造点：名字/职务/分工/承诺内容安全
 */
const cloud = require('wx-server-sdk')
const { fail } = require('../common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { checkAdmin, checkContentSecurity } = require('../common/checkAdmin')

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

  try {
    // 名字+职务+分工+承诺 内容安全
    const checkText = `${name}\n${role}\n${division}\n${commitment}`
    const textCheck = await checkContentSecurity(checkText, OPENID, { collection: 'team_members' })
    if (textCheck === false) {
      return { success: false, message: '内容包含违规信息' }
    }

    const now = new Date()

    if (memberId) {
      await db.collection('team_members').doc(memberId).update({
        data: {
          name: name, role: role, type: type, avatar: avatar,
          phone: phone, division: division, commitment: commitment,
          sortOrder: sortOrder, updateTime: now
        }
      })
      return { success: true, message: '编辑成功' }
    } else {
      await db.collection('team_members').add({
        data: {
          name: name, role: role, type: type, avatar: avatar,
          phone: phone, division: division, commitment: commitment,
          sortOrder: sortOrder, enabled: true,
          auditStatus: textCheck === 'review' ? '待复审' : '',
          createTime: now, updateTime: now, _openid: OPENID
        }
      })
      return { success: true, message: '新增成功' }
    }
  } catch (err) {
    console.error('[publishTeamMember] 失败:', err)
    return { success: false, message: '操作失败' }
  }
}
