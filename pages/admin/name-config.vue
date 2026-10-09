<!--
  pages/admin/name-config.vue - 名称配置
  用途：分 11 组编辑 display_names，保存后写入 module_config.display_names，立即生效
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-name-config">
    <view v-for="g in groups" :key="g.key" class="card">
      <view class="card-title">{{ g.label }} <text class="card-key">{{ g.key }}</text></view>
      <view v-for="(val, k) in local[g.key]" :key="k" class="form-group">
        <text class="form-label">{{ k }}</text>
        <input v-model="local[g.key][k]" class="input" :placeholder="k" />
      </view>
    </view>

    <view class="bottom-bar">
      <BigButton :text="t('button.save', '保存名称配置')" type="primary" :loading="saving" @click="onSave" />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, onMounted } from 'vue'
import { useConfigStore } from '@/store/config.js'
import { callFunction } from '@/utils/request.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
import BigButton from '@/components/BigButton.vue'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }
const saving = ref(false)
const local = ref({})

const groupLabels = {
  tab: '底部导航',
  category: '大类',
  subCategory: '小类',
  entry: '入口',
  pageTitle: '页面标题',
  button: '按钮',
  status: '状态',
  messageType: '消息类型',
  menuGroup: '菜单分组',
  emptyState: '空状态',
  phone: '常用电话'
}
const groups = Object.keys(groupLabels).map(k => ({ key: k, label: groupLabels[k] }))

onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
  local.value = JSON.parse(JSON.stringify(configStore.displayNames))
})

async function onSave() {
  saving.value = true
  try {
    const res = await callFunction('updateModuleConfig', { displayNames: local.value })
    if (res.success) {
      configStore.displayNames = JSON.parse(JSON.stringify(local.value))
      uni.showToast({ title: '已保存，立即生效', icon: 'success' })
    } else {
      uni.showToast({ title: res.message || '保存失败', icon: 'none' })
    }
  } catch (err) {
    console.error('保存失败:', err)
    uni.showToast({ title: '保存失败', icon: 'none' })
  } finally {
    saving.value = false
  }
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-name-config {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  padding-bottom: 200rpx;
  box-sizing: border-box;

  .card {
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
  }

  .card-title {
    font-size: $font-card-title;
    font-weight: bold;
    color: $text-main;
    border-left: 8rpx solid $primary;
    padding-left: 16rpx;
    margin-bottom: 24rpx;

    .card-key { font-size: $font-micro; color: $text-weak; font-weight: normal; }
  }

  .form-group {
    margin-bottom: 24rpx;

    .form-label {
      font-size: $font-sub;
      color: $text-sub;
      display: block;
      margin-bottom: 8rpx;
    }

    .input {
      width: 100%;
      height: $btn-height;
      background: $bg;
      border-radius: $radius-md;
      padding: 0 $space-lg;
      font-size: $font-body;
      box-sizing: border-box;
    }
  }

  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: $card-gap $page-padding;
    padding-bottom: calc(#{$card-gap} + env(safe-area-inset-bottom));
    background: $white;
    box-shadow: $shadow-top;
  }
}
</style>
