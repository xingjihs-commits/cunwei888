# 变更日志 (CHANGELOG)

本项目所有重要变更记录在此。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/)。

## [1.7.0] - 2026-10-09

### 变更
- 版本号统一为 V1.7
- 文档与代码对齐
- 说明：1.4-1.6 未单独记录

### 文档一致性修复（7 项）
- 云函数数统一为 91（`cloudfunctions/` 92 目录 = 91 业务 + `common/`），删除旧「89/88」
- admin 页面数统一为 21
- 页面数说明改为「70 个 `.vue`，68 个注册路由（`vote` 2 页已下线）」
- 删除 README 技术栈中未使用的 `uv-ui-components`
- 内容安全 UGC 云函数数按 `docs/00a-云函数明细.md` 统一为 16（删除矛盾的 10/16）
- `CHANGELOG` 1.7.0 补「1.4-1.6 未单独记录」说明
- 组件数按实际更新为 17（新增 home/* 与 admin/PublishExtraFields）

### display_names 全量接入
- 页面 + 组件的 UI 文案接入 `display_names`（31 分组 / 376 key）
- 覆盖：导航/标题/按钮/状态/入口 + 表单标签/占位符/空态/提示语
- 刻意保留：日期格式串（`MM月DD日`）、数据枚举比较值、动态模板串

### 权限分级接入（15 页）
- `utils/auth.js` 三级（公开/登录/认证）接入：
  - 认证级：`feedback/feedback`、`snapshot/snapshot`、`secretary/mailbox`、`feedback/detail`、`report/index`、`agri/checkin`、`lost-found/publish`
  - 登录级：`message/center`、`auth/verify`、`snapshot/my-snapshots`、`secretary/my-mails`、`feedback/my-feedback`、`task/my-progress`、`mine/profile`
  - 例外：`mine` 为登录落地页，接 `AUTH_LOGIN` 会自循环，保守跳过

### 三态（骨架屏）接入
- `components/Skeleton.vue` 覆盖全部 34 个列表页（列表 `type="list"`，详情 `type="detail"`）
- 列表页缺骨架 = 0（`check-states.js` 已排除表单/配置/静态页误报）
- 首个加载期间显示骨架，加载完成切换真实数据

### 适老化设置生效
- 新增 `utils/accessibility.js` 全局单例（fontScale/highContrast/largeButton/reduceMotion/voiceEnabled）
- `BigButton` 应用字号倍数 / 大按钮模式 / 高对比度；`Skeleton` 应用「减少动画」；`VoiceInput` 应用语音开关
- `App.vue` onLaunch 加载、设置页保存，全组件即时响应（此前只存 storage 无人消费）

### 拆页（红线：单文件 ≤500 行）
- `pages/index/index.vue` 570→≤500 行：抽取 `components/home/{SecretaryCards,PhoneGrid,CategoryList,LeaderCare}.vue`
- `pages/admin/publish.vue` 532→≤500 行：抽取 `components/admin/PublishExtraFields.vue`

### 工程化
- 接入 ESLint + Prettier：新增 `.eslintrc.js`、`.prettierrc`；`npm run lint`（0 error / 0 warning）/ `npm run format`
- 新增 `scripts/uni-cli.js` 包装 uni CLI（固定根目录输入 `UNI_INPUT_DIR`），修复 `npm run build:mp-weixin`
- `check-states.js` 增加非列表页排除，消除三态统计误报

### 修复
- 编译修复：重复属性、`import` 混入 `<style>`（6 处）、`report`/`privacy` 未定义 SCSS 变量与错误 import 来源
- 单元测试：`constants.test.js` 对 `holding` 的错误期望改为「工单处理中→processing」，30/30 通过
- `utils/format.js` `statusColor` 删除重复键 `待处理`
- `admin/dashboard.vue`、`admin/secret-list.vue` 补 `useAdminGuard` import（原会 ReferenceError）
- `store/user.js` `canUpdateTask` 修正为返回布尔值（原返回函数）
- 清理全项目 unused import/变量（lint 47 → 0）

## [1.3.0] - 2024-10（第三轮·全局一致性收口 + 业务缺口补全）

### 新增
- 新增 8 个 admin 页面，补全业务闭环缺口：
  - `admin/auth-list.vue` 认证审核（老百姓提交认证后管理员审核入口）
  - `admin/vote-create.vue` 发起表决（一事一议）
  - `admin/meeting-create.vue` 创建会议
  - `admin/secretary-mails.vue` 书记信箱管理列表
  - `admin/mail-detail.vue` 信件详情（管理员视角，含回信）
  - `admin/upper-reports.vue` 对上汇报列表（替代原弹窗式调用）
  - `admin/audit-queue.vue` 人工复审队列
  - `admin/finance-publish.vue` 财务公示发布（独立页面，更完整的表单）
  - `admin/my-dispatched.vue` 我的派单（责任人侧入口，告别"派了单却看不到"）
- 新增 `cloudfunctions/getAuditQueue` 云函数
- 新增 `mine.vue` 管理员功能菜单 12 项，覆盖所有 admin 页面入口
- 新增 `pages.json` 9 个路由配置
- 新增 `docs/28-架构分层说明.md`（分层规则、跨层调用边界、命名规范、文件大小限制）
- 新增 `docs/29-二次开发指南.md`（13 个常见二次开发场景）
- 新增 `docs/30-运维手册.md`（监控、故障定位、备份恢复、换届交接）
- 新增 `CHANGELOG.md` 本文件

### 修复（全局一致性收口）
- `cloudfunctions/getVoteDetail` `status === 'open'` 改用 `normalizeStatus(vote.status) === VOTE_STATUS.OPEN`；`status: 'closed'` 改 `VOTE_STATUS.CLOSED`
- `cloudfunctions/initDatabase/initData.js` 全部英文字段改中文：
  - `status: 'scheduled'/'open'` → `'待召开'/'进行中'`
  - `type: 'committee'` → `'村委会议'`
  - `voterScope: 'representative'` → `'村民代表'`
  - `trend: 'stable'/'up'` → `'稳定'/'上涨'`
- `pages/vote/list.vue` `status === 'open'` 改为 `(status === '进行中' || status === 'open')` 兼容写法
- `pages/meeting/list.vue` 4 处英文 status 改为兼容中英文的写法
- `pages/admin/feedback-list.vue` `typeKeys = ['environment', ...]` 改为 `['环境卫生', ...]` 中文，修复类型筛选失效
- `pages/admin/feedback-list.vue` `i.status === 'completed' || i.status === 'evaluated'` 改为 `['已完成','已评价','completed','evaluated'].includes(i.status)`
- `pages/lost-found/publish.vue` `form.type = 'lost'/'found'` 改为 `'寻物'/'招领'`（与 publishLostFound 云函数期望一致）
- `pages/lost-found/list.vue` subType 兼容中英文
- `cloudfunctions/getLostFoundList` `type: 'lost_found'` 改为 `'失物招领'`
- `pages/admin/feedback-handle.vue` 修复用旧 uploadImages 返回值的 bug（`imageFileIDs = await uploadImages(...)` → `uploadRes.fileIDs`）
- `pages/admin/feedback-handle.vue` 增加 acquireLock + try/finally + cleanupFileIDs
- `pages/admin/feedback-handle.vue` statusOptions 全中文
- `pages/admin/dispatch-config.vue` 权限拦截统一用 `useAdminGuard()`
- `pages/admin/dispatch-config.vue` 加 acquireLock 防重复保存
- `utils/format.js` 重写：新增 `normalizeStatus` 收口兼容层，`statusText/statusColor/urgentText/urgentColor` 全部基于 normalizeStatus，前端不再各自写 if/else

### 优化（P2 体验项）
- 13 处 `font-size: 22rpx` 全部改为 `24rpx`，适老化最小字号统一
- 5 处直接写色值改为 `$medal-gold/silver/bronze`/`$warning` 等 uni.scss 变量
- `cloudfunctions/initDatabase/initData.js`：
  - 新增 `subscribe_templates` 默认配置（7 个模板占位）
  - 新增 `village_info.icpNumber/policeIcpNumber/emergencyPhones` 默认结构
  - 新增 `feedback.dispatchMap` 默认结构
  - 所有占位符加 `// ⚠️ 上线前替换` 注释

## [1.2.0] - 2024-10（第二轮·详情页错误态 + 责任人查看工单权限）

### 关键修复
- `cloudfunctions/getRecordDetail` 责任人无法查看分配给自己的工单（严重 bug）→ 增加 `assigneeOpenid === OPENID` 判定 + 浏览计数
- `cloudfunctions/elderlyCheckin` status 英文 `normal/help_needed/urgent` → 中文 + STATUS_MAP 兼容
- `cloudfunctions/replySecretaryMail` status: 'replied' → '已回复' + 回复内容安全检测
- `cloudfunctions/updateMeetingMinutes` status 未归一化 → 用 normalizeStatus + 内容安全检测
- `cloudfunctions/updateModuleConfig` 没保存 icpNumber/policeIcpNumber/subscribe_templates → 完整支持所有新配置项

### 详情页统一升级（错误态 + 重试 + 举报入口 + lazy-load）
- `pages/news/detail.vue` 加错误态、重试、举报按钮、lazy-load
- `pages/vote/detail.vue` 改中文 status + acquireLock try/finally + 乐观更新 + 错误态 + 举报
- `pages/snapshot/detail.vue` 改中文 status class + 错误态 + 举报 + lazy-load
- `pages/notice/detail.vue` 加错误态、举报、loading、lazy-load
- `pages/meeting/detail.vue` 中文 statusText/typeText + 错误态 + 举报 + lazy-load
- `pages/feedback/detail.vue` 评价防重复（acquireLock）+ 中文 status + 错误态 + 举报 + lazy-load
- `pages/task/detail.vue` 改用新 uploadImages 接口 + acquireLock try/finally + cleanupFileIDs + VoiceInput

### 其他
- `pages/index/index.vue` 首页错误态 + loadMore 实现 + onShow 30s 节流 + 紧急电话按位置分色
- `components/VoiceInput.vue` 用唯一 channelId 隔离实例，避免 `uni.$off` 误删其他实例
- `utils/audio.js` 识别后清理云存储录音文件
- `pages/mine/mine.vue` 默认头像改用 `static/images/default-avatar.png`（生成真实 PNG 替代无效 base64）

## [1.1.0] - 2024-10（第一轮·P0/P1 关键问题全面修复）

### 安全
- `cloudfunctions/common/checkAdmin.js` 重写：对象导出 + fail-closed + 检查 `result.suggest === 'pass'` + 自动入 audit_queue
- `checkImageSecurity` 修复为先 `cloud.downloadFile` 拿 buffer 再传给 `imgSecCheck`（原代码传 fileID 字符串导致检测从未生效）
- `checkContentSecurity` 改为 fail-closed，疑似违规入 audit_queue 由人工复审

### 内容安全全覆盖
16 个 UGC 云函数全部接入 msgSecCheck/imgSecCheck（明细见 `docs/00a-云函数明细.md`）：
- 发布类 publish*（10）：publishNews / publishNotice / publishProject / publishFinanceReport / publishMarketPrice / publishTeamMember / publishBroadcast / publishTask / publishLostFound / publishLeaderContent
- 创建类 create*（2）：createVote / createMeeting
- 提交类 submit*（4）：submitFeedback / submitSnapshot / submitSecretaryMail / submitReport

### 鉴权
- `cloudfunctions/updateTaskProgress` 加 `assigneeOpenid === OPENID || checkAdmin` 鉴权
- `cloudfunctions/approveUser` 防重复审核（校验 verifyStatus === '待审核'）
- 9 个 admin/* 页面统一用 `composables/useAdminGuard.js` 拦截
- 删除 `store/user.js` 调用不存在的 `checkAdmin` 云函数
- 删除 `utils/request.js` 调用不存在的 `getOpenid` 云函数

### 数据一致性
- 新增 `cloudfunctions/common/constants.js`：统一中文 status/type/superviseLevel 常量
- 14 个云函数 status 全中文 + `expandStatuses` 兼容老英文数据
- `cloudfunctions/getDashboardStats` / `sendOverdueReminder` / `generatePerformanceReport` / `exportPerformanceReport` / `generateUpperReport` / `getPerformanceDashboard` 等读取端全部用 expandStatuses 兼容
- `submitFeedback` DEFAULT_DISPATCH 中文 key，与 `dispatch-config.vue` / `feedback.vue` 三处一致
- 新增 `cloudfunctions/migrateStatusEnum` 迁移脚本（可重复执行）

### 通知
- `cloudfunctions/publishBroadcast` 去掉 `slice(0, 100)` 截断，分批写入所有认证村民
- `cloudfunctions/sendSubscribeMessage` 模板 ID 从 `module_config.subscribe_templates` 动态加载（5 分钟实例级缓存）
- 模板未配置时跳过 + 写日志，不阻断业务

### 并发
- `cloudfunctions/likeNews` / `likeSnapshot` 改用 `runTransaction` 防并发点赞多加 count

### 失败恢复
- `utils/request.js` callFunction 加 15s 客户端超时保护
- `utils/request.js` `uploadImages` 改 3 并发上传 + 进度回调 + 返回 `{fileIDs, failed}` + 失败时调用 `cleanupFileIDs` 清理孤儿文件
- `utils/request.js` `compressImage` 小图（< 1080px）跳过压缩
- `App.vue` 加 `onError` / `onUnhandledRejection` / `onPageNotFound` 全局错误捕获
- `App.vue` 加 `onNetworkStatusChange` 网络状态监听
- `App.vue` onLaunch 加首次协议同意弹窗（合规要求）
- 新增 `cloudfunctions/logError` 接收前端错误日志上报

### 合规
- 新增 `pages/privacy/index.vue` 隐私政策页
- 新增 `pages/report/index.vue` 举报页 + `cloudfunctions/submitReport` 云函数 + `reports` 集合
- `pages/mine/mine.vue` 替换已废弃的 `wx.getUserProfile` → `button open-type="chooseAvatar"` + `input type="nickname"`
- `pages/auth/verify.vue` 协议勾选同时引用服务协议和隐私政策两个页面
- `sitemap.json` 改为白名单制（21 个 allow + 10 个 disallow）
- `manifest.json` / `project.config.json` AppID/env/urlCheck 加 `_comment` 注释提示替换

### 体验
- `feedback.vue` / `snapshot.vue` / `mailbox.vue` / `verify.vue` / `publish.vue` 全部接入 acquireLock try/finally + 草稿自动保存 + 进度条 + 失败清理
- `pages/admin/publish.vue` 切换类型用 `Object.assign(form, createForm())` 全量重置
- `pages/admin/dashboard.vue` 月份选择器从 `['本月','上月','本月']` 改为动态生成最近 12 个月 + tab 300ms 防抖
- `pages/admin/feedback-handle.vue` 改用 `getRecordDetail`，不再用 `getFeedbackList({pageSize:100})` 客户端 find
- `pages/admin/dispatch-config.vue` types 从 `configStore.feedbackTypes` 动态获取
- 列表 image 加 lazy-load
- `uni.scss` 新增 `$font-micro` / `$font-large-number` / `$medal-gold/silver/bronze` 等变量

### 配置
- `cloudfunctions/getHomeData` 5 个并发查询每个加 `.catch` 降级
- `cloudfunctions/generateUpperReport` villageName 从 module_config 动态读取
- `cloudfunctions/store/config.js` 紧急电话从云端 module_config 加载（默认仅 110/120/119）

## [1.0.0] - 2024-09（初始版本）

- 项目初始发布
- 80 个云函数
- 47 个页面
- 10 个组件
- 完整村务功能：反映、随手拍、书记信箱、广播、表决、会议、财务、项目、市场、任务、办事指南
