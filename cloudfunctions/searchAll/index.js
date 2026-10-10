/**
 * cloudfunctions/searchAll/index.js - 聚合搜索
 * 用途：跨多集合按关键词模糊搜索（标题/摘要）
 * 入参：{ keyword, limit }（limit = 每类条数，默认 5，上限 10，keyword ≤50 字）
 * 返回：{ success, data: [{ type, name, _id, title, summary, time }] }
 * 说明：各来源独立 try/catch，集合不存在或字段缺失时跳过，不影响其他来源。
 * 安全：records 源强制公开可见（isPublic）并排除亲阅件（isSecret），
 *       防止村民越权搜索他人私密工单；keyword 过 escapeRegExp 防注入。
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { escapeRegExp } = require('./common/docUtils')

const SOURCES = [
  { col: 'news', type: 'news', name: '村里事', titleField: 'title', summary: 'content' },
  { col: 'notices', type: 'notice', name: '村务公开', titleField: 'title', summary: 'content' },
  { col: 'projects', type: 'project', name: '项目收益', titleField: 'title', summary: 'summary' },
  { col: 'tasks', type: 'task', name: '政策落实', titleField: 'title', summary: 'content' },
  { col: 'meetings', type: 'meeting', name: '会议记录', titleField: 'title', summary: 'content' },
  // 修正集合名：leader_content（原 leader_contents 不存在，搜索永远为空）
  { col: 'leader_content', type: 'leader', name: '书记风采', titleField: 'title', summary: 'content' },
  { col: 'market_prices', type: 'market', name: '惠农信息', titleField: 'productName', summary: 'market' },
  // 失物招领实际存储于 records（extra.category='lost_found'），原 lost_found 集合不存在
  { col: 'records', type: 'lostFound', name: '失物招领', titleField: 'title', summary: 'description',
    baseWhere: [{ 'extra.category': 'lost_found' }, { isPublic: true }, { isSecret: _.neq(true) }] },
  // 村民反映：仅公示墙公开记录可被搜索
  { col: 'records', type: 'record', name: '反映问题', titleField: 'title', summary: 'content',
    baseWhere: [{ 'extra.category': _.neq('lost_found') }, { isPublic: true }, { isSecret: _.neq(true) }] }
]

exports.main = async (event) => {
  const keyword = String((event && event.keyword) || '').trim()
  if (!keyword || keyword.length > 50) return { success: true, data: [] }
  const perLimit = Math.min(Math.max(Number((event && event.limit) || 5), 1), 10)
  const reg = db.RegExp({ regexp: escapeRegExp(keyword), options: 'i' })

  const results = []
  await Promise.all(SOURCES.map(async (s) => {
    try {
      const titleField = s.titleField || 'title'
      const conditions = (s.baseWhere || []).concat([{ [titleField]: reg }])
      if (s.summary) conditions.push({ [s.summary]: reg })
      const res = await db.collection(s.col)
        .where(_.and(conditions))
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
