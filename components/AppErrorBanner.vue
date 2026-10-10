<!--
  components/AppErrorBanner.vue - 统一错误态组件
  mode="inline"：内容区内横幅（列表页，保留已有内容）
  mode="blank"：整页错误（详情页，数据缺失时无内容可展示）
  触控：重试按钮 88rpx；blank 模式附「返回」兜底退出路径
-->
<template>
  <view class="error-banner" :class="'mode-' + mode">
    <AppIcon name="warning" :size="mode === 'blank' ? 72 : 56" :color="ICON_COLOR" />
    <text class="error-text">{{ text }}</text>
    <view class="error-actions">
      <view class="retry-btn" @click="$emit('retry')">{{ retryText }}</view>
      <view v-if="mode === 'blank' && showBack" class="back-btn" @click="goBack">返回上一页</view>
    </view>
  </view>
</template>

<script setup>
import AppIcon from './AppIcon.vue'
import { DANGER } from '@/utils/theme.js'

const ICON_COLOR = DANGER

defineProps({
  // inline：内容区内横幅；blank：整页错误视图
  mode: { type: String, default: 'inline' },
  text: { type: String, default: '加载失败，请检查网络后重试' },
  retryText: { type: String, default: '重新加载' },
  // blank 模式是否显示「返回上一页」（tabBar 页无上级，隐藏）
  showBack: { type: Boolean, default: true }
})

defineEmits(['retry'])

function goBack() {
  const pages = getCurrentPages()
  if (pages.length > 1) uni.navigateBack()
  else uni.reLaunch({ url: '/pages/index/index' })
}
</script>

<style lang="scss" scoped>

.error-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $card-padding;
  background: rgba($danger, 0.08);
  border: 2rpx solid rgba($danger, 0.2);
  border-radius: $radius-card;

  &.mode-blank {
    margin: 25vh $page-padding 0;
  }

  .error-text {
    font-size: $font-sub;
    color: $text-sub;
    margin: 12rpx 0 16rpx;
    text-align: center;
    line-height: 1.5;
  }

  .error-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .retry-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 240rpx;
    min-height: 88rpx;
    padding: 0 $space-xl;
    background: $primary;
    color: $white;
    border-radius: $radius-full;
    font-size: $font-sub;
    font-weight: 600;
    &:active { background: $primary-dark; }
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 88rpx;
    margin-top: 8rpx;
    padding: 0 $space-xl;
    font-size: $font-sub;
    color: $text-sub;

    &:active { opacity: 0.7; }
  }
}
</style>
