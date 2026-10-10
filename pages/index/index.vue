<!--
  pages/index/index.vue - 村里（首页，tabBar「村里」）
  红旗风格 v3：
    ① 红旗顶栏（fixed：旗面渐变+金星+底纹星+飘带+波浪下摆+应急通知条）
    ② 快速服务入口（找书记三入口，首屏优先）
    ③ 头条轮播 + 天气农事
    ④ 为民办实事（仅已办结+好评、脱敏，无数据整块隐藏）
    ⑤ 村务公开 / 村里事
  红色纪律：大面积红只在 fixed 旗面；内容区米白+白卡
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-home">
    <!-- ① 红旗顶栏（fixed） -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="flag-body">
        <AppIcon class="flag-star-bg" name="star" :size="300" :color="FLAG_VEIL" />
        <view class="flag-ribbon flag-ribbon-1"></view>
        <view class="flag-ribbon flag-ribbon-2"></view>
        <view class="nav-top">
          <view class="nav-title-row">
            <AppIcon name="star" :size="44" :color="STAR_GOLD" />
            <text class="village-name">{{ villageName }}</text>
          </view>
          <view class="msg-btn" @click="goPage('/pages/message/center')">
            <AppIcon name="bell" :size="40" :color="THEME_WHITE" />
            <view v-if="unreadCount > 0" class="msg-dot">{{ unreadCount > 99 ? '99+' : unreadCount }}</view>
          </view>
        </view>
        <view v-if="emergency" class="emergency" @click="goNotice(emergency)">
          <AppIcon name="warning" :size="32" :color="STAR_GOLD" />
          <text class="em-title">{{ emergency.title }}</text>
          <text class="em-more">详细 ›</text>
        </view>
      </view>
      <view class="flag-wave">
        <view class="wave-circle wave-1"></view>
        <view class="wave-circle wave-2"></view>
        <view class="wave-circle wave-3"></view>
        <view class="wave-circle wave-4"></view>
        <view class="wave-circle wave-5"></view>
      </view>
    </view>

    <!-- 内容区（padding-top 动态补偿固定旗面） -->
    <view class="page-body" :style="{ paddingTop: contentTop }">
      <!-- 离线提示 -->
      <view v-if="offline" class="offline-banner">
        <AppIcon name="cloud" :size="28" :color="TEXT_SUB" />
        <text class="offline-text">当前展示离线缓存，下拉刷新</text>
      </view>

      <!-- 错误 banner -->
      <view v-if="loadError" class="error-banner">
        <AppIcon name="warning" :size="56" :color="DANGER" />
        <text class="error-text">加载失败，请下拉重试</text>
        <view class="retry-btn" @click="loadData">重新加载</view>
      </view>

      <!-- 加载失败时只显示错误 banner，隐藏空洞 section -->
      <template v-if="!loadError">
        <!-- ② 快速服务（首屏优先：反映入口唯一收口处） -->
        <view v-if="show('homeBlock.secretary')" class="section">
          <AppSectionTitle :title="t('home.findSecretary', '找书记')" />
          <SecretaryCards @open="goPage" />
        </view>

        <!-- ③ 头条轮播（村里最新动态） -->
        <view v-if="bannerItems.length" class="section">
          <AppBanner :items="bannerItems" @tap="goNews" />
        </view>

        <!-- 今日天气农事 -->
        <view class="section">
          <WeatherBar v-if="show('homeBlock.weather')" :weather="weather" :farming="farming" />
        </view>

        <!-- ④ 为民办实事（闭环成果，仅已办结+好评；公示卡为展示语义，不跳他人工单详情） -->
        <view v-if="show('homeBlock.notice') && resolvedList.length" class="section">
          <AppSectionTitle title="为民办实事" :more-text="''" />
          <view class="resolved-card" v-for="item in resolvedList.slice(0, 3)" :key="item._id">
            <view class="resolved-head">
              <view class="resolved-chip">已办结</view>
              <text class="resolved-title">{{ item.resultTitle }}</text>
            </view>
            <view class="resolved-meta">
              <text class="resolved-time">{{ formatDate(item.finishTime) }}</text>
              <view v-if="item.satisfied" class="resolved-star">
                <AppIcon name="check" :size="24" :color="GOLD_DARK" />
                <text class="resolved-star-text">村民满意</text>
              </view>
            </view>
          </view>
        </view>

        <!-- ⑤ 村务公开 -->
        <view v-if="show('homeBlock.notice')" class="section">
          <AppSectionTitle :title="t('pageTitle.notice')" more-text="更多" @more="goPage('/pages/notice/list')" />
          <Skeleton v-if="isLoading && noticeList.length === 0" type="list" :count="2" />
          <view class="notice-card" v-for="item in noticeList.slice(0, 3)" :key="item._id" @click="goNotice(item)">
            <view class="notice-row">
              <view class="notice-tag" :class="noticeTagClass(item.category)">{{ item.category }}</view>
              <text class="notice-title">{{ item.title }}</text>
            </view>
            <text class="notice-time">{{ formatDate(item.createTime) }}</text>
          </view>
          <EmptyState v-if="!isLoading && noticeList.length === 0" text="暂无公告" icon="📋" />
        </view>

        <!-- ⑥ 村里事 -->
        <view v-if="show('homeBlock.news')" class="section">
          <AppSectionTitle :title="t('pageTitle.news')" more-text="更多" @more="goPage('/pages/news/list')" />
          <Skeleton v-if="isLoading && newsList.length === 0" type="list" :count="2" />
          <NewsCard v-for="item in newsList.slice(0, 3)" :key="item._id" :news="item" @tap="goNews(item)" />
          <EmptyState v-if="!isLoading && newsList.length === 0" text="暂无村里事" icon="📰" />
        </view>
      </template>

      <view class="page-footer-space"></view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onShow, onReachBottom } from '@dcloudio/uni-app'
import { useConfigStore } from '@/store/config.js'
import { callFunction } from '@/utils/request.js'
import { formatDate } from '@/utils/format.js'
import { goPage } from '@/utils/nav.js'
import { setCache, getCacheStale } from '@/utils/cache.js'
import NewsCard from '@/components/NewsCard.vue'
import Skeleton from '@/components/Skeleton.vue'
import EmptyState from '@/components/EmptyState.vue'
import AppSectionTitle from '@/components/AppSectionTitle.vue'
import AppBanner from '@/components/AppBanner.vue'
import AppIcon from '@/components/AppIcon.vue'
import { WHITE as THEME_WHITE, STAR_GOLD, FLAG_VEIL, GOLD_DARK, TEXT_SUB, DANGER } from '@/utils/theme.js'
import SecretaryCards from '@/components/home/SecretaryCards.vue'
import WeatherBar from '@/components/home/WeatherBar.vue'
import { getFarmingAdvice } from '@/utils/farmingCalendar.js'
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
const weather = ref(null)
const farming = ref('')
const homeEmergency = ref(null)
const offline = ref(false)
const resolvedList = ref([])

// 旗面高度（px 定值）：旗面 88px + 应急条 40px + 下摆 16px + 下间隙 12px
const contentTop = computed(() =>
  `${statusBarHeight.value + 88 + (emergency.value ? 40 : 0) + 28 + 12}px`
)

let lastLoadTime = 0
let newsPage = 1
let newsHasMore = true

const villageName = computed(() => configStore.villageName)
const emergency = computed(() => homeEmergency.value || noticeList.value.find(n => n.category === '应急') || null)

// 头条轮播：新闻前 3 条（优先带封面图）
const bannerItems = computed(() => {
  const withCover = newsList.value.filter(n => n.coverImage)
  const rest = newsList.value.filter(n => !n.coverImage)
  return [...withCover, ...rest].slice(0, 3).map(n => ({
    id: n._id,
    image: n.coverImage || '',
    title: n.title
  }))
})

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
  farming.value = getFarmingAdvice().yi
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
      applyHomeData(res.data)
      offline.value = false
      setCache('vb_home', res.data)
    } else {
      useCacheFallback()
    }
  } catch (err) {
    console.error('[首页加载失败]:', err)
    useCacheFallback()
  } finally {
    isLoading.value = false
    lastLoadTime = Date.now()
    uni.stopPullDownRefresh()
  }
}

function applyHomeData(data) {
  newsList.value = data.news || []
  noticeList.value = data.notices || []
  unreadCount.value = data.unreadCount || 0
  homeEmergency.value = data.emergency || null
  if (data.villageInfo) {
    const v = data.villageInfo
    if (v.villageName) configStore.villageName = v.villageName
    if (v.villagePhone) configStore.villagePhone = v.villagePhone
    if (v.icpNumber) configStore.icpNumber = v.icpNumber
    if (v.policeIcpNumber) configStore.policeIcpNumber = v.policeIcpNumber
  }
  newsPage = 1
  newsHasMore = (data.news || []).length >= 5
  loadWeather()
  loadResolved()
}

function useCacheFallback() {
  const cached = getCacheStale('vb_home')
  if (cached) {
    applyHomeData(cached)
    offline.value = true
  } else {
    loadError.value = true
  }
}

// 为民办实事：仅拉取已办结且评价满意的工单（云函数侧已脱敏）
async function loadResolved() {
  try {
    const res = await callFunction('getResolvedFeedback', {})
    if (res && res.success && Array.isArray(res.data)) {
      resolvedList.value = res.data
    }
  } catch (err) {
    console.error('[办实事成果加载失败]:', err)
  }
}

async function loadWeather() {
  const code = String(configStore.county_code || '').trim()
  if (!code) return
  try {
    const res = await callFunction('getWeather', { stationId: code })
    if (res && res.success && res.data) weather.value = res.data
  } catch (err) {
    console.error('[天气加载失败]:', err)
  }
}

function goNews(item) {
  const id = item && item._id ? item._id : item && item.id
  if (id) uni.navigateTo({ url: `/pages/news/detail?newsId=${id}` })
}
function goNotice(item) {
  uni.navigateTo({ url: `/pages/notice/detail?noticeId=${item._id}` })
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

.page-home {
  min-height: 100vh;
  background-color: $bg;

  // ===== 红旗顶栏（fixed，永不滚动） =====
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;

    .flag-body {
      position: relative;
      background: $flag-gradient;
      color: $white;
      padding: 0 $page-padding 12px;
      overflow: hidden;

      // 底纹星（不抢字；AppIcon 实例自带尺寸与颜色）
      .flag-star-bg {
        position: absolute;
        right: -40rpx;
        top: -60rpx;
        pointer-events: none;
      }

      // 飘带（绸面反光）
      .flag-ribbon {
        position: absolute;
        left: -10%;
        width: 120%;
        height: 60rpx;
        background: linear-gradient(105deg, rgba($white, 0) 30%, rgba($white, 0.06) 50%, rgba($white, 0) 70%);
        pointer-events: none;
      }
      .flag-ribbon-1 { top: 20%; transform: rotate(-8deg); }
      .flag-ribbon-2 { top: 60%; height: 40rpx; transform: rotate(-6deg); }

      .nav-top {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 88px; // contentTop 计算基准（px 定值，防大屏 rpx 放大导致遮挡）

        .nav-title-row {
          display: flex;
          align-items: center;

          .village-name {
            font-size: $font-title;
            font-weight: 600;
            margin-left: 16rpx;
          }
        }

        .msg-btn {
          position: relative;
          width: 88rpx; // 44px 触控标准
          height: 88rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba($white, 0.18);
          border-radius: $radius-full;

          .msg-dot {
            position: absolute;
            top: -6rpx;
            right: -6rpx;
            min-width: 32rpx;
            height: 32rpx;
            padding: 0 6rpx;
            background: $star-gold;
            color: $flag-dark;
            font-size: $font-micro;
            line-height: 32rpx;
            text-align: center;
            border-radius: $radius-full;
          }
        }
      }

      .emergency {
        position: relative;
        display: flex;
        align-items: center;
        height: 40px; // contentTop 计算基准
        margin-top: 8rpx;
        margin-bottom: 8rpx;
        padding: 0 $space-md;
        background: $flag-dark;
        border-radius: $radius-list;

        .em-title {
          flex: 1;
          margin: 0 12rpx;
          font-size: $font-sub;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .em-more {
          font-size: $font-sub;
          font-weight: 600;
          opacity: 0.9;
        }
      }
    }

    // 波浪下摆（五个连续圆弧，px 定值）
    .flag-wave {
      position: relative;
      height: 16px;
      overflow: hidden;

      .wave-circle {
        position: absolute;
        top: -24px;
        width: 40px;
        height: 40px;
        border-radius: $radius-full;
        background: $flag-dark;
      }
      .wave-1 { left: 5%; }
      .wave-2 { left: 28%; }
      .wave-3 { left: 50%; }
      .wave-4 { left: 72%; }
      .wave-5 { left: 94%; }
    }
  }

  .page-body {
    background-color: $bg;
    min-height: 100vh;
  }

  .section {
    padding: 0 $page-padding;
  }

  .notice-card {
    background: $white;
    padding: $space-lg;
    border-radius: $radius-list;
    box-shadow: $shadow-sm;
    margin-bottom: $space-lg;
    transition: transform $tap-time ease;

    &:active { transform: scale($tap-scale); }

    .notice-row {
      display: flex;
      align-items: center;
      margin-bottom: 12rpx;
      .notice-tag {
        flex-shrink: 0;
        height: 44rpx;
        padding: 0 16rpx;
        border-radius: $radius-md;
        font-size: $font-sub;
        line-height: 44rpx;
        margin-right: 16rpx;
        background: $chip-red-bg;
        color: $chip-red-text;
        &.tag-finance { background: $chip-gold-bg; color: $chip-gold-text; }
        &.tag-emergency { background: rgba($danger, 0.1); color: $danger; }
      }
      .notice-title {
        flex: 1;
        font-size: $font-body;
        font-weight: 500;
        color: $text-main;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .notice-time { font-size: $font-sub; color: $text-weak; }
  }

  // 为民办实事成果卡（公示展示语义：标题两行完整可读）
  .resolved-card {
    background: $white;
    padding: $space-lg;
    border-radius: $radius-list;
    box-shadow: $shadow-sm;
    margin-bottom: $space-lg;

    .resolved-head {
      display: flex;
      align-items: flex-start;

      .resolved-chip {
        flex-shrink: 0;
        height: 44rpx;
        padding: 0 16rpx;
        background: $chip-green-bg;
        color: $chip-green-text;
        border-radius: $radius-md;
        font-size: $font-sub;
        line-height: 44rpx;
        margin-right: 16rpx;
      }
      .resolved-title {
        flex: 1;
        font-size: $font-body;
        font-weight: 500;
        color: $text-main;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    .resolved-meta {
      display: flex;
      align-items: center;
      margin-top: 12rpx;

      .resolved-time {
        flex: 1;
        font-size: $font-sub;
        color: $text-weak;
      }
      .resolved-star {
        display: flex;
        align-items: center;
        .resolved-star-text {
          font-size: $font-sub;
          color: $gold-dark;
          font-weight: 500;
          margin-left: 6rpx;
        }
      }
    }
  }

  .offline-banner {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: $card-gap $page-padding 0;
    padding: $space-sm $card-padding;
    background: rgba($primary, 0.06);
    color: $text-sub;
    border-radius: $radius-list;

    .offline-text {
      font-size: $font-sub;
      margin-left: 8rpx;
    }
  }

  .error-banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: $page-padding;
    padding: $card-padding;
    background: rgba($danger, 0.08);
    border: 2rpx solid rgba($danger, 0.2);
    border-radius: $radius-card;

    .error-text { display: block; font-size: $font-sub; color: $text-sub; margin: 12rpx 0 16rpx; }
    .retry-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 240rpx;
      min-height: 88rpx;
      padding: 0 $space-xl;
      background: $primary;
      color: $white;
      border-radius: $radius-full;
      font-size: $font-sub;
      font-weight: 600;
      &:active { background: $primary-dark; }
    }
  }

  .page-footer-space {
    height: 40rpx;
  }
}
</style>
