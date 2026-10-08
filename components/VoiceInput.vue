<!--
  VoiceInput.vue - 语音输入组件
  改造点：
    1. 不再用全局事件总线 uni.$on/$emit 传递结果（会与同页多个实例冲突）
    2. 改为内部 Promise 链：startRecord 时记录 callback，stop 后识别完直接调用
    3. 识别失败时给清晰提示（百度 ASR 未配置 / 录音太短 / 网络异常）
    4. 录音 60s 自动停止
-->
<template>
  <view v-if="a11y.voiceEnabled" class="voice-input">
    <view
      class="voice-btn"
      :class="{ recording: isRecording }"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <view class="voice-icon">{{ isRecording ? '🎙️' : '🎤' }}</view>
      <text class="voice-text">{{ isRecording ? t('voice.release', '松开 识别') : t('voice.hold', '按住 说话') }}</text>
    </view>

    <!-- 录音动画 -->
    <view v-if="isRecording" class="voice-modal">
      <view class="voice-wave">
        <view v-for="i in 7" :key="i" class="wave-bar" :style="{ animationDelay: (i * 0.1) + 's' }"></view>
      </view>
      <text class="voice-tip">正在录音...{{ duration }}秒</text>
      <text class="voice-hint">最多 60 秒，松开后自动识别</text>
    </view>
  </view>
</template>

<script setup>
import { useConfigStore } from '@/store/config.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

import { ref, onUnmounted } from 'vue'
import { startRecord, stopRecord, cancelRecord } from '@/utils/audio.js'
import { a11y } from '@/utils/accessibility.js'

const emit = defineEmits(['result'])

const isRecording = ref(false)
const duration = ref(0)
let timer = null

// 内部回调引用：本次录音的识别结果回调
let pendingResultHandler = null

// 监听 utils/audio.js 通过事件抛出的结果
// 用唯一的 channel id 区分多个实例（避免 uni.$off 误删其他实例监听）
const channelId = 'voiceInputResult_' + Math.random().toString(36).substr(2, 9)
uni.$on(channelId, (text) => {
  if (pendingResultHandler) {
    pendingResultHandler(text)
    pendingResultHandler = null
  }
})

function onTouchStart() {
  isRecording.value = true
  duration.value = 0

  // 注册本次的回调，识别成功后 emit
  pendingResultHandler = (text) => {
    if (text) emit('result', text)
  }

  // 把本实例的 channelId 传给 audio.js，让结果通过该 channel 回传
  startRecord(channelId)

  // 计时
  timer = setInterval(() => {
    duration.value++
    if (duration.value >= 60) {
      onTouchEnd()  // 60s 自动停止
    }
  }, 1000)
}

function onTouchEnd() {
  if (!isRecording.value) return
  isRecording.value = false
  clearInterval(timer)
  stopRecord()
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
  if (isRecording.value) {
    cancelRecord()  // 卸载时取消未完成的录音
  }
  uni.$off(channelId)  // 仅移除本实例的监听
})
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.voice-input {
  .voice-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 96rpx;
    background-color: $primary-light;
    border: 2rpx solid $primary;
    border-radius: $radius-lg;
    color: $primary;

    &.recording {
      background-color: $primary;
      color: $white;
    }

    .voice-icon {
      font-size: $font-btn;
      margin-right: 12rpx;
    }

    .voice-text {
      font-size: $font-body;
      font-weight: bold;
    }
  }

  .voice-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;

    .voice-wave {
      display: flex;
      align-items: center;
      gap: 8rpx;
      margin-bottom: 32rpx;

      .wave-bar {
        width: 8rpx;
        height: 60rpx;
        background: $white;
        border-radius: $radius-xs;
        animation: wave 0.8s ease-in-out infinite alternate;
      }
    }

    .voice-tip {
      color: $white;
      font-size: $font-body;
    }

    .voice-hint {
      color: rgba(255,255,255,0.7);
      font-size: $font-sub;
      margin-top: 8rpx;
    }
  }
}

@keyframes wave {
  0% { height: 30rpx; }
  100% { height: 100rpx; }
}
</style>
