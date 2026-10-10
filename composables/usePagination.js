/**
 * composables/usePagination.js - 通用分页列表逻辑
 * 统一列表页的 page/pageSize/loading/finished/error 与加载更多/下拉刷新，减少各页重复实现。
 *
 * 用法：
 *   const { list, total, loading, error, refresh, loadMore } = usePagination(
 *     (params) => callFunction('getXxx', { ...params, ...filters }),
 *     { pageSize: 20 }
 *   )
 *   onMounted(() => refresh())
 *   onPullDownRefresh(() => refresh())
 *   // 模板 scroll-view @scrolltolower="loadMore"
 *   // 模板：<AppErrorBanner v-if="error" @retry="refresh" />；空态条件加 !error
 *
 * error 仅在「首页加载失败」时置位（加载更多失败保留已加载数据，靠 toast + 下拉重试）。
 * fetcher 内部做了缓存兜底而不 throw 时不会置位（有数据可展示不算错误）。
 */
import { ref } from 'vue'

export function usePagination(fetcher, options = {}) {
  const pageSize = options.pageSize || 20
  const page = ref(1)
  const list = ref([])
  const total = ref(0)
  const loading = ref(false)
  const finished = ref(false)
  const error = ref(false)

  async function load(reset = false) {
    if (loading.value) return
    if (reset) {
      page.value = 1
      finished.value = false
    } else if (finished.value || list.value.length >= total.value) {
      return
    }
    loading.value = true
    try {
      const res = await fetcher({ page: page.value, pageSize })
      const data = (res && res.data) || []
      if (res && typeof res.total === 'number') total.value = res.total
      list.value = page.value === 1 ? data : list.value.concat(data)
      if (data.length < pageSize) finished.value = true
      else page.value += 1
      error.value = false
    } catch (err) {
      console.error('[usePagination] 加载失败:', err)
      if (reset) error.value = true
    } finally {
      loading.value = false
      uni.stopPullDownRefresh()
    }
  }

  function refresh() {
    return load(true)
  }

  function loadMore() {
    return load(false)
  }

  return { page, pageSize, list, total, loading, finished, error, load, refresh, loadMore }
}
