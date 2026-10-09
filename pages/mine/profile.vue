<!--
  pages/mine/profile.vue - 个人信息
  用途：查看和编辑个人信息
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-profile">
    <view class="card">
      <view class="card-title">基本信息</view>
      <view class="info-row">
        <text class="info-label">昵称</text>
        <text class="info-value">{{ userStore.nickName }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">真实姓名</text>
        <text class="info-value">{{ userStore.realName || t('tip.notVerified', '未认证') }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">手机号</text>
        <text class="info-value">{{ maskPhone(userStore.phone) || t('tip.notFilled', '未填写') }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">所在村组</text>
        <text class="info-value">{{ userStore.villageGroup || t('tip.notFilled', '未填写') }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">认证状态</text>
        <view class="info-value">
          <view class="status-tag" :class="verifyClass">{{ verifyText }}</view>
        </view>
      </view>
    </view>
    
    <view class="card">
      <view class="card-title">账号信息</view>
      <view class="info-row">
        <text class="info-label">OpenID</text>
        <text class="info-value mono">{{ shortOpenid }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">注册时间</text>
        <text class="info-value">{{ userStore.registerTime || '-' }}</text>
      </view>
    </view>
    
    <view class="action-section">
      <BigButton v-if="!userStore.isVerified"  :text="t('button.verify', '去实名认证')" type="primary" @click="goVerify" />
      <BigButton v-if="userStore.isVerified" :text="t('button.edit', '编辑信息')" type="default" @click="editInfo" />
      <BigButton  :text="t('button.clearCache', '清除缓存')" type="default" @click="clearCache" />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/store/user.js'
import { maskPhone } from '@/utils/format.js'
import BigButton from '@/components/BigButton.vue'
import { useConfigStore } from '@/store/config.js'
import { ensureAuth, AUTH_LOGIN } from '@/utils/auth.js'
const rootFontSize = useRootFontSize()

const userStore = useUserStore()
const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

onMounted(() => {
  if (!ensureAuth(AUTH_LOGIN)) return
})

const verifyText = computed(() => userStore.verifyText)
const verifyClass = computed(() => userStore.isAdmin ? 'admin' : (userStore.isVerified ? 'verified' : 'unverified'))

const shortOpenid = computed(() => {
  const oid = userStore.openid || ''
  if (oid.length > 16) {
    return oid.substring(0, 8) + '...' + oid.substring(oid.length - 8)
  }
  return oid || '未获取'
})

function goVerify() {
  uni.navigateTo({ url: '/pages/auth/verify' })
}

function editInfo() {
  uni.showToast({ title: '编辑功能开发中', icon: 'none' })
}

function clearCache() {
  uni.showModal({
    title: '提示',
    content: '确定清除本地缓存吗？',
    success(res) {
      if (res.confirm) {
        uni.clearStorageSync()
        uni.showToast({ title: '已清除', icon: 'success' })
        setTimeout(() => {
          uni.reLaunch({ url: '/pages/index/index' })
        }, 1500)
      }
    }
  })
}
</script>

<style lang="scss" scoped>

.page-profile {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  
  .card {
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    
    .card-title {
      font-size: $font-card-title;
      font-weight: bold;
      color: $text-main;
      border-left: 8rpx solid $primary;
      padding-left: 16rpx;
      margin-bottom: 24rpx;
    }
    
    .info-row {
      display: flex;
      padding: $space-md 0;
      border-bottom: 2rpx solid $border;
      
      &:last-child { border-bottom: none; }
      
      .info-label {
        width: 200rpx;
        font-size: $font-body;
        color: $text-sub;
      }
      
      .info-value {
        flex: 1;
        font-size: $font-body;
        color: $text-main;
        
        &.mono {
          font-family: monospace;
          font-size: $font-sub;
        }
        
        .status-tag {
          display: inline-block;
          padding: $space-xs $space-md;
          border-radius: $radius-sm;
          font-size: $font-sub;
          
          &.verified { background: rgba(46,125,50,0.1); color: $success; }
          &.unverified { background: rgba(230,81,0,0.1); color: $warning; }
          &.admin { background: $gold-light; color: $gold; }
        }
      }
    }
  }
  
  .action-section {
    margin-top: $card-gap;
    display: flex;
    flex-direction: column;
    gap: $card-gap;
  }
}
</style>
