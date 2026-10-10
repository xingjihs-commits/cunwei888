# 村务连心桥 · 项目规则（供 opencode 读取）

> 只写项目特有内容；通用规则见全局 `~/.claude/CLAUDE.md`。

## 项目概况
- 技术栈：uni-app 3 + Vue 3（`<script setup>`）+ Pinia，目标 **微信小程序** + 微信云开发
- 仓库：https://github.com/xingjihs-commits/cunwei888 （分支 `main`）
- 规模：页面 71（路由 69，`vote` 2 页下线）/ 云函数 94 业务 + `common/` / 组件 21 / utils 16

## 目录布局（重要）
- **根目录布局**（HBuilderX 风格）：`manifest.json`、`pages.json`、`App.vue` 在**项目根**，**不是** `src/`。
- 因此不能直接跑 `uni build`（它默认找 `cwd/src`）。已用 `scripts/uni-cli.js` 设置 `UNI_INPUT_DIR` 兜底。

## 常用命令
- 编译：`npm run build:mp-weixin` → 产物 `dist/build/mp-weixin/`
- 测试：`npm test`（vitest，当前 30/30）
- Lint：`npm run lint`（eslint，目标 0 error / 0 warning）；格式化 `npm run format`
- 文档漂移：`npm run gen:doc` 生成 `docs/00-代码结构清单.md`；`npm run check:doc` 校验一致
- 三态体检：`node scripts/check-states.js`（列表页骨架/空态/错误态）
- 项目地图：`npm run map:check` 校验 `PROJECT_MAP.md` 覆盖全（规则见 `.claude/rules/project-map.md`）

## 全局把握（开局先做，防跑偏）
- 开工先读根 `PROJECT_MAP.md`（分层职责 + 改什么看哪个文件）+ `PROJECT_INDEX.md`（文件 → 函数/导出 + 行号），建立全局观再动手。
- 定位符号：先查索引拿「文件 + 行号」再精读，勿盲读整文件。
- 维护：新增/删除/重命名文件或改路由后更新 `PROJECT_MAP.md` 并跑 `npm run map:check`（已接入 CI）；改代码后重跑 `node C:\Users\FF\.claude\skills\codebase-index\gen-index.js .` 刷新索引。
- 详细规则：`.claude/rules/project-map.md`。

## 分层与规范（企业标准，改前必读）
- **分层**：视图(`pages/`) → 应用(`store/` `composables/`) → 接口(`utils/request.js`) → 云函数(`cloudfunctions/`) → 数据(云开发)。禁止跨层直连：视图**不得**直连数据库或 `wx.cloud.callFunction`（必须走 `request.js`）；store 不碰数据库。详见 `docs/28-架构分层说明.md`。
- **UI**：间距/圆角/阴影/颜色/字号**只能用 `uni.scss` 变量**；卡片复用 `.card`、按钮 `.btn-primary`/`.btn-default`、页面容器 `.page-container`；正文 ≥32rpx、按钮 ≥88rpx、行高 ≥1.4。详见 `docs/31-UI布局规范.md`；通用设计底线见全局 `~/.claude/rules/ui-design-system.md`。
- **命名**：页面 kebab-case、组件 PascalCase、云函数 camelCase、常量 UPPER_SNAKE、集合 snake_case、字段 camelCase。
- **大小上限**：页面 ≤500 行、云函数 ≤150 行、组件 ≤200 行；超限即拆。
- **返回格式/鉴权/错误处理**：见 `docs/28` §28.4/28.5/28.7。

## 项目红线
- 不改业务逻辑（云函数核心不动）；不改颜色体系（中国红 `#C41E24`）；不改字号体系
- 不删数据库集合、不删云函数（可停用）
- **每个页面 ≤500 行**；颜色一律用 `uni.scss` 变量
- 涉及渲染/构建的改动必须 `npm run build:mp-weixin` 通过

## 约定（改代码前先懂）
- **展示文案**一律走 `display_names`：`store/config.js` 的 `DEFAULT_DISPLAY_NAMES`；
  页面内 `const configStore = useConfigStore(); function t(p,d=''){return configStore.getDisplay(p,d)}`。
  日期格式串 / 数据枚举比较值 / 动态模板串**不替换**。
- **权限**用 `utils/auth.js` 三级：`ensureAuth(AUTH_LOGIN | AUTH_VERIFIED)`；`mine` 为登录落地页不守卫。
- **适老化**：`utils/accessibility.js` 全局单例（fontScale/highContrast/largeButton/reduceMotion/voiceEnabled），
  App.vue onLaunch 加载，BigButton/Skeleton/VoiceInput 消费。
- 云函数部署顺序见 `docs/06-云函数部署顺序清单.md`（注意该文档数字偏旧）。

## 未完成 / 注意
- `vote` 相关页面已下线（不在 `pages.json`，不参与编译）
- `cloudfunctions/speechRecognition` 是**占位**，未接真实 ASR
- `category/list` 的二级小类是占位跳转，无独立落地页
- 19 个列表页缺「空态/错误态」（需加 try/catch + 重试，属业务逻辑变更）
- **真机未验证**；`manifest.json` / `project.config.json` 的 AppID、云环境 ID 仍是占位符
- `docs/` 部分文档是旧版本快照（12 写 v2.0、35 写 v1.4、11 说 29 文件）

## 大改动注意（踩过的坑）
- 大规模批量改（display_names/骨架屏）后，必须抽查 + `npm run build:mp-weixin` + `npm test` 验证。
