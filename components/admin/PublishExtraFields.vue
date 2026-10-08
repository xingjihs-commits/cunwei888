<!--
  components/admin/PublishExtraFields.vue - 内容发布「按类型显示的额外字段」
  由 pages/admin/publish.vue 抽取（控制单文件 ≤500 行）
  直接读写父组件传入的 reactive form（保持原行为）
-->
<template>
  <view class="extra-fields">
    <template v-if="type === 'notice'">
      <view class="form-group">
        <text class="form-label">责任人</text>
        <input v-model="form.responsible" class="input"  :placeholder="t('placeholder.responsiblePerson', '责任人姓名')" />
      </view>
      <view class="form-group">
        <view class="check-row" @click="form.audited = !form.audited">
          <view class="check-box" :class="{ checked: form.audited }">
            <text v-if="form.audited" class="check-icon">✓</text>
          </view>
          <text>经村务监督委员会审核</text>
        </view>
      </view>
    </template>

    <template v-if="type === 'project'">
      <view class="form-group">
        <text class="form-label">总收益（元）</text>
        <input v-model="form.totalAmount" class="input" type="digit" placeholder="0.00" />
      </view>
      <view class="form-group">
        <text class="form-label">受益群众</text>
        <input v-model="form.beneficiaries" class="input"  :placeholder="t('placeholder.household', '如：全村XXX户')" />
      </view>
    </template>

    <template v-if="type === 'market'">
      <view class="form-group">
        <text class="form-label">农产品名称</text>
        <input v-model="form.productName" class="input"  :placeholder="t('placeholder.productRice', '如：水稻')" />
      </view>
      <view class="form-group">
        <text class="form-label">价格</text>
        <input v-model="form.price" class="input" type="digit" placeholder="0.00" />
      </view>
      <view class="form-group">
        <text class="form-label">单位</text>
        <input v-model="form.unit" class="input"  :placeholder="t('placeholder.priceUnit', '如：元/斤')" />
      </view>
      <view class="form-group">
        <text class="form-label">市场</text>
        <input v-model="form.market" class="input"  :placeholder="t('placeholder.marketName', '如：村集市')" />
      </view>
    </template>

    <template v-if="type === 'task'">
      <view class="form-group">
        <text class="form-label">责任人</text>
        <input v-model="form.assignee" class="input"  :placeholder="t('placeholder.responsiblePerson', '责任人姓名')" />
      </view>
      <view class="form-group">
        <text class="form-label">截止时间</text>
        <picker mode="date" :value="form.deadline" @change="form.deadline = $event.detail.value">
          <view class="picker-value">{{ form.deadline || t('placeholder.selectDeadline', '选择截止日期') }} ▼</view>
        </picker>
      </view>
      <view class="form-group">
        <text class="form-label">紧急程度</text>
        <view class="urgent-row">
          <view
            v-for="item in urgentOptions"
            :key="item.value"
            class="urgent-item"
            :class="{ active: form.urgentLevel === item.value }"
            @click="form.urgentLevel = item.value"
          >{{ item.label }}</view>
        </view>
      </view>
    </template>
  </view>
</template>

<script setup>
import { useConfigStore } from '@/store/config.js'

const configStore = useConfigStore()
function t(p, d = '') { return configStore.getDisplay(p, d) }

defineProps({
  type: { type: String, default: 'news' },
  form: { type: Object, required: true },
  urgentOptions: { type: Array, default: () => [] }
})
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.extra-fields {
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

    .picker-value {
      display: inline-block;
      padding: $space-md $space-lg;
      background: $bg;
      border-radius: $radius-md;
      font-size: $font-body;
      color: $text-main;
    }

    .check-row {
      display: flex;
      align-items: center;

      .check-box {
        width: 40rpx;
        height: 40rpx;
        border: 4rpx solid $border;
        border-radius: $radius-sm;
        margin-right: 12rpx;
        display: flex;
        align-items: center;
        justify-content: center;

        &.checked {
          background: $primary;
          border-color: $primary;

          .check-icon {
            color: $white;
            font-size: $font-sub;
            font-weight: bold;
          }
        }
      }

      text {
        font-size: $font-body;
        color: $text-main;
      }
    }

    .urgent-row {
      display: flex;
      gap: 16rpx;

      .urgent-item {
        flex: 1;
        height: $btn-height;
        line-height: $btn-height;
        text-align: center;
        background: $bg;
        border: 4rpx solid $border;
        border-radius: $radius-md;
        font-size: $font-body;
        color: $text-main;

        &.active {
          border-color: $primary;
          background: $primary-light;
          color: $primary;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
