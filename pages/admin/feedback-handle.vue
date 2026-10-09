<!--
  pages/admin/feedback-handle.vue - 工单处理
  用途：管理员派单、处理、回复工单
-->
<template>
  <view class="page-handle">
    <Skeleton v-if="loading && !record._id" type="detail" />
    <view class="status-banner" :class="'status-' + record.status">
      <text>{{ statusText(record.status) }}</text>
    </view>
    
    <view class="card">
      <view class="card-title">{{ t('handle.info', '工单信息') }}</view>
      <view class="info-row">
        <text class="info-label">{{ t('handle.itemType', '事项类型') }}</text>
        <text class="info-value">{{ configStore.getFeedbackType(record.type) }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">{{ t('handle.submitTime', '提交时间') }}</text>
        <text class="info-value">{{ formatDate(record.createTime) }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">{{ t('handle.urgentLevel', '紧急程度') }}</text>
        <view class="info-value">
          <StatusTag :text="urgentText(record.urgentLevel)" :type="urgentColor(record.urgentLevel)" />
        </view>
      </view>
      <view class="info-row">
        <text class="info-label">{{ t('handle.villageGroup', '村组') }}</text>
        <text class="info-value">{{ record.villageGroup || '-' }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">{{ t('handle.content', '内容') }}</text>
        <text class="info-value content">{{ record.content }}</text>
      </view>
      <view v-if="record.images && record.images.length" class="image-grid">
        <image
          v-for="(img, i) in record.images"
          :key="i"
          class="grid-img"
          :src="img"
          mode="aspectFill"
          @click="previewImage(i)"
        />
      </view>
    </view>
    
    <view class="card">
      <view class="card-title">{{ t('handle.actions', '处理操作') }}</view>
      
      <view class="form-group">
        <text class="form-label">{{ t('handle.status', '状态') }}</text>
        <view class="status-options">
          <view 
            v-for="item in statusOptions"
            :key="item.value"
            class="status-opt"
            :class="{ active: form.status === item.value }"
            @click="form.status = item.value"
          >{{ item.label }}</view>
        </view>
      </view>
      
      <view class="form-group">
        <text class="form-label">{{ t('handle.assignee', '承办人') }}</text>
        <input v-model="form.assignee" class="input" :placeholder="t('placeholder.assigneeName', '承办人姓名')" />
      </view>
      
      <view class="form-group">
        <text class="form-label">{{ t('handle.assigneeRole', '承办人职务') }}</text>
        <input v-model="form.assigneeRole" class="input" :placeholder="t('placeholder.assigneeRole', '如：村委委员')" />
      </view>
      
      <view class="form-group">
        <text class="form-label">{{ t('handle.result', '处理结果') }}</text>
        <textarea v-model="form.reply" class="textarea" :placeholder="t('placeholder.handleResult', '请填写处理结果')" maxlength="500" :auto-height="true" />
      </view>
      
      <view class="form-group">
        <text class="form-label">{{ t('handle.images', '处理照片') }}</text>
        <view class="image-grid">
          <view v-for="(img, i) in form.replyImages" :key="img" class="image-item">
            <image :src="img" mode="aspectFill" @click="previewReplyImage(i)" />
            <view class="image-del" @click="removeImage(i)">×</view>
          </view>
          <view v-if="form.replyImages.length < 9" class="image-add" @click="chooseImage">
            <text>+</text>
          </view>
        </view>
      </view>
      
      <view v-if="record.isOverdue" class="form-group">
        <text class="form-label">{{ t('handle.overdueReason', '超时原因') }}</text>
        <input v-model="form.overdueReason" class="input" :placeholder="t('placeholder.overdueReason', '请填写超时原因')" />
      </view>
    </view>
    
    <view class="bottom-bar">
      <BigButton :text="t('button.submit', '提交处理')" type="primary" @click="onSubmit" :disabled="!form.status" />
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { callFunction, uploadImages, acquireLock, releaseLock, cleanupFileIDs } from '@/utils/request.js'
import { formatDate, statusText, urgentText, urgentColor } from '@/utils/format.js'
import { useConfigStore } from '@/store/config.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
import StatusTag from '@/components/StatusTag.vue'
import BigButton from '@/components/BigButton.vue'
import Skeleton from '@/components/Skeleton.vue'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const record = ref({})
const recordId = ref('')
const loading = ref(false)

const form = reactive({
  status: '',
  assignee: '',
  assigneeRole: '',
  reply: '',
  replyImages: [],
  overdueReason: ''
})

// 状态选项全中文
const statusOptions = [
  { value: '已派单', label: '已派单' },
  { value: '处理中', label: '处理中' },
  { value: '已完成', label: '已完成' },
  { value: '已驳回', label: '已驳回' }
]

onLoad((options) => {
  recordId.value = options.recordId
})

onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
  loadData()
})

async function loadData() {
  if (!recordId.value) return
  loading.value = true

  try {
    // 改用 getRecordDetail 单条详情查询，避免拉 100 条工单客户端 find
    const res = await callFunction('getRecordDetail', { recordId: recordId.value })
    if (res.success && res.data) {
      record.value = res.data
      // 预填表单
      form.status = res.data.status
      form.assignee = res.data.assignee || ''
      form.assigneeRole = res.data.assigneeRole || ''
      form.reply = res.data.reply || ''
      form.replyImages = res.data.replyImages || []
    }
  } catch (err) {
    console.error('加载失败:', err)
  } finally {
    loading.value = false
  }
}

function previewImage(i) {
  uni.previewImage({ urls: record.value.images, current: record.value.images[i] })
}

function previewReplyImage(i) {
  uni.previewImage({ urls: form.replyImages, current: form.replyImages[i] })
}

async function chooseImage() {
  // #ifdef MP-WEIXIN
  const res = await new Promise((resolve, reject) => {
    wx.chooseMedia({
      count: 9 - form.replyImages.length,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: resolve,
      fail: reject
    })
  })
  
  for (const file of res.tempFiles) {
    form.replyImages.push(file.tempFilePath)
  }
  // #endif
}

function removeImage(i) {
  form.replyImages.splice(i, 1)
}

async function onSubmit() {
  if (!form.status) {
    uni.showToast({ title: '请选择状态', icon: 'none' })
    return
  }
  
  if (!acquireLock('admin_feedback_handle', 15000)) {
    uni.showToast({ title: '请勿重复提交', icon: 'none' })
    return
  }
  
  uni.showLoading({ title: '提交中...', mask: true })
  let uploadedFileIDs = []
  
  try {
    // 新接口：uploadImages 返回 { fileIDs, failed }
    let allImages = [...form.replyImages]
    const localImages = form.replyImages.filter(img => !img.startsWith('http') && !img.startsWith('cloud'))
    if (localImages.length > 0) {
      const uploadRes = await uploadImages(localImages, 'feedback-reply', (done, total) => {
        uni.showLoading({ title: `上传中 ${done}/${total}`, mask: true })
      })
      uploadedFileIDs = uploadRes.fileIDs
      if (uploadRes.failed > 0) {
        const ok = await new Promise(resolve => {
          uni.showModal({ title: '提示', content: `${uploadRes.failed}张图片上传失败，是否继续？`, success: r => resolve(r.confirm) })
        })
        if (!ok) { await cleanupFileIDs(uploadedFileIDs); return }
      }
      // 合并：保留原本就是 cloud:// 的图片 + 新上传的 fileIDs
      const cloudImages = form.replyImages.filter(img => img.startsWith('cloud://') || img.startsWith('http'))
      allImages = [...cloudImages, ...uploadedFileIDs]
    }
    
    const res = await callFunction('updateFeedbackStatus', {
      recordId: recordId.value,
      status: form.status,
      assignee: form.assignee,
      assigneeRole: form.assigneeRole,
      reply: form.reply,
      replyImages: allImages,
      overdueReason: form.overdueReason
    })
    
    if (res.success) {
      uni.showToast({ title: '处理成功', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1500)
    } else {
      // 业务失败：清理新上传的文件
      await cleanupFileIDs(uploadedFileIDs)
    }
  } catch (err) {
    console.error('提交失败:', err)
    await cleanupFileIDs(uploadedFileIDs)
  } finally {
    releaseLock('admin_feedback_handle')
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-handle {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  padding-bottom: 200rpx;
  
  .status-banner {
    padding: $card-padding;
    border-radius: $card-radius;
    text-align: center;
    margin-bottom: $card-gap;
    
    &.status-pending { background: rgba(230,81,0,0.1); }
    &.status-processing, &.status-assigned { background: $primary-light; }
    &.status-completed, &.status-evaluated { background: rgba(46,125,50,0.1); }
    &.status-rejected { background: rgba(198,40,40,0.1); }
    
    text { font-size: $font-card-title; font-weight: bold; color: $text-main; }
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
      .info-value { 
        flex: 1; 
        font-size: $font-body; 
        color: $text-main;
        
        &.content {
          line-height: 1.6;
          white-space: pre-wrap;
        }
      }
    }
    
    .image-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12rpx;
      margin-top: 16rpx;
      
      .grid-img {
        width: 100%;
        aspect-ratio: 1;
        border-radius: $radius-md;
        background: $bg;
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
      
      .status-options {
        display: flex;
        gap: 12rpx;
        flex-wrap: wrap;
        
        .status-opt {
          padding: $space-sm $space-lg;
          background: $bg;
          border: 4rpx solid $border;
          border-radius: $radius-sm;
          font-size: $font-sub;
          color: $text-main;
          
          &.active {
            border-color: $primary;
            background: $primary-light;
            color: $primary;
            font-weight: bold;
          }
        }
      }
      
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
