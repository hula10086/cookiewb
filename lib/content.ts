export interface DocSection {
  id: string;
  title: string;
  level: number;
  content: string;
}

export interface DocChapter {
  id: string;
  title: string;
  emoji: string;
  level: number;
  sections: DocSection[];
  content: string;
}

export const chapters: DocChapter[] = [
  {
    id: "思维导图mermaid-格式",
    title: "思维导图（Mermaid 格式）",
    emoji: "📌",
    level: 1,
    sections: [
    {
      id: "1-项目全局架构思维导图",
      title: "1. 项目全局架构思维导图",
      level: 2,
      content: `\n```mermaid\nmindmap\n  root((Cookie小铺))\n    用户体系\n      微信登录 openid\n      App登录 token\n      用户信息 users集合\n      小铺绑定 shops集合\n    核心概念 小铺\n      创建小铺 createShop\n      加入小铺 joinShop\n      邀请码 inviteCode\n      伴侣绑定 partnerOpenid\n      积分系统 points\n      封禁系统 ban\n    亲密空间\n      每日打卡 checkins\n      生活记录 records\n      小纸条 notes\n      待办事项 todos\n      成就系统 achievements\n      补打卡 remedial\n    自习室\n      开始/暂停/结束学习\n      心跳保活 heartbeat\n      一起专注 togetherFocus\n      番茄钟模式\n      学习统计\n    生理期\n      经期记录 period_records\n      每日标签 period_daily_tags\n      日历预测 prediction\n      排卵期计算 ovulation\n      提醒推送\n    每日复盘\n      8模块系统\n      连续天数 streak\n      策略库 strategy_library\n      成长数据\n    任务系统\n      发布/接受/提交/审核\n      日程管理 schedules\n      任务统计\n    商城系统\n      商品列表 goods\n      商品模板 goods_templates\n      商品申请 goods_applications\n      购买订单 orders\n    仓库系统\n      我的商品\n      使用/过期管理\n    纪念日\n      增删改查\n      定时提醒\n    消息系统\n      站内消息 messages\n      微信订阅消息\n      PushPlus推送\n    打工人小助手\n      工作打卡\n      薪资计算\n      伴侣同步\n    基础设施\n      网络层 api.js + network.js\n      缓存层 cache.js SWR策略\n      主题系统 theme.js 8套主题\n      平台适配 platform.js\n```\n`
    },
    {
      id: "2-网络请求三层架构图",
      title: "2. 网络请求三层架构图",
      level: 2,
      content: `\n```mermaid\nflowchart TB\n    subgraph 业务层[\"📱 业务页面层\"]\n        P1[pages/index]\n        P2[pages/task]\n        P3[pages/mall]\n        P4[packageIntimate/...]\n        P5[packageReview/...]\n        P6[其他35个页面]\n    end\n\n    subgraph 网关层[\"🚪 API网关层 (api.js)\"]\n        A1[callUserFunction]\n        A2[callShopFunction]\n        A3[callTaskFunction]\n        A4[callMallFunction]\n        A5[callWarehouseFunction]\n        A6[callIntimateFunction]\n        A7[callStudyFunction]\n        A8[callPeriodFunction]\n        A9[callAnniversaryFunction]\n        A10[callReviewFunction]\n        A11[callMessageFunction 无缓存]\n        A12[callPushPlusFunction 无缓存]\n        A13[callFunction 通用]\n    end\n\n    subgraph 缓存层[\"💾 缓存层 (cache.js)\"]\n        C1[内存缓存 memory<br/>TTL: 2~5分钟]\n        C2[本地存储缓存 storage<br/>TTL: 30分钟]\n        C3[SWR过期容忍<br/>staleTTL: 30秒~5分钟]\n        C4[缓存依赖清除<br/>cache-dependencies.js]\n    end\n\n    subgraph 底层[\"🔧 底层管道 (network.js)\"]\n        N1{平台判断}\n        N2[HTTP通道<br/>wx.request → API网关]\n        N3[云开发通道<br/>wx.cloud.callFunction]\n    end\n\n    subgraph 云端[\"☁️ 云函数层 (22个)\"]\n        CF1[user]\n        CF2[shop]\n        CF3[task]\n        CF4[mall]\n        CF5[warehouse]\n        CF6[intimate 43个action]\n        CF7[study-room]\n        CF8[period]\n        CF9[anniversary]\n        CF10[review]\n        CF11[message]\n        CF12[pushPlusService]\n        CF13[其他10个云函数]\n    end\n\n    P1 & P2 & P3 & P4 & P5 & P6 --> A1 & A2 & A3 & A4 & A5 & A6 & A7 & A8 & A9 & A10 & A11 & A12 & A13\n    A1 & A2 & A3 & A4 & A5 & A6 & A7 & A8 & A9 & A10 --> C1 & C2 & C3 & C4\n    C1 & C2 & C3 & C4 --> N1\n    N1 -->|App模式| N2\n    N1 -->|小程序模式| N3\n    N2 --> CF1 & CF2 & CF3 & CF4 & CF5 & CF6 & CF7 & CF8 & CF9 & CF10 & CF11 & CF12 & CF13\n    N3 --> CF1 & CF2 & CF3 & CF4 & CF5 & CF6 & CF7 & CF8 & CF9 & CF10 & CF11 & CF12 & CF13\n```\n`
    },
    {
      id: "3-数据库集合关系图",
      title: "3. 数据库集合关系图",
      level: 2,
      content: `\n```mermaid\nerDiagram\n    users ||--o{ shops : \"拥有/加入\"\n    shops ||--o| users : \"伴侣\"\n    shops ||--o{ checkins : \"打卡记录\"\n    shops ||--o{ records : \"生活记录\"\n    shops ||--o{ notes : \"小纸条\"\n    shops ||--o{ todos : \"待办事项\"\n    shops ||--o{ anniversaries : \"纪念日\"\n    shops ||--o{ tasks : \"任务\"\n    shops ||--o{ schedules : \"日程\"\n    shops ||--o{ study_sessions : \"学习会话\"\n    shops ||--o{ period_records : \"经期记录\"\n    shops ||--o{ goods : \"商品\"\n    shops ||--o{ orders : \"订单\"\n    shops ||--o{ daily_reviews : \"每日复盘\"\n    shops ||--o{ notifications : \"通知\"\n    users ||--o{ pushplus_configs : \"推送配置\"\n    pushplus_configs ||--o{ pushplus_logs : \"推送日志\"\n    pushplus_configs ||--o{ pushplus_failures : \"推送失败记录\"\n    pushplus_configs ||--o{ daily_reports : \"日报\"\n    goods_templates ||--o{ goods : \"商品模板\"\n    goods_applications ||--o{ goods : \"商品申请\"\n    orders }o--|| goods : \"购买\"\n    period_records ||--o{ period_daily_tags : \"每日标签\"\n    daily_reviews ||--o{ strategy_library : \"策略库\"\n    messages }o--|| shops : \"站内消息\"\n    pairing_codes }o--|| users : \"手表配对码\"\n\n    users {\n        string _id\n        string openid\n        string nickName\n        string avatarUrl\n        string shopId\n        number points\n        object subscribeSettings\n        object privacySettings\n    }\n\n    shops {\n        string _id\n        string ownerOpenid\n        string partnerOpenid\n        string inviteCode\n        string shopName\n        object ownerInfo\n        object partnerInfo\n        object location\n        boolean isBanned\n    }\n\n    checkins {\n        string _id\n        string shopId\n        string openid\n        string type\n        string content\n        number points\n        string date\n    }\n\n    records {\n        string _id\n        string shopId\n        string openid\n        string content\n        array images\n        number likes\n        array replies\n    }\n\n    tasks {\n        string _id\n        string shopId\n        string publisherOpenid\n        string executorOpenid\n        string title\n        string description\n        number reward\n        string status\n    }\n```\n`
    },
    {
      id: "4-页面导航关系图",
      title: "4. 页面导航关系图",
      level: 2,
      content: `\n```mermaid\nflowchart LR\n    subgraph 登录流程\n        LOGIN[登录页<br/>pages/login] --> STARTUP[启动选择页<br/>pages/startup]\n    end\n\n    subgraph TabBar主页面\n        INDEX[🏠 首页<br/>pages/index]\n        TASK[📋 任务<br/>pages/task]\n        MALL[🛒 商城<br/>pages/mall]\n        WAREHOUSE[📦 仓库<br/>pages/warehouse]\n        PROFILE[👤 我的<br/>pages/profile]\n    end\n\n    STARTUP --> INDEX\n\n    subgraph 亲密空间分包\n        IS[亲密空间<br/>intimate-space]\n        SR[自习室<br/>study-room]\n        PC[生理期日历<br/>period-calendar]\n        CC[打卡日历<br/>checkin-calendar]\n        AW[成就墙<br/>achievement-wall]\n        AD[成就详情<br/>achievement-detail]\n        NT[小纸条<br/>notes]\n        MR[心情记录<br/>mood-record]\n        ST[共享时间线<br/>shared-timeline]\n        PR[经期记录<br/>period-record]\n        PH[经期历史<br/>period-history]\n    end\n\n    subgraph 商铺分包\n        CS[创建小铺<br/>create-shop]\n        ES[编辑小铺<br/>edit-shop]\n        SI[小铺信息<br/>shop-info]\n        MD[商品详情<br/>mall-detail]\n        WD[仓库详情<br/>warehouse-detail]\n    end\n\n    subgraph 任务分包\n        TD[任务详情<br/>task-detail]\n        CJ[创建任务<br/>create-job]\n    end\n\n    subgraph 复盘分包\n        DR[每日复盘<br/>daily-review]\n        GD[成长数据<br/>growth-data]\n        RH[复盘历史<br/>review-history]\n    end\n\n    subgraph 设置分包\n        WA[打工人小助手<br/>work-assistant]\n        MSG[消息通知<br/>message]\n        SC[日程管理<br/>schedule]\n        LOC[地理信息<br/>location]\n        PS[推送设置<br/>push-settings]\n        SS[订阅设置<br/>subscribe-settings]\n        PRI[隐私设置<br/>privacy]\n        DE[数据导出<br/>data-export]\n        BM[封禁管理<br/>ban-management]\n        DBG[调试<br/>debug]\n    end\n\n    subgraph 用户分包\n        EP[编辑资料<br/>edit-profile]\n        BA[绑定账号<br/>bind-account]\n        AD2[应用设计<br/>app-design]\n        AL[App登录<br/>app-login]\n    end\n\n    INDEX --> IS & SR & PC & DR & CS & SI & MSG & WA & SC & LOC & BM & AD2 & ES\n    IS --> NT & MR & ST & CC & AW & AD & SR & MSG\n    TASK --> TD & CJ\n    MALL --> MD\n    WAREHOUSE --> WD\n    PROFILE --> EP & BA & AD2 & PRI & DE & SS & PS & SI\n    DR --> GD & RH\n```\n`
    },
    {
      id: "5-缓存策略思维导图",
      title: "5. 缓存策略思维导图",
      level: 2,
      content: `\n```mermaid\nmindmap\n  root((缓存策略 SWR))\n    存储模式\n      memory 内存缓存\n        亲密空间 2分钟\n        自习室 2分钟\n        任务 5分钟\n        商城 5分钟\n        仓库 5分钟\n        生理期 5分钟\n        纪念日 5分钟\n        复盘 5分钟\n      storage 本地存储\n        用户信息 30分钟\n        小铺信息 30分钟\n    过期容忍 staleTTL\n      亲密空间 30秒\n      自习室 30秒\n      任务/商城/仓库 1分钟\n      生理期/纪念日/复盘 1分钟\n      用户/小铺 5分钟\n    不缓存\n      消息模块 message\n      推送模块 pushPlusService\n    写操作处理\n      直接请求云端\n      不走缓存\n      成功后触发缓存失效\n    跨模块缓存依赖\n      打卡 → 清除 intimate + user\n      购买商品 → 清除 mall + user\n      使用商品 → 清除 warehouse + user\n      结束学习 → 清除 study-room + user\n      更新头像 → 清除 user + shop\n      绑定伴侣 → 清除 intimate + user + shop\n    缓存Key格式\n      cookie_cache_前缀\n      functionName_stableStringify_data\n    存储限制\n      2MB 上限\n      LRU淘汰策略\n      10分钟定期清理\n```\n`
    },
    ],
    content: `\n> 以下思维导图可在支持 Mermaid 的编辑器（如 Typora、VS Code + Mermaid 插件、GitHub）中直接渲染。\n`
  },
  {
    id: "第一章项目架构总览",
    title: "️ 第一章：项目架构总览",
    emoji: "🏗",
    level: 1,
    sections: [
    {
      id: "11-项目定位",
      title: "1.1 项目定位",
      level: 2,
      content: `\n**Cookie小铺**（又名\"爱恋小铺\"）是一个**情侣互动微信小程序**，核心概念是\"小铺\"——两个情侣共同经营的虚拟空间。\n\n**核心用户流程**：\n```\n注册/登录 → 创建小铺 → 分享邀请码 → 伴侣加入 → 开始互动\n```\n`
    },
    {
      id: "12-技术栈",
      title: "1.2 技术栈",
      level: 2,
      content: `\n| 技术 | 说明 |\n|------|------|\n| 前端框架 | 微信小程序原生框架 |\n| 后端服务 | 微信云开发（云函数 + 云数据库 + 云存储） |\n| 云环境ID | `cloud1-6gj42wz6a8430d2f` |\n| AppID | `wx5e391c21b7b7873d` |\n| 多端适配 | 同时支持微信小程序 + App（通过SAAASDK） |\n| 缓存策略 | SWR (Stale-While-Revalidate) |\n| 主题系统 | CSS变量 + 8套主题 |\n`
    },
    ],
    content: ``
  },
  {
    id: "第二章目录结构详解",
    title: "第二章：目录结构详解",
    emoji: "📂",
    level: 1,
    sections: [
    ],
    content: `\n```\ncookiexiaopu/\n│\n├── 📱 pages/                    # 【主包】7个核心页面\n│   ├── index/                   # 🏠 首页（小铺主页、天气、日程、纪念日）\n│   ├── login/                   # 🔐 登录页\n│   ├── startup/                 # 🚀 启动选择页（登录后的入口）\n│   ├── task/                    # 📋 任务中心（TabBar）\n│   ├── mall/                    # 🛒 商城（TabBar）\n│   ├── warehouse/               # 📦 仓库（TabBar）\n│   └── profile/                 # 👤 个人中心（TabBar）\n│\n├── 💕 packageIntimate/          # 【分包】亲密空间（12个页面）\n│   ├── intimate-space/          # 亲密空间主页（打卡、记录、纸条、待办）\n│   ├── study-room/              # 自习室（计时、番茄钟、一起专注）\n│   ├── checkin/                 # 打卡详情\n│   ├── checkin-calendar/        # 打卡日历\n│   ├── mood-record/             # 心情记录\n│   ├── notes/                   # 小纸条列表\n│   ├── shared-timeline/         # 共享时间线\n│   ├── achievement-wall/        # 成就墙\n│   ├── achievement-detail/      # 成就详情\n│   ├── period-calendar/         # 生理期日历\n│   ├── period-record/           # 经期记录\n│   └── period-history/          # 经期历史\n│\n├── 🛍️ packageShop/              # 【分包】商铺管理（6个页面）\n│   ├── create-shop/             # 创建/加入小铺\n│   ├── edit-shop/               # 编辑小铺\n│   ├── shop-info/               # 小铺信息（邀请码、成员）\n│   ├── mall-detail/             # 商品详情\n│   ├── warehouse-detail/        # 仓库物品详情\n│   └── test-mall/               # 商城测试页\n│\n├── 📋 packageTask/              # 【分包】任务系统（2个页面）\n│   ├── task-detail/             # 任务详情\n│   └── create-job/              # 创建任务\n│\n├── 📊 packageReview/            # 【分包】每日复盘（3个页面）\n│   ├── daily-review/            # 每日复盘（8模块）\n│   ├── growth-data/             # 成长数据\n│   └── review-history/         # 复盘历史\n│\n├── ⚙️ packageSettings/          # 【分包】设置（11个页面）\n│   ├── work-assistant/          # 打工人小助手\n│   ├── message/                 # 消息通知\n│   ├── schedule/                # 日程管理\n│   ├── location/                # 地理信息\n│   ├── push-settings/           # 推送设置\n│   ├── push-test/               # 推送测试\n│   ├── subscribe-settings/      # 订阅设置\n│   ├── privacy/                 # 隐私设置\n│   ├── data-export/             # 数据导出\n│   ├── ban-management/          # 封禁管理\n│   └── debug/                   # 调试工具\n│\n├── 👤 packageUser/              # 【分包】用户管理（4个页面）\n│   ├── edit-profile/            # 编辑资料\n│   ├── bind-account/            # 绑定账号\n│   ├── app-design/              # 应用设计（主题切换）\n│   └── app-login/               # App端登录\n│\n├── 🧩 components/               # 【组件】13个可复用组件\n│   ├── message-float/           # 消息悬浮球（5个主页面使用）\n│   ├── checkin-modal/           # 打卡弹窗\n│   ├── checkin-animation/       # 打卡动画\n│   ├── record-modal/            # 记录弹窗\n│   ├── note-modal/              # 小纸条弹窗\n│   ├── todo-modal/              # 待办弹窗\n│   ├── remedial-checkin/        # 补打卡\n│   ├── achievement-card/        # 成就卡片\n│   ├── focus-timer/             # 专注计时器\n│   ├── study-record-card/       # 学习记录卡片\n│   ├── period-detail-modal/     # 生理期详情弹窗\n│   ├── record-interaction/      # 记录互动（点赞/回复）\n│   └── subscribe-guide/         # 订阅引导\n│\n├── ☁️ cloudfunctions/            # 【云函数】22个后端服务\n│   ├── user/                    # 用户管理（15个action）\n│   ├── shop/                    # 小铺管理（23个action）\n│   ├── intimate/                # 亲密空间（43个action，最大云函数）\n│   ├── study-room/              # 自习室（11个action）\n│   ├── period/                  # 生理期（18个action）\n│   ├── task/                    # 任务系统（15个action）\n│   ├── mall/                    # 商城系统（16个action）\n│   ├── warehouse/               # 仓库系统（4个action）\n│   ├── anniversary/             # 纪念日（4个action）\n│   ├── review/                  # 每日复盘（13个action）\n│   ├── message/                 # 站内消息（7个action）\n│   ├── pushPlusService/         # PushPlus推送（9个action）\n│   ├── sendSubscribeMessage/    # 微信订阅消息\n│   ├── daily-scheduler/         # ⏰ 每日定时任务（触发器）\n│   ├── sendDailySummary/        # ⏰ 每日总结（触发器）\n│   ├── api-gateway/             # App端API网关（8个action）\n│   ├── watch-auth/              # 手表认证（2个action）\n│   ├── work-assistant/          # 打工人小助手（15个action）\n│   ├── locationWeather/         # 天气服务（10个action）\n│   ├── getUserData/             # 数据导出\n│   ├── getUnlimitedQRCode/      # 二维码生成\n│   └── invite-card/             # 邀请卡片（2个action）\n│\n├── 🔧 utils/                    # 【工具层】18个工具文件\n│   ├── api.js                   # ⭐ 统一网络出口（核心！）\n│   ├── network.js               # 底层网络管道（双通道分发）\n│   ├── cache.js                 # 缓存管理器（SWR策略）\n│   ├── cache-dependencies.js    # 跨模块缓存依赖\n│   ├── theme.js                 # 主题管理（8套主题）\n│   ├── platform.js              # 平台适配（App/小程序）\n│   ├── util.js                  # 通用工具函数\n│   ├── shop-check.js            # 小铺状态校验\n│   ├── cloud-check.js           # 云环境诊断\n│   ├── subscribe-config.js      # 订阅消息配置\n│   ├── subscribe-message.js     # 订阅消息发送\n│   ├── email-notification.js    # 邮件通知\n│   ├── salary-calculator.js     # 薪资计算器\n│   ├── shop-check.js            # 小铺校验\n│   ├── test-tools.js            # 测试工具\n│   ├── test-subscribe-message.js# 订阅消息测试\n│   ├── experience-version-debug.js# 体验版调试\n│   ├── animations.wxss          # 动画样式\n│   └── index.js                 # 工具入口\n│\n├── 🎨 app.wxss                  # 全局样式 + CSS变量定义\n├── 📱 app.js                    # 应用入口（初始化、全局数据）\n├── 📋 app.json                  # 应用配置（路由、TabBar、分包）\n└── 🖼️ images/                   # 图片资源（TabBar图标、默认头像等）\n```\n\n---\n`
  },
  {
    id: "第三章网络请求架构最核心",
    title: "第三章：网络请求架构（最核心！）",
    emoji: "🌐",
    level: 1,
    sections: [
    {
      id: "31-三层架构",
      title: "3.1 三层架构",
      level: 2,
      content: `\n```\n┌─────────────────────────────────────────────────────────┐\n│  📱 业务页面                                              │\n│  const api = require(\'../../utils/api.js\');               │\n│  api.callShopFunction(\'getShopInfo\', {}, options)         │\n└──────────────────────┬──────────────────────────────────┘\n                       │\n                       ▼\n┌─────────────────────────────────────────────────────────┐\n│  🚪 API网关层 (api.js)                                    │\n│  1. 判断读/写操作                                         │\n│  2. 读操作 → 查缓存 → 命中则返回 → 未命中则请求          │\n│  3. 写操作 → 直接请求 → 成功后清除相关缓存               │\n│  4. SWR策略：缓存过期但在容忍期内 → 返回旧数据+后台刷新  │\n└──────────────────────┬──────────────────────────────────┘\n                       │\n                       ▼\n┌─────────────────────────────────────────────────────────┐\n│  🔧 底层管道 (network.js)                                 │\n│  判断平台：                                               │\n│  ├── App模式 → HTTP通道 (wx.request → API网关URL)        │\n│  └── 小程序模式 → 云开发通道 (wx.cloud.callFunction)      │\n│  统一异常处理：401清登录 / 403权限不足 / 网络错误提示     │\n└──────────────────────┬──────────────────────────────────┘\n                       │\n                       ▼\n┌─────────────────────────────────────────────────────────┐\n│  ☁️ 云函数层 (22个云函数)                                 │\n│  接收 { action, ...data, openid } → 路由到对应handler    │\n│  操作云数据库 → 返回 { code: 0, data: ... }              │\n└─────────────────────────────────────────────────────────┘\n```\n`
    },
    {
      id: "32-请求完整流程示例",
      title: "3.2 请求完整流程示例",
      level: 2,
      content: `\n以\"获取小铺信息\"为例，一个请求的完整旅程：\n\n```\n第1步：页面发起请求\n  api.callShopFunction(\'getShopInfo\', {}, { showLoading: false })\n\n第2步：api.js 判断操作类型\n  \'getShopInfo\' 不在 writeActions 中 → 这是读操作\n  → 走 callWithSWR(\'shop\', data, { action: \'getShopInfo\', cacheMode: \'storage\', cacheTTL: 30min, staleTTL: 5min })\n\n第3步：缓存查询\n  生成缓存key: CacheManager.generateKey(\'shop\', { action: \'getShopInfo\' })\n  → 结果: \"cookie_cache_shop_{\\"action\\":\\"getShopInfo\\"}\"\n  查缓存: CacheManager.getWithRevalidate(cacheKey, \'storage\', 5min)\n  → 缓存命中且未过期 → 直接返回数据 ✅\n  → 缓存命中但过期(在5分钟容忍期内) → 返回旧数据 + 后台静默刷新 🔄\n  → 缓存未命中 → 继续请求云端 ⬇️\n\n第4步：底层网络请求\n  Network.request(\'shop\', { action: \'getShopInfo\', openid: \'xxx\' }, options)\n  → isAppMode() ?\n    → true:  dispatchHttp() → wx.request POST 到 https://cloud1-xxx.ap-shanghai.app.tcloudbase.com/api\n    → false: dispatchCloud() → wx.cloud.callFunction({ name: \'shop\', data: {...} })\n\n第5步：云函数处理\n  cloudfunctions/shop/index.js 接收请求\n  → switch(action) case \'getShopInfo\': → 查询 shops 集合 → 返回 { code: 0, data: shopInfo }\n\n第6步：结果处理\n  code === 0 → resolve(result) → 结果写回缓存 → 页面拿到数据 ✅\n  code !== 0 → handleException() → 显示错误提示 ❌\n```\n`
    },
    {
      id: "33-写操作流程",
      title: "3.3 写操作流程",
      level: 2,
      content: `\n以\"购买商品\"为例：\n\n```\n第1步：页面发起请求\n  api.callMallFunction(\'purchaseGoods\', { goodsId: \'xxx\' })\n\n第2步：api.js 判断操作类型\n  \'purchaseGoods\' 在 writeActions 中 → 这是写操作\n  → 直接调用 Network.request(\'mall\', data, options)（跳过缓存）\n\n第3步：请求成功后\n  → CacheDependency.invalidateCache(\'mall\', \'purchaseGoods\')\n  → 清除 mall 模块缓存\n  → 跨模块依赖：同时清除 user 模块缓存（因为积分变了）\n\n第4步：页面刷新\n  → 下次读取时缓存已失效，会重新请求云端获取最新数据\n```\n`
    },
    ],
    content: ``
  },
  {
    id: "第四章云函数详解",
    title: "️ 第四章：云函数详解",
    emoji: "☁",
    level: 1,
    sections: [
    {
      id: "41-云函数总览",
      title: "4.1 云函数总览",
      level: 2,
      content: `\n| # | 云函数 | Action数 | 定时触发 | 访问的集合 | 调用的其他云函数 |\n|---|--------|---------|---------|-----------|----------------|\n| 1 | **user** | 15 | ❌ | users, shops | - |\n| 2 | **shop** | 23 | ❌ | shops, users | - |\n| 3 | **intimate** | 43 | ❌ | users, shops, checkins, records, notes, todos, notifications, pushplus_configs | pushPlusService, sendSubscribeMessage |\n| 4 | **study-room** | 11 | ❌ | users, study_sessions, todos, notifications | pushPlusService |\n| 5 | **period** | 18 | ❌ | period_records, period_daily_tags, shops, users, pushplus_configs | pushPlusService |\n| 6 | **task** | 15 | ❌ | shops, tasks, schedules, users | message |\n| 7 | **mall** | 16 | ❌ | goods, goods_templates, goods_applications, users, shops, orders | message |\n| 8 | **warehouse** | 4 | ❌ | orders, users | message |\n| 9 | **anniversary** | 4 | ❌ | shops, anniversaries | - |\n| 10 | **review** | 13 | ❌ | daily_reviews, strategy_library | - |\n| 11 | **message** | 7 | ❌ | messages | - |\n| 12 | **pushPlusService** | 9 | ❌ | pushplus_configs, pushplus_logs, pushplus_failures, users, shops, checkins, records, notes, todos, daily_reports | - |\n| 13 | **sendSubscribeMessage** | - | ❌ | (无，使用cloud.openapi) | - |\n| 14 | **daily-scheduler** | - | ✅ | anniversaries, shops, pushplus_configs, schedules, users, period_records | pushPlusService, message |\n| 15 | **sendDailySummary** | - | ✅ | shops | pushPlusService |\n| 16 | **api-gateway** | 8 | ❌ | users, shops, pairing_codes | 动态代理任意云函数 |\n| 17 | **watch-auth** | 2 | ❌ | pairing_codes | - |\n| 18 | **work-assistant** | 15 | ❌ | (工作相关集合) | - |\n| 19 | **locationWeather** | 10 | ❌ | shops, users | - |\n| 20 | **getUserData** | 2 | ❌ | shops, checkins, records, todos, notes | - |\n| 21 | **getUnlimitedQRCode** | - | ❌ | (无) | - |\n| 22 | **invite-card** | 2 | ❌ | (无，使用云存储) | - |\n`
    },
    ],
    content: ``
  },
  {
    id: "第五章数据库集合详解",
    title: "第五章：数据库集合详解",
    emoji: "💾",
    level: 1,
    sections: [
    {
      id: "51-集合总览25个",
      title: "5.1 集合总览（25个）",
      level: 2,
      content: `\n| # | 集合名 | 说明 | 主要字段 | 被哪些云函数访问 |\n|---|--------|------|---------|----------------|\n| 1 | `users` | 用户信息 | openid, nickName, avatarUrl, shopId, points, subscribeSettings, privacySettings | user, intimate, shop, task, mall, warehouse, getUserData, locationWeather, daily-scheduler, period, pushPlusService, api-gateway, sendDailySummary |\n| 2 | `shops` | 小铺信息 | ownerOpenid, partnerOpenid, inviteCode, shopName, ownerInfo, partnerInfo, location, isBanned | user, intimate, shop, task, mall, anniversary, getUserData, locationWeather, daily-scheduler, period, pushPlusService, api-gateway, sendDailySummary |\n| 3 | `checkins` | 打卡记录 | shopId, openid, type, content, points, date | intimate, getUserData, pushPlusService, daily-scheduler |\n| 4 | `records` | 生活记录 | shopId, openid, content, images, likes, replies, favorites | intimate, getUserData, pushPlusService, daily-scheduler |\n| 5 | `notes` | 小纸条 | shopId, openid, content, isRead | intimate, getUserData, pushPlusService, daily-scheduler |\n| 6 | `todos` | 待办事项 | shopId, openid, title, completed, completedAt | intimate, study-room, getUserData, pushPlusService, daily-scheduler |\n| 7 | `anniversaries` | 纪念日 | shopId, title, date, type, remindDays, isDeleted | anniversary, daily-scheduler |\n| 8 | `messages` | 站内消息 | shopId, type, fromOpenid, toOpenid, title, content, relatedId, isRead | message |\n| 9 | `goods` | 商品 | shopId, name, description, price, category, image, stock, sales | mall |\n| 10 | `goods_templates` | 商品模板 | name, description, category, image, defaultPrice | mall |\n| 11 | `goods_applications` | 商品申请 | shopId, templateId, customPrice, status | mall |\n| 12 | `orders` | 订单 | shopId, openid, goodsId, status, usedAt | mall, warehouse |\n| 13 | `tasks` | 任务 | shopId, publisherOpenid, executorOpenid, title, description, reward, status, deadline | task |\n| 14 | `schedules` | 日程 | shopId, openid, title, date, time, repeat, completed | task, daily-scheduler |\n| 15 | `study_sessions` | 学习会话 | shopId, openid, startTime, endTime, duration, mode, status, todoId | study-room |\n| 16 | `period_records` | 经期记录 | shopId, openid, startDate, endDate, cycleLength, duration | period, daily-scheduler |\n| 17 | `period_daily_tags` | 每日标签 | shopId, openid, date, tags, symptoms, mood | period |\n| 18 | `daily_reviews` | 每日复盘 | shopId, openid, date, modules, isSubmitted | review |\n| 19 | `strategy_library` | 策略库 | shopId, openid, content, useCount | review |\n| 20 | `pushplus_configs` | 推送配置 | openid, token, isActive, types | pushPlusService, daily-scheduler, intimate, period |\n| 21 | `pushplus_logs` | 推送日志 | openid, type, content, status, createdAt | pushPlusService |\n| 22 | `pushplus_failures` | 推送失败 | openid, type, error, retryCount | pushPlusService |\n| 23 | `daily_reports` | 日报 | shopId, date, content | pushPlusService |\n| 24 | `notifications` | 通知 | shopId, openid, type, content, isRead | intimate, study-room |\n| 25 | `pairing_codes` | 配对码 | code, openid, expiresAt | api-gateway, watch-auth |\n`
    },
    ],
    content: ``
  },
  {
    id: "第六章缓存策略详解",
    title: "第六章：缓存策略详解",
    emoji: "🔄",
    level: 1,
    sections: [
    {
      id: "61-swr-stale-while-revalidate-机制",
      title: "6.1 SWR (Stale-While-Revalidate) 机制",
      level: 2,
      content: `\n```\n用户请求 → 查缓存 → 命中？\n  ├── 未命中 → 请求云端 → 写入缓存 → 返回数据\n  ├── 命中且未过期 → 直接返回缓存数据 ✅\n  └── 命中但已过期 → \n       ├── 在容忍期内(staleTTL) → 返回旧数据 + 后台静默刷新 🔄\n       └── 超出容忍期 → 请求云端 → 写入缓存 → 返回数据\n```\n`
    },
    {
      id: "62-各模块缓存配置",
      title: "6.2 各模块缓存配置",
      level: 2,
      content: `\n| 模块 | API方法 | 缓存模式 | TTL | 过期容忍 | 云函数 |\n|------|---------|---------|-----|---------|--------|\n| 用户 | `callUserFunction` | **storage** | 30分钟 | 5分钟 | user |\n| 小铺 | `callShopFunction` | **storage** | 30分钟 | 5分钟 | shop |\n| 任务 | `callTaskFunction` | memory | 5分钟 | 1分钟 | task |\n| 商城 | `callMallFunction` | memory | 5分钟 | 1分钟 | mall |\n| 仓库 | `callWarehouseFunction` | memory | 5分钟 | 1分钟 | warehouse |\n| 亲密空间 | `callIntimateFunction` | memory | **2分钟** | **30秒** | intimate |\n| 自习室 | `callStudyFunction` | memory | **2分钟** | **30秒** | study-room |\n| 生理期 | `callPeriodFunction` | memory | 5分钟 | 1分钟 | period |\n| 纪念日 | `callAnniversaryFunction` | memory | 5分钟 | 1分钟 | anniversary |\n| 复盘 | `callReviewFunction` | memory | 5分钟 | 1分钟 | review |\n| 消息 | `callMessageFunction` | **无缓存** | - | - | message |\n| 推送 | `callPushPlusFunction` | **无缓存** | - | - | pushPlusService |\n`
    },
    {
      id: "63-缓存key格式",
      title: "6.3 缓存Key格式",
      level: 2,
      content: `\n```\n前缀: cookie_cache_\n格式: cookie_cache_{functionName}_{stableStringify(data)}\n示例: cookie_cache_shop_{\"action\":\"getShopInfo\"}\n示例: cookie_cache_intimate_{\"action\":\"getTodayCheckins\",\"date\":\"2026-05-04\"}\n```\n`
    },
    {
      id: "64-跨模块缓存依赖",
      title: "6.4 跨模块缓存依赖",
      level: 2,
      content: `\n当一个写操作影响了其他模块的数据时，会自动清除关联模块的缓存：\n\n| 写操作 | 影响的缓存模块 |\n|--------|--------------|\n| 打卡 (createCheckin/quickCheckin/createRemedialCheckin) | intimate + **user**（积分变了） |\n| 购买商品 (purchaseGoods) | mall + **user**（积分变了） |\n| 使用商品 (useGoods) | warehouse + **user**（积分变了） |\n| 结束学习 (endStudySession/deleteStudySession) | study-room + **user**（积分变了） |\n| 更新头像 (updateUserAvatar) | **user** + **shop**（头像同步） |\n| 绑定伴侣 (bindPartner/forceSyncPartnerBinding) | intimate + **user** + **shop** |\n| 领取成就奖励 (claimAchievementReward) | intimate + **user** |\n| 更新用户信息 (updateUserInfo/syncAvatarToShop) | user + **shop** |\n| 加入/离开/解散小铺 (joinShop/leaveShop/dissolveShop) | shop + **user** |\n| 更新位置 (shop.updateLocation) | **user** |\n`
    },
    {
      id: "65-缓存清理方法",
      title: "6.5 缓存清理方法",
      level: 2,
      content: `\n```javascript\napi.clearCache()           // 清除所有缓存\napi.clearUserCache()       // 清除 user_ 前缀\napi.clearShopCache()       // 清除 shop_ 前缀\napi.clearTaskCache()       // 清除 task_ 前缀\napi.clearMallCache()       // 清除 mall_ 前缀\napi.clearWarehouseCache()  // 清除 warehouse_ 前缀\napi.clearIntimateCache()   // 清除 intimate_ 前缀\napi.clearStudyCache()      // 清除 study-room_ 前缀\napi.clearAnniversaryCache()// 清除 anniversary_ 前缀\napi.clearReviewCache()     // 清除 review_ 前缀\n```\n`
    },
    ],
    content: ``
  },
  {
    id: "第七章主题系统",
    title: "第七章：主题系统",
    emoji: "🎨",
    level: 1,
    sections: [
    {
      id: "71-css变量完整清单",
      title: "7.1 CSS变量完整清单",
      level: 2,
      content: `\n```css\n/* === 主色调 === */\n--primary-color          /* 主色（默认粉色 #FF6B9D） */\n--secondary-color        /* 辅助色（默认浅粉 #FFB6C1） */\n--accent-color           /* 强调色（默认青绿 #4ECDC4） */\n--success-color          /* 成功色 #2ECC71 */\n--warning-color          /* 警告色 #F39C12 */\n--error-color            /* 错误色 #E74C3C */\n\n/* === 背景渐变 === */\n--primary-gradient       /* 页面背景渐变 */\n--header-gradient        /* 头部渐变 */\n--card-gradient          /* 卡片渐变 */\n\n/* === 阴影 === */\n--card-shadow            /* 卡片阴影 */\n--header-shadow          /* 头部阴影 */\n--hover-shadow           /* 悬浮阴影 */\n\n/* === 圆角 === */\n--card-border-radius     /* 24rpx */\n--button-border-radius   /* 16rpx */\n--input-border-radius    /* 12rpx */\n\n/* === 文字颜色 === */\n--text-primary           /* 主要文字 #2C3E50 */\n--text-secondary         /* 次要文字 #7F8C8D */\n--text-light             /* 轻量文字 #BDC3C7 */\n\n/* === 背景色 === */\n--bg-primary             /* 主背景 #FFFFFF */\n--bg-secondary           /* 次背景 #F8F9FA */\n--bg-tertiary            /* 三级背景 #F5F7FA */\n--border-color           /* 边框色 #E5E5E5 */\n\n/* === 间距 === */\n--spacing-xs / sm / md / lg / xl  /* 8/16/24/32/48 rpx */\n\n/* === 字体大小 === */\n--font-size-xs / sm / md / lg / xl / xxl  /* 20~42 rpx */\n```\n`
    },
    {
      id: "72-8套主题",
      title: "7.2 8套主题",
      level: 2,
      content: `\n| 主题名 | 主色 | 风格 | CSS变量覆盖状态 |\n|--------|------|------|----------------|\n| default | #FF6B9D 粉色 | 默认粉色系 | ✅ 已实现 |\n| warm | #FF8C42 橙色 | 温暖橙色系 | ✅ 已实现 |\n| cool | #4ECDC4 青绿 | 清新青绿色系 | ✅ 已实现 |\n| lavender | #9B59B6 紫色 | 薰衣草紫色系 | ⚠️ 仅导航栏变色 |\n| mint | #20B2AA 绿色 | 薄荷绿色系 | ⚠️ 仅导航栏变色 |\n| sky | #5DADE2 蓝色 | 天蓝色系 | ⚠️ 仅导航栏变色 |\n| peach | #FF9F80 蜜桃 | 蜜桃橙色系 | ⚠️ 仅导航栏变色 |\n| ocean | #3498DB 海蓝 | 海洋蓝色系 | ⚠️ 仅导航栏变色 |\n\n> ⚠️ **注意**: lavender/mint/sky/peach/ocean 这5套主题目前只有导航栏颜色会变化，页面内容区的CSS变量不会跟随切换，因为 `app.wxss` 中缺少对应的 `.theme-xxx` CSS变量覆盖。\n`
    },
    ],
    content: ``
  },
  {
    id: "第八章页面功能详解",
    title: "第八章：页面功能详解",
    emoji: "📱",
    level: 1,
    sections: [
    {
      id: "81-主包页面",
      title: "8.1 主包页面",
      level: 2,
      content: `\n#### 🏠 首页 (pages/index/index)\n\n**功能**: 小铺主页，展示情侣信息、天气、日程、纪念日、甜蜜瞬间\n\n**核心数据流**:\n- `onLoad` → `initPage` → `checkBindingStatus` → `loadPageData`（并行加载7项数据）\n- 定时刷新：位置天气30分钟、时间显示5分钟、倒计时1秒\n\n**使用的API**:\n| API | Action | 用途 |\n|-----|--------|------|\n| callShopFunction | getShopInfo | 小铺信息 |\n| callShopFunction | getHomepagePhoto | 首页大相框 |\n| callShopFunction | getCouplePhoto | 合照 |\n| callShopFunction | getPointsInfo | 积分 |\n| callShopFunction | getBanStatus | 封禁检查 |\n| callShopFunction | getMemoryList | 甜蜜瞬间 |\n| callTaskFunction | getScheduleList | 日程 |\n| callTaskFunction | addSchedule/updateSchedule/completeSchedule/deleteSchedule | 日程CRUD |\n| callTaskFunction | getTaskStats | 任务统计 |\n| callAnniversaryFunction | list/add/update/delete | 纪念日CRUD |\n| callFunction | locationWeather/getWeather | 天气 |\n| callFunction | locationWeather/reverseGeocode | 逆地理编码 |\n| callFunction | locationWeather/getPartnerLocation | 伴侣位置 |\n| callFunction | intimate/updateLocation | 更新位置 |\n| callFunction | message/getUnreadCount | 未读消息 |\n\n**组件**: message-float\n\n---\n\n#### 📋 任务中心 (pages/task/task)\n\n**功能**: 任务大厅、进行赛道、审核中心、结算小屋\n\n**4个Tab**:\n| Tab | 说明 | 任务状态 |\n|-----|------|---------|\n| 任务大厅 | 可接受的任务 | published |\n| 进行赛道 | 正在执行的任务 | accepted / submitted |\n| 审核中心 | 待审核的任务 | submitted |\n| 结算小屋 | 已完成的任务 | completed / rejected |\n\n**使用的API**: callTaskFunction (getTaskList, publishTask, cancelPublishTask), callShopFunction (getBanStatus), callFunction (message/getUnreadCount)\n\n**组件**: message-float\n\n---\n\n#### 🛒 商城 (pages/mall/mall)\n\n**功能**: 商品浏览、分类筛选、购买、商品模板管理\n\n**分类**: all / couple / food / entertainment / travel / lifestyle\n\n**使用的API**: callMallFunction (getGoodsList, purchaseGoods, getPresetTemplates, getCustomTemplates, uploadPresetGoods, uploadCustomGoods, updateTemplates, deleteCustomTemplate, applyPresetGoods, initGoodsData), callShopFunction (getBanStatus), callFunction (message/getUnreadCount)\n\n**组件**: message-float\n\n---\n\n#### 📦 仓库 (pages/warehouse/warehouse)\n\n**功能**: 已购买商品的管理（使用、过期检测）\n\n**状态筛选**: all / unused / used / expired\n\n**使用的API**: callWarehouseFunction (getUserGoods, useGoods, updateGoodsStatus, getGoodsByOrderId), callShopFunction (getBanStatus)\n\n**组件**: message-float\n\n---\n\n#### 👤 个人中心 (pages/profile/profile)\n\n**功能**: 个人信息展示、设置入口、数据统计\n\n**使用的API**: callUserFunction (getUserInfo, updateUserInfo, syncAvatarToShop), callShopFunction (getShopInfo, getPointsInfo, getBanStatus, getMemoryList), callTaskFunction (getTaskStats), callMessageFunction (getUnreadCount), callFunction (intimate/getStatistics, getUnlimitedQRCode)\n\n**组件**: 无\n\n---\n\n#### 🔐 登录页 (pages/login/login)\n\n**功能**: 微信授权登录\n\n**流程**: `wx.getUserProfile` → `handleLogin` → `getWxLoginCode` → `callLoginAPI` → `saveLoginInfo` → `redirectToHome`\n\n**使用的API**: callUserFunction (login), callFunction (user/validateUser)\n\n---\n\n#### 🚀 启动选择页 (pages/startup/startup)\n\n**功能**: 登录后的入口，展示功能快捷入口\n\n**使用的API**: callUserFunction (getUserInfo), callShopFunction (getShopInfo)\n\n---\n`
    },
    ],
    content: ``
  },
  {
    id: "第九章组件详解",
    title: "第九章：组件详解",
    emoji: "🧩",
    level: 1,
    sections: [
    ],
    content: `\n| 组件 | 使用页面 | 功能 |\n|------|---------|------|\n| `message-float` | index, task, mall, warehouse, intimate-space | 消息悬浮球，显示未读数，点击跳转消息页 |\n| `checkin-modal` | intimate-space | 打卡弹窗，选择打卡类型和内容 |\n| `checkin-animation` | intimate-space | 打卡成功动画效果 |\n| `record-modal` | intimate-space | 发布生活记录弹窗 |\n| `note-modal` | intimate-space, study-room | 写小纸条弹窗 |\n| `todo-modal` | intimate-space, study-room | 创建待办事项弹窗 |\n| `remedial-checkin` | intimate-space | 补打卡功能 |\n| `achievement-card` | intimate-space | 成就卡片展示 |\n| `focus-timer` | study-room | 专注计时器（秒表/番茄钟） |\n| `study-record-card` | study-room | 学习记录卡片 |\n| `period-detail-modal` | period-calendar | 生理期详情弹窗 |\n| `record-interaction` | (通用) | 记录互动（点赞/收藏/回复） |\n| `subscribe-guide` | (通用) | 订阅消息引导 |\n\n---\n`
  },
  {
    id: "第十章消息与推送系统",
    title: "第十章：消息与推送系统",
    emoji: "🔔",
    level: 1,
    sections: [
    {
      id: "101-三种通知渠道",
      title: "10.1 三种通知渠道",
      level: 2,
      content: `\n| 渠道 | 云函数 | 说明 |\n|------|--------|------|\n| 站内消息 | message | 应用内消息列表，支持已读/删除 |\n| 微信订阅消息 | sendSubscribeMessage | 微信服务通知，需用户主动订阅 |\n| PushPlus推送 | pushPlusService | 第三方推送，推到微信/企业微信等 |\n`
    },
    {
      id: "102-订阅消息模板",
      title: "10.2 订阅消息模板",
      level: 2,
      content: `\n| 类型 | 模板ID | 状态 |\n|------|--------|------|\n| checkin（打卡） | `1-DeeJ3JWbai03ksbqXRbS-k3Sr4h0-bsxuVCH_JmuU` | ✅ 已配置 |\n| record（记录） | `your_record_template_id` | ❌ 占位符 |\n| task（任务） | `your_task_template_id` | ❌ 占位符 |\n| anniversary（纪念日） | `your_anniversary_template_id` | ❌ 占位符 |\n`
    },
    ],
    content: ``
  },
  {
    id: "第十一章全局数据流",
    title: "第十一章：全局数据流",
    emoji: "📊",
    level: 1,
    sections: [
    {
      id: "111-appglobaldata",
      title: "11.1 app.globalData",
      level: 2,
      content: `\n```javascript\nglobalData: {\n  userInfo: null,          // 当前用户信息\n  partnerInfo: null,       // 伴侣信息\n  isBound: false,          // 是否已绑定伴侣\n  shopInfo: null,          // 小铺信息\n  openid: null,            // 用户openid\n  messageJumpData: null,   // 消息跳转数据\n  activeTimers: new Set(), // 活跃计时器ID集合\n  unreadMessageCount: 0,   // 未读消息数\n  isAppMode: false,        // 是否App模式\n}\n```\n`
    },
    {
      id: "112-本地存储key",
      title: "11.2 本地存储Key",
      level: 2,
      content: `\n| Key | 说明 |\n|-----|------|\n| `openid` | 用户唯一标识 |\n| `userInfo` | 用户信息缓存 |\n| `shopInfo` | 小铺信息缓存 |\n| `partnerInfo` | 伴侣信息缓存 |\n| `isBound` | 绑定状态 |\n| `appToken` | App端Token |\n| `appTheme` | 当前主题 |\n| `appSettings` | 应用设置（含theme） |\n| `cookie_cache_*` | SWR缓存数据 |\n`
    },
    ],
    content: ``
  },
  {
    id: "第十二章已知问题与风险",
    title: "️ 第十二章：已知问题与风险",
    emoji: "⚠",
    level: 1,
    sections: [
    ],
    content: `\n| # | 问题 | 严重程度 | 说明 |\n|---|------|---------|------|\n| 1 | 5套主题CSS变量未实现 | 中 | lavender/mint/sky/peach/ocean切换后只有导航栏变色 |\n| 2 | 3个订阅消息模板未配置 | 中 | record/task/anniversary 仍是占位符 |\n| 3 | 双平台检测逻辑重复 | 低 | network.js和platform.js各自实现isApp判断 |\n| 4 | app.wxss硬编码颜色 | 中 | btn-primary:active中硬编码了#E55A8A |\n| 5 | work-assistant使用callFunction | 低 | 未使用封装的callXxxFunction方法 |\n| 6 | intimate云函数过大 | 中 | 43个action集中在一个云函数，维护困难 |\n\n---\n`
  },
  {
    id: "附录a快速开发指南",
    title: "附录A：快速开发指南",
    emoji: "📝",
    level: 1,
    sections: [
    {
      id: "新增页面的标准流程",
      title: "新增页面的标准流程",
      level: 2,
      content: `\n1. 在对应分包目录下创建页面文件夹（4个文件：js/json/wxml/wxss）\n2. 在 `app.json` 对应分包的 `pages` 数组中注册\n3. 在页面JS中引入必要工具：\n   ```javascript\n   const api = require(\'../../utils/api.js\');\n   const theme = require(\'../../utils/theme.js\');\n   const util = require(\'../../utils/util.js\');\n   const shopCheck = require(\'../../utils/shop-check.js\');\n   ```\n4. 在 `onLoad` 中调用 `theme.applyThemeToPage(this)`\n5. 所有网络请求通过 `api.callXxxFunction()` 发起\n6. 样式使用CSS变量，禁止硬编码颜色值\n`
    },
    {
      id: "新增云函数的标准流程",
      title: "新增云函数的标准流程",
      level: 2,
      content: `\n1. 在 `cloudfunctions/` 下创建目录\n2. 编写 `index.js`（action路由模式）和 `package.json`\n3. 在 `utils/api.js` 中添加对应的 `callXxxFunction` 封装\n4. 在 `utils/cache-dependencies.js` 中配置缓存依赖（如需要）\n5. 部署云函数\n`
    },
    ],
    content: ``
  },
  {
    id: "附录bapi调用速查表",
    title: "附录B：API调用速查表",
    emoji: "📝",
    level: 1,
    sections: [
    ],
    content: `\n```javascript\nconst api = require(\'../../utils/api.js\');\n\n// 用户模块\napi.callUserFunction(\'getUserInfo\', {});\napi.callUserFunction(\'updateUserInfo\', { nickName: \'新昵称\' });\n\n// 小铺模块\napi.callShopFunction(\'getShopInfo\', {});\napi.callShopFunction(\'createShop\', { shopName: \'我们的小铺\' });\n\n// 亲密空间模块\napi.callIntimateFunction(\'getTodayCheckins\', {});\napi.callIntimateFunction(\'createCheckin\', { type: \'早起\', content: \'6点起床\' });\n\n// 自习室模块\napi.callStudyFunction(\'startStudySession\', { mode: \'pomodoro\', todoId: \'xxx\' });\napi.callStudyFunction(\'endStudySession\', { sessionId: \'xxx\' });\n\n// 生理期模块\napi.callPeriodFunction(\'getPeriodCalendar\', { month: \'2026-05\' });\napi.callPeriodFunction(\'startPeriod\', {});\n\n// 任务模块\napi.callTaskFunction(\'getTaskList\', { status: \'hall\', page: 1 });\napi.callTaskFunction(\'publishTask\', { title: \'任务标题\', reward: 10 });\n\n// 商城模块\napi.callMallFunction(\'getGoodsList\', { category: \'couple\', page: 1 });\napi.callMallFunction(\'purchaseGoods\', { goodsId: \'xxx\' });\n\n// 仓库模块\napi.callWarehouseFunction(\'getUserGoods\', { status: \'unused\' });\napi.callWarehouseFunction(\'useGoods\', { orderId: \'xxx\' });\n\n// 纪念日模块\napi.callAnniversaryFunction(\'list\', {});\napi.callAnniversaryFunction(\'add\', { title: \'恋爱纪念日\', date: \'2025-01-01\' });\n\n// 复盘模块\napi.callReviewFunction(\'getReviewByDate\', { date: \'2026-05-04\' });\napi.callReviewFunction(\'submitReview\', { modules: {...} });\n\n// 消息模块（无缓存）\napi.callMessageFunction(\'getMessageList\', { page: 1 });\napi.callMessageFunction(\'markAsRead\', { messageId: \'xxx\' });\n\n// 推送模块（无缓存）\napi.callPushPlusFunction(\'getPushConfig\', {});\n\n// 通用调用\napi.callFunction(\'locationWeather\', { action: \'getWeather\', location: \'北京\' });\n\n// 缓存清理\napi.clearCache();\napi.clearIntimateCache();\n\n// 其他\napi.getTempFileURL([\'cloud://xxx\']);\napi.checkBanStatus();\napi.logout();\n```\n`
  },
];

export const docMeta = {
  title: "Cookie小铺 — 全景式开发手册",
  version: "2026-05-04",
  description: "Cookie小铺是一个面向情侣的微信小程序，核心概念是小铺——情侣共同经营的虚拟空间。",
  tags: ["微信小程序", "云开发", "情侣应用", "架构文档"],
};
