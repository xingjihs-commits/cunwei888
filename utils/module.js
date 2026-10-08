/**
 * utils/module.js - 模块开关统一读取入口
 * 来源：store/config.js 的 modules（云配置 + 默认 true 兜底）
 * 用法：isModuleEnabled('entry.feedback') / isModuleEnabled('homeBlock.phone', true)
 */
import { useConfigStore } from '@/store/config.js'

export function isModuleEnabled(path, def = true) {
  try {
    const store = useConfigStore()
    return store.isModuleEnabled(path, def)
  } catch (e) {
    return def
  }
}

export default { isModuleEnabled }
