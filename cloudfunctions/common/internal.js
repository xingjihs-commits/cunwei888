/**
 * cloudfunctions/common/internal.js - 内部调用令牌
 * 用途：
 *   sendDispatchNotice / sendSubscribeMessage 这类「仅限云函数内部互调」的辅助云函数，
 *   通过校验此令牌拒绝前端（小程序端）直接调用，防止伪造派单通知 / 订阅消息轰炸。
 *
 * 安全说明：
 *   本文件只存在于云函数运行环境，不会随小程序端打包下发；
 *   前端无法读到令牌值，因此无法伪造内部调用。
 *   令牌泄漏风险仅限于云函数源码泄漏，届时手动更换此值并重新部署即可。
 */
const INTERNAL_TOKEN = 'vb_internal_2026_x7K2mQ9pL4wR8tY6nJ3hF5dS'

/** 判断是否为内部云函数调用 */
function isInternalCall(event) {
  return !!(event && event._internal === INTERNAL_TOKEN)
}

module.exports = { INTERNAL_TOKEN, isInternalCall }
