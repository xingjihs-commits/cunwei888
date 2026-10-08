<!--
  pages/service/more.vue - 更多服务
  分组：办事/查询/生活/学习；名称读 display_names，显隐读 modules；暂未建独立页面的大类指向 category/list?type=xxx
-->
<template>
  <view class="page-more">
    <view v-for="g in groups" :key="g.title" class="group">
      <view class="group-title">{{ g.title }}</view>
      <view class="group-grid">
        <view
          v-for="it in g.items"
          :key="it.name"
          class="entry"
          @click="go(it.path)"
        >
          <view class="entry-icon">{{ it.icon }}</view>
          <text class="entry-text">{{ it.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/store/config.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
function show(p) { return configStore.isModuleEnabled(p) }

const raw = [
  {
    title: '办事',
    items: [
      { icon: '💬', nk: 'subCategory.myFeedback', path: '/pages/feedback/my-feedback' },
      { icon: '📷', nk: 'subCategory.snapshot', path: '/pages/snapshot/my-snapshots' },
      { icon: '✉️', nk: 'subCategory.mailbox', path: '/pages/secretary/my-mails' }
    ]
  },
  {
    title: '查询',
    items: [
      { icon: '📝', nk: 'subCategory.meeting', path: '/pages/meeting/list', mod: 'entry.meeting' },
      { icon: '📜', nk: 'subCategory.task', path: '/pages/task/list', mod: 'entry.task' },
      { icon: '👥', nk: 'subCategory.team', path: '/pages/team/index', mod: 'entry.team' },
      { icon: '💰', nk: 'subCategory.finance', path: '/pages/finance/list', mod: 'entry.finance' }
    ]
  },
  {
    title: '生活',
    items: [
      { icon: '🌾', nk: 'subCategory.calendar', path: '/pages/agri/calendar', mod: 'entry.calendar' },
      { icon: '☀️', nk: 'subCategory.checkin', path: '/pages/agri/checkin', mod: 'entry.checkin' },
      { icon: '📦', nk: 'subCategory.lostFound', path: '/pages/lost-found/list', mod: 'entry.lostFound' },
      { icon: '📞', nk: 'subCategory.phone', path: '/pages/category/list?type=life' }
    ]
  },
  {
    title: '学习',
    items: [
      { icon: '📖', nk: 'subCategory.policyStudy', path: '/pages/category/list?type=study' },
      { icon: '🚩', nk: 'subCategory.partyStudy', path: '/pages/category/list?type=study' },
      { icon: '🌱', nk: 'subCategory.agriStudy', path: '/pages/category/list?type=study' },
      { icon: '⚖️', nk: 'subCategory.lawStudy', path: '/pages/category/list?type=study' }
    ]
  }
]

const groups = computed(() =>
  raw
    .map(g => ({
      title: g.title,
      items: g.items
        .filter(it => !it.mod || show(it.mod))
        .map(it => ({ icon: it.icon, path: it.path, name: t(it.nk, it.nk) }))
    }))
    .filter(g => g.items.length > 0)
)

function go(path) {
  uni.navigateTo({ url: path })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-more {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  box-sizing: border-box;
}

.group {
  margin-bottom: 32rpx;

  &:last-child { margin-bottom: 0; }

  .group-title {
    font-size: $font-card-title;
    font-weight: bold;
    color: $text-main;
    border-left: 8rpx solid $primary;
    padding-left: 16rpx;
    margin-bottom: $space-lg;
  }

  .group-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $space-md;
    background: $white;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    padding: $card-padding;
  }

  .entry {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $space-md 0;
    border-radius: $radius-md;

    &:active { background: $bg; }

    .entry-icon { font-size: 56rpx; margin-bottom: $space-sm; }
    .entry-text { font-size: 28rpx; color: $text-main; }
  }
}
</style>
