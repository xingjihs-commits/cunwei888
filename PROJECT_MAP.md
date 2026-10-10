# 项目地图（PROJECT MAP）

> 村务连心桥 · uni-app 3 + Vue 3 + 微信云开发
>
> **一句话**：任何改动前，先在这里定位「改哪个文件」，再动手。
>
> **维护规则**：`.claude/rules/project-map.md` ｜ **校验**：`npm run map:check`
>
> 本文件是**人读的定位地图**（职责 + 场景索引）；完整文件名的机器权威清单见
> `docs/00-代码结构清单.md`（由 `scripts/gen-structure.js` 自动生成，勿手改）。

---

## 0. 怎么用这张图

| 你的目的 | 去看 |
|---|---|
| 改 UI / 视觉 / 布局 / 文案位置 | §1 场景索引 → §2.2 `pages/`、§2.3 `components/` |
| 加/改一个页面 | §2.2 `pages/` + §3.1 路由（`pages.json`） |
| 改一个接口 / 数据 | §2.4 `cloudfunctions/` + §2.5 `utils/request.js` |
| 改全局配色、字号、圆角 | §2.1 `uni.scss` + §3.2 设计 token |
| 改权限 / 适老化 / 配置 | §1 场景索引对应行 |
| 找某类文件放哪 | §2 分层目录地图（全量） |
| 恢复全局记忆 / 定位函数 | `PROJECT_INDEX.md`（符号索引：文件 → 函数 + 行号，开局先读） |

---

## 1. 场景索引（按「改什么」找文件）★

### 1.1 UI / 视觉

| 我要改… | 主文件 | 关联文件 |
|---|---|---|
| 首页顶部栏（红底 nav） | `pages/index/index.vue` `.nav-bar` | `pages.json` globalStyle |
| 首页「找书记」红卡 | `components/home/SecretaryCards.vue` | `pages/index/index.vue` |
| 首页书记风采/上级走访 | `components/home/LeaderCare.vue` | `pages/index/index.vue` |
| 首页天气农事条 | `components/home/WeatherBar.vue` | `utils/farmingCalendar.js` |
| 首页常用电话网格 | `components/home/PhoneGrid.vue` | — |
| 首页 5 大类入口 | `components/home/CategoryList.vue` | — |
| 五星评分 / 星级展示 | `pages/feedback/detail.vue` `.star-row`（现用 ⭐ 字符） | — |
| 列表卡片网格骨架 | `components/Skeleton.vue` `.sk-grid` | — |
| 服务九宫格 | `pages/service/index.vue` | — |
| 奖牌/排名色（金/银/铜） | `uni.scss` `$medal-*` | `pages/admin/dashboard.vue`、`pages/admin/projection.vue` |
| 通用新闻/工单/任务卡片 | `components/NewsCard.vue`、`components/FeedbackCard.vue`、`components/TaskCard.vue`、`components/SnapshotCard.vue` | — |
| 状态标签 | `components/StatusTag.vue` | `utils/format.js` `normalizeStatus` |
| 空态 / 骨架屏 / 大按钮 | `components/EmptyState.vue`、`components/Skeleton.vue`、`components/BigButton.vue` | — |
| 底部 tab 图标 | `static/tabbar/*.png` | `pages.json` tabBar、`scripts/gen-tabbar-icons.py` |
| 权限弹窗 / 协议弹窗 | `App.vue` | `components/Disclaimer.vue` |

### 1.2 路由 / 结构

| 我要改… | 主文件 | 说明 |
|---|---|---|
| 新增/删除页面、路由 | `pages.json` | `pages`（主包）+ `subPackages`（admin） |
| 底部 tabBar | `pages.json` → `tabBar` | 4 项：村里/办事/村委/我的 |
| 导航栏标题 / 下拉刷新 | `pages.json` 各页 `style` | — |
| 页面入口跳转 | `utils/nav.js` | `goPage()` 统一封装 |
| 小程序索引白名单 | `sitemap.json` | admin/auth/secretary 禁索引 |

### 1.3 数据 / 后端

| 我要改… | 主文件 | 说明 |
|---|---|---|
| 调用云函数 | `utils/request.js` | `callFunction()`（超时 + 上传 + 孤儿清理） |
| 某个业务接口 | `cloudfunctions/<名字>/index.js` | 见 §2.4 分类表 |
| 云函数公共逻辑 | `cloudfunctions/common/*.js` | 鉴权/内容安全/db/常量 |
| 状态枚举兼容 | `utils/format.js`、`cloudfunctions/common/constants.js` | `normalizeStatus` |
| 缓存策略 | `utils/cache.js` | — |

### 1.4 权限 / 适老化 / 配置

| 我要改… | 主文件 | 说明 |
|---|---|---|
| 页面权限分级 | `utils/auth.js` | `ensureAuth(AUTH_LOGIN/AUTH_VERIFIED)` |
| admin 页面守卫 | `composables/useAdminGuard.js` | 所有 `pages/admin/*` 引用 |
| 适老化设置（字号/高对比/大按钮） | `utils/accessibility.js` | 全局单例；设置页 `pages/settings/accessibility.vue` |
| 字号随适老化倍数 | `composables/useA11y.js` | 页面 `<page-meta :root-font-size>` |
| 展示文案（村名/模块名） | `store/config.js` `DEFAULT_DISPLAY_NAMES` | 页面 `configStore.getDisplay()` |
| 模块显隐开关 | `store/config.js` + `utils/module.js` | 首页 `show('homeBlock.*')` |
| 用户登录态 | `store/user.js` | — |

---

## 2. 分层目录地图（全量）

> 顶层统计：根 20 ｜ pages 71 ｜ components 21 ｜ cloudfunctions 94+common ｜
> utils 16 ｜ store 2 ｜ composables 3 ｜ docs 53 ｜ scripts 10 ｜ tests 6 ｜ static 13。
> **不纳入地图**：`node_modules/`、`dist/`、`unpackage/`、`.git/`（依赖与构建产物）。

### 2.1 根目录（22 个文件）

- `App.vue` — 根组件：启动加载配置/适老化、全局错误捕获、网络监听、协议弹窗
- `main.js` — 应用入口
- `manifest.json` — uni-app 配置（AppID / cloudEnv 占位，需替换）
- `pages.json` — ★ 页面路由 + 全局窗口样式 + tabBar
- `sitemap.json` — 微信索引白名单
- `project.config.json` — 微信开发者工具项目配置（AppID / 编译设置）
- `uni.scss` — ★ 全局 SCSS 变量（色板/字号/间距/圆角/阴影/奖牌色）
- `index.html` — H5 挂载模板
- `package.json` — 依赖 + 脚本（dev/build/test/lint/gen:doc/check:doc/map:check）
- `package-lock.json` — 依赖锁（自动生成，勿手改）
- `vite.config.js` — Vite / uni 构建配置
- `vitest.config.js` — 单元测试配置
- `.eslintrc.js` — ESLint 规则
- `.prettierrc` — Prettier 规则
- `.editorconfig` — 编辑器统一
- `.gitignore` — 忽略规则
- `CHANGELOG.md` — 变更日志
- `PROJECT_STATUS.md` — 当前进度 / 待办快照
- `README.md` — 项目说明（结构树部分已部分过时，以本图为准）
- `快速开始.md` — 新手运行指引
- `PROJECT_MAP.md` — ★ 本文件
- `PROJECT_INDEX.md` — ★ 符号索引（文件 → 函数 / 导出 + 行号，`codebase-index` 技能生成）

> 本地未跟踪文件：`project.private.config.json`（微信开发者工具私有配置，已 gitignore）。

### 2.2 pages/ —— 页面（71 个 = 路由）

> 主包 48 页（`pages.json` `pages`）+ admin 分包 21 页（`subPackages`）+ `vote/` 2 页（**已下线，不注册、不编译，保留代码**）。
> 命名 = 路由：`pages/<目录>/<文件>.vue` → `/pages/<目录>/<文件>`。

**首页 / 主入口**
- `pages/index/index.vue` — ★ 首页（tab「村里」）：顶部栏 + 书记直达 + 电话 + 分类 + 风采 + 公示 + 新闻

**村务公开 / 新闻**
- `pages/news/list.vue` — 村里事列表
- `pages/news/detail.vue` — 新闻详情
- `pages/notice/list.vue` — 村务公开列表（信息公示）
- `pages/notice/detail.vue` — 公示详情
- `pages/project/list.vue` — 项目收益
- `pages/market/list.vue` — 惠农信息列表
- `pages/market/detail.vue` — 价格详情

**政策落实 / 议事**
- `pages/task/list.vue` — 政策落实任务列表
- `pages/task/detail.vue` — 任务详情
- `pages/task/my-progress.vue` — 我的办理
- `pages/meeting/list.vue` — 会议记录列表
- `pages/meeting/detail.vue` — 会议详情
- `pages/vote/list.vue` — ⚠ 已下线（不在 pages.json；代码保留）
- `pages/vote/detail.vue` — ⚠ 已下线（不在 pages.json；代码保留）

**村委 / 风采**
- `pages/team/index.vue` — 村委班子（tab「村委」）
- `pages/team/member-detail.vue` — 成员详情
- `pages/leader/list.vue` — 书记风采 / 领导关怀列表
- `pages/leader/detail.vue` — 详情
- `pages/finance/list.vue` — 财务三资列表
- `pages/finance/detail.vue` — 财务详情

**民生反映 / 随手拍**
- `pages/feedback/feedback.vue` — 村民反映（提交工单，含 VoiceInput）
- `pages/feedback/my-feedback.vue` — 我的反映
- `pages/feedback/detail.vue` — 工单详情（★ 含五星评价 `.star-row`）
- `pages/snapshot/snapshot.vue` — 随手拍（发布）
- `pages/snapshot/my-snapshots.vue` — 我的随手拍
- `pages/snapshot/wall.vue` — 公示墙
- `pages/snapshot/detail.vue` — 随手拍详情

**书记直达**
- `pages/secretary/mailbox.vue` — 书记信箱
- `pages/secretary/broadcast.vue` — 书记广播
- `pages/secretary/my-mails.vue` — 我的来信
- `pages/secretary/mail-detail.vue` — 信件详情

**办事服务**
- `pages/service/index.vue` — 办事首页（tab「办事」，九宫格）
- `pages/service/more.vue` — 更多服务
- `pages/service/guide.vue` — 办事指南列表
- `pages/service/guide-detail.vue` — 办事指南详情
- `pages/category/list.vue` — 通用大类列表（二级小类为占位跳转）
- `pages/lost-found/list.vue` — 失物招领列表
- `pages/lost-found/publish.vue` — 失物招领发布
- `pages/agri/calendar.vue` — 农事日历
- `pages/agri/checkin.vue` — 每日签到
- `pages/message/center.vue` — 消息中心
- `pages/report/index.vue` — 举报
- `pages/search/index.vue` — 搜索

**我的 / 设置 / 法务**
- `pages/mine/mine.vue` — 个人中心（tab「我的」，登录落地页，不守卫）
- `pages/mine/profile.vue` — 个人信息
- `pages/settings/accessibility.vue` — 适老化设置（字号/对比/大按钮）
- `pages/auth/verify.vue` — 村民认证
- `pages/agreement/index.vue` — 服务协议
- `pages/privacy/index.vue` — 隐私政策

**管理端（分包 pages/admin，21 页，全部 useAdminGuard 守卫）**
- `pages/admin/dashboard.vue` — 考核看板（排名奖牌色）
- `pages/admin/feedback-list.vue` — 工单管理
- `pages/admin/feedback-handle.vue` — 工单处理 + 评价
- `pages/admin/dispatch.vue` — 手动派单
- `pages/admin/dispatch-config.vue` — 派单地图配置
- `pages/admin/publish.vue` — 内容发布（新闻/公示/项目/价格/任务）
- `pages/admin/finance-publish.vue` — 财务公示发布
- `pages/admin/vote-create.vue` — 发起表决
- `pages/admin/meeting-create.vue` — 创建会议
- `pages/admin/secretary-mails.vue` — 书记信箱管理
- `pages/admin/mail-detail.vue` — 信件详情 + 回信
- `pages/admin/auth-list.vue` — 认证审核
- `pages/admin/audit-queue.vue` — 人工复审队列
- `pages/admin/upper-reports.vue` — 对上汇报
- `pages/admin/my-dispatched.vue` — 我的派单（责任人侧）
- `pages/admin/projection.vue` — 投屏模式（全屏，custom 导航）
- `pages/admin/responsible.vue` — 责任人管理
- `pages/admin/module-config.vue` — 模块配置（显隐）
- `pages/admin/name-config.vue` — 名称配置（display_names）
- `pages/admin/leader-publish.vue` — 书记风采发布
- `pages/admin/secret-list.vue` — 亲阅件

### 2.3 components/ —— 组件（22 个）

> easycom 自动注册（`pages.json` → `easycom.autoscan=true`），部分页面也显式 import。

**通用组件**
- `components/AppIcon.vue` — ★ 统一线性图标（mask+SVG，替代 emoji）
- `components/AppSectionTitle.vue` — ★ 区块标题（迷你红旗标 + 更多›）
- `components/AppBanner.vue` — ★ 通用轮播（首页头条/村委一线风采共用）
- `components/AppErrorBanner.vue` — 统一错误态横幅（可点重试）
- `components/BigButton.vue` — 大按钮（含 loading 态，适老化大按钮）
- `components/Disclaimer.vue` — 免责声明
- `components/EmptyState.vue` — 空状态
- `components/FeedbackCard.vue` — 工单卡片
- `components/NewsCard.vue` — 新闻卡片
- `components/ProgressTimeline.vue` — 进度时间轴
- `components/ResponsibleInfo.vue` — 责任人信息
- `components/Skeleton.vue` — 骨架屏（list/detail/grid/home 4 型；★ `.sk-grid` 网格骨架）
- `components/SnapshotCard.vue` — 随手拍卡片
- `components/StatusTag.vue` — 状态标签
- `components/TaskCard.vue` — 任务卡片
- `components/VoiceInput.vue` — 语音输入（实例隔离，接 6 个表单）

**首页区块（components/home）**
- `components/home/SecretaryCards.vue` — ★ 找书记双红卡
- `components/home/PhoneGrid.vue` — ★ 常用电话 3 列网格
- `components/home/CategoryList.vue` — 5 大类入口
- `components/home/LeaderCare.vue` — 书记风采 / 领导关怀 Tab
- `components/home/WeatherBar.vue` — 今日天气 + 农事建议

**管理端（components/admin）**
- `components/admin/PublishExtraFields.vue` — 发布页按类型的额外字段

### 2.4 cloudfunctions/ —— 云函数（94 业务 + common 公共模块）

> 每个业务云函数目录结构固定：`index.js` + `package.json`（个别含 `config.json`）。
> 新增云函数须同步登记到 `scripts/gen-structure.js` 的分类映射，否则 `npm run check:doc` 报错。
> 完整明细见 `docs/00a-云函数明细.md`。

**公共模块（不部署，构建时由 `npm run sync:common` 复制到各云函数目录）**
- `cloudfunctions/common/checkAdmin.js` — 鉴权 + 内容安全（fail-closed + 复审队列 + 分段检测 + checkSecretary）
- `cloudfunctions/common/constants.js` — 中文常量 + normalizeStatus + expandStatuses
- `cloudfunctions/common/db.js` — 数据访问层封装（insertOne/updateOne/getById/findOne/query/updateWhere/fetchAll/writeLog）
- `cloudfunctions/common/docUtils.js` — 纯函数工具（pluckDoc 双形态取值 / hashId 匿名哈希 / csvEscape / escapeRegExp）
- `cloudfunctions/common/blocked.js` — 拉黑名单校验
- `cloudfunctions/common/errorUtils.js` — 错误封装
- `cloudfunctions/common/internal.js` — 内部调用工具（令牌支持环境变量 INTERNAL_TOKEN 覆盖）
- `cloudfunctions/common/listUtils.js` — 列表分页工具
- `cloudfunctions/common/mediaReview.js` — 图片/媒体内容安全
- `cloudfunctions/common/securityLogic.js` — 内容安全决策逻辑

**业务云函数（94 个，按 10 类）** —— 目录 `cloudfunctions/<名字>/`：

- **提交 / 表单类（7）**：`cloudfunctions/approveUser/`、`cloudfunctions/submitFeedback/`、`cloudfunctions/submitReport/`、`cloudfunctions/submitSecretaryMail/`、`cloudfunctions/submitSnapshot/`、`cloudfunctions/submitVote/`、`cloudfunctions/verifyUser/`
- **发布类 publish\*（10）**：`cloudfunctions/publishBroadcast/`、`cloudfunctions/publishFinanceReport/`、`cloudfunctions/publishLeaderContent/`、`cloudfunctions/publishLostFound/`、`cloudfunctions/publishMarketPrice/`、`cloudfunctions/publishNews/`、`cloudfunctions/publishNotice/`、`cloudfunctions/publishProject/`、`cloudfunctions/publishTask/`、`cloudfunctions/publishTeamMember/`
- **创建类 create\*（2）**：`cloudfunctions/createMeeting/`、`cloudfunctions/createVote/`
- **工单 / 内容处理类（9）**：`cloudfunctions/dispatchRecord/`、`cloudfunctions/evaluateFeedback/`、`cloudfunctions/handleSecretRecord/`、`cloudfunctions/replySecretaryMail/`、`cloudfunctions/reviewContent/`、`cloudfunctions/updateFeedbackStatus/`、`cloudfunctions/updateMeetingMinutes/`、`cloudfunctions/updateSnapshotStatus/`、`cloudfunctions/updateTaskProgress/`
- **查询类 get\*（44）**：`cloudfunctions/getAgriCalendar/`、`cloudfunctions/getAuditQueue/`、`cloudfunctions/getBroadcasts/`、`cloudfunctions/getCheckinStatus/`、`cloudfunctions/getDashboardStats/`、`cloudfunctions/getDispatchMap/`、`cloudfunctions/getFeedbackList/`、`cloudfunctions/getFinanceReports/`、`cloudfunctions/getHomeData/`、`cloudfunctions/getLeaderContentList/`、`cloudfunctions/getLostFoundList/`、`cloudfunctions/getMarketPrices/`、`cloudfunctions/getMeetingDetail/`、`cloudfunctions/getMeetingReviewList/`、`cloudfunctions/getMeetings/`、`cloudfunctions/getModuleConfig/`、`cloudfunctions/getMyDispatched/`、`cloudfunctions/getMyFeedback/`、`cloudfunctions/getMyMails/`、`cloudfunctions/getMyMessages/`、`cloudfunctions/getMySnapshots/`、`cloudfunctions/getMySubsidies/`、`cloudfunctions/getNewsDetail/`、`cloudfunctions/getNewsList/`、`cloudfunctions/getNoticeDetail/`、`cloudfunctions/getNotices/`、`cloudfunctions/getPerformanceDashboard/`、`cloudfunctions/getProjects/`、`cloudfunctions/getRecordDetail/`、`cloudfunctions/getResolvedFeedback/`、`cloudfunctions/getSecretaryMails/`、`cloudfunctions/getServiceGuideDetail/`、`cloudfunctions/getServiceGuides/`、`cloudfunctions/getSnapshotWall/`、`cloudfunctions/getTaskDetail/`、`cloudfunctions/getTasks/`、`cloudfunctions/getTeamMemberDetail/`、`cloudfunctions/getTeamMembers/`、`cloudfunctions/getUpperReports/`、`cloudfunctions/getUserInfo/`、`cloudfunctions/getVoteDetail/`、`cloudfunctions/getVotes/`、`cloudfunctions/getWeather/`、`cloudfunctions/searchAll/`
- **消息 / 通知类（5）**：`cloudfunctions/markMessageRead/`、`cloudfunctions/sendDispatchNotice/`、`cloudfunctions/sendOverdueReminder/`、`cloudfunctions/sendSubscribeMessage/`、`cloudfunctions/subscribePriceAlert/`
- **点赞类（2）**：`cloudfunctions/likeNews/`、`cloudfunctions/likeSnapshot/`
- **定时任务类（3）**：`cloudfunctions/detectAbnormalBehavior/`、`cloudfunctions/generatePerformanceReport/`、`cloudfunctions/generateUpperReport/`（触发器配置见 `docs/07-定时触发器配置/`）
- **配置更新类 update\*（5）**：`cloudfunctions/updateDispatchMap/`、`cloudfunctions/updateModuleConfig/`（配置统一入口/代理）、`cloudfunctions/updateModuleSwitch/`、`cloudfunctions/updateSubscribeTemplates/`、`cloudfunctions/updateVillageInfo/`
- **运维 / 其他类（7）**：`cloudfunctions/elderlyCheckin/`、`cloudfunctions/exportPerformanceReport/`、`cloudfunctions/formatText/`、`cloudfunctions/initDatabase/`、`cloudfunctions/logError/`、`cloudfunctions/migrateStatusEnum/`、`cloudfunctions/speechRecognition/`（⚠ 占位，未接真实 ASR）

### 2.5 composables / store / utils —— 应用逻辑层

**组合式函数（composables）**
- `composables/useA11y.js` — 适老化字号根变量（页面注入 `<page-meta>`）
- `composables/useAdminGuard.js` — 管理页权限拦截（onLoad 校验）
- `composables/usePagination.js` — 列表分页复用

**状态（store，Pinia）**
- `store/config.js` — 配置状态：display_names / 模块开关 / 紧急电话 / 类型（云端加载）
- `store/user.js` — 用户登录态

**工具（utils）**
- `utils/request.js` — callFunction 封装（超时 + 并发上传 + 孤儿文件清理）
- `utils/format.js` — 格式化（normalizeStatus 收口兼容层）
- `utils/validate.js` — 表单校验
- `utils/audio.js` — 语音录制 + 识别 + 清理
- `utils/display.js` — 展示名称读取（display_names）
- `utils/module.js` — 模块开关读取（modules）
- `utils/formatText.js` — 自动排版（发布内容）
- `utils/auth.js` — 页面权限分级（ensureAuth）
- `utils/accessibility.js` — 适老化设置（全局单例）
- `utils/cache.js` — 本地缓存（首页离线兜底）
- `utils/farmingCalendar.js` — 农事建议（首页天气条）
- `utils/lockKeys.js` — 防重复提交锁键
- `utils/nav.js` — 页面跳转封装（goPage）
- `utils/subscribe.js` — 订阅消息
- `utils/theme.js` — 设计 token（JS 侧，供组件属性色值使用，与 `uni.scss` 同值）
- `utils/app-info.js` — 应用元信息（APP_VERSION 单源，页面展示引用）

### 2.6 docs/ —— 文档（41 顶层 + 子目录，共 53 文件）

> 顶层 md 按编号命名（`docs/00`～`docs/40`，缺 `32`；`05`/`07` 为目录）。
> 完整清单见 `docs/00-代码结构清单.md` §6。关键入口：
> `docs/00-代码结构清单.md`、`docs/00a-云函数明细.md`、`docs/21-数据字典.md`、
> `docs/22-云函数接口文档.md`、`docs/28-架构分层说明.md`、`docs/29-二次开发指南.md`、`docs/31-UI布局规范.md`。
> 子目录：`docs/01-合规文本/`（协议/隐私/免责）、`docs/05-示例数据/`（集合示例 JSON）、
> `docs/07-定时触发器配置/`（定时器配置 JSON）。

### 2.7 scripts/ —— 工程脚本（9 个）

- `scripts/uni-cli.js` — uni 编译包装（设置 UNI_INPUT_DIR，解决根目录布局）
- `scripts/gen-structure.js` — 生成 `docs/00-代码结构清单.md`（`npm run gen:doc`）
- `scripts/check-structure.js` — 校验 docs/00/README 与代码一致（`npm run check:doc`）
- `scripts/check-states.js` — 列表页三态体检（骨架/空态/错误态）
- `scripts/check-project-map.js` — 校验本图是否漏登记文件（`npm run map:check`）
- `scripts/check-style.js` — 检测 .vue 样式块硬编码色值（`npm run style:check`）
- `scripts/compare-tokens.js` — 双源 token 校验 uni.scss ↔ utils/theme.js（`npm run check:tokens`）
- `scripts/apply-a11y-pagemeta.js` — 批量注入适老化 page-meta
- `scripts/gen-tabbar-icons.py` — 生成 tabBar 图标（Python）
- `scripts/sync-common.js` — 同步 common 公共模块到各云函数目录（`npm run sync:common`，部署前必跑）

### 2.8 tests/ —— 单元测试（vitest，6 文件）

- `tests/README.md` — 测试说明
- `tests/constants.test.js` — `cloudfunctions/common/constants.js`（normalizeStatus / expandStatuses）
- `tests/format.test.js` — `utils/format.js`
- `tests/farming.test.js` — `utils/farmingCalendar.js`
- `tests/security.test.js` — 内容安全决策 + 鉴权逻辑
- `tests/docUtils.test.js` — `common/docUtils.js`（pluckDoc 双形态 / hashId / csvEscape / escapeRegExp）

### 2.9 static/ —— 静态资源（13 文件）

```
static/
├── tabbar/              # 底部 tab 图标（5 组 × 常态/选中）
│   home.png / home-active.png
│   service.png / service-active.png
│   message.png / message-active.png
│   mine.png / mine-active.png
│   news.png / news-active.png         # news 图标当前未被 tabBar 使用
├── icons/.gitkeep
└── images/
    ├── .gitkeep
    └── default-avatar.png             # 默认头像
```

### 2.10 其它

- `.github/workflows/ci.yml` — CI：lint + test + 云函数语法检查 + map:check
- `.claude/CLAUDE.md` — 项目规则（opencode 读取）
- `.claude/rules/project-map.md` — 本图的维护规则

---

## 3. 关键配置速查

### 3.1 路由（`pages.json`）
- 主包页面数组 `pages`：48 项；分包 `subPackages[0].root = "pages/admin"`：21 项。
- `pages/vote/` 2 页**不在** `pages.json`，不参与编译。
- `globalStyle`：导航白字 / 背景红 `#C41E24` / 页面底色 `#FAF7F2`。
- `tabBar.list` 4 项：`pages/index/index`（村里）、`pages/service/index`（办事）、`pages/team/index`（村委）、`pages/mine/mine`（我的）。

### 3.2 设计 token（`uni.scss`）
- 主色 **中国红 `#C41E24`**、辅助金 `$gold #D4A843`、荣誉底 `$gold-light #F5E6C8`。
- 奖牌色 `$medal-gold` / `$medal-silver` / `$medal-bronze` + 背景渐变 `$medal-*-bg`。
- 字号/间距/圆角/阴影系统；**页面禁止硬编码色值，一律用变量**。

---

## 4. 维护与校验

- **改动后必跑**：`npm run map:check`（本图覆盖校验）+ `npm run check:doc`（结构清单校验）。
- **改代码后重跑索引**：`node C:\Users\FF\.claude\skills\codebase-index\gen-index.js .`（刷新 `PROJECT_INDEX.md`）。
- **何时更新本图**：新增/删除/重命名任何页面、组件、云函数、工具、脚本、文档目录时。
- **权威边界**：文件**数量与全量名单**以 `docs/00-代码结构清单.md`（自动生成）为准；
  **职责说明与场景定位**以本图为准。
- **详细规则**：`.claude/rules/project-map.md`。
