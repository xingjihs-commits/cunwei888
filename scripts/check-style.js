#!/usr/bin/env node
/* eslint-disable */
/**
 * check-style.js - 检测 .vue 组件硬编码色值
 *
 * strict（退出码 1）：
 *   - <style> 块内 #hex（历史规则）
 * report（默认只打印，STYLE_STRICT=1 时升级为 fail）：
 *   - <style> 块内 rgba(数字,...)（应写 rgba($token, alpha)）
 *   - 模板/属性位置的 #hex（应绑定 utils/theme.js 常量）
 *
 * 运行：npm run style:check ｜ STYLE_STRICT=1 npm run style:check
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const EXCLUDE_DIRS = new Set(['node_modules', 'dist', 'unpackage', '.git', 'coverage', 'static', 'docs'])
const HEX = /#[0-9a-fA-F]{3,8}\b/g
const RGBA_NUM = /\brgba\(\s*\d/g
const STRICT = process.env.STYLE_STRICT === '1'

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

function checkFile(file, violations, reports) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/')
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
  // 三态跟踪：template / script / style；script 内的 hex 是功能代码（SVG mask 等），不报
  let block = 'script'
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (block !== 'template' && /<template\b/.test(line)) block = 'template'
    else if (block !== 'style' && /<script\b/.test(line)) block = 'script'
    else if (/<style\b/.test(line)) block = 'style'

    if (block === 'style') {
      const hits = line.match(HEX)
      if (hits) {
        violations.push({ file: rel, line: i + 1, hits: hits.join(', '), text: line.trim() })
      }
      const rgbaHits = line.match(RGBA_NUM)
      if (rgbaHits) {
        reports.push({ file: rel, line: i + 1, kind: 'rgba(数字色)', text: line.trim() })
      }
    } else if (block === 'template' && HEX.test(line)) {
      HEX.lastIndex = 0
      reports.push({ file: rel, line: i + 1, kind: '模板 hex', text: line.trim() })
    }
    if (/<\/style>/.test(line)) block = 'script'
  }
}

function main() {
  const files = []
  walk(ROOT, files)
  const violations = []
  const reports = []
  for (const f of files) checkFile(f, violations, reports)

  if (reports.length > 0) {
    const head = '[style:check][report] ' + reports.length + ' 处历史遗留（rgba 数字色 / 模板 hex），不拦截：'
    if (STRICT) console.error(head)
    else console.log(head)
    for (const v of reports) {
      const out = '  - ' + v.file + ':' + v.line + '  [' + v.kind + ']  ' + v.text
      if (STRICT) console.error(out)
      else console.log(out)
    }
    if (STRICT && reports.length > 0) {
      console.error('存量清零前请使用 report 模式（不带 STYLE_STRICT）。')
      process.exit(1)
    }
  }

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
