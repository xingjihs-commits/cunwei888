<!--
  pages/admin/auth-list.vue - 村民注册管理（宽进严管）
  用途：显示所有已注册用户，自动标注状态（正常/待核实/信息不符/重复注册/异常注册），村委可打电话/确认/拉黑
-->
<template>
  <view class="page-auth-list">
    <view class="filter-bar">
      <view
        v-for="f in filters"
        :key="f.value"
        class="filter-item"
        :class="{ active: cur === f.value }"
        @click="cur = f.value"
      >{{ f.label }}</view>
    </view>

    <Skeleton v-if="loading && list.length === 0" type="list" />
    <EmptyState v-else-if="filtered.length === 0" :text="t('emptyState.noData', '暂无用户')" icon="👥" />
    <view v-else>
      <view v-for="item in filtered" :key="item._id" class="card">
        <view class="card-header">
          <text class="user-name">{{ item.realName || t('auth.unfilledName', '未填姓名') }}</text>
          <view class="status-tag" :class="'tag-' + statusKey(item)">{{ statusText(item) }}</view>
        </view>
        <view class="info-row"><text class="label">{{ t('auth.phone', '手机号') }}</text><text class="value">{{ item.phone || '-' }}</text></view>
        <view class="info-row"><text class="label">{{ t('auth.villageGroup', '村组') }}</text><text class="value">{{ item.villageGroup || t('auth.unfilledGroup', '未填村组') }}</text></view>
        <view class="info-row"><text class="label">{{ t('auth.registerTime', '注册时间') }}</text><text class="value">{{ formatDate(item.createTime) }}</text></view>
        <view class="action-row">
          <view class="btn-call" @click="callUser(item)">{{ t('button.call', '打电话') }}</view>
          <view class="btn-ok" @click="onConfirm(item)">{{ t('button.approveUser', '确认') }}</view>
          <view class="btn-block" @click="onBlock(item)">{{ t('button.block', '拉黑') }}</view>
        </view>
      </view>
    </view>

    <view v-if="loadError" class="error-state">
      <text class="error-icon">⚠️</text>
      <text class="error-text">{{ t('emptyState.loadFailed', '加载失败') }}</text>
      <view class="retry-btn" @click="loadData">{{ t('button.reload', '重新加载') }}</view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatDate } from '@/utils/format.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
import Skeleton from '@/components/Skeleton.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useConfigStore } from '@/store/config.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const list = ref([])
const loading = ref(false)
const loadError = ref(false)
const cur = ref('')

const filters = [
  { value: '', label: '全部' },
  { value: '正常', label: '正常' },
  { value: '待核实', label: '待核实' },
  { value: '信息不符', label: '信息不符' },
  { value: '重复注册', label: '重复注册' },
  { value: '异常注册', label: '异常注册' }
]

const phoneCount = computed(() => {
  const m = {}
  for (const u of list.value) {
    if (u.phone) m[u.phone] = (m[u.phone] || 0) + 1
  }
  return m
})

const filtered = computed(() => {
  if (!cur.value) return list.value
  return list.value.filter(u => statusText(u) === cur.value)
})

function statusKey(item) {
  const t = statusText(item)
  if (t === '正常') return 'ok'
  if (t === '待核实') return 'warn'
  if (t === '重复注册') return 'warn'
  if (t === '信息不符') return 'danger'
  return 'danger'
}

function statusText(item) {
  if (item.verifyStatus === '已驳回') return '待核实'
  if (!item.realName || !item.villageGroup) return '异常注册'
  if (!/^1[3-9]\d{9}$/.test(item.phone || '')) return '信息不符'
  if ((phoneCount.value[item.phone] || 0) > 1) return '重复注册'
  return '正常'
}

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
    const res = await callFunction('getUserInfo', { listAll: true })
    if (res.success && res.data) {
      list.value = Array.isArray(res.data) ? res.data : (res.data.list || [])
    }
  } catch (err) {
    console.error('[auth-list 加载失败]:', err)
    loadError.value = true
  } finally {
    loading.value = false
    uni.stopPullDownRefresh && uni.stopPullDownRefresh()
  }
}

function callUser(item) {
  if (!item.phone) {
    uni.showToast({ title: '无手机号', icon: 'none' })
    return
  }
  uni.makePhoneCall({ phoneNumber: item.phone })
}

async function onConfirm(item) {
  uni.showLoading({ title: '处理中...', mask: true })
  try {
    const res = await callFunction('approveUser', { userId: item._id, approved: true })
    if (res.success) {
      uni.showToast({ title: '已确认', icon: 'success' })
      loadData()
    }
  } catch (err) {
    console.error('[确认失败]:', err)
  } finally {
    uni.hideLoading()
  }
}

async function onBlock(item) {
  const reason = await new Promise(resolve => {
    uni.showModal({
      title: '拉黑原因',
      editable: true,
      placeholderText: '请填写原因（选填）',
      success: r => resolve(r.confirm ? (r.content || '') : null)
    })
  })
  if (reason === null) return

  uni.showLoading({ title: '处理中...', mask: true })
  try {
    const res = await callFunction('approveUser', { userId: item._id, approved: false, reason })
    if (res.success) {
      uni.showToast({ title: '已拉黑', icon: 'success' })
      loadData()
    }
  } catch (err) {
    console.error('[拉黑失败]:', err)
  } finally {
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-auth-list {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  box-sizing: border-box;

  .filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 12rpx;
    margin-bottom: $card-gap;

    .filter-item {
      padding: $space-sm $space-lg;
      font-size: $font-sub;
      color: $text-sub;
      background: $white;
      border-radius: $radius-full;
      box-shadow: $card-shadow;

      &.active { color: $white; background: $primary; font-weight: bold; }
    }
  }

  .card {
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16rpx;

      .user-name { font-size: $font-card-title; font-weight: bold; color: $text-main; }
      .status-tag {
        padding: $space-xs $space-md;
        border-radius: $radius-sm;
        font-size: $font-micro;
        &.tag-ok { background: rgba(46,125,50,0.1); color: $success; }
        &.tag-warn { background: rgba(230,81,0,0.1); color: $warning; }
        &.tag-danger { background: rgba(198,40,40,0.1); color: $danger; }
      }
    }

    .info-row {
      display: flex;
      padding: $space-xs 0;
      font-size: $font-sub;
      .label { width: 160rpx; color: $text-sub; }
      .value { flex: 1; color: $text-main; }
    }

    .action-row {
      display: flex;
      gap: 16rpx;
      margin-top: 24rpx;
      padding-top: 16rpx;
      border-top: 2rpx solid $border;

      view {
        flex: 1;
        height: $btn-height;
        line-height: $btn-height;
        text-align: center;
        border-radius: $btn-radius;
        font-size: $font-body;
      }
      .btn-call { border: 2rpx solid $primary; color: $primary; }
      .btn-ok { background: $success; color: $white; }
      .btn-block { background: $danger; color: $white; }
    }
  }

  .error-state {
    text-align: center;
    padding: 200rpx 0;
    .error-icon { display: block; font-size: 80rpx; margin-bottom: 24rpx; }
    .error-text { display: block; font-size: $font-body; color: $text-sub; margin-bottom: 24rpx; }
    .retry-btn { display: inline-block; padding: $space-sm 48rpx; background: $primary; color: $white; border-radius: $btn-radius; font-size: $font-body; }
  }
}
</style>
