/**
 * cloudfunctions/speechRecognition/index.js - 语音识别（占位实现）
 * 状态：未接入真实 ASR 服务（见 PROJECT_MAP），调用返回未配置提示。
 * 上线指引：配置第三方 ASR 密钥（云函数环境变量）后接入真实识别服务，
 *          并在 package.json 声明对应依赖。
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const { fileID } = event

  if (!fileID) {
    return { success: false, message: '缺少录音文件' }
  }

  try {
    // 下载录音文件（占位阶段仅校验文件可读，避免无效调用堆积）
    const fileRes = await cloud.downloadFile({ fileID })
    if (!fileRes || !fileRes.fileContent || !fileRes.fileContent.length) {
      return { success: false, message: '录音文件读取失败' }
    }

    // 占位实现：返回提示文字（上线前必须替换为真实语音识别服务）
    return {
      success: false,
      message: '语音识别服务未配置，请联系管理员',
      text: ''
    }
  } catch (err) {
    console.error('录音下载失败:', err)
    return { success: false, message: '录音文件读取失败' }
  }
}
