/**
 * tests/constants.test.js - cloudfunctions/common/constants.js 单测
 * 直接 import 真实源码，避免"复制逻辑"与实现漂移
 */
import { describe, it, expect } from 'vitest'
import constants from '../cloudfunctions/common/constants.js'

const { normalizeStatus, expandStatuses, RECORD_STATUS, STATUS_LEGACY_MAP } = constants

describe('constants normalizeStatus', () => {
  it('英文 status 应归一化为中文', () => {
    expect(normalizeStatus('pending')).toBe('待处理')
    expect(normalizeStatus('completed')).toBe('已完成')
    expect(normalizeStatus('open')).toBe('进行中')
    expect(normalizeStatus('scheduled')).toBe('待召开')
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

  it('overdue 历史标记归一化为「处理中」（非「已超时」）', () => {
    expect(normalizeStatus('overdue')).toBe(RECORD_STATUS.PROCESSING)
  })
})

describe('constants expandStatuses', () => {
  it('中文 status 集合应扩展包含对应英文', () => {
    const result = expandStatuses(['待处理'])
    expect(result).toContain('待处理')
    expect(result).toContain('pending')
    expect(result.length).toBeGreaterThan(1)
  })

  it('已完成集合应包含 completed', () => {
    const result = expandStatuses(['已完成'])
    expect(result).toContain('已完成')
    expect(result).toContain('completed')
  })

  it('多 status 集合应正确合并，且不误并同义异类', () => {
    const result = expandStatuses(['待处理', '处理中'])
    expect(result).toContain('pending')
    expect(result).toContain('processing')
    expect(result).not.toContain('holding') // holding 是会议「进行中」，非工单「处理中」
  })

  it('兼容映射表存在且覆盖主要历史枚举', () => {
    expect(Object.keys(STATUS_LEGACY_MAP).length).toBeGreaterThan(10)
  })
})
