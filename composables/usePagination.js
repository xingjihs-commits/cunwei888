/**
 * composables/usePagination.js - 通用分页列表逻辑
 * 统一列表页的 page/pageSize/loading/finished 与加载更多/下拉刷新，减少各页重复实现。
 *
 * 用法：
 *   const { list, total, loading, refresh, loadMore } = usePagination(
 *     (params) => callFunction('getXxx', { ...params, ...filters }),
 *     { pageSize: 20 }
 *   )
 *   onMounted(() => refresh())
 *   onPullDownRefresh(() => refresh())
 *   // 模板 scroll-view @scrolltolower="loadMore"
 */
import { ref } from 'vue'

export function usePagination(fetcher, options = {}) {
  const pageSize = options.pageSize || 20
  const page = ref(1)
  const list = ref([])
  const total = ref(0)
  const loading = ref(false)
  const finished = ref(false)

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
    } catch (err) {
      console.error('[usePagination] 加载失败:', err)
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

  return { page, pageSize, list, total, loading, finished, load, refresh, loadMore }
}
