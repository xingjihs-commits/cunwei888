<!--
  pages/secretary/mailbox.vue - 书记信箱
  用途：村民直送书记，不经派单流程
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-mailbox">
    <view class="hero">
      <view class="hero-icon">✉️</view>
      <text class="hero-title">{{ t('pageTitle.mailbox', '书记信箱') }}</text>
      <text class="hero-sub">您的话直达书记，不经派单</text>
    </view>
    
    <view class="card">
      <view class="form-group">
        <text class="form-label">主题</text>
        <input v-model="form.subject" class="input"  :placeholder="t('placeholder.mailSubject', '一句话概括您要反映的事')" maxlength="30" />
      </view>
      
      <view class="form-group">
        <text class="form-label">详细内容</text>
        <view class="textarea-wrap">
          <textarea v-model="form.content" class="textarea"  :placeholder="t('placeholder.mailContent', '请详细描述您想对书记说的话（至少5个字）')" maxlength="1000" :auto-height="true" />
          <view class="char-count">{{ form.content.length }}/1000</view>
        </view>
        <VoiceInput @result="onVoiceResult" />
      </view>
      
      <view class="form-group">
        <text class="form-label">紧急程度</text>
        <view class="urgent-row">
          <view v-for="item in urgentOptions" :key="item.value"
            class="urgent-item"
            :class="{ active: form.urgentLevel === item.value, ['u-' + item.value]: true }"
            @click="form.urgentLevel = item.value">{{ item.label }}</view>
        </view>
      </view>
      
      <view class="form-group">
        <view class="check-row" @click="form.isAnonymous = !form.isAnonymous">
          <view class="check-box" :class="{ checked: form.isAnonymous }">
            <text v-if="form.isAnonymous" class="check-icon">✓</text>
          </view>
          <text>匿名提交（书记看不到我的身份）</text>
        </view>
      </view>
    </view>
    
    <Disclaimer content="书记信箱仅您和书记可见，他人无法查看。紧急情况仍请直接拨打村值班电话。" />
    
    <view style="height: 140rpx;"></view>
    
    <view class="bottom-bar">
      <BigButton  :text="t('button.deliver', '送达书记')" type="primary" @click="onSubmit" :disabled="!canSubmit" />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { callFunction, acquireLock, releaseLock } from '@/utils/request.js'
import { requestSubscribe } from '@/utils/subscribe.js'
import BigButton from '@/components/BigButton.vue'
import Disclaimer from '@/components/Disclaimer.vue'
import VoiceInput from '@/components/VoiceInput.vue'
import { ensureAuth, AUTH_VERIFIED } from '@/utils/auth.js'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const DRAFT_KEY = 'draft_mailbox'

const form = reactive({
  subject: '',
  content: '',
  urgentLevel: '普通',
  isAnonymous: false
})

const urgentOptions = [
  { value: '普通', label: '普通' },
  { value: '紧急', label: '紧急' },
  { value: '特急', label: '特急' }
]

const canSubmit = computed(() => {
  return form.subject && form.content.trim().length >= 5
})

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.mailbox', '书记信箱') })
  if (!ensureAuth(AUTH_VERIFIED)) return
  const draft = uni.getStorageSync(DRAFT_KEY)
  if (draft) {
    try { Object.assign(form, draft) } catch (e) {}
  }
})

watch(form, () => {
  try {
    uni.setStorageSync(DRAFT_KEY, { subject: form.subject, content: form.content, urgentLevel: form.urgentLevel, isAnonymous: form.isAnonymous })
  } catch (e) {}
}, { deep: true })

onUnmounted(() => {})

function clearDraft() { uni.removeStorageSync(DRAFT_KEY) }

function onVoiceResult(text) { form.content += text }

async function onSubmit() {
  requestSubscribe([configStore.subscribeTemplates && configStore.subscribeTemplates.status_update])
  if (!canSubmit.value) return
  
  if (!acquireLock('submitSecretaryMail', 10000)) {
    uni.showToast({ title: '请勿重复提交', icon: 'none' })
    return
  }
  
  uni.showLoading({ title: '送达中...', mask: true })
  
  try {
    const res = await callFunction('submitSecretaryMail', { ...form })
    if (res.success) {
      clearDraft()
      uni.showToast({ title: '已送达书记', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1500)
    }
  } catch (err) {
    console.error('提交失败:', err)
  } finally {
    releaseLock('submitSecretaryMail')
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-mailbox {
  min-height: 100vh;
  background: $bg;
  padding-bottom: 200rpx;
  
  .hero {
    background: linear-gradient(135deg, $primary, $primary-dark);
    color: $white;
    text-align: center;
    padding: 60rpx $page-padding;
    
    .hero-icon { font-size: 100rpx; margin-bottom: 16rpx; }
    .hero-title { font-size: $font-title; font-weight: bold; display: block; margin-bottom: 8rpx; }
    .hero-sub { font-size: $font-sub; opacity: 0.9; }
  }
  
  .card {
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
    margin: $card-gap $page-padding;
    
    .form-group { margin-bottom: 32rpx; }
    .form-label { font-size: $font-body; color: $text-main; display: block; margin-bottom: 12rpx; font-weight: bold; }
    .input {
      width: 100%;
      height: $btn-height;
      background: $bg;
      border-radius: $radius-md;
      padding: 0 $space-lg;
      font-size: $font-body;
      box-sizing: border-box;
    }
    .textarea-wrap {
      background: $bg;
      border-radius: $radius-md;
      padding: $card-padding;
      .textarea { width: 100%; min-height: 240rpx; font-size: $font-body; line-height: 1.6; }
      .char-count { text-align: right; font-size: $font-sub; color: $text-weak; }
    }
    .urgent-row { display: flex; gap: 16rpx; }
    .urgent-item {
      flex: 1;
      height: $btn-height;
      line-height: $btn-height;
      text-align: center;
      background: $bg;
      border: 4rpx solid $border;
      border-radius: $radius-md;
      font-size: $font-body;
      &.active.u-normal { border-color: $success; background: rgba(46,125,50,0.1); color: $success; }
      &.active.u-urgent { border-color: $warning; background: rgba(230,81,0,0.1); color: $warning; }
      &.active.u-critical { border-color: $danger; background: rgba(198,40,40,0.1); color: $danger; }
    }
    .check-row { display: flex; align-items: center; }
    .check-box {
      width: 40rpx; height: 40rpx;
      border: 4rpx solid $border;
      border-radius: $radius-sm;
      margin-right: 12rpx;
      display: flex; align-items: center; justify-content: center;
      &.checked { background: $primary; border-color: $primary; }
      .check-icon { color: $white; font-size: $font-sub; font-weight: bold; }
    }
  }
  
  .bottom-bar {
    position: fixed; bottom: 0; left: 0; right: 0;
    padding: $card-gap $page-padding;
    padding-bottom: calc(#{$card-gap} + env(safe-area-inset-bottom));
    background: $white;
    box-shadow: $shadow-top;
  }
}
</style>
