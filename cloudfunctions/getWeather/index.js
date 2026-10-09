/**
 * cloudfunctions/getWeather/index.js - 天气代理（无需 key）
 * 数据源：中国气象局 weather.cma.cn 公开接口
 *   查询：GET https://weather.cma.cn/api/weather/{stationId}
 * 入参：{ stationId } 5 位气象站号（来自 module_config.village_info.county_code，单村固定）
 * 返回：{ success, data: { location, temp, feelst, text, humidity, windDir, windScale,
 *                          tomorrowHigh, tomorrowLow, tomorrowText, jieQi, lastUpdate } }
 * 说明：站点固定，实例级缓存 10 分钟，降低外网请求频率；失败时若已有旧缓存则降级返回。
 */
const https = require('https')

const CACHE_TTL = 10 * 60 * 1000
let cache = { id: '', time: 0, data: null }

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      { headers: { 'User-Agent': 'Mozilla/5.0', Referer: 'https://weather.cma.cn/' } },
      (res) => {
        let raw = ''
        res.on('data', (c) => { raw += c })
        res.on('end', () => {
          try { resolve(JSON.parse(raw)) } catch (e) { reject(e) }
        })
      }
    )
    req.on('error', reject)
    req.setTimeout(8000, () => req.destroy(new Error('timeout')))
  })
}

exports.main = async (event) => {
  const stationId = String((event && event.stationId) || '').trim()
  if (!stationId) return { success: false, message: '缺少气象站号', data: null }

  const now = Date.now()
  if (cache.id === stationId && now - cache.time < CACHE_TTL && cache.data) {
    return { success: true, data: cache.data }
  }

  try {
    const resp = await fetchJson('https://weather.cma.cn/api/weather/' + encodeURIComponent(stationId))
    const d = resp && resp.data
    if (!d || !d.now) return { success: false, message: '天气数据为空', data: null }

    const daily = Array.isArray(d.daily) ? d.daily : []
    const today = daily[0] || {}
    const tomorrow = daily[1] || {}
    const data = {
      location: (d.location && d.location.name) || '',
      temp: d.now.temperature,
      feelst: d.now.feelst,
      text: today.dayText || '',
      humidity: d.now.humidity,
      windDir: d.now.windDirection,
      windScale: d.now.windScale,
      tomorrowHigh: tomorrow.high,
      tomorrowLow: tomorrow.low,
      tomorrowText: tomorrow.dayText || '',
      jieQi: d.jieQi || '',
      lastUpdate: d.lastUpdate || ''
    }
    cache = { id: stationId, time: now, data }
    return { success: true, data }
  } catch (err) {
    console.error('[getWeather] 失败:', err && err.message)
    if (cache.data && cache.id === stationId) {
      return { success: true, data: cache.data, cached: true }
    }
    return { success: false, message: '天气获取失败', data: null }
  }
}
