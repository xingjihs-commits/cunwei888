<!--
  pages/finance/detail.vue - 财务详情
-->
<template>
  <Skeleton v-if="loading && !report.title" type="detail" />
  <view class="page-finance-detail" v-if="report.title">
    <view class="header-card">
      <text class="finance-title">{{ report.title }}</text>
      <view class="meta-row">
        <text class="meta-period">{{ report.period }}</text>
        <text class="meta-audited" v-if="report.audited">✓ {{ t('finance.auditedBy', '村务监督委员会审核') }}</text>
      </view>
    </view>
    
    <view class="card summary-card">
      <view class="summary-row">
        <view class="sum-item income">
          <text class="sum-label">{{ t('finance.totalIncome', '总收入') }}</text>
          <text class="sum-value">¥{{ formatMoney(report.totalIncome) }}</text>
        </view>
        <view class="sum-item expense">
          <text class="sum-label">{{ t('finance.totalExpense', '总支出') }}</text>
          <text class="sum-value">¥{{ formatMoney(report.totalExpense) }}</text>
        </view>
        <view class="sum-item balance" :class="report.balance >= 0 ? 'positive' : 'negative'">
          <text class="sum-label">{{ t('finance.balance', '结余') }}</text>
          <text class="sum-value">¥{{ formatMoney(report.balance) }}</text>
        </view>
      </view>
    </view>
    
    <view v-if="report.incomes && report.incomes.length" class="card">
      <view class="card-title">{{ t('finance.incomeDetail', '收入明细') }}</view>
      <view v-for="(item, i) in report.incomes" :key="i" class="detail-row">
        <view class="detail-info">
          <text class="detail-cat">{{ item.category }}</text>
          <text class="detail-item">{{ item.item }}</text>
          <text v-if="item.remark" class="detail-remark">{{ item.remark }}</text>
        </view>
        <text class="detail-amount income">+{{ formatMoney(item.amount) }}</text>
      </view>
    </view>
    
    <view v-if="report.expenses && report.expenses.length" class="card">
      <view class="card-title">{{ t('finance.expenseDetail', '支出明细') }}</view>
      <view v-for="(item, i) in report.expenses" :key="i" class="detail-row">
        <view class="detail-info">
          <text class="detail-cat">{{ item.category }}</text>
          <text class="detail-item">{{ item.item }}</text>
          <text v-if="item.remark" class="detail-remark">{{ item.remark }}</text>
        </view>
        <text class="detail-amount expense">-{{ formatMoney(item.amount) }}</text>
      </view>
    </view>
    
    <view v-if="report.assets && report.assets.length" class="card">
      <view class="card-title">{{ t('finance.assets', '资产情况') }}</view>
      <view v-for="(item, i) in report.assets" :key="i" class="detail-row">
        <view class="detail-info">
          <text class="detail-cat">{{ item.category }}</text>
          <text class="detail-item">{{ item.item }}</text>
        </view>
        <text class="detail-amount">¥{{ formatMoney(item.amount) }}</text>
      </view>
    </view>
    
    <view v-if="report.resources && report.resources.length" class="card">
      <view class="card-title">{{ t('finance.resources', '资源情况') }}</view>
      <view v-for="(item, i) in report.resources" :key="i" class="detail-row">
        <view class="detail-info">
          <text class="detail-cat">{{ item.category }}</text>
          <text class="detail-item">{{ item.item }}</text>
          <text v-if="item.remark" class="detail-remark">{{ item.remark }}</text>
        </view>
      </view>
    </view>
    
    <view v-if="report.summary" class="card">
      <view class="card-title">{{ t('finance.note', '说明') }}</view>
      <text class="content-text">{{ report.summary }}</text>
    </view>
  </view>
  <view v-else-if="!loading" class="loading">{{ t('emptyState.loading', '加载中...') }}</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatMoney } from '@/utils/format.js'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const report = ref({})
const financeId = ref('')
const loading = ref(false)

onLoad((options) => { financeId.value = options.financeId })
onMounted(() => loadData())

async function loadData() {
  // 用列表接口查找（专用详情接口可后续补全）
  loading.value = true
  try {
    const res = await callFunction('getFinanceReports', { page: 1, pageSize: 100 })
    if (res.success) {
      const found = res.data.find(r => r._id === financeId.value)
      if (found) report.value = found
    }
  } catch (err) { console.error(err) }
  finally { loading.value = false }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-finance-detail { min-height: 100vh; background: $bg; padding: $page-padding;
  .header-card { background: linear-gradient(135deg, $gold, darken(#D4A843, 10%)); color: $white; border-radius: $card-radius; padding: $card-padding; margin-bottom: $card-gap;
    .finance-title { font-size: $font-title; font-weight: bold; display: block; margin-bottom: 12rpx; line-height: 1.4; }
    .meta-row { display: flex; align-items: center; gap: 16rpx;
      .meta-period { padding: $space-xs $space-md; background: rgba(255,255,255,0.2); border-radius: $radius-sm; font-size: $font-micro; }
      .meta-audited { font-size: $font-sub; } } }
  .card { background: $white; border-radius: $card-radius; padding: $card-padding; box-shadow: $card-shadow; margin-bottom: $card-gap;
    .card-title { font-size: $font-card-title; font-weight: bold; color: $text-main; border-left: 8rpx solid $primary; padding-left: 16rpx; margin-bottom: 24rpx; } }
  .summary-card { padding: $card-padding;
    .summary-row { display: flex; gap: 16rpx; }
    .sum-item { flex: 1; text-align: center; padding: $card-padding 16rpx; background: $bg; border-radius: $radius-md;
      .sum-label { font-size: $font-sub; color: $text-sub; display: block; margin-bottom: 8rpx; }
      .sum-value { font-size: $font-card-title; font-weight: bold; }
      &.income .sum-value { color: $success; }
      &.expense .sum-value { color: $warning; }
      &.balance.positive .sum-value { color: $primary; }
      &.balance.negative .sum-value { color: $danger; } } }
  .detail-row { display: flex; justify-content: space-between; align-items: center; padding: $space-md 0; border-bottom: 2rpx solid $border;
    &:last-child { border-bottom: none; }
    .detail-info { flex: 1;
      .detail-cat { font-size: $font-micro; color: $text-sub; display: block; }
      .detail-item { font-size: $font-body; color: $text-main; display: block; margin: 4rpx 0; }
      .detail-remark { font-size: $font-micro; color: $text-weak; } }
    .detail-amount { font-size: $font-body; font-weight: bold; color: $text-main;
      &.income { color: $success; }
      &.expense { color: $warning; } } }
  .content-text { font-size: $font-body; color: $text-main; line-height: 1.8; white-space: pre-wrap; }
  .loading { text-align: center; padding: 200rpx 0; font-size: $font-body; color: $text-weak; } }
</style>
