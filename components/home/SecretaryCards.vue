<!--
  components/home/SecretaryCards.vue - 首页「找书记」三入口
  信箱 / 广播 / 随手拍，3 等分圆形图标入口（对齐布局方案 6.3 模块3）
-->
<template>
  <view class="find-row">
    <view class="find-item" @click="$emit('open', '/pages/secretary/mailbox')">
      <view class="find-icon">✉️</view>
      <text class="find-text">{{ t('entry.mailbox', '书记信箱') }}</text>
    </view>
    <view class="find-item" @click="$emit('open', '/pages/secretary/broadcast')">
      <view class="find-icon">📢</view>
      <text class="find-text">{{ t('entry.broadcast', '书记广播') }}</text>
    </view>
    <view class="find-item" @click="$emit('open', '/pages/snapshot/snapshot')">
      <view class="find-icon">📷</view>
      <text class="find-text">{{ t('entry.snapshot', '随手拍') }}</text>
    </view>
  </view>
</template>

<script setup>
import { useConfigStore } from '@/store/config.js'
defineEmits(['open'])

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.find-row {
  display: flex;
  gap: 16rpx;
  padding: $card-padding;
  background: $white;
  border-radius: $card-radius;
  box-shadow: $card-shadow;

  .find-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 160rpx;
    border-radius: $radius-md;

    &:active { background: $bg; }

    .find-icon {
      width: 80rpx;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-size: 48rpx;
      background: $primary-light;
      border-radius: $radius-full;
      margin-bottom: 12rpx;
    }
    .find-text { font-size: $font-sub; color: $text-main; }
  }
}
</style>
