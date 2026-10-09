<!--
  pages/feedback/detail.vue - 工单详情
  用途：查看工单基本信息、诉求内容、处理信息，可评价
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <Skeleton v-if="loading && !record.title" type="detail" />
  <view class="page-detail" v-if="record.title">
    <view class="status-banner" :class="'status-' + recordStatusClass">
      <text class="status-text">{{ statusText(record.status) }}</text>
      <text v-if="record.isOverdue" class="overdue-tip">⚠️ 已超时</text>
    </view>
    
    <view class="card">
      <view class="card-title">基本信息</view>
      <view class="info-row">
        <text class="info-label">事项类型</text>
        <text class="info-value">{{ configStore.getFeedbackType(record.type) }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">提交时间</text>
        <text class="info-value">{{ formatDate(record.createTime) }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">紧急程度</text>
        <view class="info-value">
          <StatusTag :text="urgentText(record.urgentLevel)" :type="urgentColor(record.urgentLevel)" />
        </view>
      </view>
      <view v-if="record.villageGroup" class="info-row">
        <text class="info-label">所在村组</text>
        <text class="info-value">{{ record.villageGroup }}</text>
      </view>
    </view>

    <!-- 进度时间轴：让村民一眼看出"现在到哪一步了" -->
    <view class="card">
      <view class="card-title">办理进度</view>
      <ProgressTimeline
        :events="timelineEvents"
        :current-status="record.status"
      />
    </view>
    
    <view class="card">
      <view class="card-title">诉求内容</view>
      <text class="content-text">{{ record.content }}</text>
      <view v-if="record.images && record.images.length" class="image-grid">
        <image
          v-for="(img, i) in record.images"
          :key="i"
          class="grid-img"
          :src="img"
          mode="aspectFill"
          lazy-load
          @click="previewImage(i)"
        />
      </view>
    </view>
    
    <view v-if="record.assignee" class="card">
      <view class="card-title">处理信息</view>
      <ResponsibleInfo
        :name="record.assignee"
        :role="record.assigneeRole"
        :avatar="record.assigneeAvatar"
        :phone="record.phone"
      />
      <view v-if="record.reply" class="reply-section">
        <text class="reply-label">处理结果：</text>
        <text class="reply-text">{{ record.reply }}</text>
      </view>
      <view v-if="record.replyImages && record.replyImages.length" class="image-grid">
        <image
          v-for="(img, i) in record.replyImages"
          :key="i"
          class="grid-img"
          :src="img"
          mode="aspectFill"
          lazy-load
          @click="previewReplyImage(i)"
        />
      </view>
      <view v-if="record.handleDuration" class="duration">
        处理时长：{{ formatDuration(record.handleDuration) }}
      </view>
    </view>
    
    <view v-if="isCompleted && record.evaluation === 0" class="card">
      <view class="card-title">满意度评价</view>
      <view class="star-row">
        <view
          v-for="i in 5"
          :key="i"
          class="star"
          :class="{ active: evaluation >= i }"
          @click="evaluation = i"
        >⭐</view>
      </view>
      <textarea
        v-model="evaluationText"
        class="eval-textarea"
         :placeholder="t('placeholder.evaluation', '请输入评价（选填）')"
        maxlength="200"
      />
      <BigButton :text="t('button.submit', '提交评价')" type="primary" @click="submitEval" />
    </view>
    
    <view v-if="record.evaluation > 0" class="card">
      <view class="card-title">我的评价</view>
      <view class="star-row">
        <view v-for="i in 5" :key="i" class="star" :class="{ active: record.evaluation >= i }">⭐</view>
      </view>
      <text v-if="record.evaluationText" class="eval-text">{{ record.evaluationText }}</text>
    </view>
    
    <view class="report-row" @click="goReport">
      <text>举报此工单</text>
    </view>
    
    <view style="height: 40rpx;"></view>
  </view>
  <view v-else-if="loadError" class="error-state">
    <text class="error-icon">⚠️</text>
    <text class="error-text">加载失败</text>
    <view class="retry-btn" @click="loadData">重新加载</view>
  </view>
  <view v-else-if="!loading" class="loading">加载中...</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { callFunction, acquireLock, releaseLock } from '@/utils/request.js'
import { requestSubscribe } from '@/utils/subscribe.js'
import { formatDate, statusText, urgentText, urgentColor, formatDuration } from '@/utils/format.js'
import { useConfigStore } from '@/store/config.js'
import StatusTag from '@/components/StatusTag.vue'
import ResponsibleInfo from '@/components/ResponsibleInfo.vue'
import BigButton from '@/components/BigButton.vue'
import ProgressTimeline from '@/components/ProgressTimeline.vue'
import Skeleton from '@/components/Skeleton.vue'
import { ensureAuth, AUTH_VERIFIED } from '@/utils/auth.js'
import { useRootFontSize } from '@/composables/useA11y.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const rootFontSize = useRootFontSize()
const record = ref({})
const recordId = ref('')
const evaluation = ref(0)
const evaluationText = ref('')
const loadError = ref(false)
const loading = ref(false)

const isCompleted = computed(() => {
  const s = record.value.status
  return s === '已完成' || s === '已评价' || s === 'completed' || s === 'evaluated'
})
const recordStatusClass = computed(() => {
  const s = record.value.status
  if (s === '已完成' || s === 'completed') return 'completed'
  if (s === '已评价' || s === 'evaluated') return 'evaluated'
  if (s === '处理中' || s === 'processing') return 'processing'
  return 'pending'
})

// 时间轴事件：根据工单记录字段动态构建
const timelineEvents = computed(() => {
  const r = record.value
  if (!r || !r._id) return []
  return [
    {
      title: '已提交',
      time: r.createTime,
      operator: r.villageGroup || '村民',
      note: r.title || (r.content || '').substring(0, 30)
    },
    {
      title: r.isSecret ? '书记亲阅' : (r.assigneeName ? `已派给${r.assigneeName}` : '待派单'),
      time: r.dispatchTime,
      operator: r.assigneeName || (r.isSecret ? '书记' : ''),
      note: r.assigneeDuty || (r.isSecret ? '干部作风类自动亲阅' : '')
    },
    {
      title: '处理中',
      time: r.status === '处理中' || r.status === '已完成' || r.status === '已评价' ? r.updateTime : null,
      operator: r.assigneeName || '',
      note: r.reply ? '已回复' : ''
    },
    {
      title: '已完成',
      time: (r.status === '已完成' || r.status === '已评价') ? r.updateTime : null,
      operator: r.assigneeName || '',
      note: r.handleDuration ? `处理时长 ${formatDuration(r.handleDuration)}` : ''
    },
    {
      title: '已评价',
      time: r.status === '已评价' ? r.updateTime : null,
      operator: r._openid === uni.getStorageSync('userInfo')?.openid ? '我' : '村民',
      note: r.evaluation ? `${r.evaluation}星${r.evaluationText ? '：' + r.evaluationText : ''}` : ''
    }
  ]
})

onLoad((options) => {
  recordId.value = options.recordId
})

onMounted(() => {
  if (!ensureAuth(AUTH_VERIFIED)) return
  loadData()
})

async function loadData() {
  if (!recordId.value) return
  loadError.value = false
  loading.value = true
  
  try {
    const res = await callFunction('getRecordDetail', { recordId: recordId.value })
    if (res.success) {
      record.value = res.data
    } else {
      loadError.value = true
    }
  } catch (err) {
    console.error('[feedback/detail 加载失败]:', err)
    loadError.value = true
  } finally {
    loading.value = false
  }
}

function previewImage(i) {
  uni.previewImage({
    urls: record.value.images,
    current: record.value.images[i]
  })
}

function previewReplyImage(i) {
  uni.previewImage({
    urls: record.value.replyImages,
    current: record.value.replyImages[i]
  })
}

function goReport() {
  const title = encodeURIComponent(record.value.title || '工单')
  uni.navigateTo({ url: `/pages/report/index?targetType=record&targetId=${recordId.value}&targetTitle=${title}` })
}

async function submitEval() {
  requestSubscribe([configStore.subscribeTemplates && configStore.subscribeTemplates.status_update])
  if (evaluation.value === 0) {
    uni.showToast({ title: '请选择星级', icon: 'none' })
    return
  }
  
  if (!acquireLock('submit_eval', 10000)) {
    uni.showToast({ title: '请勿重复提交', icon: 'none' })
    return
  }
  
  // 乐观更新：先改 UI，失败回滚
  const prevEvaluation = record.value.evaluation
  const prevEvaluationText = record.value.evaluationText
  const prevStatus = record.value.status
  record.value.evaluation = evaluation.value
  record.value.evaluationText = evaluationText.value
  record.value.status = '已评价'

  try {
    const res = await callFunction('evaluateFeedback', {
      recordId: recordId.value,
      evaluation: evaluation.value,
      evaluationText: evaluationText.value
    })

    if (res.success) {
      uni.showToast({ title: '评价成功', icon: 'success' })
      // 1s 后刷新拿最新数据
      setTimeout(() => loadData(), 1000)
    } else {
      throw new Error(res.message || '评价失败')
    }
  } catch (err) {
    // 回滚到操作前状态
    record.value.evaluation = prevEvaluation
    record.value.evaluationText = prevEvaluationText
    record.value.status = prevStatus
    uni.showToast({ title: '评价失败，请重试', icon: 'none' })
    console.error('[评价失败]:', err)
  } finally {
    releaseLock('submit_eval')
  }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-detail {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  
  .status-banner {
    padding: $card-padding;
    border-radius: $card-radius;
    text-align: center;
    margin-bottom: $card-gap;
    
    &.status-pending { background: rgba(230,81,0,0.1); }
    &.status-processing { background: $primary-light; }
    &.status-completed, &.status-evaluated { background: rgba(46,125,50,0.1); }
    
    .status-text {
      font-size: $font-card-title;
      font-weight: bold;
      color: $text-main;
    }
    
    .overdue-tip {
      display: block;
      font-size: $font-sub;
      color: $danger;
      margin-top: 8rpx;
    }
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
      
      .info-label {
        width: 200rpx;
        font-size: $font-body;
        color: $text-sub;
      }
      
      .info-value {
        flex: 1;
        font-size: $font-body;
        color: $text-main;
      }
    }
    
    .content-text {
      font-size: $font-body;
      color: $text-main;
      line-height: 1.6;
      display: block;
      margin-bottom: 24rpx;
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
    
    .reply-section {
      margin-top: 24rpx;
      
      .reply-label {
        font-size: $font-body;
        color: $text-sub;
        display: block;
        margin-bottom: 8rpx;
      }
      
      .reply-text {
        font-size: $font-body;
        color: $text-main;
        line-height: 1.6;
      }
    }
    
    .duration {
      margin-top: 16rpx;
      font-size: $font-sub;
      color: $text-sub;
    }
    
    .star-row {
      display: flex;
      gap: 16rpx;
      margin-bottom: 24rpx;
      
      .star {
        font-size: 56rpx;
        opacity: 0.4;
        
        &.active { opacity: 1; }
      }
    }
    
    .eval-textarea {
      width: 100%;
      min-height: 160rpx;
      background: $bg;
      border-radius: $radius-md;
      padding: $card-padding;
      font-size: $font-body;
      margin-bottom: 24rpx;
      box-sizing: border-box;
    }
    
    .eval-text {
      font-size: $font-body;
      color: $text-main;
      line-height: 1.6;
    }
  }

  .report-row {
    text-align: center;
    padding: $card-padding 0;
    color: $text-weak;
    font-size: $font-sub;
  }

  .loading {
    text-align: center;
    padding: 200rpx 0;
    font-size: $font-body;
    color: $text-weak;
  }

  .error-state {
    text-align: center;
    padding: 200rpx 0;

    .error-icon { display: block; font-size: 80rpx; margin-bottom: 24rpx; }
    .error-text { display: block; font-size: $font-body; color: $text-sub; margin-bottom: 24rpx; }
    .retry-btn {
      display: inline-block;
      padding: $space-sm 48rpx;
      background: $primary;
      color: $white;
      border-radius: $btn-radius;
      font-size: $font-body;
    }
  }
}
</style>
