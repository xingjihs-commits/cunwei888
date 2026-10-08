<!--
  pages/snapshot/wall.vue - 随手拍公示墙
  用途：展示已公示的随手拍，可点赞
-->
<template>
  <view class="page-wall">
    <view class="filter-bar">
      <view 
        v-for="item in configStore.snapshotTypes"
        :key="item.key"
        class="filter-item"
        :class="{ active: currentType === item.key }"
        @click="switchType(item.key)"
      >{{ item.name }}</view>
    </view>
    
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view class="waterfall">
        <SnapshotCard 
          v-for="item in list"
          :key="item._id"
          :item="item"
          @tap="goDetail"
        />
      </view>
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noData', '暂无随手拍')" icon="📷" actionText="去拍照" @action="goSnapshot" />
      <view v-if="loading" class="loading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { useConfigStore } from '@/store/config.js'
import SnapshotCard from '@/components/SnapshotCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const list = ref([])
const loading = ref(false)
const page = ref(1)
const total = ref(0)
const currentType = ref('')

onMounted(() => loadData())
onPullDownRefresh(() => {
  page.value = 1
  loadData()
})

async function loadData() {
  if (loading.value) return
  loading.value = true
  
  try {
    const res = await callFunction('getSnapshotWall', {
      page: page.value,
      pageSize: 20,
      type: currentType.value
    })
    
    if (res.success) {
      if (page.value === 1) {
        list.value = res.data
      } else {
        list.value = list.value.concat(res.data)
      }
      total.value = res.total
    }
  } catch (err) {
    console.error('加载失败:', err)
  } finally {
    loading.value = false
    uni.stopPullDownRefresh()
  }
}

function switchType(type) {
  currentType.value = type
  page.value = 1
  loadData()
}

function loadMore() {
  if (list.value.length < total.value && !loading.value) {
    page.value++
    loadData()
  }
}

function goDetail(item) {
  uni.navigateTo({ url: `/pages/snapshot/detail?recordId=${item._id}` })
}

function goSnapshot() {
  uni.navigateTo({ url: '/pages/snapshot/snapshot' })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-wall {
  min-height: 100vh;
  background: $bg;
  
  .filter-bar {
    display: flex;
    overflow-x: auto;
    background: $white;
    padding: $space-md $page-padding;
    box-shadow: $card-shadow;
    white-space: nowrap;
    
    .filter-item {
      padding: $space-sm $space-xl;
      font-size: $font-sub;
      color: $text-sub;
      border-radius: $radius-sm;
      margin-right: 16rpx;
      flex-shrink: 0;
      
      &.active {
        color: $white;
        background: $primary;
        font-weight: bold;
      }
    }
  }
  
  .list {
    height: calc(100vh - 120rpx);
    padding: $page-padding;
    box-sizing: border-box;
  }
  
  .waterfall {
    column-count: 2;
    column-gap: $card-gap;
  }
  
  .loading {
    text-align: center;
    padding: $card-padding;
    font-size: $font-sub;
    color: $text-weak;
  }
}
</style>
