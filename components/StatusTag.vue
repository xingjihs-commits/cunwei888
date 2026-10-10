<!--
  StatusTag.vue - 状态标签组件（chip 六色体系）
  用途：工单状态、紧急程度等标签展示
  API 保持不变：text / type / dot
-->
<template>
  <view class="status-tag" :class="['tag-' + type]">
    <view v-if="dot" class="tag-dot"></view>
    <text class="tag-text">{{ text }}</text>
  </view>
</template>

<script setup>
defineProps({
  // 标签文字
  text: { type: String, default: '' },
  // 类型：primary/success/warning/danger/gold/blue/default
  type: { type: String, default: 'default' },
  // 是否显示圆点
  dot: { type: Boolean, default: false }
})
</script>

<style lang="scss" scoped>
// chip 规格：高 44rpx · padding 0 16rpx · 圆角 12 · 字号 24 · 圆点 12
.status-tag {
  display: inline-flex;
  align-items: center;
  padding: 0 16rpx;
  height: 44rpx;
  border-radius: $radius-md;
  font-size: $font-sub;
  font-weight: 500;
  line-height: 1.4;
  box-sizing: border-box;

  .tag-dot {
    width: 12rpx;
    height: 12rpx;
    border-radius: $radius-full;
    margin-right: 8rpx;
  }

  .tag-text { color: inherit; }

  &.tag-primary {
    background-color: $chip-red-bg;
    color: $chip-red-text;
    .tag-dot { background-color: $chip-red-text; }
  }

  &.tag-success {
    background-color: $chip-green-bg;
    color: $chip-green-text;
    .tag-dot { background-color: $chip-green-text; }
  }

  &.tag-warning {
    background-color: $chip-orange-bg;
    color: $chip-orange-text;
    .tag-dot { background-color: $chip-orange-text; }
  }

  &.tag-danger {
    background-color: $chip-red-bg;
    color: $danger;
    .tag-dot { background-color: $danger; }
  }

  &.tag-gold {
    background-color: $chip-gold-bg;
    color: $chip-gold-text;
    .tag-dot { background-color: $chip-gold-text; }
  }

  &.tag-blue {
    background-color: $chip-blue-bg;
    color: $chip-blue-text;
    .tag-dot { background-color: $chip-blue-text; }
  }

  &.tag-default {
    background-color: $chip-gray-bg;
    color: $chip-gray-text;
    .tag-dot { background-color: $chip-gray-text; }
  }
}
</style>
