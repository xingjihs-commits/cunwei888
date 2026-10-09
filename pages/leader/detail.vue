<!--
  pages/leader/detail.vue - 书记风采 / 领导关怀 详情
  视频用 <video> 不自动播放；无视频时图文兜底
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-leader-detail">
    <view v-if="detail" class="content">
      <text class="title">{{ detail.title }}</text>
      <text class="time">{{ formatDate(detail.publishTime || detail.createTime) }}</text>

      <video
        v-if="detail.videoFileID"
        class="video"
        :src="detail.videoFileID"
        :autoplay="false"
        :controls="true"
        show-center-play-btn
        object-fit="contain"
      />
      <image v-else-if="detail.coverImage" class="cover" :src="detail.coverImage" mode="widthFix" />

      <text class="body-text">{{ detail.content }}</text>
    </view>

    <view v-else-if="loading" class="loading">{{ t('emptyState.loading', '加载中...') }}</view>
    <EmptyState v-else :text="t('emptyState.notFound', '内容不存在')" icon="📄" />
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatDate } from '@/utils/format.js'
import EmptyState from '@/components/EmptyState.vue'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const detail = ref(null)
const loading = ref(false)

onLoad(async (q) => {
  if (!q || !q.id) return
  loading.value = true
  try {
    const res = await callFunction('getLeaderContentList', { id: q.id })
    if (res.success) detail.value = res.data
  } catch (err) {
    console.error('[leader detail] 加载失败:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-leader-detail {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  box-sizing: border-box;

  .content {
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;

    .title { font-size: $font-title; font-weight: bold; color: $text-main; display: block; }
    .time { font-size: $font-sub; color: $text-weak; display: block; margin: 12rpx 0 24rpx; }
    .video { width: 100%; height: 420rpx; border-radius: $radius-md; margin-bottom: 24rpx; }
    .cover { width: 100%; border-radius: $radius-md; margin-bottom: 24rpx; }
    .body-text { font-size: $font-body; color: $text-main; line-height: 1.8; }
  }

  .loading { text-align: center; padding: $space-2xl; font-size: $font-sub; color: $text-weak; }
}
</style>
