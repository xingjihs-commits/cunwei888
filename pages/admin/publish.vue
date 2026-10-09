<!--
  pages/admin/publish.vue - 内容发布
  用途：管理员发布新闻、公示、项目、价格、任务
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-publish">
    <view class="type-tabs">
      <view 
        v-for="item in publishTypes"
        :key="item.value"
        class="type-tab"
        :class="{ active: currentType === item.value }"
        @click="switchType(item.value)"
      >{{ item.label }}</view>
    </view>
    
    <view class="card">
      <view class="form-group">
        <text class="form-label">标题</text>
        <input v-model="form.title" class="input"  :placeholder="t('placeholder.title', '请输入标题')" />
      </view>
      
      <view class="form-group">
        <text class="form-label">分类</text>
        <picker v-if="currentType === 'notice'" mode="selector" :range="noticeCategories" :value="noticeCatIndex" @change="noticeCatIndex = $event.detail.value">
          <view class="picker-value">{{ noticeCategories[noticeCatIndex] }} ▼</view>
        </picker>
        <picker v-else-if="currentType === 'news'" mode="selector" :range="newsCategories" :value="newsCatIndex" @change="newsCatIndex = $event.detail.value">
          <view class="picker-value">{{ newsCategories[newsCatIndex] }} ▼</view>
        </picker>
      </view>
      
      <view class="form-group">
        <text class="form-label">内容</text>
        <textarea v-model="form.content" class="textarea"  :placeholder="t('placeholder.content', '请输入内容')" maxlength="2000" :auto-height="true" />
        <VoiceInput @result="onVoiceResult" />
        <view class="format-btn" @click="onFormat">自动排版</view>
      </view>
      
      <view class="form-group">
        <text class="form-label">封面图片</text>
        <view class="image-grid">
          <view v-for="(img, i) in form.images" :key="img" class="image-item">
            <image :src="img" mode="aspectFill" @click="previewImage(i)" />
            <view class="image-del" @click="removeImage(i)">×</view>
          </view>
          <view v-if="form.images.length < 9" class="image-add" @click="chooseImage">
            <text>+</text>
          </view>
        </view>
      </view>
      
      <!-- 按类型显示额外字段 -->
      <PublishExtraFields :type="currentType" :form="form" :urgent-options="urgentOptions" />
    </view>
    
    <view class="bottom-bar">
      <BigButton  :text="t('button.saveDraft', '存草稿')" type="default" @click="saveDraft" />
      <BigButton :text="t('button.publish', '发布')" type="primary" @click="onPublish" :disabled="!canPublish" />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, reactive, computed, onMounted } from 'vue'
import { callFunction, uploadImages, acquireLock, releaseLock, cleanupFileIDs } from '@/utils/request.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
import BigButton from '@/components/BigButton.vue'
import VoiceInput from '@/components/VoiceInput.vue'
import PublishExtraFields from '@/components/admin/PublishExtraFields.vue'
import { autoFormat } from '@/utils/formatText.js'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const currentType = ref('news')
const noticeCatIndex = ref(0)
const newsCatIndex = ref(0)

const publishTypes = [
  { value: 'news', label: '村里事' },
  { value: 'notice', label: '村务公开' },
  { value: 'project', label: '项目收益' },
  { value: 'market', label: '惠农价格' },
  { value: 'task', label: '政策任务' }
]

const noticeCategories = ['党务', '村务', '财务', '惠农', '应急']
const newsCategories = ['村务', '党建', '通知', '活动']
const urgentOptions = [
  { value: '普通', label: '普通' },
  { value: '紧急', label: '紧急' },
  { value: '特急', label: '特急' }
]

// 初始表单工厂函数（切换类型时用于全量重置）
function createForm() {
  return {
    title: '',
    content: '',
    images: [],
    // notice
    responsible: '',
    audited: false,
    // project
    totalAmount: '',
    beneficiaries: '',
    // market
    productName: '',
    price: '',
    unit: '',
    market: '',
    // task
    assignee: '',
    assigneeOpenid: '',
    deadline: '',
    urgentLevel: '普通'
  }
}

const form = reactive(createForm())

const canPublish = computed(() => {
  return form.title && form.content
})

onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
  const draft = uni.getStorageSync('draft_publish')
  if (draft) {
    try { Object.assign(form, draft) } catch (e) {}
  }
})

function onFormat() {
  form.content = autoFormat(form.content)
  uni.showToast({ title: '已自动排版', icon: 'success' })
}

function saveDraft() {
  try {
    uni.setStorageSync('draft_publish', { ...form })
    uni.showToast({ title: '草稿已保存', icon: 'success' })
  } catch (e) {
    uni.showToast({ title: '保存失败', icon: 'none' })
  }
}

// 切换类型：全量重置 form，避免残留垃圾数据
function switchType(type) {
  currentType.value = type
  Object.assign(form, createForm())
}

function onVoiceResult(text) { form.content += text }

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
  uni.previewImage({ urls: form.images, current: form.images[i] })
}

async function onPublish() {
  if (!canPublish.value) return
  
  if (!acquireLock('admin_publish', 15000)) {
    uni.showToast({ title: '请勿重复提交', icon: 'none' })
    return
  }
  
  uni.showLoading({ title: '发布中...', mask: true })
  
  let uploadedFileIDs = []
  
  try {
    let images = []
    if (form.images.length > 0) {
      const uploadRes = await uploadImages(form.images, currentType.value, (done, total) => {
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
    
    let funcName = ''
    let data = { title: form.title, content: form.content, images: images }
    
    if (currentType.value === 'news') {
      funcName = 'publishNews'
      data.category = newsCategories[newsCatIndex.value]
      data.coverImage = images[0] || ''
    } else if (currentType.value === 'notice') {
      funcName = 'publishNotice'
      data.category = noticeCategories[noticeCatIndex.value]
      data.responsible = form.responsible
      data.audited = form.audited
    } else if (currentType.value === 'project') {
      funcName = 'publishProject'
      data.totalAmount = parseFloat(form.totalAmount) || 0
      data.beneficiaries = form.beneficiaries
    } else if (currentType.value === 'market') {
      funcName = 'publishMarketPrice'
      data.productName = form.productName
      data.price = form.price
      data.unit = form.unit
      data.market = form.market
    } else if (currentType.value === 'task') {
      funcName = 'publishTask'
      data.assignee = form.assignee
      data.assigneeOpenid = form.assigneeOpenid
      data.deadline = form.deadline
      data.urgentLevel = form.urgentLevel
    }
    
    const res = await callFunction(funcName, data)
    
    if (res.success) {
      uni.showToast({ title: '发布成功', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1500)
    } else {
      await cleanupFileIDs(uploadedFileIDs)
    }
  } catch (err) {
    console.error('发布失败:', err)
    await cleanupFileIDs(uploadedFileIDs)
  } finally {
    releaseLock('admin_publish')
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-publish {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  padding-bottom: 200rpx;
  
  .type-tabs {
    display: flex;
    overflow-x: auto;
    background: $white;
    border-radius: $card-radius;
    padding: $space-xs;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    white-space: nowrap;
    
    .type-tab {
      padding: $space-md 32rpx;
      font-size: $font-sub;
      color: $text-sub;
      border-radius: $radius-sm;
      flex-shrink: 0;
      
      &.active {
        color: $white;
        background: $primary;
        font-weight: bold;
      }
    }
  }
  
  .card {
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
    
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
      }
      
      .textarea {
        width: 100%;
        min-height: 240rpx;
        background: $bg;
        border-radius: $radius-md;
        padding: $card-padding;
        font-size: $font-body;
        box-sizing: border-box;
        line-height: 1.6;
      }

      .format-btn {
        display: inline-block;
        margin-top: 16rpx;
        padding: $space-sm $space-lg;
        background: $primary-light;
        color: $primary;
        border-radius: $radius-sm;
        font-size: $font-sub;
        font-weight: bold;
      }
      
      .picker-value {
        display: inline-block;
        padding: $space-md $space-lg;
        background: $bg;
        border-radius: $radius-md;
        font-size: $font-body;
        color: $text-main;
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
    display: flex;
    gap: 16rpx;
    padding: $card-gap $page-padding;
    padding-bottom: calc(#{$card-gap} + env(safe-area-inset-bottom));
    background: $white;
    box-shadow: $shadow-top;
  }
}
</style>
