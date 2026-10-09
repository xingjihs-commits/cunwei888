# 项目索引（PROJECT INDEX）

> 本文件由 `codebase-index` 技能的 `gen-index.js` 自动生成，请勿手工编辑。
>
> 用途：文件 → 函数 / 导出 / 常量 + 行号，供快速定位。
> 重新生成：`node <skill>/gen-index.js E:/village-bridge-fixed`
>
> 生成时间：2026-10-09T20:13:06.830Z

## 统计

- 索引文件：220（.vue 89，其他 131）
- 符号条目：1391

### 目录分布

- `(root)/` — 1 文件
- `cloudfunctions/` — 103 文件
- `components/` — 18 文件
- `composables/` — 3 文件
- `pages/` — 71 文件
- `scripts/` — 7 文件
- `store/` — 2 文件
- `utils/` — 15 文件

---

## cloudfunctions/approveUser/index.js

- L8 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L16 `[cloud]` main

## cloudfunctions/common/blocked.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[fn]` isBlocked

## cloudfunctions/common/checkAdmin.js

- L17 `[const]` cloud
- L19 `[const]` db
- L27 `[fn]` checkAdmin
- L43 `[fn]` getAdminInfo
- L63 `[fn]` getAdminRole
- L77 `[fn]` checkAdminWeight
- L91 `[fn]` checkContentSecurity
- L131 `[fn]` checkImageSecurity
- L168 `[fn]` checkImagesSecurity
- L180 `[fn]` _writeAuditQueue
- L205 `[fn]` checkAdminWrapper
- L219 `[cloud]` checkAdmin
- L220 `[cloud]` getAdminInfo
- L221 `[cloud]` getAdminRole
- L222 `[cloud]` checkAdminWeight
- L223 `[cloud]` checkContentSecurity
- L224 `[cloud]` checkImageSecurity
- L225 `[cloud]` checkImagesSecurity

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
- L8 `[const]` db
- L9 `[const]` _
- L17 `[fn]` insertOne
- L35 `[fn]` updateOne
- L44 `[fn]` getById
- L52 `[fn]` findOne
- L60 `[fn]` query
- L75 `[fn]` updateWhere
- L83 `[fn]` writeLog

## cloudfunctions/common/errorUtils.js

- L9 `[const]` ERR
- L23 `[fn]` fail
- L35 `[fn]` ok

## cloudfunctions/common/internal.js

- L12 `[const]` INTERNAL_TOKEN
- L15 `[fn]` isInternalCall

## cloudfunctions/common/listUtils.js

- L13 `[fn]` safePaging
- L25 `[fn]` stripOpenid

## cloudfunctions/common/mediaReview.js

- L7 `[const]` cloud
- L9 `[const]` db
- L16 `[fn]` notifyBroadcast
- L62 `[fn]` applyMediaReview

## cloudfunctions/common/securityLogic.js

- L14 `[fn]` decideSecurity
- L27 `[fn]` isAdminCount

## cloudfunctions/createMeeting/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/createVote/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/detectAbnormalBehavior/index.js

- L9 `[const]` cloud
- L12 `[const]` db
- L13 `[const]` _
- L14 `[const]` $
- L18 `[cloud]` main

## cloudfunctions/dispatchRecord/index.js

- L6 `[const]` cloud
- L9 `[const]` db
- L14 `[cloud]` main

## cloudfunctions/elderlyCheckin/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L10 `[const]` STATUS_MAP
- L20 `[cloud]` main

## cloudfunctions/evaluateFeedback/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/exportPerformanceReport/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[const]` STATUS_MAP
- L18 `[cloud]` main

## cloudfunctions/formatText/index.js

- L5 `[const]` cloud
- L8 `[fn]` autoFormat
- L41 `[cloud]` main

## cloudfunctions/generatePerformanceReport/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L12 `[const]` STATUS_MAP
- L17 `[cloud]` main

## cloudfunctions/generateUpperReport/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getAgriCalendar/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main
- L36 `[fn]` getDefaultCalendar

## cloudfunctions/getAuditQueue/index.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getBroadcasts/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/getCheckinStatus/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/getDashboardStats/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getDispatchMap/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L11 `[const]` DEFAULT_MAP
- L20 `[cloud]` main

## cloudfunctions/getFeedbackList/index.js

- L8 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L16 `[cloud]` main

## cloudfunctions/getFinanceReports/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getHomeData/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[const]` EMPTY
- L13 `[cloud]` main

## cloudfunctions/getLeaderContentList/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/getLostFoundList/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getMarketPrices/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getMeetingDetail/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getMeetingReviewList/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getMeetings/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/getModuleConfig/index.js

- L13 `[const]` cloud
- L15 `[const]` db
- L17 `[cloud]` main

## cloudfunctions/getMyDispatched/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/getMyFeedback/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/getMyMails/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/getMyMessages/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/getMySnapshots/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/getMySubsidies/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/getNewsDetail/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getNewsList/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getNoticeDetail/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getNotices/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getPerformanceDashboard/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/getProjects/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getRecordDetail/index.js

- L9 `[const]` cloud
- L12 `[const]` db
- L13 `[const]` _
- L15 `[cloud]` main

## cloudfunctions/getSecretaryMails/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getServiceGuideDetail/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getServiceGuides/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/getSnapshotWall/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L13 `[const]` WALL_STATUSES
- L20 `[cloud]` main

## cloudfunctions/getTaskDetail/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getTasks/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/getTeamMemberDetail/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getTeamMembers/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getUpperReports/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getUserInfo/index.js

- L9 `[const]` cloud
- L11 `[const]` db
- L14 `[cloud]` main

## cloudfunctions/getVoteDetail/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/getVotes/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/getWeather/index.js

- L10 `[const]` https
- L12 `[const]` CACHE_TTL
- L15 `[fn]` fetchJson
- L33 `[cloud]` main

## cloudfunctions/handleSecretRecord/index.js

- L6 `[const]` cloud
- L9 `[const]` db
- L13 `[cloud]` main

## cloudfunctions/initDatabase/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L12 `[const]` COLLECTIONS
- L23 `[cloud]` main

## cloudfunctions/initDatabase/initData.js

- L5 `[const]` cloud
- L7 `[const]` db
- L9 `[const]` INIT_DATA
- L217 `[fn]` initData

## cloudfunctions/likeNews/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/likeSnapshot/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/logError/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L9 `[cloud]` main

## cloudfunctions/markMessageRead/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/migrateStatusEnum/index.js

- L8 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L15 `[const]` STATUS_MAP
- L44 `[cloud]` main

## cloudfunctions/publishBroadcast/index.js

- L8 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L15 `[cloud]` main

## cloudfunctions/publishFinanceReport/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/publishLeaderContent/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L11 `[cloud]` main

## cloudfunctions/publishLostFound/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/publishMarketPrice/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L14 `[cloud]` main

## cloudfunctions/publishNews/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/publishNotice/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/publishProject/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/publishTask/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L14 `[cloud]` main

## cloudfunctions/publishTeamMember/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L12 `[cloud]` main

## cloudfunctions/replySecretaryMail/index.js

- L7 `[const]` cloud
- L10 `[const]` db
- L11 `[const]` _
- L15 `[cloud]` main

## cloudfunctions/reviewContent/index.js

- L9 `[const]` cloud
- L12 `[const]` db
- L17 `[const]` MEDIA_COLLECTIONS
- L19 `[cloud]` main

## cloudfunctions/searchAll/index.js

- L8 `[const]` cloud
- L10 `[const]` db
- L11 `[const]` _
- L13 `[const]` SOURCES
- L25 `[fn]` escapeRegExp
- L29 `[cloud]` main

## cloudfunctions/sendDispatchNotice/index.js

- L6 `[const]` cloud
- L9 `[const]` db
- L12 `[cloud]` main

## cloudfunctions/sendOverdueReminder/index.js

- L8 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L17 `[cloud]` main

## cloudfunctions/sendSubscribeMessage/index.js

- L7 `[const]` cloud
- L9 `[const]` db
- L14 `[const]` DEFAULT_TEMPLATES
- L27 `[const]` CACHE_TTL
- L29 `[fn]` loadTemplates
- L52 `[cloud]` main
- L118 `[fn]` buildMessageData

## cloudfunctions/speechRecognition/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main
- L54 `[fn]` callBaiduASR

## cloudfunctions/submitFeedback/index.js

- L11 `[const]` cloud
- L13 `[const]` db
- L14 `[const]` _
- L21 `[const]` DEFAULT_DISPATCH
- L30 `[cloud]` main

## cloudfunctions/submitReport/index.js

- L6 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[const]` VALID_TARGET_TYPES
- L15 `[cloud]` main

## cloudfunctions/submitSecretaryMail/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L13 `[cloud]` main

## cloudfunctions/submitSnapshot/index.js

- L8 `[const]` cloud
- L10 `[const]` db
- L11 `[const]` _
- L18 `[const]` SNAPSHOT_DISPATCH
- L27 `[cloud]` main

## cloudfunctions/submitVote/index.js

- L9 `[const]` cloud
- L12 `[const]` db
- L13 `[const]` _
- L16 `[cloud]` main

## cloudfunctions/subscribePriceAlert/index.js

- L5 `[const]` cloud
- L7 `[const]` db
- L8 `[const]` _
- L11 `[cloud]` main

## cloudfunctions/updateDispatchMap/index.js

- L6 `[const]` cloud
- L9 `[const]` db
- L11 `[cloud]` main

## cloudfunctions/updateFeedbackStatus/index.js

- L8 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L18 `[const]` ALLOWED_STATUSES
- L25 `[cloud]` main

## cloudfunctions/updateMeetingMinutes/index.js

- L8 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L16 `[const]` ALLOWED_STATUSES
- L22 `[cloud]` main

## cloudfunctions/updateModuleConfig/index.js

- L14 `[const]` cloud
- L17 `[const]` db
- L21 `[cloud]` main

## cloudfunctions/updateModuleSwitch/index.js

- L6 `[const]` cloud
- L9 `[const]` db
- L13 `[cloud]` main

## cloudfunctions/updateSnapshotStatus/index.js

- L5 `[const]` cloud
- L8 `[const]` db
- L9 `[const]` _
- L13 `[const]` ALLOWED_STATUSES
- L18 `[cloud]` main

## cloudfunctions/updateSubscribeTemplates/index.js

- L6 `[const]` cloud
- L9 `[const]` db
- L14 `[const]` ALLOWED_TEMPLATE_KEYS
- L19 `[cloud]` main

## cloudfunctions/updateTaskProgress/index.js

- L8 `[const]` cloud
- L10 `[const]` db
- L11 `[const]` _
- L15 `[const]` ALLOWED_TASK_STATUSES
- L21 `[cloud]` main

## cloudfunctions/updateVillageInfo/index.js

- L6 `[const]` cloud
- L9 `[const]` db
- L10 `[const]` _
- L14 `[cloud]` main

## cloudfunctions/verifyUser/index.js

- L9 `[const]` cloud
- L11 `[const]` db
- L12 `[const]` _
- L16 `[cloud]` main

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

- L16 `[props]` props
- L25 `[emits]` emits

## components/FeedbackCard.vue

- L41 `[reactive]` configStore
- L42 `[fn]` t
- L48 `[props]` props
- L52 `[emits]` emits
- L54 `[reactive]` typeName
- L58 `[fn]` onTap

## components/NewsCard.vue

- L34 `[reactive]` configStore
- L35 `[fn]` t
- L39 `[props]` props
- L43 `[emits]` emits
- L45 `[fn]` onTap

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

- L13 `[props]` props

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

- L24 `[emits]` emits
- L26 `[reactive]` configStore
- L27 `[fn]` t

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

- L16 `[export]` usePagination

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

- L109 `[reactive]` configStore
- L110 `[reactive]` rootFontSize
- L113 `[fn]` noticeTagClass
- L118 `[reactive]` statusBarHeight
- L119 `[reactive]` newsList
- L120 `[reactive]` noticeList
- L121 `[reactive]` unreadCount
- L122 `[reactive]` loadError
- L123 `[reactive]` isLoading
- L124 `[reactive]` careTab
- L125 `[reactive]` secretaryItem
- L126 `[reactive]` leaderItem
- L127 `[reactive]` weather
- L128 `[reactive]` farming
- L129 `[reactive]` homeEmergency
- L130 `[reactive]` offline
- L135 `[reactive]` villageName
- L136 `[reactive]` emergency
- L137 `[reactive]` currentShowcase
- L139 `[fn]` t
- L142 `[fn]` show
- L164 `[fn]` loadData
- L186 `[fn]` applyHomeData
- L204 `[fn]` useCacheFallback
- L214 `[fn]` loadShowcase
- L227 `[fn]` loadWeather
- L238 `[fn]` goNews
- L241 `[fn]` goNotice
- L244 `[fn]` goLeaderDetail
- L247 `[fn]` goLeader
- L251 `[fn]` loadMore

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

- L54 `[reactive]` rootFontSize
- L56 `[reactive]` userStore
- L57 `[reactive]` configStore
- L58 `[fn]` t
- L59 `[reactive]` currentType
- L81 `[fn]` switchType
- L86 `[fn]` typeText
- L91 `[fn]` goDetail
- L95 `[fn]` goCreate

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

- L128 `[reactive]` userStore
- L129 `[reactive]` configStore
- L130 `[fn]` t
- L131 `[reactive]` rootFontSize
- L132 `[reactive]` statusBarHeight
- L133 `[reactive]` unreadCount
- L137 `[reactive]` verifyText
- L138 `[reactive]` verifyClass
- L139 `[reactive]` icpNumber
- L140 `[reactive]` policeIcpNumber
- L147 `[reactive]` fontLabel
- L169 `[reactive]` visibleAdminEntries
- L184 `[fn]` loadUnread
- L193 `[fn]` cycleFont
- L200 `[fn]` onChooseAvatar
- L209 `[fn]` onNicknameConfirm
- L219 `[fn]` goVerify
- L223 `[fn]` onNotification
- L227 `[fn]` showAbout

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

- L48 `[reactive]` configStore
- L49 `[fn]` t
- L50 `[reactive]` rootFontSize
- L52 `[reactive]` currentCategory
- L55 `[fn]` fetchNews
- L80 `[fn]` switchCategory
- L85 `[fn]` goDetail
- L89 `[fn]` goHome

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

- L61 `[reactive]` rootFontSize
- L63 `[reactive]` configStore
- L64 `[fn]` t
- L66 `[reactive]` currentCategory
- L69 `[reactive]` yearIndex
- L71 `[fn]` fetchNotices
- L97 `[fn]` switchCategory
- L102 `[fn]` onYearChange
- L107 `[fn]` getCategoryClass
- L112 `[fn]` goDetail

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

- L65 `[reactive]` configStore
- L66 `[reactive]` rootFontSize
- L67 `[reactive]` statusBarHeight
- L69 `[fn]` t
- L70 `[fn]` subName
- L124 `[reactive]` phones
- L134 `[fn]` go
- L136 `[fn]` onSearch
- L140 `[fn]` callPhone

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

- L42 `[reactive]` rootFontSize
- L44 `[reactive]` configStore
- L45 `[fn]` t
- L47 `[reactive]` currentStatus
- L70 `[fn]` switchStatus
- L75 `[fn]` goDetail

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

- L104 `[reactive]` configStore
- L105 `[reactive]` rootFontSize
- L107 `[reactive]` members
- L108 `[reactive]` loading
- L109 `[reactive]` showAll
- L113 `[reactive]` villageName
- L114 `[reactive]` villagePhone
- L116 `[reactive]` officeHours
- L117 `[reactive]` officeAddress
- L134 `[reactive]` shownMembers
- L147 `[fn]` loadMembers
- L160 `[fn]` goDetail
- L164 `[fn]` go
- L168 `[fn]` callVillage

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

- L12 `[const]` fs
- L13 `[const]` path
- L15 `[const]` ROOT
- L16 `[const]` EXCLUDE_DIRS
- L17 `[const]` HEX
- L19 `[fn]` walk
- L33 `[fn]` checkFile
- L54 `[fn]` main

## scripts/gen-structure.js

- L8 `[const]` fs
- L9 `[const]` path
- L11 `[const]` ROOT
- L14 `[const]` CLOUD_CLASSIFY
- L35 `[fn]` listFiles
- L47 `[fn]` listDirs
- L52 `[fn]` rel
- L56 `[fn]` scan
- L69 `[fn]` build
- L149 `[fn]` main

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

