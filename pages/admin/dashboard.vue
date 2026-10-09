<!--
  pages/admin/dashboard.vue - 数据看板（替换版）
  用途：开会投屏用，5维度统计+导出+投屏入口
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-dashboard">
    <view class="date-bar">
      <picker mode="selector" :range="months" :value="monthIndex" @change="onMonthChange">
        <view class="picker-value">{{ months[monthIndex] }} ▼</view>
      </picker>
      <view class="action-btns">
        <view class="action-btn" @click="goProjection">📺 {{ t('dashboard.projection', '投屏') }}</view>
        <view class="action-btn" @click="exportReport">📄 {{ t('dashboard.export', '导出') }}</view>
      </view>
    </view>
    
    <!-- 概览5卡片 -->
    <view class="overview-grid">
      <view class="overview-item">
        <text class="ov-num">{{ overview.total }}</text>
        <text class="ov-label">{{ t('dashboard.received', '接单') }}</text>
      </view>
      <view class="overview-item success">
        <text class="ov-num">{{ overview.completed }}</text>
        <text class="ov-label">{{ t('dashboard.completed', '完成') }}</text>
      </view>
      <view class="overview-item danger" v-if="overview.overdue > 0">
        <text class="ov-num">{{ overview.overdue }}</text>
        <text class="ov-label">{{ t('dashboard.overdue', '逾期') }}</text>
      </view>
      <view class="overview-item">
        <text class="ov-num">{{ overview.badReviews }}</text>
        <text class="ov-label">{{ t('dashboard.badReview', '差评') }}</text>
      </view>
      <view class="overview-item gold">
        <text class="ov-num">{{ overview.avgScore }}</text>
        <text class="ov-label">{{ t('dashboard.avgScore', '好评度') }}</text>
      </view>
      <view class="overview-item">
        <text class="ov-num">{{ overview.onTimeRate }}</text>
        <text class="ov-label">{{ t('dashboard.onTimeRate', '按时率') }}</text>
      </view>
    </view>
    
    <!-- Tab切换 -->
    <view class="tab-bar">
      <view v-for="tab in tabs" :key="tab.key" class="tab-item"
        :class="{ active: currentDim === tab.key }"
        @click="switchDim(tab.key)">{{ t(tab.labelKey, tab.label) }}</view>
    </view>
    
    <!-- 内容区 -->
    <scroll-view scroll-y class="content">
      <Skeleton v-if="loading && dimensionData.length === 0" type="list" />
      <!-- 按人排行 -->
      <view v-if="currentDim === 'person'">
        <view v-for="(item, i) in dimensionData" :key="i" class="rank-card" :class="'rank-' + (i + 1)">
          <view class="rank-num">{{ i + 1 }}</view>
          <view class="rank-info">
            <text class="rank-name">{{ item.name }}（{{ item.duty }}）</text>
            <text class="rank-stats">{{ item.total }}单 · {{ item.overdue }}逾期 · {{ item.avgScore }}星 · {{ item.onTimeRate }}</text>
          </view>
        </view>
        <EmptyState v-if="dimensionData.length === 0 && !loading" :text="t('emptyState.noData', '暂无数据')" icon="📊" />
      </view>
      
      <!-- 按模块 -->
      <view v-if="currentDim === 'module'">
        <view v-for="(item, i) in dimensionData" :key="i" class="module-card">
          <text class="mod-name">{{ item.typeName }}</text>
          <view class="mod-stats">
            <text>{{ item.total }}单</text>
            <text>完成{{ item.completed }}</text>
            <text v-if="item.overdue > 0" class="danger-text">逾期{{ item.overdue }}</text>
          </view>
        </view>
        <EmptyState v-if="dimensionData.length === 0 && !loading" :text="t('emptyState.noData', '暂无数据')" icon="📊" />
      </view>
      
      <!-- 按村组 -->
      <view v-if="currentDim === 'group'">
        <view v-for="(item, i) in dimensionData" :key="i" class="module-card">
          <text class="mod-name">{{ item.group }}</text>
          <view class="mod-stats">
            <text>{{ item.total }}单</text>
            <text>完成{{ item.completed }}</text>
            <text v-if="item.overdue > 0" class="danger-text">逾期{{ item.overdue }}</text>
          </view>
        </view>
        <EmptyState v-if="dimensionData.length === 0 && !loading" :text="t('emptyState.noData', '暂无数据')" icon="📊" />
      </view>
      
      <!-- 逾期明细 -->
      <view v-if="currentDim === 'overdue'">
        <view v-for="(item, i) in dimensionData" :key="i" class="detail-card danger-card">
          <view class="det-header">
            <text class="det-name">{{ item.name }}（{{ item.duty }}）</text>
            <view class="det-badge">超时{{ item.overdueDays }}天</view>
          </view>
          <text class="det-type">{{ item.type }} · {{ item.title }}</text>
        </view>
        <EmptyState v-if="dimensionData.length === 0 && !loading" :text="t('emptyState.noOverdue', '无逾期工单')" icon="✓" />
      </view>
      
      <!-- 差评明细 -->
      <view v-if="currentDim === 'badReview'">
        <view v-for="(item, i) in dimensionData" :key="i" class="detail-card danger-card">
          <view class="det-header">
            <text class="det-name">{{ item.name }}（{{ item.duty }}）</text>
            <view class="det-badge">{{ item.evaluation }}星</view>
          </view>
          <text class="det-type">{{ item.type }} · {{ item.title }}</text>
          <text v-if="item.evaluationText" class="det-text">"{{ item.evaluationText }}"</text>
        </view>
        <EmptyState v-if="dimensionData.length === 0 && !loading" :text="t('emptyState.noBadReview', '无差评工单')" icon="✓" />
      </view>
      
      <view v-if="loading" class="loading">{{ t('emptyState.loading', '加载中...') }}</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const loading = ref(false)
const monthIndex = ref(0)
// 动态生成最近 12 个月选项
const now0 = new Date()
const months = ref(Array.from({ length: 12 }, (_, i) => {
  const d = new Date(now0.getFullYear(), now0.getMonth() - i, 1)
  const label = i === 0 ? '本月' : (i === 1 ? '上月' : `${d.getFullYear()}年${d.getMonth()+1}月`)
  return { label, year: d.getFullYear(), month: d.getMonth() + 1 }
}))
const currentDim = ref('person')
const overview = ref({ total: 0, completed: 0, overdue: 0, badReviews: 0, avgScore: '0.0', onTimeRate: '0%' })
const dimensionData = ref([])
// tab 切换防抖
let _loadReqId = 0

const tabs = [
  { key: 'person', label: '按人', labelKey: 'dashboard.tabPerson' },
  { key: 'module', label: '按模块', labelKey: 'dashboard.tabModule' },
  { key: 'group', label: '按村组', labelKey: 'dashboard.tabGroup' },
  { key: 'overdue', label: '逾期', labelKey: 'dashboard.tabOverdue' },
  { key: 'badReview', label: '差评', labelKey: 'dashboard.tabBadReview' }
]

onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
  loadData()
})
onPullDownRefresh(() => loadData())

async function loadData() {
  if (loading.value) return
  // tab 切换防抖：300ms 内重复请求只执行最后一次
  _loadReqId++
  const myReqId = _loadReqId
  await new Promise(r => setTimeout(r, 300))
  if (myReqId !== _loadReqId) return  // 被后来的请求取代
  loading.value = true

  try {
    // 根据 monthIndex 动态生成 period
    const m = months.value[monthIndex.value]
    const period = `${m.year}-${String(m.month).padStart(2, '0')}`

    const res = await callFunction('getDashboardStats', {
      period: period,
      dimension: currentDim.value
    })
    
    if (res.success) {
      overview.value = res.overview
      dimensionData.value = res.dimensionData
    }
  } catch (err) {
    console.error('加载失败:', err)
  } finally {
    loading.value = false
    uni.stopPullDownRefresh()
  }
}

function onMonthChange(e) {
  monthIndex.value = e.detail.value
  loadData()
}

function switchDim(dim) {
  currentDim.value = dim
  loadData()
}

function goProjection() {
  uni.navigateTo({ url: '/pages/admin/projection' })
}

async function exportReport() {
  uni.showLoading({ title: '导出中...', mask: true })
  try {
    const now = new Date()
    const period = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    const res = await callFunction('exportPerformanceReport', { period })
    
    if (res.success) {
      uni.showModal({
        title: '导出成功',
        content: '报表已生成，是否下载？',
        success(modalRes) {
          if (modalRes.confirm && res.fileID) {
            // #ifdef MP-WEIXIN
            wx.cloud.downloadFile({
              fileID: res.fileID,
              success(dres) {
                wx.openDocument({ filePath: dres.tempFilePath, showMenu: true })
              }
            })
            // #endif
          }
        }
      })
    }
  } catch (err) {
    console.error('导出失败:', err)
  } finally {
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-dashboard {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  
  .date-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $card-gap;
    
    .picker-value {
      padding: $space-md 32rpx;
      background: $white;
      border-radius: $radius-md;
      font-size: $font-body;
      color: $primary;
      font-weight: bold;
      box-shadow: $card-shadow;
    }
    
    .action-btns {
      display: flex;
      gap: 16rpx;
      
      .action-btn {
        padding: $space-md $space-lg;
        background: $primary-light;
        color: $primary;
        border-radius: $radius-md;
        font-size: $font-sub;
      }
    }
  }
  
  .overview-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16rpx;
    margin-bottom: $card-gap;
    
    .overview-item {
      background: $white;
      padding: $card-padding 16rpx;
      border-radius: $card-radius;
      box-shadow: $card-shadow;
      text-align: center;
      
      .ov-num {
        font-size: $font-number;
        color: $primary;
        font-weight: bold;
        display: block;
      }
      
      .ov-label {
        font-size: $font-sub;
        color: $text-sub;
      }
      
      &.success .ov-num { color: $success; }
      &.danger .ov-num { color: $danger; }
      &.gold .ov-num { color: $gold; }
    }
  }
  
  .tab-bar {
    display: flex;
    background: $white;
    padding: $space-xs;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    
    .tab-item {
      flex: 1;
      text-align: center;
      padding: $space-md 0;
      font-size: $font-sub;
      color: $text-sub;
      border-radius: $radius-sm;
      
      &.active {
        color: $white;
        background: $primary;
        font-weight: bold;
      }
    }
  }
  
  .content {
    height: calc(100vh - 480rpx);
  }
  
  .rank-card {
    display: flex;
    align-items: center;
    background: $white;
    padding: $card-padding;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    border-left: 8rpx solid $border;
    
    &.rank-1 { border-left-color: $medal-gold; }
    &.rank-2 { border-left-color: $medal-silver; }
    &.rank-3 { border-left-color: $medal-bronze; }
    
    .rank-num {
      width: 56rpx;
      height: 56rpx;
      line-height: 56rpx;
      text-align: center;
      background: $primary;
      color: $white;
      border-radius: $radius-full;
      font-size: $font-body;
      font-weight: bold;
      margin-right: 16rpx;
      
      .rank-1 & { background: linear-gradient(135deg, #FFD700, #FFA500); }
      .rank-2 & { background: linear-gradient(135deg, #C0C0C0, #A0A0A0); }
      .rank-3 & { background: linear-gradient(135deg, #CD7F32, #8B4513); }
    }
    
    .rank-info {
      flex: 1;
      
      .rank-name {
        font-size: $font-card-title;
        font-weight: bold;
        color: $text-main;
        display: block;
        margin-bottom: 8rpx;
      }
      
      .rank-stats {
        font-size: $font-sub;
        color: $text-sub;
      }
    }
  }
  
  .module-card, .detail-card {
    background: $white;
    padding: $card-padding;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
  }
  
  .detail-card.danger-card {
    border-left: 8rpx solid $danger;
  }
  
  .module-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .mod-name { font-size: $font-card-title; font-weight: bold; color: $text-main; }
    .mod-stats { display: flex; gap: 24rpx; font-size: $font-sub; color: $text-sub;
      .danger-text { color: $danger; font-weight: bold; }
    }
  }
  
  .detail-card {
    .det-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12rpx; }
    .det-name { font-size: $font-card-title; font-weight: bold; color: $text-main; flex: 1; }
    .det-badge { padding: $space-xs $space-md; background: $danger; color: $white; border-radius: $radius-sm; font-size: $font-micro; }
    .det-type { font-size: $font-sub; color: $text-sub; display: block; }
    .det-text { font-size: $font-sub; color: $text-sub; margin-top: 8rpx; font-style: italic; display: block; }
  }
  
  .loading { text-align: center; padding: $card-padding; font-size: $font-sub; color: $text-weak; }
}
</style>
