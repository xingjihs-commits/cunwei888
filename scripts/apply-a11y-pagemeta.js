/**
 * scripts/apply-a11y-pagemeta.js - 为所有页面注入适老化 rem 基准（方案 B）
 * 作用：
 *   1. 在每个 pages/**\/*.vue 的 <template> 首位插入
 *      <page-meta :root-font-size="rootFontSize" />
 *   2. 在 <script setup> 内确保 import { useRootFontSize } 与 const rootFontSize = useRootFontSize()
 * 幂等：已含 <page-meta 或 useRootFontSize 的页面会跳过对应步骤。
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const PAGES = path.join(ROOT, 'pages')
const IMPORT_LINE = "import { useRootFontSize } from '@/composables/useA11y.js'"
const CONST_LINE = 'const rootFontSize = useRootFontSize()'
const PAGEMETA = '  <page-meta :root-font-size="rootFontSize" />'

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const st = fs.statSync(full)
    if (st.isDirectory()) walk(full, out)
    else if (name.endsWith('.vue')) out.push(full)
  }
}

const files = []
walk(PAGES, files)

let changed = 0
const skipped = []

for (const f of files) {
  let src = fs.readFileSync(f, 'utf8')
  const original = src
  let touched = false

  // 1. 插入 page-meta（模板首位）
  if (!/<page-meta/.test(src)) {
    if (/<template>\r?\n/.test(src)) {
      src = src.replace(/<template>(\r?\n)/, `<template>$1${PAGEMETA}$1`)
      touched = true
    } else {
      skipped.push(path.relative(ROOT, f) + ' (无 <template> 换行)')
      continue
    }
  }

  // 2. 插入 import + const
  if (!/useRootFontSize/.test(src)) {
    if (/<script setup>/.test(src)) {
      src = src.replace(/<script setup>/, `<script setup>\n${IMPORT_LINE}`)
      const start = src.indexOf('<script setup>')
      const end = src.indexOf('</script>', start)
      const head = src.slice(0, start)
      const body = src.slice(start, end)
      const tail = src.slice(end)
      const lines = body.split('\n')
      let lastImport = 0
      for (let i = 0; i < lines.length; i++) {
        if (/^\s*import\s/.test(lines[i])) lastImport = i
      }
      lines.splice(lastImport + 1, 0, CONST_LINE)
      src = head + lines.join('\n') + tail
      touched = true
    } else {
      skipped.push(path.relative(ROOT, f) + ' (无 <script setup>)')
      continue
    }
  }

  if (touched && src !== original) {
    fs.writeFileSync(f, src)
    changed++
  }
}

console.log('pages total:', files.length, ' changed:', changed)
if (skipped.length) console.log('SKIPPED:\n' + skipped.join('\n'))
