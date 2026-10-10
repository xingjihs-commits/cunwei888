/**
 * tests/docUtils.test.js - common/docUtils.js 纯函数测试
 * 直接 import 真实源码；覆盖 pluckDoc 双形态返回提取 / hashId 稳定性 /
 * csvEscape 注入防护 / escapeRegExp
 */
import { describe, it, expect } from 'vitest'
import { pluckDoc, hashId, csvEscape, escapeRegExp } from '../cloudfunctions/common/docUtils.js'

describe('pluckDoc：兼容 doc().get() 单对象与 where().get() 数组两种返回形态', () => {
  it('单文档对象（IQuerySingleResult）→ 返回该对象', () => {
    const res = { data: { _id: 'a1', title: 'x' } }
    expect(pluckDoc(res)).toEqual({ _id: 'a1', title: 'x' })
  })

  it('数组（IQueryResult）非空 → 返回第一个元素', () => {
    const res = { data: [{ _id: 'a1' }, { _id: 'a2' }] }
    expect(pluckDoc(res)).toEqual({ _id: 'a1' })
  })

  it('空数组 → null（记录不存在）', () => {
    expect(pluckDoc({ data: [] })).toBeNull()
  })

  it('data 为 null/undefined/res 为 null → null', () => {
    expect(pluckDoc({ data: null })).toBeNull()
    expect(pluckDoc({})).toBeNull()
    expect(pluckDoc(null)).toBeNull()
    expect(pluckDoc(undefined)).toBeNull()
  })

  it('文档本身无 _id 也能提取（防御空文档）', () => {
    expect(pluckDoc({ data: {} })).toEqual({})
  })
})

describe('hashId：匿名标识 sha256 短哈希', () => {
  it('相同 openid 输出相同哈希（防重复举报依赖此性质）', () => {
    expect(hashId('oABC123')).toBe(hashId('oABC123'))
  })

  it('不同 openid 输出不同哈希', () => {
    expect(hashId('oAAA')).not.toBe(hashId('oBBB'))
  })

  it('输出格式 anon_ + 16 位十六进制', () => {
    const h = hashId('oABC123')
    expect(h).toMatch(/^anon_[0-9a-f]{16}$/)
  })

  it('空值也能稳定输出（不抛异常）', () => {
    expect(hashId('')).toBe(hashId(''))
  })
})

describe('csvEscape：CSV 单元格转义与注入防护', () => {
  it('普通文本原样输出', () => {
    expect(csvEscape('普通文本')).toBe('普通文本')
  })

  it('含逗号/引号/换行 → 包裹引号并转义内部引号', () => {
    expect(csvEscape('a,b')).toBe('"a,b"')
    expect(csvEscape('say "hi"')).toBe('"say ""hi"""')
    expect(csvEscape('line1\nline2')).toBe('"line1\nline2"')
  })

  it('公式注入前缀（=+-@）→ 前置单引号', () => {
    expect(csvEscape('=cmd')).toBe("'=cmd")
    expect(csvEscape('+1')).toBe("'+1")
    expect(csvEscape('-1')).toBe("'-1")
    expect(csvEscape('@x')).toBe("'@x")
  })

  it('null/undefined → 空字符串', () => {
    expect(csvEscape(null)).toBe('')
    expect(csvEscape(undefined)).toBe('')
  })

  it('数字正常输出', () => {
    expect(csvEscape(5)).toBe('5')
  })
})

describe('escapeRegExp：正则元字符转义', () => {
  it('转义所有特殊字符', () => {
    expect(escapeRegExp('a.b*c')).toBe('a\\.b\\*c')
    expect(escapeRegExp('(x)+[y]')).toBe('\\(x\\)\\+\\[y\\]')
    expect(escapeRegExp('^$|{}?\\')).toBe('\\^\\$\\|\\{\\}\\?\\\\')
  })

  it('普通字符串不变', () => {
    expect(escapeRegExp('水稻')).toBe('水稻')
  })

  it('构造 RegExp 可用（防注入后仍能匹配原文）', () => {
    const input = '玉米(新)'
    const re = new RegExp(escapeRegExp(input), 'i')
    expect(re.test(input)).toBe(true)
    expect(re.test('玉米新')).toBe(false)
  })
})
