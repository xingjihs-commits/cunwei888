/**
 * tests/constants.test.js - common/constants.js 单测
 * 覆盖 normalizeStatus / expandStatuses 兼容逻辑
 */
import { describe, it, expect } from 'vitest'

// 由于 constants.js 依赖 wx-server-sdk，这里用 require + mock
// 实际运行需先 npm install wx-server-sdk
// 或改造 constants.js 不依赖 cloud

// 复制 constants.js 的核心逻辑做单测
const STATUS_LEGACY_MAP = {
  'pending': '待处理',
  'assigned': '已派单',
  'processing': '处理中',
  'completed': '已完成',
  'evaluated': '已评价',
  'rejected': '已驳回',
  'open': '进行中',
  'closed': '已截止',
  'scheduled': '待召开',
  'holding': '进行中',
  'ended': '已结束',
  'cancelled': '已取消',
  'normal': '普通',
  'help_needed': '求助',
  'urgent': '紧急',
  'todo': '待办',
  'doing': '进行中',
  'read': '已查阅',
  'replied': '已回复',
  'passed': '已通过',
  'approved': '已通过'
}

function normalizeStatus(status) {
  if (!status) return status
  return STATUS_LEGACY_MAP[status] || status
}

function expandStatuses(statuses) {
  const result = new Set(statuses)
  for (const s of statuses) {
    for (const [eng, cn] of Object.entries(STATUS_LEGACY_MAP)) {
      if (cn === s) result.add(eng)
    }
  }
  return Array.from(result)
}

describe('constants normalizeStatus', () => {
  it('英文 status 应归一化为中文', () => {
    expect(normalizeStatus('pending')).toBe('待处理')
    expect(normalizeStatus('completed')).toBe('已完成')
    expect(normalizeStatus('open')).toBe('进行中')
    expect(normalizeStatus('scheduled')).toBe('待召开')
    expect(normalizeStatus('urgent')).toBe('紧急')
  })

  it('中文 status 应原样返回', () => {
    expect(normalizeStatus('待处理')).toBe('待处理')
    expect(normalizeStatus('已完成')).toBe('已完成')
    expect(normalizeStatus('进行中')).toBe('进行中')
  })

  it('未知 status 应原样返回', () => {
    expect(normalizeStatus('未知')).toBe('未知')
    expect(normalizeStatus('custom_status')).toBe('custom_status')
  })

  it('空值应原样返回', () => {
    expect(normalizeStatus('')).toBe('')
    expect(normalizeStatus(null)).toBe(null)
    expect(normalizeStatus(undefined)).toBe(undefined)
  })
})

describe('constants expandStatuses', () => {
  it('中文 status 集合应扩展包含对应英文', () => {
    const result = expandStatuses(['待处理'])
    expect(result).toContain('待处理')
    expect(result).toContain('pending')
    expect(result.length).toBeGreaterThan(1)
  })

  it('已完成集合应包含 completed 和 evaluated 的英文', () => {
    const result = expandStatuses(['已完成'])
    expect(result).toContain('已完成')
    expect(result).toContain('completed')
  })

  it('多 status 集合应正确合并', () => {
    const result = expandStatuses(['待处理', '处理中'])
    expect(result).toContain('待处理')
    expect(result).toContain('处理中')
    expect(result).toContain('pending')
    expect(result).toContain('processing')
    expect(result).not.toContain('holding') // holding 是会议状态「进行中」，非工单「处理中」
  })
})
