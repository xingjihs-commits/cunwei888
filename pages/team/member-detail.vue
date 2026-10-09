<!--
  pages/team/member-detail.vue - 成员详情
  用途：查看班子成员详细信息
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-member-detail">
    <view v-if="member.name" class="member-card">
      <image class="member-avatar" :src="member.avatar || defaultAvatar" mode="aspectFill" />
      <text class="member-name">{{ member.name }}</text>
      <view class="member-role">{{ member.role }}</view>
      <view v-if="member.division" class="member-division">分管：{{ member.division }}</view>
    </view>
    
    <view v-if="member.commitment" class="card">
      <view class="card-title">个人承诺</view>
      <text class="content-text">{{ member.commitment }}</text>
    </view>
    
    <view v-if="member.phone" class="card">
      <view class="card-title">联系方式</view>
      <view class="contact-row" @click="callPhone">
        <text class="contact-icon">📞</text>
        <text class="contact-text">{{ maskPhone(member.phone) }}</text>
        <view class="call-action">{{ t('button.call', '一键拨号') }}</view>
      </view>
    </view>
    
    <view v-if="member.division" class="card">
      <view class="card-title">分管职责</view>
      <text class="content-text">{{ member.division }}</text>
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { maskPhone } from '@/utils/format.js'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const member = ref({})
const memberId = ref('')

const defaultAvatar = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><circle cx="40" cy="40" r="40" fill="%23C41E24"/><text x="50%25" y="55%25" text-anchor="middle" fill="white" font-size="32">民</text></svg>'

onLoad((options) => {
  memberId.value = options.memberId
})

onMounted(() => loadData())

async function loadData() {
  if (!memberId.value) return
  
  try {
    const res = await callFunction('getTeamMemberDetail', { memberId: memberId.value })
    if (res.success) {
      member.value = res.data
    }
  } catch (err) {
    console.error('加载失败:', err)
  }
}

function callPhone() {
  uni.makePhoneCall({ phoneNumber: member.value.phone })
}
</script>

<style lang="scss" scoped>

.page-member-detail {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  
  .member-card {
    background: $white;
    border-radius: $card-radius;
    padding: $space-2xl $card-padding;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    text-align: center;
    
    .member-avatar {
      width: 200rpx;
      height: 200rpx;
      border-radius: $radius-full;
      background: $bg;
      margin: 0 auto 24rpx;
    }
    
    .member-name {
      font-size: $font-title;
      font-weight: bold;
      color: $text-main;
      display: block;
      margin-bottom: 12rpx;
    }
    
    .member-role {
      display: inline-block;
      padding: $space-xs 24rpx;
      background: $primary-light;
      color: $primary;
      border-radius: $btn-radius;
      font-size: $font-sub;
      margin-bottom: 12rpx;
    }
    
    .member-division {
      font-size: $font-sub;
      color: $text-sub;
    }
  }
  
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
      margin-bottom: 16rpx;
    }
    
    .content-text {
      font-size: $font-body;
      color: $text-main;
      line-height: 1.8;
      white-space: pre-wrap;
    }
    
    .contact-row {
      display: flex;
      align-items: center;
      padding: $card-padding;
      background: $bg;
      border-radius: $radius-md;
      
      .contact-icon {
        font-size: $font-number;
        margin-right: 16rpx;
      }
      
      .contact-text {
        flex: 1;
        font-size: $font-body;
        color: $text-main;
        font-weight: bold;
      }
      
      .call-action {
        padding: $space-sm $space-xl;
        background: $success;
        color: $white;
        border-radius: $btn-radius;
        font-size: $font-sub;
        font-weight: bold;
      }
      
      &:active { opacity: 0.8; }
    }
  }
}
</style>
