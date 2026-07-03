import type { Messages } from "../types";

export const it: Messages = {
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
    seatByGroupHint:
      "Assegna ogni gruppo allo stesso tavolo se possibile, dal più grande. I restanti riempiono i posti disponibili.",
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
    hidePassword: "Nascondi password",
    showPassword: "Mostra password",
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
    authFailed: "Autenticazione fallita",
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
    removeTableDescription:
      "Il tavolo e le assegnazioni saranno rimossi.",
  },
  csvPlaceholder:
    "nome,gruppo,dieta\nAlice Rossi,Famiglia,Vegetariano",
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
    noGuestsYet:
      "Aggiungi ospiti nella barra laterale, poi trascinali sui posti.",
  },
  error: {
    somethingWentWrong: "Qualcosa è andato storto",
    tryAgain: "Riprova",
  },
  export: {
    seatingPlan: "Piano di seduta",
    fillGuestNames: "Compilare lo schema con i nomi degli ospiti",
    guestList: "Lista ospiti",
    guestHeader: "Ospite",
    tableHeader: "Tavolo",
    seatHeader: "Posto",
    dietaryHeader: "Restrizioni alimentari",
    guestPlaceholder: (n) => `ospite n.${n}`,
    note1: "* considerare 20/22 ospiti per tavolo",
    note2: "* decidere dove siederanno gli sposi",
    note3: "* compilare tutti i nomi degli ospiti al posto di ospite n.x",
    weddingSeatingPlan: "Piano di seduta matrimonio",
  },
  fields: {
    dietary: "Dieta",
    dietaryRestrictions: "Restrizioni alimentari",
    group: "Gruppo",
    name: "Nome",
    searchGuests: "Cerca ospiti",
    totalSeats: "Posti totali",
    type: "Tipo",
    ungrouped: "Non raggruppati",
    dietaryNote: "Nota dietetica",
  },
  language: {
    current: "IT",
    en: "English",
    it: "Italiano",
    zh: "简体中文",
    zhTW: "繁體中文",
  },
  modals: {
    editGuest: "Modifica ospite",
    guestDetails: "Dettagli ospite",
    editGuestDescription:
      "Modifica il nome, il gruppo e le restrizioni alimentari dell'ospite selezionato.",
    seatAssignmentDescription:
      "Scegli un ospite da assegnare a questo posto, modifica l'ospite assegnato o libera il posto.",
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
  ui: {
    close: "Chiudi",
    sidebar: "Barra laterale",
    sidebarDescription: "Mostra la barra laterale mobile.",
    toggleSidebar: "Attiva/disattiva barra laterale",
  },
  viewer: {
    createYourOwn: "Crea il tuo banchetto",
    seatingChart: "Disposizione Tavoli",
    searchPlaceholder: "Cerca il tuo nome\u2026",
    notFound: "Banchetto non trovato",
    notFoundDescription:
      "Questo link potrebbe essere scaduto. Chiedi un nuovo link all'organizzatore.",
    invalidLink: "Link non valido",
    loading: "Caricamento\u2026",
  },
  landing: {
    heroEyebrow: "Gratuito \u00b7 Nessuna registrazione \u00b7 Multilingue",
    heroTitle: "Wedding Table",
    heroTagline:
      "La parte più difficile del matrimonio non è la location \u2014 è la disposizione dei tavoli. Trascina, rilascia, fatto in cinque minuti.",
    startFree: "Inizia Gratis",
    goToApp: "Vai alla Dashboard",
    galleryLabel: "Galleria",
    galleryTitle: "Matrimoni Bellissimi, Perfettamente Organizzati",
    galleryLede:
      "Dai tavoli rotondi alle lunghe file da banchetto, ogni disposizione trova il suo posto.",
    galleryAlt: "Allestimento tavoli per matrimonio",
    featuresLabel: "Caratteristiche",
    featuresTitle: "Tutto Ciò di Cui Hai Bisogno",
    features: [
      {
        name: "Disposizione Drag & Drop",
        desc: "Trascina gli ospiti direttamente sui posti. Scambia, riordina, cancella con un clic. Niente fogli di calcolo.",
      },
      {
        name: "Importazione CSV",
        desc: "Incolla o carica la tua lista degli invitati. Rileva automaticamente nome, gruppo e colonne dietetiche.",
      },
      {
        name: "Rilevamento Diete",
        desc: "Identifica automaticamente vegetariano, vegano, senza glutine, allergia alle noci, halal, kosher e altro.",
      },
      {
        name: "Condivisione Link",
        desc: "Genera un link di condivisione con un clic. Familiari e wedding planner vedono la disposizione istantaneamente \u2014 senza account.",
      },
      {
        name: "Supporto Multilingue",
        desc: "Cinese semplificato, cinese tradizionale, inglese e italiano. I tuoi ospiti vedono la disposizione nella propria lingua.",
      },
      {
        name: "Tavoli Misti",
        desc: "Tavoli rotondi e rettangolari nello stesso piano. Personalizza i posti per lato.",
      },
    ],
    stepsTitle: "Come Funziona",
    stepsLabel: "Come Funziona",
    steps: [
      {
        title: "Crea un Banchetto",
        desc: "Dai un nome al tuo evento. Prepariamo un tavolo predefinito per iniziare subito.",
      },
      {
        title: "Aggiungi Ospiti",
        desc: "Digita i nomi uno per uno o incolla un CSV. Le preferenze alimentari vengono rilevate automaticamente.",
      },
      {
        title: "Assegna i Posti",
        desc: "Trascina ogni ospite su un posto. Usa 'Assegna per Gruppo' per posizionare i gruppi insieme.",
      },
      {
        title: "Condividi il Link",
        desc: "Un clic genera un link di visualizzazione condiviso. Nessun account richiesto per ospiti o organizzatori.",
      },
    ],
    pricingLabel: "Prezzi",
    pricingTitle: "Prezzi",
    pricingFree: "Gratuito",
    pricingVs:
      "I wedding planner professionisti chiedono <s>\u20ac500-2.000</s> solo per la disposizione dei tavoli. Questo strumento lo fa in pochi minuti, <span class=\"hl\">a costo zero</span>.",
    pricingTerms:
      "Completamente gratuito. Nessuna registrazione richiesta per ricevere un link condiviso. Nessun costo nascosto. Nessun limite di ospiti, tavoli o piani.",
    faqLabel: "Domande Frequenti",
    faqTitle: "Domande Frequenti",
    faq: [
      {
        q: "Gli ospiti devono creare un account per vedere la disposizione?",
        a: "No. Quando condividi il link, chiunque può visualizzarlo \u2014 senza registrazione.",
      },
      {
        q: "Posso stampare la disposizione dei tavoli?",
        a: "Sì. Puoi stampare direttamente dalla pagina di visualizzazione condivisa. Il layout è ottimizzato per la stampa di tavoli rotondi e rettangolari.",
      },
      {
        q: "Quanti ospiti posso aggiungere?",
        a: "Nessun limite. Aggiungi tutti gli ospiti e i tavoli di cui hai bisogno. L'importazione CSV supporta fino a 500 ospiti per batch.",
      },
      {
        q: "Cosa fare se ho bisogno di aiuto?",
        a: "Tutto è spiegato sulla pagina. Se sei bloccato, prova a trascinare un ospite \u2014 è tutto ciò che ti serve per iniziare.",
      },
    ],
    footerTagline: "Il tuo matrimonio, perfettamente organizzato.",
  },
};
