<!--
  pages/admin/module-config.vue - 模块配置
  用途：村基础信息 / 常用电话 / 模块开关（tab/category/entry/homeBlock）/ 分配地图入口
  修复：原 useAdminGuard import 误置于 <style> 块，此处已移到 script
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-module-config">
    <view class="card">
      <view class="card-title">村基础信息</view>
      <view class="form-group">
        <text class="form-label">村名称</text>
        <input v-model="config.villageName" class="input"  :placeholder="t('placeholder.villageName', '村名称')" />
      </view>
      <view class="form-group">
        <text class="form-label">值班电话</text>
        <input v-model="config.villagePhone" class="input" placeholder="0571-XXXXXXX" />
      </view>
      <view class="form-group">
        <text class="form-label">办公时间</text>
        <input v-model="config.office_hours" class="input" placeholder="如：周一至周五 8:30-17:30" />
      </view>
      <view class="form-group">
        <text class="form-label">办公地址</text>
        <input v-model="config.office_address" class="input" placeholder="如：村委会一楼" />
      </view>
      <view class="form-group">
        <text class="form-label">今日值班电话</text>
        <input v-model="config.duty_phone" class="input" placeholder="值班人员电话" />
      </view>
      <view class="form-group">
        <text class="form-label">县城气象代码</text>
        <input v-model="config.county_code" class="input" placeholder="如：101010100（天气定位兜底）" />
      </view>
    </view>

    <view class="card dispatch-entry" @click="goDispatchConfig">
      <view class="entry-row">
        <view class="entry-icon">🗺️</view>
        <view class="entry-info">
          <text class="entry-title">工单分配地图</text>
          <text class="entry-desc">配置各类型工单对应责任人（姓名+管什么）</text>
        </view>
        <view class="entry-arrow">›</view>
      </view>
    </view>

    <view class="card">
      <view class="card-title">常用电话</view>
      <view v-for="p in config.phones" :key="p.key" class="phone-row">
        <text class="phone-role">{{ phoneName(p.key) }}</text>
        <input v-model="p.name" class="input small"  :placeholder="t('placeholder.name', '姓名')" />
        <input v-model="p.number" class="input small"  :placeholder="t('placeholder.phone', '电话')" />
      </view>
    </view>

    <view class="card">
      <view class="card-title">模块开关</view>
      <view v-for="g in moduleGroups" :key="g.key" class="module-group">
        <view class="group-label">{{ g.label }}</view>
        <view v-for="item in g.items" :key="item.key" class="module-item">
          <text class="module-name">{{ item.name }}</text>
          <uv-switch v-model="config.modules[g.key][item.key]" :activeValue="true" :inactiveValue="false" activeColor="#C41E24" />
        </view>
      </view>
    </view>

    <view class="bottom-bar">
      <BigButton  :text="t('button.saveConfig', '保存配置')" type="primary" :loading="saving" @click="onSave" />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, reactive, onMounted } from 'vue'
import { useConfigStore } from '@/store/config.js'
import { callFunction } from '@/utils/request.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
import BigButton from '@/components/BigButton.vue'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
const saving = ref(false)

const config = reactive({
  villageName: '示范村',
  villagePhone: '',
  office_hours: '',
  office_address: '',
  duty_phone: '',
  county_code: '',
  phones: [],
  modules: {
    tab: { home: true, service: true, message: true, mine: true },
    category: { info: true, complaint: true, study: true, service: true, life: true },
    entry: {
      feedback: true, snapshot: true, mailbox: true, broadcast: true, notice: true,
      news: true, finance: true, project: true, market: true, task: true, team: true,
      meeting: true, guide: true, lostFound: true, calendar: true, checkin: true,
      message: true, report: true, leader: true, vote: false
    },
    homeBlock: { secretary: true, phone: true, category: true, leader: true, notice: true, news: true }
  }
})

const homeBlockLabels = {
  secretary: '书记直达', phone: '常用电话', category: '服务分类',
  leader: '书记风采', notice: '最新公示', news: '最新新闻'
}

const entryLabels = {
  feedback: '我要反映', snapshot: '随手拍', mailbox: '书记信箱', broadcast: '书记广播',
  notice: '村务公开', news: '村里事', finance: '财务公示', project: '项目收益',
  market: '惠农信息', task: '政策落实', team: '村委', meeting: '会议记录',
  guide: '办事指南', lostFound: '失物招领', calendar: '农事日历', checkin: '留守签到',
  message: '消息中心', report: '反映问题', leader: '书记风采', vote: '投票表决'
}

const moduleGroups = ref([
  { key: 'tab', label: '底部导航', items: [
    { key: 'home', name: '村里' }, { key: 'service', name: '办事' },
    { key: 'message', name: '村委' }, { key: 'mine', name: '我的' } ] },
  { key: 'category', label: '大类', items: [] },
  { key: 'entry', label: '入口', items: [] },
  { key: 'homeBlock', label: '首页区块', items: [] }
])

function phoneName(key) {
  return configStore.getDisplay('phone.' + key, key)
}

onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
  await configStore.loadConfig()
  buildModuleGroups()
  loadConfig()
})

function buildModuleGroups() {
  const dn = configStore.displayNames
  const cat = moduleGroups.value.find(g => g.key === 'category')
  cat.items = Object.keys(config.modules.category).map(k => ({ key: k, name: dn.category[k] || k }))
  const entry = moduleGroups.value.find(g => g.key === 'entry')
  entry.items = Object.keys(config.modules.entry).map(k => ({ key: k, name: entryLabels[k] || k }))
  const hb = moduleGroups.value.find(g => g.key === 'homeBlock')
  hb.items = Object.keys(config.modules.homeBlock).map(k => ({ key: k, name: homeBlockLabels[k] || k }))
}

function loadConfig() {
  config.villageName = configStore.villageName || '示范村'
  config.villagePhone = configStore.villagePhone || ''
  config.office_hours = configStore.office_hours || ''
  config.office_address = configStore.office_address || ''
  config.duty_phone = configStore.duty_phone || ''
  config.county_code = configStore.county_code || ''
  config.phones = JSON.parse(JSON.stringify(configStore.phones || []))
  if (configStore.modules) {
    config.modules = JSON.parse(JSON.stringify(configStore.modules))
  }
}

function goDispatchConfig() {
  uni.navigateTo({ url: '/pages/admin/dispatch-config' })
}

async function onSave() {
  saving.value = true
  try {
    const res = await callFunction('updateModuleConfig', {
      villageName: config.villageName,
      villagePhone: config.villagePhone,
      villageInfo: {
        office_hours: config.office_hours,
        office_address: config.office_address,
        duty_phone: config.duty_phone,
        county_code: config.county_code
      },
      phones: config.phones,
      uiModules: config.modules
    })
    if (res.success) {
      configStore.villageName = config.villageName
      configStore.villagePhone = config.villagePhone
      configStore.office_hours = config.office_hours
      configStore.office_address = config.office_address
      configStore.duty_phone = config.duty_phone
      configStore.county_code = config.county_code
      configStore.phones = JSON.parse(JSON.stringify(config.phones))
      configStore.modules = JSON.parse(JSON.stringify(config.modules))
      uni.showToast({ title: '配置已保存', icon: 'success' })
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

.page-module-config {
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

  .dispatch-entry {
    .entry-row { display: flex; align-items: center; }
    .entry-icon { font-size: 56rpx; margin-right: 16rpx; }
    .entry-info { flex: 1;
      .entry-title { font-size: $font-card-title; font-weight: bold; color: $text-main; display: block; }
      .entry-desc { font-size: $font-sub; color: $text-sub; }
    }
    .entry-arrow { font-size: $font-number; color: $text-weak; }
    &:active { background: $bg; }
  }

  .card-title {
    font-size: $font-card-title;
    font-weight: bold;
    color: $text-main;
    border-left: 8rpx solid $primary;
    padding-left: 16rpx;
    margin-bottom: 24rpx;
  }

  .form-group {
    margin-bottom: 32rpx;
    .form-label {
      font-size: $font-body;
      color: $text-main;
      display: block;
      margin-bottom: 12rpx;
      font-weight: bold;
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

  .module-group {
    margin-bottom: 24rpx;

    .group-label {
      font-size: $font-sub;
      color: $primary;
      font-weight: bold;
      margin-bottom: 8rpx;
    }
  }

  .module-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: $btn-height;
    border-bottom: 2rpx solid $border;

    &:last-child { border-bottom: none; }

    .module-name { font-size: $font-body; color: $text-main; }
  }

  .phone-row {
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin-bottom: 16rpx;

    .phone-role {
      width: 140rpx;
      font-size: $font-body;
      color: $text-main;
      font-weight: bold;
    }

    .input.small {
      flex: 1;
      height: 80rpx;
      background: $bg;
      border-radius: $radius-sm;
      padding: 0 $space-md;
      font-size: $font-sub;
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
