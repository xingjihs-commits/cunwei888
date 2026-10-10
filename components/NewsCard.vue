<!--
  NewsCard.vue - 村务新闻卡片组件（左图右文版式）
  用途：首页、列表页展示单条新闻
  API 保持不变：news 对象入参 / tap 事件
-->
<template>
  <view class="news-card" @click="onTap">
    <view class="news-cover-wrap">
      <image
        v-if="news.coverImage"
        class="news-cover"
        :src="news.coverImage"
        mode="aspectFill"
      />
      <view v-else class="news-cover-empty">
        <AppIcon name="image" :size="48" :color="TEXT_WEAK_ICON" />
      </view>
    </view>
    <view class="news-body">
      <text class="news-title">{{ news.title }}</text>
      <view class="news-meta">
        <view v-if="news.category" class="news-chip">{{ news.category }}</view>
        <text class="news-time">{{ relativeTime(news.publishTime || news.createTime) }}</text>
        <view class="news-likes">
          <AppIcon name="heart" :size="24" :color="TEXT_WEAK" />
          <text class="likes-num">{{ news.likeCount || 0 }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { relativeTime } from '@/utils/format.js'
import AppIcon from '@/components/AppIcon.vue'
import { TEXT_WEAK as TEXT_WEAK_ICON } from '@/utils/theme.js'

const props = defineProps({
  news: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['tap'])

function onTap() {
  emit('tap', props.news)
}
</script>

<style lang="scss" scoped>
// 规格：卡 686×约208 · 圆角 24 · 内边距 20 · 图 208×156(4:3) 圆角 16
.news-card {
  display: flex;
  background: $white;
  border-radius: $radius-card;
  padding: $space-lg;
  box-shadow: $shadow-md;
  margin-bottom: $space-lg;
  overflow: hidden;
  transition: transform $tap-time ease;

  &:active { transform: scale($tap-scale); }

  .news-cover-wrap {
    width: 208rpx;
    height: 156rpx;
    border-radius: $radius-lg;
    overflow: hidden;
    flex-shrink: 0;
    margin-right: 20rpx;
    background: $bg;

    .news-cover {
      width: 100%;
      height: 100%;
    }

    // 无图兜底：中性灰底 + 图片线形图标（不用旗面渐变，避免红色语义被稀释）
    .news-cover-empty {
      width: 100%;
      height: 100%;
      background: $chip-gray-bg;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .news-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 4rpx 0;

    .news-title {
      font-size: $font-card-title;
      font-weight: 500;
      color: $text-main;
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .news-meta {
      display: flex;
      align-items: center;

      .news-chip {
        flex-shrink: 0;
        height: 44rpx;
        padding: 0 16rpx;
        background: $chip-red-bg;
        color: $chip-red-text;
        border-radius: $radius-md;
        font-size: $font-sub;
        line-height: 44rpx;
        margin-right: 12rpx;
      }

      .news-time {
        flex: 1;
        font-size: $font-sub;
        color: $text-weak;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .news-likes {
        display: flex;
        align-items: center;
        flex-shrink: 0;

        .likes-num {
          font-size: $font-sub;
          color: $text-weak;
          margin-left: 6rpx;
        }
      }
    }
  }
}
</style>
