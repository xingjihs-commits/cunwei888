<!--
  pages/snapshot/snapshot.vue - 随手拍提交
  用途：拍照/相册选择，选择问题类型，自动定位，提交随手拍
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-snapshot">
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-back" @click="goBack">← 返回</view>
      <text class="nav-title">{{ t('pageTitle.snapshot', '随手拍') }}</text>
      <view class="nav-right"></view>
    </view>
    
    <scroll-view scroll-y class="content">
      <!-- 拍照区域 -->
      <view class="camera-section">
        <view v-if="form.images.length === 0" class="camera-btn" @click="takePhoto">
          <text class="camera-icon">📷</text>
          <text class="camera-text">拍照/相册</text>
          <text class="camera-tip">最多上传9张</text>
        </view>
        
        <view v-else class="image-grid">
          <view v-for="(img, i) in form.images" :key="img" class="image-item">
            <image :src="img" mode="aspectFill" @click="previewImage(i)" />
            <view class="image-del" @click="removeImage(i)">×</view>
          </view>
          <view v-if="form.images.length < 9" class="image-add" @click="takePhoto">
            <text class="add-icon">+</text>
          </view>
        </view>
      </view>
      
      <!-- 问题类型 -->
      <view class="section">
        <view class="section-title">问题类型</view>
        <view class="type-grid">
          <view
            v-for="item in configStore.snapshotTypes"
            :key="item.key"
            class="type-item"
            :class="{ active: form.type === item.key }"
            @click="form.type = item.key"
          >
            <view class="type-icon">{{ item.icon }}</view>
            <text class="type-name">{{ item.name }}</text>
          </view>
        </view>
      </view>
      
      <!-- 位置 -->
      <view class="section">
        <view class="section-title">位置信息</view>
        <view class="location-card">
          <text class="loc-icon">📍</text>
          <view class="loc-info">
            <text v-if="form.location" class="loc-text">{{ form.location.name || form.location.address || t('tip.currentLocation', '当前位置') }}</text>
            <text v-else class="loc-tip">正在定位...</text>
          </view>
          <view class="loc-btn" @click="getLocation">重新定位</view>
        </view>
      </view>
      
      <!-- 补充说明 -->
      <view class="section">
        <view class="section-title">补充说明（选填）</view>
        <view class="textarea-wrap">
          <textarea
            v-model="form.content"
            class="textarea"
             :placeholder="t('placeholder.snapshotDesc', '可填写问题描述（选填）')"
            maxlength="200"
            :auto-height="true"
          />
        </view>
        <VoiceInput @result="onVoiceResult" />
      </view>
      
      <Disclaimer content="随手拍将公示在公示墙，请勿上传人脸照片或隐私信息。" />
      
      <view style="height: 140rpx;"></view>
    </scroll-view>
    
    <view class="bottom-bar">
      <BigButton  :text="t('button.submitSnapshot', '提交随手拍')" type="primary" @click="onSubmit" :disabled="!canSubmit" />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useConfigStore } from '@/store/config.js'
import { callFunction, uploadImages, acquireLock, releaseLock, cleanupFileIDs } from '@/utils/request.js'
import { requestSubscribe } from '@/utils/subscribe.js'
import VoiceInput from '@/components/VoiceInput.vue'
import BigButton from '@/components/BigButton.vue'
import Disclaimer from '@/components/Disclaimer.vue'
import { ensureAuth, AUTH_VERIFIED } from '@/utils/auth.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const statusBarHeight = ref(20)

const DRAFT_KEY = 'draft_snapshot'

const form = reactive({
  type: '',
  content: '',
  images: [],
  location: null,
  locationFailed: false
})

const canSubmit = computed(() => {
  return form.type && form.images.length > 0
})

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.snapshot', '随手拍') })
  if (!ensureAuth(AUTH_VERIFIED)) return
  // #ifdef MP-WEIXIN
  const sysInfo = wx.getWindowInfo()
  statusBarHeight.value = sysInfo.statusBarHeight || 20
  // #endif
  // 还原草稿
  const draft = uni.getStorageSync(DRAFT_KEY)
  if (draft) {
    try {
      Object.assign(form, draft)
      // 草稿只还原文本/类型，不还原图片
      form.images = []
    } catch (e) {}
  }
  // 定位推迟到提交时，避免一进页面就弹授权窗打断老人
})

watch(() => [form.type, form.content], () => {
  try {
    uni.setStorageSync(DRAFT_KEY, { type: form.type, content: form.content })
  } catch (e) {}
}, { deep: true })

onUnmounted(() => {})

function clearDraft() {
  uni.removeStorageSync(DRAFT_KEY)
}

function goBack() { uni.navigateBack() }

function onVoiceResult(text) { form.content += text }

async function takePhoto() {
  // #ifdef MP-WEIXIN
  const res = await new Promise((resolve, reject) => {
    wx.chooseMedia({
      count: 9 - form.images.length,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: resolve,
      fail: reject
    })
  })
  
  for (const file of res.tempFiles) {
    form.images.push(file.tempFilePath)
  }
  // #endif
}

function removeImage(i) { form.images.splice(i, 1) }

function previewImage(i) {
  uni.previewImage({ urls: form.images, current: form.images[i] })
}

function getLocation() {
  // #ifdef MP-WEIXIN
  uni.getLocation({
    type: 'gcj02',
    success(res) {
      form.location = {
        latitude: res.latitude,
        longitude: res.longitude,
        name: '当前位置'
      }
      form.locationFailed = false
    },
    fail() {
      form.locationFailed = true
      // 定位失败不阻断提交，让用户可以手动输入位置
      uni.showToast({ title: '定位失败，可手动输入位置', icon: 'none' })
    }
  })
  // #endif
}

async function onSubmit() {
  requestSubscribe([configStore.subscribeTemplates && configStore.subscribeTemplates.status_update])
  if (!canSubmit.value) return
  
  // 防重复提交
  if (!acquireLock('submitSnapshot', 10000)) {
    uni.showToast({ title: '请勿重复提交', icon: 'none' })
    return
  }
  
  // 提交前确保位置已获取（如果未获取过，则此时获取）
  if (!form.location && !form.locationFailed) {
    await new Promise(resolve => {
      // #ifdef MP-WEIXIN
      uni.getLocation({
        type: 'gcj02',
        success(res) {
          form.location = {
            latitude: res.latitude,
            longitude: res.longitude,
            name: '当前位置'
          }
          resolve()
        },
        fail() {
          form.locationFailed = true
          resolve()
        }
      })
      // #endif
      // #ifndef MP-WEIXIN
      resolve()
      // #endif
    })
  }
  
  uni.showLoading({ title: '提交中...', mask: true })
  
  let uploadedFileIDs = []
  
  try {
    const uploadRes = await uploadImages(form.images, 'snapshot', (done, total) => {
      uni.showLoading({ title: `上传中 ${done}/${total}`, mask: true })
    })
    uploadedFileIDs = uploadRes.fileIDs
    if (uploadRes.failed > 0) {
      const ok = await new Promise(resolve => {
        uni.showModal({
          title: '提示',
          content: `${uploadRes.failed}张图片上传失败，是否继续提交？`,
          success: r => resolve(r.confirm)
        })
      })
      if (!ok) {
        await cleanupFileIDs(uploadedFileIDs)
        return
      }
    }
    
    const res = await callFunction('submitSnapshot', {
      content: form.content,
      images: uploadedFileIDs,
      type: form.type,
      location: form.location
    })
    
    if (res.success) {
      clearDraft()
      uni.showToast({ title: '提交成功', icon: 'success' })
      setTimeout(() => {
        uni.redirectTo({ url: '/pages/snapshot/wall' })
      }, 1500)
    } else {
      await cleanupFileIDs(uploadedFileIDs)
    }
  } catch (err) {
    console.error('提交失败:', err)
    await cleanupFileIDs(uploadedFileIDs)
  } finally {
    releaseLock('submitSnapshot')
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>

.page-snapshot {
  min-height: 100vh;
  background: $bg;
  
  .nav-bar {
    background: linear-gradient(135deg, $primary, $primary-dark);
    color: $white;
    display: flex;
    align-items: center;
    padding: $space-md $page-padding;
    
    .nav-back, .nav-right { width: 100rpx; font-size: $font-body; }
    .nav-title { flex: 1; text-align: center; font-size: $font-title; font-weight: bold; }
  }
  
  .content { padding-bottom: 120rpx; }
  
  .camera-section {
    padding: $page-padding;
    
    .camera-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 400rpx;
      background: $white;
      border: 4rpx dashed $primary;
      border-radius: $card-radius;
      
      .camera-icon { font-size: 100rpx; margin-bottom: 16rpx; }
      .camera-text { font-size: $font-body; color: $primary; font-weight: bold; }
      .camera-tip { font-size: $font-sub; color: $text-weak; margin-top: 8rpx; }
    }
    
    .image-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16rpx;
      
      .image-item {
        position: relative;
        width: 100%;
        aspect-ratio: 1;
        
        image { width: 100%; height: 100%; border-radius: $radius-md; }
        
        .image-del {
          position: absolute;
          top: -8rpx;
          right: -8rpx;
          width: 40rpx;
          height: 40rpx;
          background: $danger;
          color: $white;
          border-radius: $radius-full;
          text-align: center;
          line-height: 40rpx;
          font-size: $font-sub;
        }
      }
      
      .image-add {
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1;
        background: $white;
        border: 4rpx dashed $border;
        border-radius: $radius-md;
        
        .add-icon { font-size: 60rpx; color: $text-weak; }
      }
    }
  }
  
  .section {
    padding: 0 $page-padding $page-padding;
    
    .section-title {
      font-size: $font-card-title;
      font-weight: bold;
      color: $text-main;
      margin-bottom: $card-gap;
    }
  }
  
  .type-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24rpx;
    
    .type-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: $page-padding 16rpx;
      background: $white;
      border: 4rpx solid transparent;
      border-radius: $card-radius;
      box-shadow: $card-shadow;
      
      .type-icon { font-size: 56rpx; margin-bottom: 12rpx; }
      .type-name { font-size: $font-sub; color: $text-main; }
      
      &.active {
        border-color: $primary;
        background: $primary-light;
        
        .type-name { color: $primary; font-weight: bold; }
      }
    }
  }
  
  .location-card {
    display: flex;
    align-items: center;
    background: $white;
    padding: $card-padding;
    border-radius: $card-radius;
    box-shadow: $card-shadow;
    
    .loc-icon { font-size: $font-title; margin-right: 16rpx; }
    
    .loc-info {
      flex: 1;
      
      .loc-text { font-size: $font-body; color: $text-main; }
      .loc-tip { font-size: $font-sub; color: $text-weak; }
    }
    
    .loc-btn {
      padding: $space-sm $space-lg;
      background: $primary-light;
      color: $primary;
      border-radius: $radius-sm;
      font-size: $font-sub;
    }
  }
  
  .textarea-wrap {
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    
    .textarea {
      width: 100%;
      min-height: 160rpx;
      font-size: $font-body;
      line-height: 1.6;
    }
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
