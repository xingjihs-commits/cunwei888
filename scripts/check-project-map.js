#!/usr/bin/env node
/* eslint-disable */
/**
 * check-project-map.js - 校验 PROJECT_MAP.md 是否覆盖所有源码文件
 *
 * 新增 / 删除 / 重命名页面、组件、云函数、工具、脚本、根文件后，
 * 若未同步更新 PROJECT_MAP.md，本检查失败（退出码 1）。
 *
 * 映射规则（宽松"子串包含"校验，不解析 md 结构）：
 *   页面 / 组件 / utils / store / composables / common  -> 完整相对路径
 *   云函数业务                                            -> cloudfunctions/<名字>/
 *   根级文件 / scripts / tests                            -> 相对路径（根文件为文件名）
 *
 * 运行：npm run map:check
 */
const fs = require('fs')
const path = require('path')
const { scan, ROOT } = require('./gen-structure.js')

const MAP = path.join(ROOT, 'PROJECT_MAP.md')

function listFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter(n => fs.statSync(path.join(dir, n)).isFile())
}

function main() {
  if (!fs.existsSync(MAP)) {
    console.error('[map:check] 找不到 PROJECT_MAP.md（项目地图）')
    process.exit(1)
  }
  const md = fs.readFileSync(MAP, 'utf8')
  const s = scan()

  const missing = []
  function check(label, items) {
    for (const it of items) {
      if (!md.includes(it)) missing.push(label + ': ' + it)
    }
  }

  // 页面 / 组件：完整相对路径
  check('页面', s.pages)
  check('组件', s.components)

  // 云函数：业务目录 + common 完整路径
  check('云函数', s.cloudDirs.map(n => 'cloudfunctions/' + n + '/'))
  check('云函数公共', s.commonFiles)

  // 应用逻辑层：完整相对路径
  check('composables', s.composables)
  check('store', s.store)
  check('utils', s.utils)

  // 工程脚本 / 测试：完整相对路径
  check('scripts', listFiles(path.join(ROOT, 'scripts')).map(f => 'scripts/' + f))
  check('tests', listFiles(path.join(ROOT, 'tests')).map(f => 'tests/' + f))

  // 根级文件：文件名
  const rootFiles = fs
    .readdirSync(ROOT)
    .filter(n => fs.statSync(path.join(ROOT, n)).isFile())
  check('根文件', rootFiles)

  // 输出
  if (missing.length === 0) {
    console.log('项目地图已覆盖全部文件')
    console.log(
      '  页面=' + s.pages.length + ' 云函数=' + s.cloudDirs.length + ' 组件=' + s.components.length +
        ' utils=' + s.utils.length
    )
    process.exit(0)
  } else {
    console.error('[map:check] PROJECT_MAP.md 漏登记 ' + missing.length + ' 项：')
    for (const m of missing) console.error('  - ' + m)
    console.error('请更新 PROJECT_MAP.md（见 .claude/rules/project-map.md）。')
    process.exit(1)
  }
}

main()
