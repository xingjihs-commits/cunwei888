<!--
  pages/notice/detail.vue - 公示详情
  用途：查看公示详细内容
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-notice-detail">
    <view v-if="notice.title" class="card">
      <view class="cat-tag" :class="'cat-' + getCategoryClass(notice.category)">{{ notice.category }}</view>
      <text class="notice-title">{{ notice.title }}</text>
      <view class="notice-meta">
        <text class="meta-time">{{ formatDate(notice.createTime) }}</text>
        <text class="meta-source">{{ t('notice.source', '来源：村委办') }}</text>
        <text class="meta-views">👁️ {{ notice.viewCount || 0 }}</text>
      </view>
      <view v-if="notice.responsible" class="responsible-info">
        <text>{{ t('notice.responsibleLabel', '责任人') }}: {{ notice.responsible }}</text>
      </view>
    </view>
    
    <view v-if="notice.content" class="card">
      <text class="notice-content">{{ notice.content }}</text>
    </view>
    
    <view v-if="notice.images && notice.images.length" class="card">
      <view class="card-title">{{ t('notice.relatedImages', '相关图片') }}</view>
      <view class="image-grid">
        <image
          v-for="(img, i) in notice.images"
          :key="i"
          class="grid-img"
          :src="img"
          mode="aspectFill"
          lazy-load
          @click="previewImage(i)"
        />
      </view>
    </view>
    
    <view v-if="notice.audited" class="card audit-card">
      <text class="audit-text">✓ {{ t('notice.auditedText', '本公示已经村务监督委员会审核') }}</text>
    </view>
    
    <view v-if="notice.title" class="report-row" @click="goReport">
      <text>{{ t('notice.report', '举报此公示') }}</text>
    </view>
    
    <view v-if="!notice.title && !loadError" class="loading">{{ t('emptyState.loading', '加载中...') }}</view>
    
    <view v-if="loadError" class="error-state">
      <text class="error-icon">⚠️</text>
      <text class="error-text">{{ t('emptyState.loadFailed', '加载失败') }}</text>
      <view class="retry-btn" @click="loadData">{{ t('button.reload', '重新加载') }}</view>
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatDate } from '@/utils/format.js'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const notice = ref({})
const noticeId = ref('')
const loadError = ref(false)

onLoad((options) => {
  noticeId.value = options.noticeId
})

onMounted(() => loadData())

async function loadData() {
  if (!noticeId.value) return
  loadError.value = false
  
  try {
    const res = await callFunction('getNoticeDetail', { noticeId: noticeId.value })
    if (res.success) {
      notice.value = res.data
    } else {
      loadError.value = true
    }
  } catch (err) {
    console.error('[notice/detail 加载失败]:', err)
    loadError.value = true
  }
}

function getCategoryClass(cat) {
  const map = { '党务': 'party', '村务': 'village', '财务': 'finance', '惠农': 'agri', '应急': 'emergency' }
  return map[cat] || 'default'
}

function previewImage(i) {
  uni.previewImage({ urls: notice.value.images, current: notice.value.images[i] })
}

function goReport() {
  const title = encodeURIComponent(notice.value.title || '公示内容')
  uni.navigateTo({ url: `/pages/report/index?targetType=notice&targetId=${noticeId.value}&targetTitle=${title}` })
}
</script>

<style lang="scss" scoped>

.page-notice-detail {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  
  .card {
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    
    .cat-tag {
      display: inline-block;
      padding: $space-xs $space-md;
      border-radius: $radius-sm;
      font-size: $font-sub;
      background: $primary-light;
      color: $primary;
      margin-bottom: 16rpx;
      
      &.cat-finance { background: $gold-light; color: $gold; }
      &.cat-emergency { background: rgba(198,40,40,0.1); color: $danger; }
    }
    
    .notice-title {
      font-size: $font-title;
      font-weight: bold;
      color: $text-main;
      display: block;
      margin-bottom: 16rpx;
      line-height: 1.4;
    }
    
    .notice-meta {
      display: flex;
      gap: 24rpx;
      font-size: $font-sub;
      color: $text-weak;
      
      .meta-source { flex: 1; }
    }
    
    .responsible-info {
      margin-top: 16rpx;
      padding: $space-sm 16rpx;
      background: $primary-light;
      border-radius: $radius-sm;
      font-size: $font-sub;
      color: $primary;
    }
    
    .notice-content {
      font-size: $font-body;
      color: $text-main;
      line-height: 1.8;
      white-space: pre-wrap;
    }
    
    .card-title {
      font-size: $font-card-title;
      font-weight: bold;
      color: $text-main;
      margin-bottom: 16rpx;
    }
    
    .image-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12rpx;
      
      .grid-img {
        width: 100%;
        aspect-ratio: 1;
        border-radius: $radius-md;
        background: $bg;
      }
    }
  }
  
  .audit-card {
    background: rgba(46,125,50,0.08);
    text-align: center;
    
    .audit-text {
      font-size: $font-body;
      color: $success;
      font-weight: bold;
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
