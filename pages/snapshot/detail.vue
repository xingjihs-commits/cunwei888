<!--
  pages/snapshot/detail.vue - 随手拍详情
  用途：查看随手拍详情，可点赞
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <Skeleton v-if="loading && !record.title" type="detail" />
  <view class="page-detail" v-if="record.title">
    <view class="status-banner" :class="'status-' + recordStatusClass">
      <text>{{ statusText(record.status) }}</text>
      <text v-if="record.isOverdue" class="overdue-tip">{{ t('status.overdue', '已超时') }}</text>
    </view>
    
    <view class="card">
      <view class="card-header">
        <view class="type-tag">{{ configStore.getSnapshotType(record.type) }}</view>
        <text class="time">{{ formatDate(record.createTime) }}</text>
      </view>
      
      <view v-if="record.images && record.images.length" class="image-grid">
        <image
          v-for="(img, i) in record.images"
          :key="i"
          class="grid-img"
          :src="img"
          mode="aspectFill"
          lazy-load
          @click="previewImage(i)"
        />
      </view>
      
      <text v-if="record.content" class="content-text">{{ record.content }}</text>
      
      <view v-if="record.location && record.location.name" class="location">
        <text>📍 {{ record.location.name }}</text>
      </view>
      
      <view class="like-row">
        <view class="like-btn" :class="{ liked: hasLiked }" @click="toggleLike">
          <text>👍 {{ record.likeCount || 0 }}</text>
        </view>
      </view>
    </view>
    
    <view v-if="record.assignee" class="card">
      <view class="card-title">处理信息</view>
      <ResponsibleInfo
        :name="record.assignee"
        :role="record.assigneeRole"
        :avatar="record.assigneeAvatar"
      />
      <view v-if="record.reply" class="reply-section">
        <text class="reply-label">处理结果：</text>
        <text class="reply-text">{{ record.reply }}</text>
      </view>
      <view v-if="record.replyImages && record.replyImages.length" class="image-grid">
        <image
          v-for="(img, i) in record.replyImages"
          :key="i"
          class="grid-img"
          :src="img"
          mode="aspectFill"
          lazy-load
          @click="previewReplyImage(i)"
        />
      </view>
      <view v-if="record.handleDuration" class="duration">
        处理时长：{{ formatDuration(record.handleDuration) }}
      </view>
    </view>
    
    <view class="report-row" @click="goReport">
      <text>举报此随手拍</text>
    </view>
  </view>
  <view v-else-if="loadError" class="error-state">
    <text class="error-icon">⚠️</text>
    <text class="error-text">加载失败</text>
    <view class="retry-btn" @click="loadData">重新加载</view>
  </view>
  <view v-else-if="!loading" class="loading">加载中...</view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatDate, statusText, formatDuration } from '@/utils/format.js'
import { useConfigStore } from '@/store/config.js'
import ResponsibleInfo from '@/components/ResponsibleInfo.vue'
import Skeleton from '@/components/Skeleton.vue'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const record = ref({})
const recordId = ref('')
const hasLiked = ref(false)
const loadError = ref(false)
const loading = ref(false)

const userOpenid = computed(() => uni.getStorageSync('userInfo')?.openid || '')

const recordStatusClass = computed(() => {
  const s = record.value.status
  if (s === '已完成' || s === 'completed') return 'completed'
  if (s === '处理中' || s === 'processing' || s === '已派单' || s === 'assigned') return 'processing'
  return 'pending'
})

onLoad((options) => {
  recordId.value = options.recordId
})

onMounted(() => loadData())

async function loadData() {
  if (!recordId.value) return
  loadError.value = false
  loading.value = true
  
  try {
    const res = await callFunction('getRecordDetail', { recordId: recordId.value })
    if (res.success) {
      record.value = res.data
      hasLiked.value = (res.data.likeUsers || []).includes(userOpenid.value)
    } else {
      loadError.value = true
    }
  } catch (err) {
    console.error('[snapshot/detail 加载失败]:', err)
    loadError.value = true
  } finally {
    loading.value = false
  }
}

function previewImage(i) {
  uni.previewImage({ urls: record.value.images, current: record.value.images[i] })
}

function previewReplyImage(i) {
  uni.previewImage({ urls: record.value.replyImages, current: record.value.replyImages[i] })
}

function goReport() {
  const title = encodeURIComponent(record.value.title || '随手拍内容')
  uni.navigateTo({ url: `/pages/report/index?targetType=snapshot&targetId=${recordId.value}&targetTitle=${title}` })
}

async function toggleLike() {
  // 乐观更新：先改 UI，失败回滚
  const prevLiked = hasLiked.value
  const prevCount = record.value.likeCount || 0
  hasLiked.value = !prevLiked
  record.value.likeCount = prevLiked ? Math.max(0, prevCount - 1) : prevCount + 1
  try {
    const res = await callFunction('likeSnapshot', { recordId: recordId.value })
    if (res.success) {
      hasLiked.value = res.liked
    } else {
      throw new Error(res.message || '点赞失败')
    }
  } catch (err) {
    // 回滚到操作前状态
    hasLiked.value = prevLiked
    record.value.likeCount = prevCount
    uni.showToast({ title: '操作失败，请重试', icon: 'none' })
    console.error('[点赞失败]:', err)
  }
}
</script>

<style lang="scss" scoped>

.page-detail {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  
  .status-banner {
    padding: $card-padding;
    border-radius: $card-radius;
    text-align: center;
    margin-bottom: $card-gap;
    
    &.status-pending { background: rgba(230,81,0,0.1); }
    &.status-processing { background: $primary-light; }
    &.status-completed { background: rgba(46,125,50,0.1); }
    
    text { font-size: $font-card-title; font-weight: bold; color: $text-main; }
    
    .overdue-tip {
      margin-left: 12rpx;
      color: $danger;
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
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16rpx;
      
      .type-tag {
        padding: $space-xs $space-md;
        background: $primary-light;
        color: $primary;
        border-radius: $radius-sm;
        font-size: $font-sub;
      }
      
      .time { font-size: $font-sub; color: $text-weak; }
    }
    
    .image-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12rpx;
      margin-bottom: 16rpx;
      
      .grid-img {
        width: 100%;
        aspect-ratio: 1;
        border-radius: $radius-md;
        background: $bg;
      }
    }
    
    .content-text {
      font-size: $font-body;
      color: $text-main;
      line-height: 1.6;
      display: block;
      margin-bottom: 16rpx;
    }
    
    .location {
      font-size: $font-sub;
      color: $text-sub;
      margin-bottom: 16rpx;
    }
    
    .like-row {
      display: flex;
      justify-content: center;
      padding-top: 16rpx;
      border-top: 2rpx solid $border;
      
      .like-btn {
        padding: $space-md $space-2xl;
        border: 4rpx solid $border;
        border-radius: $btn-radius;
        font-size: $font-body;
        color: $text-sub;
        
        &.liked {
          border-color: $primary;
          background: $primary-light;
          color: $primary;
        }
      }
    }
    
    .card-title {
      font-size: $font-card-title;
      font-weight: bold;
      color: $text-main;
      border-left: 8rpx solid $primary;
      padding-left: 16rpx;
      margin-bottom: 24rpx;
    }
    
    .reply-section {
      margin-top: 24rpx;
      
      .reply-label { font-size: $font-body; color: $text-sub; display: block; margin-bottom: 8rpx; }
      .reply-text { font-size: $font-body; color: $text-main; line-height: 1.6; }
    }
    
    .duration {
      margin-top: 16rpx;
      font-size: $font-sub;
      color: $text-sub;
    }
  }
  
  .report-row {
    text-align: center;
    padding: $card-padding 0;
    color: $text-weak;
    font-size: $font-sub;
  }
  
  .loading {
    text-align: center;
    padding: 200rpx 0;
    font-size: $font-body;
    color: $text-weak;
  }
  
  .error-state {
    text-align: center;
    padding: 200rpx 0;
    
    .error-icon { display: block; font-size: 80rpx; margin-bottom: 24rpx; }
    .error-text { display: block; font-size: $font-body; color: $text-sub; margin-bottom: 24rpx; }
    .retry-btn {
      display: inline-block;
      padding: $space-sm 48rpx;
      background: $primary;
      color: $white;
      border-radius: $btn-radius;
      font-size: $font-body;
    }
  }
}
</style>
