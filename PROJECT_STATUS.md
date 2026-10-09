# 项目状态

## 当前版本
V1.7

## 仓库与交接（2026-10-09 会话）
- 已纳入 git 并推送：https://github.com/xingjihs-commits/cunwei888 （分支 `main`，首个提交 `c47d296`）
- 项目规则见 `.claude/CLAUDE.md`（根目录布局、构建/测试/lint 命令、红线、约定）
- 工程状态：`npm run build:mp-weixin` 通过、`npm test` 30/30、`npm run lint` 0 error/0 warning、`npm run check:doc` 一致
- 踩坑记录：uni CLI 默认找 `src/`（本项目是根目录布局，已用 `scripts/uni-cli.js` 设 `UNI_INPUT_DIR`）
- 部分 `docs/` 为旧版本快照（12 写 v2.0、35 写 v1.4、11 说 29 文件），未随 V1.7 更新

## 红线（不许碰）
1. 不改业务逻辑（云函数核心逻辑不动）
2. 不改颜色体系（中国红 #C41E24 保留）
3. 不改字号体系
4. 不删数据库集合
5. 不删云函数（可标记暂不使用）
6. 每改一个文件前，先读，再改
7. 适老化：正文 ≥32rpx、按钮 ≥88rpx
8. 每个页面 ≤500 行
9. 所有颜色用 uni.scss 变量
10. 不确定的选最保守方案，在报告里标注
11. 人工项（AppID、模板 ID、openid）标出来跳过，不阻塞

## 关键决策
- 不做投票：村一级没法律效力，pages/vote/ 标记暂不使用，modules.entry.vote = false
- 常用电话不放假号：只放村医/网格员/村委值班/派出所/供电所/水管员
- 不用视频号：视频存云开发存储，只给认证村民看，不自动播放
- display_names 全量替换：页面 + 组件的 UI 文案从配置读（日期格式串/数据枚举值/动态模板串除外）
- 模块开关：所有模块后台可开关，modules 4 组（tab/category/entry/homeBlock）
- 书记风采/领导关怀合并：一个位置，Tab 切换，一个集合 leader_content + type 字段

## 已完成
- 版本号统一 V1.7
- tabBar 3→4 项（首页/服务/消息/我的）
- 首页 9→8 块
- 5 大类（信息公示/投诉举报/学习培训/办事查询/生活服务）
- 常用电话替换紧急电话
- modules 开关（4 组）
- display_names（现 31 分组 / 376 key，覆盖页面与组件 UI 文案）
- 防漂移脚本（gen:doc / check:doc）
- 注册简化（宽进严管）
- 自动排版（utils/formatText.js + 云函数 formatText）
- 举报机制（入口 v1.1 已有；本轮修复 submitReport 的 isAnonymous 未定义 bug）
- 书记风采/领导关怀前后端（leader_content + publishLeaderContent/getLeaderContentList + pages/leader + admin/leader-publish）
- 配置字段名统一（module_config.display_names / modules）
- docs/00a-云函数明细.md
- 7 个文档不一致修复（云函数数 91 / admin 21 / 页面 70=68 路由 / uv-ui 删除 / 内容安全 16 / CHANGELOG 版本跳号说明 / lint 注释）
- 权限分级（utils/auth.js）接入 15 页：核心 6 页 + 我的随手拍/我的来信/我的反映/我的办理/个人资料（登录级）+ 反映/签到/失物发布（认证级）
- 骨架屏接入全部 34 个列表页（缺骨架 = 0；check-states 已排除表单/配置/静态页误报）
- 编译通过（`npm run build:mp-weixin` → `dist/build/mp-weixin`，348 文件）
  - 修根目录布局/CLI 输入目录问题（新增 scripts/uni-cli.js）
  - 修本轮引入的 6 处结构错误（重复属性、import 混入 `<style>`）
  - 修 report/privacy 历史遗留（未定义 SCSS 变量、错误 import 来源）
- 残留中文接入 display_names：表单标签/占位符/按钮/空态全部改为配置读取（新增 placeholder/home/projection/voice 等分组）
- 抽取组件：首页拆 4 个 `components/home/*`、发布页拆 `components/admin/PublishExtraFields`，两页均 ≤500 行
- 适老化设置真正生效：新增 `utils/accessibility.js` 全局单例；BigButton（字号倍数/大按钮/高对比度）、Skeleton（减少动画）、VoiceInput（语音开关）、设置页、App.vue 全部接通
- 接入 eslint + prettier + `.eslintrc.js`，`npm run lint` 全绿（0 error / 0 warning）
- 单元测试修复（constants.test.js 期望值），30/30 通过
- 修复 `admin/dashboard.vue`、`admin/secret-list.vue` 缺 `useAdminGuard` import（会 ReferenceError）
- 修复 `store/user.js` `canUpdateTask` 返回函数而非布尔值

## 半成品（做了但不完整）
- 权限分级：已接 15 页
  - 例外：mine 为登录落地页，接 AUTH_LOGIN 会自循环，保守跳过
  - 剩余：公开浏览页本身无需守卫
- 三态：缺骨架的列表页 = 0（34 个列表页全覆盖）
  - 剩余 19 页缺「空态/错误态」：补错误态需加 try/catch+重试逻辑，属业务逻辑变更，暂不做
- 发布页极简：只加了自动排版+草稿，没砍字段
  - 决定：保持现状，砍了会丢项目/价格/任务发布能力
- 举报写 reports 集合，未写 audit_queue
  - 决定：保持现状，audit_queue 面向内容安全复审，字段不同

## 已知问题（2026-10 全面体检）
- 三态：剩 19 页缺「空态/错误态」（非骨架），补错误态涉及业务逻辑，列为后续
- 模板保留的少量中文为日期格式串/数据枚举/动态模板串（刻意不动）
- uni 构建脚本已改走 `scripts/uni-cli.js`（固定根目录输入），团队需知悉
- 真机运行行为尚未验证（仅编译期验证 + 单测）

## 待人工
### 部署（上线前必须）
- [ ] 替换 AppID
- [ ] 替换云环境 ID
- [ ] 申请 7 个订阅消息模板
- [ ] 填 ICP 备案号
- [ ] 填真实常用电话
- [ ] 加管理员 openid
- [ ] 开通内容安全权限
- [ ] 开通手机号一键授权权限（phonenumber.getPhoneNumber）
- [ ] 配置 request 合法域名
- [ ] 跑一次 migrateStatusEnum
- [ ] 配置定时触发器
- [ ] 配置 dispatchMap
- [ ] 加数据库索引
- [ ] 创建 leader_content 集合
- [ ] 准备视频素材（720p/1Mbps/≤15MB/faststart）

### 真机验证
- [ ] 认证 → 注册管理比对
- [ ] 反映 → 派单 → 处理 → 评价 → 看板
- [ ] 信箱 → 回信
- [ ] 违规 → 复审
- [ ] 常用电话 → 拨号
- [ ] 书记风采 → 播放
- [ ] 名称配置 → 改完生效
- [ ] 模块开关 → 关掉后入口消失

### 培训运营
- [ ] 村委培训（10 分钟教会发内容）
- [ ] 村民使用指南
- [ ] 常见问题 FAQ
- [ ] 推广方案

## 下一步
1. 真机验证核心链路（见「真机验证」清单）
2. 项目纳入 git，便于后续批量改动可追溯
3. 补齐 19 页的「空态/错误态」（需加 try/catch + 重试，属业务逻辑变更）
4. 语音识别接真实 ASR（现为占位实现）
