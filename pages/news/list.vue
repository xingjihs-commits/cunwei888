<!--
  pages/news/list.vue - 村务新闻列表
  用途：展示村务新闻列表，可按分类筛选
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-news">
    <view class="filter-bar">
      <view 
        v-for="cat in categories"
        :key="cat"
        class="filter-item"
        :class="{ active: currentCategory === cat }"
        @click="switchCategory(cat)"
      >{{ cat }}</view>
    </view>
    
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <NewsCard 
        v-for="item in list"
        :key="item._id"
        :news="item"
        @tap="goDetail"
      />
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noData', '暂无新闻')" icon="📰" />
      <view v-if="loading" class="loading">加载中...</view>
    </scroll-view>
    
    <view class="fab" @click="goHome">
      <text>🏠</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import NewsCard from '@/components/NewsCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'
import { usePagination } from '@/composables/usePagination.js'
import { useRootFontSize } from '@/composables/useA11y.js'
import { setCache, getCacheStale } from '@/utils/cache.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const rootFontSize = useRootFontSize()

const currentCategory = ref('全部')
const categories = ['全部', '村务', '党建', '通知', '活动']

async function fetchNews(params) {
  try {
    const res = await callFunction('getNewsList', {
      ...params,
      category: currentCategory.value === '全部' ? '' : currentCategory.value
    })
    if (params.page === 1 && res && res.success) setCache('vb_news_list', res.data)
    return res
  } catch (err) {
    if (params.page === 1) {
      const c = getCacheStale('vb_news_list')
      if (c) return { success: true, data: c, total: c.length }
    }
    throw err
  }
}

const { list, loading, refresh, loadMore } = usePagination(fetchNews, { pageSize: 10 })

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.news', '村里事') })
  refresh()
})
onPullDownRefresh(() => refresh())

function switchCategory(cat) {
  currentCategory.value = cat
  refresh()
}

function goDetail(item) {
  uni.navigateTo({ url: `/pages/news/detail?newsId=${item._id}` })
}

function goHome() {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-news {
  min-height: 100vh;
  background: $bg;
  
  .filter-bar {
    display: flex;
    overflow-x: auto;
    background: $white;
    padding: $space-md $page-padding;
    box-shadow: $card-shadow;
    white-space: nowrap;
    
    .filter-item {
      padding: $space-sm $space-xl;
      font-size: $font-sub;
      color: $text-sub;
      border-radius: $radius-sm;
      margin-right: 16rpx;
      flex-shrink: 0;
      
      &.active {
        color: $white;
        background: $primary;
        font-weight: bold;
      }
    }
  }
  
  .list {
    height: calc(100vh - 120rpx);
    padding: $page-padding;
    box-sizing: border-box;
  }
  
  .loading {
    text-align: center;
    padding: $card-padding;
    font-size: $font-sub;
    color: $text-weak;
  }
  
  .fab {
    position: fixed;
    right: 32rpx;
    bottom: 200rpx;
    width: 96rpx;
    height: 96rpx;
    background: $primary;
    color: $white;
    border-radius: $radius-full;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-number;
    box-shadow: 0 4rpx 16rpx rgba(196, 30, 36, 0.4);
  }
}
</style>
