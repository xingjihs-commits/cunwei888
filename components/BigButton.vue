<!--
  BigButton.vue - 大按钮组件
  改造点：
    1. 加 loading 态（旋转图标 + 文字替换 + 禁用点击）
    2. 与 acquireLock 联动：调用方传 :loading="submitting" 即可
    3. 触觉反馈保留
-->
<template>
  <view
    class="big-btn"
    :class="['btn-' + type, { 'btn-disabled': disabled || loading, 'btn-block': block, 'btn-loading': loading, 'btn-contrast': a11y.highContrast }]"
    :style="[customStyle, btnStyle]"
    @click="handleClick"
  >
    <view v-if="loading" class="btn-spinner"></view>
    <view v-else-if="icon" class="btn-icon">{{ icon }}</view>
    <text class="btn-text">{{ loading ? (loadingText || t('button.processing', '处理中...')) : text }}</text>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/store/config.js'
import { a11y } from '@/utils/accessibility.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const props = defineProps({
  text: { type: String, default: '确定' },
  type: { type: String, default: 'primary' },
  icon: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: true },
  customStyle: { type: Object, default: () => ({}) },
  // 新增：loading 态
  loading: { type: Boolean, default: false },
  // 新增：loading 时显示的文字（默认"处理中..."）
  loadingText: { type: String, default: '' }
})

const emit = defineEmits(['click'])

// 适老化：字号倍数缩放按钮文字，大按钮模式让高度 +20%
const btnStyle = computed(() => {
  const scale = a11y.fontScale || 1
  const baseHeight = a11y.largeButton ? 88 * 1.2 : 88
  const height = baseHeight * scale
  return {
    height: height + 'rpx',
    lineHeight: height + 'rpx',
    fontSize: Math.round(36 * scale) + 'rpx'
  }
})

function handleClick() {
  if (props.disabled || props.loading) return
  // #ifdef MP-WEIXIN
  wx.vibrateShort({ type: 'light' })
  // #endif
  emit('click')
}
</script>

<style lang="scss" scoped>

.big-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $btn-height;
  padding: 0 $page-padding;
  border-radius: $btn-radius;
  font-size: $font-btn;
  font-weight: bold;
  box-sizing: border-box;

  &.btn-block { width: 100%; }

  .btn-icon {
    margin-right: 12rpx;
    font-size: $font-title;
  }

  .btn-text { color: inherit; }

  &.btn-primary {
    background-color: $primary;
    color: $white;
    &:active { background-color: $primary-dark; }
  }

  &.btn-default {
    background-color: $bg;
    color: $primary;
    border: 2rpx solid $primary;
  }

  &.btn-danger {
    background-color: $danger;
    color: $white;
  }

  &.btn-gold {
    background-color: $gold;
    color: $white;
  }

  &.btn-disabled {
    background-color: $text-weak !important;
    color: $white !important;
    opacity: 0.6;
  }

  // 高对比度：加深文字与描边
  &.btn-contrast {
    font-weight: 800;
    border: 2rpx solid rgba($text-main, 0.35);
  }

  // loading 态
  &.btn-loading {
    opacity: 0.8;
    pointer-events: none;
  }

  .btn-spinner {
    width: 36rpx;
    height: 36rpx;
    border: 4rpx solid rgba($white, 0.3);
    border-top-color: $white;
    border-radius: $radius-full;
    margin-right: 12rpx;
    animation: btn-spin 0.8s linear infinite;
  }
}

@keyframes btn-spin {
  to { transform: rotate(360deg); }
}
</style>
