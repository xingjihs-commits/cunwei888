<!--
  pages/feedback/feedback.vue - 村民反映提交
  用途：选择事项类型，填写描述，上传图片，提交工单
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-feedback">
    <view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-back" @click="goBack">← 返回</view>
      <text class="nav-title">{{ t('pageTitle.feedback', '村民反映') }}</text>
      <view class="nav-right"></view>
    </view>
    
    <scroll-view scroll-y class="content">
      <!-- 事项类型 -->
      <view class="section">
        <view class="section-title">选择事项类型</view>
        <view class="type-grid">
          <view
            v-for="item in configStore.feedbackTypes"
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
      
      <!-- 详细描述 -->
      <view class="section">
        <view class="section-title">详细描述</view>
        <view class="textarea-wrap">
          <textarea
            v-model="form.content"
            class="textarea"
             :placeholder="t('placeholder.feedbackDesc', '请详细描述您反映的问题（至少5个字）')"
            maxlength="500"
            :auto-height="true"
          />
          <view class="char-count">{{ form.content.length }}/500</view>
        </view>
        <VoiceInput @result="onVoiceResult" />
      </view>
      
      <!-- 上传图片 -->
      <view class="section">
        <view class="section-title">上传图片（最多9张）</view>
        <view class="image-grid">
          <view v-for="(img, i) in form.images" :key="img" class="image-item">
            <image :src="img" mode="aspectFill" @click="previewImage(i)" />
            <view class="image-del" @click="removeImage(i)">×</view>
          </view>
          <view v-if="form.images.length < 9" class="image-add" @click="chooseImage">
            <text class="add-icon">+</text>
            <text class="add-text">添加图片</text>
          </view>
        </view>
      </view>
      
      <!-- 紧急程度 -->
      <view class="section">
        <view class="section-title">紧急程度</view>
        <view class="urgent-row">
          <view
            v-for="item in urgentOptions"
            :key="item.value"
            class="urgent-item"
            :class="{ active: form.urgentLevel === item.value, ['urgent-' + item.value]: true }"
            @click="form.urgentLevel = item.value"
          >
            <text>{{ item.label }}</text>
          </view>
        </view>
      </view>
      
      <!-- 村组 -->
      <view class="section">
        <view class="section-title">所在村组</view>
        <input v-model="form.villageGroup" class="input"  :placeholder="t('placeholder.villageGroup', '如：三组')" />
      </view>
      
      <!-- 免责声明 -->
      <Disclaimer content="线上反映仅作公示、征集、流转之用，紧急情况请直接拨打110/120等紧急电话。" />
      
      <view style="height: 140rpx;"></view>
    </scroll-view>
    
    <!-- 底部提交按钮 -->
    <view class="bottom-bar">
      <BigButton  :text="t('button.submitFeedback', '提交反映')" type="primary" @click="onSubmit" :disabled="!canSubmit" />
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from 'vue'
import { useConfigStore } from '@/store/config.js'
import { callFunction, uploadImages, acquireLock, releaseLock, cleanupFileIDs } from '@/utils/request.js'
import VoiceInput from '@/components/VoiceInput.vue'
import BigButton from '@/components/BigButton.vue'
import Disclaimer from '@/components/Disclaimer.vue'
import { ensureAuth, AUTH_VERIFIED } from '@/utils/auth.js'
import { requestSubscribe } from '@/utils/subscribe.js'
import { useRootFontSize } from '@/composables/useA11y.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const rootFontSize = useRootFontSize()
const statusBarHeight = ref(20)

const DRAFT_KEY = 'draft_feedback'

const form = reactive({
  type: '',
  content: '',
  images: [],
  urgentLevel: '普通',
  villageGroup: ''
})

const urgentOptions = [
  { value: '普通', label: '普通' },
  { value: '紧急', label: '紧急' },
  { value: '特急', label: '特急' }
]

const canSubmit = computed(() => {
  return form.type && form.content.trim().length >= 5
})

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.feedback', '村民反映') })
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
    } catch (e) {}
  }
})

// 自动保存草稿
watch(form, () => {
  try {
    uni.setStorageSync(DRAFT_KEY, { type: form.type, content: form.content, urgentLevel: form.urgentLevel, villageGroup: form.villageGroup })
  } catch (e) {}
}, { deep: true })

onUnmounted(() => {
  // 提交成功会清草稿，否则保留
})

function clearDraft() {
  uni.removeStorageSync(DRAFT_KEY)
}

function goBack() {
  uni.navigateBack()
}

function onVoiceResult(text) {
  form.content += text
}

async function chooseImage() {
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

function removeImage(i) {
  form.images.splice(i, 1)
}

function previewImage(i) {
  uni.previewImage({
    urls: form.images,
    current: form.images[i]
  })
}

async function onSubmit() {
  requestSubscribe([configStore.subscribeTemplates && configStore.subscribeTemplates.status_update])
  if (!canSubmit.value) return
  
  // 防重复提交
  if (!acquireLock('submitFeedback', 10000)) {
    uni.showToast({ title: '请勿重复提交', icon: 'none' })
    return
  }
  
  uni.showLoading({ title: '提交中...', mask: true })
  
  let uploadedFileIDs = []  // 用于失败时清理孤儿文件
  
  try {
    // 上传图片（新格式返回 { fileIDs, failed }）
    let images = []
    if (form.images.length > 0) {
      const uploadRes = await uploadImages(form.images, 'feedback', (done, total) => {
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
      images = uploadRes.fileIDs
    }
    
    const res = await callFunction('submitFeedback', {
      content: form.content,
      images: images,
      type: form.type,
      urgentLevel: form.urgentLevel,
      villageGroup: form.villageGroup
    })
    
    if (res.success) {
      clearDraft()
      uni.showToast({ title: '提交成功', icon: 'success' })
      setTimeout(() => {
        uni.redirectTo({ url: '/pages/feedback/my-feedback' })
      }, 1500)
    } else {
      // 业务失败：清理已上传文件
      await cleanupFileIDs(uploadedFileIDs)
    }
  } catch (err) {
    console.error('提交失败:', err)
    // 失败时清理孤儿文件
    await cleanupFileIDs(uploadedFileIDs)
  } finally {
    releaseLock('submitFeedback')
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-feedback {
  min-height: 100vh;
  background: $bg;
  
  .nav-bar {
    background: linear-gradient(135deg, $primary, $primary-dark);
    color: $white;
    display: flex;
    align-items: center;
    padding: $space-md $page-padding;
    
    .nav-back, .nav-right {
      width: 100rpx;
      font-size: $font-body;
    }
    .nav-title {
      flex: 1;
      text-align: center;
      font-size: $font-title;
      font-weight: bold;
    }
  }
  
  .content { padding-bottom: 120rpx; }
  
  .section {
    padding: $page-padding;
    
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
  
  .textarea-wrap {
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
    
    .textarea {
      width: 100%;
      min-height: 240rpx;
      font-size: $font-body;
      line-height: 1.6;
    }
    
    .char-count {
      text-align: right;
      font-size: $font-sub;
      color: $text-weak;
    }
  }
  
  .image-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16rpx;
    
    .image-item {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      
      image {
        width: 100%;
        height: 100%;
        border-radius: $radius-md;
      }
      
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
      flex-direction: column;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1;
      background: $white;
      border: 4rpx dashed $border;
      border-radius: $radius-md;
      
      .add-icon { font-size: 60rpx; color: $text-weak; }
      .add-text { font-size: $font-micro; color: $text-weak; }
    }
  }
  
  .urgent-row {
    display: flex;
    gap: 16rpx;
    
    .urgent-item {
      flex: 1;
      height: $btn-height;
      line-height: $btn-height;
      text-align: center;
      background: $white;
      border: 4rpx solid $border;
      border-radius: $radius-md;
      font-size: $font-body;
      color: $text-main;
      
      &.active.urgent-normal { border-color: $success; background: rgba(46,125,50,0.1); color: $success; }
      &.active.urgent-urgent { border-color: $warning; background: rgba(230,81,0,0.1); color: $warning; }
      &.active.urgent-critical { border-color: $danger; background: rgba(198,40,40,0.1); color: $danger; }
    }
  }
  
  .input {
    width: 100%;
    height: $btn-height;
    background: $white;
    border-radius: $radius-md;
    padding: 0 $space-lg;
    font-size: $font-body;
    box-sizing: border-box;
    box-shadow: $card-shadow;
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
