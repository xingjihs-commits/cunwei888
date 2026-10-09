<!--
  pages/report/index.vue - 举报页面
  用途：村民对 news/notice/record/snapshot 等内容举报
  入参（通过 url query）：targetType, targetId, targetTitle
-->
<template>
  <view class="report-page">
    <view class="target-card">
      <view class="target-label">举报对象</view>
      <view class="target-title">{{ targetTitle || t('emptyState.noTitleContent', '无标题内容') }}</view>
      <view class="target-meta">类型：{{ targetTypeText }}</view>
    </view>

    <view class="form-section">
      <view class="form-label required">举报理由</view>
      <view class="reason-list">
        <view
          v-for="r in reasonOptions"
          :key="r"
          class="reason-item"
          :class="{ active: form.reason === r }"
          @tap="form.reason = r"
        >
          <text>{{ r }}</text>
        </view>
      </view>
    </view>

    <view class="form-section">
      <view class="form-label">补充说明（可选）</view>
      <textarea
        v-model="form.content"
        class="form-textarea"
        :placeholder="t('placeholder.reportDesc', '请描述具体情况，最多500字')"
        maxlength="500"
        :auto-height="true"
      />
      <view class="char-count">{{ form.content.length }}/500</view>
    </view>

    <view class="form-section">
      <view class="form-label">您的身份（可选）</view>
      <view class="anonymous-toggle">
        <text class="toggle-label">匿名举报</text>
        <switch :checked="form.anonymous" @change="form.anonymous = $event.detail.value" color="#C41E24" />
      </view>
      <view v-if="!form.anonymous && userStore.isLoggedIn" class="reporter-info">
        <text>举报人：{{ userStore.displayName }}</text>
      </view>
    </view>

    <view class="form-section">
      <view class="tips">
        <text class="tips-title">温馨提示：</text>
        <text class="tips-text">1. 我们承诺 3 个工作日内处理您的举报。</text>
        <text class="tips-text">2. 恶意举报将被记录，多次恶意举报将限制账号使用。</text>
        <text class="tips-text">3. 举报人身份信息保密，仅管理员可见。</text>
      </view>
    </view>

    <BigButton :text="t('button.submit', '提交举报')" :disabled="!form.reason || submitting" @click="handleSubmit" />

    <view v-if="submitting" class="loading-mask">
      <view class="loading-text">提交中...</view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user.js'
import { callFunction, acquireLock, releaseLock } from '@/utils/request.js'
import { requestSubscribe } from '@/utils/subscribe.js'
import BigButton from '@/components/BigButton.vue'
import { useConfigStore } from '@/store/config.js'
import { ensureAuth, AUTH_VERIFIED } from '@/utils/auth.js'

const userStore = useUserStore()
const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const targetType = ref('')
const targetId = ref('')
const targetTitle = ref('')
const form = ref({
  reason: '',
  content: '',
  anonymous: false
})
const submitting = ref(false)

const reasonOptions = [
  '色情低俗',
  '政治敏感',
  '谣言欺诈',
  '侮辱谩骂',
  '垃圾广告',
  '侵权抄袭',
  '不实信息',
  '其他'
]

const targetTypeText = computed(() => {
  const map = {
    news: '村务新闻',
    notice: '信息公示',
    record: '工单/反映',
    snapshot: '随手拍',
    broadcast: '书记广播',
    vote: '表决',
    meeting: '会议',
    lost_found: '失物招领'
  }
  return map[targetType.value] || targetType.value
})

onLoad((options) => {
  if (!ensureAuth(AUTH_VERIFIED)) return
  targetType.value = options.targetType || ''
  targetId.value = options.targetId || ''
  targetTitle.value = decodeURIComponent(options.targetTitle || '')
})

async function handleSubmit() {
  requestSubscribe([configStore.subscribeTemplates && configStore.subscribeTemplates.status_update])
  if (!form.value.reason) {
    uni.showToast({ title: '请选择举报理由', icon: 'none' })
    return
  }
  if (!targetType.value || !targetId.value) {
    uni.showToast({ title: '举报对象信息缺失', icon: 'none' })
    return
  }

  if (!acquireLock('submit_report', 10000)) {
    uni.showToast({ title: '请勿重复提交', icon: 'none' })
    return
  }

  submitting.value = true
  try {
    const res = await callFunction('submitReport', {
      targetType: targetType.value,
      targetId: targetId.value,
      reason: form.value.reason,
      content: form.value.content,
      anonymous: form.value.anonymous
    })
    if (res.success) {
      uni.showToast({ title: '举报已提交', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1500)
    }
  } catch (err) {
    console.error('举报失败:', err)
  } finally {
    submitting.value = false
    releaseLock('submit_report')
  }
}
</script>

<style lang="scss" scoped>
.report-page {
  min-height: 100vh;
  background-color: $bg;
  padding: $spacing-md;
  padding-bottom: 200rpx;
}

.target-card {
  background-color: $white;
  border-radius: $card-radius;
  padding: $spacing-md;
  margin-bottom: $spacing-md;
  box-shadow: $card-shadow;
}

.target-label {
  font-size: $font-small;
  color: $text-weak;
  margin-bottom: $spacing-xs;
}

.target-title {
  font-size: $font-h3;
  color: $text-main;
  font-weight: 600;
  margin-bottom: $spacing-xs;
}

.target-meta {
  font-size: $font-small;
  color: $text-sub;
}

.form-section {
  background-color: $white;
  border-radius: $card-radius;
  padding: $spacing-md;
  margin-bottom: $spacing-md;
  box-shadow: $card-shadow;
}

.form-label {
  font-size: $font-body;
  color: $text-main;
  margin-bottom: $spacing-sm;

  &.required::before {
    content: '* ';
    color: $danger;
  }
}

.reason-list {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
}

.reason-item {
  padding: $spacing-xs $spacing-md;
  background-color: $bg;
  border: 1px solid $border;
  border-radius: $radius-full;
  font-size: $font-small;
  color: $text-sub;

  &.active {
    background-color: $primary;
    color: $white;
    border-color: $primary;
  }
}

.form-textarea {
  width: 100%;
  min-height: 200rpx;
  padding: $spacing-sm;
  background-color: $bg;
  border: 1px solid $border;
  border-radius: $card-radius;
  font-size: $font-body;
  color: $text-main;
  line-height: 1.6;
}

.char-count {
  text-align: right;
  font-size: $font-small;
  color: $text-weak;
  margin-top: $spacing-xs;
}

.anonymous-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-sm 0;
}

.toggle-label {
  font-size: $font-body;
  color: $text-main;
}

.reporter-info {
  margin-top: $spacing-sm;
  padding: $spacing-sm;
  background-color: $bg;
  border-radius: $card-radius;
  font-size: $font-small;
  color: $text-sub;
}

.tips {
  padding: $spacing-sm;
  background-color: rgba(255, 193, 7, 0.1);
  border-radius: $card-radius;
}

.tips-title {
  display: block;
  font-size: $font-small;
  color: $warning;
  font-weight: 600;
  margin-bottom: $spacing-xs;
}

.tips-text {
  display: block;
  font-size: $font-small;
  color: $text-sub;
  line-height: 1.8;
}

.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.loading-text {
  color: $white;
  font-size: $font-body;
}
</style>
