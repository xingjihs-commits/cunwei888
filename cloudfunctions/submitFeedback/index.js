/**
 * cloudfunctions/submitFeedback/index.js - 提交村民反映（全中文版）
 * 用途：内容安全检测→自动匹配责任人→干部作风标记亲阅→写入records→通知责任人
 * 改造点：
 *   1. type 使用中文（环境卫生/道路水利/矛盾纠纷/干部作风/安全隐患/其他）
 *   2. status 全部中文（待处理/处理中）
 *   3. superviseLevel 全部中文（普通/亲阅）
 *   4. urgentLevel 全部中文（普通/紧急/特急）
 *   5. 内容安全 fail-closed，违规内容拒绝入库
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { RECORD_STATUS, SUPERVISE_LEVEL, FEEDBACK_TYPES, SECRET_TYPES, DEADLINE_MAP } = require('../common/constants')
const { checkContentSecurity, checkImageSecurity } = require('../common/checkAdmin')
const { INTERNAL_TOKEN } = require('../common/internal')
const { isBlocked } = require('../common/blocked')

// 类型→责任人默认映射（数据库未配置时的兜底，与 store/config.js feedbackTypes 一致）
const DEFAULT_DISPATCH = {
  '环境卫生': { name: '村委委员', duty: '管环境卫生' },
  '道路水利': { name: '村委委员', duty: '管道路水利' },
  '矛盾纠纷': { name: '治保主任', duty: '管矛盾纠纷' },
  '干部作风': { name: '书记', duty: '书记亲阅' },
  '安全隐患': { name: '村委委员', duty: '管安全隐患' },
  '其他': { name: '村主任', duty: '村主任兜底' }
}

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  // 封禁校验：被临时锁定的用户拒绝提交
  if (await isBlocked(OPENID)) {
    return { success: false, message: '账号已被临时限制，请稍后再试', code: 'BLOCKED' }
  }
  const { content, images = [], type, urgentLevel = '普通', villageGroup = '', location = null } = event

  // 参数校验
  if (!content || content.trim().length < 5) {
    return { success: false, message: '请输入至少5个字的描述' }
  }
  if (content.length > 500) {
    return { success: false, message: '描述不能超过500字' }
  }
  if (!type) {
    return { success: false, message: '请选择事项类型' }
  }
  if (!FEEDBACK_TYPES.includes(type)) {
    return { success: false, message: '事项类型无效' }
  }
  if (images.length > 9) {
    return { success: false, message: '最多上传9张图片' }

  }

  try {
    // 1. 文本内容安全检测（fail-closed）
    const textCheck = await checkContentSecurity(content, OPENID, { collection: 'records', recordId: '' })
    if (textCheck === false) {
      return { success: false, message: '内容包含违规信息，请修改后重试' }
    }
    // 2. 图片内容安全检测
    if (images && images.length > 0) {
      for (const fileID of images) {
        const imgCheck = await checkImageSecurity(fileID, { collection: 'records' })
        if (imgCheck === false) {
          return { success: false, message: '图片包含违规内容，请删除后重试' }
        }
      }
    }

    // 3. 查询 dispatchMap 获取责任人
    const configRes = await db.collection('module_config')
      .where({ moduleKey: 'feedback' })
      .get()

    let assignee = { openid: '', name: '', duty: '' }
    let dispatchType = 'auto'
    let isSecret = false
    let superviseLevel = SUPERVISE_LEVEL.NORMAL

    if (configRes.data.length > 0 && configRes.data[0].dispatchMap) {
      const dispatchMap = configRes.data[0].dispatchMap
      // type 是中文，dispatchMap key 也是中文，能直接匹配
      const matched = dispatchMap[type]
      if (matched) {
        assignee = matched
        // 干部作风类自动标记亲阅
        if (SECRET_TYPES.includes(type) || matched.duty === '书记亲阅') {
          isSecret = true
          dispatchType = 'self'
          superviseLevel = SUPERVISE_LEVEL.SECRET
        }
      } else {
        // 配了 dispatchMap 但没匹配该类型 → 兜底
        const def = DEFAULT_DISPATCH[type] || DEFAULT_DISPATCH['其他']
        assignee = { openid: '', name: def.name, duty: def.duty }
        dispatchType = 'manual'
      }
    } else {
      // 没配 dispatchMap → 用默认映射（无 openid 需书记手动分配）
      const def = DEFAULT_DISPATCH[type] || DEFAULT_DISPATCH['其他']
      assignee = { openid: '', name: def.name, duty: def.duty }
      dispatchType = 'manual'
    }

    // 4. 计算处理时限
    const deadlineHours = DEADLINE_MAP[urgentLevel] || DEADLINE_MAP['普通']
    const now = new Date()
    const handleDeadline = new Date(now.getTime() + deadlineHours * 60 * 60 * 1000)

    // 5. 组装记录
    const recordData = {
      type: type,
      title: content.substring(0, 30) + (content.length > 30 ? '...' : ''),
      content: content,
      images: images,
      location: location,
      status: isSecret ? RECORD_STATUS.PROCESSING : RECORD_STATUS.PENDING,
      assignee: assignee.name,
      assigneeOpenid: assignee.openid,
      assigneeName: assignee.name,
      assigneeDuty: assignee.duty,
      assigneeRole: '',
      assigneeAvatar: '',
      dispatchType: dispatchType,
      dispatchNote: '',
      dispatchTime: isSecret ? now : null,
      isSecret: isSecret,
      superviseLevel: superviseLevel,
      reply: '',
      replyImages: [],
      handleDeadline: handleDeadline,
      isOverdue: false,
      overdueReason: '',
      handleDuration: 0,
      evaluation: 0,
      evaluationText: '',
      urgentLevel: urgentLevel,
      villageGroup: villageGroup,
      isPublic: false,
      likeCount: 0,
      likeUsers: [],
      auditStatus: textCheck === 'review' ? '待复审' : '',
      extra: {},
      createTime: now,
      updateTime: now,
      _openid: OPENID
    }

    const res = await db.collection('records').add({ data: recordData })

    // 6. 通知责任人（亲阅件不通知）
    if (!isSecret && assignee.openid) {
      try {
        await cloud.callFunction({
          name: 'sendDispatchNotice',
          data: {
            recordId: res._id,
            assigneeOpenid: assignee.openid,
            type: type,
            urgentLevel: urgentLevel,
            handleDeadline: handleDeadline,
            note: '',
            _internal: INTERNAL_TOKEN
          }
        })
      } catch (e) {
        console.warn('[submitFeedback] 派单通知发送失败:', e && e.errMsg)
      }
    }

    return {
      success: true,
      id: res._id,
      assignee: isSecret ? '书记亲阅' : `${assignee.name}（${assignee.duty}）`,
      message: isSecret ? '您的反映已提交，将由书记亲阅' : `已自动分配给${assignee.name}（${assignee.duty}）`
    }
  } catch (err) {
    console.error('[submitFeedback] 提交失败:', err)
    return { success: false, message: '提交失败，请重试' }
  }
}
