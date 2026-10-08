#!/usr/bin/env node
/* eslint-disable */
/**
 * check-states.js - 三态（空/加载/错误）体检（只读，不修改文件）
 * 扫描列表类页面，检查是否具备：Skeleton 骨架屏 / EmptyState 空状态 / 错误态（重试）
 * 运行：node scripts/check-states.js
 */
const fs = require('fs')
const path = require('path')
const ROOT = path.resolve(__dirname, '..')

function listFiles(dir, ext) {
  const out = []
  if (!fs.existsSync(dir)) return out
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const st = fs.statSync(full)
    if (st.isDirectory()) out.push(...listFiles(full, ext))
    else if (!ext || name.endsWith(ext)) out.push(full)
  }
  return out
}

const pages = listFiles(path.join(ROOT, 'pages'), '.vue')

// 非列表页（表单/配置/静态/离线），不适用骨架屏，避免启发式误报
const NON_LIST = new Set([
  'pages/admin/finance-publish.vue',
  'pages/admin/module-config.vue',
  'pages/admin/name-config.vue',
  'pages/admin/publish.vue',
  'pages/admin/projection.vue',
  'pages/category/list.vue',
  'pages/feedback/feedback.vue',
  'pages/service/more.vue',
  'pages/snapshot/snapshot.vue',
  'pages/vote/detail.vue'
])

const listPages = pages.filter(p => {
  if (NON_LIST.has(path.relative(ROOT, p).split(path.sep).join('/'))) return false
  const c = fs.readFileSync(p, 'utf8')
  const vforCount = (c.match(/v-for=/g) || []).length
  return c.includes('<scroll-view') || vforCount >= 2
})

const missingSkeleton = []
const missing = []
for (const p of listPages) {
  const c = fs.readFileSync(p, 'utf8')
  const rel = path.relative(ROOT, p).split(path.sep).join('/')
  const hasSkeleton = c.includes('Skeleton')
  const hasEmpty = c.includes('EmptyState')
  const hasError = /retry|重新加载|加载失败|loadError/.test(c)
  if (!hasSkeleton) missingSkeleton.push(rel)
  if (!(hasSkeleton && hasEmpty && hasError)) {
    missing.push({ p: rel, hasSkeleton, hasEmpty, hasError })
  }
}

console.log('列表类页面总数（已排除非列表页）：' + listPages.length)
console.log('缺骨架屏的列表页：' + missingSkeleton.length)
missingSkeleton.forEach(p => console.log('  ' + p))
console.log('三态不完整页面（含缺空态/错误态）：' + missing.length)
for (const r of missing) {
  console.log('  ' + r.p + '  骨架:' + (r.hasSkeleton ? 'Y' : 'N') + ' 空态:' + (r.hasEmpty ? 'Y' : 'N') + ' 错误态:' + (r.hasError ? 'Y' : 'N'))
}
