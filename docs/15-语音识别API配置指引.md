# 第十五部分：语音识别API配置指引

**适用对象**：技术对接人
**前置条件**：speechRecognition云函数已部署，VoiceInput组件已使用

---

## 15.1 百度智能云注册

### 15.1.1 注册网址

https://cloud.baidu.com

### 15.1.2 注册步骤

1. 打开百度智能云官网
2. 点击右上角「登录」→「立即注册」
3. 填写手机号、验证码、密码
4. 完成注册

### 15.1.3 实名认证

1. 登录后，点击右上角头像→「实名认证」
2. 选择「个人认证」或「企业认证」
   - 个人认证：身份证+人脸识别
   - 企业认证：营业执照+法人信息（推荐村委会用此方式）
3. 提交认证，1个工作日内审核

### 15.1.4 开通语音识别服务

1. 进入控制台
2. 左侧菜单「产品服务」→搜索「语音识别」
3. 点击「开通服务」
4. 选择「短语音识别」（适用本场景，每次≤60秒）
5. 确认开通

### 15.1.5 创建应用

1. 控制台→「应用管理」→「创建应用」
2. 填写应用名称：村务连心桥
3. 应用类型：语音技术
4. 关联服务：勾选「语音识别」
5. 创建后获取：
   - **API Key**（类似`aBcDeFgH12345678`）
   - **Secret Key**（类似`aBcDeFgH12345678aBcDeFgH12345678`）

---

## 15.2 免费额度与收费

### 15.2.1 每日免费调用次数

| 服务 | 免费额度 | 说明 |
|------|---------|------|
| 短语音识别 | 每天500次 | 每次≤60秒 |
| 实时语音识别 | 每天500次 | 流式识别 |
| 录音文件识别 | 每天500次 | 长音频 |

**本平台建议**：短语音识别500次/天足够全村使用。

### 15.2.2 超出后收费标准

| 调用量 | 单价 |
|--------|------|
| 501-5000次/天 | 0.003元/次 |
| 5001-50000次/天 | 0.002元/次 |
| 50000次以上 | 0.001元/次 |

**预估费用**：村委每天使用100次，全免费。即使每天1000次，月费用约90元。

### 15.2.3 设置用量预警

1. 控制台→「费用中心」→「成本预警」
2. 设置月预算（如100元）
3. 超出时短信/邮件通知

### 15.2.4 查看已用量

1. 控制台→「语音识别」→「调用统计」
2. 查看每日调用次数、成功率、平均耗时

---

## 15.3 云函数配置

### 15.3.1 API Key配置方式

**推荐使用云开发环境变量**（不写在代码里更安全）：

1. 微信开发者工具→云开发控制台→云函数→speechRecognition→环境变量
2. 添加变量：
   - `BAIDU_API_KEY` = 你的API Key
   - `BAIDU_SECRET_KEY` = 你的Secret Key
3. 保存

### 15.3.2 speechRecognition云函数完整代码

**文件位置**：`cloudfunctions/speechRecognition/index.js`

代码已包含百度ASR调用示例，核心逻辑：

```javascript
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  const { fileID } = event
  
  if (!fileID) {
    return { success: false, message: '缺少录音文件' }
  }
  
  try {
    // 1. 下载录音文件
    const fileRes = await cloud.downloadFile({ fileID })
    const fileContent = fileRes.fileContent
    
    // 2. 获取百度ASR access_token
    const token = await getBaiduToken()
    
    // 3. 调用百度语音识别
    const text = await callBaiduASR(fileContent, token)
    
    return { success: true, text: text }
  } catch (err) {
    console.error('语音识别失败:', err)
    return { success: false, message: '识别失败' }
  }
}

// 获取百度access_token（含缓存）
let tokenCache = { token: '', expire: 0 }
async function getBaiduToken() {
  const now = Date.now()
  if (tokenCache.token && now < tokenCache.expire) {
    return tokenCache.token  // 使用缓存
  }
  
  const axios = require('axios')
  const res = await axios.get('https://aip.baidubce.com/oauth/2.0/token', {
    params: {
      grant_type: 'client_credentials',
      client_id: process.env.BAIDU_API_KEY,
      client_secret: process.env.BAIDU_SECRET_KEY
    }
  })
  
  tokenCache = {
    token: res.data.access_token,
    expire: now + (res.data.expires_in - 300) * 1000  // 提前5分钟过期
  }
  return tokenCache.token
}

// 调用百度语音识别API
async function callBaiduASR(fileContent, token) {
  const axios = require('axios')
  const audioBase64 = fileContent.toString('base64')
  
  const res = await axios.post('https://vop.baidu.com/server_api', {
    format: 'mp3',
    rate: 16000,
    channel: 1,
    speech: audioBase64,
    len: fileContent.length
  }, {
    params: { access_token: token },
    timeout: 10000
  })
  
  if (res.data.err_no === 0) {
    return res.data.result[0]
  }
  throw new Error(res.data.err_msg || '识别失败')
}
```

**注意**：需在speechRecognition云函数的package.json中添加axios依赖：
```json
{
  "dependencies": {
    "wx-server-sdk": "~2.6.3",
    "axios": "^1.6.0"
  }
}
```

### 15.3.3 测试语音识别

1. 部署speechRecognition云函数（含axios依赖）
2. 配置环境变量BAIDU_API_KEY和BAIDU_SECRET_KEY
3. 小程序中使用VoiceInput组件
4. 长按说话，松开后查看是否识别为文字
5. 云函数日志查看调用详情

### 15.3.4 环境变量名称

| 变量名 | 位置 | 用途 |
|--------|------|------|
| `BAIDU_API_KEY` | speechRecognition云函数环境变量 | 百度API Key |
| `BAIDU_SECRET_KEY` | speechRecognition环境变量 | 百度Secret Key |

---

## 15.4 替代方案

### 15.4.1 讯飞语音识别

| 项目 | 说明 |
|------|------|
| 注册网址 | https://www.xfyun.cn |
| 免费额度 | 每天500次 |
| 收费标准 | 0.005元/次起 |
| 接入难度 | 中等 |
| 方言支持 | 较好（支持四川话、粤语等） |

### 15.4.2 腾讯云语音识别

| 项目 | 说明 |
|------|------|
| 注册网址 | https://cloud.tencent.com/product/asr |
| 免费额度 | 每天500次 |
| 收费标准 | 0.004元/次起 |
| 接入难度 | 简单（与微信生态集成好） |
| 方言支持 | 一般 |

### 15.4.3 微信同声传译插件

| 项目 | 说明 |
|------|------|
| 注册方式 | 小程序后台→插件管理→搜索"微信同声传译" |
| 免费额度 | 完全免费 |
| 收费标准 | 免费 |
| 接入难度 | 最简单（无需服务器） |
| 方言支持 | 一般 |

**接入方法**：
1. 小程序后台→「插件管理」→「添加插件」→搜索「微信同声传译」
2. manifest.json中声明插件
3. 页面中使用`requirePlugin('WechatSI')`

### 15.4.4 各方案对比表

| 方案 | 免费额度 | 费用 | 接入难度 | 方言支持 | 推荐度 |
|------|---------|------|---------|---------|--------|
| 百度ASR | 500次/天 | 0.003元/次 | 中等 | 好 | ⭐⭐⭐⭐ |
| 讯飞ASR | 500次/天 | 0.005元/次 | 中等 | 很好 | ⭐⭐⭐ |
| 腾讯云ASR | 500次/天 | 0.004元/次 | 简单 | 一般 | ⭐⭐⭐⭐ |
| 微信同传 | 完全免费 | 免费 | 最简单 | 一般 | ⭐⭐⭐⭐⭐ |

**本平台推荐**：先用微信同声传译插件（免费+简单），如不满足需求再切换百度ASR。

---

## 15.5 常见问题

### Q1：识别不准怎么办？

A：1.录音时靠近手机说话；2.环境安静；3.语速适中；4.普通话标准；5.换用讯飞ASR（方言支持好）。

### Q2：支持方言识别吗？

A：百度支持四川话、粤语、东北话等；讯飞支持更多方言。本平台默认普通话，如需方言，更换ASR服务。

### Q3：Token过期怎么办？

A：代码已实现Token缓存，自动续期。如仍失败，检查环境变量是否正确配置。

### Q4：网络超时怎么办？

A：1.检查网络；2.增加超时时间（默认10秒，可改30秒）；3.录音文件过大时压缩后上传。

### Q5：录音格式不支持怎么办？

A：本平台录音格式为mp3（16000Hz采样率），百度/讯飞/腾讯均支持。如遇不支持，检查utils/audio.js中的format配置。

### Q6：免费额度用完了怎么办？

A：1.控制台充值；2.切换微信同传插件（免费）；3.限制每日使用次数。
