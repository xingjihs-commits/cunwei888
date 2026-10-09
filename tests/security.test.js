/**
 * tests/security.test.js - 内容安全决策纯逻辑单测
 * 直接 import 生产共用模块 cloudfunctions/common/securityLogic.js
 * （checkAdmin.js 内部调用同一份判定，避免测试与实现漂移）
 *
 * 注：checkAdmin / checkImageSecurity 依赖 wx-server-sdk（微信云运行时），
 * 其 IO 层（downloadFile / openapi）无法在本地 node 直接跑；
 * 这里覆盖不依赖云的「决策」与「鉴权计数」判定，IO 层由集成测试覆盖。
 */
import { describe, it, expect } from 'vitest'
import logic from '../cloudfunctions/common/securityLogic.js'

const { decideSecurity, isAdminCount } = logic

describe('decideSecurity 内容安全决策', () => {
  it('suggest=pass 应通过', () => {
    expect(decideSecurity({ result: { suggest: 'pass' } })).toBe(true)
  })

  it('suggest=review 应入复审', () => {
    expect(decideSecurity({ result: { suggest: 'review' } })).toBe('review')
  })

  it('suggest=risky 应拒绝', () => {
    expect(decideSecurity({ result: { suggest: 'risky' } })).toBe(false)
  })

  it('suggest 缺失时默认 pass（兼容老接口）', () => {
    expect(decideSecurity({ errcode: 0 })).toBe(true)
  })

  it('res 为空时 fail-closed 入复审', () => {
    expect(decideSecurity(null)).toBe('review')
    expect(decideSecurity(undefined)).toBe('review')
  })

  it('顶层 suggest 字段也识别', () => {
    expect(decideSecurity({ suggest: 'review' })).toBe('review')
    expect(decideSecurity({ suggest: 'pass' })).toBe(true)
  })
})

describe('isAdminCount 鉴权判定', () => {
  it('count>0 视为管理员', () => {
    expect(isAdminCount({ total: 1 })).toBe(true)
    expect(isAdminCount({ total: 3 })).toBe(true)
  })

  it('count=0 拒绝', () => {
    expect(isAdminCount({ total: 0 })).toBe(false)
  })

  it('空/异常返回拒绝（fail-closed）', () => {
    expect(isAdminCount(null)).toBe(false)
    expect(isAdminCount(undefined)).toBe(false)
    expect(isAdminCount({})).toBe(false)
  })
})
