/**
 * store/config.js - 模块配置状态管理
 * 改造点（V1.7）：
 *   1. feedbackTypes / snapshotTypes 用中文 key
 *   2. 新增 displayNames：全部展示名称（11 类），可云端配置，未配置用默认值
 *   3. 新增 modules：模块开关（嵌套 4 组 tab/category/entry/homeBlock），默认全 true
 *   4. 新增 phones：常用电话（村医/网格员/村委值班/派出所/供电所/水管员）
 *   5. loadConfig 失败时上报日志
 */
import { defineStore } from 'pinia'
import { callFunction } from '@/utils/request.js'

// 默认展示名称（11 类）
export const DEFAULT_DISPLAY_NAMES = {
  tab: { home: '村里', service: '办事', committee: '村委', mine: '我的' },
  category: { info: '村务公开', complaint: '反映问题', study: '学习培训', service: '办事指南', life: '生活服务' },
  subCategory: {
    finance: '财务公示', project: '项目公示', policy: '政策公示',
    meeting: '会议记录', news: '村里事', team: '村委',
    feedback: '反映问题', snapshot: '随手拍', mailbox: '书记信箱',
    myFeedback: '我的反映', report: '反映问题', vote: '投票表决',
    policyStudy: '政策宣讲', partyStudy: '党建学习', agriStudy: '农技培训',
    lawStudy: '普法教育', healthStudy: '健康知识',
    guide: '办事指南', market: '惠农信息', subsidy: '惠农补贴',
    task: '政策落实', calendar: '农事日历', checkin: '留守签到',
    lostFound: '失物招领', phone: '常用电话'
  },
  entry: {
    feedback: '我要反映', snapshot: '随手拍', mailbox: '书记信箱',
    project: '项目收益', market: '惠农信息', policy: '政策落实',
    broadcast: '书记广播', finance: '财务公示', meeting: '会议记录',
    team: '村委', guide: '办事指南', lostFound: '失物招领',
    calendar: '农事日历', checkin: '留守签到', message: '消息中心'
  },
  pageTitle: {
    index: '村务连心桥', service: '办事', message: '消息中心', mine: '我的',
    feedback: '反映问题', snapshot: '随手拍', mailbox: '书记信箱',
    broadcast: '书记广播', notice: '村务公开', news: '村里事',
    finance: '村里钱怎么花', project: '项目收益', market: '惠农信息',
    task: '政策落实', team: '村委', meeting: '会议记录',
    guide: '办事指南', lostFound: '失物招领', calendar: '农事日历',
    checkin: '留守签到', leader: '书记风采', category: '分类列表'
  },
  button: {
    submit: '提交', publish: '发布', save: '保存', cancel: '取消',
    confirm: '确定', delete: '删除', edit: '编辑', back: '返回',
    more: '更多', viewMore: '查看更多', retry: '重试',
    call: '拨打电话', share: '分享', allRead: '全部已读',
    reload: '重新加载', sendReply: '发送回信', submitVote: '提交投票',
    approveUser: '确认', block: '拉黑',
    saveDraft: '存草稿', saveConfig: '保存配置', add: '添加',
    checkin: '完成签到', submitFeedback: '提交反映', submitSnapshot: '提交随手拍',
    verify: '去实名认证', clearCache: '清除缓存', deliver: '送达书记',
    processing: '处理中...'
  },
  status: {
    pending: '待处理', processing: '处理中', completed: '已完成',
    evaluated: '已评价', overdue: '已超时', rejected: '已驳回',
    dispatched: '已派单'
  },
  messageType: {
    feedback: '工单通知', mailbox: '书记回信',
    broadcast: '书记广播', system: '系统通知'
  },
  menuGroup: {
    myContent: '我的内容', settings: '设置', admin: '管理入口',
    workOrder: '工单', content: '内容', data: '数据', config: '配置'
  },
  emptyState: {
    noData: '暂无数据', noMessage: '暂无消息',
    noFeedback: '暂无反映', noNetwork: '网络不好，点重试',
    loading: '加载中...', loadFailed: '加载失败',
    notFound: '内容不存在', noPriceRecord: '暂无价格记录',
    noVote: '暂无表决事项', noOverdue: '无逾期工单', noBadReview: '无差评工单',
    noWorkOrder: '暂无工单',
    noAgri: '暂无农事提醒', noContent: '暂无内容', noInfo: '暂无信息',
    noGuide: '暂无办事指南', noBroadcast: '暂无广播', noSubject: '无主题',
    noTitle: '无标题', noTitleContent: '无标题内容', contentBuilding: '内容建设中'
  },
  phone: {
    villageDoctor: '村医', gridWorker: '网格员', villageDuty: '村委值班',
    police: '派出所', power: '供电所', water: '水管员'
  },
  home: {
    secretarySub: '直达书记，不经派单', noBroadcast: '暂无广播', unset: '待配置',
    categoryTitle: '服务分类', leaderCare: '上级走访', viewAll: '查看全部',
    leaderSecretary: '支部书记工作风采',
    findSecretary: '找书记', searchHint: '搜办事：低保、停水、医保...'
  },
  placeholder: {
    searchProduct: '搜索农产品名称',
    replyContent: '请输入回信内容',
    responsibleName: '如：张三',
    responsibleDuty: '如：管环境卫生',
    wxidUsage: '用于获取openid',
    openidRequired: '责任人openid（必填才能自动派单）',
    dispatchNote: '可填写批示内容，如\'请重点处理\'',
    assigneeName: '承办人姓名', assigneeRole: '如：村委委员',
    handleResult: '请填写处理结果', overdueReason: '请填写超时原因',
    financeTitle: '如：2024年第一季度财务公示',
    financePeriod: '如：2024年第一季度',
    category: '分类', item: '项目', amount: '金额',
    financeSummary: '本季度财务总结（选填）',
    leaderTitle: '不超过50字', leaderContent: '正文内容',
    meetingTitle: '如：2024年第二季度村两委会议',
    meetingLocation: '如：村委会会议室',
    meetingAttendees: '如：张书记,李主任,王委员',
    meetingAgenda: '请描述会议议程（选填）',
    meetingContent: '请描述会议内容（选填）',
    villageName: '村名称', name: '姓名', phone: '电话',
    title: '请输入标题', content: '请输入内容',
    responsiblePerson: '责任人姓名', mobile: '手机号',
    voteTitle: '如：关于修建村民文化广场的表决',
    voteDesc: '请描述表决事项的背景、方案、预算等',
    voteDeadline: '选择截止日期（默认7天后）',
    checkinNote: '身体不适或需要帮助请说明',
    realName: '请输入真实姓名', villageGroup: '如：三组', phoneManual: '也可手动输入手机号',
    phoneAuthorized: '已授权微信手机号',
    evaluation: '请输入评价（选填）',
    feedbackDesc: '请详细描述您反映的问题（至少5个字）',
    lostTitle: '如：丢失黑色钱包',
    lostDesc: '请描述物品特征、丢失/捡到时间地点',
    lostLocation: '如：村口小卖部附近', contact: '手机号或微信',
    nickname: '点击设置昵称',
    reportDesc: '请描述具体情况，最多500字',
    mailSubject: '一句话概括您要反映的事',
    mailContent: '请详细描述您想对书记说的话（至少5个字）',
    searchGuide: '搜索办事项目',
    snapshotDesc: '可填写问题描述（选填）',
    taskProgress: '请描述办理情况',
    household: '如：全村XXX户', productRice: '如：水稻',
    priceUnit: '如：元/斤', marketName: '如：村集市',
    selectDeadline: '选择截止日期'
  },
  finance: {
    auditedBy: '村务监督委员会审核', auditedShort: '监委审核',
    totalIncome: '总收入', totalExpense: '总支出', balance: '结余',
    income: '收入', expense: '支出',
    incomeDetail: '收入明细', expenseDetail: '支出明细',
    assets: '资产情况', resources: '资源情况', note: '说明'
  },
  meeting: {
    typeAll: '全部', typeCommittee: '村两委', typeParty: '党员大会',
    typeRepresentative: '村民代表', typeSpecial: '专题会',
    meetingEnded: '已结束', meetingHolding: '进行中', meetingScheduled: '待召开',
    hasMinutes: '已出纪要', time: '时间', location: '地点', type: '类型',
    agenda: '会议议程', attendees: '参会人员', minutes: '会议纪要',
    decisions: '会议决议', assigneeLabel: '责任人', report: '举报此会议'
  },
  market: {
    currentPrice: '当前价格', trend: '价格走势', trendChart: '走势图',
    trendTip: '(最近10条价格记录)', records: '价格记录',
    updatedAt: '更新于', subscribed: '已订阅', subscribe: '订阅提醒'
  },
  notice: {
    source: '来源：村委办', responsibleLabel: '责任人',
    relatedImages: '相关图片', auditedText: '本公示已经村务监督委员会审核',
    report: '举报此公示'
  },
  mail: {
    anonymous: '匿名', named: '署名信件', contentLabel: '来信内容',
    replyRecord: '回信记录', replyTimeLabel: '回复时间',
    replyMore: '追加回信', replyTitle: '书记回信',
    publicReplyTip: '公开回信（其他村民可在广播墙看到本次回信）',
    urgentLabel: '紧急程度', pendingTip: '书记正在查阅，请耐心等待回复'
  },
  guide: {
    description: '办事说明', materials: '所需材料', steps: '办理流程',
    info: '办理信息', locationLabel: '办理地点', phoneLabel: '咨询电话',
    workTimeLabel: '办理时间', deadlineLabel: '办理时限'
  },
  vote: {
    deadline: '截止', optionsLabel: '投票选项', myVote: '我的票',
    totalVotes: '总票数', optionCount: '选项数', report: '举报此表决',
    typeAll: '全部', typeOpen: '进行中', typeClosed: '已结束'
  },
  tip: {
    auditQueueNote: '系统对疑似违规内容自动入队，请人工判断是否放行或驳回。',
    dispatchConfigNote: '配置各类型工单对应的责任人。系统自动分是常态，配置后工单提交即自动分配。干部作风类自动标记为书记亲阅。',
    notVerified: '未认证', notFilled: '未填写', villageOffice: '村委办',
    currentLocation: '当前位置', term: '节气'
  },
  projection: {
    pause: '⏸ 暂停轮播', play: '▶ 自动轮播'
  },
  voice: {
    release: '松开 识别', hold: '按住 说话'
  },
  audit: {
    source: '来源', recordId: '记录ID',
    reject: '驳回（违规确认）', approve: '放行'
  },
  auth: {
    unfilledName: '未填姓名', phone: '手机号', villageGroup: '村组',
    registerTime: '注册时间', unfilledGroup: '未填村组'
  },
  dashboard: {
    projection: '投屏', export: '导出', received: '接单',
    completed: '完成', overdue: '逾期', badReview: '差评',
    avgScore: '好评度', onTimeRate: '按时率',
    tabPerson: '按人', tabModule: '按模块', tabGroup: '按村组',
    tabOverdue: '逾期', tabBadReview: '差评'
  },
  dispatchConfig: {
    title: '分配地图配置', autoSecret: '自动亲阅',
    nameLabel: '责任人姓名', dutyLabel: '负责什么', wxidLabel: '微信号（选填）'
  },
  dispatch: {
    summary: '工单摘要', itemType: '事项类型', submitTime: '提交时间',
    urgentLevel: '紧急程度', villageGroup: '所在村组', content: '工单内容',
    selectPerson: '选择责任人', responsibleFor: '负责',
    noteLabel: '书记批示（选填）'
  },
  handle: {
    info: '工单信息', itemType: '事项类型', submitTime: '提交时间',
    urgentLevel: '紧急程度', villageGroup: '村组', content: '内容',
    actions: '处理操作', status: '状态', assignee: '承办人',
    assigneeRole: '承办人职务', result: '处理结果', images: '处理照片',
    overdueReason: '超时原因'
  },
  feedbackList: {
    total: '总数', assigneeLabel: '承办', auto: '自动分',
    manual: '书记分', secret: '亲阅', dispatch: '分配', reassign: '改派'
  },
  financePublish: {
    title: '公示标题', period: '公示周期', incomes: '收入项',
    expenses: '支出项', assets: '资产', resources: '资源',
    summary: '总结说明', addIncome: '添加收入', addExpense: '添加支出',
    addAsset: '添加资产', addResource: '添加资源',
    totalLabel: '合计', yuan: '元'
  },
  leaderPublish: {
    typeLabel: '类型', secretary: '书记风采', leader: '上级走访',
    titleLabel: '标题', contentLabel: '正文', coverLabel: '封面图',
    chooseCover: '选择封面', videoLabel: '视频（可选，≤15MB，720p/1Mbps/faststart）',
    reselectVideo: '重新选择视频', chooseVideo: '选择视频'
  },
  meetingCreate: {
    title: '会议标题', typeLabel: '会议类型', timeLabel: '会议时间',
    selectTime: '选择会议时间', locationLabel: '会议地点',
    attendeesLabel: '参会人员（用逗号分隔）', agendaLabel: '会议议程',
    contentLabel: '会议内容'
  }
}

// 默认模块开关（4 组）
export const DEFAULT_MODULES = {
  tab: { home: true, service: true, message: true, mine: true },
  category: { info: true, complaint: true, study: true, service: true, life: true },
  entry: {
    feedback: true, snapshot: true, mailbox: true, broadcast: true, notice: true,
    news: true, finance: true, project: true, market: true, task: true, team: true,
    meeting: true, guide: true, lostFound: true, calendar: true, checkin: true,
    message: true, report: true, leader: true, vote: false
  },
  homeBlock: {
    secretary: true, phone: true, category: true,
    leader: true, notice: true, news: true, weather: true
  }
}

// 常用电话默认（称呼 key 对应 displayNames.phone；name/number 上线前配置）
const DEFAULT_PHONES = [
  { key: 'villageDoctor', name: '', number: '' },
  { key: 'gridWorker', name: '', number: '' },
  { key: 'villageDuty', name: '', number: '' },
  { key: 'police', name: '', number: '' },
  { key: 'power', name: '', number: '' },
  { key: 'water', name: '', number: '' }
]

// 深合并（仅一层对象，够用且安全）
function mergeDeep(base, patch) {
  const out = { ...base }
  if (patch && typeof patch === 'object') {
    for (const k of Object.keys(patch)) {
      if (patch[k] && typeof patch[k] === 'object' && !Array.isArray(patch[k]) && base[k] && typeof base[k] === 'object') {
        out[k] = { ...base[k], ...patch[k] }
      } else {
        out[k] = patch[k]
      }
    }
  }
  return out
}

// 读取本地配置缓存（冷启动秒开，避免默认值闪烁）
function readConfigCache() {
  try {
    if (typeof uni !== 'undefined' && uni.getStorageSync) {
      const c = uni.getStorageSync('vb_config_cache')
      if (c && typeof c === 'object') {
        const out = {}
        if (c.villageName) out.villageName = c.villageName
        if (c.villagePhone) out.villagePhone = c.villagePhone
        if (c.icpNumber) out.icpNumber = c.icpNumber
        if (c.policeIcpNumber) out.policeIcpNumber = c.policeIcpNumber
        if (c.office_hours) out.office_hours = c.office_hours
        if (c.office_address) out.office_address = c.office_address
        if (c.duty_phone) out.duty_phone = c.duty_phone
        if (c.county_code) out.county_code = c.county_code
        if (c.displayNames) out.displayNames = c.displayNames
        if (c.modules) out.modules = c.modules
        if (c.feedbackTypes) out.feedbackTypes = c.feedbackTypes
        if (c.snapshotTypes) out.snapshotTypes = c.snapshotTypes
        if (c.phones) out.phones = c.phones
        if (c.subscribeTemplates) out.subscribeTemplates = c.subscribeTemplates
        return out
      }
    }
  } catch (e) {}
  return {}
}

export const useConfigStore = defineStore('config', {
  state: () => ({
    villageName: '示范村',
    villagePhone: '',
    icpNumber: '',
    policeIcpNumber: '',
    office_hours: '',
    office_address: '',
    duty_phone: '',
    county_code: '',

    weather: { temp: 20, text: '晴' },

    displayNames: JSON.parse(JSON.stringify(DEFAULT_DISPLAY_NAMES)),
    modules: JSON.parse(JSON.stringify(DEFAULT_MODULES)),

    // 反映类型：中文 key
    feedbackTypes: [
      { key: '环境卫生', name: '环境卫生', icon: '🌍' },
      { key: '道路水利', name: '道路水利', icon: '🛣️' },
      { key: '矛盾纠纷', name: '矛盾纠纷', icon: '⚖️' },
      { key: '干部作风', name: '干部作风', icon: '📋' },
      { key: '安全隐患', name: '安全隐患', icon: '⚠️' },
      { key: '其他', name: '其他', icon: '📌' }
    ],

    snapshotTypes: [
      { key: '垃圾乱堆', name: '垃圾乱堆', icon: '🗑️' },
      { key: '道路安全', name: '道路安全', icon: '🚧' },
      { key: '路灯损坏', name: '路灯损坏', icon: '💡' },
      { key: '污水乱排', name: '污水乱排', icon: '💦' },
      { key: '违建', name: '违建', icon: '🏗️' },
      { key: '其他', name: '其他', icon: '📌' }
    ],

    noticeTypes: ['党务', '村务', '财务', '惠农', '应急'],

    // 常用电话（称呼读 displayNames.phone[key]，姓名/号码云端配置）
    phones: JSON.parse(JSON.stringify(DEFAULT_PHONES)),

    // 订阅消息模板 ID（云端 module_config.subscribe_templates 下发，未配置为 {}）
    // 约定键位：status_update（工单/反映/随手拍/失物/信箱/任务/认证/投票/评价）、
    //          checkin_reminder（留守签到）；在微信公众平台申请后于 module_config 配置。
    subscribeTemplates: {},

    // 紧急程度（中文）
    urgentLevels: [
      { key: '普通', name: '普通', color: '#52c41a' },
      { key: '紧急', name: '紧急', color: '#fa8c16' },
      { key: '特急', name: '特急', color: '#f5222d' }
    ],

    quickEntries: [
      { key: 'snapshot', name: '随手拍', icon: '📷', path: '/pages/snapshot/snapshot' },
      { key: 'feedback', name: '村民反映', icon: '💬', path: '/pages/feedback/feedback' },
      { key: 'notice', name: '村务公开', icon: '📢', path: '/pages/notice/list' },
      { key: 'project', name: '项目收益', icon: '💰', path: '/pages/project/list' },
      { key: 'market', name: '惠农信息', icon: '🌾', path: '/pages/market/list' },
      { key: 'task', name: '政策落实', icon: '📜', path: '/pages/task/list' },
      { key: 'team', name: '村委', icon: '👥', path: '/pages/team/index' },
      { key: 'mine', name: '办事大厅', icon: '🏛️', path: '/pages/mine/mine' }
    ],

    // 本地缓存覆盖（含完整 displayNames/modules），避免冷启动闪烁
    ...readConfigCache()
  }),

  getters: {
    enabledModules(state) {
      return state.quickEntries.filter(e => state.modules.entry[e.key] !== false)
    },
    getFeedbackType(state) {
      return (key) => state.feedbackTypes.find(t => t.key === key || t.name === key) || { key, name: key, icon: '📌' }
    },
    getSnapshotType(state) {
      return (key) => state.snapshotTypes.find(t => t.key === key || t.name === key) || { key, name: key, icon: '📌' }
    },
    // 订阅模板 ID 列表（过滤空值，用于 requestSubscribeMessage）
    subscribeTmplIds(state) {
      const t = state.subscribeTemplates || {}
      return Object.values(t).filter(Boolean)
    }
  },

  actions: {
    async loadConfig() {
      try {
        const res = await callFunction('getModuleConfig')
        if (res.success && res.data) {
          if (res.data.villageName) this.villageName = res.data.villageName
          if (res.data.villagePhone) this.villagePhone = res.data.villagePhone
          if (res.data.icpNumber) this.icpNumber = res.data.icpNumber
          if (res.data.policeIcpNumber) this.policeIcpNumber = res.data.policeIcpNumber
          if (res.data.office_hours !== undefined) this.office_hours = res.data.office_hours
          if (res.data.office_address !== undefined) this.office_address = res.data.office_address
          if (res.data.duty_phone !== undefined) this.duty_phone = res.data.duty_phone
          if (res.data.county_code !== undefined) this.county_code = res.data.county_code
          if (res.data.feedbackTypes) this.feedbackTypes = res.data.feedbackTypes
          if (res.data.snapshotTypes) this.snapshotTypes = res.data.snapshotTypes
          // 展示名称（深合并，未配置项保留默认）
          if (res.data.displayNames) {
            this.displayNames = mergeDeep(this.displayNames, res.data.displayNames)
          }
          // 模块开关（深合并）
          if (res.data.uiModules) {
            this.modules = mergeDeep(this.modules, res.data.uiModules)
          }
          // 常用电话
          if (Array.isArray(res.data.phones) && res.data.phones.length > 0) {
            this.phones = res.data.phones
          }
          // 订阅消息模板（提交后引导授权用）
          if (res.data.subscribeTemplates) {
            this.subscribeTemplates = res.data.subscribeTemplates
          }
          // 回写本地缓存，供下次冷启动秒开
          this._saveConfigCache()
        }
      } catch (err) {
        console.error('[loadConfig] 加载失败，使用默认配置:', err)
        // #ifdef MP-WEIXIN
        try {
          if (wx.cloud) {
            wx.cloud.callFunction({
              name: 'logError',
              data: { type: 'load_config_failed', error: String(err).substring(0, 500), time: Date.now() }
            }).catch(() => {})
          }
        } catch (e) {}
        // #endif
      }
    },

    // 写入本地缓存（loadConfig 成功后调用）
    _saveConfigCache() {
      try {
        if (typeof uni !== 'undefined' && uni.setStorageSync) {
          uni.setStorageSync('vb_config_cache', {
            villageName: this.villageName,
            villagePhone: this.villagePhone,
            icpNumber: this.icpNumber,
            policeIcpNumber: this.policeIcpNumber,
            office_hours: this.office_hours,
            office_address: this.office_address,
            duty_phone: this.duty_phone,
            county_code: this.county_code,
            displayNames: this.displayNames,
            modules: this.modules,
            feedbackTypes: this.feedbackTypes,
            snapshotTypes: this.snapshotTypes,
            phones: this.phones,
            subscribeTemplates: this.subscribeTemplates
          })
        }
      } catch (e) {}
    },

    // 名称读取（路径，如 'tab.home'）
    getDisplay(path, def = '') {
      const parts = String(path || '').split('.')
      let cur = this.displayNames
      for (const p of parts) {
        if (cur && typeof cur === 'object' && p in cur) cur = cur[p]
        else return def
      }
      return cur === undefined || cur === null ? def : cur
    },

    // 模块开关（路径，如 'entry.feedback'；默认 true）
    isModuleEnabled(path, def = true) {
      const parts = String(path || '').split('.')
      let cur = this.modules
      for (const p of parts) {
        if (cur && typeof cur === 'object' && p in cur) cur = cur[p]
        else return def
      }
      return cur === undefined || cur === null ? def : cur !== false
    },

    getFeedbackTypeName(key) {
      const t = this.feedbackTypes.find(t => t.key === key || t.name === key)
      return t ? t.name : key
    },

    getSnapshotTypeName(key) {
      const t = this.snapshotTypes.find(t => t.key === key || t.name === key)
      return t ? t.name : key
    },

    callPhone(number) {
      if (!number) {
        uni.showToast({ title: '电话号码为空', icon: 'none' })
        return
      }
      uni.makePhoneCall({ phoneNumber: number })
    }
  }
})
