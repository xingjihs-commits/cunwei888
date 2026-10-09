<!--
  pages/service/guide.vue - 办事指南
  用途：村级办事指南（低保、医保、宅基地等）
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-guide">
    <view class="search-bar">
      <view class="search-input-wrap">
        <text class="search-icon">🔍</text>
        <input v-model="keyword" class="search-input"  :placeholder="t('placeholder.searchGuide', '搜索办事项目')" @confirm="onSearch" />
      </view>
    </view>
    
    <view class="cat-bar">
      <view v-for="cat in categories" :key="cat" class="cat-item"
        :class="{ active: currentCategory === cat }"
        @click="switchCategory(cat)">{{ cat }}</view>
    </view>
    
    <scroll-view scroll-y class="list">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view v-for="item in list" :key="item._id" class="guide-card" @click="goDetail(item)">
        <view class="card-row">
          <view class="guide-icon">{{ item.icon || '📋' }}</view>
          <view class="guide-info">
            <text class="guide-title">{{ item.title }}</text>
            <text class="guide-cat">{{ item.category }}</text>
          </view>
          <view class="guide-arrow">›</view>
        </view>
        <text class="guide-summary">{{ item.summary || item.description }}</text>
        <view class="guide-meta">
          <text class="meta-text">👁️ {{ item.viewCount || 0 }}</text>
          <text class="meta-text">📍 {{ item.location || t('tip.villageOffice', '村委办') }}</text>
        </view>
      </view>
      <EmptyState v-if="list.length === 0 && !loading"  :text="t('emptyState.noGuide', '暂无办事指南')" icon="📋" />
      <view v-if="loading" class="loading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const list = ref([])
const loading = ref(false)
const keyword = ref('')
const currentCategory = ref('全部')
const categories = ['全部', '低保社保', '医保养老', '宅基地', '户口生育', '证明出具', '其他']

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.guide', '办事指南') })
  loadData()
})
onPullDownRefresh(() => loadData())

async function loadData() {
  if (loading.value) return
  loading.value = true
  try {
    const res = await callFunction('getServiceGuides', {
      category: currentCategory.value === '全部' ? '' : currentCategory.value,
      keyword: keyword.value
    })
    if (res.success) list.value = res.data
  } catch (err) { console.error(err) }
  finally { loading.value = false; uni.stopPullDownRefresh() }
}

function switchCategory(cat) {
  currentCategory.value = cat
  loadData()
}

function onSearch() { loadData() }

function goDetail(item) {
  uni.navigateTo({ url: `/pages/service/guide-detail?guideId=${item._id}` })
}
</script>

<style lang="scss" scoped>
.page-guide {
  min-height: 100vh; background: $bg;
  .search-bar {
    padding: $space-md $page-padding; background: $white; box-shadow: $card-shadow;
    .search-input-wrap {
      display: flex; align-items: center;
      padding: $space-md $space-lg; background: $bg; border-radius: $btn-radius;
      .search-icon { font-size: $font-body; margin-right: 12rpx; }
      .search-input { flex: 1; font-size: $font-body; height: 56rpx; }
    }
  }
  .cat-bar {
    display: flex; overflow-x: auto; background: $white;
    padding: $space-md $page-padding; box-shadow: $card-shadow; white-space: nowrap;
    .cat-item {
      padding: $space-sm $space-xl; font-size: $font-sub; color: $text-sub;
      border-radius: $radius-sm; margin-right: 16rpx; flex-shrink: 0;
      &.active { color: $white; background: $primary; font-weight: bold; }
    }
  }
  .list { height: calc(100vh - 220rpx); padding: $page-padding; box-sizing: border-box; }
  .guide-card {
    background: $white; border-radius: $card-radius; padding: $card-padding;
    box-shadow: $card-shadow; margin-bottom: $card-gap;
    .card-row { display: flex; align-items: center; margin-bottom: 12rpx; }
    .guide-icon { font-size: 56rpx; margin-right: 16rpx; width: 80rpx; text-align: center; }
    .guide-info { flex: 1; }
    .guide-title { font-size: $font-card-title; font-weight: bold; color: $text-main; display: block; }
    .guide-cat { font-size: $font-sub; color: $primary; }
    .guide-arrow { font-size: $font-number; color: $text-weak; }
    .guide-summary { font-size: $font-sub; color: $text-sub; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .guide-meta { display: flex; gap: 24rpx; margin-top: 12rpx; padding-top: 12rpx; border-top: 2rpx solid $border; }
    .meta-text { font-size: $font-sub; color: $text-weak; }
    &:active { background: $bg; }
  }
  .loading { text-align: center; padding: $card-padding; font-size: $font-sub; color: $text-weak; }
}
</style>
