import type { Messages } from "../types";

export const zh: Messages = {
  actions: {
    addGuest: "添加宾客",
    addTable: "添加餐桌",
    cancel: "取消",
    chooseCsv: "选择CSV",
    clearSeat: "清空座位",
    copyLink: "复制链接",
    copied: "已复制",
    edit: "编辑",
    exportCsv: "CSV",
    exportSeats: "导出",
    exportXlsx: "XLSX",
    importGuests: "导入宾客",
    saveChanges: "保存",
    seatByGroup: "按组入座",
    seatByGroupHint:
      "优先将同组宾客安排在同一桌，大组优先。剩余宾客分配到有空位的餐桌。",
    unseatTable: "清空餐桌",
    share: "分享",
    back: "返回",
    home: "首页",
    delete: "删除",
    rename: "重命名",
    createPlan: "新建宴席",
    createFirstPlan: "开始第一个宴席",
    logout: "退出登录",
  },
  aria: {
    duplicateTable: (name) => `复制「${name}」`,
    editGuest: (name) => `编辑「${name}」`,
    language: "切换语言",
    nameForTable: (name) => `为「${name}」命名`,
    planStatus: "宴席概况",
    reorderTable: (name) => `拖拽重新排序「${name}」`,
    removeGuest: (name) => `移除「${name}」`,
    removeTable: (name) => `移除「${name}」`,
    shareLink: "分享链接",
    sharePlan: "分享宴席",
    toggleSidebar: "切换侧边栏 (Ctrl+B)",
    clearSearch: "清除搜索",
    hidePassword: "隐藏密码",
    showPassword: "显示密码",
  },
  auth: {
    loginTitle: "登录",
    signupTitle: "注册",
    email: "邮箱",
    emailPlaceholder: "name@example.com",
    password: "密码",
    login: "登录",
    signup: "注册",
    noAccount: "还没有账号？注册一个",
    hasAccount: "已有账号？去登录",
    authFailed: "认证失败",
  },
  counts: {
    seatedGuests: (seated, total) => `${seated}/${total} 已入座`,
    seats: (count) => `${count} 个座位`,
    tables: (count) => `${count} 张餐桌`,
  },
  confirm: {
    deleteTitle: "确定删除宴席？",
    deleteDescription: "此操作无法撤销。",
    removeTitle: "移除宾客？",
    removeDescription: "该宾客将被移出方案。",
    removeTableTitle: "移除餐桌？",
    removeTableDescription: "该餐桌及其座位分配将被移除。",
  },
  csvPlaceholder: "姓名,组别,饮食\n张三,新娘亲友,素食",
  dashboard: {
    title: "我的宴席",
    emptyTitle: "还没有宴席",
    emptyDescription: "创建你的第一场婚宴座位安排。",
    updatedAt: "更新于",
    plans: "宴席",
  },
  defaults: {
    copySuffix: "副本",
    planName: "宴席名称",
    table: "餐桌",
    topTable: "主桌",
  },
  empty: {
    allGuestsSeated: "宾客都已安排好了。",
    noGuestsFound: "没有找到宾客。",
    noGuestsYet: "在侧边栏添加宾客，然后拖拽到座位上。",
  },
  error: {
    somethingWentWrong: "出了点问题",
    tryAgain: "重试",
  },
  export: {
    seatingPlan: "座位安排",
    fillGuestNames: "请在方案中填写宾客姓名",
    guestList: "宾客名单",
    guestHeader: "宾客",
    tableHeader: "餐桌",
    seatHeader: "座位",
    dietaryHeader: "饮食限制",
    guestPlaceholder: (n) => `宾客 ${n}`,
    note1: "* 每桌建议 20/22 位宾客",
    note2: "* 确定新人座位",
    note3: "* 用宾客姓名替换「宾客 X」占位符",
    weddingSeatingPlan: "婚宴座位安排",
  },
  fields: {
    dietary: "饮食偏好",
    dietaryRestrictions: "饮食偏好",
    group: "分组",
    name: "姓名",
    searchGuests: "搜索宾客",
    totalSeats: "座位数",
    type: "类型",
    ungrouped: "未分组",
    dietaryNote: "饮食备注",
  },
  language: {
    current: "中文",
    en: "English",
    it: "Italiano",
    zh: "简体中文",
    zhTW: "繁體中文",
  },
  modals: {
    editGuest: "编辑宾客信息",
    guestDetails: "宾客详情",
    editGuestDescription: "编辑所选宾客的姓名、分组和饮食限制。",
    seatAssignmentDescription:
      "选择一位宾客分配到此座位，编辑已分配的宾客，或清空座位。",
  },
  partners: {
    advertiseContact: "hhwjsw711@gmail.com",
    advertiseDescription:
      "触达正在规划婚宴座位的准新人——这是整场婚礼筹备中决策意图最强的环节之一。首页横幅、精选合作卡片、宾客端分享页等多种展示形式开放合作。",
    advertisePricing:
      "价格面议，联系我们获取完整刊例与排期信息。",
    advertiseStats: [
      { label: "月度受众", value: "数千对准新人与策划师" },
      { label: "覆盖语种", value: "中文 · 英文 · 意大利语" },
      { label: "单场触达", value: "每份分享链接 100+ 宾客" },
    ],
    advertiseTitle: "广告合作",
    bannerTitle: "婚礼联名推荐",
    bottomCta: "正在筹备婚礼？找专业策划师帮忙",
    bottomCtaLink: "浏览合作伙伴",
    descriptions: {
      "villa-deste": {
        name: "Villa d'Este",
        desc: "坐落于科莫湖畔的文艺复兴贵族府邸，坐拥 10 公顷私家园林。自 1873 年以来一直是意大利最富盛名的婚礼目的地之一。",
      },
      "bella-sposa": {
        name: "Bella Sposa Events",
        desc: "一站式婚礼策划与设计工作室。从私密仪式到盛大庆典，每一个细节都以意大利式的优雅与精准精心雕琢。",
      },
      "luce-photography": {
        name: "Luce Photography",
        desc: "电影叙事风格的婚礼摄影。专注欧洲与亚洲目的地婚礼，捕捉属于你的故事瞬间。",
      },
    },
    sectionTitle: "为您的大日子精选合作伙伴",
    visitWebsite: "访问官网",
  },
  seats: {
    bottom: "下",
    left: "左",
    right: "右",
    seat: "座位",
    top: "上",
  },
  sections: {
    guests: "宾客名单",
    tables: "餐桌",
    unseated: "待安排",
  },
  stats: {
    guests: "宾客",
    open: "空位",
    seats: "座位",
    tables: "餐桌",
  },
  statuses: {
    unseated: "待安排",
  },
  tableShapes: {
    rectangular: "长桌",
    round: "圆桌",
  },
  templates: {
    createGuest: (name) => `添加"${name}"`,
  },
  demo: {
    bannerTitle: "体验模式",
    bannerDesc: "数据保存在本地浏览器中，清空浏览数据会丢失。注册后可保存到云端。",
    planName: "我的婚宴",
    registerSave: "注册并保存",
    saveToCloud: "保存到云端",
    migrating: "正在保存…",
    migrated: "已保存，正在跳转…",
  },
  ui: {
    close: "关闭",
    sidebar: "侧边栏",
    sidebarDescription: "显示移动端侧边栏。",
    toggleSidebar: "切换侧边栏",
  },
  viewer: {
    brandFooter: "由婚礼排座提供 — weddingtable.cn",
    createYourOwn: "创建你自己的宴席",
    invalidLink: "无效链接",
    loading: "正在加载…",
    notFound: "未找到宴席",
    notFoundDescription:
      "分享链接可能已过期，请联系宴席主人获取新链接。",
    printFooter: "婚礼排座 — weddingtable.cn",
    searchPlaceholder: "搜索你的名字…",
    seatingChart: "座次表",
  },
  landing: {
    heroEyebrow: "免费 · 无需注册 · 多语言支持",
    heroTitle: "婚礼排座，从未如此简单",
    heroTagline:
      "一站式在线婚礼座位安排工具。拖拽排座、智能分组、一键分享——五分钟搞定全场座位图，告别纸质草稿和 Excel。",
    startFree: "免费注册",
    tryNow: "立即体验，无需注册",
    goToApp: "进入工作台",
    galleryLabel: "实景预览",
    galleryTitle: "每一场婚礼，都值得精心安排",
    galleryLede:
      "从十人圆桌到长条宴会桌，从 intimate 小型聚会到百人盛宴，每种布局都从容应对。",
    galleryAlt: "婚礼宴会桌席布置",

    advantagesLabel: "为什么选择我们",
    advantagesTitle: "筹备婚礼最头疼的不是选场地，是排座位",
    advantages: [
      {
        icon: "drag",
        title: "拖拽排座，五分钟搞定",
        desc: "把宾客直接拖到座位上，点击即可交换、重排、清空。告别 Excel 和纸质草稿，所见即所得的直观操作让排座变成一件轻松的事。",
      },
      {
        icon: "share",
        title: "一键分享，团队协作",
        desc: "生成分享链接，家人、策划师和餐饮团队即时查看座位图，无需注册。所有信息实时同步，不会出现「谁忘了改」「谁没看到」的状况。",
      },
      {
        icon: "free",
        title: "完全免费，无任何限制",
        desc: "不限制宾客数量、餐桌数量和方案数量。无需注册即可体验核心功能。专业婚庆策划公司仅座位排布就收费 500-2000 元，我们完全免费。",
      },
    ],

    featuresLabel: "核心功能",
    featuresTitle: "用这些功能简化你的座位安排",
    featuresLede:
      "无论是自己操办还是与婚礼策划师合作，这些工具都能帮你节省时间、减轻压力。",
    features: [
      {
        name: "拖拽排座",
        desc: "把宾客直接拖到座位上。点击即可交换、重排、清空，告别 Excel。",
      },
      {
        name: "智能分组入座",
        desc: "一键将同组宾客安排在同一桌，大组优先。姓名性别推断，自动男女交替入座。",
      },
      {
        name: "CSV 批量导入",
        desc: "粘贴或上传宾客名单，自动识别姓名、分组、饮食偏好列。支持 500 条批量导入。",
      },
      {
        name: "饮食偏好标签",
        desc: "自动识别素食、纯素、无麸质、坚果过敏、清真、犹太洁食等 8 种饮食限制。",
      },
      {
        name: "一键分享协作",
        desc: "生成只读分享链接，家人和婚庆团队即时查看座位图，宾客可搜索自己的座位。",
      },
      {
        name: "专业 Excel 导出",
        desc: "一键导出含座位图和宾客名单的专业 Excel 工作簿，直接交给餐饮团队使用。",
      },
      {
        name: "混合桌形支持",
        desc: "同一方案中可同时使用圆桌和长桌，每边座位数可自定义，灵活适配任何场地。",
      },
      {
        name: "打印优化输出",
        desc: "分享查看页直接打印，排版已针对圆桌和长桌优化。导出 CSV 供后续整理。",
      },
      {
        name: "多语言支持",
        desc: "简体中文、繁體中文、英文、意大利语。你的宾客用自己的语言查看座位图。",
      },
    ],
    stepsTitle: "三步搞定婚宴座位图",
    stepsLabel: "使用流程",
    stepsLede:
      "从创建方案到分享给宾客，整个过程不超过五分钟。无需任何专业背景，打开就会。",
    steps: [
      {
        title: "添加宾客",
        desc: "逐一手动输入，或粘贴 CSV 一次性导入 500 条。饮食偏好自动识别，宾客可按分组管理。",
      },
      {
        title: "拖拽排座",
        desc: "把每位宾客拖到座位上，或使用「按组入座」一键安排同组宾客。支持座位间交换和整桌清空。",
      },
      {
        title: "分享导出",
        desc: "一键生成只读分享链接发送给宾客，或导出 Excel 交给餐饮团队。打印排版已自动优化。",
      },
    ],
    guideLabel: "排座指南",
    guideTitle: "婚宴座位安排的实用技巧",
    guideSections: [
      {
        title: "从主桌开始安排",
        body: "新人、双方父母和至亲通常安排在主桌。如果父母离异，可能需要设置两张主桌，让双方父母各自就座，避免尴尬。祖父母、未担任伴郎伴娘的兄弟姐妹、证婚人及其配偶通常安排在主桌附近。",
      },
      {
        title: "综合考虑宾客属性",
        body: "在分配座位时综合考虑宾客的职业、兴趣爱好和年龄层。用心为宾客「配对」，往往发现宴会当晚他们有很多共同话题，自然减少尴尬冷场。用颜色标记系统区分不同类型的宾客，能更直观地完成「性格配对」。",
      },
      {
        title: "选择合适的桌型",
        body: "圆桌因大小不同，通常能让一桌人更方便地彼此交流，非常受欢迎。长方形桌因桌身较长，往往会自然形成两侧不同的小圈子，但宾客人数较多时非常实用，可以在一张桌子上容纳更多人。也可考虑 U 形布局适合小而精致的婚礼。",
      },
      {
        title: "提前规划，留有余地",
        body: "许多新人在婚礼前大约 3 周开始制作座位表，那时基本已收齐 RSVP。临时回复的宾客可以轻松拖拽到合适的位置。建议每组预留 1-2 个空位，以应对临时变动。",
      },
    ],
    testimonialsLabel: "用户评价",
    testimonialsTitle: "来自真实用户的反馈",
    testimonials: [
      {
        quote:
          "这是我用过最好用的婚礼排座工具！拖拽操作非常直观，五分钟就搞定了 150 人的座位安排。之前用 Excel 折腾了一整天都没弄完。",
        author: "小美",
        location: "上海",
      },
      {
        quote:
          "作为婚礼策划师，我同时管理多场婚礼的座位安排。这个工具的分享功能太实用了，客户和餐饮团队都能实时查看最新版本，再也不用反复发 Excel。",
        author: "Lisa Chen",
        location: "北京",
      },
      {
        quote:
          "完全免费还没有任何限制，这太良心了。饮食偏好标签自动识别简直是救星，我们宴会有好几个素食者和过敏体质的宾客。",
        author: "王先生",
        location: "杭州",
      },
      {
        quote:
          "宾客搜索自己名字就能看到座位号，婚礼当天入场非常顺畅，没有拥堵。这个功能比很多付费工具都好用。",
        author: "Anna & David",
        location: "深圳",
      },
    ],
    pricingLabel: "价格",
    pricingTitle: "价格",
    pricingFree: "免费",
    pricingVs:
      "专业婚庆策划公司仅座位排布就收费 <s>¥500-2000</s>。用这个工具，几分钟搞定，<span class=\"hl\">完全免费</span>。",
    pricingTerms:
      "完全免费。立即体验无需注册。接收分享链接无需注册。无隐藏费用。不限制宾客数量、餐桌数量和方案数量。",
    faqLabel: "常见问题",
    faqTitle: "常见问题",
    faq: [
      {
        q: "需要注册才能使用吗？",
        a: "不需要。点击「立即体验」即可直接开始排座，无需注册。你的数据会保存在本地浏览器中。注册账号后可以将数据同步到云端，跨设备使用。",
      },
      {
        q: "宾客查看座位图需要注册吗？",
        a: "不需要。分享链接后任何人可直接查看，无需注册。宾客只需搜索自己的名字即可找到座位。",
      },
      {
        q: "可以打印座位图吗？",
        a: "可以。在分享查看页面直接打印，排版已针对圆桌和长桌优化。也可导出 CSV 或 Excel 格式用于后续整理或交给餐饮团队。",
      },
      {
        q: "可以添加多少宾客？",
        a: "无限制。按需添加宾客和餐桌。CSV 导入每次最多支持 500 条，也可分批导入。",
      },
      {
        q: "支持哪些桌型？",
        a: "支持圆桌（1-24 座环形布局）和长桌（各边座位数 0-20 可自定义）。同一方案中可混合使用圆桌和长桌，灵活适配任何场地布局。",
      },
      {
        q: "可以多人协作排座吗？",
        a: "可以。注册账号后创建的方案支持实时同步，多设备可同时查看最新版本。分享链接支持只读查看，家人和策划团队随时了解最新座位安排。",
      },
      {
        q: "数据安全吗？",
        a: "所有数据通过加密传输存储在云端。分享链接为只读模式，不会泄露你的账号信息。匿名体验模式的数据仅保存在本地浏览器中。",
      },
      {
        q: "不会用怎么办？",
        a: "页面上的提示会引导你。最简单的上手方式：试试拖拽一个宾客到座位上。整个过程不超过五分钟。",
      },
    ],
    bottomCtaTitle: "准备好开始排座了吗？",
    bottomCtaDesc: "立即体验，无需注册。五分钟搞定全场座位图。",
    footerTagline: "你的婚礼，完美入座。",
  },
};
