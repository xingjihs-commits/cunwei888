<!--
  pages/admin/audit-queue.vue - 人工复审队列
  用途：管理员复审机器标记的疑似违规内容
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-audit">
    <view class="notice">
      <text class="notice-icon">ℹ️</text>
      <text class="notice-text">{{ t('tip.auditQueueNote', '系统对疑似违规内容自动入队，请人工判断是否放行或驳回。') }}</text>
    </view>

    <view v-if="loading && list.length === 0" class="loading">{{ t('emptyState.loading', '加载中...') }}</view>
    <view v-else-if="list.length === 0" class="empty">
      <text class="empty-icon">✓</text>
      <text class="empty-text">{{ t('emptyState.noData', '暂无待复审内容') }}</text>
    </view>
    <view v-else>
      <view v-for="a in list" :key="a._id" class="card">
        <view class="card-header">
          <text class="reason">{{ reasonText(a.reason) }}</text>
          <text class="time">{{ formatDate(a.createTime) }}</text>
        </view>
        <view v-if="a.content" class="content">
          <text>{{ a.content }}</text>
        </view>
        <view v-if="a.fileID" class="image-wrap">
          <image :src="a.fileID" mode="aspectFit" class="image" @click="previewImage(a.fileID)" />
        </view>
        <view class="meta">
          <text>{{ t('audit.source', '来源') }}：{{ a.collection || '-' }}</text>
          <text v-if="a.recordId">{{ t('audit.recordId', '记录ID') }}：{{ a.recordId.substring(0, 12) }}...</text>
        </view>
        <view class="action-row">
          <view class="btn-reject" @click="onHandle(a, false)">{{ t('audit.reject', '驳回（违规确认）') }}</view>
          <view class="btn-approve" @click="onHandle(a, true)">{{ t('audit.approve', '放行') }}</view>
        </view>
      </view>
    </view>
    <view v-if="loadError" class="error-state">
      <text class="error-icon">⚠️</text>
      <text class="error-text">{{ t('emptyState.loadFailed', '加载失败') }}</text>
      <view class="retry-btn" @click="loadData">{{ t('button.retry', '重新加载') }}</view>
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatDate } from '@/utils/format.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const list = ref([])
const loading = ref(false)
const loadError = ref(false)

onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
  loadData()
})

onPullDownRefresh(() => loadData())

async function loadData() {
  loading.value = true
  loadError.value = false
  try {
    const res = await callFunction('getAuditQueue', { page: 1, pageSize: 50 })
    if (res.success) {
      list.value = res.data || []
    } else {
      loadError.value = true
    }
  } catch (err) {
    console.error('[audit 加载失败]:', err)
    loadError.value = true
  } finally {
    loading.value = false
    uni.stopPullDownRefresh && uni.stopPullDownRefresh()
  }
}

function reasonText(reason) {
  const map = {
    'text_review': '文本疑似违规（机器判断）',
    'text_api_error': '文本安全API调用失败（需人工确认）',
    'image_review': '图片疑似违规（机器判断）',
    'image_api_error': '图片安全API调用失败（需人工确认）'
  }
  return map[reason] || reason || '待复审'
}

function previewImage(url) {
  uni.previewImage({ urls: [url], current: url })
}

async function onHandle(item, passed) {
  const ok = await new Promise(resolve => {
    uni.showModal({
      title: passed ? '放行确认' : '驳回确认',
      content: passed ? '确认此内容不违规，允许公开展示？' : '确认此内容违规，驳回并标记？',
      success: r => resolve(r.confirm)
    })
  })
  if (!ok) return

  uni.showLoading({ title: '处理中...', mask: true })
  try {
    const res = await callFunction('reviewContent', {
      queueId: item._id,
      recordId: item.recordId || '',
      passed: passed,
      reason: '人工复审'
    })
    if (res.success) {
      uni.showToast({ title: passed ? '已放行' : '已驳回', icon: 'success' })
      loadData()
    } else {
      uni.showToast({ title: res.message || '操作失败', icon: 'none' })
    }
  } catch (err) {
    console.error('[复审失败]:', err)
  } finally {
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
.page-audit { min-height: 100vh; background: $bg; padding: $page-padding;
  .notice { display: flex; align-items: flex-start; background: rgba($warning,0.08); border-left: 6rpx solid $warning; padding: $card-padding; border-radius: $radius-sm; margin-bottom: $card-gap;
    .notice-icon { font-size: $font-body; margin-right: 12rpx; }
    .notice-text { flex: 1; font-size: $font-sub; color: $text-sub; line-height: 1.5; }
  }
  .loading, .empty, .error-state { text-align: center; padding: 200rpx 0; color: $text-weak; font-size: $font-body; }
  .empty-icon { display: block; font-size: 80rpx; color: $success; margin-bottom: 24rpx; }
  .error-state {
    .error-icon { display: block; font-size: 80rpx; margin-bottom: 24rpx; }
    .error-text { display: block; margin-bottom: 24rpx; }
    .retry-btn { display: inline-block; padding: $space-sm 48rpx; background: $primary; color: $white; border-radius: $btn-radius; }
  }
  .card { background: $white; border-radius: $card-radius; padding: $card-padding; box-shadow: $card-shadow; margin-bottom: $card-gap;
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16rpx;
      .reason { font-size: $font-body; font-weight: bold; color: $warning; flex: 1; }
      .time { font-size: $font-micro; color: $text-weak; }
    }
    .content { background: $bg; padding: $card-padding; border-radius: $radius-sm; margin-bottom: 16rpx; font-size: $font-body; color: $text-main; line-height: 1.6; }
    .image-wrap { margin-bottom: 16rpx;
      .image { width: 100%; max-height: 400rpx; border-radius: $radius-sm; }
    }
    .meta { font-size: $font-micro; color: $text-weak; display: flex; gap: 16rpx; margin-bottom: 16rpx; }
    .action-row { display: flex; gap: 16rpx; padding-top: 16rpx; border-top: 2rpx solid $border;
      .btn-reject { flex: 1; height: $btn-height; line-height: $btn-height; text-align: center; border: 2rpx solid $danger; color: $danger; border-radius: $btn-radius; font-size: $font-body; }
      .btn-approve { flex: 1; height: $btn-height; line-height: $btn-height; text-align: center; background: $success; color: $white; border-radius: $btn-radius; font-size: $font-body; }
    }
  }
}
</style>
