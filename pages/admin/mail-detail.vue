<!--
  pages/admin/mail-detail.vue - 信件详情（管理员视角，含回信）
  用途：书记查看信件详情并回信
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-mail-detail" v-if="mail.subject || mail.content">
    <view class="card">
      <text class="subject">{{ mail.subject }}</text>
      <view class="meta">
        <text>{{ mail.isAnonymous ? t('mail.anonymous', '匿名') : t('mail.named', '署名信件') }}</text>
        <text>{{ formatDate(mail.createTime) }}</text>
        <text v-if="mail.urgentLevel" class="urgent-tag">{{ urgentText(mail.urgentLevel) }}</text>
      </view>
    </view>

    <view class="card">
      <view class="card-title">{{ t('mail.contentLabel', '来信内容') }}</view>
      <text class="content">{{ mail.content }}</text>
    </view>

    <view v-if="mail.reply" class="card reply-card">
      <view class="card-title">{{ t('mail.replyRecord', '回信记录') }}</view>
      <text class="reply-text">{{ mail.reply }}</text>
      <text class="reply-time">{{ t('mail.replyTimeLabel', '回复时间') }}：{{ formatDate(mail.replyTime) }}</text>
    </view>

    <view v-if="!mail.reply || canReReply" class="card reply-form">
      <view class="card-title">{{ mail.reply ? t('mail.replyMore', '追加回信') : t('mail.replyTitle', '书记回信') }}</view>
      <textarea v-model="replyText" class="textarea" :placeholder="t('placeholder.replyContent', '请输入回信内容')" maxlength="2000" :auto-height="true" />
      <view class="form-row">
        <view class="check-box" :class="{checked: isPublic}" @click="isPublic = !isPublic">
          <text v-if="isPublic" class="check-icon">✓</text>
        </view>
        <text>{{ t('mail.publicReplyTip', '公开回信（其他村民可在广播墙看到本次回信）') }}</text>
      </view>
      <BigButton :text="t('button.sendReply', '发送回信')" type="primary" @click="onReply" :disabled="!replyText.trim()" />
    </view>

    <view style="height: 140rpx;"></view>
  </view>
  <view v-else-if="loadError" class="error-state">
    <text class="error-icon">⚠️</text>
    <text class="error-text">{{ t('emptyState.loadFailed', '加载失败') }}</text>
    <view class="retry-btn" @click="loadData">{{ t('button.reload', '重新加载') }}</view>
  </view>
  <view v-else class="loading">{{ t('emptyState.loading', '加载中...') }}</view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { callFunction, acquireLock, releaseLock } from '@/utils/request.js'
import { formatDate, urgentText } from '@/utils/format.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
import BigButton from '@/components/BigButton.vue'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const mail = ref({})
const mailId = ref('')
const replyText = ref('')
const isPublic = ref(false)
const loadError = ref(false)
const canReReply = computed(() => mail.value.status === '已回复' || mail.value.status === 'replied')

onLoad((options) => { mailId.value = options.id })
onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
  loadData()
})

async function loadData() {
  if (!mailId.value) return
  loadError.value = false
  try {
    // 复用 getMyMails 单条查询，或单独获取
    const res = await callFunction('getMyMails', { mailId: mailId.value })
    if (res.success && res.data) {
      mail.value = res.data
    } else {
      loadError.value = true
    }
  } catch (err) {
    console.error('[mail-detail 加载失败]:', err)
    loadError.value = true
  }
}

async function onReply() {
  if (!replyText.value.trim()) return
  if (!acquireLock('admin_reply_mail', 15000)) {
    uni.showToast({ title: '请勿重复提交', icon: 'none' })
    return
  }
  uni.showLoading({ title: '发送中...', mask: true })
  try {
    const res = await callFunction('replySecretaryMail', {
      mailId: mailId.value,
      reply: replyText.value,
      isPublic: isPublic.value
    })
    if (res.success) {
      uni.showToast({ title: '回信已发送', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1500)
    }
  } catch (err) {
    console.error('[回信失败]:', err)
  } finally {
    releaseLock('admin_reply_mail')
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
.page-mail-detail { min-height: 100vh; background: $bg; padding: $page-padding; padding-bottom: 200rpx;
  .card { background: $white; border-radius: $card-radius; padding: $card-padding; box-shadow: $card-shadow; margin-bottom: $card-gap;
    .subject { font-size: $font-title; font-weight: bold; color: $text-main; display: block; margin-bottom: 16rpx; line-height: 1.4; }
    .meta { display: flex; gap: 16rpx; font-size: $font-sub; color: $text-weak; flex-wrap: wrap;
      .urgent-tag { padding: 2rpx 12rpx; background: rgba(198,40,40,0.1); color: $danger; border-radius: $radius-sm; }
    }
    .card-title { font-size: $font-card-title; font-weight: bold; color: $text-main; border-left: 8rpx solid $primary; padding-left: 16rpx; margin-bottom: 24rpx; }
    .content { font-size: $font-body; color: $text-main; line-height: 1.8; white-space: pre-wrap; }
  }
  .reply-card { background: rgba(46,125,50,0.05);
    .reply-text { font-size: $font-body; color: $text-main; line-height: 1.8; white-space: pre-wrap; display: block; margin-bottom: 16rpx; }
    .reply-time { font-size: $font-sub; color: $text-weak; display: block; }
  }
  .reply-form {
    .textarea { width: 100%; min-height: 240rpx; background: $bg; border-radius: $radius-md; padding: $card-padding; font-size: $font-body; box-sizing: border-box; line-height: 1.6; margin-bottom: 24rpx; }
    .form-row { display: flex; align-items: center; margin-bottom: 24rpx;
      .check-box { width: 40rpx; height: 40rpx; border: 4rpx solid $border; border-radius: $radius-sm; margin-right: 12rpx; display: flex; align-items: center; justify-content: center;
        &.checked { background: $primary; border-color: $primary;
          .check-icon { color: $white; font-size: $font-sub; font-weight: bold; }
        }
      }
    }
  }
  .loading, .error-state { text-align: center; padding: 200rpx 0; color: $text-weak; font-size: $font-body; }
  .error-state {
    .error-icon { display: block; font-size: 80rpx; margin-bottom: 24rpx; }
    .error-text { display: block; margin-bottom: 24rpx; }
    .retry-btn { display: inline-block; padding: $space-sm 48rpx; background: $primary; color: $white; border-radius: $btn-radius; }
  }
}
</style>
