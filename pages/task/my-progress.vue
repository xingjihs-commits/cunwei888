<!--
  pages/task/my-progress.vue - 我的办理
  用途：责任人查看自己负责的任务
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-my-progress">
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
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <TaskCard 
        v-for="item in list"
        :key="item._id"
        :item="item"
        @tap="goDetail"
      />
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noData', '暂无办理任务')" icon="📋" />
      <view v-if="loading" class="loading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import TaskCard from '@/components/TaskCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'
import { ensureAuth, AUTH_LOGIN } from '@/utils/auth.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const list = ref([])
const loading = ref(false)
const page = ref(1)
const total = ref(0)
const currentStatus = ref('')

const statusFilters = [
  { value: '', label: '全部' },
  { value: 'assigned', label: '待办理' },
  { value: 'processing', label: '办理中' },
  { value: 'completed', label: '已完成' }
]

onMounted(() => { if (ensureAuth(AUTH_LOGIN)) loadData() })
onShow(() => {
  if (!ensureAuth(AUTH_LOGIN)) return
  page.value = 1
  loadData()
})

async function loadData() {
  if (loading.value) return
  loading.value = true
  
  try {
    // 复用任务列表接口，按assigneeOpenid过滤
    const res = await callFunction('getTasks', {
      page: page.value,
      pageSize: 20,
      status: currentStatus.value
    })
    
    if (res.success) {
      // 客户端过滤：只显示我负责的
      const myOpenid = uni.getStorageSync('userInfo')?.openid
      const filtered = res.data.filter(t => t.assigneeOpenid === myOpenid)
      
      if (page.value === 1) {
        list.value = filtered
      } else {
        list.value = list.value.concat(filtered)
      }
      total.value = res.total
    }
  } catch (err) {
    console.error('加载失败:', err)
  } finally {
    loading.value = false
  }
}

function switchStatus(status) {
  currentStatus.value = status
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
  uni.navigateTo({ url: `/pages/task/detail?taskId=${item._id}` })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-my-progress {
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
