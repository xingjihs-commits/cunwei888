import { describe, it, expect } from 'vitest'
import { getTodayTerm, getFarmingAdvice } from '../utils/farmingCalendar.js'

describe('farmingCalendar 节气', () => {
  it('日期落在正确节气区间', () => {
    expect(getTodayTerm(new Date(2026, 9, 7))).toBe('秋分')
    expect(getTodayTerm(new Date(2026, 9, 9))).toBe('寒露')
    expect(getTodayTerm(new Date(2026, 9, 22))).toBe('寒露')
    expect(getTodayTerm(new Date(2026, 9, 23))).toBe('霜降')
  })

  it('跨年时归属冬至', () => {
    expect(getTodayTerm(new Date(2026, 0, 3))).toBe('冬至')
  })

  it('农事建议非空且含关键字', () => {
    const a = getFarmingAdvice(new Date(2026, 9, 9))
    expect(a.term).toBe('寒露')
    expect(a.yi).toContain('冬小麦')
    expect(a.ji).toBeTruthy()
  })
})
