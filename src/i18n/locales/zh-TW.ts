import type { Messages } from "../types";

export const zhTW: Messages = {
  actions: {
    addGuest: "新增賓客",
    addTable: "新增餐桌",
    cancel: "取消",
    chooseCsv: "選擇 CSV",
    clearSeat: "清空座位",
    copyLink: "複製連結",
    copied: "已複製",
    edit: "編輯",
    exportCsv: "CSV",
    exportSeats: "匯出",
    exportXlsx: "XLSX",
    importGuests: "匯入賓客",
    saveChanges: "儲存",
    seatByGroup: "按組入座",
    seatByGroupHint:
      "優先將同組賓客安排在同一桌，大組優先。剩餘賓客分配到有空位的餐桌。",
    unseatTable: "清空餐桌",
    share: "分享",
    back: "返回",
    home: "首頁",
    delete: "刪除",
    rename: "重新命名",
    createPlan: "新增宴席",
    createFirstPlan: "開始第一個宴席",
    logout: "登出",
  },
  aria: {
    duplicateTable: (name) => `複製「${name}」`,
    editGuest: (name) => `編輯「${name}」`,
    language: "切換語言",
    nameForTable: (name) => `為「${name}」命名`,
    planStatus: "宴席概況",
    reorderTable: (name) => `拖曳重新排序「${name}」`,
    removeGuest: (name) => `移除「${name}」`,
    removeTable: (name) => `移除「${name}」`,
    shareLink: "分享連結",
    sharePlan: "分享宴席",
    toggleSidebar: "切換側邊欄 (Ctrl+B)",
    clearSearch: "清除搜尋",
    hidePassword: "隱藏密碼",
    showPassword: "顯示密碼",
  },
  auth: {
    loginTitle: "登入",
    signupTitle: "註冊",
    email: "電子郵件",
    emailPlaceholder: "name@example.com",
    password: "密碼",
    login: "登入",
    signup: "註冊",
    noAccount: "還沒有帳號？註冊一個",
    hasAccount: "已有帳號？去登入",
    authFailed: "認證失敗",
  },
  counts: {
    seatedGuests: (seated, total) => `${seated}/${total} 已入座`,
    seats: (count) => `${count} 個座位`,
    tables: (count) => `${count} 張餐桌`,
  },
  confirm: {
    deleteTitle: "確定刪除宴席？",
    deleteDescription: "此操作無法復原。",
    removeTitle: "移除賓客？",
    removeDescription: "該賓客將被移出方案。",
    removeTableTitle: "移除餐桌？",
    removeTableDescription: "該餐桌及其座位分配將被移除。",
  },
  csvPlaceholder: "姓名,組別,飲食\n張三,新娘親友,素食",
  dashboard: {
    title: "我的宴席",
    emptyTitle: "還沒有宴席",
    emptyDescription: "建立你的第一場婚宴座位安排。",
    updatedAt: "更新於",
    plans: "宴席",
  },
  defaults: {
    copySuffix: "副本",
    planName: "宴席名稱",
    table: "餐桌",
    topTable: "主桌",
  },
  empty: {
    allGuestsSeated: "賓客都已安排好了。",
    noGuestsFound: "沒有找到賓客。",
    noGuestsYet: "在側邊欄新增賓客，然後拖曳到座位上。",
  },
  error: {
    somethingWentWrong: "出了點問題",
    tryAgain: "重試",
  },
  export: {
    seatingPlan: "座位安排",
    fillGuestNames: "請在方案中填寫賓客姓名",
    guestList: "賓客名單",
    guestHeader: "賓客",
    tableHeader: "餐桌",
    seatHeader: "座位",
    dietaryHeader: "飲食限制",
    guestPlaceholder: (n) => `賓客 ${n}`,
    note1: "* 每桌建議 20/22 位賓客",
    note2: "* 確定新人座位",
    note3: "* 用賓客姓名替換「賓客 X」佔位符",
    weddingSeatingPlan: "婚宴座位安排",
  },
  fields: {
    dietary: "飲食偏好",
    dietaryRestrictions: "飲食偏好",
    group: "分組",
    name: "姓名",
    searchGuests: "搜尋賓客",
    totalSeats: "座位數",
    type: "類型",
    ungrouped: "未分組",
    dietaryNote: "飲食備註",
  },
  language: {
    current: "繁體",
    en: "English",
    it: "Italiano",
    zh: "简体中文",
    zhTW: "繁體中文",
  },
  modals: {
    editGuest: "編輯賓客資訊",
    guestDetails: "賓客詳情",
    editGuestDescription: "編輯所選賓客的姓名、分組和飲食限制。",
    seatAssignmentDescription:
      "選擇一位賓客分配到此座位，編輯已分配的賓客，或清空座位。",
  },
  partners: {
    advertiseContact: "hhwjsw711@gmail.com",
    advertiseDescription:
      "觸達正在規劃婚宴座位的準新人——這是整場婚禮籌備中決策意圖最強的環節之一。首頁橫幅、精選合作卡片、賓客端分享頁等多種展示形式開放合作。",
    advertisePricing:
      "價格面議，聯繫我們獲取完整刊例與排期資訊。",
    advertiseStats: [
      { label: "月度受眾", value: "數千對準新人與策劃師" },
      { label: "覆蓋語種", value: "中文 · 英文 · 義大利語" },
      { label: "單場觸達", value: "每份分享連結 100+ 賓客" },
    ],
    advertiseTitle: "廣告合作",
    bannerTitle: "婚禮聯名推薦",
    bottomCta: "正在籌備婚禮？找專業策劃師幫忙",
    bottomCtaLink: "瀏覽合作夥伴",
    descriptions: {
      "villa-deste": {
        name: "Villa d'Este",
        desc: "坐落於科莫湖畔的文藝復興貴族府邸，坐擁 10 公頃私家園林。自 1873 年以來一直是義大利最富盛名的婚禮目的地之一。",
      },
      "bella-sposa": {
        name: "Bella Sposa Events",
        desc: "一站式婚禮策劃與設計工作室。從私密儀式到盛大庆典，每一個細節都以義大利式的優雅與精準精心雕琢。",
      },
      "luce-photography": {
        name: "Luce Photography",
        desc: "電影敘事風格的婚禮攝影。專注歐洲與亞洲目的地婚禮，捕捉屬於你的故事瞬間。",
      },
    },
    sectionTitle: "為您的大日子精選合作夥伴",
    visitWebsite: "訪問官網",
  },
  seats: {
    bottom: "下",
    left: "左",
    right: "右",
    seat: "座位",
    top: "上",
  },
  sections: {
    guests: "賓客名單",
    tables: "餐桌",
    unseated: "待安排",
  },
  stats: {
    guests: "賓客",
    open: "空位",
    seats: "座位",
    tables: "餐桌",
  },
  statuses: {
    unseated: "待安排",
  },
  tableShapes: {
    rectangular: "長桌",
    round: "圓桌",
  },
  templates: {
    createGuest: (name) => `新增「${name}」`,
  },
  demo: {
    bannerTitle: "體驗模式",
    bannerDesc: "資料儲存在本地瀏覽器中，清除瀏覽資料會遺失。註冊後可儲存到雲端。",
    planName: "我的婚宴",
    registerSave: "註冊並儲存",
    saveToCloud: "儲存到雲端",
    migrating: "正在儲存…",
    migrated: "已儲存，正在跳轉…",
  },
  ui: {
    close: "關閉",
    sidebar: "側邊欄",
    sidebarDescription: "顯示行動端側邊欄。",
    toggleSidebar: "切換側邊欄",
  },
  viewer: {
    brandFooter: "由婚禮排座提供 — weddingtable.cn",
    createYourOwn: "建立你自己的宴席",
    invalidLink: "無效連結",
    loading: "正在載入…",
    notFound: "未找到宴席",
    notFoundDescription:
      "分享連結可能已逾期，請聯絡宴席主人取得新連結。",
    printFooter: "婚禮排座 — weddingtable.cn",
    searchPlaceholder: "搜尋你的名字…",
    seatingChart: "座次表",
  },
  landing: {
    heroEyebrow: "免費 · 無需註冊 · 多語言支援",
    heroTitle: "婚禮排座，從未如此簡單",
    heroTagline:
      "一站式線上婚禮座位安排工具。拖曳排座、智慧分組、一鍵分享——五分鐘搞定全場座位圖，告別紙本草稿和 Excel。",
    startFree: "免費註冊",
    tryNow: "立即體驗，無需註冊",
    goToApp: "進入工作台",
    galleryLabel: "實景預覽",
    galleryTitle: "每一場婚禮，都值得精心安排",
    galleryLede:
      "從十人圓桌到長條宴會桌，從 intimate 小型聚會到百人盛宴，每種佈局都從容應對。",
    galleryAlt: "婚禮宴會桌席佈置",

    advantagesLabel: "為什麼選擇我們",
    advantagesTitle: "籌備婚禮最頭痛的不是選場地，是排座位",
    advantages: [
      {
        icon: "drag",
        title: "拖曳排座，五分鐘搞定",
        desc: "把賓客直接拖到座位上，點擊即可交換、重排、清空。告別 Excel 和紙本草稿，所見即所得的直覺操作讓排座變成一件輕鬆的事。",
      },
      {
        icon: "share",
        title: "一鍵分享，團隊協作",
        desc: "生成分享連結，家人、策劃師和餐飲團隊即時查看座位圖，無需註冊。所有資訊即時同步，不會出現「誰忘了改」「誰沒看到」的狀況。",
      },
      {
        icon: "free",
        title: "完全免費，無任何限制",
        desc: "不限制賓客數量、餐桌數量和方案數量。無需註冊即可體驗核心功能。專業婚慶策劃公司僅座位排佈就收費 500-2000 元，我們完全免費。",
      },
    ],

    featuresLabel: "核心功能",
    featuresTitle: "用這些功能簡化你的座位安排",
    featuresLede:
      "無論是自己籌辦還是與婚禮策劃師合作，這些工具都能幫你節省時間、減輕壓力。",
    features: [
      {
        name: "拖曳排座",
        desc: "把賓客直接拖到座位上。點擊即可交換、重排、清空，告別 Excel。",
      },
      {
        name: "智慧分組入座",
        desc: "一鍵將同組賓客安排在同一桌，大組優先。姓名性別推斷，自動男女交替入座。",
      },
      {
        name: "CSV 批次匯入",
        desc: "貼上或上傳賓客名單，自動識別姓名、分組、飲食偏好欄。支援 500 條批次匯入。",
      },
      {
        name: "飲食偏好標籤",
        desc: "自動識別素食、純素、無麩質、堅果過敏、清真、猶太潔食等 8 種飲食限制。",
      },
      {
        name: "一鍵分享協作",
        desc: "生成唯讀分享連結，家人和婚慶團隊即時查看座位圖，賓客可搜尋自己的座位。",
      },
      {
        name: "專業 Excel 匯出",
        desc: "一鍵匯出含座位圖和賓客名單的專業 Excel 工作簿，直接交給餐飲團隊使用。",
      },
      {
        name: "混合桌形支援",
        desc: "同一方案中可同時使用圓桌和長桌，每邊座位數可自訂，靈活適配任何場地。",
      },
      {
        name: "列印最佳化輸出",
        desc: "分享檢視頁直接列印，排版已針對圓桌和長桌最佳化。匯出 CSV 供後續整理。",
      },
      {
        name: "多語言支援",
        desc: "簡體中文、繁體中文、英文、義大利語。你的賓客用自己的語言查看座位圖。",
      },
    ],
    stepsTitle: "三步搞定婚宴座位圖",
    stepsLabel: "使用流程",
    stepsLede:
      "從建立方案到分享給賓客，整個過程不超過五分鐘。無需任何專業背景，開啟就會。",
    steps: [
      {
        title: "新增賓客",
        desc: "逐一手動輸入，或貼上 CSV 一次性匯入 500 條。飲食偏好自動識別，賓客可按分組管理。",
      },
      {
        title: "拖曳排座",
        desc: "把每位賓客拖到座位上，或使用「按組入座」一鍵安排同組賓客。支援座位間交換和整桌清空。",
      },
      {
        title: "分享匯出",
        desc: "一鍵生成唯讀分享連結發送給賓客，或匯出 Excel 交給餐飲團隊。列印排版已自動最佳化。",
      },
    ],
    guideLabel: "排座指南",
    guideTitle: "婚宴座位安排的實用技巧",
    guideSections: [
      {
        title: "從主桌開始安排",
        body: "新人、雙方父母和至親通常安排在主桌。如果父母離異，可能需要設定兩張主桌，讓雙方父母各自就座，避免尷尬。祖父母、未擔任伴郎伴娘的兄弟姐妹、證婚人及其配偶通常安排在主桌附近。",
      },
      {
        title: "綜合考慮賓客屬性",
        body: "在分配座位時綜合考慮賓客的職業、興趣愛好和年齡層。用心為賓客「配對」，往往發現宴會當晚他們有很多共同話題，自然減少尷尬冷場。用顏色標記系統區分不同類型的賓客，能更直覺地完成「性格配對」。",
      },
      {
        title: "選擇合適的桌型",
        body: "圓桌因大小不同，通常能讓一桌人更方便地彼此交流，非常受歡迎。長方形桌因桌身較長，往往會自然形成兩側不同的小圈子，但賓客人數較多時非常實用，可以在一張桌子上容納更多人。也可考慮 U 形佈局適合小而精緻的婚禮。",
      },
      {
        title: "提前規劃，留有餘地",
        body: "許多新人在婚禮前大約 3 週開始製作座位表，那時基本已收齊 RSVP。臨時回覆的賓客可以輕鬆拖曳到合適的位置。建議每組預留 1-2 個空位，以應對臨時變動。",
      },
    ],
    testimonialsLabel: "使用者評價",
    testimonialsTitle: "來自真實使用者的回饋",
    testimonials: [
      {
        quote:
          "這是我用過最好用的婚禮排座工具！拖曳操作非常直覺，五分鐘就搞定了 150 人的座位安排。之前用 Excel 折騰了一整天都沒弄完。",
        author: "小美",
        location: "上海",
      },
      {
        quote:
          "作為婚禮策劃師，我同時管理多場婚禮的座位安排。這個工具的分享功能太實用了，客戶和餐飲團隊都能即時查看最新版本，再也不用反覆發 Excel。",
        author: "Lisa Chen",
        location: "北京",
      },
      {
        quote:
          "完全免費還沒有任何限制，這太良心了。飲食偏好標籤自動識別簡直是救星，我們宴會有好幾個素食者和過敏體質的賓客。",
        author: "王先生",
        location: "杭州",
      },
      {
        quote:
          "賓客搜尋自己名字就能看到座位號，婚禮當天入場非常順暢，沒有擁堵。這個功能比很多付費工具都好用。",
        author: "Anna & David",
        location: "深圳",
      },
    ],
    pricingLabel: "價格",
    pricingTitle: "價格",
    pricingFree: "免費",
    pricingVs:
      "專業婚慶策劃公司僅座位排佈就收費 <s>¥500-2000</s>。用這個工具，幾分鐘搞定，<span class=\"hl\">完全免費</span>。",
    pricingTerms:
      "完全免費。立即體驗無需註冊。接收分享連結無需註冊。無隱藏費用。不限制賓客數量、餐桌數量和方案數量。",
    faqLabel: "常見問題",
    faqTitle: "常見問題",
    faq: [
      {
        q: "需要註冊才能使用嗎？",
        a: "不需要。點擊「立即體驗」即可直接開始排座，無需註冊。你的資料會儲存在本地瀏覽器中。註冊帳號後可以將資料同步到雲端，跨裝置使用。",
      },
      {
        q: "賓客查看座位圖需要註冊嗎？",
        a: "不需要。分享連結後任何人可直接查看，無需註冊。賓客只需搜尋自己的名字即可找到座位。",
      },
      {
        q: "可以列印座位圖嗎？",
        a: "可以。在分享檢視頁面直接列印，排版已針對圓桌和長桌最佳化。也可匯出 CSV 或 Excel 格式用於後續整理或交給餐飲團隊。",
      },
      {
        q: "可以新增多少賓客？",
        a: "無限制。按需新增賓客和餐桌。CSV 匯入每次最多支援 500 條，也可分批匯入。",
      },
      {
        q: "支援哪些桌型？",
        a: "支援圓桌（1-24 座環形佈局）和長桌（各邊座位數 0-20 可自訂）。同一方案中可混合使用圓桌和長桌，靈活適配任何場地佈局。",
      },
      {
        q: "可以多人協作排座嗎？",
        a: "可以。註冊帳號後建立的方案支援即時同步，多裝置可同時查看最新版本。分享連結支援唯讀查看，家人和策劃團隊隨時了解最新座位安排。",
      },
      {
        q: "資料安全嗎？",
        a: "所有資料透過加密傳輸儲存在雲端。分享連結為唯讀模式，不會洩露你的帳號資訊。匿名體驗模式的資料僅儲存在本地瀏覽器中。",
      },
      {
        q: "不會用怎麼辦？",
        a: "頁面上的提示會引導你。最簡單的上手方式：試試拖曳一個賓客到座位上。整個過程不超過五分鐘。",
      },
    ],
    bottomCtaTitle: "準備好開始排座了嗎？",
    bottomCtaDesc: "立即體驗，無需註冊。五分鐘搞定全場座位圖。",
    footerTagline: "你的婚禮，完美入座。",
  },
};
