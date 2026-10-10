<!--
  pages/mine/mine.vue - 我的（tabBar「我的」，个人·清爽）
  红旗风格 v3：
    ① 原生红导航（pages.json，系统固定）
    ② 用户旗卡（旗面渐变+星纹：头像/昵称/认证）
    ③ 我的记录 / 设置（条目式列表，AppIcon 统一图标）
    ④ 管理入口（仅村委）
  反映/上传入口不在此页（收口在首页找书记三入口）
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-mine">
    <!-- ① 用户旗卡 -->
    <view class="user-flag-card">
      <AppIcon class="flag-star-bg" name="star" :size="240" :color="FLAG_VEIL" />
      <view class="flag-ribbon flag-ribbon-1"></view>
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
          <view v-if="!userStore.isVerified && !userStore.isAdmin" class="verify-btn" @click="goVerify">去认证</view>
        </view>
        <text v-if="userStore.villageGroup" class="user-group">{{ userStore.villageGroup }}</text>
      </view>
    </view>

    <!-- ② 我的记录 -->
    <view class="section">
      <AppSectionTitle title="我的记录" :more-text="''" />
      <view class="menu-card">
        <view class="menu-item" @click="goPage('/pages/task/my-progress')">
          <view class="menu-icon-wrap" :style="{ background: CHIP_BG.red }">
            <AppIcon name="clipboard" :size="32" :color="CHIP_TEXT.red" />
          </view>
          <text class="menu-text">我的办事记录</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="goPage('/pages/feedback/my-feedback')">
          <view class="menu-icon-wrap" :style="{ background: CHIP_BG.blue }">
            <AppIcon name="chat" :size="32" :color="CHIP_TEXT.blue" />
          </view>
          <text class="menu-text">{{ t('subCategory.myFeedback', '我的反馈') }}</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="goPage('/pages/snapshot/my-snapshots')">
          <view class="menu-icon-wrap" :style="{ background: CHIP_BG.green }">
            <AppIcon name="camera" :size="32" :color="CHIP_TEXT.green" />
          </view>
          <text class="menu-text">我的随手拍</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="goPage('/pages/secretary/my-mails')">
          <view class="menu-icon-wrap" :style="{ background: CHIP_BG.gold }">
            <AppIcon name="mail" :size="32" :color="CHIP_TEXT.gold" />
          </view>
          <text class="menu-text">我的信件</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="goPage('/pages/message/center')">
          <view class="menu-icon-wrap" :style="{ background: CHIP_BG.red }">
            <AppIcon name="bell" :size="32" :color="CHIP_TEXT.red" />
          </view>
          <text class="menu-text">我的消息</text>
          <view v-if="unreadCount > 0" class="msg-badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</view>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="goPage('/pages/category/list?type=study')">
          <view class="menu-icon-wrap" :style="{ background: CHIP_BG.gold }">
            <AppIcon name="book" :size="32" :color="CHIP_TEXT.gold" />
          </view>
          <text class="menu-text">学习进度</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>
    </view>

    <!-- ③ 设置 -->
    <view class="section">
      <AppSectionTitle title="设置" :more-text="''" />
      <view class="menu-card">
        <view class="menu-item" @click="goPage('/pages/settings/accessibility')">
          <view class="menu-icon-wrap" :style="{ background: CHIP_BG.gray }">
            <AppIcon name="gear" :size="32" :color="CHIP_TEXT.gray" />
          </view>
          <text class="menu-text">字号设置</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="goPage('/pages/privacy/index')">
          <view class="menu-icon-wrap" :style="{ background: CHIP_BG.gray }">
            <AppIcon name="lock" :size="32" :color="CHIP_TEXT.gray" />
          </view>
          <text class="menu-text">隐私政策</text>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @click="showAbout">
          <view class="menu-icon-wrap" :style="{ background: CHIP_BG.gray }">
            <AppIcon name="info" :size="32" :color="CHIP_TEXT.gray" />
          </view>
          <text class="menu-text">关于我们</text>
          <text class="menu-arrow">›</text>
        </view>
      </view>
    </view>

    <!-- ④ 管理入口（仅村委） -->
    <view v-if="userStore.isAdmin" class="section">
      <AppSectionTitle title="管理入口" :more-text="''" />
      <view class="admin-grid">
        <view v-for="e in visibleAdminEntries" :key="e.path" class="admin-item" @click="goPage(e.path)">
          <view class="admin-icon-wrap">
            <text class="admin-icon">{{ e.icon }}</text>
          </view>
          <text class="admin-name">{{ e.name }}</text>
        </view>
      </view>
    </view>

    <view class="footer">
      <text class="footer-text">村务连心桥 v{{ APP_VERSION }}</text>
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
import AppSectionTitle from '@/components/AppSectionTitle.vue'
import AppIcon from '@/components/AppIcon.vue'
import { CHIP_BG, CHIP_TEXT, FLAG_VEIL } from '@/utils/theme.js'
import { APP_VERSION } from '@/utils/app-info.js'
import { useRootFontSize } from '@/composables/useA11y.js'

const userStore = useUserStore()
const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const rootFontSize = useRootFontSize()
const unreadCount = ref(0)

const defaultAvatar = '/static/images/default-avatar.png'

const verifyText = computed(() => userStore.verifyText)
const verifyClass = computed(() => userStore.isAdmin ? 'admin' : (userStore.isVerified ? 'verified' : 'unverified'))
const icpNumber = computed(() => configStore.icpNumber || '')
const policeIcpNumber = computed(() => configStore.policeIcpNumber || '')

const adminEntries = [
  { icon: '📥', name: '反映处理', path: '/pages/admin/feedback-list', min: 70 },
  { icon: '🔒', name: '亲阅件', path: '/pages/admin/secret-list', min: 100 },
  { icon: '✉️', name: '信箱管理', path: '/pages/admin/secretary-mails', min: 70 },
  { icon: '✓', name: '认证审核', path: '/pages/admin/auth-list', min: 90 },
  { icon: '🔍', name: '人工复审', path: '/pages/admin/audit-queue', min: 70 },
  { icon: '📤', name: '发布内容', path: '/pages/admin/publish', min: 50 },
  { icon: '🎬', name: '风采发布', path: '/pages/admin/leader-publish', min: 70 },
  { icon: '💰', name: '财务公示', path: '/pages/admin/finance-publish', min: 90 },
  { icon: '📢', name: '发布广播', path: '/pages/secretary/broadcast', min: 70 },
  { icon: '🗳️', name: '发起表决', path: '/pages/admin/vote-create', min: 90 },
  { icon: '👥', name: '创建会议', path: '/pages/admin/meeting-create', min: 70 },
  { icon: '📊', name: '数据统计', path: '/pages/admin/dashboard', min: 90 },
  { icon: '📈', name: '对上汇报', path: '/pages/admin/upper-reports', min: 90 },
  { icon: '📋', name: '我的派单', path: '/pages/admin/my-dispatched', min: 50 },
  { icon: '🗺️', name: '分配地图', path: '/pages/admin/dispatch-config', min: 90 },
  { icon: '🏷️', name: '村名设置', path: '/pages/admin/name-config', min: 90 },
  { icon: '⚙️', name: '功能开关', path: '/pages/admin/module-config', min: 90 }
]

const visibleAdminEntries = computed(() => adminEntries.filter(e => userStore.committeeWeight >= e.min))

onMounted(() => {
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

function showAbout() {
  uni.showModal({
    title: '关于我们',
    content: '村务连心桥 - 村级掌上连心桥\n集民生服务、书记权威、对上汇报于一体\n让村务更透明，让连心更紧密',
    showCancel: false
  })
}
</script>

<style lang="scss" scoped>

.page-mine {
  min-height: 100vh;
  background: $bg;

  // ===== 用户旗卡 =====
  .user-flag-card {
    position: relative;
    display: flex;
    align-items: center;
    margin: 24rpx $page-padding 0;
    padding: 32rpx;
    background: $flag-gradient;
    border-radius: $radius-card;
    color: $white;
    overflow: hidden;
    box-shadow: 0 8rpx 24rpx rgba($primary, 0.22);

    .flag-star-bg {
      position: absolute;
      right: -20rpx;
      top: -40rpx;
      pointer-events: none;
    }

    .flag-ribbon {
      position: absolute;
      left: -10%;
      width: 120%;
      height: 48rpx;
      background: linear-gradient(105deg, rgba($white, 0) 30%, rgba($white, 0.06) 50%, rgba($white, 0) 70%);
      transform: rotate(-8deg);
      pointer-events: none;
    }
    .flag-ribbon-1 { top: 24%; }

    .avatar-btn {
      position: relative;
      margin: 0 24rpx 0 0;
      padding: 0;
      background: transparent;
      border: none;
      line-height: 1;

      &::after { border: none; }

      .avatar {
        width: 112rpx;
        height: 112rpx;
        border-radius: $radius-full;
        border: 4rpx solid rgba($white, 0.6);
        background: $bg;
      }
    }

    .user-info {
      flex: 1;
      min-width: 0;

      .user-name {
        font-size: $font-title;
        font-weight: 600;
        display: block;
        margin-bottom: 8rpx;
      }
      .user-name-input {
        font-size: $font-title;
        font-weight: 600;
        color: $white;
        background: rgba($white, 0.18);
        border-radius: $radius-md;
        padding: $space-sm $space-md;
        margin-bottom: 8rpx;
        min-height: 60rpx;
      }

      .verify-row {
        display: flex;
        align-items: center;
        gap: 12rpx;

        .verify-tag {
          height: 44rpx;
          line-height: 44rpx;
          padding: 0 16rpx;
          border-radius: $radius-md;
          font-size: $font-sub;
          &.verified { background: rgba($white, 0.3); }
          // 未认证：白 ghost 描边（不用黑块压红底，避免显脏）
          &.unverified {
            background: transparent;
            border: 2rpx solid rgba($white, 0.6);
            box-sizing: border-box;
            line-height: 40rpx;
          }
          &.admin { background: $star-gold; color: $flag-dark; font-weight: 600; }
        }
        .verify-btn {
          height: 44rpx;
          line-height: 44rpx;
          padding: 0 16rpx;
          background: $white;
          color: $primary;
          border-radius: $radius-md;
          font-size: $font-sub;
          font-weight: 600;
        }
      }

      .user-group {
        display: block;
        font-size: $font-sub;
        color: rgba($white, 0.8);
        margin-top: 8rpx;
      }
    }
  }

  .section {
    padding: 0 $page-padding;
  }

  .menu-card {
    background: $white;
    border-radius: $radius-card;
    box-shadow: $shadow-md;
    padding: 8rpx 24rpx;

    .menu-item {
      display: flex;
      align-items: center;
      height: 104rpx;
      border-bottom: 2rpx solid $border;
      &:last-child { border-bottom: none; }
      &:active { background: $bg; }

      .menu-icon-wrap {
        width: 56rpx;
        height: 56rpx;
        border-radius: $radius-lg;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20rpx;
      }
      .menu-text { flex: 1; font-size: $font-body; font-weight: 500; color: $text-main; }
      .menu-arrow { font-size: 40rpx; color: $primary; line-height: 1; }
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
    grid-template-columns: repeat(4, 1fr);
    gap: 16rpx;
    background: $white;
    border-radius: $radius-card;
    box-shadow: $shadow-md;
    padding: 24rpx;

    .admin-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 140rpx;
      border-radius: $radius-list;
      &:active { background: $bg; }

      .admin-icon-wrap {
        width: 64rpx;
        height: 64rpx;
        border-radius: 20rpx;
        background: $primary-light;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12rpx;
      }
      .admin-icon { font-size: 36rpx; line-height: 1; }
      .admin-name {
        font-size: $font-micro;
        color: $text-main;
        text-align: center;
      }
    }
  }

  .footer {
    text-align: center;
    padding: 48rpx 0 40rpx;

    .footer-text { display: block; font-size: $font-sub; color: $text-weak; margin-bottom: 8rpx; }
    .footer-icp { display: block; font-size: $font-micro; color: $text-weak; margin-top: 4rpx; }
  }
}
</style>
