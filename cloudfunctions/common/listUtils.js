/**
 * cloudfunctions/common/listUtils.js - 列表查询通用工具
 * 用途：统一分页封顶与 _openid 脱敏，防止全表导出与跨服务用户关联。
 */

/**
 * 安全分页参数：page >= 1，pageSize 封顶 max
 * @param {object} event 云函数入参
 * @param {number} defaultSize 默认每页条数
 * @param {number} max 每页上限
 * @returns {{page: number, pageSize: number}}
 */
function safePaging(event = {}, defaultSize = 20, max = 100) {
  const page = Math.max(1, parseInt(event.page) || 1)
  const raw = parseInt(event.pageSize) || defaultSize
  const pageSize = Math.min(Math.max(1, raw), max)
  return { page, pageSize }
}

/**
 * 去除 _openid 字段（返回新数组，不修改原数组）
 * @param {Array} records
 * @returns {Array}
 */
function stripOpenid(records) {
  if (!Array.isArray(records)) return records
  return records.map((r) => {
    const c = { ...r }
    delete c._openid
    return c
  })
}

module.exports = { safePaging, stripOpenid }
