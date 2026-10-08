<!--
  pages/market/list.vue - 惠农信息
  用途：展示农产品价格列表，可订阅
-->
<template>
  <view class="page-market">
    <view class="search-bar">
      <view class="search-input-wrap">
        <text class="search-icon">🔍</text>
        <input v-model="keyword" class="search-input" :placeholder="t('placeholder.searchProduct', '搜索农产品名称')" @confirm="onSearch" />
      </view>
    </view>
    
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view class="price-card" v-for="item in list" :key="item._id" @click="goDetail(item)">
        <view class="card-row">
          <view class="product-info">
            <text class="product-name">{{ item.productName }}</text>
            <text v-if="item.market" class="product-market">{{ item.market }}</text>
          </view>
          <view class="price-info">
            <text class="price-num">¥{{ item.price }}</text>
            <text class="price-unit">/{{ item.unit }}</text>
            <view v-if="item.trend" class="trend-tag" :class="'trend-' + item.trend">
              {{ trendText(item.trend) }}
            </view>
          </view>
        </view>
        <view v-if="item.remark" class="remark">{{ item.remark }}</view>
        <view class="card-footer">
          <text class="update-time">{{ t('market.updatedAt', '更新于') }} {{ relativeTime(item.createTime) }}</text>
          <view class="subscribe-btn" :class="{ subscribed: isSubscribed(item.productName) }" @click.stop="toggleSubscribe(item.productName)">
            {{ isSubscribed(item.productName) ? t('market.subscribed', '已订阅') : t('market.subscribe', '订阅提醒') }}
          </view>
        </view>
      </view>
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noData', '暂无价格信息')" icon="🌾" />
      <view v-if="loading" class="loading">{{ t('emptyState.loading', '加载中...') }}</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { relativeTime } from '@/utils/format.js'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const list = ref([])
const loading = ref(false)
const keyword = ref('')
const subscribedProducts = ref([])

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.market', '惠农信息') })
  loadData()
  loadSubscriptions()
})
onPullDownRefresh(() => {
  loadData()
  loadSubscriptions()
})

async function loadData() {
  if (loading.value) return
  loading.value = true
  
  try {
    const res = await callFunction('getMarketPrices', {
      productName: keyword.value
    })
    
    if (res.success) {
      list.value = res.data
    }
  } catch (err) {
    console.error('加载失败:', err)
  } finally {
    loading.value = false
    uni.stopPullDownRefresh()
  }
}

async function loadSubscriptions() {
  // 从本地存储获取订阅状态
  subscribedProducts.value = uni.getStorageSync('subscribedProducts') || []
}

function isSubscribed(productName) {
  return subscribedProducts.value.includes(productName)
}

async function toggleSubscribe(productName) {
  try {
    const res = await callFunction('subscribePriceAlert', { productName: productName })
    if (res.success) {
      if (res.subscribed) {
        subscribedProducts.value.push(productName)
        uni.showToast({ title: '订阅成功', icon: 'success' })
      } else {
        subscribedProducts.value = subscribedProducts.value.filter(p => p !== productName)
        uni.showToast({ title: '已取消订阅', icon: 'none' })
      }
      uni.setStorageSync('subscribedProducts', subscribedProducts.value)
    }
  } catch (err) {
    console.error('订阅失败:', err)
  }
}

function trendText(trend) {
  const map = { up: '↑涨', down: '↓跌', stable: '→平' }
  return map[trend] || ''
}

function onSearch() {
  loadData()
}

function loadMore() {
  // 价格列表一次性加载，不实现分页
}

function goDetail(item) {
  uni.navigateTo({ url: `/pages/market/detail?productName=${item.productName}` })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-market {
  min-height: 100vh;
  background: $bg;
  
  .search-bar {
    padding: $space-md $page-padding;
    background: $white;
    box-shadow: $card-shadow;
    
    .search-input-wrap {
      display: flex;
      align-items: center;
      padding: $space-md $space-lg;
      background: $bg;
      border-radius: $btn-radius;
      
      .search-icon { font-size: $font-body; margin-right: 12rpx; }
      
      .search-input {
        flex: 1;
        font-size: $font-body;
        height: 56rpx;
      }
    }
  }
  
  .list {
    height: calc(100vh - 120rpx);
    padding: $page-padding;
    box-sizing: border-box;
  }
  
  .price-card {
    background: $white;
    padding: $card-padding;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    
    .card-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .product-info {
        .product-name {
          font-size: $font-card-title;
          font-weight: bold;
          color: $text-main;
          display: block;
        }
        
        .product-market {
          font-size: $font-sub;
          color: $text-sub;
        }
      }
      
      .price-info {
        display: flex;
        align-items: baseline;
        
        .price-num {
          font-size: $font-number;
          color: $price;
          font-weight: bold;
        }
        
        .price-unit {
          font-size: $font-sub;
          color: $text-sub;
          margin-left: 4rpx;
        }
        
        .trend-tag {
          margin-left: 16rpx;
          padding: $space-xs $space-md;
          border-radius: $radius-sm;
          font-size: $font-micro;
          
          &.trend-up { background: rgba(198,40,40,0.1); color: $danger; }
          &.trend-down { background: rgba(46,125,50,0.1); color: $success; }
          &.trend-stable { background: $border; color: $text-sub; }
        }
      }
    }
    
    .remark {
      margin-top: 12rpx;
      font-size: $font-sub;
      color: $text-sub;
    }
    
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12rpx;
      padding-top: 12rpx;
      border-top: 2rpx solid $border;
      
      .update-time {
        font-size: $font-sub;
        color: $text-weak;
      }
      
      .subscribe-btn {
        padding: $space-xs 24rpx;
        border: 2rpx solid $primary;
        color: $primary;
        border-radius: $radius-sm;
        font-size: $font-sub;
        
        &.subscribed {
          background: $primary-light;
          border-color: $primary-light;
        }
      }
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
