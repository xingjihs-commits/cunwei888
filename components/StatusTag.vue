<!--
  StatusTag.vue - 状态标签组件
  用途：工单状态、紧急程度等标签展示
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
  // 类型：primary/success/warning/danger/gold/default
  type: { type: String, default: 'default' },
  // 是否显示圆点
  dot: { type: Boolean, default: false }
})
</script>

<style lang="scss" scoped>

.status-tag {
  display: inline-flex;
  align-items: center;
  padding: $space-xs $space-md;
  border-radius: $radius-sm;
  font-size: $font-sub;
  line-height: 1.4;
  
  .tag-dot {
    width: 12rpx;
    height: 12rpx;
    border-radius: $radius-full;
    margin-right: 10rpx;
  }
  
  .tag-text {
    color: inherit;
  }
  
  &.tag-primary {
    background-color: $primary-light;
    color: $primary;
    
    .tag-dot { background-color: $primary; }
  }
  
  &.tag-success {
    background-color: rgba(46, 125, 50, 0.1);
    color: $success;
    
    .tag-dot { background-color: $success; }
  }
  
  &.tag-warning {
    background-color: rgba(230, 81, 0, 0.1);
    color: $warning;
    
    .tag-dot { background-color: $warning; }
  }
  
  &.tag-danger {
    background-color: rgba(198, 40, 40, 0.1);
    color: $danger;
    
    .tag-dot { background-color: $danger; }
  }
  
  &.tag-gold {
    background-color: $gold-light;
    color: $gold;
    
    .tag-dot { background-color: $gold; }
  }
  
  &.tag-default {
    background-color: $border;
    color: $text-sub;
    
    .tag-dot { background-color: $text-sub; }
  }
}
</style>
