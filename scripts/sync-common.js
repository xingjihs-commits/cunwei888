/**
 * scripts/sync-common.js - 云函数公共模块同步脚本
 *
 * 背景：微信云开发按「单个云函数目录」上传部署，跨目录 require('../common/x')
 * 在线上无法解析。本脚本把 cloudfunctions/common/*.js 复制到每个云函数目录下的
 * common/ 子目录，配合源码中的 require('./common/x') 引用，实现部署即用。
 *
 * 用法：npm run sync:common  （每次修改 common/ 后、部署前执行）
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const CLOUD_DIR = path.join(ROOT, 'cloudfunctions')
const COMMON_DIR = path.join(CLOUD_DIR, 'common')

if (!fs.existsSync(COMMON_DIR)) {
  console.error('[sync-common] 未找到 cloudfunctions/common 目录')
  process.exit(1)
}

const commonFiles = fs.readdirSync(COMMON_DIR).filter((f) => f.endsWith('.js'))
const fnDirs = fs
  .readdirSync(CLOUD_DIR)
  .filter((name) => {
    const full = path.join(CLOUD_DIR, name)
    return (
      fs.statSync(full).isDirectory() &&
      name !== 'common' &&
      !name.startsWith('.') &&
      fs.existsSync(path.join(full, 'index.js'))
    )
  })

let synced = 0
let removed = 0
for (const dir of fnDirs) {
  const target = path.join(CLOUD_DIR, dir, 'common')
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target)
  }
  for (const file of commonFiles) {
    fs.copyFileSync(path.join(COMMON_DIR, file), path.join(target, file))
    synced++
  }
  // 清理 common 目录中已删除的旧副本
  for (const existing of fs.readdirSync(target)) {
    if (existing.endsWith('.js') && !commonFiles.includes(existing)) {
      fs.unlinkSync(path.join(target, existing))
      removed++
    }
  }
}

console.log(`[sync-common] 已同步 ${commonFiles.length} 个公共模块 × ${fnDirs.length} 个云函数 = ${synced} 份副本，清理过期 ${removed} 份`)
