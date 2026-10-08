<!--
  App.vue - 应用根组件
  改造点：
    1. 首次进入弹窗：要求同意"用户协议+隐私政策"，否则退出小程序
    2. 全局错误捕获 onError / onUnhandledRejection / onPageNotFound
    3. 网络状态监听，断网提示 banner
    4. 云开发环境从 ext 配置读取，避免硬编码
-->
<script setup>
import { onLaunch, onShow, onHide, onError, onUnhandledRejection, onPageNotFound } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user.js'
import { useConfigStore } from '@/store/config.js'
import { loadA11y } from '@/utils/accessibility.js'

// 应用启动
onLaunch(() => {
  console.log('村务连心桥启动')

  const userStore = useUserStore()
  const configStore = useConfigStore()

  // 适老化设置：从 storage 读取并写入全局单例，供各组件消费
  loadA11y()

  // 初始化云开发（环境 ID 从 ext 配置读取，避免硬编码）
  // #ifdef MP-WEIXIN
  if (wx.cloud) {
    // 优先从 ext 配置读取云环境 ID
    let envId = 'village-bridge-prod'  // 兜底默认
    try {
      // wx.getAccountInfoSync().miniProgram 不含 ext，需要 __wxConfig
      const extConfig = wx.getExtConfig ? wx.getExtConfigSync() : null
      if (extConfig && extConfig.cloudEnv) {
        envId = extConfig.cloudEnv
      }
    } catch (e) {
      console.warn('读取 ext 配置失败，使用默认 env:', e)
    }
    wx.cloud.init({
      env: envId,
      traceUser: true
    })
  }
  // #endif

  // 获取本地存储的用户信息
  userStore.initUser()

  // 加载模块配置
  configStore.loadConfig()

  // 首次进入协议同意弹窗（合规要求）
  // #ifdef MP-WEIXIN
  const agreed = uni.getStorageSync('agreementAgreed')
  if (!agreed) {
    setTimeout(() => {
      uni.showModal({
        title: '服务协议与隐私政策',
        content: '欢迎使用村务连心桥。在使用前，请阅读并同意《服务协议》与《隐私政策》。我们仅在你授权后采集必要信息（openid、手机号、位置等）用于村务服务。',
        confirmText: '同意并继续',
        cancelText: '不同意',
        success(res) {
          if (res.confirm) {
            uni.setStorageSync('agreementAgreed', true)
          } else {
            // 不同意则退出小程序
            uni.showModal({
              title: '提示',
              content: '不同意将无法使用小程序功能。',
              showCancel: false,
              confirmText: '我知道了',
              success() {
                if (uni.exitMiniProgram) {
                  uni.exitMiniProgram({ success: () => {} })
                }
              }
            })
          }
        }
      })
    }, 500)  // 延迟 500ms 等基础库就绪
  }
  // #endif

  // 检查小程序更新
  // #ifdef MP-WEIXIN
  if (uni.canIUse('getUpdateManager')) {
    const updateManager = uni.getUpdateManager()
    updateManager.onCheckForUpdate(() => {})
    updateManager.onUpdateReady(() => {
      uni.showModal({
        title: '更新提示',
        content: '新版本已就绪，是否立即重启？',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(() => {
      uni.showToast({ title: '更新下载失败，请检查网络', icon: 'none' })
    })
  }
  // #endif

  // 网络状态监听
  // #ifdef MP-WEIXIN
  uni.onNetworkStatusChange((res) => {
    if (!res.isConnected) {
      uni.showToast({
        title: '当前网络不可用，请检查网络',
        icon: 'none',
        duration: 3000
      })
    }
  })
  // #endif
})

// 应用显示
onShow(() => {
  console.log('应用进入前台')
  // 每次进入前台时校验用户登录态是否过期（如管理员被撤销）
  const userStore = useUserStore()
  if (userStore.openid && userStore.isAdmin) {
    // 管理员每次进入前台重新拉取一次，确认权限未失效
    userStore.refreshUserInfo()
  }
})

// 应用隐藏
onHide(() => {
  console.log('应用进入后台')
})

// 全局错误捕获
onError((err) => {
  console.error('[全局错误]', err)
  // 上报到云端 logs（异步，不阻断）
  // #ifdef MP-WEIXIN
  try {
    if (wx.cloud) {
      wx.cloud.callFunction({
        name: 'logError',
        data: { type: 'app_error', error: String(err).substring(0, 1000), time: Date.now() }
      }).catch(() => {})
    }
  } catch (e) {}
  // #endif
})

// 未处理的 Promise rejection
onUnhandledRejection(({ reason }) => {
  console.error('[未处理的 Promise]', reason)
})

// 页面不存在
onPageNotFound(() => {
  uni.showToast({ title: '页面不存在', icon: 'none' })
  setTimeout(() => {
    uni.switchTab({ url: '/pages/index/index' })
  }, 1000)
})

</script>

<style lang="scss">
/* 全局样式 - 引入uni.scss变量 */
@import '@/uni.scss';

/* 基础重置 */
page {
  background-color: $bg;
  color: $text-main;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: $font-body;
  line-height: 1.6;
}

/* 视图容器 */
view, text {
  box-sizing: border-box;
}

/* 图片 */
image {
  display: block;
}

/* 滚动条隐藏 */
::-webkit-scrollbar {
  display: none;
}

/* 按钮重置 */
button {
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;

  &::after {
    border: none;
  }
}

/* 输入框 */
input, textarea {
  box-sizing: border-box;
}

/* 链接 */
.navigator {
  display: inline;
}
</style>
