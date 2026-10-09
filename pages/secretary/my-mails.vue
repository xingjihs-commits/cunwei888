<!--
  pages/secretary/my-mails.vue - 我的来信
  用途：查看自己给书记的信件及书记的回复
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-my-mails">
    <scroll-view scroll-y class="list" @scrolltolower="loadMore">
      <Skeleton v-if="loading && list.length === 0" type="list" />
      <view v-for="item in list" :key="item._id" class="mail-card">
        <view class="mail-header">
          <view class="status-tag" :class="'s-' + item.status">{{ statusText(item.status) }}</view>
          <text class="mail-time">{{ relativeTime(item.createTime) }}</text>
        </view>
        <text class="mail-subject">{{ item.subject }}</text>
        <text class="mail-content">{{ item.content }}</text>
        
        <view v-if="item.reply" class="reply-section">
          <view class="reply-header">
            <text class="reply-icon">💬</text>
            <text class="reply-label">书记回复</text>
            <text class="reply-time">{{ relativeTime(item.replyTime) }}</text>
          </view>
          <text class="reply-content">{{ item.reply }}</text>
        </view>
      </view>
      <EmptyState v-if="list.length === 0 && !loading" :text="t('emptyState.noData', '暂无信件')" icon="✉️" actionText="去写信" @action="goMailbox" />
      <view v-if="loading" class="loading">加载中...</view>
    </scroll-view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { relativeTime } from '@/utils/format.js'
import EmptyState from '@/components/EmptyState.vue'
import Skeleton from '@/components/Skeleton.vue'
import { useConfigStore } from '@/store/config.js'
import { ensureAuth, AUTH_LOGIN } from '@/utils/auth.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const list = ref([])
const loading = ref(false)
const page = ref(1)
const total = ref(0)

onMounted(() => { if (ensureAuth(AUTH_LOGIN)) loadData() })
onShow(() => { if (!ensureAuth(AUTH_LOGIN)) return; page.value = 1; loadData() })

async function loadData() {
  if (loading.value) return
  loading.value = true
  try {
    const res = await callFunction('getMyMails', { page: page.value, pageSize: 10 })
    if (res.success) {
      if (page.value === 1) list.value = res.data
      else list.value = list.value.concat(res.data)
      total.value = res.total
    }
  } catch (err) { console.error(err) }
  finally { loading.value = false }
}

function loadMore() {
  if (list.value.length < total.value && !loading.value) { page.value++; loadData() }
}

function statusText(status) {
  const map = { pending: '待回复', read: '已阅', replied: '已回复', closed: '已关闭' }
  return map[status] || status
}

function goMailbox() {
  uni.navigateTo({ url: '/pages/secretary/mailbox' })
}
</script>

<style lang="scss" scoped>
.page-my-mails {
  min-height: 100vh; background: $bg;
  .list { height: 100vh; padding: $page-padding; box-sizing: border-box; }
  .mail-card {
    background: $white; border-radius: $card-radius;
    padding: $card-padding; box-shadow: $card-shadow; margin-bottom: $card-gap;
    .mail-header {
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 12rpx;
      .status-tag {
        padding: $space-xs $space-md; border-radius: $radius-sm; font-size: $font-micro;
        &.s-pending { background: rgba(230,81,0,0.1); color: $warning; }
        &.s-read { background: $primary-light; color: $primary; }
        &.s-replied { background: rgba(46,125,50,0.1); color: $success; }
        &.s-closed { background: $border; color: $text-sub; }
      }
      .mail-time { font-size: $font-sub; color: $text-weak; }
    }
    .mail-subject { font-size: $font-card-title; font-weight: bold; color: $text-main; display: block; margin-bottom: 8rpx; }
    .mail-content { font-size: $font-sub; color: $text-sub; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .reply-section {
      margin-top: 16rpx; padding: $card-padding; background: $primary-light; border-radius: $radius-md;
      .reply-header { display: flex; align-items: center; margin-bottom: 12rpx; }
      .reply-icon { font-size: $font-body; margin-right: 8rpx; }
      .reply-label { font-size: $font-sub; color: $primary; font-weight: bold; flex: 1; }
      .reply-time { font-size: $font-micro; color: $text-weak; }
      .reply-content { font-size: $font-body; color: $text-main; line-height: 1.6; }
    }
  }
  .loading { text-align: center; padding: $card-padding; font-size: $font-sub; color: $text-weak; }
}
</style>
