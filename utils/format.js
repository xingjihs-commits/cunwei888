/**
 * utils/format.js - 格式化工具
 * 改造点：
 *   1. statusText/statusColor 兼容中英文（旧英文自动归一化）
 *   2. urgentText/urgentColor 改为中文 key（普通/紧急/特急）
 *   3. 集中收口兼容逻辑，前端不再各自写 if (status === 'completed' || status === '已完成')
 */

// 历史英文 status -> 中文映射（与 common/constants.js 保持一致）
const STATUS_NORMALIZE_MAP = {
  // 工单
  'pending': '待处理',
  'assigned': '已派单',
  'processing': '处理中',
  'completed': '已完成',
  'evaluated': '已评价',
  'rejected': '已驳回',
  'overdue': '已超时',
  // 任务
  'todo': '待办',
  'doing': '进行中',
  // 表决
  'open': '进行中',
  'closed': '已截止',
  // 会议
  'scheduled': '待召开',
  'holding': '进行中',
  'ended': '已结束',
  'cancelled': '已取消',
  // 书记信箱
  'read': '已查阅',
  'replied': '已回复',
  // 失物招领
  'normal': '普通',  // urgent level 也可能传 normal
  'help_needed': '求助',
  'urgent': '紧急'
}

/**
 * 把英文 status 归一化为中文（兼容老数据）
 * 如果已经是中文或不在映射表里，原样返回
 */
export function normalizeStatus(status) {
  if (!status) return status
  return STATUS_NORMALIZE_MAP[status] || status
}

/**
 * 格式化日期
 * @param {date|string|number} date 日期
 * @param {string} fmt 格式 YYYY-MM-DD HH:mm:ss
 */
export function formatDate(date, fmt = 'YYYY-MM-DD HH:mm') {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''

  const opt = {
    'Y+': d.getFullYear(),
    'M+': d.getMonth() + 1,
    'D+': d.getDate(),
    'H+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds()
  }

  let result = fmt
  for (const k in opt) {
    result = result.replace(new RegExp(k), (m) => {
      const val = opt[k]
      return m === 'YYYY' ? val : String(val).padStart(m.length, '0')
    })
  }
  return result
}

/**
 * 相对时间（刚刚、5分钟前、2小时前、3天前）
 */
export function relativeTime(date) {
  if (!date) return ''
  const d = new Date(date)
  const diff = Date.now() - d.getTime()
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diff < minute) return '刚刚'
  if (diff < hour) return Math.floor(diff / minute) + '分钟前'
  if (diff < day) return Math.floor(diff / hour) + '小时前'
  if (diff < 7 * day) return Math.floor(diff / day) + '天前'
  return formatDate(date, 'YYYY-MM-DD')
}

/**
 * 格式化金额
 */
export function formatMoney(num) {
  if (num === null || num === undefined) return '0.00'
  return Number(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 工单状态文案（自动归一化，兼容老英文）
 */
export function statusText(status) {
  return normalizeStatus(status)
}

/**
 * 工单状态颜色映射（自动归一化）
 */
export function statusColor(status) {
  const cn = normalizeStatus(status)
  const map = {
    '待处理': 'warning',
    '已派单': 'primary',
    '处理中': 'primary',
    '已完成': 'success',
    '已评价': 'success',
    '已驳回': 'danger',
    '已超时': 'danger',
    '待办': 'warning',
    '进行中': 'primary',
    '已截止': 'default',
    '待召开': 'warning',
    '已结束': 'success',
    '已取消': 'danger',
    '已查阅': 'primary',
    '已回复': 'success',
    '已关闭': 'default',
    '普通': 'default',
    '紧急': 'warning',
    '特急': 'danger',
    '求助': 'warning',
    '整改中': 'warning',
    '已整改': 'success',
    '待复审': 'warning',
    '已通过': 'success',
    '待审核': 'warning'
  }
  return map[cn] || 'default'
}

/**
 * 紧急程度文案（兼容中文 + 老英文）
 */
export function urgentText(level) {
  const map = {
    '普通': '普通',
    '紧急': '紧急',
    '特急': '特急',
    // 兼容老英文
    'normal': '普通',
    'urgent': '紧急',
    'critical': '特急'
  }
  return map[level] || '普通'
}

/**
 * 紧急程度颜色
 */
export function urgentColor(level) {
  const t = urgentText(level)
  const map = {
    '普通': 'default',
    '紧急': 'warning',
    '特急': 'danger'
  }
  return map[t] || 'default'
}

/**
 * 处理时长格式化（小时转 天/小时）
 */
export function formatDuration(hours) {
  if (!hours) return '-'
  if (hours < 1) return Math.floor(hours * 60) + '分钟'
  if (hours < 24) return Math.floor(hours) + '小时'
  const days = Math.floor(hours / 24)
  const restHours = Math.floor(hours % 24)
  return restHours > 0 ? `${days}天${restHours}小时` : `${days}天`
}

/**
 * 文件大小格式化
 */
export function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + 'B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB'
  return (bytes / 1024 / 1024).toFixed(1) + 'MB'
}

/**
 * 手机号脱敏
 */
export function maskPhone(phone) {
  if (!phone || phone.length !== 11) return phone
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

export default {
  normalizeStatus,
  formatDate,
  relativeTime,
  formatMoney,
  statusText,
  statusColor,
  urgentText,
  urgentColor,
  formatDuration,
  formatFileSize,
  maskPhone
}
