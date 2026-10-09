<!--
  pages/admin/feedback-list.vue - 工单管理
  用途：管理员查看所有工单，可派单、处理
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-admin-feedback">
    <view class="filter-bar">
      <view 
        v-for="item in statusFilters"
        :key="item.value"
        class="filter-item"
        :class="{ active: currentStatus === item.value }"
        @click="switchStatus(item.value)"
      >{{ item.label }}</view>
    </view>
    
    <view class="type-filter">
      <picker mode="selector" :range="typeOptions" :value="typeIndex" @change="onTypeChange">
        <view class="picker-value">{{ typeOptions[typeIndex] }} ▼</view>
      </picker>
      <picker mode="selector" :range="urgentOptions" :value="urgentIndex" @change="onUrgentChange">
        <view class="picker-value">{{ urgentOptions[urgentIndex] }} ▼</view>
      </picker>
    </view>
    
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <view class="stat-row">
        <view class="stat-item">
          <text class="stat-num">{{ total }}</text>
          <text class="stat-label">{{ t('feedbackList.total', '总数') }}</text>
        </view>
        <view class="stat-item">
          <text class="stat-num">{{ overdueCount }}</text>
          <text class="stat-label">{{ t('status.overdue', '超时') }}</text>
        </view>
        <view class="stat-item">
          <text class="stat-num">{{ completedCount }}</text>
          <text class="stat-label">{{ t('status.completed', '已完成') }}</text>
        </view>
      </view>
      
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view v-for="item in list" :key="item._id" class="admin-feedback-card">
        <FeedbackCard :item="item" @tap="goHandle" />
        
        <!-- 承办人显示（姓名（管什么）） -->
        <view v-if="item.assigneeName" class="assignee-row">
          <text class="assignee-label">{{ t('feedbackList.assigneeLabel', '承办') }}：</text>
          <text class="assignee-value">{{ item.assigneeName }}（{{ item.assigneeDuty || '管' + item.type }}）</text>
          <view v-if="item.dispatchType === 'auto'" class="dispatch-tag auto">{{ t('feedbackList.auto', '自动分') }}</view>
          <view v-else-if="item.dispatchType === 'manual'" class="dispatch-tag manual">{{ t('feedbackList.manual', '书记分') }}</view>
          <view v-else-if="item.dispatchType === 'self'" class="dispatch-tag secret">{{ t('feedbackList.secret', '亲阅') }}</view>
        </view>
        
        <!-- 操作按钮 -->
        <view class="action-row">
          <!-- 未分配：显示"分配"按钮 -->
          <view v-if="!item.assigneeOpenid && !item.isSecret" class="action-btn dispatch-btn" @click.stop="goDispatch(item)">
            <text>📋 {{ t('feedbackList.dispatch', '分配') }}</text>
          </view>
          <!-- 已分配：显示"改派"按钮 -->
          <view v-if="item.assigneeOpenid && !item.isSecret" class="action-btn reassign-btn" @click.stop="goDispatch(item)">
            <text>🔄 {{ t('feedbackList.reassign', '改派') }}</text>
          </view>
          <!-- 干部作风类：显示"亲阅"按钮 -->
          <view v-if="item.type === '干部作风' && !item.isSecret" class="action-btn secret-btn" @click.stop="markSecret(item)">
            <text>🔒 {{ t('feedbackList.secret', '亲阅') }}</text>
          </view>
        </view>
      </view>
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noWorkOrder', '暂无工单')" icon="📥" />
      <view v-if="loading" class="loading">{{ t('emptyState.loading', '加载中...') }}</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, computed, onMounted } from 'vue'
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { useConfigStore } from '@/store/config.js'
import FeedbackCard from '@/components/FeedbackCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const list = ref([])
const loading = ref(false)
const page = ref(1)
const total = ref(0)
const currentStatus = ref('')
const typeIndex = ref(0)
const urgentIndex = ref(0)

const statusFilters = [
  { value: '', label: '全部' },
  { value: 'pending', label: '待处理' },
  { value: 'processing', label: '处理中' },
  { value: 'completed', label: '已完成' },
  { value: 'overdue', label: '超时' }
]

const typeOptions = ['全部类型', '环境卫生', '道路水利', '矛盾纠纷', '干部作风', '安全隐患', '其他']
const urgentOptions = ['全部', '一般', '紧急', '特急']

const typeKeys = ['', '环境卫生', '道路水利', '矛盾纠纷', '干部作风', '安全隐患', '其他']
const urgentKeys = ['', 'normal', 'urgent', 'critical']

const overdueCount = computed(() => list.value.filter(i => i.isOverdue).length)
const completedCount = computed(() => list.value.filter(i => ['已完成','已评价','completed','evaluated'].includes(i.status)).length)

onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
  loadData()
})
onShow(() => {
  page.value = 1
  loadData()
})
onPullDownRefresh(() => {
  page.value = 1
  loadData()
})

async function loadData() {
  if (loading.value) return
  loading.value = true
  
  try {
    const params = {
      page: page.value,
      pageSize: 20,
      status: currentStatus.value === 'overdue' ? '' : currentStatus.value,
      type: typeKeys[typeIndex.value],
      urgentLevel: urgentKeys[urgentIndex.value]
    }
    
    const res = await callFunction('getFeedbackList', params)
    
    if (res.success) {
      let data = res.data
      
      // 超时筛选
      if (currentStatus.value === 'overdue') {
        data = data.filter(i => i.isOverdue)
      }
      
      if (page.value === 1) {
        list.value = data
      } else {
        list.value = list.value.concat(data)
      }
      total.value = res.total
    }
  } catch (err) {
    console.error('加载失败:', err)
  } finally {
    loading.value = false
    uni.stopPullDownRefresh()
  }
}

function switchStatus(status) {
  currentStatus.value = status
  page.value = 1
  loadData()
}

function onTypeChange(e) {
  typeIndex.value = e.detail.value
  page.value = 1
  loadData()
}

function onUrgentChange(e) {
  urgentIndex.value = e.detail.value
  page.value = 1
  loadData()
}

function loadMore() {
  if (list.value.length < total.value && !loading.value) {
    page.value++
    loadData()
  }
}

function goHandle(item) {
  uni.navigateTo({ url: `/pages/admin/feedback-handle?recordId=${item._id}` })
}

// 跳转分配页
function goDispatch(item) {
  uni.navigateTo({ url: `/pages/admin/dispatch?recordId=${item._id}` })
}

// 标记为亲阅件
async function markSecret(item) {
  uni.showModal({
    title: '确认亲阅',
    content: '将该工单标记为书记亲阅件？标记后只有书记可查看和处理。',
    success: async (res) => {
      if (res.confirm) {
        try {
          const result = await callFunction('handleSecretRecord', {
            recordId: item._id,
            action: 'mark_secret'
          })
          if (result.success) {
            uni.showToast({ title: '已标记亲阅', icon: 'success' })
            setTimeout(() => loadData(), 1500)
          }
        } catch (err) {
          console.error('标记失败:', err)
        }
      }
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-admin-feedback {
  min-height: 100vh;
  background: $bg;
  
  .filter-bar {
    display: flex;
    background: $white;
    padding: $space-md $page-padding;
    box-shadow: $card-shadow;
    
    .filter-item {
      flex: 1;
      text-align: center;
      padding: $space-sm 0;
      font-size: $font-sub;
      color: $text-sub;
      border-radius: $radius-sm;
      
      &.active {
        color: $primary;
        font-weight: bold;
        background: $primary-light;
      }
    }
  }
  
  .type-filter {
    display: flex;
    gap: 16rpx;
    padding: $space-md $page-padding;
    
    .picker-value {
      padding: $space-xs 24rpx;
      background: $white;
      border-radius: $radius-sm;
      font-size: $font-sub;
      color: $primary;
    }
  }
  
  .list {
    height: calc(100vh - 220rpx);
    padding: 0 $page-padding;
    box-sizing: border-box;
  }
  
  .admin-feedback-card {
    margin-bottom: $card-gap;
  }
  
  .assignee-row {
    display: flex;
    align-items: center;
    padding: $space-sm $card-padding;
    background: $white;
    border-top: 2rpx solid $border;
    border-radius: 0 0 $card-radius $card-radius;
    
    .assignee-label { font-size: $font-sub; color: $text-sub; margin-right: 8rpx; }
    .assignee-value { flex: 1; font-size: $font-sub; color: $primary; font-weight: bold; }
    
    .dispatch-tag {
      padding: $space-xs $space-md;
      border-radius: $radius-sm;
      font-size: $font-micro;
      
      &.auto { background: $primary-light; color: $primary; }
      &.manual { background: rgba(212,168,67,0.15); color: $gold; }
      &.secret { background: rgba(196,40,40,0.15); color: $danger; }
    }
  }
  
  .action-row {
    display: flex;
    gap: 16rpx;
    padding: $space-md $card-padding;
    background: $bg;
    border-radius: 0 0 $card-radius $card-radius;
    
    .action-btn {
      flex: 1;
      height: 72rpx;
      line-height: 72rpx;
      text-align: center;
      border-radius: $radius-md;
      font-size: $font-sub;
      font-weight: bold;
      
      &.dispatch-btn { background: $primary; color: $white; }
      &.reassign-btn { background: $gold-light; color: $gold; border: 2rpx solid $gold; }
      &.secret-btn { background: $primary-light; color: $primary; border: 2rpx solid $primary; }
      
      &:active { opacity: 0.8; }
    }
  }
  
  .stat-row {
    display: flex;
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    
    .stat-item {
      flex: 1;
      text-align: center;
      
      .stat-num {
        font-size: $font-number;
        color: $primary;
        font-weight: bold;
        display: block;
      }
      
      .stat-label {
        font-size: $font-sub;
        color: $text-sub;
      }
    }
  }
  
  .loading {
    text-align: center;
    padding: $card-padding;
    font-size: $font-sub;
    color: $text-weak;
  }
}
</style>
