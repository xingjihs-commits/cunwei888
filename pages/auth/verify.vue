<!--
  pages/auth/verify.vue - 村民认证（宽进严管）
  用途：填姓名 + 村组 + 手机号（微信一键授权），提交即通过
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-verify">
    <view class="notice">
      <text class="notice-icon">ℹ️</text>
      <text class="notice-text">填写姓名和村组即可完成认证，手机号用于身份核验，不会公开</text>
    </view>

    <view class="card">
      <view class="card-title">快速认证</view>

      <view class="form-group">
        <text class="form-label">姓名</text>
        <input v-model="form.realName" class="input"  :placeholder="t('placeholder.realName', '请输入真实姓名')" />
      </view>

      <view class="form-group">
        <text class="form-label">村组</text>
        <input v-model="form.villageGroup" class="input"  :placeholder="t('placeholder.villageGroup', '如：三组')" />
      </view>

      <view class="form-group">
        <text class="form-label">手机号</text>
        <button
          v-if="!form.phone && !phoneCode"
          class="phone-btn"
          open-type="getPhoneNumber"
          @getphonenumber="onGetPhone"
        >微信一键获取手机号</button>
        <view v-else class="phone-show">
          <text class="phone-value">{{ form.phone || t('placeholder.phoneAuthorized', '已授权微信手机号') }}</text>
          <text class="phone-change" @click="resetPhone">更换</text>
        </view>
        <input v-model="form.phone" class="input" type="number" maxlength="11"  :placeholder="t('placeholder.phoneManual', '也可手动输入手机号')" />
      </view>
    </view>

    <view class="agreement">
      <view class="check-box" :class="{ checked: agreed }" @click="agreed = !agreed">
        <text v-if="agreed" class="check-icon">✓</text>
      </view>
      <text class="agree-text" @click="agreed = !agreed">我已阅读并同意</text>
      <text class="agree-link" @click="goAgreement">《服务协议》</text>
      <text class="agree-text">与</text>
      <text class="agree-link" @click="goPrivacy">《隐私政策》</text>
    </view>

    <view class="bottom-bar">
      <BigButton :text="t('button.submit', '提交认证')" type="primary" :disabled="!canSubmit" :loading="submitting" @click="onSubmit" />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, reactive, computed, onMounted } from 'vue'
import { useUserStore } from '@/store/user.js'
import { callFunction, acquireLock, releaseLock } from '@/utils/request.js'
import { requestSubscribe } from '@/utils/subscribe.js'
import BigButton from '@/components/BigButton.vue'
import { ensureAuth, AUTH_LOGIN } from '@/utils/auth.js'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const userStore = useUserStore()
const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const form = reactive({
  realName: userStore.realName || '',
  villageGroup: userStore.villageGroup || '',
  phone: userStore.phone || ''
})
const phoneCode = ref('')
const agreed = ref(false)
const submitting = ref(false)

const canSubmit = computed(() =>
  form.realName && form.villageGroup && (form.phone || phoneCode.value) && agreed.value
)

onMounted(() => {
  if (!ensureAuth(AUTH_LOGIN)) return
})

function onGetPhone(e) {
  if (e && e.detail && e.detail.code) {
    phoneCode.value = e.detail.code
    form.phone = ''
    uni.showToast({ title: '已获取授权', icon: 'success' })
  } else {
    uni.showToast({ title: '未授权，可手动输入手机号', icon: 'none' })
  }
}

function resetPhone() {
  phoneCode.value = ''
  form.phone = ''
}

async function onSubmit() {
  requestSubscribe([configStore.subscribeTemplates && configStore.subscribeTemplates.status_update])
  if (!canSubmit.value || submitting.value) return
  if (!acquireLock('submit_verify', 10000)) {
    uni.showToast({ title: '请勿重复提交', icon: 'none' })
    return
  }
  submitting.value = true
  uni.showLoading({ title: '提交中...', mask: true })
  try {
    const res = await callFunction('verifyUser', {
      realName: form.realName,
      villageGroup: form.villageGroup,
      phone: form.phone || undefined,
      phoneCode: phoneCode.value || undefined
    })
    if (res.success) {
      await userStore.refreshUserInfo(true)
      uni.showToast({ title: '认证成功', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1500)
    } else {
      uni.showToast({ title: res.message || '提交失败', icon: 'none' })
    }
  } catch (err) {
    console.error('提交失败:', err)
    uni.showToast({ title: '提交失败', icon: 'none' })
  } finally {
    releaseLock('submit_verify')
    submitting.value = false
    uni.hideLoading()
  }
}

function goAgreement() { uni.navigateTo({ url: '/pages/agreement/index' }) }
function goPrivacy() { uni.navigateTo({ url: '/pages/privacy/index' }) }
</script>

<style lang="scss" scoped>

.page-verify {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  padding-bottom: 200rpx;
  box-sizing: border-box;

  .notice {
    display: flex;
    align-items: center;
    background: rgba(230,81,0,0.08);
    border-left: 6rpx solid $warning;
    padding: $card-padding;
    border-radius: $radius-sm;
    margin-bottom: $card-gap;

    .notice-icon { font-size: $font-body; margin-right: 12rpx; }
    .notice-text { flex: 1; font-size: $font-sub; color: $text-sub; }
  }

  .card {
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;

    .card-title {
      font-size: $font-card-title;
      font-weight: bold;
      color: $text-main;
      border-left: 8rpx solid $primary;
      padding-left: 16rpx;
      margin-bottom: 24rpx;
    }
  }

  .form-group {
    margin-bottom: 32rpx;

    .form-label {
      font-size: $font-body;
      color: $text-main;
      display: block;
      margin-bottom: 12rpx;
      font-weight: bold;
    }

    .input {
      width: 100%;
      height: $btn-height;
      background: $bg;
      border-radius: $radius-md;
      padding: 0 $space-lg;
      font-size: $font-body;
      box-sizing: border-box;
      margin-top: 12rpx;
    }

    .phone-btn {
      width: 100%;
      height: $btn-height;
      line-height: $btn-height;
      background: $primary;
      color: $white;
      border-radius: $btn-radius;
      font-size: $font-btn;
      font-weight: bold;

      &::after { border: none; }
    }

    .phone-show {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: $btn-height;
      padding: 0 $space-lg;
      background: $primary-light;
      border-radius: $radius-md;

      .phone-value { font-size: $font-body; color: $primary; font-weight: bold; }
      .phone-change { font-size: $font-sub; color: $primary; }
    }
  }

  .agreement {
    display: flex;
    align-items: center;
    padding: $card-padding 0;

    .check-box {
      width: 40rpx;
      height: 40rpx;
      border: 4rpx solid $border;
      border-radius: $radius-sm;
      margin-right: 12rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      &.checked {
        background: $primary;
        border-color: $primary;
        .check-icon { color: $white; font-size: $font-sub; font-weight: bold; }
      }
    }

    .agree-text { font-size: $font-sub; color: $text-sub; }
    .agree-link { font-size: $font-sub; color: $primary; }
  }

  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: $card-gap $page-padding;
    padding-bottom: calc(#{$card-gap} + env(safe-area-inset-bottom));
    background: $white;
    box-shadow: $shadow-top;
  }
}
</style>
