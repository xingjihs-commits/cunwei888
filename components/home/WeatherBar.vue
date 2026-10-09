<!--
  components/home/WeatherBar.vue - 首页「今日天气农事」
  布局：左半天气（实时 + 明日）/ 右半农事（今日宜）
  高度 3rem（=96rpx），字号随适老化 root-font-size 缩放
-->
<template>
  <view class="weather-bar">
    <view class="wb-weather">
      <text class="wb-icon">{{ icon }}</text>
      <text class="wb-now">{{ nowText }}</text>
      <text v-if="tomorrowText" class="wb-tomorrow">明日 {{ tomorrowText }}</text>
    </view>
    <view class="wb-farming">
      <text class="wb-farming-text">{{ farmingText }}</text>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  weather: { type: Object, default: null },
  farming: { type: String, default: '' }
})

const icon = computed(() => {
  const t = (props.weather && props.weather.text) || ''
  if (t.includes('雪')) return '❄️'
  if (t.includes('雨')) return '🌧️'
  if (t.includes('阴')) return '☁️'
  if (t.includes('云')) return '⛅'
  if (t.includes('晴')) return '☀️'
  return '🌤️'
})

const nowText = computed(() => {
  const w = props.weather
  if (!w || w.temp === undefined || w.temp === null) return '天气获取失败'
  return `${w.temp}°${w.text || ''}`
})

const tomorrowText = computed(() => {
  const w = props.weather
  if (!w || w.tomorrowHigh === undefined || w.tomorrowHigh === null) return ''
  return `${w.tomorrowLow}~${w.tomorrowHigh}° ${w.tomorrowText || ''}`.trim()
})

const farmingText = computed(() => (props.farming ? `今日宜${props.farming}` : '今日无农事建议'))
</script>

<style lang="scss" scoped>
@import '@/uni.scss';

.weather-bar {
  display: flex;
  align-items: center;
  min-height: 3rem; // 96rpx，随适老化倍数缩放
  padding: 0 $card-padding;
  margin: $card-gap $page-padding 0;
  background: $white;
  border-radius: $card-radius;
  box-shadow: $card-shadow;

  .wb-weather {
    display: flex;
    align-items: center;
    .wb-icon { font-size: $font-title; margin-right: 8rpx; }
    .wb-now { font-size: $font-sub; color: $text-main; font-weight: bold; }
    .wb-tomorrow { font-size: $font-micro; color: $text-weak; margin-left: 12rpx; }
  }

  .wb-farming {
    flex: 1;
    text-align: right;
    padding-left: 16rpx;
    border-left: 2rpx solid $border;

    .wb-farming-text {
      font-size: $font-sub;
      color: $text-sub;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
