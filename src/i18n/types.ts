export type Locale = "en" | "it" | "zh" | "zh-TW";

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
    hidePassword: string;
    showPassword: string;
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
    authFailed: string;
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
  error: {
    somethingWentWrong: string;
    tryAgain: string;
  };
  export: {
    seatingPlan: string;
    fillGuestNames: string;
    guestList: string;
    guestHeader: string;
    tableHeader: string;
    seatHeader: string;
    dietaryHeader: string;
    guestPlaceholder: (n: number) => string;
    note1: string;
    note2: string;
    note3: string;
    weddingSeatingPlan: string;
  };
  fields: {
    dietary: string;
    dietaryRestrictions: string;
    group: string;
    name: string;
    searchGuests: string;
    totalSeats: string;
    type: string;
    ungrouped: string;
    dietaryNote: string;
  };
  language: {
    current: string;
    en: string;
    it: string;
    zh: string;
    zhTW: string;
  };
  modals: {
    editGuest: string;
    guestDetails: string;
    editGuestDescription: string;
    seatAssignmentDescription: string;
  };
  partners: {
    advertiseContact: string;
    advertiseDescription: string;
    advertisePricing: string;
    advertiseStats: { label: string; value: string }[];
    advertiseTitle: string;
    bannerTitle: string;
    bottomCta: string;
    bottomCtaLink: string;
    descriptions: Record<string, { name: string; desc: string }>;
    sectionTitle: string;
    visitWebsite: string;
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
  demo?: {
    bannerTitle: string;
    bannerDesc: string;
    planName: string;
    registerSave: string;
    saveToCloud: string;
    migrating: string;
    migrated: string;
  };
  ui: {
    close: string;
    sidebar: string;
    sidebarDescription: string;
    toggleSidebar: string;
  };
  viewer: {
    brandFooter: string;
    createYourOwn: string;
    invalidLink: string;
    loading: string;
    notFound: string;
    notFoundDescription: string;
    printFooter: string;
    searchPlaceholder: string;
    seatingChart: string;
  };
  landing: {
    heroEyebrow: string;
    heroTitle: string;
    heroTagline: string;
    startFree: string;
    tryNow: string;
    goToApp: string;
    galleryLabel: string;
    galleryTitle: string;
    galleryLede: string;
    galleryAlt: string;

    advantagesLabel: string;
    advantagesTitle: string;
    advantages: { icon: string; title: string; desc: string }[];

    featuresLabel: string;
    featuresTitle: string;
    featuresLede: string;
    features: { name: string; desc: string }[];

    stepsTitle: string;
    stepsLabel: string;
    stepsLede: string;
    steps: { title: string; desc: string }[];

    guideLabel: string;
    guideTitle: string;
    guideSections: { title: string; body: string }[];

    testimonialsLabel: string;
    testimonialsTitle: string;
    testimonials: { quote: string; author: string; location: string }[];

    pricingLabel: string;
    pricingTitle: string;
    pricingFree: string;
    pricingVs: string;
    pricingTerms: string;

    faqLabel: string;
    faqTitle: string;
    faq: { q: string; a: string }[];

    bottomCtaTitle: string;
    bottomCtaDesc: string;
    footerTagline: string;
  };
};
