import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

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
  counts: {
    seatedGuests: (seated: number, total: number) => string;
    seats: (count: number) => string;
  };
  csvPlaceholder: string;
  defaults: {
    copySuffix: string;
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
};

const messages: Record<Locale, Messages> = {
  en: {
    actions: {
      addGuest: "Add Guest",
      addTable: "Add Table",
      cancel: "Cancel",
      chooseCsv: "Choose CSV",
      clearSeat: "Clear Seat",
      copyLink: "Copy link",
      copied: "Copied",
      edit: "Edit",
      importGuests: "Import Guests",
      saveChanges: "Save Changes",
      seatByGroup: "Seat by Group",
      unseatTable: "Unseat Table",
    },
    aria: {
      duplicateTable: (name) => `Duplicate ${name}`,
      editGuest: (name) => `Edit ${name}`,
      language: "Switch language",
      nameForTable: (name) => `Name for ${name}`,
      planStatus: "Plan status",
      removeGuest: (name) => `Remove ${name}`,
      removeTable: (name) => `Remove ${name}`,
      shareLink: "Share link",
      sharePlan: "Share this plan",
    },
    counts: {
      seatedGuests: (seated, total) => `${seated}/${total} seated`,
      seats: (count) => `${count} ${count === 1 ? "seat" : "seats"}`,
    },
    csvPlaceholder: "name,group,dietary\nAlice Smith,Family,Vegetarian",
    defaults: {
      copySuffix: "Copy",
      table: "Table",
      topTable: "Top Table",
    },
    empty: {
      allGuestsSeated: "All guests have seats.",
      noGuestsFound: "No guests found.",
    },
    fields: {
      dietary: "Dietary",
      dietaryRestrictions: "Dietary restrictions",
      group: "Group",
      name: "Name",
      searchGuests: "Search guests",
      totalSeats: "Total seats",
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
      guests: "Guests",
      tables: "Tables",
      unseated: "Unseated",
    },
    stats: {
      guests: "Guests",
      open: "Open",
      seats: "Seats",
      tables: "Tables",
    },
    statuses: {
      unseated: "Unseated",
    },
    tableShapes: {
      rectangular: "Rectangular",
      round: "Round",
    },
    templates: {
      createGuest: (name) => `Create "${name}"`,
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
      saveChanges: "Salva modifiche",
      seatByGroup: "Assegna per gruppo",
      unseatTable: "Libera tavolo",
    },
    aria: {
      duplicateTable: (name) => `Duplica ${name}`,
      editGuest: (name) => `Modifica ${name}`,
      language: "Cambia lingua",
      nameForTable: (name) => `Nome per ${name}`,
      planStatus: "Stato del piano",
      removeGuest: (name) => `Rimuovi ${name}`,
      removeTable: (name) => `Rimuovi ${name}`,
      shareLink: "Link di condivisione",
      sharePlan: "Condividi questo piano",
    },
    counts: {
      seatedGuests: (seated, total) => `${seated}/${total} assegnati`,
      seats: (count) => `${count} ${count === 1 ? "posto" : "posti"}`,
    },
    csvPlaceholder: "nome,gruppo,dieta\nAlice Rossi,Famiglia,Vegetariano",
    defaults: {
      copySuffix: "Copia",
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
      bottom: "Basso",
      left: "Sinistra",
      right: "Destra",
      seat: "Posto",
      top: "Alto",
    },
    sections: {
      guests: "Ospiti",
      tables: "Tavoli",
      unseated: "Da assegnare",
    },
    stats: {
      guests: "Ospiti",
      open: "Liberi",
      seats: "Posti",
      tables: "Tavoli",
    },
    statuses: {
      unseated: "Da assegnare",
    },
    tableShapes: {
      rectangular: "Rettangolare",
      round: "Rotondo",
    },
    templates: {
      createGuest: (name) => `Crea "${name}"`,
    },
  },
  zh: {
    actions: {
      addGuest: "添加宾客",
      addTable: "添加桌位",
      cancel: "取消",
      chooseCsv: "选择CSV",
      clearSeat: "清空座位",
      copyLink: "复制链接",
      copied: "已复制",
      edit: "编辑",
      importGuests: "导入宾客",
      saveChanges: "保存更改",
      seatByGroup: "按组分配",
      unseatTable: "清空桌位",
    },
    aria: {
      duplicateTable: (name) => `复制 ${name}`,
      editGuest: (name) => `编辑 ${name}`,
      language: "切换语言",
      nameForTable: (name) => `${name} 的名称`,
      planStatus: "方案状态",
      removeGuest: (name) => `移除 ${name}`,
      removeTable: (name) => `移除 ${name}`,
      shareLink: "分享链接",
      sharePlan: "分享此方案",
    },
    counts: {
      seatedGuests: (seated, total) => `${seated}/${total} 已入座`,
      seats: (count) => `${count} 个座位`,
    },
    csvPlaceholder: "姓名,组别,饮食\n张三,家人,素食",
    defaults: {
      copySuffix: "副本",
      table: "桌",
      topTable: "主桌",
    },
    empty: {
      allGuestsSeated: "所有宾客已入座。",
      noGuestsFound: "未找到宾客。",
    },
    fields: {
      dietary: "饮食",
      dietaryRestrictions: "饮食限制",
      group: "组别",
      name: "姓名",
      searchGuests: "搜索宾客",
      totalSeats: "座位总数",
      type: "类型",
    },
    language: {
      current: "中文",
      next: "Italiano",
    },
    modals: {
      editGuest: "编辑宾客",
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
      guests: "宾客",
      tables: "桌位",
      unseated: "待入座",
    },
    stats: {
      guests: "宾客",
      open: "空闲",
      seats: "座位",
      tables: "桌位",
    },
    statuses: {
      unseated: "待入座",
    },
    tableShapes: {
      rectangular: "矩形",
      round: "圆形",
    },
    templates: {
      createGuest: (name) => `创建"${name}"`,
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

  const value = useMemo(() => ({ locale, setLocale, t: messages[locale] }), [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}

export function normalizeLocale(value: string | null | undefined): Locale | null {
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
  const explicitLocale = normalizeLocale(params.get("lang") ?? params.get("locale"));
  return explicitLocale ?? "zh";
}
