<!--
  pages/admin/responsible.vue - 责任人管理
  用途：管理员管理工单承办人名单
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-responsible">
    <view class="card">
      <view class="card-title">责任人列表</view>
      <view class="member-list">
        <view v-for="(item, i) in list" :key="i" class="member-item">
          <view class="member-info">
            <text class="member-name">{{ item.name }}</text>
            <text class="member-role">{{ item.role }}</text>
          </view>
          <view class="member-stats">
            <text class="stat-text">{{ item.total || 0 }}件</text>
            <text class="stat-text">{{ item.completed || 0 }}完成</text>
          </view>
          <view class="del-btn" @click="removeMember(i)">×</view>
        </view>
        <EmptyState v-if="list.length === 0" :text="t('emptyState.noData', '暂无责任人')" icon="👥" actionText="添加" @action="showAddDialog" />
      </view>
    </view>
    
    <view class="card">
      <view class="card-title">添加责任人</view>
      <view class="form-group">
        <text class="form-label">姓名</text>
        <input v-model="newMember.name" class="input"  :placeholder="t('placeholder.responsiblePerson', '责任人姓名')" />
      </view>
      <view class="form-group">
        <text class="form-label">职务</text>
        <input v-model="newMember.role" class="input"  :placeholder="t('placeholder.assigneeRole', '如：村委委员')" />
      </view>
      <view class="form-group">
        <text class="form-label">联系电话</text>
        <input v-model="newMember.phone" class="input" type="number"  :placeholder="t('placeholder.mobile', '手机号')" />
      </view>
      <BigButton  :text="t('button.add', '添加')" type="primary" @click="addMember" :disabled="!newMember.name" />
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { ref, reactive, onMounted } from 'vue'
import { callFunction } from '@/utils/request.js'
import BigButton from '@/components/BigButton.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useConfigStore } from '@/store/config.js'
import { useAdminGuard } from '@/composables/useAdminGuard.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

const list = ref([])
const newMember = reactive({
  name: '',
  role: '',
  phone: ''
})

onMounted(async () => {
  const { ensureAdmin } = useAdminGuard()
  if (!(await ensureAdmin())) return
  loadData()
})

async function loadData() {
  try {
    const res = await callFunction('getTeamMembers', { type: 'responsible' })
    if (res.success) {
      list.value = res.data
    }
  } catch (err) {
    console.error('加载失败:', err)
  }
}

async function addMember() {
  if (!newMember.name) return
  
  try {
    const res = await callFunction('publishTeamMember', {
      name: newMember.name,
      role: newMember.role,
      type: 'responsible',
      phone: newMember.phone
    })
    
    if (res.success) {
      uni.showToast({ title: '添加成功', icon: 'success' })
      newMember.name = ''
      newMember.role = ''
      newMember.phone = ''
      loadData()
    }
  } catch (err) {
    console.error('添加失败:', err)
  }
}

function removeMember(i) {
  uni.showModal({
    title: '确认',
    content: `删除责任人「${list.value[i].name}」？`,
    success(res) {
      if (res.confirm) {
        list.value.splice(i, 1)
        uni.showToast({ title: '已删除', icon: 'success' })
      }
    }
  })
}

function showAddDialog() {
  // 滚动到添加表单
}
</script>

<style lang="scss" scoped>
@import '@/uni.scss';
.page-responsible {
  min-height: 100vh;
  background: $bg;
  padding: $page-padding;
  
  .card {
    background: $white;
    border-radius: $card-radius;
    padding: $card-padding;
    box-shadow: $card-shadow;
    margin-bottom: $card-gap;
    
    .card-title {
      font-size: $font-card-title;
      font-weight: bold;
      color: $text-main;
      border-left: 8rpx solid $primary;
      padding-left: 16rpx;
      margin-bottom: 24rpx;
    }
    
    .member-list {
      .member-item {
        display: flex;
        align-items: center;
        padding: $space-md 0;
        border-bottom: 2rpx solid $border;
        
        &:last-child { border-bottom: none; }
        
        .member-info {
          flex: 1;
          
          .member-name {
            font-size: $font-body;
            font-weight: bold;
            color: $text-main;
            display: block;
          }
          
          .member-role {
            font-size: $font-sub;
            color: $text-sub;
          }
        }
        
        .member-stats {
          display: flex;
          gap: 16rpx;
          margin-right: 16rpx;
          
          .stat-text {
            font-size: $font-sub;
            color: $text-sub;
          }
        }
        
        .del-btn {
          width: 60rpx;
          height: 60rpx;
          line-height: 60rpx;
          text-align: center;
          background: rgba(198,40,40,0.1);
          color: $danger;
          border-radius: $radius-full;
          font-size: $font-body;
        }
      }
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
  }
}
</style>
