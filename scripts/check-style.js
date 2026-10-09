#!/usr/bin/env node
/* eslint-disable */
/**
 * check-style.js - 检测 .vue 组件 <style> 块内的硬编码色值
 *
 * 规则：样式一律用 uni.scss 变量，禁止直接写 #hex（见 docs/31-UI布局规范.md）。
 * 模板属性（switch/slider 的 color 等）请用 utils/theme.js 的 JS token。
 *
 * 有不一致：退出码 1；全部通过：退出码 0
 * 运行：npm run style:check
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const EXCLUDE_DIRS = new Set(['node_modules', 'dist', 'unpackage', '.git', 'coverage', 'static', 'docs'])
const HEX = /#[0-9a-fA-F]{3,8}\b/g

function walk(dir, acc) {
  let entries
  try { entries = fs.readdirSync(dir, { withFileTypes: true }) } catch { return }
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name.startsWith('.') || EXCLUDE_DIRS.has(e.name)) continue
      walk(full, acc)
    } else if (e.isFile() && e.name.endsWith('.vue')) {
      acc.push(full)
    }
  }
}

function checkFile(file, violations) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
  let inStyle = false
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (/<style\b/.test(line)) inStyle = true
    if (inStyle) {
      const hits = line.match(HEX)
      if (hits) {
        violations.push({
          file: path.relative(ROOT, file).split(path.sep).join('/'),
          line: i + 1,
          hits: hits.join(', '),
          text: line.trim(),
        })
      }
    }
    if (/<\/style>/.test(line)) inStyle = false
  }
}

function main() {
  const files = []
  walk(ROOT, files)
  const violations = []
  for (const f of files) checkFile(f, violations)

  if (violations.length === 0) {
    console.log('样式规范通过：无硬编码色值（.vue <style>）')
    process.exit(0)
  }
  console.error('[style:check] 发现 ' + violations.length + ' 处硬编码色值（应改用 uni.scss 变量）：')
  for (const v of violations) {
    console.error('  - ' + v.file + ':' + v.line + '  [' + v.hits + ']  ' + v.text)
  }
  console.error('规则见 docs/31-UI布局规范.md；模板属性色值用 utils/theme.js。')
  process.exit(1)
}

main()
