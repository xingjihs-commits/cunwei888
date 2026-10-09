<!--
  pages/privacy/index.vue - 隐私政策
  用途：独立展示隐私政策页面（合规必需）
-->
<template>
  <page-meta :root-font-size="rootFontSize" />
  <view class="privacy-page">
    <view class="header">
      <text class="title">隐私政策</text>
      <text class="update-time">最近更新：2024年10月</text>
    </view>

    <view class="content">
      <view class="section">
        <text class="section-title">一、信息收集范围</text>
        <text class="section-text">本小程序在您使用过程中，会收集以下信息用于提供村务服务：</text>
        <text class="section-text">1. 微信 openid：用于唯一标识您在小程序中的身份，由微信自动分配。</text>
        <text class="section-text">2. 微信昵称和头像：仅在您主动选择"获取头像昵称"时收集，您可拒绝。</text>
        <text class="section-text">3. 手机号：仅在您进行实名认证时通过微信授权获取，用于村干部联系您处理反映事项。</text>
        <text class="section-text">4. 真实姓名、村组、身份证号：仅用于村级实名认证，加密存储，仅村委会可见。</text>
        <text class="section-text">5. 位置信息：仅在您使用"随手拍"功能提交问题时获取，用于定位问题地点。</text>
        <text class="section-text">6. 录音文件：仅在您主动使用"语音输入"功能时上传，识别后立即删除。</text>
        <text class="section-text">7. 您主动提交的文字、图片（反映问题、随手拍、书记信箱等）。</text>
      </view>

      <view class="section">
        <text class="section-title">二、信息使用范围</text>
        <text class="section-text">我们承诺，您提供的信息仅用于：</text>
        <text class="section-text">1. 处理您提交的反映、举报、投票等村务事项。</text>
        <text class="section-text">2. 向您发送工单处理进度、村务广播、惠农信息等通知。</text>
        <text class="section-text">3. 村务公开公示（您提交的随手拍默认公开展示在公示墙，您可在提交时取消公开）。</text>
        <text class="section-text">4. 上级政府监管部门的监督检查。</text>
        <text class="section-text">我们不会将您的信息用于其他商业用途，不会出售给第三方。</text>
      </view>

      <view class="section">
        <text class="section-title">三、信息存储与安全</text>
        <text class="section-text">您的所有数据存储在微信云开发服务器（位于中国境内），通过 openid 与微信账号关联。</text>
        <text class="section-text">我们采取以下措施保护您的信息安全：</text>
        <text class="section-text">1. 敏感字段（身份证号）加密存储。</text>
        <text class="section-text">2. 亲阅件（干部作风反映）仅书记可见，其他管理员不可查阅。</text>
        <text class="section-text">3. 所有内容均通过微信内容安全检测，违规内容会被拒绝入库。</text>
        <text class="section-text">4. 数据访问日志保留 6 个月，便于追溯。</text>
      </view>

      <view class="section">
        <text class="section-title">四、信息共享与披露</text>
        <text class="section-text">在以下情形下，我们可能会共享或披露您的信息：</text>
        <text class="section-text">1. 经您本人同意后共享。</text>
        <text class="section-text">2. 与司法机关、监管部门依法配合时。</text>
        <text class="section-text">3. 应上级政府监管要求。</text>
        <text class="section-text">4. 涉及违规内容举报处理时，仅向被举报对象展示必要信息（隐藏举报人身份）。</text>
      </view>

      <view class="section">
        <text class="section-title">五、您的权利</text>
        <text class="section-text">您有权：</text>
        <text class="section-text">1. 查询自己的工单、反映、投票记录。</text>
        <text class="section-text">2. 撤回未处理完毕的反映事项。</text>
        <text class="section-text">3. 退出登录后清除本地缓存。</text>
        <text class="section-text">4. 对违规内容发起举报。</text>
        <text class="section-text">5. 联系村委会申请更正或删除您的个人信息（村委办公室联系电话见"我的"页面）。</text>
      </view>

      <view class="section">
        <text class="section-title">六、未成年人保护</text>
        <text class="section-text">本小程序主要面向成年村民服务。未成年人使用本服务，应在监护人指导下进行。我们不主动收集未成年人个人信息，如发现误收集将立即删除。</text>
      </view>

      <view class="section">
        <text class="section-title">七、信息举报机制</text>
        <text class="section-text">如果您发现任何违规内容、不实信息、侵权内容，可通过以下方式举报：</text>
        <text class="section-text">1. 在内容详情页点击"举报"按钮提交举报。</text>
        <text class="section-text">2. 通过"书记信箱"匿名反映。</text>
        <text class="section-text">3. 直接拨打村委会电话。</text>
        <text class="section-text">我们承诺 3 个工作日内处理您的举报并反馈处理结果。</text>
      </view>

      <view class="section">
        <text class="section-title">八、协议变更</text>
        <text class="section-text">本政策可能根据法律法规变化或服务升级而更新。重大变更时我们会通过小程序弹窗或站内信通知您。</text>
      </view>

      <view class="section">
        <text class="section-title">九、联系我们</text>
        <text class="section-text">如对本政策有任何疑问，请联系村委会办公室（电话见"我的"页面）。</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useRootFontSize } from '@/composables/useA11y.js'
const rootFontSize = useRootFontSize()
// 静态页面，无需脚本逻辑
</script>

<style lang="scss" scoped>
.privacy-page {
  min-height: 100vh;
  background-color: $bg;
  padding: $spacing-md;
}

.header {
  background-color: $white;
  border-radius: $card-radius;
  padding: $spacing-lg $spacing-md;
  margin-bottom: $spacing-md;
  text-align: center;
  box-shadow: $card-shadow;
}

.title {
  display: block;
  font-size: $font-title;
  font-weight: 700;
  color: $primary;
  margin-bottom: $spacing-xs;
}

.update-time {
  display: block;
  font-size: $font-small;
  color: $text-weak;
}

.content {
  background-color: $white;
  border-radius: $card-radius;
  padding: $spacing-md;
  box-shadow: $card-shadow;
}

.section {
  margin-bottom: $spacing-md;

  &:last-child {
    margin-bottom: 0;
  }
}

.section-title {
  display: block;
  font-size: $font-h3;
  font-weight: 600;
  color: $text-main;
  margin-bottom: $spacing-xs;
}

.section-text {
  display: block;
  font-size: $font-body;
  color: $text-sub;
  line-height: 1.8;
  margin-bottom: $spacing-xs;
}
</style>
