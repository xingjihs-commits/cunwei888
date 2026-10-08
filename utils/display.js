/**
 * utils/display.js - 展示名称统一读取入口
 * 来源：store/config.js 的 displayNames（云配置 + 默认值兜底）
 * 用法：getDisplay('tab.home') / getDisplay('entry.feedback', '村民反映')
 */
import { useConfigStore } from '@/store/config.js'

export function getDisplay(path, def = '') {
  try {
    const store = useConfigStore()
    return store.getDisplay(path, def)
  } catch (e) {
    return def
  }
}

export default { getDisplay }
