<!--
  pages/category/list.vue - 通用大类列表
  用途：按 query.type 显示大类，顶部筛选标签分小类；有小类的真实页面直达，无页面的显示占位
  名称读 display_names；大类/小类显隐读 modules
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-category">
    <view class="cat-header">
      <text class="cat-title">{{ catName }}</text>
    </view>

    <scroll-view scroll-x class="filter-bar">
      <view
        v-for="s in subs"
        :key="s.key"
        class="filter-item"
        :class="{ active: s.key === currentSub }"
        @click="currentSub = s.key"
      >{{ subName(s.key) }}</view>
    </scroll-view>

    <view class="body">
      <view v-if="activeSub && activeSub.path" class="entry-card" @click="go(activeSub.path)">
        <text class="entry-title">进入{{ subName(activeSub.key) }}</text>
        <text class="entry-arrow">›</text>
      </view>
      <EmptyState v-else  :text="t('emptyState.contentBuilding', '内容建设中')" icon="📁" />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useConfigStore } from '@/store/config.js'
import EmptyState from '@/components/EmptyState.vue'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()

const categoryMap = {
  info: {
    subs: [
      { key: 'finance', path: '/pages/finance/list' },
      { key: 'project', path: '/pages/project/list' },
      { key: 'policy', path: '/pages/task/list' },
      { key: 'meeting', path: '/pages/meeting/list' },
      { key: 'news', path: '/pages/news/list' },
      { key: 'team', path: '/pages/team/index' }
    ]
  },
  complaint: {
    subs: [
      { key: 'feedback', path: '/pages/feedback/feedback' },
      { key: 'snapshot', path: '/pages/snapshot/snapshot' },
      { key: 'mailbox', path: '/pages/secretary/mailbox' },
      { key: 'myFeedback', path: '/pages/feedback/my-feedback' },
      { key: 'report', path: '/pages/report/index' }
    ]
  },
  study: {
    subs: [
      { key: 'policyStudy' },
      { key: 'partyStudy' },
      { key: 'agriStudy' },
      { key: 'lawStudy' },
      { key: 'healthStudy' }
    ]
  },
  service: {
    subs: [
      { key: 'guide', path: '/pages/service/guide' },
      { key: 'market', path: '/pages/market/list' },
      { key: 'subsidy' },
      { key: 'task', path: '/pages/task/list' },
      { key: 'team', path: '/pages/team/index' }
    ]
  },
  life: {
    subs: [
      { key: 'calendar', path: '/pages/agri/calendar' },
      { key: 'checkin', path: '/pages/agri/checkin' },
      { key: 'lostFound', path: '/pages/lost-found/list' },
      { key: 'phone' }
    ]
  }
}

const type = ref('info')
const currentSub = ref('')

onLoad((query) => {
  type.value = (query && query.type) || 'info'
  const g = categoryMap[type.value]
  currentSub.value = g && g.subs.length ? g.subs[0].key : ''
})

const catName = computed(() => configStore.getDisplay('category.' + type.value, type.value))
const subs = computed(() => (categoryMap[type.value] || { subs: [] }).subs)
const activeSub = computed(() => subs.value.find(s => s.key === currentSub.value) || null)

function subName(key) {
  return configStore.getDisplay('subCategory.' + key, key)
}
function go(path) {
  uni.navigateTo({ url: path })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-category {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  box-sizing: border-box;
}

.cat-header {
  margin-bottom: $card-gap;

  .cat-title {
    font-size: $font-title;
    font-weight: bold;
    color: $text-main;
    border-left: 8rpx solid $primary;
    padding-left: 16rpx;
  }
}

.filter-bar {
  white-space: nowrap;
  margin-bottom: $card-gap;

  .filter-item {
    display: inline-block;
    padding: $space-sm $space-lg;
    margin-right: 16rpx;
    font-size: $font-body;
    color: $text-sub;
    background: $white;
    border-radius: $radius-full;
    box-shadow: $card-shadow;

    &.active { color: $white; background: $primary; font-weight: bold; }
  }
}

.entry-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: $btn-height;
  padding: $card-padding;
  background: $white;
  border-radius: $card-radius;
  box-shadow: $card-shadow;

  .entry-title { font-size: $font-body; color: $primary; font-weight: bold; }
  .entry-arrow { font-size: $font-number; color: $primary; }
  &:active { background: $bg; }
}
</style>
