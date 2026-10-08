/**
 * composables/useAdminGuard.js - 管理员权限拦截
 * 用途：admin/* 页面在 onMounted/onShow 中调用，确保非管理员被拦截
 * 用法：
 *   import { useAdminGuard } from '@/composables/useAdminGuard.js'
 *   const { ensureAdmin, isLoading } = useAdminGuard()
 *   onMounted(async () => {
 *     if (!(await ensureAdmin())) return
 *     // 加载页面数据
 *   })
 */
import { ref } from 'vue'
import { useUserStore } from '@/store/user.js'

export function useAdminGuard() {
  const userStore = useUserStore()
  const loading = ref(true)
  const allowed = ref(false)

  async function ensureAdmin() {
    loading.value = true
    try {
      if (!userStore.openid) {
        // 未登录
        uni.showToast({ title: '请先登录', icon: 'none' })
        setTimeout(() => uni.redirectTo({ url: '/pages/mine/mine' }), 1500)
        allowed.value = false
        return false
      }
      // 强制刷新一次，确认权限未失效
      const isAdmin = await userStore.ensureFreshAdmin()
      if (!isAdmin) {
        uni.showToast({ title: '无管理员权限', icon: 'none' })
        setTimeout(() => uni.navigateBack(), 1500)
        allowed.value = false
        return false
      }
      allowed.value = true
      return true
    } catch (err) {
      console.error('[useAdminGuard] 校验失败:', err)
      uni.showToast({ title: '权限校验失败', icon: 'none' })
      setTimeout(() => uni.navigateBack(), 1500)
      allowed.value = false
      return false
    } finally {
      loading.value = false
    }
  }

  return { ensureAdmin, loading, allowed }
}
