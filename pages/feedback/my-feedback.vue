<!--
  pages/feedback/my-feedback.vue - 我的反映
  用途：查看自己提交的反映工单列表
-->
<template>
  <view class="page-my-feedback">
    <view class="filter-bar">
      <view 
        v-for="item in statusFilters"
        :key="item.value"
        class="filter-item"
        :class="{ active: currentStatus === item.value }"
        @click="switchStatus(item.value)"
      >
        {{ item.label }}
      </view>
    </view>
    
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <FeedbackCard 
        v-for="item in list" 
        :key="item._id" 
        :item="item"
        @tap="goDetail"
      />
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noFeedback', '暂无反映记录')" icon="📭" actionText="去反映" @action="goFeedback" />
      <view v-if="loading" class="loading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import FeedbackCard from '@/components/FeedbackCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'
import { usePagination } from '@/composables/usePagination.js'
import { ensureAuth, AUTH_LOGIN } from '@/utils/auth.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const currentStatus = ref('')

const statusFilters = [
  { value: '', label: '全部' },
  { value: 'pending', label: '待处理' },
  { value: 'processing', label: '处理中' },
  { value: 'completed', label: '已完成' },
  { value: 'evaluated', label: '已评价' }
]

const { list, loading, refresh, loadMore } = usePagination(
  (params) => callFunction('getMyFeedback', { ...params, status: currentStatus.value }),
  { pageSize: 10 }
)

onMounted(() => { if (ensureAuth(AUTH_LOGIN)) refresh() })
onShow(() => { if (ensureAuth(AUTH_LOGIN)) refresh() })
onPullDownRefresh(() => refresh())

function switchStatus(status) {
  currentStatus.value = status
  refresh()
}

function goDetail(item) {
  uni.navigateTo({ url: `/pages/feedback/detail?recordId=${item._id}` })
}

function goFeedback() {
  uni.navigateTo({ url: '/pages/feedback/feedback' })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-my-feedback {
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
