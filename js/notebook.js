(() => {
  const getMembershipApi = () => window.SDACMembership || null;

  function isPremiumUser() {
    return !!getMembershipApi()?.isPremium?.();
  }

  function requestPremium(featureLabel) {
    const api = getMembershipApi();
    if (api?.requirePremium) {
      api.requirePremium(featureLabel);
      return false;
    }
    alert(`${featureLabel} è disponibile con l'Abbonamento.`);
    return false;
  }

  const listEl = document.getElementById("nbList");
  const addBtn = document.getElementById("nbAdd");
  const shareBtn = document.getElementById("nbShare");
  const receivedBtn = document.getElementById("nbReceived");
  const summaryEl = document.getElementById("nbSummary");
  const qEl = document.getElementById("nbQuery");
  const importFileEl = document.getElementById("nbImportFile");

  const dialog = document.getElementById("nbDialog");
  const form = document.getElementById("nbForm");
  const cancelBtn = document.getElementById("nbCancel");

  const idEl = document.getElementById("nbId");
  const titleEl = document.getElementById("nbTitle");
  const statusEl = document.getElementById("nbStatus");
  const directorEl = document.getElementById("nbDirector");
  const yearEl = document.getElementById("nbYear");
  const ratingEl = document.getElementById("nbRating");
  const notesEl = document.getElementById("nbNotes");
  const dialogTitleEl = document.getElementById("nbDialogTitle");

  const shareDialog = document.getElementById("nbShareDialog");
  const shareTitleEl = document.getElementById("nbShareTitle");
  const shareOwnerEl = document.getElementById("nbShareOwner");
  const shareSummaryEl = document.getElementById("nbShareSummary");
  const shareCloseBtn = document.getElementById("nbShareClose");
  const copyTextBtn = document.getElementById("nbCopyText");
  const downloadJsonBtn = document.getElementById("nbDownloadJson");
  const nativeShareBtn = document.getElementById("nbNativeShare");
  const shareNoticeEl = document.getElementById("nbShareNotice");

  const receivedDialog = document.getElementById("nbReceivedDialog");
  const receivedCloseBtn = document.getElementById("nbReceivedClose");
  const receivedSummaryEl = document.getElementById("nbReceivedSummary");
  const receivedListEl = document.getElementById("nbReceivedList");
  const importListBtn = document.getElementById("nbImportList");

  const previewDialog = document.getElementById("nbListPreviewDialog");
  const previewTitleEl = document.getElementById("nbListPreviewTitle");
  const previewMetaEl = document.getElementById("nbListPreviewMeta");
  const previewItemsEl = document.getElementById("nbListPreviewItems");
  const previewAddBtn = document.getElementById("nbPreviewAdd");
  const previewCloseBtn = document.getElementById("nbListPreviewClose");

  if (!listEl || !addBtn || !dialog || !form || !shareBtn || !receivedBtn) return;

  const STORAGE_KEY = "sdac_notebook_films_v1";
  const RECEIVED_STORAGE_KEY = "sdac_notebook_received_lists_v1";
  const LIST_FILE_TYPE = "sdac-notebook-list";
  const LIST_FILE_VERSION = 1;
  const OFFICIAL_LIST_ID = "sdac_official";
  const DEFAULT_SHARE_TITLE = "Taccuino film – Lista personale";
  const DEFAULT_SHARE_OWNER = "Utente SDAC";
  let currentPreviewListId = "";
  const openPersonalIds = new Set();
  let activeSummaryFilter = "all";

  const SDAC_FILM_RAW = `1. Voyage dans la lune (1902, George Méliès)
2. La grande rapina al treno (1903, Edwin S. Porter)
3. Il gabinetto del Dr. Caligari (1920, Robert Wiene)
4. Nosferatu (1922, Friedrich Murnau)
5. Entr’acte (1924, Renè Clair)
6. La febbre dell’oro (1925, Charles Chaplin)
7. La corazzata Potemkin (1925, Sergej Eisenstein)
8. Metropolis (1927, Fritz Lang)
9. Napoléon (1927, Abel Gance)
10. The cameraman (1928, Buster Keaton)
11. Giovanna D’Arco (1928, Carl Theodor Dreyer)
12. L’uomo con la macchina da presa (1929, Dziga Vertov)
13. Un chien andalou (1929, luis Bunuel)
14. M- Il mostro di Dusseldorf (1931, Fritz Lang)
15. Frankenstein (1931, James Whale)
16. Freaks (1932, Tod Browning)
17. L’Atalante (1934, Jean Vigo)
18. Tempi moderni (1936, Charles Chaplin)
19. La grande illusione (1937, Jean Renoir)
20. L’angelo del male (1938, Jean Renoir)
21. La regola del gioco (1939, Jean Renoir)
22. Ombre rosse (1939, John Ford)
23. Quarto potere (1941, Orson Welles)
24. Vogliamo vivere (1942, Ernst Lubitsch)
25. Casablanca (1942, Michael Curtiz)
26. Ossessione (1943, Luchino Visconti)
27. Roma, città aperta (1945, Roberto Rossellini)
28. La vita è meravigliosa (1946, Frank Capra)
29. Nodo alla gola (1948, Alfred Hitchcock)
30. Il terzo uomo (1949, Carol Reed)
31. Rashomon (1950, Akira Kurosawa)
32. Viale del tramonto (1950, Billy Wilder)
33. Giungla d’asfalto (1950, John Huston)
34. L’asso nella manica (1951, Billy Wilder)
35. Achtung Banditi! (1951, Carlo Lizzani)
36. Roma ore 11 (1952, Giuseppe De Santis)
37. Umberto D (1952, Vittorio De Sica)
38. Mezzogiorno di fuoco (1952, Fred Zinnemann)
39. Viaggio a Tokyo (1953, Ozu)
40. Il grande caldo (1953, Fritz Lang)
41. Miseria e nobiltà (1954, Mario Mattòli)
42. La finestra sul cortile (1954, Alfred Hitchcock)
43. L’invasione degli ultracorpi (1956, Don Siegel)
44. La parola ai giurati (1957, Sidney Lumet)
45. Il settimo sigillo (1957, Ingmar Bergman)
46. Orizzonti di gloria (1957, Stanley Kubrick)
47. Radiazioni BX distruzione uomo (1957, Jack Arnold)
48. I soliti ignoti (1958, Mario Monicelli)
49. La donna che visse due volte (1958, Alfred Hitchcock)
50. La Grande Guerra (1959, Mario Monicelli)
51. Intrigo internazionale (1959, Alfred Hitchcock)
52. A qualcuno piace caldo (1959, Billy Wilder)
53. Fino all’ultimo respiro (1960 J.L.Godard)
54. Rocco e i suoi fratelli (1960, L.Visconti)
55. La maschera del demonio (1960, Mario Bava)
56. Psyco (1960, Alfred Hitchcock)
57. Viridiana (1961, Luis Bunuel)
58. L’anno scorso a Marienbad (1961, Alain Resnais)
59. Lo spaccone (1961, Robert Rossen)
60. Il sorpasso (1962, Dino Risi)
61. 8 e 1⁄2 (1963, Federico Fellini)
62. I 3 volti della paura (1963, Mario Bava)
63. I mostri (1963, D. Risi)
64. Dr. Stranamore: ovvero come imparai a non preoccuparmi e ad amare la bomba (1964, S.Kubrick)
65. L’Armata Brancaleone (1966, M. Monicelli)
66. Blow Up (1966, Michelangelo Antonioni)
67. Il Buono, il Brutto, il Cattivo (1966, Sergio Leone)
68. Il laureato (1967, Mike Nichols)
69. Rosemary’s Baby (1968, Roman Polanski)
70. 2001: Odissea nello spazio (1968, Stanley Kubrick)
71. La notte dei morti viventi (1968, George Romero)
72. Easy Rider (1969, Dennis Hopper)
73. M.A.S.H. (1969, Robert Altman)
74. Il ragazzo selvaggio (1969, François Truffaut)
75. Arancia Meccanica (1971, S. Kubrick)
76. In nome del popolo italiano (1971, D. Risi)
77. Milano calibro 9 (1972, F. Di Leo)
78. Il padrino (1972, F.F.Coppola)
79. L’esorcista (1973, W. Friedkin)
80. Effetto notte (1973, F. Truffaut)
81. F for Fake (1973, O. Welles)
82. Il padrino - Parte II (1974, F.F. Coppola)
83. Cani arrabbiati (1974, M. Bava)
84. Quel pomeriggio di un giorno da cani (1975, S. Lumet)
85. Fantozzi (1975, L.Salce)
86. Lo squalo (1975, S. Spielberg)
87. Profondo rosso (1975, D. Argento)
88. L’inquilino del terzo piano (1976, R. Polanski)
89. Taxi Driver (1976, M. Scorsese)
90. Carrie, lo sguardo di Satana (1976, B. De Palma)
91. Quinto Potere (1976, S. Lumet)
92. I duellanti (1977, R.Scott)
93. I guerrieri della notte (1979, W. Hill)
94. Apocalypse Now (1979, F.F.Coppola)
95. Toro scatenato (1980, M. Scorsese)
96. 1997: Fuga da New York (1981, J.Carpenter)
97. La cosa (1982, J.Carpenter)
98. Blade Runner (1982, R. Scott)
99. Il senso della vita (1983, T. Jones e Monty Python)
100. Rusty il selvaggio (1983, F.F.Coppola)
101. Terminator (1984, J.Cameron)
102. Brazil (1985, T. Gilliam)
103. Fuori orario (1985, M. Scorsese)
104. Vivere e morire a Los Angeles (1985, W. Friedkin)
105. A 30 secondi dalla fine (1985, A. Končalovskj)
106. La casa 2 (1987, Sam Raimi)
107. Il cielo sopra Berlino (1987, Wim Wenders)
108. Tetsuo (1989, Shinya Tsukamoto)
109. Quei bravi ragazzi (1990, M.Scorsese)
110. Il silenzio degli innocenti (1991, J.Demme)
111. Americani (1992, J. Foley)
112. Schindler’s list (1993, S. Spielberg)
113. Una pura formalità (1994, G. Tornatore)
114. Pulp fiction (1994, Q. Tarantino)
115. Titanic (1997, J.Cameron)
116. Essere John Malkovich (1999, S.Jonze)
117. Matrix (1999, Fratelli Wachowski)
118. eXistenz (1999, D.Cronenberg)
119. American Psycho (2000, Mary Harron)
120. La 25° ora (2002, S. Lee)
121. Paz! (2002, R. De Maria)
122. Old boy (2003, Park Chan-wook)
123. Elephant (2003, G. Van Sant)
124. Se mi lasci ti cancello (2004, M. Gondry)
125. Ferro 3 (2004, Kim Ki-duk)
126. Non è un paese per vecchi (2007, Ethan Coen)
127. Il divo (2008, P. Sorrentino)
128. Bronson (2008, N.W. Refn)
129. Moon (2009, D. Jones)
130. Bastardi senza gloria (2009, Q.Tarantino)
131. Hugo Cabret (2011, M.Scorsese)
132. Drive (2011, N.W.Refn)
133. L’ultimo terrestre (2011, G.Pacinotti)
134. Cloud Atlas (2012, Fratelli Wachowski)
135. Venere in pelliccia (2013, R.Polanski)
136. La grande Bellezza (2013, P.Sorrentino)
137. Solo gli amanti sopravvivono (2013, J.Jarmusch)
138. Birdman (Alejandro Inarritu, 2014)
139. Grand Budapest Hotel (2014, W. Anderson)
140. American sniper (2015, C.Eastwood)
141. Swiss Army Man (2016, Dan Kwan, Daniel Scheinert)
142. Roma (Alfonso Cuaron, 2018)
143. La casa di Jack (2018, L.Von trier)
144. BlacKkKlansman (2018, S.Lee)
145. The mule (2019, C.Eastwood)
146. The Lighthouse (2019, R. Eggers)
147. I morti non muoiono (2019, J.Jarmusch)
148. È stata la mano di Dio (2021, P.Sorrentino)
149. Nope (2022, Jordan Peele)
150. The Fabelmans (2022, S.Spielberg)
151. Il pianeta proibito (1956, Fred W.Wilcox)
152. Rapina a mano armata (1956, Stanley Kubrick)
153. Piano 9 da un altro spazio (1959, Edward J Wood Jr.)
154. I guerrieri (1970, Brian G.Hutton)
155. Punto zero (1971, R.C.Sarafian)
156. 2022: I sopravvissuti (1973, R.Fleischer)
157. Westworld (1973, M.Crichton)
158. Fuga di mezzanotte (1978, A. Parker)
159. Capricorn One (1978, P.Hyams)
160. Barton Fink (1991, J e E. Coen)
161. Strange days (1995, K.Bigelow)
162. Casino (1995, M.Scorsese)
163. Cube (1997, V.Natali)
164. Il tocco del male (1998, G. Hoblit)
165. The Truman Show (1998, P.Weir)
166. The Blair Witch Project (1999, E.Sanchez e D.Myrick)
167. Nove regine (2000, F.Bielinsky)
168. Training Day (2001, A.Fuqua)
169. Minority Report (2002, S.SPielberg)
170. Deathwatch (2002, M.J.Bassett)
171. Calvaire (2004, F.Du Welz)
172. The Departed (2006, M.Scorsese)
173. Inland empire (2006, D.Lynch)
174. Inside Man (2006, S.Lee)
175. Il petroliere (2007, P.T.Anderson)
176. Tropic Thunder (2008, B.Stiller)
177. Vita di Pi (2012, Ang Lee)
178. Mad Max: Fury Road (2015, G.Miller)
179. Everything everywhere all at once (2022, D.Kwan e D.Scheinert)
180. Non essere cattivo (2015, C.Caligari)`;

  function loadPersonal() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  function savePersonal(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function loadReceived() {
    try {
      const raw = localStorage.getItem(RECEIVED_STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  function saveReceived(lists) {
    localStorage.setItem(RECEIVED_STORAGE_KEY, JSON.stringify(lists));
  }

  function uid(prefix = "item") {
    return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function normalizeRating(v) {
    const n = Number(v);
    if (Number.isNaN(n)) return 0;
    return Math.min(5, Math.max(0, n));
  }

  function normalizeText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function slugify(value) {
    return normalizeText(value).replace(/\s+/g, "-") || uid("list");
  }

  function parseSDACSeed(raw) {
    return raw
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean)
      .map((line) => {
        const match = line.match(/^(?:\d+\.\s*)?(.*?)\s*\((\d{4})\s*,?\s*(.*?)\)\s*$/u);
        if (!match) return null;
        const [, title, year, director] = match;
        return {
          title: title.trim(),
          year: Number(year),
          director: director.trim(),
          status: "towatch",
          rating: 0,
          notes: ""
        };
      })
      .filter(Boolean);
  }

  function buildOfficialList() {
    const now = Date.now();
    const items = parseSDACSeed(SDAC_FILM_RAW).map((item, index) => ({
      id: `sdac_seed_${index + 1}`,
      ...item,
      createdAt: now,
      updatedAt: now
    }));

    return {
      id: OFFICIAL_LIST_ID,
      type: LIST_FILE_TYPE,
      version: LIST_FILE_VERSION,
      title: "Lista ufficiale SDAC",
      owner: "Scuola SDAC",
      sourceType: "official",
      isLocked: true,
      createdAt: now,
      updatedAt: now,
      items
    };
  }

  function isOfficialSdacList(list) {
    if (!list || typeof list !== "object") return false;
    const id = normalizeText(list.id || "");
    const title = normalizeText(list.title || "");
    const owner = normalizeText(list.owner || "");
    const sourceType = normalizeText(list.sourceType || "");

    if (id === normalizeText(OFFICIAL_LIST_ID) || id.startsWith("sdac official")) return true;
    if (sourceType === "official") return true;
    if (owner === "scuola sdac" && (title.includes("lista ufficiale sdac") || title.includes("lista film sdac"))) return true;
    if (Boolean(list.isLocked) && title.includes("sdac")) return true;
    return false;
  }

  function ensureSeedReceived() {
    const lists = loadReceived();
    const cleaned = lists.filter(list => !isOfficialSdacList(list));
    cleaned.unshift(buildOfficialList());
    saveReceived(cleaned);
  }

  function toDisplayDate(value) {
    if (!value) return "";
    try {
      return new Date(value).toLocaleString("it-IT");
    } catch {
      return "";
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function findPersonalById(id) {
    return loadPersonal().find(item => item.id === id) || null;
  }

  function getSortedPersonal() {
    return loadPersonal().sort((a, b) => {
      const byTitle = (a.title || "").localeCompare((b.title || ""), "it", {
        sensitivity: "base",
        numeric: true
      });
      if (byTitle !== 0) return byTitle;

      const byYear = String(a.year || "").localeCompare(String(b.year || ""), "it", {
        sensitivity: "base",
        numeric: true
      });
      if (byYear !== 0) return byYear;

      return (b.updatedAt ?? 0) - (a.updatedAt ?? 0);
    });
  }

  function getFilteredPersonal() {
    const items = getSortedPersonal();
    const q = (qEl?.value || "").trim().toLowerCase();

    return items.filter(it => {
      if (activeSummaryFilter === "favorite" && !it.favorite) return false;
      if (activeSummaryFilter === "watched" && it.status !== "watched") return false;
      if (activeSummaryFilter === "towatch" && it.status === "watched") return false;
      if (!q) return true;
      return (it.title || "").toLowerCase().includes(q)
        || (it.notes || "").toLowerCase().includes(q)
        || (it.director || "").toLowerCase().includes(q)
        || String(it.year || "").toLowerCase().includes(q)
        || (it.sourceListTitle || "").toLowerCase().includes(q);
    });
  }

  function setSummaryFilter(nextFilter = "all") {
    activeSummaryFilter = nextFilter;
    renderPersonal();
  }

  function summaryEmptyLabel() {
    if (activeSummaryFilter === "favorite") return "Nessun preferito.";
    if (activeSummaryFilter === "watched") return "Nessun film visto.";
    if (activeSummaryFilter === "towatch") return "Nessun film da vedere.";
    return "Aggiungi un titolo o importa una lista.";
  }

  function toggleFavorite(id) {
    const items = loadPersonal();
    const idx = items.findIndex(item => item.id === id);
    if (idx < 0) return;
    items[idx] = {
      ...items[idx],
      favorite: !items[idx].favorite,
      updatedAt: Date.now()
    };
    savePersonal(items);
    renderPersonal();
  }

  function ratingLabel(r) {
    const n = Math.round(normalizeRating(r) * 2) / 2;
    return `<span aria-label="Valutazione ${n} su 5">${n}/5</span>`;
  }

  function renderPersonal() {
    const items = loadPersonal();
    const filtered = getFilteredPersonal();
    const total = items.length;

    if (summaryEl) {
      const watchedCount = items.filter(item => item.status === "watched").length;
      const toWatchCount = items.filter(item => item.status !== "watched").length;
      const favoriteCount = items.filter(item => item.favorite).length;
      const summaryItems = [
        ["all", "nbSummaryItem--total", "Totale", total],
        ["watched", "nbSummaryItem--watched", "Visti", watchedCount],
        ["towatch", "nbSummaryItem--towatch", "Da vedere", toWatchCount],
        ["favorite", "nbSummaryItem--favorite", "Preferiti", favoriteCount]
      ];
      summaryEl.innerHTML = summaryItems.map(([value, cls, label, count]) => `
        <button class="nbSummaryItem ${cls}${activeSummaryFilter === value ? ' is-active' : ''}" type="button" data-summary-filter="${value}" aria-pressed="${activeSummaryFilter === value ? 'true' : 'false'}">
          <strong>${label}</strong><span>${count}</span>
        </button>
      `).join('');
    }

    listEl.innerHTML = "";

    if (filtered.length === 0) {
      listEl.innerHTML = `<div class="nbItem"><div class="nbTitle">Nessun film</div><div class="nbMeta">${summaryEmptyLabel()}</div></div>`;
      return;
    }

    filtered.forEach(item => {
      const details = document.createElement("details");
      details.className = "nbItem nbItem--collapsible";
      details.dataset.id = item.id;
      details.open = openPersonalIds.has(item.id);

      const isWatched = item.status === "watched";
      const statusLabel = isWatched ? "Visto" : "Da vedere";
      const statusClass = isWatched ? "nbStatusBadge nbStatusBadge--watched" : "nbStatusBadge nbStatusBadge--towatch";
      const favoriteClass = item.favorite ? "nbFavoriteBtn is-active" : "nbFavoriteBtn";
      const favoriteLabel = item.favorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti";
      const updated = item.updatedAt ? toDisplayDate(item.updatedAt) : "";
      const credits = [item.year, item.director].filter(Boolean).join(" · ");
      const sourceHtml = item.sourceListTitle
        ? `<div class="nbMeta nbSource">Fonte: <strong>${escapeHtml(item.sourceListTitle)}</strong>${item.sourceOwner ? ` · ${escapeHtml(item.sourceOwner)}` : ""}</div>`
        : "";

      details.innerHTML = `
        <summary class="nbItem__summary" aria-label="Apri o chiudi dettagli film">
          <div class="nbItem__summaryMain">
            <div class="nbTitleRow">
              <button class="${favoriteClass}" type="button" data-action="favorite" aria-label="${favoriteLabel}" title="${favoriteLabel}"></button>
              <div class="nbTitle">${escapeHtml(item.title || "Senza titolo")}</div>
            </div>
            <div class="nbItem__summaryStatus">
              <span class="${statusClass}">${statusLabel}</span>
            </div>
          </div>
          <span class="nbItem__chevron" aria-hidden="true"></span>
        </summary>
        <div class="nbItem__body">
          <div class="nbItem__top">
            <div>
              <div class="nbMeta nbMeta--statusRow">
                <span class="${statusClass}">${statusLabel}</span>
                <span>Valutazione: ${ratingLabel(item.rating ?? 0)}</span>
                ${updated ? `<span>Aggiornato: ${escapeHtml(updated)}</span>` : ""}
              </div>
              ${credits ? `<div class="nbMeta">${escapeHtml(credits)}</div>` : ""}
              ${item.notes ? `<div class="nbMeta">${escapeHtml(item.notes)}</div>` : ""}
              ${sourceHtml}
            </div>
            <div class="nbActions">
              <button class="btnSmall" type="button" data-action="edit">Modifica</button>
              <button class="btnSmall" type="button" data-action="delete">Elimina</button>
            </div>
          </div>
        </div>
      `;

      details.addEventListener("toggle", () => {
        if (details.open) openPersonalIds.add(item.id);
        else openPersonalIds.delete(item.id);
      });

      const favoriteBtn = details.querySelector('[data-action="favorite"]');
      ["click", "mousedown", "mouseup"].forEach(eventName => {
        favoriteBtn?.addEventListener(eventName, (event) => {
          event.preventDefault();
          event.stopPropagation();
          if (eventName === "click") toggleFavorite(item.id);
        });
      });
      favoriteBtn?.addEventListener("keydown", (event) => {
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();
          event.stopPropagation();
          toggleFavorite(item.id);
        }
      });

      details.querySelector('[data-action="edit"]').addEventListener("click", () => openEdit(item));
      details.querySelector('[data-action="delete"]').addEventListener("click", () => removePersonalItem(item.id));
      listEl.appendChild(details);
    });
  }

  function savePersonalItem(item) {
    const items = loadPersonal();
    const idx = items.findIndex(x => x.id === item.id);
    if (idx >= 0) items[idx] = item;
    else items.push(item);
    savePersonal(items);
    renderPersonal();
  }

  function removePersonalItem(id) {
    openPersonalIds.delete(id);
    const next = loadPersonal().filter(x => x.id !== id);
    savePersonal(next);
    renderPersonal();
  }

  function openNew() {
    idEl.value = "";
    titleEl.value = "";
    statusEl.value = "towatch";
    directorEl.value = "";
    yearEl.value = "";
    ratingEl.value = "0";
    notesEl.value = "";
    dialogTitleEl.textContent = "Nuovo film";
    dialog.showModal();
  }

  function openEdit(item) {
    idEl.value = item.id;
    titleEl.value = item.title ?? "";
    statusEl.value = item.status ?? "towatch";
    directorEl.value = item.director ?? "";
    yearEl.value = item.year ?? "";
    ratingEl.value = String(item.rating ?? 0);
    notesEl.value = item.notes ?? "";
    dialogTitleEl.textContent = "Modifica film";
    dialog.showModal();
  }

  function closeDialog() {
    dialog.close();
  }

  function getPersonalExportPayload() {
    const title = (shareTitleEl?.value || DEFAULT_SHARE_TITLE).trim() || DEFAULT_SHARE_TITLE;
    const owner = (shareOwnerEl?.value || DEFAULT_SHARE_OWNER).trim() || DEFAULT_SHARE_OWNER;
    const items = loadPersonal()
      .slice()
      .sort((a, b) => (a.title || "").localeCompare(b.title || "", "it", { sensitivity: "base" }))
      .map(item => ({
        title: item.title || "",
        year: item.year || undefined,
        director: item.director || undefined,
        status: item.status || "towatch",
        rating: normalizeRating(item.rating ?? 0),
        notes: item.notes || "",
        favorite: Boolean(item.favorite)
      }));

    return {
      type: LIST_FILE_TYPE,
      version: LIST_FILE_VERSION,
      title,
      owner,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      items
    };
  }

  function updateShareSummary() {
    if (!shareSummaryEl) return;
    const payload = getPersonalExportPayload();
    const watched = payload.items.filter(item => item.status === "watched").length;
    shareSummaryEl.innerHTML = `Titolo lista: <strong>${escapeHtml(payload.title)}</strong><br>Autore: <strong>${escapeHtml(payload.owner)}</strong><br>Film inclusi: <strong>${payload.items.length}</strong> · Visti: <strong>${watched}</strong> · Da vedere: <strong>${payload.items.length - watched}</strong>`;
  }

function refreshNotebookPremiumUi() {
  if (shareBtn) {
    shareBtn.textContent = "Condividi lista";
    shareBtn.title = "Condividi lista";
  }
}

function openShareDialog() {
  shareTitleEl.value = DEFAULT_SHARE_TITLE;
  shareOwnerEl.value = DEFAULT_SHARE_OWNER;
  updateShareSummary();
  updateShareAvailability();
  shareDialog.showModal();
}

  function closeShareDialog() {
    shareDialog.close();
  }

  function buildShareText(payload) {
    const lines = [
      `${payload.title}`,
      `Autore: ${payload.owner}`,
      `Totale film: ${payload.items.length}`,
      ""
    ];

    payload.items.forEach((item, index) => {
      const credits = [item.year, item.director].filter(Boolean).join(", ");
      const base = `${index + 1}. ${item.title}${credits ? ` (${credits})` : ""}`;
      const statusLabel = item.status === "watched" ? "Visto" : "Da vedere";
      const notes = item.notes ? ` — Note: ${item.notes}` : "";
      lines.push(`${base} — ${statusLabel}${notes}`);
    });

    return lines.join("\n");
  }

  function filenameFromPayload(payload) {
    const base = slugify(payload.title || DEFAULT_SHARE_TITLE) || "taccuino-film";
    return `${base}.json`;
  }

  function downloadJson(payload) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filenameFromPayload(payload);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function canNativeShareFiles() {
    try {
      if (!navigator.share || !navigator.canShare || typeof File === "undefined") return false;
      const payload = getPersonalExportPayload();
      const file = new File([JSON.stringify(payload, null, 2)], filenameFromPayload(payload), { type: "application/json" });
      return navigator.canShare({ files: [file] });
    } catch {
      return false;
    }
  }

  function updateShareAvailability() {
    const supported = canNativeShareFiles();

    if (nativeShareBtn) {
      nativeShareBtn.hidden = !supported;
      nativeShareBtn.disabled = !supported;
      nativeShareBtn.textContent = "Condividi";
    }

    if (shareNoticeEl) {
      shareNoticeEl.textContent = supported
        ? "Chi riceve il file può importarlo da Liste ricevute > Apri/Aggiungi lista."
        : "Su questo dispositivo la condivisione diretta non è disponibile. Usa Scarica JSON e invia il file manualmente via email, WhatsApp o altre app.";
    }
  }

  async function shareJsonFile(payload) {
    const json = JSON.stringify(payload, null, 2);
    const file = new File([json], filenameFromPayload(payload), { type: "application/json" });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: payload.title,
        text: `Lista film condivisa da ${payload.owner}`,
        files: [file]
      });
      return true;
    }

    return false;
  }

  async function copyShareText() {
    const text = buildShareText(getPersonalExportPayload());
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }

  function normalizeListFromImport(payload) {
    if (!payload || typeof payload !== "object") {
      throw new Error("Formato lista non valido.");
    }

    if (payload.type !== LIST_FILE_TYPE || !Array.isArray(payload.items)) {
      throw new Error("Il file non è una lista compatibile con il Taccuino film.");
    }

    const items = payload.items
      .map((item, index) => {
        if (!item || typeof item !== "object") return null;
        const title = String(item.title || "").trim();
        if (!title) return null;
        return {
          id: uid(`import_${index + 1}`),
          title,
          year: item.year ? Number(item.year) || item.year : undefined,
          director: item.director ? String(item.director).trim() : "",
          status: item.status === "watched" ? "watched" : "towatch",
          rating: normalizeRating(item.rating ?? 0),
          notes: String(item.notes || "").trim(),
          favorite: Boolean(item.favorite),
          createdAt: Date.now(),
          updatedAt: Date.now()
        };
      })
      .filter(Boolean);

    if (!items.length) {
      throw new Error("La lista non contiene film validi.");
    }

    const title = String(payload.title || "Lista ricevuta").trim() || "Lista ricevuta";
    const owner = String(payload.owner || "Utente SDAC").trim() || "Utente SDAC";
    const baseId = slugify(`${title}-${owner}`);
    const existing = loadReceived();
    let id = baseId;
    let counter = 2;
    while (existing.some(list => list.id === id)) {
      id = `${baseId}-${counter}`;
      counter += 1;
    }

    return {
      id,
      type: LIST_FILE_TYPE,
      version: payload.version || LIST_FILE_VERSION,
      title,
      owner,
      sourceType: "imported",
      isLocked: false,
      createdAt: payload.createdAt || Date.now(),
      updatedAt: Date.now(),
      items
    };
  }

  function renderReceivedLists() {
    ensureSeedReceived();
    const lists = loadReceived().sort((a, b) => {
      if (a.id === OFFICIAL_LIST_ID) return -1;
      if (b.id === OFFICIAL_LIST_ID) return 1;
      return (b.updatedAt ?? 0) - (a.updatedAt ?? 0);
    });

    if (receivedSummaryEl) {
      receivedSummaryEl.textContent = `${lists.length} liste disponibili.`;
    }

    if (!receivedListEl) return;
    receivedListEl.innerHTML = "";

    lists.forEach(list => {
      const div = document.createElement("div");
      div.className = "nbReceivedItem";
      const created = toDisplayDate(list.createdAt);
      const badge = list.id === OFFICIAL_LIST_ID
        ? `<span class="nbBadge nbBadge--official">Lista ufficiale</span>`
        : `<span class="nbBadge">Ricevuta</span>`;

      div.innerHTML = `
        <div class="nbReceivedItem__top">
          <div>
            <div class="nbReceivedItem__title">${escapeHtml(list.title)}</div>
            <div class="nbReceivedItem__meta">Da: <strong>${escapeHtml(list.owner || "Utente SDAC")}</strong> · ${list.items.length} film${created ? ` · Creata: ${escapeHtml(created)}` : ""}</div>
            <div class="nbBadges">${badge}</div>
          </div>
          <div class="nbReceivedItem__actions">
            <button class="btnSmall" type="button" data-action="open">Apri</button>
            <button class="btnSmall" type="button" data-action="add">Aggiungi alla mia lista</button>
            ${list.isLocked ? "" : `
              <button class="nbIconBtn nbIconBtn--danger" type="button" data-action="delete" aria-label="Elimina lista ricevuta" title="Elimina lista ricevuta">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M4 7h16"></path>
                  <path d="M9 7V5h6v2"></path>
                  <path d="M8 7l1 12h6l1-12"></path>
                  <path d="M10 11v5"></path>
                  <path d="M14 11v5"></path>
                </svg>
              </button>`}
          </div>
        </div>
      `;

      div.querySelector('[data-action="open"]').addEventListener("click", () => openReceivedPreview(list.id));
      div.querySelector('[data-action="add"]').addEventListener("click", () => addReceivedListToPersonal(list.id));
      const deleteBtn = div.querySelector('[data-action="delete"]');
      if (deleteBtn) deleteBtn.addEventListener("click", () => removeReceivedList(list.id));
      receivedListEl.appendChild(div);
    });
  }

  function openReceivedDialog() {
    renderReceivedLists();
    receivedDialog.showModal();
  }

  function closeReceivedDialog() {
    receivedDialog.close();
  }

  function removeReceivedList(id) {
    const lists = loadReceived();
    const target = lists.find(list => list.id === id);
    if (!target || target.isLocked) return;
    const confirmed = window.confirm(`Eliminare la lista ricevuta "${target.title}"?`);
    if (!confirmed) return;
    saveReceived(lists.filter(list => list.id !== id));
    renderReceivedLists();
  }

  function getReceivedListById(id) {
    return loadReceived().find(list => list.id === id) || null;
  }

  function openReceivedPreview(id) {
    const list = getReceivedListById(id);
    if (!list) return;
    currentPreviewListId = id;
    previewTitleEl.textContent = list.title;
    previewMetaEl.textContent = `Da: ${list.owner || "Utente SDAC"} · ${list.items.length} film`;
    previewItemsEl.innerHTML = "";

    list.items.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "nbPreviewItem";
      const credits = [item.year, item.director].filter(Boolean).join(" · ");
      div.innerHTML = `
        <div class="nbPreviewItem__top">
          <div>
            <div class="nbPreviewItem__title">${index + 1}. ${escapeHtml(item.title)}</div>
            ${credits ? `<div class="nbPreviewItem__meta">${escapeHtml(credits)}</div>` : ""}
            ${item.notes ? `<div class="nbPreviewNote">${escapeHtml(item.notes)}</div>` : ""}
          </div>
        </div>
      `;
      previewItemsEl.appendChild(div);
    });

    previewDialog.showModal();
  }

  function closePreviewDialog() {
    previewDialog.close();
    currentPreviewListId = "";
  }

  function filmAlreadyPresent(existingItems, incoming) {
    const incomingTitle = normalizeText(incoming.title);
    return existingItems.some(item => {
      if (normalizeText(item.title) !== incomingTitle) return false;
      if (!incoming.year || !item.year) return true;
      return String(item.year) === String(incoming.year);
    });
  }

  function addReceivedListToPersonal(id) {
    const list = getReceivedListById(id);
    if (!list) return;

    const items = loadPersonal();
    let added = 0;
    const now = Date.now();

    list.items.forEach(sourceItem => {
      if (filmAlreadyPresent(items, sourceItem)) return;
      items.push({
        id: uid("film"),
        title: sourceItem.title,
        year: sourceItem.year || undefined,
        director: sourceItem.director || "",
        status: sourceItem.status === "watched" ? "watched" : "towatch",
        rating: normalizeRating(sourceItem.rating ?? 0),
        notes: sourceItem.notes || "",
        favorite: Boolean(sourceItem.favorite),
        sourceListId: list.id,
        sourceListTitle: list.title,
        sourceOwner: list.owner,
        createdAt: now,
        updatedAt: now
      });
      added += 1;
    });

    savePersonal(items);
    renderPersonal();
    renderReceivedLists();

    alert(added > 0
      ? `Aggiunti ${added} film dalla lista “${list.title}”.`
      : `Nessun nuovo film aggiunto: i titoli di “${list.title}” sono già presenti.`);
  }

  async function importListFromFile(file) {
    if (!file) return;
    const text = await file.text();
    const payload = JSON.parse(text);
    const normalized = normalizeListFromImport(payload);
    const lists = loadReceived();
    lists.push(normalized);
    saveReceived(lists);
    renderReceivedLists();
    alert(`Lista importata: ${normalized.title}`);
  }

  function closeAllNotebookDialogs() {
    [dialog, shareDialog, receivedDialog, previewDialog].forEach(el => {
      if (el?.open) el.close();
    });
  }

  function preserveExistingFields(id, fallbackCreatedAt) {
    if (!id) return { createdAt: fallbackCreatedAt };
    const existing = findPersonalById(id);
    if (!existing) return { createdAt: fallbackCreatedAt };
    return {
      createdAt: existing.createdAt ?? fallbackCreatedAt,
      favorite: Boolean(existing.favorite),
      sourceListId: existing.sourceListId,
      sourceListTitle: existing.sourceListTitle,
      sourceOwner: existing.sourceOwner
    };
  }

  addBtn.addEventListener("click", openNew);
  cancelBtn.addEventListener("click", closeDialog);
  shareBtn.addEventListener("click", openShareDialog);
  shareCloseBtn?.addEventListener("click", closeShareDialog);
  receivedBtn.addEventListener("click", openReceivedDialog);
  receivedCloseBtn?.addEventListener("click", closeReceivedDialog);
  previewCloseBtn?.addEventListener("click", closePreviewDialog);
  previewAddBtn?.addEventListener("click", () => {
    if (!currentPreviewListId) return;
    addReceivedListToPersonal(currentPreviewListId);
  });
  importListBtn?.addEventListener("click", () => importFileEl?.click());

  qEl?.addEventListener("input", renderPersonal);
  summaryEl?.addEventListener("click", (event) => {
    const btn = event.target.closest('[data-summary-filter]');
    if (!btn) return;
    setSummaryFilter(btn.getAttribute('data-summary-filter') || 'all');
  });
  shareTitleEl?.addEventListener("input", () => {
    updateShareSummary();
    updateShareAvailability();
  });
  shareOwnerEl?.addEventListener("input", () => {
    updateShareSummary();
    updateShareAvailability();
  });

  copyTextBtn?.addEventListener("click", async () => {
    try {
      await copyShareText();
      alert("Elenco copiato negli appunti.");
    } catch {
      alert("Non sono riuscito a copiare il testo negli appunti.");
    }
  });

  downloadJsonBtn?.addEventListener("click", () => {
    downloadJson(getPersonalExportPayload());
  });

  nativeShareBtn?.addEventListener("click", async () => {
    const payload = getPersonalExportPayload();
    try {
      const shared = await shareJsonFile(payload);
      if (!shared) {
        downloadJson(payload);
        alert("Condivisione file non disponibile su questo dispositivo: ho scaricato il JSON.");
      }
    } catch {
      downloadJson(payload);
      alert("Condivisione non riuscita: ho scaricato il JSON.");
    }
  });

  importFileEl?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      await importListFromFile(file);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Importazione non riuscita.";
      alert(message);
    } finally {
      event.target.value = "";
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const id = idEl.value || uid("film");
    const now = Date.now();
    const preserved = preserveExistingFields(idEl.value, now);

    const parsedYear = Number(yearEl.value);
    const item = {
      id,
      title: titleEl.value.trim(),
      status: statusEl.value,
      director: directorEl.value.trim(),
      year: yearEl.value.trim() ? (Number.isNaN(parsedYear) ? yearEl.value.trim() : parsedYear) : undefined,
      rating: normalizeRating(ratingEl.value),
      notes: notesEl.value.trim(),
      favorite: preserved.favorite ?? false,
      updatedAt: now,
      createdAt: preserved.createdAt ?? now,
      sourceListId: preserved.sourceListId,
      sourceListTitle: preserved.sourceListTitle,
      sourceOwner: preserved.sourceOwner
    };

    savePersonalItem(item);
    closeDialog();
  });

  ensureSeedReceived();
  refreshNotebookPremiumUi();
  window.addEventListener("sdac:membership-change", refreshNotebookPremiumUi);
  updateShareAvailability();
  renderPersonal();
})();
