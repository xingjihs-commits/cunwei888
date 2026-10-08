# 村务连心桥 · 项目规则（供 opencode 读取）

> 只写项目特有内容；通用规则见全局 `~/.claude/CLAUDE.md`。

## 项目概况
- 技术栈：uni-app 3 + Vue 3（`<script setup>`）+ Pinia，目标 **微信小程序** + 微信云开发
- 仓库：https://github.com/xingjihs-commits/cunwei888 （分支 `main`）
- 规模：页面 70（路由 68，`vote` 2 页下线）/ 云函数 91 业务 + `common/` / 组件 17 / utils 9

## 目录布局（重要）
- **根目录布局**（HBuilderX 风格）：`manifest.json`、`pages.json`、`App.vue` 在**项目根**，**不是** `src/`。
- 因此不能直接跑 `uni build`（它默认找 `cwd/src`）。已用 `scripts/uni-cli.js` 设置 `UNI_INPUT_DIR` 兜底。

## 常用命令
- 编译：`npm run build:mp-weixin` → 产物 `dist/build/mp-weixin/`
- 测试：`npm test`（vitest，当前 30/30）
- Lint：`npm run lint`（eslint，目标 0 error / 0 warning）；格式化 `npm run format`
- 文档漂移：`npm run gen:doc` 生成 `docs/00-代码结构清单.md`；`npm run check:doc` 校验一致
- 三态体检：`node scripts/check-states.js`（列表页骨架/空态/错误态）

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

## 派工注意（踩过的坑）
- `deepseek_delegate_to_deepseek` 可能 **MCP 超时但子代理仍在后台写入**。派工后要**观察文件时间戳直到稳定**再校验，避免与你的改动并发冲突。
- 大规模批量改（display_names/骨架屏）后，必须抽查 + `npm run build:mp-weixin` + `npm test` 验证。
