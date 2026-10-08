<!--
  pages/snapshot/my-snapshots.vue - 我的随手拍
  用途：查看自己提交的随手拍记录
-->
<template>
  <view class="page-my-snapshots">
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <SnapshotCard 
        v-for="item in list"
        :key="item._id"
        :item="item"
        @tap="goDetail"
      />
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noData', '暂无随手拍记录')" icon="📷" actionText="去拍照" @action="goSnapshot" />
      <view v-if="loading" class="loading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import SnapshotCard from '@/components/SnapshotCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'
import { ensureAuth, AUTH_LOGIN } from '@/utils/auth.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const list = ref([])
const loading = ref(false)
const page = ref(1)
const total = ref(0)

onMounted(() => { if (ensureAuth(AUTH_LOGIN)) loadData() })
onShow(() => {
  if (!ensureAuth(AUTH_LOGIN)) return
  page.value = 1
  loadData()
})
onPullDownRefresh(() => {
  page.value = 1
  loadData()
})

async function loadData() {
  if (loading.value) return
  loading.value = true
  
  try {
    const res = await callFunction('getMySnapshots', {
      page: page.value,
      pageSize: 10
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

.page-my-snapshots {
  min-height: 100vh;
  background: $bg;
  
  .list {
    height: 100vh;
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
