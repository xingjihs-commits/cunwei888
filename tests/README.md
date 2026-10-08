# 测试说明

## 1. 单元测试（vitest）

### 安装依赖
```bash
cd village-bridge-fixed
npm install
```

### 运行测试
```bash
npm test          # 单次运行
npm run test:watch # 监听模式
```

### 测试覆盖
- `tests/constants.test.js` - common/constants.js 的 normalizeStatus / expandStatuses
- `tests/format.test.js` - utils/format.js 的 normalizeStatus / urgentText / formatMoney / formatDuration / maskPhone
- `tests/security.test.js` - 内容安全决策逻辑 + 鉴权逻辑

### 覆盖率目标
- v1.4：3 个核心模块单测覆盖
- v1.5：扩展到所有 utils/ 模块
- v2.0：80% 覆盖率 + e2e 测试

## 2. 手工回归测试

按 `docs/39-核心链路测试清单.md` 执行 22 个核心环节 + 6 个异常路径 + 适老化测试。

每次发布前必须全跑一遍，填写测试报告。

## 3. E2E 测试（v2.0 计划）

使用 @dcloudio/uni-automator，目标：
- 反映→派单→处理→评价→看板 全链路自动跑
- 异常路径（弱网/未登录/内容违规）自动测试
- CI/CD 集成

## 4. Mock 数据

`docs/05-示例数据/` 下有各集合的示例 JSON，可用于：
- 测试环境数据初始化
- 不依赖真实云环境也能跑测试

## 5. 测试环境

- 单测：本地 node 环境，不依赖微信云
- 集成测试：微信开发者工具 + 真实云环境（开发版）
- 预发布测试：微信公众平台体验版二维码
- 生产测试：分阶段发布（先 10% 用户灰度）
