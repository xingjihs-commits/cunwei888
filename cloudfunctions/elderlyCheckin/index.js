/**
 * cloudfunctions/elderlyCheckin/index.js - 留守老人签到
 * 改造点：status 全中文（正常/求助/紧急）
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

const STATUS_MAP = {
  '正常': '正常',
  '求助': '求助',
  '紧急': '紧急',
  // 兼容老英文
  'normal': '正常',
  'help_needed': '求助',
  'urgent': '紧急'
}

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { status = '正常', note = '' } = event

  const normalizedStatus = STATUS_MAP[status] || '正常'

  if (note && note.length > 500) {
    return { success: false, message: '备注不能超过500字' }
  }

  try {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // 检查今天是否已签到
    const existing = await db.collection('checkin_records')
      .where({ _openid: OPENID, checkinDate: _.gte(today) })
      .get()

    if (existing.data.length > 0) {
      return { success: false, message: '今日已签到' }
    }

    await db.collection('checkin_records').add({
      data: {
        checkinDate: now,
        status: normalizedStatus,
        note: note,
        location: event.location || null,
        createTime: now,
        _openid: OPENID
      }
    })

    // 求助/紧急：通知所有管理员
    if (normalizedStatus === '紧急' || normalizedStatus === '求助') {
      const user = await db.collection('users').where({ _openid: OPENID }).get()
      const userName = user.data.length > 0 && user.data[0].realName ? user.data[0].realName : '某村民'

      const admins = await db.collection('admins').where({ enabled: true }).get()
      for (const admin of admins.data) {
        await db.collection('messages').add({
          data: {
            type: 'elderly_alert',
            title: normalizedStatus === '紧急' ? '【紧急】独居老人求助' : '【求助】独居老人求助',
            content: `${userName} 在 ${now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })} 发起${normalizedStatus}签到${note ? '：' + note : ''}`,
            targetOpenid: admin._openid,
            isRead: false,
            createTime: now
          }
        }).catch(() => {})
      }
    }

    return { success: true, message: '签到成功，注意身体' }
  } catch (err) {
    console.error('[elderlyCheckin] 失败:', err)
    return { success: false, message: '签到失败' }
  }
}
