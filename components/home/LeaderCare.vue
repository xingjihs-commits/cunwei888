<!--
  components/home/LeaderCare.vue - 首页「书记风采 / 领导关怀」Tab 区块
  由 pages/index/index.vue 抽取（控制单文件 ≤500 行）
-->
<template>
  <view class="care-wrap">
    <view class="care-tabs">
      <view class="care-tab" :class="{ active: modelValue === 'secretary' }" @click="$emit('update:modelValue', 'secretary')">
        {{ t('pageTitle.leader') }}
      </view>
      <view class="care-tab" :class="{ active: modelValue === 'leader' }" @click="$emit('update:modelValue', 'leader')">
        {{ t('home.leaderCare', '领导关怀') }}
      </view>
    </view>
    <view class="care-card" @click="$emit('viewAll')">
      <image class="care-img" :src="careCover" mode="aspectFill" />
      <view class="care-body">
        <text class="care-title">{{ careTitle }}</text>
        <text class="care-more">{{ t('home.viewAll', '查看全部') }} ›</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/store/config.js'

const props = defineProps({
  modelValue: { type: String, default: 'secretary' }
})
defineEmits(['update:modelValue', 'viewAll'])

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const careCover = computed(() => '/static/images/default-avatar.png')
const careTitle = computed(() =>
  props.modelValue === 'secretary'
    ? t('home.leaderSecretary', '支部书记工作风采')
    : t('home.leaderCare', '领导关怀')
)
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.care-tabs {
  display: flex;
  margin-bottom: 16rpx;

  .care-tab {
    flex: 1;
    text-align: center;
    padding: $space-md 0;
    font-size: $font-body;
    color: $text-sub;
    background: $white;
    font-weight: bold;

    &:first-child { border-top-left-radius: $radius-md; }
    &:last-child { border-top-right-radius: $radius-md; }
    &.active { background: $primary; color: $white; }
  }
}

.care-card {
  display: flex;
  height: 240rpx;
  background: $white;
  border-radius: $radius-md;
  box-shadow: $card-shadow;
  overflow: hidden;

  .care-img { width: 180rpx; height: 180rpx; margin: 30rpx; border-radius: $radius-md; background: $bg; }
  .care-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: $card-padding;

    .care-title { font-size: $font-card-title; font-weight: bold; color: $text-main; }
    .care-more { font-size: $font-sub; color: $primary; margin-top: 12rpx; }
  }
  &:active { background: $bg; }
}
</style>
