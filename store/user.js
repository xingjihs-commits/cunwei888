/**
 * store/user.js - 用户状态管理
 * 改造点：
 *   1. 删除 checkAdmin() 死方法（云函数不存在，refreshUserInfo 已能拉到 isAdmin）
 *   2. 新增 isAdmin getter / canManageRecord / canUpdateTask 等集中权限判定
 *   3. 新增 ensureFreshAdmin() 每次进入 admin 页面前校验
 */
import { defineStore } from 'pinia'
import { callFunction } from '@/utils/request.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    openid: '',
    nickName: '游客',
    avatarUrl: '',
    phone: '',
    realName: '',
    villageGroup: '',
    idCard: '',
    isVerified: false,
    isAdmin: false,
    committeeWeight: 0, // 4 档：0 村民 / 50 网格员 / 70 委员 / 90 主任 / 100 支书
    role: 'guest', // guest/villager/admin/leader
    registerTime: '',
    // 权限校验时间戳（避免短期内重复请求）
    _lastRefreshTime: 0
  }),

  getters: {
    isLoggedIn(state) {
      return !!state.openid
    },
    displayName(state) {
      return state.isVerified ? state.realName : (state.nickName || '游客')
    },
    verifyText(state) {
      if (state.isAdmin) return '管理员'
      return state.isVerified ? '已认证村民' : '未认证'
    },
    // 集中权限判定：是否可管理记录（发布新闻/公示等）
    canManageRecord(state) {
      return state.isAdmin
    },
    // 是否可更新任务进度
    canUpdateTask(state) {
      return state.isAdmin
    },
    // 4 档权限门槛（与 docs 约定一致；软权限，真正的安全在后端 checkAdminWeight）
    canSeeAdmin(state) { return state.committeeWeight >= 50 },
    canManageTickets(state) { return state.committeeWeight >= 70 },
    canPublishContent(state) { return state.committeeWeight >= 50 },
    canSeeDashboard(state) { return state.committeeWeight >= 90 },
    canConfig(state) { return state.committeeWeight >= 90 }
  },

  actions: {
    // 从本地存储初始化
    initUser() {
      const data = uni.getStorageSync('userInfo')
      if (data) {
        this.$patch(data)
      }
    },

    saveToStorage() {
      const data = {
        openid: this.openid,
        nickName: this.nickName,
        avatarUrl: this.avatarUrl,
        phone: this.phone,
        realName: this.realName,
        villageGroup: this.villageGroup,
        isVerified: this.isVerified,
        isAdmin: this.isAdmin,
        committeeWeight: this.committeeWeight,
        role: this.role
      }
      uni.setStorageSync('userInfo', data)
    },

    setWxUserInfo(info) {
      // 防止微信返回的"微信用户"匿名昵称覆盖已有昵称
      if (info.nickName && info.nickName !== '微信用户') {
        this.nickName = info.nickName
      }
      if (info.avatarUrl && !info.avatarUrl.includes('0')) {
        this.avatarUrl = info.avatarUrl
      }
      this.saveToStorage()
    },

    setOpenid(openid) {
      this.openid = openid
      this.saveToStorage()
    },

    async submitVerify(data) {
      const res = await callFunction('verifyUser', data)
      if (res.success) {
        uni.showToast({ title: '认证申请已提交', icon: 'success' })
      }
      return res
    },

    async refreshUserInfo(force = false) {
      if (!this.openid) return
      // 5 分钟内不重复刷新
      const now = Date.now()
      if (!force && (now - this._lastRefreshTime) < 5 * 60 * 1000) {
        return
      }
      this._lastRefreshTime = now
      try {
        const res = await callFunction('getUserInfo', {})
        if (res.success && res.data) {
          this.$patch(res.data)
          this.saveToStorage()
        }
      } catch (err) {
        console.error('[refreshUserInfo] 失败:', err)
      }
    },

    /**
     * 进入 admin 页面前调用：强制刷新一次，确保权限未失效
     * @returns {boolean} 是否是管理员
     */
    async ensureFreshAdmin() {
      if (!this.openid) return false
      await this.refreshUserInfo(true)
      return this.isAdmin
    },

    logout() {
      this.$reset()
      uni.removeStorageSync('userInfo')
      uni.removeStorageSync('agreementAgreed')
    }
  }
})
