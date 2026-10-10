<!--
  pages/admin/my-dispatched.vue - 我的派单
  用途：责任人查看分配给自己的工单，作为处理入口
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-dispatched">
    <view class="status-tabs">
      <view v-for="s in statusFilters" :key="s.value" class="tab" :class="{active: currentStatus === s.value}" @tap="onTabChange(s.value)">{{ s.label }}</view>
    </view>

    <Skeleton v-if="loading && list.length === 0" type="list" />
    <view v-else-if="list.length === 0" class="empty">
      <text class="empty-icon">📭</text>
      <text class="empty-text">暂无{{ currentStatus ? statusFilters.find(s=>s.value===currentStatus)?.label : '' }}工单</text>
    </view>

    <view v-else>
      <view v-for="r in list" :key="r._id" class="card" @click="goDetail(r._id)">
        <view class="card-header">
          <view class="status-tag" :class="'s-' + recordStatusClass(r.status)">{{ statusText(r.status) }}</view>
          <text v-if="r.isOverdue" class="overdue-tag">超时{{ r.handleDeadline ? Math.floor((Date.now() - new Date(r.handleDeadline)) / 86400000) : 0 }}天</text>
          <text class="time">{{ relativeTime(r.createTime) }}</text>
        </view>
        <text class="title">{{ r.title || r.content.substring(0, 30) }}</text>
        <view class="meta">
          <text class="type-tag">{{ r.type }}</text>
          <text v-if="r.villageGroup" class="group">{{ r.villageGroup }}</text>
          <text v-if="r.urgentLevel" class="urgent-tag" :class="urgentTagClass(r.urgentLevel)">{{ urgentText(r.urgentLevel) }}</text>
        </view>
        <view v-if="r.handleDeadline" class="deadline">
          处理时限：{{ formatDate(r.handleDeadline) }}
        </view>
      </view>
    </view>

    <view v-if="loadError" class="error-state">
      <text class="error-icon">⚠️</text>
      <text class="error-text">加载失败</text>
      <view class="retry-btn" @click="refresh">{{ t('button.retry', '重新加载') }}</view>
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, onMounted } from 'vue'
import { onPullDownRefresh, onReachBottom, onShow } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatDate, relativeTime, statusText, urgentText, normalizeStatus, urgentTagClass } from '@/utils/format.js'
import Skeleton from '@/components/Skeleton.vue'
import { useUserStore } from '@/store/user.js'
import { useConfigStore } from '@/store/config.js'
import { usePagination } from '@/composables/usePagination.js'
const rootFontSize = useRootFontSize()

const userStore = useUserStore()
const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const loadError = ref(false)
const currentStatus = ref('')

const statusFilters = [
  { value: '', label: '全部' },
  { value: '待处理', label: '待处理' },
  { value: '已派单', label: '已派单' },
  { value: '处理中', label: '处理中' },
  { value: '已完成', label: '已完成' }
]

const { list, loading, refresh, loadMore } = usePagination(
  async (params) => {
    if (!userStore.openid) {
      uni.showToast({ title: '请先登录', icon: 'none' })
      return { data: [], total: 0 }
    }
    loadError.value = false
    try {
      const res = await callFunction('getMyDispatched', { ...params, status: currentStatus.value })
      if (!res || !res.success) loadError.value = true
      return res
    } catch (err) {
      console.error('[my-dispatched 加载失败]:', err)
      loadError.value = true
      throw err
    }
  },
  { pageSize: 20 }
)

onMounted(() => {
  // my-dispatched 是责任人侧入口，要求已登录（不要求管理员）
  if (!userStore.openid) {
    uni.showToast({ title: '请先登录', icon: 'none' })
    setTimeout(() => uni.redirectTo({ url: '/pages/mine/mine' }), 1500)
    return
  }
  refresh()
})
onShow(() => refresh())
onPullDownRefresh(() => refresh())
onReachBottom(() => loadMore())

function onTabChange(status) {
  currentStatus.value = status
  refresh()
}

function recordStatusClass(s) {
  const cn = normalizeStatus(s)
  if (cn === '待处理') return 'pending'
  if (cn === '已派单' || cn === '处理中') return 'processing'
  if (cn === '已完成' || cn === '已评价') return 'completed'
  if (cn === '已驳回') return 'rejected'
  return 'pending'
}

function goDetail(id) {
  uni.navigateTo({ url: `/pages/feedback/detail?recordId=${id}` })
}
</script>

<style lang="scss" scoped>
.page-dispatched { min-height: 100vh; background: $bg;
  .status-tabs { display: flex; background: $white; padding: $space-xs; box-shadow: $card-shadow; overflow-x: auto; white-space: nowrap;
    .tab { padding: $space-md $space-lg; font-size: $font-sub; color: $text-sub; flex-shrink: 0;
      &.active { color: $white; background: $primary; border-radius: $radius-sm; font-weight: bold; }
    }
  }
  .loading, .empty, .error-state { text-align: center; padding: 200rpx 0; color: $text-weak; font-size: $font-body; }
  .empty-icon { display: block; font-size: 80rpx; margin-bottom: 24rpx; }
  .error-state {
    .error-icon { display: block; font-size: 80rpx; margin-bottom: 24rpx; }
    .error-text { display: block; margin-bottom: 24rpx; }
    .retry-btn { display: inline-block; padding: $space-sm 48rpx; background: $primary; color: $white; border-radius: $btn-radius; }
  }
  .card { background: $white; margin: $card-gap $page-padding; padding: $card-padding; border-radius: $card-radius; box-shadow: $card-shadow;
    .card-header { display: flex; align-items: center; gap: 12rpx; margin-bottom: 12rpx;
      .status-tag { padding: $space-xs $space-md; border-radius: $radius-sm; font-size: $font-micro;
        &.s-pending { background: $warning; color: $white; }
        &.s-processing { background: $primary-light; color: $primary; }
        &.s-completed { background: rgba($success,0.1); color: $success; }
        &.s-rejected { background: rgba($danger,0.1); color: $danger; }
      }
      .overdue-tag { padding: $space-xs $space-md; background: rgba($danger,0.1); color: $danger; border-radius: $radius-sm; font-size: $font-micro; font-weight: bold; }
      .time { font-size: $font-micro; color: $text-weak; margin-left: auto; }
    }
    .title { font-size: $font-body; color: $text-main; font-weight: bold; line-height: 1.4; display: block; margin-bottom: 12rpx; }
    .meta { display: flex; gap: 12rpx; flex-wrap: wrap; margin-bottom: 12rpx;
      .type-tag { padding: 2rpx 12rpx; background: $primary-light; color: $primary; border-radius: $radius-sm; font-size: $font-micro; }
      .group { font-size: $font-micro; color: $text-sub; }
      .urgent-tag { padding: 2rpx 12rpx; border-radius: $radius-sm; font-size: $font-micro;
        &.u-normal { background: $bg; color: $text-sub; }
        &.u-urgent { background: rgba($warning,0.1); color: $warning; }
        &.u-critical { background: rgba($danger,0.1); color: $danger; }
      }
    }
    .deadline { font-size: $font-micro; color: $warning; }
  }
}
</style>
