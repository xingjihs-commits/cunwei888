<!--
  pages/index/index.vue - 村里（首页，tabBar「村里」）
  结构（对齐《示范村 App 完整布局方案》Tab1）：
    ① 顶部栏（村名 + 消息红点）+ 应急通知横幅
    ② 找书记（信箱 / 广播 / 随手拍）
    ③ 书记风采 / 上级走访（大卡，切换条 80rpx + 封面 320rpx）
    ④ 村务公开（最新 3 条）
    ⑤ 村里事（最新 3 条）
  名称读 display_names，显隐读 modules；字体随适老化倍数
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-home">
    <!-- ① 顶部栏 + 应急通知横幅 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-top">
        <text class="village-name">{{ villageName }}</text>
        <view class="msg-btn" @click="goPage('/pages/message/center')">
          <text class="msg-icon">🔔</text>
          <view v-if="unreadCount > 0" class="msg-dot">{{ unreadCount > 99 ? '99+' : unreadCount }}</view>
        </view>
      </view>
      <view v-if="emergency" class="emergency" @click="goNotice(emergency)">
        <text class="em-icon">⚠️</text>
        <text class="em-title">{{ emergency.title }}</text>
        <text class="em-more">详细 ›</text>
      </view>
    </view>

    <!-- 错误 banner -->
    <view v-if="loadError" class="error-banner">
      <text class="error-icon">⚠️</text>
      <text class="error-text">加载失败，请下拉重试</text>
      <view class="retry-btn" @click="loadData">重新加载</view>
    </view>

    <!-- ② 找书记 -->
    <view v-if="show('homeBlock.secretary')" class="section">
      <view class="section-header">
        <text class="section-title">{{ t('home.findSecretary', '找书记') }}</text>
      </view>
      <SecretaryCards @open="goPage" />
    </view>

    <!-- ③ 书记风采 / 上级走访 -->
    <view v-if="show('homeBlock.leader')" class="section">
      <LeaderCare
        v-model="careTab"
        :item="currentShowcase"
        @openItem="goLeaderDetail"
        @viewAll="goLeader"
      />
    </view>

    <!-- ④ 村务公开 -->
    <view v-if="show('homeBlock.notice')" class="section">
      <view class="section-header">
        <text class="section-title">{{ t('pageTitle.notice') }}</text>
        <view class="more" @click="goPage('/pages/notice/list')">更多 ></view>
      </view>
      <Skeleton v-if="isLoading && noticeList.length === 0" type="list" :count="2" />
      <view class="notice-card" v-for="item in noticeList.slice(0, 3)" :key="item._id" @click="goNotice(item)">
        <view class="notice-row">
          <view class="notice-tag" :class="noticeTagClass(item.category)">{{ item.category }}</view>
          <text class="notice-title">{{ item.title }}</text>
        </view>
        <text class="notice-time">{{ formatDate(item.createTime) }}</text>
      </view>
    </view>

    <!-- ⑤ 村里事 -->
    <view v-if="show('homeBlock.news')" class="section">
      <view class="section-header">
        <text class="section-title">{{ t('pageTitle.news') }}</text>
        <view class="more" @click="goPage('/pages/news/list')">更多 ></view>
      </view>
      <Skeleton v-if="isLoading && newsList.length === 0" type="list" :count="2" />
      <NewsCard v-for="item in newsList.slice(0, 3)" :key="item._id" :news="item" @tap="goNews(item)" />
    </view>

    <view style="height: 40rpx;"></view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onShow, onReachBottom } from '@dcloudio/uni-app'
import { useConfigStore } from '@/store/config.js'
import { callFunction } from '@/utils/request.js'
import { formatDate } from '@/utils/format.js'
import { goPage } from '@/utils/nav.js'
import NewsCard from '@/components/NewsCard.vue'
import Skeleton from '@/components/Skeleton.vue'
import SecretaryCards from '@/components/home/SecretaryCards.vue'
import LeaderCare from '@/components/home/LeaderCare.vue'
import { useRootFontSize } from '@/composables/useA11y.js'

const configStore = useConfigStore()
const rootFontSize = useRootFontSize()

// 公示分类标签类名（英文，避免中文类名导致 WXSS 转义报错）
function noticeTagClass(category) {
  const map = { '财务': 'tag-finance', '应急': 'tag-emergency' }
  return map[category] || 'tag-normal'
}

const statusBarHeight = ref(20)
const newsList = ref([])
const noticeList = ref([])
const unreadCount = ref(0)
const loadError = ref(false)
const isLoading = ref(false)
const careTab = ref('secretary')
const secretaryItem = ref(null)
const leaderItem = ref(null)
let lastLoadTime = 0
let newsPage = 1
let newsHasMore = true

const villageName = computed(() => configStore.villageName)
const emergency = computed(() => noticeList.value.find(n => n.category === '应急') || null)
const currentShowcase = computed(() => (careTab.value === 'secretary' ? secretaryItem.value : leaderItem.value))

function t(path, def = '') {
  return configStore.getDisplay(path, def)
}
function show(path) {
  return configStore.isModuleEnabled(path)
}

onMounted(() => {
  // #ifdef MP-WEIXIN
  const sysInfo = wx.getWindowInfo()
  statusBarHeight.value = sysInfo.statusBarHeight || 20
  // #endif
  configStore.loadConfig()
  loadData()
})

onShow(() => {
  const now = Date.now()
  if (now - lastLoadTime < 30000) return
  loadData()
})

onReachBottom(() => loadMore())

async function loadData() {
  if (isLoading.value) return
  isLoading.value = true
  loadError.value = false
  try {
    const res = await callFunction('getHomeData', {})
    if (res.success && res.data) {
      newsList.value = res.data.news || []
      noticeList.value = res.data.notices || []
      unreadCount.value = res.data.unreadCount || 0
      if (res.data.villageInfo) {
        const v = res.data.villageInfo
        if (v.villageName) configStore.villageName = v.villageName
        if (v.villagePhone) configStore.villagePhone = v.villagePhone
        if (v.icpNumber) configStore.icpNumber = v.icpNumber
        if (v.policeIcpNumber) configStore.policeIcpNumber = v.policeIcpNumber
      }
      newsPage = 1
      newsHasMore = (res.data.news || []).length >= 5
      loadShowcase()
    } else {
      loadError.value = true
    }
  } catch (err) {
    console.error('[首页加载失败]:', err)
    loadError.value = true
  } finally {
    isLoading.value = false
    lastLoadTime = Date.now()
  }
}

async function loadShowcase() {
  try {
    const [s, l] = await Promise.all([
      callFunction('getLeaderContentList', { type: 'secretary', page: 1, pageSize: 1 }),
      callFunction('getLeaderContentList', { type: 'leader', page: 1, pageSize: 1 })
    ])
    if (s && s.success && s.data && s.data.length) secretaryItem.value = s.data[0]
    if (l && l.success && l.data && l.data.length) leaderItem.value = l.data[0]
  } catch (err) {
    console.error('[风采加载失败]:', err)
  }
}

function goNews(item) {
  uni.navigateTo({ url: `/pages/news/detail?newsId=${item._id}` })
}
function goNotice(item) {
  uni.navigateTo({ url: `/pages/notice/detail?noticeId=${item._id}` })
}
function goLeaderDetail(item) {
  if (item && item._id) uni.navigateTo({ url: '/pages/leader/detail?id=' + item._id })
}
function goLeader() {
  uni.navigateTo({ url: '/pages/leader/list' })
}

async function loadMore() {
  if (!newsHasMore || isLoading.value) return
  newsPage++
  try {
    const res = await callFunction('getNewsList', { page: newsPage, pageSize: 5 })
    if (res.success && res.data && res.data.length > 0) {
      newsList.value = [...newsList.value, ...res.data]
      newsHasMore = res.data.length >= 5
    } else {
      newsHasMore = false
    }
  } catch (err) {
    newsPage--
    console.error('[加载更多失败]:', err)
  }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-home {
  min-height: 100vh;
  background-color: $bg;

  .nav-bar {
    position: sticky;
    top: 0;
    z-index: 10;
    background: linear-gradient(135deg, $primary 0%, $primary-dark 100%);
    color: $white;
    padding: 0 $page-padding 24rpx;

    .nav-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $space-md 0;

      .village-name { font-size: $font-title; font-weight: bold; }

      .msg-btn {
        position: relative;
        width: 72rpx;
        height: 72rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255,255,255,0.2);
        border-radius: $radius-full;

        .msg-icon { font-size: $font-title; }
        .msg-dot {
          position: absolute;
          top: -6rpx;
          right: -6rpx;
          min-width: 32rpx;
          height: 32rpx;
          padding: 0 6rpx;
          background: $danger;
          color: $white;
          font-size: $font-micro;
          line-height: 32rpx;
          text-align: center;
          border-radius: $radius-full;
        }
      }
    }

    .emergency {
      display: flex;
      align-items: center;
      margin-top: 8rpx;
      padding: $space-sm $space-md;
      background: rgba(255,255,255,0.2);
      border-radius: $radius-md;

      .em-icon { margin-right: 8rpx; }
      .em-title {
        flex: 1;
        font-size: $font-sub;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .em-more { font-size: $font-micro; opacity: 0.9; }
    }
  }

  .section {
    padding: 0 $page-padding;
    margin-top: $card-gap;

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: $card-gap;
      padding: $space-md 0;

      .section-title {
        font-size: $font-card-title;
        font-weight: bold;
        color: $text-main;
        border-left: 8rpx solid $primary;
        padding-left: 16rpx;
      }
      .more { font-size: $font-sub; color: $primary; }
    }
  }

  .notice-card {
    background: $white;
    padding: $card-padding;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    margin-bottom: 16rpx;

    .notice-row {
      display: flex;
      align-items: center;
      margin-bottom: 12rpx;
      .notice-tag {
        padding: $space-xs $space-md;
        border-radius: $radius-sm;
        font-size: $font-micro;
        margin-right: 16rpx;
        background: $primary-light;
        color: $primary;
        &.tag-finance { background: $gold-light; color: $gold; }
        &.tag-emergency { background: rgba(198,40,40,0.1); color: $danger; }
      }
      .notice-title { flex: 1; font-size: $font-body; color: $text-main; font-weight: bold; }
    }
    .notice-time { font-size: $font-sub; color: $text-weak; }
    &:active { background: $bg; }
  }

  .error-banner {
    margin: $page-padding;
    padding: $card-padding;
    background: rgba(198,40,40,0.08);
    border: 2rpx solid rgba(198,40,40,0.2);
    border-radius: $card-radius;
    text-align: center;

    .error-icon { font-size: 56rpx; display: block; margin-bottom: 12rpx; }
    .error-text { display: block; font-size: $font-sub; color: $text-sub; margin-bottom: 16rpx; }
    .retry-btn {
      display: inline-block;
      padding: $space-sm $space-xl;
      background: $primary;
      color: $white;
      border-radius: $btn-radius;
      font-size: $font-sub;
    }
  }
}
</style>
