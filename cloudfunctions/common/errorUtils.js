/**
 * cloudfunctions/common/errorUtils.js - 云函数统一响应工具
 *
 * 规范：
 *   - 成功：return ok({ data, total })  （或保留原有 { success:true, ... })
 *   - 失败：return fail('FORBIDDEN') / fail('INVALID_PARAMS', '自定义提示')
 * 错误码集中在 ERR，禁止在各云函数散落硬编码权限/参数文案。
 */
const ERR = {
  FORBIDDEN: '无权限',
  INVALID_PARAMS: '参数不完整',
  NOT_FOUND: '内容不存在',
  CONTENT_RISKY: '内容包含违规信息',
  INTERNAL_ERROR: '操作失败'
}

/**
 * 统一失败响应
 * @param {string} code ERR 中的错误码
 * @param {string} [message] 覆盖默认文案
 * @returns {{success: boolean, code: string, message: string}}
 */
function fail(code, message) {
  return {
    success: false,
    code: code,
    message: message || ERR[code] || '操作失败'
  }
}

/**
 * 统一成功响应（合并附加字段）
 * @param {object} [data] 附加字段，如 { data, total }
 */
function ok(data) {
  return Object.assign({ success: true }, data || {})
}

module.exports = { ERR, fail, ok }
