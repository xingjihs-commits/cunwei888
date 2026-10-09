<!--
  pages/service/index.vue - 服务首页（tabBar「服务」）
  用途：3×3 九宫格，聚合高频入口；名称读 display_names，显隐读 modules
  导航：custom，与首页/我的一致
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-service">
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <text class="nav-title">{{ t('pageTitle.service', '服务') }}</text>
    </view>
    <view class="body">
      <view class="grid">
        <view
          v-for="e in entries"
          :key="e.key"
          class="grid-item"
          @click="go(e.path)"
        >
          <view class="grid-icon">{{ e.icon }}</view>
          <text class="grid-text">{{ e.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, computed, onMounted } from 'vue'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
const statusBarHeight = ref(20)

function t(path, def = '') {
  return configStore.getDisplay(path, def)
}
function show(path) {
  return configStore.isModuleEnabled(path)
}

const allEntries = [
  { key: 'feedback', icon: '💬', path: '/pages/feedback/feedback', nameKey: 'entry.feedback', mod: 'entry.feedback' },
  { key: 'snapshot', icon: '📷', path: '/pages/snapshot/snapshot', nameKey: 'entry.snapshot', mod: 'entry.snapshot' },
  { key: 'mailbox', icon: '✉️', path: '/pages/secretary/mailbox', nameKey: 'entry.mailbox', mod: 'entry.mailbox' },
  { key: 'notice', icon: '📢', path: '/pages/notice/list', nameKey: 'pageTitle.notice', mod: 'entry.notice' },
  { key: 'news', icon: '📰', path: '/pages/news/list', nameKey: 'subCategory.news', mod: 'entry.news' },
  { key: 'guide', icon: '📋', path: '/pages/service/guide', nameKey: 'entry.guide', mod: 'entry.guide' },
  { key: 'project', icon: '💰', path: '/pages/project/list', nameKey: 'entry.project', mod: 'entry.project' },
  { key: 'market', icon: '🌾', path: '/pages/market/list', nameKey: 'entry.market', mod: 'entry.market' },
  { key: 'more', icon: '➕', path: '/pages/service/more', nameKey: 'button.more', mod: '' }
]

const entries = computed(() =>
  allEntries
    .filter(e => !e.mod || show(e.mod))
    .map(e => ({ key: e.key, icon: e.icon, path: e.path, name: t(e.nameKey, e.key) }))
)

onMounted(() => {
  // #ifdef MP-WEIXIN
  const sys = wx.getWindowInfo()
  statusBarHeight.value = sys.statusBarHeight || 20
  // #endif
})

function go(path) {
  uni.navigateTo({ url: path })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-service {
  min-height: 100vh;
  background: $bg;

  .nav-bar {
    background: linear-gradient(135deg, $primary 0%, $primary-dark 100%);
    color: $white;
    padding: 0 $page-padding 24rpx;

    .nav-title {
      display: block;
      padding: $space-md 0;
      font-size: $font-title;
      font-weight: bold;
    }
  }

  .body { padding: $page-padding; }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $space-lg;
    background: $white;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    padding: $card-padding;
  }

  .grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 220rpx;
    border-radius: $radius-md;

    &:active { background: $bg; }

    .grid-icon { font-size: 80rpx; line-height: 1; margin-bottom: $space-md; }
    .grid-text { font-size: 28rpx; color: $text-main; }
  }
}
</style>
