# 规则：项目地图的维护（PROJECT_MAP.md）

> 适用文件：`PROJECT_MAP.md`、`scripts/check-project-map.js`
> 目的：让「改哪个文件」始终能在地图里查到，且地图不腐烂。

## 1. 权威边界（谁说了算）

| 内容 | 权威来源 | 生成方式 |
|---|---|---|
| 文件**数量 / 全量名单** | `docs/00-代码结构清单.md` | 自动（`npm run gen:doc`） |
| **职责说明 / 场景定位 / 分层** | `PROJECT_MAP.md` | 人工 |
| 云函数逐项明细（行数/鉴权） | `docs/00a-云函数明细.md` | 人工 |

三者不重复：地图只写「职责 + 定位」，不复制逐行明细。

## 2. 触发条件（必须更新地图）

出现以下任一改动，**同一提交内**必须更新 `PROJECT_MAP.md`：

- 新增 / 删除 / 重命名 **页面**（`pages/**/*.vue`）
- 新增 / 删除 / 重命名 **组件**（`components/**/*.vue`）
- 新增 / 删除 **云函数**（`cloudfunctions/<名字>/`）
- 新增 / 删除 `utils/` `store/` `composables/` 文件
- 新增 / 删除 `scripts/` `tests/` 文件
- 新增 / 删除根级文件
- 页面**路由或 tabBar** 变动（`pages.json`）→ 同步 §3.1
- 目录结构重组

> 只改**逻辑/样式**（不动文件名和结构）时，无需动地图。

## 3. 更新流程

1. 在 `PROJECT_MAP.md` 对应章节增删条目：
   - 页面 → §2.2（并在 §3.1 核对路由/tabBar）
   - 组件 → §2.3
   - 云函数 → §2.4（同时登记 `scripts/gen-structure.js` 的分类映射）
   - utils/store/composables → §2.5
   - scripts/tests/根文件 → §2.7 / §2.8 / §2.1
2. 写一条**职责注释**（一句话说清「这文件管什么」）。
3. 涉及新功能定位时，在 §1 场景索引补一行。
4. 跑校验（见 §4）。

## 4. 校验（强制）

```bash
npm run map:check    # 覆盖校验：地图是否漏登记任何文件
npm run check:doc    # 结构清单校验：docs/00 / README 与代码一致
```

- `map:check` 采用**子串包含**校验：每个真实文件的相对路径（页面/组件/utils/…）或
  目录（云函数 `cloudfunctions/<名字>/`）必须在地图中出现，否则**退出码 1**。
- 已在 **CI** 中作为门禁（`.github/workflows/ci.yml`），PR 不通过则不能合并。

## 5. 边界与例外

- 地图**不收录**：`node_modules/`、`dist/`、`unpackage/`、`.git/`。
- `docs/` 子目录文件不逐个登记（引用 `docs/00`）。
- `static/` 资源以目录形式说明即可。
- 校验是「宽松覆盖」：只保证「文件不被漏登记」，不保证「职责描述不过时」；
  职责文字的准确性由 reviewer 与 §2 触发条件共同保证。

## 6. 与既有脚本的关系

| 脚本 | 作用 | 命令 |
|---|---|---|
| `scripts/gen-structure.js` | 生成 `docs/00` 全量清单 | `npm run gen:doc` |
| `scripts/check-structure.js` | 校验 `docs/00`/README 与代码一致 | `npm run check:doc` |
| `scripts/check-project-map.js` | 校验 `PROJECT_MAP.md` 覆盖全 | `npm run map:check` |

改动结构后**建议三条一起跑**：`npm run gen:doc; npm run check:doc; npm run map:check`。
