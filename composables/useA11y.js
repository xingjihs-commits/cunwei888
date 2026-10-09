/**
 * composables/useA11y.js - 适老化字号（方案 B）
 * 原理：小程序 rem 基准由 <page-meta root-font-size> 控制（基础库 2.9.0+）。
 *      页面在模板根放置 <page-meta :root-font-size="rootFontSize" />，
 *      字号在 uni.scss 中以 rem 定义（基准 32rpx = 1rem），即可全站按倍数缩放。
 * 换算：rootFontSize(px) = (屏宽 / 750) * 32 * fontScale，等价于 32rpx * fontScale。
 * 用法：const rootFontSize = useRootFontSize() → <page-meta :root-font-size="rootFontSize" />
 */
import { computed } from 'vue'
import { a11y } from '@/utils/accessibility.js'

const FONT_BASE_RPX = 32

export function useRootFontSize() {
  return computed(() => {
    let windowWidth = 375
    try {
      const info = uni.getSystemInfoSync()
      windowWidth = info.windowWidth || info.screenWidth || 375
    } catch (e) {
      // 读取失败时用 375 兜底
    }
    const scale = a11y.fontScale || 1
    const px = (windowWidth / 750) * FONT_BASE_RPX * scale
    return px + 'px'
  })
}
