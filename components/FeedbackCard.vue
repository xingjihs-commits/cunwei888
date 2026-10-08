<!--
  FeedbackCard.vue - 反映/工单卡片组件
  用途：列表页展示单条工单
-->
<template>
  <view class="feedback-card" @click="onTap">
    <view class="card-header">
      <view class="header-left">
        <view class="type-tag">{{ typeName }}</view>
        <StatusTag v-if="item.isOverdue"  :text="t('status.overdue', '已超时')" type="danger" />
      </view>
      <StatusTag :text="statusText(item.status)" :type="statusColor(item.status)" dot />
    </view>
    
    <text class="card-title">{{ item.title || t('emptyState.noTitle', '无标题') }}</text>
    <text class="card-content">{{ item.content }}</text>
    
    <view v-if="item.images && item.images.length" class="card-images">
      <image
        v-for="(img, i) in item.images.slice(0, 3)"
        :key="i"
        class="card-img"
        :src="img"
        mode="aspectFill"
      />
    </view>
    
    <view class="card-footer">
      <text class="footer-time">{{ relativeTime(item.createTime) }}</text>
      <view v-if="item.assignee" class="footer-assignee">
        <text class="assignee-label">承办人:</text>
        <text class="assignee-name">{{ item.assignee }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useConfigStore } from '@/store/config.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

import { computed } from 'vue'
import { relativeTime, statusText, statusColor } from '@/utils/format.js'
import StatusTag from './StatusTag.vue'

const props = defineProps({
  item: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['tap'])

const typeName = computed(() => {
  return configStore.getFeedbackType(props.item.type) || '其他'
})

function onTap() {
  emit('tap', props.item)
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.feedback-card {
  background-color: $white;
  border-radius: $card-radius;
  padding: $card-padding;
  box-shadow: $card-shadow;
  margin-bottom: $card-gap;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;
    
    .header-left {
      display: flex;
      align-items: center;
      gap: 12rpx;
    }
    
    .type-tag {
      padding: $space-xs $space-md;
      background-color: $primary-light;
      color: $primary;
      border-radius: $radius-sm;
      font-size: $font-sub;
    }
  }
  
  .card-title {
    font-size: $font-card-title;
    font-weight: bold;
    color: $text-main;
    margin-bottom: 12rpx;
    display: block;
  }
  
  .card-content {
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
  
  .card-images {
    display: flex;
    gap: 12rpx;
    margin-bottom: 16rpx;
    
    .card-img {
      width: 160rpx;
      height: 160rpx;
      border-radius: $radius-md;
      background-color: $bg;
    }
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16rpx;
    border-top: 2rpx solid $border;
    
    .footer-time {
      font-size: $font-sub;
      color: $text-weak;
    }
    
    .footer-assignee {
      display: flex;
      align-items: center;
      
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
    }
  }
  
  &:active {
    background-color: $bg;
  }
}
</style>
