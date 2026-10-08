/**
 * utils/formatText.js - 自动排版（发布内容用）
 * 能力：去多余空行/空格、统一中文标点、按句号分段、识别小标题、长段拆分、数字前后加空格
 * 前端与云函数 formatText 使用同一套逻辑
 */
export function autoFormat(input) {
  if (!input) return ''
  let t = String(input)

  // 1) 全角空格/制表符 → 空格；连续空格压成一个
  t = t.replace(/[\u3000\t]+/g, ' ').replace(/ {2,}/g, ' ')

  // 2) 统一标点（英文 → 中文；冒号保留以免破坏 12:30、URL）
  t = t.replace(/,/g, '，').replace(/;/g, '；').replace(/!/g, '！').replace(/\?/g, '？')

  // 3) 数字与中文之间加空格
  t = t.replace(/([\u4e00-\u9fa5])(\d)/g, '$1 $2').replace(/(\d)([\u4e00-\u9fa5])/g, '$1 $2')

  // 4) 句末标点后分段
  t = t.replace(/([。！？])\s*/g, '$1\n')

  // 5) 小标题前后加换行（一、二、 / （一） / 1. / 1、）
  t = t.replace(/([一二三四五六七八九十]+、)/g, '\n$1')
  t = t.replace(/(（[一二三四五六七八九十]+）)/g, '\n$1')
  t = t.replace(/(^|\n)(\d+[.、])/g, '$1$2')

  // 6) 长段拆分：段落 > 100 字时按逗号拆（每约 50 字一处断句）
  t = t.split('\n').map(seg => {
    if (seg.length <= 100) return seg
    let out = ''
    let buf = 0
    for (const ch of seg) {
      out += ch
      buf++
      if (ch === '，' && buf >= 50) { out += '\n'; buf = 0 }
    }
    return out
  }).join('\n')

  // 7) 清理：行首尾空格、连续空行压成一个
  const lines = t.split('\n').map(s => s.trim())
  const cleaned = []
  for (const line of lines) {
    if (line === '' && cleaned[cleaned.length - 1] === '') continue
    cleaned.push(line)
  }
  return cleaned.join('\n').trim()
}

export default { autoFormat }
