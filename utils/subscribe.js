/**
 * utils/subscribe.js - 订阅消息授权封装
 * 用途：提交/关注后引导用户授权订阅消息；未配置模板 ID 时静默跳过。
 * 说明：模板 ID 来自 module_config.subscribe_templates，需在微信公众平台申请后配置。
 */
export function requestSubscribe(tmplIds = []) {
  const ids = (Array.isArray(tmplIds) ? tmplIds : [tmplIds]).filter(Boolean)
  if (!ids.length) return
  // #ifdef MP-WEIXIN
  if (typeof wx !== 'undefined' && wx.requestSubscribeMessage) {
    wx.requestSubscribeMessage({
      tmplIds: ids,
      fail: (err) => {
        // 用户拒绝或模板无效，不阻断主流程
        console.warn('[requestSubscribe] 订阅授权失败:', err && err.errMsg)
      }
    })
  }
  // #endif
}
