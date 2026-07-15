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
  demo: {
    bannerTitle: "Demo Mode",
    bannerDesc: "Data is stored locally in your browser. Register to save to the cloud.",
    planName: "My Wedding",
    registerSave: "Register & Save",
    saveToCloud: "Save to Cloud",
    migrating: "Saving…",
    migrated: "Saved, redirecting…",
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
    heroEyebrow: "Free · No Registration · Multi-language",
    heroTitle: "Wedding Seating, Made Simple",
    heroTagline:
      "The all-in-one online wedding seating tool. Drag-and-drop seating, smart grouping, one-click sharing — sort your entire seating chart in five minutes. Say goodbye to paper drafts and spreadsheets.",
    startFree: "Start Free",
    tryNow: "Try Now — No Registration",
    goToApp: "Go to Dashboard",
    galleryLabel: "Gallery",
    galleryTitle: "Every Wedding Deserves Thoughtful Seating",
    galleryLede:
      "From intimate round tables to long banquet rows, from small gatherings to hundred-guest celebrations — every layout handled with ease.",
    galleryAlt: "Wedding banquet table setting",

    advantagesLabel: "Why Choose Us",
    advantagesTitle: "The hardest part of wedding planning isn't the venue — it's the seating",
    advantages: [
      {
        icon: "drag",
        title: "Drag & Drop Seating in Five Minutes",
        desc: "Drag guests directly onto seats. Swap, reorder, and clear with a click. Say goodbye to spreadsheets and paper drafts — the intuitive interface makes seating a breeze.",
      },
      {
        icon: "share",
        title: "One-Click Sharing & Team Collaboration",
        desc: "Generate a share link so family, planners, and catering teams view the seating chart instantly — no account needed. Everything syncs in real time, so no one's left out of the loop.",
      },
      {
        icon: "free",
        title: "Completely Free, No Limits",
        desc: "No limits on guests, tables, or plans. Experience core features without registration. Professional wedding planners charge $500–2,000 just for seating — we do it completely free.",
      },
    ],

    featuresLabel: "Features",
    featuresTitle: "Everything You Need to Simplify Your Seating",
    featuresLede:
      "Whether you're planning solo or working with a wedding planner, these tools save you time and reduce stress.",
    features: [
      {
        name: "Drag & Drop Seating",
        desc: "Drag guests directly onto seats. Swap, reorder, and clear with a click — say goodbye to spreadsheets.",
      },
      {
        name: "Smart Group Seating",
        desc: "One click places same-group guests at the same table, largest groups first. Gender-based alternation for balanced seating.",
      },
      {
        name: "CSV Batch Import",
        desc: "Paste or upload your guest list. Auto-detects name, group, and dietary columns. Supports 500 entries per batch.",
      },
      {
        name: "Dietary Badge Detection",
        desc: "Automatically identifies vegetarian, vegan, gluten-free, nut allergy, halal, kosher, and more — 8 dietary restrictions in total.",
      },
      {
        name: "Share & Collaborate",
        desc: "Generate a read-only share link. Family and wedding teams view the seating chart instantly. Guests can search for their own seat.",
      },
      {
        name: "Professional Excel Export",
        desc: "Export a professional Excel workbook with both the seating chart and guest list — ready to hand to the catering team.",
      },
      {
        name: "Mixed Table Shapes",
        desc: "Use round and rectangular tables in the same plan. Customize seats per side to fit any venue.",
      },
      {
        name: "Print-Optimized Output",
        desc: "Print directly from the shared view page — layouts are optimized for round and rectangular tables. Export CSV for follow-up.",
      },
      {
        name: "Multi-language Support",
        desc: "Simplified Chinese, Traditional Chinese, English, and Italian. Your guests view the seating chart in their own language.",
      },
    ],
    stepsTitle: "Your Seating Chart in Three Steps",
    stepsLabel: "How It Works",
    stepsLede:
      "From creating your plan to sharing with guests, the whole process takes under five minutes. No expertise needed — just open and go.",
    steps: [
      {
        title: "Add Guests",
        desc: "Type names one by one, or paste a CSV to import 500 at once. Dietary preferences are auto-detected, and guests can be grouped.",
      },
      {
        title: "Drag to Seat",
        desc: "Drag each guest onto a seat, or use 'Seat By Group' to auto-place groups together. Swap between seats and clear whole tables anytime.",
      },
      {
        title: "Share & Export",
        desc: "One click generates a read-only share link for guests, or export an Excel file for the catering team. Print layout is auto-optimized.",
      },
    ],
    guideLabel: "Seating Guide",
    guideTitle: "Practical Tips for Wedding Seating",
    guideSections: [
      {
        title: "Start with the Head Table",
        body: "The newlyweds, both sets of parents, and close family are usually seated at the head table. If parents are divorced, you may need two head tables so each side sits separately and avoids awkwardness. Grandparents, siblings not serving as bridesmaids or groomsmen, the officiant, and their spouses are typically seated near the head table.",
      },
      {
        title: "Consider Guest Affinities",
        body: "When assigning seats, consider guests' professions, hobbies, and age groups. Thoughtful pairing often leads to lively conversations throughout the evening and naturally prevents awkward silences. Use a color-coding system to distinguish different guest types for more intuitive matchmaking.",
      },
      {
        title: "Choose the Right Table Shape",
        body: "Round tables make it easier for everyone to converse and are very popular. Rectangular tables, being longer, tend to form two separate sides, but are very practical for larger guest counts as they accommodate more people per table. A U-shaped layout is also worth considering for smaller, more intimate weddings.",
      },
      {
        title: "Plan Ahead, Leave Room to Spare",
        body: "Many couples start building their seating chart about three weeks before the wedding, when most RSVPs are in. Last-minute respondents can be easily dragged into a suitable spot. We recommend leaving 1–2 empty seats per group to accommodate unexpected changes.",
      },
    ],
    testimonialsLabel: "Testimonials",
    testimonialsTitle: "What Our Users Say",
    testimonials: [
      {
        quote:
          "This is the best wedding seating tool I've ever used! The drag-and-drop is so intuitive — I sorted 150 guests in five minutes. I'd spent a whole day wrestling with Excel and still couldn't finish.",
        author: "Xiaomei",
        location: "Shanghai",
      },
      {
        quote:
          "As a wedding planner, I manage multiple weddings' seating at the same time. The sharing feature is incredibly practical — clients and catering teams can all see the latest version in real time. No more emailing spreadsheets back and forth.",
        author: "Lisa Chen",
        location: "Beijing",
      },
      {
        quote:
          "Completely free with zero limits — that's incredibly generous. The dietary badge auto-detection was a lifesaver; we had several vegetarians and guests with allergies at our reception.",
        author: "Mr. Wang",
        location: "Hangzhou",
      },
      {
        quote:
          "Guests just search their name and see their table number. Entry on the wedding day went so smoothly with no bottlenecks. This feature works better than many paid tools.",
        author: "Anna & David",
        location: "Shenzhen",
      },
    ],
    pricingLabel: "Pricing",
    pricingTitle: "Pricing",
    pricingFree: "Free",
    pricingVs:
      "Professional wedding planners charge <s>$500–2,000</s> just for the seating chart. This tool does it in minutes, <span class=\"hl\">completely free</span>.",
    pricingTerms:
      "Completely free. Try instantly without registration. No account needed to receive or view shared links. No hidden fees. No limits on guests, tables, or plans.",
    faqLabel: "FAQ",
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "Do I need to register to use it?",
        a: "No. Click 'Try Now' to start seating immediately — no registration required. Your data is saved locally in your browser. Register an account to sync to the cloud and use across devices.",
      },
      {
        q: "Do guests need an account to view the seating chart?",
        a: "No. When you share the link, anyone can view it instantly — no registration needed. Guests just search their name to find their seat.",
      },
      {
        q: "Can I print the seating chart?",
        a: "Yes. Print directly from the shared view page — layouts are optimized for round and rectangular tables. You can also export CSV or Excel for follow-up or to hand to the catering team.",
      },
      {
        q: "How many guests can I add?",
        a: "No limit. Add as many guests and tables as you need. CSV import supports up to 500 entries per batch, and you can import in multiple batches.",
      },
      {
        q: "What table shapes are supported?",
        a: "Round tables (1–24 seats in a circular layout) and rectangular tables (0–20 seats per side, customizable). You can mix round and rectangular tables in the same plan to fit any venue layout.",
      },
      {
        q: "Can multiple people collaborate on seating?",
        a: "Yes. Plans created with a registered account support real-time sync across devices. Share links provide read-only access so family and planning teams can always see the latest seating arrangement.",
      },
      {
        q: "Is my data safe?",
        a: "All data is transmitted and stored encrypted in the cloud. Share links are read-only and never expose your account information. Demo mode data is stored only in your local browser.",
      },
      {
        q: "What if I don't know how to use it?",
        a: "The on-page tips will guide you. The easiest way to start: try dragging a guest onto a seat. The whole process takes under five minutes.",
      },
    ],
    bottomCtaTitle: "Ready to Start Seating?",
    bottomCtaDesc: "Try it now — no registration needed. Sort your entire seating chart in five minutes.",
    footerTagline: "Your wedding, perfectly seated.",
  },
};
