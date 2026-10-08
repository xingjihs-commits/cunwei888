<!--
  pages/service/guide-detail.vue - 办事指南详情
-->
<template>
  <Skeleton v-if="loading && !guide.title" type="detail" />
  <view class="page-guide-detail" v-if="guide.title">
    <view class="header-card">
      <view class="guide-icon">{{ guide.icon || '📋' }}</view>
      <text class="guide-title">{{ guide.title }}</text>
      <view class="guide-meta">
        <text class="meta-cat">{{ guide.category }}</text>
        <text class="meta-views">👁️ {{ guide.viewCount || 0 }}</text>
      </view>
    </view>
    
    <view class="card">
      <view class="card-title">{{ t('guide.description', '办事说明') }}</view>
      <text class="content-text">{{ guide.description }}</text>
    </view>
    
    <view v-if="guide.materials && guide.materials.length" class="card">
      <view class="card-title">{{ t('guide.materials', '所需材料') }}</view>
      <view v-for="(mat, i) in guide.materials" :key="i" class="material-item">
        <text class="mat-num">{{ i + 1 }}</text>
        <text class="mat-text">{{ mat }}</text>
      </view>
    </view>
    
    <view v-if="guide.steps && guide.steps.length" class="card">
      <view class="card-title">{{ t('guide.steps', '办理流程') }}</view>
      <view v-for="(step, i) in guide.steps" :key="i" class="step-item">
        <view class="step-dot">{{ i + 1 }}</view>
        <text class="step-text">{{ step }}</text>
      </view>
    </view>
    
    <view class="card contact-card">
      <view class="card-title">{{ t('guide.info', '办理信息') }}</view>
      <view v-if="guide.location" class="info-row">
        <text class="info-label">📍 {{ t('guide.locationLabel', '办理地点') }}</text>
        <text class="info-value">{{ guide.location }}</text>
      </view>
      <view v-if="guide.phone" class="info-row">
        <text class="info-label">📞 {{ t('guide.phoneLabel', '咨询电话') }}</text>
        <text class="info-value link" @click="callPhone">{{ guide.phone }}</text>
      </view>
      <view v-if="guide.workTime" class="info-row">
        <text class="info-label">🕘 {{ t('guide.workTimeLabel', '办理时间') }}</text>
        <text class="info-value">{{ guide.workTime }}</text>
      </view>
      <view v-if="guide.deadline" class="info-row">
        <text class="info-label">⏰ {{ t('guide.deadlineLabel', '办理时限') }}</text>
        <text class="info-value">{{ guide.deadline }}</text>
      </view>
    </view>
  </view>
  <view v-else-if="!loading" class="loading">{{ t('emptyState.loading', '加载中...') }}</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const guide = ref({})
const guideId = ref('')
const loading = ref(false)

onLoad((options) => { guideId.value = options.guideId })
onMounted(() => loadData())

async function loadData() {
  if (!guideId.value) return
  loading.value = true
  try {
    const res = await callFunction('getServiceGuideDetail', { guideId: guideId.value })
    if (res.success) guide.value = res.data
  } catch (err) { console.error(err) }
  finally { loading.value = false }
}

function callPhone() {
  if (guide.value.phone) uni.makePhoneCall({ phoneNumber: guide.value.phone })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-guide-detail {
  min-height: 100vh; background: $bg; padding: $page-padding;
  .header-card {
    background: linear-gradient(135deg, $primary, $primary-dark);
    color: $white; border-radius: $card-radius; padding: $card-padding;
    text-align: center; margin-bottom: $card-gap;
    .guide-icon { font-size: 80rpx; margin-bottom: 16rpx; }
    .guide-title { font-size: $font-title; font-weight: bold; display: block; margin-bottom: 12rpx; }
    .guide-meta {
      display: flex; justify-content: center; gap: 24rpx;
      .meta-cat { padding: $space-xs $space-md; background: rgba(255,255,255,0.2); border-radius: $radius-sm; font-size: $font-micro; }
      .meta-views { font-size: $font-sub; opacity: 0.9; }
    }
  }
  .card {
    background: $white; border-radius: $card-radius; padding: $card-padding;
    box-shadow: $card-shadow; margin-bottom: $card-gap;
    .card-title { font-size: $font-card-title; font-weight: bold; color: $text-main; border-left: 8rpx solid $primary; padding-left: 16rpx; margin-bottom: 24rpx; }
    .content-text { font-size: $font-body; color: $text-main; line-height: 1.8; white-space: pre-wrap; }
    .material-item { display: flex; align-items: flex-start; padding: $space-sm 0; }
    .mat-num {
      width: 40rpx; height: 40rpx; line-height: 40rpx; text-align: center;
      background: $primary; color: $white; border-radius: $radius-full;
      font-size: $font-sub; font-weight: bold; margin-right: 16rpx; flex-shrink: 0;
    }
    .mat-text { flex: 1; font-size: $font-body; color: $text-main; line-height: 1.6; }
    .step-item { display: flex; padding: $space-md 0; }
    .step-dot {
      width: 48rpx; height: 48rpx; line-height: 48rpx; text-align: center;
      background: $primary-light; color: $primary; border-radius: $radius-full;
      font-size: $font-sub; font-weight: bold; margin-right: 16rpx; flex-shrink: 0;
    }
    .step-text { flex: 1; font-size: $font-body; color: $text-main; line-height: 1.6; padding-top: 8rpx; }
    .info-row { display: flex; padding: $space-md 0; border-bottom: 2rpx solid $border; }
    .info-row:last-child { border-bottom: none; }
    .info-label { width: 280rpx; font-size: $font-body; color: $text-sub; }
    .info-value { flex: 1; font-size: $font-body; color: $text-main; }
    .info-value.link { color: $primary; text-decoration: underline; }
  }
  .loading { text-align: center; padding: 200rpx 0; font-size: $font-body; color: $text-weak; }
}
</style>
