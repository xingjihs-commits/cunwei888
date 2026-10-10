<!--
  pages/admin/projection.vue - 投屏模式
  用途：开会投屏用，全屏大字号，支持左右滑动切换维度
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-projection" @touchstart="onTouchStart" @touchend="onTouchEnd">
    <!-- 顶部：村名+年月 -->
    <view class="header">
      <text class="village-name">{{ villageName }}</text>
      <text class="period">{{ period }}月度考核</text>
    </view>
    
    <!-- 概览卡片 -->
    <view class="overview-row">
      <view class="overview-item">
        <text class="ov-num">{{ overview.total }}</text>
        <text class="ov-label">接单</text>
      </view>
      <view class="overview-item">
        <text class="ov-num">{{ overview.completed }}</text>
        <text class="ov-label">完成</text>
      </view>
      <view class="overview-item danger" v-if="overview.overdue > 0">
        <text class="ov-num">{{ overview.overdue }}</text>
        <text class="ov-label">逾期</text>
      </view>
      <view class="overview-item">
        <text class="ov-num">{{ overview.avgScore }}</text>
        <text class="ov-label">好评度</text>
      </view>
      <view class="overview-item">
        <text class="ov-num">{{ overview.onTimeRate }}</text>
        <text class="ov-label">按时率</text>
      </view>
    </view>
    
    <!-- 当前维度 -->
    <view class="dim-header">
      <text class="dim-title">{{ dimTitle }}</text>
      <text class="dim-hint">左右滑动切换 ‹ {{ dimIndex + 1 }}/{{ dims.length }} ›</text>
    </view>
    
    <!-- 按人排行 -->
    <view v-if="currentDim === 'person'" class="content-list">
      <view v-for="(item, i) in dimensionData" :key="i" class="rank-item" :class="'rank-' + (i + 1)">
        <view class="rank-num">{{ i + 1 }}</view>
        <view class="rank-info">
          <text class="rank-name">{{ item.name }}（{{ item.duty }}）</text>
          <text class="rank-stats">{{ item.total }}单 · {{ item.overdue }}逾期 · {{ item.avgScore }}星</text>
        </view>
      </view>
      <view v-if="dimensionData.length === 0" class="empty">{{ t('emptyState.noData', '暂无数据') }}</view>
    </view>
    
    <!-- 逾期明细 -->
    <view v-if="currentDim === 'overdue'" class="content-list">
      <view v-for="(item, i) in dimensionData" :key="i" class="detail-item danger-item">
        <text class="detail-name">{{ item.name }}（{{ item.duty }}）</text>
        <text class="detail-type">{{ item.type }} · 超时{{ item.overdueDays }}天</text>
      </view>
      <view v-if="dimensionData.length === 0" class="empty">无逾期工单</view>
    </view>
    
    <!-- 差评明细 -->
    <view v-if="currentDim === 'badReview'" class="content-list">
      <view v-for="(item, i) in dimensionData" :key="i" class="detail-item danger-item">
        <text class="detail-name">{{ item.name }}（{{ item.duty }}）</text>
        <text class="detail-type">{{ item.type }} · {{ item.evaluation }}星</text>
        <text v-if="item.evaluationText" class="detail-text">"{{ item.evaluationText }}"</text>
      </view>
      <view v-if="dimensionData.length === 0" class="empty">无差评工单</view>
    </view>
    
    <!-- 自动轮播开关 -->
    <view class="auto-bar" @click="toggleAuto">
      <text>{{ autoPlay ? t('projection.pause', '⏸ 暂停轮播') : t('projection.play', '▶ 自动轮播') }}</text>
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { useConfigStore } from '@/store/config.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const villageName = computed(() => configStore.villageName)

const period = ref('')
const overview = ref({ total: 0, completed: 0, overdue: 0, avgScore: '0.0', onTimeRate: '0%' })
const dimensionData = ref([])
const dimIndex = ref(0)
const autoPlay = ref(false)
let timer = null
let touchStartX = 0

const dims = [
  { key: 'person', label: '责任人排行' },
  { key: 'overdue', label: '逾期明细' },
  { key: 'badReview', label: '差评明细' }
]

const currentDim = computed(() => dims[dimIndex.value]?.key || 'person')
const dimTitle = computed(() => dims[dimIndex.value]?.label || '')

onLoad(() => {
  const now = new Date()
  period.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
})

onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
  loadData()
})
onShow(() => loadData())

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

async function loadData() {
  try {
    const res = await callFunction('getDashboardStats', {
      period: period.value,
      dimension: currentDim.value
    })
    
    if (res.success) {
      overview.value = res.overview
      dimensionData.value = res.dimensionData
    }
  } catch (err) {
    console.error('加载失败:', err)
  }
}

function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
}

function onTouchEnd(e) {
  const endX = e.changedTouches[0].clientX
  const diff = touchStartX - endX
  
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // 左滑：下一个
      dimIndex.value = (dimIndex.value + 1) % dims.length
    } else {
      // 右滑：上一个
      dimIndex.value = (dimIndex.value - 1 + dims.length) % dims.length
    }
    loadData()
  }
}

function toggleAuto() {
  autoPlay.value = !autoPlay.value
  if (autoPlay.value) {
    timer = setInterval(() => {
      dimIndex.value = (dimIndex.value + 1) % dims.length
      loadData()
    }, 5000)
  } else {
    if (timer) clearInterval(timer)
  }
}
</script>

<style lang="scss" scoped>
.page-projection {
  min-height: 100vh;
  background: $white;
  padding: 60rpx $page-padding;
  box-sizing: border-box;
  
  .header {
    text-align: center;
    margin-bottom: 60rpx;
    
    .village-name {
      font-size: 80rpx;
      font-weight: bold;
      color: $primary;
      display: block;
    }
    
    .period {
      font-size: 60rpx;
      color: $text-main;
      margin-top: 16rpx;
      display: block;
    }
  }
  
  .overview-row {
    display: flex;
    justify-content: space-around;
    margin-bottom: 80rpx;
    padding: 40rpx 0;
    background: $primary-light;
    border-radius: $radius-xl;
    
    .overview-item {
      text-align: center;
      
      .ov-num {
        font-size: 100rpx;
        font-weight: bold;
        color: $primary;
        display: block;
      }
      
      .ov-label {
        font-size: $font-title;
        color: $text-sub;
      }
      
      &.danger .ov-num {
        color: $danger;
      }
    }
  }
  
  .dim-header {
    text-align: center;
    margin-bottom: 40rpx;
    
    .dim-title {
      font-size: 64rpx;
      font-weight: bold;
      color: $text-main;
      display: block;
    }
    
    .dim-hint {
      font-size: $font-body;
      color: $text-weak;
      margin-top: 12rpx;
      display: block;
    }
  }
  
  .content-list {
    min-height: 400rpx;
    
    .rank-item {
      display: flex;
      align-items: center;
      padding: $page-padding 24rpx;
      background: $bg;
      border-radius: $radius-lg;
      margin-bottom: 24rpx;
      border-left: 12rpx solid $border;
      
      &.rank-1 { border-left-color: $medal-gold; background: rgba($star-gold,0.1); }
      &.rank-2 { border-left-color: $medal-silver; background: rgba($medal-silver,0.1); }
      &.rank-3 { border-left-color: $medal-bronze; background: rgba($medal-bronze,0.1); }
      
      .rank-num {
        font-size: 80rpx;
        font-weight: bold;
        color: $primary;
        margin-right: 32rpx;
        width: 80rpx;
        text-align: center;
      }
      
      .rank-info {
        flex: 1;
        
        .rank-name {
          font-size: $font-number;
          font-weight: bold;
          color: $text-main;
          display: block;
        }
        
        .rank-stats {
          font-size: $font-card-title;
          color: $text-sub;
          margin-top: 8rpx;
          display: block;
        }
      }
    }
    
    .detail-item {
      padding: $page-padding 24rpx;
      background: $bg;
      border-radius: $radius-lg;
      margin-bottom: 24rpx;
      border-left: 12rpx solid $danger;
      
      .detail-name {
        font-size: $font-btn;
        font-weight: bold;
        color: $text-main;
        display: block;
      }
      
      .detail-type {
        font-size: $font-card-title;
        color: $danger;
        margin-top: 8rpx;
        display: block;
      }
      
      .detail-text {
        font-size: $font-body;
        color: $text-sub;
        margin-top: 8rpx;
        display: block;
        font-style: italic;
      }
    }
    
    .empty {
      text-align: center;
      padding: 80rpx 0;
      font-size: $font-title;
      color: $text-weak;
    }
  }
  
  .auto-bar {
    position: fixed;
    bottom: 40rpx;
    left: 50%;
    transform: translateX(-50%);
    padding: $card-padding 48rpx;
    background: $primary;
    color: $white;
    border-radius: $btn-radius;
    font-size: $font-card-title;
  }
}
</style>
