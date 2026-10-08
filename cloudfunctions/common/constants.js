/**
 * cloudfunctions/common/constants.js - 全局中文常量
 * 用途：统一 status / type / superviseLevel 等枚举值，避免中英文混用导致查询失效
 * 所有云函数应使用本文件中的常量，禁止硬编码 'pending' / 'completed' 等英文枚举
 */

// ============== 工单（records）状态 ==============
const RECORD_STATUS = {
  PENDING: '待处理',       // 刚提交未派单
  ASSIGNED: '已派单',       // 已分配责任人但未开始处理
  PROCESSING: '处理中',     // 责任人处理中（含亲阅件）
  COMPLETED: '已完成',       // 处理完成等待评价
  EVALUATED: '已评价',       // 村民已评价
  REJECTED: '已驳回'         // 复审驳回或村民撤销
}

// 工单"未完成"集合（用于催办、待办查询）
const RECORD_OPEN_STATUSES = [RECORD_STATUS.PENDING, RECORD_STATUS.ASSIGNED, RECORD_STATUS.PROCESSING]
// 工单"已完成"集合（用于统计、看板）
const RECORD_DONE_STATUSES = [RECORD_STATUS.COMPLETED, RECORD_STATUS.EVALUATED]

// ============== 反映/工单事项类型（中文，与 store/config.js 一致）==============
const FEEDBACK_TYPES = ['环境卫生', '道路水利', '矛盾纠纷', '干部作风', '安全隐患', '其他']

// 干部作风类型自动亲阅
const SECRET_TYPES = ['干部作风']

// ============== 监督级别 ==============
const SUPERVISE_LEVEL = {
  NORMAL: '普通',
  SUPERVISE: '督办',
  SECRET: '亲阅'
}

// ============== 紧急程度 ==============
const URGENT_LEVEL = {
  NORMAL: '普通',
  URGENT: '紧急',
  CRITICAL: '特急'
}

// 紧急程度→处理时限（小时）
const DEADLINE_MAP = {
  '普通': 72,
  '紧急': 24,
  '特急': 12
}

// ============== 任务（tasks）状态 ==============
const TASK_STATUS = {
  TODO: '待办',
  ASSIGNED: '已派单',
  DOING: '进行中',
  COMPLETED: '已完成',
  CANCELLED: '已取消'
}

const TASK_OPEN_STATUSES = [TASK_STATUS.TODO, TASK_STATUS.ASSIGNED, TASK_STATUS.DOING]
const TASK_DONE_STATUSES = [TASK_STATUS.COMPLETED]

// ============== 表决（votes）状态 ==============
const VOTE_STATUS = {
  OPEN: '进行中',
  CLOSED: '已截止',
  ENDED: '已结束'
}

// ============== 会议（meetings）状态 ==============
const MEETING_STATUS = {
  SCHEDULED: '待召开',
  HOLDING: '进行中',
  ENDED: '已结束',
  CANCELLED: '已取消'
}

// ============== 失物招领（records 子类）状态 ==============
const LOST_FOUND_STATUS = {
  OPEN: '进行中',
  CLOSED: '已结束'
}

// ============== 书记信箱（secretary_mails）状态 ==============
const MAIL_STATUS = {
  PENDING: '待处理',
  READ: '已查阅',
  REPLIED: '已回复',
  CLOSED: '已关闭'
}

// ============== 整改（rectifications）状态 ==============
const RECTIFICATION_STATUS = {
  DOING: '整改中',
  DONE: '已整改'
}

// ============== 内容审核状态 ==============
const AUDIT_STATUS = {
  PENDING: '待复审',
  PASSED: '已通过',
  REJECTED: '已驳回'
}

// ============== 用户认证状态 ==============
const VERIFY_STATUS = {
  PENDING: '待审核',
  APPROVED: '已通过',
  REJECTED: '已驳回'
}

// ============== 价格趋势 ==============
const PRICE_TREND = {
  UP: '上涨',
  DOWN: '下跌',
  STABLE: '稳定'
}

// ============== 通用方法：兼容性映射 ==============
// 把历史英文 status 映射为中文，便于读取老数据
const STATUS_LEGACY_MAP = {
  // records
  'pending': RECORD_STATUS.PENDING,
  'assigned': RECORD_STATUS.ASSIGNED,
  'processing': RECORD_STATUS.PROCESSING,
  'completed': RECORD_STATUS.COMPLETED,
  'evaluated': RECORD_STATUS.EVALUATED,
  'rejected': RECORD_STATUS.REJECTED,
  'overdue': RECORD_STATUS.PROCESSING,  // 历史的 overdue 不是状态而是 isOverdue 标记
  // tasks
  'todo': TASK_STATUS.TODO,
  'doing': TASK_STATUS.DOING,
  'cancelled': TASK_STATUS.CANCELLED,
  // votes
  'open': VOTE_STATUS.OPEN,
  'closed': VOTE_STATUS.CLOSED,
  // meetings
  'scheduled': MEETING_STATUS.SCHEDULED,
  'holding': MEETING_STATUS.HOLDING,
  'ended': MEETING_STATUS.ENDED,
  // lost_found
  'open': LOST_FOUND_STATUS.OPEN,
  'closed': LOST_FOUND_STATUS.CLOSED,
  // secretary_mails
  'read': MAIL_STATUS.READ,
  'replied': MAIL_STATUS.REPLIED,
  // rectifications
  'done': RECTIFICATION_STATUS.DONE,
  // audit
  'passed': AUDIT_STATUS.PASSED,
  // verify
  'approved': VERIFY_STATUS.APPROVED
}

/**
 * 把任意 status 归一化为中文（用于读取老数据兼容）
 */
function normalizeStatus(status) {
  if (!status) return status
  if (STATUS_LEGACY_MAP[status]) return STATUS_LEGACY_MAP[status]
  return status
}

/**
 * 批量归一化 status 集合（用于 in 查询时兼容老数据）
 * 返回包含中英文两种形态的并集
 */
function expandStatuses(statuses) {
  const result = new Set(statuses)
  for (const s of statuses) {
    // 找到所有映射到 s 的旧 key
    for (const [eng, cn] of Object.entries(STATUS_LEGACY_MAP)) {
      if (cn === s) result.add(eng)
    }
  }
  return Array.from(result)
}

module.exports = {
  RECORD_STATUS,
  RECORD_OPEN_STATUSES,
  RECORD_DONE_STATUSES,
  FEEDBACK_TYPES,
  SECRET_TYPES,
  SUPERVISE_LEVEL,
  URGENT_LEVEL,
  DEADLINE_MAP,
  TASK_STATUS,
  TASK_OPEN_STATUSES,
  TASK_DONE_STATUSES,
  VOTE_STATUS,
  MEETING_STATUS,
  LOST_FOUND_STATUS,
  MAIL_STATUS,
  RECTIFICATION_STATUS,
  AUDIT_STATUS,
  VERIFY_STATUS,
  PRICE_TREND,
  STATUS_LEGACY_MAP,
  normalizeStatus,
  expandStatuses
}
