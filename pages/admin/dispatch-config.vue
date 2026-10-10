<!--
  pages/admin/dispatch-config.vue - 分配地图配置页
  用途：书记配置各类型工单对应的责任人
  显示层：用"姓名（管什么）"
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-dispatch-config">
    <view class="notice">
      <text class="notice-icon">ℹ️</text>
      <text class="notice-text">{{ t('tip.dispatchConfigNote', '配置各类型工单对应的责任人。系统自动分是常态，配置后工单提交即自动分配。干部作风类自动标记为书记亲阅。') }}</text>
    </view>
    
    <view class="card">
      <view class="card-title">{{ t('dispatchConfig.title', '分配地图配置') }}</view>
      
      <view v-for="(type, i) in types" :key="i" class="type-group">
        <view class="type-header">
          <text class="type-name">{{ type }}</text>
          <view v-if="type === '干部作风'" class="secret-tag">{{ t('dispatchConfig.autoSecret', '自动亲阅') }}</view>
        </view>
        
        <view class="form-row">
          <text class="form-label">{{ t('dispatchConfig.nameLabel', '责任人姓名') }}</text>
          <input 
            v-model="dispatchMap[type].name" 
            class="input" 
            :placeholder="t('placeholder.responsibleName', '如：张三')" 
            @input="onInput(type, 'name', $event)"
          />
        </view>
        
        <view class="form-row">
          <text class="form-label">{{ t('dispatchConfig.dutyLabel', '负责什么') }}</text>
          <input 
            v-model="dispatchMap[type].duty" 
            class="input" 
            :placeholder="t('placeholder.responsibleDuty', '如：管环境卫生')" 
            @input="onInput(type, 'duty', $event)"
          />
        </view>
        
        <view class="form-row">
          <text class="form-label">{{ t('dispatchConfig.wxidLabel', '微信号（选填）') }}</text>
          <input 
            v-model="dispatchMap[type].wxid" 
            class="input" 
            :placeholder="t('placeholder.wxidUsage', '用于获取openid')" 
            @input="onInput(type, 'wxid', $event)"
          />
        </view>
        
        <view class="form-row">
          <text class="form-label">openid</text>
          <input 
            v-model="dispatchMap[type].openid" 
            class="input mono" 
            :placeholder="t('placeholder.openidRequired', '责任人openid（必填才能自动派单）')" 
            @input="onInput(type, 'openid', $event)"
          />
        </view>
      </view>
    </view>
    
    <view class="bottom-bar">
      <BigButton :text="t('button.save', '保存配置')" type="primary" @click="onSave" />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { reactive, computed, onMounted } from 'vue'
import { useConfigStore } from '@/store/config.js'
import { callFunction, acquireLock, releaseLock } from '@/utils/request.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
import BigButton from '@/components/BigButton.vue'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

// 从 configStore 获取类型（中文 key），与后端保持一致
const types = computed(() => configStore.feedbackTypes.map(t => t.name))

const dispatchMap = reactive({})

onMounted(async () => {
  // 权限拦截（统一用 useAdminGuard 组合式函数）
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
  // 初始化默认值
  initDefaults()
  loadData()
})

function initDefaults() {
  types.value.forEach(t => {
    dispatchMap[t] = { openid: '', name: '', duty: '', wxid: '' }
  })
}

async function loadData() {
  try {
    const res = await callFunction('getDispatchMap', {})
    if (res.success && res.data) {
      Object.keys(res.data).forEach(type => {
        if (dispatchMap[type]) {
          dispatchMap[type] = { ...dispatchMap[type], ...res.data[type] }
        }
      })
    }
  } catch (err) {
    console.error('加载失败:', err)
  }
}

function onInput(type, field, e) {
  dispatchMap[type][field] = e.detail.value
}

async function onSave() {
  let valid = true
  for (const type of types.value) {
    const item = dispatchMap[type]
    if (type !== '干部作风' && !item.openid && item.name) {
      uni.showToast({ title: `${type}的openid未填`, icon: 'none' })
      valid = false
      break
    }
  }
  if (!valid) return

  if (!acquireLock('admin_dispatch_config', 15000)) {
    uni.showToast({ title: '请勿重复提交', icon: 'none' })
    return
  }

  uni.showLoading({ title: '保存中...', mask: true })

  try {
    const res = await callFunction('updateDispatchMap', { dispatchMap: dispatchMap })
    if (res.success) {
      uni.showToast({ title: '配置已保存', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1500)
    }
  } catch (err) {
    console.error('保存失败:', err)
  } finally {
    releaseLock('admin_dispatch_config')
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>

.page-dispatch-config {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  padding-bottom: 200rpx;
  
  .notice {
    display: flex;
    align-items: flex-start;
    background: rgba($warning,0.08);
    border-left: 6rpx solid $warning;
    padding: $card-padding;
    border-radius: $radius-sm;
    margin-bottom: $card-gap;
    
    .notice-icon { font-size: $font-body; margin-right: 12rpx; }
    .notice-text { flex: 1; font-size: $font-sub; color: $text-sub; line-height: 1.5; }
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
  }
  
  .type-group {
    padding: $card-padding 0;
    border-bottom: 4rpx solid $border;
    
    &:last-child { border-bottom: none; }
    
    .type-header {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;
      
      .type-name {
        font-size: $font-body;
        font-weight: bold;
        color: $text-main;
        margin-right: 16rpx;
      }
      
      .secret-tag {
        padding: $space-xs $space-md;
        background: $primary-light;
        color: $primary;
        border-radius: $radius-sm;
        font-size: $font-micro;
      }
    }
    
    .form-row {
      display: flex;
      align-items: center;
      margin-bottom: 16rpx;
      
      .form-label {
        width: 200rpx;
        font-size: $font-sub;
        color: $text-sub;
      }
      
      .input {
        flex: 1;
        height: 80rpx;
        background: $bg;
        border-radius: $radius-sm;
        padding: 0 $space-md;
        font-size: $font-sub;
        
        &.mono {
          font-family: monospace;
          font-size: $font-micro;
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
