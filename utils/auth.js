/**
 * utils/auth.js - 页面权限分级
 * 公开级 AUTH_PUBLIC   ：无需登录（公示、新闻、广播、项目、价格、班子、指南、财务、会议）
 * 登录级 AUTH_LOGIN    ：需微信登录（点赞、消息、个人中心）
 * 认证级 AUTH_VERIFIED ：需已认证（反映、随手拍、信箱、评价）
 * 用法：在 onLoad/onShow 中 `if (!ensureAuth(AUTH_VERIFIED)) return`
 */
import { useUserStore } from '@/store/user.js'

export const AUTH_PUBLIC = 'public'
export const AUTH_LOGIN = 'login'
export const AUTH_VERIFIED = 'verified'

export function ensureAuth(level = AUTH_LOGIN) {
  const store = useUserStore()

  if (level === AUTH_PUBLIC) return true

  if (!store.openid) {
    uni.showToast({ title: '请先登录', icon: 'none' })
    setTimeout(() => {
      uni.switchTab({ url: '/pages/mine/mine' }).catch(() => {
        uni.navigateTo({ url: '/pages/mine/mine' })
      })
    }, 1200)
    return false
  }

  if (level === AUTH_VERIFIED && !store.isVerified) {
    uni.showToast({ title: '请先完成认证', icon: 'none' })
    setTimeout(() => uni.navigateTo({ url: '/pages/auth/verify' }), 1200)
    return false
  }

  return true
}

export default { ensureAuth, AUTH_PUBLIC, AUTH_LOGIN, AUTH_VERIFIED }
