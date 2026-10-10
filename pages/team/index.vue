<!--
  pages/team/index.vue - 村委（tabBar「村委」，学习·监督）
  红旗风格 v3：
    ① 页头旗卡（悬浮红旗：金星+两委班子动态名，与原生导航留米白间隙）
    ② 一线风采轮播（班子走访慰问实况，复用 AppBanner）
    ③ 两委班子成员
    ④ 村委在干啥 / 怎么联系
    ⑤ 书记寄语·发展蓝图（金卡引用语，升华收尾）
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-team">
    <!-- ① 页头旗卡 -->
    <view class="team-flag-card">
      <AppIcon class="flag-star-bg" name="star" :size="240" :color="FLAG_VEIL" />
      <view class="flag-ribbon flag-ribbon-1"></view>
      <view class="flag-ribbon flag-ribbon-2"></view>
      <view class="flag-title-row">
        <AppIcon name="star" :size="44" :color="STAR_GOLD" />
        <text class="flag-title">{{ teamTitle }}</text>
      </view>
      <text class="flag-sub">架起干群连心桥 · 服务不缺位</text>
      <view class="flag-wave">
        <view class="wave-circle wave-1"></view>
        <view class="wave-circle wave-2"></view>
        <view class="wave-circle wave-3"></view>
      </view>
    </view>

    <!-- ② 一线风采（干群连心，受模块开关控制） -->
    <view v-if="show('homeBlock.leader')" class="section">
      <AppSectionTitle title="一线风采" :more-text="''" />
      <AppBanner v-if="showcaseItems.length" :items="showcaseItems" @tap="goShowcase" />
      <view v-else class="empty-banner-hint">
        <text>班子走访慰问实况将在这里展示</text>
      </view>
    </view>

    <!-- ③ 两委班子成员 -->
    <view class="section">
      <AppSectionTitle title="两委班子成员" />
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
      <view v-if="loadError && members.length === 0" class="error-banner" @click="loadMembers">
        <AppIcon name="warning" :size="32" :color="DANGER" />
        <text class="error-text">加载失败，点击重试</text>
      </view>
      <EmptyState v-else-if="!loading && members.length === 0" text="暂无成员信息" icon="👥" />
      <view v-if="members.length > 3" class="more-btn" @click="showAll = !showAll">
        {{ showAll ? '收起' : '查看全部村委' }} ›
      </view>
    </view>

    <!-- ④ 村委在干啥 -->
    <view class="section">
      <AppSectionTitle title="村委在干啥" />
      <view class="work-card">
        <view class="work-item" v-for="w in workEntries" :key="w.name" @click="go(w.path)">
          <view class="work-icon-wrap" :style="{ background: w.bg }">
            <AppIcon :name="w.icon" :size="32" :color="w.color" />
          </view>
          <text class="work-name">{{ w.name }}</text>
          <text class="card-arrow">›</text>
        </view>
      </view>
    </view>

    <!-- ⑤ 怎么联系 -->
    <view class="section">
      <AppSectionTitle title="怎么联系" />
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

    <!-- ⑥ 书记寄语 · 发展蓝图 -->
    <view v-if="secretaryMessage" class="section">
      <AppSectionTitle title="书记寄语 · 发展蓝图" />
      <view class="quote-card">
        <text class="quote-mark">❝</text>
        <view class="quote-author">
          <image
            v-if="secretaryMessage.coverImage"
            class="quote-avatar"
            :src="secretaryMessage.coverImage"
            mode="aspectFill"
          />
          <view v-else class="quote-avatar quote-avatar-empty">
            <AppIcon name="user" :size="44" :color="CHIP_TEXT.gold" />
          </view>
          <text class="quote-name">{{ secretaryMessage.author || '村党支部书记' }}</text>
        </view>
        <text class="quote-text">{{ secretaryMessage.title }}</text>
        <view class="quote-footer">
          <text class="quote-sign">—— {{ villageName }}党支部书记</text>
          <view class="quote-more" @click="goBlueprint">
            <text class="quote-more-text">发展蓝图</text>
            <text class="quote-more-arrow">›</text>
          </view>
        </view>
      </view>
    </view>

    <view class="page-footer-space"></view>
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
import AppSectionTitle from '@/components/AppSectionTitle.vue'
import AppBanner from '@/components/AppBanner.vue'
import AppIcon from '@/components/AppIcon.vue'
import { CHIP_BG, CHIP_TEXT, FLAG_VEIL, STAR_GOLD, DANGER } from '@/utils/theme.js'
import { useRootFontSize } from '@/composables/useA11y.js'

const configStore = useConfigStore()
const rootFontSize = useRootFontSize()

const members = ref([])
const loading = ref(false)
const loadError = ref(false)
const showAll = ref(false)
const showcases = ref([])
let lastShowcaseTime = 0

const defaultAvatar = '/static/images/default-avatar.png'

const villageName = computed(() => configStore.villageName)
const villagePhone = computed(() => configStore.villagePhone)

function show(path) {
  return configStore.isModuleEnabled(path)
}

const officeHours = computed(() => configStore.office_hours || '周一至周五 8:30-17:30')
const officeAddress = computed(() => configStore.office_address || '村委会')

// 「黄庄社区两委班子」：动态村/社区名 + 两委班子
const teamTitle = computed(() => `${villageName.value || '村'}两委班子`)

const workEntries = [
  { icon: 'video', bg: CHIP_BG.red, color: CHIP_TEXT.red, name: '书记风采', path: '/pages/leader/list?type=secretary' },
  { icon: 'users', bg: CHIP_BG.gold, color: CHIP_TEXT.gold, name: '上级走访', path: '/pages/leader/list?type=leader' },
  { icon: 'edit', bg: CHIP_BG.blue, color: CHIP_TEXT.blue, name: '会议记录', path: '/pages/meeting/list' },
  { icon: 'wallet', bg: CHIP_BG.green, color: CHIP_TEXT.green, name: '村里钱怎么花', path: '/pages/finance/list' },
  { icon: 'flag', bg: CHIP_BG.red, color: CHIP_TEXT.red, name: '党建学习', path: '/pages/category/list?type=study' }
]

const shownMembers = computed(() => (showAll.value ? members.value : members.value.slice(0, 3)))

// 一线风采轮播：书记风采 + 上级走访 合并前 5 条实况
const showcaseItems = computed(() =>
  showcases.value.slice(0, 5).map(s => ({
    id: s._id,
    image: s.coverImage || '',
    title: s.title,
    type: s.type === 'leader' ? '上级走访' : '书记风采'
  }))
)

// 书记寄语：书记风采最新一条
const secretaryMessage = computed(() => showcases.value.find(s => s.type === 'secretary') || null)

onMounted(() => {
  configStore.loadConfig()
  loadMembers()
  loadShowcases()
})

onShow(() => {
  if (members.value.length === 0) loadMembers()
  // 节流 30s：回页刷新一线风采/书记寄语，避免每次切 tab 都打云函数
  const now = Date.now()
  if (now - lastShowcaseTime > 30000) loadShowcases()
})

onPullDownRefresh(() => {
  loadMembers()
  loadShowcases()
})

async function loadMembers() {
  loading.value = true
  loadError.value = false
  try {
    const res = await callFunction('getTeamMembers', { type: 'committee' })
    if (res.success) {
      members.value = res.data || []
    } else {
      loadError.value = true
    }
  } catch (err) {
    console.error('[村委加载失败]:', err)
    loadError.value = true
  } finally {
    loading.value = false
    uni.stopPullDownRefresh()
  }
}

async function loadShowcases() {
  lastShowcaseTime = Date.now()
  try {
    const [s, l] = await Promise.all([
      callFunction('getLeaderContentList', { type: 'secretary', page: 1, pageSize: 3 }),
      callFunction('getLeaderContentList', { type: 'leader', page: 1, pageSize: 3 })
    ])
    const merged = []
    if (s && s.success && Array.isArray(s.data)) merged.push(...s.data.map(x => ({ ...x, type: 'secretary' })))
    if (l && l.success && Array.isArray(l.data)) merged.push(...l.data.map(x => ({ ...x, type: 'leader' })))
    showcases.value = merged
  } catch (err) {
    console.error('[一线风采加载失败]:', err)
  }
}

function goShowcase(item) {
  if (item && item.id) uni.navigateTo({ url: '/pages/leader/detail?id=' + item.id })
}

function goBlueprint() {
  goPage('/pages/leader/list?type=secretary')
}

function goDetail(m) {
  uni.navigateTo({ url: `/pages/team/member-detail?memberId=${m._id}` })
}

function go(path) {
  goPage(path)
}

function callVillage() {
  if (!villagePhone.value) {
    uni.showToast({ title: '电话暂未登记，请到村委会咨询', icon: 'none' })
    return
  }
  uni.makePhoneCall({ phoneNumber: villagePhone.value })
}
</script>

<style lang="scss" scoped>

.page-team {
  min-height: 100vh;
  background: $bg;

  // ===== 页头旗卡（悬浮红旗，与原生导航留米白间隙） =====
  .team-flag-card {
    position: relative;
    margin: 24rpx $page-padding 0;
    padding: 32rpx;
    background: $flag-gradient;
    border-radius: $radius-card;
    color: $white;
    overflow: hidden;
    box-shadow: 0 8rpx 24rpx rgba($primary, 0.22);

    .flag-star-bg {
      position: absolute;
      right: -20rpx;
      top: -40rpx;
      pointer-events: none;
    }

    .flag-ribbon {
      position: absolute;
      left: -10%;
      width: 120%;
      height: 48rpx;
      background: linear-gradient(105deg, rgba($white, 0) 30%, rgba($white, 0.06) 50%, rgba($white, 0) 70%);
      pointer-events: none;
    }
    .flag-ribbon-1 { top: 24%; transform: rotate(-8deg); }
    .flag-ribbon-2 { bottom: 30%; height: 32rpx; transform: rotate(-6deg); }

    .flag-title-row {
      display: flex;
      align-items: center;
      position: relative;

      .flag-title {
        font-size: $font-title;
        font-weight: 600;
        margin-left: 16rpx;
      }
    }

    .flag-sub {
      position: relative;
      display: block;
      margin-top: 12rpx;
      font-size: $font-sub;
      color: rgba($white, 0.85);
    }

    // 卡内波浪下摆（三圆弧，与 fixed 旗面同色系）
    .flag-wave {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 24rpx;
      overflow: hidden;

      .wave-circle {
        position: absolute;
        top: -56rpx;
        width: 80rpx;
        height: 80rpx;
        border-radius: $radius-full;
        background: $flag-dark;
      }
      .wave-1 { left: 12%; }
      .wave-2 { left: 48%; }
      .wave-3 { right: 12%; }
    }
  }

  .section {
    padding: 0 $page-padding;
  }

  .empty-banner-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 160rpx;
    background: $white;
    border-radius: $radius-card;
    box-shadow: $shadow-sm;
    font-size: $font-sub;
    color: $text-weak;
  }

  .member-card {
    display: flex;
    align-items: center;
    background: $white;
    padding: 20rpx 24rpx;
    border-radius: $radius-list;
    box-shadow: $shadow-sm;
    margin-bottom: $space-lg;
    min-height: 152rpx;
    box-sizing: border-box;
    transition: transform $tap-time ease;

    &:active { transform: scale($tap-scale); }

    .member-avatar {
      width: 96rpx;
      height: 96rpx;
      border-radius: $radius-full;
      background: $bg;
      margin-right: 24rpx;
      flex-shrink: 0;
    }

    .member-info {
      flex: 1;
      min-width: 0;
      .name-row {
        display: flex;
        align-items: center;
        .member-name { font-size: $font-body; font-weight: 600; color: $text-main; margin-right: 12rpx; }
        .member-role {
          font-size: $font-sub;
          color: $primary;
          background: $chip-red-bg;
          height: 44rpx;
          line-height: 44rpx;
          padding: 0 16rpx;
          border-radius: $radius-md;
        }
      }
      .member-duty { display: block; font-size: $font-sub; color: $text-sub; margin-top: 8rpx; }
      .member-phone { display: block; font-size: $font-sub; color: $text-weak; margin-top: 4rpx; }
    }

    .card-arrow { font-size: 40rpx; color: $text-weak; line-height: 1; }
  }

  .error-banner {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 120rpx;
    background: rgba($danger, 0.08);
    border: 2rpx solid rgba($danger, 0.2);
    border-radius: $radius-list;

    .error-text {
      font-size: $font-sub;
      color: $text-sub;
      margin-left: 8rpx;
    }
  }

  .more-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 88rpx;
    background: $white;
    border-radius: $radius-card;
    box-shadow: $shadow-sm;
    font-size: $font-body;
    color: $primary;
    &:active { background: $bg; }
  }

  .work-card {
    background: $white;
    border-radius: $radius-card;
    box-shadow: $shadow-md;
    padding: 8rpx 24rpx;
  }

  .work-item {
    position: relative;
    display: flex;
    align-items: center;
    height: 104rpx;

    // 分割线缩进至图标右侧（iOS 分组列表惯例），末项无线
    &::after {
      content: '';
      position: absolute;
      left: 100rpx;
      right: 0;
      bottom: 0;
      height: 2rpx;
      background: $border;
    }
    &:last-child::after { display: none; }

    .work-icon-wrap {
      width: 56rpx;
      height: 56rpx;
      border-radius: $radius-lg;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20rpx;
    }
    .work-name { flex: 1; font-size: $font-body; font-weight: 500; color: $text-main; }
    .card-arrow { font-size: 32rpx; color: $text-weak; line-height: 1; }
    &:active { background: $bg; }
  }

  .contact-card {
    background: $white;
    border-radius: $radius-card;
    box-shadow: $shadow-md;
    padding: 24rpx;
  }

  .contact-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72rpx;
    .contact-label { font-size: $font-body; color: $text-sub; }
    .contact-value { font-size: $font-body; font-weight: 500; color: $text-main; }
  }

  .call-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88rpx;
    margin-top: 16rpx;
    background: $primary;
    color: $white;
    border-radius: $radius-full;
    font-size: $font-btn;
    font-weight: 600;
    &:active { background: $primary-dark; }
  }

  // 书记寄语金卡
  .quote-card {
    position: relative;
    background: $gold-quote-bg;
    border-radius: $radius-card;
    padding: 32rpx;
    overflow: hidden;

    .quote-mark {
      position: absolute;
      left: 16rpx;
      top: 8rpx;
      font-size: 80rpx;
      color: rgba($gold, 0.25);
      line-height: 1;
    }

    .quote-author {
      display: flex;
      align-items: center;
      margin: 24rpx 0 20rpx;

      .quote-avatar {
        width: 96rpx;
        height: 96rpx;
        border-radius: $radius-full;
        border: 4rpx solid rgba($white, 0.8);
        margin-right: 16rpx;
      }
      .quote-avatar-empty {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba($white, 0.6);
      }
      .quote-name {
        font-size: $font-body;
        font-weight: 600;
        color: $text-main;
      }
    }

    .quote-text {
      font-size: $font-card-title;
      font-weight: 500;
      color: $text-main;
      line-height: 1.7;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .quote-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20rpx;

      .quote-sign {
        font-size: $font-sub;
        color: $chip-gold-text;
      }
      .quote-more {
        display: flex;
        align-items: center;
        // 扩大触控区：内 padding + 负 margin 抵消，视觉不变点击区 ≥88rpx
        padding: 20rpx 0 20rpx 24rpx;
        margin: -20rpx 0;

        .quote-more-text {
          font-size: $font-sub;
          font-weight: 500;
          color: $chip-gold-text;
        }
        .quote-more-arrow {
          font-size: $font-card-title;
          color: $chip-gold-text;
          line-height: 1;
        }
        &:active { opacity: 0.7; }
      }
    }
  }

  .page-footer-space {
    height: 40rpx;
  }
}
</style>
