<!--
  pages/service/index.vue - 办事（tabBar「办事」）
  对齐《示范村 App 完整布局方案》Tab2：
    搜索栏 + 4 快捷入口 + 5 大类卡片 + 常用电话九宫格
  名称读 display_names，显隐读 modules
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-service">
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <text class="nav-title">{{ t('pageTitle.service', '办事') }}</text>
    </view>

    <view class="body">
      <!-- 搜索栏 -->
      <view class="search-bar" @click="onSearch">
        <text class="search-icon">🔍</text>
        <text class="search-ph">{{ t('home.searchHint', '搜办事：低保、停水、医保...') }}</text>
      </view>

      <!-- 快捷入口 -->
      <view class="quick-row">
        <view v-for="q in quickActions" :key="q.key" class="quick-item" @click="go(q.path)">
          <view class="quick-icon">{{ q.icon }}</view>
          <text class="quick-text">{{ q.name }}</text>
        </view>
      </view>

      <!-- 5 大类卡片 -->
      <view v-for="c in cards" :key="c.key" class="card">
        <view class="card-head" @click="go(c.path)">
          <text class="card-icon">{{ c.icon }}</text>
          <text class="card-title">{{ t('category.' + c.key) }}</text>
          <text class="card-arrow">›</text>
        </view>
        <view class="card-subs">
          <text
            v-for="s in c.subs"
            :key="s.key"
            class="sub-tag"
            @click.stop="s.path && go(s.path)"
          >{{ subName(s.key) }}</text>
        </view>
      </view>

      <!-- 常用电话 -->
      <view class="phone-card">
        <view class="card-head">
          <text class="card-icon">📞</text>
          <text class="card-title">{{ t('subCategory.phone', '常用电话') }}</text>
        </view>
        <PhoneGrid :phones="phones" @call="callPhone" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useConfigStore } from '@/store/config.js'
import { goPage } from '@/utils/nav.js'
import PhoneGrid from '@/components/home/PhoneGrid.vue'
import { useRootFontSize } from '@/composables/useA11y.js'

const configStore = useConfigStore()
const rootFontSize = useRootFontSize()
const statusBarHeight = ref(20)

function t(p, d = '') { return configStore.getDisplay(p, d) }
function subName(key) { return configStore.getDisplay('subCategory.' + key, key) }

const quickActions = [
  { key: 'report', icon: '📝', name: '我要反映', path: '/pages/feedback/feedback' },
  { key: 'snapshot', icon: '📷', name: '随手拍照', path: '/pages/snapshot/snapshot' },
  { key: 'study', icon: '📚', name: '我要学习', path: '/pages/category/list?type=study' },
  { key: 'guide', icon: '📖', name: '我要办事', path: '/pages/service/guide' }
]

const cards = [
  {
    key: 'info', icon: '📢', path: '/pages/category/list?type=info',
    subs: [
      { key: 'finance', path: '/pages/finance/list' },
      { key: 'project', path: '/pages/project/list' },
      { key: 'meeting', path: '/pages/meeting/list' },
      { key: 'policy', path: '/pages/task/list' }
    ]
  },
  {
    key: 'complaint', icon: '📝', path: '/pages/category/list?type=complaint',
    subs: [
      { key: 'feedback', path: '/pages/feedback/feedback' },
      { key: 'snapshot', path: '/pages/snapshot/snapshot' },
      { key: 'mailbox', path: '/pages/secretary/mailbox' },
      { key: 'vote', path: '/pages/vote/list' }
    ]
  },
  {
    key: 'study', icon: '📚', path: '/pages/category/list?type=study',
    subs: [
      { key: 'policyStudy' },
      { key: 'partyStudy' },
      { key: 'agriStudy' },
      { key: 'task', path: '/pages/task/list' }
    ]
  },
  {
    key: 'service', icon: '📖', path: '/pages/service/guide',
    subs: [
      { key: 'guide', path: '/pages/service/guide' },
      { key: 'market', path: '/pages/market/list' }
    ]
  },
  {
    key: 'life', icon: '🏠', path: '/pages/category/list?type=life',
    subs: [
      { key: 'calendar', path: '/pages/agri/calendar' },
      { key: 'checkin', path: '/pages/agri/checkin' },
      { key: 'lostFound', path: '/pages/lost-found/list' }
    ]
  }
]

const phones = computed(() => configStore.phones || [])

onMounted(() => {
  // #ifdef MP-WEIXIN
  const sys = wx.getWindowInfo()
  statusBarHeight.value = sys.statusBarHeight || 20
  // #endif
  configStore.loadConfig()
})

function go(path) { goPage(path) }

function onSearch() {
  uni.navigateTo({ url: '/pages/search/index' })
}

function callPhone(number) {
  if (!number) {
    uni.showToast({ title: '电话未配置', icon: 'none' })
    return
  }
  uni.makePhoneCall({ phoneNumber: number })
}
</script>

<style lang="scss" scoped>

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

  .search-bar {
    display: flex;
    align-items: center;
    height: 80rpx;
    padding: 0 $card-padding;
    background: $white;
    border-radius: $btn-radius;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;

    .search-icon { margin-right: 12rpx; }
    .search-ph { font-size: $font-sub; color: $text-weak; }
    &:active { background: $bg; }
  }

  .quick-row {
    display: flex;
    gap: 16rpx;
    padding: $card-padding;
    background: $white;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;

    .quick-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 160rpx;
      border-radius: $radius-md;

      &:active { background: $bg; }
      .quick-icon {
        width: 80rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        font-size: 48rpx;
        background: $primary-light;
        border-radius: $radius-full;
        margin-bottom: 12rpx;
      }
      .quick-text { font-size: $font-sub; color: $text-main; }
    }
  }

  .card {
    background: $white;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    padding: $card-padding;
    margin-bottom: $card-gap;

    .card-head {
      display: flex;
      align-items: center;
      &:active { opacity: 0.7; }
      .card-icon { font-size: $font-number; margin-right: 16rpx; }
      .card-title { flex: 1; font-size: $font-card-title; font-weight: bold; color: $text-main; }
      .card-arrow { font-size: $font-number; color: $text-weak; }
    }

    .card-subs {
      display: flex;
      flex-wrap: wrap;
      gap: 12rpx;
      margin-top: 16rpx;

      .sub-tag {
        padding: $space-xs $space-md;
        background: $bg;
        color: $text-sub;
        border-radius: $radius-sm;
        font-size: $font-micro;
      }
    }
  }

  .phone-card {
    background: $white;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    padding: $card-padding;

    .card-head {
      display: flex;
      align-items: center;
      margin-bottom: $card-gap;
      .card-icon { font-size: $font-number; margin-right: 16rpx; }
      .card-title { font-size: $font-card-title; font-weight: bold; color: $text-main; }
    }
  }
}
</style>
