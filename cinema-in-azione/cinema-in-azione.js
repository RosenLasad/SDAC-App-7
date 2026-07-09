(function () {
  const STORAGE_KEY = "sdac_cinema_azione_regia_progress_v1";

  function getProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
    catch (err) { return {}; }
  }

  function saveProgress(progress) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
    catch (err) { /* localStorage non disponibile */ }
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    }[char]));
  }

  function initCinemaAction() {
    const root = document.getElementById("cinemaActionApp");
    const modulesEl = document.getElementById("ciaModules");
    const workspace = document.getElementById("ciaWorkspace");
    const infoBtn = document.getElementById("ciaInfoBtn");
    const infoPanel = document.getElementById("ciaInfoPanel");
    const infoClose = document.getElementById("ciaInfoClose");
    if (!root || !modulesEl || !workspace) return;

    const modules = window.CINEMA_ACTION_MODULES || [];
    const quizzes = window.CINEMA_ACTION_QUIZZES || {};
    const progress = getProgress();

    infoBtn?.addEventListener("click", () => { infoPanel.hidden = !infoPanel.hidden; });
    infoClose?.addEventListener("click", () => { infoPanel.hidden = true; });

    function renderModules() {
      modulesEl.innerHTML = modules.map((mod) => `
        <button class="ciaModuleCard" type="button" data-cia-module="${escapeHtml(mod.id)}" ${mod.available ? "" : "disabled"}>
          <span class="ciaModuleIcon" aria-hidden="true">${escapeHtml(mod.icon)}</span>
          <strong>${escapeHtml(mod.title)}</strong>
          <small>${escapeHtml(mod.description)}</small>
          <span class="ciaModuleStatus">${escapeHtml(mod.status)}</span>
        </button>
      `).join("");
    }

    function categoryCompletedCount(category) {
      return category.questions.filter((q) => progress[category.id]?.[q.level]?.completed).length;
    }

    function renderModule(moduleId) {
      const moduleData = quizzes[moduleId];
      if (!moduleData) return;
      workspace.innerHTML = `
        <div class="ciaBackRow">
          <div>
            <h2>${escapeHtml(moduleData.title)}</h2>
            <p class="muted">Scegli una categoria. Ogni categoria contiene 5 livelli di difficoltà.</p>
          </div>
          <button class="chip chip--button" type="button" data-cia-clear-workspace>Chiudi modulo</button>
        </div>
        <div class="ciaCategories">
          ${moduleData.categories.map((category) => `
            <button class="ciaCategoryCard" type="button" data-cia-category="${escapeHtml(category.id)}">
              <span class="ciaCategoryIcon" aria-hidden="true">${escapeHtml(category.icon)}</span>
              <strong>${escapeHtml(category.title)}</strong>
              <small class="muted">${escapeHtml(category.description)}</small>
              <span class="ciaCategoryProgress">Completati: ${categoryCompletedCount(category)}/5 livelli</span>
            </button>
          `).join("")}
        </div>
      `;
    }

    function findCategory(categoryId) {
      const moduleData = quizzes.regia;
      return moduleData?.categories.find((category) => category.id === categoryId);
    }

    function renderLevels(categoryId) {
      const category = findCategory(categoryId);
      if (!category) return;
      workspace.innerHTML = `
        <div class="ciaBackRow">
          <div>
            <h2>${escapeHtml(category.icon)} ${escapeHtml(category.title)}</h2>
            <p class="muted">Scegli il livello. Le risposte vengono salvate in automatico sul dispositivo.</p>
          </div>
          <button class="chip chip--button" type="button" data-cia-open-module="regia">Torna alle categorie</button>
        </div>
        <div class="ciaLevels">
          ${category.questions.map((q) => {
            const done = progress[category.id]?.[q.level]?.completed;
            return `<button class="ciaLevelBtn ${done ? "is-complete" : ""}" type="button" data-cia-level="${q.level}" data-cia-category="${escapeHtml(category.id)}">
              <strong>Livello ${q.level}</strong>
              <span class="muted">${done ? "Completato" : "Da fare"}</span>
            </button>`;
          }).join("")}
        </div>
      `;
    }

    function renderQuestion(categoryId, level) {
      const category = findCategory(categoryId);
      const question = category?.questions.find((q) => Number(q.level) === Number(level));
      if (!category || !question) return;
      workspace.innerHTML = `
        <div class="ciaBackRow">
          <button class="chip chip--button" type="button" data-cia-levels="${escapeHtml(category.id)}">← Livelli</button>
          <span class="ciaMiniTag">${escapeHtml(category.title)} · Livello ${question.level}</span>
        </div>
        <article class="card ciaQuestionCard">
          <div class="ciaQuestionTop">
            <h3 class="ciaQuestionTitle">${escapeHtml(question.question)}</h3>
            <span class="ciaMiniTag">1 domanda demo</span>
          </div>
          <div class="ciaAnswerGrid">
            ${question.answers.map((answer, index) => `
              <button class="ciaAnswerBtn" type="button" data-cia-answer="${index}">${escapeHtml(answer)}</button>
            `).join("")}
          </div>
          <div id="ciaFeedback" class="ciaFeedback" hidden></div>
        </article>
      `;
    }

    function renderResult(categoryId, level, isCorrect, question) {
      const category = findCategory(categoryId);
      const score = isCorrect ? 100 : 0;
      workspace.innerHTML = `
        <article class="card ciaQuestionCard">
          <span class="ciaMiniTag">Risultato finale</span>
          <h2>${escapeHtml(category?.title || "Quiz")} · Livello ${level}</h2>
          <div class="ciaResultScore">${score}%</div>
          <p class="muted">${isCorrect ? "Risposta corretta. Hai completato questo livello." : "Risposta sbagliata. Il livello è salvato, ma puoi riprovarlo quando vuoi."}</p>
          <div class="ciaFeedback"><strong>Spiegazione:</strong> ${escapeHtml(question.explanation)}</div>
          <div class="ciaResultActions">
            <button class="chip chip--primary" type="button" data-cia-levels="${escapeHtml(categoryId)}">Torna ai livelli</button>
            <button class="chip chip--button" type="button" data-cia-open-module="regia">Torna alle categorie</button>
          </div>
        </article>
      `;
    }

    modulesEl.addEventListener("click", (event) => {
      const button = event.target.closest("[data-cia-module]");
      if (!button || button.disabled) return;
      renderModule(button.getAttribute("data-cia-module"));
      workspace.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    workspace.addEventListener("click", (event) => {
      const target = event.target;
      const closeBtn = target.closest?.("[data-cia-clear-workspace]");
      if (closeBtn) { workspace.innerHTML = ""; return; }

      const openModule = target.closest?.("[data-cia-open-module]");
      if (openModule) { renderModule(openModule.getAttribute("data-cia-open-module")); return; }

      const categoryBtn = target.closest?.("[data-cia-category]");
      if (categoryBtn && !categoryBtn.hasAttribute("data-cia-level")) {
        renderLevels(categoryBtn.getAttribute("data-cia-category"));
        return;
      }

      const levelsBtn = target.closest?.("[data-cia-levels]");
      if (levelsBtn) { renderLevels(levelsBtn.getAttribute("data-cia-levels")); return; }

      const levelBtn = target.closest?.("[data-cia-level]");
      if (levelBtn) {
        renderQuestion(levelBtn.getAttribute("data-cia-category"), levelBtn.getAttribute("data-cia-level"));
        return;
      }

      const answerBtn = target.closest?.("[data-cia-answer]");
      if (answerBtn) {
        const tag = workspace.querySelector(".ciaMiniTag")?.textContent || "";
        const levelMatch = tag.match(/Livello\s+(\d+)/i);
        const level = Number(levelMatch?.[1] || 1);
        const categoryTitle = tag.split("·")[0]?.trim();
        const category = (quizzes.regia?.categories || []).find((item) => item.title === categoryTitle);
        const question = category?.questions.find((q) => q.level === level);
        if (!category || !question) return;
        const selected = Number(answerBtn.getAttribute("data-cia-answer"));
        const isCorrect = selected === question.correct;
        workspace.querySelectorAll("[data-cia-answer]").forEach((btn) => {
          btn.disabled = true;
          const idx = Number(btn.getAttribute("data-cia-answer"));
          if (idx === question.correct) btn.classList.add("is-correct");
          if (idx === selected && !isCorrect) btn.classList.add("is-wrong");
        });
        progress[category.id] = progress[category.id] || {};
        progress[category.id][level] = { completed: true, correct: isCorrect, updatedAt: new Date().toISOString() };
        saveProgress(progress);
        const feedback = document.getElementById("ciaFeedback");
        if (feedback) {
          feedback.hidden = false;
          feedback.innerHTML = `<strong>${isCorrect ? "Corretto." : "Non corretto."}</strong> ${escapeHtml(question.explanation)}`;
        }
        window.setTimeout(() => renderResult(category.id, level, isCorrect, question), 650);
      }
    });

    renderModules();
  }

  document.addEventListener("DOMContentLoaded", initCinemaAction);
})();
