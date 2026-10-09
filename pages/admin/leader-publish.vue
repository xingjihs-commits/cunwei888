<!--
  pages/admin/leader-publish.vue - 书记风采/领导关怀发布
  视频规范：720p / 1Mbps / 单条 ≤15MB / faststart / 存云开发存储 / 不自动播放 / 图文兜底
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-leader-publish">
    <view class="card">
      <view class="form-group">
        <text class="form-label">{{ t('leaderPublish.typeLabel', '类型') }}</text>
        <view class="type-row">
          <view class="type-item" :class="{ active: form.type === 'secretary' }" @click="form.type = 'secretary'">{{ t('leaderPublish.secretary', '书记风采') }}</view>
          <view class="type-item" :class="{ active: form.type === 'leader' }" @click="form.type = 'leader'">{{ t('leaderPublish.leader', '上级走访') }}</view>
        </view>
      </view>

      <view class="form-group">
        <text class="form-label">{{ t('leaderPublish.titleLabel', '标题') }}</text>
        <input v-model="form.title" class="input" :placeholder="t('placeholder.leaderTitle', '不超过50字')" maxlength="50" />
      </view>

      <view class="form-group">
        <text class="form-label">{{ t('leaderPublish.contentLabel', '正文') }}</text>
        <textarea v-model="form.content" class="textarea" :placeholder="t('placeholder.leaderContent', '正文内容')" maxlength="5000" />
      </view>

      <view class="form-group">
        <text class="form-label">{{ t('leaderPublish.coverLabel', '封面图') }}</text>
        <image v-if="form.coverImage" class="preview" :src="form.coverImage" mode="aspectFill" @click="chooseCover" />
        <view v-else class="upload-btn" @click="chooseCover">+ {{ t('leaderPublish.chooseCover', '选择封面') }}</view>
      </view>

      <view class="form-group">
        <text class="form-label">{{ t('leaderPublish.videoLabel', '视频（可选，≤15MB，720p/1Mbps/faststart）') }}</text>
        <video v-if="form.videoFileID" class="preview video" :src="form.videoFileID" :controls="true" :autoplay="false" />
        <view class="upload-btn" @click="chooseVideo">{{ form.videoFileID ? t('leaderPublish.reselectVideo', '重新选择视频') : '+ ' + t('leaderPublish.chooseVideo', '选择视频') }}</view>
      </view>
    </view>

    <view class="bottom-bar">
      <BigButton :text="t('button.publish', '发布')" type="primary" :loading="submitting" @click="onPublish" />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { reactive, ref, onMounted } from 'vue'
import { callFunction } from '@/utils/request.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
import BigButton from '@/components/BigButton.vue'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const submitting = ref(false)
const form = reactive({ type: 'secretary', title: '', content: '', coverImage: '', videoFileID: '' })

onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  await ensureAdmin()
})

async function chooseCover() {
  try {
    const res = await uni.chooseImage({ count: 1 })
    const filePath = res.tempFilePaths[0]
    uni.showLoading({ title: '上传中...' })
    const up = await wx.cloud.uploadFile({ cloudPath: 'leader/cover_' + Date.now() + '.jpg', filePath })
    form.coverImage = up.fileID
  } catch (e) {
    console.error(e)
  } finally {
    uni.hideLoading()
  }
}

async function chooseVideo() {
  try {
    const res = await uni.chooseVideo({ maxDuration: 60, sourceType: ['album', 'camera'] })
    if (res.size && res.size > 15 * 1024 * 1024) {
      uni.showToast({ title: '视频不能超过15MB', icon: 'none' })
      return
    }
    uni.showLoading({ title: '上传中...' })
    const up = await wx.cloud.uploadFile({ cloudPath: 'leader/video_' + Date.now() + '.mp4', filePath: res.tempFilePath })
    form.videoFileID = up.fileID
  } catch (e) {
    console.error(e)
  } finally {
    uni.hideLoading()
  }
}

async function onPublish() {
  if (!form.title || !form.content) {
    uni.showToast({ title: '请填写标题和正文', icon: 'none' })
    return
  }
  submitting.value = true
  try {
    const res = await callFunction('publishLeaderContent', { ...form })
    if (res.success) {
      uni.showToast({ title: '发布成功', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1200)
    } else {
      uni.showToast({ title: res.message || '发布失败', icon: 'none' })
    }
  } catch (e) {
    console.error(e)
    uni.showToast({ title: '发布失败', icon: 'none' })
  } finally {
    submitting.value = false
  }
}
</script>

<style lang="scss" scoped>

.page-leader-publish {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  padding-bottom: 200rpx;
  box-sizing: border-box;

  .card {
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
  }

  .form-group {
    margin-bottom: 32rpx;

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

    .textarea {
      width: 100%;
      min-height: 300rpx;
      background: $bg;
      border-radius: $radius-md;
      padding: $space-lg;
      font-size: $font-body;
      box-sizing: border-box;
    }

    .preview {
      width: 240rpx;
      height: 240rpx;
      border-radius: $radius-md;
      background: $bg;

      &.video { width: 100%; height: 360rpx; }
    }

    .upload-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: $btn-height;
      background: $primary-light;
      color: $primary;
      border-radius: $radius-sm;
      font-size: $font-sub;
      border: 4rpx dashed $primary;
    }
  }

  .type-row {
    display: flex;
    gap: 16rpx;

    .type-item {
      flex: 1;
      text-align: center;
      padding: $space-md 0;
      background: $bg;
      border-radius: $radius-md;
      font-size: $font-body;
      color: $text-sub;

      &.active { background: $primary; color: $white; font-weight: bold; }
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
