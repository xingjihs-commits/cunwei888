<!--
  components/home/PhoneGrid.vue - 首页「常用电话」网格
  由 pages/index/index.vue 抽取（控制单文件 ≤500 行）
-->
<template>
  <view class="phone-grid">
    <view
      v-for="p in phones"
      :key="p.key"
      class="phone-item"
      @click="$emit('call', p.number)"
    >
      <text class="phone-role">{{ t('phone.' + p.key) }}</text>
      <text class="phone-person">{{ p.name || t('home.unset', '待配置') }}</text>
      <text class="phone-num">{{ p.number || '—' }}</text>
    </view>
  </view>
</template>

<script setup>
import { useConfigStore } from '@/store/config.js'

defineProps({
  phones: { type: Array, default: () => [] }
})
defineEmits(['call'])

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
</script>

<style lang="scss" scoped>

.phone-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;

  .phone-item {
    display: flex;
    flex-direction: column;
    min-height: 160rpx;
    padding: $card-padding;
    background: $white;
    border-radius: $card-radius;
    box-shadow: $card-shadow;

    .phone-role { font-size: $font-body; font-weight: bold; color: $text-main; }
    .phone-person { font-size: $font-body; color: $text-sub; margin-top: 4rpx; }
    .phone-num { font-size: $font-body; color: $primary; font-weight: bold; margin-top: 4rpx; }
    &:active { background: $bg; }
  }
}
</style>
