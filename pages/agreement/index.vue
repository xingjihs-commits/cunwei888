<!--
  pages/agreement/index.vue - 服务协议
  用途：展示村务连心桥服务协议
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="page-agreement">
    <view class="content">
      <text class="title">村务连心桥服务协议</text>
      
      <view class="section">
        <text class="section-title">一、服务说明</text>
        <text class="section-text">村务连心桥是村级"掌上连心桥"小程序，集民生服务、书记权威、对上汇报于一体。村民打开小程序，第一眼看到"村里在发生什么"，然后才是"我能做什么"。</text>
      </view>
      
      <view class="section">
        <text class="section-title">二、用户须知</text>
        <text class="section-text">1. 用户需进行实名认证后方可使用完整功能。\n2. 用户提交的反映、随手拍内容需真实、客观，不得包含违法违规信息。\n3. 系统将对所有提交内容进行安全检测，违规内容将被拒绝。</text>
      </view>
      
      <view class="section">
        <text class="section-title">三、治理留痕说明</text>
        <text class="section-text">本平台仅作线上公示、征集、流转之用，不替代法定程序。如遇紧急情况（火灾、急病、治安等），请直接拨打110、120、119等紧急电话或村值班电话。线上反映仅作为辅助渠道。</text>
      </view>
      
      <view class="section">
        <text class="section-title">四、隐私保护</text>
        <text class="section-text">1. 您的个人信息仅用于身份核验，不会向第三方公开。\n2. 您提交的反映、随手拍内容，将根据事项类型进行公示。\n3. 您的联系方式仅在管理员处理工单时可见。</text>
      </view>
      
      <view class="section">
        <text class="section-title">五、内容规范</text>
        <text class="section-text">用户不得发布以下内容：\n1. 违反国家法律法规的信息；\n2. 涉及人身攻击、侮辱诽谤的内容；\n3. 涉及个人隐私的信息（如他人身份证、电话等）；\n4. 虚假信息、谣言；\n5. 广告、推销等商业内容。</text>
      </view>
      
      <view class="section">
        <text class="section-title">六、免责声明</text>
        <text class="section-text">1. 因网络故障、系统维护等原因导致的服务中断，平台不承担责任。\n2. 用户因自身原因（如未及时查看回复）造成的损失，平台不承担责任。\n3. 因不可抗力（自然灾害、政策调整等）导致的服务变更，平台不承担责任。</text>
      </view>
      
      <view class="section">
        <text class="section-title">七、协议变更</text>
        <text class="section-text">本协议可能根据实际运营情况进行调整，更新后的协议自发布之日起生效。继续使用本服务即视为同意更新后的协议。</text>
      </view>
      
      <view class="section">
        <text class="section-title">八、联系我们</text>
        <text class="section-text">如有疑问，请联系村委办公室。\n值班电话：{{ villagePhone }}\n办公地址：村民委员会办公室</text>
      </view>
      
      <text class="update-time">更新时间：2024年</text>
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
import { computed } from 'vue'
import { useConfigStore } from '@/store/config.js'
const rootFontSize = useRootFontSize()

const configStore = useConfigStore()
const villagePhone = computed(() => configStore.villagePhone)
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.page-agreement {
  min-height: 100vh;
  background: $white;
  padding: $page-padding;
  
  .content {
    .title {
      font-size: $font-title;
      font-weight: bold;
      color: $text-main;
      text-align: center;
      display: block;
      margin-bottom: 32rpx;
    }
    
    .section {
      margin-bottom: $card-gap;
      
      .section-title {
        font-size: $font-card-title;
        font-weight: bold;
        color: $primary;
        display: block;
        margin-bottom: 16rpx;
      }
      
      .section-text {
        font-size: $font-body;
        color: $text-main;
        line-height: 1.8;
        white-space: pre-wrap;
      }
    }
    
    .update-time {
      display: block;
      text-align: center;
      font-size: $font-sub;
      color: $text-weak;
      margin-top: 48rpx;
    }
  }
}
</style>
