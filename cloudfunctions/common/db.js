/**
 * cloudfunctions/common/db.js - 数据访问层封装
 * 用途：所有云函数通过本模块操作数据库，统一加 createTime/updateTime/_openid 等公共字段
 * 收益：未来改 SDK、加审计日志、加缓存只需改本文件
 */
const cloud = require('wx-server-sdk')
const { pluckDoc } = require('./docUtils')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

/**
 * 插入单条记录（自动加 createTime/updateTime/_openid）
 * @param {string} collection 集合名
 * @param {object} data 数据
 * @param {object} options { addOpenid: true } 是否自动加 _openid
 */
async function insertOne(collection, data, options = {}) {
  const now = new Date()
  const record = {
    ...data,
    createTime: now,
    updateTime: now
  }
  if (options.addOpenid !== false && data._openid === undefined) {
    const { OPENID } = cloud.getWXContext()
    record._openid = OPENID
  }
  const res = await db.collection(collection).add({ data: record })
  return { _id: res._id, ...record }
}

/**
 * 更新单条记录（自动加 updateTime）
 */
async function updateOne(collection, id, data) {
  const updateData = { ...data, updateTime: new Date() }
  await db.collection(collection).doc(id).update({ data: updateData })
  return updateData
}

/**
 * 查询单条记录 by id
 * 修复：doc().get() 返回的 data 是单个文档对象（IQuerySingleResult），
 * 旧实现按数组判断导致永远返回 null。
 */
async function getById(collection, id) {
  const res = await db.collection(collection).doc(id).get()
  return pluckDoc(res)
}

/**
 * 条件查询单条
 */
async function findOne(collection, where) {
  const res = await db.collection(collection).where(where).limit(1).get()
  return res.data && res.data.length > 0 ? res.data[0] : null
}

/**
 * 条件查询多条（分页）
 */
async function query(collection, where, options = {}) {
  const { page = 1, pageSize = 20, orderBy = 'createTime', orderDir = 'desc' } = options
  let q = db.collection(collection).where(where)
  const total = await q.count()
  const list = await q
    .orderBy(orderBy, orderDir)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .get()
  return { data: list.data, total: total.total, page, pageSize }
}

/**
 * 条件更新
 */
async function updateWhere(collection, where, data) {
  const res = await db.collection(collection).where(where).update({ data: { ...data, updateTime: new Date() } })
  return res.stats.updated
}

/**
 * 全量分页拉取（绕过服务端单次 get 100 条上限）。
 * 用于统计/群发场景，max 兜底防失控。
 * @param {string} collection 集合名
 * @param {object} where 查询条件（空对象 = 全表）
 * @param {object} options { max=2000, batchSize=100 }
 * @returns {Promise<Array>}
 */
async function fetchAll(collection, where = {}, options = {}) {
  const { max = 2000, batchSize = 100 } = options
  const out = []
  let offset = 0
  while (offset < max) {
    const res = await db.collection(collection)
      .where(where)
      .skip(offset)
      .limit(batchSize)
      .get()
    const batch = res.data || []
    out.push(...batch)
    if (batch.length < batchSize) break
    offset += batch.length
  }
  return out
}

/**
 * 写入操作日志
 */
async function writeLog(action, extra = {}) {
  try {
    const { OPENID } = cloud.getWXContext()
    await db.collection('logs').add({
      data: {
        action,
        operator: OPENID || 'system',
        ...extra,
        createTime: new Date()
      }
    })
  } catch (e) {
    console.error('[db.writeLog] 失败:', e)
  }
}

module.exports = {
  db,
  _,
  insertOne,
  updateOne,
  getById,
  findOne,
  query,
  updateWhere,
  fetchAll,
  writeLog
}
