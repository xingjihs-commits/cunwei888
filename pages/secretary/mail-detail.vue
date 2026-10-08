<!--
  pages/secretary/mail-detail.vue - 信件详情
-->
<template>
  <view class="page-mail-detail">
    <view v-if="mail.subject" class="card">
      <view class="mail-header">
        <view class="status-tag" :class="'s-' + mail.status">{{ statusText(mail.status) }}</view>
        <text class="mail-time">{{ formatDate(mail.createTime) }}</text>
      </view>
      <text class="mail-subject">{{ mail.subject }}</text>
      <text class="mail-content">{{ mail.content }}</text>
      <view v-if="mail.urgentLevel !== 'normal'" class="urgent-info">
        {{ t('mail.urgentLabel', '紧急程度') }}：{{ urgentText(mail.urgentLevel) }}
      </view>
    </view>
    
    <view v-if="mail.reply" class="card reply-card">
      <view class="reply-header">
        <view class="reply-avatar">书</view>
        <view class="reply-info">
          <text class="reply-name">{{ t('mail.replyTitle', '书记回信') }}</text>
          <text class="reply-time">{{ formatDate(mail.replyTime) }}</text>
        </view>
      </view>
      <text class="reply-content">{{ mail.reply }}</text>
    </view>
    
    <view v-else class="card pending-card">
      <text class="pending-icon">⏳</text>
      <text class="pending-text">{{ t('mail.pendingTip', '书记正在查阅，请耐心等待回复') }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { callFunction } from '@/utils/request.js'
import { formatDate, urgentText } from '@/utils/format.js'
import { useConfigStore } from '@/store/config.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const mail = ref({})
const mailId = ref('')

onLoad((options) => { mailId.value = options.mailId })
onMounted(() => loadData())

async function loadData() {
  // 复用我的来信列表查找
  try {
    const res = await callFunction('getMyMails', { page: 1, pageSize: 100 })
    if (res.success) {
      const found = res.data.find(m => m._id === mailId.value)
      if (found) mail.value = found
    }
  } catch (err) { console.error(err) }
}

function statusText(status) {
  const map = { pending: '待回复', read: '已阅', replied: '已回复', closed: '已关闭' }
  return map[status] || status
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-mail-detail {
  min-height: 100vh; background: $bg; padding: $page-padding;
  .card {
    background: $white; border-radius: $card-radius; padding: $card-padding;
    box-shadow: $card-shadow; margin-bottom: $card-gap;
    .mail-header { display: flex; justify-content: space-between; margin-bottom: 16rpx; }
    .status-tag { padding: $space-xs $space-md; border-radius: $radius-sm; font-size: $font-micro;
      &.s-pending { background: rgba(230,81,0,0.1); color: $warning; }
      &.s-replied { background: rgba(46,125,50,0.1); color: $success; }
    }
    .mail-time { font-size: $font-sub; color: $text-weak; }
    .mail-subject { font-size: $font-title; font-weight: bold; color: $text-main; display: block; margin-bottom: 16rpx; }
    .mail-content { font-size: $font-body; color: $text-main; line-height: 1.8; white-space: pre-wrap; }
    .urgent-info { margin-top: 16rpx; padding: $space-sm 16rpx; background: rgba(230,81,0,0.08); border-radius: $radius-sm; font-size: $font-sub; color: $warning; }
  }
  .reply-card {
    background: linear-gradient(135deg, rgba(196,30,36,0.05), rgba(212,168,67,0.05));
    .reply-header { display: flex; align-items: center; margin-bottom: 16rpx; }
    .reply-avatar {
      width: 80rpx; height: 80rpx; border-radius: $radius-full;
      background: $primary; color: $white;
      display: flex; align-items: center; justify-content: center;
      font-size: $font-card-title; font-weight: bold; margin-right: 16rpx;
    }
    .reply-info { flex: 1; }
    .reply-name { font-size: $font-card-title; font-weight: bold; color: $primary; display: block; }
    .reply-time { font-size: $font-sub; color: $text-weak; }
    .reply-content { font-size: $font-body; color: $text-main; line-height: 1.8; white-space: pre-wrap; }
  }
  .pending-card {
    text-align: center; padding: 60rpx $card-padding;
    .pending-icon { font-size: 80rpx; display: block; margin-bottom: 16rpx; }
    .pending-text { font-size: $font-body; color: $text-sub; }
  }
}
</style>
