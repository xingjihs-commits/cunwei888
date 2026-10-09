<!--
  pages/team/index.vue - 村委（tabBar「村委」）
  对齐《示范村 App 完整布局方案》Tab3：
    ① 村委是谁（前 3 名成员 + 查看全部）
    ② 服务承诺
    ③ 怎么联系（电话/时间/地址 + 一键拨号）
    ④ 村委在干啥（5 个入口）
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-team">
    <view class="banner">
      <text class="banner-title">{{ villageName }}村民委员会</text>
      <text class="banner-sub">全心全意为村民服务</text>
    </view>

    <!-- ① 村委是谁 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">村委是谁</text>
      </view>
      <Skeleton v-if="loading && members.length === 0" type="list" />
      <view class="member-card" v-for="m in shownMembers" :key="m._id" @click="goDetail(m)">
        <image class="member-avatar" :src="m.avatar || defaultAvatar" mode="aspectFill" />
        <view class="member-info">
          <view class="name-row">
            <text class="member-name">{{ m.name }}</text>
            <text class="member-role">{{ m.role }}</text>
          </view>
          <text v-if="m.division" class="member-duty">负责{{ m.division }}</text>
          <text v-if="m.phone" class="member-phone">{{ m.phone }}</text>
        </view>
        <text class="card-arrow">›</text>
      </view>
      <EmptyState v-if="!loading && members.length === 0" text="暂无成员信息" icon="👥" />
      <view v-if="members.length > 3" class="more-btn" @click="showAll = !showAll">
        {{ showAll ? '收起' : '查看全部村委' }} ›
      </view>
    </view>

    <!-- ② 服务承诺 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">服务承诺</text>
      </view>
      <view class="promise-card">
        <view class="promise-item" v-for="(p, i) in promises" :key="i">
          <text class="promise-dot">·</text>
          <text class="promise-text">{{ p }}</text>
        </view>
      </view>
    </view>

    <!-- ③ 怎么联系 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">怎么联系</text>
      </view>
      <view class="contact-card">
        <view class="contact-row">
          <text class="contact-label">村委值班电话</text>
          <text class="contact-value">{{ villagePhone || '待配置' }}</text>
        </view>
        <view class="contact-row">
          <text class="contact-label">办公时间</text>
          <text class="contact-value">{{ officeHours }}</text>
        </view>
        <view class="contact-row">
          <text class="contact-label">办公地址</text>
          <text class="contact-value">{{ officeAddress }}</text>
        </view>
        <view class="call-btn" @click="callVillage">一键拨号</view>
      </view>
    </view>

    <!-- ④ 村委在干啥 -->
    <view class="section">
      <view class="section-header">
        <text class="section-title">村委在干啥</text>
      </view>
      <view class="work-card">
        <view class="work-item" v-for="w in workEntries" :key="w.name" @click="go(w.path)">
          <text class="work-icon">{{ w.icon }}</text>
          <text class="work-name">{{ w.name }}</text>
          <text class="card-arrow">›</text>
        </view>
      </view>
    </view>

    <view style="height: 40rpx;"></view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { useConfigStore } from '@/store/config.js'
import { goPage } from '@/utils/nav.js'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useRootFontSize } from '@/composables/useA11y.js'

const configStore = useConfigStore()
const rootFontSize = useRootFontSize()

const members = ref([])
const loading = ref(false)
const showAll = ref(false)

const defaultAvatar = '/static/images/default-avatar.png'

const villageName = computed(() => configStore.villageName)
const villagePhone = computed(() => configStore.villagePhone)

const officeHours = '周一至周五 8:30-17:30'
const officeAddress = '村委会'

const promises = [
  '村民反映 24 小时内响应',
  '书记信箱 3 天内回复',
  '工单超时 3 天升级书记',
  '每周一村委例会'
]

const workEntries = [
  { icon: '🎬', name: '书记风采', path: '/pages/leader/list?type=secretary' },
  { icon: '🚶', name: '上级走访', path: '/pages/leader/list?type=leader' },
  { icon: '📝', name: '会议记录', path: '/pages/meeting/list' },
  { icon: '💰', name: '村里钱怎么花', path: '/pages/finance/list' },
  { icon: '🚩', name: '党建学习', path: '/pages/category/list?type=study' }
]

const shownMembers = computed(() => (showAll.value ? members.value : members.value.slice(0, 3)))

onMounted(() => {
  configStore.loadConfig()
  loadMembers()
})

onShow(() => {
  if (members.value.length === 0) loadMembers()
})

onPullDownRefresh(() => loadMembers())

async function loadMembers() {
  loading.value = true
  try {
    const res = await callFunction('getTeamMembers', { type: 'committee' })
    if (res.success) members.value = res.data || []
  } catch (err) {
    console.error('[村委加载失败]:', err)
  } finally {
    loading.value = false
    uni.stopPullDownRefresh()
  }
}

function goDetail(m) {
  uni.navigateTo({ url: `/pages/team/member-detail?memberId=${m._id}` })
}

function go(path) {
  goPage(path)
}

function callVillage() {
  if (!villagePhone.value) {
    uni.showToast({ title: '电话未配置', icon: 'none' })
    return
  }
  uni.makePhoneCall({ phoneNumber: villagePhone.value })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-team {
  min-height: 100vh;
  background: $bg;

  .banner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48rpx $page-padding;
    background: linear-gradient(135deg, $primary, $primary-dark);
    color: $white;

    .banner-title { font-size: $font-title; font-weight: bold; }
    .banner-sub { font-size: $font-sub; opacity: 0.9; margin-top: 8rpx; }
  }

  .section {
    padding: 0 $page-padding;
    margin-top: $card-gap;

    .section-header {
      display: flex;
      align-items: center;
      padding: $space-md 0;
      margin-bottom: $card-gap;

      .section-title {
        font-size: $font-card-title;
        font-weight: bold;
        color: $text-main;
        border-left: 8rpx solid $primary;
        padding-left: 16rpx;
      }
    }
  }

  .member-card {
    display: flex;
    align-items: center;
    background: $white;
    padding: $card-padding;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    min-height: 120rpx;

    .member-avatar {
      width: 80rpx;
      height: 80rpx;
      border-radius: $radius-full;
      background: $bg;
      margin-right: 24rpx;
      flex-shrink: 0;
    }

    .member-info {
      flex: 1;
      .name-row {
        display: flex;
        align-items: center;
        .member-name { font-size: 32rpx; font-weight: bold; color: $text-main; margin-right: 16rpx; }
        .member-role { font-size: $font-sub; color: $primary; }
      }
      .member-duty { display: block; font-size: $font-micro; color: $text-sub; margin-top: 4rpx; }
      .member-phone { display: block; font-size: $font-sub; color: $text-weak; margin-top: 4rpx; }
    }

    .card-arrow { font-size: $font-number; color: $text-weak; }
    &:active { background: $bg; }
  }

  .more-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: $btn-height;
    background: $white;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    font-size: $font-body;
    color: $primary;
    &:active { background: $bg; }
  }

  .promise-card, .contact-card, .work-card {
    background: $white;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    padding: $card-padding;
  }

  .promise-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12rpx;
    &:last-child { margin-bottom: 0; }
    .promise-dot { color: $primary; font-weight: bold; margin-right: 12rpx; }
    .promise-text { flex: 1; font-size: 28rpx; color: $text-main; line-height: 48rpx; }
  }

  .contact-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12rpx 0;
    .contact-label { font-size: 28rpx; color: $text-sub; }
    .contact-value { font-size: 28rpx; color: $text-main; }
  }

  .call-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88rpx;
    margin-top: $space-md;
    background: $primary;
    color: $white;
    border-radius: $btn-radius;
    font-size: $font-body;
    font-weight: bold;
    &:active { opacity: 0.85; }
  }

  .work-item {
    display: flex;
    align-items: center;
    padding: $space-md 0;
    border-bottom: 2rpx solid $border;
    &:last-child { border-bottom: none; }
    .work-icon { font-size: $font-number; margin-right: 16rpx; }
    .work-name { flex: 1; font-size: $font-body; color: $text-main; }
    &:active { background: $bg; }
  }
}
</style>
