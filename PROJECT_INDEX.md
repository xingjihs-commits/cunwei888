# 项目索引（PROJECT INDEX）

> 本文件由 `codebase-index` 技能的 `gen-index.js` 自动生成，请勿手工编辑。
>
> 用途：文件 → 函数 / 导出 / 常量 + 行号，供快速定位。
> 重新生成：`node <skill>/gen-index.js E:/village-bridge-fixed`
>
> 生成时间：2026-10-10T09:11:27.366Z

## 统计

- 索引文件：1169（.vue 93，其他 1076）
- 符号条目：8788

### 目录分布

- `(root)/` — 1 文件
- `cloudfunctions/` — 1045 文件
- `components/` — 22 文件
- `composables/` — 3 文件
- `pages/` — 71 文件
- `scripts/` — 9 文件
- `store/` — 2 文件
- `utils/` — 16 文件

---

## cloudfunctions/approveUser/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/approveUser/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/approveUser/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/approveUser/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/approveUser/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/approveUser/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/approveUser/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/approveUser/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/approveUser/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/approveUser/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/approveUser/index.js

- L8 `[const]` cloud
- L12 `[const]` db
- L13 `[const]` _
- L17 `[cloud]` main

## cloudfunctions/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/createMeeting/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/createMeeting/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/createMeeting/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/createMeeting/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/createMeeting/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/createMeeting/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/createMeeting/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/createMeeting/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/createMeeting/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/createMeeting/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/createMeeting/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/createVote/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/createVote/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/createVote/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/createVote/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/createVote/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/createVote/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/createVote/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/createVote/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/createVote/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/createVote/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/createVote/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/detectAbnormalBehavior/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/detectAbnormalBehavior/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/detectAbnormalBehavior/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/detectAbnormalBehavior/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/detectAbnormalBehavior/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/detectAbnormalBehavior/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/detectAbnormalBehavior/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/detectAbnormalBehavior/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/detectAbnormalBehavior/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/detectAbnormalBehavior/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/detectAbnormalBehavior/index.js

- L9 `[const]` cloud
- L12 `[const]` db
- L13 `[const]` _
- L14 `[const]` $
- L18 `[cloud]` main

## cloudfunctions/dispatchRecord/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/dispatchRecord/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/dispatchRecord/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/dispatchRecord/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/dispatchRecord/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/dispatchRecord/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/dispatchRecord/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/dispatchRecord/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/dispatchRecord/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/dispatchRecord/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/dispatchRecord/index.js

- L6 `[const]` cloud
- L10 `[const]` db
- L15 `[cloud]` main

## cloudfunctions/elderlyCheckin/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/elderlyCheckin/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/elderlyCheckin/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/elderlyCheckin/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/elderlyCheckin/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/elderlyCheckin/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/elderlyCheckin/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/elderlyCheckin/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/elderlyCheckin/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/elderlyCheckin/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/elderlyCheckin/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[const]` STATUS_MAP
- L21 `[cloud]` main

## cloudfunctions/evaluateFeedback/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/evaluateFeedback/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/evaluateFeedback/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/evaluateFeedback/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/evaluateFeedback/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/evaluateFeedback/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/evaluateFeedback/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/evaluateFeedback/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/evaluateFeedback/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/evaluateFeedback/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/evaluateFeedback/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/exportPerformanceReport/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/exportPerformanceReport/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/exportPerformanceReport/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/exportPerformanceReport/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/exportPerformanceReport/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/exportPerformanceReport/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/exportPerformanceReport/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/exportPerformanceReport/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/exportPerformanceReport/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/exportPerformanceReport/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/exportPerformanceReport/index.js

- L5 `[const]` cloud
- L10 `[const]` db
- L11 `[const]` _
- L15 `[cloud]` main

## cloudfunctions/formatText/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/formatText/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/formatText/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/formatText/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/formatText/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/formatText/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/formatText/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/formatText/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/formatText/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/formatText/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/formatText/index.js

- L5 `[const]` cloud
- L8 `[fn]` autoFormat
- L41 `[cloud]` main

## cloudfunctions/generatePerformanceReport/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/generatePerformanceReport/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/generatePerformanceReport/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/generatePerformanceReport/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/generatePerformanceReport/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/generatePerformanceReport/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/generatePerformanceReport/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/generatePerformanceReport/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/generatePerformanceReport/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/generatePerformanceReport/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/generatePerformanceReport/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/generateUpperReport/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/generateUpperReport/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/generateUpperReport/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/generateUpperReport/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/generateUpperReport/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/generateUpperReport/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/generateUpperReport/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/generateUpperReport/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/generateUpperReport/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/generateUpperReport/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/generateUpperReport/index.js

- L5 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L14 `[cloud]` main

## cloudfunctions/getAgriCalendar/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getAgriCalendar/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getAgriCalendar/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getAgriCalendar/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getAgriCalendar/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getAgriCalendar/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getAgriCalendar/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getAgriCalendar/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getAgriCalendar/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getAgriCalendar/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getAgriCalendar/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main
- L40 `[fn]` getDefaultCalendar

## cloudfunctions/getAuditQueue/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getAuditQueue/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getAuditQueue/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getAuditQueue/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getAuditQueue/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getAuditQueue/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getAuditQueue/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getAuditQueue/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getAuditQueue/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getAuditQueue/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getAuditQueue/index.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L14 `[cloud]` main

## cloudfunctions/getBroadcasts/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getBroadcasts/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getBroadcasts/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getBroadcasts/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getBroadcasts/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getBroadcasts/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getBroadcasts/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getBroadcasts/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getBroadcasts/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getBroadcasts/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getBroadcasts/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getCheckinStatus/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getCheckinStatus/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getCheckinStatus/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getCheckinStatus/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getCheckinStatus/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getCheckinStatus/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getCheckinStatus/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getCheckinStatus/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getCheckinStatus/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getCheckinStatus/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getCheckinStatus/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/getDashboardStats/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getDashboardStats/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getDashboardStats/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getDashboardStats/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getDashboardStats/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getDashboardStats/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getDashboardStats/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getDashboardStats/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getDashboardStats/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getDashboardStats/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getDashboardStats/index.js

- L5 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L14 `[cloud]` main

## cloudfunctions/getDispatchMap/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getDispatchMap/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getDispatchMap/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getDispatchMap/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getDispatchMap/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getDispatchMap/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getDispatchMap/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getDispatchMap/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getDispatchMap/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getDispatchMap/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getDispatchMap/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L11 `[const]` DEFAULT_MAP
- L20 `[cloud]` main

## cloudfunctions/getFeedbackList/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getFeedbackList/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getFeedbackList/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getFeedbackList/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getFeedbackList/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getFeedbackList/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getFeedbackList/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getFeedbackList/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getFeedbackList/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getFeedbackList/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getFeedbackList/index.js

- L8 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L16 `[cloud]` main

## cloudfunctions/getFinanceReports/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getFinanceReports/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getFinanceReports/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getFinanceReports/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getFinanceReports/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getFinanceReports/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getFinanceReports/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getFinanceReports/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getFinanceReports/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getFinanceReports/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getFinanceReports/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getHomeData/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getHomeData/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getHomeData/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getHomeData/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getHomeData/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getHomeData/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getHomeData/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getHomeData/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getHomeData/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getHomeData/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getHomeData/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L10 `[const]` EMPTY
- L12 `[cloud]` main

## cloudfunctions/getLeaderContentList/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getLeaderContentList/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getLeaderContentList/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getLeaderContentList/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getLeaderContentList/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getLeaderContentList/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getLeaderContentList/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getLeaderContentList/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getLeaderContentList/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getLeaderContentList/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getLeaderContentList/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getLostFoundList/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getLostFoundList/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getLostFoundList/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getLostFoundList/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getLostFoundList/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getLostFoundList/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getLostFoundList/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getLostFoundList/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getLostFoundList/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getLostFoundList/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getLostFoundList/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getMarketPrices/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getMarketPrices/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getMarketPrices/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getMarketPrices/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getMarketPrices/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getMarketPrices/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getMarketPrices/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getMarketPrices/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getMarketPrices/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getMarketPrices/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getMarketPrices/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getMeetingDetail/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getMeetingDetail/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getMeetingDetail/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getMeetingDetail/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getMeetingDetail/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getMeetingDetail/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getMeetingDetail/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getMeetingDetail/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getMeetingDetail/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getMeetingDetail/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getMeetingDetail/index.js

- L5 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getMeetingReviewList/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getMeetingReviewList/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getMeetingReviewList/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getMeetingReviewList/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getMeetingReviewList/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getMeetingReviewList/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getMeetingReviewList/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getMeetingReviewList/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getMeetingReviewList/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getMeetingReviewList/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getMeetingReviewList/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getMeetings/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getMeetings/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getMeetings/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getMeetings/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getMeetings/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getMeetings/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getMeetings/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getMeetings/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getMeetings/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getMeetings/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getMeetings/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getModuleConfig/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getModuleConfig/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getModuleConfig/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getModuleConfig/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getModuleConfig/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getModuleConfig/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getModuleConfig/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getModuleConfig/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getModuleConfig/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getModuleConfig/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getModuleConfig/index.js

- L13 `[const]` cloud
- L15 `[const]` db
- L17 `[cloud]` main

## cloudfunctions/getMyDispatched/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getMyDispatched/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getMyDispatched/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getMyDispatched/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getMyDispatched/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getMyDispatched/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getMyDispatched/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getMyDispatched/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getMyDispatched/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getMyDispatched/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getMyDispatched/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getMyFeedback/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getMyFeedback/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getMyFeedback/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getMyFeedback/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getMyFeedback/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getMyFeedback/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getMyFeedback/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getMyFeedback/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getMyFeedback/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getMyFeedback/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getMyFeedback/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getMyMails/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getMyMails/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getMyMails/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getMyMails/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getMyMails/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getMyMails/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getMyMails/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getMyMails/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getMyMails/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getMyMails/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getMyMails/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getMyMessages/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getMyMessages/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getMyMessages/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getMyMessages/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getMyMessages/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getMyMessages/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getMyMessages/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getMyMessages/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getMyMessages/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getMyMessages/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getMyMessages/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getMySnapshots/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getMySnapshots/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getMySnapshots/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getMySnapshots/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getMySnapshots/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getMySnapshots/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getMySnapshots/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getMySnapshots/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getMySnapshots/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getMySnapshots/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getMySnapshots/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getMySubsidies/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getMySubsidies/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getMySubsidies/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getMySubsidies/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getMySubsidies/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getMySubsidies/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getMySubsidies/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getMySubsidies/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getMySubsidies/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getMySubsidies/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getMySubsidies/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getNewsDetail/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getNewsDetail/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getNewsDetail/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getNewsDetail/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getNewsDetail/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getNewsDetail/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getNewsDetail/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getNewsDetail/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getNewsDetail/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getNewsDetail/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getNewsDetail/index.js

- L5 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getNewsList/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getNewsList/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getNewsList/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getNewsList/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getNewsList/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getNewsList/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getNewsList/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getNewsList/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getNewsList/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getNewsList/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getNewsList/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getNoticeDetail/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getNoticeDetail/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getNoticeDetail/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getNoticeDetail/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getNoticeDetail/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getNoticeDetail/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getNoticeDetail/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getNoticeDetail/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getNoticeDetail/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getNoticeDetail/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getNoticeDetail/index.js

- L5 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getNotices/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getNotices/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getNotices/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getNotices/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getNotices/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getNotices/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getNotices/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getNotices/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getNotices/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getNotices/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getNotices/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getPerformanceDashboard/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getPerformanceDashboard/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getPerformanceDashboard/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getPerformanceDashboard/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getPerformanceDashboard/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getPerformanceDashboard/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getPerformanceDashboard/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getPerformanceDashboard/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getPerformanceDashboard/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getPerformanceDashboard/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getPerformanceDashboard/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getProjects/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getProjects/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getProjects/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getProjects/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getProjects/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getProjects/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getProjects/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getProjects/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getProjects/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getProjects/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getProjects/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getRecordDetail/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getRecordDetail/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getRecordDetail/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getRecordDetail/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getRecordDetail/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getRecordDetail/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getRecordDetail/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getRecordDetail/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getRecordDetail/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getRecordDetail/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getRecordDetail/index.js

- L9 `[const]` cloud
- L13 `[const]` db
- L14 `[const]` _
- L16 `[cloud]` main

## cloudfunctions/getResolvedFeedback/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getResolvedFeedback/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getResolvedFeedback/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getResolvedFeedback/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getResolvedFeedback/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getResolvedFeedback/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getResolvedFeedback/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getResolvedFeedback/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getResolvedFeedback/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getResolvedFeedback/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getResolvedFeedback/index.js

- L9 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L15 `[cloud]` main

## cloudfunctions/getSecretaryMails/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getSecretaryMails/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getSecretaryMails/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getSecretaryMails/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getSecretaryMails/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getSecretaryMails/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getSecretaryMails/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getSecretaryMails/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getSecretaryMails/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getSecretaryMails/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getSecretaryMails/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getServiceGuideDetail/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getServiceGuideDetail/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getServiceGuideDetail/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getServiceGuideDetail/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getServiceGuideDetail/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getServiceGuideDetail/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getServiceGuideDetail/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getServiceGuideDetail/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getServiceGuideDetail/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getServiceGuideDetail/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getServiceGuideDetail/index.js

- L5 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getServiceGuides/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getServiceGuides/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getServiceGuides/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getServiceGuides/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getServiceGuides/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getServiceGuides/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getServiceGuides/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getServiceGuides/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getServiceGuides/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getServiceGuides/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getServiceGuides/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/getSnapshotWall/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getSnapshotWall/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getSnapshotWall/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getSnapshotWall/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getSnapshotWall/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getSnapshotWall/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getSnapshotWall/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getSnapshotWall/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getSnapshotWall/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getSnapshotWall/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getSnapshotWall/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L13 `[const]` WALL_STATUSES
- L20 `[cloud]` main

## cloudfunctions/getTaskDetail/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getTaskDetail/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getTaskDetail/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getTaskDetail/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getTaskDetail/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getTaskDetail/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getTaskDetail/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getTaskDetail/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getTaskDetail/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getTaskDetail/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getTaskDetail/index.js

- L5 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getTasks/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getTasks/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getTasks/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getTasks/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getTasks/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getTasks/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getTasks/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getTasks/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getTasks/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getTasks/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getTasks/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getTeamMemberDetail/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getTeamMemberDetail/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getTeamMemberDetail/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getTeamMemberDetail/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getTeamMemberDetail/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getTeamMemberDetail/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getTeamMemberDetail/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getTeamMemberDetail/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getTeamMemberDetail/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getTeamMemberDetail/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getTeamMemberDetail/index.js

- L5 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getTeamMembers/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getTeamMembers/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getTeamMembers/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getTeamMembers/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getTeamMembers/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getTeamMembers/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getTeamMembers/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getTeamMembers/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getTeamMembers/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getTeamMembers/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getTeamMembers/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getUpperReports/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getUpperReports/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getUpperReports/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getUpperReports/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getUpperReports/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getUpperReports/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getUpperReports/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getUpperReports/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getUpperReports/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getUpperReports/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getUpperReports/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getUserInfo/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getUserInfo/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getUserInfo/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getUserInfo/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getUserInfo/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getUserInfo/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getUserInfo/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getUserInfo/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getUserInfo/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getUserInfo/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getUserInfo/index.js

- L9 `[const]` cloud
- L11 `[const]` db
- L15 `[cloud]` main

## cloudfunctions/getVoteDetail/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getVoteDetail/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getVoteDetail/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getVoteDetail/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getVoteDetail/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getVoteDetail/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getVoteDetail/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getVoteDetail/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getVoteDetail/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getVoteDetail/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getVoteDetail/index.js

- L5 `[const]` cloud
- L10 `[const]` db
- L11 `[const]` _
- L14 `[cloud]` main

## cloudfunctions/getVotes/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getVotes/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getVotes/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getVotes/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getVotes/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getVotes/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getVotes/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getVotes/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getVotes/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getVotes/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getVotes/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getWeather/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/getWeather/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/getWeather/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/getWeather/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/getWeather/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/getWeather/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/getWeather/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/getWeather/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/getWeather/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/getWeather/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/getWeather/index.js

- L10 `[const]` https
- L12 `[const]` CACHE_TTL
- L15 `[fn]` fetchJson
- L33 `[cloud]` main

## cloudfunctions/handleSecretRecord/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/handleSecretRecord/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/handleSecretRecord/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/handleSecretRecord/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/handleSecretRecord/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/handleSecretRecord/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/handleSecretRecord/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/handleSecretRecord/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/handleSecretRecord/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/handleSecretRecord/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/handleSecretRecord/index.js

- L6 `[const]` cloud
- L9 `[const]` db
- L14 `[cloud]` main

## cloudfunctions/initDatabase/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/initDatabase/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/initDatabase/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/initDatabase/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/initDatabase/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/initDatabase/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/initDatabase/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/initDatabase/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/initDatabase/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/initDatabase/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/initDatabase/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L12 `[const]` COLLECTIONS
- L25 `[const]` INDEX_HINTS
- L37 `[cloud]` main

## cloudfunctions/initDatabase/initData.js

- L5 `[const]` cloud
- L7 `[const]` db
- L9 `[const]` INIT_DATA
- L217 `[fn]` initData

## cloudfunctions/likeNews/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/likeNews/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/likeNews/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/likeNews/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/likeNews/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/likeNews/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/likeNews/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/likeNews/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/likeNews/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/likeNews/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/likeNews/index.js

- L5 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/likeSnapshot/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/likeSnapshot/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/likeSnapshot/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/likeSnapshot/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/likeSnapshot/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/likeSnapshot/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/likeSnapshot/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/likeSnapshot/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/likeSnapshot/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/likeSnapshot/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/likeSnapshot/index.js

- L5 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/logError/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/logError/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/logError/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/logError/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/logError/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/logError/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/logError/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/logError/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/logError/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/logError/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/logError/index.js

- L7 `[const]` cloud
- L10 `[const]` db
- L11 `[const]` _
- L13 `[const]` RATE_LIMIT_PER_HOUR
- L15 `[cloud]` main

## cloudfunctions/markMessageRead/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/markMessageRead/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/markMessageRead/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/markMessageRead/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/markMessageRead/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/markMessageRead/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/markMessageRead/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/markMessageRead/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/markMessageRead/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/markMessageRead/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/markMessageRead/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/migrateStatusEnum/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/migrateStatusEnum/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/migrateStatusEnum/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/migrateStatusEnum/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/migrateStatusEnum/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/migrateStatusEnum/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/migrateStatusEnum/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/migrateStatusEnum/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/migrateStatusEnum/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/migrateStatusEnum/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/migrateStatusEnum/index.js

- L8 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L15 `[const]` STATUS_MAP
- L17 `[cloud]` main

## cloudfunctions/publishBroadcast/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/publishBroadcast/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/publishBroadcast/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/publishBroadcast/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/publishBroadcast/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/publishBroadcast/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/publishBroadcast/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/publishBroadcast/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/publishBroadcast/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/publishBroadcast/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/publishBroadcast/index.js

- L8 `[const]` cloud
- L13 `[const]` db
- L14 `[const]` _
- L16 `[cloud]` main

## cloudfunctions/publishFinanceReport/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/publishFinanceReport/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/publishFinanceReport/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/publishFinanceReport/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/publishFinanceReport/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/publishFinanceReport/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/publishFinanceReport/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/publishFinanceReport/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/publishFinanceReport/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/publishFinanceReport/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/publishFinanceReport/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/publishLeaderContent/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/publishLeaderContent/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/publishLeaderContent/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/publishLeaderContent/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/publishLeaderContent/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/publishLeaderContent/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/publishLeaderContent/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/publishLeaderContent/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/publishLeaderContent/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/publishLeaderContent/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/publishLeaderContent/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L11 `[cloud]` main

## cloudfunctions/publishLostFound/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/publishLostFound/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/publishLostFound/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/publishLostFound/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/publishLostFound/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/publishLostFound/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/publishLostFound/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/publishLostFound/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/publishLostFound/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/publishLostFound/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/publishLostFound/index.js

- L8 `[const]` cloud
- L10 `[const]` db
- L15 `[const]` VALID_SUB_TYPES
- L17 `[cloud]` main

## cloudfunctions/publishMarketPrice/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/publishMarketPrice/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/publishMarketPrice/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/publishMarketPrice/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/publishMarketPrice/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/publishMarketPrice/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/publishMarketPrice/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/publishMarketPrice/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/publishMarketPrice/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/publishMarketPrice/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/publishMarketPrice/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L14 `[cloud]` main

## cloudfunctions/publishNews/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/publishNews/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/publishNews/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/publishNews/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/publishNews/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/publishNews/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/publishNews/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/publishNews/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/publishNews/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/publishNews/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/publishNews/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/publishNotice/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/publishNotice/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/publishNotice/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/publishNotice/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/publishNotice/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/publishNotice/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/publishNotice/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/publishNotice/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/publishNotice/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/publishNotice/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/publishNotice/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/publishProject/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/publishProject/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/publishProject/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/publishProject/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/publishProject/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/publishProject/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/publishProject/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/publishProject/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/publishProject/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/publishProject/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/publishProject/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/publishTask/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/publishTask/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/publishTask/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/publishTask/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/publishTask/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/publishTask/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/publishTask/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/publishTask/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/publishTask/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/publishTask/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/publishTask/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L14 `[cloud]` main

## cloudfunctions/publishTeamMember/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/publishTeamMember/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/publishTeamMember/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/publishTeamMember/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/publishTeamMember/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/publishTeamMember/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/publishTeamMember/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/publishTeamMember/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/publishTeamMember/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/publishTeamMember/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/publishTeamMember/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/replySecretaryMail/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/replySecretaryMail/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/replySecretaryMail/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/replySecretaryMail/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/replySecretaryMail/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/replySecretaryMail/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/replySecretaryMail/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/replySecretaryMail/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/replySecretaryMail/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/replySecretaryMail/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/replySecretaryMail/index.js

- L7 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L16 `[cloud]` main

## cloudfunctions/reviewContent/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/reviewContent/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/reviewContent/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/reviewContent/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/reviewContent/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/reviewContent/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/reviewContent/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/reviewContent/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/reviewContent/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/reviewContent/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/reviewContent/index.js

- L13 `[const]` cloud
- L17 `[const]` db
- L22 `[const]` MEDIA_COLLECTIONS
- L25 `[const]` REMOVE_ON_REJECT
- L30 `[cloud]` main

## cloudfunctions/searchAll/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/searchAll/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/searchAll/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/searchAll/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/searchAll/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/searchAll/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/searchAll/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/searchAll/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/searchAll/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/searchAll/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/searchAll/index.js

- L10 `[const]` cloud
- L12 `[const]` db
- L13 `[const]` _
- L16 `[const]` SOURCES
- L33 `[cloud]` main

## cloudfunctions/sendDispatchNotice/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/sendDispatchNotice/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/sendDispatchNotice/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/sendDispatchNotice/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/sendDispatchNotice/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/sendDispatchNotice/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/sendDispatchNotice/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/sendDispatchNotice/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/sendDispatchNotice/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/sendDispatchNotice/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/sendDispatchNotice/index.js

- L6 `[const]` cloud
- L10 `[const]` db
- L13 `[cloud]` main

## cloudfunctions/sendOverdueReminder/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/sendOverdueReminder/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/sendOverdueReminder/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/sendOverdueReminder/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/sendOverdueReminder/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/sendOverdueReminder/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/sendOverdueReminder/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/sendOverdueReminder/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/sendOverdueReminder/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/sendOverdueReminder/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/sendOverdueReminder/index.js

- L8 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L17 `[cloud]` main

## cloudfunctions/sendSubscribeMessage/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/sendSubscribeMessage/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/sendSubscribeMessage/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/sendSubscribeMessage/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/sendSubscribeMessage/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/sendSubscribeMessage/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/sendSubscribeMessage/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/sendSubscribeMessage/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/sendSubscribeMessage/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/sendSubscribeMessage/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/sendSubscribeMessage/index.js

- L7 `[const]` cloud
- L11 `[const]` db
- L16 `[const]` DEFAULT_TEMPLATES
- L27 `[const]` TYPE_PAGE_MAP
- L40 `[const]` CACHE_TTL
- L42 `[fn]` loadTemplates
- L65 `[cloud]` main
- L133 `[fn]` buildMessageData

## cloudfunctions/speechRecognition/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/speechRecognition/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/speechRecognition/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/speechRecognition/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/speechRecognition/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/speechRecognition/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/speechRecognition/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/speechRecognition/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/speechRecognition/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/speechRecognition/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/speechRecognition/index.js

- L7 `[const]` cloud
- L10 `[cloud]` main

## cloudfunctions/submitFeedback/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/submitFeedback/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/submitFeedback/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/submitFeedback/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/submitFeedback/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/submitFeedback/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/submitFeedback/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/submitFeedback/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/submitFeedback/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/submitFeedback/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/submitFeedback/index.js

- L11 `[const]` cloud
- L13 `[const]` db
- L14 `[const]` _
- L21 `[const]` DEFAULT_DISPATCH
- L30 `[cloud]` main

## cloudfunctions/submitReport/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/submitReport/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/submitReport/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/submitReport/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/submitReport/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/submitReport/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/submitReport/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/submitReport/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/submitReport/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/submitReport/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/submitReport/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L14 `[const]` VALID_TARGET_TYPES
- L16 `[cloud]` main

## cloudfunctions/submitSecretaryMail/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/submitSecretaryMail/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/submitSecretaryMail/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/submitSecretaryMail/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/submitSecretaryMail/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/submitSecretaryMail/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/submitSecretaryMail/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/submitSecretaryMail/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/submitSecretaryMail/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/submitSecretaryMail/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/submitSecretaryMail/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/submitSnapshot/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/submitSnapshot/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/submitSnapshot/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/submitSnapshot/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/submitSnapshot/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/submitSnapshot/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/submitSnapshot/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/submitSnapshot/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/submitSnapshot/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/submitSnapshot/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/submitSnapshot/index.js

- L8 `[const]` cloud
- L10 `[const]` db
- L11 `[const]` _
- L18 `[const]` SNAPSHOT_DISPATCH
- L27 `[cloud]` main

## cloudfunctions/submitVote/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/submitVote/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/submitVote/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/submitVote/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/submitVote/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/submitVote/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/submitVote/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/submitVote/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/submitVote/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/submitVote/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/submitVote/index.js

- L9 `[const]` cloud
- L13 `[const]` db
- L14 `[const]` _
- L17 `[cloud]` main

## cloudfunctions/subscribePriceAlert/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/subscribePriceAlert/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/subscribePriceAlert/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/subscribePriceAlert/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/subscribePriceAlert/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/subscribePriceAlert/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/subscribePriceAlert/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/subscribePriceAlert/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/subscribePriceAlert/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/subscribePriceAlert/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/subscribePriceAlert/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/updateDispatchMap/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/updateDispatchMap/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/updateDispatchMap/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/updateDispatchMap/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/updateDispatchMap/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/updateDispatchMap/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/updateDispatchMap/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/updateDispatchMap/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/updateDispatchMap/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/updateDispatchMap/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/updateDispatchMap/index.js

- L6 `[const]` cloud
- L10 `[const]` db
- L14 `[const]` ALLOWED_MAP_KEYS
- L16 `[cloud]` main

## cloudfunctions/updateFeedbackStatus/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/updateFeedbackStatus/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/updateFeedbackStatus/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/updateFeedbackStatus/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/updateFeedbackStatus/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/updateFeedbackStatus/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/updateFeedbackStatus/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/updateFeedbackStatus/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/updateFeedbackStatus/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/updateFeedbackStatus/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/updateFeedbackStatus/index.js

- L8 `[const]` cloud
- L12 `[const]` db
- L13 `[const]` _
- L19 `[const]` ALLOWED_STATUSES
- L26 `[cloud]` main

## cloudfunctions/updateMeetingMinutes/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/updateMeetingMinutes/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/updateMeetingMinutes/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/updateMeetingMinutes/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/updateMeetingMinutes/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/updateMeetingMinutes/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/updateMeetingMinutes/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/updateMeetingMinutes/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/updateMeetingMinutes/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/updateMeetingMinutes/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/updateMeetingMinutes/index.js

- L8 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L16 `[const]` ALLOWED_STATUSES
- L22 `[cloud]` main

## cloudfunctions/updateModuleConfig/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/updateModuleConfig/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/updateModuleConfig/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/updateModuleConfig/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/updateModuleConfig/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/updateModuleConfig/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/updateModuleConfig/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/updateModuleConfig/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/updateModuleConfig/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/updateModuleConfig/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/updateModuleConfig/index.js

- L14 `[const]` cloud
- L17 `[const]` db
- L21 `[cloud]` main

## cloudfunctions/updateModuleSwitch/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/updateModuleSwitch/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/updateModuleSwitch/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/updateModuleSwitch/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/updateModuleSwitch/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/updateModuleSwitch/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/updateModuleSwitch/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/updateModuleSwitch/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/updateModuleSwitch/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/updateModuleSwitch/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/updateModuleSwitch/index.js

- L6 `[const]` cloud
- L9 `[const]` db
- L14 `[const]` ALLOWED_MODULE_KEYS
- L19 `[cloud]` main

## cloudfunctions/updateSnapshotStatus/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/updateSnapshotStatus/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/updateSnapshotStatus/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/updateSnapshotStatus/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/updateSnapshotStatus/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/updateSnapshotStatus/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/updateSnapshotStatus/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/updateSnapshotStatus/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/updateSnapshotStatus/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/updateSnapshotStatus/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/updateSnapshotStatus/index.js

- L5 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L14 `[const]` ALLOWED_STATUSES
- L19 `[cloud]` main

## cloudfunctions/updateSubscribeTemplates/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/updateSubscribeTemplates/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/updateSubscribeTemplates/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/updateSubscribeTemplates/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/updateSubscribeTemplates/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/updateSubscribeTemplates/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/updateSubscribeTemplates/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/updateSubscribeTemplates/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/updateSubscribeTemplates/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/updateSubscribeTemplates/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/updateSubscribeTemplates/index.js

- L6 `[const]` cloud
- L9 `[const]` db
- L14 `[const]` ALLOWED_TEMPLATE_KEYS
- L19 `[cloud]` main

## cloudfunctions/updateTaskProgress/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/updateTaskProgress/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/updateTaskProgress/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/updateTaskProgress/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/updateTaskProgress/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/updateTaskProgress/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/updateTaskProgress/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/updateTaskProgress/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/updateTaskProgress/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/updateTaskProgress/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/updateTaskProgress/index.js

- L8 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L16 `[const]` ALLOWED_TASK_STATUSES
- L22 `[cloud]` main

## cloudfunctions/updateVillageInfo/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/updateVillageInfo/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/updateVillageInfo/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/updateVillageInfo/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/updateVillageInfo/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/updateVillageInfo/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/updateVillageInfo/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/updateVillageInfo/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/updateVillageInfo/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/updateVillageInfo/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/updateVillageInfo/index.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L14 `[cloud]` main

## cloudfunctions/verifyUser/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/verifyUser/common/checkAdmin.js

- L16 `[const]` cloud
- L18 `[const]` db
- L26 `[fn]` checkAdmin
- L42 `[fn]` getAdminInfo
- L60 `[fn]` getAdminRole
- L70 `[fn]` checkAdminWeight
- L81 `[fn]` checkSecretary
- L97 `[const]` MAX_SEGMENT
- L99 `[fn]` splitSegments
- L115 `[fn]` checkContentSecurity
- L152 `[fn]` checkImageSecurity
- L187 `[fn]` checkImagesSecurity
- L204 `[fn]` attachQueueRecord
- L218 `[fn]` _writeAuditQueue
- L240 `[fn]` checkAdminWrapper
- L254 `[cloud]` checkAdmin
- L255 `[cloud]` getAdminInfo
- L256 `[cloud]` getAdminRole
- L257 `[cloud]` checkAdminWeight
- L258 `[cloud]` checkSecretary
- L259 `[cloud]` checkContentSecurity
- L260 `[cloud]` checkImageSecurity
- L261 `[cloud]` checkImagesSecurity
- L262 `[cloud]` attachQueueRecord

## cloudfunctions/verifyUser/common/constants.js

- L8 `[const]` RECORD_STATUS
- L18 `[const]` RECORD_OPEN_STATUSES
- L20 `[const]` RECORD_DONE_STATUSES
- L23 `[const]` FEEDBACK_TYPES
- L26 `[const]` SECRET_TYPES
- L29 `[const]` SUPERVISE_LEVEL
- L36 `[const]` URGENT_LEVEL
- L43 `[const]` DEADLINE_MAP
- L50 `[const]` TASK_STATUS
- L58 `[const]` TASK_OPEN_STATUSES
- L59 `[const]` TASK_DONE_STATUSES
- L62 `[const]` VOTE_STATUS
- L69 `[const]` MEETING_STATUS
- L77 `[const]` LOST_FOUND_STATUS
- L83 `[const]` MAIL_STATUS
- L91 `[const]` RECTIFICATION_STATUS
- L97 `[const]` AUDIT_STATUS
- L104 `[const]` VERIFY_STATUS
- L111 `[const]` PRICE_TREND
- L119 `[const]` STATUS_LEGACY_MAP
- L156 `[fn]` normalizeStatus
- L166 `[fn]` expandStatuses

## cloudfunctions/verifyUser/common/db.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L18 `[fn]` insertOne
- L36 `[fn]` updateOne
- L47 `[fn]` getById
- L55 `[fn]` findOne
- L63 `[fn]` query
- L78 `[fn]` updateWhere
- L91 `[fn]` fetchAll
- L112 `[fn]` writeLog

## cloudfunctions/verifyUser/common/docUtils.js

- L17 `[fn]` pluckDoc
- L30 `[fn]` hashId
- L45 `[fn]` csvEscape
- L60 `[fn]` escapeRegExp

## cloudfunctions/verifyUser/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/verifyUser/common/internal.js

- L13 `[const]` INTERNAL_TOKEN
- L16 `[fn]` isInternalCall

## cloudfunctions/verifyUser/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/verifyUser/common/mediaReview.js

- L7 `[const]` cloud
- L10 `[const]` db
- L17 `[fn]` notifyBroadcast
- L60 `[fn]` applyMediaReview

## cloudfunctions/verifyUser/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/verifyUser/index.js

- L9 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L17 `[cloud]` main

## components/AppBanner.vue

- L51 `[props]` props
- L55 `[emits]` emits
- L57 `[reactive]` current
- L60 `[reactive]` autoPlay
- L62 `[fn]` onChange

## components/AppErrorBanner.vue

- L24 `[props]` props
- L33 `[emits]` emits
- L35 `[fn]` goBack

## components/AppIcon.vue

- L65 `[props]` props
- L74 `[reactive]` strokeWidth
- L81 `[reactive]` maskImage

## components/AppSectionTitle.vue

- L22 `[props]` props
- L27 `[emits]` emits

## components/BigButton.vue

- L26 `[reactive]` configStore
- L27 `[fn]` t
- L29 `[props]` props
- L42 `[emits]` emits
- L45 `[reactive]` btnStyle
- L56 `[fn]` handleClick

## components/Disclaimer.vue

- L21 `[props]` props

## components/EmptyState.vue

- L24 `[props]` props
- L33 `[emits]` emits
- L58 `[reactive]` resolvedIcon

## components/FeedbackCard.vue

- L41 `[reactive]` configStore
- L42 `[fn]` t
- L48 `[props]` props
- L52 `[emits]` emits
- L54 `[reactive]` typeName
- L58 `[fn]` onTap

## components/NewsCard.vue

- L38 `[props]` props
- L42 `[emits]` emits
- L44 `[fn]` onTap

## components/ProgressTimeline.vue

- L43 `[props]` props
- L59 `[reactive]` displayEvents
- L83 `[fn]` isCurrentStep
- L89 `[fn]` formatTime

## components/ResponsibleInfo.vue

- L25 `[props]` props
- L40 `[fn]` onCall

## components/Skeleton.vue

- L66 `[props]` props

## components/SnapshotCard.vue

- L50 `[props]` props
- L54 `[emits]` emits
- L56 `[reactive]` configStore
- L58 `[reactive]` typeName
- L60 `[fn]` onTap

## components/StatusTag.vue

- L14 `[props]` props

## components/TaskCard.vue

- L47 `[props]` props
- L51 `[emits]` emits
- L53 `[fn]` onTap

## components/VoiceInput.vue

- L36 `[reactive]` configStore
- L37 `[fn]` t
- L43 `[emits]` emits
- L45 `[reactive]` isRecording
- L46 `[reactive]` duration
- L62 `[fn]` onTouchStart
- L83 `[fn]` onTouchEnd

## components/admin/PublishExtraFields.vue

- L99 `[reactive]` configStore
- L100 `[fn]` t
- L102 `[props]` props

## components/home/CategoryList.vue

- L26 `[props]` props
- L29 `[emits]` emits
- L31 `[reactive]` configStore
- L32 `[fn]` t

## components/home/LeaderCare.vue

- L45 `[props]` props
- L49 `[emits]` emits
- L51 `[reactive]` configStore
- L52 `[fn]` t
- L54 `[reactive]` isVideo

## components/home/PhoneGrid.vue

- L23 `[props]` props
- L26 `[emits]` emits
- L28 `[reactive]` configStore
- L29 `[fn]` t

## components/home/SecretaryCards.vue

- L27 `[emits]` emits
- L29 `[reactive]` configStore
- L30 `[fn]` t

## components/home/WeatherBar.vue

- L22 `[props]` props
- L27 `[reactive]` icon
- L37 `[reactive]` nowText
- L43 `[reactive]` tomorrowText
- L49 `[reactive]` farmingText

## composables/useA11y.js

- L12 `[const]` FONT_BASE_RPX
- L14 `[export]` useRootFontSize

## composables/useAdminGuard.js

- L15 `[export]` useAdminGuard

## composables/usePagination.js

- L20 `[export]` usePagination

## main.js

- L10 `[export]` createApp

## pages/admin/audit-queue.vue

- L56 `[reactive]` rootFontSize
- L58 `[reactive]` configStore
- L59 `[fn]` t
- L61 `[reactive]` list
- L62 `[reactive]` loading
- L63 `[reactive]` loadError
- L73 `[fn]` loadData
- L92 `[fn]` reasonText
- L102 `[fn]` previewImage
- L106 `[fn]` onHandle

## pages/admin/auth-list.vue

- L55 `[reactive]` rootFontSize
- L57 `[reactive]` configStore
- L58 `[fn]` t
- L60 `[reactive]` list
- L61 `[reactive]` loading
- L62 `[reactive]` loadError
- L63 `[reactive]` cur
- L74 `[reactive]` phoneCount
- L82 `[reactive]` filtered
- L87 `[fn]` statusKey
- L96 `[fn]` statusText
- L112 `[fn]` loadData
- L129 `[fn]` callUser
- L137 `[fn]` onConfirm
- L152 `[fn]` onBlock

## pages/admin/dashboard.vue

- L133 `[reactive]` rootFontSize
- L135 `[reactive]` configStore
- L136 `[fn]` t
- L138 `[reactive]` loading
- L139 `[reactive]` monthIndex
- L142 `[reactive]` months
- L147 `[reactive]` currentDim
- L148 `[reactive]` overview
- L149 `[reactive]` dimensionData
- L168 `[fn]` loadData
- L199 `[fn]` onMonthChange
- L204 `[fn]` switchDim
- L209 `[fn]` goProjection
- L213 `[fn]` exportReport

## pages/admin/dispatch-config.vue

- L78 `[reactive]` rootFontSize
- L80 `[reactive]` configStore
- L81 `[fn]` t
- L84 `[reactive]` types
- L86 `[reactive]` dispatchMap
- L97 `[fn]` initDefaults
- L103 `[fn]` loadData
- L118 `[fn]` onInput
- L122 `[fn]` onSave

## pages/admin/dispatch.vue

- L100 `[reactive]` rootFontSize
- L102 `[reactive]` configStore
- L103 `[fn]` t
- L105 `[reactive]` record
- L106 `[reactive]` recordId
- L107 `[reactive]` dispatchMap
- L108 `[reactive]` selectedType
- L109 `[reactive]` selectedPerson
- L110 `[reactive]` note
- L119 `[fn]` loadData
- L140 `[fn]` selectPerson
- L147 `[fn]` onDispatch

## pages/admin/feedback-handle.vue

- L116 `[reactive]` rootFontSize
- L118 `[reactive]` configStore
- L119 `[fn]` t
- L120 `[reactive]` record
- L121 `[reactive]` recordId
- L122 `[reactive]` loading
- L124 `[reactive]` form
- L151 `[fn]` loadData
- L174 `[fn]` previewImage
- L178 `[fn]` previewReplyImage
- L182 `[fn]` chooseImage
- L200 `[fn]` removeImage
- L204 `[fn]` onSubmit

## pages/admin/feedback-list.vue

- L88 `[reactive]` rootFontSize
- L90 `[reactive]` configStore
- L91 `[fn]` t
- L92 `[reactive]` list
- L93 `[reactive]` loading
- L94 `[reactive]` page
- L95 `[reactive]` total
- L96 `[reactive]` currentStatus
- L97 `[reactive]` typeIndex
- L98 `[reactive]` urgentIndex
- L114 `[reactive]` overdueCount
- L115 `[reactive]` completedCount
- L131 `[fn]` loadData
- L169 `[fn]` switchStatus
- L175 `[fn]` onTypeChange
- L181 `[fn]` onUrgentChange
- L187 `[fn]` loadMore
- L194 `[fn]` goHandle
- L199 `[fn]` goDispatch
- L204 `[fn]` markSecret

## pages/admin/finance-publish.vue

- L86 `[reactive]` rootFontSize
- L88 `[reactive]` configStore
- L89 `[fn]` t
- L91 `[fn]` uid
- L93 `[reactive]` form
- L103 `[reactive]` canSubmit
- L110 `[fn]` onVoiceResult
- L112 `[fn]` sumAmount
- L116 `[fn]` onSubmit

## pages/admin/leader-publish.vue

- L53 `[reactive]` rootFontSize
- L55 `[reactive]` configStore
- L56 `[fn]` t
- L58 `[reactive]` submitting
- L59 `[reactive]` form
- L66 `[fn]` chooseCover
- L80 `[fn]` chooseVideo
- L97 `[fn]` onPublish

## pages/admin/mail-detail.vue

- L59 `[reactive]` rootFontSize
- L61 `[reactive]` configStore
- L62 `[fn]` t
- L63 `[reactive]` mail
- L64 `[reactive]` mailId
- L65 `[reactive]` replyText
- L66 `[reactive]` isPublic
- L67 `[reactive]` loadError
- L68 `[reactive]` canReReply
- L77 `[fn]` loadData
- L94 `[fn]` onReply

## pages/admin/meeting-create.vue

- L58 `[reactive]` rootFontSize
- L60 `[reactive]` configStore
- L61 `[fn]` t
- L64 `[reactive]` typeIndex
- L67 `[reactive]` form
- L88 `[reactive]` canSubmit
- L95 `[fn]` onColChange
- L96 `[fn]` onTimeChange
- L102 `[fn]` onVoiceResult
- L104 `[fn]` onSubmit

## pages/admin/module-config.vue

- L82 `[reactive]` rootFontSize
- L84 `[reactive]` configStore
- L85 `[reactive]` saving
- L87 `[reactive]` config
- L121 `[reactive]` moduleGroups
- L130 `[fn]` phoneName
- L142 `[fn]` buildModuleGroups
- L152 `[fn]` loadConfig
- L165 `[fn]` goDispatchConfig
- L169 `[fn]` onSave

## pages/admin/my-dispatched.vue

- L55 `[reactive]` rootFontSize
- L57 `[reactive]` userStore
- L58 `[reactive]` configStore
- L59 `[fn]` t
- L60 `[reactive]` loadError
- L61 `[reactive]` currentStatus
- L104 `[fn]` onTabChange
- L109 `[fn]` recordStatusClass
- L118 `[fn]` goDetail

## pages/admin/name-config.vue

- L29 `[reactive]` rootFontSize
- L31 `[reactive]` configStore
- L32 `[fn]` t
- L33 `[reactive]` saving
- L34 `[reactive]` local
- L57 `[fn]` onSave

## pages/admin/projection.vue

- L89 `[reactive]` rootFontSize
- L91 `[reactive]` configStore
- L92 `[fn]` t
- L93 `[reactive]` villageName
- L95 `[reactive]` period
- L96 `[reactive]` overview
- L97 `[reactive]` dimensionData
- L98 `[reactive]` dimIndex
- L99 `[reactive]` autoPlay
- L109 `[reactive]` currentDim
- L110 `[reactive]` dimTitle
- L128 `[fn]` loadData
- L144 `[fn]` onTouchStart
- L148 `[fn]` onTouchEnd
- L164 `[fn]` toggleAuto

## pages/admin/publish.vue

- L75 `[reactive]` rootFontSize
- L77 `[reactive]` configStore
- L78 `[fn]` t
- L80 `[reactive]` currentType
- L81 `[reactive]` noticeCatIndex
- L82 `[reactive]` newsCatIndex
- L101 `[fn]` createForm
- L127 `[reactive]` form
- L129 `[reactive]` canPublish
- L142 `[fn]` onFormat
- L147 `[fn]` saveDraft
- L157 `[fn]` switchType
- L162 `[fn]` onVoiceResult
- L164 `[fn]` chooseImage
- L182 `[fn]` removeImage
- L186 `[fn]` previewImage
- L190 `[fn]` onPublish

## pages/admin/responsible.vue

- L53 `[reactive]` rootFontSize
- L55 `[reactive]` configStore
- L56 `[fn]` t
- L58 `[reactive]` list
- L59 `[reactive]` newMember
- L71 `[fn]` loadData
- L82 `[fn]` addMember
- L105 `[fn]` removeMember
- L118 `[fn]` showAddDialog

## pages/admin/secret-list.vue

- L49 `[reactive]` rootFontSize
- L51 `[reactive]` configStore
- L52 `[fn]` t
- L54 `[reactive]` list
- L55 `[reactive]` loading
- L56 `[reactive]` page
- L57 `[reactive]` total
- L58 `[reactive]` currentStatus
- L74 `[fn]` loadData
- L104 `[fn]` switchStatus
- L110 `[fn]` loadMore
- L117 `[fn]` goDetail

## pages/admin/secretary-mails.vue

- L50 `[reactive]` rootFontSize
- L52 `[reactive]` configStore
- L53 `[fn]` t
- L55 `[reactive]` loadError
- L56 `[reactive]` currentStatus
- L91 `[fn]` onTabChange
- L96 `[fn]` mailStatusText
- L97 `[fn]` mailStatusClass
- L105 `[fn]` goDetail

## pages/admin/upper-reports.vue

- L62 `[reactive]` rootFontSize
- L64 `[reactive]` configStore
- L65 `[fn]` t
- L67 `[reactive]` list
- L68 `[reactive]` loading
- L69 `[reactive]` loadError
- L79 `[fn]` loadData
- L98 `[fn]` onGenerate

## pages/admin/vote-create.vue

- L54 `[reactive]` rootFontSize
- L56 `[reactive]` configStore
- L57 `[fn]` t
- L59 `[reactive]` form
- L67 `[reactive]` voterScopeIndex
- L69 `[reactive]` canSubmit
- L80 `[fn]` onVoiceResult
- L82 `[fn]` onSubmit

## pages/agreement/index.vue

- L60 `[reactive]` rootFontSize
- L62 `[reactive]` configStore
- L63 `[reactive]` villagePhone

## pages/agri/calendar.vue

- L40 `[reactive]` rootFontSize
- L42 `[reactive]` configStore
- L43 `[fn]` t
- L45 `[reactive]` list
- L46 `[reactive]` currentMonth
- L47 `[reactive]` loading
- L54 `[fn]` loadData
- L63 `[fn]` changeMonth

## pages/agri/checkin.vue

- L53 `[reactive]` rootFontSize
- L55 `[reactive]` configStore
- L56 `[fn]` t
- L59 `[reactive]` selectedStatus
- L60 `[reactive]` note
- L61 `[reactive]` streak
- L62 `[reactive]` todayChecked
- L76 `[fn]` loadData
- L86 `[fn]` doCheckin

## pages/auth/verify.vue

- L67 `[reactive]` rootFontSize
- L69 `[reactive]` userStore
- L70 `[reactive]` configStore
- L71 `[fn]` t
- L72 `[reactive]` form
- L77 `[reactive]` phoneCode
- L78 `[reactive]` agreed
- L79 `[reactive]` submitting
- L81 `[reactive]` canSubmit
- L89 `[fn]` onGetPhone
- L99 `[fn]` resetPhone
- L104 `[fn]` onSubmit
- L137 `[fn]` goAgreement
- L138 `[fn]` goPrivacy

## pages/category/list.vue

- L40 `[reactive]` rootFontSize
- L42 `[reactive]` configStore
- L89 `[reactive]` type
- L90 `[reactive]` currentSub
- L98 `[reactive]` catName
- L99 `[reactive]` subs
- L100 `[reactive]` activeSub
- L102 `[fn]` subName
- L105 `[fn]` go

## pages/feedback/detail.vue

- L146 `[reactive]` configStore
- L147 `[fn]` t
- L148 `[reactive]` rootFontSize
- L149 `[reactive]` record
- L150 `[reactive]` recordId
- L151 `[reactive]` evaluation
- L152 `[reactive]` evaluationText
- L153 `[reactive]` loadError
- L154 `[reactive]` loading
- L156 `[reactive]` isCompleted
- L160 `[reactive]` recordStatusClass
- L169 `[reactive]` timelineEvents
- L215 `[fn]` loadData
- L235 `[fn]` previewImage
- L242 `[fn]` previewReplyImage
- L249 `[fn]` goReport
- L254 `[fn]` submitEval

## pages/feedback/feedback.vue

- L109 `[reactive]` configStore
- L110 `[fn]` t
- L111 `[reactive]` rootFontSize
- L112 `[reactive]` statusBarHeight
- L116 `[reactive]` form
- L130 `[reactive]` canSubmit
- L161 `[fn]` clearDraft
- L165 `[fn]` goBack
- L169 `[fn]` onVoiceResult
- L173 `[fn]` chooseImage
- L191 `[fn]` removeImage
- L195 `[fn]` previewImage
- L202 `[fn]` onSubmit

## pages/feedback/my-feedback.vue

- L45 `[reactive]` rootFontSize
- L47 `[reactive]` configStore
- L48 `[fn]` t
- L50 `[reactive]` currentStatus
- L69 `[fn]` switchStatus
- L74 `[fn]` goDetail
- L78 `[fn]` goFeedback

## pages/finance/detail.vue

- L95 `[reactive]` rootFontSize
- L97 `[reactive]` configStore
- L98 `[fn]` t
- L99 `[reactive]` report
- L100 `[reactive]` financeId
- L101 `[reactive]` loading
- L106 `[fn]` loadData

## pages/finance/list.vue

- L53 `[reactive]` rootFontSize
- L55 `[reactive]` configStore
- L56 `[fn]` t
- L59 `[reactive]` yearIndex
- L75 `[fn]` onYearChange
- L76 `[fn]` goDetail

## pages/index/index.vue

- L144 `[reactive]` configStore
- L145 `[reactive]` rootFontSize
- L148 `[fn]` noticeTagClass
- L153 `[reactive]` statusBarHeight
- L154 `[reactive]` newsList
- L155 `[reactive]` noticeList
- L156 `[reactive]` unreadCount
- L157 `[reactive]` loadError
- L158 `[reactive]` isLoading
- L159 `[reactive]` weather
- L160 `[reactive]` farming
- L161 `[reactive]` homeEmergency
- L162 `[reactive]` offline
- L163 `[reactive]` resolvedList
- L166 `[reactive]` contentTop
- L174 `[reactive]` villageName
- L175 `[reactive]` emergency
- L178 `[reactive]` bannerItems
- L188 `[fn]` t
- L191 `[fn]` show
- L213 `[fn]` loadData
- L236 `[fn]` applyHomeData
- L254 `[fn]` useCacheFallback
- L265 `[fn]` loadResolved
- L276 `[fn]` loadWeather
- L287 `[fn]` goNews
- L291 `[fn]` goNotice
- L295 `[fn]` loadMore

## pages/leader/detail.vue

- L39 `[reactive]` rootFontSize
- L41 `[reactive]` configStore
- L42 `[fn]` t
- L43 `[reactive]` detail
- L44 `[reactive]` loading

## pages/leader/list.vue

- L41 `[reactive]` rootFontSize
- L43 `[reactive]` configStore
- L44 `[reactive]` type
- L51 `[fn]` t
- L53 `[fn]` switchType
- L66 `[fn]` goDetail

## pages/lost-found/list.vue

- L45 `[reactive]` rootFontSize
- L47 `[reactive]` configStore
- L48 `[fn]` t
- L50 `[reactive]` currentType
- L63 `[fn]` switchType
- L64 `[fn]` goDetail
- L65 `[fn]` goPublish

## pages/lost-found/publish.vue

- L64 `[reactive]` rootFontSize
- L66 `[reactive]` configStore
- L67 `[fn]` t
- L70 `[reactive]` form
- L71 `[reactive]` canSubmit
- L85 `[fn]` clearDraft
- L87 `[fn]` onVoiceResult
- L89 `[fn]` chooseImage
- L98 `[fn]` removeImage
- L100 `[fn]` onSubmit

## pages/market/detail.vue

- L49 `[reactive]` rootFontSize
- L51 `[reactive]` configStore
- L52 `[fn]` t
- L53 `[reactive]` productName
- L54 `[reactive]` historyList
- L56 `[reactive]` currentProduct
- L57 `[reactive]` latestPrice
- L65 `[fn]` loadData

## pages/market/list.vue

- L55 `[reactive]` rootFontSize
- L57 `[reactive]` configStore
- L58 `[fn]` t
- L60 `[reactive]` keyword
- L61 `[reactive]` subscribedProducts
- L81 `[fn]` loadSubscriptions
- L86 `[fn]` isSubscribed
- L90 `[fn]` toggleSubscribe
- L108 `[fn]` trendText
- L113 `[fn]` onSearch
- L117 `[fn]` goDetail

## pages/meeting/detail.vue

- L68 `[reactive]` rootFontSize
- L70 `[reactive]` configStore
- L71 `[fn]` t
- L72 `[reactive]` meeting
- L73 `[reactive]` meetingId
- L74 `[reactive]` loadError
- L75 `[reactive]` loading
- L80 `[fn]` loadData
- L100 `[fn]` statusText
- L109 `[fn]` typeText
- L118 `[fn]` previewImage
- L122 `[fn]` goReport

## pages/meeting/list.vue

- L58 `[reactive]` rootFontSize
- L60 `[reactive]` userStore
- L61 `[reactive]` configStore
- L62 `[fn]` t
- L63 `[reactive]` currentType
- L85 `[fn]` switchType
- L90 `[fn]` typeText
- L95 `[fn]` goDetail
- L99 `[fn]` goCreate

## pages/message/center.vue

- L54 `[reactive]` rootFontSize
- L56 `[reactive]` configStore
- L57 `[fn]` t
- L59 `[reactive]` unreadCount
- L60 `[reactive]` currentType
- L88 `[fn]` switchType
- L90 `[fn]` typeIcon
- L99 `[fn]` markAllRead
- L110 `[fn]` goDetail

## pages/mine/mine.vue

- L149 `[reactive]` userStore
- L150 `[reactive]` configStore
- L151 `[fn]` t
- L152 `[reactive]` rootFontSize
- L153 `[reactive]` unreadCount
- L157 `[reactive]` verifyText
- L158 `[reactive]` verifyClass
- L159 `[reactive]` icpNumber
- L160 `[reactive]` policeIcpNumber
- L182 `[reactive]` visibleAdminEntries
- L193 `[fn]` loadUnread
- L202 `[fn]` onChooseAvatar
- L211 `[fn]` onNicknameConfirm
- L221 `[fn]` goVerify
- L225 `[fn]` showAbout

## pages/mine/profile.vue

- L62 `[reactive]` rootFontSize
- L64 `[reactive]` userStore
- L65 `[reactive]` configStore
- L66 `[fn]` t
- L72 `[reactive]` verifyText
- L73 `[reactive]` verifyClass
- L75 `[reactive]` shortOpenid
- L83 `[fn]` goVerify
- L87 `[fn]` editInfo
- L91 `[fn]` clearCache

## pages/news/detail.vue

- L70 `[reactive]` rootFontSize
- L72 `[reactive]` configStore
- L73 `[fn]` t
- L75 `[reactive]` news
- L76 `[reactive]` newsId
- L77 `[reactive]` hasLiked
- L78 `[reactive]` loadError
- L80 `[reactive]` userOpenid
- L97 `[fn]` loadData
- L116 `[fn]` goReport
- L121 `[fn]` toggleLike
- L143 `[fn]` previewImage

## pages/news/list.vue

- L52 `[reactive]` configStore
- L53 `[fn]` t
- L54 `[reactive]` rootFontSize
- L56 `[reactive]` currentCategory
- L68 `[fn]` fetchNews
- L93 `[fn]` switchCategory
- L98 `[fn]` goDetail
- L102 `[fn]` goHome

## pages/notice/detail.vue

- L65 `[reactive]` rootFontSize
- L67 `[reactive]` configStore
- L68 `[fn]` t
- L69 `[reactive]` notice
- L70 `[reactive]` noticeId
- L71 `[reactive]` loadError
- L79 `[fn]` loadData
- L96 `[fn]` getCategoryClass
- L101 `[fn]` previewImage
- L105 `[fn]` goReport

## pages/notice/list.vue

- L65 `[reactive]` rootFontSize
- L67 `[reactive]` configStore
- L68 `[fn]` t
- L70 `[reactive]` currentCategory
- L73 `[reactive]` yearIndex
- L75 `[fn]` fetchNotices
- L101 `[fn]` switchCategory
- L106 `[fn]` onYearChange
- L111 `[fn]` getCategoryClass
- L116 `[fn]` goDetail

## pages/privacy/index.vue

- L94 `[reactive]` rootFontSize

## pages/project/list.vue

- L61 `[reactive]` rootFontSize
- L63 `[reactive]` configStore
- L64 `[fn]` t
- L67 `[reactive]` yearIndex
- L83 `[fn]` onYearChange

## pages/report/index.vue

- L81 `[reactive]` rootFontSize
- L83 `[reactive]` userStore
- L84 `[reactive]` configStore
- L85 `[fn]` t
- L87 `[reactive]` targetType
- L88 `[reactive]` targetId
- L89 `[reactive]` targetTitle
- L90 `[reactive]` form
- L95 `[reactive]` submitting
- L108 `[reactive]` targetTypeText
- L129 `[fn]` handleSubmit

## pages/search/index.vue

- L52 `[reactive]` configStore
- L53 `[fn]` t
- L54 `[reactive]` rootFontSize
- L56 `[reactive]` keyword
- L57 `[reactive]` lastKeyword
- L58 `[reactive]` searched
- L59 `[reactive]` loading
- L60 `[reactive]` results
- L63 `[fn]` onSearch
- L80 `[fn]` quickSearch
- L97 `[fn]` go

## pages/secretary/broadcast.vue

- L41 `[reactive]` rootFontSize
- L43 `[reactive]` configStore
- L44 `[fn]` t
- L57 `[fn]` goDetail

## pages/secretary/mail-detail.vue

- L44 `[reactive]` rootFontSize
- L46 `[reactive]` configStore
- L47 `[fn]` t
- L48 `[reactive]` mail
- L49 `[reactive]` mailId
- L54 `[fn]` loadData
- L65 `[fn]` statusText

## pages/secretary/mailbox.vue

- L69 `[reactive]` rootFontSize
- L71 `[reactive]` configStore
- L72 `[fn]` t
- L76 `[reactive]` form
- L89 `[reactive]` canSubmit
- L110 `[fn]` clearDraft
- L112 `[fn]` onVoiceResult
- L114 `[fn]` onSubmit

## pages/secretary/my-mails.vue

- L43 `[reactive]` rootFontSize
- L45 `[reactive]` configStore
- L46 `[fn]` t
- L48 `[reactive]` list
- L49 `[reactive]` loading
- L50 `[reactive]` page
- L51 `[reactive]` total
- L56 `[fn]` loadData
- L70 `[fn]` loadMore
- L74 `[fn]` statusText
- L79 `[fn]` goMailbox

## pages/service/guide-detail.vue

- L68 `[reactive]` rootFontSize
- L70 `[reactive]` configStore
- L71 `[fn]` t
- L72 `[reactive]` guide
- L73 `[reactive]` guideId
- L74 `[reactive]` loading
- L79 `[fn]` loadData
- L89 `[fn]` callPhone

## pages/service/guide.vue

- L52 `[reactive]` rootFontSize
- L54 `[reactive]` configStore
- L55 `[fn]` t
- L57 `[reactive]` list
- L58 `[reactive]` loading
- L59 `[reactive]` keyword
- L60 `[reactive]` currentCategory
- L69 `[fn]` loadData
- L82 `[fn]` switchCategory
- L87 `[fn]` onSearch
- L89 `[fn]` goDetail

## pages/service/index.vue

- L74 `[reactive]` configStore
- L75 `[reactive]` rootFontSize
- L76 `[reactive]` statusBarHeight
- L79 `[reactive]` contentTop
- L81 `[fn]` t
- L91 `[reactive]` phones
- L101 `[fn]` go
- L103 `[fn]` onSearch
- L107 `[fn]` callPhone

## pages/service/more.vue

- L30 `[reactive]` rootFontSize
- L32 `[reactive]` configStore
- L33 `[fn]` t
- L34 `[fn]` show
- L74 `[reactive]` groups
- L85 `[fn]` go

## pages/settings/accessibility.vue

- L84 `[reactive]` rootFontSize
- L86 `[reactive]` configStore
- L87 `[fn]` t
- L89 `[reactive]` fontScale
- L90 `[reactive]` highContrast
- L91 `[reactive]` reduceMotion
- L92 `[reactive]` largeButton
- L93 `[reactive]` voiceEnabled
- L101 `[reactive]` previewFontSize
- L112 `[fn]` onFontSize
- L114 `[fn]` onHighContrast
- L115 `[fn]` onReduceMotion
- L116 `[fn]` onLargeButton
- L117 `[fn]` onVoiceEnabled
- L119 `[fn]` onSave

## pages/snapshot/detail.vue

- L93 `[reactive]` rootFontSize
- L95 `[reactive]` configStore
- L96 `[fn]` t
- L97 `[reactive]` record
- L98 `[reactive]` recordId
- L99 `[reactive]` hasLiked
- L100 `[reactive]` loadError
- L101 `[reactive]` loading
- L103 `[reactive]` userOpenid
- L105 `[reactive]` recordStatusClass
- L118 `[fn]` loadData
- L139 `[fn]` previewImage
- L143 `[fn]` previewReplyImage
- L147 `[fn]` goReport
- L152 `[fn]` toggleLike

## pages/snapshot/my-snapshots.vue

- L33 `[reactive]` rootFontSize
- L35 `[reactive]` configStore
- L36 `[fn]` t
- L47 `[fn]` goDetail
- L51 `[fn]` goSnapshot

## pages/snapshot/snapshot.vue

- L100 `[reactive]` rootFontSize
- L102 `[reactive]` configStore
- L103 `[fn]` t
- L104 `[reactive]` statusBarHeight
- L108 `[reactive]` form
- L116 `[reactive]` canSubmit
- L147 `[fn]` clearDraft
- L151 `[fn]` goBack
- L153 `[fn]` onVoiceResult
- L155 `[fn]` takePhoto
- L173 `[fn]` removeImage
- L175 `[fn]` previewImage
- L179 `[fn]` getLocation
- L200 `[fn]` onSubmit

## pages/snapshot/wall.vue

- L44 `[reactive]` rootFontSize
- L46 `[reactive]` configStore
- L47 `[fn]` t
- L48 `[reactive]` currentType
- L58 `[fn]` switchType
- L63 `[fn]` goDetail
- L67 `[fn]` goSnapshot

## pages/task/detail.vue

- L123 `[reactive]` rootFontSize
- L125 `[reactive]` userStore
- L126 `[reactive]` configStore
- L127 `[fn]` t
- L128 `[reactive]` task
- L129 `[reactive]` progressList
- L130 `[reactive]` taskId
- L131 `[reactive]` loadError
- L132 `[reactive]` loading
- L134 `[reactive]` newProgress
- L135 `[reactive]` newContent
- L136 `[reactive]` newImages
- L139 `[fn]` isCompleted
- L141 `[reactive]` canUpdate
- L152 `[fn]` loadData
- L174 `[fn]` onProgressChange
- L178 `[fn]` onVoiceResult
- L180 `[fn]` chooseImage
- L198 `[fn]` removeImage
- L202 `[fn]` previewImage
- L206 `[fn]` submitProgress

## pages/task/list.vue

- L46 `[reactive]` rootFontSize
- L48 `[reactive]` configStore
- L49 `[fn]` t
- L51 `[reactive]` currentStatus
- L74 `[fn]` switchStatus
- L79 `[fn]` goDetail

## pages/task/my-progress.vue

- L42 `[reactive]` rootFontSize
- L44 `[reactive]` configStore
- L45 `[fn]` t
- L47 `[reactive]` list
- L48 `[reactive]` loading
- L49 `[reactive]` page
- L50 `[reactive]` total
- L51 `[reactive]` currentStatus
- L67 `[fn]` loadData
- L98 `[fn]` switchStatus
- L104 `[fn]` loadMore
- L111 `[fn]` goDetail

## pages/team/index.vue

- L145 `[reactive]` configStore
- L146 `[reactive]` rootFontSize
- L148 `[reactive]` members
- L149 `[reactive]` loading
- L150 `[reactive]` loadError
- L151 `[reactive]` showAll
- L152 `[reactive]` showcases
- L157 `[reactive]` villageName
- L158 `[reactive]` villagePhone
- L160 `[fn]` show
- L164 `[reactive]` officeHours
- L165 `[reactive]` officeAddress
- L168 `[reactive]` teamTitle
- L178 `[reactive]` shownMembers
- L181 `[reactive]` showcaseItems
- L191 `[reactive]` secretaryMessage
- L211 `[fn]` loadMembers
- L230 `[fn]` loadShowcases
- L246 `[fn]` goShowcase
- L250 `[fn]` goBlueprint
- L254 `[fn]` goDetail
- L258 `[fn]` go
- L262 `[fn]` callVillage

## pages/team/member-detail.vue

- L43 `[reactive]` rootFontSize
- L45 `[reactive]` configStore
- L46 `[fn]` t
- L48 `[reactive]` member
- L49 `[reactive]` memberId
- L59 `[fn]` loadData
- L72 `[fn]` callPhone

## pages/vote/detail.vue

- L81 `[reactive]` rootFontSize
- L83 `[reactive]` configStore
- L84 `[fn]` t
- L85 `[reactive]` vote
- L86 `[reactive]` voteId
- L87 `[reactive]` selectedKey
- L88 `[reactive]` loadError
- L90 `[reactive]` isVoteOpen
- L91 `[reactive]` voteStatusClass
- L96 `[fn]` loadData
- L112 `[fn]` statusText
- L115 `[fn]` percent
- L121 `[fn]` goReport
- L126 `[fn]` submitVote

## pages/vote/list.vue

- L49 `[reactive]` rootFontSize
- L51 `[reactive]` userStore
- L52 `[reactive]` configStore
- L53 `[fn]` t
- L54 `[reactive]` currentStatus
- L70 `[fn]` switchStatus
- L71 `[fn]` statusText
- L72 `[fn]` goDetail
- L73 `[fn]` goCreate

## scripts/apply-a11y-pagemeta.js

- L9 `[const]` fs
- L10 `[const]` path
- L12 `[const]` ROOT
- L13 `[const]` PAGES
- L14 `[const]` IMPORT_LINE
- L15 `[const]` CONST_LINE
- L16 `[const]` PAGEMETA
- L18 `[fn]` walk
- L27 `[const]` files
- L31 `[const]` skipped

## scripts/check-project-map.js

- L16 `[const]` fs
- L17 `[const]` path
- L20 `[const]` MAP
- L22 `[fn]` listFiles
- L27 `[fn]` main

## scripts/check-states.js

- L8 `[const]` fs
- L9 `[const]` path
- L10 `[const]` ROOT
- L12 `[fn]` listFiles
- L24 `[const]` pages
- L27 `[const]` NON_LIST
- L40 `[const]` listPages
- L47 `[const]` missingSkeleton
- L48 `[const]` missing

## scripts/check-structure.js

- L12 `[const]` fs
- L13 `[const]` path
- L16 `[const]` errors
- L17 `[const]` warnings
- L19 `[fn]` read
- L20 `[fn]` numInTable
- L25 `[const]` s
- L28 `[const]` readme
- L29 `[const]` readmeChecks
- L43 `[const]` DOC00
- L63 `[const]` docsEntries
- L64 `[const]` nums
- L68 `[const]` maxNum
- L69 `[const]` ALLOW_MISSING
- L78 `[const]` known

## scripts/check-style.js

- L14 `[const]` fs
- L15 `[const]` path
- L17 `[const]` ROOT
- L18 `[const]` EXCLUDE_DIRS
- L19 `[const]` HEX
- L20 `[const]` RGBA_NUM
- L21 `[const]` STRICT
- L23 `[fn]` walk
- L37 `[fn]` checkFile
- L65 `[fn]` main

## scripts/compare-tokens.js

- L16 `[const]` fs
- L17 `[const]` path
- L19 `[const]` ROOT
- L20 `[const]` scssSrc
- L21 `[const]` jsSrc
- L23 `[fn]` norm
- L30 `[const]` scssRaw
- L35 `[const]` scssHex
- L51 `[const]` jsTokens
- L55 `[const]` jsChips
- L69 `[const]` errors
- L70 `[fn]` scssNameOf
- L102 `[fn]` hexToRgbTriple
- L106 `[fn]` normRgba

## scripts/gen-structure.js

- L8 `[const]` fs
- L9 `[const]` path
- L11 `[const]` ROOT
- L14 `[const]` CLOUD_CLASSIFY
- L36 `[fn]` listFiles
- L48 `[fn]` listDirs
- L53 `[fn]` rel
- L57 `[fn]` scan
- L70 `[fn]` build
- L150 `[fn]` main

## scripts/sync-common.js

- L10 `[const]` fs
- L11 `[const]` path
- L13 `[const]` ROOT
- L14 `[const]` CLOUD_DIR
- L15 `[const]` COMMON_DIR
- L22 `[const]` commonFiles
- L23 `[const]` fnDirs

## scripts/uni-cli.js

- L10 `[const]` path
- L13 `[const]` ROOT
- L16 `[const]` args
- L17 `[const]` cmd
- L18 `[const]` r

## store/config.js

- L14 `[export]` DEFAULT_DISPLAY_NAMES
- L247 `[export]` DEFAULT_MODULES
- L263 `[const]` DEFAULT_PHONES
- L273 `[fn]` mergeDeep
- L288 `[fn]` readConfigCache
- L315 `[export]` useConfigStore

## store/user.js

- L11 `[export]` useUserStore

## utils/accessibility.js

- L9 `[export]` A11Y_KEYS
- L17 `[export]` a11y
- L25 `[export]` loadA11y
- L38 `[export]` saveA11y

## utils/app-info.js

- L5 `[export]` APP_VERSION

## utils/audio.js

- L16 `[fn]` initRecorder
- L48 `[fn]` uploadAndRecognize
- L105 `[export]` startRecord
- L139 `[fn]` doStartRecord
- L156 `[export]` stopRecord
- L166 `[export]` cancelRecord

## utils/auth.js

- L10 `[export]` AUTH_PUBLIC
- L11 `[export]` AUTH_LOGIN
- L12 `[export]` AUTH_VERIFIED
- L14 `[export]` ensureAuth

## utils/cache.js

- L6 `[const]` DEFAULT_TTL
- L8 `[export]` setCache
- L16 `[export]` getCache
- L24 `[export]` getCacheStale
- L32 `[export]` removeCache

## utils/display.js

- L8 `[export]` getDisplay

## utils/farmingCalendar.js

- L10 `[const]` TERMS
- L26 `[const]` ADVICE
- L58 `[export]` getTodayTerm
- L73 `[export]` getFarmingAdvice

## utils/format.js

- L10 `[const]` STATUS_NORMALIZE_MAP
- L43 `[export]` normalizeStatus
- L53 `[export]` formatDate
- L80 `[export]` relativeTime
- L98 `[export]` formatMoney
- L106 `[export]` statusText
- L113 `[export]` statusColor
- L148 `[export]` urgentText
- L164 `[export]` urgentColor
- L178 `[export]` urgentTagClass
- L191 `[export]` formatDuration
- L203 `[export]` formatFileSize
- L212 `[export]` maskPhone

## utils/formatText.js

- L6 `[export]` autoFormat

## utils/lockKeys.js

- L5 `[export]` LOCK_KEYS

## utils/module.js

- L8 `[export]` isModuleEnabled

## utils/nav.js

- L5 `[export]` TAB_BAR_PAGES
- L12 `[export]` goPage

## utils/request.js

- L17 `[export]` callFunction
- L78 `[export]` getDatabase
- L92 `[export]` compressImage
- L129 `[const]` submitLocks
- L131 `[export]` acquireLock
- L141 `[export]` releaseLock
- L148 `[export]` uploadFile
- L177 `[export]` uploadImages
- L228 `[export]` cleanupFileIDs

## utils/subscribe.js

- L6 `[export]` requestSubscribe

## utils/theme.js

- L6 `[export]` PRIMARY
- L7 `[export]` TEXT_MAIN
- L8 `[export]` TEXT_WEAK
- L9 `[export]` TEXT_SUB
- L10 `[export]` WHITE
- L11 `[export]` STAR_GOLD
- L13 `[export]` STAR_GOLD_DIM
- L15 `[export]` FLAG_VEIL
- L17 `[export]` GOLD_DARK
- L18 `[export]` DANGER
- L21 `[export]` CHIP_BG
- L31 `[export]` CHIP_TEXT

## utils/validate.js

- L9 `[export]` isPhone
- L16 `[export]` isIdCard
- L23 `[export]` isRequired
- L36 `[export]` lengthRange
- L44 `[export]` isEmail
- L51 `[export]` isNumber
- L58 `[export]` isMoney
- L68 `[export]` validateForm
- L104 `[export]` showErrors

