<!--
  pages/admin/vote-create.vue - 发起表决
  用途：管理员发起一事一议民主决策表决
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-vote-create">
    <view class="card">
      <view class="form-group">
        <text class="form-label required">表决标题</text>
        <input v-model="form.title" class="input"  :placeholder="t('placeholder.voteTitle', '如：关于修建村民文化广场的表决')" maxlength="50" />
      </view>
      <view class="form-group">
        <text class="form-label required">表决说明</text>
        <textarea v-model="form.description" class="textarea"  :placeholder="t('placeholder.voteDesc', '请描述表决事项的背景、方案、预算等')" maxlength="500" :auto-height="true" />
        <VoiceInput @result="onVoiceResult" />
      </view>
      <view class="form-group">
        <text class="form-label required">表决选项</text>
        <view v-for="(opt, i) in form.options" :key="i" class="opt-row">
          <input v-model="form.options[i]" class="input" :placeholder="`选项 ${i+1}`" maxlength="30" />
          <view v-if="form.options.length > 2" class="opt-del" @click="form.options.splice(i, 1)">×</view>
        </view>
        <view v-if="form.options.length < 6" class="opt-add" @click="form.options.push('')">+ 添加选项</view>
      </view>
      <view class="form-group">
        <text class="form-label">截止时间</text>
        <picker mode="date" :value="form.deadline" @change="form.deadline = $event.detail.value">
          <view class="picker-value">{{ form.deadline || t('placeholder.voteDeadline', '选择截止日期（默认7天后）') }} ▼</view>
        </picker>
      </view>
      <view class="form-group">
        <text class="form-label">投票范围</text>
        <picker mode="selector" :range="voterScopes" :value="voterScopeIndex" @change="voterScopeIndex = $event.detail.value">
          <view class="picker-value">{{ voterScopes[voterScopeIndex] }} ▼</view>
        </picker>
      </view>
    </view>

    <view class="bottom-bar">
      <BigButton :text="t('button.submit', '发起表决')" type="primary" @click="onSubmit" :disabled="!canSubmit" />
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

const form = reactive({
  title: '',
  description: '',
  options: ['', ''],
  deadline: '',
  voterScope: '村民代表'
})
const voterScopes = ['村民代表', '全体党员', '全体村民']
const voterScopeIndex = ref(0)

const canSubmit = computed(() => {
  return form.title && form.description.trim().length >= 5 &&
    form.options.length >= 2 &&
    form.options.every(o => o.trim())
})

onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
})

function onVoiceResult(text) { form.description += text }

async function onSubmit() {
  if (!canSubmit.value) return
  if (!acquireLock('admin_vote_create', 15000)) {
    uni.showToast({ title: '请勿重复提交', icon: 'none' })
    return
  }
  uni.showLoading({ title: '发起中...', mask: true })
  try {
    // 默认 7 天后截止
    let deadline = form.deadline
    if (!deadline) {
      const d = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      deadline = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
    }
    const res = await callFunction('createVote', {
      title: form.title,
      description: form.description,
      options: form.options,
      deadline,
      voterScope: voterScopes[voterScopeIndex.value]
    })
    if (res.success) {
      uni.showToast({ title: '表决已发起', icon: 'success' })
      setTimeout(() => uni.navigateBack(), 1500)
    }
  } catch (err) {
    console.error('[发起表决失败]:', err)
  } finally {
    releaseLock('admin_vote_create')
    uni.hideLoading()
  }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-vote-create { min-height: 100vh; background: $bg; padding: $page-padding; padding-bottom: 200rpx;
  .card { background: $white; border-radius: $card-radius; padding: $card-padding; box-shadow: $card-shadow;
    .form-group { margin-bottom: 32rpx;
      .form-label { font-size: $font-body; color: $text-main; display: block; margin-bottom: 12rpx; font-weight: bold;
        &.required::before { content: '* '; color: $danger; }
      }
      .input { width: 100%; height: $btn-height; background: $bg; border-radius: $radius-md; padding: 0 $space-lg; font-size: $font-body; box-sizing: border-box; }
      .textarea { width: 100%; min-height: 200rpx; background: $bg; border-radius: $radius-md; padding: $card-padding; font-size: $font-body; box-sizing: border-box; line-height: 1.6; }
      .picker-value { display: inline-block; padding: $space-md $space-lg; background: $bg; border-radius: $radius-md; font-size: $font-body; color: $text-main; }
    }
    .opt-row { display: flex; align-items: center; margin-bottom: 12rpx;
      .input { flex: 1; }
      .opt-del { width: 60rpx; height: 60rpx; line-height: 60rpx; text-align: center; color: $danger; font-size: $font-card-title; }
    }
    .opt-add { text-align: center; padding: $space-md; color: $primary; font-size: $font-sub; border: 2rpx dashed $primary; border-radius: $radius-md; }
  }
  .bottom-bar { position: fixed; bottom: 0; left: 0; right: 0; padding: $card-gap $page-padding; padding-bottom: calc(#{$card-gap} + env(safe-area-inset-bottom)); background: $white; box-shadow: $shadow-top; }
}
</style>
