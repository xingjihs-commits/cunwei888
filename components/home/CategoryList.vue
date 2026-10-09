<!--
  components/home/CategoryList.vue - 首页「服务分类」5 大类入口
  由 pages/index/index.vue 抽取（控制单文件 ≤500 行）
-->
<template>
  <view class="cat-list">
    <view
      v-for="c in categories"
      :key="c.key"
      class="cat-row"
      @click="$emit('select', c.key)"
    >
      <view class="cat-icon">{{ c.icon }}</view>
      <view class="cat-info">
        <text class="cat-title">{{ t('category.' + c.key) }}</text>
        <text class="cat-sub">{{ c.sub }}</text>
      </view>
      <view class="cat-arrow">›</view>
    </view>
  </view>
</template>

<script setup>
import { useConfigStore } from '@/store/config.js'

defineProps({
  categories: { type: Array, default: () => [] }
})
defineEmits(['select'])

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
</script>

<style lang="scss" scoped>

.cat-list {
  background: $white;
  border-radius: $card-radius;
  box-shadow: $card-shadow;
  overflow: hidden;

  .cat-row {
    display: flex;
    align-items: center;
    padding: $card-padding;
    border-bottom: 2rpx solid $border;
    &:last-child { border-bottom: none; }
    &:active { background: $bg; }

    .cat-icon { font-size: $font-number; margin-right: 20rpx; }
    .cat-info {
      flex: 1;
      .cat-title { font-size: $font-card-title; font-weight: bold; color: $text-main; display: block; }
      .cat-sub { font-size: $font-sub; color: $text-sub; }
    }
    .cat-arrow { font-size: $font-number; color: $text-weak; }
  }
}
</style>
