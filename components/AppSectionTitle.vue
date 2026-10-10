<!--
  components/AppSectionTitle.vue - 全站统一区块标题（迷你红旗标）
  用法：<AppSectionTitle title="村里事" more-text="更多" @more="goMore" />
-->
<template>
  <view class="app-section-title">
    <view class="ast-left">
      <view class="ast-flag">
        <view class="ast-flag-pole"></view>
        <view class="ast-flag-cloth"></view>
      </view>
      <text class="ast-title">{{ title }}</text>
    </view>
    <view v-if="moreText" class="ast-more" @click="$emit('more')">
      <text class="ast-more-text">{{ moreText }}</text>
      <text class="ast-more-arrow">›</text>
    </view>
  </view>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  // 默认不显示；需要时显式传入并监听 @more，避免出现死按钮
  moreText: { type: String, default: '' }
})
defineEmits(['more'])
</script>

<style lang="scss" scoped>
.app-section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: $space-2xl 0 $space-lg;

  .ast-left {
    display: flex;
    align-items: center;

    .ast-flag {
      display: flex;
      align-items: center;
      margin-right: 16rpx;

      .ast-flag-pole {
        width: 4rpx;
        height: 36rpx;
        background: $primary;
        border-radius: 2rpx;
      }
      .ast-flag-cloth {
        width: 20rpx;
        height: 28rpx;
        margin-left: 2rpx;
        background: $primary;
        border-radius: 0 8rpx 8rpx 0;
        clip-path: polygon(0 0, 100% 25%, 55% 50%, 100% 75%, 0 100%);
      }
    }

    .ast-title {
      font-size: $font-title;
      font-weight: 600;
      color: $text-main;
    }
  }

  .ast-more {
    display: flex;
    align-items: center;
    // 触控区 ≥88rpx：内 padding + 负 margin 抵消，视觉不变
    min-height: 88rpx;
    padding: 0 0 0 24rpx;
    margin: -12rpx 0;

    .ast-more-text {
      font-size: $font-sub;
      color: $primary;
    }
    .ast-more-arrow {
      font-size: $font-card-title;
      color: $primary;
      line-height: 1;
    }
    &:active { opacity: 0.7; }
  }
}
</style>
