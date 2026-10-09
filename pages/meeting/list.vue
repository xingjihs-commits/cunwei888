<!--
  pages/meeting/list.vue - 会议列表
  用途：村务会议公示、纪要查看
-->
<template>
  <view class="page-meeting">
    <view class="filter-bar">
      <view v-for="item in typeFilters" :key="item.value" class="filter-item"
        :class="{ active: currentType === item.value }"
        @click="switchType(item.value)">{{ t(item.labelKey, item.label) }}</view>
    </view>
    
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view v-for="item in list" :key="item._id" class="meeting-card" @click="goDetail(item)">
        <view class="card-header">
          <view class="type-tag" :class="'t-' + item.type">{{ typeText(item.type) }}</view>
          <view v-if="(item.status === '已结束' || item.status === 'ended')" class="status-tag ended">{{ t('meeting.meetingEnded', '已结束') }}</view>
          <view v-else-if="(item.status === '进行中' || item.status === 'holding')" class="status-tag holding">{{ t('meeting.meetingHolding', '进行中') }}</view>
          <view v-else class="status-tag">{{ t('meeting.meetingScheduled', '待召开') }}</view>
        </view>
        <text class="meeting-title">{{ item.title }}</text>
        <view class="meeting-info">
          <text class="info-item">🕐 {{ formatDate(item.meetingTime, 'MM月DD日 HH:mm') }}</text>
          <text class="info-item">📍 {{ item.location }}</text>
        </view>
        <view v-if="item.attendees && item.attendees.length" class="attendees">
          参会：{{ item.attendees.length }}人
        </view>
        <view v-if="item.minutes" class="has-minutes">✓ {{ t('meeting.hasMinutes', '已出纪要') }}</view>
      </view>
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noData', '暂无会议')" icon="📋" />
      <view v-if="loading" class="loading">{{ t('emptyState.loading', '加载中...') }}</view>
    </scroll-view>
    
    <view v-if="userStore.isAdmin" class="fab" @click="goCreate">
      <text>+</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatDate } from '@/utils/format.js'
import { useUserStore } from '@/store/user.js'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'
import { usePagination } from '@/composables/usePagination.js'

const userStore = useUserStore()
const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const currentType = ref('')

const typeFilters = [
  { value: '', label: '全部', labelKey: 'meeting.typeAll' },
  { value: 'committee', label: '村两委', labelKey: 'meeting.typeCommittee' },
  { value: 'party', label: '党员大会', labelKey: 'meeting.typeParty' },
  { value: 'representative', label: '村民代表', labelKey: 'meeting.typeRepresentative' },
  { value: 'special', label: '专题会', labelKey: 'meeting.typeSpecial' }
]

const { list, loading, refresh, loadMore } = usePagination(
  (params) => callFunction('getMeetings', { ...params, type: currentType.value }),
  { pageSize: 20 }
)

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.meeting', '村务会议') })
  refresh()
})
onShow(() => refresh())
onPullDownRefresh(() => refresh())

function switchType(type) {
  currentType.value = type
  refresh()
}

function typeText(type) {
  const map = { committee: '村两委', party: '党员', representative: '代表', special: '专题' }
  return map[type] || type
}

function goDetail(item) {
  uni.navigateTo({ url: `/pages/meeting/detail?meetingId=${item._id}` })
}

function goCreate() {
  uni.navigateTo({ url: '/pages/meeting/create' })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-meeting {
  min-height: 100vh; background: $bg;
  .filter-bar {
    display: flex; background: $white; padding: $space-md $page-padding; box-shadow: $card-shadow;
    .filter-item {
      flex: 1; text-align: center; padding: $space-md 0; font-size: $font-sub;
      color: $text-sub; border-radius: $radius-sm;
      &.active { color: $primary; font-weight: bold; background: $primary-light; }
    }
  }
  .list { height: calc(100vh - 120rpx); padding: $page-padding; box-sizing: border-box; }
  .meeting-card {
    background: $white; border-radius: $card-radius; padding: $card-padding;
    box-shadow: $card-shadow; margin-bottom: $card-gap;
    .card-header { display: flex; justify-content: space-between; margin-bottom: 12rpx; }
    .type-tag {
      padding: $space-xs $space-md; border-radius: $radius-sm; font-size: $font-micro;
      background: $primary-light; color: $primary;
      &.t-party { background: rgba(196,30,36,0.15); }
      &.t-representative { background: $gold-light; color: $gold; }
      &.t-special { background: rgba(46,125,50,0.1); color: $success; }
    }
    .status-tag {
      padding: $space-xs $space-md; border-radius: $radius-sm; font-size: $font-micro;
      background: $bg; color: $text-sub;
      &.holding { background: rgba(230,81,0,0.1); color: $warning; }
      &.ended { background: rgba(46,125,50,0.1); color: $success; }
    }
    .meeting-title { font-size: $font-card-title; font-weight: bold; color: $text-main; display: block; margin-bottom: 12rpx; line-height: 1.4; }
    .meeting-info { display: flex; flex-direction: column; gap: 8rpx; }
    .info-item { font-size: $font-sub; color: $text-sub; }
    .attendees { margin-top: 12rpx; font-size: $font-sub; color: $primary; }
    .has-minutes { margin-top: 8rpx; font-size: $font-sub; color: $success; }
    &:active { background: $bg; }
  }
  .loading { text-align: center; padding: $card-padding; font-size: $font-sub; color: $text-weak; }
  .fab {
    position: fixed; right: 32rpx; bottom: 100rpx;
    width: 100rpx; height: 100rpx;
    background: $primary; color: $white;
    border-radius: $radius-full; display: flex; align-items: center; justify-content: center;
    font-size: 60rpx; box-shadow: 0 4rpx 16rpx rgba(196, 30, 36, 0.4);
  }
}
</style>
