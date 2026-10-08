#!/usr/bin/env node
/* eslint-disable */
/**
 * check-structure.js - 文档与代码一致性检查
 * 1. README / docs/00 的数量 vs 实际
 * 2. docs/00 清单 vs 实际文件
 * 3. docs 编号连续性（允许已知未创建项）
 * 4. 云函数命名/分类映射一致性
 * 有不一致：退出码 1；全部一致：输出「文档与代码一致」，退出码 0
 * 运行：npm run check:doc
 */
const fs = require('fs')
const path = require('path')
const { scan, CLOUD_CLASSIFY, ROOT } = require('./gen-structure.js')

const errors = []
const warnings = []

function read(p) { return fs.readFileSync(path.join(ROOT, p), 'utf8') }
function numInTable(md, label) {
  const m = md.match(new RegExp('\\|\\s*' + label + '\\s*\\|\\s*(\\d+)'))
  return m ? parseInt(m[1], 10) : null
}

const s = scan()

// 1. README 数字
const readme = read('README.md')
const readmeChecks = [
  ['页面', s.pages.length],
  ['云函数', s.cloudDirs.length],
  ['组件', s.components.length],
  ['Utils', s.utils.length],
  ['文档', s.docsAll.length]
]
for (const [name, actual] of readmeChecks) {
  const stated = numInTable(readme, name)
  if (stated === null) errors.push('README 缺少「' + name + '」数量')
  else if (stated !== actual) errors.push('README ' + name + ' 数量 = ' + stated + '，实际 = ' + actual)
}

// 2. docs/00 数字 + 清单
const DOC00 = 'docs/00-代码结构清单.md'
if (!fs.existsSync(path.join(ROOT, DOC00))) {
  errors.push('docs/00-代码结构清单.md 不存在（先运行 npm run gen:doc）')
} else {
  const d00 = read(DOC00)
  for (const [name, actual] of [['页面', s.pages.length], ['云函数', s.cloudDirs.length], ['组件', s.components.length]]) {
    const stated = numInTable(d00, name)
    if (stated === null) errors.push('docs/00 缺少「' + name + '」数量')
    else if (stated !== actual) errors.push('docs/00 ' + name + ' 数量 = ' + stated + '，实际 = ' + actual)
  }
  for (const p of s.pages) if (!d00.includes(p)) errors.push('docs/00 缺少页面 ' + p)
  for (const c of s.cloudDirs) if (!d00.includes(c)) errors.push('docs/00 缺少云函数 ' + c)
}

// 2b. 人工明细文件必须存在
if (!fs.existsSync(path.join(ROOT, 'docs', '00a-云函数明细.md'))) {
  errors.push('docs/00a-云函数明细.md 不存在（人工明细文件）')
}

// 3. docs 编号连续性（顶层文件 + 目录都算编号）
const docsEntries = fs.readdirSync(path.join(ROOT, 'docs'))
const nums = docsEntries
  .map(n => n.match(/^(\d+)/))
  .filter(Boolean)
  .map(m => parseInt(m[1], 10))
const maxNum = nums.length ? Math.max(...nums) : 0
const ALLOW_MISSING = [32] // 已知未创建
for (let i = 0; i <= maxNum; i++) {
  if (!nums.includes(i)) {
    if (ALLOW_MISSING.includes(i)) warnings.push('docs/' + String(i).padStart(2, '0') + ' 未创建（已知，允许）')
    else errors.push('docs 编号缺号：' + String(i).padStart(2, '0'))
  }
}

// 4. 云函数命名/分类映射一致性
const known = new Set()
for (const [, names] of CLOUD_CLASSIFY) for (const n of names) known.add(n)
for (const c of s.cloudDirs) if (!known.has(c)) errors.push('云函数未登记到分类映射：' + c)
for (const n of known) if (!s.cloudDirs.includes(n)) errors.push('分类映射含不存在的云函数：' + n)

// 输出
for (const w of warnings) console.log('[警告] ' + w)
if (errors.length === 0) {
  console.log('文档与代码一致')
  console.log('  页面=' + s.pages.length + ' 云函数=' + s.cloudDirs.length + ' 组件=' + s.components.length +
    ' Utils=' + s.utils.length + ' 文档=' + s.docsAll.length)
  process.exit(0)
} else {
  console.error('[check:doc] 发现 ' + errors.length + ' 处不一致：')
  for (const e of errors) console.error('  - ' + e)
  process.exit(1)
}
