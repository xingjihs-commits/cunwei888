<!--
  pages/vote/list.vue - 一事一议表决
  [暂不使用] V1.7 起从 pages.json 移除路由（代码/云函数保留，恢复只需重新注册路由）
-->
<template>
  <view class="page-vote">
    <view class="filter-bar">
      <view v-for="item in statusFilters" :key="item.value" class="filter-item"
        :class="{ active: currentStatus === item.value }"
        @click="switchStatus(item.value)">{{ t(item.labelKey, item.label) }}</view>
    </view>
    
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view v-for="item in list" :key="item._id" class="vote-card" @click="goDetail(item)">
        <view class="card-header">
          <view class="status-tag" :class="'s-' + item.status">{{ statusText(item.status) }}</view>
          <text class="vote-time">{{ relativeTime(item.createTime) }}</text>
        </view>
        <text class="vote-title">{{ item.title }}</text>
        <text class="vote-desc">{{ item.description }}</text>
        <view class="vote-stats">
          <text>🗳️ {{ item.totalVotes || 0 }}票</text>
          <text v-if="item.deadline">⏰ {{ formatDate(item.deadline, 'MM月DD日 HH:mm') }}{{ t('vote.deadline', '截止') }}</text>
        </view>
      </view>
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noVote', '暂无表决事项')" icon="🗳️" />
      <view v-if="loading" class="loading">{{ t('emptyState.loading', '加载中...') }}</view>
    </scroll-view>
    
    <view v-if="userStore.isAdmin" class="fab" @click="goCreate">
      <text>+</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { relativeTime, formatDate } from '@/utils/format.js'
import { useUserStore } from '@/store/user.js'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'

const userStore = useUserStore()
const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const list = ref([])
const loading = ref(false)
const page = ref(1)
const total = ref(0)
const currentStatus = ref('')

const statusFilters = [
  { value: '', label: '全部', labelKey: 'vote.typeAll' },
  { value: 'open', label: '进行中', labelKey: 'vote.typeOpen' },
  { value: 'closed', label: '已结束', labelKey: 'vote.typeClosed' }
]

onMounted(() => loadData())
onPullDownRefresh(() => { page.value = 1; loadData() })

async function loadData() {
  if (loading.value) return
  loading.value = true
  try {
    const res = await callFunction('getVotes', { page: page.value, pageSize: 20, status: currentStatus.value })
    if (res.success) {
      if (page.value === 1) list.value = res.data
      else list.value = list.value.concat(res.data)
      total.value = res.total
    }
  } catch (err) { console.error(err) }
  finally { loading.value = false; uni.stopPullDownRefresh() }
}

function switchStatus(status) { currentStatus.value = status; page.value = 1; loadData() }
function loadMore() { if (list.value.length < total.value && !loading.value) { page.value++; loadData() } }
function statusText(status) { return (status === '进行中' || status === 'open') ? '进行中' : '已结束' }
function goDetail(item) { uni.navigateTo({ url: `/pages/vote/detail?voteId=${item._id}` }) }
function goCreate() { uni.navigateTo({ url: '/pages/vote/create' }) }
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-vote {
  min-height: 100vh; background: $bg;
  .filter-bar { display: flex; background: $white; padding: $space-md $page-padding; box-shadow: $card-shadow; }
  .filter-item { flex: 1; text-align: center; padding: $space-md 0; font-size: $font-sub; color: $text-sub; border-radius: $radius-sm;
    &.active { color: $primary; font-weight: bold; background: $primary-light; } }
  .list { height: calc(100vh - 120rpx); padding: $page-padding; box-sizing: border-box; }
  .vote-card { background: $white; border-radius: $card-radius; padding: $card-padding; box-shadow: $card-shadow; margin-bottom: $card-gap;
    .card-header { display: flex; justify-content: space-between; margin-bottom: 12rpx; }
    .status-tag { padding: $space-xs $space-md; border-radius: $radius-sm; font-size: $font-micro;
      &.s-open { background: rgba(46,125,50,0.1); color: $success; }
      &.s-closed { background: $border; color: $text-sub; } }
    .vote-time { font-size: $font-sub; color: $text-weak; }
    .vote-title { font-size: $font-card-title; font-weight: bold; color: $text-main; display: block; margin-bottom: 12rpx; }
    .vote-desc { font-size: $font-sub; color: $text-sub; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .vote-stats { display: flex; justify-content: space-between; margin-top: 16rpx; padding-top: 16rpx; border-top: 2rpx solid $border; font-size: $font-sub; color: $text-sub; }
    &:active { background: $bg; } }
  .loading { text-align: center; padding: $card-padding; font-size: $font-sub; color: $text-weak; }
  .fab { position: fixed; right: 32rpx; bottom: 100rpx; width: 100rpx; height: 100rpx; background: $primary; color: $white; border-radius: $radius-full; display: flex; align-items: center; justify-content: center; font-size: 60rpx; box-shadow: 0 4rpx 16rpx rgba(196, 30, 36, 0.4); }
}
</style>
