(() => {
  const menuButtons = Array.from(document.querySelectorAll(".menu__item"));
  const panels = Array.from(document.querySelectorAll(".panel"));
  const toolsMenu = document.getElementById("toolsMenu");
  const toolsMenuLauncher = document.getElementById("toolsMenuLauncher");
  const menuToggle = document.getElementById("menuToggle");
  const menuToggleDesktop = document.getElementById("menuToggleDesktop");
  const menuToggleMobile = document.getElementById("menuToggleMobile");
  const premiumBadge = document.getElementById("premiumBadge");
  const topbarAccount = document.getElementById("topbarAccount");
  const installButton = document.getElementById("btnInstallApp");
  const installText = document.getElementById("installAppText");

  const MENU_COLLAPSED_KEY = "sdac_tools_menu_collapsed";
  const MEMBERSHIP_STATE_KEY = "sdac_membership_state_v2";
  const CHECKOUT_DRAFT_KEY = "sdac_checkout_draft_v2";
  const HOME_PROD_PLANS_KEY = "sdac_prodplans_v1";
  const HOME_STORYBOARD_LIBRARY_KEY = "sdac_storyboard_library_v1";
  const HOME_NOTEBOOK_KEY = "sdac_notebook_films_v1";
  const HOME_RECENT_LIMIT = 5;
  const API_BASE = "/api";

  const SUPABASE_CONFIG = Object.freeze({
    url: "https://aslcamgowefmksytqtut.supabase.co",
    anonKey: "sb_publishable_YNsJMWSH-3HvFJHgvk2pzg_Kp7R9ILn"
  });

  const SUBSCRIPTION_CONFIG = Object.freeze({
    supportEmail: "info@sdac.it",
    plans: {
      annual: {
        label: "Abbonamento annuale",
        price: "4,99 € / anno",
        badge: "Consigliato"
      },
      monthly: {
        label: "Abbonamento mensile",
        price: "0,69 € / mese",
        badge: "Flessibile"
      }
    },
    providers: {
      stripe: {
        name: "Carta di credito / debito",
        note: "Checkout sicuro gestito da Stripe.",
        enabled: true
      },
      paypal: {
        name: "PayPal",
        note: "In arrivo.",
        enabled: false
      }
    }
  });

  let menuCollapsed = false;
  let deferredInstallPrompt = null;

  const overlay = document.getElementById("overlay");
  const overlayPanel = overlay?.querySelector(".overlay__panel");
  const overlayTitle = document.getElementById("overlayTitle");
  const overlayBody = document.getElementById("overlayBody");
  const overlayClose = document.getElementById("overlayClose");

  let localMembershipState = readJson(MEMBERSHIP_STATE_KEY, {
    plan: "free",
    provider: "",
    cycle: "annual",
    email: "",
    username: "",
    updatedAt: ""
  });

  let checkoutDraft = readJson(CHECKOUT_DRAFT_KEY, {
    fullName: "",
    email: "",
    username: "",
    promoCode: "",
    paymentProvider: "stripe",
    billingCycle: "annual"
  });

  if (false) {
    localMembershipState = {
      ...localMembershipState,
      plan: "free",
      provider: "",
      cycle: localMembershipState.cycle || "annual",
      email: "",
      username: "",
      updatedAt: new Date().toISOString()
    };
    writeJson(MEMBERSHIP_STATE_KEY, localMembershipState);
  }

  let supabaseClient = null;
  let authSession = null;
  let authProfile = null;
  let hasPremiumAccess = false;
  let authReady = false;
  let authConfigured = false;
  let authErrorMessage = "";

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return { ...fallback };
      return { ...fallback, ...JSON.parse(raw) };
    } catch (err) {
      return { ...fallback };
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      // ignore storage errors
    }
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function getLocalMembershipState() {
    return { ...localMembershipState };
  }

  function setLocalMembershipState(nextState) {
    localMembershipState = {
      ...localMembershipState,
      ...nextState
    };
    writeJson(MEMBERSHIP_STATE_KEY, localMembershipState);
    notifyMembershipChange();
  }

  function getCheckoutDraft() {
    return { ...checkoutDraft };
  }

  function setCheckoutDraft(nextDraft) {
    checkoutDraft = {
      ...checkoutDraft,
      ...nextDraft
    };
    writeJson(CHECKOUT_DRAFT_KEY, checkoutDraft);
  }

  function getSupabaseEnabled() {
    return !!(SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey);
  }

  function getPlanLabel(plan) {
    if (plan === "admin") return "Admin";
    if (plan === "premium") return "Premium";
    if (plan === "premium_pending") return "In attivazione";
    return "Free";
  }

  function getEffectiveMembershipState() {
    if (authProfile) {
      const effectivePlan = authProfile.plan === "admin" || authProfile.is_owner
        ? "admin"
        : (hasPremiumAccess ? "premium" : "free");

      return {
        plan: effectivePlan,
        provider: effectivePlan === "premium" ? "stripe" : "",
        cycle: localMembershipState.cycle || "annual",
        email: authProfile.email || authSession?.user?.email || "",
        username: authProfile.username || "",
        fullName: authProfile.full_name || "",
        updatedAt: localMembershipState.updatedAt || ""
      };
    }

    if (localMembershipState.plan === "premium_pending") {
      return { ...localMembershipState };
    }

    return {
      plan: "free",
      provider: "",
      cycle: localMembershipState.cycle || "annual",
      email: localMembershipState.email || "",
      username: localMembershipState.username || "",
      fullName: checkoutDraft.fullName || "",
      updatedAt: localMembershipState.updatedAt || ""
    };
  }

  function isPremium() {
    return ["premium", "admin"].includes(getEffectiveMembershipState().plan);
  }

  function isOwner() {
    return ["admin"].includes(getEffectiveMembershipState().plan);
  }

  function isAuthenticated() {
    return !!authSession?.user;
  }

  function getAuthenticatedUser() {
    return authSession?.user || null;
  }

  function getAccessToken() {
    return authSession?.access_token || "";
  }

  function getCompactAccountLabel() {
    const fullName = String(authProfile?.full_name || "").trim();
    if (fullName) {
      const firstName = fullName.split(/\s+/)[0]?.trim();
      if (firstName) return firstName;
    }

    const username = String(authProfile?.username || "").trim();
    if (username) return username;

    const email = String(authProfile?.email || authSession?.user?.email || "").trim();
    if (email) return email.split("@")[0].trim();

    return "";
  }

  function getAccountInitials(label) {
    const cleaned = String(label || "").trim();
    if (!cleaned) return "👤";

    const words = cleaned
      .replace(/@.*/, "")
      .split(/[\s._-]+/)
      .map((part) => part.trim())
      .filter(Boolean);

    if (words.length >= 2) return `${words[0][0] || ""}${words[1][0] || ""}`.toUpperCase();
    return cleaned.slice(0, 2).toUpperCase();
  }

  function getAccountStatusClass(plan, authenticated) {
    if (!authenticated) return "disconnected";
    if (plan === "admin") return "admin";
    if (plan === "premium") return "premium";
    if (plan === "premium_pending") return "pending";
    return "connected";
  }

  function setTopbarAccountButton({ label, statusClass, title, cardText, ariaLabel }) {
    if (!topbarAccount) return;

    topbarAccount.hidden = false;
    topbarAccount.classList.remove(
      "topbarAccount--disconnected",
      "topbarAccount--connected",
      "topbarAccount--premium",
      "topbarAccount--pending",
      "topbarAccount--admin"
    );
    topbarAccount.classList.add(`topbarAccount--${statusClass}`);
    topbarAccount.innerHTML = `
      <span class="topbarAccount__avatar" aria-hidden="true">${escapeHtml(label)}</span>
      <span class="topbarAccount__status" aria-hidden="true"></span>
    `;
    topbarAccount.title = title;
    topbarAccount.setAttribute("aria-label", ariaLabel);
    topbarAccount.setAttribute("data-account-card", cardText);
  }

  function updateTopbarAccountUi() {
    if (!topbarAccount) return;

    const disconnectedLabel = "Utente non collegato";

    if (!isAuthenticated()) {
      setTopbarAccountButton({
        label: "👤",
        statusClass: "disconnected",
        title: `${disconnectedLabel} • Apri pannello Utente`,
        cardText: `Utente
● Non collegato
Tocca per accedere`,
        ariaLabel: "Apri pannello Utente: utente non collegato"
      });
      return;
    }

    const compactLabel = getCompactAccountLabel();
    if (!compactLabel) {
      setTopbarAccountButton({
        label: "👤",
        statusClass: "disconnected",
        title: `${disconnectedLabel} • Apri pannello Utente`,
        cardText: `Utente
● Non collegato
Tocca per accedere`,
        ariaLabel: "Apri pannello Utente: utente non collegato"
      });
      return;
    }

    const effectiveState = getEffectiveMembershipState();
    const fullName = String(authProfile?.full_name || "").trim();
    const username = String(authProfile?.username || "").trim();
    const email = String(authProfile?.email || authSession?.user?.email || "").trim();
    const planLabel = getPlanLabel(effectiveState.plan);
    const displayName = fullName || username || compactLabel;
    const titleParts = [
      displayName,
      username ? `@${username}` : "",
      email,
      `Piano: ${planLabel}`
    ].filter(Boolean);

    setTopbarAccountButton({
      label: getAccountInitials(displayName),
      statusClass: getAccountStatusClass(effectiveState.plan, true),
      title: `${titleParts.join(" • ")} • Apri pannello Utente`,
      cardText: `${displayName}
● Collegato
Piano: ${planLabel}`,
      ariaLabel: `Apri pannello Utente: ${displayName}, piano ${planLabel}`
    });
  }

  function updatePremiumUi() {
    if (!premiumBadge) return;
    const state = getEffectiveMembershipState();
    premiumBadge.textContent = `Piano: ${getPlanLabel(state.plan)}`;
    premiumBadge.classList.toggle("badge--premium", state.plan === "premium" || state.plan === "admin");
    premiumBadge.classList.toggle("badge--pending", state.plan === "premium_pending");
    premiumBadge.classList.toggle("badge--owner", state.plan === "admin");
  }

  function notifyMembershipChange() {
    updatePremiumUi();
    updateTopbarAccountUi();
    window.dispatchEvent(new CustomEvent("sdac:membership-change", { detail: getEffectiveMembershipState() }));
  }

  function readArrayFromStorage(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function toTimestamp(value) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim()) {
      const parsed = Date.parse(value);
      if (Number.isFinite(parsed)) return parsed;
      const numeric = Number(value);
      if (Number.isFinite(numeric)) return numeric;
    }
    return 0;
  }

  function formatRecentWhen(timestamp) {
    const ts = toTimestamp(timestamp);
    if (!ts) return "Data non disponibile";

    const now = Date.now();
    const diff = Math.max(0, now - ts);
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;

    if (diff < minute) return "Adesso";
    if (diff < hour) {
      const n = Math.max(1, Math.round(diff / minute));
      return n === 1 ? "1 min fa" : `${n} min fa`;
    }
    if (diff < day) {
      const n = Math.max(1, Math.round(diff / hour));
      return n === 1 ? "1 ora fa" : `${n} ore fa`;
    }
    if (diff < 7 * day) {
      const n = Math.max(1, Math.round(diff / day));
      return n === 1 ? "Ieri" : `${n} giorni fa`;
    }

    try {
      return new Date(ts).toLocaleDateString("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    } catch (err) {
      return "Data non disponibile";
    }
  }

  function getRecentIcon(type) {
    if (type === "production") return "PdP";
    if (type === "storyboard") return "▧";
    if (type === "notebook") return "★";
    return "•";
  }

  function getRecentItems() {
    const productions = readArrayFromStorage(HOME_PROD_PLANS_KEY).map((item) => {
      const updatedAt = toTimestamp(item?.updatedAt);
      const title = String(item?.name || item?.data?.title || "Piano senza titolo").trim();
      const step = Number(item?.lastStep || 1);
      return {
        type: "production",
        view: "start",
        archiveButtonId: "ppList",
        title,
        updatedAt,
        meta: `${formatRecentWhen(updatedAt)} · Piano di Produzione · Step ${Math.min(4, Math.max(1, step))}/4`
      };
    });

    const storyboards = readArrayFromStorage(HOME_STORYBOARD_LIBRARY_KEY).map((item) => {
      const updatedAt = toTimestamp(item?.updatedAt || item?.lastSavedAt);
      const title = String(item?.sceneName || "Storyboard senza titolo").trim();
      const shotCount = Array.isArray(item?.shots) ? item.shots.length : 0;
      const shotLabel = shotCount === 1 ? "1 shot" : `${shotCount || 0} shot`;
      return {
        type: "storyboard",
        view: "storyboard",
        archiveButtonId: "sbOpenLibrary",
        title,
        updatedAt,
        meta: `${formatRecentWhen(updatedAt)} · Storyboard · ${shotLabel}`
      };
    });

    const notebookItems = readArrayFromStorage(HOME_NOTEBOOK_KEY)
      .filter((item) => !item?.source || item.source !== "sdac")
      .map((item) => {
        const updatedAt = toTimestamp(item?.updatedAt || item?.createdAt);
        const title = String(item?.title || "Film senza titolo").trim();
        const status = item?.status === "watched" ? "Visto" : "Da vedere";
        const credits = [item?.director, item?.year].filter(Boolean).join(" · ");
        return {
          type: "notebook",
          view: "notebook",
          title,
          updatedAt,
          meta: `${formatRecentWhen(updatedAt)} · Taccuino film · ${status}${credits ? ` · ${credits}` : ""}`
        };
      });

    return [...productions, ...storyboards, ...notebookItems]
      .filter((item) => item.updatedAt > 0)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, HOME_RECENT_LIMIT);
  }

  function renderHomeRecentItems() {
    const listEl = document.getElementById("homeRecentList");
    if (!listEl) return;

    const items = getRecentItems();
    if (!items.length) {
      listEl.innerHTML = `
        <div class="homeEmptyState">
          <strong>Nessun lavoro recente</strong>
          <span>Inizia creando un Piano di Produzione o uno Storyboard.</span>
          <div class="homeEmptyActions">
            <button class="chip chip--primary" type="button" data-view-jump="start" data-home-trigger="ppNew">Nuovo Piano</button>
            <button class="chip chip--button" type="button" data-view-jump="storyboard" data-home-trigger="sbNewScene">Nuovo Storyboard</button>
          </div>
        </div>
      `;
      return;
    }

    listEl.innerHTML = items.map((item, index) => `
      <article class="homeRecentItem homeRecentItem--${escapeHtml(item.type)}">
        <span class="homeRecentIcon" aria-hidden="true">${escapeHtml(getRecentIcon(item.type))}</span>
        <div class="homeRecentMain">
          <strong class="homeRecentTitle">${escapeHtml(item.title)}</strong>
          <div class="homeRecentMeta">${escapeHtml(item.meta)}</div>
        </div>
        <div class="homeRecentActions">
          <button class="chip chip--button" type="button" data-home-open-recent="${index}">Apri</button>
        </div>
      </article>
    `).join("");

    listEl.querySelectorAll("[data-home-open-recent]").forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.getAttribute("data-home-open-recent"));
        const item = items[index];
        if (!item) return;
        openRecentItem(item);
      });
    });
  }

  function openRecentItem(item) {
    if (!item?.view) return;
    showView(item.view);

    if (item.archiveButtonId) {
      window.setTimeout(() => {
        const archiveButton = document.getElementById(item.archiveButtonId);
        if (archiveButton) archiveButton.click();
      }, 90);
    }
  }

  function handleHomeJump(target) {
    const view = target?.getAttribute("data-view-jump");
    if (!view || !panels.some((panel) => panel.dataset.panel === view)) return;

    showView(view);

    const triggerId = target.getAttribute("data-home-trigger");
    if (triggerId) {
      window.setTimeout(() => {
        const trigger = document.getElementById(triggerId);
        if (trigger) trigger.click();
      }, 90);
    }
  }

function showView(view) {
  panels.forEach((p) => p.classList.toggle("is-active", p.dataset.panel === view));
  menuButtons.forEach((b) => b.classList.toggle("is-active", b.dataset.view === view));
  document.body.dataset.activeView = view;
  window.location.hash = view;
  if (view === "home") renderHomeRecentItems();
}
  function applyMenuState(collapsed) {
    document.body.classList.toggle("tools-menu-open", !collapsed);
    document.body.classList.toggle("menu-collapsed", collapsed);

    if (toolsMenuLauncher) {
      toolsMenuLauncher.setAttribute("aria-expanded", collapsed ? "false" : "true");
      toolsMenuLauncher.setAttribute("aria-label", collapsed ? "Apri elenco Strumenti" : "Chiudi elenco Strumenti");
      toolsMenuLauncher.title = collapsed ? "Apri elenco Strumenti" : "Chiudi elenco Strumenti";
    }
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
      menuToggle.setAttribute("aria-label", collapsed ? "Apri elenco Strumenti" : "Chiudi elenco Strumenti");
      menuToggle.title = collapsed ? "Apri elenco Strumenti" : "Chiudi elenco Strumenti";
    }
    if (menuToggleDesktop) {
      menuToggleDesktop.textContent = collapsed ? "☰" : "×";
    }
    if (menuToggleMobile) {
      menuToggleMobile.textContent = collapsed ? "☰" : "×";
    }
  }

  function isStandaloneMode() {
    return window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone === true;
  }

  function isIos() {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent || "");
  }

  function isAndroid() {
    return /android/i.test(window.navigator.userAgent || "");
  }

  function canUseInstallPrompt() {
    return !!deferredInstallPrompt;
  }

  function getInstallHelpHtml() {
    if (isStandaloneMode()) {
      return `
        <p><strong>SDAC App è già installata</strong> su questo dispositivo.</p>
        <p class="muted">Se vuoi, puoi aprirla dalla schermata Home o dal menu delle app del browser.</p>
      `;
    }

    if (isIos()) {
      return `
        <p><strong>Installazione su iPhone/iPad:</strong></p>
        <ol>
          <li>Apri SDAC App in Safari.</li>
          <li>Tocca il pulsante <strong>Condividi</strong>.</li>
          <li>Scegli <strong>Aggiungi a Home</strong>.</li>
        </ol>
        <p class="muted">Su iOS il pulsante di installazione automatico spesso non compare: è normale.</p>
      `;
    }

    if (isAndroid()) {
      return `
        <p><strong>Installazione su Android:</strong></p>
        <ol>
          <li>Apri SDAC App in Chrome.</li>
          <li>Tocca il menu del browser.</li>
          <li>Scegli <strong>Installa app</strong> o <strong>Aggiungi a schermata Home</strong>.</li>
        </ol>
        <p class="muted">Se il browser rileva i requisiti PWA, può comparire anche il prompt automatico.</p>
      `;
    }

    return `
      <p><strong>Installazione su computer:</strong></p>
      <ol>
        <li>Apri SDAC App in Chrome, Edge o un browser compatibile.</li>
        <li>Cerca l’icona di installazione nella barra degli indirizzi oppure nel menu del browser.</li>
        <li>Conferma con <strong>Installa</strong>.</li>
      </ol>
      <p class="muted">Per funzionare bene come app installabile, SDAC App deve essere pubblicata in HTTPS.</p>
    `;
  }

  function updateInstallUi() {
    if (!installButton || !installText) return;

    if (isStandaloneMode()) {
      installButton.textContent = "App installata";
      installButton.disabled = true;
      installText.textContent = "Questa versione di SDAC App risulta già installata sul dispositivo.";
      return;
    }

    installButton.disabled = false;

    if (canUseInstallPrompt()) {
      installButton.textContent = "Installa app";
      installText.textContent = "Il browser supporta l’installazione: puoi aggiungere SDAC App al dispositivo con un tocco.";
      return;
    }

    if (!window.isSecureContext && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      installButton.textContent = "Come si installa";
      installText.textContent = "Per l’installazione PWA serve la pubblicazione in HTTPS. In locale puoi comunque provarla su localhost.";
      return;
    }

    installButton.textContent = "Come si installa";
    installText.textContent = "Su alcuni browser il prompt non appare subito: puoi comunque seguire le istruzioni manuali di installazione.";
  }

  async function handleInstallClick() {
    if (!installButton) return;

    if (isStandaloneMode()) {
      openOverlay("SDAC App", getInstallHelpHtml());
      return;
    }

    if (!canUseInstallPrompt()) {
      openOverlay("Installa SDAC App", getInstallHelpHtml());
      return;
    }

    try {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
    } catch (err) {
      console.warn("Prompt di installazione non disponibile", err);
    } finally {
      deferredInstallPrompt = null;
      updateInstallUi();
    }
  }

  function openOverlay(title, html, options = {}) {
    if (!overlay || !overlayPanel || !overlayTitle || !overlayBody) return;
    overlayTitle.textContent = title;
    overlayBody.innerHTML = html;
    overlay.hidden = false;
    overlayPanel.classList.toggle("overlay__panel--wide", !!options.wide);
    overlayPanel.classList.toggle("overlay__panel--subscribe", !!options.subscribe);
    if (typeof options.onOpen === "function") {
      options.onOpen();
    }
  }

  function closeOverlay() {
    if (!overlay || !overlayPanel || !overlayBody) return;
    overlay.hidden = true;
    overlayPanel.classList.remove("overlay__panel--wide", "overlay__panel--subscribe");
    overlayBody.innerHTML = "";
  }

  function buildAuthSummaryHtml() {
    if (!authConfigured) {
      return `
        <div class="subInlineMessage is-warning">
          <strong>Supabase non configurato.</strong><br>
          Inserisci <code>SUPABASE_CONFIG.url</code> e <code>SUPABASE_CONFIG.anonKey</code> in <code>js/app.js</code> per attivare login, registrazione e abbonamenti reali.
        </div>
      `;
    }

    if (authErrorMessage) {
      return `
        <div class="subInlineMessage is-error">
          <strong>Errore Supabase:</strong> ${escapeHtml(authErrorMessage)}
        </div>
      `;
    }

    if (!isAuthenticated()) {
      return `
        <div class="subAuthGrid">
          <article class="subCard subCard--free">
            <div class="subCard__badge">Accedi</div>
            <h4>Hai già un account?</h4>
            <p class="muted">Accedi per ritrovare il tuo profilo e il piano attivo.</p>
            <form id="settingsLoginForm" class="subForm subForm--compact" novalidate>
              <label class="subField">
                <span>Email</span>
                <input class="input" type="email" name="email" autocomplete="email" placeholder="nome@email.it" value="${escapeHtml(checkoutDraft.email)}" />
              </label>
              <label class="subField">
                <span>Password</span>
                <input class="input" type="password" name="password" autocomplete="current-password" placeholder="Inserisci la password" />
              </label>
              <div class="subActions">
                <button class="chip chip--primary" type="submit">Accedi</button>
              </div>
            </form>
          </article>

          <article class="subCard subCard--premium">
            <div class="subCard__badge">Registrazione</div>
            <h4>Crea il tuo account</h4>
            <p class="muted">Registrati per salvare il profilo e gestire l'abbonamento.</p>
            <form id="settingsRegisterForm" class="subForm subForm--compact" novalidate>
              <label class="subField">
                <span>Nome e cognome</span>
                <input class="input" type="text" name="fullName" autocomplete="name" placeholder="Es. Alessandro Bellagamba" value="${escapeHtml(checkoutDraft.fullName)}" />
              </label>
              <label class="subField">
                <span>Email</span>
                <input class="input" type="email" name="email" autocomplete="email" placeholder="nome@email.it" value="${escapeHtml(checkoutDraft.email)}" />
              </label>
              <label class="subField">
                <span>Nome utente</span>
                <input class="input" type="text" name="username" autocomplete="username" placeholder="Es. luxandro010" value="${escapeHtml(checkoutDraft.username)}" />
              </label>
              <label class="subField">
                <span>Password</span>
                <input class="input" type="password" name="password" autocomplete="new-password" placeholder="Minimo 8 caratteri" />
              </label>
              <div class="subActions">
                <button class="chip chip--primary" type="submit">Crea account</button>
              </div>
            </form>
          </article>
        </div>
      `;
    }

    const effectiveState = getEffectiveMembershipState();
    const canManageSubscription = effectiveState.plan === "premium";

    return `
      <section class="subSignupCard">
        <div class="subSignupCard__head">
          <div>
            <h4>Profilo collegato</h4>
            <p class="muted">Da qui puoi vedere il tuo profilo, aggiornare i dati e gestire il tuo piano.</p>
          </div>
          <div class="subStatusBadge">${getPlanLabel(effectiveState.plan)}</div>
        </div>

        <div class="subAccountGrid">
          <div class="subAccountItem">
            <span>Email</span>
            <strong>${escapeHtml(authProfile?.email || authSession?.user?.email || "—")}</strong>
          </div>
          <div class="subAccountItem">
            <span>Nome utente</span>
            <strong>${escapeHtml(authProfile?.username || "—")}</strong>
          </div>
          <div class="subAccountItem">
            <span>Nome</span>
            <strong>${escapeHtml(authProfile?.full_name || "—")}</strong>
          </div>
          <div class="subAccountItem">
            <span>Piano</span>
            <strong>${getPlanLabel(effectiveState.plan)}</strong>
          </div>
        </div>

        <div class="subActions">
          <button class="chip chip--button" type="button" id="settingsRefreshProfile">Aggiorna profilo</button>
          ${canManageSubscription ? '<button class="chip chip--button" type="button" id="settingsManageSubscription">Gestisci abbonamento</button>' : ''}
          <button class="chip chip--button" type="button" id="settingsLogoutButton">Esci</button>
        </div>

        <div class="subNoteList">
          <p>Puoi gestire il tuo piano in qualsiasi momento.</p>
          <p><strong>Nota:</strong> l'app è attualmente in fase di sviluppo e ampliamento.</p>
        </div>
      </section>
    `;
  }

  function buildUserHtml() {
    const state = getEffectiveMembershipState();
    const loggedIn = isAuthenticated();
    const heroTitle = loggedIn ? "Profilo e piano" : "Accesso e piano";
    const heroText = loggedIn
      ? "Da qui puoi vedere il tuo profilo, aggiornare i dati e gestire il tuo piano."
      : "Accedi o registrati per salvare il tuo profilo e gestire l'abbonamento.";
    const areaText = loggedIn
      ? "Gestisci il tuo account, il profilo e il piano attivo."
      : "Accedi o registrati per iniziare a usare il tuo profilo SDAC App.";

    return `
      <div class="subscribeFlow">
        <section class="subHero">
          <div>
            <div class="subHero__eyebrow">Utente SDAC App</div>
            <h3>${heroTitle}</h3>
            <p>${heroText}</p>
          </div>
        </section>

        <section class="subPlansGrid subPlansGrid--settings">
          <article class="subCard subCard--free">
            <div class="subCard__badge">Piano</div>
            <h4>Stato attuale</h4>
            <ul class="subList">
              <li><strong>Piano:</strong> ${getPlanLabel(state.plan)}</li>
              <li><strong>Email:</strong> ${escapeHtml(state.email || "—")}</li>
              <li><strong>Utente:</strong> ${escapeHtml(state.username || "—")}</li>
            </ul>
          </article>

          <article class="subCard subCard--premium">
            <div class="subCard__badge">Abbonamento</div>
            <h4>Gestione piano</h4>
            <ul class="subList">
              <li>Versione Free con limiti attivi</li>
              <li>Versione Premium con strumenti completi</li>
              <li>Puoi gestire il tuo piano in qualsiasi momento.</li>
            </ul>
          </article>
        </section>

        <section class="subSignupCard">
          <div class="subSignupCard__head">
            <div>
              <h4>Area utente</h4>
              <p class="muted">${areaText}</p>
            </div>
          </div>
          ${buildAuthSummaryHtml()}
          <div id="settingsInlineMessage" class="subInlineMessage" role="status" aria-live="polite"></div>
        </section>
      </div>
    `;
  }

  function buildSettingsHtml() {
    return `
      <div class="subscribeFlow">
        <section class="subHero">
          <div>
            <div class="subHero__eyebrow">Impostazioni SDAC App</div>
            <h3>Preferenze e informazioni</h3>
            <p>
              Qui puoi raccogliere testi descrittivi, preferenze dell'app e strumenti utili.
              Il contenuto relativo a profilo, accesso e abbonamento resta nel pannello <strong>Utente</strong>.
            </p>
          </div>
        </section>

        <section class="subPlansGrid subPlansGrid--settings">
          <article class="subCard subCard--lessons">
            <div class="subCard__badge">Installazione</div>
            <h4>SDAC App</h4>
            <ul class="subList">
              <li>Installazione PWA supportata su browser compatibili</li>
              <li>Puoi aggiungere l'app alla schermata Home del dispositivo</li>
              <li>Questa sezione può ospitare guida, preferenze e strumenti futuri</li>
            </ul>
          </article>

          <article class="subCard subCard--free">
            <div class="subCard__badge">Impostazioni</div>
            <h4>Spazio pronto per le prossime rifiniture</h4>
            <ul class="subList">
              <li>Qui potrai inserire testi descrittivi e preferenze dell'app</li>
              <li>In futuro potrai aggiungere strumenti e opzioni dedicate</li>
              <li>Il pannello Utente gestisce già accesso, profilo e abbonamento</li>
            </ul>
          </article>
        </section>
      </div>
    `;
  }

  function setSubscribeMessage(message, type = "info") {
    const messageBox = overlayBody?.querySelector("#subInlineMessage");
    if (!messageBox) return;
    messageBox.className = `subInlineMessage is-${type}`;
    messageBox.innerHTML = message;
  }


  function setSettingsMessage(message, type = "info") {
    const messageBox = overlayBody?.querySelector("#settingsInlineMessage");
    if (!messageBox) return;
    messageBox.className = `subInlineMessage is-${type}`;
    messageBox.innerHTML = message;
  }


  function readSettingsRegisterForm(form) {
    const fd = new FormData(form);
    return {
      fullName: String(fd.get("fullName") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      username: String(fd.get("username") || "").trim(),
      password: String(fd.get("password") || "")
    };
  }

  function readSettingsLoginForm(form) {
    const fd = new FormData(form);
    return {
      email: String(fd.get("email") || "").trim(),
      password: String(fd.get("password") || "")
    };
  }

  function validateRegisterData(data) {
    if (!data.fullName || data.fullName.length < 3) {
      return "Inserisci nome e cognome.";
    }
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      return "Inserisci un indirizzo email valido.";
    }
    if (!/^[a-zA-Z0-9._-]{3,40}$/.test(data.username)) {
      return "Scegli un nome utente di almeno 3 caratteri (lettere, numeri, punto, trattino o underscore).";
    }
    if (!data.password || data.password.length < 8) {
      return "La password deve contenere almeno 8 caratteri.";
    }
    return "";
  }

  async function registerAccount(data) {
    if (!supabaseClient) {
      throw new Error("Supabase non configurato.");
    }
    const { data: response, error } = await supabaseClient.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          username: data.username,
          full_name: data.fullName
        }
      }
    });
    if (error) throw error;
    if (response?.session) {
      authSession = response.session;
      await refreshRemoteState({ silent: true });
    }
    setCheckoutDraft({
      fullName: data.fullName,
      email: data.email,
      username: data.username
    });
    return response;
  }

  async function loginAccount(data) {
    if (!supabaseClient) {
      throw new Error("Supabase non configurato.");
    }
    const { data: response, error } = await supabaseClient.auth.signInWithPassword({
      email: data.email,
      password: data.password
    });
    if (error) throw error;
    authSession = response.session || null;
    await refreshRemoteState({ silent: true });
    return response;
  }

  async function logoutAccount() {
    if (!supabaseClient) return;
    const { error } = await supabaseClient.auth.signOut({ scope: "local" });
    if (error) throw error;
    authSession = null;
    authProfile = null;
    hasPremiumAccess = false;
    setLocalMembershipState({
      plan: "free",
      provider: "",
      email: "",
      username: "",
      updatedAt: new Date().toISOString()
    });
    notifyMembershipChange();
  }

  async function refreshRemoteState(options = {}) {
    if (!authConfigured || !supabaseClient || !authSession?.user) {
      authProfile = null;
      hasPremiumAccess = false;
      if (!options.silent) notifyMembershipChange();
      return null;
    }

    const userId = authSession.user.id;

    const [{ data: profileData, error: profileError }, { data: premiumData, error: premiumError }] = await Promise.all([
      supabaseClient
        .from("profiles")
        .select("id,email,username,full_name,plan,is_owner")
        .eq("id", userId)
        .single(),
      supabaseClient.rpc("current_user_has_premium_access")
    ]);

    if (profileError) {
      authProfile = {
        email: authSession.user.email || "",
        username: checkoutDraft.username || "",
        full_name: checkoutDraft.fullName || "",
        plan: "free",
        is_owner: false
      };
    } else {
      authProfile = profileData;
    }

    if (premiumError) {
      hasPremiumAccess = authProfile?.plan === "premium" || authProfile?.plan === "admin" || !!authProfile?.is_owner;
    } else {
      hasPremiumAccess = !!premiumData;
    }

    setLocalMembershipState({
      plan: hasPremiumAccess ? "free" : (localMembershipState.plan === "premium_pending" ? "premium_pending" : "free"),
      email: authProfile?.email || authSession.user.email || "",
      username: authProfile?.username || "",
      updatedAt: new Date().toISOString()
    });
    if (hasPremiumAccess && localMembershipState.plan === "premium_pending") {
      localMembershipState.plan = "free";
      writeJson(MEMBERSHIP_STATE_KEY, localMembershipState);
    }

    if (!options.silent) notifyMembershipChange();
    return authProfile;
  }

  async function initSupabase() {
    authConfigured = getSupabaseEnabled();
    if (!authConfigured) {
      authReady = true;
      updatePremiumUi();
      return;
    }

    if (!window.supabase?.createClient) {
      authErrorMessage = "Libreria Supabase non caricata.";
      authReady = true;
      updatePremiumUi();
      return;
    }

    try {
      supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });

      const { data, error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      authSession = data.session || null;

      if (authSession?.user) {
        await refreshRemoteState({ silent: true });
      }

      supabaseClient.auth.onAuthStateChange(async (_event, session) => {
        authSession = session;
        if (!session) {
          authProfile = null;
          hasPremiumAccess = false;
          setLocalMembershipState({
            plan: "free",
            provider: "",
            email: "",
            username: "",
            updatedAt: new Date().toISOString()
          });
        }
        if (session?.user) {
          await refreshRemoteState({ silent: true });
        }
        notifyMembershipChange();
      });
    } catch (err) {
      authErrorMessage = err?.message || "Impossibile inizializzare Supabase.";
      console.warn("Supabase init failed", err);
    } finally {
      authReady = true;
      updatePremiumUi();
    }
  }

  function buildSubscriptionHtml(featureLabel = "") {
    const state = getEffectiveMembershipState();
    const currentPlan = getPlanLabel(state.plan);
    const featureNote = featureLabel
      ? `<div class="subNotice subNotice--feature"><strong>Funzione Premium:</strong> ${escapeHtml(featureLabel)}. Puoi continuare in Free oppure attivare l’abbonamento.</div>`
      : "";

    const annualChecked = checkoutDraft.billingCycle !== "monthly" ? "checked" : "";
    const monthlyChecked = checkoutDraft.billingCycle === "monthly" ? "checked" : "";
    const loggedIn = isAuthenticated();
    const paymentProvider = checkoutDraft.paymentProvider || "stripe";
    const stripeChecked = paymentProvider !== "paypal" ? "checked" : "";
    const paypalChecked = paymentProvider === "paypal" ? "checked" : "";
    const accountEmail = loggedIn ? (authProfile?.email || authSession?.user?.email || checkoutDraft.email) : checkoutDraft.email;
    const accountUsername = loggedIn ? (authProfile?.username || checkoutDraft.username) : checkoutDraft.username;
    const accountFullName = loggedIn ? (authProfile?.full_name || checkoutDraft.fullName) : checkoutDraft.fullName;
    const premiumUser = state.plan === "premium" || state.plan === "admin";

    return `
      <div class="subscribeFlow">
        ${featureNote}
        <section class="subHero">
          <div>
            <div class="subHero__eyebrow">Piano attuale: ${currentPlan}</div>
            <h3>Sblocca tutto il potenziale di SDAC App</h3>
            <p>
              Gli strumenti base sono gratuiti, ma se passi all’abbonamento puoi usare SDAC App senza limiti,
              salvare i tuoi progetti e condividere i tuoi lavori.
            </p>
          </div>
          <div class="subHero__cta">
            <button class="chip chip--button" type="button" id="subContinueFree">Continua con Free</button>
          </div>
        </section>

        <section class="subPlansGrid" aria-label="Confronto piani">
          <article class="subCard subCard--free">
            <div class="subCard__badge">Free</div>
            <h4>Versione Free</h4>
            <ul class="subList">
              <li>Dizionario del videomaker completo</li>
              <li>Taccuino film con lista personale, preferiti e lista SDAC</li>
              <li>Piano di Produzione con 1 progetto salvabile</li>
              <li>Storyboard e Decoupage con 1 progetto salvabile</li>
              <li>Anteprime e presentazione di Cinema in azione</li>
              <li>Accesso completo a Shopping</li>
            </ul>
          </article>

          <article class="subCard subCard--premium">
            <div class="subCard__badge">Abbonamento</div>
            <h4>Versione Abbonamento</h4>
            <ul class="subList">
              <li>Piano di Produzione con salvataggi illimitati, archivio, export e condivisione</li>
              <li>Storyboard con salvataggi illimitati, archivio, export e condivisione</li>
              <li>Taccuino film con export e condivisione della tua lista</li>
              <li>Accesso completo agli strumenti senza limitazioni di utilizzo</li>
              <li>Vantaggi e contenuti extra dedicati agli utenti abbonati</li>
              <li>Customer Portal Stripe per gestire l'abbonamento</li>
            </ul>
          </article>

          <article class="subCard subCard--lessons">
            <div class="subCard__badge">Cinema in azione</div>
            <h4>Moduli online dei corsi</h4>
            <ul class="subList">
              <li>Anteprime e presentazione dei moduli</li>
              <li>Possibili vantaggi o sconti per gli abbonati</li>
              <li>Moduli completi e percorsi acquistabili separatamente</li>
            </ul>
          </article>
        </section>

        <section class="subSignupCard">
          <div class="subSignupCard__head">
            <div>
              <h4>${premiumUser ? 'Gestisci il tuo piano' : 'Attiva il tuo abbonamento'}</h4>
              <p class="muted">
                ${loggedIn
                  ? "Il tuo account è già collegato."
                  : "Se non hai ancora un account, l'app prova a crearlo prima di aprire il checkout Stripe."}
              </p>
            </div>
            <div class="subStatusBadge">${currentPlan}</div>
          </div>

          ${!authConfigured ? `
            <div class="subInlineMessage is-warning">
              <strong>Supabase non configurato.</strong><br>
              Per usare checkout e account reali devi inserire <code>SUPABASE_CONFIG.url</code> e <code>SUPABASE_CONFIG.anonKey</code> in <code>js/app.js</code>.
            </div>
          ` : ""}

          ${premiumUser && loggedIn ? `
            <div class="subActions" style="margin-bottom:12px;">
              <button class="chip chip--button" type="button" id="subManageSubscription">Gestisci abbonamento</button>
            </div>
          ` : ""}

          <form id="subCheckoutForm" class="subForm" novalidate>
            <div class="subFormGrid">
              <label class="subField">
                <span>Nome e cognome</span>
                <input class="input" type="text" name="fullName" maxlength="120" autocomplete="name" placeholder="Es. Alessandro Bellagamba" value="${escapeHtml(accountFullName)}" ${loggedIn ? "readonly" : ""} />
              </label>

              <label class="subField">
                <span>Email</span>
                <input class="input" type="email" name="email" maxlength="120" autocomplete="email" placeholder="nome@email.it" value="${escapeHtml(accountEmail)}" ${loggedIn ? "readonly" : ""} />
              </label>

              <label class="subField">
                <span>Nome utente</span>
                <input class="input" type="text" name="username" maxlength="40" autocomplete="username" placeholder="Es. luxandro010" value="${escapeHtml(accountUsername)}" ${loggedIn ? "readonly" : ""} />
              </label>

              <label class="subField">
                <span>Codice promozionale</span>
                <input class="input" type="text" name="promoCode" maxlength="40" autocomplete="off" placeholder="Es. STUDENTI-SDAC" value="${escapeHtml(checkoutDraft.promoCode)}" />
              </label>

              ${!loggedIn ? `
                <label class="subField">
                  <span>Password</span>
                  <input class="input" type="password" name="password" minlength="8" autocomplete="new-password" placeholder="Minimo 8 caratteri" />
                </label>

                <label class="subField">
                  <span>Conferma password</span>
                  <input class="input" type="password" name="passwordConfirm" minlength="8" autocomplete="new-password" placeholder="Ripeti la password" />
                </label>
              ` : `
                <div class="subInlineMessage is-info">
                  <strong>Account collegato:</strong><br>
                  puoi gestire il piano e l'abbonamento sul pannello dell'utente.
                </div>
              `}
            </div>

            <div class="subChoiceGroup" aria-label="Durata abbonamento">
              <div class="subChoiceGroup__label">Durata</div>
              <div class="subChoiceRow">
                <label class="subChoiceCard">
                  <input type="radio" name="billingCycle" value="annual" ${annualChecked} />
                  <span class="subChoiceCard__main">
                    <strong>${SUBSCRIPTION_CONFIG.plans.annual.label}</strong>
                    <small>${SUBSCRIPTION_CONFIG.plans.annual.price}</small>
                  </span>
                  <span class="subChoiceCard__tag">${SUBSCRIPTION_CONFIG.plans.annual.badge}</span>
                </label>
                <label class="subChoiceCard">
                  <input type="radio" name="billingCycle" value="monthly" ${monthlyChecked} />
                  <span class="subChoiceCard__main">
                    <strong>${SUBSCRIPTION_CONFIG.plans.monthly.label}</strong>
                    <small>${SUBSCRIPTION_CONFIG.plans.monthly.price}</small>
                  </span>
                  <span class="subChoiceCard__tag">${SUBSCRIPTION_CONFIG.plans.monthly.badge}</span>
                </label>
              </div>
            </div>

            <div class="subChoiceGroup" aria-label="Metodo di pagamento">
              <div class="subChoiceGroup__label">Pagamento</div>
              <div class="subChoiceRow">
                <label class="subChoiceCard subChoiceCard--provider">
                  <input type="radio" name="paymentProvider" value="stripe" ${stripeChecked} />
                  <span class="subChoiceCard__main">
                    <strong>${SUBSCRIPTION_CONFIG.providers.stripe.name}</strong>
                    <small>${SUBSCRIPTION_CONFIG.providers.stripe.note}</small>
                  </span>
                </label>
                <label class="subChoiceCard subChoiceCard--provider ${SUBSCRIPTION_CONFIG.providers.paypal.enabled ? "" : "is-disabled"}">
                  <input type="radio" name="paymentProvider" value="paypal" ${paypalChecked} ${SUBSCRIPTION_CONFIG.providers.paypal.enabled ? "" : "disabled"} />
                  <span class="subChoiceCard__main">
                    <strong>${SUBSCRIPTION_CONFIG.providers.paypal.name}</strong>
                    <small>${SUBSCRIPTION_CONFIG.providers.paypal.note}</small>
                  </span>
                </label>
              </div>
            </div>

            <div class="subActions">
              <button class="chip chip--primary" type="submit" id="subSubscribeButton">${premiumUser ? "Aggiorna" : "Abbonati"}</button>
              <button class="chip chip--button" type="button" id="subSaveDraft">Salva profilo</button>
            </div>

            <div class="subNoteList">
             </div>

            <div id="subInlineMessage" class="subInlineMessage" role="status" aria-live="polite"></div>
          </form>
        </section>
      </div>
    `;
  }

  function readSubscribeForm(form) {
    const formData = new FormData(form);
    return {
      fullName: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      username: String(formData.get("username") || "").trim(),
      promoCode: String(formData.get("promoCode") || "").trim(),
      password: String(formData.get("password") || ""),
      passwordConfirm: String(formData.get("passwordConfirm") || ""),
      billingCycle: String(formData.get("billingCycle") || "annual"),
      paymentProvider: String(formData.get("paymentProvider") || "stripe")
    };
  }

  function validateSubscribeData(data, options = {}) {
    const skipPassword = !!options.skipPassword;

    if (!data.fullName || data.fullName.length < 3) {
      return "Inserisci nome e cognome.";
    }
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      return "Inserisci un indirizzo email valido.";
    }
    if (!/^[a-zA-Z0-9._-]{3,40}$/.test(data.username)) {
      return "Scegli un nome utente di almeno 3 caratteri (lettere, numeri, punto, trattino o underscore).";
    }
    if (!skipPassword) {
      if (data.password.length < 8) {
        return "La password deve contenere almeno 8 caratteri.";
      }
      if (data.password !== data.passwordConfirm) {
        return "Le password non coincidono.";
      }
    }
    if (data.paymentProvider !== "stripe") {
      return "Per ora il checkout reale è disponibile solo con Stripe.";
    }
    return "";
  }

  function saveSubscribeDraft(form, extra = {}) {
    const data = readSubscribeForm(form);
    const draft = {
      fullName: data.fullName,
      email: data.email,
      username: data.username,
      promoCode: data.promoCode,
      paymentProvider: data.paymentProvider,
      billingCycle: data.billingCycle,
      ...extra
    };
    setCheckoutDraft(draft);
    return draft;
  }

  function markSubscriptionPending(draft) {
    setLocalMembershipState({
      plan: "premium_pending",
      provider: "stripe",
      cycle: draft.billingCycle,
      email: draft.email,
      username: draft.username,
      updatedAt: new Date().toISOString()
    });
  }

  async function ensureSignedInForCheckout(data) {
    if (isAuthenticated() && authSession?.user) {
      return authSession;
    }

    try {
      const signInResponse = await loginAccount({
        email: data.email,
        password: data.password
      });
      if (signInResponse?.session) {
        return signInResponse.session;
      }
    } catch (err) {
      // Continue with signup attempt
    }

    const signUpResponse = await registerAccount({
      fullName: data.fullName,
      email: data.email,
      username: data.username,
      password: data.password
    });

    if (!signUpResponse?.session) {
      throw new Error("Account creato. Se in Supabase è attiva la conferma email, controlla la posta, conferma il tuo indirizzo e poi accedi prima di proseguire con l'abbonamento.");
    }

    return signUpResponse.session;
  }

  async function openCustomerPortal(messageSetter = setSettingsMessage) {
    if (!authConfigured || !supabaseClient || !authSession?.user) {
      messageSetter("Per gestire l'abbonamento devi prima accedere con il tuo account.", "warning");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/create-portal-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getAccessToken()}`
        }
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Impossibile aprire il Customer Portal.");
      }

      if (!payload.url) {
        throw new Error("Customer Portal non disponibile.");
      }

      messageSetter("Apertura del Customer Portal Stripe in corso…", "success");
      window.setTimeout(() => {
        window.location.href = payload.url;
      }, 250);
    } catch (err) {
      messageSetter(err.message || "Impossibile aprire il Customer Portal.", "error");
    }
  }

  async function handleSubscribeSubmit(form) {
    const loggedIn = isAuthenticated();
    const data = readSubscribeForm(form);
    const error = validateSubscribeData(data, { skipPassword: loggedIn });

    if (error) {
      setSubscribeMessage(error, "error");
      return;
    }

    if (!authConfigured || !supabaseClient) {
      setSubscribeMessage("Supabase non configurato. Inserisci URL e anon key prima di usare il checkout reale.", "warning");
      return;
    }

    const draft = saveSubscribeDraft(form);

    try {
      setSubscribeMessage("Preparazione del checkout Stripe in corso…", "info");

      if (!loggedIn) {
        await ensureSignedInForCheckout(data);
      } else {
        await refreshRemoteState({ silent: true });
      }

      const response = await fetch(`${API_BASE}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify({
          billingCycle: data.billingCycle,
          promoCode: data.promoCode
        })
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (payload.code === "ALREADY_PREMIUM" && payload.portalUrl) {
          setSubscribeMessage("Hai già un abbonamento attivo. Ti porto al Customer Portal per gestirlo.", "warning");
          window.setTimeout(() => {
            window.location.href = payload.portalUrl;
          }, 350);
          return;
        }
        throw new Error(payload.error || "Impossibile creare il checkout Stripe.");
      }

      if (!payload.url) {
        throw new Error("Checkout URL non disponibile.");
      }

      markSubscriptionPending(draft);
      setSubscribeMessage("Reindirizzamento al checkout Stripe in corso…", "success");
      window.setTimeout(() => {
        window.location.href = payload.url;
      }, 250);
    } catch (err) {
      setSubscribeMessage(err.message || "Impossibile avviare il checkout.", "error");
    }
  }

  function bindChoiceCards(root = overlayBody) {
    if (!root) return;
    const cards = Array.from(root.querySelectorAll(".subChoiceCard"));
    const sync = () => {
      cards.forEach((card) => {
        const input = card.querySelector("input[type='radio']");
        card.classList.toggle("is-selected", !!input?.checked);
        card.classList.toggle("is-disabled", !!input?.disabled);
      });
    };
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        const input = card.querySelector("input[type='radio']");
        if (input && !input.disabled) {
          input.checked = true;
          sync();
        }
      });
      const input = card.querySelector("input[type='radio']");
      if (input) {
        input.addEventListener("change", sync);
      }
    });
    sync();
  }

  function setupSubscribeOverlay(featureLabel = "") {
    const form = overlayBody?.querySelector("#subCheckoutForm");
    const freeButton = overlayBody?.querySelector("#subContinueFree");
    const saveDraftButton = overlayBody?.querySelector("#subSaveDraft");
    const manageButton = overlayBody?.querySelector("#subManageSubscription");

    bindChoiceCards(overlayBody);

    if (freeButton) {
      freeButton.addEventListener("click", closeOverlay);
    }

    if (manageButton) {
      manageButton.addEventListener("click", () => {
        openCustomerPortal(setSubscribeMessage);
      });
    }

    if (saveDraftButton && form) {
      saveDraftButton.addEventListener("click", () => {
        const data = saveSubscribeDraft(form);
        setSubscribeMessage(`Profilo salvato in locale per ${escapeHtml(data.email || data.username || "il tuo account")}.`, "success");
      });
    }

    if (form) {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        await handleSubscribeSubmit(form);
      });

      form.addEventListener("input", () => {
        saveSubscribeDraft(form);
      });
    }

    if (featureLabel) {
      setSubscribeMessage("Puoi continuare con la versione Free oppure completare l’attivazione dell’abbonamento.", "info");
    } else if (isAuthenticated()) {
      setSubscribeMessage("Account collegato.", "info");
    }
  }

  function openSubscribeOverlay(options = {}) {
    const featureLabel = typeof options === "string" ? options : options.featureLabel || "";
    openOverlay("Abbonati", buildSubscriptionHtml(featureLabel), {
      wide: true,
      subscribe: true,
      onOpen: () => setupSubscribeOverlay(featureLabel)
    });
  }

  function setupSettingsOverlay() {
    const registerForm = overlayBody?.querySelector("#settingsRegisterForm");
    const loginForm = overlayBody?.querySelector("#settingsLoginForm");
    const logoutButton = overlayBody?.querySelector("#settingsLogoutButton");
    const refreshButton = overlayBody?.querySelector("#settingsRefreshProfile");
    const manageSubscriptionButton = overlayBody?.querySelector("#settingsManageSubscription");


    if (registerForm) {
      registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = readSettingsRegisterForm(registerForm);
        const error = validateRegisterData(data);
        if (error) {
          setSettingsMessage(error, "error");
          return;
        }

        try {
          const response = await registerAccount(data);
          if (response?.session) {
            setSettingsMessage("Account creato e accesso effettuato correttamente.", "success");
            window.setTimeout(() => openUserOverlay(), 350);
          } else {
            setSettingsMessage("Account creato. Se in Supabase è attiva la conferma email, controlla la posta, conferma il tuo indirizzo e poi accedi.", "warning");
          }
        } catch (err) {
          setSettingsMessage(err.message || "Impossibile creare l'account.", "error");
        }
      });
    }

    if (loginForm) {
      loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = readSettingsLoginForm(loginForm);

        if (!/^\S+@\S+\.\S+$/.test(data.email)) {
          setSettingsMessage("Inserisci un indirizzo email valido.", "error");
          return;
        }
        if (!data.password || data.password.length < 8) {
          setSettingsMessage("Inserisci la password corretta.", "error");
          return;
        }

        try {
          await loginAccount(data);
          setSettingsMessage("Accesso effettuato correttamente.", "success");
          window.setTimeout(() => openUserOverlay(), 350);
        } catch (err) {
          setSettingsMessage(err.message || "Impossibile accedere.", "error");
        }
      });
    }

    if (logoutButton) {
      logoutButton.addEventListener("click", async () => {
        try {
          await logoutAccount();
          setSettingsMessage("Sei uscito dal tuo account.", "success");
          window.setTimeout(() => openUserOverlay(), 350);
        } catch (err) {
          setSettingsMessage(err.message || "Impossibile uscire dall'account.", "error");
        }
      });
    }

    if (refreshButton) {
      refreshButton.addEventListener("click", async () => {
        try {
          await refreshRemoteState({ silent: false });
          setSettingsMessage("Profilo aggiornato correttamente.", "success");
          window.setTimeout(() => openUserOverlay(), 300);
        } catch (err) {
          setSettingsMessage("Impossibile aggiornare il profilo.", "error");
        }
      });
    }

    if (manageSubscriptionButton) {
      manageSubscriptionButton.addEventListener("click", () => {
        openCustomerPortal(setSettingsMessage);
      });
    }
  }

  function openUserOverlay() {
    openOverlay("Utente", buildUserHtml(), {
      wide: true,
      subscribe: true,
      onOpen: () => setupSettingsOverlay()
    });
  }

  function openSettingsOverlay() {
    openOverlay("Impostazioni", buildSettingsHtml(), {
      wide: true,
      subscribe: true
    });
  }

  async function pollPremiumStatus(attempts = 5, delayMs = 1600) {
    if (!authConfigured || !supabaseClient || !authSession?.user) return false;
    for (let i = 0; i < attempts; i += 1) {
      await refreshRemoteState({ silent: true });
      if (isPremium()) {
        notifyMembershipChange();
        return true;
      }
      await wait(delayMs);
    }
    notifyMembershipChange();
    return false;
  }

  async function handleCheckoutReturnFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const checkoutState = params.get("checkout");
    if (!checkoutState) return;

    const cleanUrl = `${window.location.pathname}${window.location.hash || ""}`;
    window.history.replaceState({}, document.title, cleanUrl);

    if (checkoutState === "success") {
      openOverlay("Abbonamento", `
        <div class="subscribeFlow">
          <div class="subInlineMessage is-success">
            <strong>Pagamento completato.</strong><br>
            Sto aggiornando il tuo piano. Se il badge resta in Free per qualche secondo, apri di nuovo Impostazioni o ricarica la pagina.
          </div>
        </div>
      `, { subscribe: true });

      setLocalMembershipState({
        plan: "premium_pending",
        updatedAt: new Date().toISOString()
      });

      await pollPremiumStatus();
      return;
    }

    if (checkoutState === "cancelled") {
      openOverlay("Abbonamento", `
        <div class="subscribeFlow">
          <div class="subInlineMessage is-warning">
            <strong>Checkout annullato.</strong><br>
            Nessuna modifica è stata applicata al tuo piano. Puoi riprovare quando vuoi.
          </div>
        </div>
      `, { subscribe: true });
    }
  }

  const membershipApi = {
    isPremium,
    isOwner,
    isAuthenticated,
    getUser: getAuthenticatedUser,
    getPlanState: getEffectiveMembershipState,
    getCheckoutDraft,
    openSubscribe: openSubscribeOverlay,
    openSettings: openSettingsOverlay,
    openUser: openUserOverlay,
    async refresh() {
      await refreshRemoteState({ silent: false });
      return getEffectiveMembershipState();
    },
    async logout() {
      await logoutAccount();
      return getEffectiveMembershipState();
    },
    requirePremium(featureLabel = "Funzione Premium") {
      if (isPremium()) return true;
      openSubscribeOverlay({ featureLabel });
      return false;
    }
  };
  window.SDACMembership = membershipApi;

  // Nuova interfaccia: il menu Strumenti resta chiuso e si apre dal logo SDAC App.
  menuCollapsed = true;
  applyMenuState(menuCollapsed);

  function toggleToolsMenu(forceOpen) {
    const nextOpen = typeof forceOpen === "boolean" ? forceOpen : menuCollapsed;
    menuCollapsed = !nextOpen;
    applyMenuState(menuCollapsed);
  }

  if (toolsMenuLauncher) {
    toolsMenuLauncher.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleToolsMenu();
    });
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleToolsMenu();
    });
  }

  document.addEventListener("click", (event) => {
    if (menuCollapsed) return;
    const target = event.target;
    if (toolsMenu?.contains(target) || toolsMenuLauncher?.contains(target)) return;
    toggleToolsMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menuCollapsed) toggleToolsMenu(false);
  });

  const initial = (window.location.hash || "#home").replace("#", "");
  showView(panels.some((p) => p.dataset.panel === initial) ? initial : "home");

  menuButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      showView(btn.dataset.view);
      toggleToolsMenu(false);
    });
  });

  document.addEventListener("click", (event) => {
    const jumpTarget = event.target.closest?.("[data-view-jump]");
    if (!jumpTarget) return;
    event.preventDefault();
    handleHomeJump(jumpTarget);
  });

  document.getElementById("homeRefreshRecent")?.addEventListener("click", () => {
    renderHomeRecentItems();
  });

  window.addEventListener("storage", (event) => {
    if ([HOME_PROD_PLANS_KEY, HOME_STORYBOARD_LIBRARY_KEY, HOME_NOTEBOOK_KEY].includes(event.key)) {
      renderHomeRecentItems();
    }
  });

  if (topbarAccount) {
    let accountPressTimer = null;
    let accountLongPressActive = false;

    const clearAccountPress = () => {
      if (accountPressTimer) {
        window.clearTimeout(accountPressTimer);
        accountPressTimer = null;
      }
    };

    topbarAccount.addEventListener("pointerdown", () => {
      clearAccountPress();
      accountLongPressActive = false;
      accountPressTimer = window.setTimeout(() => {
        accountLongPressActive = true;
        topbarAccount.classList.add("is-card-visible");
      }, 520);
    });

    ["pointerup", "pointercancel", "pointerleave", "blur"].forEach((eventName) => {
      topbarAccount.addEventListener(eventName, () => {
        clearAccountPress();
        if (eventName !== "pointerleave") {
          window.setTimeout(() => topbarAccount.classList.remove("is-card-visible"), 900);
        }
      });
    });

    topbarAccount.addEventListener("click", (event) => {
      if (accountLongPressActive) {
        event.preventDefault();
        accountLongPressActive = false;
        return;
      }
      topbarAccount.classList.remove("is-card-visible");
      openUserOverlay();
    });
  }

  document.getElementById("btnSettings")?.addEventListener("click", () => {
    openSettingsOverlay();
  });

  document.getElementById("btnSubscribe")?.addEventListener("click", () => {
    openSubscribeOverlay();
  });

  if (installButton) {
    installButton.addEventListener("click", handleInstallClick);
  }

  overlayClose?.addEventListener("click", closeOverlay);
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay();
  });

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    updateInstallUi();
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    updateInstallUi();
    openOverlay("SDAC App installata", `
      <p><strong>Installazione completata.</strong></p>
      <p class="muted">Ora SDAC App può essere aperta come una vera app dal dispositivo.</p>
    `);
  });

  window.addEventListener("load", async () => {
    await initSupabase();
    await handleCheckoutReturnFromUrl();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch((err) => {
        console.warn("Registrazione service worker fallita", err);
      });
    }
  });

  updatePremiumUi();
  updateTopbarAccountUi();
  updateInstallUi();
})();
