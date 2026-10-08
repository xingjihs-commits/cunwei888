<!--
  pages/secretary/broadcast.vue - 书记广播
  用途：村民查看书记发布的广播
-->
<template>
  <view class="page-broadcast">
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view v-for="item in list" :key="item._id" class="bcast-card" @click="goDetail(item)">
        <view v-if="item.urgent" class="urgent-tag">紧急</view>
        <view class="card-header">
          <view class="bcast-icon">📢</view>
          <view class="bcast-info">
            <text class="bcast-title">{{ item.title }}</text>
            <text class="bcast-time">{{ relativeTime(item.createTime) }}</text>
          </view>
        </view>
        <text class="bcast-content">{{ item.content }}</text>
        <view v-if="item.audioFileID" class="audio-row">
          <text class="audio-icon">🎙️</text>
          <text class="audio-text">书记语音广播</text>
        </view>
      </view>
      <EmptyState v-if="list.length === 0 && !loading"  :text="t('emptyState.noBroadcast', '暂无广播')" icon="📢" />
      <view v-if="loading" class="loading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { relativeTime } from '@/utils/format.js'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const list = ref([])
const loading = ref(false)
const page = ref(1)
const total = ref(0)

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.broadcast', '书记广播') })
  loadData()
})
onPullDownRefresh(() => { page.value = 1; loadData() })

async function loadData() {
  if (loading.value) return
  loading.value = true
  try {
    const res = await callFunction('getBroadcasts', { page: page.value, pageSize: 10 })
    if (res.success) {
      if (page.value === 1) list.value = res.data
      else list.value = list.value.concat(res.data)
      total.value = res.total
    }
  } catch (err) { console.error(err) }
  finally { loading.value = false; uni.stopPullDownRefresh() }
}

function loadMore() {
  if (list.value.length < total.value && !loading.value) { page.value++; loadData() }
}

function goDetail(item) {
  uni.navigateTo({ url: `/pages/secretary/broadcast-detail?broadcastId=${item._id}` })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-broadcast {
  min-height: 100vh; background: $bg;
  .list { height: 100vh; padding: $page-padding; box-sizing: border-box; }
  .bcast-card {
    position: relative;
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    .urgent-tag {
      position: absolute; top: 16rpx; right: 16rpx;
      padding: $space-xs $space-md;
      background: $danger; color: $white;
      border-radius: $radius-sm; font-size: $font-micro;
    }
    .card-header {
      display: flex; align-items: center; margin-bottom: 16rpx;
      .bcast-icon { font-size: 56rpx; margin-right: 16rpx; }
      .bcast-info { flex: 1; }
      .bcast-title { font-size: $font-card-title; font-weight: bold; color: $text-main; display: block; }
      .bcast-time { font-size: $font-sub; color: $text-weak; }
    }
    .bcast-content {
      font-size: $font-body; color: $text-main; line-height: 1.6;
      display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
    }
    .audio-row {
      display: flex; align-items: center;
      margin-top: 16rpx; padding: $space-md;
      background: $primary-light; border-radius: $radius-md;
      .audio-icon { font-size: $font-card-title; margin-right: 12rpx; }
      .audio-text { font-size: $font-sub; color: $primary; }
    }
  }
  .loading { text-align: center; padding: $card-padding; font-size: $font-sub; color: $text-weak; }
}
</style>
