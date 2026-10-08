<!--
  pages/admin/secret-list.vue - 亲阅件列表
  用途：书记查看所有标记为亲阅的工单
-->
<template>
  <view class="page-secret">
    <view class="filter-bar">
      <view 
        v-for="item in statusFilters" 
        :key="item.value"
        class="filter-item"
        :class="{ active: currentStatus === item.value }"
        @click="switchStatus(item.value)"
      >{{ item.label }}</view>
    </view>
    
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view v-for="item in list" :key="item._id" class="secret-card" @click="goDetail(item)">
        <view class="card-header">
          <view class="secret-tag">🔒 亲阅件</view>
          <StatusTag :text="statusText(item.status)" :type="statusColor(item.status)" dot />
        </view>
        <text class="card-title">{{ item.title }}</text>
        <text class="card-content">{{ item.content }}</text>
        <view class="card-footer">
          <text class="footer-time">{{ relativeTime(item.createTime) }}</text>
          <text class="footer-type">{{ item.type }}</text>
        </view>
      </view>
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noData', '暂无亲阅件')" icon="🔒" />
      <view v-if="loading" class="loading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { relativeTime, statusText, statusColor } from '@/utils/format.js'
import StatusTag from '@/components/StatusTag.vue'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const list = ref([])
const loading = ref(false)
const page = ref(1)
const total = ref(0)
const currentStatus = ref('')

const statusFilters = [
  { value: '', label: '全部' },
  { value: '处理中', label: '处理中' },
  { value: '已完成', label: '已完成' }
]

onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
  loadData()
})
onShow(() => { page.value = 1; loadData() })
onPullDownRefresh(() => { page.value = 1; loadData() })

async function loadData() {
  if (loading.value) return
  loading.value = true
  
  try {
    // 查询所有亲阅件
    const res = await callFunction('getFeedbackList', {
      page: page.value,
      pageSize: 20,
      status: currentStatus.value
    })
    
    if (res.success) {
      // 客户端过滤亲阅件
      const filtered = res.data.filter(r => r.isSecret)
      if (page.value === 1) {
        list.value = filtered
      } else {
        list.value = list.value.concat(filtered)
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

function switchStatus(status) {
  currentStatus.value = status
  page.value = 1
  loadData()
}

function loadMore() {
  if (list.value.length < total.value && !loading.value) {
    page.value++
    loadData()
  }
}

function goDetail(item) {
  uni.navigateTo({ url: `/pages/feedback/detail?recordId=${item._id}` })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-secret {
  min-height: 100vh;
  background: $bg;
  
  .filter-bar {
    display: flex;
    background: $white;
    padding: $space-md $page-padding;
    box-shadow: $card-shadow;
    
    .filter-item {
      flex: 1;
      text-align: center;
      padding: $space-md 0;
      font-size: $font-sub;
      color: $text-sub;
      border-radius: $radius-sm;
      
      &.active {
        color: $primary;
        font-weight: bold;
        background: $primary-light;
      }
    }
  }
  
  .list {
    height: calc(100vh - 120rpx);
    padding: $page-padding;
    box-sizing: border-box;
  }
  
  .secret-card {
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    border-left: 8rpx solid $primary;
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12rpx;
      
      .secret-tag {
        padding: $space-xs $space-md;
        background: $primary-light;
        color: $primary;
        border-radius: $radius-sm;
        font-size: $font-micro;
      }
    }
    
    .card-title {
      font-size: $font-card-title;
      font-weight: bold;
      color: $text-main;
      display: block;
      margin-bottom: 12rpx;
    }
    
    .card-content {
      font-size: $font-sub;
      color: $text-sub;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16rpx;
      margin-top: 16rpx;
      border-top: 2rpx solid $border;
      
      .footer-time {
        font-size: $font-sub;
        color: $text-weak;
      }
      
      .footer-type {
        font-size: $font-sub;
        color: $primary;
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
