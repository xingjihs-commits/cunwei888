<!--
  pages/lost-found/publish.vue - 发布失物招领
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-lf-publish">
    <view class="card">
      <view class="form-group">
        <text class="form-label">类型</text>
        <view class="type-row">
          <view class="type-opt" :class="{ active: form.type === '寻物', lost: true }" @click="form.type = '寻物'">寻物启事</view>
          <view class="type-opt" :class="{ active: form.type === '招领', found: true }" @click="form.type = '招领'">失物招领</view>
        </view>
      </view>
      
      <view class="form-group">
        <text class="form-label">标题</text>
        <input v-model="form.title" class="input"  :placeholder="t('placeholder.lostTitle', '如：丢失黑色钱包')" maxlength="30" />
      </view>
      
      <view class="form-group">
        <text class="form-label">详细描述</text>
        <textarea v-model="form.content" class="textarea"  :placeholder="t('placeholder.lostDesc', '请描述物品特征、丢失/捡到时间地点')" maxlength="500" :auto-height="true" />
        <VoiceInput @result="onVoiceResult" />
      </view>
      
      <view class="form-group">
        <text class="form-label">图片（选填）</text>
        <view class="image-grid">
          <view v-for="(img, i) in form.images" :key="img" class="image-item">
            <image :src="img" mode="aspectFill" />
            <view class="image-del" @click="removeImage(i)">×</view>
          </view>
          <view v-if="form.images.length < 6" class="image-add" @click="chooseImage"><text>+</text></view>
        </view>
      </view>
      
      <view class="form-group">
        <text class="form-label">地点（选填）</text>
        <input v-model="form.location" class="input"  :placeholder="t('placeholder.lostLocation', '如：村口小卖部附近')" />
      </view>
      
      <view class="form-group">
        <text class="form-label">联系方式</text>
        <input v-model="form.contactInfo" class="input"  :placeholder="t('placeholder.contact', '手机号或微信')" />
      </view>
    </view>
    
    <view class="bottom-bar">
      <BigButton :text="t('button.publish', '发布')" type="primary" @click="onSubmit" :disabled="!canSubmit" />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { reactive, computed, onMounted, watch } from 'vue'
import { callFunction, uploadImages, acquireLock, releaseLock, cleanupFileIDs } from '@/utils/request.js'
import { requestSubscribe } from '@/utils/subscribe.js'
import BigButton from '@/components/BigButton.vue'
import VoiceInput from '@/components/VoiceInput.vue'
import { useConfigStore } from '@/store/config.js'
import { ensureAuth, AUTH_VERIFIED } from '@/utils/auth.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const DRAFT_KEY = 'draft_lost_found'
const form = reactive({ type: '寻物', title: '', content: '', images: [], location: '', contactInfo: '' })
const canSubmit = computed(() => form.type && form.title && form.content)

onMounted(() => {
  if (!ensureAuth(AUTH_VERIFIED)) return
  const draft = uni.getStorageSync(DRAFT_KEY)
  if (draft) {
    try { Object.assign(form, draft); form.images = [] } catch (e) {}
  }
})

watch(() => [form.type, form.title, form.content, form.location, form.contactInfo], () => {
  try { uni.setStorageSync(DRAFT_KEY, { type: form.type, title: form.title, content: form.content, location: form.location, contactInfo: form.contactInfo }) } catch (e) {}
})

function clearDraft() { uni.removeStorageSync(DRAFT_KEY) }

function onVoiceResult(text) { form.content += text }

async function chooseImage() {
  // #ifdef MP-WEIXIN
  const res = await new Promise((resolve, reject) => {
    wx.chooseMedia({ count: 6 - form.images.length, mediaType: ['image'], sourceType: ['album', 'camera'], success: resolve, fail: reject })
  })
  for (const file of res.tempFiles) form.images.push(file.tempFilePath)
  // #endif
}

function removeImage(i) { form.images.splice(i, 1) }

async function onSubmit() {
  requestSubscribe([configStore.subscribeTemplates && configStore.subscribeTemplates.status_update])
  if (!canSubmit.value) return
  if (!acquireLock('publishLostFound', 10000)) { uni.showToast({ title: '请勿重复', icon: 'none' }); return }
  
  uni.showLoading({ title: '发布中...', mask: true })
  let uploadedFileIDs = []
  try {
    let images = []
    if (form.images.length > 0) {
      const uploadRes = await uploadImages(form.images, 'lost-found', (done, total) => {
        uni.showLoading({ title: `上传中 ${done}/${total}`, mask: true })
      })
      uploadedFileIDs = uploadRes.fileIDs
      if (uploadRes.failed > 0) {
        const ok = await new Promise(resolve => {
          uni.showModal({ title: '提示', content: `${uploadRes.failed}张图片上传失败，是否继续？`, success: r => resolve(r.confirm) })
        })
        if (!ok) { await cleanupFileIDs(uploadedFileIDs); return }
      }
      images = uploadRes.fileIDs
    }
    
    const res = await callFunction('publishLostFound', { ...form, images })
    if (res.success) {
      clearDraft()
      uni.showToast({ title: '发布成功', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1500)
    } else {
      await cleanupFileIDs(uploadedFileIDs)
    }
  } catch (err) {
    console.error('[发布失败]:', err)
    await cleanupFileIDs(uploadedFileIDs)
  } finally {
    releaseLock('publishLostFound')
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
.page-lf-publish { min-height: 100vh; background: $bg; padding: $page-padding; padding-bottom: 200rpx;
  .card { background: $white; border-radius: $card-radius; padding: $card-padding; box-shadow: $card-shadow;
    .form-group { margin-bottom: 32rpx; }
    .form-label { font-size: $font-body; color: $text-main; display: block; margin-bottom: 12rpx; font-weight: bold; }
    .type-row { display: flex; gap: 16rpx; }
    .type-opt { flex: 1; height: $btn-height; line-height: $btn-height; text-align: center; background: $bg; border: 4rpx solid $border; border-radius: $radius-md; font-size: $font-body;
      &.active.lost  /* 保留 CSS 类名，避免破坏样式 */ { border-color: $warning; background: rgba(230,81,0,0.1); color: $warning; }
      &.active.found  /* 保留 CSS 类名，避免破坏样式 */ { border-color: $success; background: rgba(46,125,50,0.1); color: $success; } }
    .input { width: 100%; height: $btn-height; background: $bg; border-radius: $radius-md; padding: 0 $space-lg; font-size: $font-body; box-sizing: border-box; }
    .textarea { width: 100%; min-height: 200rpx; background: $bg; border-radius: $radius-md; padding: $card-padding; font-size: $font-body; box-sizing: border-box; }
    .image-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12rpx;
      .image-item { position: relative; width: 100%; aspect-ratio: 1;
        image { width: 100%; height: 100%; border-radius: $radius-md; }
        .image-del { position: absolute; top: -8rpx; right: -8rpx; width: 40rpx; height: 40rpx; background: $danger; color: $white; border-radius: $radius-full; text-align: center; line-height: 40rpx; font-size: $font-sub; } }
      .image-add { display: flex; align-items: center; justify-content: center; aspect-ratio: 1; background: $bg; border: 4rpx dashed $border; border-radius: $radius-md; font-size: 60rpx; color: $text-weak; } } }
  .bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; padding: $card-gap $page-padding; padding-bottom: calc(#{$card-gap} + env(safe-area-inset-bottom)); background: $white; box-shadow: $shadow-top; } }
</style>
