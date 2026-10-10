<!--
  pages/task/list.vue - 政策落实任务列表
  用途：展示政策落实任务，可查看任务详情
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-task">
    <view class="filter-bar">
      <view 
        v-for="item in statusFilters"
        :key="item.value"
        class="filter-item"
        :class="{ active: currentStatus === item.value }"
        @click="switchStatus(item.value)"
      >{{ item.label }}</view>
    </view>
    
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <AppErrorBanner v-if="error" mode="inline" @retry="refresh" />
      <template v-else>
        <Skeleton v-if="loading && list.length === 0" type="list" />
        <TaskCard 
          v-for="item in list"
          :key="item._id"
          :item="item"
          @tap="goDetail"
        />
        <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noData', '暂无任务')" icon="📋" />
        <view v-if="loading" class="loading">加载中...</view>
      </template>
    </scroll-view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import TaskCard from '@/components/TaskCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import AppErrorBanner from '@/components/AppErrorBanner.vue'
import { useConfigStore } from '@/store/config.js'
import { usePagination } from '@/composables/usePagination.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const currentStatus = ref('')

const statusFilters = [
  { value: '', label: '全部' },
  { value: 'assigned', label: '进行中' },
  { value: 'processing', label: '办理中' },
  { value: 'completed', label: '已完成' }
]

const { list, loading, error, refresh, loadMore } = usePagination(
  (params) => callFunction('getTasks', {
    ...params,
    status: currentStatus.value
  }),
  { pageSize: 20 }
)

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.task', '政策落实') })
  refresh()
})
onPullDownRefresh(() => refresh())

function switchStatus(status) {
  currentStatus.value = status
  refresh()
}

function goDetail(item) {
  uni.navigateTo({ url: `/pages/task/detail?taskId=${item._id}` })
}
</script>

<style lang="scss" scoped>

.page-task {
  min-height: 100vh;
  background: $bg;
  
  .filter-bar {
    display: flex;
    background: $white;
    padding: $space-md $page-padding;
    box-shadow: $card-shadow;
    
    .filter-item {
      flex: 1;
      text-align: center;
      padding: $space-md 0;
      font-size: $font-sub;
      color: $text-sub;
      border-radius: $radius-sm;
      
      &.active {
        color: $primary;
        font-weight: bold;
        background: $primary-light;
      }
    }
  }
  
  .list {
    height: calc(100vh - 120rpx);
    padding: $page-padding;
    box-sizing: border-box;
  }
  
  .loading {
    text-align: center;
    padding: $card-padding;
    font-size: $font-sub;
    color: $text-weak;
  }
}
</style>
