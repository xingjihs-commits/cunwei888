<!--
  components/Skeleton.vue - 骨架屏组件
  用途：列表/详情加载时显示灰色占位卡片 + shimmer 动画
  老人友好：避免"一片空白 + 加载中..."让老人误以为卡死
  用法：<Skeleton type="list" :count="3" /> 或 <Skeleton type="detail" />
-->
<template>
  <view class="skeleton-wrap" :class="{ 'no-anim': a11y.reduceMotion }">
    <!-- 列表骨架 -->
    <template v-if="type === 'list'">
      <view v-for="i in count" :key="i" class="skeleton-card">
        <view class="sk-line sk-title"></view>
        <view class="sk-line sk-sub"></view>
        <view class="sk-line sk-content"></view>
        <view class="sk-row">
          <view class="sk-line sk-tag"></view>
          <view class="sk-line sk-time"></view>
        </view>
      </view>
    </template>

    <!-- 详情骨架 -->
    <template v-else-if="type === 'detail'">
      <view class="skeleton-card">
        <view class="sk-line sk-title"></view>
        <view class="sk-line sk-sub"></view>
      </view>
      <view class="skeleton-card">
        <view class="sk-line sk-content"></view>
        <view class="sk-line sk-content"></view>
        <view class="sk-line sk-content-short"></view>
        <view class="sk-image"></view>
      </view>
    </template>

    <!-- 卡片网格骨架 -->
    <template v-else-if="type === 'grid'">
      <view class="sk-grid">
        <view v-for="i in count" :key="i" class="sk-grid-item">
          <view class="sk-grid-icon"></view>
          <view class="sk-line sk-grid-text"></view>
        </view>
      </view>
    </template>

    <!-- 首页混合骨架 -->
    <template v-else-if="type === 'home'">
      <view class="sk-banner"></view>
      <view class="skeleton-card">
        <view class="sk-line sk-title"></view>
        <view class="sk-line sk-sub"></view>
      </view>
      <view class="sk-grid">
        <view v-for="i in 8" :key="i" class="sk-grid-item">
          <view class="sk-grid-icon"></view>
          <view class="sk-line sk-grid-text"></view>
        </view>
      </view>
    </template>
  </view>
</template>

<script setup>
import { a11y } from '@/utils/accessibility.js'

defineProps({
  type: {
    type: String,
    default: 'list',  // list / detail / grid / home
    validator: v => ['list', 'detail', 'grid', 'home'].includes(v)
  },
  count: {
    type: Number,
    default: 3
  }
})
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.skeleton-wrap {
  padding: $page-padding;
}

.skeleton-card {
  background: $white;
  border-radius: $card-radius;
  padding: $card-padding;
  box-shadow: $card-shadow;
  margin-bottom: $card-gap;
}

.sk-line {
  height: 32rpx;
  background: linear-gradient(90deg, $skeleton-bg 25%, $skeleton-shine 50%, $skeleton-bg 75%);
  background-size: 200% 100%;
  border-radius: $radius-sm;
  margin-bottom: 16rpx;
  animation: shimmer 1.5s infinite;
}

.sk-title { width: 60%; height: 40rpx; }
.sk-sub { width: 40%; height: 24rpx; }
.sk-content { width: 100%; }
.sk-content-short { width: 70%; }
.sk-tag { width: 100rpx; height: 32rpx; }
.sk-time { width: 120rpx; height: 24rpx; }

.sk-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16rpx;
}

.sk-image {
  width: 100%;
  height: 400rpx;
  background: linear-gradient(90deg, $skeleton-bg 25%, $skeleton-shine 50%, $skeleton-bg 75%);
  background-size: 200% 100%;
  border-radius: $radius-md;
  margin-top: 16rpx;
  animation: shimmer 1.5s infinite;
}

.sk-banner {
  width: 100%;
  height: 360rpx;
  background: linear-gradient(90deg, $skeleton-bg 25%, $skeleton-shine 50%, $skeleton-bg 75%);
  background-size: 200% 100%;
  border-radius: $card-radius;
  margin-bottom: $card-gap;
  animation: shimmer 1.5s infinite;
}

.sk-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24rpx;
  background: $white;
  padding: $card-padding;
  border-radius: $card-radius;
  box-shadow: $card-shadow;
  margin-bottom: $card-gap;
}

.sk-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sk-grid-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: $radius-full;
  background: linear-gradient(90deg, $skeleton-bg 25%, $skeleton-shine 50%, $skeleton-bg 75%);
  background-size: 200% 100%;
  margin-bottom: 12rpx;
  animation: shimmer 1.5s infinite;
}

.sk-grid-text {
  width: 80rpx;
  height: 24rpx;
  margin: 0;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

// 适老化：减少动画时关闭 shimmer
.no-anim {
  .sk-line, .sk-image, .sk-banner, .sk-grid-icon {
    animation: none;
    background: $skeleton-bg;
  }
}
</style>
