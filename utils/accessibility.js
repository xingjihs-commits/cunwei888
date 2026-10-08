/**
 * utils/accessibility.js - 适老化设置（全局单例）
 * 说明：小程序运行时无法改 SCSS 变量，故用 module 级 reactive 单例存放设置，
 *      各组件/页面 import 后按需应用（大按钮/字号、骨架动画、语音开关等）。
 *      App.vue onLaunch 与设置页负责 load/save，组件读取即时生效。
 */
import { reactive } from 'vue'

export const A11Y_KEYS = {
  fontScale: 'fontScale',
  highContrast: 'highContrast',
  largeButton: 'largeButton',
  reduceMotion: 'reduceMotion',
  voiceEnabled: 'voiceEnabled'
}

export const a11y = reactive({
  fontScale: 1.0,
  highContrast: false,
  largeButton: false,
  reduceMotion: false,
  voiceEnabled: true
})

export function loadA11y() {
  try {
    a11y.fontScale = Number(uni.getStorageSync(A11Y_KEYS.fontScale)) || 1.0
    a11y.highContrast = uni.getStorageSync(A11Y_KEYS.highContrast) === true
    a11y.largeButton = uni.getStorageSync(A11Y_KEYS.largeButton) === true
    a11y.reduceMotion = uni.getStorageSync(A11Y_KEYS.reduceMotion) === true
    a11y.voiceEnabled = uni.getStorageSync(A11Y_KEYS.voiceEnabled) !== false
  } catch (e) {
    // 忽略读取失败，用默认值
  }
  return a11y
}

export function saveA11y(patch = {}) {
  Object.assign(a11y, patch)
  try {
    uni.setStorageSync(A11Y_KEYS.fontScale, a11y.fontScale)
    uni.setStorageSync(A11Y_KEYS.highContrast, a11y.highContrast)
    uni.setStorageSync(A11Y_KEYS.largeButton, a11y.largeButton)
    uni.setStorageSync(A11Y_KEYS.reduceMotion, a11y.reduceMotion)
    uni.setStorageSync(A11Y_KEYS.voiceEnabled, a11y.voiceEnabled)
  } catch (e) {
    // 忽略写入失败
  }
  // 通知已监听页面（兼容旧机制）
  uni.$emit('accessibilityChange', { ...a11y })
}
