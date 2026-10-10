/**
 * cloudfunctions/migrateStatusEnum/index.js - 一次性数据迁移
 * 用途：把 records/tasks/votes/meetings/secretary_mails 等集合中
 *      历史英文 status 全部转为新中文 status
 * 使用：管理员通过云函数测试入口手动调用一次
 * 入参：{ dryRun: true } 仅打印不修改
 */
const cloud = require('wx-server-sdk')
const { fail } = require('./common/errorUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command
const { checkAdmin } = require('./common/checkAdmin')

const STATUS_MAP = require('./common/constants').STATUS_LEGACY_MAP

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext()

  // 仅管理员可执行
  const isAdmin = await checkAdmin(OPENID)
  if (!isAdmin) {
    return fail('FORBIDDEN')
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
      // 关键：迁移后记录不再匹配 where 条件，必须固定 skip(0) 循环取
      // （旧实现 skip(processed) 会跳过未迁移记录，导致大量漏迁）
      for (const engStatus of Object.keys(STATUS_MAP)) {
        const cnStatus = STATUS_MAP[engStatus]
        let processed = 0
        let hasMore = true
        while (hasMore) {
          const res = await db.collection(t.collection)
            .where({ [t.field]: engStatus })
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

          // dryRun 时记录不变化，固定 skip 会死循环，此处仅统计一批
          processed += res.data.length
          if (dryRun || res.data.length < 100) hasMore = false
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
