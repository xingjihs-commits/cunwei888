<!--
  pages/message/center.vue - 消息中心
  用途：聚合所有通知消息
-->
<template>
  <view class="page-message">
    <view class="header-bar">
      <view class="unread-info">
        <text class="unread-num">{{ unreadCount }}</text>
        <text class="unread-label">条未读</text>
      </view>
      <view v-if="unreadCount > 0" class="read-all-btn" @click="markAllRead">{{ t('button.allRead', '全部已读') }}</view>
    </view>
    
    <view class="filter-bar">
      <view v-for="item in typeFilters" :key="item.value" class="filter-item"
        :class="{ active: currentType === item.value }"
        @click="switchType(item.value)">{{ item.label }}</view>
    </view>
    
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view v-for="msg in list" :key="msg._id" class="msg-card"
        :class="{ unread: !msg.isRead }"
        @click="goDetail(msg)">
        <view class="msg-header">
          <view class="msg-type-icon">{{ typeIcon(msg.type) }}</view>
          <view class="msg-info">
            <text class="msg-title">{{ msg.title }}</text>
            <text class="msg-time">{{ relativeTime(msg.createTime) }}</text>
          </view>
          <view v-if="!msg.isRead" class="unread-dot"></view>
        </view>
        <text class="msg-content">{{ msg.content }}</text>
      </view>
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noMessage', '暂无消息')" icon="🔔" />
      <view v-if="loading" class="loading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { relativeTime } from '@/utils/format.js'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { ensureAuth, AUTH_LOGIN } from '@/utils/auth.js'
import { useConfigStore } from '@/store/config.js'
import { usePagination } from '@/composables/usePagination.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const unreadCount = ref(0)
const currentType = ref('')

const typeFilters = [
  { value: '', label: '全部' },
  { value: 'secretary_reply', label: '书记回信' },
  { value: 'broadcast', label: '广播' },
  { value: 'status_update', label: '工单' },
  { value: 'price_alert', label: '价格' },
  { value: 'new_task', label: '任务' },
  { value: 'elderly_alert', label: '紧急' }
]

const { list, loading, refresh, loadMore } = usePagination(
  async (params) => {
    const res = await callFunction('getMyMessages', { ...params, type: currentType.value })
    if (res && res.success && typeof res.unreadCount === 'number') unreadCount.value = res.unreadCount
    return res
  },
  { pageSize: 20 }
)

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.message', '消息中心') })
  if (ensureAuth(AUTH_LOGIN)) refresh()
})
onShow(() => { if (ensureAuth(AUTH_LOGIN)) refresh() })
onPullDownRefresh(() => refresh())

function switchType(type) { currentType.value = type; refresh() }

function typeIcon(type) {
  const map = {
    secretary_reply: '✉️', broadcast: '📢', status_update: '📋',
    price_alert: '💰', new_task: '📋', elderly_alert: '🚨',
    new_feedback: '📥', overdue_reminder: '⏰'
  }
  return map[type] || '🔔'
}

async function markAllRead() {
  try {
    const res = await callFunction('markMessageRead', { markAll: true })
    if (res.success) {
      list.value.forEach(m => m.isRead = true)
      unreadCount.value = 0
      uni.showToast({ title: t('button.allRead', '全部已读'), icon: 'success' })
    }
  } catch (err) { console.error(err) }
}

async function goDetail(msg) {
  // 标记已读
  if (!msg.isRead) {
    try {
      await callFunction('markMessageRead', { messageIds: [msg._id] })
      msg.isRead = true
      unreadCount.value = Math.max(0, unreadCount.value - 1)
    } catch (err) {}
  }
  
  // 跳转对应详情
  const routes = {
    secretary_reply: `/pages/secretary/mail-detail?mailId=${msg.recordId}`,
    broadcast: `/pages/secretary/broadcast`,
    status_update: `/pages/feedback/detail?recordId=${msg.recordId}`,
    new_task: `/pages/task/detail?taskId=${msg.recordId}`,
    new_feedback: `/pages/admin/feedback-handle?recordId=${msg.recordId}`,
    price_alert: `/pages/market/list`
  }
  
  const route = routes[msg.type]
  if (route) uni.navigateTo({ url: route }).catch(() => {})
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-message { min-height: 100vh; background: $bg;
  .header-bar { display: flex; align-items: center; justify-content: space-between; padding: $space-md $page-padding; background: $white; box-shadow: $card-shadow;
    .unread-info { display: flex; align-items: baseline;
      .unread-num { font-size: $font-number; color: $primary; font-weight: bold; margin-right: 8rpx; }
      .unread-label { font-size: $font-sub; color: $text-sub; } }
    .read-all-btn { padding: $space-sm $space-lg; background: $primary-light; color: $primary; border-radius: $radius-sm; font-size: $font-sub; } }
  .filter-bar { display: flex; overflow-x: auto; background: $white; padding: $space-md $page-padding; box-shadow: $card-shadow; white-space: nowrap;
    .filter-item { padding: $space-sm $space-lg; font-size: $font-sub; color: $text-sub; border-radius: $radius-sm; margin-right: 16rpx; flex-shrink: 0;
      &.active { color: $white; background: $primary; font-weight: bold; } } }
  .list { height: calc(100vh - 340rpx); padding: $page-padding; box-sizing: border-box; }
  .msg-card { background: $white; border-radius: $card-radius; padding: $card-padding; box-shadow: $card-shadow; margin-bottom: $card-gap;
    &.unread { border-left: 8rpx solid $primary; }
    .msg-header { display: flex; align-items: center; margin-bottom: 12rpx;
      .msg-type-icon { font-size: $font-btn; margin-right: 16rpx; }
      .msg-info { flex: 1; }
      .msg-title { font-size: $font-card-title; font-weight: bold; color: $text-main; display: block; }
      .msg-time { font-size: $font-sub; color: $text-weak; }
      .unread-dot { width: 20rpx; height: 20rpx; background: $danger; border-radius: $radius-full; } }
    .msg-content { font-size: $font-body; color: $text-sub; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    &:active { background: $bg; } }
  .loading { text-align: center; padding: $card-padding; font-size: $font-sub; color: $text-weak; } }
</style>
