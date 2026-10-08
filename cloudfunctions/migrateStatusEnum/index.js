/**
 * cloudfunctions/migrateStatusEnum/index.js - 一次性数据迁移
 * 用途：把 records/tasks/votes/meetings/secretary_mails 等集合中
 *      历史英文 status 全部转为新中文 status
 * 使用：管理员通过云函数测试入口手动调用一次
 * 入参：{ dryRun: true } 仅打印不修改
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { checkAdmin } = require('../common/checkAdmin')

const STATUS_MAP = {
  // records
  'pending': '待处理',
  'assigned': '已派单',
  'processing': '处理中',
  'completed': '已完成',
  'evaluated': '已评价',
  'rejected': '已驳回',
  // tasks
  'todo': '待办',
  'doing': '进行中',
  'cancelled': '已取消',
  // votes
  'open': '进行中',
  'closed': '已截止',
  // meetings
  'scheduled': '待召开',
  'holding': '进行中',
  'ended': '已结束',
  // secretary_mails
  'read': '已查阅',
  'replied': '已回复',
  // rectifications
  'done': '已整改',
  // audit / verify
  'passed': '已通过',
  'approved': '已通过'
}

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  // 仅管理员可执行
  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return { success: false, message: '无执行权限' }
  }

  const { dryRun = false } = event
  const stats = {}

  // 要迁移的集合 + 字段
  const targets = [
    { collection: 'records', field: 'status' },
    { collection: 'records', field: 'auditStatus' },
    { collection: 'tasks', field: 'status' },
    { collection: 'votes', field: 'status' },
    { collection: 'meetings', field: 'status' },
    { collection: 'secretary_mails', field: 'status' },
    { collection: 'rectifications', field: 'status' },
    { collection: 'audit_queue', field: 'status' },
    { collection: 'users', field: 'verifyStatus' }
  ]

  try {
    for (const t of targets) {
      const key = `${t.collection}.${t.field}`
      stats[key] = { scanned: 0, migrated: 0 }

      // 查找所有英文 status 的记录（分批 100 一批）
      for (const engStatus of Object.keys(STATUS_MAP)) {
        const cnStatus = STATUS_MAP[engStatus]
        let processed = 0
        let hasMore = true
        while (hasMore) {
          const res = await db.collection(t.collection)
            .where({ [t.field]: engStatus })
            .skip(processed)
            .limit(100)
            .get()
            .catch(() => ({ data: [] }))

          if (res.data.length === 0) {
            hasMore = false
            break
          }

          stats[key].scanned += res.data.length

          if (!dryRun) {
            // 批量更新：每次 100 条
            for (const doc of res.data) {
              try {
                await db.collection(t.collection).doc(doc._id).update({
                  data: { [t.field]: cnStatus }
                })
                stats[key].migrated++
              } catch (e) {
                console.warn(`[migrateStatusEnum] 更新失败 ${doc._id}:`, e && e.errMsg)
              }
            }
          } else {
            stats[key].migrated += res.data.length
          }

          processed += res.data.length
          if (res.data.length < 100) hasMore = false
        }
      }
    }

    return {
      success: true,
      dryRun: dryRun,
      stats: stats,
      message: dryRun ? '试运行完成，未实际修改数据' : '迁移完成'
    }
  } catch (err) {
    console.error('[migrateStatusEnum] 失败:', err)
    return { success: false, message: '迁移失败: ' + (err.message || '') }
  }
}
