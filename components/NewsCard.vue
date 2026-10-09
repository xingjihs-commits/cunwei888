<!--
  NewsCard.vue - 村务新闻卡片组件
  用途：首页、列表页展示单条新闻
-->
<template>
  <view class="news-card" @click="onTap">
    <view class="news-content">
      <view class="news-title-row">
        <text class="news-title">{{ news.title }}</text>
        <view v-if="news.category" class="news-tag">{{ news.category }}</view>
      </view>
      <text class="news-summary">{{ news.summary || news.content }}</text>
      <view class="news-meta">
        <text class="meta-source">{{ news.source || t('tip.villageOffice', '村委办') }}</text>
        <text class="meta-time">{{ relativeTime(news.publishTime || news.createTime) }}</text>
        <view class="meta-stats">
          <text class="stat-item">👁️ {{ news.viewCount || 0 }}</text>
          <text class="stat-item">👍 {{ news.likeCount || 0 }}</text>
        </view>
      </view>
    </view>
    <image
      v-if="news.coverImage"
      class="news-cover"
      :src="news.coverImage"
      mode="aspectFill"
    />
  </view>
</template>

<script setup>
import { useConfigStore } from '@/store/config.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

import { relativeTime } from '@/utils/format.js'

const props = defineProps({
  news: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['tap'])

function onTap() {
  emit('tap', props.news)
}
</script>

<style lang="scss" scoped>

.news-card {
  display: flex;
  background-color: $white;
  border-radius: $card-radius;
  padding: $card-padding;
  box-shadow: $card-shadow;
  margin-bottom: $card-gap;
  
  .news-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 20rpx;
    
    .news-title-row {
      display: flex;
      align-items: flex-start;
      margin-bottom: 12rpx;
      
      .news-title {
        flex: 1;
        font-size: $font-card-title;
        font-weight: bold;
        color: $text-main;
        line-height: 1.4;
      }
      
      .news-tag {
        flex-shrink: 0;
        padding: $space-xs $space-md;
        background-color: $primary-light;
        color: $primary;
        border-radius: $radius-sm;
        font-size: $font-sub;
        margin-left: 12rpx;
      }
    }
    
    .news-summary {
      flex: 1;
      font-size: $font-sub;
      color: $text-sub;
      line-height: 1.5;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 12rpx;
    }
    
    .news-meta {
      display: flex;
      align-items: center;
      font-size: $font-sub;
      color: $text-weak;
      
      .meta-source {
        margin-right: 16rpx;
      }
      
      .meta-time {
        flex: 1;
      }
      
      .meta-stats {
        display: flex;
        gap: 16rpx;
        
        .stat-item {
          font-size: $font-sub;
        }
      }
    }
  }
  
  .news-cover {
    width: 200rpx;
    height: 140rpx;
    border-radius: $radius-md;
    background-color: $bg;
    flex-shrink: 0;
  }
  
  &:active {
    background-color: $bg;
  }
}
</style>
