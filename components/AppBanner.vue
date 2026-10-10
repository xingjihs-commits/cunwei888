<!--
  components/AppBanner.vue - 通用图片轮播（首页头条 / 村委一线风采共用）
  数据：items = [{ image, title, type?, id? }]
  事件：@tap(item)
  适老化：reduceMotion 或字号倍数 ≥1.2 时停止自动轮播，由用户手动滑动
-->
<template>
  <view v-if="items && items.length" class="app-banner" :style="{ height: height + 'rpx' }">
    <swiper
      class="ab-swiper"
      :autoplay="autoPlay"
      circular
      :interval="5000"
      :duration="500"
      @change="onChange"
    >
      <swiper-item v-for="(item, i) in items" :key="i" @click="$emit('tap', item)">
        <view class="ab-slide">
          <image
            v-if="item.image"
            class="ab-img"
            :src="item.image"
            mode="aspectFill"
          />
          <view v-else class="ab-fallback">
            <AppIcon name="star" :size="120" :color="STAR_GOLD_DIM" />
          </view>
          <view class="ab-mask"></view>
          <text class="ab-title">{{ item.title }}</text>
          <view v-if="item.type" class="ab-type-chip">{{ item.type }}</view>
        </view>
      </swiper-item>
    </swiper>
    <view v-if="items.length > 1" class="ab-dots">
      <view
        v-for="(item, i) in items"
        :key="i"
        class="ab-dot"
        :class="{ 'ab-dot-active': i === current }"
      ></view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import { a11y } from '@/utils/accessibility.js'
import { STAR_GOLD_DIM } from '@/utils/theme.js'

defineProps({
  items: { type: Array, default: () => [] },
  height: { type: Number, default: 320 } // rpx
})
defineEmits(['tap'])

const current = ref(0)

// 适老化：减少动画 或 大字号用户 → 关闭自动轮播（避免读不完就被切走）
const autoPlay = computed(() => !a11y.reduceMotion && (a11y.fontScale || 1) < 1.2)

function onChange(e) {
  current.value = e.detail.current
}
</script>

<style lang="scss" scoped>
.app-banner {
  position: relative;
  border-radius: $radius-card;
  overflow: hidden;
  box-shadow: $shadow-md;

  .ab-swiper,
  .ab-slide {
    width: 100%;
    height: 100%;
  }

  .ab-slide {
    position: relative;
  }

  .ab-img {
    width: 100%;
    height: 100%;
  }

  // 无图兜底：旗面渐变 + 金星（官方头条语义）
  .ab-fallback {
    width: 100%;
    height: 100%;
    background: $flag-gradient;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // 底部遮罩（高度容纳两行标题）
  .ab-mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 180rpx;
    background: linear-gradient(180deg, rgba($scrim, 0) 0%, rgba($scrim, 0.65) 100%);
  }

  .ab-title {
    position: absolute;
    left: 24rpx;
    right: 140rpx;
    bottom: 20rpx;
    color: $white;
    font-size: $font-card-title;
    font-weight: 600;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .ab-type-chip {
    position: absolute;
    right: 20rpx;
    bottom: 88rpx; // 避开右下角指示器
    padding: 4rpx 16rpx;
    background: rgba($white, 0.9);
    color: $primary;
    font-size: $font-micro;
    border-radius: $radius-md;
    line-height: 1.5;
  }

  // 指示器（单条内容不显示）
  .ab-dots {
    position: absolute;
    right: 20rpx;
    bottom: 20rpx;
    display: flex;
    align-items: center;
    gap: 8rpx;

    .ab-dot {
      width: 12rpx;
      height: 12rpx;
      border-radius: $radius-full;
      background: rgba($white, 0.5);
      transition: all 0.3s;

      &.ab-dot-active {
        width: 32rpx;
        background: $white;
      }
    }
  }
}
</style>
