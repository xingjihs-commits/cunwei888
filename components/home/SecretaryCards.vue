<!--
  components/home/SecretaryCards.vue - 首页「书记直达」双卡片
  由 pages/index/index.vue 抽取（控制单文件 ≤500 行）
-->
<template>
  <view class="secretary-row">
    <view class="secretary-card" @click="$emit('open', '/pages/secretary/mailbox')">
      <view class="sec-icon">✉️</view>
      <view class="sec-info">
        <text class="sec-title">{{ t('entry.mailbox') }}</text>
        <text class="sec-sub">{{ t('home.secretarySub', '直达书记，不经派单') }}</text>
      </view>
      <view class="sec-arrow">›</view>
    </view>
    <view class="secretary-card broadcast" @click="$emit('open', '/pages/secretary/broadcast')">
      <view class="sec-icon">📢</view>
      <view class="sec-info">
        <text class="sec-title">{{ t('entry.broadcast') }}</text>
        <text class="sec-sub">{{ broadcastTitle }}</text>
      </view>
      <view class="sec-arrow">›</view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/store/config.js'

const props = defineProps({
  latestBroadcast: { type: Object, default: null }
})
defineEmits(['open'])

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const broadcastTitle = computed(() =>
  props.latestBroadcast ? props.latestBroadcast.title.slice(0, 10) : t('home.noBroadcast', '暂无广播')
)
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.secretary-row {
  display: flex;
  gap: 16rpx;
  padding: 0 $page-padding;
  margin: $card-gap 0;

  .secretary-card {
    flex: 1;
    display: flex;
    align-items: center;
    padding: $card-padding;
    background: $white;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    border-left: 8rpx solid $primary;

    &.broadcast { border-left-color: $gold; }

    .sec-icon { font-size: $font-number; margin-right: 16rpx; }
    .sec-info {
      flex: 1;
      .sec-title { font-size: $font-card-title; font-weight: bold; color: $text-main; display: block; margin-bottom: 4rpx; }
      .sec-sub { font-size: $font-micro; color: $text-sub; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    }
    .sec-arrow { font-size: $font-number; color: $text-weak; }
    &:active { background: $bg; }
  }
}
</style>
