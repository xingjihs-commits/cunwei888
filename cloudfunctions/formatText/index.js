/**
 * cloudfunctions/formatText/index.js - 自动排版（云函数版，逻辑与前端 utils/formatText.js 一致）
 * 入参：{ text }，出参：{ success, data }
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

function autoFormat(input) {
  if (!input) return ''
  let t = String(input)

  t = t.replace(/[\u3000\t]+/g, ' ').replace(/ {2,}/g, ' ')
  t = t.replace(/,/g, '，').replace(/;/g, '；').replace(/!/g, '！').replace(/\?/g, '？')
  t = t.replace(/([\u4e00-\u9fa5])(\d)/g, '$1 $2').replace(/(\d)([\u4e00-\u9fa5])/g, '$1 $2')
  t = t.replace(/([。！？])\s*/g, '$1\n')
  t = t.replace(/([一二三四五六七八九十]+、)/g, '\n$1')
  t = t.replace(/(（[一二三四五六七八九十]+）)/g, '\n$1')
  t = t.replace(/(^|\n)(\d+[.、])/g, '$1$2')

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

  const lines = t.split('\n').map(s => s.trim())
  const cleaned = []
  for (const line of lines) {
    if (line === '' && cleaned[cleaned.length - 1] === '') continue
    cleaned.push(line)
  }
  return cleaned.join('\n').trim()
}

exports.main = async (event, context) => {
  const { text } = event
  if (!text) return { success: false, message: '无内容' }
  try {
    return { success: true, data: autoFormat(text) }
  } catch (err) {
    console.error('[formatText] 失败:', err)
    return { success: false, message: '排版失败' }
  }
}
