import type { Messages } from "../types";

export const en: Messages = {
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
    seatByGroupHint:
      "Places each group at the same table when possible, largest groups first. Remaining guests fill available seats.",
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
    hidePassword: "Hide password",
    showPassword: "Show password",
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
    authFailed: "Authentication failed",
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
    removeTableDescription:
      "This table and its seat assignments will be removed.",
  },
  csvPlaceholder:
    "name,group,dietary\nAlice Smith,Bride's family,Vegetarian",
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
  error: {
    somethingWentWrong: "Something went wrong",
    tryAgain: "Try again",
  },
  export: {
    seatingPlan: "Seating Plan",
    fillGuestNames: "Please fill the scheme with the names of the Guests",
    guestList: "Guest List",
    guestHeader: "Guest",
    tableHeader: "Table",
    seatHeader: "Seat",
    dietaryHeader: "Dietary restrictions",
    guestPlaceholder: (n) => `guest n.${n}`,
    note1: "* consider 20/22 guests per table",
    note2: "* decide where the newlyweds will sit",
    note3: "* fill in all guest names in place of guest n.x",
    weddingSeatingPlan: "Wedding seating plan",
  },
  fields: {
    dietary: "Dietary",
    dietaryRestrictions: "Dietary preferences",
    group: "Group",
    name: "Name",
    searchGuests: "Search guests",
    totalSeats: "Seats",
    type: "Type",
    ungrouped: "Ungrouped",
    dietaryNote: "Dietary note",
  },
  language: {
    current: "EN",
    en: "English",
    it: "Italiano",
    zh: "简体中文",
    zhTW: "繁體中文",
  },
  modals: {
    editGuest: "Edit guest",
    guestDetails: "Guest details",
    editGuestDescription:
      "Edit the selected guest name, group, and dietary restrictions.",
    seatAssignmentDescription:
      "Choose a guest to assign to this seat, edit the assigned guest, or clear the seat.",
  },
  partners: {
    advertiseContact: "hhwjsw711@gmail.com",
    advertiseDescription:
      "Reach thousands of engaged couples at the moment they're planning their wedding seating — one of the highest-intent decisions in the wedding journey. Banner placements, featured partner cards, and shared plan page exposure are available.",
    advertisePricing:
      "Contact us for package pricing and placement availability.",
    advertiseStats: [
      { label: "Monthly audience", value: "Thousands of couples & planners" },
      { label: "Languages", value: "Chinese · English · Italian" },
      { label: "Guest reach", value: "100+ per shared plan link" },
    ],
    advertiseTitle: "Advertise with us",
    bannerTitle: "Recommended for your wedding",
    bottomCta: "Planning a wedding? Find a professional planner",
    bottomCtaLink: "Explore partners",
    descriptions: {
      "villa-deste": {
        name: "Villa d'Este",
        desc: "A Renaissance patrician residence on the shores of Lake Como, surrounded by a 25-acre park. One of Italy's most celebrated wedding destinations since 1873.",
      },
      "bella-sposa": {
        name: "Bella Sposa Events",
        desc: "Full-service wedding planning and design studio. From intimate ceremonies to grand celebrations, every detail crafted with Italian elegance and precision.",
      },
      "luce-photography": {
        name: "Luce Photography",
        desc: "Editorial wedding photography with a cinematic touch. Specializing in destination weddings across Europe and Asia, capturing moments that tell your story.",
      },
    },
    sectionTitle: "Trusted partners for your big day",
    visitWebsite: "Visit website",
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
  ui: {
    close: "Close",
    sidebar: "Sidebar",
    sidebarDescription: "Displays the mobile sidebar.",
    toggleSidebar: "Toggle Sidebar",
  },
  viewer: {
    brandFooter: "Created with Wedding Table \u2014 weddingtable.cn",
    createYourOwn: "Create your own banquet",
    invalidLink: "Invalid link",
    loading: "Loading\u2026",
    notFound: "Banquet not found",
    notFoundDescription:
      "This link may have expired. Ask the host for a new one.",
    printFooter: "Wedding Table \u2014 weddingtable.cn",
    searchPlaceholder: "Search your name\u2026",
    seatingChart: "Seating Chart",
  },
  landing: {
    heroEyebrow: "Free \u00b7 No Registration \u00b7 Multi-language",
    heroTitle: "Wedding Table",
    heroTagline:
      "The hardest part of wedding planning isn't the venue \u2014 it's the seating chart. Drag, drop, done in five minutes.",
    startFree: "Start Free",
    goToApp: "Go to Dashboard",
    galleryLabel: "Gallery",
    galleryTitle: "Beautiful Weddings, Perfectly Seated",
    galleryLede:
      "From round tables to long banquet rows, every layout finds its place.",
    galleryAlt: "Wedding banquet table setting",
    featuresLabel: "Features",
    featuresTitle: "Everything You Need",
    features: [
      {
        name: "Drag & Drop Seating",
        desc: "Drag guests directly onto seats. Swap, reorder, clear with a click. No spreadsheets needed.",
      },
      {
        name: "CSV Batch Import",
        desc: "Paste or upload your guest list. Auto-detects name, group, and dietary columns.",
      },
      {
        name: "Dietary Badge Detection",
        desc: "Automatically identifies vegetarian, vegan, gluten-free, nut allergy, halal, kosher, and more.",
      },
      {
        name: "Share & Collaborate",
        desc: "Generate a share link in one click. Family and planners view the seating chart instantly \u2014 no account needed.",
      },
      {
        name: "Multi-language Support",
        desc: "Simplified Chinese, Traditional Chinese, English, and Italian. Your guests see the chart in their own language.",
      },
      {
        name: "Mixed Table Shapes",
        desc: "Round tables and rectangular tables in the same plan. Customize seats per side.",
      },
    ],
    stepsTitle: "How It Works",
    stepsLabel: "How It Works",
    steps: [
      {
        title: "Create a Banquet",
        desc: "Name your event. We'll set up a default table so you can start immediately.",
      },
      {
        title: "Add Guests",
        desc: "Type names one by one, or paste a CSV. Dietary preferences are auto-detected.",
      },
      {
        title: "Drag to Seat",
        desc: "Drag each guest onto a seat. Use 'Seat By Group' to auto-place groups together.",
      },
      {
        title: "Share the Link",
        desc: "One click generates a shared view link. No account needed for guests or planners.",
      },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "Pricing",
    pricingFree: "Free",
    pricingVs:
      "Professional wedding planners charge <s>$500-2,000</s> just for the seating chart. This tool does it in minutes, <span class=\"hl\">completely free</span>.",
    pricingTerms:
      "Completely free. No registration required to receive a shared link. No hidden fees. No limits on guests, tables, or plans.",
    faqLabel: "FAQ",
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "Do guests need an account to view the seating chart?",
        a: "No. When you share the link, anyone can view it \u2014 no registration needed.",
      },
      {
        q: "Can I print the seating chart?",
        a: "Yes. You can print directly from the shared view page. The layout is optimized for printing round and rectangular tables.",
      },
      {
        q: "How many guests can I add?",
        a: "No limit. Add as many guests and tables as you need. CSV import supports up to 500 guests per batch.",
      },
      {
        q: "What if I need help?",
        a: "Everything is explained on the page. If you're stuck, just try dragging a guest \u2014 that's all you need to get started.",
      },
    ],
    footerTagline: "Your wedding, perfectly seated.",
  },
};
