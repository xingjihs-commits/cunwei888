<!--
  pages/admin/finance-publish.vue - 财务公示发布
  用途：管理员发布村集体财务三资公示（收入/支出/资产/资源）
-->
<template>
  <view class="page-finance">
    <view class="card">
      <view class="form-group">
        <text class="form-label required">{{ t('financePublish.title', '公示标题') }}</text>
        <input v-model="form.title" class="input" :placeholder="t('placeholder.financeTitle', '如：2024年第一季度财务公示')" maxlength="50" />
      </view>
      <view class="form-group">
        <text class="form-label required">{{ t('financePublish.period', '公示周期') }}</text>
        <input v-model="form.period" class="input" :placeholder="t('placeholder.financePeriod', '如：2024年第一季度')" maxlength="30" />
      </view>
    </view>

    <view class="card">
      <view class="card-title">{{ t('financePublish.incomes', '收入项') }}</view>
      <view v-for="(item, i) in form.incomes" :key="i" class="item-row">
        <input v-model="item.category" class="input" :placeholder="t('placeholder.category', '分类')" />
        <input v-model="item.item" class="input" :placeholder="t('placeholder.item', '项目')" />
        <input v-model="item.amount" class="input amount" type="digit" :placeholder="t('placeholder.amount', '金额')" />
        <view class="del-btn" @click="form.incomes.splice(i, 1)">×</view>
      </view>
      <view class="add-btn" @click="form.incomes.push({category:'', item:'', amount:0, remark:''})">+ {{ t('financePublish.addIncome', '添加收入') }}</view>
      <view class="summary">{{ t('financePublish.totalLabel', '合计') }}：{{ sumAmount(form.incomes) }} {{ t('financePublish.yuan', '元') }}</view>
    </view>

    <view class="card">
      <view class="card-title">{{ t('financePublish.expenses', '支出项') }}</view>
      <view v-for="(item, i) in form.expenses" :key="i" class="item-row">
        <input v-model="item.category" class="input" :placeholder="t('placeholder.category', '分类')" />
        <input v-model="item.item" class="input" :placeholder="t('placeholder.item', '项目')" />
        <input v-model="item.amount" class="input amount" type="digit" :placeholder="t('placeholder.amount', '金额')" />
        <view class="del-btn" @click="form.expenses.splice(i, 1)">×</view>
      </view>
      <view class="add-btn" @click="form.expenses.push({category:'', item:'', amount:0, remark:''})">+ {{ t('financePublish.addExpense', '添加支出') }}</view>
      <view class="summary">{{ t('financePublish.totalLabel', '合计') }}：{{ sumAmount(form.expenses) }} {{ t('financePublish.yuan', '元') }}</view>
    </view>

    <view class="card">
      <view class="card-title">{{ t('financePublish.assets', '资产') }}</view>
      <view v-for="(item, i) in form.assets" :key="i" class="item-row">
        <input v-model="item.category" class="input" :placeholder="t('placeholder.category', '分类')" />
        <input v-model="item.item" class="input" :placeholder="t('placeholder.item', '项目')" />
        <input v-model="item.amount" class="input amount" type="digit" :placeholder="t('placeholder.amount', '金额')" />
        <view class="del-btn" @click="form.assets.splice(i, 1)">×</view>
      </view>
      <view class="add-btn" @click="form.assets.push({category:'', item:'', amount:0, remark:''})">+ {{ t('financePublish.addAsset', '添加资产') }}</view>
    </view>

    <view class="card">
      <view class="card-title">{{ t('financePublish.resources', '资源') }}</view>
      <view v-for="(item, i) in form.resources" :key="i" class="item-row">
        <input v-model="item.category" class="input" :placeholder="t('placeholder.category', '分类')" />
        <input v-model="item.item" class="input" :placeholder="t('placeholder.item', '项目')" />
        <view class="del-btn placeholder" @click="form.resources.splice(i, 1)">×</view>
      </view>
      <view class="add-btn" @click="form.resources.push({category:'', item:'', remark:''})">+ {{ t('financePublish.addResource', '添加资源') }}</view>
    </view>

    <view class="card">
      <view class="form-group">
        <text class="form-label">{{ t('financePublish.summary', '总结说明') }}</text>
        <textarea v-model="form.summary" class="textarea" :placeholder="t('placeholder.financeSummary', '本季度财务总结（选填）')" maxlength="500" :auto-height="true" />
        <VoiceInput @result="onVoiceResult" />
      </view>
    </view>

    <view class="bottom-bar">
      <BigButton :text="t('button.publish', '发布财务公示')" type="primary" @click="onSubmit" :disabled="!canSubmit" />
    </view>
  </view>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { callFunction, acquireLock, releaseLock } from '@/utils/request.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
import BigButton from '@/components/BigButton.vue'
import VoiceInput from '@/components/VoiceInput.vue'
import { useConfigStore } from '@/store/config.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const form = reactive({
  title: '',
  period: '',
  incomes: [{category:'', item:'', amount:0, remark:''}],
  expenses: [{category:'', item:'', amount:0, remark:''}],
  assets: [{category:'', item:'', amount:0, remark:''}],
  resources: [{category:'', item:'', remark:''}],
  summary: ''
})

const canSubmit = computed(() => form.title && form.period)

onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
})

function onVoiceResult(text) { form.summary += text }

function sumAmount(items) {
  return items.reduce((s, i) => s + (parseFloat(i.amount) || 0), 0).toFixed(2)
}

async function onSubmit() {
  if (!canSubmit.value) return
  if (!acquireLock('admin_finance_publish', 15000)) {
    uni.showToast({ title: '请勿重复提交', icon: 'none' })
    return
  }
  uni.showLoading({ title: '发布中...', mask: true })
  try {
    const res = await callFunction('publishFinanceReport', { ...form })
    if (res.success) {
      uni.showToast({ title: '发布成功', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1500)
    }
  } catch (err) {
    console.error('[发布失败]:', err)
  } finally {
    releaseLock('admin_finance_publish')
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-finance { min-height: 100vh; background: $bg; padding: $page-padding; padding-bottom: 200rpx;
  .card { background: $white; border-radius: $card-radius; padding: $card-padding; box-shadow: $card-shadow; margin-bottom: $card-gap;
    .card-title { font-size: $font-card-title; font-weight: bold; color: $text-main; border-left: 8rpx solid $primary; padding-left: 16rpx; margin-bottom: 24rpx; }
    .form-group { margin-bottom: 24rpx;
      .form-label { font-size: $font-body; color: $text-main; display: block; margin-bottom: 12rpx; font-weight: bold;
        &.required::before { content: '* '; color: $danger; }
      }
      .input { width: 100%; height: $btn-height; background: $bg; border-radius: $radius-md; padding: 0 $space-lg; font-size: $font-body; box-sizing: border-box; }
      .textarea { width: 100%; min-height: 200rpx; background: $bg; border-radius: $radius-md; padding: $card-padding; font-size: $font-body; box-sizing: border-box; line-height: 1.6; }
    }
    .item-row { display: flex; align-items: center; gap: 8rpx; margin-bottom: 12rpx;
      .input { flex: 1; height: 80rpx; padding: 0 $space-md; font-size: $font-sub; }
      .amount { max-width: 200rpx; flex: 0 0 200rpx; }
      .del-btn { width: 60rpx; height: 60rpx; line-height: 60rpx; text-align: center; color: $danger; font-size: $font-card-title;
        &.placeholder { flex-shrink: 0; }
      }
    }
    .add-btn { text-align: center; padding: $space-md; color: $primary; font-size: $font-sub; border: 2rpx dashed $primary; border-radius: $radius-md; margin-top: 12rpx; }
    .summary { text-align: right; font-size: $font-sub; color: $text-sub; margin-top: 12rpx; font-weight: bold; }
  }
  .bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; padding: $card-gap $page-padding; padding-bottom: calc(#{$card-gap} + env(safe-area-inset-bottom)); background: $white; box-shadow: $shadow-top; }
}
</style>
