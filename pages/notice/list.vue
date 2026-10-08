<!--
  pages/notice/list.vue - 信息公示列表
  用途：按分类、年份筛选信息公示
-->
<template>
  <view class="page-notice">
    <view class="filter-bar">
      <view 
        v-for="cat in categories"
        :key="cat"
        class="filter-item"
        :class="{ active: currentCategory === cat }"
        @click="switchCategory(cat)"
      >{{ cat }}</view>
    </view>
    
    <view class="year-bar">
      <picker mode="selector" :range="years" :value="yearIndex" @change="onYearChange">
        <view class="year-picker">
          <text>{{ years[yearIndex] }}年</text>
          <text class="arrow">▼</text>
        </view>
      </picker>
      <text class="count-text">共{{ total }}条</text>
    </view>
    
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view class="notice-card" v-for="item in list" :key="item._id" @click="goDetail(item)">
        <view class="card-header">
          <view class="cat-tag" :class="'cat-' + getCategoryClass(item.category)">{{ item.category }}</view>
          <text class="notice-time">{{ formatDate(item.createTime, 'MM-DD') }}</text>
        </view>
        <text class="notice-title">{{ item.title }}</text>
        <text class="notice-summary">{{ item.content }}</text>
        <view v-if="item.category === '财务'" class="audit-tag">
          ✓ 经村务监督委员会审核
        </view>
        <view v-if="item.responsible" class="responsible">
          <text>责任人: {{ item.responsible }}</text>
        </view>
      </view>
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noData', '暂无公示')" icon="📢" />
      <view v-if="loading" class="loading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatDate } from '@/utils/format.js'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const list = ref([])
const loading = ref(false)
const page = ref(1)
const total = ref(0)
const currentCategory = ref('全部')
const categories = ['全部', '党务', '村务', '财务', '惠农', '应急']
const years = ['全部', '2024', '2023']
const yearIndex = ref(0)

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.notice', '信息公示') })
  loadData()
})
onPullDownRefresh(() => {
  page.value = 1
  loadData()
})

async function loadData() {
  if (loading.value) return
  loading.value = true
  
  try {
    const params = {
      page: page.value,
      pageSize: 20,
      category: currentCategory.value === '全部' ? '' : currentCategory.value,
      year: years[yearIndex.value] === '全部' ? '' : years[yearIndex.value]
    }
    
    const res = await callFunction('getNotices', params)
    
    if (res.success) {
      if (page.value === 1) {
        list.value = res.data
      } else {
        list.value = list.value.concat(res.data)
      }
      total.value = res.total
    }
  } catch (err) {
    console.error('加载失败:', err)
  } finally {
    loading.value = false
    uni.stopPullDownRefresh()
  }
}

function switchCategory(cat) {
  currentCategory.value = cat
  page.value = 1
  loadData()
}

function onYearChange(e) {
  yearIndex.value = e.detail.value
  page.value = 1
  loadData()
}

function getCategoryClass(cat) {
  const map = { '党务': 'party', '村务': 'village', '财务': 'finance', '惠农': 'agri', '应急': 'emergency' }
  return map[cat] || 'default'
}

function loadMore() {
  if (list.value.length < total.value && !loading.value) {
    page.value++
    loadData()
  }
}

function goDetail(item) {
  uni.navigateTo({ url: `/pages/notice/detail?noticeId=${item._id}` })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-notice {
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
  
  .year-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $space-md $page-padding;
    
    .year-picker {
      padding: $space-xs 24rpx;
      background: $white;
      border-radius: $radius-sm;
      font-size: $font-sub;
      color: $primary;
      
      .arrow { font-size: $font-micro; margin-left: 8rpx; }
    }
    
    .count-text {
      font-size: $font-sub;
      color: $text-sub;
    }
  }
  
  .list {
    height: calc(100vh - 220rpx);
    padding: 0 $page-padding;
  }
  
  .notice-card {
    background: $white;
    padding: $card-padding;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12rpx;
      
      .cat-tag {
        padding: $space-xs $space-md;
        border-radius: $radius-sm;
        font-size: $font-micro;
        background: $primary-light;
        color: $primary;
        
        &.cat-party { background: rgba(196,30,36,0.15); color: $primary; }
        &.cat-finance { background: $gold-light; color: $gold; }
        &.cat-emergency { background: rgba(198,40,40,0.1); color: $danger; }
      }
      
      .notice-time { font-size: $font-sub; color: $text-weak; }
    }
    
    .notice-title {
      font-size: $font-card-title;
      font-weight: bold;
      color: $text-main;
      display: block;
      margin-bottom: 8rpx;
    }
    
    .notice-summary {
      font-size: $font-sub;
      color: $text-sub;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .audit-tag {
      margin-top: 12rpx;
      padding: $space-sm $space-md;
      background: rgba(46,125,50,0.1);
      color: $success;
      border-radius: $radius-sm;
      font-size: $font-micro;
    }
    
    .responsible {
      margin-top: 12rpx;
      font-size: $font-sub;
      color: $primary;
    }
    
    &:active { background: $bg; }
  }
  
  .loading {
    text-align: center;
    padding: $card-padding;
    font-size: $font-sub;
    color: $text-weak;
  }
}
</style>
