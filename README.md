# 村务连心桥

> 当前版本：V1.7
>
> 村级掌上连心桥微信小程序 — 让村务更透明，让连心更紧密
>
> 服务于全村老百姓：民生反映、书记直达、村务公开、惠农信息、政策落实、议事表决、财务公示、农事日历、留守老人关怀。

## 项目特点

- **业务闭环完整**：22 个业务环节全部跑通（反映→派单→责任人查看→处理→评价→完成→看板）
- **全中文数据**：status / type / dispatchMap 全中文，老数据通过 normalizeStatus 兼容
- **内容安全全覆盖**：16 个 UGC 云函数全部接入 msgSecCheck/imgSecCheck，fail-closed + 人工复审队列
- **鉴权完备**：admin 页面 useAdminGuard 统一拦截，updateTaskProgress 加 assigneeOpenid === OPENID 鉴权
- **适老化基础达标**：正文 ≥32rpx、标题 ≥40rpx、按钮 ≥88rpx、紧急电话分色、VoiceInput 接入 6 个表单
- **配置化**：村名/电话/ICP/紧急电话/模板 ID/责任人/dispatchMap 全部从 module_config 动态加载
- **可观测**：logError 云函数 + logs 集合审计 + 异常行为检测 + 监控告警配置文档

## 数量总览

| 类型 | 数量 | 说明 |
|------|------|------|
| 页面 | 70 | `pages/` 下 `.vue` 70 个，注册路由 68 个（`vote` 2 页已下线），含 21 个 admin 页面 |
| 云函数 | 91 | `cloudfunctions/` 业务目录（另含 `common/` 公共模块，不部署） |
| 组件 | 17 | `components/` 下 `.vue`（含 `home/`、`admin/` 子目录） |
| 组合式函数 | 1 | `composables/useAdminGuard.js` |
| Store | 2 | `store/user.js`、`store/config.js` |
| Utils | 11 | `utils/request.js`、`format.js`、`validate.js`、`audio.js`、`display.js`、`module.js`、`formatText.js`、`auth.js`、`accessibility.js`、`errorUtils.js`、`lockKeys.js` |
| 文档 | 41 | `docs/` 下 `.md`（含 `01-合规文本/` 子目录 3 篇）；顶层 38 篇 |

## 项目结构

### 根目录

```
village-bridge-fixed/
├── App.vue                          # 根组件（生命周期+全局错误捕获+网络监听+协议弹窗+适老化apply）
├── main.js                          # 入口
├── manifest.json                    # uni-app 配置（AppID/cloudEnv 占位需替换）
├── pages.json                       # 页面路由 + tabBar 配置
├── sitemap.json                     # 微信索引白名单（admin/auth/secretary 等禁索引）
├── uni.scss                         # 全局样式变量（色板/字号/间距/阴影/奖牌色）
├── package.json                     # npm 依赖
└── CHANGELOG.md                     # 变更日志
```

### 页面（70 个）

```
pages/
├── index/
│   └── index.vue                        # 首页
├── news/
│   ├── list.vue                         # 村务新闻列表
│   └── detail.vue                       # 新闻详情
├── notice/
│   ├── list.vue                         # 信息公示列表
│   └── detail.vue                       # 公示详情
├── project/
│   └── list.vue                         # 项目收益
├── market/
│   ├── list.vue                         # 惠农价格列表
│   └── detail.vue                       # 价格详情
├── task/
│   ├── list.vue                         # 政策落实任务列表
│   ├── detail.vue                       # 任务详情
│   └── my-progress.vue                  # 我的办理
├── team/
│   ├── index.vue                        # 村委班子
│   └── member-detail.vue                # 成员详情
├── vote/                                # 暂不使用（路由已下线，代码/云函数保留）
│   ├── list.vue                         # 一事一议表决列表
│   └── detail.vue                       # 表决详情
├── leader/
│   ├── list.vue                         # 书记风采/领导关怀列表
│   └── detail.vue                       # 详情
├── meeting/
│   ├── list.vue                         # 村务会议列表
│   └── detail.vue                       # 会议详情
├── finance/
│   ├── list.vue                         # 财务三资列表
│   └── detail.vue                       # 财务详情
├── feedback/
│   ├── feedback.vue                     # 村民反映
│   ├── my-feedback.vue                  # 我的反映
│   └── detail.vue                       # 工单详情
├── snapshot/
│   ├── snapshot.vue                     # 随手拍
│   ├── my-snapshots.vue                 # 我的随手拍
│   ├── wall.vue                         # 公示墙
│   └── detail.vue                       # 随手拍详情
├── secretary/
│   ├── mailbox.vue                      # 书记信箱
│   ├── broadcast.vue                    # 书记广播
│   ├── my-mails.vue                     # 我的来信
│   └── mail-detail.vue                  # 信件详情
├── lost-found/
│   ├── list.vue                         # 失物招领列表
│   └── publish.vue                      # 失物招领发布
├── service/
│   ├── index.vue                        # 服务首页（九宫格）
│   ├── more.vue                         # 更多服务
│   ├── guide.vue                        # 办事指南
│   └── guide-detail.vue                 # 办事详情
├── category/
│   └── list.vue                         # 通用大类列表
├── agri/
│   ├── calendar.vue                     # 农事日历
│   └── checkin.vue                      # 每日签到
├── message/
│   └── center.vue                       # 消息中心
├── auth/
│   └── verify.vue                       # 村民认证
├── mine/
│   ├── mine.vue                         # 个人中心
│   └── profile.vue                      # 个人信息
├── settings/
│   └── accessibility.vue                # 适老化设置
├── agreement/
│   └── index.vue                        # 服务协议
├── privacy/
│   └── index.vue                        # 隐私政策
├── report/
│   └── index.vue                        # 举报
└── admin/                               # 管理员页面（21 个，全部 useAdminGuard 拦截）
    ├── dashboard.vue                    #   考核看板
    ├── feedback-list.vue                #   工单管理
    ├── feedback-handle.vue              #   工单处理
    ├── dispatch.vue                     #   手动派单
    ├── dispatch-config.vue              #   派单地图配置
    ├── publish.vue                      #   内容发布（新闻/公示/项目/价格/任务）
    ├── finance-publish.vue              #   财务公示发布
    ├── vote-create.vue                  #   发起表决
    ├── meeting-create.vue               #   创建会议
    ├── secretary-mails.vue              #   书记信箱管理
    ├── mail-detail.vue                  #   信件详情+回信
    ├── auth-list.vue                    #   认证审核
    ├── audit-queue.vue                  #   人工复审队列
    ├── upper-reports.vue                #   对上汇报
    ├── my-dispatched.vue                #   我的派单（责任人侧）
    ├── projection.vue                   #   投屏模式
    ├── responsible.vue                  #   责任人管理
    ├── module-config.vue                #   模块配置
    ├── name-config.vue                  #   名称配置
    ├── leader-publish.vue               #   书记风采发布
    └── secret-list.vue                  #   亲阅件
```

### 组件（17 个）

```
components/
├── BigButton.vue                    # 大按钮（含 loading 态）
├── Disclaimer.vue                   # 免责声明
├── EmptyState.vue                   # 空状态
├── FeedbackCard.vue                 # 工单卡片
├── NewsCard.vue                     # 新闻卡片
├── ProgressTimeline.vue             # 进度时间轴
├── ResponsibleInfo.vue              # 责任人信息
├── Skeleton.vue                     # 骨架屏（列表/详情/网格/首页 4 种）
├── SnapshotCard.vue                 # 随手拍卡片
├── StatusTag.vue                    # 状态标签
├── TaskCard.vue                     # 任务卡片
├── VoiceInput.vue                   # 语音输入（实例隔离）
├── home/                            # 首页区块组件（从 index 抽取）
│   ├── SecretaryCards.vue           #   书记直达双卡片
│   ├── PhoneGrid.vue                #   常用电话网格
│   ├── CategoryList.vue             #   5 大类入口
│   └── LeaderCare.vue               #   书记风采/领导关怀 Tab
└── admin/                           # 管理组件
    └── PublishExtraFields.vue       #   发布页按类型的额外字段
```

### 其他目录

```
├── composables/
│   └── useAdminGuard.js             # 管理员权限拦截
├── store/                           # 应用层（Pinia）
│   ├── user.js                      # 用户状态
│   └── config.js                    # 配置状态（紧急电话/类型从云端加载）
├── utils/                           # 工具层
│   ├── request.js                   # callFunction 封装（超时+并发上传+孤儿文件清理）
│   ├── format.js                    # 格式化（normalizeStatus 收口兼容层）
│   ├── validate.js                  # 表单校验
│   ├── audio.js                     # 语音录制+识别+清理
│   ├── display.js                   # 展示名称读取（display_names）
│   ├── module.js                    # 模块开关读取（modules）
│   ├── formatText.js                # 自动排版（发布内容）
│   ├── auth.js                      # 页面权限分级
│   └── accessibility.js             # 适老化设置（全局单例）
├── static/
│   ├── tabbar/                      # 底部 tab 图标（PNG）
│   └── images/
│       └── default-avatar.png       # 默认头像（PNG）
└── styles/                          # 全局样式
```

### 云函数（91 个业务目录 + common 公共模块）

> `cloudfunctions/` 共 92 个目录 = 91 个业务云函数 + `common/`（公共模块，不部署）。

**公共模块（不部署，仅被 require）**

- `common/checkAdmin.js` — 鉴权 + 内容安全（fail-closed + 复审队列）
- `common/constants.js` — 中文常量 + normalizeStatus + expandStatuses
- `common/db.js` — 数据访问层封装（insertOne/updateOne/query...）

**一、提交 / 表单类（7 个）**

`submitFeedback`、`submitSnapshot`、`submitSecretaryMail`、`submitReport`、`submitVote`、`verifyUser`、`approveUser`

**二、发布类 publish*（10 个）**

`publishNews`、`publishNotice`、`publishProject`、`publishFinanceReport`、`publishMarketPrice`、`publishTeamMember`、`publishBroadcast`、`publishTask`、`publishLostFound`、`publishLeaderContent`

**三、创建类 create*（2 个）**

`createVote`、`createMeeting`

**四、工单 / 内容处理类（9 个）**

`dispatchRecord`、`evaluateFeedback`、`handleSecretRecord`、`replySecretaryMail`、`reviewContent`、`updateFeedbackStatus`、`updateSnapshotStatus`、`updateTaskProgress`、`updateMeetingMinutes`

**五、查询类 get*（41 个）**

`getHomeData`、`getDashboardStats`、`getPerformanceDashboard`、`getRecordDetail`、`getFeedbackList`、`getMyFeedback`、`getSecretaryMails`、`getMyMails`、`getMyDispatched`、`getAuditQueue`、`getUpperReports`、`getUserInfo`、`getAgriCalendar`、`getBroadcasts`、`getCheckinStatus`、`getDispatchMap`、`getFinanceReports`、`getLostFoundList`、`getMarketPrices`、`getMeetingDetail`、`getMeetingReviewList`、`getMeetings`、`getModuleConfig`、`getMyMessages`、`getMySnapshots`、`getMySubsidies`、`getNewsDetail`、`getNewsList`、`getNoticeDetail`、`getNotices`、`getProjects`、`getServiceGuideDetail`、`getServiceGuides`、`getSnapshotWall`、`getTaskDetail`、`getTasks`、`getTeamMemberDetail`、`getTeamMembers`、`getVoteDetail`、`getVotes`、`getLeaderContentList`

**六、消息 / 通知类（5 个）**

`sendDispatchNotice`、`sendSubscribeMessage`、`sendOverdueReminder`、`subscribePriceAlert`、`markMessageRead`

**七、点赞类（2 个）**

`likeNews`、`likeSnapshot`

**八、定时任务类（3 个）**

`detectAbnormalBehavior`、`generatePerformanceReport`、`generateUpperReport`

**九、配置更新类 update*（5 个）**

`updateModuleConfig`（配置统一入口/代理）、`updateVillageInfo`、`updateModuleSwitch`、`updateSubscribeTemplates`、`updateDispatchMap`

**十、运维 / 其他类（7 个）**

`elderlyCheckin`、`exportPerformanceReport`、`initDatabase`、`migrateStatusEnum`、`logError`、`speechRecognition`（占位）、`formatText`

### 文档（40 篇，含子目录；顶层 37 篇）

```
docs/
├── 00-代码结构清单.md
├── 00a-云函数明细.md
├── 01-合规文本/                     # 子目录（3 篇）
│   ├── 用户协议.md
│   ├── 隐私政策.md
│   └── 免责声明.md
├── 02-备案操作指引.md
├── 03-测试清单.md
├── 04-数据备份与换届交接制度.md
├── 05-示例数据/                     # 目录（示例 JSON，非文档）
├── 06-云函数部署顺序清单.md
├── 07-定时触发器配置/               # 目录（配置文件，非文档）
├── 08-运营手册.md
├── 09-村文书操作指南.md
├── 10-村民使用指南.md
├── 11-代码审查报告.md
├── 12-README.md
├── 13-常见问题FAQ.md
├── 14-订阅消息模板申请指引.md
├── 15-语音识别API配置指引.md
├── 16-内容安全接口开通指引.md
├── 17-微信审核预检清单.md
├── 18-线上应急预案.md
├── 19-管理员账号开通指引.md
├── 20-推广物料包.md
├── 21-数据字典.md
├── 22-云函数接口文档.md
├── 23-版本更新日志.md
├── 24-补充缺失检查与建议.md
├── 25-分配看板清单.md
├── 26-新增订阅消息模板说明.md
├── 27-修订更新日志.md
├── 28-架构分层说明.md
├── 29-二次开发指南.md
├── 30-运维手册.md
├── 31-UI布局规范.md
├── 32（未创建）
├── 33-监控告警配置.md
├── 34-故障演练手册.md
├── 35-v1.5-v2.0路线图.md
├── 36-用户画像.md
├── 37-培训计划.md
├── 38-KPI定义.md
└── 39-核心链路测试清单.md
```

> 编号说明：`docs/32` 未创建；`docs/05`、`docs/07` 为目录（示例数据 / 定时触发器配置），非 `.md` 文档。

## tabBar 结构

`pages.json` → `tabBar.list` 当前 **4 项**：

| # | pagePath | text |
|---|----------|------|
| 1 | `pages/index/index` | 首页 |
| 2 | `pages/service/index` | 服务 |
| 3 | `pages/message/center` | 消息 |
| 4 | `pages/mine/mine` | 我的 |

## 首页结构

`pages/index/index.vue` 当前 **8 个区块**（错误 banner 仅错误时显示），自上而下顺序：

| # | 区块 | 说明 |
|---|------|------|
| ① | 顶部栏 + 消息入口 | 村名 + 用户 + 消息铃铛（带未读红点） |
| ② | 书记直达 | 书记信箱 + 书记广播 双卡片 |
| ③ | 常用电话 | 村医 / 网格员 / 村委值班 / 派出所 / 供电所 / 水管员 |
| ④ | 5 大类入口 | 信息公示 / 投诉举报 / 学习培训 / 办事查询 / 生活服务 |
| ⑤ | 书记风采 / 领导关怀 | Tab 切换（240rpx） |
| ⑥ | 最新公示 | 取前 3 条 |
| ⑦ | 最新新闻 | 取前 3 条 |
| ⑧ | 更多入口 | 进入更多服务 |

## 技术栈

- **前端**：uni-app 3 + Vue 3 + Pinia 2
- **后端**：微信云开发（云函数 wx-server-sdk + 云数据库 + 云存储）
- **设计**：中国红 (#C41E24) 主色 + 金色辅助 + 适老化字号
- **类型**：小程序（mp-weixin），可编译为 H5

## 部署前必读

按 `docs/24-补充缺失检查与建议.md` 第 24.3 节占位符清单替换：

1. `manifest.json` AppID `wxVILLAGE00000001` → 真实 AppID
2. `manifest.json` ext.cloudEnv `village-bridge-prod` → 真实云环境 ID
3. `module_config` 集合配置 `subscribe_templates`（7 个模板 ID）
4. `module_config` 集合配置 `village_info`（村名/电话/ICP/紧急电话）
5. `module_config` 集合配置 `feedback.dispatchMap`（各类型责任人 openid）
6. `admins` 集合添加管理员 `{ _openid, enabled: true }`
7. 微信公众平台开通 `msgSecCheck` / `imgSecCheck` openapi 权限
8. 部署后调用 `migrateStatusEnum` 一次（迁移老英文数据）

## 上线后操作

1. 按 `docs/30-运维手册.md` 配置监控告警
2. 按 `docs/34-故障演练手册.md` 定期演练
3. 按 `docs/35-v1.5-v2.0路线图.md` 规划下一阶段

## 详细文档

- 项目结构：`docs/00-代码结构清单.md`
- 架构分层：`docs/28-架构分层说明.md`
- 二次开发：`docs/29-二次开发指南.md`
- 运维手册：`docs/30-运维手册.md`
- 变更日志：`CHANGELOG.md`

## License

仅供村级政务使用，遵循村委会自管原则。
