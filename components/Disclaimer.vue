<!--
  Disclaimer.vue - 免责声明组件
  用途：在反映、随手拍等提交页底部显示治理留痕声明
-->
<template>
  <view class="disclaimer">
    <view class="disclaimer-title">
      <text class="title-icon">⚠️</text>
      <text class="title-text">温馨提示</text>
    </view>
    <view class="disclaimer-body">
      <text class="body-text">
        本平台仅作线上公示、征集、流转之用，不替代法定程序。如遇紧急情况（火灾、急病、治安等），请直接拨打110、120、119等紧急电话或村值班电话。
      </text>
      <text v-if="content" class="body-text">{{ content }}</text>
    </view>
  </view>
</template>

<script setup>
defineProps({
  // 额外声明内容
  content: { type: String, default: '' }
})
</script>

<style lang="scss" scoped>

.disclaimer {
  margin: $card-gap 0;
  padding: $card-padding;
  background-color: rgba($warning, 0.08);
  border-left: 6rpx solid $warning;
  border-radius: $radius-sm;
  
  .disclaimer-title {
    display: flex;
    align-items: center;
    margin-bottom: 12rpx;
    
    .title-icon {
      font-size: $font-body;
      margin-right: 8rpx;
    }
    
    .title-text {
      font-size: $font-sub;
      font-weight: bold;
      color: $warning;
    }
  }
  
  .disclaimer-body {
    .body-text {
      display: block;
      font-size: $font-sub;
      color: $text-sub;
      line-height: 1.6;
      margin-bottom: 8rpx;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
