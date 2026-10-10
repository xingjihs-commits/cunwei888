<!--
  pages/agri/calendar.vue - 农事日历
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-agri">
    <view class="month-bar">
      <view class="month-btn" @click="changeMonth(-1)">‹</view>
      <text class="month-text">{{ currentMonth }}月农事</text>
      <view class="month-btn" @click="changeMonth(1)">›</view>
    </view>
    
    <scroll-view scroll-y class="list">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view v-for="item in list" :key="item._id || item.month" class="agri-card">
        <view class="card-header">
          <view class="term-tag">{{ item.term || t('tip.term', '节气') }}</view>
          <text class="card-title">{{ item.title }}</text>
        </view>
        <text class="agri-content">{{ item.content }}</text>
        <view v-if="item.tasks && item.tasks.length" class="task-list">
          <view v-for="(task, i) in item.tasks" :key="i" class="task-item">
            <text class="task-dot">•</text>
            <text class="task-text">{{ task }}</text>
          </view>
        </view>
      </view>
      <EmptyState v-if="list.length === 0 && !loading"  :text="t('emptyState.noAgri', '暂无农事提醒')" icon="🌾" />
    </scroll-view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, onMounted } from 'vue'
import { callFunction } from '@/utils/request.js'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const list = ref([])
const currentMonth = ref(new Date().getMonth() + 1)
const loading = ref(false)

onMounted(() => {
  uni.setNavigationBarTitle({ title: t('pageTitle.calendar', '农事日历') })
  loadData()
})

async function loadData() {
  loading.value = true
  try {
    const res = await callFunction('getAgriCalendar', { month: currentMonth.value })
    if (res.success) list.value = res.data
  } catch (err) { console.error(err) }
  finally { loading.value = false }
}

function changeMonth(delta) {
  currentMonth.value = currentMonth.value + delta
  if (currentMonth.value > 12) currentMonth.value = 1
  if (currentMonth.value < 1) currentMonth.value = 12
  loadData()
}
</script>

<style lang="scss" scoped>
.page-agri { min-height: 100vh; background: $bg;
  .month-bar { display: flex; align-items: center; justify-content: space-between; padding: $card-padding $page-padding; background: linear-gradient(135deg, $success, $success-dark); color: $white;
    .month-btn { font-size: 60rpx; padding: 0 $space-xl; }
    .month-text { font-size: $font-title; font-weight: bold; } }
  .list { height: calc(100vh - 120rpx); padding: $page-padding; box-sizing: border-box; }
  .agri-card { background: $white; border-radius: $card-radius; padding: $card-padding; box-shadow: $card-shadow; margin-bottom: $card-gap;
    .card-header { display: flex; align-items: center; margin-bottom: 16rpx; }
    .term-tag { padding: $space-xs $space-md; background: rgba($success,0.1); color: $success; border-radius: $radius-sm; font-size: $font-micro; margin-right: 16rpx; }
    .card-title { font-size: $font-card-title; font-weight: bold; color: $text-main; flex: 1; }
    .agri-content { font-size: $font-body; color: $text-main; line-height: 1.7; display: block; margin-bottom: 16rpx; }
    .task-list { display: flex; flex-direction: column; gap: 8rpx; }
    .task-item { display: flex; align-items: flex-start; }
    .task-dot { color: $success; margin-right: 12rpx; }
    .task-text { flex: 1; font-size: $font-sub; color: $text-sub; line-height: 1.5; } } }
</style>
