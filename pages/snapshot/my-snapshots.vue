<!--
  pages/snapshot/my-snapshots.vue - 我的随手拍
  用途：查看自己提交的随手拍记录
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
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
import { useRootFontSize } from '@/composables/useA11y.js'
import { onMounted } from 'vue'
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import SnapshotCard from '@/components/SnapshotCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'
import { usePagination } from '@/composables/usePagination.js'
import { ensureAuth, AUTH_LOGIN } from '@/utils/auth.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const { list, loading, refresh, loadMore } = usePagination(
  (params) => callFunction('getMySnapshots', params),
  { pageSize: 10 }
)

onMounted(() => { if (ensureAuth(AUTH_LOGIN)) refresh() })
onShow(() => { if (ensureAuth(AUTH_LOGIN)) refresh() })
onPullDownRefresh(() => refresh())

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
