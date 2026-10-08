<!--
  components/ProgressTimeline.vue - 进度时间轴
  用途：工单详情页可视化展示工单流转过程
  老人友好：一眼看出"现在到哪一步了""还要等多久""谁在处理"
  用法：<ProgressTimeline :events="events" :current-status="record.status" />
-->
<template>
  <view class="timeline">
    <view
      v-for="(evt, i) in displayEvents"
      :key="i"
      class="timeline-item"
      :class="{
        done: evt.done,
        current: evt.current,
        pending: !evt.done && !evt.current
      }"
    >
      <view class="timeline-dot">
        <text v-if="evt.done" class="dot-icon">✓</text>
        <text v-else-if="evt.current" class="dot-pulse"></text>
      </view>
      <view v-if="i < displayEvents.length - 1" class="timeline-line" :class="{ filled: evt.done }"></view>
      <view class="timeline-content">
        <view class="timeline-header">
          <text class="timeline-title">{{ evt.title }}</text>
          <text v-if="evt.time" class="timeline-time">{{ formatTime(evt.time) }}</text>
        </view>
        <view v-if="evt.operator" class="timeline-operator">
          <text class="operator-label">处理人：</text>
          <text class="operator-name">{{ evt.operator }}</text>
        </view>
        <text v-if="evt.note" class="timeline-note">{{ evt.note }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { formatDate } from '@/utils/format.js'

const props = defineProps({
  // 事件列表：[{ title, time, operator, note, status }]
  events: { type: Array, default: () => [] },
  // 当前状态（中文）：待处理 / 处理中 / 已完成 / 已评价
  currentStatus: { type: String, default: '' }
})

// 5 个标准节点
const STANDARD_NODES = [
  { key: 'submitted', title: '已提交', matchStatus: ['待处理', '已派单', '处理中', '已完成', '已评价'] },
  { key: 'assigned', title: '已派单', matchStatus: ['已派单', '处理中', '已完成', '已评价'] },
  { key: 'processing', title: '处理中', matchStatus: ['处理中', '已完成', '已评价'] },
  { key: 'completed', title: '已完成', matchStatus: ['已完成', '已评价'] },
  { key: 'evaluated', title: '已评价', matchStatus: ['已评价'] }
]

const displayEvents = computed(() => {
  if (props.events && props.events.length > 0) {
    // 用传入的 events
    return props.events.map((e, i) => ({
      ...e,
      done: !!e.time,
      current: i === props.events.filter(x => x.time).length
    }))
  }
  // 用标准节点 + currentStatus 推导
  return STANDARD_NODES.map(node => {
    const done = node.matchStatus.includes(props.currentStatus)
    const current = !done && isCurrentStep(node)
    return {
      title: node.title,
      time: null,
      operator: '',
      note: '',
      done,
      current
    }
  })
})

function isCurrentStep(node) {
  // 找到第一个未完成的节点
  const firstNotDone = STANDARD_NODES.find(n => !n.matchStatus.includes(props.currentStatus))
  return firstNotDone && firstNotDone.key === node.key
}

function formatTime(t) {
  if (!t) return ''
  return formatDate(t, 'MM-DD HH:mm')
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.timeline {
  padding: $card-padding 0;
}

.timeline-item {
  position: relative;
  padding-left: 56rpx;
  padding-bottom: 32rpx;
  min-height: 48rpx;

  &:last-child {
    padding-bottom: 0;
  }
}

.timeline-dot {
  position: absolute;
  left: 0;
  top: 0;
  width: 48rpx;
  height: 48rpx;
  border-radius: $radius-full;
  background: $border;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  .dot-icon {
    color: $white;
    font-size: $font-sub;
    font-weight: bold;
  }

  .dot-pulse {
    width: 24rpx;
    height: 24rpx;
    background: $primary;
    border-radius: $radius-full;
    animation: pulse 1.5s infinite;
  }
}

.timeline-item.done .timeline-dot {
  background: $success;
}

.timeline-item.current .timeline-dot {
  background: $primary;
  box-shadow: 0 0 0 8rpx rgba(196, 30, 36, 0.2);
}

.timeline-line {
  position: absolute;
  left: 22rpx;
  top: 48rpx;
  width: 4rpx;
  height: calc(100% - 48rpx);
  background: $border;
  z-index: 1;

  &.filled {
    background: $success;
  }
}

.timeline-content {
  padding-top: 4rpx;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8rpx;

  .timeline-title {
    font-size: $font-body;
    font-weight: bold;
    color: $text-main;
  }

  .timeline-time {
    font-size: $font-sub;
    color: $text-weak;
  }
}

.timeline-operator {
  font-size: $font-sub;
  color: $text-sub;
  margin-bottom: 8rpx;

  .operator-label {
    color: $text-weak;
  }

  .operator-name {
    color: $primary;
    font-weight: 500;
  }
}

.timeline-note {
  font-size: $font-sub;
  color: $text-sub;
  line-height: 1.5;
  display: block;
}

.timeline-item.pending {
  .timeline-title {
    color: $text-weak;
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.6; }
}
</style>
