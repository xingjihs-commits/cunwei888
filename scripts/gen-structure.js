#!/usr/bin/env node
/* eslint-disable */
/**
 * gen-structure.js - 扫描项目结构，自动生成 docs/00-代码结构清单.md
 * 固定 10 分类口径（与 README 一致）；输出格式固定，便于 diff
 * 运行：npm run gen:doc
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')

// 云函数 10 分类映射（固定口径，新增云函数须登记到对应分类）
const CLOUD_CLASSIFY = [
  ['提交 / 表单类', ['submitFeedback', 'submitSnapshot', 'submitSecretaryMail', 'submitReport', 'submitVote', 'verifyUser', 'approveUser']],
  ['发布类 publish*', ['publishNews', 'publishNotice', 'publishProject', 'publishFinanceReport', 'publishMarketPrice', 'publishTeamMember', 'publishBroadcast', 'publishTask', 'publishLostFound', 'publishLeaderContent']],
  ['创建类 create*', ['createVote', 'createMeeting']],
  ['工单 / 内容处理类', ['dispatchRecord', 'evaluateFeedback', 'handleSecretRecord', 'replySecretaryMail', 'reviewContent', 'updateFeedbackStatus', 'updateSnapshotStatus', 'updateTaskProgress', 'updateMeetingMinutes']],
  ['查询类 get*', [
    'getHomeData', 'getDashboardStats', 'getPerformanceDashboard', 'getRecordDetail', 'getFeedbackList',
    'getMyFeedback', 'getSecretaryMails', 'getMyMails', 'getMyDispatched', 'getAuditQueue', 'getUpperReports',
    'getUserInfo', 'getAgriCalendar', 'getBroadcasts', 'getCheckinStatus', 'getDispatchMap', 'getFinanceReports',
    'getLostFoundList', 'getMarketPrices', 'getMeetingDetail', 'getMeetingReviewList', 'getMeetings', 'getModuleConfig',
    'getMyMessages', 'getMySnapshots', 'getMySubsidies', 'getNewsDetail', 'getNewsList', 'getNoticeDetail', 'getNotices',
    'getProjects', 'getServiceGuideDetail', 'getServiceGuides', 'getSnapshotWall', 'getTaskDetail', 'getTasks',
    'getTeamMemberDetail', 'getTeamMembers', 'getVoteDetail', 'getVotes', 'getLeaderContentList', 'getWeather', 'searchAll'
  ]],
  ['消息 / 通知类', ['sendDispatchNotice', 'sendSubscribeMessage', 'sendOverdueReminder', 'subscribePriceAlert', 'markMessageRead']],
  ['点赞类', ['likeNews', 'likeSnapshot']],
  ['定时任务类', ['generatePerformanceReport', 'generateUpperReport', 'detectAbnormalBehavior']],
  ['配置更新类 update*', ['updateModuleConfig', 'updateVillageInfo', 'updateModuleSwitch', 'updateSubscribeTemplates', 'updateDispatchMap']],
  ['运维 / 其他类', ['elderlyCheckin', 'exportPerformanceReport', 'initDatabase', 'migrateStatusEnum', 'logError', 'speechRecognition', 'formatText']]
]

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

function listDirs(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true }).filter(d => d.isDirectory() && !d.name.startsWith('.')).map(d => d.name)
}

function rel(p) {
  return path.relative(ROOT, p).split(path.sep).join('/')
}

function scan() {
  const pages = listFiles(path.join(ROOT, 'pages'), '.vue').map(rel).sort()
  const components = listFiles(path.join(ROOT, 'components'), '.vue').map(rel).sort()
  const cloudDirs = listDirs(path.join(ROOT, 'cloudfunctions')).filter(d => d !== 'common').sort()
  const commonFiles = listFiles(path.join(ROOT, 'cloudfunctions', 'common'), '.js').map(rel).sort()
  const docsAll = listFiles(path.join(ROOT, 'docs'), '.md').map(rel).sort()
  const docsTop = docsAll.filter(p => !p.slice('docs/'.length).includes('/'))
  const composables = listFiles(path.join(ROOT, 'composables'), '.js').map(rel).sort()
  const store = listFiles(path.join(ROOT, 'store'), '.js').map(rel).sort()
  const utils = listFiles(path.join(ROOT, 'utils'), '.js').map(rel).sort()
  return { pages, components, cloudDirs, commonFiles, docsAll, docsTop, composables, store, utils }
}

function build() {
  const s = scan()
  const version = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')).version
  const L = []

  L.push('# 00 - 代码结构清单')
  L.push('')
  L.push('> 当前版本：V' + version.split('.').slice(0, 2).join('.'))
  L.push('>')
  L.push('> 本文件由 `scripts/gen-structure.js` 自动生成（`npm run gen:doc`），请勿手工编辑。')
  L.push('>')
  L.push('> 人工明细（行数 / 鉴权 / 内容安全）见 `docs/00a-云函数明细.md`。')
  L.push('')

  L.push('## 1. 总览')
  L.push('')
  L.push('| 类型 | 数量 |')
  L.push('|------|------|')
  L.push('| 页面 | ' + s.pages.length + ' |')
  L.push('| 云函数 | ' + s.cloudDirs.length + ' |')
  L.push('| 组件 | ' + s.components.length + ' |')
  L.push('| 组合式函数 | ' + s.composables.length + ' |')
  L.push('| Store | ' + s.store.length + ' |')
  L.push('| Utils | ' + s.utils.length + ' |')
  L.push('| 文档 | ' + s.docsAll.length + '（顶层 ' + s.docsTop.length + '） |')
  L.push('')

  L.push('## 2. 云函数清单（' + s.cloudDirs.length + ' 个，按职责分 ' + CLOUD_CLASSIFY.length + ' 类）')
  L.push('')
  const assigned = new Set()
  for (const [label, names] of CLOUD_CLASSIFY) {
    const present = names.filter(n => s.cloudDirs.includes(n)).sort()
    L.push('### ' + label + '（' + present.length + '）')
    L.push('')
    for (const n of present) { L.push('- ' + n); assigned.add(n) }
    L.push('')
  }
  const unassigned = s.cloudDirs.filter(n => !assigned.has(n))
  if (unassigned.length) {
    L.push('### ⚠️ 未分类（' + unassigned.length + '，请登记到 gen-structure.js 的分类映射）')
    L.push('')
    for (const n of unassigned) L.push('- ' + n)
    L.push('')
  }

  L.push('### 公共模块（不部署，' + s.commonFiles.length + '）')
  L.push('')
  for (const f of s.commonFiles) L.push('- ' + f)
  L.push('')

  L.push('## 3. 页面清单（' + s.pages.length + ' 个）')
  L.push('')
  for (const p of s.pages) L.push('- ' + p)
  L.push('')

  L.push('## 4. 组件清单（' + s.components.length + ' 个）')
  L.push('')
  for (const c of s.components) L.push('- ' + c)
  L.push('')

  L.push('## 5. 其他目录')
  L.push('')
  L.push('### 组合式函数（' + s.composables.length + '）')
  for (const f of s.composables) L.push('- ' + f)
  L.push('')
  L.push('### Store（' + s.store.length + '）')
  for (const f of s.store) L.push('- ' + f)
  L.push('')
  L.push('### Utils（' + s.utils.length + '）')
  for (const f of s.utils) L.push('- ' + f)
  L.push('')

  L.push('## 6. 文档清单（' + s.docsAll.length + ' 个，含子目录；顶层 ' + s.docsTop.length + '）')
  L.push('')
  for (const d of s.docsAll) L.push('- ' + d)
  L.push('')

  return L.join('\n') + '\n'
}

function main() {
  const md = build()
  fs.writeFileSync(path.join(ROOT, 'docs', '00-代码结构清单.md'), md, 'utf8')
  const s = scan()
  console.log('[gen:doc] docs/00-代码结构清单.md 已生成')
  console.log('  页面=' + s.pages.length + ' 云函数=' + s.cloudDirs.length + ' 组件=' + s.components.length +
    ' utils=' + s.utils.length + ' 文档=' + s.docsAll.length + '（顶层 ' + s.docsTop.length + '）')
}

module.exports = { scan, build, CLOUD_CLASSIFY, ROOT }

if (require.main === module) main()
