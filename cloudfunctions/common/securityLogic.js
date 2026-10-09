/**
 * cloudfunctions/common/securityLogic.js - 内容安全决策纯逻辑（无云依赖）
 *
 * 抽出的原因：checkAdmin.js 顶层 require('wx-server-sdk')，本地 node/vitest
 * 无法加载；把"判定"与"IO"分离后，单测可直接 import 真实判定逻辑，
 * 与生产共用同一份实现，避免测试复制逻辑导致漂移。
 */

/**
 * 根据 msgSecCheck / imgSecCheck 的返回决定处置
 * @param {object|null} res openapi 返回体
 * @returns {boolean|'review'} true=通过 / false=拒绝 / 'review'=复审
 */
function decideSecurity(res) {
  if (!res) return 'review'
  const suggest = (res.result && res.result.suggest) || res.suggest || 'pass'
  if (suggest === 'pass') return true
  if (suggest === 'review') return 'review'
  return false
}

/**
 * admins count 查询结果是否代表管理员
 * @param {object|null} countRes db.count() 结果
 * @returns {boolean}
 */
function isAdminCount(countRes) {
  return !!(countRes && countRes.total > 0)
}

module.exports = { decideSecurity, isAdminCount }
