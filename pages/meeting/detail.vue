<!--
  pages/meeting/detail.vue - 会议详情
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <Skeleton v-if="loading && !meeting.title" type="detail" />
  <view class="page-meeting-detail" v-if="meeting.title">
    <view class="status-banner" :class="'s-' + meeting.status">
      <text>{{ statusText(meeting.status) }}</text>
      <text v-if="meeting.attendance" class="attendance">应到{{ meeting.attendees?.length || 0 }}实到{{ meeting.attendance }}</text>
    </view>
    
    <view class="card">
      <text class="meeting-title">{{ meeting.title }}</text>
      <view class="info-row"><text class="info-label">🕐 {{ t('meeting.time', '时间') }}</text><text class="info-value">{{ formatDate(meeting.meetingTime) }}</text></view>
      <view class="info-row"><text class="info-label">📍 {{ t('meeting.location', '地点') }}</text><text class="info-value">{{ meeting.location }}</text></view>
      <view class="info-row"><text class="info-label">📋 {{ t('meeting.type', '类型') }}</text><text class="info-value">{{ typeText(meeting.type) }}</text></view>
    </view>
    
    <view v-if="meeting.agenda" class="card">
      <view class="card-title">{{ t('meeting.agenda', '会议议程') }}</view>
      <text class="content-text">{{ meeting.agenda }}</text>
    </view>
    
    <view v-if="meeting.attendees && meeting.attendees.length" class="card">
      <view class="card-title">{{ t('meeting.attendees', '参会人员') }}</view>
      <view class="attendee-list">
        <view v-for="(name, i) in meeting.attendees" :key="i" class="attendee-item">
          <view class="attendee-avatar">{{ name.charAt(0) }}</view>
          <text class="attendee-name">{{ name }}</text>
        </view>
      </view>
    </view>

    <view v-if="meeting.minutes" class="card">
      <view class="card-title">{{ t('meeting.minutes', '会议纪要') }}</view>
      <text class="content-text">{{ meeting.minutes }}</text>
      <view v-if="meeting.minutesImages && meeting.minutesImages.length" class="image-grid">
        <image v-for="(img, i) in meeting.minutesImages" :key="i" class="grid-img" :src="img" mode="aspectFill" lazy-load @click="previewImage(i)" />
      </view>
    </view>
    
    <view v-if="meeting.decisions && meeting.decisions.length" class="card">
      <view class="card-title">{{ t('meeting.decisions', '会议决议') }}</view>
      <view v-for="(dec, i) in meeting.decisions" :key="i" class="decision-item">
        <text class="dec-num">{{ i + 1 }}</text>
        <text class="dec-text">{{ dec.content || dec }}</text>
        <view v-if="dec.assignee" class="dec-assignee">{{ t('meeting.assigneeLabel', '责任人') }}：{{ dec.assignee }}</view>
      </view>
    </view>
    
    <view class="report-row" @click="goReport">
      <text>{{ t('meeting.report', '举报此会议') }}</text>
    </view>
  </view>
  <view v-else-if="loadError" class="loading">{{ t('emptyState.loadFailed', '加载失败') }}</view>
  <view v-else-if="!loading" class="loading">{{ t('emptyState.loading', '加载中...') }}</view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatDate } from '@/utils/format.js'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const meeting = ref({})
const meetingId = ref('')
const loadError = ref(false)
const loading = ref(false)

onLoad((options) => { meetingId.value = options.meetingId })
onMounted(() => loadData())

async function loadData() {
  if (!meetingId.value) return
  loadError.value = false
  loading.value = true
  try {
    const res = await callFunction('getMeetingDetail', { meetingId: meetingId.value })
    if (res.success) {
      meeting.value = res.data
    } else {
      loadError.value = true
    }
  } catch (err) {
    console.error('[meeting/detail 加载失败]:', err)
    loadError.value = true
  } finally {
    loading.value = false
  }
}

// 中文 status 与 英文映射（兼容老数据）
function statusText(status) {
  const map = {
    '待召开': '待召开', '进行中': '进行中', '已结束': '已结束', '已取消': '已取消',
    // 兼容老英文
    'scheduled': '待召开', 'holding': '进行中', 'ended': '已结束', 'cancelled': '已取消'
  }
  return map[status] || status
}

function typeText(type) {
  const map = {
    '村委会议': '村委会议', '支部会议': '支部会议', '代表会议': '村民代表大会', '专题会议': '专题会议',
    // 兼容老英文
    'committee': '村委会议', 'party': '支部会议', 'representative': '村民代表大会', 'special': '专题会议'
  }
  return map[type] || type
}

function previewImage(i) {
  uni.previewImage({ urls: meeting.value.minutesImages, current: meeting.value.minutesImages[i] })
}

function goReport() {
  const title = encodeURIComponent(meeting.value.title || '会议内容')
  uni.navigateTo({ url: `/pages/report/index?targetType=meeting&targetId=${meetingId.value}&targetTitle=${title}` })
}
</script>

<style lang="scss" scoped>
.page-meeting-detail {
  min-height: 100vh; background: $bg; padding: $page-padding;
  .status-banner {
    padding: $card-padding; border-radius: $card-radius; text-align: center; margin-bottom: $card-gap;
    background: $primary-light;
    &.s-holding { background: rgba($warning,0.1); }
    &.s-ended { background: rgba($success,0.1); }
    &.s-cancelled { background: rgba($danger,0.1); }
    text { font-size: $font-card-title; font-weight: bold; color: $text-main; }
    .attendance { display: block; font-size: $font-sub; color: $text-sub; margin-top: 8rpx; }
  }
  .card {
    background: $white; border-radius: $card-radius; padding: $card-padding;
    box-shadow: $card-shadow; margin-bottom: $card-gap;
    .meeting-title { font-size: $font-title; font-weight: bold; color: $text-main; display: block; margin-bottom: 24rpx; line-height: 1.4; }
    .info-row { display: flex; padding: $space-sm 0; }
    .info-label { width: 160rpx; font-size: $font-body; color: $text-sub; }
    .info-value { flex: 1; font-size: $font-body; color: $text-main; }
    .card-title { font-size: $font-card-title; font-weight: bold; color: $text-main; border-left: 8rpx solid $primary; padding-left: 16rpx; margin-bottom: 24rpx; }
    .content-text { font-size: $font-body; color: $text-main; line-height: 1.8; white-space: pre-wrap; }
    .image-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12rpx; margin-top: 16rpx; }
    .grid-img { width: 100%; aspect-ratio: 1; border-radius: $radius-md; background: $bg; }
    .attendee-list { display: flex; flex-wrap: wrap; gap: 24rpx; }
    .attendee-item { display: flex; flex-direction: column; align-items: center; width: 120rpx; }
    .attendee-avatar { width: 80rpx; height: 80rpx; border-radius: $radius-full; background: $primary; color: $white; display: flex; align-items: center; justify-content: center; font-size: $font-body; font-weight: bold; margin-bottom: 8rpx; }
    .attendee-name { font-size: $font-sub; color: $text-main; text-align: center; }
    .decision-item { display: flex; align-items: flex-start; padding: $space-md 0; border-bottom: 2rpx solid $border; }
    .decision-item:last-child { border-bottom: none; }
    .dec-num { width: 48rpx; height: 48rpx; line-height: 48rpx; text-align: center; background: $primary; color: $white; border-radius: $radius-full; font-size: $font-sub; font-weight: bold; margin-right: 16rpx; flex-shrink: 0; }
    .dec-text { flex: 1; font-size: $font-body; color: $text-main; line-height: 1.6; }
    .dec-assignee { margin-top: 8rpx; font-size: $font-sub; color: $primary; }
  }
  .loading { text-align: center; padding: 200rpx 0; font-size: $font-body; color: $text-weak; }
  .report-row { text-align: center; padding: $card-padding 0; color: $text-weak; font-size: $font-sub; }
}
</style>
