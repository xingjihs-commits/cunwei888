<!--
  components/home/SecretaryCards.vue - 首页「找书记」三入口
  信箱 / 广播 / 随手拍，3 等分图标入口
  规范：每项独立按压态 + 图标底色与图标色配对（chip 六色体系）
-->
<template>
  <view class="find-row">
    <view
      v-for="e in entries"
      :key="e.path"
      class="find-item"
      @click="$emit('open', e.path)"
    >
      <view class="find-icon" :style="{ background: e.bg }">
        <AppIcon :name="e.icon" :size="44" :color="e.color" />
      </view>
      <text class="find-text">{{ t(e.textKey, e.text) }}</text>
    </view>
  </view>
</template>

<script setup>
import { useConfigStore } from '@/store/config.js'
import AppIcon from '@/components/AppIcon.vue'
import { CHIP_BG, CHIP_TEXT } from '@/utils/theme.js'

defineEmits(['open'])

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const entries = [
  { icon: 'mail', bg: CHIP_BG.red, color: CHIP_TEXT.red, textKey: 'entry.mailbox', text: '书记信箱', path: '/pages/secretary/mailbox' },
  { icon: 'megaphone', bg: CHIP_BG.gold, color: CHIP_TEXT.gold, textKey: 'entry.broadcast', text: '书记广播', path: '/pages/secretary/broadcast' },
  { icon: 'camera', bg: CHIP_BG.green, color: CHIP_TEXT.green, textKey: 'entry.snapshot', text: '随手拍', path: '/pages/snapshot/snapshot' }
]
</script>

<style lang="scss" scoped>
// 规格：卡 686×192 · 三格间 16 · 图标圆 88
.find-row {
  display: flex;
  gap: 16rpx;
  padding: 24rpx;
  background: $white;
  border-radius: $radius-card;
  box-shadow: $shadow-md;

  .find-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 144rpx;
    border-radius: $radius-list;
    transition: transform $tap-time ease;

    // 每项独立按压态（反馈只作用于被点的那一项）
    &:active { transform: scale($tap-scale); }

    .find-icon {
      width: 88rpx;
      height: 88rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: $radius-full;
      margin-bottom: 12rpx;
    }
    .find-text {
      font-size: $font-body;
      font-weight: 500;
      color: $text-main;
    }
  }
}
</style>
