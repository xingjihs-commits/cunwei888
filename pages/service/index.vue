<!--
  pages/service/index.vue - 办事（tabBar「办事」，服务与学习智库）
  红旗风格 v3：
    ① 简版红旗顶栏（fixed，无应急条）
    ② 搜索框
    ③ 服务大厅 2×2 宫格（党建学习/政务指南/生活百事通/就业培训）
    ④ 常用电话
  与首页去重：反映/随手拍入口收口在首页，本页不再重复
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-service">
    <!-- ① 红旗顶栏（fixed） -->
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="flag-body">
        <AppIcon class="flag-star-bg" name="star" :size="300" :color="FLAG_VEIL" />
        <view class="flag-ribbon flag-ribbon-1"></view>
        <text class="nav-title">{{ t('pageTitle.service', '办事') }}</text>
      </view>
      <view class="flag-wave">
        <view class="wave-circle wave-1"></view>
        <view class="wave-circle wave-2"></view>
        <view class="wave-circle wave-3"></view>
        <view class="wave-circle wave-4"></view>
        <view class="wave-circle wave-5"></view>
      </view>
    </view>

    <view class="page-body" :style="{ paddingTop: contentTop }">
      <!-- ② 搜索栏 -->
      <view class="search-bar" @click="onSearch">
        <AppIcon name="search" :size="32" :color="TEXT_WEAK" />
        <text class="search-ph">{{ t('home.searchHint', '搜办事：低保、停水、医保...') }}</text>
      </view>

      <!-- ③ 服务大厅 2×2 宫格 -->
      <AppSectionTitle title="服务大厅" :more-text="''" />
      <view class="service-grid">
        <view
          v-for="g in serviceGrid"
          :key="g.key"
          class="grid-item"
          @click="go(g.path)"
        >
          <view class="grid-icon" :style="{ background: g.bg }">
            <AppIcon :name="g.icon" :size="48" :color="g.color" />
          </view>
          <text class="grid-name">{{ g.name }}</text>
          <text class="grid-desc">{{ g.desc }}</text>
        </view>
      </view>

      <!-- ④ 常用电话 -->
      <AppSectionTitle :title="t('subCategory.phone', '常用电话')" :more-text="''" />
      <view class="phone-card">
        <PhoneGrid :phones="phones" @call="callPhone" />
      </view>

      <view class="page-footer-space"></view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useConfigStore } from '@/store/config.js'
import { goPage } from '@/utils/nav.js'
import PhoneGrid from '@/components/home/PhoneGrid.vue'
import AppSectionTitle from '@/components/AppSectionTitle.vue'
import AppIcon from '@/components/AppIcon.vue'
import { CHIP_BG, CHIP_TEXT, FLAG_VEIL, TEXT_WEAK } from '@/utils/theme.js'
import { useRootFontSize } from '@/composables/useA11y.js'

const configStore = useConfigStore()
const rootFontSize = useRootFontSize()
const statusBarHeight = ref(20)

// 旗面 88px + 下摆 16px + 下间隙 12px
const contentTop = computed(() => `${statusBarHeight.value + 88 + 28}px`)

function t(p, d = '') { return configStore.getDisplay(p, d) }

// 服务大厅 4 维度（村民服务与学习智库）
const serviceGrid = [
  { key: 'study', icon: 'flag', bg: CHIP_BG.red, color: CHIP_TEXT.red, name: '党建学习', desc: '传达上级精神', path: '/pages/category/list?type=study' },
  { key: 'guide', icon: 'book', bg: CHIP_BG.gold, color: CHIP_TEXT.gold, name: '政务指南', desc: '少跑腿白话指南', path: '/pages/service/guide' },
  { key: 'life', icon: 'home', bg: CHIP_BG.blue, color: CHIP_TEXT.blue, name: '生活百事通', desc: '防诈·技能·农事', path: '/pages/news/list?category=生活百事通' },
  { key: 'job', icon: 'briefcase', bg: CHIP_BG.green, color: CHIP_TEXT.green, name: '就业培训', desc: '技能教学·招工', path: '/pages/news/list?category=就业培训' }
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
    uni.showToast({ title: '电话暂未登记，请到村委会咨询', icon: 'none' })
    return
  }
  uni.makePhoneCall({ phoneNumber: number })
}
</script>

<style lang="scss" scoped>

.page-service {
  min-height: 100vh;
  background: $bg;

  // ===== 红旗顶栏（fixed） =====
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;

    .flag-body {
      position: relative;
      height: 88px; // contentTop 计算基准（px 定值，防大屏 rpx 放大导致遮挡）
      background: $flag-gradient;
      color: $white;
      padding: 0 $page-padding;
      display: flex;
      align-items: center;
      overflow: hidden;

      .flag-star-bg {
        position: absolute;
        right: -40rpx;
        top: -60rpx;
        pointer-events: none;
      }

      .flag-ribbon {
        position: absolute;
        left: -10%;
        width: 120%;
        height: 60rpx;
        background: linear-gradient(105deg, rgba($white, 0) 30%, rgba($white, 0.06) 50%, rgba($white, 0) 70%);
        transform: rotate(-8deg);
        pointer-events: none;
      }
      .flag-ribbon-1 { top: 30%; }

      .nav-title {
        position: relative;
        font-size: $font-title;
        font-weight: 600;
      }
    }

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
    padding: 0 $page-padding;
    min-height: 100vh;
  }

  .search-bar {
    display: flex;
    align-items: center;
    height: 88rpx;
    padding: 0 32rpx;
    background: $chip-gray-bg;
    border-radius: $radius-full;
    margin-top: 24rpx;

    :deep(.app-icon),
    .app-icon { margin-right: 12rpx; }
    .search-ph { font-size: $font-body; color: $text-weak; }
    &:active { background: $border; }
  }

  // ===== 2×2 服务宫格 =====
  .service-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;

    .grid-item {
      width: 335rpx;
      height: 200rpx;
      background: $white;
      border-radius: $radius-card;
      box-shadow: $shadow-md;
      padding: 24rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: transform $tap-time ease;

      &:active { transform: scale($tap-scale); }

      .grid-icon {
        width: 88rpx;
        height: 88rpx;
        border-radius: 24rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16rpx;
      }
      .grid-name {
        font-size: $font-card-title;
        font-weight: 600;
        color: $text-main;
        line-height: 1.3;
      }
      .grid-desc {
        font-size: $font-sub;
        color: $text-sub;
        margin-top: 4rpx;
      }
    }
  }

  .phone-card {
    background: $white;
    border-radius: $radius-card;
    box-shadow: $shadow-md;
    padding: 24rpx;
  }

  .page-footer-space {
    height: 40rpx;
  }
}
</style>
