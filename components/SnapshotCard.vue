<!--
  SnapshotCard.vue - 随手拍卡片组件
  用途：列表页、公示墙展示单条随手拍
-->
<template>
  <view class="snapshot-card" @click="onTap">
    <view class="card-image-wrap">
      <image
        v-if="item.images && item.images.length"
        class="card-image"
        :src="item.images[0]"
        mode="aspectFill"
      />
      <view v-else class="card-image-placeholder">📷</view>
      
      <view v-if="item.likeCount > 0" class="like-badge">
        <text>👍 {{ item.likeCount }}</text>
      </view>
      
      <view v-if="item.isOverdue" class="overdue-badge">超时</view>
    </view>
    
    <view class="card-body">
      <view class="card-header">
        <view class="type-tag">{{ typeName }}</view>
        <StatusTag :text="statusText(item.status)" :type="statusColor(item.status)" />
      </view>
      
      <text class="card-content">{{ item.content }}</text>
      
      <view v-if="item.location && item.location.name" class="card-location">
        <text class="loc-icon">📍</text>
        <text class="loc-text">{{ item.location.name }}</text>
      </view>
      
      <view class="card-footer">
        <text class="footer-time">{{ relativeTime(item.createTime) }}</text>
        <text v-if="item.assignee" class="footer-assignee">承办: {{ item.assignee }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { relativeTime, statusText, statusColor } from '@/utils/format.js'
import { useConfigStore } from '@/store/config.js'
import StatusTag from './StatusTag.vue'

const props = defineProps({
  item: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['tap'])

const configStore = useConfigStore()

const typeName = computed(() => configStore.getSnapshotType(props.item.type))

function onTap() {
  emit('tap', props.item)
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.snapshot-card {
  background-color: $white;
  border-radius: $card-radius;
  overflow: hidden;
  box-shadow: $card-shadow;
  margin-bottom: $card-gap;
  
  .card-image-wrap {
    position: relative;
    width: 100%;
    height: 360rpx;
    background-color: $bg;
    
    .card-image {
      width: 100%;
      height: 100%;
    }
    
    .card-image-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 100rpx;
      color: $text-weak;
    }
    
    .like-badge {
      position: absolute;
      top: 16rpx;
      right: 16rpx;
      padding: 6rpx 16rpx;
      background-color: rgba(0, 0, 0, 0.6);
      color: $white;
      border-radius: 20rpx;
      font-size: $font-sub;
    }
    
    .overdue-badge {
      position: absolute;
      top: 16rpx;
      left: 16rpx;
      padding: 6rpx 16rpx;
      background-color: $danger;
      color: $white;
      border-radius: $radius-sm;
      font-size: $font-sub;
      font-weight: bold;
    }
  }
  
  .card-body {
    padding: $card-padding;
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12rpx;
      
      .type-tag {
        padding: $space-xs $space-md;
        background-color: $primary-light;
        color: $primary;
        border-radius: $radius-sm;
        font-size: $font-sub;
      }
    }
    
    .card-content {
      font-size: $font-body;
      color: $text-main;
      line-height: 1.5;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 12rpx;
    }
    
    .card-location {
      display: flex;
      align-items: center;
      margin-bottom: 12rpx;
      
      .loc-icon {
        font-size: $font-sub;
        margin-right: 8rpx;
      }
      
      .loc-text {
        font-size: $font-sub;
        color: $text-sub;
      }
    }
    
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12rpx;
      border-top: 2rpx solid $border;
      
      .footer-time {
        font-size: $font-sub;
        color: $text-weak;
      }
      
      .footer-assignee {
        font-size: $font-sub;
        color: $primary;
        font-weight: bold;
      }
    }
  }
  
  &:active {
    opacity: 0.9;
  }
}
</style>
