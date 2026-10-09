<!--
  pages/project/list.vue - 项目收益列表
  用途：展示村集体项目收益情况
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-project">
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
      <view class="project-card" v-for="item in list" :key="item._id">
        <view class="card-header">
          <text class="card-title">{{ item.title }}</text>
          <view class="year-tag">{{ item.year }}年</view>
        </view>
        <text class="card-content">{{ item.content }}</text>
        <view v-if="item.totalAmount" class="amount-row">
          <text class="amount-label">总收益:</text>
          <text class="amount-value">¥{{ formatMoney(item.totalAmount) }}</text>
        </view>
        <view v-if="item.beneficiaries" class="beneficiaries">
          <text class="ben-label">受益群众:</text>
          <text class="ben-text">{{ item.beneficiaries }}</text>
        </view>
        <view v-if="item.images && item.images.length" class="image-grid">
          <image
            v-for="img in item.images.slice(0, 3)"
            :key="img"
            class="grid-img"
            :src="img"
            mode="aspectFill" lazy-load
          />
        </view>
        <text class="card-time">{{ formatDate(item.createTime) }}</text>
      </view>
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noData', '暂无项目收益信息')" icon="💰" />
      <view v-if="loading" class="loading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatDate, formatMoney } from '@/utils/format.js'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'
import { usePagination } from '@/composables/usePagination.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const years = ['全部', '2024', '2023']
const yearIndex = ref(0)

const { list, total, loading, refresh, loadMore } = usePagination(
  (params) => callFunction('getProjects', {
    ...params,
    year: years[yearIndex.value] === '全部' ? '' : years[yearIndex.value]
  }),
  { pageSize: 20 }
)

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.project', '项目收益') })
  refresh()
})
onPullDownRefresh(() => refresh())

function onYearChange(e) {
  yearIndex.value = e.detail.value
  refresh()
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-project {
  min-height: 100vh;
  background: $bg;
  
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
    
    .count-text { font-size: $font-sub; color: $text-sub; }
  }
  
  .list {
    height: calc(100vh - 120rpx);
    padding: 0 $page-padding;
  }
  
  .project-card {
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
      
      .card-title {
        flex: 1;
        font-size: $font-card-title;
        font-weight: bold;
        color: $text-main;
      }
      
      .year-tag {
        padding: $space-xs $space-md;
        background: $gold-light;
        color: $gold;
        border-radius: $radius-sm;
        font-size: $font-micro;
      }
    }
    
    .card-content {
      font-size: $font-sub;
      color: $text-sub;
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 16rpx;
    }
    
    .amount-row {
      display: flex;
      align-items: baseline;
      margin-bottom: 12rpx;
      
      .amount-label {
        font-size: $font-sub;
        color: $text-sub;
        margin-right: 12rpx;
      }
      
      .amount-value {
        font-size: $font-number;
        color: $price;
        font-weight: bold;
      }
    }
    
    .beneficiaries {
      display: flex;
      margin-bottom: 12rpx;
      
      .ben-label { font-size: $font-sub; color: $text-sub; margin-right: 12rpx; }
      .ben-text { font-size: $font-sub; color: $text-main; }
    }
    
    .image-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12rpx;
      margin-bottom: 12rpx;
      
      .grid-img {
        width: 100%;
        aspect-ratio: 1;
        border-radius: $radius-md;
        background: $bg;
      }
    }
    
    .card-time {
      font-size: $font-sub;
      color: $text-weak;
    }
  }
  
  .loading {
    text-align: center;
    padding: $card-padding;
    font-size: $font-sub;
    color: $text-weak;
  }
}
</style>
