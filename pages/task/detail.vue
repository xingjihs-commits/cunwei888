<!--
  pages/task/detail.vue - 任务详情
  用途：查看任务详情、办理进度，责任人可更新进度
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-task-detail">
    <Skeleton v-if="loading && !task._id" type="detail" />
    <view class="status-banner" :class="'status-' + task.status">
      <text>{{ statusText(task.status) }}</text>
      <text v-if="task.isOverdue" class="overdue-tip">{{ t('status.overdue', '已超时') }}</text>
    </view>
    
    <view class="card">
      <view class="card-title">{{ task.title }}</view>
      <view class="info-row">
        <text class="info-label">紧急程度</text>
        <view class="info-value">
          <StatusTag :text="urgentText(task.urgentLevel)" :type="urgentColor(task.urgentLevel)" />
        </view>
      </view>
      <view v-if="task.deadline" class="info-row">
        <text class="info-label">截止时间</text>
        <text class="info-value">{{ formatDate(task.deadline) }}</text>
      </view>
      <view v-if="task.policySource" class="info-row">
        <text class="info-label">政策来源</text>
        <text class="info-value">{{ task.policySource }}</text>
      </view>
    </view>
    
    <view class="card">
      <view class="card-title">任务内容</view>
      <text class="content-text">{{ task.content }}</text>
    </view>
    
    <view v-if="task.assignee" class="card">
      <view class="card-title">责任人</view>
      <ResponsibleInfo :name="task.assignee" :role="task.assigneeRole" />
    </view>
    
    <view class="card">
      <view class="card-title">办理进度</view>
      <view class="progress-wrap">
        <view class="progress-bar">
          <view class="progress-inner" :style="{ width: (task.progress || 0) + '%' }"></view>
        </view>
        <text class="progress-text">{{ task.progress || 0 }}%</text>
      </view>
      
      <view v-if="progressList.length === 0" class="no-progress">暂无办理记录</view>
      
      <view v-for="(item, i) in progressList" :key="i" class="progress-item">
        <view class="progress-dot" :class="{ active: i === 0 }"></view>
        <view class="progress-content">
          <view class="progress-row">
            <text class="progress-percent">{{ item.progress }}%</text>
            <text class="progress-time">{{ formatDate(item.createTime) }}</text>
          </view>
          <text class="progress-desc">{{ item.content }}</text>
          <view v-if="item.images && item.images.length" class="image-grid">
            <image
              v-for="(img, idx) in item.images"
              :key="idx"
              class="grid-img"
              :src="img"
              mode="aspectFill"
              @click="previewImage(item.images, idx)"
            />
          </view>
        </view>
      </view>
    </view>
    
    <view v-if="canUpdate" class="card">
      <view class="card-title">更新进度</view>
      <view class="form-group">
        <text class="form-label">进度百分比</text>
        <slider :value="newProgress" :min="0" :max="100" :step="10" @change="onProgressChange" show-value activeColor="#C41E24" />
      </view>
      <view class="form-group">
        <text class="form-label">办理情况</text>
        <textarea v-model="newContent" class="textarea"  :placeholder="t('placeholder.taskProgress', '请描述办理情况')" maxlength="500" :auto-height="true" />
        <VoiceInput @result="onVoiceResult" />
      </view>
      <view class="form-group">
        <text class="form-label">上传图片</text>
        <view class="image-grid">
          <view v-for="(img, i) in newImages" :key="img" class="image-item">
            <image :src="img" mode="aspectFill" @click="previewImage(newImages, i)" />
            <view class="image-del" @click="removeImage(i)">×</view>
          </view>
          <view v-if="newImages.length < 9" class="image-add" @click="chooseImage">
            <text>+</text>
          </view>
        </view>
      </view>
      <BigButton :text="t('button.submit', '提交进度')" type="primary" @click="submitProgress" :disabled="!newContent" />
    </view>
    <view v-if="loadError" class="error-state">
      <text class="error-icon">⚠️</text>
      <text class="error-text">加载失败</text>
      <view class="retry-btn" @click="loadData">重新加载</view>
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { callFunction, uploadImages, acquireLock, releaseLock, cleanupFileIDs } from '@/utils/request.js'
import { requestSubscribe } from '@/utils/subscribe.js'
import { formatDate, statusText, urgentText, urgentColor } from '@/utils/format.js'
import { useUserStore } from '@/store/user.js'
import StatusTag from '@/components/StatusTag.vue'
import ResponsibleInfo from '@/components/ResponsibleInfo.vue'
import BigButton from '@/components/BigButton.vue'
import VoiceInput from '@/components/VoiceInput.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const userStore = useUserStore()
const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const task = ref({})
const progressList = ref([])
const taskId = ref('')
const loadError = ref(false)
const loading = ref(false)

const newProgress = ref(0)
const newContent = ref('')
const newImages = ref([])

// 中文 status 兼容：已完成/进行中/已派单/待办/已取消
const isCompleted = (s) => s === '已完成' || s === 'completed'

const canUpdate = computed(() => {
  return (task.value.assigneeOpenid === userStore.openid || userStore.isAdmin)
    && !isCompleted(task.value.status)
})

onLoad((options) => {
  taskId.value = options.taskId
})

onMounted(() => loadData())

async function loadData() {
  if (!taskId.value) return
  loadError.value = false
  loading.value = true
  
  try {
    const res = await callFunction('getTaskDetail', { taskId: taskId.value })
    if (res.success) {
      task.value = res.data
      progressList.value = res.data.progressList || []
      newProgress.value = task.value.progress || 0
    } else {
      loadError.value = true
    }
  } catch (err) {
    console.error('[task/detail 加载失败]:', err)
    loadError.value = true
  } finally {
    loading.value = false
  }
}

function onProgressChange(e) {
  newProgress.value = e.detail.value
}

function onVoiceResult(text) { newContent.value += text }

async function chooseImage() {
  // #ifdef MP-WEIXIN
  const res = await new Promise((resolve, reject) => {
    wx.chooseMedia({
      count: 9 - newImages.value.length,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: resolve,
      fail: reject
    })
  })
  
  for (const file of res.tempFiles) {
    newImages.value.push(file.tempFilePath)
  }
  // #endif
}

function removeImage(i) {
  newImages.value.splice(i, 1)
}

function previewImage(urls, i) {
  uni.previewImage({ urls, current: urls[i] })
}

async function submitProgress() {
  requestSubscribe([configStore.subscribeTemplates && configStore.subscribeTemplates.status_update])
  if (!newContent.value) {
    uni.showToast({ title: '请填写办理情况', icon: 'none' })
    return
  }
  
  if (!acquireLock('submit_task_progress', 10000)) {
    uni.showToast({ title: '请勿重复提交', icon: 'none' })
    return
  }
  
  uni.showLoading({ title: '提交中...', mask: true })
  let uploadedFileIDs = []
  
  try {
    let images = []
    if (newImages.value.length > 0) {
      const uploadRes = await uploadImages(newImages.value, 'task-progress', (done, total) => {
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
    
    const status = newProgress.value >= 100 ? '已完成' : '进行中'
    
    const res = await callFunction('updateTaskProgress', {
      taskId: taskId.value,
      progress: newProgress.value,
      content: newContent.value,
      images: images,
      status: status
    })
    
    if (res.success) {
      uni.showToast({ title: '提交成功', icon: 'success' })
      newContent.value = ''
      newImages.value = []
      loadData()  // 立即刷新
    } else {
      await cleanupFileIDs(uploadedFileIDs)
    }
  } catch (err) {
    console.error('[提交失败]:', err)
    await cleanupFileIDs(uploadedFileIDs)
  } finally {
    releaseLock('submit_task_progress')
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-task-detail {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  
  .status-banner {
    padding: $card-padding;
    border-radius: $card-radius;
    text-align: center;
    margin-bottom: $card-gap;
    
    &.status-assigned, &.status-processing { background: $primary-light; }
    &.status-completed { background: rgba(46,125,50,0.1); }
    
    text { font-size: $font-card-title; font-weight: bold; color: $text-main; }
    .overdue-tip { margin-left: 12rpx; color: $danger; }
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
    
    .info-row {
      display: flex;
      padding: $space-sm 0;
      
      .info-label { width: 200rpx; font-size: $font-body; color: $text-sub; }
      .info-value { flex: 1; font-size: $font-body; color: $text-main; }
    }
    
    .content-text {
      font-size: $font-body;
      color: $text-main;
      line-height: 1.8;
      white-space: pre-wrap;
    }
    
    .progress-wrap {
      display: flex;
      align-items: center;
      margin-bottom: 24rpx;
      
      .progress-bar {
        flex: 1;
        height: 24rpx;
        background: $border;
        border-radius: $radius-md;
        overflow: hidden;
        margin-right: 16rpx;
        
        .progress-inner {
          height: 100%;
          background: linear-gradient(90deg, $primary, $gold);
          border-radius: $radius-md;
          transition: width 0.3s;
        }
      }
      
      .progress-text {
        font-size: $font-body;
        color: $primary;
        font-weight: bold;
      }
    }
    
    .no-progress {
      text-align: center;
      padding: 40rpx;
      font-size: $font-sub;
      color: $text-weak;
    }
    
    .progress-item {
      display: flex;
      padding: $space-md 0;
      
      .progress-dot {
        width: 24rpx;
        height: 24rpx;
        border-radius: $radius-full;
        background: $border;
        margin-right: 16rpx;
        margin-top: 8rpx;
        flex-shrink: 0;
        
        &.active { background: $primary; }
      }
      
      .progress-content {
        flex: 1;
        
        .progress-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8rpx;
          
          .progress-percent { font-size: $font-body; color: $primary; font-weight: bold; }
          .progress-time { font-size: $font-sub; color: $text-weak; }
        }
        
        .progress-desc {
          font-size: $font-body;
          color: $text-main;
          line-height: 1.5;
          display: block;
          margin-bottom: 12rpx;
        }
        
        .image-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8rpx;
          
          .grid-img {
            width: 100%;
            aspect-ratio: 1;
            border-radius: $radius-sm;
            background: $bg;
          }
        }
      }
    }
    
    .form-group {
      margin-bottom: 24rpx;
      
      .form-label {
        font-size: $font-body;
        color: $text-main;
        display: block;
        margin-bottom: 12rpx;
      }
      
      .textarea {
        width: 100%;
        min-height: 200rpx;
        background: $bg;
        border-radius: $radius-md;
        padding: $card-padding;
        font-size: $font-body;
        box-sizing: border-box;
      }
      
      .image-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12rpx;
        
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
          background: $bg;
          border: 4rpx dashed $border;
          border-radius: $radius-md;
          font-size: 60rpx;
          color: $text-weak;
        }
      }
    }
  }
}
</style>
