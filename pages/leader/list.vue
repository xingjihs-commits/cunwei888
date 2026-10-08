<!--
  pages/leader/list.vue - 书记风采 / 领导关怀 列表
  顶部 Tab 切换，默认书记风采；点击进详情
-->
<template>
  <view class="page-leader">
    <view class="tabs">
      <view class="tab" :class="{ active: type === 'secretary' }" @click="switchType('secretary')">
        {{ t('pageTitle.leader', '书记风采') }}
      </view>
      <view class="tab" :class="{ active: type === 'leader' }" @click="switchType('leader')">领导关怀</view>
    </view>

    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view v-for="item in list" :key="item._id" class="item" @click="goDetail(item)">
        <image v-if="item.coverImage" class="item-img" :src="item.coverImage" mode="aspectFill" />
        <view v-else class="item-img placeholder">🎬</view>
        <view class="item-info">
          <text class="item-title">{{ item.title }}</text>
          <text class="item-time">{{ formatDate(item.publishTime || item.createTime) }}</text>
        </view>
      </view>
      <EmptyState v-if="list.length === 0 && !loading"  :text="t('emptyState.noContent', '暂无内容')" icon="🎬" />
      <view v-if="loading" class="loading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatDate } from '@/utils/format.js'
import { useConfigStore } from '@/store/config.js'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'

const configStore = useConfigStore()
const type = ref('secretary')
const list = ref([])
const loading = ref(false)
let page = 1
let total = 0

function t(p, d = '') { return configStore.getDisplay(p, d) }

function switchType(ty) {
  if (type.value === ty) return
  type.value = ty
  page = 1
  list.value = []
  load()
}

onLoad((q) => {
  if (q && q.type) type.value = q.type
  load()
})

onPullDownRefresh(async () => {
  page = 1
  await load()
  uni.stopPullDownRefresh()
})

async function load() {
  if (loading.value) return
  loading.value = true
  try {
    const res = await callFunction('getLeaderContentList', { type: type.value, page, pageSize: 10 })
    if (res.success) {
      list.value = page === 1 ? res.data : list.value.concat(res.data)
      total = res.total || 0
    }
  } catch (err) {
    console.error('[leader list] 加载失败:', err)
  } finally {
    loading.value = false
  }
}

function loadMore() {
  if (list.value.length < total && !loading.value) {
    page++
    load()
  }
}

function goDetail(item) {
  uni.navigateTo({ url: '/pages/leader/detail?id=' + item._id })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-leader {
  min-height: 100vh;
  background: $bg;

  .tabs {
    display: flex;
    .tab {
      flex: 1;
      text-align: center;
      padding: $card-padding 0;
      font-size: $font-body;
      color: $text-sub;
      background: $white;
      font-weight: bold;
      &.active { background: $primary; color: $white; }
    }
  }

  .list { height: calc(100vh - 120rpx); padding: $page-padding; box-sizing: border-box; }

  .item {
    display: flex;
    background: $white;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    overflow: hidden;
    &:active { background: $bg; }

    .item-img {
      width: 200rpx;
      height: 160rpx;
      flex-shrink: 0;
      background: $bg;

      &.placeholder { display: flex; align-items: center; justify-content: center; font-size: 56rpx; color: $text-weak; }
    }

    .item-info {
      flex: 1;
      padding: $card-padding;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .item-title { font-size: $font-card-title; font-weight: bold; color: $text-main; }
      .item-time { font-size: $font-sub; color: $text-weak; margin-top: 12rpx; }
    }
  }

  .loading { text-align: center; padding: $card-padding; font-size: $font-sub; color: $text-weak; }
}
</style>
