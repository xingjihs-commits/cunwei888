/**
 * composables/useA11y.js - 适老化样式注入
 * 用途：把 utils/accessibility.js 的全局设置（fontScale / highContrast）转为
 *      可绑定到页面根节点的内联 style（CSS 变量），配合 uni.scss 中的
 *      calc(<base>rpx * var(--vb-fs, 1)) 实现全站字号倍数缩放。
 * 用法：const a11yStyle = useA11yStyle() → 模板根节点 :style="a11yStyle"
 */
import { computed } from 'vue'
import { a11y } from '@/utils/accessibility.js'

export function useA11yStyle() {
  return computed(() => {
    const style = { '--vb-fs': String(a11y.fontScale || 1) }
    if (a11y.highContrast) style['--vb-hc'] = '1'
    return style
  })
}
