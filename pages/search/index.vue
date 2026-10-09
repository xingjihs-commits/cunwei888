<!--
  pages/search/index.vue - 全站搜索
  用途：关键词聚合搜索（村里事/村务公开/反映问题/项目/政策/会议/风采/惠农/失物）
  入口：办事 Tab 搜索栏
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-search">
    <view class="search-bar">
      <text class="search-icon">🔍</text>
      <input
        class="search-input"
        v-model="keyword"
        :placeholder="t('home.searchHint', '搜村里事、公示、反映...')"
        confirm-type="search"
        @confirm="onSearch"
        focus
      />
      <text v-if="keyword" class="clear" @click="keyword = ''">✕</text>
      <view class="search-btn" @click="onSearch">{{ t('button.search', '搜索') }}</view>
    </view>

    <view v-if="!searched" class="hot">
      <view class="hot-title">热门搜索</view>
      <view class="hot-tags">
        <text v-for="h in hots" :key="h" class="hot-tag" @click="quickSearch(h)">{{ h }}</text>
      </view>
    </view>

    <view v-else class="results">
      <view v-if="loading" class="tip">搜索中...</view>
      <view v-else-if="results.length === 0" class="tip">没有找到「{{ lastKeyword }}」相关内容</view>
      <view v-for="(r, i) in results" :key="r.type + r._id + i" class="result-item" @click="go(r)">
        <view class="r-head">
          <text class="r-tag">{{ r.name }}</text>
          <text class="r-time">{{ r.time ? formatDate(r.time, 'MM-DD') : '' }}</text>
        </view>
        <text class="r-title">{{ r.title }}</text>
        <text v-if="r.summary" class="r-summary">{{ r.summary }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { callFunction } from '@/utils/request.js'
import { formatDate } from '@/utils/format.js'
import { useConfigStore } from '@/store/config.js'
import { useRootFontSize } from '@/composables/useA11y.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const rootFontSize = useRootFontSize()

const keyword = ref('')
const lastKeyword = ref('')
const searched = ref(false)
const loading = ref(false)
const results = ref([])
const hots = ['财务', '会议', '补贴', '修路', '停水', '失物']

async function onSearch() {
  const kw = keyword.value.trim()
  if (!kw) return
  loading.value = true
  searched.value = true
  lastKeyword.value = kw
  try {
    const res = await callFunction('searchAll', { keyword: kw, limit: 5 })
    results.value = (res && res.success && res.data) || []
  } catch (err) {
    console.error('[搜索失败]:', err)
    results.value = []
  } finally {
    loading.value = false
  }
}

function quickSearch(h) {
  keyword.value = h
  onSearch()
}

const ROUTES = {
  news: (r) => `/pages/news/detail?newsId=${r._id}`,
  notice: (r) => `/pages/notice/detail?noticeId=${r._id}`,
  record: (r) => `/pages/feedback/detail?recordId=${r._id}`,
  project: (r) => `/pages/project/detail?id=${r._id}`,
  task: (r) => `/pages/task/detail?taskId=${r._id}`,
  meeting: (r) => `/pages/meeting/detail?id=${r._id}`,
  leader: (r) => `/pages/leader/detail?id=${r._id}`,
  lostFound: (r) => `/pages/lost-found/detail?id=${r._id}`,
  market: () => '/pages/market/list'
}

function go(r) {
  const fn = ROUTES[r.type]
  if (fn) uni.navigateTo({ url: fn(r) }).catch(() => {})
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-search {
  min-height: 100vh;
  background: $bg;

  .search-bar {
    display: flex;
    align-items: center;
    padding: $space-md $page-padding;
    background: $white;
    box-shadow: $card-shadow;

    .search-icon { margin-right: 12rpx; }
    .search-input {
      flex: 1;
      height: 72rpx;
      font-size: $font-body;
      color: $text-main;
    }
    .clear {
      padding: 0 12rpx;
      color: $text-weak;
      font-size: $font-sub;
    }
    .search-btn {
      padding: $space-sm $space-lg;
      margin-left: 8rpx;
      background: $primary;
      color: $white;
      border-radius: $btn-radius;
      font-size: $font-sub;
    }
  }

  .hot {
    padding: $card-padding $page-padding;

    .hot-title {
      font-size: $font-sub;
      color: $text-sub;
      margin-bottom: $card-gap;
    }
    .hot-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 16rpx;

      .hot-tag {
        padding: $space-sm $space-lg;
        background: $white;
        border-radius: $radius-full;
        font-size: $font-sub;
        color: $text-main;
        box-shadow: $card-shadow;
      }
    }
  }

  .results {
    padding: $card-gap $page-padding;

    .tip {
      text-align: center;
      padding: 80rpx 0;
      font-size: $font-sub;
      color: $text-weak;
    }

    .result-item {
      background: $white;
      border-radius: $card-radius;
      box-shadow: $card-shadow;
      padding: $card-padding;
      margin-bottom: $card-gap;

      .r-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12rpx;

        .r-tag {
          padding: $space-xs $space-md;
          background: $primary-light;
          color: $primary;
          border-radius: $radius-sm;
          font-size: $font-micro;
        }
        .r-time { font-size: $font-micro; color: $text-weak; }
      }

      .r-title {
        display: block;
        font-size: $font-card-title;
        font-weight: bold;
        color: $text-main;
      }
      .r-summary {
        display: block;
        margin-top: 8rpx;
        font-size: $font-sub;
        color: $text-sub;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:active { background: $bg; }
    }
  }
}
</style>
