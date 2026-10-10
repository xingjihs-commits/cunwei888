<!--
  pages/admin/secretary-mails.vue - 书记信箱管理列表
  用途：书记查看所有信箱来信，按状态筛选
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-mails">
    <view class="status-tabs">
      <view v-for="s in statusFilters" :key="s.value" class="tab" :class="{active: currentStatus === s.value}" @tap="onTabChange(s.value)">{{ s.label }}</view>
    </view>

    <Skeleton v-if="loading && list.length === 0" type="list" />
    <view v-else-if="list.length === 0" class="empty">
      <text class="empty-icon">📭</text>
      <text class="empty-text">{{ t('emptyState.noData', '暂无信件') }}</text>
    </view>
    <view v-else>
      <view v-for="m in list" :key="m._id" class="card" @click="goDetail(m._id)">
        <view class="card-header">
          <text class="mail-subject">{{ m.subject || t('emptyState.noSubject', '无主题') }}</text>
          <text v-if="m.isAnonymous" class="anonymous-tag">匿名</text>
          <view class="status-tag" :class="'s-' + mailStatusClass(m.status)">{{ mailStatusText(m.status) }}</view>
        </view>
        <text class="mail-content">{{ m.content.substring(0, 80) }}{{ m.content.length > 80 ? '...' : '' }}</text>
        <view class="card-footer">
          <text class="time">{{ relativeTime(m.createTime) }}</text>
          <text v-if="m.urgentLevel" class="urgent-tag" :class="urgentTagClass(m.urgentLevel)">{{ urgentText(m.urgentLevel) }}</text>
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
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { relativeTime, urgentText, normalizeStatus, urgentTagClass } from '@/utils/format.js'
import Skeleton from '@/components/Skeleton.vue'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
import { useConfigStore } from '@/store/config.js'
import { usePagination } from '@/composables/usePagination.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const loadError = ref(false)
const currentStatus = ref('')

const statusFilters = [
  { value: '', label: '全部' },
  { value: '待处理', label: '待处理' },
  { value: '已查阅', label: '已查阅' },
  { value: '已回复', label: '已回复' },
  { value: '已关闭', label: '已关闭' }
]

const { list, loading, refresh, loadMore } = usePagination(
  async (params) => {
    loadError.value = false
    try {
      const res = await callFunction('getSecretaryMails', { ...params, status: currentStatus.value })
      if (!res || !res.success) loadError.value = true
      return res
    } catch (err) {
      console.error('[secretary-mails 加载失败]:', err)
      loadError.value = true
      throw err
    }
  },
  { pageSize: 20 }
)

onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
  refresh()
})

onPullDownRefresh(() => refresh())
onReachBottom(() => loadMore())

function onTabChange(status) {
  currentStatus.value = status
  refresh()
}

function mailStatusText(s) { return normalizeStatus(s) || s }
function mailStatusClass(s) {
  const cn = normalizeStatus(s)
  if (cn === '待处理') return 'pending'
  if (cn === '已查阅') return 'read'
  if (cn === '已回复') return 'replied'
  return 'closed'
}

function goDetail(id) {
  uni.navigateTo({ url: `/pages/admin/mail-detail?id=${id}` })
}
</script>

<style lang="scss" scoped>
.page-mails { min-height: 100vh; background: $bg;
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
    .card-header { display: flex; align-items: center; margin-bottom: 16rpx;
      .mail-subject { flex: 1; font-size: $font-card-title; font-weight: bold; color: $text-main; }
      .anonymous-tag { padding: $space-xs $space-sm; background: $bg; color: $text-sub; border-radius: $radius-sm; font-size: $font-micro; margin-right: 12rpx; }
      .status-tag { padding: $space-xs $space-md; border-radius: $radius-sm; font-size: $font-micro;
        &.s-pending { background: $warning; color: $white; }
        &.s-read { background: $primary-light; color: $primary; }
        &.s-replied { background: rgba($success,0.1); color: $success; }
        &.s-closed { background: $border; color: $text-weak; }
      }
    }
    .mail-content { font-size: $font-body; color: $text-sub; line-height: 1.6; display: block; margin-bottom: 16rpx; }
    .card-footer { display: flex; justify-content: space-between; align-items: center;
      .time { font-size: $font-micro; color: $text-weak; }
      .urgent-tag { padding: $space-xs $space-md; border-radius: $radius-sm; font-size: $font-micro;
        &.u-normal { background: $bg; color: $text-sub; }
        &.u-urgent { background: rgba($warning,0.1); color: $warning; }
        &.u-critical { background: rgba($danger,0.1); color: $danger; }
      }
    }
  }
}
</style>
