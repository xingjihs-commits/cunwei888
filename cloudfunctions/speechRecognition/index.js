/**
 * cloudfunctions/speechRecognition/index.js - 语音识别
 * 用途：接收录音fileID，调用语音识别服务返回文字
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command


exports.main = async (event, context) => {
  const { fileID } = event
  
  if (!fileID) {
    return { success: false, message: '缺少录音文件' }
  }
  
  try {
    // 下载录音文件
    const fileRes = await cloud.downloadFile({ fileID })
    const fileContent = fileRes.fileContent
    
    // 调用微信同传/百度/讯飞语音识别API
    // 这里使用微信内容安全外的开放接口作为示例
    // 实际生产环境需配置第三方语音识别API密钥
    try {
      // 方案1：调用百度语音识别API（需配置API Key）
      // const result = await callBaiduASR(fileContent)
      
      // 方案2：调用讯飞语音识别API（需配置APPID）
      // const result = await callXfyunASR(fileContent)
      
      // 当前为占位实现：返回提示文字
      // 上线前必须替换为真实语音识别服务
      return {
        success: false,
        message: '语音识别服务未配置，请联系管理员',
        text: ''
      }
    } catch (asrErr) {
      console.error('语音识别调用失败:', asrErr)
      return { success: false, message: '识别失败' }
    }
  } catch (err) {
    console.error('录音下载失败:', err)
    return { success: false, message: '录音文件读取失败' }
  }
}

/**
 * 百度语音识别示例实现（生产环境使用）
 * 需要先获取access_token
 */
async function callBaiduASR(fileContent) {
  const axios = require('axios')
  const tokenUrl = 'https://aip.baidubce.com/oauth/2.0/token'
  const tokenRes = await axios.get(tokenUrl, {
    params: {
      grant_type: 'client_credentials',
      client_id: process.env.BAIDU_API_KEY,
      client_secret: process.env.BAIDU_SECRET_KEY
    }
  })
  
  const asrUrl = 'https://vop.baidu.com/server_api'
  const audioBase64 = fileContent.toString('base64')
  const res = await axios.post(asrUrl, {
    format: 'mp3',
    rate: 16000,
    channel: 1,
    speech: audioBase64,
    len: fileContent.length
  }, {
    params: { access_token: tokenRes.data.access_token }
  })
  
  if (res.data.err_no === 0) {
    return res.data.result[0]
  }
  throw new Error(res.data.err_msg)
}
