<!--
  components/AppIcon.vue - 统一线性图标（替代 emoji，跨端风格一致）
  方案：CSS mask + data-uri SVG，颜色由调用方通过 color 传入（用 SCSS 变量编译值）
  用法：<AppIcon name="bell" :size="36" color="#C41E24" />
-->
<template>
  <view
    class="app-icon"
    :style="{
      width: size + 'rpx',
      height: size + 'rpx',
      backgroundColor: color,
      '-webkit-mask-image': maskImage,
      'mask-image': maskImage
    }"
  />
</template>

<script setup>
import { computed } from 'vue'
import { TEXT_MAIN } from '@/utils/theme.js'

// 24x24 viewBox 线性图标 path 集（stroke=2, round）
const ICONS = {
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9|M13.73 21a2 2 0 0 1-3.46 0",
  'bell-off': "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9|M13.73 21a2 2 0 0 1-3.46 0|M18.63 13A17.89 17.89 0 0 1 18 8|M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14|M1 1l22 22",
  star: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
  image: "M21 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z|M8.5 10.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z|M21 15l-5-5L5 21",
  warning: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z|M12 9v4|M12 17h.01",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z|M22 6l-10 7L2 6",
  megaphone: "M3 10v4l12 5V5L3 10z|M11.6 16.8a3 3 0 1 1-5.8-1.6|M21 10a4 4 0 0 1 0 4",
  camera: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z|M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z|M21 21l-4.35-4.35",
  flag: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z|M4 22v-7",
  book: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z|M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10",
  briefcase: "M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z|M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
  edit: "M12 20h9|M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
  wallet: "M21 12V7H5a2 2 0 0 1 0-4h14v4|M3 5v14a2 2 0 0 0 2 2h16v-5|M18 12a2 2 0 0 0 0 4h4v-4h-4z",
  chat: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z",
  list: "M8 6h13|M8 12h13|M8 18h13|M3 6h.01|M3 12h.01|M3 18h.01",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z|M12 2v2|M12 20v2|M2 12h2|M20 12h2|M4.93 4.93l1.41 1.41|M17.66 17.66l1.41 1.41|M4.93 19.07l1.41-1.41|M17.66 6.34l1.41-1.41",
  lock: "M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z|M7 11V7a5 5 0 0 1 10 0v4",
  info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z|M12 16v-4|M12 8h.01",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2|M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z|M23 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75",
  video: "M2 7h13a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z|M22 8l-5 4 5 4V8z",
  calendar: "M3 6h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z|M16 2v4|M8 2v4|M1 12h22",
  check: "M20 6L9 17l-5-5",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z|M12 1v2|M12 21v2|M4.22 4.22l1.42 1.42|M18.36 18.36l1.42 1.42|M1 12h2|M21 12h2|M4.22 19.78l1.42-1.42|M18.36 5.64l1.42-1.42",
  cloud: "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z",
  rain: "M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25|M16 13v8|M8 13v8|M12 15v8",
  heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  clipboard: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2|M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z",
  'bar-chart': "M12 20V10|M18 20V4|M6 20v-4",
  'file-text': "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8",
  sprout: "M12 22v-9|M12 13c0-3 2-5 5-5 0 3-2 5-5 5z|M12 13c0-3-2-5-5-5 0 3 2 5 5 5z",
  package: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z|M3.27 6.96L12 12.01l8.73-5.05|M12 22.08V12",
  inbox: "M22 12h-6l-2 3h-4l-2-3H2|M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
  folder: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z",
  vote: "M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z|M9 12l2 2 4-4"
}

const props = defineProps({
  name: { type: String, required: true },
  // 尺寸 rpx
  size: { type: Number, default: 36 },
  // 颜色（调用方传 SCSS 变量编译值或 theme.js 常量）
  color: { type: String, default: TEXT_MAIN }
})

// 线宽随尺寸自适应（大图标略细、小图标略粗，接近 SF Symbols 的字重策略）
const strokeWidth = computed(() => {
  const s = Number(props.size) || 36
  if (s <= 32) return 2.2
  if (s <= 48) return 2
  return 1.8
})

const maskImage = computed(() => {
  const paths = (ICONS[props.name] || ICONS.info).split('|')
  const body = paths
    .map(p => {
      if (p.startsWith('circle ')) {
        const [cx, cy, r] = p.replace('circle ', '').split(' ').map(Number)
        return `<circle cx="${cx}" cy="${cy}" r="${r}"/>`
      }
      return `<path d="${p}"/>`
    })
    .join('')
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" ` +
    `stroke="#000" stroke-width="${strokeWidth.value}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
})
</script>

<style lang="scss" scoped>
.app-icon {
  display: inline-block;
  flex-shrink: 0;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
}
</style>
