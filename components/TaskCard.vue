<!--
  TaskCard.vue - 政策落实任务卡片组件
  用途：列表页展示单条任务
-->
<template>
  <view class="task-card" @click="onTap">
    <view class="card-header">
      <view class="header-left">
        <view v-if="item.urgentLevel && item.urgentLevel !== 'normal'" class="urgent-tag" :class="'urgent-' + item.urgentLevel">
          {{ urgentText(item.urgentLevel) }}
        </view>
        <text class="task-title">{{ item.title }}</text>
      </view>
      <StatusTag :text="statusText(item.status)" :type="statusColor(item.status)" dot />
    </view>
    
    <text class="task-content">{{ item.content }}</text>
    
    <view v-if="item.deadline" class="task-deadline">
      <text class="deadline-icon">⏰</text>
      <text class="deadline-text">{{ formatDate(item.deadline, 'MM月DD日 HH:mm') }}</text>
      <text v-if="item.isOverdue" class="deadline-overdue">已超时</text>
    </view>
    
    <view v-if="item.assignee" class="task-assignee">
      <text class="assignee-label">责任人:</text>
      <text class="assignee-name">{{ item.assignee }}</text>
      <text v-if="item.assigneeRole" class="assignee-role">({{ item.assigneeRole }})</text>
    </view>
    
    <view class="task-footer">
      <view class="progress-wrap" v-if="item.progress !== undefined">
        <view class="progress-bar">
          <view class="progress-inner" :style="{ width: item.progress + '%' }"></view>
        </view>
        <text class="progress-text">{{ item.progress }}%</text>
      </view>
      <text class="footer-time">{{ relativeTime(item.createTime) }}</text>
    </view>
  </view>
</template>

<script setup>
import { relativeTime, formatDate, statusText, statusColor, urgentText } from '@/utils/format.js'
import StatusTag from './StatusTag.vue'

const props = defineProps({
  item: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['tap'])

function onTap() {
  emit('tap', props.item)
}
</script>

<style lang="scss" scoped>

.task-card {
  background-color: $white;
  border-radius: $card-radius;
  padding: $card-padding;
  box-shadow: $card-shadow;
  margin-bottom: $card-gap;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12rpx;
    
    .header-left {
      flex: 1;
      display: flex;
      align-items: flex-start;
      
      .urgent-tag {
        flex-shrink: 0;
        padding: $space-xs $space-md;
        border-radius: $radius-sm;
        font-size: $font-sub;
        margin-right: 12rpx;
        margin-top: 6rpx;
        
        &.urgent-urgent {
          background-color: rgba(230, 81, 0, 0.15);
          color: $warning;
        }
        
        &.urgent-critical {
          background-color: rgba(198, 40, 40, 0.15);
          color: $danger;
        }
      }
      
      .task-title {
        flex: 1;
        font-size: $font-card-title;
        font-weight: bold;
        color: $text-main;
        line-height: 1.4;
      }
    }
  }
  
  .task-content {
    font-size: $font-sub;
    color: $text-sub;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 16rpx;
  }
  
  .task-deadline {
    display: flex;
    align-items: center;
    margin-bottom: 12rpx;
    
    .deadline-icon {
      margin-right: 8rpx;
      font-size: $font-sub;
    }
    
    .deadline-text {
      font-size: $font-sub;
      color: $warning;
    }
    
    .deadline-overdue {
      margin-left: 12rpx;
      padding: 2rpx 12rpx;
      background-color: $danger;
      color: $white;
      border-radius: $radius-sm;
      font-size: $font-micro;
    }
  }
  
  .task-assignee {
    display: flex;
    align-items: center;
    margin-bottom: 12rpx;
    
    .assignee-label {
      font-size: $font-sub;
      color: $text-sub;
      margin-right: 8rpx;
    }
    
    .assignee-name {
      font-size: $font-sub;
      color: $primary;
      font-weight: bold;
    }
    
    .assignee-role {
      font-size: $font-sub;
      color: $text-sub;
      margin-left: 8rpx;
    }
  }
  
  .task-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16rpx;
    border-top: 2rpx solid $border;
    
    .progress-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      margin-right: 16rpx;
      
      .progress-bar {
        flex: 1;
        height: 16rpx;
        background-color: $border;
        border-radius: $radius-sm;
        overflow: hidden;
        margin-right: 12rpx;
        
        .progress-inner {
          height: 100%;
          background: linear-gradient(90deg, $primary, $gold);
          border-radius: $radius-sm;
          transition: width 0.3s;
        }
      }
      
      .progress-text {
        font-size: $font-sub;
        color: $primary;
        font-weight: bold;
      }
    }
    
    .footer-time {
      font-size: $font-sub;
      color: $text-weak;
    }
  }
  
  &:active {
    background-color: $bg;
  }
}
</style>
