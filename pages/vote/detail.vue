<!--
  pages/vote/detail.vue - 表决详情+投票
  [暂不使用] V1.7 起从 pages.json 移除路由（代码/云函数保留，恢复只需重新注册路由）
-->
<template>
  <view class="page-vote-detail" v-if="vote.title">
    <view class="status-banner" :class="'s-' + voteStatusClass">
      <text>{{ statusText(vote.status) }}</text>
      <text v-if="vote.deadline" class="deadline">{{ t('vote.deadline', '截止') }}：{{ formatDate(vote.deadline) }}</text>
    </view>
    
    <view class="card">
      <text class="vote-title">{{ vote.title }}</text>
      <text class="vote-desc">{{ vote.description }}</text>
    </view>
    
    <view class="card">
      <view class="card-title">{{ t('vote.optionsLabel', '投票选项') }}</view>
      <view v-if="isVoteOpen && !vote.myVote" class="vote-options">
        <view v-for="opt in vote.options" :key="opt.key" class="opt-item"
          :class="{ selected: selectedKey === opt.key }"
          @click="selectedKey = opt.key">
          <view class="opt-radio">
            <view v-if="selectedKey === opt.key" class="radio-dot"></view>
          </view>
          <text class="opt-label">{{ opt.label }}</text>
        </view>
      </view>
      
      <view v-else class="vote-results">
        <view v-for="opt in vote.options" :key="opt.key" class="result-item">
          <view class="result-header">
            <text class="result-label">{{ opt.label }}</text>
            <text class="result-count">{{ opt.count }}票 ({{ percent(opt) }}%)</text>
          </view>
          <view class="result-bar">
            <view class="result-inner" :style="{ width: percent(opt) + '%' }"></view>
          </view>
          <view v-if="vote.myVote === opt.key" class="my-vote">✓ {{ t('vote.myVote', '我的票') }}</view>
        </view>
      </view>
    </view>
    
    <view class="card stats-card">
      <view class="stat-row">
        <text class="stat-num">{{ vote.totalVotes || 0 }}</text>
        <text class="stat-label">{{ t('vote.totalVotes', '总票数') }}</text>
      </view>
      <view class="stat-row">
        <text class="stat-num">{{ vote.options?.length || 0 }}</text>
        <text class="stat-label">{{ t('vote.optionCount', '选项数') }}</text>
      </view>
    </view>
    
    <view class="report-row" @click="goReport">
      <text>{{ t('vote.report', '举报此表决') }}</text>
    </view>
    
    <view v-if="isVoteOpen && !vote.myVote" class="bottom-bar">
      <BigButton :text="t('button.submitVote', '提交投票')" type="primary" @click="submitVote" :disabled="!selectedKey" />
    </view>
  </view>
  <view v-else-if="loadError" class="error-state">
    <text class="error-icon">⚠️</text>
    <text class="error-text">{{ t('emptyState.loadFailed', '加载失败') }}</text>
    <view class="retry-btn" @click="loadData">{{ t('button.reload', '重新加载') }}</view>
  </view>
  <view v-else class="loading">{{ t('emptyState.loading', '加载中...') }}</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { callFunction, acquireLock, releaseLock } from '@/utils/request.js'
import { requestSubscribe } from '@/utils/subscribe.js'
import { formatDate } from '@/utils/format.js'
import BigButton from '@/components/BigButton.vue'
import { useConfigStore } from '@/store/config.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const vote = ref({})
const voteId = ref('')
const selectedKey = ref('')
const loadError = ref(false)

const isVoteOpen = computed(() => vote.value.status === '进行中' || vote.value.status === 'open')
const voteStatusClass = computed(() => isVoteOpen.value ? 'open' : 'closed')

onLoad((options) => { voteId.value = options.voteId })
onMounted(() => loadData())

async function loadData() {
  if (!voteId.value) return
  loadError.value = false
  try {
    const res = await callFunction('getVoteDetail', { voteId: voteId.value })
    if (res.success) {
      vote.value = res.data
    } else {
      loadError.value = true
    }
  } catch (err) {
    console.error('[vote/detail 加载失败]:', err)
    loadError.value = true
  }
}

function statusText(status) {
  return (status === '进行中' || status === 'open') ? '进行中' : '已结束'
}
function percent(opt) {
  const total = vote.value.totalVotes || 0
  if (total === 0) return 0
  return Math.round((opt.count / total) * 100)
}

function goReport() {
  const title = encodeURIComponent(vote.value.title || '表决内容')
  uni.navigateTo({ url: `/pages/report/index?targetType=vote&targetId=${voteId.value}&targetTitle=${title}` })
}

async function submitVote() {
  requestSubscribe([configStore.subscribeTemplates && configStore.subscribeTemplates.status_update])
  if (!selectedKey.value) return
  if (!acquireLock('submitVote', 10000)) {
    uni.showToast({ title: '请勿重复', icon: 'none' })
    return
  }
  
  // 乐观更新：先改 UI，失败回滚
  const prevKey = vote.value.myVote
  const prevTotal = vote.value.totalVotes || 0
  const opt = vote.value.options.find(o => o.key === selectedKey.value)
  const prevCount = opt ? (opt.count || 0) : 0
  const prevVoters = opt && opt.voters ? opt.voters.slice() : null
  if (opt) {
    opt.count = prevCount + 1
    if (!opt.voters) opt.voters = []
    opt.voters.push('self')
  }
  vote.value.totalVotes = prevTotal + 1
  vote.value.myVote = selectedKey.value

  uni.showLoading({ title: '投票中...', mask: true })
  try {
    const res = await callFunction('submitVote', { voteId: voteId.value, optionKey: selectedKey.value })
    if (res.success) {
      uni.showToast({ title: '投票成功', icon: 'success' })
      // 0.5s 后台刷新拿最新数据
      setTimeout(() => loadData(), 500)
    } else {
      throw new Error(res.message || '投票失败')
    }
  } catch (err) {
    // 回滚到操作前状态
    if (opt) {
      opt.count = prevCount
      opt.voters = prevVoters || []
    }
    vote.value.totalVotes = prevTotal
    vote.value.myVote = prevKey
    uni.showToast({ title: '投票失败，请重试', icon: 'none' })
    console.error(err)
  } finally {
    releaseLock('submitVote')
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-vote-detail { min-height: 100vh; background: $bg; padding: $page-padding; padding-bottom: 200rpx;
  .status-banner { padding: $card-padding; border-radius: $card-radius; text-align: center; margin-bottom: $card-gap;
    &.s-open { background: rgba(46,125,50,0.1); }
    &.s-closed { background: rgba(189,189,189,0.2); }
    text { font-size: $font-card-title; font-weight: bold; color: $text-main; }
    .deadline { display: block; font-size: $font-sub; color: $text-sub; margin-top: 8rpx; } }
  .card { background: $white; border-radius: $card-radius; padding: $card-padding; box-shadow: $card-shadow; margin-bottom: $card-gap;
    .vote-title { font-size: $font-title; font-weight: bold; color: $text-main; display: block; margin-bottom: 16rpx; line-height: 1.4; }
    .vote-desc { font-size: $font-body; color: $text-main; line-height: 1.8; white-space: pre-wrap; }
    .card-title { font-size: $font-card-title; font-weight: bold; color: $text-main; border-left: 8rpx solid $primary; padding-left: 16rpx; margin-bottom: 24rpx; }
    .vote-options { display: flex; flex-direction: column; gap: 16rpx; }
    .opt-item { display: flex; align-items: center; padding: $card-padding; background: $bg; border: 4rpx solid transparent; border-radius: $radius-md;
      &.selected { border-color: $primary; background: $primary-light; }
      .opt-radio { width: 40rpx; height: 40rpx; border: 4rpx solid $text-sub; border-radius: $radius-full; margin-right: 16rpx; display: flex; align-items: center; justify-content: center;
        .radio-dot { width: 20rpx; height: 20rpx; background: $primary; border-radius: $radius-full; } }
      .opt-label { font-size: $font-body; color: $text-main; }
      &:active { opacity: 0.8; } }
    .vote-results { display: flex; flex-direction: column; gap: 24rpx; }
    .result-item { position: relative; }
    .result-header { display: flex; justify-content: space-between; margin-bottom: 8rpx;
      .result-label { font-size: $font-body; color: $text-main; font-weight: bold; }
      .result-count { font-size: $font-sub; color: $primary; } }
    .result-bar { height: 24rpx; background: $border; border-radius: $radius-md; overflow: hidden;
      .result-inner { height: 100%; background: linear-gradient(90deg, $primary, $gold); border-radius: $radius-md; transition: width 0.5s; } }
    .my-vote { margin-top: 8rpx; font-size: $font-sub; color: $primary; font-weight: bold; } }
  .stats-card { display: flex; padding: $card-padding;
    .stat-row { flex: 1; text-align: center;
      .stat-num { font-size: $font-number; color: $primary; font-weight: bold; display: block; }
      .stat-label { font-size: $font-sub; color: $text-sub; } } }
  .loading { text-align: center; padding: 200rpx 0; font-size: $font-body; color: $text-weak; }
  .bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; padding: $card-gap $page-padding; padding-bottom: calc(#{$card-gap} + env(safe-area-inset-bottom)); background: $white; box-shadow: $shadow-top; }
  .report-row { text-align: center; padding: $card-padding 0; color: $text-weak; font-size: $font-sub; }
  .error-state { text-align: center; padding: 200rpx 0;
    .error-icon { display: block; font-size: 80rpx; margin-bottom: 24rpx; }
    .error-text { display: block; font-size: $font-body; color: $text-sub; margin-bottom: 24rpx; }
    .retry-btn { display: inline-block; padding: $space-sm 48rpx; background: $primary; color: $white; border-radius: $btn-radius; font-size: $font-body; } } }
</style>
