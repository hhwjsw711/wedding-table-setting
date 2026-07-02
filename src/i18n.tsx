import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Locale = "en" | "it" | "zh";

export type Messages = {
  actions: {
    addGuest: string;
    addTable: string;
    cancel: string;
    chooseCsv: string;
    clearSeat: string;
    copyLink: string;
    copied: string;
    edit: string;
    exportCsv: string;
    exportSeats: string;
    exportXlsx: string;
    importGuests: string;
    saveChanges: string;
    seatByGroup: string;
    seatByGroupHint: string;
    unseatTable: string;
    share: string;
    back: string;
    home: string;
    delete: string;
    rename: string;
    createPlan: string;
    createFirstPlan: string;
    logout: string;
  };
  aria: {
    duplicateTable: (name: string) => string;
    editGuest: (name: string) => string;
    language: string;
    nameForTable: (name: string) => string;
    planStatus: string;
    reorderTable: (name: string) => string;
    removeGuest: (name: string) => string;
    removeTable: (name: string) => string;
    shareLink: string;
    sharePlan: string;
    toggleSidebar: string;
    clearSearch: string;
  };
  auth: {
    loginTitle: string;
    signupTitle: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    login: string;
    signup: string;
    noAccount: string;
    hasAccount: string;
  };
  counts: {
    seatedGuests: (seated: number, total: number) => string;
    seats: (count: number) => string;
    tables: (count: number) => string;
  };
  confirm: {
    deleteTitle: string;
    deleteDescription: string;
    removeTitle: string;
    removeDescription: string;
    removeTableTitle: string;
    removeTableDescription: string;
  };
  csvPlaceholder: string;
  dashboard: {
    title: string;
    emptyTitle: string;
    emptyDescription: string;
    updatedAt: string;
    plans: string;
  };
  defaults: {
    copySuffix: string;
    planName: string;
    table: string;
    topTable: string;
  };
  empty: {
    allGuestsSeated: string;
    noGuestsFound: string;
    noGuestsYet: string;
  };
  fields: {
    dietary: string;
    dietaryRestrictions: string;
    group: string;
    name: string;
    searchGuests: string;
    totalSeats: string;
    type: string;
  };
  language: {
    current: string;
    next: string;
  };
  modals: {
    editGuest: string;
    guestDetails: string;
  };
  seats: {
    bottom: string;
    left: string;
    right: string;
    seat: string;
    top: string;
  };
  sections: {
    guests: string;
    tables: string;
    unseated: string;
  };
  stats: {
    guests: string;
    open: string;
    seats: string;
    tables: string;
  };
  statuses: {
    unseated: string;
  };
  tableShapes: {
    rectangular: string;
    round: string;
  };
  templates: {
    createGuest: (name: string) => string;
  };
  viewer: {
    createYourOwn: string;
    searchPlaceholder: string;
    seatingChart: string;
    notFound: string;
    notFoundDescription: string;
    invalidLink: string;
    loading: string;
  };
  landing: {
    heroEyebrow: string;
    heroTitle: string;
    heroTagline: string;
    startFree: string;
    goToApp: string;
    galleryLabel: string;
    galleryTitle: string;
    galleryLede: string;
    galleryAlt: string;
    featuresLabel: string;
    featuresTitle: string;
    features: { name: string; desc: string }[];
    stepsTitle: string;
    stepsLabel: string;
    steps: { title: string; desc: string }[];
    pricingLabel: string;
    pricingTitle: string;
    pricingFree: string;
    pricingVs: string;
    pricingTerms: string;
    faqLabel: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
    footerTagline: string;
  };
};

const messages: Record<Locale, Messages> = {
  en: {
    actions: {
      addGuest: "Add Guest",
      addTable: "Add Table",
      cancel: "Cancel",
      chooseCsv: "Choose CSV",
      clearSeat: "Clear Seat",
      copyLink: "Copy Link",
      copied: "Copied",
      edit: "Edit",
      exportCsv: "CSV",
      exportSeats: "Export",
      exportXlsx: "XLSX",
      importGuests: "Import Guests",
      saveChanges: "Save",
      seatByGroup: "Seat by Group",
      seatByGroupHint: "Places each group at the same table when possible, largest groups first. Remaining guests fill available seats.",
      unseatTable: "Clear Table",
      share: "Share",
      back: "Back",
      home: "Home",
      delete: "Delete",
      rename: "Rename",
      createPlan: "New Banquet",
      createFirstPlan: "Plan Your First Banquet",
      logout: "Log out",
    },
    aria: {
      duplicateTable: (name) => `Duplicate "${name}"`,
      editGuest: (name) => `Edit "${name}"`,
      language: "Switch language",
      nameForTable: (name) => `Name for "${name}"`,
      planStatus: "Banquet overview",
      reorderTable: (name) => `Drag to reorder "${name}"`,
      removeGuest: (name) => `Remove "${name}"`,
      removeTable: (name) => `Remove "${name}"`,
      shareLink: "Share link",
      sharePlan: "Share this banquet",
      toggleSidebar: "Toggle Sidebar (Ctrl+B)",
      clearSearch: "Clear search",
    },
    auth: {
      loginTitle: "Log in",
      signupTitle: "Sign up",
      email: "Email",
      emailPlaceholder: "name@example.com",
      password: "Password",
      login: "Log in",
      signup: "Sign up",
      noAccount: "No account yet? Sign up",
      hasAccount: "Already have an account? Log in",
    },
    counts: {
      seatedGuests: (seated, total) => `${seated}/${total} seated`,
      seats: (count) => `${count} ${count === 1 ? "seat" : "seats"}`,
      tables: (count) => `${count} ${count === 1 ? "table" : "tables"}`,
    },
    confirm: {
      deleteTitle: "Delete banquet?",
      deleteDescription: "This action cannot be undone.",
      removeTitle: "Remove guest?",
      removeDescription: "This guest will be removed from the plan.",
      removeTableTitle: "Remove table?",
      removeTableDescription: "This table and its seat assignments will be removed.",
    },
    csvPlaceholder: "name,group,dietary\nAlice Smith,Bride's family,Vegetarian",
    dashboard: {
      title: "My Banquets",
      emptyTitle: "No banquets yet",
      emptyDescription: "Plan your first wedding banquet.",
      updatedAt: "Updated",
      plans: "Banquets",
    },
    defaults: {
      copySuffix: "Copy",
      planName: "Banquet name",
      table: "Table",
      topTable: "Head Table",
    },
    empty: {
      allGuestsSeated: "Everyone has a seat.",
      noGuestsFound: "No guests found.",
      noGuestsYet: "Add guests in the sidebar, then drag them onto seats.",
    },
    fields: {
      dietary: "Dietary",
      dietaryRestrictions: "Dietary preferences",
      group: "Group",
      name: "Name",
      searchGuests: "Search guests",
      totalSeats: "Seats",
      type: "Type",
    },
    language: {
      current: "EN",
      next: "中文",
    },
    modals: {
      editGuest: "Edit guest",
      guestDetails: "Guest details",
    },
    seats: {
      bottom: "Bottom",
      left: "Left",
      right: "Right",
      seat: "Seat",
      top: "Top",
    },
    sections: {
      guests: "Guest List",
      tables: "Tables",
      unseated: "To Seat",
    },
    stats: {
      guests: "Guests",
      open: "Open",
      seats: "Seats",
      tables: "Tables",
    },
    statuses: {
      unseated: "To seat",
    },
    tableShapes: {
      rectangular: "Rectangular",
      round: "Round",
    },
    templates: {
      createGuest: (name) => `Add "${name}"`,
    },
    viewer: {
      createYourOwn: "Create your own banquet",
      seatingChart: "Seating Chart",
      searchPlaceholder: "Search your name\u2026",
      notFound: "Banquet not found",
      notFoundDescription:
        "This link may have expired. Ask the host for a new one.",
      invalidLink: "Invalid link",
      loading: "Loading\u2026",
    },
    landing: {
      heroEyebrow: "Free \u00b7 No Registration \u00b7 Multi-language",
      heroTitle: "Wedding Table",
      heroTagline: "The hardest part of wedding planning isn't the venue \u2014 it's the seating chart. Drag, drop, done in five minutes.",
      startFree: "Start Free",
      goToApp: "Go to Dashboard",
      galleryLabel: "Gallery",
      galleryTitle: "Beautiful Weddings, Perfectly Seated",
      galleryLede: "From round tables to long banquet rows, every layout finds its place.",
      galleryAlt: "Wedding banquet table setting",
      featuresLabel: "Features",
      featuresTitle: "Everything You Need",
      features: [
        { name: "Drag & Drop Seating", desc: "Drag guests directly onto seats. Swap, reorder, clear with a click. No spreadsheets needed." },
        { name: "CSV Batch Import", desc: "Paste or upload your guest list. Auto-detects name, group, and dietary columns." },
        { name: "Dietary Badge Detection", desc: "Automatically identifies vegetarian, vegan, gluten-free, nut allergy, halal, kosher, and more." },
        { name: "Share & Collaborate", desc: "Generate a share link in one click. Family and planners view the seating chart instantly \u2014 no account needed." },
        { name: "Multi-language Support", desc: "Chinese, English, and Italian. Your guests see the chart in their own language." },
        { name: "Mixed Table Shapes", desc: "Round tables and rectangular tables in the same plan. Customize seats per side." },
      ],
      stepsTitle: "How It Works",
      stepsLabel: "How It Works",
      steps: [
        { title: "Create a Banquet", desc: "Name your event. We'll set up a default table so you can start immediately." },
        { title: "Add Guests", desc: "Type names one by one, or paste a CSV. Dietary preferences are auto-detected." },
        { title: "Drag to Seat", desc: "Drag each guest onto a seat. Use 'Seat By Group' to auto-place groups together." },
        { title: "Share the Link", desc: "One click generates a shared view link. No account needed for guests or planners." },
      ],
      pricingLabel: "Pricing",
      pricingTitle: "Pricing",
      pricingFree: "Free",
      pricingVs: "Professional wedding planners charge <s>$500-2,000</s> just for the seating chart. This tool does it in minutes, <span class=\"hl\">at zero cost</span>.",
      pricingTerms: "Completely free. No registration required to receive a shared link. No hidden fees. No limits on guests, tables, or plans.",
      faqLabel: "FAQ",
      faqTitle: "Frequently Asked Questions",
      faq: [
        { q: "Do guests need an account to view the seating chart?", a: "No. When you share the link, anyone can view it \u2014 no registration needed." },
        { q: "Can I print the seating chart?", a: "Yes. You can print directly from the shared view page. The layout is optimized for printing round and rectangular tables." },
        { q: "How many guests can I add?", a: "No limit. Add as many guests and tables as you need. CSV import supports up to 500 guests per batch." },
        { q: "What if I need help?", a: "Everything is explained on the page. If you're stuck, just try dragging a guest \u2014 that's all you need to get started." },
      ],
      footerTagline: "Your wedding, perfectly seated.",
    },
  },
  it: {
    actions: {
      addGuest: "Aggiungi ospite",
      addTable: "Aggiungi tavolo",
      cancel: "Annulla",
      chooseCsv: "Scegli CSV",
      clearSeat: "Libera posto",
      copyLink: "Copia link",
      copied: "Copiato",
      edit: "Modifica",
      exportCsv: "CSV",
      exportSeats: "Esporta",
      exportXlsx: "XLSX",
      importGuests: "Importa ospiti",
      saveChanges: "Salva",
      seatByGroup: "Assegna per gruppo",
      seatByGroupHint: "Assegna ogni gruppo allo stesso tavolo se possibile, dal più grande. I restanti riempiono i posti disponibili.",
      unseatTable: "Libera tavolo",
      share: "Condividi",
      back: "Indietro",
      home: "Home",
      delete: "Elimina",
      rename: "Rinomina",
      createPlan: "Nuovo banchetto",
      createFirstPlan: "Organizza il tuo primo banchetto",
      logout: "Esci",
    },
    aria: {
      duplicateTable: (name) => `Duplica "${name}"`,
      editGuest: (name) => `Modifica "${name}"`,
      language: "Cambia lingua",
      nameForTable: (name) => `Nome per "${name}"`,
      planStatus: "Panoramica banchetto",
      reorderTable: (name) => `Trascina per riordinare "${name}"`,
      removeGuest: (name) => `Rimuovi "${name}"`,
      removeTable: (name) => `Rimuovi "${name}"`,
      shareLink: "Link di condivisione",
      sharePlan: "Condividi questo banchetto",
      toggleSidebar: "Attiva/disattiva barra laterale (Ctrl+B)",
      clearSearch: "Cancella ricerca",
    },
    auth: {
      loginTitle: "Accedi",
      signupTitle: "Registrati",
      email: "Email",
      emailPlaceholder: "name@example.com",
      password: "Password",
      login: "Accedi",
      signup: "Registrati",
      noAccount: "Non hai un account? Registrati",
      hasAccount: "Hai già un account? Accedi",
    },
    counts: {
      seatedGuests: (seated, total) => `${seated}/${total} assegnati`,
      seats: (count) => `${count} ${count === 1 ? "posto" : "posti"}`,
      tables: (count) => `${count} ${count === 1 ? "tavolo" : "tavoli"}`,
    },
    confirm: {
      deleteTitle: "Eliminare banchetto?",
      deleteDescription: "Questa azione non può essere annullata.",
      removeTitle: "Rimuovere ospite?",
      removeDescription: "L'ospite sarà rimosso dal piano.",
      removeTableTitle: "Rimuovere tavolo?",
      removeTableDescription: "Il tavolo e le assegnazioni saranno rimossi.",
    },
    csvPlaceholder: "nome,gruppo,dieta\nAlice Rossi,Famiglia,Vegetariano",
    dashboard: {
      title: "I miei banchetti",
      emptyTitle: "Nessun banchetto",
      emptyDescription: "Organizza il tuo primo banchetto nuziale.",
      updatedAt: "Aggiornato",
      plans: "Banchetti",
    },
    defaults: {
      copySuffix: "Copia",
      planName: "Nome banchetto",
      table: "Tavolo",
      topTable: "Tavolo principale",
    },
    empty: {
      allGuestsSeated: "Tutti gli ospiti hanno un posto.",
      noGuestsFound: "Nessun ospite trovato.",
      noGuestsYet: "Aggiungi ospiti nella barra laterale, poi trascinali sui posti.",
    },
    fields: {
      dietary: "Dieta",
      dietaryRestrictions: "Restrizioni alimentari",
      group: "Gruppo",
      name: "Nome",
      searchGuests: "Cerca ospiti",
      totalSeats: "Posti totali",
      type: "Tipo",
    },
    language: {
      current: "IT",
      next: "English",
    },
    modals: {
      editGuest: "Modifica ospite",
      guestDetails: "Dettagli ospite",
    },
    seats: {
      bottom: "Sotto",
      left: "Sinistra",
      right: "Destra",
      seat: "Posto",
      top: "Sopra",
    },
    sections: {
      guests: "Lista ospiti",
      tables: "Tavoli",
      unseated: "Da sistemare",
    },
    stats: {
      guests: "Ospiti",
      open: "Liberi",
      seats: "Posti",
      tables: "Tavoli",
    },
    statuses: {
      unseated: "Da sistemare",
    },
    tableShapes: {
      rectangular: "Rettangolare",
      round: "Rotondo",
    },
    templates: {
      createGuest: (name) => `Aggiungi "${name}"`,
    },
    viewer: {
      createYourOwn: "Crea il tuo banchetto",
      seatingChart: "Disposizione Tavoli",
      searchPlaceholder: "Cerca il tuo nome\u2026",
      notFound: "Banchetto non trovato",
      notFoundDescription: "Questo link potrebbe essere scaduto. Chiedi un nuovo link all'organizzatore.",
      invalidLink: "Link non valido",
      loading: "Caricamento\u2026",
    },
    landing: {
      heroEyebrow: "Gratuito \u00b7 Nessuna registrazione \u00b7 Multilingue",
      heroTitle: "Wedding Table",
      heroTagline: "La parte pi\u00f9 difficile del matrimonio non \u00e8 la location \u2014 \u00e8 la disposizione dei tavoli. Trascina, rilascia, fatto in cinque minuti.",
      startFree: "Inizia Gratis",
      goToApp: "Vai alla Dashboard",
      galleryLabel: "Galleria",
      galleryTitle: "Matrimoni Bellissimi, Perfettamente Organizzati",
      galleryLede: "Dai tavoli rotondi alle lunghe file da banchetto, ogni disposizione trova il suo posto.",
      galleryAlt: "Allestimento tavoli per matrimonio",
      featuresLabel: "Caratteristiche",
      featuresTitle: "Tutto Ci\u00f2 di Cui Hai Bisogno",
      features: [
        { name: "Disposizione Drag & Drop", desc: "Trascina gli ospiti direttamente sui posti. Scambia, riordina, cancella con un clic. Niente fogli di calcolo." },
        { name: "Importazione CSV", desc: "Incolla o carica la tua lista degli invitati. Rileva automaticamente nome, gruppo e colonne dietetiche." },
        { name: "Rilevamento Diete", desc: "Identifica automaticamente vegetariano, vegano, senza glutine, allergia alle noci, halal, kosher e altro." },
        { name: "Condivisione Link", desc: "Genera un link di condivisione con un clic. Familiari e wedding planner vedono la disposizione istantaneamente \u2014 senza account." },
        { name: "Supporto Multilingue", desc: "Cinese, inglese e italiano. I tuoi ospiti vedono la disposizione nella propria lingua." },
        { name: "Tavoli Misti", desc: "Tavoli rotondi e rettangolari nello stesso piano. Personalizza i posti per lato." },
      ],
      stepsTitle: "Come Funziona",
      stepsLabel: "Come Funziona",
      steps: [
        { title: "Crea un Banchetto", desc: "Dai un nome al tuo evento. Prepariamo un tavolo predefinito per iniziare subito." },
        { title: "Aggiungi Ospiti", desc: "Digita i nomi uno per uno o incolla un CSV. Le preferenze alimentari vengono rilevate automaticamente." },
        { title: "Assegna i Posti", desc: "Trascina ogni ospite su un posto. Usa 'Assegna per Gruppo' per posizionare i gruppi insieme." },
        { title: "Condividi il Link", desc: "Un clic genera un link di visualizzazione condiviso. Nessun account richiesto per ospiti o organizzatori." },
      ],
      pricingLabel: "Prezzi",
      pricingTitle: "Prezzi",
      pricingFree: "Gratuito",
      pricingVs: "I wedding planner professionisti chiedono <s>\u20ac500-2.000</s> solo per la disposizione dei tavoli. Questo strumento lo fa in pochi minuti, <span class=\"hl\">a costo zero</span>.",
      pricingTerms: "Completamente gratuito. Nessuna registrazione richiesta per ricevere un link condiviso. Nessun costo nascosto. Nessun limite di ospiti, tavoli o piani.",
      faqLabel: "Domande Frequenti",
      faqTitle: "Domande Frequenti",
      faq: [
        { q: "Gli ospiti devono creare un account per vedere la disposizione?", a: "No. Quando condividi il link, chiunque pu\u00f2 visualizzarlo \u2014 senza registrazione." },
        { q: "Posso stampare la disposizione dei tavoli?", a: "S\u00ec. Puoi stampare direttamente dalla pagina di visualizzazione condivisa. Il layout \u00e8 ottimizzato per la stampa di tavoli rotondi e rettangolari." },
        { q: "Quanti ospiti posso aggiungere?", a: "Nessun limite. Aggiungi tutti gli ospiti e i tavoli di cui hai bisogno. L'importazione CSV supporta fino a 500 ospiti per batch." },
        { q: "Cosa fare se ho bisogno di aiuto?", a: "Tutto \u00e8 spiegato sulla pagina. Se sei bloccato, prova a trascinare un ospite \u2014 \u00e8 tutto ci\u00f2 che ti serve per iniziare." },
      ],
      footerTagline: "Il tuo matrimonio, perfettamente organizzato.",
    },
  },
  zh: {
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
      seatByGroupHint: "优先将同组宾客安排在同一桌，大组优先。剩余宾客分配到有空位的餐桌。",
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
    fields: {
      dietary: "饮食偏好",
      dietaryRestrictions: "饮食偏好",
      group: "分组",
      name: "姓名",
      searchGuests: "搜索宾客",
      totalSeats: "座位数",
      type: "类型",
    },
    language: {
      current: "中文",
      next: "Italiano",
    },
    modals: {
      editGuest: "编辑宾客信息",
      guestDetails: "宾客详情",
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
    viewer: {
      createYourOwn: "创建你自己的宴席",
      seatingChart: "座次表",
      searchPlaceholder: "搜索你的名字…",
      notFound: "未找到宴席",
      notFoundDescription: "分享链接可能已过期，请联系宴席主人获取新链接。",
      invalidLink: "无效链接",
      loading: "正在加载\u2026",
    },
    landing: {
      heroEyebrow: "免费 \u00b7 无需注册 \u00b7 多语言",
      heroTitle: "婚礼排座",
      heroTagline: "筹备婚礼最头疼的不是选场地，是排座位。拖拽几下，五分钟搞定。",
      startFree: "免费开始",
      goToApp: "进入工作台",
      galleryLabel: "预览",
      galleryTitle: "每一场婚礼，都值得精心安排",
      galleryLede: "从十人圆桌到长条宴会桌，每种布局都从容应对。",
      galleryAlt: "婚礼宴会桌席布置",
      featuresLabel: "功能",
      featuresTitle: "功能一览",
      features: [
        { name: "拖拽排座", desc: "把宾客直接拖到座位上。点击即可交换、重排、清空，告别 Excel。" },
        { name: "CSV 批量导入", desc: "粘贴或上传宾客名单，自动识别姓名、分组、饮食偏好列。" },
        { name: "饮食偏好标签", desc: "自动识别素食、纯素、无麸质、坚果过敏、清真、犹太洁食等饮食限制。" },
        { name: "一键分享协作", desc: "生成分享链接，家人和婚庆团队即时查看座位图，无需注册。" },
        { name: "多语言支持", desc: "中文、英文、意大利语。你的宾客用自己的语言查看座位图。" },
        { name: "混合桌形", desc: "同一方案中可同时使用圆桌和长桌，每边座位数可自定义。" },
      ],
      stepsTitle: "使用流程",
      stepsLabel: "使用流程",
      steps: [
        { title: "创建宴席", desc: "给你的宴席取个名字。我们默认创建一张餐桌，让你可以立刻开始。" },
        { title: "添加宾客", desc: "逐一手动输入，或粘贴 CSV 一次性导入。饮食偏好自动识别。" },
        { title: "拖拽入座", desc: "把每位宾客拖到座位上。使用\"按组落座\"一键安排同组宾客。" },
        { title: "分享链接", desc: "一键生成只读分享链接，宾客和策划团队无需注册即可查看。" },
      ],
      pricingLabel: "价格",
      pricingTitle: "价格",
      pricingFree: "免费",
      pricingVs: "专业婚庆策划公司仅座位排布就收费 <s>\u00a5500-2000</s>。用这个工具，几分钟搞定，<span class=\"hl\">完全免费</span>。",
      pricingTerms: "完全免费。接收分享链接无需注册。无隐藏费用。不限制宾客数量、餐桌数量和方案数量。",
      faqLabel: "常见问题",
      faqTitle: "常见问题",
      faq: [
        { q: "宾客查看座位图需要注册吗？", a: "不需要。分享链接后任何人可直接查看，无需注册。" },
        { q: "可以打印座位图吗？", a: "可以。在分享查看页面直接打印，排版已针对圆桌和长桌优化。" },
        { q: "可以添加多少宾客？", a: "无限制。按需添加宾客和餐桌。CSV 导入每次最多支持 500 条。" },
        { q: "不会用怎么办？", a: "页面上的提示会引导你。最简单的上手方式：试试拖拽一个宾客到座位上。" },
      ],
      footerTagline: "你的婚礼，完美入座。",
    },
  },
};

type I18nValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(resolveInitialLocale);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLocale);
    window.history.replaceState(null, "", url);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t: messages[locale] }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}

export function normalizeLocale(
  value: string | null | undefined,
): Locale | null {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return null;
  if (normalized === "it" || normalized.startsWith("it-")) return "it";
  if (normalized === "zh" || normalized.startsWith("zh-")) return "zh";
  if (normalized === "en" || normalized.startsWith("en-")) return "en";
  return null;
}

function resolveInitialLocale(): Locale {
  if (typeof window === "undefined") return "zh";

  const params = new URLSearchParams(window.location.search);
  const explicitLocale = normalizeLocale(
    params.get("lang") ?? params.get("locale"),
  );
  return explicitLocale ?? "zh";
}
