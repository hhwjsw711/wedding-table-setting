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
    importGuests: string;
    saveChanges: string;
    seatByGroup: string;
    unseatTable: string;
    share: string;
    back: string;
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
    removeGuest: (name: string) => string;
    removeTable: (name: string) => string;
    shareLink: string;
    sharePlan: string;
  };
  auth: {
    loginTitle: string;
    signupTitle: string;
    email: string;
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
    notFound: string;
    notFoundDescription: string;
    invalidLink: string;
    loading: string;
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
      importGuests: "Import Guests",
      saveChanges: "Save",
      seatByGroup: "Seat by Group",
      unseatTable: "Clear Table",
      share: "Share",
      back: "Back",
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
      removeGuest: (name) => `Remove "${name}"`,
      removeTable: (name) => `Remove "${name}"`,
      shareLink: "Share link",
      sharePlan: "Share this banquet",
    },
    auth: {
      loginTitle: "Log in",
      signupTitle: "Sign up",
      email: "Email",
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
      searchPlaceholder: "Search your name\u2026",
      notFound: "Banquet not found",
      notFoundDescription:
        "This link may have expired. Ask the host for a new one.",
      invalidLink: "Invalid link",
      loading: "Loading\u2026",
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
      importGuests: "Importa ospiti",
      saveChanges: "Salva",
      seatByGroup: "Assegna per gruppo",
      unseatTable: "Libera tavolo",
      share: "Condividi",
      back: "Indietro",
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
      removeGuest: (name) => `Rimuovi "${name}"`,
      removeTable: (name) => `Rimuovi "${name}"`,
      shareLink: "Link di condivisione",
      sharePlan: "Condividi questo banchetto",
    },
    auth: {
      loginTitle: "Accedi",
      signupTitle: "Registrati",
      email: "Email",
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
      searchPlaceholder: "Cerca il tuo nome\u2026",
      notFound: "Banchetto non trovato",
      notFoundDescription: "Questo link potrebbe essere scaduto. Chiedi un nuovo link all'organizzatore.",
      invalidLink: "Link non valido",
      loading: "Caricamento\u2026",
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
      importGuests: "导入宾客",
      saveChanges: "保存",
      seatByGroup: "按组入座",
      unseatTable: "清空餐桌",
      share: "分享",
      back: "返回",
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
      removeGuest: (name) => `移除「${name}」`,
      removeTable: (name) => `移除「${name}」`,
      shareLink: "分享链接",
      sharePlan: "分享宴席",
    },
    auth: {
      loginTitle: "登录",
      signupTitle: "注册",
      email: "邮箱",
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
      searchPlaceholder: "搜索你的名字…",
      notFound: "未找到宴席",
      notFoundDescription: "分享链接可能已过期，请联系宴席主人获取新链接。",
      invalidLink: "无效链接",
      loading: "正在加载…",
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
