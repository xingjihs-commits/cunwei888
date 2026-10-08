<!--
  pages/lost-found/list.vue - 失物招领
-->
<template>
  <view class="page-lf">
    <view class="filter-bar">
      <view class="filter-item" :class="{ active: currentType === '' }" @click="switchType('')">全部</view>
      <view class="filter-item" :class="{ active: currentType === 'lost' }" @click="switchType('lost')">寻物</view>
      <view class="filter-item" :class="{ active: currentType === 'found' }" @click="switchType('found')">招领</view>
    </view>
    
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view v-for="item in list" :key="item._id" class="lf-card" @click="goDetail(item)">
        <view class="card-header">
          <view class="type-tag" :class="item.subType">{{ ['寻物','招领'].includes(item.subType) ? item.subType : (item.subType === 'lost' ? '寻物' : '招领') }}</view>
          <text class="lf-time">{{ relativeTime(item.createTime) }}</text>
        </view>
        <text class="lf-title">{{ item.title }}</text>
        <text class="lf-content">{{ item.content }}</text>
        <view v-if="item.images && item.images.length" class="image-row">
          <image v-for="(img, i) in item.images.slice(0, 3)" :key="i" class="lf-img" :src="img" mode="aspectFill" lazy-load />
        </view>
        <view v-if="item.location" class="lf-location">📍 {{ item.location }}</view>
      </view>
      <EmptyState v-if="list.length === 0 && !loading"  :text="t('emptyState.noInfo', '暂无信息')" icon="📦" :actionText="t('button.publish', '发布')" @action="goPublish" />
      <view v-if="loading" class="loading">加载中...</view>
    </scroll-view>
    
    <view class="fab" @click="goPublish"><text>+</text></view>
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
const currentType = ref('')

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.lostFound', '失物招领') })
  loadData()
})
onPullDownRefresh(() => { page.value = 1; loadData() })

async function loadData() {
  if (loading.value) return
  loading.value = true
  try {
    const res = await callFunction('getLostFoundList', { page: page.value, pageSize: 20, subType: currentType.value })
    if (res.success) {
      if (page.value === 1) list.value = res.data
      else list.value = list.value.concat(res.data)
      total.value = res.total
    }
  } catch (err) { console.error(err) }
  finally { loading.value = false; uni.stopPullDownRefresh() }
}

function switchType(type) { currentType.value = type; page.value = 1; loadData() }
function loadMore() { if (list.value.length < total.value && !loading.value) { page.value++; loadData() } }
function goDetail(item) { uni.navigateTo({ url: `/pages/lost-found/detail?recordId=${item._id}` }) }
function goPublish() { uni.navigateTo({ url: '/pages/lost-found/publish' }) }
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-lf { min-height: 100vh; background: $bg;
  .filter-bar { display: flex; background: $white; padding: $space-md $page-padding; box-shadow: $card-shadow;
    .filter-item { flex: 1; text-align: center; padding: $space-md 0; font-size: $font-sub; color: $text-sub; border-radius: $radius-sm;
      &.active { color: $primary; font-weight: bold; background: $primary-light; } } }
  .list { height: calc(100vh - 120rpx); padding: $page-padding; box-sizing: border-box; }
  .lf-card { background: $white; border-radius: $card-radius; padding: $card-padding; box-shadow: $card-shadow; margin-bottom: $card-gap;
    .card-header { display: flex; justify-content: space-between; margin-bottom: 12rpx; }
    .type-tag { padding: $space-xs $space-md; border-radius: $radius-sm; font-size: $font-micro;
      &.lost { background: rgba(230,81,0,0.1); color: $warning; }
      &.found { background: rgba(46,125,50,0.1); color: $success; } }
    .lf-time { font-size: $font-sub; color: $text-weak; }
    .lf-title { font-size: $font-card-title; font-weight: bold; color: $text-main; display: block; margin-bottom: 8rpx; }
    .lf-content { font-size: $font-sub; color: $text-sub; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .image-row { display: flex; gap: 12rpx; margin: 12rpx 0;
      .lf-img { width: 120rpx; height: 120rpx; border-radius: $radius-md; } }
    .lf-location { font-size: $font-sub; color: $text-sub; }
    &:active { background: $bg; } }
  .loading { text-align: center; padding: $card-padding; font-size: $font-sub; color: $text-weak; }
  .fab { position: fixed; right: 32rpx; bottom: 100rpx; width: 100rpx; height: 100rpx; background: $primary; color: $white; border-radius: $radius-full; display: flex; align-items: center; justify-content: center; font-size: 60rpx; box-shadow: 0 4rpx 16rpx rgba(196, 30, 36, 0.4); } }
</style>
