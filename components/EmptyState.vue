<!--
  EmptyState.vue - 空状态组件
  用途：列表为空时展示友好提示
  图标：icon 传 AppIcon name（推荐）或旧版 emoji（内部自动映射，向后兼容）
-->
<template>
  <view class="empty-state">
    <AppIcon v-if="resolvedIcon" :name="resolvedIcon" :size="96" :color="ICON_COLOR" class="empty-icon" />
    <text v-else class="empty-icon">{{ icon }}</text>
    <text class="empty-text">{{ text }}</text>
    <view v-if="actionText" class="empty-action" @click="$emit('action')">
      <text>{{ actionText }}</text>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import { TEXT_WEAK } from '@/utils/theme.js'

const ICON_COLOR = TEXT_WEAK

const props = defineProps({
  // 图标：AppIcon name（如 'inbox'）或 emoji（旧版调用，内部映射）
  icon: { type: String, default: 'inbox' },
  // 提示文字
  text: { type: String, default: '暂无数据' },
  // 操作按钮文字
  actionText: { type: String, default: '' }
})

defineEmits(['action'])

// 历史 emoji 调用点 → AppIcon name 映射（35 处存量调用零改动）
const EMOJI_MAP = {
  '📭': 'inbox',
  '📥': 'inbox',
  '📋': 'clipboard',
  '📄': 'file-text',
  '📰': 'file-text',
  '📊': 'bar-chart',
  '👥': 'users',
  '💰': 'wallet',
  '✓': 'check',
  '📢': 'megaphone',
  '📷': 'camera',
  '🌾': 'sprout',
  '🔔': 'bell',
  '📦': 'package',
  '🗳️': 'vote',
  '✉️': 'mail',
  '📁': 'folder',
  '🔒': 'lock',
  '🎬': 'video'
}

const resolvedIcon = computed(() => {
  const v = props.icon
  if (!v) return ''
  if (EMOJI_MAP[v]) return EMOJI_MAP[v]
  // emoji 变体选择符（U+FE0F）归一化后再匹配，防码点差异
  const bare = v.replace(/\uFE0F/g, '')
  for (const k in EMOJI_MAP) {
    if (k.replace(/\uFE0F/g, '') === bare) return EMOJI_MAP[k]
  }
  // AppIcon name 均为 kebab-case 小写；未映射 emoji 不满足，走文本渲染兜底
  return /^[a-z][a-z-]*$/.test(v) ? v : ''
})
</script>

<style lang="scss" scoped>

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;

  .empty-icon {
    margin-bottom: 24rpx;
    opacity: 0.6;
  }

  // 兜底：未映射的 emoji 仍按文本渲染
  text.empty-icon {
    font-size: 96rpx;
    line-height: 1;
  }

  .empty-text {
    font-size: $font-body;
    color: $text-weak;
    margin-bottom: 24rpx;
  }

  .empty-action {
    padding: $space-md $space-2xl;
    background-color: $primary-light;
    color: $primary;
    border-radius: $btn-radius;
    font-size: $font-sub;
    min-height: 88rpx;
    display: inline-flex;
    align-items: center;

    &:active {
      opacity: 0.8;
    }
  }
}
</style>
