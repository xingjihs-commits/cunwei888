/**
 * cloudfunctions/searchAll/index.js - 聚合搜索
 * 用途：跨多集合按关键词模糊搜索（标题/摘要）
 * 入参：{ keyword, limit }（limit = 每类条数，默认 5，上限 10）
 * 返回：{ success, data: [{ type, name, _id, title, summary, time }] }
 * 说明：各来源独立 try/catch，集合不存在或字段缺失时跳过，不影响其他来源。
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

const SOURCES = [
  { col: 'news', type: 'news', name: '村里事', titleField: 'title', summary: 'content' },
  { col: 'notices', type: 'notice', name: '村务公开', titleField: 'title', summary: 'content' },
  { col: 'records', type: 'record', name: '反映问题', titleField: 'title', summary: 'content' },
  { col: 'projects', type: 'project', name: '项目收益', titleField: 'title', summary: 'summary' },
  { col: 'tasks', type: 'task', name: '政策落实', titleField: 'title', summary: 'content' },
  { col: 'meetings', type: 'meeting', name: '会议记录', titleField: 'title', summary: 'content' },
  { col: 'leader_contents', type: 'leader', name: '书记风采', titleField: 'title', summary: 'content' },
  { col: 'market_prices', type: 'market', name: '惠农信息', titleField: 'productName', summary: 'market' },
  { col: 'lost_found', type: 'lostFound', name: '失物招领', titleField: 'title', summary: 'description' }
]

function escapeRegExp(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

exports.main = async (event) => {
  const keyword = String((event && event.keyword) || '').trim()
  if (!keyword) return { success: true, data: [] }
  const perLimit = Math.min(Math.max(Number((event && event.limit) || 5), 1), 10)
  const reg = db.RegExp({ regexp: escapeRegExp(keyword), options: 'i' })

  const results = []
  await Promise.all(SOURCES.map(async (s) => {
    try {
      const titleField = s.titleField || 'title'
      const conditions = [{ [titleField]: reg }]
      if (s.summary) conditions.push({ [s.summary]: reg })
      const res = await db.collection(s.col)
        .where(_.or(conditions))
        .orderBy('createTime', 'desc')
        .limit(perLimit)
        .get()
      for (const doc of res.data) {
        results.push({
          type: s.type,
          name: s.name,
          _id: doc._id,
          title: doc[titleField] || doc.title || '',
          summary: String(doc[s.summary] || '').substring(0, 60),
          time: doc.createTime || doc.publishTime || null
        })
      }
    } catch (e) {
      // 集合不存在/字段缺失 → 跳过该来源
    }
  }))

  return { success: true, data: results }
}
