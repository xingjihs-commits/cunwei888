<!--
  components/home/LeaderCare.vue - 首页「书记风采 / 上级走访」大卡
  对齐布局方案 6.3 模块4：切换条 80rpx + 封面图 320rpx + 标题 + 信息条
-->
<template>
  <view class="showcase">
    <view class="sc-tabs">
      <view class="sc-tab" :class="{ active: modelValue === 'secretary' }" @click="$emit('update:modelValue', 'secretary')">
        {{ t('pageTitle.leader', '书记风采') }}
      </view>
      <view class="sc-tab" :class="{ active: modelValue === 'leader' }" @click="$emit('update:modelValue', 'leader')">
        上级走访
      </view>
    </view>

    <view v-if="item" class="sc-card">
      <view class="sc-cover" @click="$emit('openItem', item)">
        <image v-if="item.coverImage" class="sc-img" :src="item.coverImage" mode="aspectFill" />
        <view v-else class="sc-img sc-placeholder">🎬</view>
        <view v-if="isVideo" class="sc-badge">📹 视频</view>
      </view>
      <view class="sc-body">
        <text class="sc-title">{{ item.title }}</text>
        <view class="sc-meta">
          <text class="sc-date">📅 {{ formatDate(item.publishTime || item.createTime) }}</text>
          <text class="sc-type">{{ isVideo ? '📹 视频' : '📝 图文' }}</text>
          <text class="sc-more" @click.stop="$emit('viewAll')">更多 ›</text>
        </view>
      </view>
    </view>

    <view v-else class="sc-empty">
      <text class="sc-empty-icon">📭</text>
      <text class="sc-empty-text">暂无内容</text>
      <text class="sc-empty-sub">等村委发布后展示</text>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { formatDate } from '@/utils/format.js'
import { useConfigStore } from '@/store/config.js'

const props = defineProps({
  modelValue: { type: String, default: 'secretary' },
  item: { type: Object, default: null }
})
defineEmits(['update:modelValue', 'openItem', 'viewAll'])

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const isVideo = computed(() => !!(props.item && props.item.type === 'video'))
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.showcase {
  background: $white;
  border-radius: $card-radius;
  box-shadow: $card-shadow;
  overflow: hidden;

  .sc-tabs {
    display: flex;
    height: 80rpx;

    .sc-tab {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32rpx;
      color: $text-sub;

      &.active { color: $text-main; font-weight: bold; }
    }
  }

  .sc-card {
    .sc-cover {
      position: relative;
      height: 320rpx;

      .sc-img { width: 100%; height: 320rpx; background: $bg; }
      .sc-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 80rpx;
      }
      .sc-badge {
        position: absolute;
        right: 16rpx;
        bottom: 16rpx;
        padding: 4rpx 16rpx;
        background: rgba(0, 0, 0, 0.5);
        color: $white;
        font-size: $font-micro;
        border-radius: $radius-sm;
      }
    }

    .sc-body {
      padding: $card-padding;

      .sc-title {
        display: block;
        font-size: 32rpx;
        font-weight: bold;
        color: $text-main;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .sc-meta {
        display: flex;
        align-items: center;
        margin-top: 12rpx;

        .sc-date { font-size: $font-micro; color: $text-weak; }
        .sc-type { font-size: $font-micro; color: $text-weak; margin-left: 16rpx; }
        .sc-more { margin-left: auto; font-size: $font-sub; color: $primary; }
      }
    }
  }

  .sc-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80rpx 0;

    .sc-empty-icon { font-size: 72rpx; }
    .sc-empty-text { font-size: $font-body; color: $text-sub; margin-top: 12rpx; }
    .sc-empty-sub { font-size: $font-sub; color: $text-weak; margin-top: 8rpx; }
  }
}
</style>
