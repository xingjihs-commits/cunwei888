/**
 * cloudfunctions/common/docUtils.js - 数据库返回值与通用工具（纯函数，无云依赖）
 *
 * 背景：wx-server-sdk 中 collection.doc(id).get() 返回 IQuerySingleResult
 * （data 为单个文档对象），collection.where(...).get() 返回 IQueryResult
 * （data 为数组）。历史代码大量把前者当数组用（res.data.length / res.data[0]），
 * 导致详情/点赞/投票/评价等功能失效。本模块提供统一的提取函数消除歧义。
 */

/**
 * 从 doc().get() / where().get() 的返回值中提取单个文档。
 * 兼容两种返回形态（单对象 / 数组），不存在时返回 null。
 * 事务内 transaction.collection().doc().get() 同样适用。
 * @param {{data?: object|Array}} res SDK 查询返回值
 * @returns {object|null}
 */
function pluckDoc(res) {
  if (!res || res.data === undefined || res.data === null) return null
  const data = res.data
  if (Array.isArray(data)) return data.length > 0 ? data[0] : null
  return data
}

/**
 * 匿名标识：sha256(openid + salt) 截断，防低熵反推与碰撞。
 * salt 与 INTERNAL_TOKEN 同风险等级（随源码部署，泄漏即更换重部署）。
 * @param {string} openid
 * @returns {string}
 */
function hashId(openid) {
  const crypto = require('crypto')
  const SALT = 'vb_anon_salt_2026_c4f9e2'
  return 'anon_' + crypto
    .createHash('sha256')
    .update(String(openid || '') + SALT)
    .digest('hex')
    .substring(0, 16)
}

/**
 * CSV 字段转义：处理逗号/引号/换行注入与公式注入（=+-@ 开头）。
 * @param {any} value
 * @returns {string}
 */
function csvEscape(value) {
  let s = String(value === undefined || value === null ? '' : value)
  // 公式注入防护：危险前缀前拼单引号
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s
  if (/[",\n\r]/.test(s)) {
    s = '"' + s.replace(/"/g, '""') + '"'
  }
  return s
}

/**
 * 转义正则元字符（用于用户输入构造 db.RegExp / RegExp）。
 * @param {string} s
 * @returns {string}
 */
function escapeRegExp(s) {
  return String(s === undefined || s === null ? '' : s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

module.exports = { pluckDoc, hashId, csvEscape, escapeRegExp }
