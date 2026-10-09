<!--
  pages/mine/mine.vue - 我的（tabBar「我的」）
  对齐《示范村 App 完整布局方案》Tab4：
    ① 用户信息 + 导航栏「字号 A+」
    ② 我的记录（反映/随手拍/信件/消息/办理）
    ③ 设置（字号/通知/隐私/关于）
    ④ 管理入口（仅村委，九宫格）
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-mine">
    <view class="header" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="header-top">
        <text class="header-title">{{ t('pageTitle.mine', '我的') }}</text>
        <view class="font-btn" @click="cycleFont">{{ fontLabel }} A+</view>
      </view>
      <view class="user-card">
        <button class="avatar-btn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <image class="avatar" :src="userStore.avatarUrl || defaultAvatar" mode="aspectFill" />
        </button>
        <view class="user-info">
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
      </view>
    </view>

    <!-- ② 我的记录 -->
    <view class="section">
      <view class="section-title">我的记录</view>
      <view class="menu-card">
        <view class="menu-item" @click="goPage('/pages/feedback/my-feedback')">
          <text class="menu-icon">💬</text>
          <text class="menu-text">{{ t('subCategory.myFeedback', '我的反映') }}</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="goPage('/pages/snapshot/my-snapshots')">
          <text class="menu-icon">📷</text>
          <text class="menu-text">我的随手拍</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="goPage('/pages/secretary/my-mails')">
          <text class="menu-icon">✉️</text>
          <text class="menu-text">我的信件</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="goPage('/pages/message/center')">
          <text class="menu-icon">🔔</text>
          <text class="menu-text">我的消息</text>
          <view v-if="unreadCount > 0" class="msg-badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</view>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="goPage('/pages/task/my-progress')">
          <text class="menu-icon">📋</text>
          <text class="menu-text">我办的事</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>
    </view>

    <!-- ③ 设置 -->
    <view class="section">
      <view class="section-title">设置</view>
      <view class="menu-card">
        <view class="menu-item" @click="goPage('/pages/settings/accessibility')">
          <text class="menu-icon">♿</text>
          <text class="menu-text">字号设置</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="onNotification">
          <text class="menu-icon">🔕</text>
          <text class="menu-text">消息通知</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="goPage('/pages/privacy/index')">
          <text class="menu-icon">🔐</text>
          <text class="menu-text">隐私政策</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="showAbout">
          <text class="menu-icon">ℹ️</text>
          <text class="menu-text">关于我们</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>
    </view>

    <!-- ④ 管理入口（仅村委） -->
    <view v-if="userStore.isAdmin" class="section">
      <view class="section-title">管理入口</view>
      <view class="admin-grid">
        <view v-for="e in adminEntries" :key="e.path" class="admin-item" @click="goPage(e.path)">
          <text class="admin-icon">{{ e.icon }}</text>
          <text class="admin-name">{{ e.name }}</text>
        </view>
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
import { callFunction } from '@/utils/request.js'
import { goPage } from '@/utils/nav.js'
import { a11y, saveA11y } from '@/utils/accessibility.js'
import { useRootFontSize } from '@/composables/useA11y.js'

const userStore = useUserStore()
const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const rootFontSize = useRootFontSize()
const statusBarHeight = ref(20)
const unreadCount = ref(0)

const defaultAvatar = '/static/images/default-avatar.png'

const verifyText = computed(() => userStore.verifyText)
const verifyClass = computed(() => userStore.isAdmin ? 'admin' : (userStore.isVerified ? 'verified' : 'unverified'))
const icpNumber = computed(() => configStore.icpNumber || '')
const policeIcpNumber = computed(() => configStore.policeIcpNumber || '')

const FONT_STEPS = [
  { scale: 1, label: '标准' },
  { scale: 1.2, label: '大' },
  { scale: 1.4, label: '超大' }
]
const fontLabel = computed(() => (FONT_STEPS.find(s => s.scale === a11y.fontScale) || FONT_STEPS[0]).label)

const adminEntries = [
  { icon: '📥', name: '反映处理', path: '/pages/admin/feedback-list' },
  { icon: '🔒', name: '亲阅件', path: '/pages/admin/secret-list' },
  { icon: '✉️', name: '信箱管理', path: '/pages/admin/secretary-mails' },
  { icon: '✓', name: '认证审核', path: '/pages/admin/auth-list' },
  { icon: '🔍', name: '人工复审', path: '/pages/admin/audit-queue' },
  { icon: '📤', name: '发布内容', path: '/pages/admin/publish' },
  { icon: '🎬', name: '风采发布', path: '/pages/admin/leader-publish' },
  { icon: '💰', name: '财务公示', path: '/pages/admin/finance-publish' },
  { icon: '📢', name: '发布广播', path: '/pages/secretary/broadcast' },
  { icon: '🗳️', name: '发起表决', path: '/pages/admin/vote-create' },
  { icon: '👥', name: '创建会议', path: '/pages/admin/meeting-create' },
  { icon: '📊', name: '数据统计', path: '/pages/admin/dashboard' },
  { icon: '📈', name: '对上汇报', path: '/pages/admin/upper-reports' },
  { icon: '📋', name: '我的派单', path: '/pages/admin/my-dispatched' },
  { icon: '🗺️', name: '分配地图', path: '/pages/admin/dispatch-config' },
  { icon: '🏷️', name: '村名设置', path: '/pages/admin/name-config' },
  { icon: '⚙️', name: '功能开关', path: '/pages/admin/module-config' }
]

onMounted(() => {
  // #ifdef MP-WEIXIN
  const sysInfo = wx.getWindowInfo()
  statusBarHeight.value = sysInfo.statusBarHeight || 20
  // #endif
  configStore.loadConfig()
})

onShow(() => {
  userStore.refreshUserInfo()
  loadUnread()
})

async function loadUnread() {
  try {
    const res = await callFunction('getMyMessages', { page: 1, pageSize: 1 })
    if (res && res.success && typeof res.unreadCount === 'number') unreadCount.value = res.unreadCount
  } catch (e) {
    // 未登录/游客模式忽略
  }
}

function cycleFont() {
  const idx = FONT_STEPS.findIndex(s => s.scale === a11y.fontScale)
  const next = FONT_STEPS[(idx + 1) % FONT_STEPS.length]
  saveA11y({ fontScale: next.scale })
  uni.showToast({ title: '字号：' + next.label, icon: 'none' })
}

function onChooseAvatar(e) {
  // #ifdef MP-WEIXIN
  if (e && e.detail && e.detail.avatarUrl) {
    userStore.setWxUserInfo({ avatarUrl: e.detail.avatarUrl })
    uni.showToast({ title: '头像已更新', icon: 'success' })
  }
  // #endif
}

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

function onNotification() {
  uni.showToast({ title: '消息通知设置即将上线', icon: 'none' })
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

    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: $card-padding;

      .header-title { font-size: $font-title; font-weight: bold; }
      .font-btn {
        padding: $space-sm $space-lg;
        background: rgba(255,255,255,0.2);
        border-radius: $radius-full;
        font-size: $font-sub;
        font-weight: bold;
      }
    }

    .user-card {
      display: flex;
      align-items: center;

      .avatar-btn {
        margin: 0 24rpx 0 0;
        padding: 0;
        background: transparent;
        border: none;
        line-height: 1;

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

        .user-name { font-size: $font-title; font-weight: bold; display: block; margin-bottom: 8rpx; }
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

        .user-group { font-size: $font-sub; opacity: 0.9; }
      }
    }
  }

  .section {
    padding: 0 $page-padding;
    margin-top: $card-gap;

    .section-title {
      font-size: $font-card-title;
      font-weight: bold;
      color: $text-main;
      padding: $space-md 0;
    }
  }

  .menu-card {
    background: $white;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    overflow: hidden;

    .menu-item {
      display: flex;
      align-items: center;
      padding: $card-padding;
      border-bottom: 2rpx solid $border;
      &:last-child { border-bottom: none; }
      &:active { background: $bg; }

      .menu-icon { font-size: $font-btn; margin-right: 24rpx; width: 60rpx; text-align: center; }
      .menu-text { flex: 1; font-size: $font-body; color: $text-main; }
      .menu-arrow { font-size: $font-sub; color: $text-weak; }
      .msg-badge {
        min-width: 32rpx;
        height: 32rpx;
        padding: 0 8rpx;
        margin-right: 12rpx;
        background: $danger;
        color: $white;
        font-size: $font-micro;
        line-height: 32rpx;
        text-align: center;
        border-radius: $radius-full;
      }
    }
  }

  .admin-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16rpx;
    background: $white;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    padding: $card-padding;

    .admin-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 160rpx;
      border-radius: $radius-md;
      &:active { background: $bg; }

      .admin-icon { font-size: 48rpx; margin-bottom: 12rpx; }
      .admin-name { font-size: $font-sub; color: $text-main; text-align: center; }
    }
  }

  .footer {
    text-align: center;
    padding: $space-2xl 0;

    .footer-text { display: block; font-size: $font-sub; color: $text-weak; margin-bottom: 8rpx; }
    .footer-icp { display: block; font-size: $font-micro; color: $text-weak; margin-top: 4rpx; }
  }
}
</style>
