(() => {
  // SDAC App — Piano di Produzione (Wizard) — Step 1 + Step 2 (MVP)
  const panel = document.querySelector('[data-panel="start"]');
  if (!panel) return;

  const DRAFT_KEY = "sdac_prodplan_draft_v1";
  const SAVED_KEY = "sdac_prodplans_v1"; // placeholder per futuro

  const el = (id) => document.getElementById(id);
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

  // Home/Wizard containers
  const ppNew = el("ppNew");
  const ppListBtn = el("ppList");
  const ppSavePlanBtn = el("ppSavePlan");
  const plansDialog = el("ppPlansDialog");
  const plansCloseBtn = el("ppPlansClose");
  const plansListEl = el("ppPlansList");
  const plansSearchEl = el("ppPlansSearch");
  const plansOnlyFavEl = el("ppPlansOnlyFav");

  const ppHome = el("ppHome");
  const ppWizard = el("ppWizard");
  const savedListEl = el("ppSavedList");
  const headerTitleEl = el("ppHeaderTitle");

  // Dialog Salva PdP
  const saveDialog = el("ppSaveDialog");
  const saveCloseBtn = el("ppSaveClose");
  const saveCancelBtn = el("ppSaveCancel");
  const saveConfirmBtn = el("ppSaveConfirm");
  const saveAsNewBtn = el("ppSaveAsNew");
  const saveNameEl = el("ppSaveName");
  const saveInfoEl = el("ppSaveInfo");


  if (!ppNew || !ppHome || !ppWizard) return;

  // Progress
  const progressBar = el("ppProgressBar");
  const progressLabels = el("ppProgressLabels");
  const stepEls = Array.from(ppWizard.querySelectorAll(".ppStep"));

  // Step 1 fields
  const titleEl = el("ppTitle");
  const synopsisEl = el("ppSynopsis");
  const subjectEl = el("ppSubject");
  const scriptEl = el("ppScript");
  const typeEl = el("ppType");

  const titleCount = el("ppTitleCount");
  const synopsisCount = el("ppSynopsisCount");
  const subjectCount = el("ppSubjectCount");

  const charNameEl = el("ppCharName");
  const charAddBtn = el("ppCharAdd");
  const charsListEl = el("ppChars");
  const charsGroupHead = el("ppCharsGroupHead");
  const charsGroupBody = el("ppCharsGroupBody");
  const charsGroupCount = el("ppCharsGroupCount");
  const charsGroupChev = el("ppCharsGroupChev");

  const envNameEl = el("ppEnvName");
  const envSceneEl = el("ppEnvScene");
  const envAddBtn = el("ppEnvAdd");
  const envsListEl = el("ppEnvs");
  const envsGroupHead = el("ppEnvsGroupHead");
  const envsGroupBody = el("ppEnvsGroupBody");
  const envsGroupCount = el("ppEnvsGroupCount");
  const envsGroupChev = el("ppEnvsGroupChev");

  const clearBtn1 = el("ppClear");
  const toHomeBtn1 = el("ppToHome");
  const nextBtn1 = el("ppNext");

  // Step 2 fields (troupe + attrezzatura)
  const crewWrap = el("ppCrew");
  const crewAddCustomBtn = el("ppCrewAddCustom");
  const eqWrap = el("ppEquipment");
  const eqAddCustomBtn = el("ppEqAddCustom");

  const clearBtn2 = el("ppClear2");
  const prevBtn2 = el("ppPrev2");
  const toHomeBtn2 = el("ppToHome2");
  const nextBtn2 = el("ppNext2");

// Step 3 fields (produzione e fornitori)
const sponsorNameEl = el("ppSponsorName");
const sponsorAddBtn = el("ppSponsorAdd");
const sponsorsListEl = el("ppSponsors");

const producerNameEl = el("ppProducerName");
const producerAddBtn = el("ppProducerAdd");
const producersListEl = el("ppProducers");

const castingNameEl = el("ppCastingName");
const castingAddBtn = el("ppCastingAdd");
const castingListEl = el("ppCastingAgencies");

const rentEqNameEl = el("ppRentEqName");
const rentEqAddBtn = el("ppRentEqAdd");
const rentEqListEl = el("ppRentEquipment");

const rentTrNameEl = el("ppRentTrName");
const rentTrAddBtn = el("ppRentTrAdd");
const rentTrListEl = el("ppRentTransport");

const cateringNameEl = el("ppCateringName");
const cateringAddBtn = el("ppCateringAdd");
const cateringListEl = el("ppCatering");

const shootStartEl = el("ppShootStart");
const shootEndEl = el("ppShootEnd");
const shootScenesEl = el("ppShootScenes");
const shootAddBtn = el("ppShootAdd");
const shootingPeriodsListEl = el("ppShootingPeriods");

const sponsorsGroupHead = el("ppSponsorsGroupHead");
const sponsorsGroupBody = el("ppSponsorsGroupBody");
const sponsorsGroupCount = el("ppSponsorsGroupCount");
const sponsorsGroupChev = el("ppSponsorsGroupChev");

const producersGroupHead = el("ppProducersGroupHead");
const producersGroupBody = el("ppProducersGroupBody");
const producersGroupCount = el("ppProducersGroupCount");
const producersGroupChev = el("ppProducersGroupChev");

const castingGroupHead = el("ppCastingGroupHead");
const castingGroupBody = el("ppCastingGroupBody");
const castingGroupCount = el("ppCastingGroupCount");
const castingGroupChev = el("ppCastingGroupChev");

const rentEqGroupHead = el("ppRentEqGroupHead");
const rentEqGroupBody = el("ppRentEqGroupBody");
const rentEqGroupCount = el("ppRentEqGroupCount");
const rentEqGroupChev = el("ppRentEqGroupChev");

const rentTrGroupHead = el("ppRentTrGroupHead");
const rentTrGroupBody = el("ppRentTrGroupBody");
const rentTrGroupCount = el("ppRentTrGroupCount");
const rentTrGroupChev = el("ppRentTrGroupChev");

const cateringGroupHead = el("ppCateringGroupHead");
const cateringGroupBody = el("ppCateringGroupBody");
const cateringGroupCount = el("ppCateringGroupCount");
const cateringGroupChev = el("ppCateringGroupChev");

const shootGroupHead = el("ppShootGroupHead");
const shootGroupBody = el("ppShootGroupBody");
const shootGroupCount = el("ppShootGroupCount");
const shootGroupChev = el("ppShootGroupChev");

const clearBtn3 = el("ppClear3");
const toHomeBtn3 = el("ppToHome3");
const nextBtn3 = el("ppNext3");
const prevBtn3 = el("ppPrev3");

  // Step 4 fields (documento)
  const docPreviewEl = el("ppDocPreview");
  const saveDocBtn = el("ppSaveDoc");
  const shareDocBtn = el("ppShareDoc");
  const clearBtn4 = el("ppClear4");
  const prevBtn4 = el("ppPrev4");
  const toHomeBtn4 = el("ppToHome4");

  const docDialog = el("ppDocDialog");
  const docDialogClose = el("ppDocDialogClose");
  const zoomAreaEl = el("ppDocZoomArea");
  const zoomInBtn = el("ppZoomIn");
  const zoomOutBtn = el("ppZoomOut");
  const zoomResetBtn = el("ppZoomReset");

  // If Step 2 elements are not present (older HTML), we still let Step 1 work.
  const hasStep2 = !!(crewWrap && eqWrap && prevBtn2 && nextBtn2);
  const hasStep3 = !!(sponsorNameEl && sponsorAddBtn && sponsorsListEl && nextBtn3);
  const hasStep4 = !!(docPreviewEl && saveDocBtn && prevBtn4);

function canCreateNewSavedPlan() {
  return true;
}

function refreshPremiumActionLabels() {
  if (ppSavePlanBtn) {
    ppSavePlanBtn.title = "Salva PdP";
  }
  if (ppListBtn) {
    ppListBtn.title = "Archivio";
  }
  if (saveDocBtn) {
    saveDocBtn.title = "Salva documento";
  }
  if (shareDocBtn) {
    shareDocBtn.title = "Condividi";
  }
}

  // Data (provvisoria, ampliabile più avanti)
  const CREW_CATEGORIES = [
    { name: "Regia", items: ["Regista", "Aiuto regia", "Regista 2° unità", "2° aiuto regista", "Assistente alla regia", "2° assistente alla regia", "Segretaria di edizione", "Supervisore sceneggiatura", "Ciakista", "Traduttore"] },
    { name: "Scrittura", items: ["Soggettista", "Sceneggiatore", "Dialoghista"] },
    { name: "Produzione", items: ["Produttore", "Produttore esecutivo", "Ispettore di produzione", "Amministrazione", "Responsabile casting", "Responsabile location", "Responsabile catering", "Responsabile trasporti", "Autista", "Runner"] },
    { name: "Video / Riprese", items: ["Direttore della fotografia (DoP)", "Assistente DoP", "Operatore camera", "Assistente camera", "Operatore 2° unità", "Fuochista", "Operatore steadycam", "Assistente steadycam", "Drone operator", "Data manager", "Fotografo di scena", "Runner"] },
    { name: "Luci", items: ["Elettricista", "Aiuto elettricista", "Macchinista", "Aiuto macchinista", "Runner"] },
    { name: "Audio", items: ["Fonico presa diretta", "Boom operator", "Assistente audio", "Compositore", "Effettista sonoro"] },
    { name: "Scenografia", items: ["Scenografo", "Assistente scenografo", "Arredatore", "Attrezzista", "Manovale", "Factotum", "Runner"] },
    { name: "Costumi / Trucco", items: ["Costumista", "Sarto", "Trucco e Parrucco", "Assistente trucco / parrucco", "Make Up SFX", "Assistente Make Up SFX"] },
    { name: "Stunt / Sicurezza", items: ["Capo stunt", "Stunt", "Acrobata", "Responsabile sicurezza", "Assistente sicurezza"] },
    { name: "SFX sul set", items: ["Responsabile effetti speciali", "Assistente effetti speciali", "Armaiolo", "Runner"] },
    { name: "Montaggio", items: ["Montatore", "Aiuto/segretario montatore", "Assistente montaggio", "Colorist", "Mixaggio audio", "Trailer artist", "Grafico"] },
  ];

  const EQUIPMENT_CATEGORIES = [
    { name: "Video", items: ["Telecamera", "Macchina fotografica", "Cavalletto", "Lenti zoom", "Lenti fisse", "Lenti anamorfiche", "Filtro ND", "Batterie", "Caricabatterie", "Schede memoria", "Ciak", "Monitor esterno", "Paraluce monitor", "Cavo monitor", "Recorder esterno", "Panno pulizie lenti", "Soffietto"] },
    { name: "Video extra / supporti", items: ["Drone", "GoPro", "Webcam", "Lente Macro", "Lente tele", "Split lens", "Adattatore lenti/camera", "Follow focus", "Gimbal", "Steadicam", "Fly-cam", "Slider", "Carrello", "Monopiede", "Ruote per cavalletto"] },
    { name: "Audio", items: ["Microfono shotgun", "Microfono wireless", "Asta Boom", "Antivento/Gatto morto", "Registratore audio", "Cuffie", "Cavi XLR", "Cavi Jack", "Adattatori XLR / Jack", "Pile / batterie"] },
    { name: "Luci", items: ["Luci 800W", "Fresnel 300W", "Fresnel 650W", "Fresnel 1000W", "Pannelli LED grandi", "Pannelli LED piccoli", "Alimentatori LED", "Stativi", "Diffusore", "Polistiroli", "Frost", "Gelatine", "Prolunghe/ciabatte", "Morsetti/Pinze"] },
    { name: "Attrezzi", items: ["Fascette", "Elastici", "Mollette legno", "Nastro carta", "Nastro da elettricista", "Nastro biadesivo", "Velcro", "Forbici", "Penne / Pennarelli", "Gessetti", "Torcia", "Metro", "Guanti", "Brugole", "Set cacciaviti", "Sacchi sabbia", "Powerbank", "Teli neri", ] },

    { name: "Varie", items: ["Teli per pioggia", "Kit pronto soccorso", "Estintore", "Tavolo pieghevole", "Ombrello", "Walkie-talkie"] },
  ];

  let state = emptyState();
  let dirty = false;
  let currentStep = 1;

  // Salvataggi multipli PdP
  let currentPlanId = null;
  let currentPlanName = "";

  function emptyState() {
    return {
      // Step 1
      title: "",
      synopsis: "",
      subject: "",
      scriptPlanned: false,
      type: "",
      characters: [],      // [{id,name}]
      environments: [],    // [{id,name,scene}]

      // Step 2
      crewSelected: [],    // ["Regista", ...]
      crewCustom: [],      // ["Drone operator", ...]
      equipment: {},       // {"Telecamera": 1, ...}
      equipmentCustom: [], // ["Drone", ...]

      // Step 3
      sponsors: [],
      producers: [],
      castingAgencies: [],
      rentalEquipment: [],
      rentalTransport: [],
      catering: [],
      shootingPeriods: [], // [{id,start,end,scenes}]

      // UI (non critico, ma utile per ricordare sezioni aperte/chiuse)
      ui: {
        crewOpen: {},
        eqOpen: {},
        step1Open: {
          characters: true,
          environments: true,
        },
        step3Open: {
          sponsors: true,
          producers: true,
          casting: true,
          rentalEquipment: true,
          rentalTransport: true,
          catering: true,
          shootingPeriods: true,
        },
      },
    };
  }

  function uid() {
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
  }

  function isMeaningful(s) {
    return String(s || "").trim().length > 0;
  }

  function hasAnyData(st) {
    return (
      isMeaningful(st.title) ||
      isMeaningful(st.synopsis) ||
      isMeaningful(st.subject) ||
      st.scriptPlanned ||
      isMeaningful(st.type) ||
      (st.characters?.length || 0) > 0 ||
      (st.environments?.length || 0) > 0 ||
      (st.crewSelected?.length || 0) > 0 ||
      (st.crewCustom?.length || 0) > 0 ||
      Object.keys(st.equipment || {}).length > 0 ||
      (st.equipmentCustom?.length || 0) > 0 ||
      (st.sponsors?.length || 0) > 0 ||
      (st.producers?.length || 0) > 0 ||
      (st.castingAgencies?.length || 0) > 0 ||
      (st.rentalEquipment?.length || 0) > 0 ||
      (st.rentalTransport?.length || 0) > 0 ||
      (st.catering?.length || 0) > 0 ||
      (st.shootingPeriods?.length || 0) > 0
    );
  }

  function saveDraft() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
      dirty = true;
    } catch {}
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (!obj || typeof obj !== "object") return null;

      return {
        ...emptyState(),
        ...obj,
        characters: Array.isArray(obj.characters)
          ? obj.characters.map(c => ({
              id: c && typeof c === "object" ? String(c.id || uid()) : uid(),
              name: c && typeof c === "object" ? String(c.name || "").trim() : String(c || "").trim(),
              actor: c && typeof c === "object" ? String(c.actor || "").trim() : "",
            }))
          : [],
        environments: Array.isArray(obj.environments) ? obj.environments : [],
        crewSelected: Array.isArray(obj.crewSelected) ? obj.crewSelected : [],
        crewCustom: Array.isArray(obj.crewCustom) ? obj.crewCustom : [],
        crewNames: obj.crewNames && typeof obj.crewNames === "object" ? obj.crewNames : {},
        equipment: obj.equipment && typeof obj.equipment === "object" ? obj.equipment : {},
        equipmentCustom: Array.isArray(obj.equipmentCustom) ? obj.equipmentCustom : [],
        sponsors: Array.isArray(obj.sponsors) ? obj.sponsors : [],
        producers: Array.isArray(obj.producers) ? obj.producers : [],
        castingAgencies: Array.isArray(obj.castingAgencies) ? obj.castingAgencies : [],
        rentalEquipment: Array.isArray(obj.rentalEquipment) ? obj.rentalEquipment : [],
        rentalTransport: Array.isArray(obj.rentalTransport) ? obj.rentalTransport : [],
        catering: Array.isArray(obj.catering) ? obj.catering : [],
        shootingPeriods: Array.isArray(obj.shootingPeriods)
          ? obj.shootingPeriods.map(item => ({
              id: item && typeof item === "object" ? String(item.id || uid()) : uid(),
              start: item && typeof item === "object" ? String(item.start || "").trim() : "",
              end: item && typeof item === "object" ? String(item.end || "").trim() : "",
              scenes: item && typeof item === "object" ? String(item.scenes || "").trim() : "",
            })).filter(item => item.start)
          : [],
        ui: obj.ui && typeof obj.ui === "object" ? {
          crewOpen: obj.ui.crewOpen && typeof obj.ui.crewOpen === "object" ? obj.ui.crewOpen : {},
          eqOpen: obj.ui.eqOpen && typeof obj.ui.eqOpen === "object" ? obj.ui.eqOpen : {},
          step1Open: obj.ui.step1Open && typeof obj.ui.step1Open === "object" ? {
            characters: obj.ui.step1Open.characters !== undefined ? !!obj.ui.step1Open.characters : true,
            environments: obj.ui.step1Open.environments !== undefined ? !!obj.ui.step1Open.environments : true,
          } : {
            characters: true,
            environments: true,
          },
          step3Open: obj.ui.step3Open && typeof obj.ui.step3Open === "object" ? {
            sponsors: obj.ui.step3Open.sponsors !== undefined ? !!obj.ui.step3Open.sponsors : true,
            producers: obj.ui.step3Open.producers !== undefined ? !!obj.ui.step3Open.producers : true,
            casting: obj.ui.step3Open.casting !== undefined ? !!obj.ui.step3Open.casting : true,
            rentalEquipment: obj.ui.step3Open.rentalEquipment !== undefined ? !!obj.ui.step3Open.rentalEquipment : true,
            rentalTransport: obj.ui.step3Open.rentalTransport !== undefined ? !!obj.ui.step3Open.rentalTransport : true,
            catering: obj.ui.step3Open.catering !== undefined ? !!obj.ui.step3Open.catering : true,
            shootingPeriods: obj.ui.step3Open.shootingPeriods !== undefined ? !!obj.ui.step3Open.shootingPeriods : true,
          } : {
            sponsors: true,
            producers: true,
            casting: true,
            rentalEquipment: true,
            rentalTransport: true,
            catering: true,
            shootingPeriods: true,
          },
        } : {
          crewOpen: {},
          eqOpen: {},
          step1Open: {
            characters: true,
            environments: true,
          },
          step3Open: {
            sponsors: true,
            producers: true,
            casting: true,
            rentalEquipment: true,
            rentalTransport: true,
            catering: true,
            shootingPeriods: true,
          },
        },
      };
    } catch {
      return null;
    }
  }

  function clearDraftStorage() {
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
  }

  function openWizard() {
    ppHome.hidden = true;
    ppWizard.hidden = false;
    updateHeaderTitle();
  }

  function closeWizardToHome(force = false) {
    if (!force && dirty && hasAnyData(state)) {
      const ok = confirm("Tornando al Menu principale, questa bozza potrebbe andare persa se non salvata. Vuoi continuare?");
      if (!ok) return;
    }
    ppWizard.hidden = true;
    ppHome.hidden = false;
    updateHeaderTitle();
  }

  function setCount(elCount, elField, max) {
    if (!elCount || !elField) return;
    const n = (elField.value || "").length;
    elCount.textContent = `${n}/${max}`;
  }

  function syncCounts() {
    setCount(titleCount, titleEl, 80);
    setCount(synopsisCount, synopsisEl, 280);
    setCount(subjectCount, subjectEl, 1200);
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // ─────────────────────────────
  // Rendering Step 1 lists
  // ─────────────────────────────
  function renderChars() {
    if (!charsListEl) return;

    const items = state.characters || [];
    syncStep1Groups();
    if (items.length === 0) {
      charsListEl.classList.remove("muted");
      charsListEl.innerHTML = "";
      charsListEl.hidden = true;
      return;
    }

    charsListEl.classList.remove("muted");
    charsListEl.hidden = false;
    charsListEl.innerHTML = "";
    items.forEach((c, idx) => {
      const row = document.createElement("div");
      row.className = "ppRow";
      row.innerHTML = `
        <div class="ppRow__main ppRow__main--wide">
          <div class="ppRow__title">${escapeHtml(String(c.name || ""))}</div>
          <input class="ppActorInput" type="text" placeholder="Aggiungi Attore" value="${escapeHtml(String(c.actor || ""))}" />
        </div>
        <div class="ppRow__actions">
          <button class="ppMini" type="button" data-act="up">Su</button>
          <button class="ppMini" type="button" data-act="down">Giù</button>
          <button class="ppMini" type="button" data-act="remove">Rimuovi</button>
        </div>
      `;

      row.querySelector('[data-act="up"]').addEventListener("click", () => {
        if (idx === 0) return;
        const arr = [...state.characters];
        [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
        state.characters = arr;
        saveDraft();
        renderChars();
      });

      row.querySelector('[data-act="down"]').addEventListener("click", () => {
        if (idx >= items.length - 1) return;
        const arr = [...state.characters];
        [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
        state.characters = arr;
        saveDraft();
        renderChars();
      });

      const actorInput = row.querySelector(".ppActorInput");
      if (actorInput) {
        actorInput.addEventListener("input", () => {
          const v = String(actorInput.value || "").trim();
          state.characters = (state.characters || []).map(x => x.id === c.id ? { ...x, actor: v } : x);
          saveDraft();
        });
      }

      row.querySelector('[data-act="remove"]').addEventListener("click", () => {
        state.characters = state.characters.filter(x => x.id !== c.id);
        saveDraft();
        renderChars();
      });

      charsListEl.appendChild(row);
    });
  }

  function renderEnvs() {
    if (!envsListEl) return;

    const items = state.environments || [];
    syncStep1Groups();
    if (items.length === 0) {
      envsListEl.classList.remove("muted");
      envsListEl.innerHTML = "";
      envsListEl.hidden = true;
      return;
    }

    envsListEl.classList.remove("muted");
    envsListEl.hidden = false;
    envsListEl.innerHTML = "";
    items.forEach((e, idx) => {
      const label = e.scene ? `${e.name} — Scena ${e.scene}` : e.name;
      const row = document.createElement("div");
      row.className = "ppRow";
      row.innerHTML = `
        <div class="ppRow__main">
          <div class="ppRow__title">${escapeHtml(label)}</div>
        </div>
        <div class="ppRow__actions">
          <button class="ppMini" type="button" data-act="up">Su</button>
          <button class="ppMini" type="button" data-act="down">Giù</button>
          <button class="ppMini" type="button" data-act="remove">Rimuovi</button>
        </div>
      `;

      row.querySelector('[data-act="up"]').addEventListener("click", () => {
        if (idx === 0) return;
        const arr = [...state.environments];
        [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
        state.environments = arr;
        saveDraft();
        renderEnvs();
      });

      row.querySelector('[data-act="down"]').addEventListener("click", () => {
        if (idx >= items.length - 1) return;
        const arr = [...state.environments];
        [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
        state.environments = arr;
        saveDraft();
        renderEnvs();
      });

      row.querySelector('[data-act="remove"]').addEventListener("click", () => {
        state.environments = state.environments.filter(x => x.id !== e.id);
        saveDraft();
        renderEnvs();
      });

      envsListEl.appendChild(row);
    });
  }

  
  function ensureUiState(target = state) {
    if (!target.ui || typeof target.ui !== "object") target.ui = {};
    if (!target.ui.crewOpen || typeof target.ui.crewOpen !== "object") target.ui.crewOpen = {};
    if (!target.ui.eqOpen || typeof target.ui.eqOpen !== "object") target.ui.eqOpen = {};
    if (!target.ui.step1Open || typeof target.ui.step1Open !== "object") target.ui.step1Open = {};
    if (target.ui.step1Open.characters === undefined) target.ui.step1Open.characters = true;
    if (target.ui.step1Open.environments === undefined) target.ui.step1Open.environments = true;
    if (!target.ui.step3Open || typeof target.ui.step3Open !== "object") target.ui.step3Open = {};
    if (target.ui.step3Open.sponsors === undefined) target.ui.step3Open.sponsors = true;
    if (target.ui.step3Open.producers === undefined) target.ui.step3Open.producers = true;
    if (target.ui.step3Open.casting === undefined) target.ui.step3Open.casting = true;
    if (target.ui.step3Open.rentalEquipment === undefined) target.ui.step3Open.rentalEquipment = true;
    if (target.ui.step3Open.rentalTransport === undefined) target.ui.step3Open.rentalTransport = true;
    if (target.ui.step3Open.catering === undefined) target.ui.step3Open.catering = true;
    if (target.ui.step3Open.shootingPeriods === undefined) target.ui.step3Open.shootingPeriods = true;
    return target.ui;
  }

  function isStep1GroupOpen(key, defaultOpen = true) {
    const ui = ensureUiState();
    const store = ui.step1Open;
    const groupKey = String(key || "");
    if (store[groupKey] === undefined) store[groupKey] = !!defaultOpen;
    return !!store[groupKey];
  }

  function setStep1GroupOpen(key, open) {
    const ui = ensureUiState();
    ui.step1Open[String(key || "")] = !!open;
    saveDraft();
  }

  function syncStep1Groups() {
    const charactersCount = Array.isArray(state.characters) ? state.characters.length : 0;
    const environmentsCount = Array.isArray(state.environments) ? state.environments.length : 0;

    const charactersOpen = isStep1GroupOpen("characters", true);
    const environmentsOpen = isStep1GroupOpen("environments", true);

    if (charsGroupCount) charsGroupCount.textContent = String(charactersCount);
    if (charsGroupBody) charsGroupBody.hidden = !charactersOpen;
    if (charsGroupHead) charsGroupHead.setAttribute("aria-expanded", charactersOpen ? "true" : "false");
    if (charsGroupChev) charsGroupChev.textContent = charactersOpen ? "▲" : "▼";

    if (envsGroupCount) envsGroupCount.textContent = String(environmentsCount);
    if (envsGroupBody) envsGroupBody.hidden = !environmentsOpen;
    if (envsGroupHead) envsGroupHead.setAttribute("aria-expanded", environmentsOpen ? "true" : "false");
    if (envsGroupChev) envsGroupChev.textContent = environmentsOpen ? "▲" : "▼";
  }

  function isStep3GroupOpen(key, defaultOpen = true) {
    const ui = ensureUiState();
    const store = ui.step3Open;
    const groupKey = String(key || "");
    if (store[groupKey] === undefined) store[groupKey] = !!defaultOpen;
    return !!store[groupKey];
  }

  function setStep3GroupOpen(key, open) {
    const ui = ensureUiState();
    ui.step3Open[String(key || "")] = !!open;
    saveDraft();
  }

  function syncStep3Groups() {
    const counts = {
      sponsors: Array.isArray(state.sponsors) ? state.sponsors.filter(Boolean).length : 0,
      producers: Array.isArray(state.producers) ? state.producers.filter(Boolean).length : 0,
      casting: Array.isArray(state.castingAgencies) ? state.castingAgencies.filter(Boolean).length : 0,
      rentalEquipment: Array.isArray(state.rentalEquipment) ? state.rentalEquipment.filter(Boolean).length : 0,
      rentalTransport: Array.isArray(state.rentalTransport) ? state.rentalTransport.filter(Boolean).length : 0,
      catering: Array.isArray(state.catering) ? state.catering.filter(Boolean).length : 0,
      shootingPeriods: Array.isArray(state.shootingPeriods) ? state.shootingPeriods.filter(item => item && item.start).length : 0,
    };

    const groups = [
      ["sponsors", sponsorsGroupHead, sponsorsGroupBody, sponsorsGroupCount, sponsorsGroupChev],
      ["producers", producersGroupHead, producersGroupBody, producersGroupCount, producersGroupChev],
      ["casting", castingGroupHead, castingGroupBody, castingGroupCount, castingGroupChev],
      ["rentalEquipment", rentEqGroupHead, rentEqGroupBody, rentEqGroupCount, rentEqGroupChev],
      ["rentalTransport", rentTrGroupHead, rentTrGroupBody, rentTrGroupCount, rentTrGroupChev],
      ["catering", cateringGroupHead, cateringGroupBody, cateringGroupCount, cateringGroupChev],
      ["shootingPeriods", shootGroupHead, shootGroupBody, shootGroupCount, shootGroupChev],
    ];

    groups.forEach(([key, head, body, countEl, chevEl]) => {
      const open = isStep3GroupOpen(key, true);
      if (countEl) countEl.textContent = String(counts[key] || 0);
      if (body) body.hidden = !open;
      if (head) head.setAttribute("aria-expanded", open ? "true" : "false");
      if (chevEl) chevEl.textContent = open ? "▲" : "▼";
    });
  }

  function isCatOpen(kind, name, defaultOpen = false) {
    const ui = ensureUiState();
    const store = kind === "crew" ? ui.crewOpen : ui.eqOpen;
    const key = String(name || "");
    if (store[key] === undefined) store[key] = defaultOpen;
    return !!store[key];
  }

  function setCatOpen(kind, name, open) {
    const ui = ensureUiState();
    const store = kind === "crew" ? ui.crewOpen : ui.eqOpen;
    store[String(name || "")] = !!open;
    saveDraft();
  }


  function bumpEquipment(item, delta) {
    const name = String(item || "").trim();
    if (!name) return;

    if (!state.equipment || typeof state.equipment !== "object") state.equipment = {};
    const curr = Number(state.equipment[name] || 0);
    const next = Math.max(0, Math.min(99, curr + Number(delta || 0)));

    if (next === 0) delete state.equipment[name];
    else state.equipment[name] = next;

    saveDraft();
    renderEquipment();
  }

// ─────────────────────────────
  // Rendering Step 2
  // ─────────────────────────────
  
  function renderCrew() {
    if (!hasStep2 || !crewWrap) return;

    crewWrap.innerHTML = "";

    const allCats = [...CREW_CATEGORIES];
    if ((state.crewCustom || []).length > 0) {
      allCats.push({ name: "Personalizzati", items: [...state.crewCustom] });
    }

    allCats.forEach((cat, idxCat) => {
      const box = document.createElement("div");
      box.className = "ppGroup";

      const open = isCatOpen("crew", cat.name, false);
      const countSel = (cat.items || []).filter(r => (state.crewSelected || []).includes(r)).length;

      const head = document.createElement("button");
      head.type = "button";
      head.className = "ppGroup__head";
      head.setAttribute("aria-expanded", open ? "true" : "false");
      head.innerHTML = `
        <div class="ppGroup__title">${escapeHtml(cat.name)}</div>
        <div class="ppGroup__right">
          <span class="ppGroup__count">${countSel}</span>
          <span class="ppGroup__chev">${open ? "▲" : "▼"}</span>
        </div>
      `;

      const body = document.createElement("div");
      body.className = "ppGroup__body";
      body.hidden = !open;

      head.addEventListener("click", () => {
        const next = body.hidden; // hidden -> open
        body.hidden = !next;
        head.setAttribute("aria-expanded", next ? "true" : "false");
        head.querySelector(".ppGroup__chev").textContent = next ? "▲" : "▼";
        setCatOpen("crew", cat.name, next);
      });

      (cat.items || []).forEach(role => {
        const id = `crew_${cat.name}_${role}`.replaceAll(/\s+/g, "_");
        const row = document.createElement("label");
        row.className = "ppCheck";

        const checked = (state.crewSelected || []).includes(role);
        const savedName = String((state.crewNames || {})[role] || "").trim();

        row.innerHTML = `
          <input type="checkbox" id="${escapeHtml(id)}" ${checked ? "checked" : ""} />
          <span class="ppCheck__label">${escapeHtml(role)}</span>
          <input class="ppNameInput" type="text" placeholder="Aggiungi Nome" value="${escapeHtml(savedName)}" ${checked ? "" : "hidden"} />
        `;

        const cb = row.querySelector('input[type="checkbox"]');
        const nameInput = row.querySelector(".ppNameInput");

        cb.addEventListener("change", (e) => {
          const on = e.target.checked;
          const set = new Set(state.crewSelected || []);
          if (on) set.add(role); else set.delete(role);
          state.crewSelected = Array.from(set);

          // Mostra/nascondi input nome
          if (nameInput) {
            nameInput.hidden = !on;
            if (!on) {
              if (state.crewNames && typeof state.crewNames === "object") delete state.crewNames[role];
              nameInput.value = "";
            } else {
              nameInput.focus();
            }
          }

          saveDraft();

          const newCount = (cat.items || []).filter(r => (state.crewSelected || []).includes(r)).length;
          head.querySelector(".ppGroup__count").textContent = String(newCount);
        });

        if (nameInput) {
          nameInput.addEventListener("input", () => {
            if (!state.crewNames || typeof state.crewNames !== "object") state.crewNames = {};
            const v = String(nameInput.value || "").trim();
            if (v) state.crewNames[role] = v;
            else delete state.crewNames[role];
            saveDraft();
          });
        }

        body.appendChild(row);
      });

      box.appendChild(head);
      box.appendChild(body);
      crewWrap.appendChild(box);
    });
  }


function renderEquipment() {
    if (!hasStep2 || !eqWrap) return;

    eqWrap.innerHTML = "";

    const cats = [...EQUIPMENT_CATEGORIES];
    if ((state.equipmentCustom || []).length > 0) {
      cats.push({ name: "Personalizzati", items: [...state.equipmentCustom] });
    }

    cats.forEach((cat, idxCat) => {
      const box = document.createElement("div");
      box.className = "ppGroup";

      const open = isCatOpen("eq", cat.name, false);
      const countSel = (cat.items || []).reduce((acc, item) => acc + (Number((state.equipment || {})[item] || 0) > 0 ? 1 : 0), 0);

      const head = document.createElement("button");
      head.type = "button";
      head.className = "ppGroup__head";
      head.setAttribute("aria-expanded", open ? "true" : "false");
      head.innerHTML = `
        <div class="ppGroup__title">${escapeHtml(cat.name)}</div>
        <div class="ppGroup__right">
          <span class="ppGroup__count">${countSel}</span>
          <span class="ppGroup__chev">${open ? "▲" : "▼"}</span>
        </div>
      `;

      const body = document.createElement("div");
      body.className = "ppGroup__body";
      body.hidden = !open;

      head.addEventListener("click", () => {
        const next = body.hidden;
        body.hidden = !next;
        head.setAttribute("aria-expanded", next ? "true" : "false");
        head.querySelector(".ppGroup__chev").textContent = next ? "▲" : "▼";
        setCatOpen("eq", cat.name, next);
      });

      (cat.items || []).forEach(item => {
        const qty = Number((state.equipment || {})[item] || 0);

        const row = document.createElement("div");
        row.className = "ppEqRow";
        row.innerHTML = `
          <div class="ppEqName">${escapeHtml(item)}</div>
          <div class="ppEqCtrls">
            <button class="ppMini" type="button" data-act="minus">−</button>
            <div class="ppQty" aria-label="Quantità">${qty}</div>
            <button class="ppMini" type="button" data-act="plus">+</button>
          </div>
        `;
        const updateCount = () => {
          const newCount = (cat.items || []).reduce((acc, it) => acc + (Number((state.equipment || {})[it] || 0) > 0 ? 1 : 0), 0);
          head.querySelector(".ppGroup__count").textContent = String(newCount);
        };
        row.querySelector('[data-act="minus"]').addEventListener("click", () => { bumpEquipment(item, -1); updateCount(); });
        row.querySelector('[data-act="plus"]').addEventListener("click", () => { bumpEquipment(item, +1); updateCount(); });

        body.appendChild(row);
      });

      box.appendChild(head);
      box.appendChild(body);
      eqWrap.appendChild(box);
    });
  }

  function addCustomCrew() {
    const name = prompt("Nome ruolo (es. Drone operator):");
    if (!name) return;
    const v = name.trim();
    if (!v) return;

    const list = new Set(state.crewCustom || []);
    list.add(v);
    state.crewCustom = Array.from(list);
    // opzionale: seleziona subito
    const sel = new Set(state.crewSelected || []);
    sel.add(v);
    state.crewSelected = Array.from(sel);

    saveDraft();
    renderCrew();
  }

  function addCustomEquipment() {
    const name = prompt("Nome attrezzo (es. Drone):");
    if (!name) return;
    const v = name.trim();
    if (!v) return;

    const list = new Set(state.equipmentCustom || []);
    list.add(v);
    state.equipmentCustom = Array.from(list);

    // impostiamo quantità 1
    const eq = { ...(state.equipment || {}) };
    if (!eq[v]) eq[v] = 1;
    state.equipment = eq;

    saveDraft();
    renderEquipment();
  }

  // ─────────────────────────────
  
// ─────────────────────────────
// Rendering Step 3 (liste testuali)
// ─────────────────────────────
function renderTextList(key, listEl) {
  if (!listEl) return;

  const itemsRaw = Array.isArray(state[key]) ? state[key] : [];
  const items = itemsRaw
    .map(x => String(x || "").trim())
    .filter(Boolean);

  // normalizza e salva (evita "buchi" nella bozza)
  state[key] = itemsRaw.length === items.length ? itemsRaw : items;

  if (items.length === 0) {
    listEl.classList.remove("muted");
    listEl.innerHTML = "";
    listEl.hidden = true;
    syncStep3Groups();
    return;
  }

  listEl.classList.remove("muted");
  listEl.hidden = false;
  listEl.innerHTML = "";
  items.forEach((name, idx) => {
    const row = document.createElement("div");
    row.className = "ppRow";
    row.innerHTML = `
      <div class="ppRow__main">
        <div class="ppRow__title">${escapeHtml(name)}</div>
      </div>
      <div class="ppRow__actions">
        <button class="ppMini" type="button" data-act="remove" data-idx="${idx}">Rimuovi</button>
      </div>
    `;

    row.querySelector('[data-act="remove"]')?.addEventListener("click", () => {
      const arr = Array.isArray(state[key]) ? state[key] : [];
      state[key] = arr.filter((_, i) => i !== idx);
      saveDraft();
      renderStep3();
    });

    listEl.appendChild(row);
  });

  syncStep3Groups();
}

function formatDateLabel(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const date = new Date(`${raw}T00:00:00`);
  if (Number.isNaN(date.getTime())) return raw;
  try {
    return date.toLocaleDateString("it-IT");
  } catch {
    return raw;
  }
}

function shootingPeriodLabel(item) {
  if (!item || !item.start) return "";
  const start = formatDateLabel(item.start);
  const end = formatDateLabel(item.end);
  if (end && end !== start) return `${start} → ${end}`;
  return start;
}

function shootingPeriodSceneLabel(item) {
  const scenes = String(item?.scenes || "").trim();
  return scenes ? `Scene: ${scenes}` : "Scene non specificate.";
}

function renderShootingPeriods() {
  if (!shootingPeriodsListEl) return;

  const items = Array.isArray(state.shootingPeriods) ? state.shootingPeriods.filter(item => item && item.start) : [];
  state.shootingPeriods = items;

  if (items.length === 0) {
    shootingPeriodsListEl.classList.remove("muted");
    shootingPeriodsListEl.innerHTML = "";
    shootingPeriodsListEl.hidden = true;
    syncStep3Groups();
    return;
  }

  shootingPeriodsListEl.classList.remove("muted");
  shootingPeriodsListEl.hidden = false;
  shootingPeriodsListEl.innerHTML = "";

  items.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "ppRow";
    row.innerHTML = `
      <div class="ppRow__main">
        <div class="ppRow__title">${escapeHtml(shootingPeriodLabel(item))}</div>
        <div class="ppRow__meta">${escapeHtml(shootingPeriodSceneLabel(item))}</div>
      </div>
      <div class="ppRow__actions">
        <button class="ppMini" type="button" data-act="up">Su</button>
        <button class="ppMini" type="button" data-act="down">Giù</button>
        <button class="ppMini" type="button" data-act="remove">Rimuovi</button>
      </div>
    `;

    row.querySelector('[data-act="up"]')?.addEventListener("click", () => {
      if (idx === 0) return;
      const arr = [...state.shootingPeriods];
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
      state.shootingPeriods = arr;
      saveDraft();
      renderStep3();
    });

    row.querySelector('[data-act="down"]')?.addEventListener("click", () => {
      if (idx >= items.length - 1) return;
      const arr = [...state.shootingPeriods];
      [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
      state.shootingPeriods = arr;
      saveDraft();
      renderStep3();
    });

    row.querySelector('[data-act="remove"]')?.addEventListener("click", () => {
      state.shootingPeriods = state.shootingPeriods.filter((_, i) => i !== idx);
      saveDraft();
      renderStep3();
    });

    shootingPeriodsListEl.appendChild(row);
  });

  syncStep3Groups();
}

function addShootingPeriod() {
  if (!shootStartEl) return;

  const start = String(shootStartEl.value || "").trim();
  const end = String(shootEndEl?.value || "").trim();
  const scenes = String(shootScenesEl?.value || "").trim();

  if (!start) {
    shootStartEl.focus();
    return;
  }

  if (end && end < start) {
    alert("La data fine non può essere precedente alla data inizio.");
    if (shootEndEl) shootEndEl.focus();
    return;
  }

  state.shootingPeriods = [
    ...(Array.isArray(state.shootingPeriods) ? state.shootingPeriods : []),
    { id: uid(), start, end, scenes }
  ];

  shootStartEl.value = "";
  if (shootEndEl) shootEndEl.value = "";
  if (shootScenesEl) shootScenesEl.value = "";

  saveDraft();
  renderStep3();
}

  // ─────────────────────────────
  // Produzioni salvate (Elenco PdP)
  // ─────────────────────────────
  function loadPlans() {
    try {
      const raw = localStorage.getItem(SAVED_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  function savePlans(arr) {
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(Array.isArray(arr) ? arr : [])); } catch {}
  }

  function fmtWhen(ts) {
    try {
      const d = new Date(Number(ts || Date.now()));
      return d.toLocaleDateString("it-IT", { year: "numeric", month: "2-digit", day: "2-digit" }) + " " +
             d.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  }

  function normalizeName(name) {
    return String(name || "").trim().replaceAll(/\s+/g, " ");
  }

  function deepClone(obj) {
    try {
      if (typeof structuredClone === "function") return structuredClone(obj);
    } catch {}
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch {
      // fallback ultra-minimo
      return obj;
    }
  }


  function effectivePlanName() {
    const fromTitle = normalizeName(state.title);
    return fromTitle || "Senza titolo";
  }

  function updateHeaderTitle() {
    if (!headerTitleEl) return;

    const isHomeVisible = !!ppHome && !ppHome.hidden;
    if (isHomeVisible) {
      headerTitleEl.textContent = "Piano di Produzione";
      return;
    }

    const name = String(currentPlanName || "").trim();
    const title = String(state.title || "").trim();
    headerTitleEl.textContent = name || title || "Piano di Produzione";
  }

  function showToast(message) {
    const msg = String(message || "").trim();
    if (!msg) return;

    let host = document.getElementById("ppToastHost");
    if (!host) {
      host = document.createElement("div");
      host.id = "ppToastHost";
      host.style.position = "fixed";
      host.style.top = "14px";
      host.style.left = "50%";
      host.style.transform = "translateX(-50%)";
      host.style.zIndex = "9999";
      host.style.display = "flex";
      host.style.flexDirection = "column";
      host.style.gap = "8px";
      document.body.appendChild(host);
    }

    const t = document.createElement("div");
    t.textContent = msg;
    t.style.padding = "10px 12px";
    t.style.borderRadius = "14px";
    t.style.border = "1px solid var(--stroke)";
    t.style.background = "rgba(18,20,27,.92)";
    t.style.color = "var(--text)";
    t.style.boxShadow = "var(--shadow)";
    t.style.fontWeight = "800";
    t.style.backdropFilter = "blur(8px)";
    t.style.maxWidth = "92vw";

    host.appendChild(t);

    setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity 220ms ease"; }, 1600);
    setTimeout(() => { try { t.remove(); } catch {} }, 2000);
  }


  function openSaveDialog({ prefill = "", mode = "save", showSaveAsNew = false, currentName = "" } = {}) {
    // mode: "save" | "rename"
    return new Promise((resolve) => {
      if (!saveDialog || !saveNameEl || !saveConfirmBtn) {
        // fallback totale: vecchio prompt
        const v = prompt("Nome Produzione (PdP):", prefill || "");
        if (v === null) return resolve({ action: "cancel" });
        const name = normalizeName(v);
        return resolve({ action: "save", name: name || "Senza titolo", forceNew: false });
      }

      // setup UI
      saveNameEl.value = prefill || "";
      const normalizedCurrent = normalizeName(currentName || "");
      const title = mode === "rename" ? "Rinomina Produzione" : "Salva Piano di Produzione";
      const titleEl = document.getElementById("ppSaveTitle");
      if (titleEl) titleEl.textContent = title;

      if (saveInfoEl) {
        if (mode === "rename") {
          saveInfoEl.textContent = normalizedCurrent ? `Nome attuale: "${normalizedCurrent}"` : "";
        } else {
          saveInfoEl.textContent = normalizedCurrent ? `Stai modificando: "${normalizedCurrent}"` : "Scegli un nome per salvarlo nell’elenco.";
        }
      }

      if (saveAsNewBtn) saveAsNewBtn.hidden = !showSaveAsNew;

      // cleanup previous handlers
      const cleanup = () => {
        saveConfirmBtn.onclick = null;
        if (saveAsNewBtn) saveAsNewBtn.onclick = null;
        if (saveCancelBtn) saveCancelBtn.onclick = null;
        if (saveCloseBtn) saveCloseBtn.onclick = null;
        saveNameEl.onkeydown = null;
      };

      const close = () => {
        try { saveDialog.close(); } catch {}
      };

      const getName = () => {
        const name = normalizeName(saveNameEl.value);
        return name || "Senza titolo";
      };

      const resolveAndClose = (payload) => {
        cleanup();
        close();
        resolve(payload);
      };

      saveConfirmBtn.onclick = () => resolveAndClose({ action: "save", name: getName(), forceNew: false });
      if (saveAsNewBtn) saveAsNewBtn.onclick = () => resolveAndClose({ action: "save", name: getName(), forceNew: true });
      if (saveCancelBtn) saveCancelBtn.onclick = () => resolveAndClose({ action: "cancel" });
      if (saveCloseBtn) saveCloseBtn.onclick = () => resolveAndClose({ action: "cancel" });

      saveNameEl.onkeydown = (e) => {
        if (e.key === "Enter") { e.preventDefault(); saveConfirmBtn.click(); }
        if (e.key === "Escape") { e.preventDefault(); resolveAndClose({ action: "cancel" }); }
      };

      // click backdrop closes
      saveDialog.addEventListener("click", (e) => {
        const rect = saveDialog.getBoundingClientRect();
        const inX = e.clientX >= rect.left && e.clientX <= rect.right;
        const inY = e.clientY >= rect.top && e.clientY <= rect.bottom;
        if (!inX || !inY) resolveAndClose({ action: "cancel" });
      }, { once: true });

      if (typeof saveDialog.showModal === "function") saveDialog.showModal();
      else saveDialog.removeAttribute("hidden");
      setTimeout(() => saveNameEl.focus(), 30);
    });
  }



  function askPlanName(prefill) {
    const v = prompt("Nome Produzione (PdP):", prefill || "");
    if (v === null) return null;
    const name = normalizeName(v);
    return name || "Senza titolo";
  }

  function renderHomeSaved() {
    if (!savedListEl) return;
    const plans = loadPlans();
    if (!Array.isArray(plans) || plans.length === 0) {
      savedListEl.classList.add("muted");
      savedListEl.textContent = "Nessuna produzione salvata (ancora).";
      return;
    }
    const top = plans.slice(0, 5);
    savedListEl.classList.remove("muted");
    savedListEl.innerHTML = top.map(p => `
      <div class="ppRow">
        <div class="ppRow__main">
          <div class="ppRow__title">${escapeHtml(p.name || "Senza titolo")}</div>
          <div class="ppRow__meta">Aggiornato: ${escapeHtml(fmtWhen(p.updatedAt))}</div>
        </div>
        <div class="ppRow__actions">
          <button class="ppMini" type="button" data-open="${escapeHtml(p.id)}">Apri</button>
        </div>
      </div>
    `).join("");

    savedListEl.querySelectorAll("[data-open]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-open");
        openPlanById(id);
        openWizard();
      });
    });
  }

  function openPlansDialog() {
    if (!plansDialog) { alert("Elenco produzioni non disponibile in questa versione."); return; }
    renderPlansDialog();
    if (typeof plansDialog.showModal === "function") plansDialog.showModal();
    else plansDialog.removeAttribute("hidden");
  }

  function closePlansDialog() {
    if (!plansDialog) return;
    try { plansDialog.close(); } catch {}
  }

  // Click sul backdrop: chiude (comportamento “modal”)
  if (plansDialog) {
    plansDialog.addEventListener("click", (e) => {
      const rect = plansDialog.getBoundingClientRect();
      const inX = e.clientX >= rect.left && e.clientX <= rect.right;
      const inY = e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inX || !inY) closePlansDialog();
    });
  }


  function plansFilter(plans) {
    const q = normalizeName(plansSearchEl?.value || "").toLowerCase();
    const onlyFav = !!plansOnlyFavEl?.checked;
    return (Array.isArray(plans) ? plans : []).filter(p => {
      if (!p || typeof p !== "object") return false;
      if (onlyFav && !p.favorite) return false;
      if (!q) return true;
      return String(p.name || "").toLowerCase().includes(q);
    });
  }

  function renderPlansDialog() {
    if (!plansListEl) return;

    const plansAll = loadPlans();
    const plans = plansFilter(plansAll);

    if (plans.length === 0) {
      plansListEl.innerHTML = `<div class="muted">Nessuna produzione trovata.</div>`;
      return;
    }

    plansListEl.innerHTML = plans.map((p) => {
      const starClass = p.favorite ? "ppStar is-fav" : "ppStar";
      const tag = p.id === currentPlanId ? `<span class="ppPlanTag">Aperta</span>` : "";
      return `
        <div class="ppPlanItem" data-id="${escapeHtml(p.id)}">
          <div class="ppPlanTop">
            <div>
              <div class="ppPlanName">${escapeHtml(p.name || "Senza titolo")} ${tag}</div>
              <div class="ppPlanMeta">Aggiornato: ${escapeHtml(fmtWhen(p.updatedAt))} • Step ${escapeHtml(String(p.lastStep || 1))}/4</div>
            </div>

            <div class="ppPlanActions">
              <button class="${starClass}" type="button" data-act="fav" aria-label="Preferito">★</button>
              <button class="ppMini" type="button" data-act="open">Apri</button>
              <button class="ppMini" type="button" data-act="rename">Rinomina</button>
              <button class="ppMini" type="button" data-act="up">Su</button>
              <button class="ppMini" type="button" data-act="down">Giù</button>
              <button class="ppMini" type="button" data-act="delete">Elimina</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    plansListEl.querySelectorAll(".ppPlanItem").forEach(item => {
      const id = item.getAttribute("data-id");
      const btn = (act) => item.querySelector(`[data-act="${act}"]`);
      btn("fav")?.addEventListener("click", () => toggleFavorite(id));
      btn("open")?.addEventListener("click", () => { openPlanById(id); closePlansDialog(); openWizard(); });
      btn("rename")?.addEventListener("click", () => renamePlan(id));
      btn("delete")?.addEventListener("click", () => deletePlan(id));
      btn("up")?.addEventListener("click", () => movePlan(id, -1));
      btn("down")?.addEventListener("click", () => movePlan(id, +1));
    });
  }

  function openPlanById(id) {
    const plans = loadPlans();
    const p = plans.find(x => x && x.id === id);
    if (!p) return;

    state = { ...emptyState(), ...deepClone(p.data || {}) };
    state.characters = Array.isArray(state.characters) ? state.characters : [];
    state.environments = Array.isArray(state.environments) ? state.environments : [];
    state.crewSelected = Array.isArray(state.crewSelected) ? state.crewSelected : [];
    state.crewCustom = Array.isArray(state.crewCustom) ? state.crewCustom : [];
    state.crewNames = state.crewNames && typeof state.crewNames === "object" ? state.crewNames : {};
    state.equipment = state.equipment && typeof state.equipment === "object" ? state.equipment : {};
    state.equipmentCustom = Array.isArray(state.equipmentCustom) ? state.equipmentCustom : [];
    state.sponsors = Array.isArray(state.sponsors) ? state.sponsors : [];
    state.producers = Array.isArray(state.producers) ? state.producers : [];
    state.castingAgencies = Array.isArray(state.castingAgencies) ? state.castingAgencies : [];
    state.rentalEquipment = Array.isArray(state.rentalEquipment) ? state.rentalEquipment : [];
    state.rentalTransport = Array.isArray(state.rentalTransport) ? state.rentalTransport : [];
    state.catering = Array.isArray(state.catering) ? state.catering : [];
    state.shootingPeriods = Array.isArray(state.shootingPeriods)
      ? state.shootingPeriods.map(item => ({
          id: item && typeof item === "object" ? String(item.id || uid()) : uid(),
          start: item && typeof item === "object" ? String(item.start || "").trim() : "",
          end: item && typeof item === "object" ? String(item.end || "").trim() : "",
          scenes: item && typeof item === "object" ? String(item.scenes || "").trim() : "",
        })).filter(item => item.start)
      : [];
    ensureUiState(state);

    currentPlanId = p.id;
    currentPlanName = p.name || "";
    dirty = true;
    updateHeaderTitle();
    currentStep = Number(p.lastStep || 1) || 1;

    saveDraft();
    applyStateToUI();
    goToStep(currentStep);

    renderHomeSaved();
  }

  
  async function upsertPlan({ forceNew = false } = {}) {
    const prefill = currentPlanName || effectivePlanName();

    const isEditingExisting = !!currentPlanId && !forceNew;
    const showSaveAsNew = !!currentPlanId; // se stai lavorando su una produzione salvata, mostra "salva come nuova"

    const res = await openSaveDialog({
      prefill,
      mode: "save",
      showSaveAsNew,
      currentName: currentPlanName,
    });

    if (!res || res.action !== "save") return;

const canUpdateExistingPlan = !!currentPlanId && !forceNew && !res.forceNew;

    const name = res.name;
    const plans = loadPlans();
    const now = Date.now();
    const lastStep = currentStep;

    // Se l'utente preme "Salva come nuova"
    if (res.forceNew) {
      const id = `pdp_${now}_${Math.random().toString(16).slice(2)}`;
      const payload = { id, name, updatedAt: now, lastStep, favorite: false, data: deepClone(state) };
      plans.unshift(payload);
      savePlans(plans);
      currentPlanId = id;
      currentPlanName = name;
      updateHeaderTitle();
      renderHomeSaved();
      renderPlansDialog();
      showToast("PdP salvato come nuova produzione.");
      return;
    }

    // Update se stiamo editando una produzione esistente
    if (isEditingExisting) {
      const idx = plans.findIndex(p => p && p.id === currentPlanId);
      const payload = {
        ...(idx >= 0 ? plans[idx] : {}),
        id: currentPlanId,
        name,
        updatedAt: now,
        lastStep,
        favorite: (idx >= 0 ? !!plans[idx].favorite : false),
        data: deepClone(state),
      };
      if (idx >= 0) plans[idx] = payload;
      else plans.unshift(payload);

      savePlans(plans);
      currentPlanName = name;
      updateHeaderTitle();
      renderHomeSaved();
      renderPlansDialog();
      showToast("PdP aggiornato.");
      return;
    }

    // Nuovo PdP
    const id = `pdp_${now}_${Math.random().toString(16).slice(2)}`;
    const payload = { id, name, updatedAt: now, lastStep, favorite: false, data: deepClone(state) };
    plans.unshift(payload);
    savePlans(plans);
    currentPlanId = id;
    currentPlanName = name;
    updateHeaderTitle();
    renderHomeSaved();
    renderPlansDialog();
    showToast("PdP salvato nell’elenco.");
  }


  function deletePlan(id) {
    const plans = loadPlans();
    const p = plans.find(x => x && x.id === id);
    if (!p) return;
    const ok = confirm(`Eliminare definitivamente "${p.name || "Senza titolo"}"?`);
    if (!ok) return;
    const next = plans.filter(x => x && x.id !== id);
    savePlans(next);
    if (currentPlanId === id) { currentPlanId = null; currentPlanName = ""; }
    renderHomeSaved();
    renderPlansDialog();
  }

  
  async function renamePlan(id) {
    const plans = loadPlans();
    const idx = plans.findIndex(x => x && x.id === id);
    if (idx < 0) return;

    const old = plans[idx].name || "";
    const res = await openSaveDialog({
      prefill: old || "Senza titolo",
      mode: "rename",
      showSaveAsNew: false,
      currentName: old,
    });

    if (!res || res.action !== "save") return;
    const name = res.name;

    plans[idx] = { ...plans[idx], name, updatedAt: Date.now() };
    savePlans(plans);

    if (currentPlanId === id) { currentPlanName = name; updateHeaderTitle(); }
    renderHomeSaved();
    renderPlansDialog();
  }


  function toggleFavorite(id) {
    const plans = loadPlans();
    const idx = plans.findIndex(x => x && x.id === id);
    if (idx < 0) return;
    plans[idx] = { ...plans[idx], favorite: !plans[idx].favorite, updatedAt: Date.now() };
    savePlans(plans);
    renderHomeSaved();
    renderPlansDialog();
  }

  function movePlan(id, delta) {
    const plans = loadPlans();
    const idx = plans.findIndex(x => x && x.id === id);
    if (idx < 0) return;
    const j = idx + delta;
    if (j < 0 || j >= plans.length) return;
    const arr = [...plans];
    [arr[idx], arr[j]] = [arr[j], arr[idx]];
    savePlans(arr);
    renderHomeSaved();
    renderPlansDialog();
  }



function renderStep3() {
  renderTextList("sponsors", sponsorsListEl);
  renderTextList("producers", producersListEl);
  renderTextList("castingAgencies", castingListEl);
  renderTextList("rentalEquipment", rentEqListEl);
  renderTextList("rentalTransport", rentTrListEl);
  renderTextList("catering", cateringListEl);
  renderShootingPeriods();
  syncStep3Groups();
}


// ─────────────────────────────
// Rendering Step 4 (Documento)
// ─────────────────────────────
function fmtType(t) {
  const v = String(t || "").trim();
  if (!v) return "";
  return v.charAt(0).toUpperCase() + v.slice(1);
}

function fmtDateIt(d = new Date()) {
  try {
    return d.toLocaleDateString("it-IT", { year: "numeric", month: "2-digit", day: "2-digit" }) + " " +
           d.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

function listLines(arr) {
  return (Array.isArray(arr) ? arr : []).map(x => String(x || "").trim()).filter(Boolean);
}

function equipmentLines() {
  const eq = state.equipment && typeof state.equipment === "object" ? state.equipment : {};
  const entries = Object.entries(eq)
    .map(([k, v]) => ({ name: String(k), qty: Number(v || 0) }))
    .filter(x => x.qty > 0)
    .sort((a,b) => a.name.localeCompare(b.name, "it"));
  return entries.map(x => `${x.name} × ${x.qty}`);
}

function crewLines() {
  const roles = listLines(state.crewSelected);
  const names = state.crewNames && typeof state.crewNames === "object" ? state.crewNames : {};
  return roles.map(r => {
    const n = String(names[r] || "").trim();
    return n ? `${r} — ${n}` : `${r} — ____________________`;
  });
}


function charactersLines() {
  const items = Array.isArray(state.characters) ? state.characters : [];
  return items
    .map(x => {
      const n = String(x?.name || "").trim();
      const a = String(x?.actor || "").trim();
      if (!n) return "";
      return a ? `${n} — ${a}` : n;
    })
    .filter(Boolean);
}

function environmentsLines() {
  const items = Array.isArray(state.environments) ? state.environments : [];
  return items
    .map(x => {
      const n = String(x?.name || "").trim();
      const s = String(x?.scene || "").trim();
      if (!n) return "";
      return s ? `${n} — Scena ${s}` : n;
    })
    .filter(Boolean);
}

function shootingPeriodLines() {
  const items = Array.isArray(state.shootingPeriods) ? state.shootingPeriods : [];
  return items
    .filter(item => item && item.start)
    .map(item => {
      const dateLabel = shootingPeriodLabel(item);
      const scenes = String(item?.scenes || "").trim();
      return scenes ? `${dateLabel} — Scene ${scenes}` : dateLabel;
    });
}

function shouldUseSecondPage() {
  const partnersCount =
    listLines(state.sponsors).length +
    listLines(state.producers).length +
    listLines(state.castingAgencies).length +
    listLines(state.rentalEquipment).length +
    listLines(state.rentalTransport).length +
    listLines(state.catering).length +
    shootingPeriodLines().length;

  const opsCount =
    crewLines().length +
    equipmentLines().length +
    charactersLines().length +
    environmentsLines().length;

  if (partnersCount > 10) return true;
  if (opsCount > 26) return true;
  if (String(state.subject || "").length > 900) return true;
  return partnersCount > 0;
}

function docSectionTitle(title) {
  return `<div class="ppDocSectionTitle">${escapeHtml(title)}</div>`;
}

function docKV(k, v) {
  const val = isMeaningful(v) ? escapeHtml(v) : "—";
  return `<div class="ppDocKV"><div class="ppDocK">${escapeHtml(k)}</div><div class="ppDocV">${val}</div></div>`;
}

function docList(lines, emptyText="—") {
  const arr = Array.isArray(lines) ? lines : [];
  if (arr.length === 0) return `<div class="ppDocText">${escapeHtml(emptyText)}</div>`;
  return `<div class="ppDocList">` + arr.map(x => `
    <div class="ppDocListItem">
      <div class="ppDocListBullet">•</div>
      <div>${escapeHtml(x)}</div>
    </div>
  `).join("") + `</div>`;
}

function buildDocPage(pageNo, pageTotal, contentHtml) {
  const title = (state.title || "").trim() || "Senza titolo";
  const when = fmtDateIt(new Date());
  return `
    <div class="ppDocPage" data-page="${pageNo}" role="button" tabindex="0" aria-label="Apri pagina ${pageNo}">
      <div class="ppDocPageInner">
        <div class="ppDocHeader">
          <div>
            <div class="ppDocTitle">PIANO DI PRODUZIONE</div>
            <div class="ppDocMeta">${escapeHtml(title)} • ${escapeHtml(when)}</div>
          </div>
          <img class="ppDocLogo" src="assets/icon-sdac.png" alt="SDAC App" onerror="this.style.display='none';" />
        </div>

        ${contentHtml}

        <div class="ppDocFooter">
          <div>Generato con SDAC App</div>
          <div>Pagina ${pageNo}/${pageTotal}</div>
        </div>
      </div>
    </div>
  `;
}

function buildDocPagesHtml() {
  const title = (state.title || "").trim();
  const type = fmtType(state.type);
  const synopsis = (state.synopsis || "").trim();
  const subject = (state.subject || "").trim();

  const chars = charactersLines();
  const envs = environmentsLines();
  const crew = crewLines();
  const eq = equipmentLines();

  const sponsors = listLines(state.sponsors);
  const producers = listLines(state.producers);
  const casting = listLines(state.castingAgencies);
  const rentEq = listLines(state.rentalEquipment);
  const rentTr = listLines(state.rentalTransport);
  const catering = listLines(state.catering);
  const shootingPeriods = shootingPeriodLines();

  const twoPages = shouldUseSecondPage();
  const total = twoPages ? 2 : 1;

  const sectionA = `
    <div class="ppDocSection">
      ${docSectionTitle("Sezione A — Dati generali")}
      <div class="ppDocBlock">
        ${docKV("Produzione / Titolo", title)}
        ${docKV("Tipologia", type)}
      </div>

      <div class="ppDocGrid2" style="margin-top:10px;">
        <div class="ppDocBlock">
          <div class="ppDocBlockTitle">Sinossi</div>
          <div class="ppDocText">${escapeHtml(synopsis || "—")}</div>
        </div>
        <div class="ppDocBlock">
          <div class="ppDocBlockTitle">Soggetto</div>
          <div class="ppDocText">${escapeHtml(subject || "—")}</div>
        </div>
      </div>
    </div>
  `;

  const sectionB = `
    <div class="ppDocSection">
      ${docSectionTitle("Sezione B — Organizzazione operativa")}
      <div class="ppDocGrid2">
        <div class="ppDocBlock">
          <div class="ppDocBlockTitle">Troupe (Ruolo — Nome)</div>
          ${docList(crew, "Nessun ruolo selezionato.")}
        </div>
        <div class="ppDocBlock">
          <div class="ppDocBlockTitle">Attrezzatura</div>
          ${docList(eq, "Nessuna attrezzatura selezionata.")}
        </div>
      </div>

      <div class="ppDocGrid2" style="margin-top:10px;">
        <div class="ppDocBlock">
          <div class="ppDocBlockTitle">Personaggi</div>
          ${docList(chars, "Nessun personaggio aggiunto.")}
        </div>
        <div class="ppDocBlock">
          <div class="ppDocBlockTitle">Ambienti</div>
          ${docList(envs, "Nessun ambiente aggiunto.")}
        </div>
      </div>
    </div>
  `;

  const sectionC = `
    <div class="ppDocSection">
      ${docSectionTitle("Sezione C — Partner e fornitori")}
      <div class="ppDocGrid2">
        <div class="ppDocBlock">
          <div class="ppDocBlockTitle">Sponsor</div>
          ${docList(sponsors, "—")}
          <div style="height:8px;"></div>
          <div class="ppDocBlockTitle">Produttori</div>
          ${docList(producers, "—")}
          <div style="height:8px;"></div>
          <div class="ppDocBlockTitle">Agenzie casting</div>
          ${docList(casting, "—")}
        </div>

        <div class="ppDocBlock">
          <div class="ppDocBlockTitle">Noleggio attrezzatura</div>
          ${docList(rentEq, "—")}
          <div style="height:8px;"></div>
          <div class="ppDocBlockTitle">Noleggio trasporti</div>
          ${docList(rentTr, "—")}
          <div style="height:8px;"></div>
          <div class="ppDocBlockTitle">Catering</div>
          ${docList(catering, "—")}
          <div style="height:8px;"></div>
          <div class="ppDocBlockTitle">Date / periodi di ripresa</div>
          ${docList(shootingPeriods, "—")}
        </div>
      </div>
    </div>
  `;

  if (!twoPages) {
    const hasPartners = sponsors.length || producers.length || casting.length || rentEq.length || rentTr.length || catering.length || shootingPeriods.length;
    const page1 = buildDocPage(1, 1, sectionA + sectionB + (hasPartners ? sectionC : ""));
    return { total: 1, pagesHtml: [page1], twoPages: false };
  }

  const page1 = buildDocPage(1, 2, sectionA + sectionB);
  const page2 = buildDocPage(2, 2, sectionC);
  return { total: 2, pagesHtml: [page1, page2], twoPages: true };
}

function renderStep4() {
  if (!hasStep4 || !docPreviewEl) return;

  const doc = buildDocPagesHtml();
  docPreviewEl.innerHTML = doc.pagesHtml.join("");

  docPreviewEl.querySelectorAll(".ppDocPage").forEach((pg) => {
    const open = () => openDocDialog();
    pg.addEventListener("click", open);
    pg.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });
}

function openDocDialog() {
  if (!docDialog || !zoomAreaEl) return;

  zoomLevel = 1;
  updateZoom();

  const doc = buildDocPagesHtml();
  zoomAreaEl.innerHTML = doc.pagesHtml.join("");
  zoomAreaEl.querySelectorAll(".ppDocPage").forEach(pg => { pg.style.cursor = "default"; });

  if (typeof docDialog.showModal === "function") docDialog.showModal();
  else docDialog.removeAttribute("hidden");
}

function closeDocDialog() {
  if (!docDialog) return;
  try { docDialog.close(); } catch {}
}

let zoomLevel = 1;

function updateZoom() {
  if (!zoomAreaEl) return;
  zoomAreaEl.style.transform = `scale(${zoomLevel})`;
  if (zoomResetBtn) zoomResetBtn.textContent = `${Math.round(zoomLevel * 100)}%`;
}

function printDoc() {
  // PDF “testo” via stampa browser, ma con paginazione robusta: 1 foglio A4 per ogni .ppDocPage
  const doc = buildDocPagesHtml();
  const pages = doc.pagesHtml;

  // Wrapping extra: i browser rispettano meglio i break su un wrapper semplice
  const wrapped = pages.map(p => `<section class="ppPrintPage">${p}</section>`).join("");

  const printCss = `
    @page { size: A4; margin: 12mm; }
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    html, body { margin:0; padding:0; background:#fff; }

    /* Wrapper pagina (questo è il vero “salto pagina”) */
    .ppPrintPage {
      break-after: page;
      page-break-after: always;
    }
    .ppPrintPage:last-child {
      break-after: auto;
      page-break-after: auto;
    }

    /* Evita layout strani che disabilitano i break */
    .ppDocPreview{ display:block !important; }
    .ppDocPage{ width: 186mm; height: 273mm; overflow:hidden; }

    /* Evita spezzamenti brutti */
    .ppDocBlock, .ppDocGrid2{ break-inside: avoid; page-break-inside: avoid; }

    
/* --- Inline doc styles (subset) --- */
.ppDocPreview{ display:block; }
.ppDocPage{ background:#fff; color:#111; border:0; border-radius:0; box-shadow:none; overflow:visible; }
.ppDocPageInner{ padding: 0; display:flex; flex-direction:column; gap:10px; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }
.ppDocHeader{ display:grid; grid-template-columns: 1fr auto; align-items:start; gap:10px; padding-bottom:8px; border-bottom:1px solid rgba(0,0,0,.14); }
.ppDocTitle{ text-align:center; font-weight:900; letter-spacing:.06em; font-size:20px; }
.ppDocMeta{ margin-top:6px; text-align:center; font-size:11px; color: rgba(0,0,0,.60); }
.ppDocLogo{ width:46px; height:46px; border-radius:10px; border:1px solid rgba(0,0,0,.12); object-fit:cover; background: rgba(0,0,0,.04); }
.ppDocSection{ padding-top:6px; }
.ppDocSectionTitle{ font-weight:900; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color: rgba(0,0,0,.72); margin-bottom:6px; }
.ppDocGrid2{ display:grid; grid-template-columns: 1fr 1fr; gap:10px; }
.ppDocKV{ display:grid; grid-template-columns: 140px 1fr; gap:8px; font-size:12px; line-height:1.35; padding:6px 0; border-bottom:1px dashed rgba(0,0,0,.12); }
.ppDocKV:last-child{ border-bottom:none; }
.ppDocK{ color: rgba(0,0,0,.55); font-weight:700; }
.ppDocV{ color:#111; font-weight:650; }
.ppDocBlock{ border:1px solid rgba(0,0,0,.10); border-radius:12px; padding:10px; background: rgba(0,0,0,.03); }
.ppDocBlockTitle{ font-weight:900; font-size:11px; letter-spacing:.08em; text-transform:uppercase; color: rgba(0,0,0,.72); margin-bottom:6px; }
.ppDocText{ font-size:12px; line-height:1.45; color:#111; white-space:pre-wrap; }
.ppDocList{ display:flex; flex-direction:column; gap:4px; font-size:12px; line-height:1.35; }
.ppDocListItem{ display:flex; gap:8px; }
.ppDocListBullet{ width:10px; color: rgba(0,0,0,.55); }
.ppDocFooter{ margin-top:auto; padding-top:10px; border-top:1px solid rgba(0,0,0,.14); display:flex; justify-content:space-between; font-size:10px; color: rgba(0,0,0,.55); }

  `;

  const html = `
    <!doctype html>
    <html lang="it">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Piano di Produzione</title>
        <style>${printCss}</style>
      </head>
      <body>
        <div class="ppDocPreview">${wrapped}</div>
        <script>
          window.addEventListener('load', () => setTimeout(() => window.print(), 50));
        </script>
      </body>
    </html>
  `;

  const w = window.open("", "_blank");
  if (!w) {
    alert("Impossibile aprire la finestra di stampa (popup bloccati). Abilita i popup e riprova.");
    return;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
}


async function shareDoc() {
  const title = (state.title || "").trim() || "Piano di Produzione";
  const text = `Piano di Produzione: ${title}\nGenerato con SDAC App.`;
  try {
    if (navigator.share) {
      await navigator.share({ title, text });
      return;
    }
  } catch {}
  try {
    await navigator.clipboard.writeText(text);
    alert("Testo copiato negli appunti. Suggerimento: usa 'Salva documento' per creare il PDF, poi condividilo.");
  } catch {
    alert("Suggerimento: usa 'Salva documento' per creare il PDF, poi condividilo.");
  }
}


// Wizard navigation
  // ─────────────────────────────
  function goToStep(step) {
    const s = Math.max(1, Math.min(4, Number(step) || 1));
    currentStep = s;

    stepEls.forEach(elStep => {
      elStep.classList.toggle("is-active", Number(elStep.dataset.step) === s);
    });

    // progress bar
    if (progressBar) {
      const pct = (s / 4) * 100;
      progressBar.style.width = `${pct}%`;
    }
    if (progressLabels) {
      Array.from(progressLabels.querySelectorAll("[data-step]")).forEach(btn => {
        const isActive = Number(btn.dataset.step) === s;
        btn.classList.toggle("is-active", isActive);
        if (isActive) btn.setAttribute("aria-current", "step");
        else btn.removeAttribute("aria-current");
      });
    }

    if (s === 1) {
      syncStep1Groups();
    }

    // lazy render for step 2
    if (s === 2) {
      renderCrew();
      renderEquipment();
    }

    if (s === 3 && hasStep3) {
      renderStep3();
    }

    if (s === 4 && hasStep4) {
      renderStep4();
    }
  }

  function clearAll(confirmText = "Vuoi annullare e pulire tutti i campi di questa bozza?") {
    const ok = confirm(confirmText);
    if (!ok) return;

    state = emptyState();
    dirty = false;
    currentPlanId = null;
    currentPlanName = "";
    updateHeaderTitle();
    clearDraftStorage();
    applyStateToUI();
    goToStep(1);
    openWizard();
  }

  function wireProgressNav() {
    if (!progressLabels) return;
    Array.from(progressLabels.querySelectorAll("[data-step]")).forEach(btn => {
      btn.addEventListener("click", () => {
        const step = Number(btn.dataset.step) || 1;
        saveDraft();
        goToStep(step);
      });
    });
  }

  function applyStateToUI() {
    // Step 1
    if (titleEl) titleEl.value = state.title || "";
    if (synopsisEl) synopsisEl.value = state.synopsis || "";
    if (subjectEl) subjectEl.value = state.subject || "";
    if (scriptEl) scriptEl.checked = !!state.scriptPlanned;
    if (typeEl) typeEl.value = state.type || "";
    syncCounts();
    syncStep1Groups();
    renderChars();
    renderEnvs();
    updateHeaderTitle();

    if (hasStep3) syncStep3Groups();

    // Step 2 (renders handled in goToStep)
  }

  // ─────────────────────────────
  // Event wiring — Step 1
  // ─────────────────────────────
  function wireStep1() {
    if (titleEl) titleEl.addEventListener("input", () => { state.title = titleEl.value; syncCounts(); saveDraft(); updateHeaderTitle(); });
    if (synopsisEl) synopsisEl.addEventListener("input", () => { state.synopsis = synopsisEl.value; syncCounts(); saveDraft(); });
    if (subjectEl) subjectEl.addEventListener("input", () => { state.subject = subjectEl.value; syncCounts(); saveDraft(); });

    if (scriptEl) scriptEl.addEventListener("change", () => { state.scriptPlanned = !!scriptEl.checked; saveDraft(); });
    if (typeEl) typeEl.addEventListener("change", () => { state.type = typeEl.value; saveDraft(); });

    if (charsGroupHead) {
      charsGroupHead.addEventListener("click", () => {
        const next = charsGroupBody ? charsGroupBody.hidden : !isStep1GroupOpen("characters", true);
        setStep1GroupOpen("characters", next);
        syncStep1Groups();
      });
    }

    if (envsGroupHead) {
      envsGroupHead.addEventListener("click", () => {
        const next = envsGroupBody ? envsGroupBody.hidden : !isStep1GroupOpen("environments", true);
        setStep1GroupOpen("environments", next);
        syncStep1Groups();
      });
    }

    if (charAddBtn && charNameEl) {
      charAddBtn.addEventListener("click", () => {
        const name = (charNameEl.value || "").trim();
        if (!name) return;
        state.characters = [...(state.characters || []), { id: uid(), name, actor: "" }];
        charNameEl.value = "";
        saveDraft();
        renderChars();
      });
      charNameEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); charAddBtn.click(); }
      });
    }

    if (envAddBtn && envNameEl) {
      envAddBtn.addEventListener("click", () => {
        const name = (envNameEl.value || "").trim();
        const scene = (envSceneEl?.value || "").trim();
        if (!name) return;
        state.environments = [...(state.environments || []), { id: uid(), name, scene }];
        envNameEl.value = "";
        if (envSceneEl) envSceneEl.value = "";
        saveDraft();
        renderEnvs();
      });
      envNameEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); envAddBtn.click(); }
      });
      if (envSceneEl) {
        envSceneEl.addEventListener("keydown", (e) => {
          if (e.key === "Enter") { e.preventDefault(); envAddBtn.click(); }
        });
      }
    }

    if (clearBtn1) clearBtn1.addEventListener("click", () => clearAll());
    if (toHomeBtn1) toHomeBtn1.addEventListener("click", () => closeWizardToHome(false));
    if (nextBtn1) nextBtn1.addEventListener("click", () => {
      if (!hasStep2) {
        alert("Step 2 non è ancora disponibile in questa versione.");
        return;
      }
      goToStep(2);
    });
  }

  // ─────────────────────────────
  // Event wiring — Step 2
  // ─────────────────────────────
  function wireStep2() {
    if (!hasStep2) return;

    if (crewAddCustomBtn) crewAddCustomBtn.addEventListener("click", addCustomCrew);
    if (eqAddCustomBtn) eqAddCustomBtn.addEventListener("click", addCustomEquipment);

    if (clearBtn2) clearBtn2.addEventListener("click", () => clearAll());
    if (prevBtn2) prevBtn2.addEventListener("click", () => goToStep(1));
    if (toHomeBtn2) toHomeBtn2.addEventListener("click", () => closeWizardToHome(false));

    if (nextBtn2) nextBtn2.addEventListener("click", () => {
      if (!hasStep3) {
        alert("Step 3 non è ancora disponibile in questa versione.");
        saveDraft();
        return;
      }
      saveDraft();
      goToStep(3);
    });
  }

  
// ─────────────────────────────
// Event wiring — Step 3
// ─────────────────────────────
function addTextItem(key, inputEl, renderFn) {
  if (!inputEl) return;
  const v = (inputEl.value || "").trim();
  if (!v) return;

  const arr = Array.isArray(state[key]) ? state[key] : [];
  const exists = arr.some(x => String(x || "").trim().toLowerCase() === v.toLowerCase());
  if (exists) {
    inputEl.value = "";
    return;
  }

  state[key] = [...arr, v];
  inputEl.value = "";
  saveDraft();
  renderFn();
}


// ─────────────────────────────
// Event wiring — Step 4
// ─────────────────────────────
function wireStep4() {
  if (!hasStep4) return;

  if (prevBtn4) prevBtn4.addEventListener("click", () => goToStep(3));
  if (toHomeBtn4) toHomeBtn4.addEventListener("click", () => closeWizardToHome(false));
  if (clearBtn4) clearBtn4.addEventListener("click", () => clearAll());

if (saveDocBtn) saveDocBtn.addEventListener("click", () => {
  saveDraft();
  printDoc();
});

if (shareDocBtn) shareDocBtn.addEventListener("click", async () => {
  saveDraft();
  await shareDoc();
});

  if (docDialogClose) docDialogClose.addEventListener("click", closeDocDialog);

  if (zoomInBtn) zoomInBtn.addEventListener("click", () => { zoomLevel = Math.min(2.2, zoomLevel + 0.1); updateZoom(); });
  if (zoomOutBtn) zoomOutBtn.addEventListener("click", () => { zoomLevel = Math.max(0.6, zoomLevel - 0.1); updateZoom(); });
  if (zoomResetBtn) zoomResetBtn.addEventListener("click", () => { zoomLevel = 1; updateZoom(); });

  // ESC chiude il dialog nativamente, ma aggiungiamo anche questa sicurezza
  if (docDialog) docDialog.addEventListener("close", () => { zoomAreaEl && (zoomAreaEl.innerHTML = ""); });
}


function wireStep3() {
  if (!hasStep3) return;

  // Indietro (Step 2)
  if (prevBtn3) prevBtn3.addEventListener("click", () => goToStep(2));

  const bindStep3Toggle = (key, head, body) => {
    if (!head) return;
    head.addEventListener("click", () => {
      const next = body ? body.hidden : !isStep3GroupOpen(key, true);
      setStep3GroupOpen(key, next);
      syncStep3Groups();
    });
  };

  bindStep3Toggle("sponsors", sponsorsGroupHead, sponsorsGroupBody);
  bindStep3Toggle("producers", producersGroupHead, producersGroupBody);
  bindStep3Toggle("casting", castingGroupHead, castingGroupBody);
  bindStep3Toggle("rentalEquipment", rentEqGroupHead, rentEqGroupBody);
  bindStep3Toggle("rentalTransport", rentTrGroupHead, rentTrGroupBody);
  bindStep3Toggle("catering", cateringGroupHead, cateringGroupBody);
  bindStep3Toggle("shootingPeriods", shootGroupHead, shootGroupBody);

  // Sponsor
  if (sponsorAddBtn && sponsorNameEl) {
    sponsorAddBtn.addEventListener("click", () => addTextItem("sponsors", sponsorNameEl, renderStep3));
    sponsorNameEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); sponsorAddBtn.click(); }
    });
  }

  // Produttori
  if (producerAddBtn && producerNameEl) {
    producerAddBtn.addEventListener("click", () => addTextItem("producers", producerNameEl, renderStep3));
    producerNameEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); producerAddBtn.click(); }
    });
  }

  // Agenzie casting
  if (castingAddBtn && castingNameEl) {
    castingAddBtn.addEventListener("click", () => addTextItem("castingAgencies", castingNameEl, renderStep3));
    castingNameEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); castingAddBtn.click(); }
    });
  }

  // Noleggio attrezzatura
  if (rentEqAddBtn && rentEqNameEl) {
    rentEqAddBtn.addEventListener("click", () => addTextItem("rentalEquipment", rentEqNameEl, renderStep3));
    rentEqNameEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); rentEqAddBtn.click(); }
    });
  }

  // Noleggio trasporti
  if (rentTrAddBtn && rentTrNameEl) {
    rentTrAddBtn.addEventListener("click", () => addTextItem("rentalTransport", rentTrNameEl, renderStep3));
    rentTrNameEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); rentTrAddBtn.click(); }
    });
  }

  // Catering
  if (cateringAddBtn && cateringNameEl) {
    cateringAddBtn.addEventListener("click", () => addTextItem("catering", cateringNameEl, renderStep3));
    cateringNameEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); cateringAddBtn.click(); }
    });
  }

  // Date / periodi di ripresa
  if (shootAddBtn && shootStartEl) {
    shootAddBtn.addEventListener("click", addShootingPeriod);

    [shootStartEl, shootEndEl, shootScenesEl].forEach((input) => {
      input?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          shootAddBtn.click();
        }
      });
    });
  }

  if (clearBtn3) clearBtn3.addEventListener("click", () => clearAll());
  if (toHomeBtn3) toHomeBtn3.addEventListener("click", () => closeWizardToHome(false));

  if (nextBtn3) nextBtn3.addEventListener("click", () => {
    if (!hasStep4) {
      alert("Step 4 non è ancora disponibile in questa versione.");
      saveDraft();
      return;
    }
    saveDraft();
    goToStep(4);
  });
}


// ─────────────────────────────
  // Home events
  // ─────────────────────────────
  // Header actions: elenco produzioni + salva PdP
  if (ppListBtn) ppListBtn.addEventListener("click", () => openPlansDialog());
  if (ppSavePlanBtn) ppSavePlanBtn.addEventListener("click", async () => {
    if (!hasAnyData(state)) {
      alert("Non c\'è nulla da salvare: compila almeno un campo.");
      return;
    }
    await upsertPlan();
  });
  if (plansCloseBtn) plansCloseBtn.addEventListener("click", (e) => { e.preventDefault(); closePlansDialog(); });
  if (plansSearchEl) plansSearchEl.addEventListener("input", () => renderPlansDialog());
  if (plansOnlyFavEl) plansOnlyFavEl.addEventListener("change", () => renderPlansDialog());

  ppNew.addEventListener("click", () => {
    // Se c'è già una bozza con dati, chiedi se vuoi ripartire
    if (hasAnyData(state)) {
      const ok = confirm("Vuoi iniziare un nuovo Piano di Produzione? Questo cancellerà la bozza corrente.");
      if (!ok) {
        openWizard();
        goToStep(currentStep);
        return;
      }
    }
    state = emptyState();
    dirty = false;
    currentPlanId = null;
    currentPlanName = "";
    updateHeaderTitle();
    clearDraftStorage();
    applyStateToUI();
    openWizard();
    goToStep(1);
  });

  // Piani salvati (home)
  renderHomeSaved();

  // Initial load
  const draft = loadDraft();
  if (draft) {
    state = draft;
    dirty = true;
    updateHeaderTitle();
    // se c'è una bozza non vuota, apriamo direttamente il wizard
    if (hasAnyData(state)) {
      openWizard();
      // se ha già selezioni step2, vai a step2? meglio mantenere step1
      currentStep = 1;
    }
  }

  wireStep1();
  wireStep2();
  wireStep3();
  wireStep4();
  wireProgressNav();
  applyStateToUI();
  goToStep(currentStep);
  updateHeaderTitle();
  renderHomeSaved();
  refreshPremiumActionLabels();
  window.addEventListener("sdac:membership-change", refreshPremiumActionLabels);
})();