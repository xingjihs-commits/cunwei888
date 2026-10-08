#!/usr/bin/env node
/* eslint-disable */
/**
 * uni-cli.js - uni CLI 包装器
 * 原因：本项目为 HBuilderX 根目录布局（manifest.json / pages.json 在根目录），
 *       而 uni CLI 默认输入目录是 cwd/src，导致 `uni build` 找不到 manifest.json。
 *       这里先把 UNI_INPUT_DIR 指到项目根，再转发参数给 uni。
 * 用法：node scripts/uni-cli.js [build] [-p <platform>]
 */
const path = require('path')
const { spawnSync } = require('child_process')

const ROOT = path.resolve(__dirname, '..')
process.env.UNI_INPUT_DIR = process.env.UNI_INPUT_DIR || ROOT

const args = process.argv.slice(2).join(' ')
const cmd = `uni${args ? ' ' + args : ''}`
const r = spawnSync(cmd, {
  stdio: 'inherit',
  cwd: ROOT,
  shell: true,
  env: process.env
})
process.exit(r.status === null ? 1 : r.status)
