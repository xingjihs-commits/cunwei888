/**
 * utils/theme.js - 设计 token（JS 侧）
 * 供组件属性色值使用（AppIcon color、:style background 等）。
 * 值必须与 uni.scss 保持一致，改色先改 uni.scss 再同步这里。
 */
export const PRIMARY = '#C41E24'
export const TEXT_MAIN = '#212121'
export const TEXT_WEAK = '#9E9E9E'
export const TEXT_SUB = '#8A8A8A'
export const WHITE = '#FFFFFF'
export const STAR_GOLD = '#FFD700'
// 星形装饰弱化态（uni.scss $star-gold-dim）
export const STAR_GOLD_DIM = 'rgba(255, 215, 0, 0.35)'
// 旗面装饰：底纹星弱化白（uni.scss $flag-veil）
export const FLAG_VEIL = 'rgba(255, 255, 255, 0.07)'
// 金色深端（uni.scss $gold-dark）
export const GOLD_DARK = '#BA8E2A'
export const DANGER = '#C62828'

// chip 六色底（uni.scss $chip-*-bg）
export const CHIP_BG = {
  red: '#FDE8E8',
  gold: '#F9F0DC',
  green: '#E8F5E9',
  blue: '#E3F2FD',
  orange: '#FFF3E0',
  gray: '#F0F1F3'
}

// chip 六色字（uni.scss $chip-*-text）
export const CHIP_TEXT = {
  red: '#C41E24',
  gold: '#B8902E',
  green: '#2E7D32',
  blue: '#1565C0',
  orange: '#E65100',
  gray: '#8A8A8A'
}
