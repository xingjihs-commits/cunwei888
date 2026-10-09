/**
 * utils/cache.js - 本地 TTL 缓存（离线兜底）
 * 用途：公示/新闻/首页数据本地缓存，断网时展示最近一次数据。
 * 约定：getCache 过期返回 null；getCacheStale 忽略过期时间，仅网络失败时兜底。
 */
const DEFAULT_TTL = 24 * 60 * 60 * 1000

export function setCache(key, data, ttl = DEFAULT_TTL) {
  try {
    uni.setStorageSync(key, { t: Date.now(), ttl, d: data })
  } catch (e) {
    // 存储失败忽略（如超额），不影响主流程
  }
}

export function getCache(key) {
  try {
    const c = uni.getStorageSync(key)
    if (c && c.t && (Date.now() - c.t) < (c.ttl || DEFAULT_TTL)) return c.d
  } catch (e) {}
  return null
}

export function getCacheStale(key) {
  try {
    const c = uni.getStorageSync(key)
    return c && c.d !== undefined ? c.d : null
  } catch (e) {}
  return null
}

export function removeCache(key) {
  try {
    uni.removeStorageSync(key)
  } catch (e) {}
}
