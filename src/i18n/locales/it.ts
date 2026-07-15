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
  partners: {
    advertiseContact: "hhwjsw711@gmail.com",
    advertiseDescription:
      "Raggiungi migliaia di coppie nel momento in cui stanno pianificando la disposizione dei tavoli — una delle decisioni a più alta intenzione d'acquisto nel percorso del matrimonio. Banner in homepage, card partner in evidenza ed esposizione nella pagina di condivisione sono disponibili.",
    advertisePricing:
      "Contattaci per prezzi e disponibilità dei pacchetti.",
    advertiseStats: [
      { label: "Pubblico mensile", value: "Migliaia di coppie e planner" },
      { label: "Lingue", value: "Cinese · Inglese · Italiano" },
      { label: "Persone raggiunte", value: "100+ per piano condiviso" },
    ],
    advertiseTitle: "Pubblicità con noi",
    bannerTitle: "Consigliato per il tuo matrimonio",
    bottomCta: "Stai organizzando un matrimonio? Trova un wedding planner professionista",
    bottomCtaLink: "Esplora i partner",
    descriptions: {
      "villa-deste": {
        name: "Villa d'Este",
        desc: "Una residenza patrizia rinascimentale sulle rive del Lago di Como, circondata da un parco di 10 ettari. Una delle destinazioni per matrimoni più celebrate d'Italia dal 1873.",
      },
      "bella-sposa": {
        name: "Bella Sposa Events",
        desc: "Studio completo di wedding planning e design. Dalle cerimonie intime alle grandi celebrazioni, ogni dettaglio realizzato con eleganza e precisione italiana.",
      },
      "luce-photography": {
        name: "Luce Photography",
        desc: "Fotografia di matrimonio editoriale con un tocco cinematografico. Specializzati in matrimoni di destinazione in Europa e Asia, catturando momenti che raccontano la tua storia.",
      },
    },
    sectionTitle: "Partner di fiducia per il tuo grande giorno",
    visitWebsite: "Visita il sito",
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
  demo: {
    bannerTitle: "Modalità Demo",
    bannerDesc: "I dati sono salvati localmente nel browser. Registrati per salvarli nel cloud.",
    planName: "Il mio matrimonio",
    registerSave: "Registrati e salva",
    saveToCloud: "Salva nel cloud",
    migrating: "Salvataggio…",
    migrated: "Salvato, reindirizzamento…",
  },
  ui: {
    close: "Chiudi",
    sidebar: "Barra laterale",
    sidebarDescription: "Mostra la barra laterale mobile.",
    toggleSidebar: "Attiva/disattiva barra laterale",
  },
  viewer: {
    brandFooter: "Realizzato con Wedding Table \u2014 weddingtable.cn",
    createYourOwn: "Crea il tuo banchetto",
    invalidLink: "Link non valido",
    loading: "Caricamento\u2026",
    notFound: "Banchetto non trovato",
    notFoundDescription:
      "Questo link potrebbe essere scaduto. Chiedi un nuovo link all'organizzatore.",
    printFooter: "Wedding Table \u2014 weddingtable.cn",
    searchPlaceholder: "Cerca il tuo nome\u2026",
    seatingChart: "Disposizione Tavoli",
  },
  landing: {
    heroEyebrow: "Gratuito · Nessuna registrazione · Multilingue",
    heroTitle: "Wedding Table",
    heroTagline:
      "Lo strumento online per la disposizione dei tavoli del matrimonio. Trascina i posti, raggruppa intelligentemente, condividi con un clic — la disposizione completa in cinque minuti, addio ai fogli di calcolo e agli appunti cartacei.",
    startFree: "Inizia Gratis",
    tryNow: "Prova subito, senza registrazione",
    goToApp: "Vai alla Dashboard",
    galleryLabel: "Galleria",
    galleryTitle: "Ogni matrimonio merita un'organizzazione curata",
    galleryLede:
      "Dai tavoli rotondi da dieci persone alle lunghe file da banchetto, dalle piccole riunioni intime ai banchetti con cento invitati, ogni disposizione trova il suo posto.",
    galleryAlt: "Allestimento tavoli per matrimonio",

    advantagesLabel: "Perché sceglierci",
    advantagesTitle: "La parte più difficile del matrimonio non è la location, è la disposizione dei tavoli",
    advantages: [
      {
        icon: "drag",
        title: "Trascina i posti, fatto in cinque minuti",
        desc: "Trascina gli ospiti direttamente sui posti. Clic per scambiare, riordinare, svuotare. Addio a Excel e agli appunti cartacei, un'operazione intuitiva WYSIWYG che rende la disposizione un gioco da ragazzi.",
      },
      {
        icon: "share",
        title: "Condivisione con un clic, collaborazione di squadra",
        desc: "Genera un link di condivisione, familiari, wedding planner e team di catering visualizzano la disposizione in tempo reale, senza registrazione. Tutte le informazioni sincronizzate all'istante, niente più \"chi ha dimenticato di aggiornare\" o \"chi non l'ha visto\".",
      },
      {
        icon: "free",
        title: "Completamente gratuito, senza limiti",
        desc: "Nessun limite sul numero di ospiti, tavoli o piani. Prova le funzionalità di base senza registrazione. I wedding planner professionisti chiedono €500-2000 solo per la disposizione dei tavoli — noi lo facciamo completamente gratis.",
      },
    ],

    featuresLabel: "Funzionalità",
    featuresTitle: "Semplifica la disposizione dei tavoli con questi strumenti",
    featuresLede:
      "Che tu stia organizzando tutto da solo o con un wedding planner, questi strumenti ti faranno risparmiare tempo e ridurre lo stress.",
    features: [
      {
        name: "Disposizione con trascinamento",
        desc: "Trascina gli ospiti direttamente sui posti. Clic per scambiare, riordinare, svuotare — addio a Excel.",
      },
      {
        name: "Assegnazione intelligente per gruppo",
        desc: "Con un clic assegni gli ospiti dello stesso gruppo allo stesso tavolo, con priorità ai gruppi più grandi. Inferenza di nome e genere per alternare automaticamente uomini e donne.",
      },
      {
        name: "Importazione batch CSV",
        desc: "Incolla o carica la lista degli invitati, rileva automaticamente le colonne nome, gruppo e preferenze alimentari. Supporta importazioni batch fino a 500 voci.",
      },
      {
        name: "Etichette preferenze alimentari",
        desc: "Riconosce automaticamente 8 tipi di restrizioni alimentari: vegetariano, vegano, senza glutine, allergia alle noci, halal, kosher e altro.",
      },
      {
        name: "Condivisione e collaborazione con un clic",
        desc: "Genera un link di sola lettura, familiari e team wedding visualizzano la disposizione in tempo reale, gli ospiti possono cercare il proprio posto.",
      },
      {
        name: "Esportazione Excel professionale",
        desc: "Esporta con un clic un foglio Excel professionale con disposizione e lista ospiti, pronto per il team di catering.",
      },
      {
        name: "Supporto tavoli misti",
        desc: "Nello stesso piano puoi usare tavoli rotondi e rettangolari, con numero di posti per lato personalizzabile, per adattarti a qualsiasi sala.",
      },
      {
        name: "Output ottimizzato per la stampa",
        desc: "Stampa direttamente dalla pagina di visualizzazione condivisa, con layout ottimizzato per tavoli rotondi e rettangolari. Esporta in CSV per elaborazioni successive.",
      },
      {
        name: "Supporto multilingue",
        desc: "Cinese semplificato, cinese tradizionale, inglese e italiano. I tuoi ospiti vedono la disposizione nella propria lingua.",
      },
    ],
    stepsTitle: "La disposizione del tuo matrimonio in tre passi",
    stepsLabel: "Come Funziona",
    stepsLede:
      "Dalla creazione del piano alla condivisione con gli ospiti, il tutto in meno di cinque minuti. Nessuna competenza richiesta, basta aprire e iniziare.",
    steps: [
      {
        title: "Aggiungi ospiti",
        desc: "Inserisci i nomi uno per uno o incolla un CSV per importarne fino a 500 alla volta. Le preferenze alimentari vengono rilevate automaticamente e gli ospiti sono gestibili per gruppo.",
      },
      {
        title: "Trascina i posti",
        desc: "Trascina ogni ospite su un posto o usa \"Assegna per gruppo\" per disporre con un clic gli ospiti dello stesso gruppo. Supporta scambi tra posti e svuotamento dell'intero tavolo.",
      },
      {
        title: "Condividi ed esporta",
        desc: "Genera con un clic un link di sola lettura da inviare agli ospiti, o esporta un Excel per il team di catering. Il layout di stampa è già ottimizzato.",
      },
    ],
    guideLabel: "Guida alla disposizione",
    guideTitle: "Consigli pratici per la disposizione dei tavoli al matrimonio",
    guideSections: [
      {
        title: "Inizia dal tavolo principale",
        body: "Gli sposi, i genitori di entrambe le parti e i parenti più stretti sono di solito al tavolo principale. Se i genitori sono divorziati, potrebbe essere necessario predisporre due tavoli principali, in modo che ciascun genitore sieda separatamente e si evitino situazioni imbarazzanti. Nonni, fratelli e sorelle non scelti come testimoni, il celebrante e il coniuge sono di solito disposti vicino al tavolo principale.",
      },
      {
        title: "Considera le caratteristiche degli ospiti",
        body: "Quando assegni i posti, tieni conto della professione, degli interessi e dell'età degli invitati. Abbinando con cura gli ospiti, spesso si scopre che la serata avrà molti argomenti in comune all'interno del tavolo, riducendo naturalmente i silenzi imbarazzanti. Usa il sistema di etichette a colori per distinguere i diversi tipi di invitati e completare più facilmente gli abbinamenti per affinità.",
      },
      {
        title: "Scegli la forma del tavolo giusta",
        body: "I tavoli rotondi, a seconda delle dimensioni, facilitano la conversazione tra tutti i commensali e sono molto popolari. I tavoli rettangolari, essendo più lunghi, tendono naturalmente a creare due piccoli gruppi sui lati opposti, ma sono molto utili quando ci sono molti ospiti e permettono di farne sedere di più a un tavolo. Si può anche considerare una disposizione a U, adatta a matrimoni piccoli e raffinati.",
      },
      {
        title: "Pianifica in anticipo e lascia un margine",
        body: "Molti sposi iniziano a preparare la disposizione dei tavoli circa 3 settimane prima del matrimonio, quando hanno ricevuto quasi tutte le conferme RSVP. Gli ospiti che rispondono all'ultimo minuto possono essere facilmente trascinati nel posto giusto. Si consiglia di lasciare 1-2 posti vuoti per gruppo, per gestire eventuali cambiamenti dell'ultimo minuto.",
      },
    ],
    testimonialsLabel: "Recensioni",
    testimonialsTitle: "Feedback da utenti reali",
    testimonials: [
      {
        quote:
          "È lo strumento per la disposizione dei tavoli migliore che abbia mai usato! Il trascinamento è intuitivissimo, in cinque minuti ho sistemato 150 invitati. Prima con Excel ci avevo perso un'intera giornata senza finire.",
        author: "Giulia",
        location: "Milano",
      },
      {
        quote:
          "Come wedding planner, gestisco contemporaneamente la disposizione di più matrimoni. La funzione di condivisione è utilissima: clienti e team di catering vedono sempre l'ultima versione, niente più Excel mandati avanti e indietro.",
        author: "Lisa Chen",
        location: "Roma",
      },
      {
        quote:
          "Completamente gratuito e senza limiti, è davvero generoso. Il riconoscimento automatico delle preferenze alimentari è una salvezza, al nostro banchetto ci sono diversi vegetariani e persone con allergie.",
        author: "Marco R.",
        location: "Firenze",
      },
      {
        quote:
          "Gli ospiti cercano il proprio nome e vedono subito il numero del tavolo, l'ingresso il giorno del matrimonio è stato fluido, senza code. Questa funzionalità è meglio di molti strumenti a pagamento.",
        author: "Anna & David",
        location: "Shenzhen",
      },
    ],
    pricingLabel: "Prezzi",
    pricingTitle: "Prezzi",
    pricingFree: "Gratuito",
    pricingVs:
      "I wedding planner professionisti chiedono <s>€500-2000</s> solo per la disposizione dei tavoli. Questo strumento lo fa in pochi minuti, <span class=\"hl\">completamente gratis</span>.",
    pricingTerms:
      "Completamente gratuito. Prova subito senza registrazione. Non serve registrarsi per ricevere un link condiviso. Nessun costo nascosto. Nessun limite di ospiti, tavoli o piani.",
    faqLabel: "Domande Frequenti",
    faqTitle: "Domande Frequenti",
    faq: [
      {
        q: "Devo registrarmi per usarlo?",
        a: "No. Clicca \"Prova subito\" per iniziare a disporre i posti senza registrazione. I tuoi dati vengono salvati nel browser locale. Con un account puoi sincronizzarli nel cloud e usarli su più dispositivi.",
      },
      {
        q: "Gli ospiti devono registrarsi per vedere la disposizione?",
        a: "No. Quando condividi il link, chiunque può visualizzarlo senza registrazione. Gli ospiti cercano il proprio nome e trovano subito il posto.",
      },
      {
        q: "Posso stampare la disposizione dei tavoli?",
        a: "Sì. Puoi stampare direttamente dalla pagina di visualizzazione condivisa, con layout ottimizzato per tavoli rotondi e rettangolari. Puoi anche esportare in CSV o Excel per elaborazioni successive o per il team di catering.",
      },
      {
        q: "Quanti ospiti posso aggiungere?",
        a: "Nessun limite. Aggiungi tutti gli ospiti e i tavoli di cui hai bisogno. L'importazione CSV supporta fino a 500 voci per batch e puoi importare in più tornate.",
      },
      {
        q: "Quali tipi di tavolo sono supportati?",
        a: "Tavoli rotondi (disposizione ad anello da 1 a 24 posti) e tavoli rettangolari (posti per lato da 0 a 20 personalizzabili). Nello stesso piano puoi mescolare rotondi e rettangolari, per adattarti a qualsiasi layout di sala.",
      },
      {
        q: "Si può collaborare in più persone alla disposizione?",
        a: "Sì. I piani creati dopo la registrazione supportano la sincronizzazione in tempo reale, visibili su più dispositivi nell'ultima versione. I link di condivisione permettono la visualizzazione in sola lettura, così familiari e team wedding sono sempre aggiornati.",
      },
      {
        q: "I dati sono sicuri?",
        a: "Tutti i dati sono trasmessi e conservati nel cloud in forma crittografata. I link di condivisione sono in sola lettura e non espongono le informazioni del tuo account. I dati della modalità demo anonima sono salvati solo nel browser locale.",
      },
      {
        q: "Come faccio se non so usarlo?",
        a: "Le istruzioni a schermo ti guideranno. Il modo più semplice per iniziare: prova a trascinare un ospite su un posto. L'intero processo richiede meno di cinque minuti.",
      },
    ],
    bottomCtaTitle: "Pronto a iniziare la disposizione?",
    bottomCtaDesc: "Prova subito, senza registrazione. La disposizione completa in cinque minuti.",
    footerTagline: "Il tuo matrimonio, perfettamente organizzato.",
  },
};
