# 村务连心桥 v2.0 - 项目说明

> 集民生服务、书记权威、对上汇报于一体的村级微信小程序。村民打开小程序，第一眼看到"村里在发生什么"，然后才是"我能做什么"。

---

## 项目简介

**村务连心桥**是本村民委员会主办的村级"掌上连心桥"微信小程序，定位是集**民生服务、书记权威、对上汇报**于一体的村级数字治理平台。村民打开小程序，第一眼看到"村里在发生什么"（村务新闻、书记广播），然后才是"我能做什么"（反映、随手拍、办事指南）。

### 5大设计哲学

| 原则 | 说明 |
|------|------|
| **新闻优先** | 首页首屏是村务新闻和书记在行动，功能入口后置 |
| **中国红为根基** | 顶部栏、主按钮、选中态、重要标签统一使用#C41E24 |
| **适老化优先** | 大字号（正文32rpx+）、大按钮（88rpx+）、语音输入、一键拨号 |
| **治理留痕不替代** | 线上只做公示、征集、流转，不替代法定程序 |
| **配置驱动防屎山** | 通用表+类型配置，换名称、加字段不改代码 |

### 项目统计（v2.0）

| 项目 | 数量 |
|------|------|
| 云函数 | **72个**（71个业务+1个公共模块+2个初始化模块） |
| 页面 | **47个** |
| 公共组件 | **10个** |
| 工具类 | **4个** |
| 状态管理 | **2个**（Pinia） |
| 数据库集合 | **29个** |
| 配置文件 | **9个** |
| 配套文档 | **13份** |
| 总文件数 | **229个** |

---

## 技术栈

| 层次 | 技术选型 |
|------|---------|
| 跨端框架 | UNI-APP（Vue 3 + Vite） |
| UI组件库 | uv-ui 2.x |
| 状态管理 | Pinia |
| 后端服务 | 微信云开发（CloudBase） |
| 数据库 | 云开发文档型数据库 |
| 文件存储 | 云开发对象存储 |
| 内容安全 | 微信内容安全API（msgSecCheck + imgSecCheck） |
| 消息触达 | 订阅消息 + 短信 + 电话 + 后台待办 + 定时触发器 |
| 语音识别 | 百度/讯飞ASR API（可选） |
| 开发工具 | HBuilderX + 微信开发者工具 |

---

## 目录结构

```
village-bridge/
├── cloudfunctions/          # 云函数（72个）
│   ├── common/checkAdmin.js # 公共：管理员校验+内容安全
│   ├── initDatabase/        # 数据库初始化（含示例数据）
│   ├── # 工单类5个
│   ├── # 随手拍类5个
│   ├── # 公示类3个
│   ├── # 项目收益2个
│   ├── # 惠农信息3个
│   ├── # 政策落实4个
│   ├── # 村务新闻4个
│   ├── # 班子类3个
│   ├── # 认证类2个
│   ├── # 内容安全1个
│   ├── # 通知类2个
│   ├── # 考核类3个
│   ├── # 书记信箱6个
│   ├── # 办事指南2个
│   ├── # 对上汇报2个
│   ├── # 会议管理4个
│   ├── # 一事一议4个
│   ├── # 财务三资2个
│   ├── # 消息中心2个
│   ├── # P2拓展6个
│   └── # 基础设施4个（getHomeData等）
├── pages/                   # 页面（47个）
│   ├── index/               # 首页
│   ├── feedback/            # 村民反映（3个）
│   ├── snapshot/            # 随手拍（4个）
│   ├── notice/              # 信息公示（2个）
│   ├── project/             # 项目收益（1个）
│   ├── market/              # 惠农信息（2个）
│   ├── task/                # 政策落实（3个）
│   ├── team/                # 村委班子（2个）
│   ├── news/                # 村务新闻（2个）
│   ├── mine/                # 个人中心（2个）
│   ├── auth/                # 认证（1个）
│   ├── admin/               # 管理端（6个）
│   ├── agreement/           # 服务协议（1个）
│   ├── secretary/           # 书记信箱+广播（4个）✨新
│   ├── service/             # 办事指南（2个）✨新
│   ├── meeting/             # 村务会议（2个）✨新
│   ├── vote/                # 一事一议（2个）✨新
│   ├── finance/             # 财务三资（2个）✨新
│   ├── message/             # 消息中心（1个）✨新
│   ├── lost-found/          # 失物招领（2个）✨新
│   └── agri/                # 农事日历+留守签到（2个）✨新
├── components/              # 公共组件（10个）
├── utils/                   # 工具类（4个，含图片压缩、防重复锁）
├── store/                   # 状态管理（2个，Pinia）
├── static/tabbar/           # tabBar 图标
├── docs/                    # 配套文档（13份）
│   ├── 01-合规文本/          # 用户协议/隐私政策/免责声明
│   ├── 02-备案操作指引.md
│   ├── 03-测试清单.md
│   ├── 04-数据备份与换届交接制度.md
│   ├── 05-示例数据/          # 10个JSON
│   ├── 06-云函数部署顺序清单.md
│   ├── 07-定时触发器配置/     # 3个JSON
│   ├── 08-运营手册.md
│   ├── 09-村文书操作指南.md
│   ├── 10-村民使用指南.md
│   ├── 11-代码审查报告.md
│   └── 13-常见问题FAQ.md
├── App.vue
├── main.js
├── manifest.json
├── pages.json
├── uni.scss
└── package.json
```

---

## 部署步骤

### 第1步：环境准备

- 安装 HBuilderX（最新版）
- 安装 微信开发者工具
- 注册微信小程序，获取 AppID

### 第2步：导入项目

- 用 HBuilderX 打开 village-bridge 文件夹
- 修改 manifest.json 中的 mp-weixin.appid 为你的 AppID
- 修改 App.vue 中的云开发环境 ID

### 第3步：配置云开发

- 在微信开发者工具中开通云开发
- 创建云开发环境

### 第4步：部署云函数（按顺序）

详见 `docs/06-云函数部署顺序清单.md`，核心顺序：

1. **第1批**：`common/checkAdmin`（公共模块，必须先部署）
2. **第2批**：`initDatabase`（部署后调用一次，创建29个集合+插入示例数据）
3. **第3-21批**：71个业务云函数（按模块分组部署）
4. **第22批**：定时触发类（需在云开发控制台配置触发器）

### 第5步：初始化数据

- 调用 `initDatabase` 云函数
- 创建29个集合+插入示例数据

### 第6步：添加管理员

- 在云开发控制台→数据库→admins集合添加：
```json
{
  "_openid": "你的openid",
  "name": "村支书",
  "role": "super_admin",
  "enabled": true
}
```

### 第7步：配置定时触发器

详见 `docs/07-定时触发器配置/`：
- sendOverdueReminder：每天8点（`0 0 8 * * * *`）
- generatePerformanceReport：每月1号（`0 0 1 1 * * *`）
- generateUpperReport：每月1号（`0 0 1 1 * * *`）

### 第8步：配置订阅消息模板

在微信公众平台配置5个订阅消息模板，模板ID填入sendSubscribeMessage云函数。

### 第9步：预览运行

- 在 HBuilderX 中点击"运行"→"运行到微信开发者工具"
- 在微信开发者工具中预览

---

## 云函数清单（72个）

### 公共模块（1个）

| 云函数 | 作用 |
|--------|------|
| common/checkAdmin | 管理员校验+内容安全检测 |

### 数据库初始化（1个）

| 云函数 | 作用 |
|--------|------|
| initDatabase | 创建29个集合+插入示例数据 |

### 基础设施（4个）

| 云函数 | 作用 |
|--------|------|
| getHomeData | 首页聚合数据 |
| getRecordDetail | 单条记录详情 |
| speechRecognition | 语音识别 |
| updateModuleConfig | 保存模块配置 |

### 工单类（5个）

submitFeedback / getMyFeedback / updateFeedbackStatus / getFeedbackList / evaluateFeedback

### 随手拍类（5个）

submitSnapshot / getMySnapshots / updateSnapshotStatus / getSnapshotWall / likeSnapshot

### 公示类（3个）

publishNotice / getNotices / getNoticeDetail

### 项目收益类（2个）

publishProject / getProjects

### 惠农信息类（3个）

publishMarketPrice / getMarketPrices / subscribePriceAlert

### 政策落实类（4个）

publishTask / getTasks / getTaskDetail / updateTaskProgress

### 村务新闻类（4个）

publishNews / getNewsList / getNewsDetail / likeNews

### 班子类（3个）

getTeamMembers / getTeamMemberDetail / publishTeamMember

### 认证类（2个）

verifyUser / approveUser

### 内容安全类（1个）

reviewContent

### 通知类（2个）

sendSubscribeMessage / sendOverdueReminder

### 考核类（3个）

generatePerformanceReport / getPerformanceDashboard / exportPerformanceReport

### 书记信箱+广播（6个）

submitSecretaryMail / getMyMails / getSecretaryMails / replySecretaryMail / publishBroadcast / getBroadcasts

### 办事指南（2个）

getServiceGuides / getServiceGuideDetail

### 对上汇报（2个）

generateUpperReport / getUpperReports

### 会议管理（4个）

createMeeting / getMeetings / getMeetingDetail / updateMeetingMinutes

### 一事一议表决（4个）

createVote / getVotes / getVoteDetail / submitVote

### 财务三资（2个）

publishFinanceReport / getFinanceReports

### 消息中心（2个）

getMyMessages / markMessageRead

### P2拓展（6个）

getMySubsidies / getAgriCalendar / publishLostFound / getLostFoundList / elderlyCheckin / getCheckinStatus

---

## 数据库集合清单（29个）

| 集合 | 用途 | 安全规则 |
|------|------|---------|
| records | 通用记录表 | 仅创建者可读写 |
| type_config | 类型配置 | 所有人可读 |
| users | 村民认证 | 仅本人和管理员 |
| admins | 管理员白名单 | 仅管理员 |
| notices | 信息公示 | 所有人可读 |
| projects | 项目收益 | 所有人可读 |
| market_prices | 惠农价格 | 所有人可读 |
| tasks | 政策任务 | 所有人可读 |
| task_progress | 任务进度 | 仅创建者 |
| news | 村务新闻 | 所有人可读 |
| team_members | 班子成员 | 所有人可读 |
| performance | 考核统计 | 仅管理员 |
| rectifications | 整改记录 | 仅管理员 |
| subscriptions | 订阅记录 | 仅创建者 |
| logs | 操作日志 | 仅管理员 |
| module_config | 模块配置 | 所有人可读 |
| audit_queue | 复审队列 | 仅管理员 |
| faq | 问答知识库 | 所有人可读 |
| secretary_mails | 书记信件 | 仅创建者和书记 |
| broadcasts | 书记广播 | 所有人可读 |
| service_guides | 办事指南 | 所有人可读 |
| upper_reports | 对上汇报 | 仅管理员 |
| meetings | 会议记录 | 所有人可读 |
| votes | 表决事项 | 所有人可读 |
| finance_reports | 财务报表 | 所有人可读 |
| messages | 消息通知 | 仅本人 |
| subsidies | 惠农补贴 | 仅本人 |
| agri_calendar | 农事日历 | 所有人可读 |
| checkin_records | 签到记录 | 仅本人 |

---

## 开发规范（防屎山铁律）

### 10大铁律（已100%满足）

1. ✅ 一个文件不超过300行（页面.vue含样式不超过500行）
2. ✅ 一个云函数不超过150行，只做一件事
3. ✅ 一个组件不超过200行
4. ✅ 重复代码出现2次以上必须抽离到 utils/ 或 cloudfunctions/common/
5. ✅ 文件名小写+连字符（如 submit-feedback.vue），变量驼峰，常量全大写
6. ✅ 每个文件必须有注释：文件头写用途，关键函数写说明
7. ✅ 所有页面必须适配适老化：正文≥32rpx，标题≥40rpx，按钮高度≥88rpx
8. ✅ 所有颜色使用uni.scss变量，不直接写色值
9. ✅ 图片上传自动压缩（60%质量，1080px宽）
10. ✅ 防重复提交锁机制（acquireLock/releaseLock）

### 中国红UI设计规范

| 变量 | 色值 | 用途 |
|------|------|------|
| $primary | #C41E24 | 顶部栏、主按钮、选中态 |
| $primary-dark | #A01820 | 按压态 |
| $primary-light | #FDE8E8 | 标签底色 |
| $gold | #D4A843 | 荣誉、财务 |
| $bg | #FAF7F2 | 页面底色 |
| $text-main | #212121 | 标题、正文 |
| $text-sub | #757575 | 辅助文字 |
| $text-weak | #9E9E9E | 占位（WCAG AA） |
| $success | #2E7D32 | 已完成 |
| $warning | #E65100 | 超时 |
| $danger | #C62828 | 紧急 |

### 字号（适老化）

| 变量 | 大小 |
|------|------|
| $font-title | 40rpx |
| $font-card-title | 36rpx |
| $font-body | 32rpx |
| $font-sub | 28rpx |
| $font-btn | 36rpx |
| $font-number | 48rpx |

---

## 常见问题

详见 `docs/13-常见问题FAQ.md`，核心问题：

### 部署相关
- Q：云函数部署失败？→ 检查package.json和wx-server-sdk依赖
- Q：管理员功能看不到？→ 确认admins集合有你的openid且enabled=true
- Q：initDatabase调用失败？→ 检查云开发环境是否开通

### 使用相关
- Q：语音输入不工作？→ 需配置百度/讯飞ASR API
- Q：订阅消息收不到？→ 需在微信公众平台配置模板
- Q：定时催办不执行？→ 需在云开发控制台配置触发器

### 运营相关
- Q：村民不会用？→ 参见《村民使用指南》
- Q：村文书不会发？→ 参见《村文书操作指南》
- Q：备案怎么做？→ 参见《备案操作指引》

---

## 版本历史

- **v2.0.0**（2026年）- 全面完善版
  - 72个云函数、47个页面、29个集合
  - 修复7项P0致命缺陷
  - 新增10项P1核心功能
  - 新增4项P2体验功能
  - 配套13份完整文档
- **v1.0.0**（2026年）- 初始版本
  - 39个云函数、30个页面、18个集合

---

## 联系方式

- 村委办公室：0571-XXXXXXXX
- 村值班电话：0571-XXXXXXXX
- 办公地址：本村民委员会办公室
- 上级监督：街道办/乡镇政府、12345市民热线

---

**项目最后更新**：2026年10月
**项目维护**：本村民委员会
