<!--
  pages/agri/checkin.vue - 留守老人每日签到
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-checkin">
    <view class="hero">
      <view class="hero-icon">☀️</view>
      <text class="hero-title">今日签到</text>
      <text class="hero-sub">{{ today }}</text>
    </view>
    
    <view class="streak-card">
      <view class="streak-num">{{ streak }}</view>
      <view class="streak-info">
        <text class="streak-label">连续签到</text>
        <text class="streak-unit">天</text>
      </view>
    </view>
    
    <view class="card">
      <view class="card-title">今日状态</view>
      <view class="status-options">
        <view v-for="item in statusOptions" :key="item.value" class="status-opt"
          :class="{ active: selectedStatus === item.value, ['st-' + item.value]: true }"
          @click="selectedStatus = item.value">
          <view class="status-icon">{{ item.icon }}</view>
          <text class="status-label">{{ item.label }}</text>
        </view>
      </view>
      
      <view class="form-group">
        <text class="form-label">想说的话（选填）</text>
        <textarea v-model="note" class="textarea"  :placeholder="t('placeholder.checkinNote', '身体不适或需要帮助请说明')" maxlength="200" />
      </view>
    </view>
    
    <view class="bottom-bar">
      <BigButton v-if="!todayChecked"  :text="t('button.checkin', '完成签到')" type="primary" @click="doCheckin" :disabled="!selectedStatus" />
      <view v-else class="checked-tip">✓ 今日已签到，明天再来</view>
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, onMounted } from 'vue'
import { callFunction } from '@/utils/request.js'
import { requestSubscribe } from '@/utils/subscribe.js'
import BigButton from '@/components/BigButton.vue'
import { useConfigStore } from '@/store/config.js'
import { ensureAuth, AUTH_VERIFIED } from '@/utils/auth.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const today = new Date().toLocaleDateString('zh-CN')
const selectedStatus = ref('normal')
const note = ref('')
const streak = ref(0)
const todayChecked = ref(false)

const statusOptions = [
  { value: 'normal', label: '一切安好', icon: '😊' },
  { value: 'help_needed', label: '需要帮助', icon: '🤲' },
  { value: 'urgent', label: '紧急求助', icon: '🆘' }
]

onMounted(() => {
  if (!ensureAuth(AUTH_VERIFIED)) return
  uni.setNavigationBarTitle({ title: t('pageTitle.checkin', '每日签到') })
  loadData()
})

async function loadData() {
  try {
    const res = await callFunction('getCheckinStatus', {})
    if (res.success) {
      streak.value = res.data.streak
      todayChecked.value = res.data.todayChecked
    }
  } catch (err) { console.error(err) }
}

async function doCheckin() {
  requestSubscribe([configStore.subscribeTemplates && configStore.subscribeTemplates.checkin_reminder])
  if (!selectedStatus.value) return
  
  uni.showLoading({ title: '签到中...', mask: true })
  try {
    const res = await callFunction('elderlyCheckin', {
      status: selectedStatus.value,
      note: note.value
    })
    if (res.success) {
      uni.showToast({ title: '签到成功', icon: 'success' })
      todayChecked.value = true
      streak.value++
    }
  } catch (err) { console.error(err) }
  finally { uni.hideLoading() }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-checkin { min-height: 100vh; background: $bg; padding-bottom: 200rpx;
  .hero { background: linear-gradient(135deg, $gold, darken(#D4A843, 10%)); color: $white; text-align: center; padding: 60rpx $page-padding;
    .hero-icon { font-size: 100rpx; margin-bottom: 16rpx; }
    .hero-title { font-size: $font-title; font-weight: bold; display: block; }
    .hero-sub { font-size: $font-sub; opacity: 0.9; } }
  .streak-card { display: flex; align-items: center; justify-content: center; background: $white; margin: $card-gap $page-padding; padding: $card-padding; border-radius: $card-radius; box-shadow: $card-shadow;
    .streak-num { font-size: 100rpx; font-weight: bold; color: $gold; margin-right: 16rpx; }
    .streak-info { display: flex; flex-direction: column; }
    .streak-label { font-size: $font-body; color: $text-main; }
    .streak-unit { font-size: $font-sub; color: $text-sub; } }
  .card { background: $white; border-radius: $card-radius; padding: $card-padding; box-shadow: $card-shadow; margin: 0 $page-padding $card-gap;
    .card-title { font-size: $font-card-title; font-weight: bold; color: $text-main; margin-bottom: 24rpx; }
    .status-options { display: flex; gap: 16rpx; margin-bottom: 32rpx; }
    .status-opt { flex: 1; display: flex; flex-direction: column; align-items: center; padding: $card-padding 16rpx; background: $bg; border: 4rpx solid transparent; border-radius: $radius-md;
      &.active.st-normal { border-color: $success; background: rgba(46,125,50,0.1); }
      &.active.st-help_needed { border-color: $warning; background: rgba(230,81,0,0.1); }
      &.active.st-urgent { border-color: $danger; background: rgba(198,40,40,0.1); }
      .status-icon { font-size: 56rpx; margin-bottom: 12rpx; }
      .status-label { font-size: $font-sub; color: $text-main; } }
    .form-group { margin-bottom: 24rpx; }
    .form-label { font-size: $font-body; color: $text-main; display: block; margin-bottom: 12rpx; }
    .textarea { width: 100%; min-height: 160rpx; background: $bg; border-radius: $radius-md; padding: $card-padding; font-size: $font-body; box-sizing: border-box; } }
  .bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; padding: $card-gap $page-padding; padding-bottom: calc(#{$card-gap} + env(safe-area-inset-bottom)); background: $white; box-shadow: $shadow-top;
    .checked-tip { text-align: center; padding: $card-padding; font-size: $font-body; color: $success; } } }
</style>
