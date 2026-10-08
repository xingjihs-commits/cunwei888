/**
 * cloudfunctions/logError/index.js - 前端错误日志上报
 * 用途：App.vue onError / 网络异常 / 配置加载失败等上报到 logs 集合
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const { type = 'app_error', error = '', time = Date.now(), extra = {} } = event

  try {
    await db.collection('logs').add({
      data: {
        action: 'frontend_error',
        errorType: type,
        error: String(error).substring(0, 1000),
        openid: OPENID,
        time: new Date(time),
        extra: extra,
        createTime: new Date()
      }
    })
    return { success: true }
  } catch (err) {
    console.error('[logError] 失败:', err)
    return { success: false }
  }
}
