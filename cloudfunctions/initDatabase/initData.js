/**
 * initData.js - 初始化数据模块
 * 用途：向各集合插入示例数据
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

const INIT_DATA = {
  module_config: [
    // ⚠️ 上线前替换：村名、村电话、ICP备案号、紧急电话 为本村真实值
    { moduleKey: 'village_info', enabled: true, config: {
        villageName: '示范村',
        villagePhone: '0571-12345678',  // 上线前替换为村委真实值班电话
        icpNumber: '',                  // 上线前填写ICP备案号
        policeIcpNumber: '',           // 上线前填写公安备案号
        office_hours: '周一至周五 8:30-17:30',  // 办公时间（村委"怎么联系"）
        office_address: '村委会',                // 办公地址
        duty_phone: '',                          // 今日值班电话
        county_code: '',                         // 县城气象代码（天气定位兜底）
        emergencyPhones: [
          { name: '报警', number: '110', icon: '🚓' },
          { name: '急救', number: '120', icon: '🚑' },
          { name: '火警', number: '119', icon: '🚒' }
          // 上线前补充：村医、网格员、街道办值班等真实电话
        ]
      }
    },
    // ⚠️ 上线前在微信公众平台申请 7 个订阅消息模板后填入下面的 templates 字段
    { moduleKey: 'subscribe_templates', enabled: true, templates: {
        new_feedback: '',         // 新工单通知管理员
        status_update: '',         // 工单状态更新通知村民
        new_task: '',              // 任务派发通知责任人
        price_update: '',          // 价格更新通知订阅者
        overdue_reminder: '',      // 超时催办通知责任人
        dispatch_notice: '',       // 书记批转通知
        overdue_escalation: ''      // 超时升级通知书记
      }
    },
    { moduleKey: 'feedback', enabled: true, dispatchMap: {
        // 这里配置各类型工单对应的责任人；与 store/config.js feedbackTypes 中文 key 一致
        // 留空表示在 dispatch-config 页面手工配置后保存
      }
    },
    { moduleKey: 'snapshot', enabled: true },
    { moduleKey: 'notice', enabled: true },
    { moduleKey: 'project', enabled: true },
    { moduleKey: 'market', enabled: true },
    { moduleKey: 'task', enabled: true },
    { moduleKey: 'team', enabled: true },
    { moduleKey: 'news', enabled: true }
  ],
  team_members: [
    // ⚠️ 上线前替换为真实班子成员
    { name: '张书记', role: '党支部书记', type: 'committee', division: '全面工作', phone: '13800138000', sortOrder: 1, enabled: true, commitment: '廉洁奉公，勤政为民', createTime: new Date() },
    { name: '李主任', role: '村委会主任', type: 'committee', division: '村务管理', phone: '13900139000', sortOrder: 2, enabled: true, commitment: '全心全意为村民服务', createTime: new Date() }
  ],
  news: [
    { title: '示范村村务连心桥小程序正式上线', content: '为更好服务村民，提升村务透明度，示范村推出"村务连心桥"微信小程序。', category: '村务', source: '村委办', isTop: true, viewCount: 0, likeCount: 0, likeUsers: [], createTime: new Date(), updateTime: new Date() }
  ],
  notices: [
    { title: '2024年第一季度村务公示', content: '现将2024年第一季度村务工作情况公示如下...', category: '村务', year: 2024, responsible: '李主任', audited: true, viewCount: 0, createTime: new Date(), updateTime: new Date() }
  ],
  market_prices: [
    { productName: '水稻', price: 2.5, unit: '元/斤', market: '村集市', trend: '稳定', expired: false, createTime: new Date(), updateTime: new Date() },
    { productName: '玉米', price: 1.8, unit: '元/斤', market: '村集市', trend: '上涨', expired: false, createTime: new Date(), updateTime: new Date() }
  ],
  faq: [
    { question: '如何提交村民反映？', answer: '在首页点击"村民反映"按钮，选择事项类型，填写描述并提交即可。', category: '使用帮助', sortOrder: 1, enabled: true, createTime: new Date() }
  ],
  // v2.0 新增示例数据
  service_guides: [
    {
      title: '城乡居民最低生活保障申请',
      category: '低保社保',
      icon: '📋',
      description: '城乡居民最低生活保障（低保）是政府对家庭人均收入低于当地低保标准的家庭给予的生活救助。',
      materials: ['户口簿原件及复印件', '身份证原件及复印件', '家庭收入证明', '银行流水（近6个月）', '其他相关证明材料'],
      steps: ['本人向村委提出申请', '村委入户调查', '村民代表大会评议', '上报街道办审核', '审批结果公示', '发放低保金'],
      location: '村委办公室',
      phone: '0571-12345678',
      workTime: '周一至周五 8:30-17:00',
      deadline: '30个工作日',
      sortOrder: 1,
      enabled: true,
      viewCount: 0,
      createTime: new Date()
    },
    {
      title: '城乡居民医保参保',
      category: '医保养老',
      icon: '🏥',
      description: '城乡居民基本医疗保险是为解决城乡居民医疗保障问题设立的社会保险制度。',
      materials: ['户口簿', '身份证', '银行卡'],
      steps: ['填写参保登记表', '缴纳保费', '领取医保卡', '就医时出示'],
      location: '村委办公室',
      phone: '0571-12345678',
      workTime: '集中参保期：每年9-12月',
      deadline: '即时办理',
      sortOrder: 2,
      enabled: true,
      viewCount: 0,
      createTime: new Date()
    },
    {
      title: '农村宅基地申请',
      category: '宅基地',
      icon: '🏠',
      description: '农村村民一户一宅，符合条件可申请宅基地。',
      materials: ['户口簿', '身份证', '家庭成员证明', '现有住房情况证明', '宅基地申请书'],
      steps: ['本人申请', '村委会讨论', '公示7天', '上报乡镇审核', '县级审批', '发放宅基地使用证'],
      location: '村委办公室→乡镇政府',
      phone: '0571-12345678',
      workTime: '周一至周五 8:30-17:00',
      deadline: '60个工作日',
      sortOrder: 3,
      enabled: true,
      viewCount: 0,
      createTime: new Date()
    }
  ],
  broadcasts: [
    {
      title: '【重要】村务连心桥小程序正式上线',
      content: '各位村民，村务连心桥小程序今日正式上线。请大家关注本小程序，及时了解村务动态、提交反映、查阅公示。如有疑问，可拨打村值班电话咨询。',
      urgent: false,
      published: true,
      viewCount: 0,
      createTime: new Date(),
      updateTime: new Date()
    }
  ],
  finance_reports: [
    {
      title: '2024年第一季度财务公示',
      period: '2024年第一季度',
      year: 2024,
      incomes: [
        { category: '集体经营', item: '集体果园承包收入', amount: 25000, remark: '' },
        { category: '转移支付', item: '上级财政转移支付', amount: 35000, remark: '' }
      ],
      expenses: [
        { category: '公益', item: '村道维修', amount: 15000, remark: '' },
        { category: '基建', item: '路灯安装', amount: 8000, remark: '' },
        { category: '人员', item: '村干部工资', amount: 18000, remark: '' }
      ],
      assets: [
        { category: '固定资产', item: '村委会办公楼', amount: 500000 },
        { category: '流动资产', item: '银行存款', amount: 35000 }
      ],
      resources: [
        { category: '集体土地', item: '集体果园50亩', remark: '已承包' },
        { category: '集体水面', item: '村前水塘20亩', remark: '集体经营' }
      ],
      summary: '本季度收支平衡，集体资产保值增值。详细报表见附件，欢迎村民监督。',
      totalIncome: 60000,
      totalExpense: 41000,
      balance: 19000,
      audited: true,
      auditor: '村务监督委员会',
      viewCount: 0,
      createTime: new Date(),
      updateTime: new Date()
    }
  ],
  agri_calendar: [
    { month: 1, term: '小寒', title: '小寒大寒，防冻保暖', content: '注意越冬作物防冻，畜禽保暖。', tasks: ['清理沟渠', '检修大棚', '畜禽保暖'], sortOrder: 1, enabled: true, createTime: new Date() },
    { month: 2, term: '立春', title: '立春雨水，备耕开始', content: '准备种子化肥，检修农机。', tasks: ['备种备肥', '检修农机', '育秧准备'], sortOrder: 2, enabled: true, createTime: new Date() },
    { month: 3, term: '惊蛰', title: '惊蛰春分，春播春种', content: '水稻育秧，玉米播种。', tasks: ['水稻育秧', '玉米播种', '防治病虫害'], sortOrder: 3, enabled: true, createTime: new Date() },
    { month: 4, term: '清明', title: '清明谷雨，插秧忙种', content: '水稻插秧，防治病虫害。', tasks: ['水稻插秧', '中耕除草', '追施肥料'], sortOrder: 4, enabled: true, createTime: new Date() },
    { month: 5, term: '立夏', title: '立夏小满，田间管理', content: '中耕除草，追施肥料。', tasks: ['中耕除草', '追施肥料', '防治病虫'], sortOrder: 5, enabled: true, createTime: new Date() },
    { month: 6, term: '芒种', title: '芒种夏至，抢收抢种', content: '夏收夏种，防汛排涝。', tasks: ['夏收', '夏种', '防汛排涝'], sortOrder: 6, enabled: true, createTime: new Date() },
    { month: 7, term: '小暑', title: '小暑大暑，抗旱防涝', content: '灌溉防旱，防治病虫。', tasks: ['灌溉防旱', '防治病虫', '秋播准备'], sortOrder: 7, enabled: true, createTime: new Date() },
    { month: 8, term: '立秋', title: '立秋处暑，秋收开始', content: '早稻收割，晚稻管理。', tasks: ['早稻收割', '晚稻管理', '蔬菜种植'], sortOrder: 8, enabled: true, createTime: new Date() },
    { month: 9, term: '白露', title: '白露秋分，秋收秋种', content: '秋粮收割，秋冬播种。', tasks: ['秋粮收割', '冬小麦播种', '蔬菜管理'], sortOrder: 9, enabled: true, createTime: new Date() },
    { month: 10, term: '寒露', title: '寒露霜降，晚秋收获', content: '晚稻收割，秋菜管理。', tasks: ['晚稻收割', '秋菜管理', '蓄水保墒'], sortOrder: 10, enabled: true, createTime: new Date() },
    { month: 11, term: '立冬', title: '立冬小雪，冬修水利', content: '农田基本建设，蓄水保墒。', tasks: ['农田基建', '蓄水保墒', '冬修水利'], sortOrder: 11, enabled: true, createTime: new Date() },
    { month: 12, term: '大雪', title: '大雪冬至，越冬管理', content: '越冬作物管理，冬修。', tasks: ['越冬作物管理', '清园消毒', '农具检修'], sortOrder: 12, enabled: true, createTime: new Date() }
  ],
  meetings: [
    {
      title: '2024年第一季度村两委会议',
      type: '村委会议',  // 中文类型
      meetingTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      location: '村委会会议室',
      attendees: ['张书记', '李主任', '王委员', '赵委员'],
      agenda: '1. 一季度工作总结\n2. 二季度工作计划\n3. 集体项目收益讨论\n4. 春节慰问安排',
      content: '讨论2024年第二季度村务工作计划',
      minutes: '',
      decisions: [],
      signRecords: [],
      status: '待召开',
      attendance: 0,
      createTime: new Date(),
      updateTime: new Date()
    }
  ],
  votes: [
    {
      title: '关于修建村民文化广场的表决',
      description: '拟在村东头空地修建村民文化广场，占地约2亩，预算15万元（集体资金8万+上级补助7万），工期3个月。请村民代表表决。',
      options: [
        { key: 'opt_0', label: '同意建设', count: 0, voters: [] },
        { key: 'opt_1', label: '不同意', count: 0, voters: [] },
        { key: 'opt_2', label: '同意但需调整方案', count: 0, voters: [] }
      ],
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      voterScope: '村民代表',  // 中文
      status: '进行中',
      totalVotes: 0,
      createTime: new Date(),
      updateTime: new Date()
    }
  ]
}

module.exports = async function initData() {
  const results = []
  for (const [colName, data] of Object.entries(INIT_DATA)) {
    try {
      for (const item of data) {
        await db.collection(colName).add({ data: item })
      }
      results.push(`✓ ${colName} (${data.length}条)`)
    } catch (err) {
      results.push(`✗ ${colName}: ${err.message || '失败'}`)
    }
  }
  return results
}
