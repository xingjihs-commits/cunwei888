<!--
  EmptyState.vue - 空状态组件
  用途：列表为空时展示友好提示
-->
<template>
  <view class="empty-state">
    <view class="empty-icon">{{ icon }}</view>
    <text class="empty-text">{{ text }}</text>
    <view v-if="actionText" class="empty-action" @click="$emit('action')">
      <text>{{ actionText }}</text>
    </view>
  </view>
</template>

<script setup>
defineProps({
  // 图标（emoji）
  icon: { type: String, default: '📭' },
  // 提示文字
  text: { type: String, default: '暂无数据' },
  // 操作按钮文字
  actionText: { type: String, default: '' }
})

defineEmits(['action'])
</script>

<style lang="scss" scoped>

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
  
  .empty-icon {
    font-size: 120rpx;
    margin-bottom: 24rpx;
    opacity: 0.6;
  }
  
  .empty-text {
    font-size: $font-body;
    color: $text-weak;
    margin-bottom: 24rpx;
  }
  
  .empty-action {
    padding: $space-md $space-2xl;
    background-color: $primary-light;
    color: $primary;
    border-radius: $btn-radius;
    font-size: $font-sub;
    
    &:active {
      opacity: 0.8;
    }
  }
}
</style>
