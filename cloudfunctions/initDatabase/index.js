/**
 * initDatabase/index.js - 数据库初始化
 * 用途：一键创建所有集合并插入示例数据
 * 使用：云开发控制台部署后调用一次即可
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const { checkAdmin } = require('../common/checkAdmin')

// 集合清单（v2.0 完整版）
const COLLECTIONS = [
  'records', 'type_config', 'users', 'admins', 'notices',
  'projects', 'market_prices', 'tasks', 'task_progress',
  'news', 'team_members', 'performance', 'rectifications',
  'subscriptions', 'logs', 'module_config', 'audit_queue', 'faq',
  // v2.0 新增集合
  'secretary_mails', 'broadcasts', 'service_guides',
  'upper_reports', 'meetings', 'votes', 'finance_reports',
  'messages', 'subsidies', 'agri_calendar', 'checkin_records'
]

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()
  const results = { collections: [], initData: [], errors: [] }

  // 鉴权：控制台 / 定时器调用时 OPENID 为空，放行；前端调用必须是管理员
  if (OPENID) {
    const isAdmin = await checkAdmin(OPENID)
    if (!isAdmin) {
      return { success: false, message: '无权限初始化数据库', code: 'FORBIDDEN' }
    }
  }

  // 幂等：已初始化且未强制重跑时直接返回，避免重复插入示例数据污染生产
  try {
    const existing = await db.collection('module_config').count()
    if (existing.total > 0 && !event.force) {
      return {
        success: false,
        message: '数据库已初始化，如需强制重跑请传 force: true',
        code: 'ALREADY_INITIALIZED'
      }
    }
  } catch (e) {
    // module_config 集合尚未创建时 count 会抛错，属正常首次初始化，继续执行
  }

  // 1. 创建集合
  for (const name of COLLECTIONS) {
    try {
      await db.createCollection(name)
      results.collections.push(`✓ ${name}`)
    } catch (err) {
      if (err.errCode === -501001 || (err.message && err.message.includes('already exists'))) {
        results.collections.push(`= ${name} (已存在)`)
      } else {
        results.errors.push(`创建${name}失败: ${err.message || ''}`)
      }
    }
  }
  
  // 2. 初始化示例数据
  try {
    const initData = require('./initData')
    results.initData = await initData()
  } catch (err) {
    results.errors.push(`初始化数据失败: ${err.message || ''}`)
  }
  
  return {
    success: true,
    message: '数据库初始化完成',
    results: results
  }
}
