<!--
  pages/index/index.vue - 首页
  结构（8 块，错误 banner 仅错误时显示）：
    ① 顶部栏 + 消息入口（带红点）
    ② 书记直达双卡片（信箱 + 广播）
    ③ 常用电话
    ④ 5 大类入口
    ⑤ 书记风采 / 领导关怀（Tab，240rpx）
    ⑥ 最新公示 3 条
    ⑦ 最新新闻 3 条
    ⑧ 更多入口
  名称读 display_names，显隐读 modules
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-home">
    <!-- ① 顶部栏 + 消息入口 -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-top">
        <view class="village-info">
          <text class="village-name">{{ villageName }}</text>
          <text class="village-sub">{{ t('pageTitle.index') }}</text>
        </view>
        <view class="msg-btn" @click="goTab('/pages/message/center')">
          <text class="msg-icon">🔔</text>
          <view v-if="unreadCount > 0" class="msg-dot">{{ unreadCount > 99 ? '99+' : unreadCount }}</view>
        </view>
      </view>
      <view class="user-info">
        <text class="user-name">{{ displayName }}</text>
        <view class="verify-tag" :class="verifyClass">{{ verifyText }}</view>
      </view>
    </view>

    <scroll-view scroll-y class="content" @scrolltolower="loadMore">
      <!-- 错误 banner -->
      <view v-if="loadError" class="error-banner">
        <text class="error-icon">⚠️</text>
        <text class="error-text">加载失败，请下拉重试</text>
        <view class="retry-btn" @click="loadData">重新加载</view>
      </view>

      <!-- ② 书记直达双卡片 -->
      <SecretaryCards
        v-if="show('homeBlock.secretary')"
        :latest-broadcast="latestBroadcast"
        @open="goPage"
      />

      <!-- ③ 常用电话 -->
      <view v-if="show('homeBlock.phone')" class="section">
        <view class="section-header">
          <text class="section-title">{{ t('subCategory.phone') }}</text>
        </view>
        <PhoneGrid :phones="phones" @call="callPhone" />
      </view>

      <!-- ④ 5 大类入口 -->
      <view v-if="show('homeBlock.category')" class="section">
        <view class="section-header">
          <text class="section-title">{{ t('home.categoryTitle', '服务分类') }}</text>
        </view>
        <CategoryList :categories="categories" @select="goCategory" />
      </view>

      <!-- ⑤ 书记风采 / 领导关怀 -->
      <view v-if="show('homeBlock.leader')" class="section">
        <LeaderCare v-model="careTab" @viewAll="goLeader" />
      </view>

      <!-- ⑥ 最新公示 3 条 -->
      <view v-if="show('homeBlock.notice')" class="section">
        <view class="section-header">
          <text class="section-title">{{ t('pageTitle.notice') }}</text>
          <view class="more" @click="goMore('/pages/notice/list')">更多 ></view>
        </view>
        <Skeleton v-if="isLoading && noticeList.length === 0" type="list" :count="2" />
        <view class="notice-card" v-for="item in noticeList.slice(0, 3)" :key="item._id" @click="goNotice(item)">
          <view class="notice-row">
            <view class="notice-tag" :class="'tag-' + item.category">{{ item.category }}</view>
            <text class="notice-title">{{ item.title }}</text>
          </view>
          <text class="notice-time">{{ formatDate(item.createTime) }}</text>
        </view>
      </view>

      <!-- ⑦ 最新新闻 3 条 -->
      <view v-if="show('homeBlock.news')" class="section">
        <view class="section-header">
          <text class="section-title">{{ t('pageTitle.news') }}</text>
          <view class="more" @click="goMore('/pages/news/list')">更多 ></view>
        </view>
        <Skeleton v-if="isLoading && newsList.length === 0" type="list" :count="2" />
        <NewsCard v-for="item in newsList.slice(0, 3)" :key="item._id" :news="item" @tap="goNews(item)" />
      </view>

      <!-- ⑧ 更多入口 -->
      <view class="more-entry" @click="goPage('/pages/service/more')">
        <text class="more-entry-text">{{ t('button.viewMore') }}</text>
        <text class="more-entry-arrow">›</text>
      </view>

      <view style="height: 40rpx;"></view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user.js'
import { useConfigStore } from '@/store/config.js'
import { callFunction } from '@/utils/request.js'
import { formatDate } from '@/utils/format.js'
import NewsCard from '@/components/NewsCard.vue'
import Skeleton from '@/components/Skeleton.vue'
import SecretaryCards from '@/components/home/SecretaryCards.vue'
import PhoneGrid from '@/components/home/PhoneGrid.vue'
import CategoryList from '@/components/home/CategoryList.vue'
import LeaderCare from '@/components/home/LeaderCare.vue'
import { useRootFontSize } from '@/composables/useA11y.js'

const userStore = useUserStore()
const configStore = useConfigStore()
const rootFontSize = useRootFontSize()

const statusBarHeight = ref(20)
const newsList = ref([])
const noticeList = ref([])
const latestBroadcast = ref(null)
const unreadCount = ref(0)
const loadError = ref(false)
const isLoading = ref(false)
const careTab = ref('secretary')
let lastLoadTime = 0
let newsPage = 1
let newsHasMore = true

const categories = [
  { key: 'info', icon: '📢', sub: '财务 · 项目 · 政策 · 会议 · 新闻' },
  { key: 'complaint', icon: '📣', sub: '村民反映 · 随手拍 · 书记信箱' },
  { key: 'study', icon: '📖', sub: '政策宣讲 · 党建 · 农技 · 普法' },
  { key: 'service', icon: '📋', sub: '办事指南 · 惠农价格 · 补贴' },
  { key: 'life', icon: '🏡', sub: '农事日历 · 留守签到 · 失物招领' }
]

const villageName = computed(() => configStore.villageName)
const displayName = computed(() => userStore.displayName)
const verifyText = computed(() => userStore.verifyText)
const verifyClass = computed(() => userStore.isAdmin ? 'admin' : (userStore.isVerified ? 'verified' : 'unverified'))
const phones = computed(() => configStore.phones)

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

async function loadData() {
  if (isLoading.value) return
  isLoading.value = true
  loadError.value = false
  try {
    const res = await callFunction('getHomeData', {})
    if (res.success && res.data) {
      newsList.value = res.data.news || []
      noticeList.value = res.data.notices || []
      latestBroadcast.value = res.data.latestBroadcast || null
      unreadCount.value = res.data.unreadCount || 0
      if (res.data.phones && res.data.phones.length > 0) configStore.phones = res.data.phones
      if (res.data.villageInfo) {
        const v = res.data.villageInfo
        if (v.villageName) configStore.villageName = v.villageName
        if (v.villagePhone) configStore.villagePhone = v.villagePhone
        if (v.icpNumber) configStore.icpNumber = v.icpNumber
        if (v.policeIcpNumber) configStore.policeIcpNumber = v.policeIcpNumber
      }
      newsPage = 1
      newsHasMore = (res.data.news || []).length >= 5
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

function goNews(item) {
  uni.navigateTo({ url: `/pages/news/detail?newsId=${item._id}` })
}
function goNotice(item) {
  uni.navigateTo({ url: `/pages/notice/detail?noticeId=${item._id}` })
}
function goCategory(type) {
  uni.navigateTo({ url: `/pages/category/list?type=${type}` })
}
function goLeader() {
  uni.navigateTo({ url: '/pages/leader/list' })
}
function goPage(path) {
  uni.navigateTo({ url: path })
}
function goTab(path) {
  uni.switchTab({ url: path })
}
function goMore(path) {
  uni.navigateTo({ url: path })
}
function callPhone(number) {
  if (!number) {
    uni.showToast({ title: '电话未配置', icon: 'none' })
    return
  }
  uni.makePhoneCall({ phoneNumber: number })
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
    background: linear-gradient(135deg, $primary 0%, $primary-dark 100%);
    color: $white;
    padding: 0 $page-padding 24rpx;

    .nav-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $space-md 0;

      .village-info {
        .village-name { font-size: $font-title; font-weight: bold; display: block; }
        .village-sub { font-size: $font-sub; opacity: 0.9; }
      }

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

    .user-info {
      display: flex;
      align-items: center;
      gap: 12rpx;

      .user-name { font-size: $font-body; }
      .verify-tag {
        padding: $space-xs $space-md;
        border-radius: $radius-sm;
        font-size: $font-micro;
        &.verified { background: rgba(255,255,255,0.3); }
        &.unverified { background: rgba(0,0,0,0.3); }
        &.admin { background: $gold; }
      }
    }
  }

  .content { height: calc(100vh - 200rpx); }

  .section {
    padding: 0 $page-padding;
    margin-bottom: $card-gap;

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
        &.tag-财务 { background: $gold-light; color: $gold; }
        &.tag-应急 { background: rgba(198,40,40,0.1); color: $danger; }
      }
      .notice-title { flex: 1; font-size: $font-body; color: $text-main; font-weight: bold; }
    }
    .notice-time { font-size: $font-sub; color: $text-weak; }
    &:active { background: $bg; }
  }

  .more-entry {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: $btn-height;
    margin: 0 $page-padding;
    background: $white;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    &:active { background: $bg; }

    .more-entry-text { font-size: $font-body; color: $primary; font-weight: bold; }
    .more-entry-arrow { font-size: $font-number; color: $primary; margin-left: 12rpx; }
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
