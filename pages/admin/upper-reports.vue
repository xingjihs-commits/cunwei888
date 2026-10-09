<!--
  pages/admin/upper-reports.vue - 对上汇报列表
  用途：查看历史对上汇报报表，可生成新报表
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-reports">
    <view class="header-card">
      <text class="header-title">对上汇报报表</text>
      <text class="header-sub">按月汇总工单、公示、任务完成情况</text>
      <view class="generate-btn" @click="onGenerate">生成本月报表</view>
    </view>

    <view v-if="loading && list.length === 0" class="loading">加载中...</view>
    <view v-else-if="list.length === 0" class="empty">
      <text class="empty-icon">📊</text>
      <text class="empty-text">{{ t('emptyState.noData', '暂无报表') }}</text>
    </view>
    <view v-else>
      <view v-for="r in list" :key="r._id" class="card">
        <view class="card-header">
          <text class="period">{{ r.year }}年{{ r.month }}月{{ r.type }}</text>
          <text class="village">{{ r.villageName }}</text>
        </view>
        <view class="stats-grid">
          <view class="stat">
            <text class="num">{{ r.summary.feedback.total }}</text>
            <text class="label">工单总数</text>
          </view>
          <view class="stat">
            <text class="num">{{ r.summary.feedback.completed }}</text>
            <text class="label">已完成</text>
          </view>
          <view class="stat">
            <text class="num">{{ r.summary.feedback.onTimeRate }}%</text>
            <text class="label">按时率</text>
          </view>
          <view class="stat">
            <text class="num">{{ r.summary.feedback.avgSatisfaction }}</text>
            <text class="label">满意度</text>
          </view>
        </view>
        <text class="gen-time">生成时间：{{ formatDate(r.createTime) }}</text>
      </view>
    </view>
    <view v-if="loadError" class="error-state">
      <text class="error-icon">⚠️</text>
      <text class="error-text">加载失败</text>
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
    const res = await callFunction('getUpperReports', { pageSize: 50 })
    if (res.success) {
      list.value = res.data || []
    } else {
      loadError.value = true
    }
  } catch (err) {
    console.error('[upper-reports 加载失败]:', err)
    loadError.value = true
  } finally {
    loading.value = false
    uni.stopPullDownRefresh && uni.stopPullDownRefresh()
  }
}

async function onGenerate() {
  const ok = await new Promise(resolve => {
    uni.showModal({ title: '生成报表', content: '是否生成本月对上汇报报表？', success: r => resolve(r.confirm) })
  })
  if (!ok) return
  uni.showLoading({ title: '生成中...', mask: true })
  try {
    const res = await callFunction('generateUpperReport', {})
    if (res.success) {
      uni.showModal({
        title: '生成成功',
        content: `本月统计：\n工单总数 ${res.data.summary.feedback.total} 条\n按时办结率 ${res.data.summary.feedback.onTimeRate}%\n满意度 ${res.data.summary.feedback.avgSatisfaction}分\n新闻 ${res.data.summary.publicity.newsCount} 条\n公示 ${res.data.summary.publicity.noticeCount} 条\n任务完成 ${res.data.summary.task.completed}/${res.data.summary.task.total}`,
        showCancel: false
      })
      loadData()
    }
  } catch (err) {
    console.error('[生成失败]:', err)
  } finally {
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
.page-reports { min-height: 100vh; background: $bg; padding: $page-padding;
  .header-card { background: linear-gradient(135deg, $primary, $primary-dark); color: $white; padding: $card-padding; border-radius: $card-radius; margin-bottom: $card-gap;
    .header-title { font-size: $font-title; font-weight: bold; display: block; margin-bottom: 8rpx; }
    .header-sub { font-size: $font-sub; opacity: 0.9; display: block; margin-bottom: 24rpx; }
    .generate-btn { display: inline-block; padding: $space-sm $space-xl; background: $white; color: $primary; border-radius: $btn-radius; font-size: $font-body; font-weight: bold; }
  }
  .loading, .empty, .error-state { text-align: center; padding: 200rpx 0; color: $text-weak; font-size: $font-body; }
  .empty-icon { display: block; font-size: 80rpx; margin-bottom: 24rpx; }
  .error-state {
    .error-icon { display: block; font-size: 80rpx; margin-bottom: 24rpx; }
    .error-text { display: block; margin-bottom: 24rpx; }
    .retry-btn { display: inline-block; padding: $space-sm 48rpx; background: $primary; color: $white; border-radius: $btn-radius; }
  }
  .card { background: $white; border-radius: $card-radius; padding: $card-padding; box-shadow: $card-shadow; margin-bottom: $card-gap;
    .card-header { display: flex; justify-content: space-between; margin-bottom: 16rpx;
      .period { font-size: $font-card-title; font-weight: bold; color: $text-main; }
      .village { font-size: $font-sub; color: $primary; }
    }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16rpx; padding: $card-padding 0;
      .stat { text-align: center;
        .num { font-size: $font-large-number; color: $primary; font-weight: bold; display: block; }
        .label { font-size: $font-micro; color: $text-sub; }
      }
    }
    .gen-time { font-size: $font-micro; color: $text-weak; display: block; }
  }
}
</style>
