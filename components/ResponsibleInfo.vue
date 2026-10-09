<!--
  ResponsibleInfo.vue - 责任人信息组件
  用途：展示工单承办人姓名、职务、头像，支持一键拨号
-->
<template>
  <view class="responsible-info" v-if="name">
    <image class="avatar" :src="avatar || defaultAvatar" mode="aspectFill" />
    <view class="info">
      <view class="name-row">
        <text class="name">{{ name }}</text>
        <view v-if="role" class="role-tag">{{ role }}</view>
      </view>
      <text v-if="phone" class="phone">{{ maskPhone(phone) }}</text>
    </view>
    <view v-if="phone && showCall" class="call-btn" @click="onCall">
      <text class="call-icon">📞</text>
      <text class="call-text">拨号</text>
    </view>
  </view>
</template>

<script setup>
import { maskPhone } from '@/utils/format.js'

const props = defineProps({
  // 责任人姓名
  name: { type: String, default: '' },
  // 职务
  role: { type: String, default: '' },
  // 头像
  avatar: { type: String, default: '' },
  // 电话
  phone: { type: String, default: '' },
  // 是否显示拨号按钮
  showCall: { type: Boolean, default: true }
})

const defaultAvatar = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="40" fill="%23C41E24"/><text x="50%25" y="55%25" text-anchor="middle" fill="white" font-size="32">民</text></svg>'

function onCall() {
  if (!props.phone) {
    uni.showToast({ title: '暂无联系电话', icon: 'none' })
    return
  }
  uni.makePhoneCall({ phoneNumber: props.phone })
}
</script>

<style lang="scss" scoped>

.responsible-info {
  display: flex;
  align-items: center;
  padding: $card-padding 0;
  
  .avatar {
    width: 96rpx;
    height: 96rpx;
    border-radius: $radius-full;
    background-color: $primary-light;
    margin-right: 20rpx;
    flex-shrink: 0;
  }
  
  .info {
    flex: 1;
    
    .name-row {
      display: flex;
      align-items: center;
      margin-bottom: 8rpx;
      
      .name {
        font-size: $font-card-title;
        font-weight: bold;
        color: $text-main;
        margin-right: 16rpx;
      }
      
      .role-tag {
        padding: $space-xs $space-md;
        background-color: $primary-light;
        color: $primary;
        border-radius: $radius-sm;
        font-size: $font-sub;
      }
    }
    
    .phone {
      font-size: $font-sub;
      color: $text-sub;
    }
  }
  
  .call-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $space-md $space-lg;
    background-color: $primary-light;
    border-radius: $radius-md;
    
    .call-icon {
      font-size: $font-title;
    }
    
    .call-text {
      font-size: $font-micro;
      color: $primary;
      margin-top: 4rpx;
    }
    
    &:active {
      opacity: 0.8;
    }
  }
}
</style>
