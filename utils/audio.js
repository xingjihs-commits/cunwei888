/**
 * utils/audio.js - 语音输入封装
 * 改造点：
 *   1. 用唯一 channel id 隔离不同 VoiceInput 实例（避免事件冲突）
 *   2. 识别成功后清理上传的音频文件
 *   3. ASR 未配置时给清晰提示
 */

let recorderManager = null
let isRecording = false
let currentChannelId = null  // 当前录音的 channel id

/**
 * 初始化录音管理器
 */
function initRecorder() {
  if (recorderManager) return recorderManager

  // #ifdef MP-WEIXIN
  recorderManager = wx.getRecorderManager()

  recorderManager.onError((err) => {
    console.error('[audio] 录音错误:', err)
    isRecording = false
    if (currentChannelId) {
      uni.$emit(currentChannelId, '')  // 失败时 emit 空字符串触发回调清理
    }
    uni.showToast({ title: '录音失败，请授权', icon: 'none' })
  })

  recorderManager.onStop((res) => {
    isRecording = false
    if (res.duration < 1000) {
      uni.showToast({ title: '说话时间太短', icon: 'none' })
      if (currentChannelId) uni.$emit(currentChannelId, '')
      return
    }
    uploadAndRecognize(res.tempFilePath, currentChannelId)
  })
  // #endif

  return recorderManager
}

/**
 * 上传录音并调用语音识别
 */
async function uploadAndRecognize(filePath, channelId) {
  uni.showLoading({ title: '识别中...', mask: true })

  let fileID = null
  try {
    const cloudPath = `audio/${Date.now()}_${Math.random().toString(36).substr(2, 8)}.mp3`
    fileID = await new Promise((resolve, reject) => {
      // #ifdef MP-WEIXIN
      wx.cloud.uploadFile({
        cloudPath,
        filePath,
        success(res) { resolve(res.fileID) },
        fail(err) { reject(err) }
      })
      // #endif
    })

    // #ifdef MP-WEIXIN
    const res = await wx.cloud.callFunction({
      name: 'speechRecognition',
      data: { fileID }
    })

    if (res.result && res.result.text) {
      // 通过对应 channel 回传识别文本
      if (channelId) uni.$emit(channelId, res.result.text)
    } else {
      uni.showToast({
        title: res.result && res.result.message ? res.result.message : '语音识别未配置',
        icon: 'none',
        duration: 3000
      })
      if (channelId) uni.$emit(channelId, '')
    }
    // #endif
  } catch (err) {
    console.error('[audio] 语音识别失败:', err)
    uni.showToast({ title: '识别失败，请重试', icon: 'none' })
    if (channelId) uni.$emit(channelId, '')
  } finally {
    uni.hideLoading()
    // 识别完毕后清理云存储中的录音文件（避免占用空间）
    if (fileID) {
      try {
        // #ifdef MP-WEIXIN
        wx.cloud.deleteFile({ fileList: [fileID] })
        // #endif
      } catch (e) {}
    }
    currentChannelId = null
  }
}

/**
 * 开始录音
 * @param {string} channelId 由调用方传入的唯一 id，用于结果回调
 */
export function startRecord(channelId) {
  initRecorder()
  currentChannelId = channelId || 'voiceInputResult'

  // #ifdef MP-WEIXIN
  wx.getSetting({
    success(res) {
      if (res.authSetting['scope.record'] === false) {
        wx.authorize({
          scope: 'scope.record',
          success() {
            doStartRecord()
          },
          fail() {
            uni.showModal({
              title: '需要录音授权',
              content: '语音输入需要录音权限，请在设置中开启',
              confirmText: '去设置',
              success(res) {
                if (res.confirm) wx.openSetting()
              }
            })
            // 授权失败时清理回调
            currentChannelId = null
          }
        })
      } else {
        doStartRecord()
      }
    }
  })
  // #endif
}

function doStartRecord() {
  // #ifdef MP-WEIXIN
  if (isRecording) return
  isRecording = true
  recorderManager.start({
    duration: 60000,  // 最长 60 秒
    sampleRate: 16000,
    numberOfChannels: 1,
    encodeBitRate: 48000,
    format: 'mp3'
  })
  // #endif
}

/**
 * 停止录音
 */
export function stopRecord() {
  // #ifdef MP-WEIXIN
  if (!isRecording) return
  recorderManager.stop()
  // #endif
}

/**
 * 取消录音（不识别）
 */
export function cancelRecord() {
  // #ifdef MP-WEIXIN
  if (!isRecording) return
  isRecording = false
  currentChannelId = null
  recorderManager.stop()
  // #endif
}

export default {
  startRecord,
  stopRecord,
  cancelRecord
}
