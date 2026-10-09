<!--
  pages/admin/dispatch.vue - 分配工单页面
  用途：书记将工单手动分配给指定责任人
  显示层：用"姓名（管什么）"，不用正式职务
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-dispatch">
    <!-- 工单摘要 -->
    <view class="card summary-card">
      <view class="card-title">{{ t('dispatch.summary', '工单摘要') }}</view>
      <view class="info-row">
        <text class="info-label">{{ t('dispatch.itemType', '事项类型') }}</text>
        <text class="info-value">{{ record.type }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">{{ t('dispatch.submitTime', '提交时间') }}</text>
        <text class="info-value">{{ formatDate(record.createTime) }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">{{ t('dispatch.urgentLevel', '紧急程度') }}</text>
        <view class="info-value">
          <StatusTag :text="urgentText(record.urgentLevel)" :type="urgentColor(record.urgentLevel)" />
        </view>
      </view>
      <view class="info-row">
        <text class="info-label">{{ t('dispatch.villageGroup', '所在村组') }}</text>
        <text class="info-value">{{ record.villageGroup || '-' }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">{{ t('dispatch.content', '工单内容') }}</text>
        <text class="info-value content">{{ record.content }}</text>
      </view>
    </view>
    
    <!-- 选择责任人 -->
    <view class="card">
      <view class="card-title">{{ t('dispatch.selectPerson', '选择责任人') }}</view>
      <view class="person-list">
        <view 
          v-for="(person, key) in dispatchMap" 
          :key="key"
          class="person-item"
          :class="{ active: selectedType === key }"
          @click="selectPerson(key, person)"
        >
          <view class="person-radio">
            <view v-if="selectedType === key" class="radio-dot"></view>
          </view>
          <view class="person-info">
            <view class="person-name-row">
              <text class="person-name">{{ person.name }}</text>
              <view class="duty-tag">（{{ person.duty }}）</view>
            </view>
            <text class="person-type">{{ t('dispatch.responsibleFor', '负责') }}：{{ key }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 批示 -->
    <view class="card">
      <view class="card-title">{{ t('dispatch.noteLabel', '书记批示（选填）') }}</view>
      <view class="textarea-wrap">
        <textarea 
          v-model="note" 
          class="textarea" 
          :placeholder="t('placeholder.dispatchNote', '可填写批示内容，如\'请重点处理\'')" 
          maxlength="200" 
          :auto-height="true" 
        />
        <view class="char-count">{{ note.length }}/200</view>
      </view>
    </view>
    
    <view style="height: 140rpx;"></view>
    
    <!-- 底部按钮 -->
    <view class="bottom-bar">
      <BigButton 
        :text="t('button.confirm', '确认分配')" 
        type="primary" 
        @click="onDispatch" 
        :disabled="!selectedPerson.openid" 
      />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatDate, urgentText, urgentColor } from '@/utils/format.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
import StatusTag from '@/components/StatusTag.vue'
import BigButton from '@/components/BigButton.vue'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const record = ref({})
const recordId = ref('')
const dispatchMap = ref({})
const selectedType = ref('')
const selectedPerson = reactive({ openid: '', name: '', duty: '' })
const note = ref('')

onLoad(async (options) => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
  recordId.value = options.recordId
  loadData()
})

async function loadData() {
  if (!recordId.value) return
  
  try {
    // 并行加载工单详情和分配地图
    const [detailRes, mapRes] = await Promise.all([
      callFunction('getRecordDetail', { recordId: recordId.value }),
      callFunction('getDispatchMap', {})
    ])
    
    if (detailRes.success) {
      record.value = detailRes.data
    }
    if (mapRes.success) {
      dispatchMap.value = mapRes.data
    }
  } catch (err) {
    console.error('加载失败:', err)
  }
}

function selectPerson(type, person) {
  selectedType.value = type
  selectedPerson.openid = person.openid
  selectedPerson.name = person.name
  selectedPerson.duty = person.duty
}

async function onDispatch() {
  if (!selectedPerson.openid) {
    uni.showToast({ title: '请选择责任人', icon: 'none' })
    return
  }
  
  uni.showLoading({ title: '分配中...', mask: true })
  
  try {
    const res = await callFunction('dispatchRecord', {
      recordId: recordId.value,
      assigneeOpenid: selectedPerson.openid,
      assigneeName: selectedPerson.name,
      assigneeDuty: selectedPerson.duty,
      note: note.value
    })
    
    if (res.success) {
      uni.showToast({ title: '分配成功', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1500)
    }
  } catch (err) {
    console.error('分配失败:', err)
  } finally {
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-dispatch {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  padding-bottom: 200rpx;
  
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
  
  .summary-card {
    .info-row {
      display: flex;
      padding: $space-sm 0;
      
      .info-label {
        width: 180rpx;
        font-size: $font-body;
        color: $text-sub;
      }
      
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
  }
  
  .person-list {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
    
    .person-item {
      display: flex;
      align-items: center;
      padding: $card-padding;
      background: $bg;
      border: 4rpx solid transparent;
      border-radius: $radius-md;
      
      &.active {
        border-color: $primary;
        background: $primary-light;
      }
      
      .person-radio {
        width: 40rpx;
        height: 40rpx;
        border: 4rpx solid $text-sub;
        border-radius: $radius-full;
        margin-right: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .radio-dot {
          width: 20rpx;
          height: 20rpx;
          background: $primary;
          border-radius: $radius-full;
        }
      }
      
      .person-info {
        flex: 1;
        
        .person-name-row {
          display: flex;
          align-items: center;
          margin-bottom: 8rpx;
          
          .person-name {
            font-size: $font-body;
            font-weight: bold;
            color: $text-main;
          }
          
          .duty-tag {
            font-size: $font-sub;
            color: $primary;
            margin-left: 8rpx;
          }
        }
        
        .person-type {
          font-size: $font-sub;
          color: $text-sub;
        }
      }
      
      &:active {
        opacity: 0.8;
      }
    }
  }
  
  .textarea-wrap {
    background: $bg;
    border-radius: $radius-md;
    padding: $card-padding;
    
    .textarea {
      width: 100%;
      min-height: 160rpx;
      font-size: $font-body;
      line-height: 1.6;
    }
    
    .char-count {
      text-align: right;
      font-size: $font-sub;
      color: $text-weak;
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
