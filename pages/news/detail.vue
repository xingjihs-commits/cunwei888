<!--
  pages/news/detail.vue - 村务新闻详情
  用途：查看新闻详情，点赞，分享
-->
<template>
  <view class="page-news-detail">
    <view v-if="news.title" class="news-content">
      <view class="news-header">
        <text class="news-title">{{ news.title }}</text>
        <view class="news-meta">
          <text class="meta-source">{{ news.source || t('tip.villageOffice', '村委办') }}</text>
          <text class="meta-time">{{ formatDate(news.createTime) }}</text>
          <text class="meta-views">👁️ {{ news.viewCount || 0 }}</text>
        </view>
      </view>
      
      <view v-if="news.coverImage" class="cover-wrap">
        <image class="cover-img" :src="news.coverImage" mode="aspectFill" lazy-load />
      </view>
      
      <view v-if="news.images && news.images.length" class="image-grid">
        <image
          v-for="(img, i) in news.images"
          :key="i"
          class="grid-img"
          :src="img"
          mode="aspectFill"
          lazy-load
          @click="previewImage(i)"
        />
      </view>
      
      <view class="content-text">
        <text>{{ news.content }}</text>
      </view>
      
      <view class="action-row">
        <view class="like-btn" :class="{ liked: hasLiked }" @click="toggleLike">
          <text class="like-icon">👍</text>
          <text class="like-text">赞 {{ news.likeCount || 0 }}</text>
        </view>
        <button class="share-btn" open-type="share">
          <text>{{ t('button.share', '分享') }}</text>
        </button>
        <!-- 举报入口 -->
        <view class="report-btn" @click="goReport">
          <text>举报</text>
        </view>
      </view>
    </view>
    
    <view v-else-if="loadError" class="error-state">
      <text class="error-icon">⚠️</text>
      <text class="error-text">加载失败</text>
      <view class="retry-btn" @click="loadData">重新加载</view>
    </view>
    
    <view v-else class="loading">加载中...</view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatDate } from '@/utils/format.js'
import { useConfigStore } from '@/store/config.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const news = ref({})
const newsId = ref('')
const hasLiked = ref(false)
const loadError = ref(false)

const userOpenid = computed(() => {
  return uni.getStorageSync('userInfo')?.openid || ''
})

onLoad((options) => {
  newsId.value = options.newsId
})

onMounted(() => loadData())

onShareAppMessage(() => {
  return {
    title: news.value.title || '村务连心桥',
    path: `/pages/news/detail?newsId=${newsId.value}`
  }
})

async function loadData() {
  if (!newsId.value) return
  loadError.value = false
  
  try {
    const res = await callFunction('getNewsDetail', { newsId: newsId.value })
    if (res.success) {
      news.value = res.data
      const likeUsers = res.data.likeUsers || []
      hasLiked.value = likeUsers.includes(userOpenid.value)
    } else {
      loadError.value = true
    }
  } catch (err) {
    console.error('加载失败:', err)
    loadError.value = true
  }
}

function goReport() {
  const title = encodeURIComponent(news.value.title || '新闻内容')
  uni.navigateTo({ url: `/pages/report/index?targetType=news&targetId=${newsId.value}&targetTitle=${title}` })
}

async function toggleLike() {
  // 乐观更新：先改 UI，失败回滚
  const prevLiked = hasLiked.value
  const prevCount = news.value.likeCount || 0
  hasLiked.value = !prevLiked
  news.value.likeCount = prevLiked ? Math.max(0, prevCount - 1) : prevCount + 1
  try {
    const res = await callFunction('likeNews', { newsId: newsId.value })
    if (res.success) {
      hasLiked.value = res.liked
    } else {
      throw new Error(res.message || '点赞失败')
    }
  } catch (err) {
    // 回滚到操作前状态
    hasLiked.value = prevLiked
    news.value.likeCount = prevCount
    uni.showToast({ title: '操作失败，请重试', icon: 'none' })
    console.error('点赞失败:', err)
  }
}

function previewImage(i) {
  uni.previewImage({ urls: news.value.images, current: news.value.images[i] })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-news-detail {
  min-height: 100vh;
  background: $white;
  
  .news-content {
    padding: $page-padding;
  }
  
  .news-header {
    margin-bottom: $card-gap;
    
    .news-title {
      font-size: $font-title;
      font-weight: bold;
      color: $text-main;
      line-height: 1.4;
      display: block;
      margin-bottom: 16rpx;
    }
    
    .news-meta {
      display: flex;
      gap: 24rpx;
      font-size: $font-sub;
      color: $text-weak;
      
      .meta-source { color: $primary; }
    }
  }
  
  .cover-wrap {
    width: 100%;
    margin-bottom: $card-gap;
    
    .cover-img {
      width: 100%;
      height: 400rpx;
      border-radius: $card-radius;
    }
  }
  
  .image-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8rpx;
    margin-bottom: $card-gap;
    
    .grid-img {
      width: 100%;
      aspect-ratio: 1;
      border-radius: $radius-sm;
      background: $bg;
    }
  }
  
  .content-text {
    font-size: $font-body;
    color: $text-main;
    line-height: 1.8;
    white-space: pre-wrap;
    margin-bottom: $card-gap;
  }
  
  .action-row {
    display: flex;
    gap: $card-gap;
    padding: $card-gap 0;
    border-top: 2rpx solid $border;
    border-bottom: 2rpx solid $border;
    
    .like-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12rpx;
      height: $btn-height;
      border: 4rpx solid $border;
      border-radius: $btn-radius;
      font-size: $font-body;
      color: $text-sub;
      
      .like-icon { font-size: $font-title; }
      
      &.liked {
        border-color: $primary;
        background: $primary-light;
        color: $primary;
      }
    }
    
    .share-btn {
      flex: 1;
      height: $btn-height;
      line-height: $btn-height;
      background: $primary;
      color: $white;
      border-radius: $btn-radius;
      font-size: $font-body;
      font-weight: bold;
    }

    .report-btn {
      flex: 0 0 auto;
      padding: 0 $space-md;
      height: $btn-height;
      line-height: $btn-height;
      color: $text-weak;
      font-size: $font-sub;
      border: 2rpx solid $border;
      border-radius: $btn-radius;
    }
  }

  .loading {
    text-align: center;
    padding: 200rpx 0;
    font-size: $font-body;
    color: $text-weak;
  }

  .error-state {
    text-align: center;
    padding: 200rpx 0;

    .error-icon {
      display: block;
      font-size: 80rpx;
      margin-bottom: 24rpx;
    }
    .error-text {
      display: block;
      font-size: $font-body;
      color: $text-sub;
      margin-bottom: 24rpx;
    }
    .retry-btn {
      display: inline-block;
      padding: $space-sm 48rpx;
      background: $primary;
      color: $white;
      border-radius: $btn-radius;
      font-size: $font-body;
    }
  }
}
</style>
