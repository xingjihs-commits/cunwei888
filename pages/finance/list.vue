<!--
  pages/finance/list.vue - 财务三资公示
-->
<template>
  <view class="page-finance">
    <view class="year-bar">
      <picker mode="selector" :range="years" :value="yearIndex" @change="onYearChange">
        <view class="year-picker">{{ years[yearIndex] }}年 ▼</view>
      </picker>
      <text class="count-text">共{{ total }}期</text>
    </view>
    
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view v-for="item in list" :key="item._id" class="finance-card" @click="goDetail(item)">
        <view class="card-header">
          <view class="period-tag">{{ item.period }}</view>
          <text class="audit-tag" v-if="item.audited">✓ {{ t('finance.auditedShort', '监委审核') }}</text>
        </view>
        <text class="finance-title">{{ item.title }}</text>
        <view class="amount-row">
          <view class="amount-item income">
            <text class="amount-label">{{ t('finance.income', '收入') }}</text>
            <text class="amount-value">¥{{ formatMoney(item.totalIncome) }}</text>
          </view>
          <view class="amount-item expense">
            <text class="amount-label">{{ t('finance.expense', '支出') }}</text>
            <text class="amount-value">¥{{ formatMoney(item.totalExpense) }}</text>
          </view>
          <view class="amount-item balance" :class="item.balance >= 0 ? 'positive' : 'negative'">
            <text class="amount-label">{{ t('finance.balance', '结余') }}</text>
            <text class="amount-value">¥{{ formatMoney(item.balance) }}</text>
          </view>
        </view>
      </view>
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noData', '暂无财务公示')" icon="💰" />
      <view v-if="loading" class="loading">{{ t('emptyState.loading', '加载中...') }}</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatMoney } from '@/utils/format.js'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'
import { usePagination } from '@/composables/usePagination.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const years = ['全部', '2024', '2023']
const yearIndex = ref(0)

const { list, total, loading, refresh, loadMore } = usePagination(
  (params) => callFunction('getFinanceReports', {
    ...params,
    year: years[yearIndex.value] === '全部' ? '' : years[yearIndex.value]
  }),
  { pageSize: 20 }
)

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.finance', '财务三资') })
  refresh()
})
onPullDownRefresh(() => refresh())

function onYearChange(e) { yearIndex.value = e.detail.value; refresh() }
function goDetail(item) { uni.navigateTo({ url: `/pages/finance/detail?financeId=${item._id}` }) }
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-finance { min-height: 100vh; background: $bg;
  .year-bar { display: flex; align-items: center; justify-content: space-between; padding: $space-md $page-padding;
    .year-picker { padding: $space-xs 24rpx; background: $white; border-radius: $radius-sm; font-size: $font-sub; color: $primary; }
    .count-text { font-size: $font-sub; color: $text-sub; } }
  .list { height: calc(100vh - 120rpx); padding: 0 $page-padding; box-sizing: border-box; }
  .finance-card { background: $white; border-radius: $card-radius; padding: $card-padding; box-shadow: $card-shadow; margin-bottom: $card-gap;
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12rpx; }
    .period-tag { padding: $space-xs $space-md; background: $gold-light; color: $gold; border-radius: $radius-sm; font-size: $font-micro; }
    .audit-tag { font-size: $font-sub; color: $success; }
    .finance-title { font-size: $font-card-title; font-weight: bold; color: $text-main; display: block; margin-bottom: 16rpx; }
    .amount-row { display: flex; gap: 16rpx; }
    .amount-item { flex: 1; text-align: center; padding: $space-md; background: $bg; border-radius: $radius-md;
      .amount-label { font-size: $font-micro; color: $text-sub; display: block; }
      .amount-value { font-size: $font-body; font-weight: bold; }
      &.income .amount-value { color: $success; }
      &.expense .amount-value { color: $warning; }
      &.balance.positive .amount-value { color: $primary; }
      &.balance.negative .amount-value { color: $danger; } }
    &:active { background: $bg; } }
  .loading { text-align: center; padding: $card-padding; font-size: $font-sub; color: $text-weak; } }
</style>
