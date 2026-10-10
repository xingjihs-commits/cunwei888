#!/usr/bin/env node
/* eslint-disable */
/**
 * compare-tokens.js - 双源 token 校验：uni.scss ↔ utils/theme.js
 *
 * theme.js 是模板属性用的 JS 镜像，注释约定「与 uni.scss 保持一致」，
 * 此脚本把约定变成机器校验：
 *   1. theme.js 每个 hex 常量必须在 uni.scss 找到同值 token（$x → X，kebab → 大写下划线）
 *   2. chip 六色必须双向齐全（$chip-*-bg ↔ CHIP_BG.*，$chip-*-text ↔ CHIP_TEXT.*）
 *   3. 同名同源 token 值不一致 → error
 * uni.scss 有而 theme.js 无 → 合法（JS 侧只镜像模板属性用到的色值）
 *
 * 有不一致：退出码 1；全部通过：退出码 0
 * 运行：npm run check:tokens
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const scssSrc = fs.readFileSync(path.join(ROOT, 'uni.scss'), 'utf8')
const jsSrc = fs.readFileSync(path.join(ROOT, 'utils', 'theme.js'), 'utf8')

function norm(hex) {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return hex.toUpperCase()
  const h = hex.slice(1).toUpperCase()
  return '#' + h[0] + h[1] + h[2] + h[3] + h[4] + h[5]
}

// ---- 解析 uni.scss：$name: value;（支持 $a: $b 引用解引用、行尾注释）----
const scssRaw = {}
for (const line of scssSrc.split(/\r?\n/)) {
  const m = line.match(/^\s*\$([a-z0-9-]+)\s*:\s*([^;]+);/)
  if (m) scssRaw[m[1]] = m[2].trim()
}
const scssHex = {}
for (const [name, val] of Object.entries(scssRaw)) {
  const refs = val.match(/\$[a-z0-9-]+/g)
  let resolved = val
  if (refs) {
    for (const r of refs) {
      const rn = r.slice(1)
      if (scssRaw[rn]) resolved = resolved.replace(r, scssRaw[rn])
    }
  }
  const hex = resolved.match(/#[0-9a-fA-F]{6}\b/)
  if (hex && !refs) scssHex[name] = norm(hex[0])
  else if (hex && refs && /^#[0-9a-fA-F]{6}\s*$/.test(resolved.trim())) scssHex[name] = norm(resolved.trim())
}

// ---- 解析 theme.js：export const X = '#hex' 与 CHIP 对象 ----
const jsTokens = {}
for (const m of jsSrc.matchAll(/export\s+const\s+([A-Z_]+)\s*=\s*'([^']+)'/g)) {
  if (/^#[0-9a-fA-F]{6}$/i.test(m[2])) jsTokens[m[1]] = norm(m[2])
}
const jsChips = { bg: {}, text: {} }
for (const objName of ['CHIP_BG', 'CHIP_TEXT']) {
  const re = new RegExp('export\\s+const\\s+' + objName + '\\s*=\\s*\\{([\\s\\S]*?)\\}')
  const om = jsSrc.match(re)
  if (!om) continue
  for (const km of om[1].matchAll(/([a-z]+)\s*:\s*'([^']+)'/g)) {
    if (/^#[0-9a-fA-F]{6}$/i.test(km[2])) {
      const bucket = objName === 'CHIP_BG' ? jsChips.bg : jsChips.text
      bucket[km[1]] = norm(km[2])
    }
  }
}

// ---- 校验 ----
const errors = []
function scssNameOf(jsName) {
  // PRIMARY_DARK → primary-dark；STAR_GOLD → star-gold
  return jsName.toLowerCase().replace(/_/g, '-')
}

for (const [jsName, jsVal] of Object.entries(jsTokens)) {
  const sName = scssNameOf(jsName)
  const sVal = scssHex[sName]
  if (!sVal) {
    errors.push('theme.js ' + jsName + ' (' + jsVal + ') 在 uni.scss 无同名同值 token $' + sName)
    continue
  }
  if (sVal !== jsVal) {
    errors.push('值不一致：theme.js ' + jsName + '=' + jsVal + '  uni.scss $' + sName + '=' + sVal)
  }
}

for (const color of ['red', 'gold', 'green', 'blue', 'orange', 'gray']) {
  if (!jsChips.bg[color]) errors.push('theme.js CHIP_BG 缺 ' + color + '（uni.scss $chip-' + color + '-bg）')
  if (!jsChips.text[color]) errors.push('theme.js CHIP_TEXT 缺 ' + color + '（uni.scss $chip-' + color + '-text）')
  const sBg = scssHex['chip-' + color + '-bg']
  const sText = scssHex['chip-' + color + '-text']
  if (sBg && jsChips.bg[color] && sBg !== jsChips.bg[color]) {
    errors.push('chip ' + color + ' 底色不一致：CHIP_BG=' + jsChips.bg[color] + '  $chip-' + color + '-bg=' + sBg)
  }
  if (sText && jsChips.text[color] && sText !== jsChips.text[color]) {
    errors.push('chip ' + color + ' 字色不一致：CHIP_TEXT=' + jsChips.text[color] + '  $chip-' + color + '-text=' + sText)
  }
}

// rgba 字符串常量：必须在 uni.scss 有同名 token（STAR_GOLD_DIM ↔ $star-gold-dim），
// 且解引用 $token → hex 数值化后与 JS 值一致
function hexToRgbTriple(hex) {
  const h = hex.replace('#', '')
  return parseInt(h.slice(0, 2), 16) + ',' + parseInt(h.slice(2, 4), 16) + ',' + parseInt(h.slice(4, 6), 16)
}
function normRgba(s) {
  return s.replace(/\s/g, '').replace(/#([0-9a-fA-F]{6})/g, (_, h) => hexToRgbTriple(h)).toLowerCase()
}
for (const m of jsSrc.matchAll(/export\s+const\s+([A-Z_]+)\s*=\s*'(rgba\([^']+\))'/g)) {
  const sName = scssNameOf(m[1])
  const sRaw = scssRaw[sName]
  if (!sRaw) {
    errors.push('theme.js ' + m[1] + ' (' + m[2] + ') 在 uni.scss 无对应 token $' + sName)
    continue
  }
  let resolved = sRaw
  for (const r of sRaw.match(/\$[a-z0-9-]+/g) || []) {
    const rv = scssRaw[r.slice(1)]
    if (rv) resolved = resolved.replace(r, rv)
  }
  if (normRgba(resolved) !== normRgba(m[2])) {
    errors.push('rgba 值不一致：theme.js ' + m[1] + '=' + m[2] + '  uni.scss $' + sName + '=' + sRaw)
  }
}

if (errors.length === 0) {
  console.log('token 双源一致：uni.scss ↔ utils/theme.js')
  process.exit(0)
}
console.error('[check:tokens] 发现 ' + errors.length + ' 处双源不一致：')
for (const e of errors) console.error('  - ' + e)
console.error('规则：改色先改 uni.scss 再同步 utils/theme.js。')
process.exit(1)
