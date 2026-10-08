/**
 * utils/validate.js - 表单验证工具
 * 用途：手机号、身份证、必填、长度等验证
 */

/**
 * 手机号验证（11位，1开头）
 */
export function isPhone(value) {
  return /^1[3-9]\d{9}$/.test(value)
}

/**
 * 身份证号验证（15位或18位）
 */
export function isIdCard(value) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
}

/**
 * 必填验证
 */
export function isRequired(value) {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

/**
 * 长度验证
 * @param {string} value 值
 * @param {number} min 最小
 * @param {number} max 最大
 */
export function lengthRange(value, min, max) {
  const len = String(value || '').length
  return len >= min && len <= max
}

/**
 * 邮箱验证
 */
export function isEmail(value) {
  return /^[\w.-]+@[\w-]+(\.[\w-]+)+$/.test(value)
}

/**
 * 数字验证
 */
export function isNumber(value) {
  return /^\d+$/.test(value)
}

/**
 * 金额验证（最多2位小数）
 */
export function isMoney(value) {
  return /^\d+(\.\d{1,2})?$/.test(value)
}

/**
 * 表单验证
 * @param {object} data 表单数据
 * @param {array} rules 验证规则 [{field, label, rule, message}]
 * @returns {object} {valid, errors}
 */
export function validateForm(data, rules) {
  const errors = []
  
  for (const r of rules) {
    const { field, label, rule, message } = r
    const value = data[field]
    
    if (rule === 'required' && !isRequired(value)) {
      errors.push({ field, message: message || `${label}不能为空` })
    } else if (rule === 'phone' && value && !isPhone(value)) {
      errors.push({ field, message: message || `${label}格式不正确` })
    } else if (rule === 'idCard' && value && !isIdCard(value)) {
      errors.push({ field, message: message || `${label}格式不正确` })
    } else if (rule === 'email' && value && !isEmail(value)) {
      errors.push({ field, message: message || `${label}格式不正确` })
    } else if (rule === 'number' && value && !isNumber(value)) {
      errors.push({ field, message: message || `${label}必须为数字` })
    } else if (rule === 'money' && value && !isMoney(value)) {
      errors.push({ field, message: message || `${label}金额格式不正确` })
    } else if (rule.includes(':') && rule.startsWith('length:')) {
      const [min, max] = rule.split(':')[1].split(',').map(Number)
      if (value && !lengthRange(value, min, max)) {
        errors.push({ field, message: message || `${label}长度需${min}-${max}字` })
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * 显示验证错误
 */
export function showErrors(errors) {
  if (errors && errors.length > 0) {
    uni.showToast({ title: errors[0].message, icon: 'none', duration: 2500 })
  }
}

export default {
  isPhone,
  isIdCard,
  isRequired,
  lengthRange,
  isEmail,
  isNumber,
  isMoney,
  validateForm,
  showErrors
}
