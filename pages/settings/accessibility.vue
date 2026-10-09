<!--
  pages/settings/accessibility.vue - 适老化设置
  用途：让老人切换大字号 / 高对比度 / 减少动画
  入口：mine.vue → 服务协议下方"适老化设置"
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-settings">
    <view class="card">
      <view class="card-title">字号大小</view>
      <view class="font-size-preview">
        <text class="preview-text" :style="{ fontSize: previewFontSize }">村务连心桥</text>
      </view>
      <view class="size-options">
        <view
          v-for="opt in fontSizeOptions"
          :key="opt.value"
          class="size-opt"
          :class="{ active: fontScale === opt.value }"
          @click="onFontSize(opt.value)"
        >
          <text class="size-label">{{ opt.label }}</text>
          <text class="size-sample" :style="{ fontSize: opt.sample }">A</text>
        </view>
      </view>
    </view>

    <view class="card">
      <view class="card-title">显示设置</view>
      <view class="setting-row">
        <view class="setting-info">
          <text class="setting-label">高对比度</text>
          <text class="setting-desc">加深文字颜色，背景更纯净</text>
        </view>
        <switch :checked="highContrast" @change="onHighContrast" :color="PRIMARY" />
      </view>
      <view class="setting-row">
        <view class="setting-info">
          <text class="setting-label">减少动画</text>
          <text class="setting-desc">关闭页面切换/列表动画，提升性能</text>
        </view>
        <switch :checked="reduceMotion" @change="onReduceMotion" :color="PRIMARY" />
      </view>
      <view class="setting-row">
        <view class="setting-info">
          <text class="setting-label">大按钮模式</text>
          <text class="setting-desc">按钮高度增加 20%，更易点击</text>
        </view>
        <switch :checked="largeButton" @change="onLargeButton" :color="PRIMARY" />
      </view>
    </view>

    <view class="card">
      <view class="card-title">语音输入</view>
      <view class="setting-row">
        <view class="setting-info">
          <text class="setting-label">长按说话功能</text>
          <text class="setting-desc">在反映、信箱、发布等页面可用语音输入</text>
        </view>
        <switch :checked="voiceEnabled" @change="onVoiceEnabled" :color="PRIMARY" />
      </view>
    </view>

    <view class="card tips-card">
      <text class="tips-title">💡 适老化提示</text>
      <text class="tips-text">字号设置保存后生效，按钮及部分组件会同步调整。</text>
      <text class="tips-text">如老人视力较差，建议选"特大字号"。</text>
      <text class="tips-text">高对比度模式适合强光环境下使用。</text>
    </view>

    <view class="bottom-bar">
      <BigButton :text="t('button.save', '保存设置')" type="primary" @click="onSave" />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { PRIMARY } from '@/utils/theme.js'
import { ref, computed, onMounted } from 'vue'
import BigButton from '@/components/BigButton.vue'
import { useConfigStore } from '@/store/config.js'
import { a11y, loadA11y, saveA11y } from '@/utils/accessibility.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const fontScale = ref(1.0)
const highContrast = ref(false)
const reduceMotion = ref(false)
const largeButton = ref(false)
const voiceEnabled = ref(true)

const fontSizeOptions = [
  { value: 1.0, label: '标准', sample: '32rpx' },
  { value: 1.2, label: '大', sample: '38rpx' },
  { value: 1.4, label: '特大', sample: '44rpx' }
]

const previewFontSize = computed(() => `${32 * fontScale.value}rpx`)

onMounted(() => {
  loadA11y()
  fontScale.value = a11y.fontScale
  highContrast.value = a11y.highContrast
  reduceMotion.value = a11y.reduceMotion
  largeButton.value = a11y.largeButton
  voiceEnabled.value = a11y.voiceEnabled
})

function onFontSize(v) { fontScale.value = v }

function onHighContrast(e) { highContrast.value = e.detail.value }
function onReduceMotion(e) { reduceMotion.value = e.detail.value }
function onLargeButton(e) { largeButton.value = e.detail.value }
function onVoiceEnabled(e) { voiceEnabled.value = e.detail.value }

function onSave() {
  saveA11y({
    fontScale: fontScale.value,
    highContrast: highContrast.value,
    reduceMotion: reduceMotion.value,
    largeButton: largeButton.value,
    voiceEnabled: voiceEnabled.value
  })
  uni.showToast({ title: '设置已保存', icon: 'success' })
  setTimeout(() => uni.navigateBack(), 1000)
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-settings {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  padding-bottom: 200rpx;

  .card {
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;

    .card-title {
      font-size: $font-card-title;
      font-weight: bold;
      color: $text-main;
      border-left: 8rpx solid $primary;
      padding-left: 16rpx;
      margin-bottom: 24rpx;
    }
  }

  .font-size-preview {
    text-align: center;
    padding: $page-padding;
    background: $bg;
    border-radius: $radius-md;
    margin-bottom: 24rpx;

    .preview-text {
      color: $primary;
      font-weight: bold;
    }
  }

  .size-options {
    display: flex;
    gap: 16rpx;

    .size-opt {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: $card-padding;
      background: $bg;
      border: 4rpx solid transparent;
      border-radius: $radius-md;

      &.active {
        border-color: $primary;
        background: $primary-light;
      }

      .size-label {
        font-size: $font-body;
        color: $text-main;
        margin-bottom: 8rpx;
      }

      .size-sample {
        color: $primary;
        font-weight: bold;
      }
    }
  }

  .setting-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-md 0;
    border-bottom: 2rpx solid $border;

    &:last-child { border-bottom: none; }

    .setting-info {
      flex: 1;

      .setting-label {
        font-size: $font-body;
        color: $text-main;
        font-weight: 500;
        display: block;
        margin-bottom: 4rpx;
      }

      .setting-desc {
        font-size: $font-sub;
        color: $text-sub;
        display: block;
      }
    }
  }

  .tips-card {
    background: rgba(212, 168, 67, 0.08);

    .tips-title {
      display: block;
      font-size: $font-body;
      color: $gold;
      font-weight: bold;
      margin-bottom: 16rpx;
    }

    .tips-text {
      display: block;
      font-size: $font-sub;
      color: $text-sub;
      line-height: 1.8;
    }
  }

  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: $card-gap $page-padding;
    padding-bottom: calc(#{$card-gap} + env(safe-area-inset-bottom));
    background: $white;
    box-shadow: $shadow-top;
  }
}
</style>
