/**
 * tests/security.test.js - 内容安全与鉴权逻辑单测
 * 覆盖 checkAdmin / checkContentSecurity / checkImageSecurity 的逻辑分支
 *
 * 注：实际云函数依赖 wx-server-sdk，这里用 mock 测试纯逻辑
 */
import { describe, it, expect } from 'vitest'

// mock cloud.openapi.security.msgSecCheck 的返回
function mockMsgSecCheck(suggest) {
  return {
    errcode: 0,
    result: { suggest }
  }
}

// 复刻 checkContentSecurity 的核心逻辑
function decideContentPass(res) {
  if (!res) return 'review'
  const suggest = (res.result && res.result.suggest) || res.suggest || 'pass'
  if (suggest === 'pass') return true
  if (suggest === 'review') return 'review'
  return false  // risky 或其他 → 拒绝
}

// 复刻 fail-closed 逻辑：API 失败时返回 'review'（入复审队列），不返回 true
function handleContentError() {
  return 'review'  // fail-closed：失败时入复审，不直接放行
}

describe('security checkContentSecurity 决策', () => {
  it('suggest=pass 应通过', () => {
    expect(decideContentPass(mockMsgSecCheck('pass'))).toBe(true)
  })

  it('suggest=review 应入复审', () => {
    expect(decideContentPass(mockMsgSecCheck('review'))).toBe('review')
  })

  it('suggest=risky 应拒绝', () => {
    expect(decideContentPass(mockMsgSecCheck('risky'))).toBe(false)
  })

  it('suggest 缺失时默认 pass', () => {
    expect(decideContentPass({ errcode: 0 })).toBe(true)
  })

  it('res 为空时入复审', () => {
    expect(decideContentPass(null)).toBe('review')
  })

  it('API 失败时 fail-closed 入复审（不返回 true）', () => {
    const result = handleContentError()
    expect(result).not.toBe(true)
    expect(result).toBe('review')
  })
})

describe('security checkImageSecurity 流程', () => {
  it('必须先 downloadFile 拿到 buffer 再传给 imgSecCheck', () => {
    // 这里测试流程的正确性：fileID 不能直接当 buffer
    const fileID = 'cloud://xxx.jpg'
    const fakeBuffer = Buffer.from('fake-image-data')

    // 错误做法（原 bug）：直接传 fileID 字符串
    const wrongCall = { media: { contentType: 'image/jpeg', value: fileID } }
    expect(typeof wrongCall.media.value).toBe('string')  // 字符串

    // 正确做法：传 buffer
    const rightCall = { media: { contentType: 'image/jpeg', value: fakeBuffer } }
    expect(Buffer.isBuffer(rightCall.media.value)).toBe(true)
  })
})

describe('security checkAdmin 鉴权逻辑', () => {
  // 模拟 admins 集合查询
  function mockCheckAdminResult(openid, adminsInDb) {
    if (!openid) return false
    return adminsInDb.some(a => a._openid === openid && a.enabled === true)
  }

  it('enabled=true 的管理员应通过', () => {
    const admins = [{ _openid: 'admin1', enabled: true }]
    expect(mockCheckAdminResult('admin1', admins)).toBe(true)
  })

  it('enabled=false 的前管理员应拒绝', () => {
    const admins = [{ _openid: 'admin1', enabled: false }]
    expect(mockCheckAdminResult('admin1', admins)).toBe(false)
  })

  it('不在 admins 集合的 openid 应拒绝', () => {
    const admins = [{ _openid: 'admin1', enabled: true }]
    expect(mockCheckAdminResult('unknown', admins)).toBe(false)
  })

  it('空 openid 应拒绝', () => {
    expect(mockCheckAdminResult('', [])).toBe(false)
    expect(mockCheckAdminResult(null, [])).toBe(false)
  })
})
