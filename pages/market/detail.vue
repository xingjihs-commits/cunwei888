<!--
  pages/market/detail.vue - 价格详情
  用途：查看某农产品的价格历史趋势
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-market-detail">
    <view class="header-card">
      <text class="product-name">{{ currentProduct }}</text>
      <view class="current-price">
        <text class="price-label">{{ t('market.currentPrice', '当前价格') }}</text>
        <text class="price-value">¥{{ latestPrice?.price || '--' }}</text>
        <text class="price-unit">/{{ latestPrice?.unit || '' }}</text>
      </view>
    </view>
    
    <view class="card">
      <view class="card-title">{{ t('market.trend', '价格走势') }}</view>
      <view class="trend-chart">
        <view class="chart-placeholder">
          <text>📊 {{ t('market.trendChart', '走势图') }}</text>
          <text class="chart-tip">{{ t('market.trendTip', '(最近10条价格记录)') }}</text>
        </view>
      </view>
    </view>
    
    <view class="card">
      <view class="card-title">{{ t('market.records', '价格记录') }}</view>
      <view class="record-row" v-for="(item, i) in historyList" :key="i">
        <view class="record-info">
          <text class="record-price">¥{{ item.price }}/{{ item.unit }}</text>
          <text class="record-time">{{ formatDate(item.createTime) }}</text>
        </view>
        <view v-if="item.remark" class="record-remark">{{ item.remark }}</view>
      </view>
      <EmptyState v-if="historyList.length === 0" :text="t('emptyState.noPriceRecord', '暂无价格记录')" icon="📊" />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatDate } from '@/utils/format.js'
import EmptyState from '@/components/EmptyState.vue'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const productName = ref('')
const historyList = ref([])

const currentProduct = computed(() => productName.value)
const latestPrice = computed(() => historyList.value[0])

onLoad((options) => {
  productName.value = decodeURIComponent(options.productName || '')
})

onMounted(() => loadData())

async function loadData() {
  if (!productName.value) return
  
  try {
    const res = await callFunction('getMarketPrices', { productName: productName.value })
    if (res.success) {
      // 包含已过期的历史记录（这里简化处理）
      historyList.value = res.data
    }
  } catch (err) {
    console.error('加载失败:', err)
  }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-market-detail {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  
  .header-card {
    background: linear-gradient(135deg, $primary, $primary-dark);
    color: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    margin-bottom: $card-gap;
    
    .product-name {
      font-size: $font-title;
      font-weight: bold;
      display: block;
      margin-bottom: 16rpx;
    }
    
    .current-price {
      display: flex;
      align-items: baseline;
      
      .price-label {
        font-size: $font-sub;
        opacity: 0.9;
        margin-right: 16rpx;
      }
      
      .price-value {
        font-size: $font-number;
        font-weight: bold;
      }
      
      .price-unit {
        font-size: $font-sub;
        margin-left: 8rpx;
        opacity: 0.9;
      }
    }
  }
  
  .card {
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    
    .card-title {
      font-size: $font-card-title;
      font-weight: bold;
      color: $text-main;
      border-left: 8rpx solid $primary;
      padding-left: 16rpx;
      margin-bottom: 24rpx;
    }
    
    .trend-chart {
      .chart-placeholder {
        text-align: center;
        padding: 80rpx 0;
        font-size: $font-body;
        color: $text-sub;
        
        .chart-tip {
          display: block;
          font-size: $font-sub;
          color: $text-weak;
          margin-top: 8rpx;
        }
      }
    }
    
    .record-row {
      padding: $space-md 0;
      border-bottom: 2rpx solid $border;
      
      &:last-child { border-bottom: none; }
      
      .record-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .record-price {
          font-size: $font-body;
          color: $price;
          font-weight: bold;
        }
        
        .record-time {
          font-size: $font-sub;
          color: $text-weak;
        }
      }
      
      .record-remark {
        font-size: $font-sub;
        color: $text-sub;
        margin-top: 8rpx;
      }
    }
  }
}
</style>
