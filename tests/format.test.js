/**
 * tests/format.test.js - utils/format.js 单测
 * 直接 import 真实源码，避免"复制逻辑"与实现漂移
 */
import { describe, it, expect } from 'vitest'
import {
  normalizeStatus,
  urgentText,
  formatMoney,
  formatDuration,
  maskPhone
} from '../utils/format.js'

describe('format normalizeStatus', () => {
  it('英文 status 转中文', () => {
    expect(normalizeStatus('completed')).toBe('已完成')
    expect(normalizeStatus('pending')).toBe('待处理')
    expect(normalizeStatus('urgent')).toBe('紧急')
  })

  it('中文 status 原样', () => {
    expect(normalizeStatus('已完成')).toBe('已完成')
  })

  it('overdue 归一化为「已超时」', () => {
    expect(normalizeStatus('overdue')).toBe('已超时')
  })
})

describe('format urgentText', () => {
  it('中英文兼容', () => {
    expect(urgentText('普通')).toBe('普通')
    expect(urgentText('normal')).toBe('普通')
    expect(urgentText('urgent')).toBe('紧急')
    expect(urgentText('critical')).toBe('特急')
  })

  it('未知值兜底普通', () => {
    expect(urgentText('未知')).toBe('普通')
    expect(urgentText('')).toBe('普通')
  })
})

describe('format formatMoney', () => {
  it('常规数字', () => {
    expect(formatMoney(12345.67)).toBe('12,345.67')
    expect(formatMoney(1000)).toBe('1,000.00')
  })

  it('null/undefined', () => {
    expect(formatMoney(null)).toBe('0.00')
    expect(formatMoney(undefined)).toBe('0.00')
  })
})

describe('format formatDuration', () => {
  it('小时数', () => {
    expect(formatDuration(2)).toBe('2小时')
    expect(formatDuration(23.5)).toBe('23小时')
  })

  it('天数', () => {
    expect(formatDuration(24)).toBe('1天')
    expect(formatDuration(48)).toBe('2天')
    expect(formatDuration(36)).toBe('1天12小时')
  })

  it('分钟数', () => {
    expect(formatDuration(0.5)).toBe('30分钟')
    expect(formatDuration(0.25)).toBe('15分钟')
  })

  it('空值', () => {
    expect(formatDuration(0)).toBe('-')
    expect(formatDuration(null)).toBe('-')
    expect(formatDuration(undefined)).toBe('-')
  })
})

describe('format maskPhone', () => {
  it('标准 11 位手机号', () => {
    expect(maskPhone('13812345678')).toBe('138****5678')
  })

  it('非 11 位不处理', () => {
    expect(maskPhone('12345')).toBe('12345')
    expect(maskPhone('')).toBe('')
    expect(maskPhone(null)).toBe(null)
  })
})
