/**
 * utils/lockKeys.js - 表单防重复提交锁键常量
 * 统一各提交场景的锁键名，避免同场景在不同页面使用不同锁键导致防抖失效。
 */
export const LOCK_KEYS = {
  FEEDBACK_SUBMIT: 'lock:feedback:submit',
  SNAPSHOT_SUBMIT: 'lock:snapshot:submit',
  MAIL_SUBMIT: 'lock:mail:submit',
  REPORT_SUBMIT: 'lock:report:submit',
  LOST_FOUND_SUBMIT: 'lock:lostfound:submit',
  VERIFY_SUBMIT: 'lock:verify:submit',
  VOTE_SUBMIT: 'lock:vote:submit',
  MEETING_SUBMIT: 'lock:meeting:submit',
  PUBLISH_SUBMIT: 'lock:publish:submit'
}

export default LOCK_KEYS
