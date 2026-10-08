<!--
  pages/team/index.vue - 村委班子
  用途：展示班子成员、党员、村民代表、监委会
-->
<template>
  <view class="page-team">
    <view class="banner">
      <view class="banner-bg"></view>
      <view class="banner-content">
        <text class="banner-title">{{ villageName }}村民委员会</text>
        <text class="banner-sub">全心全意为村民服务</text>
        <view v-if="teamCommitment" class="commitment">
          <text class="commit-text">集体承诺：{{ teamCommitment }}</text>
        </view>
      </view>
    </view>
    
    <view class="tab-bar">
      <view 
        v-for="tab in tabs"
        :key="tab.value"
        class="tab-item"
        :class="{ active: currentTab === tab.value }"
        @click="switchTab(tab.value)"
      >{{ tab.label }}</view>
    </view>
    
    <scroll-view scroll-y class="member-list">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view class="member-card" v-for="member in list" :key="member._id" @click="goDetail(member)">
        <image class="member-avatar" :src="member.avatar || defaultAvatar" mode="aspectFill" />
        <view class="member-info">
          <view class="name-row">
            <text class="member-name">{{ member.name }}</text>
            <view class="role-tag">{{ member.role }}</view>
          </view>
          <text v-if="member.division" class="member-division">分管：{{ member.division }}</text>
        </view>
        <view v-if="member.phone" class="call-btn" @click.stop="callPhone(member.phone)">
          <text>📞</text>
        </view>
      </view>
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noData', '暂无' + currentTabName)" icon="👥" />
      <view v-if="loading" class="loading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { useConfigStore } from '@/store/config.js'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const villageName = computed(() => configStore.villageName)

const list = ref([])
const loading = ref(false)
const currentTab = ref('committee')
const teamCommitment = ref('廉洁奉公、勤政为民、公开透明、接受监督')

const tabs = [
  { value: 'committee', label: '班子成员' },
  { value: 'party', label: '党员' },
  { value: 'rep', label: '村民代表' },
  { value: 'supervisor', label: '监委会' }
]

const currentTabName = computed(() => {
  return tabs.find(t => t.value === currentTab.value)?.label || ''
})

const defaultAvatar = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><circle cx="40" cy="40" r="40" fill="%23C41E24"/><text x="50%25" y="55%25" text-anchor="middle" fill="white" font-size="32">民</text></svg>'

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.team', '村委班子') })
  loadData()
})
onPullDownRefresh(() => loadData())

async function loadData() {
  loading.value = true
  
  try {
    const res = await callFunction('getTeamMembers', { type: currentTab.value })
    if (res.success) {
      list.value = res.data
    }
  } catch (err) {
    console.error('加载失败:', err)
  } finally {
    loading.value = false
    uni.stopPullDownRefresh()
  }
}

function switchTab(tab) {
  currentTab.value = tab
  loadData()
}

function goDetail(member) {
  uni.navigateTo({ url: `/pages/team/member-detail?memberId=${member._id}` })
}

function callPhone(phone) {
  uni.makePhoneCall({ phoneNumber: phone })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-team {
  min-height: 100vh;
  background: $bg;
  
  .banner {
    position: relative;
    height: 360rpx;
    overflow: hidden;
    
    .banner-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, $primary, $primary-dark);
    }
    
    .banner-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 0 $page-padding;
      color: $white;
      
      .banner-title {
        font-size: $font-title;
        font-weight: bold;
        margin-bottom: 8rpx;
      }
      
      .banner-sub {
        font-size: $font-sub;
        opacity: 0.9;
        margin-bottom: 24rpx;
      }
      
      .commitment {
        padding: $space-md $space-lg;
        background: rgba(255,255,255,0.2);
        border-radius: $radius-md;
        
        .commit-text {
          font-size: $font-sub;
          color: $white;
        }
      }
    }
  }
  
  .tab-bar {
    display: flex;
    background: $white;
    padding: $space-md $page-padding;
    box-shadow: $card-shadow;
    
    .tab-item {
      flex: 1;
      text-align: center;
      padding: $space-md 0;
      font-size: $font-sub;
      color: $text-sub;
      border-radius: $radius-sm;
      
      &.active {
        color: $primary;
        font-weight: bold;
        background: $primary-light;
      }
    }
  }
  
  .member-list {
    height: calc(100vh - 560rpx);
    padding: $page-padding;
    box-sizing: border-box;
  }
  
  .member-card {
    display: flex;
    align-items: center;
    background: $white;
    padding: $card-padding;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    
    .member-avatar {
      width: 120rpx;
      height: 120rpx;
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
        margin-bottom: 8rpx;
        
        .member-name {
          font-size: $font-card-title;
          font-weight: bold;
          color: $text-main;
          margin-right: 16rpx;
        }
        
        .role-tag {
          padding: $space-xs $space-md;
          background: $primary-light;
          color: $primary;
          border-radius: $radius-sm;
          font-size: $font-sub;
        }
      }
      
      .member-division {
        font-size: $font-sub;
        color: $text-sub;
      }
    }
    
    .call-btn {
      width: 96rpx;
      height: 96rpx;
      background: $success;
      color: $white;
      border-radius: $radius-full;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $font-number;
    }
    
    &:active { background: $bg; }
  }
  
  .loading {
    text-align: center;
    padding: $card-padding;
    font-size: $font-sub;
    color: $text-weak;
  }
}
</style>
