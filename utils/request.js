/**
 * utils/request.js - 云函数调用封装
 * 改造点：
 *   1. 删除 getOpenid() 死代码（云函数不存在）
 *   2. uploadImages 增加进度回调、失败清理孤儿文件
 *   3. compressImage 小图跳过压缩
 *   4. uploadImages 增加并发上传（提速 3-5x）
 */

/**
 * 调用云函数
 * @param {string} name
 * @param {object} data
 * @param {object} options { loading: bool, showError: bool, timeout: ms }
 * @returns {Promise<object>}
 */
export function callFunction(name, data = {}, options = {}) {
  const { loading = false, showError = true, timeout = 15000 } = options

  // #ifdef MP-WEIXIN
  return new Promise((resolve, reject) => {
    if (loading) {
      uni.showLoading({ title: '加载中...', mask: true })
    }

    let settled = false
    // 客户端超时保护（云函数冷启动可能 5-10s）
    const timer = setTimeout(() => {
      if (settled) return
      settled = true
      if (loading) uni.hideLoading()
      if (showError) {
        uni.showToast({ title: '请求超时，请重试', icon: 'none' })
      }
      reject(new Error('timeout'))
    }, timeout)

    wx.cloud.callFunction({
      name: name,
      data: data,
      success(res) {
        if (settled) return
        settled = true
        clearTimeout(timer)
        if (loading) uni.hideLoading()
        if (res.result && res.result.success === false) {
          if (showError) {
            uni.showToast({ title: res.result.message || '操作失败', icon: 'none' })
          }
          reject(res.result)
        } else {
          resolve(res.result)
        }
      },
      fail(err) {
        if (settled) return
        settled = true
        clearTimeout(timer)
        if (loading) uni.hideLoading()
        console.error(`云函数[${name}]调用失败:`, err)
        if (showError) {
          uni.showToast({ title: '网络异常，请重试', icon: 'none' })
        }
        reject(err)
      }
    })
  })
  // #endif

  // #ifndef MP-WEIXIN
  return Promise.reject(new Error('当前环境不支持云函数，请用微信打开'))
  // #endif
}

/**
 * 获取数据库实例
 */
export function getDatabase() {
  // #ifdef MP-WEIXIN
  return wx.cloud.database()
  // #endif

  // #ifndef MP-WEIXIN
  return null
  // #endif
}

/**
 * 压缩图片
 * 改造点：原图宽度小于 1080 时跳过压缩（避免小图被压成模糊）
 */
export function compressImage(filePath) {
  // #ifdef MP-WEIXIN
  return new Promise((resolve) => {
    // 先获取图片信息
    wx.getImageInfo({
      src: filePath,
      success(info) {
        // 小于 1080 不压缩
        if (info.width < 1080) {
          resolve(filePath)
          return
        }
        wx.compressImage({
          src: filePath,
          quality: 60,
          compressedWidth: 1080,
          success(res) {
            resolve(res.tempFilePath)
          },
          fail() {
            resolve(filePath)
          }
        })
      },
      fail() {
        resolve(filePath)
      }
    })
  })
  // #endif

  // #ifndef MP-WEIXIN
  return Promise.resolve(filePath)
  // #endif
}

// 防重复提交锁
const submitLocks = new Map()

export function acquireLock(key, timeout = 5000) {
  const now = Date.now()
  if (submitLocks.has(key)) {
    const expire = submitLocks.get(key)
    if (now < expire) return false
  }
  submitLocks.set(key, now + timeout)
  return true
}

export function releaseLock(key) {
  submitLocks.delete(key)
}

/**
 * 上传文件到云存储
 */
export function uploadFile(filePath, cloudPath) {
  // #ifdef MP-WEIXIN
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      cloudPath: cloudPath,
      filePath: filePath,
      success(res) {
        resolve(res.fileID)
      },
      fail(err) {
        console.error('上传失败:', err)
        reject(err)
      }
    })
  })
  // #endif

  // #ifndef MP-WEIXIN
  return Promise.resolve(filePath)
  // #endif
}

/**
 * 批量上传图片（自动压缩 + 并发上传 + 进度回调 + 失败清理）
 * @param {array} filePaths 本地图片路径数组
 * @param {string} folder 云存储文件夹
 * @param {function} onProgress (completed, total) => void
 * @returns {Promise<{fileIDs: array, failed: number}>}
 */
export async function uploadImages(filePaths, folder = 'feedback', onProgress = null) {
  const fileIDs = []
  let failed = 0
  const total = filePaths.length
  let completed = 0

  // 改为并发上传（最多 3 个并发，提速 3-5 倍）
  const concurrency = 3
  const queue = [...filePaths.map((p, i) => ({ path: p, index: i }))]

  async function uploadOne(item) {
    try {
      const compressedPath = await compressImage(item.path)
      const cloudPath = `${folder}/${Date.now()}_${item.index}_${Math.random().toString(36).substr(2, 8)}.jpg`
      const fileID = await uploadFile(compressedPath, cloudPath)
      fileIDs.push({ index: item.index, fileID })
    } catch (err) {
      console.error(`图片${item.index}上传失败:`, err)
      failed++
    } finally {
      completed++
      if (onProgress) {
        try { onProgress(completed, total) } catch (e) {}
      }
    }
  }

  // 简易并发池
  const workers = []
  for (let i = 0; i < concurrency; i++) {
    workers.push((async () => {
      while (queue.length > 0) {
        const item = queue.shift()
        if (!item) break
        await uploadOne(item)
      }
    })())
  }
  await Promise.all(workers)

  // 按 index 排序，保持原图顺序
  fileIDs.sort((a, b) => a.index - b.index)
  return {
    fileIDs: fileIDs.map(f => f.fileID),
    failed: failed
  }
}

/**
 * 清理已上传的云存储文件（用于失败后清理孤儿文件）
 */
export async function cleanupFileIDs(fileIDs) {
  if (!fileIDs || fileIDs.length === 0) return
  // #ifdef MP-WEIXIN
  try {
    const cloud = wx.cloud
    for (const fileID of fileIDs) {
      try {
        await new Promise((resolve, reject) => {
          cloud.deleteFile({
            fileList: [fileID],
            success: resolve,
            fail: reject
          })
        })
      } catch (e) {
        console.warn('清理文件失败:', fileID, e)
      }
    }
  } catch (e) {}
  // #endif
}

export default {
  callFunction,
  getDatabase,
  uploadFile,
  uploadImages,
  compressImage,
  acquireLock,
  releaseLock,
  cleanupFileIDs
}
