/**
 * utils/nav.js - 统一页面跳转
 * tabBar 页必须用 switchTab，普通页用 navigateTo。自动判别，避免跳失败。
 */
export const TAB_BAR_PAGES = [
  '/pages/index/index',
  '/pages/service/index',
  '/pages/team/index',
  '/pages/mine/mine'
]

export function goPage(path) {
  const url = String(path || '')
  const clean = url.split('?')[0]
  if (TAB_BAR_PAGES.includes(clean)) {
    uni.switchTab({ url: clean })
  } else {
    uni.navigateTo({ url })
  }
}
