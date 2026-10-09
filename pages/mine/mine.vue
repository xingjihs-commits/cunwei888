<!--
  pages/mine/mine.vue - 个人中心
  改造点：
    1. 替换已废弃的 wx.getUserProfile → button open-type=chooseAvatar + input type=nickname
    2. ICP 备案号从 module_config 动态加载
    3. 新增"隐私政策"菜单项
    4. 默认头像用 base64 PNG 替代 SVG（兼容性更好）
-->
<template>
  <view class="page-mine" :style="a11yStyle">
    <view class="header" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="user-card">
        <!-- 头像：用 button open-type=chooseAvatar -->
        <button class="avatar-btn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <image class="avatar" :src="userStore.avatarUrl || defaultAvatar" mode="aspectFill" />
        </button>
        <view class="user-info">
          <!-- 昵称：未认证时用 input type=nickname -->
          <input
            v-if="!userStore.realName"
            class="user-name-input"
            type="nickname"
             :placeholder="t('placeholder.nickname', '点击设置昵称')"
            @blur="onNicknameConfirm"
          />
          <text v-else class="user-name">{{ userStore.displayName }}</text>
          <view class="verify-row">
            <view class="verify-tag" :class="verifyClass">{{ verifyText }}</view>
            <view v-if="!userStore.isVerified" class="verify-btn" @click="goVerify">去认证</view>
          </view>
          <text v-if="userStore.villageGroup" class="user-group">{{ userStore.villageGroup }}</text>
        </view>
        <view v-if="userStore.isAdmin" class="admin-badge">管理员</view>
      </view>
    </view>

    <view class="menu-section">
      <view class="menu-item" @click="goPage('/pages/feedback/my-feedback')">
        <view class="menu-icon">💬</view>
        <text class="menu-text">{{ t('subCategory.myFeedback', '我的反映') }}</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/snapshot/my-snapshots')">
        <view class="menu-icon">📷</view>
        <text class="menu-text">我的随手拍</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/secretary/my-mails')">
        <view class="menu-icon">✉️</view>
        <text class="menu-text">我的来信</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/task/my-progress')">
        <view class="menu-icon">📋</view>
        <text class="menu-text">我的办理</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/admin/my-dispatched')">
        <view class="menu-icon">📥</view>
        <text class="menu-text">我的派单</text>
        <view class="menu-arrow">></view>
      </view>
    </view>

    <view class="menu-section">
      <view class="menu-item" @click="goPage('/pages/service/guide')">
        <view class="menu-icon">📋</view>
        <text class="menu-text">{{ t('entry.guide', '办事指南') }}</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/finance/list')">
        <view class="menu-icon">💰</view>
        <text class="menu-text">{{ t('pageTitle.finance', '财务三资') }}</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/meeting/list')">
        <view class="menu-icon">👥</view>
        <text class="menu-text">{{ t('entry.meeting', '村务会议') }}</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/lost-found/list')">
        <view class="menu-icon">📦</view>
        <text class="menu-text">{{ t('entry.lostFound', '失物招领') }}</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/agri/calendar')">
        <view class="menu-icon">🌾</view>
        <text class="menu-text">{{ t('entry.calendar', '农事日历') }}</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/agri/checkin')">
        <view class="menu-icon">☀️</view>
        <text class="menu-text">{{ t('entry.checkin', '每日签到') }}</text>
        <view class="menu-arrow">></view>
      </view>
    </view>

    <view class="menu-section">
      <view class="menu-item" @click="goPage('/pages/mine/profile')">
        <view class="menu-icon">👤</view>
        <text class="menu-text">个人信息</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/settings/accessibility')">
        <view class="menu-icon">♿</view>
        <text class="menu-text">适老化设置</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/agreement/index')">
        <view class="menu-icon">📜</view>
        <text class="menu-text">服务协议</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPrivacy">
        <view class="menu-icon">🔐</view>
        <text class="menu-text">隐私政策</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="showAbout">
        <view class="menu-icon">ℹ️</view>
        <text class="menu-text">关于我们</text>
        <view class="menu-arrow">></view>
      </view>
    </view>

    <view v-if="userStore.isAdmin" class="menu-section admin-section">
      <view class="section-title">工单与信件</view>
      <view class="menu-item" @click="goPage('/pages/admin/feedback-list')">
        <view class="menu-icon">📥</view>
        <text class="menu-text">工单管理</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/admin/my-dispatched')">
        <view class="menu-icon">📋</view>
        <text class="menu-text">我的派单</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/admin/secret-list')">
        <view class="menu-icon">🔒</view>
        <text class="menu-text">亲阅件</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/admin/secretary-mails')">
        <view class="menu-icon">✉️</view>
        <text class="menu-text">信箱管理</text>
        <view class="menu-arrow">></view>
      </view>
    </view>

    <view v-if="userStore.isAdmin" class="menu-section admin-section">
      <view class="section-title">内容发布</view>
      <view class="menu-item" @click="goPage('/pages/admin/publish')">
        <view class="menu-icon">📤</view>
        <text class="menu-text">新闻/公示/任务</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/admin/finance-publish')">
        <view class="menu-icon">💰</view>
        <text class="menu-text">财务公示</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/secretary/broadcast')">
        <view class="menu-icon">📢</view>
        <text class="menu-text">发布广播</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/admin/vote-create')">
        <view class="menu-icon">🗳️</view>
        <text class="menu-text">发起表决</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/admin/meeting-create')">
        <view class="menu-icon">👥</view>
        <text class="menu-text">创建会议</text>
        <view class="menu-arrow">></view>
      </view>
    </view>

    <view v-if="userStore.isAdmin" class="menu-section admin-section">
      <view class="section-title">审核与考核</view>
      <view class="menu-item" @click="goPage('/pages/admin/auth-list')">
        <view class="menu-icon">✓</view>
        <text class="menu-text">认证审核</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/admin/audit-queue')">
        <view class="menu-icon">🔍</view>
        <text class="menu-text">人工复审</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/admin/dashboard')">
        <view class="menu-icon">📊</view>
        <text class="menu-text">考核看板</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/admin/upper-reports')">
        <view class="menu-icon">📈</view>
        <text class="menu-text">对上汇报</text>
        <view class="menu-arrow">></view>
      </view>
    </view>

    <view v-if="userStore.isAdmin" class="menu-section admin-section">
      <view class="section-title">系统配置</view>
      <view class="menu-item" @click="goPage('/pages/admin/dispatch-config')">
        <view class="menu-icon">🗺️</view>
        <text class="menu-text">分配地图</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/admin/module-config')">
        <view class="menu-icon">⚙️</view>
        <text class="menu-text">模块配置</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/admin/name-config')">
        <view class="menu-icon">🏷️</view>
        <text class="menu-text">名称配置</text>
        <view class="menu-arrow">></view>
      </view>
      <view class="menu-item" @click="goPage('/pages/admin/leader-publish')">
        <view class="menu-icon">🎬</view>
        <text class="menu-text">书记风采发布</text>
        <view class="menu-arrow">></view>
      </view>
    </view>

    <view class="footer">
      <text class="footer-text">村务连心桥 v1.7.0</text>
      <text v-if="icpNumber" class="footer-icp">{{ icpNumber }}</text>
      <text v-if="policeIcpNumber" class="footer-icp">{{ policeIcpNumber }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user.js'
import { useConfigStore } from '@/store/config.js'
import { useA11yStyle } from '@/composables/useA11y.js'

const userStore = useUserStore()
const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const a11yStyle = useA11yStyle()
const statusBarHeight = ref(20)

// 默认头像：用一个简单的圆形红底白字"民"
// 由于小程序对 base64 SVG 支持不一致，改用静态资源路径
// static/ 已有 .gitkeep，需要上线前把默认头像 PNG 文件放到 static/images/default-avatar.png
// 兜底用空字符串，让 image 标签显示原占位
const defaultAvatar = '/static/images/default-avatar.png'

const verifyText = computed(() => userStore.verifyText)
const verifyClass = computed(() => userStore.isAdmin ? 'admin' : (userStore.isVerified ? 'verified' : 'unverified'))
const icpNumber = computed(() => configStore.icpNumber || '')
const policeIcpNumber = computed(() => configStore.policeIcpNumber || '')

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.mine', '我的') })
  // #ifdef MP-WEIXIN
  const sysInfo = wx.getWindowInfo()
  statusBarHeight.value = sysInfo.statusBarHeight || 20
  // #endif
})

onShow(() => {
  userStore.refreshUserInfo()
})

// 微信最新头像填写能力：button open-type="chooseAvatar" 触发
function onChooseAvatar(e) {
  // #ifdef MP-WEIXIN
  if (e && e.detail && e.detail.avatarUrl) {
    userStore.setWxUserInfo({ avatarUrl: e.detail.avatarUrl })
    uni.showToast({ title: '头像已更新', icon: 'success' })
  }
  // #endif
}

// 昵称填写：input type="nickname"
function onNicknameConfirm(e) {
  // #ifdef MP-WEIXIN
  const nickname = e && e.detail && e.detail.value
  if (nickname && nickname.trim() && nickname !== '微信用户') {
    userStore.setWxUserInfo({ nickName: nickname.trim() })
    uni.showToast({ title: '昵称已更新', icon: 'success' })
  }
  // #endif
}

function goVerify() {
  uni.navigateTo({ url: '/pages/auth/verify' })
}

function goPage(path) {
  uni.navigateTo({ url: path })
}

function goPrivacy() {
  uni.navigateTo({ url: '/pages/privacy/index' })
}

function showAbout() {
  uni.showModal({
    title: '关于我们',
    content: '村务连心桥 - 村级掌上连心桥\n集民生服务、书记权威、对上汇报于一体\n让村务更透明，让连心更紧密',
    showCancel: false
  })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-mine {
  min-height: 100vh;
  background: $bg;

  .header {
    background: linear-gradient(135deg, $primary, $primary-dark);
    color: $white;
    padding: $card-padding $page-padding 48rpx;

    .user-card {
      display: flex;
      align-items: center;

      .avatar-btn {
        margin: 0;
        padding: 0;
        background: transparent;
        border: none;
        line-height: 1;
        margin-right: 24rpx;

        &::after { border: none; }

        .avatar {
          width: 128rpx;
          height: 128rpx;
          border-radius: $radius-full;
          border: 4rpx solid rgba(255,255,255,0.3);
          background: $bg;
        }
      }

      .user-info {
        flex: 1;

        .user-name {
          font-size: $font-title;
          font-weight: bold;
          display: block;
          margin-bottom: 8rpx;
        }

        .user-name-input {
          font-size: $font-title;
          font-weight: bold;
          color: $white;
          background: rgba(255,255,255,0.15);
          border-radius: $radius-md;
          padding: $space-sm $space-md;
          margin-bottom: 8rpx;
          min-height: 60rpx;
        }

        .verify-row {
          display: flex;
          align-items: center;
          gap: 12rpx;
          margin-bottom: 8rpx;

          .verify-tag {
            padding: $space-xs $space-md;
            border-radius: $radius-sm;
            font-size: $font-micro;

            &.verified { background: rgba(255,255,255,0.3); }
            &.unverified { background: rgba(0,0,0,0.3); }
            &.admin { background: $gold; }
          }

          .verify-btn {
            padding: $space-xs $space-md;
            background: $white;
            color: $primary;
            border-radius: $radius-sm;
            font-size: $font-micro;
            font-weight: bold;
          }
        }

        .user-group {
          font-size: $font-sub;
          opacity: 0.9;
        }
      }

      .admin-badge {
        padding: $space-sm $space-md;
        background: $gold;
        color: $white;
        border-radius: $radius-sm;
        font-size: $font-micro;
        font-weight: bold;
      }
    }
  }

  .menu-section {
    background: $white;
    margin: $card-gap $page-padding;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    overflow: hidden;

    &.admin-section {
      .section-title {
        padding: $card-padding;
        font-size: $font-card-title;
        font-weight: bold;
        color: $primary;
        border-bottom: 2rpx solid $border;
      }
    }

    .menu-item {
      display: flex;
      align-items: center;
      padding: $card-padding;
      border-bottom: 2rpx solid $border;

      &:last-child { border-bottom: none; }

      .menu-icon {
        font-size: $font-btn;
        margin-right: 24rpx;
        width: 60rpx;
        text-align: center;
      }

      .menu-text {
        flex: 1;
        font-size: $font-body;
        color: $text-main;
      }

      .menu-arrow {
        font-size: $font-sub;
        color: $text-weak;
      }

      &:active { background: $bg; }
    }
  }

  .footer {
    text-align: center;
    padding: $space-2xl 0;

    .footer-text {
      display: block;
      font-size: $font-sub;
      color: $text-weak;
      margin-bottom: 8rpx;
    }

    .footer-icp {
      display: block;
      font-size: $font-micro;
      color: $text-weak;
      margin-top: 4rpx;
    }
  }
}
</style>
