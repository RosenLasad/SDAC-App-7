(() => {
  const panelEl = document.querySelector('.panel[data-panel="dictionary"]');
  const resultsEl = document.getElementById("dictResults");
  const searchEl = document.getElementById("dictSearch");
  const alphaEl = document.getElementById("dictAlphabet");
  if (!panelEl || !resultsEl || !searchEl || !alphaEl) return;

  const TERMS = [
  {
  "term": "4K",
  "category": "Video",
  "def": "Risoluzione video con circa 4.000 pixel orizzontali, spesso pari a 3840×2160 nel formato UHD.",
  "longDef": "Il 4K indica una famiglia di risoluzioni video caratterizzate da circa 4.000 pixel sul lato orizzontale dell’immagine. Nell’uso televisivo e online corrisponde quasi sempre all’UHD, cioè 3840×2160 pixel, mentre nel cinema digitale può indicare il formato DCI 4K, pari a 4096×2160 pixel. In video offre maggiore dettaglio rispetto al Full HD, ma richiede più spazio di archiviazione, maggiore potenza di elaborazione e un bitrate adeguato per mantenere buona qualità."
},
  {
  "term": "8K",
  "category": "Video",
  "def": "Risoluzione video con circa 8.000 pixel orizzontali, comunemente pari a 7680×4320 nel formato UHD.",
  "longDef": "L’8K indica una risoluzione video molto elevata, con circa 8.000 pixel sul lato orizzontale dell’immagine. Nel formato UHD più comune corrisponde a 7680×4320 pixel, cioè quattro volte il numero di pixel del 4K UHD e sedici volte quello del Full HD. In video permette un altissimo livello di dettaglio e ampi margini per ritaglio, stabilizzazione o reframing, ma comporta file molto pesanti, necessità di bitrate elevati e un workflow di postproduzione più impegnativo."
},
  {
    "term": "Adjustment layer - Livello di regolazione",
    "category": "Montaggio",
    "def": "Livello applicato sopra le clip per effetti condivisi.",
    "longDef": "L’adjustment layer è un livello vuoto posizionato sopra le clip per applicare effetti o correzioni a tutto ciò che si trova sotto. Invece di modificare ogni clip singolarmente, si lavora su un unico livello comune. In montaggio è uno strumento molto pratico per color correction, look, effetti o transizioni condivise."
  },
  {
    "term": "ADR - Doppiaggio dialoghi",
    "category": "Audio",
    "def": "Riregistrazione dei dialoghi in postproduzione.",
    "longDef": "L’ADR, cioè Automated Dialogue Replacement, è la riregistrazione dei dialoghi in postproduzione. Si usa quando la presa diretta è inutilizzabile o quando si vuole migliorare chiarezza, interpretazione o pulizia del parlato. In audio è una tecnica molto delicata, perché il nuovo dialogo deve sembrare naturale e perfettamente integrato con la scena originale."
  },
  {
    "term": "Aliasing - Scalettatura dell’immagine",
    "category": "Video",
    "def": "Artefatto visivo che altera linee e dettagli sottili.",
    "longDef": "L’aliasing è un difetto visivo che altera il modo in cui il sensore o il file rappresentano linee sottili, diagonali o dettagli ripetitivi. Può produrre bordi frastagliati, scintillii o perdita di precisione nelle forme. In video è uno di quei problemi che riducono la qualità percepita, soprattutto in immagini con molti dettagli fini."
  },
  {
    "term": "Ambienza",
    "category": "Audio",
    "def": "Suono complessivo dell’ambiente in cui si svolge la scena.",
    "longDef": "L’ambienza è il suono complessivo di un luogo, cioè tutto ciò che caratterizza acusticamente uno spazio. Può includere traffico lontano, vento, voci diffuse, macchinari, natura o risonanze interne. In audio l’ambienza è molto importante perché dà identità, profondità e credibilità allo spazio percepito dallo spettatore."
  },
  {
    "term": "Angolazione",
    "category": "Regia",
    "def": "Posizione della camera rispetto al soggetto ripreso.",
    "longDef": "L’angolazione indica la posizione della camera rispetto al soggetto ripreso: dall’alto, dal basso, frontale, laterale e così via. Cambiare angolazione modifica la percezione del soggetto e può farlo apparire più forte, più fragile, più minaccioso o più distante. È quindi una scelta espressiva importante, non solo tecnica."
  },
  {
    "term": "Antagonista",
    "category": "Sceneggiatura",
    "def": "Forza o personaggio che ostacola il protagonista.",
    "longDef": "L’antagonista è la forza che ostacola il protagonista nel raggiungimento del suo obiettivo. Può essere una persona, un gruppo, una situazione, un sistema o persino un conflitto interno. In sceneggiatura è essenziale perché senza opposizione non esiste vera tensione narrativa."
  },
  {
    "term": "Apertura",
    "category": "Video",
    "def": "Ampiezza del diaframma, che regola quanta luce entra nell’obiettivo.",
    "longDef": "L’apertura indica quanto il diaframma dell’obiettivo è aperto o chiuso durante la ripresa. Questo influisce direttamente sulla quantità di luce che raggiunge il sensore e quindi sull’esposizione dell’immagine. In ambito video, l’apertura influisce anche sulla profondità di campo, cioè su quanta parte dell’immagine appare nitida."
  },
  {
    "term": "Arco narrativo",
    "category": "Sceneggiatura",
    "def": "Evoluzione di un personaggio o di una situazione nel corso della storia.",
    "longDef": "L’arco narrativo è il percorso di evoluzione di un personaggio o di una situazione nel corso della storia. Indica come cambia un individuo, cosa impara, cosa perde o come si trasforma il suo modo di vedere il mondo. In sceneggiatura è uno degli elementi che danno profondità al racconto."
  },
  {
    "term": "Asse d’azione",
    "category": "Regia",
    "def": "Linea immaginaria che guida la coerenza spaziale tra le inquadrature.",
    "longDef": "L’asse d’azione è una linea immaginaria che collega i soggetti principali della scena e orienta la posizione della camera. Rispettarlo serve a mantenere coerenza spaziale tra le inquadrature, evitando che i personaggi sembrino invertire posizione sullo schermo. In regia è una regola importante, soprattutto nei dialoghi e nelle scene d’azione."
  },
  {
    "term": "Assicurazione",
    "category": "Produzione",
    "def": "Copertura economica contro danni, incidenti o problemi di produzione.",
    "longDef": "L’assicurazione è la copertura che protegge produzione, persone, attrezzature o luoghi da danni, incidenti e responsabilità. A seconda del progetto può riguardare infortuni, trasporti, furti, guasti o responsabilità verso terzi. In produzione è una garanzia importante, soprattutto quando il lavoro coinvolge mezzi costosi o situazioni potenzialmente rischiose."
  },
  {
    "term": "Assistente di produzione",
    "category": "Produzione",
    "def": "Ruolo di supporto alle attività organizzative e di set.",
    "longDef": "L’assistente di produzione è una figura di supporto che aiuta nelle attività organizzative e pratiche legate al progetto. Può occuparsi di contatti, documenti, consegne, convocazioni, spostamenti, materiali o piccole emergenze quotidiane. In produzione è un ruolo molto utile, soprattutto nei set in cui servono rapidità, affidabilità e flessibilità."
  },
  {
    "term": "Atto",
    "category": "Sceneggiatura",
    "def": "Grande blocco strutturale del racconto.",
    "longDef": "L’atto è una grande sezione della storia che corrisponde a una fase importante del percorso narrativo. Nella struttura classica, gli atti servono a dividere la vicenda in introduzione, sviluppo e conclusione, ma possono variare a seconda del modello scelto. In sceneggiatura aiutano a governare equilibrio, progressione e trasformazione del racconto."
  },
  {
    "term": "Audio mono",
    "category": "Audio",
    "def": "Segnale sonoro registrato o riprodotto su un solo canale.",
    "longDef": "L’audio mono è un segnale registrato o riprodotto su un solo canale. Tutto il suono proviene quindi da un’unica sorgente sonora, senza separazione spaziale tra destra e sinistra. In audio il mono è ancora molto utile per voci, dialoghi, podcast e situazioni in cui la chiarezza del contenuto conta più dell’effetto immersivo."
  },
  {
    "term": "Audio stereo",
    "category": "Audio",
    "def": "Segnale sonoro distribuito su due canali distinti.",
    "longDef": "L’audio stereo utilizza due canali distinti, generalmente sinistro e destro, per creare una sensazione di spazio e direzione sonora. Permette di distribuire gli elementi nel panorama acustico e di rendere l’ascolto più naturale o coinvolgente. In audio è lo standard più comune per musica, video e contenuti che vogliono offrire una percezione più ampia del suono."
  },
  {
    "term": "B-roll - Riprese di supporto",
    "category": "Montaggio",
    "def": "Immagini di supporto usate per arricchire o coprire il montaggio principale.",
    "longDef": "Il B-roll è il materiale video di supporto usato per arricchire il montaggio principale o coprire tagli, interviste e passaggi narrativi. Può mostrare dettagli, ambienti, azioni secondarie o immagini evocative collegate al contenuto. In montaggio è una risorsa preziosa perché aiuta a rendere il video più dinamico, visivo e fluido."
  },
  {
    "term": "Backstory - Antefatto del personaggio",
    "category": "Sceneggiatura",
    "def": "Passato del personaggio che ne influenza comportamento e scelte.",
    "longDef": "La backstory è il passato del personaggio, cioè l’insieme degli eventi precedenti alla storia principale che ne influenzano comportamento e visione del mondo. Non tutto deve essere mostrato o spiegato apertamente, ma deve esistere come base coerente della sua identità. In sceneggiatura la backstory serve a dare profondità, motivazioni e spessore psicologico."
  },
  {
    "term": "Beat - Snodo narrativo",
    "category": "Sceneggiatura",
    "def": "Piccola unità narrativa o emotiva all’interno di una scena.",
    "longDef": "Il beat è una piccola unità narrativa o emotiva all’interno di una scena. Può segnare un cambiamento di intenzione, tono, reazione o rapporto tra personaggi. In sceneggiatura lavorare sui beat aiuta a costruire dialoghi vivi e scene con un andamento preciso."
  },
  {
    "term": "Beat sheet - Scaletta degli snodi narrativi",
    "category": "Sceneggiatura",
    "def": "Schema dei principali passaggi narrativi della storia.",
    "longDef": "Il beat sheet è uno schema che raccoglie i principali passaggi narrativi della storia in ordine progressivo. Non entra in tutti i dettagli, ma individua i momenti chiave che segnano l’avanzamento del racconto. In sceneggiatura è uno strumento molto utile per controllare struttura, equilibrio e ritmo complessivo."
  },
  {
    "term": "Bilanciamento del bianco",
    "category": "Video",
    "def": "Regolazione dei colori per rendere neutri i bianchi in base alla luce.",
    "longDef": "Il bilanciamento del bianco serve a correggere la dominante cromatica causata dalle diverse fonti di luce. Una lampada calda, una luce al neon o la luce del giorno hanno temperature colore diverse, e senza una regolazione corretta il bianco può apparire giallo, blu o verdastro. In video è fondamentale per ottenere colori naturali o per costruire consapevolmente un certo look."
  },
  {
    "term": "Bin - Cartella del progetto",
    "category": "Montaggio",
    "def": "Contenitore virtuale usato per organizzare le clip nel progetto.",
    "longDef": "Il bin è un contenitore virtuale usato per organizzare clip, audio, immagini e altri file all’interno del progetto. Funziona come una cartella interna al software di montaggio e aiuta a dividere il materiale per scena, tipo, giornata o funzione. In montaggio una buona organizzazione dei bin fa risparmiare tempo e rende il lavoro molto più chiaro."
  },
  {
    "term": "Bit depth - Profondità di bit",
    "category": "Audio",
    "def": "Quantità di informazione usata per descrivere ogni campione audio.",
    "longDef": "La bit depth indica quanta informazione viene usata per descrivere ogni campione audio registrato. Una maggiore profondità di bit permette una rappresentazione più precisa del segnale e una migliore gestione della dinamica. In audio questo parametro è importante perché aiuta a ottenere registrazioni più pulite e con maggiore margine di lavoro in postproduzione."
  },
  {
    "term": "Bitrate - Flusso dati",
    "category": "Video",
    "def": "Quantità di dati usata ogni secondo in un file video.",
    "longDef": "Il bitrate è la quantità di dati che il file video utilizza ogni secondo. In generale, un bitrate più alto permette di conservare più dettaglio e meno artefatti, ma produce file più pesanti. In video è uno dei parametri chiave per il rapporto tra qualità visiva, dimensione del file e facilità di gestione."
  },
  {
    "term": "Blocking - Disposizione dei movimenti in scena",
    "category": "Regia",
    "def": "Disposizione e movimento degli attori all’interno della scena.",
    "longDef": "Il blocking è l’organizzazione dei movimenti degli attori nello spazio scenico. Riguarda dove si posizionano, come si spostano, quando entrano o escono dall’inquadratura e come interagiscono con gli altri personaggi e con la camera. In regia è fondamentale perché dà ordine alla scena e trasforma l’azione in qualcosa di visivamente leggibile."
  },
  {
    "term": "Boom",
    "category": "Audio",
    "def": "Asta usata per posizionare il microfono vicino alla fonte sonora.",
    "longDef": "Il boom è l’asta utilizzata per sostenere e posizionare il microfono vicino alla fonte sonora senza farlo entrare nell’inquadratura. Permette di seguire i movimenti degli attori o dei soggetti mantenendo una buona qualità di registrazione. In audio è uno strumento fondamentale sul set, perché consente flessibilità e controllo senza compromettere la pulizia visiva della scena."
  },
  {
    "term": "Budget - Piano dei costi",
    "category": "Produzione",
    "def": "Stima complessiva dei costi di un progetto.",
    "longDef": "Il budget è la stima complessiva dei costi necessari per realizzare un progetto audiovisivo. Include voci come personale, attrezzature, location, trasporti, vitto, postproduzione e spese impreviste. In produzione è uno strumento fondamentale perché permette di capire fin dall’inizio se il progetto è sostenibile e come distribuire al meglio le risorse."
  },
  {
    "term": "Cachet - Compenso",
    "category": "Produzione",
    "def": "Compenso pattuito per una prestazione artistica o tecnica.",
    "longDef": "Il cachet è il compenso pattuito per una prestazione artistica o professionale. Viene usato spesso per attori, musicisti, ospiti, performer o figure creative, ma può estendersi anche ad altri collaboratori. In produzione definirlo in modo trasparente aiuta a evitare malintesi e a mantenere correttezza nei rapporti di lavoro."
  },
  {
    "term": "Call sheet - Foglio di convocazione",
    "category": "Produzione",
    "def": "Foglio con orari, luoghi e informazioni operative della giornata.",
    "longDef": "La call sheet è il foglio operativo che raccoglie tutte le informazioni utili per una specifica giornata di set. Indica orari di convocazione, location, scene previste, contatti, mezzi, reparto trucco, costumi, esigenze tecniche e note importanti. In produzione è uno strumento centrale, perché garantisce coordinamento e chiarezza per tutta la troupe."
  },
  {
    "term": "Camera a mano",
    "category": "Regia",
    "def": "Ripresa realizzata senza supporto fisso, con movimento libero.",
    "longDef": "La camera a mano è una modalità di ripresa in cui la macchina viene tenuta senza supporti fissi rigidi. Produce un’immagine più viva, mobile e talvolta instabile, che può aumentare realismo, urgenza o tensione. In regia viene usata spesso per dare una sensazione di presenza immediata o documentaria."
  },
  {
    "term": "Camera fissa",
    "category": "Regia",
    "def": "Ripresa con camera immobile durante tutta l’inquadratura.",
    "longDef": "La camera fissa è una ripresa in cui la macchina resta immobile per tutta la durata dell’inquadratura. Questa scelta può dare stabilità, rigore, distacco o concentrazione sull’azione interna al quadro. In regia è molto efficace quando si vuole lasciare che siano attori, spazio e tempo a costruire la forza della scena."
  },
  {
    "term": "Campo lungo",
    "category": "Regia",
    "def": "Inquadratura ampia in cui l’ambiente prevale sui personaggi.",
    "longDef": "Il campo lungo è un’inquadratura ampia in cui l’ambiente ha un ruolo molto importante rispetto ai personaggi. Viene usato per mostrare il contesto, la distanza, la solitudine di un soggetto oppure il rapporto tra figura umana e spazio. È molto utile all’inizio di una scena o quando si vuole far percepire allo spettatore la grandezza del luogo in cui si svolge l’azione."
  },
  {
    "term": "Campo medio",
    "category": "Regia",
    "def": "Inquadratura che bilancia presenza del soggetto e spazio circostante.",
    "longDef": "Il campo medio è un’inquadratura intermedia che lascia vedere chiaramente il soggetto ma conserva anche una parte significativa dell’ambiente. È molto utile nelle scene dialogate o nelle situazioni in cui il rapporto tra personaggio e spazio ha importanza. In regia rappresenta spesso un buon equilibrio tra informazione narrativa ed espressività."
  },
  {
    "term": "Campo totale",
    "category": "Regia",
    "def": "Inquadratura che mostra interamente lo spazio dell’azione e i soggetti presenti.",
    "longDef": "Il campo totale mostra interamente lo spazio dell’azione e i personaggi coinvolti, offrendo una visione completa della scena. Serve a chiarire la disposizione dei soggetti, i rapporti spaziali e la situazione generale prima di passare a inquadrature più ravvicinate. In regia è utile per orientare lo spettatore e costruire una base chiara su cui far evolvere il racconto visivo."
  },
  {
    "term": "Capienza location - Capienza del luogo di ripresa",
    "category": "Produzione",
    "def": "Numero di persone o mezzi che una location può ospitare.",
    "longDef": "La capienza della location indica quante persone, mezzi o attrezzature uno spazio può ospitare in modo realistico e sicuro. Non riguarda solo la dimensione fisica, ma anche accessibilità, percorsi interni, zone tecniche e possibilità di movimento. In produzione è un dato pratico fondamentale per capire se una location è davvero adatta al tipo di set previsto."
  },
  {
    "term": "Cardioide",
    "category": "Audio",
    "def": "Pattern microfonico che privilegia il suono frontale.",
    "longDef": "Il cardioide è un pattern microfonico che cattura soprattutto il suono proveniente dalla parte frontale, attenuando quello che arriva da dietro. È molto usato perché offre un buon equilibrio tra focalizzazione della sorgente e praticità d’uso. In audio è uno dei diagrammi polari più comuni per voce, interviste e riprese controllate."
  },
  {
    "term": "Carrellata",
    "category": "Regia",
    "def": "Movimento della camera nello spazio, avanti, indietro o lateralmente.",
    "longDef": "La carrellata è un movimento reale della macchina da presa nello spazio, avanti, indietro o lateralmente. A differenza dello zoom, non modifica solo l’ingrandimento, ma cambia il rapporto fisico tra camera, soggetto e ambiente. Viene usata per seguire un’azione, entrare in una scena o aumentare il coinvolgimento visivo."
  },
  {
    "term": "Casting - Selezione del cast",
    "category": "Produzione",
    "def": "Selezione degli attori o dei partecipanti a una produzione.",
    "longDef": "Il casting è il processo di selezione di attori, performer o partecipanti per un progetto. Non riguarda solo la bravura individuale, ma anche la compatibilità con il ruolo, il tono dell’opera e la chimica con gli altri interpreti. In produzione è una fase delicata, perché una scelta sbagliata nel cast può indebolire tutto il risultato finale."
  },
  {
    "term": "Catering - Servizio pasti",
    "category": "Produzione",
    "def": "Servizio di cibo e bevande per cast e troupe.",
    "longDef": "Il catering è il servizio che fornisce cibo e bevande a cast e troupe durante le giornate di lavoro. Può sembrare un dettaglio secondario, ma in realtà incide molto sul benessere, sull’energia e sul clima del set. In produzione è una voce pratica importante, soprattutto nelle lavorazioni lunghe o con molte persone coinvolte."
  },
  {
    "term": "Character arc - Arco del personaggio",
    "category": "Sceneggiatura",
    "def": "Percorso di trasformazione di un personaggio nel racconto.",
    "longDef": "Il character arc è il percorso di trasformazione interiore di un personaggio durante la storia. Mostra come cambia il suo modo di pensare, sentire o agire in seguito agli eventi affrontati. In sceneggiatura è uno strumento essenziale per rendere il personaggio dinamico e non statico."
  },
  {
    "term": "Chiusura produzione",
    "category": "Produzione",
    "def": "Fase finale di riepilogo, restituzioni e verifica dei materiali.",
    "longDef": "La chiusura produzione è la fase finale in cui si raccolgono materiali, si verificano spese, si chiudono contratti, si restituiscono attrezzature e si completano gli ultimi adempimenti. Non è solo la fine delle riprese, ma il momento in cui il progetto viene formalmente ricondotto a ordine. In produzione una buona chiusura evita problemi successivi e facilita il passaggio ordinato alla postproduzione o all’archiviazione."
  },
  {
    "term": "Chroma key - Chiave cromatica",
    "category": "Montaggio",
    "def": "Tecnica che rimuove uno sfondo uniforme, spesso verde o blu.",
    "longDef": "Il chroma key è la tecnica che rimuove uno sfondo uniforme, di solito verde o blu, per sostituirlo con un’altra immagine o ambiente. È molto usata in effetti visivi, video didattici, televisione e contenuti creativi. In montaggio e compositing richiede una buona ripresa di partenza, perché una luce sbagliata rende il risultato poco credibile."
  },
  {
    "term": "Chroma subsampling - Sottocampionamento del colore",
    "category": "Video",
    "def": "Metodo di compressione che riduce le informazioni colore.",
    "longDef": "Il chroma subsampling è un metodo di compressione che riduce le informazioni sul colore mantenendo più dettagli nella luminosità. Poiché l’occhio umano percepisce meglio la luminanza che la crominanza, questa tecnica permette di alleggerire il file senza un degrado immediatamente evidente. In video però livelli più bassi di campionamento colore possono limitare il lavoro di color grading o chroma key."
  },
  {
    "term": "Cliffhanger - Finale sospeso",
    "category": "Sceneggiatura",
    "def": "Chiusura sospesa che crea attesa per ciò che seguirà.",
    "longDef": "Il cliffhanger è una chiusura sospesa che interrompe la storia in un momento critico o irrisolto. Serve a creare forte attesa e a spingere lo spettatore a voler sapere subito cosa succederà dopo. In sceneggiatura è molto usato nei finali di episodio, di atto o di sequenza."
  },
  {
    "term": "Climax - Culmine narrativo",
    "category": "Sceneggiatura",
    "def": "Punto di massima tensione narrativa.",
    "longDef": "Il climax è il punto di massima intensità drammatica della storia. Qui il conflitto raggiunge il suo apice e il protagonista affronta il momento decisivo da cui dipende l’esito del racconto. In sceneggiatura il climax è fondamentale perché concentra tensione, emozione e significato."
  },
  {
    "term": "Clipping - Taglio del segnale",
    "category": "Audio",
    "def": "Distorsione causata da un livello audio troppo alto.",
    "longDef": "Il clipping è la distorsione che si verifica quando il segnale audio supera il livello massimo che il sistema può gestire. Il suono viene “tagliato” nelle sue parti più forti e il risultato appare duro, sporco o sgradevole. In audio è un problema serio perché spesso non è recuperabile completamente in postproduzione."
  },
  {
    "term": "Codec",
    "category": "Video",
    "def": "Sistema usato per comprimere e leggere un file video.",
    "longDef": "Il codec è il sistema usato per comprimere, registrare e leggere i file video. Stabilisce come i dati vengono codificati e quanto il file risulta pesante, lavorabile o fedele all’originale. In video la scelta del codec influisce molto sia sulla qualità finale sia sulla fluidità del lavoro in montaggio."
  },
  {
    "term": "Color correction - Correzione colore",
    "category": "Montaggio",
    "def": "Correzione tecnica di esposizione, contrasto e bilanciamento colore.",
    "longDef": "La color correction è la fase in cui si correggono problemi tecnici dell’immagine, come esposizione, contrasto, bilanciamento del bianco e coerenza tra clip diverse. Serve a rendere il materiale uniforme, leggibile e corretto prima di eventuali interventi stilistici. In montaggio e postproduzione è un passaggio fondamentale, perché una buona base visiva migliora tutto il progetto."
  },
  {
    "term": "Color grading - Look cromatico",
    "category": "Montaggio",
    "def": "Intervento stilistico sul colore per definire un look visivo.",
    "longDef": "Il color grading è l’intervento creativo sul colore che definisce il look visivo del progetto. A differenza della color correction, non si limita a correggere, ma costruisce un’atmosfera, un’identità o una sensazione visiva precisa. In montaggio e postproduzione è ciò che spesso trasforma un video corretto in un video davvero caratterizzato."
  },
  {
    "term": "Composizione dell’inquadratura",
    "category": "Regia",
    "def": "Disposizione degli elementi visivi nello spazio dell’immagine.",
    "longDef": "La composizione dell’inquadratura è il modo in cui persone, oggetti, linee, vuoti e volumi vengono disposti nello spazio visivo. Non è una questione solo estetica, ma narrativa: una buona composizione può indicare gerarchie, tensioni, equilibrio o isolamento. In regia è uno strumento fondamentale per dare significato all’immagine prima ancora che parlino i personaggi."
  },
  {
    "term": "Compressore",
    "category": "Audio",
    "def": "Strumento che riduce la differenza tra suoni forti e deboli.",
    "longDef": "Il compressore è uno strumento che riduce la differenza tra i suoni più forti e quelli più deboli. In pratica controlla la dinamica del segnale, rendendolo più uniforme e più facile da gestire nel mix. In audio è molto utile per dialoghi, voce, musica e suoni dinamici, ma se usato male può schiacciare troppo il naturale respiro del suono."
  },
  {
    "term": "Conflitto",
    "category": "Sceneggiatura",
    "def": "Contrasto che genera tensione narrativa e fa avanzare la storia.",
    "longDef": "Il conflitto è il contrasto che mette in movimento la storia e crea interesse nello spettatore. Può essere esterno, come uno scontro tra personaggi, oppure interno, come una lotta psicologica o morale. In sceneggiatura il conflitto è ciò che impedisce al racconto di restare statico e lo fa avanzare."
  },
  {
    "term": "Conform - Conformazione del montaggio",
    "category": "Montaggio",
    "def": "Allineamento del progetto finale ai file originali corretti.",
    "longDef": "Il conform è il processo con cui il montaggio viene riallineato ai file originali corretti o ad alta qualità dopo aver lavorato con proxy o versioni leggere. Serve a garantire che la struttura costruita resti identica, ma riferita ai materiali definitivi. In montaggio è un passaggio tecnico molto importante, soprattutto nei workflow professionali."
  },
  {
    "term": "Consuntivo",
    "category": "Produzione",
    "def": "Bilancio finale delle spese realmente sostenute.",
    "longDef": "Il consuntivo è il bilancio finale delle spese realmente sostenute durante il progetto. Serve a confrontare quanto era stato previsto con quanto è stato effettivamente speso, evidenziando scostamenti, errori o risparmi. In produzione è molto utile perché permette di valutare il lavoro svolto e di migliorare la pianificazione dei progetti futuri."
  },
  {
    "term": "Continuità visiva",
    "category": "Regia",
    "def": "Coerenza tra inquadrature successive per movimenti, posizione e direzione.",
    "longDef": "La continuità visiva è la coerenza tra un’inquadratura e la successiva per quanto riguarda posizione, direzione, gesti, sguardi, oggetti e luce. Serve a far percepire la scena come fluida e naturale, senza stacchi che confondano lo spettatore. In regia è uno degli elementi che rendono il montaggio invisibile ed efficace."
  },
  {
    "term": "Contratto di prestazione",
    "category": "Produzione",
    "def": "Accordo formale con professionisti o collaboratori.",
    "longDef": "Il contratto di prestazione è l’accordo formale che definisce il rapporto tra la produzione e un professionista o collaboratore. Specifica compenso, mansioni, tempi, modalità di lavoro, diritti e responsabilità reciproche. In produzione è essenziale perché chiarisce i rapporti e tutela tutte le parti coinvolte."
  },
  {
    "term": "Controcampo",
    "category": "Regia",
    "def": "Inquadratura opposta a quella precedente, spesso usata nei dialoghi.",
    "longDef": "Il controcampo è l’inquadratura opposta rispetto a quella appena mostrata, spesso usata per riprendere l’altro interlocutore in un dialogo. Funziona bene perché costruisce uno scambio visivo ordinato e aiuta lo spettatore a seguire la relazione tra i personaggi. In regia è una base fondamentale del montaggio classico delle conversazioni."
  },
  {
    "term": "Copertura",
    "category": "Regia",
    "def": "Insieme di riprese alternative o aggiuntive della stessa scena.",
    "longDef": "La copertura è l’insieme delle inquadrature girate per raccontare una stessa scena da più punti di vista o con più varianti. Comprende spesso campi, primi piani, dettagli e riprese alternative utili al montaggio. Una buona copertura offre libertà in postproduzione e protegge il progetto da eventuali problemi di continuità o interpretazione."
  },
  {
    "term": "Copertura sanitaria",
    "category": "Produzione",
    "def": "Presenza di supporto medico o procedure sanitarie sul set.",
    "longDef": "La copertura sanitaria riguarda la presenza di misure, procedure o personale adeguato per gestire eventuali problemi medici durante la lavorazione. Può includere kit di pronto soccorso, numeri utili, medico di set o procedure specifiche per lavorazioni più complesse. In produzione è parte della responsabilità generale verso chi lavora sul progetto."
  },
  {
    "term": "Coreografia di scena",
    "category": "Regia",
    "def": "Organizzazione coordinata di movimenti di attori e camera.",
    "longDef": "La coreografia di scena è l’organizzazione coordinata dei movimenti di attori, comparse, oggetti e camera all’interno dello spazio. Non riguarda solo le scene di danza o azione, ma ogni situazione in cui il movimento deve essere progettato con precisione. In regia serve a dare ordine, ritmo e leggibilità alla scena."
  },
  {
    "term": "Crew - Squadra tecnica",
    "category": "Produzione",
    "def": "Gruppo tecnico e organizzativo che lavora sul set.",
    "longDef": "La crew è il gruppo di professionisti tecnici e organizzativi che lavora alla realizzazione del progetto. Comprende reparti diversi, come regia, fotografia, audio, produzione, trucco, costumi, scenografia e altri ruoli a seconda della scala del lavoro. In produzione coordinare bene la crew significa far funzionare il set con efficienza, ordine e rispetto dei tempi."
  },
  {
    "term": "Crisi",
    "category": "Sceneggiatura",
    "def": "Momento in cui il personaggio affronta la scelta più difficile.",
    "longDef": "La crisi è il momento in cui il personaggio si trova davanti alla prova più difficile o alla scelta più dolorosa. È una fase in cui le vecchie strategie non bastano più e il conflitto raggiunge un livello decisivo. In sceneggiatura la crisi prepara il climax e mette a nudo il vero valore del personaggio."
  },
  {
    "term": "Cronoprogramma",
    "category": "Produzione",
    "def": "Calendario generale delle fasi del progetto.",
    "longDef": "Il cronoprogramma è la pianificazione temporale generale dell’intero progetto, dalla preparazione alla consegna finale. Non riguarda solo le riprese, ma anche preproduzione, postproduzione, revisioni e scadenze intermedie. In produzione serve a visualizzare il percorso complessivo e a distribuire tempi e priorità in modo realistico."
  },
  {
    "term": "Cross dissolve - Dissolvenza incrociata",
    "category": "Montaggio",
    "def": "Transizione in cui un’immagine sfuma dentro un’altra.",
    "longDef": "Il cross dissolve è una transizione in cui un’immagine sfuma progressivamente dentro un’altra. Crea un passaggio morbido, spesso associato al passare del tempo, a un ricordo o a un cambio di atmosfera. In montaggio va usata con criterio, perché se abusata può appesantire il ritmo invece di arricchirlo."
  },
  {
    "term": "Cut - Taglio",
    "category": "Montaggio",
    "def": "Taglio netto da un’inquadratura a un’altra.",
    "longDef": "Il cut è il taglio netto da un’inquadratura a un’altra senza transizioni intermedie. È la forma di passaggio più semplice e più usata, perché se ben costruita risulta naturale, chiara ed efficace. In montaggio il cut è uno strumento fondamentale per dare ritmo, guidare l’attenzione e costruire il significato della scena."
  },
  {
    "term": "De-esser - Riduzione sibilo",
    "category": "Audio",
    "def": "Strumento che riduce le sibilanti troppo forti nella voce.",
    "longDef": "Il de-esser è uno strumento che riduce le sibilanti troppo forti della voce, come “s”, “z” o suoni simili. Interviene solo in una zona precisa di frequenze, attenuando l’effetto pungente senza modificare troppo il resto del timbro. In audio è molto utile nel trattamento delle voci, soprattutto in registrazioni ravvicinate o brillanti."
  },
  {
    "term": "Dettaglio",
    "category": "Regia",
    "def": "Inquadratura molto stretta su un particolare significativo.",
    "longDef": "Il dettaglio è un’inquadratura molto stretta su una parte specifica del corpo, di un oggetto o di un elemento della scena. Si usa per evidenziare qualcosa che ha valore narrativo, simbolico o emotivo, come una mano che trema, una chiave, un occhio o un particolare tecnico. In regia, il dettaglio serve spesso a creare attenzione, suspense o significato."
  },
  {
    "term": "Deus ex machina",
    "category": "Sceneggiatura",
    "def": "Soluzione improvvisa e poco preparata che risolve il conflitto.",
    "longDef": "Il deus ex machina è una soluzione improvvisa e poco preparata che risolve il conflitto in modo esterno e forzato. In genere viene percepito come debolezza di scrittura, perché il finale arriva non dalle azioni dei personaggi, ma da un intervento narrativo poco guadagnato. In sceneggiatura è qualcosa da evitare, salvo uso consapevole e stilizzato."
  },
  {
    "term": "Diaframma",
    "category": "Video",
    "def": "Sistema dell’obiettivo che controlla il passaggio della luce.",
    "longDef": "Il diaframma è il sistema interno dell’obiettivo che regola il passaggio della luce. Funziona come un’apertura variabile: più è aperto, più luce entra; più è chiuso, meno luce raggiunge il sensore. In video è uno dei tre parametri principali dell’esposizione, insieme a ISO e tempo di posa."
  },
  {
    "term": "Diagramma polare",
    "category": "Audio",
    "def": "Schema che descrive la direzionalità di un microfono.",
    "longDef": "Il diagramma polare descrive la direzionalità di un microfono, cioè da quali direzioni capta meglio il suono. Aiuta a capire se il microfono privilegia la parte frontale, laterale o l’intero ambiente. In audio conoscere il diagramma polare è fondamentale per scegliere il microfono giusto e posizionarlo in modo efficace."
  },
  {
    "term": "Dialogo",
    "category": "Sceneggiatura",
    "def": "Scambio verbale tra personaggi all’interno della scena.",
    "longDef": "Il dialogo è lo scambio verbale tra personaggi all’interno di una scena. Non serve solo a trasmettere informazioni, ma anche a rivelare carattere, rapporti di forza, emozioni e conflitti. In una buona sceneggiatura, il dialogo non spiega troppo: agisce, suggerisce e fa avanzare la storia."
  },
  {
    "term": "Disponibilità",
    "category": "Produzione",
    "def": "Periodo o orario in cui persone o luoghi sono utilizzabili.",
    "longDef": "La disponibilità indica il periodo o l’orario in cui una persona, un luogo o una risorsa può essere effettivamente utilizzata. In produzione è un dato essenziale, perché spesso il piano di lavorazione deve adattarsi più alle disponibilità reali che alla sequenza narrativa del copione. Saperle raccogliere bene è decisivo per evitare conflitti e cambi dell’ultimo momento."
  },
  {
    "term": "Distorsione",
    "category": "Audio",
    "def": "Alterazione indesiderata del suono originale.",
    "longDef": "La distorsione è un’alterazione del segnale sonoro rispetto alla sua forma originale. Può essere accidentale, come nel caso di registrazioni sbagliate o sovraccariche, oppure voluta, come effetto creativo in musica o sound design. In audio è importante distinguere tra distorsione utile e distorsione dannosa, perché non tutte hanno lo stesso valore espressivo o tecnico."
  },
  {
    "term": "Dolly - Carrello cinematografico",
    "category": "Video",
    "def": "Supporto mobile per spostare la camera nello spazio.",
    "longDef": "Il dolly è un supporto mobile che consente alla camera di spostarsi nello spazio in modo fluido e controllato. Può essere usato su ruote, binari o altre strutture, a seconda del tipo di produzione. In video e cinema il dolly è uno strumento classico per movimenti di macchina precisi e professionali."
  },
  {
    "term": "Doppia registrazione",
    "category": "Audio",
    "def": "Acquisizione simultanea di due livelli audio per sicurezza.",
    "longDef": "La doppia registrazione consiste nel registrare lo stesso segnale su due tracce con livelli diversi, una normale e una più bassa di sicurezza. In questo modo, se la traccia principale va in clipping, si può usare quella di backup. In audio è una pratica molto utile sul set, soprattutto quando il livello della voce può variare improvvisamente."
  },
  {
    "term": "Drone",
    "category": "Video",
    "def": "Velivolo radiocomandato usato per riprese aeree.",
    "longDef": "Il drone è un velivolo radiocomandato dotato di camera, usato per realizzare riprese aeree. Permette di mostrare spazi, paesaggi e movimenti da punti di vista altrimenti difficili o impossibili da ottenere. In video è molto potente, ma richiede attenzione sia tecnica sia normativa."
  },
  {
    "term": "Dynamic range - Gamma dinamica",
    "category": "Video",
    "def": "Capacità del sensore di registrare dettagli nelle ombre e nelle alte luci.",
    "longDef": "Il dynamic range, o gamma dinamica, è la capacità del sensore di registrare dettagli sia nelle ombre sia nelle alte luci. Più è ampia la gamma dinamica, più l’immagine riesce a gestire scene contrastate senza perdere informazioni. In video questo parametro è molto importante, soprattutto in condizioni di luce difficili o in produzioni destinate alla color correction."
  },
  {
    "term": "Découpage tecnico",
    "category": "Regia",
    "def": "Suddivisione della scena in inquadrature previste per la ripresa.",
    "longDef": "Il découpage tecnico è la suddivisione della scena in inquadrature precise, già pensate prima delle riprese. Serve a tradurre la sceneggiatura in un piano visivo concreto, indicando come verrà filmata ogni parte dell’azione. È uno strumento essenziale di preparazione registica, perché aiuta a organizzare lavoro, tempi e linguaggio visivo."
  },
  {
    "term": "Eco",
    "category": "Audio",
    "def": "Ripetizione percepibile di un suono riflesso.",
    "longDef": "L’eco è la ripetizione percepibile di un suono riflesso che arriva in ritardo rispetto al segnale originale. A differenza del riverbero, si distingue come un ritorno separato del suono. In audio può essere un difetto ambientale oppure un effetto espressivo, a seconda del contesto e dell’uso che se ne fa."
  },
  {
    "term": "Ellissi",
    "category": "Montaggio",
    "def": "Eliminazione di una parte del tempo narrativo non mostrata.",
    "longDef": "L’ellissi è l’eliminazione di una parte del tempo narrativo che non viene mostrata esplicitamente. Permette di saltare momenti non necessari e di far avanzare la storia in modo più rapido ed efficace. In montaggio è una scelta essenziale, perché non tutto va mostrato: spesso ciò che si omette rende il racconto più forte."
  },
  {
    "term": "Entrata a effetto",
    "category": "Regia",
    "def": "Ingresso studiato di un personaggio per creare impatto narrativo.",
    "longDef": "L’entrata a effetto è l’ingresso in scena di un personaggio costruito per creare sorpresa, imponenza, tensione o fascino. Può dipendere da inquadratura, movimento di camera, musica, tempo dell’entrata o gestione dello sguardo dello spettatore. In regia è un modo per dare forza a un’apparizione importante."
  },
  {
    "term": "Entrata in campo",
    "category": "Regia",
    "def": "Momento in cui un soggetto entra nell’inquadratura.",
    "longDef": "L’entrata in campo è il momento in cui un personaggio o un elemento visivo compare all’interno dell’inquadratura. Può essere semplice oppure costruita in modo teatrale, sorprendente o drammatico. In regia ha spesso un forte valore narrativo, perché l’ingresso di qualcuno cambia l’equilibrio della scena."
  },
  {
    "term": "Entrata motivata della camera",
    "category": "Regia",
    "def": "Movimento di macchina giustificato dall’azione o dall’emozione della scena.",
    "longDef": "L’entrata motivata della camera è un movimento o avvicinamento che nasce da una ragione narrativa o emotiva precisa. Non è un movimento gratuito, ma una risposta a qualcosa che accade nella scena: una rivelazione, una tensione, uno sguardo, un gesto. In regia questo principio aiuta a rendere i movimenti più naturali e significativi."
  },
  {
    "term": "Equalizzazione",
    "category": "Audio",
    "def": "Modifica delle frequenze sonore per migliorare o correggere il suono.",
    "longDef": "L’equalizzazione è il processo con cui si regolano le varie frequenze di un segnale audio. Serve per correggere problemi, rendere una voce più chiara, attenuare risonanze o valorizzare certe caratteristiche timbriche. In audio è uno degli strumenti più usati, ma va applicato con criterio, perché un intervento eccessivo può rendere il suono artificiale."
  },
  {
    "term": "Esposizione",
    "category": "Video",
    "def": "Quantità complessiva di luce registrata nell’immagine.",
    "longDef": "L’esposizione è la quantità totale di luce registrata nell’immagine. Un video ben esposto conserva dettaglio sia nelle zone chiare sia in quelle scure, mentre una cattiva esposizione può bruciare le alte luci o chiudere troppo le ombre. In ambito video, controllare l’esposizione è essenziale per ottenere immagini leggibili e gradevoli."
  },
  {
    "term": "Establishing shot - Inquadratura d’ambientazione",
    "category": "Regia",
    "def": "Inquadratura iniziale che presenta il luogo della scena.",
    "longDef": "L’establishing shot è l’inquadratura che introduce il luogo in cui si svolgerà la scena. Di solito è ampia e serve a dare allo spettatore un punto di riferimento spaziale prima di passare a piani più stretti. In regia aiuta a orientare chi guarda e a far capire subito dove ci troviamo."
  },
  {
    "term": "Export - Esportazione",
    "category": "Montaggio",
    "def": "Creazione del file finale del progetto montato.",
    "longDef": "L’export è la creazione del file finale del progetto montato. Durante questa fase il software unisce video, audio, effetti e impostazioni in un unico file destinato alla visione, alla consegna o alla pubblicazione. In montaggio l’export è l’ultimo passaggio tecnico, ma va gestito con attenzione perché da lì dipendono qualità, compatibilità e peso del risultato finale."
  },
  {
    "term": "Exposition - Esposizione narrativa",
    "category": "Sceneggiatura",
    "def": "Informazioni necessarie per capire contesto, personaggi e situazione.",
    "longDef": "L’exposition è l’insieme delle informazioni necessarie per comprendere contesto, personaggi, relazioni e situazione iniziale della storia. Può essere comunicata attraverso dialoghi, immagini, azioni o dettagli ambientali. In sceneggiatura il problema non è “dare informazioni”, ma farlo in modo naturale e non scolastico."
  },
  {
    "term": "Fade in - Dissolvenza in apertura",
    "category": "Montaggio",
    "def": "Comparsa progressiva di immagine o suono.",
    "longDef": "Il fade in è una comparsa graduale dell’immagine o del suono a partire dal nero o dal silenzio. Viene usato spesso all’inizio di una scena, di una sequenza o dell’intero progetto. In montaggio crea un ingresso morbido e può dare al contenuto un tono più elegante, atmosferico o narrativamente controllato."
  },
  {
    "term": "Fade out - Dissolvenza in chiusura",
    "category": "Montaggio",
    "def": "Scomparsa progressiva di immagine o suono.",
    "longDef": "Il fade out è la scomparsa graduale dell’immagine o del suono verso il nero o il silenzio. Viene usato per chiudere una scena, una sequenza o il progetto nel suo insieme. In montaggio è un modo classico e molto efficace per accompagnare la conclusione senza uno stacco brusco."
  },
  {
    "term": "False color - Falsi colori",
    "category": "Video",
    "def": "Sistema di visualizzazione che evidenzia i livelli di esposizione con colori.",
    "longDef": "Il false color è un sistema di visualizzazione che usa colori artificiali per rappresentare i diversi livelli di esposizione dell’immagine. Ogni colore corrisponde a una fascia tonale precisa, facilitando il controllo tecnico della luce. In video è uno strumento molto efficace per esporre con precisione, soprattutto in situazioni professionali o complesse."
  },
  {
    "term": "Filtro ND",
    "category": "Video",
    "def": "Filtro che riduce la luce senza alterare i colori.",
    "longDef": "Il filtro ND, cioè a densità neutra, riduce la quantità di luce che entra nell’obiettivo senza alterare i colori in modo significativo. Serve soprattutto quando si vuole mantenere un’apertura ampia o un tempo di posa corretto anche in condizioni di forte luminosità. In video è uno strumento molto importante per controllare l’esposizione senza sacrificare l’estetica desiderata."
  },
  {
    "term": "Finale aperto",
    "category": "Sceneggiatura",
    "def": "Conclusione che lascia alcune domande senza risposta definitiva.",
    "longDef": "Il finale aperto è una conclusione che lascia irrisolti uno o più aspetti importanti della storia. Non offre una chiusura totale, ma invita lo spettatore a completare il senso del racconto con la propria interpretazione. In sceneggiatura può essere molto efficace, ma deve sembrare una scelta precisa, non una mancanza di soluzione."
  },
  {
    "term": "Finale chiuso",
    "category": "Sceneggiatura",
    "def": "Conclusione che risolve chiaramente i principali elementi narrativi.",
    "longDef": "Il finale chiuso è una conclusione che risolve in modo chiaro i principali conflitti narrativi. Lo spettatore esce dalla storia con una percezione definita di ciò che è accaduto e delle conseguenze per i personaggi. In sceneggiatura questo tipo di finale dà ordine, compiutezza e senso di conclusione."
  },
  {
    "term": "Fine cut - Montaggio definitivo",
    "category": "Montaggio",
    "def": "Versione quasi definitiva del montaggio.",
    "longDef": "Il fine cut è una versione molto più avanzata del montaggio, vicina a quella definitiva. In questa fase il ritmo è più preciso, i tagli sono più accurati e la struttura complessiva è già stabilizzata. In montaggio rappresenta il momento in cui il progetto smette di essere una bozza e comincia a prendere forma finale."
  },
  {
    "term": "Flashback",
    "category": "Sceneggiatura",
    "def": "Ritorno narrativo a un evento del passato.",
    "longDef": "Il flashback è un ritorno narrativo a un evento del passato. Viene usato per fornire informazioni, chiarire motivazioni, arricchire un personaggio o cambiare la percezione di ciò che lo spettatore ha già visto. In sceneggiatura va usato con precisione, perché interrompe il tempo principale del racconto."
  },
  {
    "term": "Focale",
    "category": "Video",
    "def": "Caratteristica dell’obiettivo che influenza angolo di campo e ingrandimento.",
    "longDef": "La focale è una caratteristica ottica dell’obiettivo che determina l’angolo di campo e il tipo di resa prospettica. Focali corte mostrano più ambiente, mentre focali lunghe stringono il campo e ingrandiscono i soggetti lontani. In video la scelta della focale incide molto sullo stile della ripresa e sulla percezione dello spazio."
  },
  {
    "term": "Foglio firma",
    "category": "Produzione",
    "def": "Documento usato per registrare presenze o consegne.",
    "longDef": "Il foglio firma è un documento usato per registrare presenze, consegne, ricevute o conferme durante la lavorazione. Può essere utile per motivi amministrativi, organizzativi o di controllo interno. In produzione è un piccolo strumento pratico, ma spesso molto utile per tenere traccia di chi c’era, quando e in quale ruolo."
  },
  {
    "term": "Foley - Rumoristica",
    "category": "Audio",
    "def": "Creazione in studio di suoni sincronizzati con l’immagine.",
    "longDef": "Il Foley è la creazione in studio di suoni sincronizzati con le azioni visibili sullo schermo, come passi, vestiti, oggetti, colpi o movimenti. Non si limita a imitare la realtà, ma spesso la rende più leggibile ed espressiva. In audio e cinema è una pratica fondamentale per dare presenza fisica e credibilità alle immagini."
  },
  {
    "term": "Foreshadowing - Anticipazione narrativa",
    "category": "Sceneggiatura",
    "def": "Tecnica narrativa che prepara in anticipo sviluppi successivi.",
    "longDef": "Il foreshadowing è una tecnica narrativa che anticipa in modo discreto eventi futuri del racconto. Può comparire come dettaglio visivo, frase, oggetto, gesto o situazione apparentemente secondaria. In sceneggiatura è molto utile perché rende la storia più compatta e fa percepire coerenza quando l’evento anticipato si compie."
  },
  {
    "term": "Fornitore",
    "category": "Produzione",
    "def": "Azienda o professionista che fornisce beni o servizi alla produzione.",
    "longDef": "Il fornitore è il soggetto esterno che mette a disposizione beni o servizi necessari al progetto. Può trattarsi di una società di noleggio, di un catering, di un trasportatore, di un tecnico o di un partner logistico. In produzione saper scegliere buoni fornitori significa ridurre problemi e aumentare affidabilità operativa."
  },
  {
    "term": "Frame rate - Frequenza dei fotogrammi",
    "category": "Video",
    "def": "Numero di fotogrammi registrati ogni secondo.",
    "longDef": "Il frame rate è il numero di fotogrammi registrati o riprodotti ogni secondo. Valori diversi producono sensazioni diverse: 24 fps danno una resa più cinematografica, mentre frame rate più alti rendono il movimento più fluido o permettono di creare slow motion. In video è un parametro fondamentale perché condiziona sia l’estetica sia le possibilità tecniche di postproduzione."
  },
  {
    "term": "Freeze frame - Fermo immagine",
    "category": "Montaggio",
    "def": "Blocco di un singolo fotogramma per creare un fermo immagine.",
    "longDef": "Il freeze frame è il blocco di un singolo fotogramma per creare un fermo immagine. Può essere usato per sottolineare un momento, interrompere il flusso, creare ironia o dare enfasi narrativa. In montaggio è una soluzione semplice ma molto espressiva, soprattutto se integrata bene nel ritmo complessivo."
  },
  {
    "term": "Frequenza di campionamento",
    "category": "Audio",
    "def": "Numero di campioni audio registrati ogni secondo.",
    "longDef": "La frequenza di campionamento indica quante volte al secondo il segnale analogico viene misurato e trasformato in dato digitale. Valori più alti permettono di registrare una quantità maggiore di informazione sonora. In audio è un parametro tecnico fondamentale perché influisce sulla qualità di acquisizione e sulla compatibilità con diversi workflow."
  },
  {
    "term": "Fruscio",
    "category": "Audio",
    "def": "Rumore continuo e leggero presente in una registrazione.",
    "longDef": "Il fruscio è un rumore leggero e continuo che può comparire in una registrazione audio. Può dipendere da apparecchiature, cavi, gain elevato, ambiente o qualità del sistema di acquisizione. In audio è un difetto fastidioso perché sporca il segnale, soprattutto nei passaggi più silenziosi o nelle registrazioni vocali."
  },
  {
    "term": "Full HD",
    "category": "Video",
    "def": "Risoluzione video di 1920 per 1080 pixel.",
    "longDef": "Il Full HD è una risoluzione video di 1920 x 1080 pixel. Per molti anni è stato lo standard principale per contenuti televisivi, web e produzione indipendente, e resta ancora oggi molto usato. In video offre un buon compromesso tra qualità, peso dei file e facilità di gestione."
  },
  {
    "term": "Fuori campo",
    "category": "Regia",
    "def": "Spazio non visibile ma suggerito o percepito nella scena.",
    "longDef": "Il fuori campo è tutto ciò che esiste nello spazio narrativo ma non viene mostrato direttamente nell’inquadratura. Può essere suggerito da suoni, sguardi, movimenti o reazioni dei personaggi. In regia è uno strumento molto potente, perché permette di evocare, far immaginare e creare tensione senza mostrare tutto esplicitamente."
  },
  {
    "term": "Gain - Guadagno",
    "category": "Audio",
    "def": "Livello di amplificazione del segnale in ingresso.",
    "longDef": "Il gain è il livello di amplificazione applicato al segnale in ingresso, prima che venga registrato. Se è troppo basso, il suono risulterà debole e poco sfruttabile; se è troppo alto, si rischiano distorsione e clipping. In audio regolare bene il gain è una delle operazioni più importanti per ottenere una registrazione pulita e gestibile."
  },
  {
    "term": "Gate - Riduzione automatica del rumore",
    "category": "Audio",
    "def": "Processore che attenua i suoni sotto una certa soglia.",
    "longDef": "Il gate è un processore che attenua o chiude il segnale quando scende sotto una certa soglia. Viene usato per ridurre rumori di fondo, rientri o suoni indesiderati presenti nei momenti di pausa. In audio è molto utile, ma va regolato con attenzione, perché se troppo aggressivo può tagliare anche parti utili del suono."
  },
  {
    "term": "Gimbal - Stabilizzatore motorizzato",
    "category": "Video",
    "def": "Supporto motorizzato che mantiene stabile la camera.",
    "longDef": "Il gimbal è un supporto motorizzato che mantiene la camera stabile durante il movimento. Permette di ottenere riprese fluide anche camminando o seguendo un soggetto in spazi complessi. In video è molto usato per scene dinamiche, videoclip, eventi e situazioni in cui si vuole combinare mobilità e pulizia dell’immagine."
  },
  {
    "term": "Grandangolo",
    "category": "Video",
    "def": "Obiettivo con ampio angolo di ripresa.",
    "longDef": "Il grandangolo è un obiettivo con ampio angolo di campo, capace di mostrare molto ambiente all’interno dell’inquadratura. Viene usato per interni stretti, paesaggi, scene dinamiche o riprese in cui si vuole accentuare la profondità spaziale. In video può dare energia e immersione, ma va gestito con attenzione per evitare distorsioni eccessive."
  },
  {
    "term": "Highlight - Alte luci",
    "category": "Video",
    "def": "Parte molto luminosa dell’immagine.",
    "longDef": "Le highlight sono le zone più luminose dell’immagine. Se sono ben gestite, mantengono dettaglio e contribuiscono alla leggibilità visiva; se invece vengono “bruciate”, perdono informazione e diventano piatte. In video controllare le highlight è fondamentale per mantenere qualità e margine di lavoro in postproduzione."
  },
  {
    "term": "Hospitality - Accoglienza ospiti",
    "category": "Produzione",
    "def": "Accoglienza e gestione del benessere di ospiti, cast o troupe.",
    "longDef": "L’hospitality riguarda l’accoglienza e il benessere pratico di ospiti, cast, troupe o collaboratori. Include aspetti come alloggio, comfort, informazioni, supporto, gestione delle esigenze personali e qualità dell’esperienza lavorativa. In produzione una buona hospitality migliora il clima, riduce stress e aiuta a far funzionare meglio il lavoro collettivo."
  },
  {
    "term": "Hyperlapse - Time-lapse in movimento",
    "category": "Video",
    "def": "Variante del time-lapse con camera in movimento.",
    "longDef": "L’hyperlapse è una variante del time-lapse in cui la camera cambia posizione tra uno scatto e l’altro. Questo produce un effetto di movimento accelerato nello spazio, spesso molto spettacolare. In video richiede precisione tecnica, ma può dare un forte senso di dinamismo e attraversamento."
  },
  {
    "term": "Importazione",
    "category": "Montaggio",
    "def": "Inserimento dei file nel progetto di montaggio.",
    "longDef": "L’importazione è il processo con cui i file vengono inseriti nel progetto di montaggio. Questo passaggio non modifica ancora il contenuto, ma lo rende disponibile all’interno del software per essere organizzato e usato. In montaggio una buona importazione è importante perché rappresenta il primo passaggio verso un workflow ordinato."
  },
  {
    "term": "Incidente scatenante",
    "category": "Sceneggiatura",
    "def": "Evento che rompe l’equilibrio iniziale e avvia la vicenda.",
    "longDef": "L’incidente scatenante è l’evento che rompe l’equilibrio iniziale e costringe la storia a partire davvero. È il momento in cui qualcosa cambia e il protagonista non può più restare fermo nella situazione precedente. In sceneggiatura ha il compito di mettere in moto l’azione e aprire il conflitto principale."
  },
  {
    "term": "Incipit",
    "category": "Sceneggiatura",
    "def": "Parte iniziale della storia che introduce tono e situazione.",
    "longDef": "L’incipit è la parte iniziale della storia, quella che introduce mondo, tono, atmosfera e prime informazioni fondamentali. Non serve solo ad avviare il racconto, ma a far capire subito allo spettatore in che tipo di esperienza sta entrando. In sceneggiatura un buon incipit deve essere chiaro, evocativo e capace di attirare attenzione."
  },
  {
    "term": "Ingaggio",
    "category": "Produzione",
    "def": "Assunzione o coinvolgimento di una figura nel progetto.",
    "longDef": "L’ingaggio è l’atto con cui una persona viene coinvolta ufficialmente nel progetto per svolgere un determinato ruolo. Può riguardare attori, tecnici, consulenti, artisti o collaboratori di varia natura. In produzione l’ingaggio non è solo una scelta creativa, ma anche un’operazione organizzativa ed economica che deve essere chiara e ben gestita."
  },
  {
    "term": "Inquadratura",
    "category": "Regia",
    "def": "Porzione di spazio ripresa dalla camera in un singolo momento.",
    "longDef": "L’inquadratura è la porzione di realtà che la camera decide di mostrare in un determinato momento. Non riguarda solo “cosa si vede”, ma anche come lo si vede: distanza, angolazione, composizione e durata influenzano il significato della scena. In regia, scegliere l’inquadratura giusta significa guidare lo sguardo dello spettatore e dargli una precisa esperienza visiva."
  },
  {
    "term": "ISO",
    "category": "Video",
    "def": "Valore che indica la sensibilità del sensore alla luce.",
    "longDef": "Gli ISO indicano la sensibilità del sensore alla luce. Aumentando il valore ISO si può girare in condizioni più buie, ma cresce anche il rischio di rumore digitale e perdita di qualità. In video, l’uso corretto degli ISO serve a trovare un equilibrio tra luminosità, pulizia dell’immagine e resa complessiva."
  },
  {
    "term": "Istogramma",
    "category": "Video",
    "def": "Grafico che mostra la distribuzione delle luci nell’immagine.",
    "longDef": "L’istogramma è un grafico che rappresenta la distribuzione della luminosità nell’immagine, dalle ombre alle alte luci. Non mostra “come è bella” l’inquadratura, ma fornisce una lettura oggettiva della sua esposizione. In video aiuta a capire se l’immagine è troppo scura, troppo chiara o sbilanciata in certe zone tonali."
  },
  {
    "term": "J-cut - Split audio a J",
    "category": "Montaggio",
    "def": "Taglio in cui l’audio della clip successiva entra prima dell’immagine.",
    "longDef": "Il J-cut è il contrario dell’L-cut: l’audio della clip successiva entra prima che l’immagine cambi. In questo modo lo spettatore percepisce in anticipo il passaggio e viene guidato dolcemente verso la scena seguente. In montaggio è un raccordo molto efficace per creare continuità, anticipazione o fluidità narrativa."
  },
  {
    "term": "Jump cut - Taglio a salto",
    "category": "Montaggio",
    "def": "Taglio che crea un salto evidente nel tempo o nel movimento.",
    "longDef": "Il jump cut è un taglio che produce un salto evidente nel tempo, nella posizione o nel movimento all’interno della stessa inquadratura o di due inquadrature molto simili. Può dare una sensazione di ellissi brusca, nervosismo o frammentazione. In montaggio può essere un errore se involontario, ma anche una scelta stilistica precisa se usato con consapevolezza."
  },
  {
    "term": "Keyframe - Fotogramma chiave",
    "category": "Montaggio",
    "def": "Punto che definisce un cambiamento di valore nel tempo.",
    "longDef": "Il keyframe è un punto che definisce un valore preciso di un parametro in un dato momento della timeline. Collegando più keyframe si possono creare variazioni progressive di opacità, volume, posizione, scala, colore e molti altri elementi. In montaggio è fondamentale per animare e controllare cambiamenti nel tempo."
  },
  {
    "term": "L-cut - Split audio a L",
    "category": "Montaggio",
    "def": "Taglio in cui l’audio della prima clip continua sulla seconda.",
    "longDef": "L’L-cut è un tipo di raccordo in cui l’audio della prima clip continua anche dopo il passaggio all’immagine della clip successiva. Questo crea un flusso più morbido e naturale tra una ripresa e l’altra. In montaggio è molto utile nei dialoghi, nelle interviste e in tutte le situazioni in cui si vuole evitare uno stacco troppo secco."
  },
  {
    "term": "Lavalier - Microfono a clip",
    "category": "Audio",
    "def": "Piccolo microfono da agganciare ai vestiti del soggetto.",
    "longDef": "Il lavalier è un piccolo microfono da agganciare ai vestiti del soggetto, vicino alla bocca. È molto usato nelle interviste, nei video didattici, negli eventi e nelle situazioni in cui il microfono deve restare poco visibile. In audio offre praticità e vicinanza alla voce, ma va gestito con attenzione per evitare fruscii e contatti con i tessuti."
  },
  {
    "term": "Liberatoria",
    "category": "Produzione",
    "def": "Documento con cui una persona o ente autorizza l’uso della propria immagine o bene.",
    "longDef": "La liberatoria è un documento con cui una persona, un ente o il proprietario di un bene autorizza l’uso della propria immagine, voce, proprietà o spazio. Serve a tutelare legalmente la produzione ed evitare contestazioni future. In ambito audiovisivo è uno strumento molto importante, soprattutto quando si gira con persone riconoscibili o in luoghi privati."
  },
  {
    "term": "Limiter - Limitatore",
    "category": "Audio",
    "def": "Processore che impedisce al segnale di superare una soglia massima.",
    "longDef": "Il limiter è un processore che impedisce al segnale audio di superare una determinata soglia massima. Viene usato per proteggere la registrazione o l’output finale da picchi troppo forti che potrebbero causare clipping. In audio è una sorta di “barriera di sicurezza”, utile soprattutto nelle fasi finali o in registrazioni imprevedibili."
  },
  {
    "term": "Line producer - Produttore di linea",
    "category": "Produzione",
    "def": "Responsabile della gestione operativa e logistica della produzione.",
    "longDef": "Il line producer è il responsabile della gestione pratica del progetto sul piano operativo e di bilancio. Supervisiona spese, calendario, reparti, fornitori e organizzazione quotidiana, assicurandosi che la lavorazione resti entro i limiti previsti. In produzione è una figura chiave perché traduce gli obiettivi generali in un sistema realmente funzionante."
  },
  {
    "term": "Linee guida",
    "category": "Regia",
    "def": "Linee visive che dirigono lo sguardo dello spettatore.",
    "longDef": "Le linee guida sono linee visive presenti nell’immagine che indirizzano naturalmente lo sguardo dello spettatore verso un punto importante. Possono essere strade, muri, corridoi, braccia, sguardi o elementi architettonici. In regia vengono sfruttate per rafforzare la composizione e rendere più leggibile la scena."
  },
  {
    "term": "Livello audio",
    "category": "Audio",
    "def": "Intensità del segnale sonoro registrato o riprodotto.",
    "longDef": "Il livello audio indica l’intensità del segnale sonoro registrato o riprodotto. Serve a capire quanto il suono sia forte, equilibrato o vicino a zone di rischio. In audio controllare i livelli è fondamentale perché una registrazione corretta parte sempre da un buon equilibrio tra volume, chiarezza e sicurezza tecnica."
  },
  {
    "term": "Location scouting - Ricerca delle location",
    "category": "Produzione",
    "def": "Ricerca e valutazione dei luoghi adatti alle riprese.",
    "longDef": "Il location scouting è l’attività di ricerca e valutazione dei luoghi in cui si potrebbero svolgere le riprese. Non si tratta solo di trovare posti “belli”, ma di verificare accessibilità, luce, rumore, spazi, permessi e fattibilità operativa. In produzione è una fase decisiva, perché una location adatta può facilitare molto il lavoro sul set."
  },
  {
    "term": "Log - Profilo logaritmico",
    "category": "Video",
    "def": "Profilo video piatto pensato per aumentare la flessibilità in postproduzione.",
    "longDef": "Il Log è un profilo di registrazione che produce un’immagine poco contrastata e poco satura, pensata per conservare più informazioni possibili nelle luci e nelle ombre. A prima vista può sembrare spenta, ma offre grande flessibilità in color correction e grading. In video si usa quando si vuole ottenere il massimo margine creativo e tecnico in postproduzione."
  },
  {
    "term": "Logline - Sintesi narrativa",
    "category": "Sceneggiatura",
    "def": "Riassunto molto breve della storia in una o due frasi.",
    "longDef": "La logline è una sintesi molto breve della storia, di solito composta da una o due frasi. Serve a comunicare in modo immediato il cuore del progetto, facendo capire chi è il protagonista, qual è il suo obiettivo e quale ostacolo si trova davanti. In sceneggiatura è uno strumento prezioso perché obbliga a chiarire l’essenza narrativa del racconto."
  },
  {
    "term": "Loudness - Volume percepito",
    "category": "Audio",
    "def": "Percezione complessiva del volume di un contenuto audio.",
    "longDef": "La loudness è la percezione complessiva del volume da parte dell’ascoltatore. Non dipende solo dai picchi, ma dalla distribuzione energetica del segnale nel tempo e nelle frequenze. In audio è un concetto molto importante, soprattutto per piattaforme, broadcast e contenuti online che devono rispettare standard di ascolto coerenti."
  },
  {
    "term": "LUT - Tabella di conversione colore",
    "category": "Video",
    "def": "Tabella colore usata per convertire o stilizzare l’immagine.",
    "longDef": "La LUT, cioè Look-Up Table, è una tabella che trasforma i valori colore dell’immagine secondo una determinata interpretazione. Può servire a convertire un file Log in un’immagine normale oppure ad applicare un look stilizzato. In video è uno strumento molto diffuso, ma va usato con criterio, perché non sostituisce un vero lavoro di correzione colore."
  },
  {
    "term": "MacGuffin",
    "category": "Sceneggiatura",
    "def": "Oggetto o obiettivo che muove la trama senza essere il vero centro tematico.",
    "longDef": "Il MacGuffin è un oggetto, un obiettivo o un elemento narrativo che mette in moto la trama ma non rappresenta il vero centro profondo della storia. I personaggi gli attribuiscono grande importanza, ma il suo valore sta soprattutto nel fatto che fa agire il racconto. In sceneggiatura è uno strumento pratico per creare movimento e motivazione."
  },
  {
    "term": "Marker - Marcatore",
    "category": "Montaggio",
    "def": "Segno inserito in timeline per indicare un punto importante.",
    "longDef": "Il marker è un segno inserito nella timeline o su una clip per evidenziare un punto importante. Può servire per ricordare un problema, segnare un cambio, indicare un ritmo, una battuta o un punto di sincronizzazione. In montaggio è uno strumento semplice ma molto pratico per orientarsi meglio nel progetto."
  },
  {
    "term": "Maschera",
    "category": "Montaggio",
    "def": "Selezione parziale dell’immagine usata per effetti o correzioni.",
    "longDef": "La maschera è uno strumento che permette di selezionare solo una parte dell’immagine per applicare effetti, correzioni o modifiche localizzate. Può avere forme semplici o complesse e può anche essere animata nel tempo. In montaggio e postproduzione è molto utile quando si vuole intervenire su un’area specifica senza toccare il resto della clip."
  },
  {
    "term": "Master",
    "category": "Montaggio",
    "def": "Versione finale di riferimento da cui derivano le esportazioni.",
    "longDef": "Il master è la versione finale di riferimento del progetto, quella da cui derivano tutte le eventuali copie o esportazioni successive. Deve essere completo, corretto e realizzato con le impostazioni migliori per conservazione e distribuzione. In montaggio il master è il punto d’arrivo del lavoro, cioè il file che rappresenta davvero la versione definitiva dell’opera."
  },
  {
    "term": "Match cut - Taglio di raccordo visivo",
    "category": "Montaggio",
    "def": "Taglio che collega due immagini con somiglianze visive o di movimento.",
    "longDef": "Il match cut è un taglio che collega due inquadrature attraverso una somiglianza visiva, di forma, di gesto, di direzione o di significato. Il passaggio risulta forte perché crea continuità o contrasto tra due immagini apparentemente diverse. In montaggio è una soluzione molto elegante e potente, capace di unire spazio, tempo e idee."
  },
  {
    "term": "Media browser - Navigatore multimediale",
    "category": "Montaggio",
    "def": "Pannello che permette di navigare e importare file multimediali.",
    "longDef": "Il media browser è il pannello del software che permette di navigare tra i file e importarli nel progetto. Aiuta a vedere struttura delle cartelle, supporti esterni e materiali disponibili senza uscire dal programma. In montaggio è utile perché semplifica l’accesso alle clip e riduce errori nella fase di acquisizione del materiale."
  },
  {
    "term": "Messa a fuoco",
    "category": "Video",
    "def": "Regolazione che rende nitido un soggetto.",
    "longDef": "La messa a fuoco è la regolazione che rende nitido un soggetto o una parte dell’immagine. Una messa a fuoco precisa guida l’attenzione dello spettatore e rende il contenuto visivamente chiaro. In video può essere gestita manualmente o automaticamente, ma in entrambi i casi è una scelta decisiva per la leggibilità e l’efficacia della ripresa."
  },
  {
    "term": "Mezzitoni",
    "category": "Video",
    "def": "Valori intermedi tra ombre e alte luci.",
    "longDef": "I mezzitoni sono i valori intermedi tra ombre e alte luci. Spesso contengono molte delle informazioni più importanti per la pelle, i volti, gli oggetti e la percezione generale dell’immagine. In video una buona gestione dei mezzitoni aiuta a ottenere una resa naturale, equilibrata e piacevole."
  },
  {
    "term": "Mezzo busto",
    "category": "Regia",
    "def": "Inquadratura che riprende il soggetto circa dalla vita in su.",
    "longDef": "Il mezzo busto è un’inquadratura che riprende il soggetto circa dalla vita in su. È molto usato nei dialoghi, nelle interviste e nelle scene in cui contano sia l’espressione del volto sia una parte del linguaggio del corpo. In regia è una misura equilibrata, perché mantiene vicinanza senza perdere del tutto il contesto."
  },
  {
    "term": "Microfono a condensatore",
    "category": "Audio",
    "def": "Microfono sensibile e dettagliato, spesso usato in ambienti controllati.",
    "longDef": "Il microfono a condensatore è un microfono molto sensibile, capace di catturare dettagli sonori fini e sfumature timbriche. Per questo viene spesso usato in studio, nelle registrazioni vocali, negli ambienti controllati e nelle situazioni in cui serve grande precisione. In audio offre qualità elevata, ma richiede attenzione maggiore a rumori, ambiente e alimentazione."
  },
  {
    "term": "Microfono dinamico",
    "category": "Audio",
    "def": "Microfono robusto, adatto a fonti sonore forti e ambienti difficili.",
    "longDef": "Il microfono dinamico è un tipo di microfono robusto, resistente e adatto a gestire livelli sonori elevati. È molto usato dal vivo, in ambienti difficili o con sorgenti forti, perché tende a essere meno delicato e meno sensibile ai rumori ambientali rispetto ad altri modelli. In audio è apprezzato per affidabilità, semplicità e carattere."
  },
  {
    "term": "Microfono shotgun",
    "category": "Audio",
    "def": "Microfono direzionale usato per catturare il suono frontale.",
    "longDef": "Il microfono shotgun è un microfono molto direzionale, progettato per catturare soprattutto il suono proveniente dalla parte frontale. Viene usato spesso su set cinematografici, documentari e interviste, perché permette di isolare meglio la voce o la fonte sonora principale. In audio è uno strumento molto utile, ma funziona bene solo se posizionato correttamente."
  },
  {
    "term": "Midpoint - Punto centrale della storia",
    "category": "Sceneggiatura",
    "def": "Punto centrale della trama che cambia la posta in gioco.",
    "longDef": "Il midpoint è il punto centrale della storia, spesso collocato a metà del racconto. Di solito porta una rivelazione, una svolta o un cambiamento che modifica la direzione del protagonista e alza la posta in gioco. In sceneggiatura è importante perché impedisce alla parte centrale di restare piatta o ripetitiva."
  },
  {
    "term": "Mise-en-scène - Messa in scena",
    "category": "Regia",
    "def": "Organizzazione visiva della scena: attori, spazio, luci, oggetti e costumi.",
    "longDef": "La mise-en-scène è l’insieme di tutti gli elementi visivi presenti nella scena: attori, costumi, luci, oggetti, arredamento, spazio e loro disposizione. È il modo in cui il mondo narrativo viene messo in scena davanti alla camera. In regia, curare la mise-en-scène significa dare coerenza estetica e significato visivo alla storia."
  },
  {
    "term": "Missaggio",
    "category": "Audio",
    "def": "Bilanciamento finale di dialoghi, musiche ed effetti sonori.",
    "longDef": "Il missaggio è la fase in cui dialoghi, musiche, effetti e ambienti vengono bilanciati tra loro per creare il risultato sonoro finale. Include regolazione dei livelli, equalizzazione, compressione, spazialità e coerenza complessiva del progetto. In audio è uno dei momenti più importanti, perché trasforma materiali separati in un’esperienza sonora unica, chiara ed efficace."
  },
  {
    "term": "Mixer audio",
    "category": "Audio",
    "def": "Dispositivo o software che gestisce più segnali sonori insieme.",
    "longDef": "Il mixer audio è il dispositivo o software che permette di gestire più segnali sonori contemporaneamente. Consente di regolare volumi, equalizzazione, invii, panoramica e altri parametri fondamentali. In audio è uno strumento centrale, perché permette di bilanciare e combinare correttamente tutte le fonti presenti in un progetto."
  },
  {
    "term": "Moiré - Interferenza visiva",
    "category": "Video",
    "def": "Effetto visivo indesiderato causato da pattern molto fitti.",
    "longDef": "Il moiré è un disturbo visivo che compare quando l’immagine riprende pattern molto fitti e regolari, come tessuti, grate o superfici dettagliate. Può manifestarsi con ondulazioni o effetti strani nei colori e nelle texture. In video è un artefatto fastidioso perché rende l’immagine artificialmente instabile o poco credibile."
  },
  {
    "term": "Monitor esterno",
    "category": "Video",
    "def": "Schermo aggiuntivo per vedere meglio immagine e parametri.",
    "longDef": "Il monitor esterno è uno schermo aggiuntivo collegato alla camera per vedere meglio l’immagine durante la ripresa. Offre spesso una visione più ampia, più precisa e più utile per controllare esposizione, fuoco e composizione. In video è molto apprezzato soprattutto nei lavori più curati o quando più persone devono valutare l’inquadratura."
  },
  {
    "term": "Monitoraggio in cuffia",
    "category": "Audio",
    "def": "Ascolto diretto del suono durante la registrazione.",
    "longDef": "Il monitoraggio in cuffia è l’ascolto diretto del suono durante la registrazione o la ripresa. Permette di accorgersi subito di problemi come ronzii, fruscii, distorsioni, rumori ambientali o microfoni mal posizionati. In audio è una pratica indispensabile, perché fidarsi solo dei livelli visivi non basta a garantire una buona registrazione."
  },
  {
    "term": "Monopiede",
    "category": "Video",
    "def": "Supporto a una gamba che offre stabilità leggera e mobilità.",
    "longDef": "Il monopiede è un supporto a una sola gamba che offre stabilità parziale ma maggiore mobilità rispetto al treppiede. È utile quando si vuole alleggerire il carico o muoversi rapidamente mantenendo comunque un minimo di controllo sull’immagine. In video viene usato spesso in eventi, documentari e riprese veloci sul campo."
  },
  {
    "term": "Montaggio alternato",
    "category": "Montaggio",
    "def": "Passaggio ripetuto tra due o più azioni in luoghi diversi.",
    "longDef": "Il montaggio alternato consiste nel passare ripetutamente da un’azione a un’altra, spesso in luoghi differenti ma legate da una stessa linea narrativa o temporale. Anche se spesso viene confuso con il montaggio parallelo, è usato in modo più pratico per seguire sviluppi simultanei o convergenti. In montaggio aiuta a tenere viva l’attenzione e a far avanzare più linee narrative insieme."
  },
  {
    "term": "Montaggio parallelo",
    "category": "Montaggio",
    "def": "Alternanza di azioni diverse mostrate come simultanee o collegate.",
    "longDef": "Il montaggio parallelo alterna due o più azioni diverse che sembrano svolgersi nello stesso momento o che vengono messe in relazione tra loro. Serve a creare tensione, confronto, ironia o connessione narrativa tra eventi separati. In montaggio è una tecnica molto importante perché permette di costruire significati che non nascono da una singola scena, ma dal confronto tra scene diverse."
  },
  {
    "term": "Motivazione",
    "category": "Sceneggiatura",
    "def": "Ragione interna che spinge il personaggio ad agire.",
    "longDef": "La motivazione è la ragione profonda che spinge un personaggio a cercare qualcosa o a comportarsi in un certo modo. Non coincide sempre con l’obiettivo visibile, ma ne costituisce la base emotiva, psicologica o morale. In sceneggiatura una buona motivazione rende le azioni del personaggio credibili e coerenti."
  },
  {
    "term": "Movimento di macchina",
    "category": "Regia",
    "def": "Spostamento della camera durante la ripresa.",
    "longDef": "Il movimento di macchina è lo spostamento della camera durante la ripresa. Può servire a seguire un personaggio, esplorare uno spazio, creare tensione oppure dare ritmo e dinamismo alla scena. In regia, un movimento ben motivato rafforza il racconto visivo; se usato senza necessità, rischia invece di distrarre lo spettatore."
  },
  {
    "term": "Multicam - Montaggio multicamera",
    "category": "Montaggio",
    "def": "Montaggio di una scena ripresa da più camere sincronizzate.",
    "longDef": "Il multicam è una modalità di montaggio che permette di lavorare su una scena ripresa da più camere sincronizzate. Il montatore può scegliere di volta in volta quale angolazione usare, mantenendo allineati tutti i flussi. In montaggio multicamera è molto utile per interviste, concerti, eventi, dialoghi e situazioni in cui più punti di vista devono convivere nello stesso tempo."
  },
  {
    "term": "Narratore",
    "category": "Sceneggiatura",
    "def": "Voce o presenza che racconta gli eventi della storia.",
    "longDef": "Il narratore è la voce o la presenza che racconta gli eventi della storia. Può essere interno alla vicenda, esterno, onnisciente, limitato o persino implicito nel modo in cui il racconto è costruito. In sceneggiatura la scelta del narratore condiziona il punto di vista e il rapporto tra spettatore e storia."
  },
  {
    "term": "Narratore inaffidabile",
    "category": "Sceneggiatura",
    "def": "Narratore che offre una versione parziale o distorta dei fatti.",
    "longDef": "Il narratore inaffidabile è un narratore che fornisce una versione parziale, distorta o falsa dei fatti. Questo può dipendere da menzogna, autoinganno, memoria alterata o interpretazione soggettiva. In sceneggiatura è un dispositivo molto interessante perché crea ambiguità e costringe lo spettatore a riconsiderare ciò che credeva vero."
  },
  {
    "term": "Nested sequence - Sequenza nidificata",
    "category": "Montaggio",
    "def": "Sequenza inserita dentro un’altra sequenza come singolo elemento.",
    "longDef": "La nested sequence è una sequenza inserita dentro un’altra come se fosse una singola clip. Questo permette di raggruppare più elementi complessi e trattarli come un blocco unico. In montaggio è molto utile per organizzare progetti articolati, applicare effetti globali o semplificare la timeline principale."
  },
  {
    "term": "Noise floor - Rumore di fondo",
    "category": "Audio",
    "def": "Livello minimo di rumore presente nel sistema audio.",
    "longDef": "Il noise floor è il livello minimo di rumore presente in un sistema audio anche quando non c’è un segnale utile evidente. Rappresenta il “fondo” costante su cui poi si collocano i suoni registrati. In audio un noise floor basso è desiderabile perché permette di lavorare con maggiore pulizia e dinamica."
  },
  {
    "term": "Noleggio attrezzatura",
    "category": "Produzione",
    "def": "Affitto temporaneo di strumenti tecnici per la produzione.",
    "longDef": "Il noleggio attrezzatura è l’affitto temporaneo di strumenti tecnici necessari alla produzione, come camere, luci, microfoni, monitor, supporti o ottiche. È una soluzione molto comune, perché permette di accedere a mezzi professionali senza doverli acquistare. In produzione va pianificato bene, tenendo conto di costi, disponibilità, tempi di ritiro, restituzione e assistenza."
  },
  {
    "term": "Normalizzazione",
    "category": "Audio",
    "def": "Regolazione del livello audio fino a un valore prestabilito.",
    "longDef": "La normalizzazione è un processo che porta il livello audio complessivo a un valore prestabilito. Serve a uniformare i file o a ottimizzare il volume senza superare una soglia tecnica precisa. In audio è un’operazione pratica e frequente, ma non sostituisce un vero lavoro di mixaggio o bilanciamento dinamico."
  },
  {
    "term": "Nulla osta",
    "category": "Produzione",
    "def": "Documento ufficiale che autorizza una determinata attività.",
    "longDef": "Il nulla osta è un’autorizzazione formale rilasciata da un ente, un proprietario o un soggetto competente per permettere una determinata attività. È diverso da altri documenti più generici perché certifica in modo esplicito che non ci sono impedimenti all’azione prevista. In produzione può essere richiesto in molte situazioni amministrative o organizzative."
  },
  {
    "term": "Obiettivo",
    "category": "Video",
    "def": "Elemento ottico della camera che convoglia la luce sul sensore.",
    "longDef": "L’obiettivo è il componente ottico che raccoglie e convoglia la luce verso il sensore. Non è solo uno strumento tecnico, ma uno degli elementi che più influenzano il look dell’immagine, attraverso focale, apertura, nitidezza e resa del contrasto. In video scegliere l’obiettivo giusto significa decidere come il mondo verrà trasformato in immagine."
  },
  {
    "term": "Obiettivo del personaggio",
    "category": "Sceneggiatura",
    "def": "Risultato concreto che un personaggio cerca di ottenere.",
    "longDef": "L’obiettivo del personaggio è ciò che un personaggio vuole ottenere in modo concreto, visibile o riconoscibile. Può riguardare un desiderio materiale, una conquista, una fuga, una relazione o una verità da raggiungere. In sceneggiatura l’obiettivo aiuta a costruire azione, conflitto e direzione del racconto."
  },
  {
    "term": "Offline edit - Montaggio offline",
    "category": "Montaggio",
    "def": "Fase di montaggio preliminare con materiali leggeri o provvisori.",
    "longDef": "L’offline edit è la fase preliminare del montaggio, spesso realizzata con file leggeri o provvisori per costruire struttura e ritmo del progetto. In questa fase l’attenzione è concentrata sul racconto, non ancora sulla qualità finale dell’immagine. In montaggio è molto utile perché consente di lavorare in modo fluido anche con materiali pesanti o complessi."
  },
  {
    "term": "Ombre",
    "category": "Video",
    "def": "Zone scure dell’immagine con bassa luminosità.",
    "longDef": "Le ombre sono le parti più scure dell’immagine. Possono dare profondità, contrasto e atmosfera, ma se risultano troppo chiuse rischiano di perdere dettaglio e diventare blocchi neri indistinti. In video lavorare bene sulle ombre significa trovare un equilibrio tra leggibilità e resa espressiva."
  },
  {
    "term": "Omnidirezionale",
    "category": "Audio",
    "def": "Pattern che capta il suono da tutte le direzioni.",
    "longDef": "L’omnidirezionale è un pattern microfonico che capta il suono in modo uniforme da tutte le direzioni. Questo lo rende utile quando si vuole registrare un ambiente naturale, un gruppo di persone o una sorgente senza una direzione dominante. In audio offre una resa spesso più aperta e naturale, ma richiede maggiore controllo dell’ambiente circostante."
  },
  {
    "term": "Online edit - Montaggio online",
    "category": "Montaggio",
    "def": "Fase finale di rifinitura con materiali alla massima qualità.",
    "longDef": "L’online edit è la fase finale in cui il progetto viene rifinito usando i materiali alla massima qualità disponibile. Qui si consolidano conform, colori, effetti, testi, controlli tecnici ed esportazione definitiva. In montaggio rappresenta il passaggio dalla costruzione narrativa alla finitura professionale del progetto."
  },
  {
    "term": "Opacità",
    "category": "Montaggio",
    "def": "Livello di trasparenza di una clip video.",
    "longDef": "L’opacità indica quanto una clip è visibile o trasparente rispetto a ciò che sta sotto di essa. Riducendola si possono creare sovrimpressioni, dissolvenze o combinazioni tra più livelli video. In montaggio è un parametro molto usato sia per effetti semplici sia per costruzioni visive più complesse."
  },
  {
    "term": "Ordine del giorno",
    "category": "Produzione",
    "def": "Programma dettagliato delle attività previste in una giornata.",
    "longDef": "L’ordine del giorno è il programma dettagliato delle attività previste in una specifica giornata di lavoro. Può includere scene da girare, orari, pause, spostamenti, priorità e sequenza delle operazioni. In produzione serve a dare un ritmo preciso al set e a evitare dispersioni o sovrapposizioni inutili."
  },
  {
    "term": "Ostacolo",
    "category": "Sceneggiatura",
    "def": "Elemento che impedisce al personaggio di raggiungere il suo obiettivo.",
    "longDef": "L’ostacolo è tutto ciò che impedisce al personaggio di ottenere ciò che vuole. Può essere esterno, come un avversario o una circostanza, oppure interno, come paura, senso di colpa o indecisione. In sceneggiatura è indispensabile, perché senza ostacoli il percorso del personaggio non avrebbe tensione."
  },
  {
    "term": "Over the shoulder - Inquadratura sopra la spalla",
    "category": "Regia",
    "def": "Ripresa effettuata da dietro la spalla di un personaggio.",
    "longDef": "L’over the shoulder è un’inquadratura realizzata da dietro la spalla di un personaggio, verso ciò che sta guardando o verso l’interlocutore. La spalla in primo piano crea profondità e fa percepire la presenza fisica del personaggio in scena. È molto usata nei dialoghi, perché avvicina emotivamente lo spettatore alla conversazione."
  },
  {
    "term": "Panoramica",
    "category": "Regia",
    "def": "Movimento della camera fissa sul proprio asse, in orizzontale o verticale.",
    "longDef": "La panoramica è un movimento della camera che ruota sul proprio asse senza spostarsi nello spazio. Può essere orizzontale o verticale e viene usata per mostrare un ambiente, seguire un soggetto o rivelare gradualmente un elemento importante. In regia è uno strumento semplice ma efficace per accompagnare lo sguardo dello spettatore."
  },
  {
    "term": "Partnership - Collaborazione produttiva",
    "category": "Produzione",
    "def": "Collaborazione tra soggetti che condividono obiettivi o risorse.",
    "longDef": "La partnership è una collaborazione tra soggetti diversi che condividono obiettivi, risorse o vantaggi legati al progetto. Può coinvolgere enti culturali, aziende, associazioni, scuole, spazi o professionisti. In produzione una partnership ben costruita rafforza il progetto e amplia le sue possibilità operative o promozionali."
  },
  {
    "term": "Pausa sonora",
    "category": "Audio",
    "def": "Assenza o riduzione del suono usata con funzione espressiva.",
    "longDef": "La pausa sonora è un momento di assenza o forte riduzione del suono all’interno di una scena o di un montaggio. Non è semplicemente “silenzio”, ma una scelta espressiva che può creare tensione, concentrazione, sospensione o sorpresa. In audio è uno strumento molto potente, perché anche il vuoto sonoro ha un forte valore narrativo."
  },
  {
    "term": "Payoff - Risoluzione di un elemento preparato",
    "category": "Sceneggiatura",
    "def": "Ritorno narrativo di un elemento preparato in precedenza.",
    "longDef": "Il payoff è il momento in cui un elemento introdotto in precedenza produce il suo effetto narrativo. È la “ricompensa” del setup, cioè il punto in cui qualcosa preparato prima trova compimento o significato. In sceneggiatura un buon payoff dà allo spettatore una sensazione di coerenza, intelligenza e soddisfazione narrativa."
  },
  {
    "term": "Peaking - Evidenziazione del fuoco",
    "category": "Video",
    "def": "Aiuto visivo che evidenzia le aree a fuoco.",
    "longDef": "Il peaking è un aiuto visivo che evidenzia sul monitor i bordi delle zone più nitide dell’immagine. Serve a capire rapidamente quali parti sono a fuoco, specialmente quando si lavora in manual focus. In video è uno strumento praticissimo, perché rende più sicura e veloce la gestione della messa a fuoco sul set."
  },
  {
    "term": "Permessi",
    "category": "Produzione",
    "def": "Autorizzazioni necessarie per girare in certi luoghi o condizioni.",
    "longDef": "I permessi sono le autorizzazioni necessarie per girare in determinati luoghi o in particolari condizioni. Possono riguardare spazi pubblici, proprietà private, uso di droni, occupazione suolo, riprese con traffico o altre situazioni regolamentate. In produzione è fondamentale ottenerli correttamente, perché lavorare senza autorizzazione può bloccare o compromettere l’intero progetto."
  },
  {
    "term": "Permesso occupazione suolo",
    "category": "Produzione",
    "def": "Autorizzazione per usare spazi pubblici durante le riprese.",
    "longDef": "Il permesso di occupazione suolo è l’autorizzazione necessaria per utilizzare temporaneamente uno spazio pubblico con mezzi, attrezzature, transenne o strutture di produzione. È richiesto quando il set interferisce con il normale uso dello spazio urbano. In produzione è un passaggio spesso decisivo, soprattutto nelle riprese in esterni cittadini."
  },
  {
    "term": "Permuta",
    "category": "Produzione",
    "def": "Scambio di beni o servizi senza pagamento diretto.",
    "longDef": "La permuta è uno scambio di beni o servizi senza un pagamento diretto in denaro. In produzione può avvenire, per esempio, quando una location o un fornitore offre qualcosa in cambio di visibilità, contenuti o altre forme di collaborazione. È una soluzione utile in certi progetti, ma va comunque formalizzata con chiarezza."
  },
  {
    "term": "Personaggio",
    "category": "Sceneggiatura",
    "def": "Figura che agisce all’interno della storia.",
    "longDef": "Il personaggio è una figura che agisce, desidera, sceglie e subisce conseguenze all’interno della storia. Non è solo qualcuno che “appare” nella trama, ma una presenza con funzione narrativa, caratteristiche e relazioni. In sceneggiatura un personaggio ben costruito rende più credibile e coinvolgente l’intero racconto."
  },
  {
    "term": "Phantom power - Alimentazione Phantom",
    "category": "Audio",
    "def": "Alimentazione necessaria per molti microfoni a condensatore.",
    "longDef": "La phantom power è l’alimentazione elettrica necessaria a molti microfoni a condensatore per funzionare correttamente. Viene inviata attraverso il cavo XLR senza richiedere alimentazioni separate. In audio è importante conoscerla bene, perché attivarla o disattivarla nel momento giusto è essenziale per usare correttamente certi microfoni e proteggere l’attrezzatura."
  },
  {
    "term": "Piano americano",
    "category": "Regia",
    "def": "Inquadratura che mostra il personaggio circa dalle ginocchia in su.",
    "longDef": "Il piano americano riprende il personaggio più o meno dalle ginocchia in su. Storicamente è stato usato molto nel western, perché permetteva di vedere anche la fondina del personaggio. Oggi è utile quando si vuole mostrare bene il corpo, la postura e l’azione, senza allontanarsi troppo dal soggetto."
  },
  {
    "term": "Piano B",
    "category": "Produzione",
    "def": "Soluzione alternativa pronta in caso di imprevisti.",
    "longDef": "Il Piano B è la soluzione alternativa già pronta nel caso in cui il piano principale non sia più realizzabile. Può riguardare meteo, location, assenze, guasti tecnici, ritardi o altri imprevisti. In produzione averne uno non è pessimismo, ma organizzazione intelligente: permette di reagire rapidamente senza perdere la giornata."
  },
  {
    "term": "Piano di backup - Piano di riserva",
    "category": "Produzione",
    "def": "Soluzione organizzativa alternativa pronta in caso di guasti o assenze.",
    "longDef": "Il piano di backup è l’insieme delle soluzioni alternative predisposte per affrontare problemi tecnici, assenze, perdita dati o imprevisti organizzativi. Può riguardare attrezzature di riserva, copie dei file, personale sostitutivo o location secondarie. In produzione è una forma di prevenzione concreta che riduce i danni quando qualcosa va storto."
  },
  {
    "term": "Piano di lavorazione",
    "category": "Produzione",
    "def": "Programma organizzato delle giornate di ripresa.",
    "longDef": "Il piano di lavorazione è il programma che organizza le giornate di ripresa in modo pratico e cronologico. Tiene conto di attori, location, attrezzature, disponibilità e priorità produttive. In produzione è essenziale perché trasforma la sceneggiatura in un calendario concreto e realizzabile."
  },
  {
    "term": "Piano logistico",
    "category": "Produzione",
    "def": "Schema operativo per coordinare spazi, tempi e risorse.",
    "longDef": "Il piano logistico è lo schema generale che coordina spazi, tempi, materiali, accessi, parcheggi, punti di appoggio e distribuzione pratica delle risorse. Serve a rendere possibile il lavoro di reparti diversi in modo ordinato e senza intralci. In produzione è uno strumento strategico, specialmente nei set complessi o in location delicate."
  },
  {
    "term": "Piano sequenza",
    "category": "Regia",
    "def": "Scena realizzata in un’unica ripresa senza tagli visibili.",
    "longDef": "Il piano sequenza è una scena raccontata in un’unica ripresa continua, senza stacchi di montaggio visibili. Richiede una forte preparazione di regia, movimenti precisi di attori e camera e un controllo rigoroso del tempo scenico. Quando funziona, crea immersione, tensione e una sensazione di continuità molto potente."
  },
  {
    "term": "Piano sicurezza",
    "category": "Produzione",
    "def": "Misure previste per prevenire rischi sul set.",
    "longDef": "Il piano sicurezza raccoglie le misure previste per ridurre rischi e proteggere persone, attrezzature e luoghi durante la lavorazione. Tiene conto di accessi, elettricità, movimenti di mezzi, scene particolari, numeri di emergenza e procedure di comportamento. In produzione è uno strumento serio e necessario, non un semplice adempimento formale."
  },
  {
    "term": "Piano trasporti",
    "category": "Produzione",
    "def": "Organizzazione dei mezzi e degli spostamenti di persone e materiali.",
    "longDef": "Il piano trasporti organizza in modo preciso come si muoveranno persone, veicoli, materiali e attrezzature durante la lavorazione. Tiene conto di orari, percorsi, ritiri, consegne, parcheggi, carico e scarico. In produzione è molto importante perché una logistica dei trasporti mal gestita può mandare in crisi anche un set ben preparato."
  },
  {
    "term": "Picco",
    "category": "Audio",
    "def": "Punto massimo raggiunto dal segnale audio.",
    "longDef": "Il picco è il punto massimo raggiunto dal segnale audio in un determinato momento. Alcuni picchi sono normali, soprattutto nei suoni dinamici, ma se superano certi limiti possono causare clipping o perdita di qualità. In audio monitorare i picchi serve a proteggere la registrazione e a mantenere il segnale entro una zona utile."
  },
  {
    "term": "Pitch",
    "category": "Sceneggiatura",
    "def": "Presentazione sintetica e coinvolgente di un progetto narrativo.",
    "longDef": "Il pitch è una presentazione sintetica e coinvolgente di un progetto, pensata per suscitare interesse in chi ascolta. Non è solo un riassunto, ma un modo per trasmettere il potenziale della storia, il tono, l’originalità e il motivo per cui vale la pena svilupparla. In ambito professionale viene usato per proporre un film, una serie o un corto a produttori, collaboratori o docenti."
  },
  {
    "term": "Postproduzione",
    "category": "Produzione",
    "def": "Fase successiva alle riprese dedicata a montaggio e finiture.",
    "longDef": "La postproduzione è la fase successiva alle riprese, in cui il materiale viene montato, corretto, mixato, rifinito ed esportato. Include attività come montaggio video, trattamento audio, color correction, effetti, titoli e finalizzazione. In produzione è la fase in cui il progetto prende la sua forma definitiva e trova il proprio equilibrio espressivo."
  },
  {
    "term": "POV - Punto di vista",
    "category": "Regia",
    "def": "Inquadratura che mostra ciò che vede un personaggio.",
    "longDef": "POV, cioè point of view, indica un’inquadratura che mostra ciò che vede un personaggio. È una scelta registica che crea immedesimazione, perché lo spettatore osserva il mondo attraverso gli occhi del soggetto. Viene spesso usata per aumentare tensione, coinvolgimento emotivo o soggettività del racconto."
  },
  {
    "term": "Preamplificatore",
    "category": "Audio",
    "def": "Circuito che aumenta il livello di un segnale microfonico.",
    "longDef": "Il preamplificatore è il circuito che aumenta un segnale microfonico, normalmente molto debole, portandolo a un livello adatto alla registrazione o elaborazione. La qualità del preamplificatore influisce molto sulla pulizia, sul rumore e sul carattere del suono acquisito. In audio è una componente spesso poco visibile, ma decisiva per il risultato finale."
  },
  {
    "term": "Premessa narrativa",
    "category": "Sceneggiatura",
    "def": "Concetto di base su cui si fonda il racconto.",
    "longDef": "La premessa narrativa è il concetto di base da cui nasce la storia. Definisce la situazione iniziale, l’idea portante o la condizione speciale su cui si costruisce il racconto. In sceneggiatura è importante perché racchiude il potenziale drammatico del progetto già nella sua forma più essenziale."
  },
  {
    "term": "Premonizione",
    "category": "Sceneggiatura",
    "def": "Indizio che anticipa un evento futuro della storia.",
    "longDef": "La premonizione è un’intuizione o percezione anticipata di qualcosa che accadrà più avanti. Può avere un tono realistico, simbolico, psicologico o soprannaturale, a seconda del genere della storia. In sceneggiatura serve a creare attesa e a caricare certi momenti di un significato futuro."
  },
  {
    "term": "Preproduzione",
    "category": "Produzione",
    "def": "Fase preparatoria che precede le riprese.",
    "longDef": "La preproduzione è la fase di preparazione che precede le riprese vere e proprie. In questo periodo si organizzano cast, crew, piano di lavorazione, location, attrezzature, documenti, scelte tecniche e pianificazione economica. In produzione è la fase che determina gran parte dell’efficienza del lavoro futuro: una preproduzione debole genera quasi sempre caos sul set."
  },
  {
    "term": "Presa diretta",
    "category": "Audio",
    "def": "Registrazione del suono durante le riprese.",
    "longDef": "La presa diretta è la registrazione del suono eseguita nello stesso momento in cui si girano le immagini. Include dialoghi, rumori d’ambiente e suoni prodotti realmente durante la scena. In ambito audiovisivo è molto importante perché conserva naturalezza e realismo, ma richiede grande attenzione tecnica sul set."
  },
  {
    "term": "Preventivo",
    "category": "Produzione",
    "def": "Documento che dettaglia le spese previste.",
    "longDef": "Il preventivo è un documento che dettaglia le spese previste per una lavorazione o per una parte specifica del progetto. A differenza del budget generale, può riferirsi anche a un singolo reparto, servizio o fornitore. In produzione è utile per confrontare costi, prendere decisioni operative e tenere sotto controllo la spesa."
  },
  {
    "term": "Primo piano",
    "category": "Regia",
    "def": "Inquadratura ravvicinata che mette in evidenza il volto o l’espressione.",
    "longDef": "Il primo piano è un’inquadratura ravvicinata che mette al centro il volto del personaggio e le sue espressioni. È uno degli strumenti più forti della regia per trasmettere emozione, tensione, fragilità o intensità psicologica. Riducendo la presenza dell’ambiente, concentra l’attenzione dello spettatore sullo stato interiore del soggetto."
  },
  {
    "term": "Producer - Produttore",
    "category": "Produzione",
    "def": "Figura che coordina risorse, tempi e aspetti produttivi.",
    "longDef": "Il producer è la figura che coordina e sostiene il progetto sul piano produttivo, economico e organizzativo. A seconda della struttura può avere anche un ruolo decisionale importante sullo sviluppo e sul posizionamento dell’opera. In produzione è spesso la persona che tiene insieme visione, risorse e possibilità concrete."
  },
  {
    "term": "Production manager - Responsabile di produzione",
    "category": "Produzione",
    "def": "Figura che supervisiona organizzazione pratica, mezzi e personale.",
    "longDef": "Il production manager è la figura che si occupa dell’organizzazione pratica e logistica del progetto. Coordina mezzi, contatti, esigenze dei reparti, spostamenti, tempi e molte delle questioni operative quotidiane. In produzione è una presenza fondamentale per mantenere ordine e continuità nel lavoro di set."
  },
  {
    "term": "Produzione",
    "category": "Produzione",
    "def": "Fase in cui il progetto viene effettivamente realizzato sul set.",
    "longDef": "La produzione, in senso stretto, è la fase in cui il progetto viene concretamente realizzato, soprattutto durante le riprese. È il momento in cui tutte le scelte preparate prima devono funzionare insieme sul campo. In senso più ampio, il termine può indicare anche l’intera macchina organizzativa che rende possibile un’opera audiovisiva."
  },
  {
    "term": "Produzione esecutiva",
    "category": "Produzione",
    "def": "Gestione pratica e organizzativa delle risorse del progetto.",
    "longDef": "La produzione esecutiva riguarda la gestione concreta e operativa delle risorse necessarie a realizzare il progetto. Si occupa di tradurre le decisioni creative e produttive in azioni pratiche, controllando costi, logistica, contratti e organizzazione. In una lavorazione ben fatta, la produzione esecutiva è il punto di equilibrio tra visione e fattibilità."
  },
  {
    "term": "Profilo colore",
    "category": "Video",
    "def": "Impostazione che definisce resa tonale e cromatica del video.",
    "longDef": "Il profilo colore è l’impostazione con cui la camera registra contrasto, saturazione, gamma e risposta tonale del video. Alcuni profili danno un’immagine già pronta e contrastata, altri registrano un file più piatto da lavorare poi in postproduzione. In video scegliere il profilo giusto dipende dal tipo di progetto, dal workflow e dal livello di controllo che si vuole mantenere."
  },
  {
    "term": "Profondità di campo",
    "category": "Video",
    "def": "Porzione di immagine che appare nitida davanti e dietro il soggetto.",
    "longDef": "La profondità di campo è la porzione di spazio che appare nitida davanti e dietro il punto di fuoco. Dipende da fattori come apertura, focale e distanza dal soggetto. In video viene spesso usata in modo espressivo: una profondità ridotta isola il soggetto, mentre una più estesa mantiene leggibili più piani dell’immagine."
  },
  {
    "term": "Profondità scenica",
    "category": "Regia",
    "def": "Uso dello spazio in più piani per dare profondità all’immagine.",
    "longDef": "La profondità scenica è la percezione dello spazio in più livelli all’interno dell’inquadratura: primo piano, piano medio e sfondo. Si ottiene attraverso disposizione degli elementi, prospettiva, luce, movimento e messa a fuoco. In regia è utile per dare ricchezza visiva, realismo e complessità all’immagine."
  },
  {
    "term": "Protagonista",
    "category": "Sceneggiatura",
    "def": "Personaggio principale su cui si concentra il racconto.",
    "longDef": "Il protagonista è il personaggio principale attorno a cui ruota il nucleo della storia. È colui o colei che porta il peso maggiore del racconto, affronta il conflitto centrale e compie il percorso più importante. In sceneggiatura il protagonista non deve essere per forza “buono”, ma deve essere narrativamente centrale."
  },
  {
    "term": "Protagonista corale",
    "category": "Sceneggiatura",
    "def": "Struttura con più personaggi principali di pari importanza.",
    "longDef": "Il protagonista corale è una struttura narrativa in cui più personaggi condividono il centro del racconto. Non c’è una sola figura dominante, ma una rete di punti di vista e percorsi che insieme costruiscono il cuore della storia. In sceneggiatura questa scelta richiede equilibrio, perché ogni personaggio deve avere peso senza frammentare troppo l’insieme."
  },
  {
    "term": "Proxy",
    "category": "Montaggio",
    "def": "Versione leggera di una clip usata per montare più velocemente.",
    "longDef": "Il proxy è una versione leggera e meno pesante di una clip originale ad alta qualità. Viene usato per montare in modo più fluido su computer meno potenti o con file molto pesanti. In montaggio è una soluzione pratica importantissima, perché permette di lavorare bene senza rinunciare alla qualità finale dei file originali."
  },
  {
    "term": "Punto di svolta",
    "category": "Sceneggiatura",
    "def": "Momento che cambia direzione alla storia.",
    "longDef": "Il punto di svolta è un momento in cui la storia cambia direzione in modo netto. Introduce nuove informazioni, nuove difficoltà o una nuova fase del percorso del protagonista. In sceneggiatura serve a evitare la linearità piatta e a mantenere alta l’attenzione narrativa."
  },
  {
    "term": "Quarta parete",
    "category": "Regia",
    "def": "Barriera immaginaria tra personaggi e spettatore.",
    "longDef": "La quarta parete è la barriera immaginaria che separa il mondo della scena da chi guarda. Quando i personaggi si comportano come se lo spettatore non esistesse, la quarta parete resta intatta; quando invece lo riconoscono o gli parlano, viene infranta. In regia, rompere la quarta parete è una scelta precisa che cambia il tono e il rapporto col pubblico."
  },
  {
    "term": "Rack focus - Cambio di fuoco",
    "category": "Regia",
    "def": "Spostamento della messa a fuoco da un soggetto a un altro.",
    "longDef": "Il rack focus è lo spostamento della messa a fuoco da un soggetto a un altro all’interno della stessa inquadratura. Serve a guidare l’attenzione dello spettatore in modo molto preciso, senza bisogno di tagliare. In regia è utile quando si vuole rivelare un’informazione, cambiare centro emotivo o collegare due elementi della scena."
  },
  {
    "term": "Rallenty",
    "category": "Montaggio",
    "def": "Riduzione della velocità di riproduzione di una clip.",
    "longDef": "Il rallenty è la riduzione della velocità di riproduzione di una clip. Serve a enfatizzare un gesto, aumentare il peso emotivo di un momento o permettere di osservare meglio un movimento. In montaggio funziona particolarmente bene quando il materiale è stato girato a un frame rate adeguato."
  },
  {
    "term": "Rapporto d’aspetto",
    "category": "Video",
    "def": "Proporzione tra larghezza e altezza dell’immagine.",
    "longDef": "Il rapporto d’aspetto è la proporzione tra larghezza e altezza dell’immagine. Cambiare formato modifica la percezione visiva del contenuto e il modo in cui lo spazio viene organizzato all’interno del quadro. In video è una scelta importante perché incide sul linguaggio visivo, sul tipo di piattaforma e sullo stile complessivo del prodotto."
  },
  {
    "term": "Red herring - Falsa pista",
    "category": "Sceneggiatura",
    "def": "Falso indizio usato per depistare lo spettatore.",
    "longDef": "Il red herring è un falso indizio inserito per depistare lo spettatore o i personaggi. Viene usato spesso nei thriller, nei gialli e nei racconti investigativi per costruire suspense e sorpresa. In sceneggiatura funziona bene quando è credibile e quando il depistaggio non appare artificiale."
  },
  {
    "term": "Regia autoriale",
    "category": "Regia",
    "def": "Approccio in cui lo stile del regista è fortemente riconoscibile.",
    "longDef": "La regia autoriale è un approccio in cui lo stile personale del regista è fortemente riconoscibile. Le scelte visive, ritmiche e compositive non servono solo a raccontare la storia, ma riflettono anche una visione artistica precisa. In questo caso la regia non si nasconde, ma diventa parte evidente dell’identità dell’opera."
  },
  {
    "term": "Regia invisibile",
    "category": "Regia",
    "def": "Stile di regia che evita effetti evidenti per non farsi notare.",
    "longDef": "La regia invisibile è uno stile che evita di farsi notare e punta a rendere fluida e naturale la narrazione. I movimenti, i tagli e le inquadrature sono costruiti in modo da non attirare l’attenzione su se stessi, ma sulla storia. È una forma di regia molto efficace quando si vuole favorire immersione e chiarezza."
  },
  {
    "term": "Regia multicamera",
    "category": "Regia",
    "def": "Coordinamento di più camere che riprendono la stessa scena.",
    "longDef": "La regia multicamera organizza e coordina più camere che riprendono contemporaneamente la stessa scena da punti diversi. È molto usata in televisione, eventi live, talk, concerti e talvolta in produzioni narrative con esigenze specifiche. Richiede scelte rapide e chiare, perché il regista deve decidere come alternare i punti di vista in modo efficace."
  },
  {
    "term": "Registratore audio",
    "category": "Audio",
    "def": "Dispositivo usato per acquisire e salvare il suono.",
    "longDef": "Il registratore audio è il dispositivo che acquisisce, elabora e salva il segnale sonoro in un file. Può essere portatile o integrato in sistemi più complessi e viene usato per dialoghi, ambienti, effetti sonori o musica. In produzione audiovisiva è essenziale quando si vuole una qualità superiore rispetto all’audio registrato direttamente in camera."
  },
  {
    "term": "Regola dei terzi",
    "category": "Regia",
    "def": "Principio compositivo che divide il quadro in tre parti uguali.",
    "longDef": "La regola dei terzi è un principio compositivo che divide idealmente l’inquadratura in tre parti orizzontali e tre verticali. Posizionare soggetti o punti importanti lungo queste linee o ai loro incroci rende spesso l’immagine più equilibrata e interessante. In regia è una guida utile, anche se non va intesa come una regola rigida e assoluta."
  },
  {
    "term": "Rendering",
    "category": "Montaggio",
    "def": "Elaborazione necessaria per visualizzare correttamente effetti o esportazioni.",
    "longDef": "Il rendering è il processo con cui il software elabora clip, effetti, transizioni o correzioni per mostrarli correttamente o prepararli all’esportazione. Alcuni effetti richiedono questo passaggio perché il computer non riesce a visualizzarli in tempo reale. In montaggio il rendering non cambia il contenuto creativo, ma rende possibile controllarlo e finalizzarlo con precisione."
  },
  {
    "term": "Rimborso spese",
    "category": "Produzione",
    "def": "Restituzione dei costi sostenuti da un collaboratore.",
    "longDef": "Il rimborso spese è la restituzione dei costi sostenuti da un collaboratore per conto della produzione, come viaggi, pasti, carburante o acquisti necessari. Deve essere regolato in modo chiaro, con criteri e documentazione coerenti. In produzione è una pratica comune, ma va gestita con precisione per evitare confusione e squilibri di bilancio."
  },
  {
    "term": "Ripple edit - Modifica con scorrimento",
    "category": "Montaggio",
    "def": "Modifica che sposta automaticamente le clip successive.",
    "longDef": "Il ripple edit è una modifica che accorcia o allunga una clip spostando automaticamente tutte le clip successive. In questo modo non si crea uno spazio vuoto nella timeline e il flusso resta continuo. In montaggio è molto utile quando si vuole cambiare la durata di un punto senza dover riposizionare tutto manualmente."
  },
  {
    "term": "Rischio meteo",
    "category": "Produzione",
    "def": "Possibile problema produttivo legato alle condizioni atmosferiche.",
    "longDef": "Il rischio meteo è la possibilità che condizioni atmosferiche avverse compromettano o rendano più difficile la realizzazione delle riprese. Pioggia, vento, umidità, freddo, caldo eccessivo o cambi improvvisi di luce possono influire su tempi, sicurezza e qualità del materiale. In produzione va sempre considerato, soprattutto nei lavori in esterni o con mezzi sensibili."
  },
  {
    "term": "Risoluzione",
    "category": "Sceneggiatura",
    "def": "Fase finale in cui le conseguenze del climax si compiono.",
    "longDef": "La risoluzione è la fase in cui, dopo il climax, si vedono gli effetti finali della storia. Mostra come i conflitti si chiudono, come cambiano i personaggi e quale nuovo equilibrio si è creato. In sceneggiatura la risoluzione serve a dare senso alla conclusione e a lasciare una precisa impressione finale."
  },
  {
    "term": "Risoluzione",
    "category": "Video",
    "def": "Quantità di dettaglio presente in un’immagine o video.",
    "longDef": "La risoluzione indica la quantità di dettaglio contenuta nell’immagine video, espressa in numero di pixel. Maggiore è la risoluzione, maggiore è il potenziale di definizione, ma questo non basta da solo a garantire una buona immagine. In video la risoluzione va valutata insieme a compressione, ottica, luce e sensore."
  },
  {
    "term": "Ritmo visivo",
    "category": "Regia",
    "def": "Velocità percepita della scena attraverso inquadrature e movimenti.",
    "longDef": "Il ritmo visivo è la velocità percepita con cui una scena si sviluppa attraverso durata delle inquadrature, movimenti, densità dell’azione e composizione. Anche senza montaggio rapido, una scena può avere un ritmo forte o lento in base a come è diretta. La regia usa il ritmo visivo per guidare l’energia e la tensione del racconto."
  },
  {
    "term": "Riverbero",
    "category": "Audio",
    "def": "Persistenza del suono dovuta alle riflessioni in uno spazio.",
    "longDef": "Il riverbero è la persistenza del suono in un ambiente dovuta alle riflessioni sulle superfici circostanti. Non è un’eco distinta, ma una coda sonora diffusa che modifica la percezione di voce, strumenti e spazio. In audio può essere un elemento naturale da controllare oppure un effetto creativo da aggiungere in postproduzione."
  },
  {
    "term": "Roll edit - Modifica del punto di taglio",
    "category": "Montaggio",
    "def": "Spostamento del punto di taglio tra due clip senza cambiare la durata totale.",
    "longDef": "Il roll edit modifica il punto di taglio tra due clip adiacenti senza alterare la durata complessiva della sequenza. Allunga una clip e accorcia l’altra in modo proporzionale, mantenendo fissa la posizione generale. In montaggio è uno strumento molto utile per rifinire il ritmo di un passaggio senza cambiare la struttura del resto della timeline."
  },
  {
    "term": "Rolling shutter - Distorsione da otturatore progressivo",
    "category": "Video",
    "def": "Distorsione visiva dovuta alla lettura progressiva del sensore.",
    "longDef": "Il rolling shutter è un effetto indesiderato dovuto al fatto che molti sensori leggono l’immagine in modo progressivo, riga per riga, e non tutta insieme. Quando ci sono movimenti rapidi, possono apparire distorsioni come linee storte, oscillazioni o deformazioni. In video è un problema noto soprattutto in riprese a mano, con soggetti veloci o panoramiche brusche."
  },
  {
    "term": "Ronzio",
    "category": "Audio",
    "def": "Rumore grave e costante, spesso causato da interferenze elettriche.",
    "longDef": "Il ronzio è un rumore grave e costante, spesso collegato a interferenze elettriche o problemi di alimentazione. Può derivare da masse, trasformatori, cavi difettosi o apparecchiature non ben isolate. In audio è uno dei disturbi più riconoscibili e va individuato rapidamente per evitare di compromettere la registrazione."
  },
  {
    "term": "Room tone - Tono ambiente",
    "category": "Audio",
    "def": "Suono ambiente costante di un luogo, registrato senza dialoghi.",
    "longDef": "Il room tone è il suono costante di un ambiente registrato in assenza di dialoghi o azioni evidenti. Anche se apparentemente sembra “silenzio”, contiene in realtà la presenza acustica reale dello spazio. In audio è molto utile in montaggio e postproduzione, perché aiuta a raccordare i tagli e a mantenere continuità sonora tra una battuta e l’altra."
  },
  {
    "term": "Rough cut - Primo montaggio",
    "category": "Montaggio",
    "def": "Prima versione montata, ancora grezza e provvisoria.",
    "longDef": "Il rough cut è la prima versione montata del progetto, ancora provvisoria e non rifinita. Serve a verificare struttura, ordine delle scene, durata generale e funzionamento narrativo prima di entrare nei dettagli più fini. In montaggio è una fase molto importante, perché permette di capire se il filmato funziona davvero nel suo insieme."
  },
  {
    "term": "Rumore di fondo",
    "category": "Audio",
    "def": "Suono indesiderato presente nell’ambiente o nella registrazione.",
    "longDef": "Il rumore di fondo è l’insieme dei suoni indesiderati presenti nell’ambiente o nel sistema di registrazione. Può includere traffico, vento, frigoriferi, impianti elettrici, ventole, persone lontane o interferenze varie. In audio è uno degli elementi più delicati da controllare, perché può compromettere chiarezza e intelligibilità del contenuto principale."
  },
  {
    "term": "Scaletta",
    "category": "Sceneggiatura",
    "def": "Elenco ordinato delle scene o dei momenti principali della storia.",
    "longDef": "La scaletta è l’elenco ordinato delle scene o dei momenti principali della storia. Aiuta a vedere la struttura del racconto in modo schematico, senza disperdersi subito nei dettagli di dialoghi o descrizioni. In sceneggiatura è fondamentale per costruire una progressione chiara e per controllare il ritmo dell’intreccio."
  },
  {
    "term": "Scavalcamento di campo",
    "category": "Regia",
    "def": "Violazione dell’asse d’azione che altera l’orientamento spaziale.",
    "longDef": "Lo scavalcamento di campo avviene quando la camera supera l’asse d’azione e cambia il lato da cui osserva la scena. Questo può invertire la direzione degli sguardi o dei movimenti, generando confusione nello spettatore. In regia può essere un errore, ma in alcuni casi può anche essere una scelta intenzionale per creare disorientamento."
  },
  {
    "term": "Scena",
    "category": "Sceneggiatura",
    "def": "Unità narrativa che si svolge in un luogo e tempo definiti.",
    "longDef": "La scena è un’unità narrativa che si svolge in un luogo e in un tempo definiti. Quando cambia spazio o momento, in genere cambia anche la scena. In sceneggiatura rappresenta il mattone base del racconto audiovisivo, perché organizza l’azione in segmenti concreti e filmabili."
  },
  {
    "term": "Segreteria di edizione",
    "category": "Produzione",
    "def": "Ruolo che controlla continuità, note di set e corrispondenza con la sceneggiatura.",
    "longDef": "La segreteria di edizione è il ruolo che controlla la continuità della scena e prende nota di tutto ciò che serve a mantenere coerenza tra riprese e montaggio. Registra dettagli su battute, posizioni, movimenti, oggetti, durata delle take e osservazioni utili per regia e postproduzione. In produzione e sul set è una figura preziosa, perché previene errori che altrimenti emergerebbero troppo tardi."
  },
  {
    "term": "Sensore",
    "category": "Video",
    "def": "Componente che cattura la luce e la trasforma in immagine digitale.",
    "longDef": "Il sensore è il componente elettronico che cattura la luce e la converte in segnale digitale. Le sue dimensioni e caratteristiche influenzano sensibilità, gamma dinamica, resa del rumore e profondità di campo. In video il sensore è uno degli elementi che determinano la qualità di base della ripresa."
  },
  {
    "term": "Sequenza",
    "category": "Sceneggiatura",
    "def": "Insieme di scene legate da una stessa funzione narrativa.",
    "longDef": "La sequenza è un insieme di scene legate tra loro da una stessa funzione narrativa o da una continuità di azione. Può raccontare un obiettivo, una situazione o un evento più ampio che richiede più momenti distinti. In sceneggiatura, pensare per sequenze aiuta a dare respiro e struttura al racconto."
  },
  {
    "term": "Sequenza di montaggio",
    "category": "Montaggio",
    "def": "Composizione ordinata di clip in una timeline.",
    "longDef": "La sequenza di montaggio è l’insieme ordinato di clip inserite in una timeline per costruire una scena o una parte del progetto. Può contenere video, audio, musica, effetti, titoli e altri elementi sincronizzati. In montaggio rappresenta l’unità pratica su cui si lavora per dare forma al racconto."
  },
  {
    "term": "Setup - Preparazione narrativa",
    "category": "Sceneggiatura",
    "def": "Elemento introdotto prima per essere ripreso o sviluppato dopo.",
    "longDef": "Il setup è un elemento introdotto prima nel racconto per essere ripreso o sviluppato più avanti. Può essere un oggetto, una battuta, una promessa, una situazione o una relazione. In sceneggiatura il setup è utile perché prepara il terreno e rende più soddisfacente ciò che arriverà dopo."
  },
  {
    "term": "Sguardo in macchina",
    "category": "Regia",
    "def": "Momento in cui un personaggio guarda direttamente in camera.",
    "longDef": "Lo sguardo in macchina si verifica quando un personaggio guarda direttamente verso l’obiettivo. Questa scelta rompe la normale illusione narrativa e può creare complicità, disagio, ironia o frontalità. In regia va usata con consapevolezza, perché ha un effetto molto forte sul rapporto tra scena e spettatore."
  },
  {
    "term": "Shot list - Lista delle inquadrature",
    "category": "Regia",
    "def": "Elenco ordinato delle inquadrature da realizzare.",
    "longDef": "La shot list è l’elenco ordinato delle inquadrature previste per una scena o per un’intera giornata di lavoro. Ogni voce può includere tipo di piano, movimento, contenuto e priorità di ripresa. È molto utile perché trasforma le idee registiche in una guida concreta e facilita il coordinamento con produzione e reparto tecnico."
  },
  {
    "term": "Shutter angle - Angolo dell’otturatore",
    "category": "Video",
    "def": "Parametro equivalente all’otturatore nel linguaggio cinematografico.",
    "longDef": "Lo shutter angle è un modo, di origine cinematografica, per descrivere la durata relativa dell’esposizione di ogni fotogramma. Anche nelle camere digitali viene usato per mantenere un rapporto coerente tra tempo di posa e frame rate. In video è utile perché aiuta a controllare la resa del movimento in modo più intuitivo e costante."
  },
  {
    "term": "Simmetria",
    "category": "Regia",
    "def": "Organizzazione equilibrata degli elementi ai lati dell’inquadratura.",
    "longDef": "La simmetria è una disposizione equilibrata degli elementi ai lati dell’inquadratura, spesso centrata o speculare. Produce un effetto di ordine, controllo, rigidità o armonia, a seconda del contesto. In regia può essere usata per costruire uno stile forte o per dare alla scena una qualità particolare, quasi rituale o geometrica."
  },
  {
    "term": "Sincronizzazione audio",
    "category": "Audio",
    "def": "Allineamento preciso tra suono e immagine.",
    "longDef": "La sincronizzazione audio è l’allineamento corretto tra il suono e l’immagine. Se la voce non coincide con il movimento delle labbra o un’azione non corrisponde al suo rumore, lo spettatore percepisce subito un difetto. In ambito audiovisivo una buona sincronizzazione è essenziale per realismo, immersione e professionalità."
  },
  {
    "term": "Sincronizzazione multicam",
    "category": "Montaggio",
    "def": "Allineamento automatico o manuale di più camere della stessa scena.",
    "longDef": "La sincronizzazione multicam è l’allineamento preciso di più clip riprese contemporaneamente da camere diverse. Può avvenire usando l’audio, il timecode, il clap o altri riferimenti comuni. In montaggio questo passaggio è essenziale per poter alternare correttamente i punti di vista senza perdere coerenza temporale."
  },
  {
    "term": "Sinossi",
    "category": "Sceneggiatura",
    "def": "Riassunto chiaro e ordinato dell’intera vicenda.",
    "longDef": "La sinossi è un riassunto ordinato e comprensibile dell’intera storia, dai suoi presupposti fino alla conclusione. A differenza della logline, è più sviluppata e permette di cogliere meglio struttura, personaggi principali e andamento della vicenda. In sceneggiatura è utile per presentare il progetto e verificarne la solidità narrativa."
  },
  {
    "term": "Slide edit - Scorrimento della clip",
    "category": "Montaggio",
    "def": "Spostamento di una clip tra due altre variando i tagli adiacenti.",
    "longDef": "Lo slide edit sposta una clip a sinistra o a destra tra due clip vicine, modificando di conseguenza i loro punti di taglio. La durata complessiva della sequenza resta uguale, ma cambia l’equilibrio tra i tre elementi coinvolti. In montaggio è una funzione raffinata, utile quando si vuole aggiustare il tempo di un momento senza cambiare la lunghezza totale."
  },
  {
    "term": "Slider - Binario di scorrimento",
    "category": "Video",
    "def": "Binario corto usato per movimenti lineari fluidi della camera.",
    "longDef": "Lo slider è un binario corto su cui la camera può scorrere in modo fluido. Permette di ottenere piccoli movimenti lineari molto controllati, utili per dare eleganza e profondità all’inquadratura. In video è spesso usato in interviste, product video, documentari e scene che beneficiano di un movimento leggero ma raffinato."
  },
  {
    "term": "Slip edit - Scorrimento interno della clip",
    "category": "Montaggio",
    "def": "Spostamento del contenuto interno di una clip mantenendo fissa la sua posizione.",
    "longDef": "Lo slip edit sposta il contenuto interno di una clip mantenendo invariata la sua posizione e durata nella timeline. In pratica cambia quali fotogrammi della clip vengono mostrati, senza spostare il blocco complessivo. In montaggio è utile quando il punto del racconto funziona, ma l’inizio o la fine visiva della clip vanno migliorati."
  },
  {
    "term": "Slow motion - Rallentatore",
    "category": "Video",
    "def": "Ripresa o riproduzione rallentata rispetto al tempo reale.",
    "longDef": "Lo slow motion è una tecnica che permette di mostrare un’azione rallentata rispetto al tempo reale. Si ottiene registrando a un frame rate più alto e riproducendo poi il materiale a una velocità standard. In video viene usato per enfatizzare un gesto, aumentare l’impatto emotivo o analizzare il movimento con maggiore precisione."
  },
  {
    "term": "Soggetto",
    "category": "Sceneggiatura",
    "def": "Testo che racconta in forma breve la storia del film.",
    "longDef": "Il soggetto è un testo breve che racconta l’idea narrativa principale del film o del video. Riassume la storia in forma chiara, senza entrare ancora nel dettaglio tecnico della sceneggiatura dialogata. È spesso il primo documento con cui una storia prende forma scritta in modo riconoscibile."
  },
  {
    "term": "Sopralluogo",
    "category": "Produzione",
    "def": "Visita preventiva a una location per verificarne fattibilità e caratteristiche.",
    "longDef": "Il sopralluogo è la visita preventiva a una location per verificarne caratteristiche, limiti e potenzialità prima delle riprese. Durante il sopralluogo si valutano accessi, spazi, luce, rumore, sicurezza, corrente elettrica, movimenti e logistica generale. In produzione è una tappa fondamentale, perché aiuta a prevedere problemi e a preparare il set in modo realistico."
  },
  {
    "term": "Sottopancia",
    "category": "Montaggio",
    "def": "Testo in basso sullo schermo che identifica persona o informazione.",
    "longDef": "Il sottopancia è un testo posizionato nella parte bassa dello schermo, usato per identificare una persona, un luogo, una data o un’informazione sintetica. È molto comune in interviste, documentari, reportage e contenuti informativi. In montaggio va progettato con chiarezza e discrezione, così da essere utile senza distrarre."
  },
  {
    "term": "Sottotesto",
    "category": "Sceneggiatura",
    "def": "Significato implicito nascosto dietro parole o comportamenti.",
    "longDef": "Il sottotesto è ciò che un personaggio comunica senza dirlo in modo esplicito. Può emergere dal tono, dalle pause, dai silenzi, dai gesti o da parole che significano più di quanto sembrano dire. In sceneggiatura il sottotesto rende i dialoghi più vivi, realistici e interessanti."
  },
  {
    "term": "Sound design - Progettazione sonora",
    "category": "Audio",
    "def": "Progettazione creativa dell’universo sonoro di un’opera.",
    "longDef": "Il sound design è la progettazione creativa dell’universo sonoro di un’opera audiovisiva. Non riguarda solo la correzione tecnica, ma la costruzione espressiva di ambienti, effetti, texture e percezioni sonore. In audio è una disciplina fondamentale, perché il suono non accompagna semplicemente le immagini: contribuisce in modo decisivo a creare atmosfera, significato ed emozione."
  },
  {
    "term": "Sponsor - Sostenitore economico",
    "category": "Produzione",
    "def": "Soggetto che sostiene economicamente o materialmente il progetto.",
    "longDef": "Lo sponsor è un soggetto che sostiene il progetto con denaro, beni, servizi o risorse materiali in cambio di visibilità o di un’associazione d’immagine. Può contribuire in modo determinante alla fattibilità del lavoro, soprattutto in produzioni indipendenti o a budget ridotto. In produzione la relazione con lo sponsor va gestita con equilibrio, per non compromettere identità e coerenza del progetto."
  },
  {
    "term": "Stabilizzazione",
    "category": "Video",
    "def": "Sistema che riduce vibrazioni e tremolii dell’immagine.",
    "longDef": "La stabilizzazione è il sistema che riduce vibrazioni e tremolii dell’immagine durante la ripresa. Può essere ottica, elettronica, interna al sensore o ottenuta con supporti esterni. In video è molto importante perché migliora la leggibilità della ripresa e rende i movimenti più fluidi e professionali."
  },
  {
    "term": "Stabilizzazione digitale",
    "category": "Montaggio",
    "def": "Correzione software del tremolio dell’immagine.",
    "longDef": "La stabilizzazione digitale è la correzione software del tremolio di una clip già girata. Analizza il movimento e cerca di compensarlo per rendere l’immagine più fluida. In montaggio è una soluzione molto utile per recuperare riprese imperfette, anche se non sempre può sostituire una buona stabilità in fase di ripresa."
  },
  {
    "term": "Storyboard",
    "category": "Regia",
    "def": "Serie di disegni o immagini che visualizza le inquadrature prima delle riprese.",
    "longDef": "Lo storyboard è una sequenza di disegni o immagini che rappresenta in anticipo le inquadrature del film o del video. Non è solo un supporto illustrativo, ma uno strumento pratico per visualizzare il ritmo, i movimenti e la costruzione della scena. In regia aiuta a chiarire idee, comunicare con la troupe e prevenire errori in fase di ripresa."
  },
  {
    "term": "Supercardioide",
    "category": "Audio",
    "def": "Pattern direzionale più stretto del cardioide.",
    "longDef": "Il supercardioide è un pattern più stretto del cardioide e quindi ancora più direzionale. Isola meglio la fonte sonora frontale, ma conserva una certa sensibilità anche in una piccola area posteriore. In audio viene scelto quando si vuole maggiore precisione di cattura, soprattutto in ambienti rumorosi o in riprese più selettive."
  },
  {
    "term": "Suspense",
    "category": "Sceneggiatura",
    "def": "Attesa carica di tensione rispetto a un evento imminente.",
    "longDef": "La suspense è la tensione generata dall’attesa di qualcosa che potrebbe accadere. Nasce quando lo spettatore percepisce un pericolo, un’incertezza o una promessa narrativa e resta in allerta rispetto al suo sviluppo. In sceneggiatura è uno strumento potentissimo, perché tiene vivo l’interesse anche prima che l’evento si compia."
  },
  {
    "term": "Svolta emotiva",
    "category": "Sceneggiatura",
    "def": "Cambiamento nel tono o nello stato interiore del personaggio.",
    "longDef": "La svolta emotiva è un cambiamento significativo nello stato interiore di un personaggio o nel tono di una scena. Può derivare da una scoperta, una ferita, una confessione, una perdita o un gesto inatteso. In sceneggiatura è importante perché rende il racconto vivo non solo sul piano dell’azione, ma anche su quello dell’esperienza emotiva."
  },
  {
    "term": "Sync - Sincronizzazione",
    "category": "Audio",
    "def": "Allineamento tecnico tra registrazione audio e video.",
    "longDef": "Il sync è l’allineamento tecnico tra audio e video o tra più sorgenti audio diverse. Può essere ottenuto tramite clap, timecode, forme d’onda o altri sistemi di riferimento. In audio e audiovisivo un sync corretto è fondamentale perché ogni sfasamento tra immagine e suono viene percepito immediatamente come un difetto."
  },
  {
    "term": "Teleobiettivo",
    "category": "Video",
    "def": "Obiettivo che ingrandisce i soggetti lontani e comprime la prospettiva.",
    "longDef": "Il teleobiettivo è un obiettivo con focale lunga che stringe il campo visivo e avvicina apparentemente i soggetti lontani. Tende anche a comprimere la prospettiva, facendo sembrare più vicini tra loro elementi che in realtà sono distanti. In video è molto utile per ritratti, dettagli lontani, scene sportive o situazioni in cui non ci si può avvicinare fisicamente."
  },
  {
    "term": "Tema",
    "category": "Sceneggiatura",
    "def": "Idea centrale o messaggio profondo della storia.",
    "longDef": "Il tema è l’idea centrale o la domanda profonda che attraversa la storia. Non coincide con la trama, ma con ciò di cui il racconto parla davvero a un livello più generale, come il potere, la perdita, la libertà o la colpa. In sceneggiatura il tema aiuta a dare unità e significato all’opera."
  },
  {
    "term": "Tempo della scena",
    "category": "Regia",
    "def": "Durata percepita dell’azione all’interno dell’inquadratura.",
    "longDef": "Il tempo della scena è la durata interna con cui l’azione viene percepita e vissuta sullo schermo. Non coincide solo con i secondi reali, ma con il modo in cui la regia costruisce attese, pause, accelerazioni e permanenze. Gestire bene il tempo della scena significa controllare tensione, attenzione e respiro narrativo."
  },
  {
    "term": "Tempo di posa",
    "category": "Video",
    "def": "Durata di esposizione del sensore alla luce.",
    "longDef": "Il tempo di posa è la durata per cui il sensore resta esposto alla luce per ogni fotogramma. In video non influisce solo sulla luminosità, ma anche sulla resa del movimento: tempi più rapidi rendono l’azione più secca e nitida, tempi più lunghi producono maggiore scia o morbidezza. È quindi una scelta tecnica che ha anche conseguenze estetiche molto evidenti."
  },
  {
    "term": "Tilt - Panoramica verticale",
    "category": "Regia",
    "def": "Movimento verticale della camera sul proprio asse.",
    "longDef": "Il tilt è un movimento verticale della camera sul proprio asse, verso l’alto o verso il basso. Serve a scoprire gradualmente un soggetto, enfatizzarne l’altezza o collegare due elementi posti su livelli diversi. In regia può avere una funzione descrittiva, narrativa o spettacolare, a seconda del contesto."
  },
  {
    "term": "Time-lapse - Ripresa a intervalli",
    "category": "Video",
    "def": "Tecnica che mostra in pochi secondi eventi molto lunghi.",
    "longDef": "Il time-lapse è una tecnica che comprime lunghi intervalli di tempo in pochi secondi di video. Si realizza scattando fotogrammi a distanza regolare e montandoli poi in sequenza. In video è molto efficace per mostrare fenomeni lenti come nuvole, traffico, costruzioni, tramonti o movimenti urbani."
  },
  {
    "term": "Timeline",
    "category": "Montaggio",
    "def": "Area di lavoro in cui si organizzano clip audio e video nel tempo.",
    "longDef": "La timeline è l’area di lavoro in cui si dispongono nel tempo clip video, audio, titoli ed effetti. È il luogo in cui il materiale grezzo viene trasformato in racconto attraverso ordine, durata, sovrapposizioni e tagli. In montaggio è lo spazio centrale di costruzione del filmato, perché tutto passa da lì."
  },
  {
    "term": "Titolazione",
    "category": "Montaggio",
    "def": "Creazione e gestione di testi nel montaggio.",
    "longDef": "La titolazione riguarda la creazione e gestione dei testi all’interno del video, come titoli iniziali, nomi, didascalie o crediti finali. Non è solo una questione grafica, ma anche narrativa e informativa, perché il testo deve essere leggibile, coerente e ben inserito nel montaggio. In montaggio una buona titolazione aiuta il video senza appesantirlo."
  },
  {
    "term": "Traccia audio",
    "category": "Audio",
    "def": "Singolo livello o file sonoro dentro un progetto.",
    "longDef": "La traccia audio è un singolo livello sonoro all’interno di un progetto di registrazione o montaggio. Può contenere dialoghi, musica, rumori, effetti o ambienti, separati dagli altri per essere gestiti con maggiore controllo. In audio lavorare per tracce consente di regolare, pulire e organizzare il materiale in modo ordinato ed efficace."
  },
  {
    "term": "Transizione",
    "category": "Montaggio",
    "def": "Passaggio visivo o sonoro tra due clip.",
    "longDef": "La transizione è il passaggio da una clip all’altra tramite un effetto visivo o sonoro, come dissolvenze, tendine, sfumature o altri raccordi. Non è sempre necessaria, e anzi spesso il semplice cut resta la scelta migliore. In montaggio una transizione ha senso quando aggiunge chiarezza, atmosfera o intenzione espressiva."
  },
  {
    "term": "Transizione audio",
    "category": "Montaggio",
    "def": "Passaggio sonoro graduale tra due clip.",
    "longDef": "La transizione audio è un passaggio graduale tra due clip sonore o tra due parti di una stessa traccia. Può servire a unire ambienti, far entrare una musica, ammorbidire uno stacco o accompagnare un cambio di scena. In montaggio audio è importante perché il suono percepisce gli stacchi in modo molto sensibile."
  },
  {
    "term": "Trasporti",
    "category": "Produzione",
    "def": "Organizzazione degli spostamenti di persone e materiali.",
    "longDef": "I trasporti comprendono tutta l’organizzazione degli spostamenti di persone, attrezzature e materiali. Possono includere auto, furgoni, navette, carichi, parcheggi e tempi di percorrenza. In produzione una gestione accurata dei trasporti evita ritardi, stress e inefficienze che possono ripercuotersi su tutta la giornata."
  },
  {
    "term": "Trattamento",
    "category": "Sceneggiatura",
    "def": "Versione estesa della storia, scritta in forma narrativa ma dettagliata.",
    "longDef": "Il trattamento è una versione estesa della storia, scritta in forma narrativa ma con maggiore dettaglio rispetto a soggetto e sinossi. Descrive scene, passaggi, atmosfera e sviluppo dei personaggi, pur senza arrivare ancora alla forma completa della sceneggiatura tecnica. Serve a capire se il racconto funziona prima di passare alla scrittura definitiva."
  },
  {
    "term": "Treppiede",
    "category": "Video",
    "def": "Supporto a tre gambe per mantenere la camera ferma.",
    "longDef": "Il treppiede è un supporto a tre gambe che mantiene la camera ferma e stabile. È uno strumento semplice ma fondamentale, soprattutto per interviste, paesaggi, riprese statiche o movimenti controllati di panoramica e tilt. In video il treppiede contribuisce a dare precisione, pulizia e affidabilità alla ripresa."
  },
  {
    "term": "Trimming - Rifinitura dei tagli",
    "category": "Montaggio",
    "def": "Regolazione precisa del punto iniziale o finale di una clip.",
    "longDef": "Il trimming è la regolazione fine del punto iniziale o finale di una clip nella timeline. Non cambia la struttura generale del montaggio, ma rifinisce il taglio per renderlo più preciso, ritmico o naturale. In montaggio è una delle operazioni più frequenti e importanti, perché spesso la qualità di una scena dipende da pochi fotogrammi."
  },
  {
    "term": "Troupe - Gruppo di lavoro sul set",
    "category": "Produzione",
    "def": "Insieme delle persone coinvolte nella realizzazione delle riprese.",
    "longDef": "La troupe è l’insieme delle persone coinvolte operativamente nelle riprese. Il termine viene spesso usato in modo simile a “crew”, ma può avere un’accezione più ampia o più tradizionale a seconda del contesto. In produzione la troupe rappresenta il corpo vivo del set, cioè chi rende concretamente possibile la giornata di lavoro."
  },
  {
    "term": "Uscita a effetto",
    "category": "Regia",
    "def": "Uscita costruita per lasciare una forte impressione visiva o drammatica.",
    "longDef": "L’uscita a effetto è una conclusione di presenza scenica studiata per lasciare un’impressione forte nello spettatore. Può essere lenta, improvvisa, drammatica, ironica o misteriosa, a seconda del tono della scena. In regia serve spesso a chiudere un momento con forza oppure a preparare ciò che verrà dopo."
  },
  {
    "term": "Uscita di campo",
    "category": "Regia",
    "def": "Momento in cui un soggetto esce dall’inquadratura.",
    "longDef": "L’uscita di campo è il momento in cui un soggetto lascia l’inquadratura. Anche questo gesto, apparentemente semplice, può avere un valore narrativo importante: può chiudere una scena, creare attesa o suggerire una direzione dell’azione. In regia, il modo in cui si esce dal quadro può essere significativo quanto il modo in cui si entra."
  },
  {
    "term": "Velocizzazione",
    "category": "Montaggio",
    "def": "Aumento della velocità di riproduzione di una clip.",
    "longDef": "La velocizzazione è l’aumento della velocità di riproduzione di una clip. Viene usata per accorciare un’azione, dare energia a una sequenza o mostrare in poco tempo un processo lungo. In montaggio è una scelta utile e spesso efficace, ma va gestita con attenzione per non rendere il risultato innaturale o confuso."
  },
  {
    "term": "Viewfinder - Mirino",
    "category": "Video",
    "def": "Mirino usato per controllare l’inquadratura.",
    "longDef": "Il viewfinder, o mirino, è il dispositivo attraverso cui l’operatore controlla l’inquadratura e spesso anche alcuni parametri di ripresa. Può essere ottico o elettronico, a seconda della camera. In video è importante perché offre un punto di osservazione più stabile e protetto rispetto al solo schermo posteriore."
  },
  {
    "term": "Vincolo produttivo",
    "category": "Produzione",
    "def": "Limite pratico o economico che condiziona il progetto.",
    "longDef": "Il vincolo produttivo è un limite pratico, economico, logistico o temporale che condiziona la realizzazione del progetto. Può riguardare il budget, il numero di giornate, il meteo, la disponibilità degli attori o le caratteristiche di una location. In produzione non è solo un ostacolo: spesso è anche il fattore che costringe a trovare soluzioni intelligenti e creative."
  },
  {
    "term": "Voce fuori campo",
    "category": "Sceneggiatura",
    "def": "Voce narrante o commento udito senza vedere chi parla.",
    "longDef": "La voce fuori campo è una voce che si sente senza vedere in quel momento il personaggio che parla. Può appartenere a un narratore, a un personaggio che commenta, a un pensiero o a una memoria. In sceneggiatura va usata con attenzione, perché può arricchire il racconto ma anche appesantirlo se sostituisce ciò che dovrebbe essere mostrato."
  },
  {
    "term": "Voice over - Voce fuori campo",
    "category": "Audio",
    "def": "Voce registrata che accompagna le immagini senza provenire dalla scena.",
    "longDef": "La voice over è una voce registrata che accompagna le immagini senza appartenere direttamente all’azione visibile della scena. Può avere funzione narrativa, informativa, poetica o riflessiva. In audio e audiovisivo è molto utile, ma va dosata bene, perché una voice over eccessiva può appesantire il racconto invece di arricchirlo."
  },
  {
    "term": "Wild track - Registrazione separata",
    "category": "Audio",
    "def": "Registrazione audio separata fatta fuori dalla ripresa video.",
    "longDef": "La wild track è una registrazione audio fatta separatamente dalle immagini, spesso subito dopo o prima della scena. Può servire per registrare ambienti, passi, rumori o dialoghi da usare come supporto in montaggio. In audio è una risorsa preziosa, perché offre materiale pulito o alternativo quando la presa diretta presenta problemi."
  },
  {
    "term": "Zebra",
    "category": "Video",
    "def": "Indicatore video che segnala le aree troppo esposte.",
    "longDef": "Le zebra sono un aiuto visivo che segnala sul monitor le aree dell’immagine che hanno raggiunto o superato una certa soglia di esposizione. Appaiono come strisce sovrapposte alle zone interessate e aiutano a capire se certi punti rischiano di essere sovraesposti. In video sono utilissime per controllare l’esposizione in modo rapido e pratico sul set."
  },
  {
    "term": "Zoom",
    "category": "Regia",
    "def": "Variazione della focale che avvicina o allontana visivamente il soggetto.",
    "longDef": "Lo zoom è la variazione della focale che avvicina o allontana visivamente il soggetto senza spostare la camera. È utile quando si vuole cambiare rapidamente il livello di attenzione dello spettatore o isolare un elemento all’interno della scena. A differenza della carrellata, però, non modifica davvero la prospettiva, e per questo produce un effetto visivo diverso."
  },
  {
    "term": "Provino",
    "category": "Recitazione",
    "def": "Audizione in cui un attore interpreta una parte per essere selezionato.",
    "longDef": "Il provino è la prova pratica con cui un attore presenta la propria interpretazione per un ruolo. Può consistere in un monologo, in una scena dialogata o in una lettura assegnata. È un momento importante perché permette a regista e casting di valutare presenza scenica, aderenza al personaggio e capacità interpretativa."
  },
  {
    "term": "Monologo",
    "category": "Recitazione",
    "def": "Testo recitato da un solo personaggio.",
    "longDef": "Il monologo è una porzione di recitazione in cui un personaggio parla da solo o comunque domina completamente la scena. Può essere rivolto a sé stesso, a un altro personaggio o direttamente al pubblico. In recitazione richiede controllo del ritmo, delle intenzioni e della presenza scenica."
  },
  {
    "term": "Improvvisazione",
    "category": "Recitazione",
    "def": "Recitazione non rigidamente fissata da un testo prestabilito.",
    "longDef": "L’improvvisazione è la capacità di costruire azioni, battute e reazioni senza seguire parola per parola un copione. Può essere usata in esercizi, prove o persino durante le riprese per trovare momenti più veri e spontanei. In recitazione è utile perché sviluppa ascolto, prontezza e libertà espressiva."
  },
  {
    "term": "Presenza scenica",
    "category": "Recitazione",
    "def": "Capacità di attirare e mantenere l’attenzione in scena.",
    "longDef": "La presenza scenica è la forza con cui un attore occupa lo spazio e cattura lo sguardo dello spettatore. Non dipende solo dalla voce o dal movimento, ma da una combinazione di concentrazione, energia e credibilità. In recitazione è una qualità fondamentale perché rende viva la performance anche nei momenti più semplici."
  },
  {
    "term": "Intenzione",
    "category": "Recitazione",
    "def": "Obiettivo emotivo o pratico che guida una battuta o un’azione.",
    "longDef": "L’intenzione è ciò che il personaggio cerca di ottenere in un dato momento della scena. Ogni frase o gesto dovrebbe essere sostenuto da una volontà precisa, come convincere, difendersi, provocare o nascondere qualcosa. In recitazione lavorare sulle intenzioni rende il testo più vero e meno meccanico."
  },
  {
    "term": "Obiettivo di scena",
    "category": "Recitazione",
    "def": "Scopo immediato che il personaggio vuole raggiungere nella scena.",
    "longDef": "L’obiettivo di scena è il risultato concreto che il personaggio cerca di ottenere in quel preciso momento narrativo. Aiuta l’attore a orientare battute, ritmo, sguardi e movimenti verso una direzione chiara. In recitazione è uno strumento utile per evitare interpretazioni generiche o vaghe."
  },
  {
    "term": "Azione scenica",
    "category": "Recitazione",
    "def": "Gesto fisico o psicologico che il personaggio compie nella scena.",
    "longDef": "L’azione scenica è ciò che il personaggio fa davvero, non solo ciò che dice. Può essere un gesto visibile oppure un’azione più sottile, come trattenere, sedurre, rifiutare o implorare. In recitazione è importante perché dà concretezza e dinamica al lavoro dell’attore."
  },
  {
    "term": "Ascolto scenico",
    "category": "Recitazione",
    "def": "Capacità di reagire davvero a ciò che accade in scena.",
    "longDef": "L’ascolto scenico è l’attenzione autentica verso partner, spazio e situazione durante la recitazione. Non significa soltanto sentire le battute dell’altro, ma lasciarsi realmente influenzare da ciò che accade. In recitazione è una qualità decisiva, perché rende la scena viva e non artificiale."
  },
  {
    "term": "Partner di scena - Compagno di scena",
    "category": "Recitazione",
    "def": "Attore o attrice con cui si condivide una scena.",
    "longDef": "Il partner di scena è l’interprete con cui un attore entra in relazione durante una sequenza o un dialogo. La qualità di questa relazione incide molto sulla verità e sull’energia della performance. In recitazione il partner non è solo un collega, ma una presenza attiva con cui costruire il momento."
  },
  {
    "term": "Battuta",
    "category": "Recitazione",
    "def": "Singolo intervento verbale di un personaggio.",
    "longDef": "La battuta è una porzione di testo pronunciata da un personaggio all’interno della scena. Non va considerata solo come una frase da dire, ma come un’unità di azione e relazione. In recitazione il modo in cui si attacca, si modula e si conclude una battuta cambia profondamente il senso della scena."
  },
  {
    "term": "Replica",
    "category": "Recitazione",
    "def": "Risposta recitata a una battuta o a un’azione di un altro personaggio.",
    "longDef": "La replica è la risposta che un personaggio dà a ciò che ha appena ricevuto in scena. Può essere verbale, fisica o emotiva, e ha valore solo se nasce davvero da un ascolto attivo. In recitazione la qualità delle repliche rende la scena dinamica, credibile e presente."
  },
  {
    "term": "Pause",
    "category": "Recitazione",
    "def": "Interruzioni intenzionali del parlato o dell’azione.",
    "longDef": "Le pause sono sospensioni nella recitazione che possono avere valore emotivo, ritmico o narrativo. Non sono vuoti casuali, ma momenti pieni di pensiero, tensione o attesa. In recitazione saper usare bene le pause è importante quanto saper dire il testo."
  },
  {
    "term": "Silenzio scenico",
    "category": "Recitazione",
    "def": "Momento senza parole che mantiene significato e tensione.",
    "longDef": "Il silenzio scenico è una sospensione verbale che continua comunque a raccontare qualcosa. Può esprimere emozione, blocco, ascolto, distanza o conflitto più di molte battute. In recitazione è un elemento molto potente, perché anche il non detto costruisce la scena."
  },
  {
    "term": "Sottolineatura",
    "category": "Recitazione",
    "def": "Evidenziazione intenzionale di una parola, gesto o emozione.",
    "longDef": "La sottolineatura è il modo in cui un attore mette in risalto un momento del testo o dell’azione. Può avvenire attraverso voce, ritmo, sguardo, pausa o gesto. In recitazione va usata con misura, perché se è eccessiva rende la performance troppo spiegata o artificiale."
  },
  {
    "term": "Ritmo recitativo",
    "category": "Recitazione",
    "def": "Velocità e andamento con cui l’attore costruisce la scena.",
    "longDef": "Il ritmo recitativo è il modo in cui l’attore distribuisce tempo, pause, energia e accelerazioni nella performance. Influisce sulla vitalità della scena e sul rapporto con il partner e con il testo. In recitazione un buon ritmo non è sempre veloce, ma sempre giusto rispetto alla situazione."
  },
  {
    "term": "Tempo comico",
    "category": "Recitazione",
    "def": "Precisione ritmica necessaria per ottenere effetto comico.",
    "longDef": "Il tempo comico è la capacità di dire, ritardare o interrompere una battuta nel momento esatto in cui produce il massimo effetto. Dipende da ascolto, controllo, pausa e relazione con il pubblico o con il partner. In recitazione è una competenza molto delicata, perché la comicità vive spesso di precisione millimetrica."
  },
  {
    "term": "Timbro vocale",
    "category": "Recitazione",
    "def": "Qualità specifica della voce che la rende riconoscibile.",
    "longDef": "Il timbro vocale è il colore della voce, cioè ciò che la distingue da un’altra anche a parità di volume o altezza. In recitazione il timbro aiuta a definire carattere, età percepita, intensità e credibilità del personaggio. Lavorarci sopra significa rendere la voce uno strumento più espressivo."
  },
  {
    "term": "Dizione",
    "category": "Recitazione",
    "def": "Chiarezza nella pronuncia di parole e suoni.",
    "longDef": "La dizione riguarda il modo corretto e comprensibile di articolare parole, consonanti, vocali e accenti. Non serve solo a “parlare bene”, ma a rendere il testo leggibile e preciso per chi ascolta. In recitazione è una base tecnica importante, soprattutto quando il parlato deve essere nitido."
  },
  {
    "term": "Articolazione",
    "category": "Recitazione",
    "def": "Uso preciso di bocca, lingua e labbra nella pronuncia.",
    "longDef": "L’articolazione è il lavoro fisico con cui i suoni vengono formati e resi chiari. Una buona articolazione migliora comprensione, controllo e sicurezza vocale. In recitazione è essenziale perché permette di dare chiarezza al testo senza irrigidire l’interpretazione."
  },
  {
    "term": "Proiezione della voce",
    "category": "Recitazione",
    "def": "Capacità di far arrivare la voce con chiarezza nello spazio.",
    "longDef": "La proiezione della voce è l’uso tecnico del respiro e dell’emissione per far arrivare il suono lontano senza forzare. È fondamentale soprattutto in teatro, ma utile anche davanti alla camera per controllo e presenza. In recitazione aiuta a dare autorità e pulizia alla performance vocale."
  },
  {
    "term": "Respirazione diaframmatica",
    "category": "Recitazione",
    "def": "Tecnica di respiro che sostiene voce e controllo corporeo.",
    "longDef": "La respirazione diaframmatica è un uso consapevole del respiro che coinvolge il diaframma e favorisce stabilità, appoggio e controllo. In recitazione è preziosa per parlare con più naturalezza e sostenere emozione, volume e ritmo. Un buon respiro migliora sia voce sia presenza scenica."
  },
  {
    "term": "Memoria emotiva",
    "category": "Recitazione",
    "def": "Uso di esperienze interiori per alimentare l’interpretazione.",
    "longDef": "La memoria emotiva è una tecnica con cui l’attore richiama sensazioni o ricordi personali per dare verità a un’emozione scenica. Va usata con intelligenza e delicatezza, perché non si tratta di soffrire davvero, ma di rendere credibile un’esperienza. In recitazione è uno strumento forte, ma non l’unico possibile."
  },
  {
    "term": "Stato emotivo",
    "category": "Recitazione",
    "def": "Condizione interiore del personaggio in un dato momento.",
    "longDef": "Lo stato emotivo è il livello affettivo e psicologico in cui si trova il personaggio durante la scena. Non è una posa esterna, ma una condizione che influenza voce, corpo, ritmo e sguardo. In recitazione riconoscerlo aiuta a rendere coerente il comportamento del personaggio."
  },
  {
    "term": "Corpo scenico",
    "category": "Recitazione",
    "def": "Uso del corpo come strumento espressivo della recitazione.",
    "longDef": "Il corpo scenico è il modo in cui postura, movimento, tensione, equilibrio e gesto costruiscono la presenza dell’attore. Anche senza parlare, il corpo comunica carattere, energia e intenzione. In recitazione il lavoro corporeo è importante quanto quello vocale."
  },
  {
    "term": "Postura del personaggio",
    "category": "Recitazione",
    "def": "Assetto fisico che esprime identità e stato del personaggio.",
    "longDef": "La postura del personaggio è il modo in cui il corpo si dispone nello spazio: aperto, chiuso, rigido, stanco, nervoso o rilassato. Può dire molto prima ancora delle battute. In recitazione aiuta a differenziare i personaggi e a rendere visibile il loro mondo interiore."
  },
  {
    "term": "Gesto intenzionale",
    "category": "Recitazione",
    "def": "Movimento del corpo che nasce da una precisa volontà scenica.",
    "longDef": "Il gesto intenzionale è un’azione fisica che non avviene per caso, ma ha un significato preciso nella scena. Può rafforzare una battuta, contraddirla o sostituirla. In recitazione un gesto efficace è sempre collegato a un pensiero o a un’emozione reale."
  },
  {
    "term": "Controtempo emotivo",
    "category": "Recitazione",
    "def": "Reazione inattesa rispetto al tono apparentemente previsto della scena.",
    "longDef": "Il controtempo emotivo è una scelta interpretativa che evita la risposta più ovvia e apre una sfumatura più interessante. Per esempio, sorridere in un momento doloroso o parlare piano in una lite può creare complessità. In recitazione è utile per rendere i personaggi meno prevedibili."
  },
  {
    "term": "Reazione",
    "category": "Recitazione",
    "def": "Risposta fisica o emotiva a ciò che accade in scena.",
    "longDef": "La reazione è ciò che il personaggio mostra dopo aver ricevuto una battuta, un gesto o un evento. Spesso è più importante dell’azione iniziale, perché rivela davvero il vissuto del personaggio. In recitazione una reazione sincera dà profondità e verità alla scena."
  },
  {
    "term": "Motivazione interna",
    "category": "Recitazione",
    "def": "Spinta profonda che sostiene il comportamento del personaggio.",
    "longDef": "La motivazione interna è la ragione intima per cui il personaggio agisce, parla o si trattiene. Non sempre è esplicita nel testo, ma deve essere chiara all’attore. In recitazione è il motore nascosto che rende coerente e credibile ogni scelta interpretativa."
  },
  {
    "term": "Verità scenica",
    "category": "Recitazione",
    "def": "Sensazione di autenticità che rende credibile la recitazione.",
    "longDef": "La verità scenica è la qualità per cui una performance appare viva, sincera e non costruita artificialmente. Non significa imitare la realtà in modo banale, ma far credere davvero allo spettatore che quel momento stia accadendo. In recitazione è uno degli obiettivi più importanti."
  },
  {
  "term": "Key light - Luce principale",
  "category": "Fotografia",
  "def": "Luce principale che definisce il soggetto.",
  "longDef": "La key light è la fonte luminosa principale che modella volto, corpo o oggetto in scena. Determina gran parte del carattere visivo dell’immagine, dal contrasto alla direzione della luce. In fotografia è uno degli elementi base per costruire il look di una ripresa."
},
{
  "term": "Fill light - Luce di riempimento",
  "category": "Fotografia",
  "def": "Luce di riempimento che attenua le ombre.",
  "longDef": "La fill light serve a schiarire le ombre create dalla luce principale senza annullarle del tutto. Aiuta a controllare il contrasto e a rendere leggibili i dettagli nelle zone scure. In fotografia è utile per bilanciare l’immagine con maggiore precisione."
},
{
  "term": "Backlight - Luce tra il soggetto e lo sfondo",
  "category": "Fotografia",
  "def": "Luce posta dietro il soggetto per staccarlo dallo sfondo.",
  "longDef": "La backlight è una luce collocata dietro il soggetto e spesso puntata verso camera o verso il contorno del corpo. Viene usata per creare separazione, profondità e talvolta un effetto più drammatico o elegante. In fotografia è molto utile per dare tridimensionalità."
},
{
  "term": "Controluce",
  "category": "Fotografia",
  "def": "Situazione in cui la luce principale arriva da dietro il soggetto.",
  "longDef": "Il controluce si verifica quando la fonte luminosa è dietro il soggetto rispetto alla camera. Può creare silhouette, aloni, atmosfera o forte contrasto, a seconda di come viene gestito. In fotografia è una scelta molto espressiva, ma richiede attenzione all’esposizione."
},
{
  "term": "Luce morbida",
  "category": "Fotografia",
  "def": "Luce diffusa con ombre dolci e poco nette.",
  "longDef": "La luce morbida è una luce che avvolge il soggetto e produce ombre delicate, poco marcate. È tipica di fonti diffuse, grandi o filtrate. In fotografia viene spesso usata per ritratti, volti e scene in cui si cerca una resa più naturale o gentile."
},
{
  "term": "Luce dura",
  "category": "Fotografia",
  "def": "Luce diretta che crea ombre nette e contrastate.",
  "longDef": "La luce dura è una luce intensa e poco diffusa che genera ombre precise, marcate e separazioni nette. Può dare forza, tensione o crudezza all’immagine. In fotografia è utile quando si vuole un effetto più incisivo e grafico."
},
{
  "term": "Diffusione",
  "category": "Fotografia",
  "def": "Ammorbidimento della luce tramite materiali o superfici.",
  "longDef": "La diffusione è il processo con cui la luce viene resa più ampia e morbida attraverso tessuti, pannelli, softbox o altri materiali. Serve a ridurre durezza, contrasto e ombre troppo nette. In fotografia è una tecnica fondamentale per controllare la qualità della luce."
},
{
  "term": "Riflettore",
  "category": "Fotografia",
  "def": "Superficie che rimbalza la luce sul soggetto.",
  "longDef": "Il riflettore è uno strumento che devia o restituisce la luce verso il soggetto senza generarla direttamente. Può essere bianco, argento, oro o di altri materiali, a seconda dell’effetto desiderato. In fotografia è molto utile per schiarire, scaldare o riequilibrare la scena."
},
{
  "term": "Negativo fill - Riempimento negativo",
  "category": "Fotografia",
  "def": "Tecnica che aumenta il contrasto togliendo luce riflessa.",
  "longDef": "Il negative fill consiste nel ridurre la luce di riempimento usando superfici scure che assorbono la luce invece di rifletterla. In questo modo si accentuano le ombre e si aumenta il contrasto del soggetto. In fotografia è una tecnica raffinata per dare più profondità e volume."
},
{
  "term": "Rapporto di contrasto",
  "category": "Fotografia",
  "def": "Differenza tra intensità della luce e delle ombre.",
  "longDef": "Il rapporto di contrasto indica quanto è forte la differenza luminosa tra le zone illuminate e quelle in ombra. Più il rapporto è alto, più l’immagine appare drammatica o incisiva. In fotografia è un parametro importante per controllare atmosfera e leggibilità."
},
{
  "term": "Temperatura colore",
  "category": "Fotografia",
  "def": "Caratteristica della luce che la fa apparire più calda o più fredda.",
  "longDef": "La temperatura colore descrive il tono cromatico della luce, misurato in kelvin, e influenza la percezione visiva della scena. Una luce calda tende al giallo-arancio, una fredda al blu. In fotografia è fondamentale per controllare coerenza, atmosfera e resa del colore."
},
{
  "term": "Gelatina correttiva",
  "category": "Fotografia",
  "def": "Filtro colorato usato per modificare il tono della luce.",
  "longDef": "La gelatina correttiva è un materiale trasparente colorato che si applica davanti a una fonte luminosa per variarne temperatura o tinta. Può servire a uniformare luci diverse o a creare un effetto stilistico. In fotografia e ripresa è uno strumento molto pratico di controllo."
},
{
  "term": "Dominante cromatica",
  "category": "Fotografia",
  "def": "Tendenza dell’immagine verso un certo colore prevalente.",
  "longDef": "La dominante cromatica è la presenza evidente di un colore che altera l’equilibrio neutro dell’immagine, come un eccesso di blu, giallo o verde. Può essere un errore tecnico o una scelta espressiva. In fotografia va riconosciuta e gestita con consapevolezza."
},
{
  "term": "Esposimetro",
  "category": "Fotografia",
  "def": "Strumento che misura la luce per aiutare l’esposizione.",
  "longDef": "L’esposimetro è il dispositivo che valuta la quantità di luce presente nella scena e aiuta a impostare correttamente i parametri di ripresa. Può essere interno alla camera o esterno. In fotografia è utile per prendere decisioni tecniche più precise, soprattutto in situazioni complesse."
},
{
  "term": "Lettura incidente",
  "category": "Fotografia",
  "def": "Misurazione della luce che arriva sul soggetto.",
  "longDef": "La lettura incidente misura direttamente la luce che colpisce il soggetto, anziché quella riflessa da esso verso la camera. Questo metodo è spesso più affidabile per ottenere un’esposizione neutra e controllata. In fotografia è molto usato nei set più tecnici o professionali."
},
{
  "term": "Lettura riflessa",
  "category": "Fotografia",
  "def": "Misurazione della luce riflessa dal soggetto verso la camera.",
  "longDef": "La lettura riflessa valuta la luce così come viene restituita dal soggetto all’obiettivo o all’esposimetro. È il metodo più comune nelle fotocamere. In fotografia è pratico, ma va interpretato bene perché superfici molto chiare o molto scure possono alterare la lettura."
},
{
  "term": "Zebra pattern - Motivo zebra",
  "category": "Fotografia",
  "def": "Indicazione visiva delle zone troppo esposte.",
  "longDef": "Lo zebra pattern è un sistema di aiuto visivo che segnala sul monitor le aree che superano una determinata soglia luminosa. Serve a capire rapidamente dove l’immagine rischia di perdere dettaglio. In fotografia video e ripresa è molto utile per lavorare con precisione."
},
{
  "term": "False color exposure - Esposizione a falsi colori",
  "category": "Fotografia",
  "def": "Sistema cromatico per leggere l’esposizione in modo tecnico.",
  "longDef": "Il false color exposure usa colori artificiali per indicare i livelli di esposizione delle diverse parti dell’immagine. Ogni colore rappresenta una fascia tonale precisa. In fotografia e ripresa è uno strumento molto utile per valutare con esattezza luce, pelle e alte luci."
},
{
  "term": "Spot metering - Misurazione spot",
  "category": "Fotografia",
  "def": "Misurazione della luce su una piccola area dell’immagine.",
  "longDef": "Lo spot metering è un tipo di misurazione esposimetrica che si concentra su una zona molto ridotta del quadro. Serve quando si vuole valutare con precisione un volto, un punto luminoso o un dettaglio importante. In fotografia aiuta a prendere decisioni molto controllate."
},
{
  "term": "Picture profile - Profilo immagine",
  "category": "Fotografia",
  "def": "Impostazione che determina contrasto, saturazione e curva tonale.",
  "longDef": "Il picture profile è il set di parametri che definisce il modo in cui la camera registra colore, contrasto e resa generale dell’immagine. Alcuni profili sono neutri, altri più pronti all’uso o più pensati per la postproduzione. In fotografia video incide molto sul risultato finale."
},
{
  "term": "Curva tonale",
  "category": "Fotografia",
  "def": "Andamento di luci, ombre e mezzitoni nell’immagine.",
  "longDef": "La curva tonale descrive come i diversi livelli di luminosità vengono distribuiti e riprodotti. Influisce sul contrasto, sulla morbidezza dei passaggi e sulla percezione generale dell’immagine. In fotografia è una base importante del look visivo."
},
{
  "term": "Incarnato",
  "category": "Fotografia",
  "def": "Resa cromatica e luminosa della pelle umana.",
  "longDef": "L’incarnato è il modo in cui la pelle viene rappresentata in termini di colore, texture e luce. È una delle aree più delicate dell’immagine, perché lo spettatore riconosce subito una resa poco naturale. In fotografia curare l’incarnato è fondamentale soprattutto nei ritratti e nei primi piani."
},
{
  "term": "Catchlight - Riflesso negli occhi",
  "category": "Fotografia",
  "def": "Piccolo riflesso luminoso visibile negli occhi del soggetto.",
  "longDef": "Il catchlight è il punto di luce che si riflette nell’occhio e lo rende vivo, presente e leggibile. Anche molto piccolo, può cambiare tantissimo l’espressività del volto. In fotografia di ritratto è un dettaglio essenziale per dare vitalità allo sguardo."
},
{
  "term": "Practical light - Luce di scena",
  "category": "Fotografia",
  "def": "Fonte luminosa visibile in scena, come lampade o abat-jour.",
  "longDef": "Una practical light è una luce che appartiene fisicamente all’ambiente della scena ed è visibile nell’inquadratura. Può essere usata sia come elemento scenografico sia come vera fonte di illuminazione. In fotografia e cinema aiuta a rendere la luce più credibile e integrata nello spazio."
},
{
  "term": "Motivated lighting - Illuminazione motivata",
  "category": "Fotografia",
  "def": "Illuminazione costruita come se provenisse da una fonte plausibile della scena.",
  "longDef": "La motivated lighting è una strategia in cui la luce viene progettata in modo coerente con fonti visibili o credibili all’interno dell’ambiente. Anche quando è artificiale, deve sembrare “motivata” narrativamente. In fotografia rende il set più realistico e leggibile."
},
{
  "term": "Rim light - Luce di contorno",
  "category": "Fotografia",
  "def": "Luce che disegna un bordo luminoso attorno al soggetto.",
  "longDef": "La rim light colpisce il contorno del soggetto e crea una linea di luce che lo separa dallo sfondo. Può essere molto evidente o molto discreta. In fotografia è utile per aumentare profondità, eleganza e stacco visivo."
},
{
  "term": "Light wrap - Avvolgimento della luce",
  "category": "Fotografia",
  "def": "Sensazione di luce che avvolge il soggetto in modo morbido.",
  "longDef": "Il light wrap è l’effetto per cui la luce sembra girare attorno ai contorni del soggetto, rendendolo più integrato e morbido rispetto all’ambiente. Può essere naturale o costruito in postproduzione e compositing. In fotografia contribuisce a una resa più credibile e meno rigida."
},
{
  "term": "Texture della luce",
  "category": "Fotografia",
  "def": "Qualità visiva della luce in rapporto a superfici e materiali.",
  "longDef": "La texture della luce riguarda il modo in cui la luce rivela dettagli, pori, tessuti, superfici e volumi. Una luce morbida o dura cambia molto la percezione della materia. In fotografia controllare questa qualità è importante per dare carattere all’immagine."
},
{
  "term": "Falloff - Caduta della luce",
  "category": "Fotografia",
  "def": "Diminuzione della luce man mano che si allontana dalla fonte.",
  "longDef": "Il falloff è il modo in cui l’intensità della luce cala con la distanza dalla sorgente. Questo principio influenza profondamente il contrasto e la distribuzione luminosa nella scena. In fotografia è utile conoscerlo per modellare i volumi con più consapevolezza."
},
{
  "term": "Mood visivo",
  "category": "Fotografia",
  "def": "Atmosfera complessiva costruita da luce, colore e contrasto.",
  "longDef": "Il mood visivo è l’impressione emotiva generale prodotta dall’immagine. Nasce dalla combinazione di luce, colore, contrasto, composizione e resa del soggetto. In fotografia è il risultato finale di molte scelte tecniche che diventano espressive."
},
  {
    "term": "Distribuzione cinematografica",
    "category": "Distribuzione",
    "def": "Processo con cui un’opera viene portata al pubblico.",
    "longDef": "La distribuzione cinematografica comprende tutte le attività che permettono a un film o video di raggiungere spettatori, sale, festival, piattaforme o altri canali. Non riguarda solo la consegna del prodotto, ma anche strategia, tempi e posizionamento. È una fase decisiva per la vita dell’opera."
  },
  {
    "term": "Uscita in sala",
    "category": "Distribuzione",
    "def": "Distribuzione di un film nelle sale cinematografiche.",
    "longDef": "L’uscita in sala è il momento in cui un’opera viene programmata nei cinema per il pubblico pagante. Può essere ampia o limitata, a seconda del tipo di progetto e della strategia distributiva. In distribuzione è una tappa importante, ma non sempre l’unica o la principale."
  },
  {
    "term": "Distribuzione indipendente",
    "category": "Distribuzione",
    "def": "Diffusione dell’opera senza grandi circuiti industriali tradizionali.",
    "longDef": "La distribuzione indipendente riguarda film e contenuti che trovano la propria strada fuori dai grandi canali dominanti. Può passare per festival, sale selezionate, piattaforme, eventi o proiezioni mirate. È spesso più faticosa, ma offre anche maggiore libertà di posizionamento."
  },
  {
    "term": "Circuitazione festivaliera",
    "category": "Distribuzione",
    "def": "Percorso del film attraverso festival e rassegne.",
    "longDef": "La circuitazione festivaliera è la strategia con cui un’opera viene iscritta e proposta a festival, concorsi e manifestazioni cinematografiche. Non consiste nel mandare il film “ovunque”, ma nel scegliere bene i contesti giusti. In distribuzione può essere fondamentale per visibilità, premi e contatti."
  },
  {
    "term": "Prima mondiale",
    "category": "Distribuzione",
    "def": "Prima proiezione pubblica assoluta dell’opera.",
    "longDef": "La prima mondiale è la prima presentazione pubblica ufficiale di un film davanti a un pubblico. In molti festival ha un forte valore strategico, perché alcuni eventi richiedono o privilegiano opere non ancora mostrate altrove. In distribuzione è un elemento importante del posizionamento iniziale."
  },
  {
    "term": "Prima nazionale",
    "category": "Distribuzione",
    "def": "Prima proiezione pubblica dell’opera in un determinato Paese.",
    "longDef": "La prima nazionale indica la prima volta in cui un’opera viene mostrata ufficialmente in uno specifico territorio nazionale. Anche questa informazione può avere peso nei festival o nella comunicazione promozionale. In distribuzione aiuta a costruire la cronologia pubblica del film."
  },
  {
    "term": "Selezione ufficiale",
    "category": "Distribuzione",
    "def": "Ammissione del film nel programma ufficiale di un festival.",
    "longDef": "La selezione ufficiale certifica che un’opera è stata scelta da un festival o evento per entrare nel suo programma riconosciuto. È un segnale di qualità, visibilità e legittimazione culturale. In distribuzione può diventare un elemento molto forte di promozione."
  },
  {
    "term": "Fuori concorso",
    "category": "Distribuzione",
    "def": "Proiezione ufficiale senza partecipazione alla gara per i premi.",
    "longDef": "Un film fuori concorso viene presentato ufficialmente all’interno di un festival, ma non compete per i riconoscimenti principali. Può comunque ottenere attenzione critica e visibilità. In distribuzione è una forma di presenza che valorizza l’opera anche senza competizione diretta."
  },
  {
    "term": "Rassegna",
    "category": "Distribuzione",
    "def": "Programmazione tematica o selettiva di più opere.",
    "longDef": "La rassegna è un insieme di proiezioni organizzate secondo un tema, un autore, un periodo o un criterio culturale specifico. Può offrire a un film contesti molto qualificati e un pubblico mirato. In distribuzione è uno spazio utile soprattutto per opere d’autore, documentari o corti."
  },
  {
    "term": "Programmazione",
    "category": "Distribuzione",
    "def": "Inserimento del film in un calendario di proiezioni o uscite.",
    "longDef": "La programmazione riguarda il modo e il momento in cui un’opera viene collocata all’interno di sale, eventi, festival o palinsesti. Non è una scelta neutra: giorno, fascia oraria e contesto possono influire molto sulla ricezione. In distribuzione è una parte concreta della strategia."
  },
  {
    "term": "Finestra distributiva",
    "category": "Distribuzione",
    "def": "Periodo o ordine temporale in cui l’opera esce su diversi canali.",
    "longDef": "La finestra distributiva è la sequenza con cui un’opera viene resa disponibile su sala, streaming, tv, festival o altri circuiti. Stabilire bene l’ordine e i tempi può influire sulla visibilità e sul valore percepito del film. In distribuzione è una scelta strategica molto importante."
  },
  {
    "term": "Esclusiva territoriale",
    "category": "Distribuzione",
    "def": "Diritto riservato di diffusione in una specifica area geografica.",
    "longDef": "L’esclusiva territoriale assegna a un soggetto il diritto di distribuire o mostrare un’opera in una determinata zona o Paese. Serve a organizzare meglio la circolazione dei diritti e dei mercati. In distribuzione è un concetto chiave nei rapporti tra produttori, venditori e distributori."
  },
  {
    "term": "Diritti di distribuzione",
    "category": "Distribuzione",
    "def": "Permessi legali per diffondere un’opera su specifici canali o territori.",
    "longDef": "I diritti di distribuzione definiscono chi può mostrare, vendere o rendere disponibile un’opera e in quali modalità. Possono riguardare cinema, tv, streaming, scuole, festival o mercati internazionali. In distribuzione sono il fondamento legale di ogni circolazione del film."
  },
  {
    "term": "Sales agent - Agente di vendita",
    "category": "Distribuzione",
    "def": "Figura che promuove e vende il film a distributori e mercati.",
    "longDef": "Il sales agent è il soggetto che rappresenta un’opera sul mercato e cerca accordi di distribuzione con territori, piattaforme o partner. Non distribuisce sempre direttamente, ma lavora per aprire opportunità commerciali e professionali. In distribuzione internazionale è una figura centrale."
  },
  {
    "term": "Buyer - Acquirente dei diritti",
    "category": "Distribuzione",
    "def": "Soggetto che acquista diritti di programmazione o diffusione.",
    "longDef": "Il buyer è chi valuta un’opera per acquistarne i diritti di utilizzo, distribuzione o programmazione su un certo canale o territorio. Può lavorare per tv, piattaforme, sale, compagnie o eventi. In distribuzione rappresenta il lato che seleziona cosa portare al pubblico."
  },
  {
    "term": "Target di pubblico",
    "category": "Distribuzione",
    "def": "Fascia di spettatori a cui l’opera si rivolge principalmente.",
    "longDef": "Il target di pubblico è il gruppo di spettatori più adatto o più interessato all’opera in base a età, gusti, temi e abitudini di visione. Capirlo bene aiuta a promuovere e collocare meglio il film. In distribuzione è una bussola strategica molto utile."
  },
  {
    "term": "Posizionamento",
    "category": "Distribuzione",
    "def": "Identità con cui il film viene presentato al mercato e al pubblico.",
    "longDef": "Il posizionamento è il modo in cui un’opera viene definita e proposta in termini di genere, tono, valore, pubblico e contesto. Non basta dire cos’è un film: bisogna capire dove sta e perché dovrebbe interessare. In distribuzione il posizionamento orienta tutta la comunicazione."
  },
  {
    "term": "Materiali promozionali",
    "category": "Distribuzione",
    "def": "Elementi usati per presentare e promuovere il film.",
    "longDef": "I materiali promozionali comprendono trailer, teaser, locandine, sinossi, still, press kit e altri contenuti utili a far conoscere l’opera. Sono strumenti fondamentali per attirare interesse e comunicare identità. In distribuzione spesso fanno una grande differenza nella prima impressione."
  },
  {
    "term": "Trailer",
    "category": "Distribuzione",
    "def": "Montaggio promozionale che presenta il film al pubblico.",
    "longDef": "Il trailer è un video breve che seleziona e organizza immagini, ritmo e tono dell’opera per generare interesse. Non racconta tutto, ma suggerisce abbastanza da incuriosire. In distribuzione è uno dei materiali promozionali più importanti."
  },
  {
    "term": "Teaser",
    "category": "Distribuzione",
    "def": "Video promozionale molto breve che anticipa l’opera senza mostrarla pienamente.",
    "longDef": "Il teaser è un contenuto ancora più breve e sintetico del trailer, pensato per creare curiosità e attesa. Può puntare più sull’atmosfera che sulle informazioni. In distribuzione è utile nelle prime fasi della comunicazione."
  },
  {
    "term": "Locandina",
    "category": "Distribuzione",
    "def": "Immagine promozionale principale del film.",
    "longDef": "La locandina è uno degli strumenti visivi centrali con cui un’opera viene presentata al pubblico. Deve sintetizzare tono, identità e attrattiva del film in un’immagine forte e riconoscibile. In distribuzione è un elemento fondamentale del packaging comunicativo."
  },
  {
    "term": "Press kit - Cartella stampa",
    "category": "Distribuzione",
    "def": "Raccolta di materiali informativi destinati a stampa e operatori.",
    "longDef": "Il press kit contiene sinossi, note di regia, cast, crew, immagini, crediti e materiali utili per giornalisti, festival o distributori. Serve a presentare l’opera in modo ordinato e professionale. In distribuzione è uno strumento molto utile per la comunicazione istituzionale."
  },
  {
    "term": "Sinossi festivaliera",
    "category": "Distribuzione",
    "def": "Testo sintetico pensato per cataloghi, schede e selezioni.",
    "longDef": "La sinossi festivaliera è una versione breve e mirata della presentazione del film, pensata per chi deve leggere molte opere in poco tempo. Deve essere chiara, evocativa e precisa. In distribuzione festivaliera è un elemento molto importante della candidatura."
  },
  {
    "term": "Pass - Accredito",
    "category": "Distribuzione",
    "def": "Accesso professionale riservato agli operatori del settore.",
    "longDef": "L’accredito industry consente a professionisti, produttori, distributori, stampa o altri operatori di partecipare a eventi e mercati con accessi specifici. Favorisce visioni, incontri e networking. In distribuzione è spesso uno strumento concreto per aprire relazioni professionali."
  },
  {
    "term": "D&R o Q&A - Domande e risposte",
    "category": "Distribuzione",
    "def": "Incontro pubblico di domande e risposte dopo la proiezione.",
    "longDef": "Il Q&A è il momento in cui autori, registi o membri del cast dialogano con il pubblico dopo la visione del film. Può rafforzare ricezione, interesse e impatto dell’opera. In distribuzione è molto utile soprattutto nei festival e nelle proiezioni evento."
  },
  {
    "term": "Passaparola",
    "category": "Distribuzione",
    "def": "Diffusione spontanea dell’interesse verso il film tra gli spettatori.",
    "longDef": "Il passaparola è il modo in cui il pubblico consiglia o discute un’opera generando attenzione organica. Non si compra direttamente, ma si può favorire con qualità, timing e contesto giusto. In distribuzione è spesso uno dei fattori più efficaci e autentici."
  },
  {
    "term": "Tenitura",
    "category": "Distribuzione",
    "def": "Durata di permanenza del film in programmazione.",
    "longDef": "La tenitura indica per quanto tempo un’opera resta visibile in sala o in un certo circuito di programmazione. Può dipendere da risultati, interesse del pubblico o accordi distributivi. In distribuzione è un indicatore importante della tenuta reale del film."
  },
  {
    "term": "Tour promozionale",
    "category": "Distribuzione",
    "def": "Serie di presentazioni o proiezioni accompagnate da attività di lancio.",
    "longDef": "Il tour promozionale è un percorso di eventi, incontri e tappe che accompagna l’uscita del film in più luoghi o contesti. Può coinvolgere regista, cast o partner dell’opera. In distribuzione aiuta a costruire visibilità e relazione diretta col pubblico."
  },
  {
    "term": "Piattaforma streaming",
    "category": "Distribuzione",
    "def": "Servizio online che rende l’opera disponibile in visione digitale.",
    "longDef": "La piattaforma streaming è uno dei canali principali attraverso cui un’opera può raggiungere spettatori fuori dalla sala. Può trattarsi di grandi operatori o di servizi più piccoli e specializzati. In distribuzione rappresenta ormai una delle finestre più rilevanti."
  },
  {
    "term": "Release strategy - Piano di distribuzione",
    "category": "Distribuzione",
    "def": "Piano con cui si decide come, dove e quando lanciare l’opera.",
    "longDef": "La release strategy è la strategia complessiva che stabilisce tempi, canali, materiali promozionali e target del lancio di un film. Tiene conto di festival, sale, streaming, stampa e pubblico potenziale. In distribuzione è il cuore della pianificazione del percorso dell’opera."
  },
  {
    "term": "Analisi del personaggio",
    "category": "Recitazione",
    "def": "Studio approfondito delle caratteristiche interiori ed esteriori del ruolo.",
    "longDef": "L’analisi del personaggio è il lavoro con cui l’attore ricostruisce identità, passato, desideri, paure e comportamento del ruolo. Serve a rendere ogni scelta più coerente e meno superficiale. In recitazione è uno dei passaggi fondamentali della preparazione."
  },
  {
    "term": "Circostanze date",
    "category": "Recitazione",
    "def": "Insieme delle informazioni che il testo fornisce sulla situazione scenica.",
    "longDef": "Le circostanze date comprendono tutto ciò che il copione stabilisce: luogo, tempo, relazioni, eventi precedenti e condizioni del personaggio. Sono il terreno concreto su cui l’attore costruisce la scena. In recitazione aiutano a evitare interpretazioni astratte o scollegate dal testo."
  },
  {
    "term": "Super-obiettivo - Obiettivo principale del personaggio",
    "category": "Recitazione",
    "def": "Meta profonda che guida il personaggio lungo tutta l’opera.",
    "longDef": "Il super-obiettivo è il desiderio centrale che orienta il personaggio nell’intero arco del racconto. Non riguarda solo una singola scena, ma la spinta generale che tiene insieme le sue azioni. In recitazione è utile per dare continuità al lavoro interpretativo."
  },
  {
    "term": "Preparazione del ruolo",
    "category": "Recitazione",
    "def": "Fase di studio e costruzione del personaggio prima della scena.",
    "longDef": "La preparazione del ruolo comprende lettura, analisi, prove, ricerca e lavoro su corpo e voce. È il processo attraverso cui l’attore rende abitabile il personaggio prima di portarlo in scena o davanti alla camera. In recitazione una buona preparazione rende più solida e libera la performance."
  },
  {
    "term": "Lettura a tavolino",
    "category": "Recitazione",
    "def": "Prima lettura condivisa del testo con regista e cast.",
    "longDef": "La lettura a tavolino è il momento in cui il copione viene letto insieme, spesso prima delle prove vere e proprie. Serve a chiarire tono, intenzioni, relazioni e struttura della scena. In recitazione è utile perché crea una base comune tra interpreti e regia."
  },
  {
    "term": "Self-tape - Provino registrato",
    "category": "Recitazione",
    "def": "Provino registrato autonomamente in video dall’attore.",
    "longDef": "Il self-tape è un’audizione realizzata dall’attore in autonomia, di solito seguendo indicazioni ricevute da casting o produzione. Richiede precisione, sintesi e capacità di rendere la scena efficace anche in un set minimale. In recitazione è diventato uno strumento molto importante nel lavoro professionale contemporaneo."
  },
  {
    "term": "Callback - Seconda convocazione",
    "category": "Recitazione",
    "def": "Seconda audizione richiesta dopo una prima selezione.",
    "longDef": "Il callback è una fase successiva del casting in cui l’attore viene richiamato per approfondire la prova. Può servire a testare un’altra scena, verificare la chimica con altri interpreti o valutare meglio la compatibilità col ruolo. In recitazione è un momento decisivo del processo di selezione."
  },
  {
    "term": "Immedesimazione",
    "category": "Recitazione",
    "def": "Capacità di entrare nel punto di vista del personaggio.",
    "longDef": "L’immedesimazione è il processo con cui l’attore prova a vivere dall’interno emozioni, logiche e percezioni del ruolo. Non significa perdere sé stesso, ma costruire un accesso credibile alla verità del personaggio. In recitazione è una via importante per rendere la performance autentica."
  },
  {
    "term": "Distanziamento",
    "category": "Recitazione",
    "def": "Scelta interpretativa che mantiene una certa distanza critica dal personaggio.",
    "longDef": "Il distanziamento è un approccio in cui l’attore non si fonde completamente con il ruolo, ma ne mostra anche la costruzione o il significato. Può essere usato per rendere la recitazione più lucida, ironica o riflessiva. In recitazione è spesso associato a linguaggi meno naturalistici."
  },
  {
    "term": "Impulso scenico",
    "category": "Recitazione",
    "def": "Spinta immediata che genera una reazione o un’azione in scena.",
    "longDef": "L’impulso scenico è il momento interno che precede la parola o il gesto, come una scintilla che mette in moto l’azione. Lavorarci aiuta l’attore a evitare movimenti meccanici e a rendere la scena più viva. In recitazione è legato alla verità del momento presente."
  },
  {
    "term": "Centro del personaggio",
    "category": "Recitazione",
    "def": "Punto fisico o simbolico da cui parte l’energia del ruolo.",
    "longDef": "Il centro del personaggio è un riferimento corporeo o immaginativo che aiuta a definire come il ruolo occupa lo spazio e si muove. Può trovarsi nel petto, nella testa, nel bacino o in un’idea più astratta. In recitazione è utile per differenziare i personaggi anche sul piano fisico."
  },
  {
    "term": "Energia scenica",
    "category": "Recitazione",
    "def": "Qualità e intensità con cui l’attore abita la scena.",
    "longDef": "L’energia scenica è il livello di presenza, vitalità e tensione con cui un attore sostiene il proprio lavoro davanti al pubblico o alla camera. Non coincide con l’agitazione, ma con la capacità di restare pienamente attivo e leggibile. In recitazione è ciò che rende una performance viva."
  },
  {
    "term": "Neutralità corporea",
    "category": "Recitazione",
    "def": "Stato fisico essenziale libero da abitudini espressive superflue.",
    "longDef": "La neutralità corporea è una condizione di base in cui il corpo non comunica ancora un carattere preciso, ma resta disponibile e aperto. Serve a togliere automatismi personali e a costruire il personaggio da zero. In recitazione è un passaggio molto utile nel training."
  },
  {
    "term": "Maschera neutra",
    "category": "Recitazione",
    "def": "Strumento di training usato per lavorare su presenza e corpo essenziale.",
    "longDef": "La maschera neutra è una maschera espressivamente spoglia che obbliga l’attore a lavorare su postura, respiro, gesto e attenzione. Eliminando il volto, mette in evidenza il corpo e la qualità del movimento. In recitazione è un esercizio importante di precisione e consapevolezza."
  },
  {
    "term": "Asse del corpo",
    "category": "Recitazione",
    "def": "Allineamento fisico che sostiene equilibrio e controllo scenico.",
    "longDef": "L’asse del corpo è la linea di equilibrio che attraversa il corpo e ne organizza stabilità e postura. Quando è chiaro, il movimento appare più sicuro, leggibile e coerente. In recitazione è fondamentale per lavorare con presenza e controllo fisico."
  },
  {
    "term": "Sguardo scenico",
    "category": "Recitazione",
    "def": "Uso consapevole dello sguardo come strumento di relazione e significato.",
    "longDef": "Lo sguardo scenico è il modo in cui l’attore indirizza attenzione, intenzione ed energia attraverso gli occhi. Può creare legame, distanza, minaccia, ascolto o desiderio. In recitazione lo sguardo è spesso decisivo quanto la battuta."
  },
  {
    "term": "Relazione scenica",
    "category": "Recitazione",
    "def": "Dinamica viva tra due o più personaggi all’interno della scena.",
    "longDef": "La relazione scenica è il rapporto attivo che si crea tra i personaggi durante una sequenza. Non dipende solo dal testo, ma da ascolto, reazioni, ritmo e tensione reciproca. In recitazione è uno degli elementi che danno profondità e verità alla scena."
  },
  {
    "term": "Sostituzione emotiva",
    "category": "Recitazione",
    "def": "Tecnica che collega la scena a un riferimento emotivo personale equivalente.",
    "longDef": "La sostituzione emotiva consiste nell’associare una situazione del personaggio a un’esperienza o immagine personale che ne attivi la verità interiore. Non serve a copiare la propria vita, ma a trovare un accesso autentico all’emozione. In recitazione è una tecnica utile se usata con misura e intelligenza."
  },
  {
    "term": "Training attoriale - Allenamento dell’attore",
    "category": "Recitazione",
    "def": "Insieme di esercizi che sviluppano strumenti fisici, vocali ed emotivi dell’attore.",
    "longDef": "Il training attoriale è il lavoro continuativo con cui un interprete affina corpo, voce, ascolto, concentrazione e presenza scenica. Può includere improvvisazione, movimento, respirazione, dizione e studio del testo. In recitazione è essenziale per mantenere disponibilità e precisione."
  },
  {
    "term": "Entrare nel personaggio",
    "category": "Recitazione",
    "def": "Passaggio con cui l’attore assume progressivamente identità e logica del ruolo.",
    "longDef": "Entrare nel personaggio significa trovare il punto in cui voce, postura, intenzione e immaginazione cominciano a funzionare come un’unità coerente. Non è un gesto magico, ma un processo di attivazione. In recitazione rappresenta il momento in cui il ruolo smette di essere esterno e diventa vivo."
  },
  {
    "term": "High key",
    "category": "Fotografia",
    "def": "Schema visivo molto luminoso con contrasto ridotto.",
    "longDef": "L’high key è una resa fotografica chiara e diffusa, con ombre leggere e immagine generalmente morbida. Viene spesso usata in scene eleganti, pubblicitarie o dal tono leggero. In fotografia comunica pulizia, apertura e luminosità."
  },
  {
    "term": "Low key",
    "category": "Fotografia",
    "def": "Schema visivo scuro e contrastato con forti zone d’ombra.",
    "longDef": "Il low key è un’impostazione in cui le ombre prevalgono e la luce viene dosata in modo selettivo. Produce immagini più drammatiche, misteriose o intense. In fotografia è molto usato quando si cerca tensione, profondità o atmosfera."
  },
  {
    "term": "Chiaroscuro",
    "category": "Fotografia",
    "def": "Contrasto espressivo tra luce e ombra nella composizione visiva.",
    "longDef": "Il chiaroscuro è l’uso intenzionale della differenza tra zone illuminate e zone scure per modellare spazio, volto e volume. Non è solo un effetto estetico, ma anche un modo per dare senso e drammaticità all’immagine. In fotografia è uno dei principi più importanti della costruzione visiva."
  },
  {
    "term": "Silhouette",
    "category": "Fotografia",
    "def": "Figura scura ritagliata contro uno sfondo più luminoso.",
    "longDef": "La silhouette si ottiene quando il soggetto non è esposto per mostrare dettaglio interno, ma appare come forma nera o molto scura. È una soluzione forte e sintetica, utile per creare immagini evocative o iconiche. In fotografia funziona bene soprattutto con sfondi molto chiari o controluce marcati."
  },
  {
    "term": "Flare",
    "category": "Fotografia",
    "def": "Riflesso o alone prodotto dalla luce che colpisce direttamente l’obiettivo.",
    "longDef": "Il flare è un effetto ottico che compare quando una fonte luminosa entra direttamente o quasi direttamente nell’ottica. Può generare aloni, velature o riflessi interni. In fotografia può essere un difetto da controllare oppure una scelta estetica consapevole."
  },
  {
    "term": "Golden hour",
    "category": "Fotografia",
    "def": "Momento di luce calda e morbida subito dopo l’alba o prima del tramonto.",
    "longDef": "La golden hour è la fascia oraria in cui il sole è basso e produce una luce dorata, morbida e molto gradevole. È ideale per ritratti, paesaggi e scene dal tono poetico o naturale. In fotografia è uno dei momenti più amati per la qualità della luce."
  },
  {
    "term": "Blue hour",
    "category": "Fotografia",
    "def": "Momento crepuscolare in cui la luce ambientale assume tonalità bluastre.",
    "longDef": "La blue hour si colloca poco prima dell’alba o subito dopo il tramonto, quando il cielo conserva luminosità ma il sole non è più visibile. Produce un’atmosfera fredda, sospesa e molto cinematografica. In fotografia è perfetta per città, esterni e immagini contemplative."
  },
  {
    "term": "Luce ambientale",
    "category": "Fotografia",
    "def": "Luce generale presente nello spazio prima di interventi aggiuntivi.",
    "longDef": "La luce ambientale è l’illuminazione complessiva già esistente in un luogo, naturale o artificiale. Costituisce la base da cui partire per valutare interventi correttivi o stilistici. In fotografia è importante perché definisce il tono iniziale della scena."
  },
  {
    "term": "Luce disponibile",
    "category": "Fotografia",
    "def": "Luce già presente sul posto, usata senza grandi modifiche esterne.",
    "longDef": "La luce disponibile è quella che si sceglie di sfruttare così com’è, senza costruire un impianto complesso di illuminazione. Può richiedere adattamento tecnico e sensibilità nella scelta del punto di ripresa. In fotografia è spesso associata a lavori più naturali, documentari o veloci."
  },
  {
    "term": "Top light",
    "category": "Fotografia",
    "def": "Luce che arriva dall’alto sul soggetto.",
    "longDef": "La top light è una sorgente luminosa posta sopra il soggetto, verticale o quasi. Può dare volume, autorità o anche un effetto severo, a seconda di intensità e diffusione. In fotografia va controllata bene perché può accentuare ombre su occhi e lineamenti."
  },
  {
    "term": "Side light",
    "category": "Fotografia",
    "def": "Luce laterale che scolpisce il volume del soggetto.",
    "longDef": "La side light arriva di lato rispetto alla camera e mette in evidenza rilievi, texture e tridimensionalità. È molto efficace per dare profondità a volti, corpi e oggetti. In fotografia è una luce molto espressiva e strutturante."
  },
  {
    "term": "Underlight",
    "category": "Fotografia",
    "def": "Luce proveniente dal basso verso l’alto.",
    "longDef": "L’underlight è una luce collocata sotto il soggetto, una posizione meno naturale rispetto ad altre fonti. Può creare effetti inquietanti, stranianti o teatrali. In fotografia è usata soprattutto per risultati stilizzati o fortemente drammatici."
  },
  {
    "term": "Gobo",
    "category": "Fotografia",
    "def": "Accessorio che modella la luce attraverso sagome o aperture controllate.",
    "longDef": "Il gobo è un elemento posto davanti a una fonte luminosa per modificarne forma, direzione o pattern. Può servire a simulare finestre, fogliame o altri effetti di luce tagliata. In fotografia è molto utile per arricchire la scena con disegni luminosi più articolati."
  },
  {
    "term": "Cucoloris",
    "category": "Fotografia",
    "def": "Schermo sagomato usato per creare ombre irregolari e naturali.",
    "longDef": "Il cucoloris è un pannello traforato o irregolare che spezza la luce creando pattern complessi e realistici. Viene spesso usato per simulare ombre di rami, tende o elementi ambientali. In fotografia aiuta a dare maggiore ricchezza e naturalezza alla luce."
  },
  {
    "term": "Bandiera",
    "category": "Fotografia",
    "def": "Pannello opaco usato per bloccare o contenere la luce.",
    "longDef": "La bandiera serve a interrompere, sagomare o limitare il passaggio della luce su una parte della scena. È uno strumento semplice ma molto importante per controllare precisione e contrasto. In fotografia aiuta a togliere luce dove non deve arrivare."
  },
  {
    "term": "Softbox",
    "category": "Fotografia",
    "def": "Accessorio diffusore che rende la luce più ampia e morbida.",
    "longDef": "Il softbox è una struttura che si applica a una fonte luminosa per ammorbidirne la resa e controllarne la diffusione. Produce ombre più dolci e una luce più uniforme. In fotografia è molto usato nei ritratti e nelle riprese controllate."
  },
  {
    "term": "Fresnel",
    "category": "Fotografia",
    "def": "Faro con lente che permette di concentrare o allargare la luce.",
    "longDef": "Il Fresnel è una fonte luminosa dotata di lente frontale che consente di regolare il fascio da più stretto a più ampio. Offre una luce controllabile e molto precisa. In fotografia e cinema è uno strumento classico dell’illuminazione professionale."
  },
  {
    "term": "Haze",
    "category": "Fotografia",
    "def": "Nebbia leggera usata per rendere visibili i fasci di luce nello spazio.",
    "longDef": "L’haze è una sospensione controllata di particelle leggere nell’aria che aiuta a visualizzare i raggi luminosi. Non serve solo a “fare atmosfera”, ma anche a dare corpo e profondità alla luce. In fotografia può rendere la scena più materica e cinematografica."
  },
  {
    "term": "Volumetria della luce",
    "category": "Fotografia",
    "def": "Percezione tridimensionale della luce all’interno dello spazio.",
    "longDef": "La volumetria della luce è l’effetto per cui la luce non si limita a illuminare le superfici, ma appare presente anche nell’aria e nello spazio. Dipende da direzione, particelle, contrasto e composizione. In fotografia rafforza molto il senso di profondità e atmosfera."
  },
  {
    "term": "Riflesso speculare",
    "category": "Fotografia",
    "def": "Punto di luce brillante riflesso su una superficie lucida.",
    "longDef": "Il riflesso speculare è il riflesso diretto e intenso di una fonte luminosa su materiali lucidi come pelle, vetro, metallo o acqua. Può valorizzare texture e volume oppure diventare invasivo se non controllato. In fotografia è un elemento importante della resa materica."
  },
  {
    "term": "Campagna di lancio",
    "category": "Distribuzione",
    "def": "Insieme coordinato di azioni promozionali che accompagnano l’uscita del film.",
    "longDef": "La campagna di lancio comprende materiali, uscite stampa, eventi, social, trailer e attività promozionali pensate per far arrivare l’opera al pubblico nel modo più efficace. Non riguarda solo “fare pubblicità”, ma costruire attenzione nel momento giusto. In distribuzione è una parte strategica fondamentale."
  },
  {
    "term": "Ufficio stampa",
    "category": "Distribuzione",
    "def": "Struttura o figura che cura i rapporti con giornalisti e media.",
    "longDef": "L’ufficio stampa si occupa di comunicati, interviste, press kit, anteprime e contatti con testate e operatori dell’informazione. Il suo compito è far parlare del film in modo coerente e visibile. In distribuzione è decisivo per dare all’opera una presenza pubblica più forte."
  },
  {
    "term": "Screening stampa",
    "category": "Distribuzione",
    "def": "Proiezione riservata a giornalisti e critici prima o durante l’uscita.",
    "longDef": "Lo screening stampa è una visione dedicata ai professionisti dell’informazione, pensata per favorire recensioni, articoli e copertura mediatica. Può influire molto sul modo in cui il film viene recepito all’esterno. In distribuzione è una tappa importante della comunicazione."
  },
  {
    "term": "Screening mercato",
    "category": "Distribuzione",
    "def": "Proiezione destinata a buyer, distributori e operatori del settore.",
    "longDef": "Lo screening mercato è una proiezione pensata non tanto per il pubblico generico quanto per chi valuta l’opera in chiave professionale o commerciale. Serve a generare interesse, trattative o nuovi contatti. In distribuzione è molto utile nei mercati e nei festival industry."
  },
  {
    "term": "Vendite internazionali",
    "category": "Distribuzione",
    "def": "Attività di cessione del film a territori esteri o partner stranieri.",
    "longDef": "Le vendite internazionali riguardano la possibilità di far circolare l’opera fuori dal proprio Paese attraverso accordi con distributori, piattaforme o agenti esteri. Richiedono materiali adeguati e un buon posizionamento del film. In distribuzione sono una leva importante per ampliare la vita del progetto."
  },
  {
    "term": "Pre-vendita dei diritti",
    "category": "Distribuzione",
    "def": "Cessione anticipata di diritti prima dell’uscita o del completamento dell’opera.",
    "longDef": "La pre-vendita dei diritti avviene quando un soggetto acquista in anticipo la possibilità di distribuire o programmare il film. Può aiutare a finanziare o rafforzare il progetto ancora prima della sua piena uscita. In distribuzione è uno strumento importante soprattutto nei contesti più strutturati."
  },
  {
    "term": "Minimo garantito",
    "category": "Distribuzione",
    "def": "Somma anticipata riconosciuta al produttore in cambio dei diritti di sfruttamento.",
    "longDef": "Il minimo garantito è un importo che il distributore o il buyer versa in anticipo, garantendo un valore minimo all’operazione. Rappresenta una forma di impegno concreto sul potenziale dell’opera. In distribuzione è un indicatore importante della fiducia commerciale nel film."
  },
  {
    "term": "Deliverables - Materiali di consegna",
    "category": "Distribuzione",
    "def": "Materiali tecnici e documentali richiesti per distribuire correttamente l’opera.",
    "longDef": "I deliverables comprendono file master, sottotitoli, materiali grafici, crediti, documenti legali, cue sheet e altri elementi necessari alla consegna professionale del film. Senza di essi la distribuzione può rallentarsi o bloccarsi. In distribuzione rappresentano il pacchetto operativo indispensabile."
  },
  {
    "term": "DCP",
    "category": "Distribuzione",
    "def": "Formato digitale standard per la proiezione cinematografica in sala.",
    "longDef": "Il DCP, Digital Cinema Package, è il contenitore tecnico con cui i film vengono forniti ai cinema digitali per la proiezione. Deve rispettare standard precisi per qualità e compatibilità. In distribuzione in sala è uno dei formati più importanti."
  },
  {
    "term": "Sottotitolazione",
    "category": "Distribuzione",
    "def": "Inserimento o preparazione dei sottotitoli per rendere il film accessibile in altre lingue.",
    "longDef": "La sottotitolazione permette a un’opera di viaggiare verso pubblici diversi senza alterarne la voce originale. Richiede precisione linguistica, sintesi e rispetto del ritmo del parlato. In distribuzione è essenziale per festival, mercati internazionali e piattaforme."
  },
  {
    "term": "Doppiaggio",
    "category": "Distribuzione",
    "def": "Sostituzione delle voci originali con una versione in un’altra lingua.",
    "longDef": "Il doppiaggio consiste nella registrazione di nuove voci sincronizzate con il movimento labiale e l’interpretazione visiva del film. È una pratica importante in certi mercati o canali distributivi. In distribuzione amplia l’accessibilità dell’opera ma richiede investimento e cura."
  },
  {
    "term": "Versione internazionale",
    "category": "Distribuzione",
    "def": "Versione del film preparata per circolazione e vendita all’estero.",
    "longDef": "La versione internazionale è un asset pronto per l’export, spesso privo di testi impressi o con elementi adattabili per altri mercati. Serve a facilitare vendite, festival e consegne internazionali. In distribuzione è molto utile per rendere il film più flessibile."
  },
  {
    "term": "Metadata di piattaforma",
    "category": "Distribuzione",
    "def": "Informazioni descrittive e tecniche richieste dai servizi digitali per pubblicare l’opera.",
    "longDef": "I metadata di piattaforma comprendono titolo, logline, sinossi, tag, cast, durata, genere, immagini e dati tecnici. Servono a classificare correttamente il film e a renderlo trovabile dagli utenti. In distribuzione digitale sono un elemento operativo essenziale."
  },
  {
    "term": "Geo-blocking - Blocco geografico",
    "category": "Distribuzione",
    "def": "Limitazione dell’accesso al film in base al territorio geografico dell’utente.",
    "longDef": "Il geo-blocking impedisce o consente la visione dell’opera solo in specifiche aree del mondo. È legato ai diritti territoriali e alla gestione delle finestre distributive. In distribuzione digitale è uno strumento molto comune di controllo."
  },
  {
    "term": "SVOD - Video on demand in abbonamento",
    "category": "Distribuzione",
    "def": "Modello di streaming basato su abbonamento periodico.",
    "longDef": "SVOD significa Subscription Video On Demand e indica i servizi in cui l’utente paga un abbonamento per accedere a un catalogo di contenuti. È uno dei modelli più diffusi nel mercato attuale. In distribuzione rappresenta una finestra molto rilevante per molti progetti."
  },
  {
    "term": "TVOD - Video on demand singolo",
    "category": "Distribuzione",
    "def": "Modello di fruizione in cui si paga per noleggiare o acquistare il singolo contenuto.",
    "longDef": "TVOD significa Transactional Video On Demand e riguarda piattaforme in cui ogni titolo viene acquistato o noleggiato separatamente. È una formula diversa dall’abbonamento, più legata al singolo evento di visione. In distribuzione può essere utile per titoli con pubblico motivato o nicchie specifiche."
  },
  {
    "term": "AVOD - Video on demand con pubblicità",
    "category": "Distribuzione",
    "def": "Modello di streaming finanziato dalla pubblicità.",
    "longDef": "AVOD significa Advertising Video On Demand e indica contenuti accessibili gratuitamente o quasi, sostenuti dagli annunci pubblicitari. In questo modello la monetizzazione deriva più dal volume di visualizzazioni che dal pagamento diretto del pubblico. In distribuzione digitale è una formula sempre più presente."
  },
  {
    "term": "Day-and-date - Uscita simultanea",
    "category": "Distribuzione",
    "def": "Uscita simultanea dell’opera su più canali o territori nello stesso giorno.",
    "longDef": "Il day-and-date è una strategia distributiva in cui il film esce contemporaneamente, per esempio in sala e online, oppure in più mercati nello stesso momento. Può rafforzare l’impatto del lancio e ridurre dispersioni temporali. In distribuzione è una scelta molto precisa, non sempre adatta a ogni progetto."
  },
  {
    "term": "Revenue share - Ripartizione dei ricavi",
    "category": "Distribuzione",
    "def": "Modello di ripartizione dei ricavi tra i soggetti coinvolti.",
    "longDef": "Il revenue share è un accordo in cui gli incassi o i ricavi vengono divisi secondo percentuali stabilite tra produttore, distributore, piattaforma o altri partner. È frequente in contesti digitali o indipendenti. In distribuzione definisce concretamente come il valore economico dell’opera viene condiviso."
  },
  {
    "term": "Box office - Incasso al botteghino",
    "category": "Distribuzione",
    "def": "Incasso generato dalla vendita dei biglietti al cinema.",
    "longDef": "Il box office misura il risultato economico ottenuto da un film nelle sale attraverso gli ingressi paganti. È uno degli indicatori più visibili del rendimento commerciale di un’opera, anche se non ne esaurisce il valore complessivo. In distribuzione è spesso il dato più osservato nelle uscite theatrical."
  },

{
  "term": "Boom operator - Microfonista",
  "category": "Audio",
  "def": "Tecnico che manovra il boom durante le riprese.",
  "longDef": "Il boom operator è la figura che posiziona e muove il microfono montato sul boom durante le riprese. Deve seguire gli attori, rispettare l’inquadratura, evitare ombre e mantenere il microfono nella posizione migliore possibile. In audio di presa diretta è un ruolo fondamentale, perché dalla sua precisione dipendono chiarezza dei dialoghi e qualità del suono registrato."
},
{
  "term": "Clap sonoro",
  "category": "Audio",
  "def": "Segnale secco usato per sincronizzare audio e video.",
  "longDef": "Il clap sonoro è il colpo prodotto dal ciak o da un segnale equivalente per creare un riferimento chiaro tra immagine e suono. Il picco audio generato dal clap permette di allineare più facilmente la traccia sonora con il fotogramma in cui il ciak si chiude. In audio e montaggio è uno strumento semplice ma molto efficace per mantenere una sincronizzazione precisa."
},
{
  "term": "Decibel - Unità di livello sonoro",
  "category": "Audio",
  "def": "Unità usata per misurare livelli e variazioni del segnale audio.",
  "longDef": "Il decibel è un’unità di misura usata per esprimere livelli sonori, variazioni di volume e rapporti tra segnali. In ambito audio può riferirsi a scale diverse, come dBFS nel digitale o dB SPL nella pressione sonora reale. Conoscere il decibel è importante perché permette di interpretare correttamente livelli, picchi, headroom e rischio di distorsione."
},
{
  "term": "dBFS - Decibel fondo scala",
  "category": "Audio",
  "def": "Scala digitale in cui 0 dBFS rappresenta il limite massimo del segnale.",
  "longDef": "Il dBFS, cioè decibel full scale, è la scala usata nell’audio digitale per misurare il livello del segnale rispetto al massimo consentito dal sistema. In questa scala 0 dBFS è il limite superiore: superarlo porta al clipping digitale. In registrazione e postproduzione è essenziale lasciare margine sotto lo zero, così da evitare distorsioni e mantenere un segnale pulito."
},
{
  "term": "Delay - Ritardo sonoro",
  "category": "Audio",
  "def": "Effetto o fenomeno in cui un suono viene ripetuto con un ritardo controllato.",
  "longDef": "Il delay è un ritardo applicato a un segnale audio, che può produrre una ripetizione singola o molteplici ritorni del suono. Può essere usato come effetto creativo, per dare profondità, ritmo o spazialità, oppure può comparire come problema tecnico quando segnali diversi arrivano fuori tempo. In audio è importante distinguerlo dall’eco naturale e dal riverbero, perché ha una struttura temporale più precisa."
},
{
  "term": "Dialogue editing - Montaggio dialoghi",
  "category": "Audio",
  "def": "Pulizia e organizzazione delle tracce di dialogo in postproduzione.",
  "longDef": "Il dialogue editing è il lavoro di selezione, pulizia e organizzazione dei dialoghi registrati durante le riprese o in ADR. Include la scelta delle take migliori, la rimozione di rumori indesiderati, la gestione dei respiri, il raccordo tra battute e l’integrazione con room tone e ambienti. In postproduzione audio è una fase decisiva per rendere il parlato chiaro, continuo e credibile."
},
{
  "term": "Duck audio - Abbassamento automatico dell’audio",
  "category": "Audio",
  "def": "Riduzione automatica di una traccia quando ne entra un’altra più importante.",
  "longDef": "Il duck audio è una tecnica in cui il volume di una traccia viene abbassato automaticamente quando entra un segnale prioritario, come una voce sopra una musica. È molto usato in video, podcast, documentari e contenuti didattici per mantenere il parlato sempre comprensibile. In audio aiuta a costruire un mix più chiaro senza dover correggere manualmente ogni variazione di volume."
},
{
  "term": "Headroom - Margine dinamico",
  "category": "Audio",
  "def": "Spazio di sicurezza tra il livello del segnale e il limite massimo del sistema.",
  "longDef": "L’headroom è il margine disponibile tra il livello normale del segnale audio e il punto in cui il sistema va in saturazione o clipping. Lasciare headroom significa evitare che picchi improvvisi rovinino la registrazione. In audio professionale è una regola pratica fondamentale: un segnale troppo vicino al limite può sembrare forte, ma è anche molto più fragile e rischioso."
},
{
  "term": "Impedenza",
  "category": "Audio",
  "def": "Resistenza elettrica complessa che influenza il rapporto tra microfono e ingresso audio.",
  "longDef": "L’impedenza indica il modo in cui un dispositivo audio si oppone al passaggio del segnale elettrico. È importante soprattutto nel rapporto tra microfoni, cavi, preamplificatori e ingressi audio. In una catena di registrazione, una cattiva compatibilità di impedenza può ridurre livello, qualità o risposta in frequenza del segnale."
},
{
  "term": "Interferenza RF - Interferenza radio",
  "category": "Audio",
  "def": "Disturbo causato da segnali radio o trasmissioni wireless.",
  "longDef": "L’interferenza RF è un disturbo audio causato da segnali radio, telefoni, trasmettitori wireless o apparecchiature elettroniche vicine. Può manifestarsi come ronzii, crepitii, impulsi o suoni intermittenti difficili da prevedere. In audio sul set è un problema da controllare con attenzione, soprattutto quando si usano radiomicrofoni o registrazioni in ambienti pieni di dispositivi elettronici."
},
{
  "term": "Latenza audio",
  "category": "Audio",
  "def": "Ritardo tra ingresso del suono e sua riproduzione o registrazione.",
  "longDef": "La latenza audio è il ritardo che passa tra il momento in cui un suono entra nel sistema e il momento in cui viene ascoltato, registrato o elaborato. Può dipendere da schede audio, software, effetti digitali, buffer o collegamenti wireless. In registrazione e monitoraggio è importante tenerla bassa, perché una latenza eccessiva rende difficile parlare, suonare o sincronizzare correttamente le tracce."
},
{
  "term": "LUFS - Unità di loudness",
  "category": "Audio",
  "def": "Misura standardizzata della loudness percepita.",
  "longDef": "I LUFS, cioè Loudness Units relative to Full Scale, sono una misura standardizzata del volume percepito nel tempo. A differenza dei semplici picchi, tengono conto di come l’ascoltatore percepisce realmente l’intensità sonora. In audio per web, streaming e broadcast sono molto importanti perché permettono di consegnare contenuti con loudness coerente e meno sbalzi di volume tra un video e l’altro."
},
{
  "term": "Microfono boom",
  "category": "Audio",
  "def": "Microfono montato su asta per registrare dialoghi o suoni fuori campo.",
  "longDef": "Il microfono boom è il microfono montato su un’asta e posizionato vicino alla sorgente sonora senza entrare nell’inquadratura. Di solito viene orientato verso la bocca degli attori o verso l’azione principale. In presa diretta è uno degli strumenti più usati perché permette di ottenere dialoghi naturali e relativamente liberi dai rumori dei vestiti tipici dei lavalier."
},
{
  "term": "Mix stems - Sottogruppi di missaggio",
  "category": "Audio",
  "def": "Esportazioni separate dei principali gruppi sonori, come dialoghi, musiche ed effetti.",
  "longDef": "I mix stems sono versioni separate del mix finale divise per categorie sonore, come dialoghi, musiche, effetti, ambienti o voice over. Servono per consegne professionali, versioni internazionali, revisioni o adattamenti futuri. In postproduzione audio sono molto utili perché permettono di modificare una parte del mix senza dover ricostruire tutto il progetto da zero."
},
{
  "term": "Pad - Attenuatore",
  "category": "Audio",
  "def": "Riduzione controllata del livello di ingresso per evitare sovraccarichi.",
  "longDef": "Il pad è un attenuatore che riduce il livello del segnale prima che entri nel preamplificatore o nel registratore. Si usa quando una sorgente è troppo forte e rischia di saturare l’ingresso anche con il gain basso. In audio è utile con suoni molto intensi, microfoni sensibili o situazioni imprevedibili in cui serve più margine di sicurezza."
},
{
  "term": "Pan - Posizionamento stereo",
  "category": "Audio",
  "def": "Distribuzione di un suono tra canale sinistro e destro.",
  "longDef": "Il pan controlla la posizione percepita di un suono nel panorama stereo, spostandolo verso sinistra, centro o destra. Serve a creare spazio, separazione e ordine tra le diverse tracce del mix. In audio è uno strumento semplice ma fondamentale, perché aiuta lo spettatore ad ascoltare meglio gli elementi senza affollare il centro dell’immagine sonora."
},
{
  "term": "Pop filter - Filtro anti-pop",
  "category": "Audio",
  "def": "Filtro che riduce i colpi d’aria prodotti da alcune consonanti.",
  "longDef": "Il pop filter è un filtro posto davanti al microfono per attenuare i colpi d’aria prodotti da consonanti come “p” e “b”. Questi colpi possono generare esplosioni sonore sgradevoli e difficili da correggere dopo la registrazione. In audio vocale è uno strumento molto utile, soprattutto in doppiaggio, voice over, podcast e registrazioni ravvicinate."
},
{
  "term": "Proximity effect - Effetto prossimità",
  "category": "Audio",
  "def": "Aumento delle basse frequenze quando la sorgente è molto vicina al microfono.",
  "longDef": "Il proximity effect è l’aumento delle basse frequenze che si verifica quando una voce o una sorgente sonora è molto vicina a certi microfoni direzionali. Può rendere la voce più calda e profonda, ma anche troppo gonfia o poco naturale. In audio è importante conoscerlo perché la distanza dal microfono non cambia solo il volume, ma anche il timbro."
},
{
  "term": "Routing audio - Instradamento del segnale",
  "category": "Audio",
  "def": "Percorso con cui un segnale audio viene inviato tra ingressi, tracce e uscite.",
  "longDef": "Il routing audio è l’organizzazione del percorso del segnale tra microfoni, ingressi, tracce, bus, effetti e uscite. Stabilisce dove entra il suono, come viene elaborato e dove viene inviato. In registrazione e missaggio è fondamentale perché un routing chiaro evita confusione, errori di segnale e problemi nella gestione di progetti complessi."
},
{
  "term": "Sidechain - Controllo laterale",
  "category": "Audio",
  "def": "Tecnica in cui un segnale controlla l’elaborazione di un altro segnale.",
  "longDef": "Il sidechain è una tecnica in cui un segnale audio viene usato per controllare un processore applicato a un altro segnale. Un esempio comune è la voce che abbassa automaticamente la musica tramite compressione sidechain. In audio è molto utile per creare spazio nel mix, migliorare la comprensibilità del parlato e costruire effetti dinamici controllati."
},
{
  "term": "Radiomicrofono - Microfono wireless",
  "category": "Audio",
  "def": "Sistema microfonico senza fili composto da microfono, trasmettitore e ricevitore.",
  "longDef": "Il radiomicrofono è un sistema che permette di registrare una voce o una sorgente sonora senza collegamento fisico diretto tramite cavo. Di solito è composto da un microfono, spesso lavalier, un trasmettitore portato dal soggetto e un ricevitore collegato alla camera o al registratore. In audio di presa diretta è molto utile per interviste, scene in movimento e situazioni in cui il boom non può arrivare facilmente vicino alla fonte sonora."
},
{
  "term": "XLR - Connettore audio professionale",
  "category": "Audio",
  "def": "Connettore bilanciato usato per microfoni e apparecchiature audio professionali.",
  "longDef": "L’XLR è un tipo di connettore audio molto usato in ambito professionale, soprattutto per microfoni, mixer, registratori e interfacce audio. Permette collegamenti bilanciati, più resistenti a interferenze e rumori rispetto a connessioni più semplici. In audio è uno standard fondamentale perché garantisce robustezza, affidabilità e compatibilità tra molte apparecchiature."
},
{
  "term": "Filtro passa-alto - High-pass filter",
  "category": "Audio",
  "def": "Filtro che attenua le basse frequenze lasciando passare quelle più alte.",
  "longDef": "Il filtro passa-alto attenua le frequenze basse al di sotto di una certa soglia, lasciando passare le frequenze più alte. Viene usato per ridurre rimbombi, rumori di maneggio, vibrazioni, vento leggero o basse frequenze inutili in una registrazione vocale. In audio è uno strumento molto pratico per rendere il parlato più pulito e leggibile senza alterare troppo il timbro principale."
},
{
  "term": "Antivento - Windshield",
  "category": "Audio",
  "def": "Protezione applicata al microfono per ridurre il rumore del vento.",
  "longDef": "L’antivento è una protezione fisica applicata al microfono per ridurre l’impatto dell’aria sulla capsula. Può essere una semplice spugna, una copertura più strutturata o un sistema professionale per esterni. In presa diretta è indispensabile quando si registra fuori da ambienti controllati, perché anche un vento leggero può rendere il dialogo sporco o inutilizzabile."
},
{
  "term": "Dead cat - Antivento peloso",
  "category": "Audio",
  "def": "Copertura pelosa per microfono usata per attenuare il vento negli esterni.",
  "longDef": "Il dead cat è una copertura antivento pelosa usata soprattutto nelle registrazioni in esterno. I peli rallentano e distribuiscono il movimento dell’aria prima che raggiunga il microfono, riducendo colpi di vento e turbolenze. In audio di presa diretta è molto utile con microfoni shotgun e boom, specialmente in documentari, interviste all’aperto e riprese in condizioni atmosferiche variabili."
},
{
  "term": "Fase audio - Phase",
  "category": "Audio",
  "def": "Rapporto temporale tra onde sonore o segnali audio simili.",
  "longDef": "La fase audio indica il rapporto temporale tra due onde sonore o due segnali simili. Quando più microfoni registrano la stessa sorgente da distanze diverse, le onde possono arrivare leggermente sfalsate, modificando il timbro complessivo. In audio è importante controllare la fase perché piccoli sfasamenti possono rendere il suono meno pieno, meno chiaro o meno coerente."
},
{
  "term": "Cancellazione di fase - Phase cancellation",
  "category": "Audio",
  "def": "Perdita di frequenze causata da segnali simili fuori fase tra loro.",
  "longDef": "La cancellazione di fase avviene quando due segnali simili, ma non perfettamente allineati, si sommano riducendo o annullando alcune frequenze. Il risultato può essere un suono più sottile, vuoto, debole o innaturale. In audio è un problema frequente quando si usano più microfoni sulla stessa sorgente o quando si combinano tracce registrate da posizioni diverse."
},
{
  "term": "Timecode - Codice temporale",
  "category": "Audio",
  "def": "Codice numerico usato per sincronizzare audio, video e dispositivi diversi.",
  "longDef": "Il timecode è un codice temporale che identifica con precisione ore, minuti, secondi e fotogrammi all’interno di una registrazione. Viene usato per sincronizzare camera, registratore audio e altri dispositivi durante produzioni più organizzate. In audio e video professionale è molto utile perché rende più rapido e sicuro l’allineamento dei materiali in montaggio e postproduzione."
},
{
  "term": "Sound report - Rapporto sonoro",
  "category": "Audio",
  "def": "Documento di set con informazioni tecniche sulle registrazioni audio.",
  "longDef": "Il sound report è il rapporto compilato durante le riprese per annotare informazioni sulle registrazioni audio. Può includere numero di scena, take, file registrati, canali usati, microfoni, problemi tecnici, note sulla qualità e indicazioni utili al montaggio. In produzione e postproduzione è prezioso perché aiuta a ritrovare rapidamente il materiale corretto e a capire quali tracce sono affidabili."
},
{
  "term": "M&E track - Traccia musiche ed effetti",
  "category": "Audio",
  "def": "Traccia audio separata che contiene musiche ed effetti senza dialoghi.",
  "longDef": "La M&E track, cioè Music and Effects track, è una traccia o un mix separato che contiene musiche, effetti sonori e ambienti, ma non i dialoghi principali. È molto importante per doppiaggio, versioni internazionali e adattamenti linguistici, perché permette di sostituire le voci senza ricostruire tutto il suono del film. In postproduzione audio è una consegna professionale utile quando un’opera deve essere distribuita in più lingue."
},
{
  "term": "Distributore",
  "category": "Distribuzione",
  "def": "Soggetto che porta un film al pubblico attraverso sale, piattaforme o altri canali.",
  "longDef": "Il distributore è la figura o società che si occupa di rendere disponibile un film al pubblico attraverso uno o più canali, come sale cinematografiche, piattaforme streaming, home video, televisione o circuiti specializzati. Cura strategie di uscita, accordi commerciali, materiali promozionali e rapporti con esercenti o piattaforme. In distribuzione è un ruolo centrale, perché collega l’opera al suo mercato e al suo pubblico reale."
},
{
  "term": "Exhibitor - Esercente cinematografico",
  "category": "Distribuzione",
  "def": "Gestore o proprietario di sale cinematografiche che programma i film.",
  "longDef": "L’exhibitor è l’esercente cinematografico, cioè il soggetto che gestisce una o più sale e decide quali film programmare, in quali orari e per quanto tempo. Lavora in rapporto con distributori, agenzie di booking e pubblico locale. In distribuzione è importante perché il successo di un’uscita in sala dipende anche dalla qualità della programmazione, dalla posizione del cinema e dalla capacità dell’esercente di intercettare il pubblico giusto."
},
{
  "term": "Aggregator - Aggregatore digitale",
  "category": "Distribuzione",
  "def": "Intermediario che aiuta a portare un film sulle piattaforme digitali.",
  "longDef": "L’aggregator è un intermediario specializzato nella consegna e gestione dei contenuti verso piattaforme digitali, marketplace o servizi on demand. Può occuparsi di requisiti tecnici, metadata, file video, sottotitoli, artwork e procedure di pubblicazione. In distribuzione digitale è utile soprattutto per produzioni indipendenti che vogliono accedere a piattaforme senza avere rapporti diretti con ogni singolo servizio."
},
{
  "term": "Booking - Prenotazione delle sale",
  "category": "Distribuzione",
  "def": "Attività di negoziazione e organizzazione della programmazione nelle sale.",
  "longDef": "Il booking è il lavoro di negoziazione e pianificazione con cui un film viene inserito nella programmazione delle sale cinematografiche. Riguarda numero di schermi, città, date, orari, durata della tenitura e condizioni economiche. In distribuzione è una fase decisiva dell’uscita theatrical, perché determina concretamente dove e quando il pubblico potrà vedere il film."
},
{
  "term": "P&A - Costi di promozione e copie",
  "category": "Distribuzione",
  "def": "Budget destinato a pubblicità, promozione e materiali necessari all’uscita.",
  "longDef": "P&A significa Prints and Advertising e indica il budget destinato alla promozione e alla messa in circolazione del film. Storicamente comprendeva copie fisiche e pubblicità, mentre oggi include soprattutto marketing, materiali digitali, trailer, locandine, campagne social, ufficio stampa e consegne tecniche. In distribuzione è una voce fondamentale perché un film può essere valido, ma senza un adeguato investimento promozionale rischia di non raggiungere il pubblico."
},
{
  "term": "Limited release - Uscita limitata",
  "category": "Distribuzione",
  "def": "Uscita in un numero ridotto di sale o territori selezionati.",
  "longDef": "La limited release è una strategia di uscita in cui il film viene distribuito inizialmente in un numero ristretto di sale, città o territori. Serve spesso a testare la risposta del pubblico, creare passaparola, puntare su mercati specifici o sostenere film d’autore e indipendenti. In distribuzione può essere una scelta molto efficace quando il film non ha la forza promozionale per un lancio ampio immediato."
},
{
  "term": "Wide release - Uscita ampia",
  "category": "Distribuzione",
  "def": "Uscita contemporanea in molte sale o territori.",
  "longDef": "La wide release è una strategia di distribuzione in cui il film esce contemporaneamente in un numero elevato di sale o mercati. È tipica dei film con forte potenziale commerciale, campagne promozionali importanti o pubblico già identificabile. In distribuzione richiede investimenti consistenti e una buona capacità di generare attenzione rapidamente, perché il risultato dei primi giorni può influenzare molto la tenitura successiva."
},
{
  "term": "Platform release - Uscita progressiva",
  "category": "Distribuzione",
  "def": "Strategia di uscita graduale che parte da pochi mercati e si espande nel tempo.",
  "longDef": "La platform release è una strategia in cui il film esce inizialmente in pochi cinema o città selezionate e poi si espande gradualmente in base ai risultati, alle recensioni e al passaparola. È usata spesso per film d’autore, documentari, titoli indipendenti o opere candidate a premi. In distribuzione permette di costruire attenzione in modo progressivo, riducendo il rischio di un lancio troppo costoso e immediato."
},
{
  "term": "Holdover - Conferma in programmazione",
  "category": "Distribuzione",
  "def": "Decisione di mantenere un film in sala oltre il periodo inizialmente previsto.",
  "longDef": "L’holdover è la conferma di un film nella programmazione di una sala per un periodo ulteriore, di solito perché gli incassi o l’interesse del pubblico sono soddisfacenti. Può riguardare una singola sala, una città o un circuito più ampio. In distribuzione è un segnale positivo, perché indica che il film sta reggendo sul mercato e merita di restare disponibile."
},
{
  "term": "Four-walling - Affitto diretto della sala",
  "category": "Distribuzione",
  "def": "Modello in cui produttore o distributore affitta direttamente una sala per proiettare il film.",
  "longDef": "Il four-walling è una forma di distribuzione in cui il produttore, il distributore o l’autore affitta direttamente una sala cinematografica pagando un costo fisso. In questo modello il rischio economico è più alto per chi organizza la proiezione, ma può esserci maggiore controllo su evento, incassi, comunicazione e rapporto con il pubblico. In distribuzione indipendente può essere utile per anteprime, tour, documentari o film con comunità di riferimento molto specifiche."
},
{
  "term": "Screener - Copia di visione",
  "category": "Distribuzione",
  "def": "Copia del film inviata a selezionatori, stampa, buyer o professionisti.",
  "longDef": "Lo screener è una copia di visione del film destinata a festival, stampa, giurie, buyer, distributori o altri professionisti. Può essere un file protetto, un link privato o una copia con watermark per evitare usi non autorizzati. In distribuzione è uno strumento pratico fondamentale, perché permette di far valutare l’opera prima di una selezione, acquisizione, recensione o programmazione."
},
{
  "term": "Festival premiere status - Stato di anteprima festivaliera",
  "category": "Distribuzione",
  "def": "Condizione che indica se un film è una prima mondiale, internazionale, nazionale o locale.",
  "longDef": "Il festival premiere status indica il tipo di anteprima che un film può offrire a un festival: mondiale, internazionale, continentale, nazionale, regionale o locale. Molti festival danno grande importanza a questo elemento perché vogliono presentare opere non ancora mostrate in determinati territori. In distribuzione festivaliera è un dato strategico, perché una proiezione precedente può limitare l’accesso ad altri festival più importanti."
},
{
  "term": "Embargo stampa",
  "category": "Distribuzione",
  "def": "Limite temporale prima del quale recensioni o notizie non possono essere pubblicate.",
  "longDef": "L’embargo stampa è un accordo che impedisce a giornalisti, critici o media di pubblicare recensioni, interviste o informazioni prima di una data e un orario stabiliti. Serve a coordinare la comunicazione e a concentrare l’attenzione nel momento scelto per il lancio. In distribuzione è uno strumento delicato: se usato bene crea ordine promozionale, se percepito male può generare diffidenza."
},
{
  "term": "Recensione stampa",
  "category": "Distribuzione",
  "def": "Valutazione critica pubblicata da giornali, riviste, siti o altri media.",
  "longDef": "La recensione stampa è un testo critico pubblicato da un giornalista, critico o media specializzato dopo la visione del film. Può influenzare percezione pubblica, reputazione dell’opera, interesse dei festival e curiosità del pubblico. In distribuzione, soprattutto per film indipendenti o d’autore, buone recensioni possono diventare uno strumento promozionale importante."
},
{
  "term": "Media partner - Partner mediatico",
  "category": "Distribuzione",
  "def": "Soggetto editoriale o comunicativo che sostiene la promozione del film.",
  "longDef": "Il media partner è un giornale, radio, televisione, sito, magazine o canale digitale che collabora alla promozione di un film o di un evento. Può offrire visibilità, interviste, contenuti speciali, spazi pubblicitari o copertura editoriale. In distribuzione è utile perché amplia la portata comunicativa del progetto e aiuta a raggiungere pubblici più mirati."
},
{
  "term": "Key art - Immagine chiave promozionale",
  "category": "Distribuzione",
  "def": "Immagine principale usata per identificare e promuovere il film.",
  "longDef": "La key art è l’immagine promozionale principale di un film, usata su locandine, piattaforme, banner, press kit, social e materiali di vendita. Deve comunicare rapidamente tono, genere, identità visiva e promessa narrativa dell’opera. In distribuzione è fondamentale perché spesso rappresenta il primo contatto tra il film e il pubblico."
},
{
  "term": "Still fotografici - Foto di scena promozionali",
  "category": "Distribuzione",
  "def": "Immagini ufficiali tratte dal film o dal set usate per la promozione.",
  "longDef": "Gli still fotografici sono immagini ufficiali usate per presentare e promuovere il film presso stampa, festival, piattaforme e pubblico. Possono essere fotogrammi selezionati, foto di scena o immagini realizzate appositamente durante la lavorazione. In distribuzione sono importanti perché aiutano a raccontare visivamente il film anche prima della visione del trailer."
},
{
  "term": "EPK - Kit stampa elettronico",
  "category": "Distribuzione",
  "def": "Pacchetto digitale di materiali promozionali destinato a stampa e media.",
  "longDef": "L’EPK, cioè Electronic Press Kit, è un kit stampa digitale che raccoglie materiali utili per media, giornalisti, festival e partner promozionali. Può includere sinossi, note di regia, biografie, foto, trailer, clip, interviste, schede tecniche e contatti stampa. In distribuzione rende più facile comunicare il film in modo professionale e coerente."
},
{
  "term": "Social media campaign - Campagna social",
  "category": "Distribuzione",
  "def": "Strategia promozionale del film sui social network.",
  "longDef": "La social media campaign è la campagna promozionale costruita sui social network per far conoscere un film, un’uscita o una proiezione. Può includere teaser, clip, trailer, grafiche, contenuti dietro le quinte, interviste, countdown, sponsorizzazioni e coinvolgimento della community. In distribuzione è ormai uno strumento essenziale, soprattutto per raggiungere pubblici specifici con budget contenuti."
},
{
  "term": "Influencer screening - Proiezione per creator e influencer",
  "category": "Distribuzione",
  "def": "Proiezione organizzata per creator, influencer o figure con pubblico online.",
  "longDef": "L’influencer screening è una proiezione riservata a creator, influencer, content producer o persone con una comunità online rilevante. L’obiettivo è generare conversazione, recensioni informali, contenuti social e passaparola digitale. In distribuzione può essere utile quando il film ha un pubblico giovane, di nicchia o fortemente legato a temi riconoscibili."
},
{
  "term": "Closed captions - Sottotitoli chiusi",
  "category": "Distribuzione",
  "def": "Sottotitoli attivabili o disattivabili dall’utente.",
  "longDef": "I closed captions sono sottotitoli che possono essere attivati o disattivati dall’utente su una piattaforma, un lettore o un dispositivo. Possono contenere dialoghi e, in alcuni casi, indicazioni sonore utili alla comprensione. In distribuzione digitale sono importanti perché migliorano accessibilità, compatibilità con le piattaforme e fruizione del contenuto in contesti diversi."
},
{
  "term": "SDH - Sottotitoli per non udenti",
  "category": "Distribuzione",
  "def": "Sottotitoli che includono dialoghi e informazioni sonore rilevanti.",
  "longDef": "Gli SDH, cioè Subtitles for the Deaf and Hard of Hearing, sono sottotitoli pensati per persone sorde o con difficoltà uditive. Oltre ai dialoghi, indicano elementi sonori importanti come rumori, musica, tono della voce, effetti fuori campo o segnali acustici narrativamente rilevanti. In distribuzione sono fondamentali per l’accessibilità e spesso richiesti da piattaforme, festival o standard professionali."
},
{
  "term": "Audio description - Audiodescrizione",
  "category": "Distribuzione",
  "def": "Traccia audio che descrive elementi visivi per persone cieche o ipovedenti.",
  "longDef": "L’audio description è una traccia audio aggiuntiva che descrive elementi visivi importanti per la comprensione del film, come azioni, espressioni, ambienti, costumi o cambi di scena. Viene inserita nei momenti in cui non copre dialoghi o informazioni sonore essenziali. In distribuzione è uno strumento di accessibilità molto importante, perché permette a persone cieche o ipovedenti di seguire meglio il contenuto audiovisivo."
},
{
  "term": "Encoding - Codifica del file",
  "category": "Distribuzione",
  "def": "Processo tecnico che trasforma il video in un formato adatto alla consegna o pubblicazione.",
  "longDef": "L’encoding è il processo con cui un file video viene codificato in un formato specifico, con determinati parametri di codec, risoluzione, bitrate, audio e compatibilità. Serve a preparare il contenuto per piattaforme, sale, archivi, festival o consegne professionali. In distribuzione è una fase tecnica essenziale, perché un file codificato male può creare problemi di qualità, riproduzione o accettazione."
},
{
  "term": "QC - Controllo qualità",
  "category": "Distribuzione",
  "def": "Verifica tecnica del file o dei materiali prima della consegna.",
  "longDef": "Il QC, cioè Quality Control, è il controllo qualità effettuato su file video, audio, sottotitoli, metadata e materiali di consegna. Serve a individuare errori come fuori sync, problemi audio, artefatti video, sottotitoli errati, formati non conformi o difetti di esportazione. In distribuzione è un passaggio fondamentale perché riduce il rischio che un film venga rifiutato da piattaforme, festival o partner tecnici."
},
{
  "term": "Stativo luci - Light stand",
  "category": "Fotografia",
  "def": "Supporto verticale usato per sostenere fari, pannelli o modificatori di luce.",
  "longDef": "Lo stativo luci è un supporto regolabile in altezza usato per posizionare fari, pannelli LED, softbox, riflettori o altri accessori di illuminazione. Permette di controllare altezza, direzione e distanza della fonte luminosa rispetto al soggetto. In fotografia e cinema è uno degli strumenti base del set, perché una luce efficace dipende anche da come viene sostenuta e posizionata."
},
{
  "term": "C-stand - Stativo a colonna",
  "category": "Fotografia",
  "def": "Stativo robusto usato per sostenere luci, bandiere e accessori grip.",
  "longDef": "Il C-stand è uno stativo molto robusto e stabile, usato spesso sui set per sostenere luci, bandiere, diffusori, bracci e altri accessori. È apprezzato perché permette regolazioni precise e resiste meglio di uno stativo leggero a carichi laterali o configurazioni complesse. In fotografia è fondamentale quando si lavora con modificatori della luce o attrezzatura che deve restare stabile e sicura."
},
{
  "term": "Sandbag - Sacco zavorra",
  "category": "Fotografia",
  "def": "Peso morbido usato per stabilizzare stativi e attrezzature.",
  "longDef": "Il sandbag è un sacco zavorra riempito con sabbia o materiale pesante, usato per stabilizzare stativi, C-stand, bracci e attrezzature sul set. Serve a evitare ribaltamenti, soprattutto quando una luce è montata in alto, decentrata o con accessori pesanti. In fotografia e ripresa è un elemento di sicurezza indispensabile, perché protegge persone, attrezzature e continuità del lavoro."
},
{
  "term": "Grip head - Testa grip",
  "category": "Fotografia",
  "def": "Giunto metallico usato per bloccare bracci, aste e accessori su uno stativo.",
  "longDef": "La grip head è una testa di bloccaggio usata soprattutto con C-stand e bracci grip. Permette di fissare e orientare aste, bandiere, telai, piccoli diffusori o altri accessori in modo preciso. In fotografia è molto utile perché consente di costruire configurazioni flessibili e stabili intorno alla luce, controllando ombre, riflessi e direzione del fascio luminoso."
},
{
  "term": "Braccio a giraffa - Boom arm",
  "category": "Fotografia",
  "def": "Braccio esteso che permette di posizionare una luce sopra o lontano dallo stativo.",
  "longDef": "Il braccio a giraffa è un supporto orizzontale o inclinabile che permette di spostare una luce o un accessorio lontano dalla base dello stativo. Si usa quando la fonte luminosa deve arrivare sopra il soggetto, dietro un elemento scenico o in un punto dove lo stativo non può stare. In fotografia richiede sempre attenzione al peso e alla zavorra, perché crea leva e può rendere instabile l’attrezzatura."
},
{
  "term": "Pinza grip - Clamp",
  "category": "Fotografia",
  "def": "Morsetto usato per fissare piccoli accessori, luci leggere o modificatori.",
  "longDef": "La pinza grip è un morsetto usato per fissare accessori, piccoli pannelli, tessuti, bandiere leggere, cavi o luci compatte a stativi, tavoli, tubi o superfici del set. È uno strumento semplice ma molto versatile, utile quando serve una soluzione rapida e precisa. In fotografia aiuta a controllare la luce anche in spazi stretti o con attrezzatura minima."
},
{
  "term": "Dimmer - Regolatore di intensità",
  "category": "Fotografia",
  "def": "Dispositivo o controllo che modifica la potenza luminosa di una fonte.",
  "longDef": "Il dimmer permette di regolare l’intensità di una luce senza cambiarne necessariamente la posizione. Può essere integrato nella lampada o esterno, a seconda del tipo di fonte luminosa. In fotografia è utile per bilanciare più luci tra loro, controllare il rapporto di contrasto e adattare l’illuminazione alla scena senza dover spostare continuamente i fari."
},
{
  "term": "Ballast - Alimentatore per fari",
  "category": "Fotografia",
  "def": "Unità di alimentazione necessaria per alcune luci professionali.",
  "longDef": "Il ballast è un alimentatore o stabilizzatore elettrico usato con alcune luci professionali, come gli HMI o determinati sistemi ad alta potenza. Serve a fornire corrente corretta e stabile alla lampada, evitando problemi di accensione, instabilità o sfarfallio. In fotografia e cinema è un componente tecnico importante perché influisce sull’affidabilità della luce e sulla sicurezza del set."
},
{
  "term": "DMX - Controllo digitale delle luci",
  "category": "Fotografia",
  "def": "Sistema di controllo usato per regolare luci e parametri luminosi a distanza.",
  "longDef": "Il DMX è un protocollo di controllo digitale che permette di gestire luci, dimmer, colori, effetti e intensità da una console o da un sistema centralizzato. È molto usato in teatro, eventi, televisione e set complessi. In fotografia e ripresa diventa utile quando ci sono molte fonti luminose da coordinare con precisione, soprattutto in scene dinamiche o con cambi luce programmati."
},
{
  "term": "Pannello LED - LED panel",
  "category": "Fotografia",
  "def": "Fonte luminosa piatta composta da LED, spesso regolabile in intensità e colore.",
  "longDef": "Il pannello LED è una fonte luminosa piatta e leggera composta da molti piccoli LED. Spesso permette di regolare intensità, temperatura colore e talvolta anche tinta o colori RGB. In fotografia è molto pratico perché consuma poco, scalda meno rispetto a fonti tradizionali e può essere usato rapidamente in interviste, set piccoli, video didattici e situazioni documentarie."
},
{
  "term": "COB LED - LED a sorgente concentrata",
  "category": "Fotografia",
  "def": "Luce LED potente con sorgente concentrata, adatta a modificatori ottici e softbox.",
  "longDef": "Il COB LED, cioè Chip on Board LED, è una luce LED con una sorgente luminosa concentrata e potente. A differenza di molti pannelli, funziona più come un faro puntiforme e può essere usato con softbox, lenti, parabole, snoot o altri modificatori. In fotografia è molto utile perché unisce efficienza, controllo e versatilità, avvicinandosi al comportamento delle luci cinematografiche tradizionali."
},
{
  "term": "HMI - Faro a scarica ad alta intensità",
  "category": "Fotografia",
  "def": "Fonte luminosa potente con temperatura colore simile alla luce diurna.",
  "longDef": "L’HMI è una luce professionale molto potente, spesso usata per simulare o integrare la luce del giorno. Ha una temperatura colore vicina al daylight e richiede normalmente un ballast per funzionare correttamente. In fotografia e cinema è utile quando servono grandi quantità di luce, per esempio in esterni, attraverso finestre o in scene che richiedono una fonte intensa e controllabile."
},
{
  "term": "Tungsten light - Luce al tungsteno",
  "category": "Fotografia",
  "def": "Fonte luminosa calda tradizionale, solitamente intorno ai 3200 kelvin.",
  "longDef": "La tungsten light è una luce tradizionale a incandescenza con temperatura colore calda, generalmente intorno ai 3200 kelvin. Produce una luce continua, stabile e molto usata storicamente nel cinema e nella fotografia. In set moderni è meno efficiente dei LED e scalda molto, ma resta importante da conoscere perché ha una resa cromatica naturale e un carattere visivo riconoscibile."
},
{
  "term": "Open face - Faro aperto",
  "category": "Fotografia",
  "def": "Faro senza lente frontale, capace di produrre una luce ampia e diretta.",
  "longDef": "L’open face è un faro privo di lente frontale, in cui la lampada e il riflettore producono una luce diretta, ampia e relativamente dura. È meno controllato di un Fresnel, ma può essere molto efficace quando serve potenza, semplicità e copertura rapida. In fotografia e cinema viene spesso modificato con diffusori, bandiere o rimbalzi per ottenere una qualità di luce più adatta alla scena."
},
{
  "term": "PAR light - Faro PAR",
  "category": "Fotografia",
  "def": "Faro potente con fascio luminoso concentrato, spesso usato in cinema, teatro ed eventi.",
  "longDef": "Il PAR light è un faro caratterizzato da un fascio luminoso intenso e relativamente concentrato. Viene usato in cinema, teatro, concerti ed eventi per creare colpi di luce, controluce, effetti scenici o illuminazioni potenti. In fotografia è utile quando si vuole una fonte decisa e direzionale, ma richiede controllo tramite accessori, distanza e modificatori."
},
{
  "term": "Lanterna cinese - China ball",
  "category": "Fotografia",
  "def": "Diffusore sferico leggero che produce una luce morbida e avvolgente.",
  "longDef": "La lanterna cinese è un diffusore sferico, spesso in carta o materiale leggero, usato per creare una luce morbida e diffusa in molte direzioni. È molto utile per illuminare volti, tavoli, interni o scene intime con una qualità naturale e poco aggressiva. In fotografia e cinema è apprezzata perché costa poco, si monta rapidamente e produce un effetto molto piacevole."
},
{
  "term": "Lantern softbox - Softbox a lanterna",
  "category": "Fotografia",
  "def": "Softbox sferico o semisferico che diffonde la luce in modo ampio e morbido.",
  "longDef": "Il lantern softbox è un modificatore di luce con forma a lanterna, progettato per diffondere la luce in modo molto ampio e avvolgente. Rispetto a un softbox frontale tradizionale, illumina maggiormente anche lati e ambiente. In fotografia è utile per interviste, scene di gruppo, interni e situazioni in cui serve una luce morbida ma non troppo direzionale."
},
{
  "term": "Octabox - Softbox ottagonale",
  "category": "Fotografia",
  "def": "Softbox a forma ottagonale usato per creare una luce morbida e naturale.",
  "longDef": "L’octabox è un softbox di forma ottagonale che produce una luce morbida, ampia e gradevole, spesso usata nei ritratti. La sua forma genera riflessi più naturali negli occhi rispetto a modificatori quadrati o rettangolari. In fotografia è molto apprezzato perché crea un’illuminazione elegante, controllata e adatta a volti, interviste e immagini promozionali."
},
{
  "term": "Strip softbox - Softbox stretto",
  "category": "Fotografia",
  "def": "Softbox lungo e stretto usato per luci laterali, contorni e riflessi controllati.",
  "longDef": "Lo strip softbox è un softbox dalla forma lunga e stretta, pensato per creare una luce morbida ma più controllata in larghezza. Si usa spesso come luce laterale, rim light, luce di contorno o per riflessi su superfici verticali. In fotografia permette di scolpire il soggetto con precisione senza illuminare troppo lo spazio circostante."
},
{
  "term": "Snoot - Cono concentratore",
  "category": "Fotografia",
  "def": "Accessorio che restringe il fascio luminoso in un’area precisa.",
  "longDef": "Lo snoot è un modificatore a forma di cono o tubo che restringe il fascio di luce, concentrandolo su una zona specifica. Serve a illuminare dettagli, sfondi, capelli, oggetti o punti narrativi senza contaminare il resto della scena. In fotografia è utile quando si vuole una luce molto selettiva e controllata."
},
{
  "term": "Grid - Griglia direzionale",
  "category": "Fotografia",
  "def": "Accessorio che limita la dispersione laterale della luce.",
  "longDef": "La grid è una griglia applicata davanti a un softbox, riflettore o altro modificatore per rendere la luce più direzionale. Non rende necessariamente la luce più dura, ma ne limita la dispersione laterale. In fotografia è molto utile quando si vuole mantenere morbidezza sul soggetto evitando che la luce invada sfondo, pareti o parti indesiderate della scena."
},
{
  "term": "Eggcrate - Griglia a nido d’ape",
  "category": "Fotografia",
  "def": "Griglia montata su softbox o diffusori per controllare la direzione della luce.",
  "longDef": "L’eggcrate è una griglia a nido d’ape, spesso in tessuto, montata su softbox o telai di diffusione per controllare meglio la direzione della luce. Riduce la dispersione laterale e permette di mantenere la luce più concentrata sul soggetto. In fotografia è molto utile quando si lavora in ambienti piccoli o quando bisogna evitare contaminazioni luminose sullo sfondo."
},
{
  "term": "Diffusion frame - Telaio diffusore",
  "category": "Fotografia",
  "def": "Telaio con materiale diffusore usato per ammorbidire una fonte luminosa.",
  "longDef": "Il diffusion frame è un telaio su cui viene montato un materiale diffusore, posizionato tra la luce e il soggetto. Serve ad aumentare la dimensione apparente della fonte e quindi a rendere la luce più morbida e avvolgente. In fotografia e cinema è uno strumento molto usato per controllare la qualità della luce, soprattutto quando si lavora con fonti potenti."
},
{
  "term": "Scrim - Rete di attenuazione",
  "category": "Fotografia",
  "def": "Rete o filtro usato per ridurre l’intensità della luce senza cambiarne troppo la qualità.",
  "longDef": "Lo scrim è una rete o un accessorio posto davanti alla luce per ridurne l’intensità senza modificarne drasticamente la direzione o la qualità. Può essere totale o parziale, singolo o doppio, a seconda della quantità di luce da sottrarre. In fotografia è utile quando una fonte è troppo forte ma si vuole mantenere la stessa posizione e lo stesso carattere luminoso."
},
{
  "term": "Black wrap - Alluminio nero modellabile",
  "category": "Fotografia",
  "def": "Foglio nero resistente al calore usato per sagomare o bloccare la luce.",
  "longDef": "Il black wrap è un foglio di alluminio nero, modellabile e resistente al calore, usato per controllare la luce in modo rapido e preciso. Può servire a creare piccole bandiere, ridurre spill, schermare parti del faro o modellare il fascio luminoso. In fotografia e cinema è uno strumento molto pratico perché permette correzioni immediate anche in spazi complessi."
},
{
  "term": "Barn doors - Alette direzionali",
  "category": "Fotografia",
  "def": "Alette metalliche montate su un faro per orientare e limitare il fascio luminoso.",
  "longDef": "Le barn doors sono alette regolabili montate davanti a un faro per controllare la forma e la diffusione del fascio luminoso. Permettono di tagliare la luce sui lati, evitare spill e indirizzare meglio l’illuminazione. In fotografia sono molto utili con Fresnel, open face e altre luci dirette, soprattutto quando serve separare soggetto, sfondo e zone d’ombra."
},
{
  "term": "Flag kit - Kit di bandiere",
  "category": "Fotografia",
  "def": "Set di bandiere e pannelli usati per bloccare o modellare la luce.",
  "longDef": "Il flag kit è un insieme di bandiere, cutter, solidi o pannelli neri usati per controllare la luce sul set. Serve a bloccare riflessi indesiderati, creare ombre, proteggere l’obiettivo dal flare o impedire che la luce arrivi in zone non volute. In fotografia è essenziale per passare da una luce generica a una luce davvero scolpita e controllata."
},
{
  "term": "Bounce board - Pannello di rimbalzo",
  "category": "Fotografia",
  "def": "Pannello usato per riflettere la luce verso il soggetto.",
  "longDef": "Il bounce board è un pannello usato per far rimbalzare la luce e indirizzarla verso il soggetto in modo più morbido o controllato. Può essere bianco, argentato, dorato o realizzato con materiali diversi a seconda dell’effetto desiderato. In fotografia è utile per riempire ombre, creare luce indiretta o simulare una fonte più grande e naturale."
},
{
  "term": "Ultrabounce - Tessuto di rimbalzo morbido",
  "category": "Fotografia",
  "def": "Tessuto professionale usato per riflettere o controllare la luce in modo morbido.",
  "longDef": "L’ultrabounce è un tessuto tecnico usato sui set per riflettere la luce con una qualità morbida e controllata. Spesso ha un lato bianco riflettente e un lato nero utile per bloccare o sottrarre luce. In fotografia e cinema è molto apprezzato perché permette di creare grandi superfici di rimbalzo, ottenendo una luce ampia, naturale e meno aggressiva."
},
{
  "term": "Muslin - Tessuto di diffusione o rimbalzo",
  "category": "Fotografia",
  "def": "Tessuto usato per diffondere, riflettere o ammorbidire la luce.",
  "longDef": "Il muslin è un tessuto molto usato in fotografia e cinema come materiale di diffusione, rimbalzo o controllo della luce. Può essere bianco, naturale, tinto o trattato in modi diversi per ottenere qualità luminose differenti. In set professionali è utile perché permette di costruire superfici luminose ampie e morbide, soprattutto quando si vuole una luce più organica e meno artificiale."
},
{
  "term": "Assembly cut - Montaggio assemblato",
  "category": "Montaggio",
  "def": "Prima versione completa del montaggio costruita con tutto il materiale principale.",
  "longDef": "L’assembly cut è la prima versione in cui le scene vengono assemblate seguendo l’ordine della sceneggiatura o della struttura prevista. Non è ancora rifinito nel ritmo, nella durata o nella precisione dei tagli, ma permette di vedere il progetto nella sua forma complessiva. In montaggio è una fase importante perché mostra subito cosa funziona, cosa manca e quali parti richiedono interventi più profondi."
},
{
  "term": "Editor’s cut - Versione del montatore",
  "category": "Montaggio",
  "def": "Versione del film montata secondo le scelte iniziali del montatore.",
  "longDef": "L’editor’s cut è la versione costruita dal montatore prima degli interventi definitivi di regia, produzione o committenza. Rappresenta una prima interpretazione autonoma del materiale girato, basata su ritmo, struttura, continuità e forza narrativa delle scene. In montaggio è utile perché offre una base concreta su cui discutere modifiche, tagli e soluzioni alternative."
},
{
  "term": "Director’s cut - Versione del regista",
  "category": "Montaggio",
  "def": "Versione del film che rispecchia maggiormente la volontà del regista.",
  "longDef": "Il director’s cut è una versione del film montata o approvata secondo la visione del regista, talvolta diversa dalla versione distribuita ufficialmente. Può includere scene aggiunte, durata diversa, ritmo più personale o scelte narrative meno condizionate da esigenze commerciali. In montaggio indica il rapporto tra decisione artistica, controllo produttivo e forma finale dell’opera."
},
{
  "term": "Picture lock - Blocco del montaggio immagine",
  "category": "Montaggio",
  "def": "Fase in cui il montaggio video viene considerato definitivo.",
  "longDef": "Il picture lock è il momento in cui il montaggio dell’immagine viene bloccato e non dovrebbe più subire modifiche di durata, ordine o struttura. Da questo punto possono procedere con sicurezza color correction, sound design, missaggio, effetti visivi e titolazione finale. In montaggio è un passaggio cruciale perché ogni modifica successiva rischia di creare problemi a tutti i reparti di postproduzione."
},
{
  "term": "A-roll - Ripresa principale",
  "category": "Montaggio",
  "def": "Materiale principale del racconto, spesso dialoghi, intervista o azione centrale.",
  "longDef": "L’A-roll è il materiale principale su cui si costruisce il racconto audiovisivo. In un’intervista, per esempio, coincide spesso con la persona che parla; in un documentario può essere la linea narrativa principale; in una scena può essere l’azione centrale. In montaggio l’A-roll fornisce la struttura portante, mentre altri materiali come B-roll, dettagli o inserti servono a coprire, arricchire e rendere più fluido il racconto."
},
{
  "term": "Cutaway - Inquadratura di stacco",
  "category": "Montaggio",
  "def": "Inquadratura inserita per staccare dall’azione principale e coprire un passaggio.",
  "longDef": "Il cutaway è un’inquadratura che si allontana temporaneamente dall’azione principale per mostrare un dettaglio, una reazione, un oggetto o un elemento dell’ambiente. Viene spesso usato per coprire tagli, accorciare dialoghi, creare ritmo o fornire informazioni aggiuntive. In montaggio è uno strumento molto utile perché permette di rendere invisibili molte correzioni strutturali."
},
{
  "term": "Reaction shot - Inquadratura di reazione",
  "category": "Montaggio",
  "def": "Inquadratura che mostra la reazione di un personaggio a ciò che accade.",
  "longDef": "Il reaction shot è un’inquadratura dedicata alla reazione emotiva o fisica di un personaggio. Può mostrare sorpresa, paura, disagio, comprensione, rabbia o qualunque risposta significativa a un evento o a una battuta. In montaggio è fondamentale perché spesso il senso di una scena non nasce solo da ciò che viene detto o fatto, ma da come gli altri personaggi reagiscono."
},
{
  "term": "Insert shot - Inquadratura di inserto",
  "category": "Montaggio",
  "def": "Inquadratura ravvicinata di un dettaglio importante per la scena.",
  "longDef": "L’insert shot è un’inquadratura inserita nel montaggio per mostrare un dettaglio specifico, come una mano, un oggetto, un documento, uno schermo o un gesto rilevante. Serve a chiarire informazioni, guidare l’attenzione o dare peso narrativo a un elemento. In montaggio è molto utile perché permette di controllare meglio comprensione, ritmo e suspense."
},
{
  "term": "Establishing edit - Montaggio di ambientazione",
  "category": "Montaggio",
  "def": "Sequenza di tagli che introduce luogo, contesto o situazione.",
  "longDef": "L’establishing edit è un passaggio di montaggio costruito per orientare lo spettatore nello spazio, nel tempo o nella situazione narrativa. Può includere campi larghi, dettagli ambientali, suoni, cartelli, movimenti o elementi che presentano il contesto prima dell’azione principale. In montaggio aiuta a rendere più chiaro dove siamo, chi è coinvolto e quale atmosfera domina la scena."
},
{
  "term": "Continuity editing - Montaggio di continuità",
  "category": "Montaggio",
  "def": "Stile di montaggio che mantiene coerenza spaziale, temporale e narrativa.",
  "longDef": "Il continuity editing è un metodo di montaggio pensato per rendere fluido e comprensibile il passaggio tra le inquadrature. Mantiene coerenza di sguardi, direzioni, posizioni, azioni e tempo narrativo, facendo percepire la scena come continua anche se composta da molti tagli. In montaggio classico è una base fondamentale perché permette allo spettatore di seguire la storia senza essere distratto dalla tecnica."
},
{
  "term": "Montage sequence - Sequenza di montaggio sintetico",
  "category": "Montaggio",
  "def": "Sequenza che condensa tempo, eventi o trasformazioni attraverso immagini rapide.",
  "longDef": "La montage sequence è una sequenza costruita con una serie di immagini, tagli e spesso musica per condensare un periodo di tempo, un processo o una trasformazione. Può mostrare allenamenti, viaggi, preparativi, crescita di un rapporto o evoluzione di una situazione. In montaggio è utile quando si vuole raccontare molto in poco tempo, mantenendo ritmo e forza espressiva."
},
{
  "term": "Smash cut - Taglio improvviso",
  "category": "Montaggio",
  "def": "Taglio brusco e inatteso usato per creare shock, contrasto o comicità.",
  "longDef": "Lo smash cut è un taglio improvviso che porta bruscamente da una situazione a un’altra, spesso con forte contrasto di tono, volume, ritmo o contenuto. Può creare sorpresa, shock, ironia o accelerazione narrativa. In montaggio funziona quando il passaggio è netto e intenzionale, perché rompe la continuità in modo espressivo invece di sembrare un errore."
},
{
  "term": "Hard cut - Taglio secco",
  "category": "Montaggio",
  "def": "Passaggio diretto da una clip all’altra senza transizioni.",
  "longDef": "L’hard cut è un taglio secco tra due immagini o due suoni, senza dissolvenze o transizioni morbide. È una forma essenziale di montaggio, più diretta e asciutta rispetto a passaggi graduali. In montaggio viene usato per mantenere ritmo, chiarezza e decisione narrativa, oppure per creare contrasti forti tra due momenti."
},
{
  "term": "Invisible cut - Taglio invisibile",
  "category": "Montaggio",
  "def": "Taglio nascosto per far sembrare continua una ripresa o una scena.",
  "longDef": "L’invisible cut è un taglio progettato per non essere percepito dallo spettatore. Può essere nascosto da un movimento di camera, da un passaggio al buio, da un oggetto che copre l’inquadratura o da una corrispondenza visiva molto precisa. In montaggio è usato per creare l’illusione di continuità, come nei falsi piani sequenza o nelle scene che devono apparire fluide e ininterrotte."
},
{
  "term": "Split edit - Taglio audio/video separato",
  "category": "Montaggio",
  "def": "Taglio in cui immagine e audio cambiano in momenti diversi.",
  "longDef": "Lo split edit è una tecnica in cui il taglio dell’audio e quello dell’immagine non coincidono esattamente. Comprende casi come J-cut e L-cut, ma indica più in generale la separazione tra passaggio visivo e passaggio sonoro. In montaggio è molto utile perché rende i cambi scena più fluidi, naturali e meno meccanici."
},
{
  "term": "Three-point editing - Montaggio a tre punti",
  "category": "Montaggio",
  "def": "Metodo di inserimento clip basato su tre punti tra sorgente e timeline.",
  "longDef": "Il three-point editing è un metodo di montaggio in cui si impostano tre punti tra clip sorgente e timeline, per esempio ingresso e uscita della sorgente più un punto di ingresso nella sequenza. Il software calcola automaticamente il quarto punto. In montaggio professionale è una tecnica molto efficiente perché permette di inserire materiale con precisione, controllo e rapidità."
},
{
  "term": "Insert edit - Inserimento in timeline",
  "category": "Montaggio",
  "def": "Inserimento di una clip spostando in avanti il materiale successivo.",
  "longDef": "L’insert edit inserisce una clip nella timeline spostando in avanti le clip successive, senza cancellarle. È utile quando si vuole aggiungere un’inquadratura, una scena o un elemento mantenendo intatto il materiale già presente. In montaggio permette di costruire la sequenza in modo ordinato, soprattutto quando si lavora su strutture narrative ancora in evoluzione."
},
{
  "term": "Overwrite edit - Sovrascrittura in timeline",
  "category": "Montaggio",
  "def": "Inserimento di una clip che sostituisce il materiale già presente nella timeline.",
  "longDef": "L’overwrite edit inserisce una clip sopra una parte della timeline, sostituendo ciò che si trova nello stesso intervallo di tempo. A differenza dell’insert edit, non sposta in avanti il materiale successivo. In montaggio è utile quando si vuole rimpiazzare una porzione precisa della sequenza mantenendo invariata la durata complessiva."
},
{
  "term": "Lift - Rimozione con spazio vuoto",
  "category": "Montaggio",
  "def": "Eliminazione di una parte della timeline lasciando uno spazio vuoto.",
  "longDef": "Il lift è un’operazione che rimuove una porzione di clip dalla timeline lasciando al suo posto uno spazio vuoto. La durata complessiva della sequenza resta quindi invariata. In montaggio è utile quando si vuole togliere temporaneamente un elemento senza modificare la posizione temporale del resto del progetto."
},
{
  "term": "Extract - Rimozione con chiusura dello spazio",
  "category": "Montaggio",
  "def": "Eliminazione di una parte della timeline chiudendo automaticamente il vuoto.",
  "longDef": "L’extract rimuove una porzione della timeline e chiude automaticamente lo spazio lasciato, facendo avanzare le clip successive. A differenza del lift, modifica la durata complessiva della sequenza. In montaggio è utile quando si vuole accorciare il progetto o togliere un passaggio senza lasciare buchi nella timeline."
},
{
  "term": "Razor tool - Strumento lama",
  "category": "Montaggio",
  "def": "Strumento usato per tagliare una clip in uno o più punti.",
  "longDef": "Il razor tool è lo strumento lama presente in molti software di montaggio, usato per dividere una clip in più parti. Permette di creare tagli manuali, separare porzioni inutili, isolare momenti precisi o preparare interventi di ritmo. In montaggio è uno degli strumenti più immediati, ma va usato con ordine per evitare timeline confuse e frammentate."
},
{
  "term": "Snapping - Aggancio magnetico",
  "category": "Montaggio",
  "def": "Funzione che fa agganciare clip e cursore a tagli, marker o punti vicini.",
  "longDef": "Lo snapping è una funzione che facilita l’allineamento automatico di clip, tagli, marker, testina di riproduzione e altri elementi della timeline. Quando è attivo, gli oggetti tendono ad agganciarsi ai punti vicini, evitando piccoli disallineamenti. In montaggio è molto utile per mantenere sincronizzazione e precisione, ma in certi casi va disattivato per fare regolazioni più libere."
},
{
  "term": "Track targeting - Selezione delle tracce attive",
  "category": "Montaggio",
  "def": "Scelta delle tracce video o audio interessate da comandi di montaggio.",
  "longDef": "Il track targeting è la selezione delle tracce attive su cui agiranno comandi come inserimento, sovrascrittura, copia, incolla o navigazione tra tagli. Permette di controllare con precisione dove entra il materiale nella timeline. In montaggio è importante perché un targeting sbagliato può inserire clip nella traccia errata o modificare parti non desiderate del progetto."
},
{
  "term": "Sync lock - Blocco di sincronizzazione",
  "category": "Montaggio",
  "def": "Funzione che mantiene sincronizzate le tracce durante modifiche alla timeline.",
  "longDef": "Il sync lock è una funzione che mantiene la relazione temporale tra tracce diverse quando si effettuano modifiche sulla timeline. Serve a evitare che audio, video, musica, effetti o sottotitoli si spostino in modo incoerente. In montaggio è molto utile nei progetti complessi, perché protegge la sincronizzazione durante tagli, inserimenti ed eliminazioni."
},
{
  "term": "Subclip - Sottoclip",
  "category": "Montaggio",
  "def": "Porzione selezionata di una clip più lunga, salvata come elemento autonomo.",
  "longDef": "La subclip è una porzione di una clip più lunga creata per isolare un momento utile, una battuta, un’azione o una take interessante. Non duplica necessariamente il file originale, ma crea un riferimento più comodo da usare nel progetto. In montaggio è utile per organizzare grandi quantità di materiale e velocizzare la ricerca delle parti migliori."
},
{
  "term": "Selects - Selezione delle clip migliori",
  "category": "Montaggio",
  "def": "Raccolta delle parti migliori del girato scelte prima del montaggio definitivo.",
  "longDef": "I selects sono le clip, take o porzioni di girato considerate migliori e raccolte prima o durante il montaggio. Possono essere organizzate in una timeline dedicata, in bin specifici o tramite marker e valutazioni. In montaggio sono molto utili perché permettono di lavorare più rapidamente, concentrandosi sul materiale più promettente senza dover rivedere continuamente tutto il girato."
},
{
  "term": "Logging - Catalogazione del girato",
  "category": "Montaggio",
  "def": "Analisi e annotazione del materiale video prima o durante il montaggio.",
  "longDef": "Il logging è il processo di visione, descrizione e catalogazione del materiale girato. Può includere note su contenuto, qualità tecnica, battute, problemi, take migliori, parole chiave o momenti importanti. In montaggio è una fase spesso sottovalutata, ma fondamentale nei progetti lunghi, documentari, interviste e lavori con molte ore di materiale."
},
{
  "term": "Transcoding - Transcodifica",
  "category": "Montaggio",
  "def": "Conversione dei file video in un formato più adatto al montaggio o alla consegna.",
  "longDef": "Il transcoding è la conversione di un file video da un formato, codec o impostazione tecnica a un’altra. Può servire per rendere il materiale più fluido da montare, più compatibile con un software o più adatto alla consegna finale. In montaggio è importante perché un buon formato di lavoro può migliorare stabilità, velocità e affidabilità del progetto."
},
{
  "term": "Relink media - Ricollegamento dei file",
  "category": "Montaggio",
  "def": "Operazione che ricollega il progetto ai file originali spostati o mancanti.",
  "longDef": "Il relink media è l’operazione con cui il software di montaggio viene guidato a ritrovare file che sono stati spostati, rinominati o scollegati. Serve a ripristinare il collegamento tra timeline e materiali originali. In montaggio è una funzione essenziale quando si lavora con dischi esterni, archivi complessi, proxy o passaggi tra computer diversi."
},
{
  "term": "Media offline - File multimediale non collegato",
  "category": "Montaggio",
  "def": "Stato di una clip quando il software non trova il file sorgente.",
  "longDef": "Media offline indica che il software di montaggio non riesce a trovare il file originale collegato a una clip del progetto. Può succedere se il file è stato spostato, rinominato, cancellato o se il disco non è collegato. In montaggio è un problema comune, ma spesso risolvibile tramite relink, buona organizzazione delle cartelle e gestione ordinata degli archivi."
},
{
  "term": "XML - File di scambio montaggio",
  "category": "Montaggio",
  "def": "Formato usato per trasferire sequenze e informazioni tra software diversi.",
  "longDef": "L’XML è un file di scambio che permette di trasferire sequenze, tagli, clip, timeline e alcune informazioni di montaggio tra software diversi. È spesso usato per passare da un programma di montaggio a un software di color correction o finishing. In montaggio è utile perché consente workflow più flessibili, anche se non sempre tutti gli effetti e le impostazioni vengono trasferiti perfettamente."
},
{
  "term": "AAF - File di scambio audio/video",
  "category": "Montaggio",
  "def": "Formato professionale usato per trasferire timeline e tracce verso altri software.",
  "longDef": "L’AAF è un formato di scambio usato in postproduzione per trasferire timeline, clip, tracce audio e informazioni di montaggio tra software diversi. È molto usato per inviare il progetto audio a programmi di sound editing o missaggio. In montaggio è importante perché permette una collaborazione più ordinata tra montatore, fonico, sound designer e reparto di finalizzazione."
},
{
  "term": "EDL - Lista decisionale di montaggio",
  "category": "Montaggio",
  "def": "Lista tecnica che descrive tagli, sorgenti e punti di montaggio.",
  "longDef": "L’EDL, cioè Edit Decision List, è una lista che descrive le decisioni di montaggio attraverso riferimenti tecnici come clip sorgenti, timecode, punti di ingresso, punti di uscita e ordine dei tagli. È un formato più semplice e storico rispetto ad altri sistemi di scambio, ma ancora utile in alcuni workflow. In montaggio serve a ricostruire o comunicare la struttura essenziale di una sequenza."
},
{
  "term": "OMF - Esportazione audio per mix",
  "category": "Montaggio",
  "def": "Formato usato per consegnare tracce audio di montaggio alla postproduzione sonora.",
  "longDef": "L’OMF è un formato di esportazione usato per trasferire le tracce audio da un progetto di montaggio a un software di postproduzione sonora. Può includere clip audio, tagli, dissolvenze e riferimenti temporali. In montaggio è utile quando il mix audio viene realizzato in un ambiente separato, anche se in molti workflow moderni viene spesso sostituito o affiancato dall’AAF."
},
{
  "term": "Speed ramp - Variazione progressiva della velocità",
  "category": "Montaggio",
  "def": "Cambio graduale della velocità di una clip durante la riproduzione.",
  "longDef": "Lo speed ramp è una variazione progressiva della velocità all’interno della stessa clip, per esempio da normale a rallentata o da lenta a veloce. Serve a enfatizzare azioni, transizioni, momenti sportivi, videoclip o passaggi dinamici. In montaggio richiede attenzione al ritmo e alla fluidità del movimento, perché una rampa mal gestita può sembrare artificiale o confusa."
},
{
  "term": "Time remapping - Rimappatura del tempo",
  "category": "Montaggio",
  "def": "Controllo avanzato della velocità e del tempo interno di una clip.",
  "longDef": "Il time remapping è una tecnica che permette di modificare la velocità di una clip in modo variabile e controllato nel tempo. Può creare rallenti, accelerazioni, stop, inversioni o transizioni dinamiche tra velocità diverse. In montaggio è uno strumento potente per costruire ritmo visivo, effetti stilizzati o momenti di forte enfasi narrativa."
},
{
  "term": "Optical flow - Interpolazione del movimento",
  "category": "Montaggio",
  "def": "Tecnica che crea fotogrammi intermedi per rendere più fluido un rallenty.",
  "longDef": "L’optical flow è una tecnica che analizza il movimento tra fotogrammi e genera immagini intermedie artificiali per rendere più fluide variazioni di velocità o rallenty. Può migliorare il risultato quando il materiale non è stato girato con abbastanza fotogrammi al secondo. In montaggio è utile, ma può produrre artefatti visivi se il movimento è complesso o se l’immagine contiene elementi difficili da interpretare."
},
{
  "term": "Reverse motion - Movimento inverso",
  "category": "Montaggio",
  "def": "Riproduzione di una clip al contrario.",
  "longDef": "Il reverse motion è la riproduzione di una clip in senso inverso, facendo apparire l’azione al contrario. Può essere usato per effetti comici, surreali, musicali, sperimentali o per creare transizioni visive particolari. In montaggio è una tecnica semplice, ma il suo effetto è molto evidente e va usato con una motivazione stilistica o narrativa chiara."
},
{
  "term": "Audio waveform - Forma d’onda audio",
  "category": "Montaggio",
  "def": "Rappresentazione visiva del segnale audio nella timeline.",
  "longDef": "L’audio waveform è la rappresentazione grafica della forma d’onda audio dentro la timeline o nel monitor sorgente. Mostra picchi, pause, battute, colpi e variazioni di intensità, aiutando il montatore a individuare punti precisi del suono. In montaggio è utilissima per sincronizzare, tagliare dialoghi, allineare musica e riconoscere visivamente eventi sonori."
},
{
  "term": "Render cache - Cache di rendering",
  "category": "Montaggio",
  "def": "Sistema che salva anteprime elaborate per riprodurre meglio effetti e clip pesanti.",
  "longDef": "La render cache è un sistema con cui il software salva temporaneamente versioni elaborate di clip, effetti o porzioni della timeline per riprodurle in modo più fluido. È utile quando il computer fatica a mostrare in tempo reale correzioni colore, effetti complessi o file pesanti. In montaggio aiuta a lavorare meglio durante la revisione, ma va gestita con attenzione perché può occupare molto spazio su disco."
},
{
  "term": "Direttore di produzione",
  "category": "Produzione",
  "def": "Figura responsabile dell’organizzazione generale della produzione.",
  "longDef": "Il direttore di produzione coordina l’organizzazione concreta del progetto, controllando tempi, risorse, reparti, logistica e andamento della lavorazione. Lavora a stretto contatto con produttore, regia e reparti tecnici per trasformare le esigenze creative in un piano realizzabile. In produzione è una figura centrale perché tiene insieme efficienza, sostenibilità economica e funzionamento quotidiano del set."
},
{
  "term": "Organizzatore generale",
  "category": "Produzione",
  "def": "Figura che pianifica e coordina l’impianto produttivo complessivo.",
  "longDef": "L’organizzatore generale segue la costruzione pratica dell’intero progetto, occupandosi di pianificazione, risorse, reparti, scadenze e coordinamento operativo. Ha una visione ampia della produzione e lavora per rendere compatibili esigenze artistiche, budget e fattibilità. In ambito cinematografico è una figura molto importante nei progetti strutturati, perché contribuisce a dare ordine alla macchina produttiva."
},
{
  "term": "Production coordinator - Coordinatore di produzione",
  "category": "Produzione",
  "def": "Figura che coordina comunicazioni, documenti e attività operative della produzione.",
  "longDef": "Il production coordinator supporta l’organizzazione quotidiana della produzione, occupandosi di comunicazioni, documenti, contatti, convocazioni, materiali e coordinamento tra reparti. Spesso lavora tra ufficio produzione e set, mantenendo aggiornate informazioni e necessità pratiche. In produzione è utile perché riduce confusione, facilita il flusso di lavoro e aiuta il gruppo a muoversi con maggiore precisione."
},
{
  "term": "Segreteria di produzione",
  "category": "Produzione",
  "def": "Area organizzativa che gestisce documenti, comunicazioni e supporto amministrativo.",
  "longDef": "La segreteria di produzione si occupa della gestione pratica di documenti, contatti, comunicazioni, convocazioni, archivi e supporto amministrativo. Può seguire fogli firma, contratti, liberatorie, ordini, ricevute e informazioni operative utili al set. In produzione è una funzione essenziale perché mantiene ordinata la parte documentale e permette ai reparti di lavorare con informazioni corrette."
},
{
  "term": "Runner - Assistente operativo",
  "category": "Produzione",
  "def": "Assistente incaricato di commissioni, consegne e supporto pratico sul set.",
  "longDef": "Il runner è una figura di supporto operativo che svolge commissioni, consegne, piccoli trasporti, recupero materiali e assistenza pratica alla produzione. È spesso coinvolto nelle esigenze immediate del set e deve essere rapido, affidabile e flessibile. In produzione è un ruolo apparentemente semplice, ma molto utile per risolvere problemi concreti senza rallentare il lavoro dei reparti principali."
},
{
  "term": "Location manager - Responsabile location",
  "category": "Produzione",
  "def": "Figura che gestisce location, permessi, accessi e rapporti con i proprietari.",
  "longDef": "Il location manager segue la gestione pratica delle location scelte per le riprese. Si occupa di accessi, permessi, rapporti con proprietari o enti, vincoli logistici, orari, parcheggi, protezione degli spazi e restituzione corretta dei luoghi. In produzione è fondamentale perché una location non deve essere solo bella, ma anche utilizzabile, sicura e compatibile con le esigenze del set."
},
{
  "term": "Casting director - Responsabile casting",
  "category": "Produzione",
  "def": "Figura che organizza e guida la selezione degli interpreti.",
  "longDef": "Il casting director coordina la ricerca e selezione degli attori o interpreti più adatti ai ruoli del progetto. Organizza provini, valuta profili, propone alternative e collabora con regia e produzione per costruire il cast. In produzione è una figura importante perché una scelta corretta degli interpreti può cambiare profondamente la qualità artistica e la credibilità del film."
},
{
  "term": "Comparse",
  "category": "Produzione",
  "def": "Persone presenti nella scena senza ruolo narrativo individuale rilevante.",
  "longDef": "Le comparse sono persone inserite in una scena per rendere credibile un ambiente, come passanti, pubblico, clienti, studenti o abitanti di un luogo. Non hanno di solito battute o funzione narrativa individuale, ma contribuiscono alla verosimiglianza della scena. In produzione vanno gestite con attenzione perché richiedono convocazioni, liberatorie, costumi, indicazioni e coordinamento sul set."
},
{
  "term": "Figurazioni speciali",
  "category": "Produzione",
  "def": "Presenze di scena con caratteristiche o azioni più specifiche rispetto alle comparse.",
  "longDef": "Le figurazioni speciali sono presenze sceniche che svolgono azioni più riconoscibili o richiedono caratteristiche particolari rispetto alle semplici comparse. Possono interagire con l’ambiente, eseguire gesti precisi o avere una presenza visiva più evidente, pur senza essere veri personaggi principali. In produzione vanno selezionate e coordinate con maggiore cura perché incidono più direttamente sulla scena."
},
{
  "term": "Spoglio della sceneggiatura - Script breakdown",
  "category": "Produzione",
  "def": "Analisi della sceneggiatura per individuare esigenze produttive scena per scena.",
  "longDef": "Lo spoglio della sceneggiatura è l’analisi tecnica del copione per individuare tutto ciò che serve alla produzione: personaggi, location, costumi, oggetti, effetti, mezzi, comparse, animali, veicoli, trucco, scene speciali e vincoli pratici. È uno dei primi passaggi organizzativi della preproduzione. In produzione è fondamentale perché permette di trasformare il testo scritto in una lista concreta di bisogni realizzativi."
},
{
  "term": "Breakdown sheet - Scheda di spoglio",
  "category": "Produzione",
  "def": "Documento che raccoglie le esigenze produttive di una singola scena.",
  "longDef": "La breakdown sheet è la scheda che riassume gli elementi necessari per realizzare una specifica scena. Può includere cast, figurazioni, location, oggetti, costumi, trucco, effetti, mezzi, animali, note tecniche e indicazioni produttive. In produzione è uno strumento molto utile perché rende visibili le necessità pratiche del copione e aiuta a costruire piano di lavorazione e budget."
},
{
  "term": "Piano finanziario",
  "category": "Produzione",
  "def": "Schema delle fonti economiche previste per finanziare il progetto.",
  "longDef": "Il piano finanziario indica da dove arriveranno le risorse economiche necessarie a realizzare il progetto. Può includere fondi pubblici, investimenti privati, sponsor, prevendite, tax credit, coproduzioni, crowdfunding o contributi di enti. In produzione è essenziale perché un budget indica quanto costa un progetto, mentre il piano finanziario chiarisce come quei costi verranno coperti."
},
{
  "term": "Cashflow - Flusso di cassa",
  "category": "Produzione",
  "def": "Andamento delle entrate e uscite economiche durante la produzione.",
  "longDef": "Il cashflow è il flusso di cassa, cioè il modo in cui entrate e uscite economiche si distribuiscono nel tempo. Anche un progetto finanziato può trovarsi in difficoltà se i soldi arrivano dopo le scadenze di pagamento. In produzione controllare il cashflow è fondamentale per pagare fornitori, collaboratori, noleggi e servizi senza bloccare la lavorazione."
},
{
  "term": "Contingency - Fondo imprevisti",
  "category": "Produzione",
  "def": "Quota di budget riservata a problemi o costi non previsti.",
  "longDef": "La contingency è una quota del budget tenuta da parte per affrontare imprevisti, ritardi, guasti, cambi location, costi extra o necessità improvvise. Non è denaro libero da spendere, ma una protezione contro l’incertezza della lavorazione. In produzione è una voce molto importante perché ogni set può generare problemi non prevedibili in fase di preventivo."
},
{
  "term": "Cost report - Report dei costi",
  "category": "Produzione",
  "def": "Documento che aggiorna lo stato delle spese rispetto al budget previsto.",
  "longDef": "Il cost report è un documento di controllo che confronta budget previsto, spese già sostenute, costi impegnati e possibili scostamenti. Serve a capire se la produzione sta rispettando i limiti economici o se alcune voci stanno superando le previsioni. In produzione è uno strumento fondamentale per prendere decisioni rapide e prevenire squilibri di bilancio."
},
{
  "term": "Above the line - Costi creativi principali",
  "category": "Produzione",
  "def": "Area del budget legata alle figure creative e decisionali principali.",
  "longDef": "Above the line indica le voci di budget legate alle figure creative e produttive principali, come produttori, regista, sceneggiatori, attori principali e altri ruoli chiave a seconda del progetto. Sono costi spesso definiti nelle fasi iniziali e influenzano identità e valore produttivo dell’opera. In produzione il termine aiuta a distinguere le spese creative principali da quelle operative e tecniche."
},
{
  "term": "Below the line - Costi tecnici e produttivi",
  "category": "Produzione",
  "def": "Area del budget legata a troupe, mezzi, reparti tecnici e lavorazione concreta.",
  "longDef": "Below the line indica le voci di budget legate alla realizzazione pratica del progetto: troupe tecnica, attrezzature, location, trasporti, scenografia, costumi, trucco, postproduzione, catering e altri costi operativi. È la parte che sostiene materialmente la lavorazione. In produzione è utile distinguere queste spese perché mostrano quanto serve concretamente per trasformare il progetto in immagini e suoni."
},
{
  "term": "Tax credit - Credito d’imposta",
  "category": "Produzione",
  "def": "Agevolazione fiscale che sostiene economicamente produzioni audiovisive.",
  "longDef": "Il tax credit è un meccanismo di agevolazione fiscale che permette a una produzione di recuperare o compensare una parte dei costi sostenuti, secondo regole e requisiti specifici. Può essere decisivo per la sostenibilità economica di film, serie o opere audiovisive. In produzione è uno strumento importante, ma richiede pianificazione accurata, documentazione corretta e rispetto delle norme previste."
},
{
  "term": "Fondo pubblico",
  "category": "Produzione",
  "def": "Contributo economico erogato da enti pubblici per sostenere opere audiovisive.",
  "longDef": "Un fondo pubblico è un contributo economico messo a disposizione da enti statali, regionali, locali, europei o istituzioni culturali per sostenere progetti audiovisivi. Può riguardare sviluppo, produzione, postproduzione, distribuzione o promozione. In produzione è una risorsa preziosa, ma richiede domande strutturate, requisiti chiari, rendicontazione e spesso tempi amministrativi non immediati."
},
{
  "term": "Coproduzione",
  "category": "Produzione",
  "def": "Produzione realizzata da due o più soggetti che condividono risorse e responsabilità.",
  "longDef": "La coproduzione è un accordo in cui due o più produttori, società o paesi partecipano alla realizzazione di un’opera condividendo risorse, costi, diritti, rischi e benefici. Può essere artistica, economica, tecnica o internazionale. In produzione è una strategia utile per rafforzare il progetto, accedere a fondi diversi e aumentare le possibilità di circolazione dell’opera."
},
{
  "term": "Coproduttore",
  "category": "Produzione",
  "def": "Soggetto che partecipa alla produzione condividendo risorse, diritti o responsabilità.",
  "longDef": "Il coproduttore è una persona o società che partecipa alla realizzazione del progetto insieme al produttore principale. Può contribuire con risorse economiche, servizi, mezzi tecnici, accesso a fondi, competenze o relazioni industriali. In produzione il suo ruolo va definito con precisione perché incide su diritti, decisioni, ricavi e responsabilità."
},
{
  "term": "Produttore associato",
  "category": "Produzione",
  "def": "Figura che contribuisce al progetto con risorse, contatti o supporto specifico.",
  "longDef": "Il produttore associato è una figura che partecipa al progetto offrendo un contributo produttivo, organizzativo, economico o relazionale, ma spesso con responsabilità inferiori rispetto al produttore principale. Il suo ruolo può variare molto da un progetto all’altro. In produzione è importante chiarire cosa comporta questo credito, perché può indicare contributi molto diversi per peso e funzione."
},
{
  "term": "Produttore delegato",
  "category": "Produzione",
  "def": "Figura incaricata di seguire la produzione per conto del produttore o della società.",
  "longDef": "Il produttore delegato segue il progetto per conto del produttore o della società di produzione, occupandosi di coordinamento, controllo e decisioni operative. Può supervisionare budget, tempi, rapporti con i reparti, contratti e avanzamento generale. In produzione è una figura di responsabilità perché rappresenta gli interessi produttivi e garantisce che la lavorazione proceda secondo gli accordi stabiliti."
},
{
  "term": "Service production - Produzione di servizio",
  "category": "Produzione",
  "def": "Supporto produttivo fornito a una produzione esterna in un territorio specifico.",
  "longDef": "La service production è un’attività in cui una società locale fornisce supporto produttivo a una produzione esterna. Può occuparsi di location, permessi, troupe locale, trasporti, noleggi, casting, logistica e gestione pratica sul territorio. In produzione è molto utile quando un progetto gira in un paese o una città che richiede competenze locali e contatti già consolidati."
},
{
  "term": "Product placement - Inserimento di prodotto",
  "category": "Produzione",
  "def": "Presenza concordata di un marchio o prodotto all’interno dell’opera.",
  "longDef": "Il product placement è l’inserimento di un prodotto, marchio o servizio all’interno di un film, video o contenuto audiovisivo secondo accordi produttivi o promozionali. Può essere visivo, narrativo o legato all’uso da parte dei personaggi. In produzione può contribuire al finanziamento o alla disponibilità di beni, ma va gestito con attenzione per non risultare forzato o incoerente con la storia."
},
{
  "term": "Crowdfunding - Finanziamento collettivo",
  "category": "Produzione",
  "def": "Raccolta di fondi da molte persone per sostenere un progetto.",
  "longDef": "Il crowdfunding è una forma di finanziamento collettivo in cui molte persone contribuiscono economicamente alla realizzazione di un progetto. Può offrire ricompense, anteprime, ringraziamenti, copie digitali o altri vantaggi ai sostenitori. In produzione è utile non solo per raccogliere fondi, ma anche per creare una prima comunità attorno al film prima ancora della sua uscita."
},
{
  "term": "NDA - Accordo di riservatezza",
  "category": "Produzione",
  "def": "Accordo che limita la divulgazione di informazioni riservate sul progetto.",
  "longDef": "L’NDA, cioè Non-Disclosure Agreement, è un accordo di riservatezza che impedisce o limita la diffusione di informazioni sensibili sul progetto. Può riguardare sceneggiatura, cast, materiali, strategie, dati economici o contenuti non ancora pubblici. In produzione è utile quando si lavora con collaboratori, partner o fornitori che possono accedere a informazioni riservate."
},
{
  "term": "Cessione diritti",
  "category": "Produzione",
  "def": "Accordo con cui un autore o avente diritto trasferisce determinati diritti d’uso.",
  "longDef": "La cessione diritti è un accordo con cui una persona o società trasferisce alla produzione specifici diritti di utilizzo su un’opera, un testo, una musica, un’immagine, una performance o altro materiale protetto. Deve indicare quali diritti vengono ceduti, per quali territori, durate, mezzi e finalità. In produzione è essenziale perché senza diritti chiari un progetto può avere problemi legali o distributivi."
},
{
  "term": "Contratto attori",
  "category": "Produzione",
  "def": "Accordo che definisce compenso, ruolo, tempi e diritti relativi agli interpreti.",
  "longDef": "Il contratto attori stabilisce le condizioni di partecipazione degli interpreti al progetto. Può indicare compenso, giornate di lavoro, uso dell’immagine, diritti, promozione, obblighi, disponibilità, eventuali prove e modalità di pagamento. In produzione è un documento fondamentale perché tutela sia l’attore sia la produzione e chiarisce fin dall’inizio il rapporto professionale."
},
{
  "term": "Contratto troupe",
  "category": "Produzione",
  "def": "Accordo che regola mansioni, compensi e tempi dei collaboratori tecnici.",
  "longDef": "Il contratto troupe definisce il rapporto tra produzione e collaboratori tecnici o organizzativi. Specifica ruolo, mansioni, compenso, durata dell’incarico, orari, eventuali rimborsi, diritti e responsabilità. In produzione è importante perché un set funziona meglio quando ogni figura sa esattamente cosa deve fare, per quanto tempo e secondo quali condizioni."
},
{
  "term": "Checklist di produzione",
  "category": "Produzione",
  "def": "Lista di controllo delle attività e dei materiali necessari alla lavorazione.",
  "longDef": "La checklist di produzione è una lista operativa usata per verificare che attività, documenti, materiali, contatti, attrezzature e autorizzazioni siano pronti. Può essere generale o specifica per giornata, reparto, location o fase del progetto. In produzione è uno strumento semplice ma molto efficace per ridurre dimenticanze, errori e improvvisazioni."
},
{
  "term": "Daily production report - Rapporto giornaliero di produzione",
  "category": "Produzione",
  "def": "Documento che riepiloga ciò che è avvenuto in una giornata di lavorazione.",
  "longDef": "Il daily production report è il rapporto giornaliero che registra informazioni sulla giornata di set, come scene girate, orari, presenze, ritardi, problemi, straordinari, incidenti, note produttive e avanzamento rispetto al piano. È utile per mantenere controllo sull’andamento reale della lavorazione. In produzione permette di confrontare programma e risultati, individuando subito eventuali scostamenti."
},
{
  "term": "Wrap - Fine lavorazione",
  "category": "Produzione",
  "def": "Conclusione di una giornata, scena o intera fase di riprese.",
  "longDef": "Il wrap indica la chiusura di una fase di lavorazione, di una giornata di riprese, di una scena o dell’intero progetto sul set. Può riferirsi al momento in cui si smonta, si restituiscono materiali e si verifica che tutto sia stato completato. In produzione è un termine pratico importante perché segna il passaggio dal lavoro attivo alla chiusura organizzata."
},
{
  "term": "Turnaround - Riposo minimo tra giornate",
  "category": "Produzione",
  "def": "Intervallo minimo di riposo tra la fine di una giornata e l’inizio della successiva.",
  "longDef": "Il turnaround è il periodo minimo di riposo previsto tra la fine di una giornata di lavoro e la convocazione successiva. Serve a tutelare sicurezza, lucidità e sostenibilità del ritmo produttivo. In produzione va considerato con attenzione nel piano di lavorazione, perché giornate troppo ravvicinate aumentano stanchezza, errori e rischi sul set."
},
{
  "term": "Unit base - Campo base della produzione",
  "category": "Produzione",
  "def": "Area logistica principale dove si concentrano mezzi, servizi e supporti del set.",
  "longDef": "La unit base è l’area logistica di appoggio della produzione, spesso vicina alla location ma separata dallo spazio di ripresa. Può ospitare mezzi, camerini, trucco, costumi, catering, produzione, bagni, parcheggi e zone tecniche. In produzione è fondamentale perché permette al set di funzionare in modo ordinato, soprattutto quando si gira in esterni o in luoghi complessi."
},
{
  "term": "Cold reading - Lettura a prima vista",
  "category": "Recitazione",
  "def": "Lettura immediata di una scena senza preparazione approfondita.",
  "longDef": "Il cold reading è la lettura di una scena o di un dialogo con pochissimo tempo di preparazione. Viene usato spesso nei provini per valutare rapidità di comprensione, presenza, istinto interpretativo e capacità di adattamento dell’attore. In recitazione è utile perché allena a cogliere rapidamente intenzioni, relazioni e tono della scena senza irrigidirsi sulla memoria del testo."
},
{
  "term": "Sides - Estratto per provino",
  "category": "Recitazione",
  "def": "Pagine di sceneggiatura selezionate per un provino o una prova.",
  "longDef": "I sides sono estratti della sceneggiatura scelti per un provino, una callback o una prova attoriale. Contengono di solito una o più scene utili a valutare il personaggio, il tono e la capacità dell’attore di gestire dialogo, ascolto e intenzione. In recitazione sono importanti perché permettono di preparare una prova mirata senza dover lavorare sull’intero copione."
},
{
  "term": "Slate - Presentazione in camera",
  "category": "Recitazione",
  "def": "Breve presentazione dell’attore davanti alla camera prima del provino.",
  "longDef": "Lo slate è la presentazione iniziale dell’attore davanti alla camera, spesso richiesta nei provini e nei self-tape. Può includere nome, cognome, età apparente, agenzia, profili, altezza o altre informazioni richieste dal casting. In recitazione professionale è importante perché dà una prima impressione di presenza, naturalezza e rapporto con l’obiettivo."
},
{
  "term": "Mark - Segno a terra",
  "category": "Recitazione",
  "def": "Punto segnato sul pavimento che indica dove l’attore deve posizionarsi.",
  "longDef": "Il mark è un segno a terra che indica all’attore il punto preciso in cui fermarsi o passare durante una ripresa. Serve a mantenere fuoco, luce, inquadratura e continuità tra una take e l’altra. In recitazione per la camera è fondamentale imparare a raggiungere il mark in modo naturale, senza guardarlo continuamente o rendere meccanico il movimento."
},
{
  "term": "Eyeline - Linea dello sguardo",
  "category": "Recitazione",
  "def": "Direzione dello sguardo dell’attore rispetto a personaggi, camera o fuori campo.",
  "longDef": "L’eyeline è la direzione dello sguardo dell’attore all’interno dell’inquadratura. Deve essere coerente con la posizione degli altri personaggi, della camera e degli elementi fuori campo. In recitazione cinematografica è molto importante perché uno sguardo sbagliato può rompere la credibilità spaziale della scena o rendere confuso il rapporto tra i personaggi."
},
{
  "term": "Cheat out - Aprirsi verso camera",
  "category": "Recitazione",
  "def": "Adattare leggermente corpo o volto per essere più leggibili in camera.",
  "longDef": "Il cheat out consiste nell’aprire leggermente corpo, volto o posizione verso la camera pur mantenendo credibile la relazione scenica. Non significa recitare in modo finto, ma rendere più leggibile l’azione per l’inquadratura. In recitazione per il cinema è una tecnica utile perché permette di rispettare la scena e allo stesso tempo favorire composizione, luce e visibilità dell’attore."
},
{
  "term": "Acting for camera - Recitazione per la macchina da presa",
  "category": "Recitazione",
  "def": "Tecnica recitativa adattata alle esigenze dell’inquadratura e del set.",
  "longDef": "L’acting for camera è la recitazione pensata specificamente per il linguaggio audiovisivo. Richiede precisione nei movimenti, continuità tra take, consapevolezza dell’inquadratura, controllo dello sguardo e capacità di modulare l’intensità in base alla distanza della camera. In recitazione cinematografica è essenziale perché ciò che funziona sul palco non sempre funziona davanti all’obiettivo."
},
{
  "term": "Close-up acting - Recitazione in primo piano",
  "category": "Recitazione",
  "def": "Recitazione calibrata per inquadrature ravvicinate del volto.",
  "longDef": "Il close-up acting è la recitazione pensata per il primo piano, dove ogni minima variazione del volto diventa visibile. Richiede controllo, interiorità e precisione, perché gesti troppo marcati possono risultare eccessivi. In recitazione cinematografica il primo piano è uno spazio molto potente: spesso basta un piccolo cambiamento nello sguardo, nel respiro o nella tensione del viso per comunicare molto."
},
{
  "term": "Off-camera acting - Recitazione fuori campo",
  "category": "Recitazione",
  "def": "Recitazione svolta fuori dall’inquadratura per sostenere la scena di un altro attore.",
  "longDef": "L’off-camera acting è il lavoro dell’attore che recita fuori campo mentre la camera riprende un altro interprete. Anche se non è visibile, la sua presenza aiuta il partner a reagire in modo reale e vivo. In recitazione è una forma di generosità professionale, perché la qualità della scena dipende spesso anche da chi sostiene l’energia del dialogo senza essere inquadrato."
},
{
  "term": "Continuity performance - Continuità interpretativa",
  "category": "Recitazione",
  "def": "Coerenza dell’interpretazione tra take, campi e controcampi.",
  "longDef": "La continuity performance è la capacità dell’attore di mantenere coerenza interpretativa tra una ripresa e l’altra. Riguarda gesti, sguardi, ritmo, intensità emotiva, posizione del corpo, uso degli oggetti e andamento delle battute. In recitazione cinematografica è fondamentale perché una scena viene spesso girata a pezzi, ma nel montaggio deve sembrare un flusso unico e naturale."
},
{
  "term": "Take - Ripresa dell’interpretazione",
  "category": "Recitazione",
  "def": "Singola registrazione di una scena o di una parte di scena.",
  "longDef": "La take è una singola registrazione di una scena, di una battuta o di un’azione. Ogni take può avere variazioni di ritmo, intenzione, energia, precisione tecnica o intensità emotiva. In recitazione è importante saper ripetere una scena mantenendola viva, evitando sia la meccanicità sia cambiamenti troppo grandi che renderebbero difficile il montaggio."
},
{
  "term": "Pick-up - Ripresa parziale",
  "category": "Recitazione",
  "def": "Ripresa di una piccola parte della scena per correggere o integrare il materiale.",
  "longDef": "Il pick-up è una ripresa parziale di una scena, realizzata per correggere una battuta, un gesto, un dettaglio o un passaggio tecnico. Non richiede necessariamente di rifare tutta la scena, ma solo il punto necessario. In recitazione è utile perché chiede all’attore di rientrare rapidamente nello stesso tono, ritmo e stato emotivo di una take precedente."
},
{
  "term": "Rehearsal - Prova",
  "category": "Recitazione",
  "def": "Fase di preparazione in cui attori e regia verificano scena, movimenti e intenzioni.",
  "longDef": "La rehearsal è la prova della scena prima della ripresa o della rappresentazione. Serve a chiarire intenzioni, movimenti, tempi, relazioni, posizioni e problemi pratici. In recitazione è un momento fondamentale perché permette all’attore di sperimentare, comprendere la scena e coordinarsi con regia, camera e partner prima della registrazione definitiva."
},
{
  "term": "Cue - Segnale di attacco",
  "category": "Recitazione",
  "def": "Segnale verbale, fisico o tecnico che indica quando iniziare un’azione o una battuta.",
  "longDef": "Il cue è il segnale che indica all’attore quando entrare, parlare, muoversi o reagire. Può essere una battuta del partner, un gesto, un suono, un movimento di camera o un’indicazione tecnica. In recitazione è importante riconoscere bene i cue perché il ritmo della scena dipende spesso dalla precisione con cui ogni attore aggancia il momento giusto."
},
{
  "term": "Prompt - Suggerimento della battuta",
  "category": "Recitazione",
  "def": "Aiuto dato all’attore quando dimentica o perde una battuta.",
  "longDef": "Il prompt è un suggerimento dato all’attore quando dimentica una battuta o ha bisogno di essere riportato sul testo. Può arrivare da un assistente, da un suggeritore, dal partner o da chi segue il copione. In recitazione va usato come supporto tecnico, ma l’obiettivo dell’attore resta integrare il testo in modo vivo, senza dipendere continuamente dal suggerimento."
},
{
  "term": "Stage business - Azione secondaria del personaggio",
  "category": "Recitazione",
  "def": "Piccola azione fisica che accompagna la scena e caratterizza il personaggio.",
  "longDef": "Lo stage business è un’azione secondaria compiuta dal personaggio durante la scena, come sistemare un oggetto, bere, fumare, cucinare, cercare qualcosa o compiere un gesto abituale. Non deve distrarre, ma rendere il comportamento più concreto e credibile. In recitazione aiuta l’attore a non restare fermo in modo artificiale e a costruire una vita fisica coerente del personaggio."
},
{
  "term": "Sottotesto interpretativo",
  "category": "Recitazione",
  "def": "Significato emotivo o intenzionale che sta sotto le parole dette dal personaggio.",
  "longDef": "Il sottotesto interpretativo è ciò che il personaggio pensa, desidera o nasconde mentre pronuncia una battuta. Le parole possono dire una cosa, ma intenzione, sguardo, pausa e comportamento possono rivelarne un’altra. In recitazione è fondamentale perché rende il dialogo meno esplicativo e più vivo, permettendo all’attore di comunicare conflitto, ambiguità e profondità."
},
{
  "term": "Monologo interiore",
  "category": "Recitazione",
  "def": "Flusso di pensieri che sostiene internamente l’azione del personaggio.",
  "longDef": "Il monologo interiore è il flusso di pensieri, immagini o frasi che l’attore costruisce dentro di sé per sostenere la vita interna del personaggio. Non viene necessariamente pronunciato, ma influenza sguardi, pause, decisioni e reazioni. In recitazione è utile per evitare il vuoto tra una battuta e l’altra e per dare continuità emotiva alla scena."
},
{
  "term": "Azione fisica",
  "category": "Recitazione",
  "def": "Comportamento concreto compiuto dal personaggio per raggiungere un obiettivo.",
  "longDef": "L’azione fisica è ciò che il personaggio fa concretamente sulla scena: camminare, prendere, evitare, offrire, nascondere, toccare, fermarsi o avvicinarsi. Non è solo movimento, ma comportamento orientato da un’intenzione. In recitazione è importante perché aiuta l’attore a trasformare emozioni e idee in azioni visibili, rendendo la scena più concreta e filmabile."
},
{
  "term": "Status scenico",
  "category": "Recitazione",
  "def": "Posizione di forza, debolezza o autorità di un personaggio nella relazione.",
  "longDef": "Lo status scenico indica il rapporto di potere percepito tra i personaggi in una scena. Può cambiare attraverso postura, voce, distanza, ritmo, silenzi, sguardi e reazioni. In recitazione è uno strumento molto utile perché una scena diventa più interessante quando l’attore capisce se il personaggio domina, subisce, sfida, seduce o cerca di recuperare potere."
},
{
  "term": "Cambio di intenzione",
  "category": "Recitazione",
  "def": "Momento in cui il personaggio modifica strategia, desiderio o atteggiamento.",
  "longDef": "Il cambio di intenzione avviene quando il personaggio cambia il modo in cui cerca di ottenere ciò che vuole. Può passare dalla gentilezza all’attacco, dalla difesa alla seduzione, dalla fuga alla confessione. In recitazione è importante individuarlo perché dà ritmo alla scena e impedisce all’interpretazione di restare sempre sullo stesso livello."
},
{
  "term": "Beat emotivo - Unità emotiva della scena",
  "category": "Recitazione",
  "def": "Piccolo passaggio emotivo che modifica il comportamento del personaggio.",
  "longDef": "Il beat emotivo è una piccola unità di cambiamento all’interno della scena, legata a una reazione, una scoperta, una ferita, una decisione o un nuovo impulso. Aiuta l’attore a dividere la scena in passaggi più precisi e vivi. In recitazione è utile perché permette di costruire progressione emotiva invece di recitare tutta la scena con un’unica tonalità."
},
{
  "term": "Tensione interna",
  "category": "Recitazione",
  "def": "Energia trattenuta del personaggio, anche quando l’azione esterna è minima.",
  "longDef": "La tensione interna è la pressione emotiva, mentale o fisica che attraversa il personaggio anche quando non compie grandi azioni. Può nascere da paura, desiderio, rabbia trattenuta, conflitto o aspettativa. In recitazione cinematografica è preziosa perché la camera può cogliere anche ciò che non viene esplicitato, rendendo potente una scena apparentemente silenziosa."
},
{
  "term": "Disponibilità emotiva",
  "category": "Recitazione",
  "def": "Capacità dell’attore di lasciarsi attraversare da emozioni e impulsi in modo controllato.",
  "longDef": "La disponibilità emotiva è la capacità dell’attore di accedere a emozioni, ascolto e vulnerabilità senza perdere controllo tecnico. Non significa forzare il sentimento, ma essere aperti a ciò che accade nella scena e nel rapporto con il partner. In recitazione è importante perché permette interpretazioni vive, reattive e non puramente costruite dall’esterno."
},
{
  "term": "Presenza in ascolto",
  "category": "Recitazione",
  "def": "Qualità dell’attore che resta attivo anche quando non parla.",
  "longDef": "La presenza in ascolto è la capacità dell’attore di restare vivo, attento e reattivo anche nei momenti in cui non ha battute. Lo spettatore percepisce se un personaggio sta davvero ascoltando o se sta solo aspettando il proprio turno per parlare. In recitazione è una qualità decisiva perché molte scene funzionano più sulle reazioni che sulle parole."
},
{
  "term": "Reazione organica",
  "category": "Recitazione",
  "def": "Risposta naturale e credibile dell’attore agli stimoli della scena.",
  "longDef": "La reazione organica è una risposta che nasce in modo credibile dall’ascolto, dalla situazione e dallo stato del personaggio. Non appare programmata o meccanica, ma coerente con ciò che accade nel momento. In recitazione è fondamentale perché il pubblico crede a un personaggio quando le sue reazioni sembrano inevitabili, vive e non semplicemente eseguite."
},
{
  "term": "Controllo del gesto",
  "category": "Recitazione",
  "def": "Uso consapevole dei movimenti del corpo per evitare gesti casuali o eccessivi.",
  "longDef": "Il controllo del gesto è la capacità di usare movimenti, mani, postura e azioni fisiche in modo preciso e coerente con il personaggio. Non significa essere rigidi, ma evitare gesti inutili, ripetitivi o involontari che distraggono dalla scena. In recitazione per la camera è particolarmente importante perché l’inquadratura può rendere enorme anche un movimento minimo."
},
{
  "term": "Economia espressiva",
  "category": "Recitazione",
  "def": "Capacità di comunicare molto con pochi gesti, parole o variazioni.",
  "longDef": "L’economia espressiva è la capacità di ridurre il superfluo e comunicare emozione, pensiero o intenzione con precisione. È particolarmente utile nel cinema, dove la camera può leggere dettagli molto piccoli del volto e del corpo. In recitazione non significa essere freddi, ma scegliere solo ciò che serve davvero alla scena, evitando enfasi inutile."
},
{
  "term": "Naturalismo recitativo",
  "category": "Recitazione",
  "def": "Stile che cerca comportamenti, dialoghi e reazioni simili alla vita reale.",
  "longDef": "Il naturalismo recitativo è uno stile che punta a rendere l’interpretazione credibile, spontanea e vicina al comportamento quotidiano. Richiede ascolto, misura, precisione e capacità di evitare artifici troppo evidenti. In cinema e audiovisivo è molto usato perché l’obiettivo ravvicinato tende a premiare le sfumature e a rendere visibile ogni eccesso."
},
{
  "term": "Recitazione stilizzata",
  "category": "Recitazione",
  "def": "Stile interpretativo volutamente non realistico, costruito secondo una forma espressiva precisa.",
  "longDef": "La recitazione stilizzata è un modo di interpretare che non cerca necessariamente il realismo quotidiano, ma una forma espressiva più evidente, teatrale, simbolica, grottesca o codificata. Può essere adatta a generi specifici, commedie, musical, cinema visionario o opere fortemente autoriali. In recitazione richiede grande controllo, perché l’artificio deve sembrare scelto e coerente, non semplicemente esagerato."
},
{
  "term": "Metodo Stanislavskij",
  "category": "Recitazione",
  "def": "Sistema di lavoro attoriale basato su obiettivi, azioni e verità scenica.",
  "longDef": "Il Metodo Stanislavskij è un sistema di lavoro sull’attore che mira a costruire una recitazione credibile attraverso obiettivi, circostanze date, azioni, ascolto e vita interiore del personaggio. Non si limita all’emozione, ma cerca una logica concreta del comportamento scenico. In recitazione è una base fondamentale perché ha influenzato gran parte della formazione attoriale moderna."
},
{
  "term": "Tecnica Meisner",
  "category": "Recitazione",
  "def": "Tecnica recitativa centrata sull’ascolto reale e sulla risposta impulsiva al partner.",
  "longDef": "La Tecnica Meisner è un approccio alla recitazione che sviluppa ascolto, reazione spontanea e verità nel rapporto con il partner. L’attore lavora per uscire dall’autocontrollo e rispondere realmente a ciò che accade nella scena. In recitazione è molto utile perché riduce la meccanicità e allena a vivere il momento invece di limitarsi a recitare un risultato già deciso."
},
{
  "term": "Metodo Strasberg",
  "category": "Recitazione",
  "def": "Approccio attoriale legato alla memoria emotiva e all’esperienza personale.",
  "longDef": "Il Metodo Strasberg è un approccio alla recitazione sviluppato nell’ambito del Method Acting americano. Lavora sull’uso dell’esperienza personale, della memoria emotiva e della concentrazione per avvicinare l’attore alla verità del personaggio. In recitazione può essere molto potente, ma richiede consapevolezza e disciplina per non confondere lavoro tecnico e coinvolgimento personale incontrollato."
},
{
  "term": "Memoria sensoriale",
  "category": "Recitazione",
  "def": "Uso del ricordo di sensazioni fisiche per alimentare l’interpretazione.",
  "longDef": "La memoria sensoriale è la capacità di richiamare sensazioni fisiche, come caldo, freddo, odori, sapori, peso, dolore o consistenze, per sostenere una scena. Aiuta l’attore a rendere più concreta l’esperienza del personaggio. In recitazione è utile perché il corpo spesso reagisce in modo più credibile quando ha un riferimento sensoriale preciso su cui lavorare."
},
{
  "term": "Partner immaginario",
  "category": "Recitazione",
  "def": "Interlocutore non presente fisicamente usato per sostenere una scena o un self-tape.",
  "longDef": "Il partner immaginario è un interlocutore costruito mentalmente dall’attore quando il personaggio parla, guarda o reagisce a qualcuno che non è fisicamente presente. Può essere utile nei self-tape, nei monologhi, nelle scene con effetti visivi o nei lavori in cui il controcampo verrà girato separatamente. In recitazione aiuta a dare direzione, ascolto e intenzione anche quando manca un vero partner davanti."
},
{
  "term": "Master shot - Inquadratura master",
  "category": "Regia",
  "def": "Inquadratura ampia che copre l’intera azione principale di una scena.",
  "longDef": "Il master shot è un’inquadratura che mostra l’intera azione principale di una scena, spesso includendo tutti i personaggi e lo spazio in cui si muovono. Serve come base di copertura, perché permette al montaggio di avere sempre una visione completa e continua della scena. In regia è molto utile per stabilire geografia, relazioni, movimento e ritmo prima di passare a piani più stretti."
},
{
  "term": "Two-shot - Inquadratura a due",
  "category": "Regia",
  "def": "Inquadratura che mostra due personaggi nello stesso quadro.",
  "longDef": "Il two-shot è un’inquadratura che include due personaggi contemporaneamente. Viene usata spesso nei dialoghi, nei confronti e nelle scene in cui la relazione tra due figure è più importante della singola reazione individuale. In regia permette di mostrare distanza, complicità, tensione o equilibrio di potere tra i personaggi senza dover tagliare continuamente."
},
{
  "term": "Single - Inquadratura singola",
  "category": "Regia",
  "def": "Inquadratura concentrata su un solo personaggio.",
  "longDef": "Il single è un’inquadratura dedicata a un solo personaggio, di solito durante un dialogo o una scena di confronto. Può essere usato per isolare emotivamente il soggetto, mostrare una reazione o dare maggiore peso a una battuta. In regia è uno strumento fondamentale per controllare il punto di vista emotivo della scena."
},
{
  "term": "Dirty single - Singolo sporco",
  "category": "Regia",
  "def": "Inquadratura su un personaggio con una parte dell’altro visibile in primo piano.",
  "longDef": "Il dirty single è un’inquadratura su un personaggio in cui resta visibile una piccola parte dell’altro interlocutore, spesso una spalla, una nuca o un profilo fuori fuoco. Questo elemento in primo piano mantiene il senso della relazione e della presenza fisica tra i personaggi. In regia è molto usato nei dialoghi perché dà profondità e rende il campo-controcampo meno isolato."
},
{
  "term": "Piano d’ascolto",
  "category": "Regia",
  "def": "Inquadratura dedicata a un personaggio mentre ascolta o reagisce.",
  "longDef": "Il piano d’ascolto mostra un personaggio nel momento in cui ascolta, osserva o assorbe ciò che accade. Non è meno importante della battuta detta: spesso il senso emotivo di una scena emerge proprio dalla reazione silenziosa di chi ascolta. In regia è uno strumento prezioso per dare profondità ai dialoghi e costruire tensione senza affidarsi solo alle parole."
},
{
  "term": "Semisoggettiva",
  "category": "Regia",
  "def": "Inquadratura vicina al punto di vista di un personaggio senza coincidere del tutto con i suoi occhi.",
  "longDef": "La semisoggettiva è un’inquadratura che avvicina lo spettatore al punto di vista di un personaggio, ma senza trasformarsi in una soggettiva pura. Può mostrare ciò che il personaggio guarda mantenendo parte della sua presenza nel quadro, oppure collocare la camera molto vicina alla sua prospettiva. In regia è utile per creare coinvolgimento senza perdere completamente la distanza narrativa."
},
{
  "term": "Campo lunghissimo",
  "category": "Regia",
  "def": "Inquadratura molto ampia in cui l’ambiente domina nettamente sui personaggi.",
  "longDef": "Il campo lunghissimo mostra uno spazio molto ampio, spesso paesaggi, città, ambienti naturali o grandi architetture, in cui la figura umana appare piccola o secondaria. Serve a comunicare vastità, isolamento, contesto geografico o rapporto tra personaggio e mondo. In regia è efficace quando l’ambiente non è solo sfondo, ma parte del significato della scena."
},
{
  "term": "Figura intera",
  "category": "Regia",
  "def": "Inquadratura che mostra il personaggio dalla testa ai piedi.",
  "longDef": "La figura intera riprende il personaggio per tutta la sua altezza, mostrando corpo, postura, movimento e rapporto con lo spazio circostante. È utile quando l’azione fisica, il costume, l’andatura o la posizione nello spazio hanno valore narrativo. In regia permette di leggere il personaggio non solo dal volto, ma dall’intero comportamento corporeo."
},
{
  "term": "Mezza figura",
  "category": "Regia",
  "def": "Inquadratura che riprende il personaggio circa dalla vita in su.",
  "longDef": "La mezza figura mostra il personaggio dalla vita in su, mantenendo visibili volto, busto, braccia e parte del linguaggio corporeo. È una misura molto usata nei dialoghi e nelle scene in cui servono sia espressione sia movimento. In regia offre un equilibrio efficace tra vicinanza emotiva e leggibilità dell’azione."
},
{
  "term": "Primissimo piano",
  "category": "Regia",
  "def": "Inquadratura molto ravvicinata del volto del personaggio.",
  "longDef": "Il primissimo piano stringe molto sul volto, concentrandosi su occhi, bocca, espressione e micro-reazioni. Riduce quasi del tutto il contesto e porta lo spettatore dentro lo stato emotivo del personaggio. In regia è uno strumento potente, ma va usato con precisione perché aumenta enormemente il peso di ogni minimo gesto."
},
{
  "term": "Extreme close-up - Dettaglio estremo",
  "category": "Regia",
  "def": "Inquadratura estremamente ravvicinata su una piccola parte del volto o di un oggetto.",
  "longDef": "L’extreme close-up è un’inquadratura molto stretta che isola un dettaglio, come un occhio, una bocca, una mano, un oggetto o un particolare significativo. Serve a concentrare l’attenzione dello spettatore su un elemento minimo ma narrativamente importante. In regia può creare suspense, intimità, tensione o valore simbolico."
},
{
  "term": "Low angle - Ripresa dal basso",
  "category": "Regia",
  "def": "Inquadratura realizzata con la camera posta sotto il livello del soggetto.",
  "longDef": "Il low angle è una ripresa dal basso verso l’alto, in cui la camera guarda il soggetto da una posizione inferiore. Può far apparire un personaggio più potente, minaccioso, eroico o dominante. In regia è una scelta espressiva forte, perché modifica immediatamente la percezione psicologica del soggetto ripreso."
},
{
  "term": "High angle - Ripresa dall’alto",
  "category": "Regia",
  "def": "Inquadratura realizzata con la camera posta sopra il livello del soggetto.",
  "longDef": "L’high angle è una ripresa dall’alto verso il basso, in cui la camera osserva il soggetto da una posizione superiore. Può comunicare fragilità, isolamento, vulnerabilità o perdita di controllo, ma può anche servire semplicemente a chiarire lo spazio. In regia va usato in rapporto al significato della scena, non solo come scelta estetica."
},
{
  "term": "Dutch angle - Inquadratura inclinata",
  "category": "Regia",
  "def": "Inquadratura con l’orizzonte inclinato per creare instabilità visiva.",
  "longDef": "Il dutch angle è un’inquadratura in cui la camera viene inclinata lateralmente, alterando l’orizzonte naturale dell’immagine. Produce una sensazione di squilibrio, tensione, disagio o straniamento. In regia è utile in scene psicologicamente instabili, thriller, horror o momenti in cui il mondo del personaggio sembra perdere ordine."
},
{
  "term": "Push-in - Avvicinamento di camera",
  "category": "Regia",
  "def": "Movimento in cui la camera si avvicina progressivamente al soggetto.",
  "longDef": "Il push-in è un movimento di camera verso il soggetto, usato per aumentare attenzione, intensità o coinvolgimento emotivo. A differenza dello zoom, modifica fisicamente la relazione tra camera e spazio, facendo percepire un avvicinamento reale. In regia è efficace quando una rivelazione, una decisione o un’emozione richiedono maggiore concentrazione visiva."
},
{
  "term": "Pull-back - Allontanamento di camera",
  "category": "Regia",
  "def": "Movimento in cui la camera si allontana progressivamente dal soggetto.",
  "longDef": "Il pull-back è un movimento in cui la camera arretra rispetto al soggetto o alla scena. Può rivelare un ambiente più ampio, creare distanza emotiva, mostrare solitudine o modificare il significato di ciò che sembrava inizialmente chiaro. In regia è utile quando si vuole passare da un dettaglio personale a una visione più ampia del contesto."
},
{
  "term": "Whip pan - Panoramica a schiaffo",
  "category": "Regia",
  "def": "Panoramica rapidissima che crea una forte scia di movimento.",
  "longDef": "Il whip pan è una panoramica molto veloce che sposta bruscamente lo sguardo da un punto a un altro, spesso creando una scia visiva o un effetto di transizione. Può comunicare energia, urgenza, sorpresa o comicità. In regia è una scelta dinamica che richiede precisione, perché se non è motivata può risultare confusa o gratuita."
},
{
  "term": "Crane shot - Ripresa con gru",
  "category": "Regia",
  "def": "Inquadratura realizzata con camera montata su gru o braccio elevabile.",
  "longDef": "Il crane shot è una ripresa effettuata con una gru, un braccio meccanico o un sistema che permette alla camera di salire, scendere o muoversi nello spazio in modo ampio e fluido. Può dare solennità, spettacolarità o rivelare progressivamente lo spazio della scena. In regia è molto efficace quando il movimento verticale o aereo ha un preciso valore narrativo."
},
{
  "term": "Tracking shot - Ripresa in movimento",
  "category": "Regia",
  "def": "Inquadratura in cui la camera segue o accompagna un soggetto nello spazio.",
  "longDef": "Il tracking shot è una ripresa in movimento in cui la camera accompagna, segue o precede un soggetto mentre si sposta nello spazio. Può essere realizzato con carrello, steadicam, gimbal, dolly o altri supporti. In regia è utile per mantenere continuità d’azione, creare immersione e far percepire il rapporto tra personaggio e ambiente."
},
{
  "term": "Walk and talk - Dialogo in movimento",
  "category": "Regia",
  "def": "Scena dialogata in cui i personaggi parlano mentre camminano.",
  "longDef": "Il walk and talk è una scena in cui i personaggi dialogano mentre si muovono, spesso camminando attraverso un ambiente. Permette di unire esposizione, ritmo visivo e movimento, evitando una conversazione troppo statica. In regia richiede coordinamento tra attori, camera, fuoco, suono e spazio, perché il dialogo deve restare chiaro mentre l’azione procede."
},
{
  "term": "Staging - Disposizione scenica",
  "category": "Regia",
  "def": "Organizzazione dei personaggi e degli elementi nello spazio della scena.",
  "longDef": "Lo staging è il modo in cui personaggi, oggetti e azioni vengono disposti nello spazio scenico. Non riguarda solo la posizione, ma anche relazioni, distanze, livelli, direzioni e possibilità di movimento. In regia è fondamentale perché una scena ben organizzata nello spazio diventa più leggibile, più dinamica e più ricca di significato."
},
{
  "term": "Regia degli attori",
  "category": "Regia",
  "def": "Lavoro del regista nel guidare interpretazioni, intenzioni e relazioni tra personaggi.",
  "longDef": "La regia degli attori è il lavoro con cui il regista guida gli interpreti nella costruzione di personaggi, intenzioni, ritmo, ascolto e relazioni. Non consiste solo nel dire cosa fare, ma nel creare condizioni chiare perché l’attore possa agire in modo credibile e coerente. In regia è una competenza essenziale, perché anche la migliore idea visiva perde forza se l’interpretazione non funziona."
},
{
  "term": "Direzione dell’attenzione",
  "category": "Regia",
  "def": "Uso di inquadratura, movimento, luce e suono per guidare lo sguardo dello spettatore.",
  "longDef": "La direzione dell’attenzione è la capacità del regista di far capire allo spettatore cosa guardare, quando guardarlo e con quale peso emotivo. Può avvenire attraverso composizione, movimento di camera, fuoco, luce, suono, gesto, posizione degli attori o montaggio. In regia è fondamentale perché un’immagine ricca ma senza gerarchia può diventare confusa."
},
{
  "term": "Punto di vista registico",
  "category": "Regia",
  "def": "Scelta dello sguardo attraverso cui la scena viene raccontata.",
  "longDef": "Il punto di vista registico è la prospettiva da cui il regista decide di far vivere una scena allo spettatore. Può essere vicino a un personaggio, distaccato, oggettivo, soggettivo, ironico, inquietante o ambiguo. In regia determina non solo cosa viene mostrato, ma anche come il pubblico interpreta emotivamente e moralmente ciò che vede."
},
{
  "term": "Intenzione registica",
  "category": "Regia",
  "def": "Obiettivo espressivo che guida le scelte di messa in scena e ripresa.",
  "longDef": "L’intenzione registica è ciò che il regista vuole ottenere attraverso una scena, un’inquadratura o una scelta visiva. Può riguardare emozione, tensione, chiarezza narrativa, ritmo, sorpresa, disagio o identificazione. In regia è importante perché impedisce alle scelte tecniche di diventare decorative: ogni movimento, taglio o composizione dovrebbe servire un’intenzione precisa."
},
{
  "term": "Tono della scena",
  "category": "Regia",
  "def": "Qualità emotiva e stilistica complessiva con cui una scena viene raccontata.",
  "longDef": "Il tono della scena è l’atmosfera emotiva e stilistica con cui un momento viene messo in scena: drammatico, ironico, realistico, sospeso, grottesco, intimo o minaccioso. Dipende da recitazione, ritmo, luce, camera, suono e montaggio. In regia controllare il tono è essenziale perché la stessa azione può assumere significati molto diversi a seconda di come viene raccontata."
},
{
  "term": "Sottotesto registico",
  "category": "Regia",
  "def": "Significato implicito che la regia suggerisce sotto l’azione visibile.",
  "longDef": "Il sottotesto registico è ciò che la scena comunica oltre le parole e oltre l’azione più evidente. Può emergere da distanza tra personaggi, uso dello spazio, silenzi, composizione, fuori campo, luce o durata di un’inquadratura. In regia è uno strumento raffinato perché permette di suggerire conflitti, desideri e tensioni senza dichiararli apertamente."
},
{
  "term": "Ritmo interno della scena",
  "category": "Regia",
  "def": "Andamento temporale generato da azioni, pause, movimenti e interpretazioni dentro la scena.",
  "longDef": "Il ritmo interno della scena nasce da ciò che accade all’interno dell’inquadratura: movimenti degli attori, pause, sguardi, gesti, entrate, uscite e variazioni emotive. Non dipende solo dal montaggio, ma da come la scena viene diretta già sul set. In regia è fondamentale perché una scena può risultare viva o piatta ancora prima di essere montata."
},
{
  "term": "Geografia della scena",
  "category": "Regia",
  "def": "Chiarezza dei rapporti spaziali tra personaggi, oggetti e ambiente.",
  "longDef": "La geografia della scena è la comprensione dello spazio in cui si svolge l’azione: dove si trovano i personaggi, da dove arrivano, verso cosa guardano e come si muovono. Una geografia chiara permette allo spettatore di orientarsi senza fatica. In regia è particolarmente importante nelle scene d’azione, nei dialoghi complessi e negli spazi articolati."
},
{
  "term": "Spazio scenico",
  "category": "Regia",
  "def": "Ambiente fisico e visivo in cui si svolge l’azione della scena.",
  "longDef": "Lo spazio scenico è l’insieme dell’ambiente in cui si muovono personaggi, oggetti e camera. Include profondità, accessi, ostacoli, livelli, distanze e possibilità di movimento. In regia non è un semplice contenitore dell’azione, ma un elemento narrativo: il modo in cui viene usato può creare tensione, libertà, isolamento o dinamismo."
},
{
  "term": "Entrata in asse",
  "category": "Regia",
  "def": "Ingresso o movimento del soggetto lungo una direzione coerente con l’asse della scena.",
  "longDef": "L’entrata in asse è un ingresso o movimento che rispetta la direzione spaziale stabilita dalla scena. Aiuta a mantenere coerenza tra sguardi, posizioni e direzione del movimento. In regia è utile perché evita confusione nello spettatore e permette di costruire una continuità visiva ordinata tra inquadrature diverse."
},
{
  "term": "Raccordo di sguardo",
  "category": "Regia",
  "def": "Continuità tra ciò che un personaggio guarda e l’inquadratura successiva.",
  "longDef": "Il raccordo di sguardo collega lo sguardo di un personaggio a ciò che viene mostrato nell’inquadratura successiva. Se un personaggio guarda fuori campo, il taglio seguente può rivelare l’oggetto, la persona o l’evento osservato. In regia è uno strumento fondamentale per guidare l’attenzione e costruire relazioni spaziali chiare."
},
{
  "term": "Raccordo di movimento",
  "category": "Regia",
  "def": "Continuità tra un movimento iniziato in un’inquadratura e proseguito nella successiva.",
  "longDef": "Il raccordo di movimento mantiene fluida un’azione attraverso il taglio, facendo proseguire il gesto o lo spostamento da un’inquadratura all’altra. Serve a rendere il montaggio più naturale e a evitare interruzioni percepite come errori. In regia va preparato già durante le riprese, perché posizione, direzione e ritmo del movimento devono essere coerenti."
},
{
  "term": "Rivelazione visiva",
  "category": "Regia",
  "def": "Momento in cui la regia mostra progressivamente un’informazione importante.",
  "longDef": "La rivelazione visiva è il modo in cui una scena mostra allo spettatore un’informazione nuova attraverso composizione, movimento di camera, fuoco, luce o entrata in campo. Può riguardare un personaggio, un oggetto, un pericolo, un luogo o un dettaglio narrativo. In regia è efficace perché trasforma l’informazione in esperienza visiva, invece di affidarla solo al dialogo."
},
{
  "term": "Scelta del punto macchina",
  "category": "Regia",
  "def": "Decisione sulla posizione precisa della camera rispetto all’azione.",
  "longDef": "La scelta del punto macchina è la decisione su dove collocare la camera per raccontare una scena. Determina distanza, angolazione, rapporto tra personaggi, profondità, informazioni visibili e coinvolgimento dello spettatore. In regia è una delle scelte più importanti, perché spostare la camera anche di poco può cambiare completamente il senso dell’inquadratura."
},
{
  "term": "Slugline - Intestazione di scena",
  "category": "Sceneggiatura",
  "def": "Riga che indica luogo e tempo di una scena nel formato di sceneggiatura.",
  "longDef": "La slugline è l’intestazione che apre una scena e indica se ci troviamo in interno o esterno, il luogo dell’azione e il momento della giornata. Serve a orientare lettore, regia e produzione in modo rapido e standardizzato. In sceneggiatura è fondamentale perché ogni scena deve essere identificabile con chiarezza prima ancora di leggere l’azione."
},
{
  "term": "INT./EXT. - Interno/Esterno",
  "category": "Sceneggiatura",
  "def": "Indicazione che specifica se una scena si svolge in un ambiente interno o esterno.",
  "longDef": "INT. ed EXT. sono abbreviazioni usate nelle intestazioni di scena per indicare rispettivamente interno ed esterno. Questa informazione è utile non solo alla lettura, ma anche alla produzione, perché cambia esigenze di location, luce, suono, permessi e organizzazione. In sceneggiatura è una convenzione semplice ma essenziale per rendere il copione tecnicamente leggibile."
},
{
  "term": "Action line - Descrizione dell’azione",
  "category": "Sceneggiatura",
  "def": "Parte del copione che descrive ciò che si vede e accade nella scena.",
  "longDef": "L’action line è la descrizione dell’azione visibile all’interno della scena. Racconta ciò che lo spettatore potrebbe vedere o sentire, evitando spiegazioni interiori non filmabili. In sceneggiatura è importante scriverla in modo chiaro, concreto e visivo, perché deve guidare immaginazione, regia e ritmo senza trasformarsi in prosa letteraria."
},
{
  "term": "Character cue - Nome del personaggio nel copione",
  "category": "Sceneggiatura",
  "def": "Indicazione del personaggio che sta per pronunciare una battuta.",
  "longDef": "Il character cue è il nome del personaggio scritto sopra una battuta di dialogo. Serve a indicare chiaramente chi parla e a mantenere ordinata la lettura della scena. In sceneggiatura è una parte tecnica del formato, ma ha anche valore pratico per attori, regia e produzione, perché rende immediatamente leggibile la distribuzione delle battute."
},
{
  "term": "Parenthetical - Indicazione tra parentesi",
  "category": "Sceneggiatura",
  "def": "Breve indicazione inserita sotto il nome del personaggio prima di una battuta.",
  "longDef": "Il parenthetical è una breve indicazione tra parentesi usata per chiarire il modo in cui una battuta viene detta o a chi è rivolta. Va usato con parsimonia, perché una sceneggiatura non deve dirigere ogni sfumatura dell’attore. In sceneggiatura è utile quando evita ambiguità reali, ma diventa debole se sostituisce dialoghi ben scritti o azioni chiare."
},
{
  "term": "Transition - Transizione di sceneggiatura",
  "category": "Sceneggiatura",
  "def": "Indicazione scritta che segnala un passaggio tra scene o momenti narrativi.",
  "longDef": "La transition è un’indicazione di passaggio tra una scena e l’altra, come stacco, dissolvenza o altri raccordi scritti nel copione. Nel cinema contemporaneo si usa meno rispetto al passato, perché molte transizioni vengono decise in regia o montaggio. In sceneggiatura va usata solo quando il tipo di passaggio ha un significato narrativo o stilistico preciso."
},
{
  "term": "Spec script - Sceneggiatura speculativa",
  "category": "Sceneggiatura",
  "def": "Sceneggiatura scritta senza incarico diretto, per proporre o vendere un progetto.",
  "longDef": "La spec script è una sceneggiatura scritta dall’autore senza essere stata commissionata in anticipo da un produttore o da uno studio. Serve a proporre un progetto originale, dimostrare capacità di scrittura o cercare interesse produttivo. In sceneggiatura è importante perché deve essere molto leggibile, forte e autonoma, dato che spesso rappresenta il primo contatto tra autore e mercato."
},
{
  "term": "Shooting script - Sceneggiatura di lavorazione",
  "category": "Sceneggiatura",
  "def": "Versione della sceneggiatura preparata per la fase di ripresa.",
  "longDef": "La shooting script è la versione della sceneggiatura usata concretamente per organizzare e realizzare le riprese. Può contenere numerazione delle scene, revisioni, indicazioni tecniche, modifiche approvate e struttura più stabile rispetto alle prime stesure. In produzione audiovisiva è il passaggio in cui il testo smette di essere solo racconto e diventa uno strumento operativo."
},
{
  "term": "Revisione di sceneggiatura",
  "category": "Sceneggiatura",
  "def": "Fase di correzione e miglioramento del copione.",
  "longDef": "La revisione di sceneggiatura è il lavoro di riscrittura, correzione e affinamento del copione dopo una prima stesura. Può riguardare struttura, personaggi, dialoghi, ritmo, chiarezza, tono o fattibilità produttiva. In sceneggiatura è una fase decisiva, perché spesso la qualità di un progetto nasce più dalla riscrittura che dalla prima idea."
},
{
  "term": "Draft - Stesura",
  "category": "Sceneggiatura",
  "def": "Versione provvisoria o successiva di una sceneggiatura.",
  "longDef": "Il draft è una versione della sceneggiatura in un determinato momento del suo sviluppo. Una prima stesura può essere molto diversa da quelle successive, che correggono struttura, dialoghi, personaggi o durata. In sceneggiatura lavorare per draft aiuta a vedere il testo come un processo progressivo, non come qualcosa che deve nascere perfetto subito."
},
{
  "term": "Table read - Lettura collettiva",
  "category": "Sceneggiatura",
  "def": "Lettura ad alta voce del copione con attori, autori o produzione.",
  "longDef": "La table read è una lettura collettiva della sceneggiatura, spesso con attori o collaboratori, per ascoltare dialoghi, ritmo e funzionamento delle scene. Permette di individuare passaggi deboli, battute innaturali, problemi di chiarezza o cali di tensione. In sceneggiatura è molto utile perché ciò che sembra funzionare sulla pagina può rivelare limiti quando viene pronunciato ad alta voce."
},
{
  "term": "Script doctor - Consulente di riscrittura",
  "category": "Sceneggiatura",
  "def": "Professionista che interviene su una sceneggiatura per migliorarne struttura, dialoghi o personaggi.",
  "longDef": "Lo script doctor è una figura chiamata a intervenire su una sceneggiatura già esistente per migliorarla, spesso in modo mirato. Può lavorare su struttura, dialoghi, tono, personaggi, ritmo o problemi produttivi. In sceneggiatura è un ruolo delicato, perché richiede capacità tecnica e rispetto dell’identità del progetto, senza limitarsi a correggere superficialmente il testo."
},
{
  "term": "Coverage - Scheda di valutazione",
  "category": "Sceneggiatura",
  "def": "Documento che analizza e valuta una sceneggiatura per produttori, concorsi o sviluppo.",
  "longDef": "Il coverage è una scheda di lettura che riassume e valuta una sceneggiatura. Di solito include sinossi, giudizio su struttura, personaggi, dialoghi, potenziale produttivo e indicazioni finali. In sceneggiatura è importante perché aiuta produttori, editor, concorsi o società di sviluppo a decidere se un progetto merita attenzione, riscrittura o investimento."
},
{
  "term": "Note di sceneggiatura",
  "category": "Sceneggiatura",
  "def": "Osservazioni e suggerimenti dati per migliorare il copione.",
  "longDef": "Le note di sceneggiatura sono osservazioni fornite da registi, produttori, editor, docenti, lettori o collaboratori per migliorare il copione. Possono essere generali o molto specifiche, e riguardare struttura, tono, chiarezza, personaggi o dialoghi. In sceneggiatura è importante saperle valutare con lucidità: non tutte le note vanno accettate, ma tutte vanno comprese prima di essere scartate."
},
{
  "term": "Dramatic question - Domanda drammatica",
  "category": "Sceneggiatura",
  "def": "Domanda centrale che tiene vivo l’interesse narrativo dello spettatore.",
  "longDef": "La dramatic question è la domanda implicita che accompagna il racconto e spinge lo spettatore a voler conoscere l’esito della storia. Può essere: riuscirà il protagonista a salvarsi, a ottenere ciò che vuole, a scoprire la verità o a cambiare davvero? In sceneggiatura è importante perché dà direzione alla tensione narrativa e rende più chiaro il motore del racconto."
},
{
  "term": "Stakes - Posta in gioco",
  "category": "Sceneggiatura",
  "def": "Conseguenze positive o negative legate al successo o al fallimento del personaggio.",
  "longDef": "Gli stakes sono la posta in gioco della storia, cioè ciò che il personaggio può vincere o perdere attraverso le sue azioni. Più le conseguenze sono chiare e significative, più il pubblico percepisce tensione. In sceneggiatura gli stakes non devono essere per forza enormi, ma devono essere importanti per il personaggio e comprensibili per lo spettatore."
},
{
  "term": "Need - Bisogno interiore del personaggio",
  "category": "Sceneggiatura",
  "def": "Ciò di cui il personaggio ha davvero bisogno per cambiare o completarsi.",
  "longDef": "Il need è il bisogno profondo del personaggio, spesso diverso da ciò che lui crede di volere. Può riguardare accettazione, coraggio, verità, fiducia, perdono o capacità di cambiare. In sceneggiatura è essenziale perché dà profondità all’arco del personaggio: il protagonista può inseguire un obiettivo esterno, ma il vero cambiamento nasce dal bisogno interiore."
},
{
  "term": "Want - Desiderio esplicito del personaggio",
  "category": "Sceneggiatura",
  "def": "Obiettivo concreto che il personaggio vuole raggiungere nella storia.",
  "longDef": "Il want è ciò che il personaggio desidera in modo esplicito e riconoscibile. Può essere vincere, fuggire, conquistare qualcuno, ottenere giustizia, risolvere un mistero o raggiungere un luogo. In sceneggiatura è importante perché dà azione e direzione alla storia, mentre il need lavora su un livello più profondo e trasformativo."
},
{
  "term": "Dilemma",
  "category": "Sceneggiatura",
  "def": "Scelta difficile tra due possibilità entrambe problematiche o significative.",
  "longDef": "Il dilemma è una situazione in cui il personaggio deve scegliere tra due opzioni difficili, spesso entrambe cariche di conseguenze. Funziona quando non esiste una soluzione comoda o completamente giusta. In sceneggiatura è uno strumento potente perché rivela davvero il personaggio: ciò che sceglie sotto pressione mostra chi è più di qualunque spiegazione."
},
{
  "term": "Scelta irreversibile",
  "category": "Sceneggiatura",
  "def": "Decisione narrativa dopo la quale il personaggio non può tornare alla situazione iniziale.",
  "longDef": "La scelta irreversibile è un momento in cui il personaggio compie un’azione o prende una decisione che cambia definitivamente il percorso della storia. Dopo questa scelta non è più possibile tornare allo stato precedente senza conseguenze. In sceneggiatura è utile perché segna passaggi forti della struttura e impedisce al racconto di restare statico."
},
{
  "term": "Reversal - Ribaltamento narrativo",
  "category": "Sceneggiatura",
  "def": "Cambio improvviso che rovescia la direzione o il significato di una situazione.",
  "longDef": "Il reversal è un ribaltamento narrativo che cambia improvvisamente il senso di una scena, di un rapporto o di una linea d’azione. Può trasformare una vittoria in una sconfitta, una certezza in un dubbio o un alleato in una minaccia. In sceneggiatura è utile perché mantiene vivo il racconto e impedisce allo spettatore di prevedere troppo facilmente lo sviluppo degli eventi."
},
{
  "term": "Set piece - Sequenza forte",
  "category": "Sceneggiatura",
  "def": "Sequenza particolarmente memorabile, spettacolare o centrale per il progetto.",
  "longDef": "Il set piece è una sequenza costruita per avere forte impatto narrativo, visivo o emotivo. Può essere una scena d’azione, un confronto, una rivelazione, una sequenza comica o un momento altamente riconoscibile. In sceneggiatura è importante perché spesso rappresenta una delle promesse principali del film e deve essere preparato con cura."
},
{
  "term": "Sottotrama - Subplot",
  "category": "Sceneggiatura",
  "def": "Linea narrativa secondaria che accompagna o contrasta la trama principale.",
  "longDef": "La sottotrama è una linea narrativa secondaria che si sviluppa accanto alla trama principale. Può riguardare un personaggio secondario, una relazione, un conflitto parallelo o un tema complementare. In sceneggiatura è utile quando arricchisce il racconto e illumina il tema centrale, ma diventa un problema se distrae o appesantisce la progressione principale."
},
{
  "term": "B-story - Linea narrativa secondaria",
  "category": "Sceneggiatura",
  "def": "Linea narrativa parallela che sostiene tema, personaggi o sviluppo emotivo.",
  "longDef": "La B-story è una linea narrativa secondaria che accompagna la trama principale e spesso sviluppa il lato emotivo, relazionale o tematico della storia. Può essere una storia d’amore, un rapporto di amicizia, un conflitto familiare o una crescita personale. In sceneggiatura è utile perché dà respiro al racconto e può rivelare aspetti del protagonista che la trama principale non mostra direttamente."
},
{
  "term": "Planting - Semina narrativa",
  "category": "Sceneggiatura",
  "def": "Inserimento anticipato di un elemento che diventerà importante più avanti.",
  "longDef": "Il planting è l’inserimento di un dettaglio, informazione, oggetto o comportamento che acquisterà importanza in un momento successivo della storia. Funziona quando viene introdotto in modo naturale, senza attirare troppa attenzione. In sceneggiatura è uno strumento fondamentale per costruire payoff efficaci e dare allo spettatore la sensazione che il racconto fosse preparato con intelligenza."
},
{
  "term": "Richiamo narrativo - Callback narrativo",
  "category": "Sceneggiatura",
  "def": "Ripresa di un elemento apparso prima per creare collegamento, senso o effetto.",
  "longDef": "Il richiamo narrativo è il ritorno di una battuta, immagine, situazione o dettaglio già apparso in precedenza. Può generare comicità, emozione, senso di chiusura o riconoscimento. In sceneggiatura è utile perché crea coesione interna: quando un elemento ritorna nel momento giusto, il racconto appare più compatto e soddisfacente."
},
{
  "term": "Running gag - Gag ricorrente",
  "category": "Sceneggiatura",
  "def": "Battuta o situazione comica che ritorna più volte con variazioni.",
  "longDef": "La running gag è una battuta, situazione o dinamica comica che ritorna più volte nel corso della storia. Funziona quando ogni ritorno aggiunge una variazione, un’escalation o un nuovo contesto. In sceneggiatura comica è uno strumento efficace, ma va dosato bene: se torna senza evoluzione, rischia di perdere forza."
},
{
  "term": "Motivo ricorrente",
  "category": "Sceneggiatura",
  "def": "Elemento narrativo, visivo o simbolico che ritorna più volte nel racconto.",
  "longDef": "Il motivo ricorrente è un elemento che si ripete nel corso della storia, come un oggetto, una frase, un gesto, un’immagine, una situazione o un tema visivo. La ripetizione crea associazioni e rafforza il significato dell’opera. In sceneggiatura è utile perché aiuta a dare unità al racconto e può trasformare dettagli apparentemente semplici in elementi simbolici."
},
{
  "term": "Ironia drammatica - Dramatic irony",
  "category": "Sceneggiatura",
  "def": "Situazione in cui lo spettatore sa qualcosa che il personaggio ignora.",
  "longDef": "L’ironia drammatica si verifica quando lo spettatore possiede un’informazione che uno o più personaggi non conoscono. Questa differenza di conoscenza crea suspense, comicità, tensione o tragedia, a seconda del contesto. In sceneggiatura è uno strumento molto potente perché trasforma l’attesa dello spettatore in partecipazione attiva."
},
{
  "term": "Character foil - Personaggio specchio",
  "category": "Sceneggiatura",
  "def": "Personaggio costruito per far emergere caratteristiche del protagonista tramite contrasto.",
  "longDef": "Il character foil è un personaggio che mette in evidenza qualità, limiti o contraddizioni del protagonista attraverso contrasto o somiglianza deformata. Può essere più coraggioso, più cinico, più libero, più fragile o più estremo. In sceneggiatura è utile perché permette di rivelare il protagonista non attraverso spiegazioni, ma attraverso il confronto con un altro personaggio."
},
{
  "term": "Antieroe",
  "category": "Sceneggiatura",
  "def": "Protagonista privo di qualità eroiche tradizionali ma narrativamente centrale.",
  "longDef": "L’antieroe è un protagonista che non possiede le virtù classiche dell’eroe, come nobiltà, coraggio limpido o moralità esemplare. Può essere fragile, ambiguo, egoista, cinico o contraddittorio, ma resta il centro del racconto. In sceneggiatura è interessante perché permette storie più complesse, dove identificazione e giudizio morale non coincidono sempre."
},
{
  "term": "Mentore",
  "category": "Sceneggiatura",
  "def": "Personaggio che guida, prepara o orienta il protagonista nel suo percorso.",
  "longDef": "Il mentore è il personaggio che aiuta il protagonista a comprendere il mondo, affrontare una prova o sviluppare una capacità necessaria. Può essere saggio, imperfetto, riluttante o persino destinato a sparire nel corso della storia. In sceneggiatura è utile perché incarna conoscenza, passaggio di esperienza e spesso una spinta decisiva verso il cambiamento."
},
{
  "term": "Alleato",
  "category": "Sceneggiatura",
  "def": "Personaggio che sostiene il protagonista nel raggiungimento del suo obiettivo.",
  "longDef": "L’alleato è un personaggio che aiuta il protagonista nel suo percorso, offrendo supporto pratico, emotivo, morale o strategico. Non deve essere necessariamente perfetto o sempre presente: può avere conflitti, limiti o un proprio arco narrativo. In sceneggiatura è utile perché permette al protagonista di agire dentro una rete di relazioni, non nel vuoto."
},
{
  "term": "Catalizzatore narrativo",
  "category": "Sceneggiatura",
  "def": "Elemento o personaggio che accelera il cambiamento della storia.",
  "longDef": "Il catalizzatore narrativo è un evento, personaggio o informazione che accelera il movimento della storia e costringe i personaggi a reagire. Può coincidere con l’incidente scatenante o apparire in altri momenti chiave. In sceneggiatura è utile perché rompe l’equilibrio e spinge il racconto verso una nuova fase."
},
{
  "term": "Worldbuilding - Costruzione del mondo narrativo",
  "category": "Sceneggiatura",
  "def": "Creazione delle regole, della storia e della società del mondo in cui si svolge il racconto.",
  "longDef": "Il worldbuilding è la costruzione del mondo narrativo in cui si muovono i personaggi. Include regole sociali, storia, luoghi, tecnologia, cultura, economia, mitologia, linguaggio e limiti del mondo rappresentato. In sceneggiatura è fondamentale nei generi fantastici, fantascientifici o storici, ma è utile in qualunque racconto che voglia sembrare coerente e abitato."
},
{
  "term": "Regole del mondo",
  "category": "Sceneggiatura",
  "def": "Principi che definiscono cosa è possibile o impossibile nell’universo narrativo.",
  "longDef": "Le regole del mondo sono i principi che stabiliscono come funziona l’universo della storia. Possono riguardare magia, tecnologia, società, leggi fisiche, rapporti di potere o codici morali. In sceneggiatura sono importanti perché il pubblico può accettare anche mondi molto strani, purché le regole siano chiare e rispettate con coerenza."
},
{
  "term": "Lore - Mitologia interna",
  "category": "Sceneggiatura",
  "def": "Insieme di eventi, leggende e informazioni che danno profondità al mondo narrativo.",
  "longDef": "La lore è l’insieme di storia, leggende, eventi passati, genealogie, miti, regole e dettagli che danno profondità a un universo narrativo. Non tutto deve essere spiegato direttamente, ma deve sostenere la coerenza del mondo. In sceneggiatura è utile soprattutto in saghe, fantasy, fantascienza, horror e racconti seriali."
},
{
  "term": "High concept - Idea ad alto impatto",
  "category": "Sceneggiatura",
  "def": "Idea narrativa forte, semplice da comunicare e immediatamente riconoscibile.",
  "longDef": "L’high concept è un’idea narrativa che può essere comunicata in modo rapido e che possiede un forte potenziale di attrazione. Di solito combina semplicità, originalità, conflitto chiaro e promessa spettacolare o emotiva. In sceneggiatura è importante perché aiuta un progetto a distinguersi, soprattutto quando deve essere presentato a produttori, piattaforme o pubblico."
},
{
  "term": "Show, don’t tell - Mostrare senza spiegare",
  "category": "Sceneggiatura",
  "def": "Principio secondo cui emozioni e informazioni dovrebbero emergere da azioni e immagini più che da spiegazioni.",
  "longDef": "Show, don’t tell è un principio di scrittura audiovisiva secondo cui una sceneggiatura dovrebbe comunicare attraverso azioni, scelte, immagini, comportamenti e situazioni, invece di spiegare tutto a parole. Non significa eliminare i dialoghi, ma evitare che dicano ciò che la scena può mostrare meglio. In sceneggiatura è fondamentale perché il cinema è prima di tutto un linguaggio visivo e drammatico."
},
{
  "term": "Final image - Immagine finale",
  "category": "Sceneggiatura",
  "def": "Ultima immagine significativa del racconto, spesso legata alla trasformazione avvenuta.",
  "longDef": "La final image è l’immagine conclusiva del racconto o una delle ultime immagini forti della sceneggiatura. Spesso mostra in forma visiva il cambiamento del protagonista, il nuovo equilibrio o il significato finale della storia. In sceneggiatura è importante perché l’ultima immagine resta nella memoria dello spettatore e può dare una chiusura emotiva più potente di una spiegazione verbale."
},
{
  "term": "HD - Alta definizione",
  "category": "Video",
  "def": "Formato video ad alta definizione, generalmente pari a 1280×720 pixel.",
  "longDef": "L’HD, cioè High Definition, indica un formato video con risoluzione superiore alla definizione standard. Il formato HD più comune è 1280×720 pixel, chiamato anche 720p. In video rappresenta uno standard ormai di base, utile per contenuti leggeri, streaming, anteprime o produzioni in cui si vuole mantenere un buon equilibrio tra qualità e peso del file."
},
{
  "term": "UHD - Ultra alta definizione",
  "category": "Video",
  "def": "Formato video di 3840×2160 pixel, spesso chiamato 4K televisivo.",
  "longDef": "L’UHD, cioè Ultra High Definition, è un formato video pari a 3840×2160 pixel. Viene spesso chiamato 4K nel linguaggio comune, anche se tecnicamente è diverso dal DCI 4K cinematografico. In video è molto usato per streaming, televisione, contenuti online e produzioni moderne, perché offre quattro volte i pixel del Full HD."
},
{
  "term": "DCI 4K - Standard cinema 4K",
  "category": "Video",
  "def": "Risoluzione cinematografica digitale pari a 4096×2160 pixel.",
  "longDef": "Il DCI 4K è lo standard 4K del cinema digitale, con risoluzione pari a 4096×2160 pixel. A differenza dell’UHD, che è 3840×2160, il DCI 4K ha una larghezza leggermente maggiore ed è legato agli standard di proiezione cinematografica. In video e cinema è importante distinguere i due formati perché cambiano proporzioni, consegne e workflow tecnici."
},
{
  "term": "2K - Risoluzione cinema 2K",
  "category": "Video",
  "def": "Risoluzione cinematografica digitale con circa 2.000 pixel orizzontali.",
  "longDef": "Il 2K indica una famiglia di risoluzioni con circa 2.000 pixel sul lato orizzontale. Nel cinema digitale il formato DCI 2K è spesso pari a 2048×1080 pixel. In video e postproduzione è ancora usato in alcuni workflow professionali, soprattutto quando si lavora con materiali destinati a proiezione, archiviazione o consegne cinematografiche meno pesanti del 4K."
},
{
  "term": "6K - Risoluzione intermedia ad alta definizione",
  "category": "Video",
  "def": "Risoluzione video con circa 6.000 pixel orizzontali.",
  "longDef": "Il 6K indica una risoluzione video con circa 6.000 pixel sul lato orizzontale, anche se le dimensioni esatte possono variare in base alla camera e al formato. Offre più dettaglio del 4K e permette maggiore libertà di ritaglio, stabilizzazione e reframing in postproduzione. In video è utile quando si vuole consegnare in 4K mantenendo margine di lavoro sull’immagine originale."
},
{
  "term": "Pixel",
  "category": "Video",
  "def": "Unità minima dell’immagine digitale.",
  "longDef": "Il pixel è il punto più piccolo che compone un’immagine digitale. Ogni pixel contiene informazioni di luminosità e colore, e l’insieme dei pixel forma il quadro video. In video il numero di pixel determina la risoluzione potenziale dell’immagine, ma la qualità finale dipende anche da sensore, ottica, compressione, luce e trattamento del colore."
},
{
  "term": "Megapixel - Milioni di pixel",
  "category": "Video",
  "def": "Unità che indica il numero totale di pixel di un sensore o immagine.",
  "longDef": "Il megapixel corrisponde a un milione di pixel e viene usato per indicare la quantità totale di punti che compongono un’immagine o che un sensore può registrare. In fotografia è un dato molto citato, ma in video conta soprattutto in rapporto alla risoluzione effettiva di registrazione. Un sensore con molti megapixel non garantisce automaticamente un video migliore se codec, lettura del sensore e compressione non sono adeguati."
},
{
  "term": "Scan progressivo - Progressive scan",
  "category": "Video",
  "def": "Metodo di scansione in cui ogni fotogramma viene registrato per intero.",
  "longDef": "Lo scan progressivo registra o mostra ogni fotogramma come immagine completa, senza dividerlo in campi separati. È indicato spesso con la lettera p, come 1080p o 2160p. In video moderno è lo standard più usato, perché offre un’immagine più pulita e adatta a web, streaming, cinema digitale e montaggio rispetto ai vecchi sistemi interlacciati."
},
{
  "term": "Interlacciato - Interlaced scan",
  "category": "Video",
  "def": "Metodo di scansione che divide l’immagine in campi pari e dispari.",
  "longDef": "Il video interlacciato divide ogni fotogramma in due campi, uno con le linee pari e uno con le linee dispari, mostrati in momenti leggermente diversi. Era molto usato negli standard televisivi tradizionali. In video moderno può creare problemi di pettinatura, artefatti di movimento e compatibilità, perciò spesso viene convertito in progressivo tramite deinterlacciamento."
},
{
  "term": "Overscan - Area oltre il quadro visibile",
  "category": "Video",
  "def": "Porzione dell’immagine che può essere tagliata o non visibile su alcuni schermi.",
  "longDef": "L’overscan è una zona dell’immagine che in alcuni sistemi di visualizzazione può essere tagliata o nascosta ai bordi dello schermo. Nasce dai vecchi standard televisivi, ma il concetto resta utile quando si preparano grafiche, titoli o elementi importanti vicino ai margini. In video è bene considerarlo per evitare che testi o dettagli fondamentali finiscano troppo fuori dall’area sicura."
},
{
  "term": "H.264 - Codec AVC",
  "category": "Video",
  "def": "Codec video molto diffuso per compressione, streaming e pubblicazione online.",
  "longDef": "H.264, noto anche come AVC, è uno dei codec video più diffusi per web, streaming, smartphone, social e distribuzione digitale. Offre un buon rapporto tra qualità e peso del file, mantenendo ampia compatibilità con dispositivi e piattaforme. In video è spesso usato per esportazioni finali, anche se non sempre è il formato migliore per il montaggio pesante."
},
{
  "term": "H.265 - Codec HEVC",
  "category": "Video",
  "def": "Codec video più efficiente di H.264, usato per file di alta qualità e peso ridotto.",
  "longDef": "H.265, chiamato anche HEVC, è un codec più efficiente rispetto a H.264 perché riesce a mantenere buona qualità con file più leggeri. È molto usato per video 4K, HDR, streaming e camere moderne. In video però può essere più pesante da montare, perché richiede maggiore potenza di elaborazione, soprattutto su computer meno recenti."
},
{
  "term": "ProRes - Codec professionale Apple",
  "category": "Video",
  "def": "Codec professionale usato per montaggio, postproduzione e consegne di alta qualità.",
  "longDef": "ProRes è una famiglia di codec professionali sviluppata da Apple e molto usata in montaggio e postproduzione. Produce file più pesanti rispetto ai codec molto compressi, ma più stabili, fluidi e adatti al lavoro professionale. In video è apprezzato perché mantiene alta qualità e facilita il workflow, soprattutto in color correction, editing e consegne intermedie."
},
{
  "term": "DNxHR - Codec professionale Avid",
  "category": "Video",
  "def": "Codec professionale usato per montaggio e postproduzione ad alta risoluzione.",
  "longDef": "DNxHR è una famiglia di codec professionali sviluppata da Avid per lavorare con risoluzioni HD, 2K, 4K e superiori. È pensato per montaggio, postproduzione e scambio tra software mantenendo buona qualità e prestazioni affidabili. In video è un’alternativa professionale a ProRes, molto utile nei workflow multipiattaforma."
},
{
  "term": "RAW video - Video grezzo",
  "category": "Video",
  "def": "Formato che conserva molte informazioni originali del sensore per la postproduzione.",
  "longDef": "Il RAW video registra i dati dell’immagine con un’elaborazione minima, conservando molte informazioni provenienti dal sensore. Offre grande libertà in esposizione, bilanciamento del bianco, colore e recupero delle alte luci o delle ombre. In video è molto potente, ma richiede file pesanti, supporti veloci, hardware adeguato e una postproduzione più consapevole."
},
{
  "term": "CinemaDNG - RAW cinema digitale",
  "category": "Video",
  "def": "Formato RAW video basato su sequenze di file DNG.",
  "longDef": "CinemaDNG è un formato RAW usato in ambito cinema digitale, composto spesso da una sequenza di immagini DNG accompagnate da audio e metadata. Conserva molte informazioni dell’immagine originale e permette ampio controllo in color correction. In video è un formato molto flessibile, ma può generare file estremamente pesanti e workflow più complessi rispetto ai codec compressi."
},
{
  "term": "All-Intra - Compressione intra-frame",
  "category": "Video",
  "def": "Metodo di compressione in cui ogni fotogramma viene codificato in modo autonomo.",
  "longDef": "All-Intra è un tipo di compressione in cui ogni fotogramma viene registrato come unità indipendente, senza dipendere dai fotogrammi vicini. Questo produce file più pesanti, ma più facili da montare e più robusti in postproduzione. In video è utile quando si vuole un workflow più fluido e affidabile, soprattutto per lavori professionali o con molto color grading."
},
{
  "term": "Long GOP - Compressione inter-frame",
  "category": "Video",
  "def": "Metodo di compressione che registra solo alcuni fotogrammi completi e calcola gli altri.",
  "longDef": "Long GOP è un sistema di compressione in cui non tutti i fotogrammi vengono salvati integralmente. Alcuni fotogrammi sono completi, mentre altri descrivono solo le differenze rispetto ai precedenti o successivi. In video permette file più leggeri, ma può essere più faticoso da montare e meno robusto in postproduzione rispetto a codec intra-frame."
},
{
  "term": "Proxy workflow - Flusso di lavoro con proxy",
  "category": "Video",
  "def": "Metodo di lavoro che usa file leggeri per montare materiale pesante.",
  "longDef": "Il proxy workflow consiste nel creare versioni leggere dei file originali per montare in modo più fluido. Alla fine del lavoro, il progetto viene ricollegato ai file originali ad alta qualità per esportazione, color correction o finalizzazione. In video è molto utile quando si lavora con 4K, 6K, 8K, RAW o codec pesanti su computer non abbastanza potenti."
},
{
  "term": "Container video - Contenitore del file",
  "category": "Video",
  "def": "Formato che racchiude video, audio, sottotitoli e metadata in un unico file.",
  "longDef": "Il container video è il contenitore del file, come MP4, MOV, MKV o MXF, che può includere tracce video, audio, sottotitoli, metadata e altre informazioni. Non coincide con il codec: il container è il contenitore, il codec è il sistema di compressione del contenuto. In video distinguere i due concetti evita molti errori di esportazione e compatibilità."
},
{
  "term": "Color space - Spazio colore",
  "category": "Video",
  "def": "Sistema che definisce la gamma di colori rappresentabile da un video.",
  "longDef": "Il color space è lo spazio colore, cioè l’insieme dei colori che un sistema video può rappresentare. Standard diversi, come Rec.709 o Rec.2020, definiscono gamme cromatiche differenti. In video è importante perché una gestione errata dello spazio colore può produrre immagini troppo sature, spente, contrastate o incoerenti tra monitor, software e piattaforme."
},
{
  "term": "Rec.709 - Standard colore HD",
  "category": "Video",
  "def": "Spazio colore standard usato per HD, SDR, televisione e molti contenuti web.",
  "longDef": "Rec.709 è uno standard colore molto usato per contenuti HD e SDR. Definisce gamma cromatica, curva di trasferimento e comportamento dell’immagine in molti workflow televisivi e web. In video è uno standard fondamentale perché rappresenta spesso il punto di arrivo per esportazioni tradizionali, contenuti online e monitoraggio non HDR."
},
{
  "term": "Rec.2020 - Spazio colore ad ampia gamma",
  "category": "Video",
  "def": "Spazio colore molto ampio usato in produzioni UHD e HDR.",
  "longDef": "Rec.2020 è uno spazio colore pensato per contenuti Ultra HD e HDR, con una gamma cromatica molto più ampia rispetto a Rec.709. Permette di rappresentare colori più estesi e intensi, ma richiede monitor, workflow e gestione colore adeguati. In video è importante nelle produzioni avanzate, soprattutto quando si lavora per HDR o standard di distribuzione moderni."
},
{
  "term": "HDR - Alta gamma dinamica",
  "category": "Video",
  "def": "Tecnologia che permette maggiore dettaglio e luminosità tra ombre e alte luci.",
  "longDef": "L’HDR, cioè High Dynamic Range, permette di rappresentare una gamma più ampia di luminosità rispetto allo SDR. Può mostrare alte luci più intense, ombre più ricche e maggiore profondità tonale, se il contenuto è prodotto e visualizzato correttamente. In video richiede attenzione a esposizione, color grading, monitoraggio e standard di consegna."
},
{
  "term": "SDR - Gamma dinamica standard",
  "category": "Video",
  "def": "Standard tradizionale di luminosità e contrasto per video e televisione.",
  "longDef": "Lo SDR, cioè Standard Dynamic Range, è il sistema tradizionale di rappresentazione della luminosità nei contenuti video. È ancora molto diffuso per web, televisione, social, proiezioni standard e monitor non HDR. In video resta importantissimo perché molti contenuti vengono ancora consegnati e visualizzati in SDR, anche quando sono girati con camere ad ampia gamma dinamica."
},
{
  "term": "HLG - Hybrid Log-Gamma",
  "category": "Video",
  "def": "Standard HDR pensato per compatibilità con trasmissioni televisive.",
  "longDef": "HLG, cioè Hybrid Log-Gamma, è uno standard HDR sviluppato per essere più compatibile con i sistemi televisivi e con alcuni display SDR. Permette di gestire una gamma dinamica più ampia senza richiedere sempre metadata complessi. In video è utile soprattutto in ambito broadcast, streaming e produzioni che devono mantenere una certa flessibilità di distribuzione."
},
{
  "term": "PQ - Perceptual Quantizer",
  "category": "Video",
  "def": "Curva HDR usata per rappresentare luminosità elevate in modo controllato.",
  "longDef": "PQ, cioè Perceptual Quantizer, è una curva di trasferimento usata negli standard HDR per rappresentare livelli di luminosità molto estesi. È progettata in base alla percezione visiva umana e viene usata in formati come HDR10 e Dolby Vision. In video è importante nei workflow HDR professionali, perché richiede monitoraggio accurato e gestione precisa della luminanza."
},
{
  "term": "10-bit - Profondità colore a 10 bit",
  "category": "Video",
  "def": "Profondità colore che permette 1024 livelli per canale.",
  "longDef": "Il 10-bit indica una profondità colore capace di registrare 1024 livelli per ciascun canale colore. Rispetto all’8-bit offre transizioni più morbide, meno banding e maggiore margine in color correction. In video è molto utile quando si lavora con Log, HDR, green screen o grading più spinto."
},
{
  "term": "8-bit - Profondità colore a 8 bit",
  "category": "Video",
  "def": "Profondità colore che permette 256 livelli per canale.",
  "longDef": "L’8-bit indica una profondità colore con 256 livelli per ciascun canale. È molto diffuso in camere, file compressi e contenuti online, ma offre meno margine di correzione rispetto al 10-bit. In video può andare bene per lavori semplici o immagini già ben esposte, ma può mostrare limiti in Log, cieli sfumati, incarnati delicati e color grading intenso."
},
{
  "term": "4:2:2 - Campionamento colore professionale",
  "category": "Video",
  "def": "Schema di campionamento che conserva più informazioni colore rispetto al 4:2:0.",
  "longDef": "Il 4:2:2 è uno schema di campionamento colore che mantiene una buona quantità di informazioni cromatiche, pur riducendole rispetto alla luminanza. È molto usato in ambito professionale perché offre più margine per color grading, chroma key e postproduzione rispetto al 4:2:0. In video è un parametro importante per valutare la qualità reale di registrazione, non solo la risoluzione."
},
{
  "term": "4:2:0 - Campionamento colore compresso",
  "category": "Video",
  "def": "Schema di campionamento colore molto diffuso nei file compressi.",
  "longDef": "Il 4:2:0 è uno schema di campionamento colore che riduce in modo significativo le informazioni cromatiche rispetto alla luminanza. È molto comune in camere consumer, smartphone, streaming e file H.264 o H.265. In video permette file più leggeri, ma può creare limiti nel chroma key, nel grading intenso e nelle correzioni colore più spinte."
},
{
  "term": "Waveform monitor - Monitor forma d’onda",
  "category": "Video",
  "def": "Strumento che mostra graficamente i livelli di luminanza dell’immagine.",
  "longDef": "Il waveform monitor è uno strumento di controllo che rappresenta graficamente i livelli di luminanza dell’immagine. Aiuta a valutare esposizione, contrasto, alte luci, ombre e distribuzione della luce con più precisione rispetto al solo occhio. In video è molto utile sul set e in color correction, perché permette decisioni tecniche più affidabili."
},
{
  "term": "Vectorscope - Vettorscopio",
  "category": "Video",
  "def": "Strumento che mostra distribuzione e intensità dei colori nell’immagine.",
  "longDef": "Il vectorscope è uno strumento di analisi che visualizza tinta e saturazione dei colori presenti nell’immagine. È utile per controllare incarnati, dominanti cromatiche, coerenza tra clip e rispetto degli standard video. In video e color correction è fondamentale perché permette di valutare il colore in modo tecnico, non solo percettivo."
},
{
  "term": "Luminanza - Informazione di luminosità",
  "category": "Video",
  "def": "Componente dell’immagine che descrive la quantità di luce percepita.",
  "longDef": "La luminanza è l’informazione relativa alla luminosità dell’immagine, cioè quanto una zona appare chiara o scura. È separabile dalla crominanza, che riguarda invece il colore. In video è un concetto fondamentale perché esposizione, contrasto, dettaglio e leggibilità dell’immagine dipendono in gran parte dalla gestione della luminanza."
},
{
  "term": "Crominanza - Informazione di colore",
  "category": "Video",
  "def": "Componente dell’immagine che descrive tinta e saturazione del colore.",
  "longDef": "La crominanza è l’informazione relativa al colore dell’immagine, distinta dalla luminanza. Comprende dati su tinta e saturazione, ed è spesso compressa più della luminosità perché l’occhio umano è più sensibile ai dettagli luminosi che a quelli cromatici. In video è importante per capire chroma subsampling, correzione colore e qualità dei file."
},
{
  "term": "Crop factor - Fattore di ritaglio",
  "category": "Video",
  "def": "Rapporto che modifica l’angolo di campo apparente in base alla dimensione del sensore.",
  "longDef": "Il crop factor è il rapporto tra la dimensione di un sensore e un formato di riferimento, spesso il full frame. Influisce sull’angolo di campo apparente degli obiettivi: la stessa focale risulta più stretta su sensori più piccoli. In video è importante perché condiziona scelta delle ottiche, composizione, profondità di campo e percezione dello spazio."
},
{
  "term": "Full frame - Sensore pieno formato",
  "category": "Video",
  "def": "Formato sensore equivalente circa al fotogramma fotografico 35 mm.",
  "longDef": "Il full frame è un formato sensore di circa 36×24 mm, equivalente al fotogramma fotografico 35 mm. Offre ampio angolo di campo, buona gestione della profondità di campo e spesso buone prestazioni in scarsa luce. In video è molto usato per ottenere immagini con forte separazione del soggetto e resa visiva vicina a molte produzioni moderne."
},
{
  "term": "Super 35 - Formato sensore cinematografico",
  "category": "Video",
  "def": "Formato sensore molto usato nel cinema digitale, vicino alla tradizione del 35 mm cinematografico.",
  "longDef": "Il Super 35 è un formato sensore ispirato all’area utile della pellicola cinematografica 35 mm. È stato a lungo uno standard di riferimento nel cinema digitale e offre un equilibrio molto apprezzato tra profondità di campo, scelta delle ottiche e resa prospettica. In video e cinema è importante perché molte camere e lenti professionali sono pensate proprio intorno a questo formato."
},
{
  "term": "Micro Quattro Terzi - Micro Four Thirds",
  "category": "Video",
  "def": "Formato sensore compatto usato in molte camere mirrorless e videocamere.",
  "longDef": "Il Micro Quattro Terzi è un formato sensore più piccolo del full frame e del Super 35, molto usato in camere compatte e mirrorless. Permette corpi macchina leggeri, ottiche più piccole e buona praticità operativa. In video è apprezzato per documentari, viaggi, produzioni leggere e situazioni in cui portabilità e flessibilità contano molto."
},
{
  "term": "Global shutter - Otturatore globale",
  "category": "Video",
  "def": "Sistema di lettura del sensore che acquisisce tutta l’immagine nello stesso istante.",
  "longDef": "Il global shutter è un sistema in cui il sensore acquisisce l’intero fotogramma nello stesso momento. A differenza del rolling shutter, evita deformazioni su movimenti rapidi, panoramiche brusche o soggetti veloci. In video è molto utile in sport, azione, effetti visivi e riprese tecniche, anche se può comportare compromessi su gamma dinamica o sensibilità a seconda della camera."
},
{
  "term": "Dual native ISO - Doppio ISO nativo",
  "category": "Video",
  "def": "Sistema con due valori ISO ottimizzati per ottenere migliore qualità in diverse condizioni di luce.",
  "longDef": "Il dual native ISO è una tecnologia in cui la camera possiede due livelli ISO nativi, ottimizzati per lavorare con rumore ridotto in condizioni luminose diverse. Permette di passare a un secondo valore di sensibilità mantenendo migliore qualità rispetto a un semplice aumento digitale. In video è utile soprattutto in riprese con poca luce o scene ad alto contrasto."
},
{
  "term": "Native ISO - ISO nativo",
  "category": "Video",
  "def": "Valore ISO in cui il sensore offre la migliore qualità di base.",
  "longDef": "Il native ISO è il valore di sensibilità al quale il sensore della camera lavora nel modo più efficiente, con migliore equilibrio tra rumore, gamma dinamica e qualità dell’immagine. Usare valori molto lontani dall’ISO nativo può aumentare rumore o ridurre margine nelle alte luci. In video è un parametro importante per esporre correttamente, soprattutto con profili Log."
},
{
  "term": "Lens mount - Innesto obiettivo",
  "category": "Video",
  "def": "Sistema fisico ed elettronico con cui l’obiettivo si collega alla camera.",
  "longDef": "Il lens mount è l’innesto che permette di collegare un obiettivo al corpo camera. Determina compatibilità meccanica, distanza di tiraggio, comunicazione elettronica e possibilità di usare adattatori. In video è importante perché la scelta del mount condiziona quali ottiche si possono usare, con quali funzioni e con quali eventuali limiti."
},
{
  "term": "Prime lens - Obiettivo a focale fissa",
  "category": "Video",
  "def": "Obiettivo con una sola lunghezza focale, senza zoom.",
  "longDef": "La prime lens è un obiettivo a focale fissa, cioè con una sola lunghezza focale. In genere offre buona qualità ottica, maggiore luminosità e una resa più controllata rispetto a molti zoom. In video viene spesso scelta per costruire uno stile visivo preciso, lavorare meglio in poca luce o ottenere maggiore separazione tra soggetto e sfondo."
},
{
  "term": "Zoom lens - Obiettivo zoom",
  "category": "Video",
  "def": "Obiettivo che permette di variare la lunghezza focale senza cambiarlo.",
  "longDef": "La zoom lens è un obiettivo che consente di passare tra diverse lunghezze focali senza sostituire l’ottica. È molto pratica in documentari, eventi, riprese rapide e situazioni in cui il tempo per cambiare obiettivo è limitato. In video offre flessibilità, ma può essere meno luminosa o meno caratterizzata rispetto a ottiche fisse di alta qualità."
},
{
  "term": "Ottica anamorfica - Anamorphic lens",
  "category": "Video",
  "def": "Obiettivo che comprime orizzontalmente l’immagine per ottenere formato panoramico e resa particolare.",
  "longDef": "L’ottica anamorfica comprime l’immagine in ripresa e la espande poi in proiezione o postproduzione, producendo un formato panoramico caratteristico. È associata a flare orizzontali, bokeh ovali e una resa spaziale particolare. In video e cinema viene usata non solo per il formato largo, ma anche per ottenere un look riconoscibile e fortemente cinematografico."
},
{
  "term": "Ottica sferica - Spherical lens",
  "category": "Video",
  "def": "Obiettivo tradizionale che registra l’immagine senza compressione anamorfica.",
  "longDef": "L’ottica sferica è un obiettivo che proietta l’immagine sul sensore senza compressione orizzontale anamorfica. È il tipo di lente più comune e offre una resa più neutra, prevedibile e semplice da gestire in postproduzione. In video è importante distinguerla dalle ottiche anamorfiche perché cambia la resa del formato, del bokeh, dei flare e della prospettiva percepita."
},
{
  "term": "Focus breathing - Respiro della messa a fuoco",
  "category": "Video",
  "def": "Variazione dell’angolo di campo quando si cambia la messa a fuoco.",
  "longDef": "Il focus breathing è la variazione apparente dell’inquadratura quando si sposta la messa a fuoco da un punto a un altro. Alcuni obiettivi sembrano ingrandire o restringere leggermente l’immagine durante il cambio fuoco. In video può essere fastidioso nei rack focus visibili, per questo molte ottiche cinema sono progettate per ridurlo."
},
{
  "term": "Focus throw - Corsa della messa a fuoco",
  "category": "Video",
  "def": "Ampiezza della rotazione necessaria per passare dalla minima distanza di fuoco all’infinito.",
  "longDef": "Il focus throw è la corsa della ghiera di messa a fuoco, cioè quanto deve ruotare per passare dalla distanza minima all’infinito. Una corsa lunga permette regolazioni più precise, mentre una breve può essere più rapida ma meno controllabile. In video è importante perché la messa a fuoco manuale richiede precisione, soprattutto con profondità di campo ridotta."
},
{
  "term": "Back focus - Fuoco posteriore",
  "category": "Video",
  "def": "Distanza corretta tra lente e sensore necessaria per mantenere il fuoco preciso.",
  "longDef": "Il back focus riguarda la corretta distanza ottica tra obiettivo e sensore o piano focale. Se non è regolato correttamente, un obiettivo può non mantenere il fuoco, soprattutto durante lo zoom o su determinate distanze. In video professionale è un controllo importante, in particolare con ottiche zoom, adattatori e camere a ottiche intercambiabili."
},
{
  "term": "IBIS - Stabilizzazione interna del sensore",
  "category": "Video",
  "def": "Sistema che stabilizza l’immagine muovendo fisicamente il sensore della camera.",
  "longDef": "L’IBIS, cioè In-Body Image Stabilization, è un sistema di stabilizzazione integrato nel corpo camera che muove il sensore per compensare vibrazioni e piccoli movimenti. È molto utile nelle riprese a mano libera e con ottiche prive di stabilizzazione. In video può aiutare molto, ma in movimenti complessi può produrre artefatti o effetti innaturali se usato senza attenzione."
},
{
  "term": "OIS - Stabilizzazione ottica",
  "category": "Video",
  "def": "Sistema di stabilizzazione integrato nell’obiettivo.",
  "longDef": "L’OIS, cioè Optical Image Stabilization, è un sistema di stabilizzazione presente nell’obiettivo, dove elementi ottici mobili compensano vibrazioni e piccoli movimenti. È utile per riprese a mano, focali lunghe e situazioni leggere senza supporti esterni. In video può migliorare molto la stabilità, ma va valutato insieme al tipo di movimento e agli altri sistemi di stabilizzazione usati."
},
{
  "term": "EIS - Stabilizzazione elettronica",
  "category": "Video",
  "def": "Sistema digitale che stabilizza l’immagine tramite elaborazione e ritaglio.",
  "longDef": "L’EIS, cioè Electronic Image Stabilization, stabilizza l’immagine tramite elaborazione digitale, spesso usando un ritaglio dell’inquadratura per compensare i movimenti. È comune in smartphone, action cam e alcune videocamere. In video è pratico, ma può ridurre l’angolo di campo, introdurre artefatti o rendere il movimento meno naturale in certe condizioni."
},
{
  "term": "Follow focus - Comando di messa a fuoco",
  "category": "Video",
  "def": "Accessorio che permette di controllare la messa a fuoco con precisione.",
  "longDef": "Il follow focus è un sistema meccanico o elettronico che permette di regolare la messa a fuoco in modo più preciso rispetto alla ghiera dell’obiettivo. Può essere usato dall’operatore o da un assistente alla camera. In video e cinema è fondamentale quando il soggetto si muove, la profondità di campo è ridotta o serve ripetere cambi fuoco con precisione."
},
{
  "term": "Matte box - Paraluce professionale",
  "category": "Video",
  "def": "Accessorio frontale che controlla riflessi e permette l’uso di filtri.",
  "longDef": "Il matte box è un accessorio montato davanti all’obiettivo per controllare flare, riflessi e luce indesiderata. Permette anche di inserire filtri professionali, come ND, polarizzatori o diffusioni. In video e cinema è utile perché migliora il controllo dell’immagine e rende il sistema camera più adatto a riprese professionali."
},
{
  "term": "Rig camera - Struttura di supporto camera",
  "category": "Video",
  "def": "Configurazione di accessori montati intorno alla camera per migliorarne uso e controllo.",
  "longDef": "Il rig camera è l’insieme di supporti, maniglie, cage, monitor, batterie, follow focus, matte box, microfoni e altri accessori montati intorno alla camera. Serve a renderla più stabile, ergonomica e adatta alle esigenze della ripresa. In video è molto utile perché una camera piccola può diventare un sistema completo e professionale se configurata correttamente."
},
{
  "term": "Cage - Gabbia camera",
  "category": "Video",
  "def": "Struttura metallica che protegge la camera e offre punti di montaggio per accessori.",
  "longDef": "Il cage è una gabbia metallica montata intorno al corpo camera per proteggerlo e aggiungere punti di fissaggio. Permette di collegare maniglie, monitor, microfoni, luci, batterie, supporti e altri accessori. In video è molto usato con mirrorless e camere compatte, perché rende il sistema più robusto e versatile sul set."
},
{
  "term": "Top handle - Maniglia superiore",
  "category": "Video",
  "def": "Maniglia montata sopra la camera per trasporto e riprese dal basso.",
  "longDef": "La top handle è una maniglia montata sopra la camera o sul cage. Serve per trasportare il rig, realizzare riprese basse, migliorare la presa e aggiungere accessori tramite punti di fissaggio. In video è un accessorio semplice ma molto utile, soprattutto quando si lavora con camere leggere configurate per riprese dinamiche."
},
{
  "term": "Shoulder rig - Supporto a spalla",
  "category": "Video",
  "def": "Sistema che permette di sostenere la camera sulla spalla per riprese più stabili.",
  "longDef": "Lo shoulder rig è un supporto che permette di appoggiare la camera sulla spalla, distribuendo meglio il peso e migliorando la stabilità. È utile per riprese a mano lunghe, documentari, scene in movimento e lavori in cui serve mobilità senza usare treppiede o gimbal. In video offre una resa più fisica e controllata rispetto alla camera tenuta solo con le mani."
},
{
  "term": "Video assist - Monitoraggio video esterno",
  "category": "Video",
  "def": "Sistema che permette a regia e troupe di vedere l’immagine ripresa dalla camera.",
  "longDef": "Il video assist è il sistema di monitoraggio che consente a regista, operatore, assistenti o altri reparti di vedere l’immagine ripresa dalla camera su uno schermo esterno. Può includere registrazione, playback, trasmissione wireless e strumenti di controllo. In video e cinema è molto utile perché permette di valutare inquadratura, performance, fuoco, esposizione e continuità senza stare direttamente dietro la camera."
}


]
    .map(item => ({
      ...item,
      term: String(item.term || "").trim(),
      category: String(item.category || "").trim(),
      def: String(item.def || "").trim(),
      longDef: String(item.longDef || item.def || "").trim(),
    }))
    .sort((a, b) => a.term.localeCompare(b.term, "it", { sensitivity: "base" }));

  const CATEGORY_ORDER = ["Audio", "Distribuzione", "Fotografia", "Montaggio", "Produzione", "Recitazione", "Regia", "Sceneggiatura", "Video"];

const CATEGORY_COLORS = {
  Audio: "#38bdf8",
  Distribuzione: "#f97316",
  Fotografia: "#facc15",
  Montaggio: "#a78bfa",
  Produzione: "#22c55e",
  Recitazione: "#fb7185",
  Regia: "#ef4444",
  Sceneggiatura: "#e5e7eb",
  Video: "#14b8a6",
};

function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || "#b31217";
}

function hexToRgba(hex, alpha = 1) {
  const value = String(hex || "").replace("#", "");
  if (value.length !== 6) return `rgba(179,18,23,${alpha})`;

  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);

  return `rgba(${r},${g},${b},${alpha})`;
}

function applyCategoryColor(el, category) {
  const color = getCategoryColor(category);
  el.style.setProperty("--cat-color", color);
  el.style.setProperty("--cat-bg", hexToRgba(color, 0.14));
  el.style.setProperty("--cat-border", hexToRgba(color, 0.42));
  el.style.setProperty("--cat-shadow", hexToRgba(color, 0.16));
}

  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const state = {
    query: "",
    letter: "",
    category: "all",
  };

  injectStyles();
  setupLayout();
  setupDialog();
  renderCategories();
  renderAlphabet();
  renderResults();

  searchEl.addEventListener("input", () => {
    state.query = searchEl.value.trim();
    renderResults();
  });

  function setupLayout() {
    const alphabetCard = alphaEl.closest(".card");
    const resultsCard = resultsEl.closest(".card");
    if (!alphabetCard || !resultsCard) return;

    const categoriesCard = document.createElement("div");
    categoriesCard.className = "card";
    categoriesCard.innerHTML = `
      <div class="dictToolsHead">
        <div>
          <h3 class="dictSectionTitle">Categorie</h3>
          
        </div>
        <button id="dictClearFilters" class="chip chip--button dictClearBtn" type="button">Azzera filtri</button>
      </div>
      <div id="dictCategories" class="alphabet" aria-label="Categorie del dizionario"></div>
      <div id="dictMeta" class="dictMeta" aria-live="polite"></div>
    `;

    panelEl.insertBefore(categoriesCard, alphabetCard);

    alphabetCard.insertAdjacentHTML(
      "afterbegin",
      `<div class="dictSectionHead"><div><h3 class="dictSectionTitle">Indice alfabetico</h3></div></div>`
    );

    resultsCard.insertAdjacentHTML(
      "afterbegin",
      `<div class="dictSectionHead"><div><h3 class="dictSectionTitle">Voci del dizionario</h3></div><div id="dictResultsSummary" class="dictResultsSummary" aria-live="polite"></div></div>`
    );

    document.getElementById("dictClearFilters")?.addEventListener("click", clearFilters);
  }

  function setupDialog() {
    if (document.getElementById("dictDialog")) return;

    const dialog = document.createElement("dialog");
    dialog.id = "dictDialog";
    dialog.className = "dialog dictDialog";
    dialog.innerHTML = `
      <form method="dialog" class="dialog__form dictDialog__form">
        <div class="dictDialog__header">
          <div class="dictDialog__headerText">
            <div id="dictDialogCategory" class="dictDialog__category"></div>
            <h3 id="dictDialogTitle" class="dictDialog__title"></h3>
          </div>
          <button class="chip chip--button" id="dictDialogCloseTop" type="button">Chiudi</button>
        </div>
        <div class="dictDialog__body">
          <div class="dictDialog__shortWrap">
            <div class="dictDialog__label">Definizione breve</div>
            <div id="dictDialogShort" class="dictDialog__short"></div>
          </div>
          <div class="dictDialog__longWrap">
            <div class="dictDialog__label">Definizione lunga</div>
            <div id="dictDialogLong" class="dictDialog__long"></div>
          </div>
        </div>
      </form>
    `;
    document.body.appendChild(dialog);

    const closeDialog = () => {
      if (dialog.open) dialog.close();
    };

    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!isInDialog) {
        closeDialog();
      }
    });

    dialog.querySelector("#dictDialogCloseTop")?.addEventListener("click", closeDialog);
  }

  function injectStyles() {
    if (document.getElementById("sdacDictionaryEnhancements")) return;
    const style = document.createElement("style");
    style.id = "sdacDictionaryEnhancements";
    style.textContent = `
      .dictToolsHead{
        display:flex;
        justify-content:space-between;
        align-items:flex-start;
        gap:12px;
        flex-wrap:wrap;
        margin-bottom:12px;
      }
      .dictSectionHead{
        display:flex;
        justify-content:space-between;
        align-items:flex-start;
        gap:12px;
        flex-wrap:wrap;
        margin-bottom:12px;
      }
      .dictSectionTitle{
        margin:0 0 6px;
        font-size:16px;
      }
      .dictSectionText{
        margin:0;
        color: var(--muted);
        line-height:1.45;
        font-size:14px;
      }
      .dictMeta{
        margin-top:12px;
        color: var(--muted);
        line-height:1.45;
        font-size:14px;
      }
      .dictResultsSummary{
        color: var(--muted);
        line-height:1.45;
        font-size:14px;
        text-align:right;
      }
      .dictClearBtn{
        white-space:nowrap;
      }
      .alphaBtn.is-active{
        border-color: rgba(179,18,23,.65);
        background: rgba(179,18,23,.16);
        box-shadow: 0 0 0 3px rgba(179,18,23,.10);
      }
      .alphaBtn.is-disabled{
        opacity:.45;
        cursor:not-allowed;
      }
      .dictItem{
        width:100%;
        border:1px solid var(--stroke);
        background: rgba(11,11,13,.48);
        border-radius: var(--r);
        padding: 12px;
        color: var(--text);
        text-align:left;
      }
      button.dictItem{
        appearance:none;
        cursor:pointer;
        transition: transform .08s ease, border-color .15s ease, background .15s ease, box-shadow .15s ease;
      }
      button.dictItem:hover{
        transform: translateY(-1px);
        border-color: rgba(179,18,23,.35);
        box-shadow: 0 0 0 2px rgba(179,18,23,.10) inset;
      }
      button.dictItem:focus-visible{
        outline:none;
        border-color: rgba(179,18,23,.60);
        box-shadow: 0 0 0 3px rgba(179,18,23,.16);
      }
      .dictItem__meta{
        display:flex;
        align-items:center;
        gap:8px;
        flex-wrap:wrap;
        margin-bottom:8px;
      }
.dictCategoryBtn{
  position:relative;
  border-color: var(--cat-border);
  background: var(--cat-bg);
  color: var(--text);
  font-weight:800;
  padding-left:28px;
}

.dictCategoryBtn::before{
  content:"";
  position:absolute;
  left:11px;
  top:50%;
  width:9px;
  height:9px;
  border-radius:999px;
  background: var(--cat-color);
  transform:translateY(-50%);
  box-shadow:0 0 0 3px var(--cat-shadow);
}

.dictCategoryBtn.is-active{
  border-color: var(--cat-color);
  background: var(--cat-bg);
  box-shadow:0 0 0 3px var(--cat-shadow);
}

.dictCategoryBtn--all{
  padding-left:14px;
}

.dictCategoryBtn--all::before{
  display:none;
}

.dictTag{
  display:inline-flex;
  align-items:center;
  border:1px solid var(--cat-border, rgba(179,18,23,.28));
  background: var(--cat-bg, rgba(179,18,23,.10));
  color: var(--cat-color, var(--text));
  border-radius:999px;
  padding:4px 8px;
  font-size:12px;
  font-weight:800;
}
      .dictLetterTag{
        display:inline-flex;
        align-items:center;
        border:1px solid var(--stroke);
        background: rgba(11,11,13,.32);
        color: var(--muted);
        border-radius:999px;
        padding:4px 8px;
        font-size:12px;
        font-weight:700;
      }
      .dictItem__term{
        font-weight:800;
        margin-bottom:6px;
      }
      .dictItem__def{
        color: var(--muted);
        line-height:1.5;
      }
      .dictDialog{
        width:min(760px, 94vw);
      }
      .dictDialog::backdrop{
        background: rgba(0,0,0,.65);
      }
      .dictDialog__form{
        padding:18px;
      }
      .dictDialog__header{
        display:flex;
        justify-content:space-between;
        align-items:flex-start;
        gap:12px;
      }
      .dictDialog__headerText{
        min-width:0;
      }
      .dictDialog__category{
  display:inline-flex;
  align-items:center;
  border:1px solid var(--cat-border, rgba(179,18,23,.28));
  background: var(--cat-bg, rgba(179,18,23,.10));
  color: var(--cat-color, var(--text));
  border-radius:999px;
  padding:4px 8px;
  font-size:12px;
  font-weight:800;
  margin-bottom:10px;
}
      .dictDialog__title{
        margin:0;
        font-size:24px;
        line-height:1.15;
      }
      .dictDialog__body{
        margin-top:16px;
        display:flex;
        flex-direction:column;
        gap:14px;
      }
      .dictDialog__label{
        font-size:12px;
        font-weight:800;
        letter-spacing:.08em;
        text-transform:uppercase;
        color: var(--muted);
        margin-bottom:8px;
      }
      .dictDialog__shortWrap,
      .dictDialog__longWrap{
        border:1px solid var(--stroke);
        background: rgba(11,11,13,.40);
        border-radius:16px;
        padding:14px;
      }
      .dictDialog__short,
      .dictDialog__long{
        line-height:1.65;
        color: var(--text);
      }
      .dictDialog__short{
        color: var(--muted);
      }
      .dictDialog__actions{
        margin-top:16px;
      }

.dictItem__line{
  display:grid;
  grid-template-columns:minmax(0, 1fr) auto;
  align-items:center;
  gap:12px;
}
.dictItem__line .dictItem__term{
  margin-bottom:0;
  line-height:1.25;
  min-width:0;
}
.dictItem__line .dictTag{
  justify-self:end;
  white-space:nowrap;
}

.dictCategoryDot{
  justify-self:end;
  width:13px;
  height:13px;
  border-radius:999px;
  background: var(--cat-color);
  border:1px solid var(--cat-border);
  box-shadow:0 0 0 4px var(--cat-shadow);
  flex:none;
}

button.dictItem:hover .dictCategoryDot{
  transform:scale(1.08);
}

      @media (max-width: 720px){
        .dictResultsSummary{ text-align:left; }
        .dictClearBtn{ width:100%; justify-content:center; }
        .dictDialog__header{ flex-direction:column; align-items:stretch; }
        .dictDialog__title{ font-size:22px; }
        .dictDialog__form{ padding:14px; }
      }
    `;
    document.head.appendChild(style);
  }

  function renderCategories() {
    const categoriesEl = document.getElementById("dictCategories");
    if (!categoriesEl) return;
    categoriesEl.innerHTML = "";

    const allButton = makeFilterButton(
  "Tutte",
  state.category === "all",
  () => {
    state.category = "all";
    renderCategories();
    renderAlphabet();
    renderResults();
  }
);
allButton.classList.add("dictCategoryBtn", "dictCategoryBtn--all");
categoriesEl.appendChild(allButton);

CATEGORY_ORDER.forEach(category => {
  const button = makeFilterButton(
    category,
    state.category === category,
    () => {
      state.category = state.category === category ? "all" : category;
      renderCategories();
      renderAlphabet();
      renderResults();
    }
  );

  button.classList.add("dictCategoryBtn");
  button.dataset.category = category;
  applyCategoryColor(button, category);

  categoriesEl.appendChild(button);
});
  }

  function renderAlphabet() {
    alphaEl.innerHTML = "";

    alphaEl.appendChild(
      makeFilterButton(
        "Tutte",
        !state.letter,
        () => {
          state.letter = "";
          renderAlphabet();
          renderResults();
        }
      )
    );

    ALPHABET.forEach(letter => {
      const count = getLetterCount(letter, state.category);
      const button = makeFilterButton(
  letter,
  state.letter === letter,
  () => {
          if (count === 0) return;
          state.letter = state.letter === letter ? "" : letter;
          renderAlphabet();
          renderResults();
        }
      );

      if (count === 0) {
        button.classList.add("is-disabled");
        button.setAttribute("aria-disabled", "true");
        button.disabled = true;
      }

      alphaEl.appendChild(button);
    });
  }

  function getFilteredTerms() {
  return TERMS.filter(item => {
    const matchesQuery = !state.query || normalizeText(`${item.term} ${item.def} ${item.longDef} ${item.category}`).includes(normalizeText(state.query));
    const matchesLetter = !state.letter || getInitial(item.term) === state.letter;
    const matchesCategory = state.category === "all" || item.category === state.category;
    return matchesQuery && matchesLetter && matchesCategory;
  }).sort((a, b) => a.term.localeCompare(b.term, "it", { sensitivity: "base" }));
}

  function renderResults() {
    const filtered = getFilteredTerms();
    resultsEl.innerHTML = "";

    updateMeta(filtered);

    if (!filtered.length) {
      resultsEl.innerHTML = `
        <div class="dictItem">
          <div class="dictItem__term">Nessun risultato</div>
          <div class="dictItem__def">Prova a cambiare ricerca, lettera o categoria.${state.query || state.letter || state.category !== "all" ? ` Filtri attivi: ${escapeHtml(getActiveFiltersText())}.` : ""}</div>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const button = document.createElement("button");
      button.className = "dictItem";
      button.type = "button";
      button.setAttribute("aria-label", `Apri scheda di ${item.term}`);
      const categoryColor = getCategoryColor(item.category);

button.innerHTML = `
  <div class="dictItem__line">
    <span class="dictItem__term">${escapeHtml(item.term)}</span>
    <span
      class="dictCategoryDot"
      title="Categoria: ${escapeHtml(item.category)}"
      aria-label="Categoria: ${escapeHtml(item.category)}"
      role="img"
      style="--cat-color:${categoryColor}; --cat-bg:${hexToRgba(categoryColor, 0.18)}; --cat-border:${hexToRgba(categoryColor, 0.55)}; --cat-shadow:${hexToRgba(categoryColor, 0.18)};"
    ></span>
  </div>
`;
      button.addEventListener("click", () => openTermDialog(item));
      resultsEl.appendChild(button);
    });
  }

  function openTermDialog(item) {
    const dialog = document.getElementById("dictDialog");
    if (!dialog) return;

    const categoryEl = document.getElementById("dictDialogCategory");
    const titleEl = document.getElementById("dictDialogTitle");
    const shortEl = document.getElementById("dictDialogShort");
    const longEl = document.getElementById("dictDialogLong");

    if (categoryEl) {
  categoryEl.textContent = item.category;
  applyCategoryColor(categoryEl, item.category);
}
    if (titleEl) titleEl.textContent = item.term;
    if (shortEl) shortEl.textContent = item.def;
    if (longEl) longEl.textContent = item.longDef || item.def;

    if (!dialog.open) {
      dialog.showModal();
    }
  }

  function updateMeta(filtered) {
    const metaEl = document.getElementById("dictMeta");
    const summaryEl = document.getElementById("dictResultsSummary");

    if (metaEl) metaEl.textContent = "";
    if (summaryEl) summaryEl.textContent = "";
  }

  function clearFilters() {
    state.query = "";
    state.letter = "";
    state.category = "all";
    searchEl.value = "";
    renderCategories();
    renderAlphabet();
    renderResults();
  }

  function getLetterCount(letter, category) {
    return TERMS.filter(item => {
      const matchesCategory = category === "all" || item.category === category;
      return matchesCategory && normalizeText(item.term).startsWith(normalizeText(letter));
    }).length;
  }

  function makeFilterButton(label, active, onClick) {
    const button = document.createElement("button");
    button.className = `alphaBtn${active ? " is-active" : ""}`;
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
  }

  function getActiveFiltersText() {
    const parts = [];
    if (state.category !== "all") parts.push(`categoria ${state.category}`);
    if (state.letter) parts.push(`lettera ${state.letter}`);
    if (state.query) parts.push(`ricerca “${state.query}”`);
    return parts.join(", ");
  }

  function getInitial(term) {
    return normalizeText(term).charAt(0).toUpperCase() || "-";
  }

  function normalizeText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
