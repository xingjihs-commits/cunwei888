<!--
  pages/admin/meeting-create.vue - 创建会议
  用途：书记创建村务会议
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-meeting-create">
    <view class="card">
      <view class="form-group">
        <text class="form-label required">{{ t('meetingCreate.title', '会议标题') }}</text>
        <input v-model="form.title" class="input" :placeholder="t('placeholder.meetingTitle', '如：2024年第二季度村两委会议')" maxlength="50" />
      </view>
      <view class="form-group">
        <text class="form-label required">{{ t('meetingCreate.typeLabel', '会议类型') }}</text>
        <picker mode="selector" :range="meetingTypes" :value="typeIndex" @change="typeIndex = $event.detail.value">
          <view class="picker-value">{{ meetingTypes[typeIndex] }} ▼</view>
        </picker>
      </view>
      <view class="form-group">
        <text class="form-label required">{{ t('meetingCreate.timeLabel', '会议时间') }}</text>
        <picker mode="multiSelector" :value="form.datetimeIdx" :range="dateRange" @change="onTimeChange" @columnchange="onColChange">
          <view class="picker-value">{{ form.datetimeLabel || t('meetingCreate.selectTime', '选择会议时间') }} ▼</view>
        </picker>
      </view>
      <view class="form-group">
        <text class="form-label required">{{ t('meetingCreate.locationLabel', '会议地点') }}</text>
        <input v-model="form.location" class="input" :placeholder="t('placeholder.meetingLocation', '如：村委会会议室')" maxlength="50" />
      </view>
      <view class="form-group">
        <text class="form-label">{{ t('meetingCreate.attendeesLabel', '参会人员（用逗号分隔）') }}</text>
        <textarea v-model="form.attendeesText" class="textarea" :placeholder="t('placeholder.meetingAttendees', '如：张书记,李主任,王委员')" maxlength="200" :auto-height="true" />
      </view>
      <view class="form-group">
        <text class="form-label">{{ t('meetingCreate.agendaLabel', '会议议程') }}</text>
        <textarea v-model="form.agenda" class="textarea" :placeholder="t('placeholder.meetingAgenda', '请描述会议议程（选填）')" maxlength="500" :auto-height="true" />
        <VoiceInput @result="onVoiceResult" />
      </view>
      <view class="form-group">
        <text class="form-label">{{ t('meetingCreate.contentLabel', '会议内容') }}</text>
        <textarea v-model="form.content" class="textarea" :placeholder="t('placeholder.meetingContent', '请描述会议内容（选填）')" maxlength="500" :auto-height="true" />
      </view>
    </view>

    <view class="bottom-bar">
      <BigButton :text="t('button.submit', '创建会议')" type="primary" @click="onSubmit" :disabled="!canSubmit" />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, reactive, computed, onMounted } from 'vue'
import { callFunction, acquireLock, releaseLock } from '@/utils/request.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
import BigButton from '@/components/BigButton.vue'
import VoiceInput from '@/components/VoiceInput.vue'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const meetingTypes = ['村委会议', '支部会议', '村民代表大会', '专题会议']
const typeIndex = ref(0)

// 简化日期选择：用 date picker
const form = reactive({
  title: '',
  meetingTime: '',
  location: '',
  attendeesText: '',
  agenda: '',
  content: '',
  datetimeIdx: [0, 0],
  datetimeLabel: ''
})

// 多级选择器日期范围（今天起 30 天）
const today = new Date()
const dateRange = [
  Array.from({length: 30}, (_, i) => {
    const d = new Date(today.getTime() + i * 86400000)
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
  }),
  Array.from({length: 24}, (_, i) => `${String(i).padStart(2,'0')}:00`)
]

const canSubmit = computed(() => form.title && form.meetingTime && form.location)

onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
})

function onColChange() {}
function onTimeChange(e) {
  const [d, h] = e.detail.value
  form.datetimeLabel = dateRange[0][d] + ' ' + dateRange[1][h]
  form.meetingTime = new Date(dateRange[0][d] + 'T' + dateRange[1][h] + ':00').toISOString()
}

function onVoiceResult(text) { form.agenda += text }

async function onSubmit() {
  if (!canSubmit.value) return
  if (!acquireLock('admin_meeting_create', 15000)) {
    uni.showToast({ title: '请勿重复提交', icon: 'none' })
    return
  }
  uni.showLoading({ title: '创建中...', mask: true })
  try {
    const attendees = form.attendeesText.split(/[,，\s]+/).filter(s => s.trim())
    const res = await callFunction('createMeeting', {
      title: form.title,
      type: meetingTypes[typeIndex.value],
      meetingTime: form.meetingTime,
      location: form.location,
      attendees,
      agenda: form.agenda,
      content: form.content
    })
    if (res.success) {
      uni.showToast({ title: '会议已创建', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1500)
    }
  } catch (err) {
    console.error('[创建会议失败]:', err)
  } finally {
    releaseLock('admin_meeting_create')
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
.page-meeting-create { min-height: 100vh; background: $bg; padding: $page-padding; padding-bottom: 200rpx;
  .card { background: $white; border-radius: $card-radius; padding: $card-padding; box-shadow: $card-shadow;
    .form-group { margin-bottom: 32rpx;
      .form-label { font-size: $font-body; color: $text-main; display: block; margin-bottom: 12rpx; font-weight: bold;
        &.required::before { content: '* '; color: $danger; }
      }
      .input { width: 100%; height: $btn-height; background: $bg; border-radius: $radius-md; padding: 0 $space-lg; font-size: $font-body; box-sizing: border-box; }
      .textarea { width: 100%; min-height: 200rpx; background: $bg; border-radius: $radius-md; padding: $card-padding; font-size: $font-body; box-sizing: border-box; line-height: 1.6; }
      .picker-value { display: inline-block; padding: $space-md $space-lg; background: $bg; border-radius: $radius-md; font-size: $font-body; color: $text-main; }
    }
  }
  .bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; padding: $card-gap $page-padding; padding-bottom: calc(#{$card-gap} + env(safe-area-inset-bottom)); background: $white; box-shadow: $shadow-top; }
}
</style>
