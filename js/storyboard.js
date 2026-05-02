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

  const canvas = document.getElementById("sbCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const baseCanvas = document.createElement("canvas");
  baseCanvas.width = canvas.width;
  baseCanvas.height = canvas.height;
  const baseCtx = baseCanvas.getContext("2d", { willReadFrequently: true });

  const colorEl = document.getElementById("sbColor");
  const colorToggleEl = document.getElementById("sbColorToggle");
  const colorSwatchEl = document.getElementById("sbColorSwatch");
  const sizeEl = document.getElementById("sbSize");
  const sizeToggleEl = document.getElementById("sbSizeToggle");
  const sizePopoverEl = document.getElementById("sbSizePopover");
  const sizeLabel = document.getElementById("sbSizeLabel");
  const toolToggleEl = document.getElementById("sbToolToggle");
  const toolMenuEl = document.getElementById("sbToolMenu");
  const toolLabelEl = document.getElementById("sbToolLabel");
  const toolOptionEls = Array.from(document.querySelectorAll(".storyboardToolOption"));
  const thirdsToggleEl = document.getElementById("sbThirdsToggle");
  const thirdsOverlayEl = document.getElementById("sbThirdsOverlay");
  const aspectToggleEl = document.getElementById("sbAspectToggle");
  const aspectMenuEl = document.getElementById("sbAspectMenu");
  const aspectOverlayEl = document.getElementById("sbAspectOverlay");
  const aspectOptionEls = Array.from(document.querySelectorAll(".storyboardAspectOption"));
  const btnNewScene = document.getElementById("sbNewScene");
  const btnAddRect = document.getElementById("sbAddRect");
  const btnAddTriangle = document.getElementById("sbAddTriangle");
  const btnAddLine = document.getElementById("sbAddLine");
  const lineMenuEl = document.getElementById("sbLineMenu");
  const lineOptionEls = Array.from(document.querySelectorAll(".storyboardLineOption"));
  const btnAddArrow = document.getElementById("sbAddArrow");
  const arrowMenuEl = document.getElementById("sbArrowMenu");
  const arrowOptionEls = Array.from(document.querySelectorAll(".storyboardArrowOption"));
  const btnAddText = document.getElementById("sbAddText");
  const circleToggleEl = document.getElementById("sbCircleToggle");
  const circleMenuEl = document.getElementById("sbCircleMenu");
  const circleOptionEls = Array.from(document.querySelectorAll(".storyboardCircleOption"));
  const btnDeleteShape = document.getElementById("sbDeleteShape");
  const btnRedo = document.getElementById("sbRedo");
  const btnDuplicateShape = document.getElementById("sbDuplicateShape");
  const textToolbarEl = document.getElementById("sbTextToolbar");
  const textSizeEl = document.getElementById("sbTextSize");
  const textSizeDownEl = document.getElementById("sbTextSizeDown");
  const textSizeUpEl = document.getElementById("sbTextSizeUp");
  const textFontEl = document.getElementById("sbTextFont");
  const textBoldEl = document.getElementById("sbTextBold");
  const textItalicEl = document.getElementById("sbTextItalic");
  const textUnderlineEl = document.getElementById("sbTextUnderline");
  const textAlignToggleEl = document.getElementById("sbTextAlignToggle");
  const textAlignMenuEl = document.getElementById("sbTextAlignMenu");
  const textAlignLeftEl = document.getElementById("sbTextAlignLeft");
  const textAlignCenterEl = document.getElementById("sbTextAlignCenter");
  const textAlignRightEl = document.getElementById("sbTextAlignRight");
  const textAlignOptionEls = [textAlignLeftEl, textAlignCenterEl, textAlignRightEl].filter(Boolean);
  const textColorEl = document.getElementById("sbTextColor");
  let textBgColorEl = document.getElementById("sbTextBgColor");
  const textLabelEl = document.getElementById("sbTextLabel");
  const textOpacityToggleEl = document.getElementById("sbTextOpacityToggle");
  const textOpacityPopoverEl = document.getElementById("sbTextOpacityPopover");
  const textOpacityEl = document.getElementById("sbTextOpacity");
  const textOpacityValueEl = document.getElementById("sbTextOpacityValue");
  const textDuplicateEl = document.getElementById("sbTextDuplicate");
  const canvasStageEl = document.querySelector(".storyboardCanvasStage");
  const shotCanvasCardEl = canvas?.closest(".storyboardCanvasCard, .card, .storyboardSurfaceCard") || canvasStageEl?.closest(".storyboardCanvasCard, .card, .storyboardSurfaceCard") || null;

  const decCanvas = document.getElementById("sbDecCanvas");
  const decCtx = decCanvas ? decCanvas.getContext("2d", { willReadFrequently: true }) : null;
  const decBaseCanvas = decCanvas ? document.createElement("canvas") : null;
  if (decBaseCanvas && decCanvas) {
    decBaseCanvas.width = decCanvas.width;
    decBaseCanvas.height = decCanvas.height;
  }
  const decBaseCtx = decBaseCanvas ? decBaseCanvas.getContext("2d", { willReadFrequently: true }) : null;
  const decDetailsEl = document.getElementById("sbDecoupageDetails");
  const decCanvasCardEl = decCanvas?.closest(".storyboardDecoupageCard, .card, .storyboardSurfaceCard") || decDetailsEl?.closest(".storyboardDecoupageCard, .card, .storyboardSurfaceCard") || null;
  const btnDecAddCamera = document.getElementById("sbDecAddCamera");
  const btnDecAddPerson = document.getElementById("sbDecAddPerson");
  const btnDecAddLdc = document.getElementById("sbDecAddLdc");
  const btnDecAddMdp = document.getElementById("sbDecAddMdp");
  const btnDecAddDolly = document.getElementById("sbDecAddDolly");
  const btnDecLetterToggle = document.getElementById("sbDecLetterToggle");
  const btnDecNumberToggle = document.getElementById("sbDecNumberToggle");
  const decLetterMenuEl = document.getElementById("sbDecLetterMenu");
  const decNumberMenuEl = document.getElementById("sbDecNumberMenu");
  const decLetterOptionEls = Array.from(document.querySelectorAll(".storyboardDecLetterOption, #sbDecLetterMenu .storyboardDecQuickOption"));
  const decNumberOptionEls = Array.from(document.querySelectorAll(".storyboardDecNumberOption, #sbDecNumberMenu .storyboardDecQuickOption"));
  const btnDecClear = document.getElementById("sbDecClear");

  const btnClear = document.getElementById("sbClear");
  const btnUndo = document.getElementById("sbUndo");
  const btnExportSingle = document.getElementById("sbExportSingle");
  const btnExportZip = document.getElementById("sbExportZip");
  const btnShareScene = document.getElementById("sbShareScene");
  const btnSaveScene = document.getElementById("sbSaveScene");
  const btnOpenLibrary = document.getElementById("sbOpenLibrary");

  const shotListEl = document.getElementById("sbShotList");
  const shotCountEl = document.getElementById("sbShotCount");
  const canvasTitleEl = document.getElementById("sbCanvasTitle");
  const sceneNameEl = document.getElementById("sbSceneName");
  const shotNameEl = document.getElementById("sbShotName");
  const notesDetailsEl = document.getElementById("sbNotesDetails");
  const notesLocationEl = document.getElementById("sbNotesLocation");
  const notesCharactersEl = document.getElementById("sbNotesCharacters");
  const notesDescriptionEl = document.getElementById("sbNotesDescription");
  const notesDialogueEl = document.getElementById("sbNotesDialogue");
  const notesCameraEl = document.getElementById("sbNotesCamera");
  const notesAudioEl = document.getElementById("sbNotesAudio");
  const notesExtraEl = document.getElementById("sbNotesExtra");
  const btnAddShot = document.getElementById("sbAddShot");
  const btnDuplicateShot = document.getElementById("sbDuplicateShot");
  const btnDeleteShot = document.getElementById("sbDeleteShot");
  const libraryDialog = document.getElementById("sbLibraryDialog");
  const libraryListEl = document.getElementById("sbLibraryList");
  const libraryStatusEl = document.getElementById("sbLibraryStatus");
  const btnLibraryClose = document.getElementById("sbLibraryClose");

  const CURRENT_STORAGE_KEY = "sdac_storyboard_current_v1";
  const LIBRARY_STORAGE_KEY = "sdac_storyboard_library_v1";

  const HANDLE_SIZE = 14;
  const MIN_SHAPE_SIZE = 28;
  const LINE_HIT_TOLERANCE = 12;
  const SHAPE_STROKE = 3;
  const DEFAULT_TEXT_BG_COLOR = "#111111";

  if (textToolbarEl && !textBgColorEl) {
    const bgColorInput = document.createElement("input");
    bgColorInput.type = "color";
    bgColorInput.id = "sbTextBgColor";
    bgColorInput.className = "storyboardTextToolbar__color storyboardTextToolbar__color--bg";
    bgColorInput.title = "Colore etichetta";
    bgColorInput.setAttribute("aria-label", "Colore etichetta");
    bgColorInput.value = DEFAULT_TEXT_BG_COLOR;
    if (textLabelEl && textLabelEl.parentNode === textToolbarEl) {
      textToolbarEl.insertBefore(bgColorInput, textLabelEl);
    } else {
      textToolbarEl.appendChild(bgColorInput);
    }
    textBgColorEl = bgColorInput;
  }

  let drawing = false;
  let last = null;
  let nextShotId = 2;
  let nextShapeId = 1;
  let activeShotId = 1;
  let sceneName = "";
  let sceneRecordId = null;
  let lastSavedAt = null;
  let showThirdsGrid = false;
  let aspectRatioValue = "off";
  let selectedShapeId = null;
  let interaction = null;
  let textLongPressTimer = null;
  let textLongPressFired = false;
  let touchStartPoint = null;
  let currentTool = "hand";
  let currentLineStyle = "solid";
  let currentArrowType = "single";
  let activeSurface = "shot";
  let decSelectedShapeId = null;
  let decSelectedItemId = null;
  let decInteraction = null;
  let decNextItemId = 1;
  let currentDecLetter = "A";
  let currentDecNumber = "1";
  let decoupage = createEmptyDecoupage();

  let shots = [createEmptyShot(1, "Shot 1")];

  function createEmptyNotes(source = null) {
    return {
      location: typeof source?.location === "string" ? source.location : "",
      characters: typeof source?.characters === "string" ? source.characters : "",
      description: typeof source?.description === "string" ? source.description : "",
      dialogue: typeof source?.dialogue === "string" ? source.dialogue : "",
      camera: typeof source?.camera === "string" ? source.camera : "",
      audio: typeof source?.audio === "string" ? source.audio : "",
      notes: typeof source?.notes === "string" ? source.notes : ""
    };
  }

  function cloneDecoupageItems(items) {
    return (Array.isArray(items) ? items : []).map((item) => ({ ...item }));
  }

  function createEmptyDecoupage(source = null) {
    return {
      baseDataUrl: typeof source?.baseDataUrl === "string" ? source.baseDataUrl : null,
      items: cloneDecoupageItems(source?.items || []),
      shapes: cloneShapes(source?.shapes || []),
      history: Array.isArray(source?.history) ? [...source.history] : [],
      redo: Array.isArray(source?.redo) ? [...source.redo] : []
    };
  }

  function createEmptyShot(id, fallbackName, sceneSnapshot = null) {
    return {
      id,
      fallbackName,
      customName: "",
      baseDataUrl: sceneSnapshot?.baseDataUrl || null,
      shapes: Array.isArray(sceneSnapshot?.shapes) ? cloneShapes(sceneSnapshot.shapes) : [],
      history: Array.isArray(sceneSnapshot?.history) ? [...sceneSnapshot.history] : [],
      redo: Array.isArray(sceneSnapshot?.redo) ? [...sceneSnapshot.redo] : [],
      notes: createEmptyNotes(sceneSnapshot?.notes)
    };
  }

  function cloneShapes(shapes) {
    return (Array.isArray(shapes) ? shapes : []).map((shape) => ({ ...shape }));
  }

  function getActiveShot() {
    return shots.find((shot) => shot.id === activeShotId);
  }

  function getShotDisplayName(shot) {
    if (!shot) return "Shot";
    return (shot.customName || "").trim() || shot.fallbackName;
  }

  function sanitizeFileNamePart(value, fallback) {
    const normalized = String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return normalized || fallback;
  }

  function getSceneName() {
    return sceneName.trim();
  }

  function getSceneFileBase() {
    return sanitizeFileNamePart(getSceneName(), "scena-01");
  }

  function getShotFileBase(shot, index) {
    const shotPart = String(index + 1).padStart(2, "0");
    const shotNamePart = sanitizeFileNamePart(getShotDisplayName(shot), `shot-${shotPart}`);
    return `${shotPart}-${shotNamePart}`;
  }

  function countLabel() {
    return shots.length === 1 ? "1 shot" : `${shots.length} shot`;
  }

  function clearBaseCanvas() {
    baseCtx.save();
    baseCtx.setTransform(1, 0, 0, 1, 0, 0);
    baseCtx.globalCompositeOperation = "source-over";
    baseCtx.fillStyle = "#ffffff";
    baseCtx.fillRect(0, 0, baseCanvas.width, baseCanvas.height);
    baseCtx.restore();
  }

  function clearDisplayCanvas() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  function loadImageToContext(targetCtx, dataUrl) {
    return new Promise((resolve) => {
      targetCtx.save();
      targetCtx.setTransform(1, 0, 0, 1, 0, 0);
      targetCtx.globalCompositeOperation = "source-over";
      targetCtx.fillStyle = "#ffffff";
      targetCtx.fillRect(0, 0, canvas.width, canvas.height);
      targetCtx.restore();

      if (!dataUrl) {
        resolve();
        return;
      }
      const img = new Image();
      img.onload = () => {
        targetCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve();
      };
      img.onerror = () => {
        resolve();
      };
      img.src = dataUrl;
    });
  }

  async function loadBaseDataUrl(dataUrl) {
    await loadImageToContext(baseCtx, dataUrl);
    renderScene();
  }

  function snapshotBaseCanvas() {
    return baseCanvas.toDataURL("image/png");
  }

  function updateSceneField() {
    if (sceneNameEl && sceneNameEl.value !== sceneName) {
      sceneNameEl.value = sceneName;
    }
  }

  function updateShotField() {
    if (!shotNameEl) return;
    const activeShot = getActiveShot();
    const value = activeShot?.customName || "";
    if (shotNameEl.value !== value) {
      shotNameEl.value = value;
    }
  }

  function updateNotesFields() {
    const activeShot = getActiveShot();
    const notes = createEmptyNotes(activeShot?.notes);
    if (notesLocationEl && notesLocationEl.value !== notes.location) notesLocationEl.value = notes.location;
    if (notesCharactersEl && notesCharactersEl.value !== notes.characters) notesCharactersEl.value = notes.characters;
    if (notesDescriptionEl && notesDescriptionEl.value !== notes.description) notesDescriptionEl.value = notes.description;
    if (notesDialogueEl && notesDialogueEl.value !== notes.dialogue) notesDialogueEl.value = notes.dialogue;
    if (notesCameraEl && notesCameraEl.value !== notes.camera) notesCameraEl.value = notes.camera;
    if (notesAudioEl && notesAudioEl.value !== notes.audio) notesAudioEl.value = notes.audio;
    if (notesExtraEl && notesExtraEl.value !== notes.notes) notesExtraEl.value = notes.notes;
  }

  function formatDateTime(ts) {
    if (!ts) return "";
    try {
      return new Date(ts).toLocaleString("it-IT", { dateStyle: "short", timeStyle: "short" });
    } catch {
      return "";
    }
  }

  function updateSaveState(message) {
    libraryStatusEl.textContent = message;
  }

  function getAspectRatioNumber(value) {
    switch (value) {
      case "4:3": return 4 / 3;
      case "3:2": return 3 / 2;
      case "16:9": return 16 / 9;
      case "1.85:1": return 1.85;
      case "2.39:1": return 2.39;
      default: return null;
    }
  }


  function isDrawTool(value) {
    return ["pen", "eraser", "highlighter"].includes(value);
  }

  function clearStoryboardSelections() {
    selectedShapeId = null;
    interaction = null;
    clearTextLongPress();
    textLongPressFired = false;
    touchStartPoint = null;
    decSelectedShapeId = null;
    decSelectedItemId = null;
    decInteraction = null;
  }

  function getToolLabel(value) {
    switch (value) {
      case "hand": return "Mano";
      case "eraser": return "Gomma";
      case "highlighter": return "Evidenziatore";
      case "pen":
      default:
        return "Matita";
    }
  }

  function closeToolMenu() {
    if (toolMenuEl) toolMenuEl.hidden = true;
    if (toolToggleEl) toolToggleEl.setAttribute("aria-expanded", "false");
  }

  function closeSizePopover() {
    if (sizePopoverEl) sizePopoverEl.hidden = true;
    if (sizeToggleEl) sizeToggleEl.setAttribute("aria-expanded", "false");
  }

  function updateToolUi() {
    if (toolLabelEl) toolLabelEl.textContent = getToolLabel(currentTool);
    toolOptionEls.forEach((button) => {
      const active = (button.dataset.toolValue || "") === currentTool;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-checked", active ? "true" : "false");
    });
  }

  function setCurrentTool(value) {
    currentTool = ["hand", "pen", "eraser", "highlighter"].includes(value) ? value : "hand";
    if (isDrawTool(currentTool)) {
      clearStoryboardSelections();
      renderScene();
      renderDecoupageScene();
      updateDeleteShapeButton();
    }
    updateToolUi();
  }

  function updateStrokeUi() {
    if (sizeLabel) sizeLabel.textContent = String(sizeEl?.value || 4);
    if (colorSwatchEl) colorSwatchEl.style.background = colorEl?.value || "#111111";
  }

  function closeAspectMenu() {
    if (!aspectMenuEl || !aspectToggleEl) return;
    aspectMenuEl.hidden = true;
    aspectToggleEl.setAttribute("aria-pressed", aspectRatioValue !== "off" ? "true" : "false");
  }

  function closeCircleMenu() {
    if (!circleMenuEl || !circleToggleEl) return;
    circleMenuEl.hidden = true;
    circleToggleEl.setAttribute("aria-pressed", "false");
    circleToggleEl.classList.remove("is-active");
  }


  function closeLineMenu() {
    if (lineMenuEl) lineMenuEl.hidden = true;
    if (btnAddLine) btnAddLine.setAttribute("aria-expanded", "false");
  }

  function closeArrowMenu() {
    if (arrowMenuEl) arrowMenuEl.hidden = true;
    if (btnAddArrow) btnAddArrow.setAttribute("aria-expanded", "false");
  }

  function updateShapeStyleUi() {
    lineOptionEls.forEach((button) => {
      const active = (button.dataset.lineValue || "solid") === currentLineStyle;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    arrowOptionEls.forEach((button) => {
      const active = (button.dataset.arrowValue || "single") === currentArrowType;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function closeDecQuickMenus() {
    if (decLetterMenuEl) decLetterMenuEl.hidden = true;
    if (decNumberMenuEl) decNumberMenuEl.hidden = true;
    if (btnDecLetterToggle) btnDecLetterToggle.setAttribute("aria-expanded", "false");
    if (btnDecNumberToggle) btnDecNumberToggle.setAttribute("aria-expanded", "false");
  }

  function updateDecQuickMarkerUi() {
    if (btnDecLetterToggle) btnDecLetterToggle.textContent = "A";
    if (btnDecNumberToggle) btnDecNumberToggle.textContent = "1";
  }

  function handleDecQuickOptionSelect(type, value, event) {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    const selectedValue = String(value || "").trim();
    if (!selectedValue) return;
    if (type === "letter") {
      currentDecLetter = selectedValue;
    } else {
      currentDecNumber = selectedValue;
    }
    closeDecQuickMenus();
    addDecoupageItem("label", selectedValue);
  }

  function bindDecQuickOptions() {
    decLetterOptionEls.forEach((btn) => {
      if (btn.dataset.decBound === "true") return;
      btn.dataset.decBound = "true";
      btn.addEventListener("click", (event) => {
        const value = btn.dataset.letterValue || btn.dataset.value || btn.textContent;
        handleDecQuickOptionSelect("letter", value, event);
      });
    });
    decNumberOptionEls.forEach((btn) => {
      if (btn.dataset.decBound === "true") return;
      btn.dataset.decBound = "true";
      btn.addEventListener("click", (event) => {
        const value = btn.dataset.numberValue || btn.dataset.value || btn.textContent;
        handleDecQuickOptionSelect("number", value, event);
      });
    });
  }

  function populateDecQuickMenus() {
    if (decLetterMenuEl && !decLetterMenuEl.children.length) {
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((letter) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btnSmall storyboardDecQuickOption storyboardDecLetterOption";
        btn.textContent = letter;
        btn.dataset.letterValue = letter;
        decLetterMenuEl.appendChild(btn);
      });
    }
    if (decNumberMenuEl && !decNumberMenuEl.children.length) {
      ["1","2","3","4","5","6","7","8","9","0"].forEach((numberValue) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btnSmall storyboardDecQuickOption storyboardDecNumberOption";
        btn.textContent = numberValue;
        btn.dataset.numberValue = numberValue;
        decNumberMenuEl.appendChild(btn);
      });
    }
    bindDecQuickOptions();
    updateDecQuickMarkerUi();
  }


  function getActiveDecShape() {
    return (decoupage.shapes || []).find((shape) => shape.id === decSelectedShapeId) || null;
  }

  function updateActiveSurfaceUI() {
    shotCanvasCardEl?.classList.toggle("is-active-surface", activeSurface === "shot");
    decCanvasCardEl?.classList.toggle("is-active-surface", activeSurface === "decoupage");
  }

  function setActiveSurface(surface) {
    activeSurface = surface === "decoupage" ? "decoupage" : "shot";
    updateActiveSurfaceUI();
    updateDeleteShapeButton();
  }

  function getActiveShapeContext() {
    if (activeSurface === "decoupage") {
      return {
        surface: "decoupage",
        canvas: decCanvas,
        getShapes: () => decoupage.shapes || (decoupage.shapes = []),
        getSelectedId: () => decSelectedShapeId,
        setSelectedId: (id) => { decSelectedShapeId = id || null; },
        getSelectedShape: () => getActiveDecShape(),
        pushHistory: pushDecoupageHistory,
        render: renderDecoupageScene,
        persist: persistCurrentState
      };
    }
    return {
      surface: "shot",
      canvas,
      getShapes: () => getActiveShot()?.shapes || [],
      getSelectedId: () => selectedShapeId,
      setSelectedId: (id) => { selectedShapeId = id || null; },
      getSelectedShape: () => getSelectedShape(),
      pushHistory,
      render: renderScene,
      persist: persistCurrentState
    };
  }

  function getActiveHistoryState() {
    if (activeSurface === "decoupage") return decoupage;
    return getActiveShot();
  }

  function getCurrentActiveSnapshotString() {
    return activeSurface === "decoupage" ? getCurrentDecoupageSnapshotString() : getCurrentShotSnapshotString();
  }

  function getCurrentShotSnapshotString() {
    return serializeSceneSnapshot(getCurrentSceneSnapshot());
  }

  function canUndo() {
    const target = getActiveHistoryState();
    if (!target || !Array.isArray(target.history) || !target.history.length) return false;
    const current = getCurrentActiveSnapshotString();
    if (target.history.length > 1) return true;
    return target.history[0] !== current;
  }

  function canRedo() {
    const target = getActiveHistoryState();
    return Boolean(target && Array.isArray(target.redo) && target.redo.length);
  }

  function updateHistoryButtons() {
    if (btnUndo) btnUndo.disabled = !canUndo();
    if (btnRedo) btnRedo.disabled = !canRedo();
  }

  function updateAspectOverlay() {
    if (!aspectOverlayEl || !aspectToggleEl) return;
    const ratio = getAspectRatioNumber(aspectRatioValue);
    aspectToggleEl.classList.toggle("is-active", aspectRatioValue !== "off");
    aspectToggleEl.setAttribute("aria-pressed", aspectRatioValue !== "off" ? "true" : "false");

    aspectOptionEls.forEach((button) => {
      const isActive = button.dataset.aspectValue === aspectRatioValue;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    if (!ratio) {
      aspectOverlayEl.hidden = true;
      aspectOverlayEl.style.setProperty("--sb-mask-top", "0px");
      aspectOverlayEl.style.setProperty("--sb-mask-bottom", "0px");
      aspectOverlayEl.style.setProperty("--sb-mask-left", "0px");
      aspectOverlayEl.style.setProperty("--sb-mask-right", "0px");
      return;
    }

    const stageWidth = canvas.clientWidth || canvas.width;
    const stageHeight = canvas.clientHeight || canvas.height;
    if (!stageWidth || !stageHeight) return;

    const stageRatio = stageWidth / stageHeight;
    let top = 0; let bottom = 0; let left = 0; let right = 0;

    if (ratio > stageRatio) {
      const visibleHeight = stageWidth / ratio;
      const mask = Math.max(0, (stageHeight - visibleHeight) / 2);
      top = mask; bottom = mask;
    } else if (ratio < stageRatio) {
      const visibleWidth = stageHeight * ratio;
      const mask = Math.max(0, (stageWidth - visibleWidth) / 2);
      left = mask; right = mask;
    }

    aspectOverlayEl.style.setProperty("--sb-mask-top", `${top}px`);
    aspectOverlayEl.style.setProperty("--sb-mask-bottom", `${bottom}px`);
    aspectOverlayEl.style.setProperty("--sb-mask-left", `${left}px`);
    aspectOverlayEl.style.setProperty("--sb-mask-right", `${right}px`);
    aspectOverlayEl.hidden = false;
  }

  function updateThirdsToggle() {
    if (thirdsOverlayEl) thirdsOverlayEl.hidden = !showThirdsGrid;
    if (thirdsToggleEl) {
      thirdsToggleEl.classList.toggle("is-active", showThirdsGrid);
      thirdsToggleEl.setAttribute("aria-pressed", showThirdsGrid ? "true" : "false");
    }
  }

  function getCurrentSceneSnapshot() {
    const shot = getActiveShot();
    return {
      baseDataUrl: shot?.baseDataUrl || snapshotBaseCanvas(),
      shapes: cloneShapes(shot?.shapes || [])
    };
  }

  function serializeSceneSnapshot(snapshot) {
    return JSON.stringify({
      baseDataUrl: snapshot?.baseDataUrl || null,
      shapes: cloneShapes(snapshot?.shapes || [])
    });
  }

  function parseSceneSnapshot(entry) {
    if (!entry) return { baseDataUrl: null, shapes: [] };
    if (typeof entry === "string") {
      try {
        const parsed = JSON.parse(entry);
        return {
          baseDataUrl: typeof parsed.baseDataUrl === "string" ? parsed.baseDataUrl : null,
          shapes: cloneShapes(parsed.shapes || [])
        };
      } catch {
        return { baseDataUrl: entry, shapes: [] };
      }
    }
    return {
      baseDataUrl: typeof entry.baseDataUrl === "string" ? entry.baseDataUrl : null,
      shapes: cloneShapes(entry.shapes || [])
    };
  }

  function serializeShots(includeHistory = true) {
    return shots.map((shot) => ({
      id: shot.id,
      fallbackName: shot.fallbackName,
      customName: shot.customName || "",
      baseDataUrl: shot.baseDataUrl || null,
      shapes: cloneShapes(shot.shapes || []),
      history: includeHistory ? [...(shot.history || [])] : [],
      redo: includeHistory ? [...(shot.redo || [])] : [],
      notes: createEmptyNotes(shot.notes)
    }));
  }

  function buildStoryboardState(includeHistory = true) {
    saveActiveShotData();
    return {
      version: 2,
      sceneRecordId,
      sceneName,
      activeShotId,
      nextShotId,
      nextShapeId,
      decNextItemId,
      lastSavedAt,
      showThirdsGrid,
      aspectRatioValue,
      shots: serializeShots(includeHistory),
      decoupage: {
        baseDataUrl: decoupage.baseDataUrl || null,
        items: cloneDecoupageItems(decoupage.items || []),
        shapes: cloneShapes(decoupage.shapes || []),
        history: includeHistory ? [...(decoupage.history || [])] : [],
        redo: includeHistory ? [...(decoupage.redo || [])] : []
      }
    };
  }

  function persistCurrentState() {
    try {
      localStorage.setItem(CURRENT_STORAGE_KEY, JSON.stringify(buildStoryboardState(true)));
    } catch (err) {
      console.warn("Storyboard autosave non disponibile", err);
    }
  }

  function readLibrary() {
    try {
      const raw = localStorage.getItem(LIBRARY_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function writeLibrary(items) {
    localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(items));
  }

function canCreateNewStoryboardSave() {
  return true;
}

function refreshStoryboardPremiumLabels() {
  if (btnExportSingle) btnExportSingle.title = "Esporta shot PNG";
  if (btnExportZip) btnExportZip.title = "Esporta scena ZIP";
  if (btnShareScene) btnShareScene.title = "Condividi";
  if (btnOpenLibrary) btnOpenLibrary.title = "Archivio";
  if (btnSaveScene) btnSaveScene.title = "Salva scena";
}

  function getLibrarySummaryText(items) {
    if (!items.length) return "Nessuno storyboard salvato.";
    return items.length === 1 ? "1 storyboard salvato." : `${items.length} storyboard salvati.`;
  }

  function renameShotsSequentiallyForList(list) {
    list.forEach((shot, index) => {
      shot.fallbackName = `Shot ${index + 1}`;
    });
  }

  function createDuplicatedSceneName(name) {
    const base = (name || "").trim() || "Scena senza nome";
    return /\(copia\)$/i.test(base) ? base : `${base} (copia)`;
  }

  function duplicateLibraryScene(item) {
    const now = Date.now();
    const duplicatedShots = Array.isArray(item.shots) && item.shots.length
      ? item.shots.map((shot, index) => ({
          id: Number(shot.id) || index + 1,
          fallbackName: shot.fallbackName || `Shot ${index + 1}`,
          customName: typeof shot.customName === "string" ? shot.customName : "",
          baseDataUrl: typeof shot.baseDataUrl === "string" ? shot.baseDataUrl : (typeof shot.dataUrl === "string" ? shot.dataUrl : null),
          shapes: cloneShapes(shot.shapes || []),
          history: Array.isArray(shot.history) ? shot.history.filter((entry) => typeof entry === "string") : [],
          redo: Array.isArray(shot.redo) ? shot.redo.filter((entry) => typeof entry === "string") : [],
          notes: createEmptyNotes(shot.notes)
        }))
      : [createEmptyShot(1, "Shot 1")];

    renameShotsSequentiallyForList(duplicatedShots);

    const nextId = duplicatedShots.reduce((max, shot) => Math.max(max, Number(shot.id) || 0), 0) + 1;
    return {
      id: `scene_${now}`,
      sceneName: createDuplicatedSceneName(item.sceneName),
      activeShotId: duplicatedShots[0]?.id || 1,
      nextShotId: nextId,
      nextShapeId: Number(item.nextShapeId) || 1,
      decNextItemId: Number(item.decNextItemId) || 1,
      updatedAt: now,
      showThirdsGrid: Boolean(item.showThirdsGrid),
      aspectRatioValue: typeof item.aspectRatioValue === "string" ? item.aspectRatioValue : "off",
      decoupage: createEmptyDecoupage(item.decoupage),
      shots: duplicatedShots
    };
  }

  function normalizeShot(shot, index) {
    const parsed = parseSceneSnapshot(shot.history?.[shot.history.length - 1] || {
      baseDataUrl: typeof shot.baseDataUrl === "string" ? shot.baseDataUrl : (typeof shot.dataUrl === "string" ? shot.dataUrl : null),
      shapes: shot.shapes || []
    });

    return {
      id: Number(shot.id) || index + 1,
      fallbackName: shot.fallbackName || `Shot ${index + 1}`,
      customName: typeof shot.customName === "string" ? shot.customName : "",
      baseDataUrl: parsed.baseDataUrl,
      shapes: cloneShapes(shot.shapes || parsed.shapes || []).map((shape) => (
        shape.type === "circleCross"
          ? { crossX: 0.5, crossY: 0.5, curveV: 0, curveH: 0, ...shape }
          : { ...shape }
      )),
      history: Array.isArray(shot.history) ? shot.history.filter((item) => typeof item === "string") : [],
      redo: Array.isArray(shot.redo) ? shot.redo.filter((item) => typeof item === "string") : [],
      notes: createEmptyNotes(shot.notes)
    };
  }

  function applyState(state) {
    if (!state || !Array.isArray(state.shots) || !state.shots.length) return false;

    sceneRecordId = state.sceneRecordId || null;
    sceneName = typeof state.sceneName === "string" ? state.sceneName : "";
    lastSavedAt = state.lastSavedAt || null;
    showThirdsGrid = Boolean(state.showThirdsGrid);
    aspectRatioValue = typeof state.aspectRatioValue === "string" ? state.aspectRatioValue : "off";
    nextShotId = Number(state.nextShotId) || 1;
    nextShapeId = Number(state.nextShapeId) || 1;
    decNextItemId = Number(state.decNextItemId) || 1;
    decoupage = createEmptyDecoupage(state.decoupage);

    shots = state.shots.map(normalizeShot);
    renameShotsSequentially();
    nextShotId = Math.max(nextShotId, ...shots.map((shot) => shot.id + 1));

    let maxShapeId = 0;
    shots.forEach((shot) => {
      shot.shapes.forEach((shape) => { maxShapeId = Math.max(maxShapeId, Number(shape.id) || 0); });
    });
    nextShapeId = Math.max(nextShapeId, maxShapeId + 1);
    const maxDecId = (decoupage.items || []).reduce((max, item) => Math.max(max, Number(item.id) || 0), 0);
    decNextItemId = Math.max(decNextItemId, maxDecId + 1);

    const requestedActiveId = Number(state.activeShotId);
    activeShotId = shots.some((shot) => shot.id === requestedActiveId) ? requestedActiveId : shots[0].id;
    selectedShapeId = null;
    decSelectedShapeId = null;
    decSelectedItemId = null;
    interaction = null;
    updateDeleteShapeButton();
    return true;
  }

  async function restoreActiveShotAfterStateLoad() {
    const activeShot = getActiveShot();
    selectedShapeId = null;
    updateDeleteShapeButton();
    await loadBaseDataUrl(activeShot?.baseDataUrl || null);
    await loadDecoupageBaseDataUrl(decoupage?.baseDataUrl || null);
    setActiveSurface("shot");
    if (activeShot && !activeShot.history.length) {
      pushHistory();
    } else if (activeShot) {
      activeShot.baseDataUrl = snapshotBaseCanvas();
      renderScene();
    }
    renderShotList();
    updateThirdsToggle();
    updateAspectOverlay();
    closeCircleMenu();
    persistCurrentState();
  }

  async function loadCurrentStateFromStorage() {
    try {
      const raw = localStorage.getItem(CURRENT_STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (!applyState(parsed)) return false;
      await restoreActiveShotAfterStateLoad();
      return true;
    } catch (err) {
      console.warn("Impossibile ripristinare storyboard corrente", err);
      return false;
    }
  }

  function renderShotList() {
    shotListEl.innerHTML = "";
    shots.forEach((shot, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `storyboardShotBtn${shot.id === activeShotId ? " is-active" : ""}`;
      btn.dataset.shotId = String(shot.id);
      btn.innerHTML = `
        <span class="storyboardShotBtn__title">${getShotDisplayName(shot)}</span>
        <span class="storyboardShotBtn__meta">Inquadratura ${index + 1} di ${shots.length}</span>
      `;
      btn.addEventListener("click", () => {
        if (shot.id !== activeShotId) restoreShot(shot.id);
      });
      shotListEl.appendChild(btn);
    });

    const activeShot = getActiveShot();
    shotCountEl.textContent = countLabel();
    const sceneLabel = getSceneName();
    const shotLabel = getShotDisplayName(activeShot);
    canvasTitleEl.textContent = sceneLabel ? `Disegno — ${sceneLabel} / ${shotLabel}` : `Disegno — ${shotLabel}`;
    btnDeleteShot.disabled = shots.length <= 1;
    updateSceneField();
    updateShotField();
    updateNotesFields();
    updateSaveState(lastSavedAt ? `Autosalvataggio attivo. Ultimo salvataggio archivio: ${formatDateTime(lastSavedAt)}.` : "Autosalvataggio attivo nel browser. Salva Scena per aggiungere o aggiornare l'archivio.");
    updateThirdsToggle();
    updateAspectOverlay();
    updateHistoryButtons();
  }

  function renameShotsSequentially() {
    shots.forEach((shot, index) => { shot.fallbackName = `Shot ${index + 1}`; });
  }

  function saveActiveShotData() {
    const shot = getActiveShot();
    if (!shot) return;
    shot.baseDataUrl = snapshotBaseCanvas();
    shot.shapes = cloneShapes(shot.shapes || []);
  }

  function pushHistory() {
    const shot = getActiveShot();
    if (!shot) return;
    shot.baseDataUrl = snapshotBaseCanvas();
    const snap = serializeSceneSnapshot({ baseDataUrl: shot.baseDataUrl, shapes: shot.shapes });
    const history = shot.history;
    if (history[history.length - 1] === snap) {
      updateHistoryButtons();
      return;
    }
    history.push(snap);
    if (history.length > 40) history.shift();
    shot.redo = [];
    updateHistoryButtons();
    persistCurrentState();
  }

  async function applySceneSnapshot(snapshot) {
    const shot = getActiveShot();
    if (!shot) return;
    const parsed = parseSceneSnapshot(snapshot);
    shot.baseDataUrl = parsed.baseDataUrl;
    shot.shapes = cloneShapes(parsed.shapes);
    selectedShapeId = null;
    updateDeleteShapeButton();
    await loadBaseDataUrl(shot.baseDataUrl || null);
    renderScene();
    updateHistoryButtons();
  }

  async function restoreShot(shotId) {
    saveActiveShotData();
    activeShotId = shotId;
    setActiveSurface("shot");
    selectedShapeId = null;
    const shot = getActiveShot();
    await loadBaseDataUrl(shot?.baseDataUrl || null);
    if (shot && !shot.history.length) {
      pushHistory();
    } else if (shot) {
      renderScene();
      persistCurrentState();
    }
    renderShotList();
  }

  async function addShot(duplicateCurrent = false) {
    saveActiveShotData();
    const activeShot = getActiveShot();
    const sceneSnapshot = duplicateCurrent && activeShot ? {
      baseDataUrl: activeShot.baseDataUrl || snapshotBaseCanvas(),
      shapes: activeShot.shapes || [],
      history: activeShot.history || [],
      redo: activeShot.redo || [],
      notes: activeShot.notes || null
    } : null;
    const newShot = createEmptyShot(nextShotId++, `Shot ${shots.length + 1}`, sceneSnapshot);
    if (duplicateCurrent && activeShot) {
      newShot.customName = activeShot.customName || "";
      if (activeShot.history?.length) newShot.history = [...activeShot.history];
      if (activeShot.redo?.length) newShot.redo = [...activeShot.redo];
    }
    shots.push(newShot);
    renameShotsSequentially();
    await restoreShot(newShot.id);
    persistCurrentState();
  }

  async function deleteCurrentShot() {
    if (shots.length <= 1) return;
    const idx = shots.findIndex((shot) => shot.id === activeShotId);
    if (idx === -1) return;
    shots.splice(idx, 1);
    renameShotsSequentially();
    const fallbackIndex = Math.max(0, idx - 1);
    const fallbackShot = shots[fallbackIndex];
    await restoreShot(fallbackShot.id);
    persistCurrentState();
  }

  function downloadDataUrl(filename, dataUrl) {
    const a = document.createElement("a");
    a.download = filename;
    a.href = dataUrl;
    a.click();
  }

  function fileNameForShot(shot, index) {
    return `${getSceneFileBase()}_${getShotFileBase(shot, index)}.png`;
  }

  function hexToRgba(hex, alpha = 1) {
    const safe = String(hex || "#111111").trim();
    const match = safe.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!match) return `rgba(17,17,17,${alpha})`;
    return `rgba(${parseInt(match[1],16)}, ${parseInt(match[2],16)}, ${parseInt(match[3],16)}, ${alpha})`;
  }

  function drawRoundedRectPath(context, x, y, w, h, r) {
    const radius = Math.max(0, Math.min(r, w / 2, h / 2));
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + w - radius, y);
    context.quadraticCurveTo(x + w, y, x + w, y + radius);
    context.lineTo(x + w, y + h - radius);
    context.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    context.lineTo(x + radius, y + h);
    context.quadraticCurveTo(x, y + h, x, y + h - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
  }

  function getTextShapeMetrics(shape, context) {
    const padding = typeof shape.padding === "number" ? shape.padding : 14;
    const fontFamily = shape.fontFamily || "Arial";
    const fontWeight = shape.fontWeight || "400";
    const fontStyle = shape.fontStyle || "normal";
    const box = normalizeRect(shape);
    const textValue = shape.text || "Testo";
    const availableWidth = Math.max(24, box.w - padding * 2);
    const availableHeight = Math.max(24, box.h - padding * 2);
    let fontSize = Math.max(16, Math.min(96, Number(shape.fontSize) || Math.round(availableHeight * 0.62)));
    context.save();
    while (fontSize > 16) {
      context.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`.trim();
      if (context.measureText(textValue).width <= availableWidth) break;
      fontSize -= 1;
    }
    context.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`.trim();
    const textWidth = context.measureText(textValue).width;
    context.restore();
    const align = shape.textAlign || "left";
    let textX = box.x + padding;
    let textAlignCanvas = "left";
    if (align === "center") {
      textX = box.x + box.w / 2;
      textAlignCanvas = "center";
    } else if (align === "right") {
      textX = box.x + box.w - padding;
      textAlignCanvas = "right";
    }
    return { padding, fontFamily, fontWeight, fontStyle, box, fontSize, textWidth, textValue, textX, textAlignCanvas, opacity: Math.max(0.2, Math.min(1, Number(shape.textOpacity) || 1)) };
  }

  function buildTextFont(shape, context) {
    const metrics = getTextShapeMetrics(shape, context);
    return `${metrics.fontStyle} ${metrics.fontWeight} ${metrics.fontSize}px ${metrics.fontFamily}`.trim();
  }

  function editTextShape(shape) {
    if (!shape || shape.type !== "text") return false;
    const current = typeof shape.text === "string" ? shape.text : "Testo";
    const next = window.prompt("Modifica testo", current);
    if (next == null) return false;
    const cleaned = next.trim() || "Testo";
    if (cleaned === current) return false;
    pushHistory();
    shape.text = cleaned;
    renderScene();
    persistCurrentState();
    return true;
  }

  function editDecoupageTextShape(shape) {
    if (!shape || shape.type !== "text") return false;
    const current = typeof shape.text === "string" ? shape.text : "Testo";
    const next = window.prompt("Modifica testo", current);
    if (next == null) return false;
    const cleaned = next.trim() || "Testo";
    if (cleaned === current) return false;
    pushDecoupageHistory();
    shape.text = cleaned;
    renderDecoupageScene();
    persistCurrentState();
    return true;
  }

  function renderShape(shape, context) {
    context.save();
    context.lineWidth = SHAPE_STROKE;
    context.strokeStyle = shape.color || colorEl.value || "#111111";
    context.fillStyle = "rgba(255,255,255,0.001)";
    context.beginPath();
    if (shape.type === "rect") {
      context.rect(shape.x, shape.y, shape.w, shape.h);
      context.fill();
      context.stroke();
    } else if (shape.type === "triangle") {
      context.moveTo(shape.x + shape.w / 2, shape.y);
      context.lineTo(shape.x + shape.w, shape.y + shape.h);
      context.lineTo(shape.x, shape.y + shape.h);
      context.closePath();
      context.fill();
      context.stroke();
    } else if (shape.type === "circle" || shape.type === "circleCross") {
      const cx = shape.x + shape.w / 2;
      const cy = shape.y + shape.h / 2;
      const rx = Math.abs(shape.w) / 2;
      const ry = Math.abs(shape.h) / 2;
      context.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      context.fill();
      context.stroke();
      if (shape.type === "circleCross") {
        const axes = getEllipseAxisEndpoints(shape);
        const curveV = Math.max(-1.2, Math.min(1.2, Number(shape.curveV) || 0));
        const curveH = Math.max(-1.2, Math.min(1.2, Number(shape.curveH) || 0));
        const verticalBend = axes.rx * curveV * 1.9;
        const horizontalBend = axes.ry * curveH * 1.9;

        context.beginPath();
        context.moveTo(axes.top.x, axes.top.y);
        context.bezierCurveTo(
          axes.top.x + verticalBend,
          axes.top.y + (axes.control.y - axes.top.y) * 0.35,
          axes.control.x + verticalBend,
          axes.top.y + (axes.control.y - axes.top.y) * 0.72,
          axes.control.x,
          axes.control.y
        );
        context.bezierCurveTo(
          axes.control.x + verticalBend,
          axes.control.y + (axes.bottom.y - axes.control.y) * 0.28,
          axes.bottom.x + verticalBend,
          axes.control.y + (axes.bottom.y - axes.control.y) * 0.65,
          axes.bottom.x,
          axes.bottom.y
        );

        context.moveTo(axes.left.x, axes.left.y);
        context.bezierCurveTo(
          axes.left.x + (axes.control.x - axes.left.x) * 0.35,
          axes.left.y + horizontalBend,
          axes.left.x + (axes.control.x - axes.left.x) * 0.72,
          axes.control.y + horizontalBend,
          axes.control.x,
          axes.control.y
        );
        context.bezierCurveTo(
          axes.control.x + (axes.right.x - axes.control.x) * 0.28,
          axes.control.y + horizontalBend,
          axes.control.x + (axes.right.x - axes.control.x) * 0.65,
          axes.right.y + horizontalBend,
          axes.right.x,
          axes.right.y
        );
        context.stroke();
      }
    } else if (shape.type === "text") {
      const metrics = getTextShapeMetrics(shape, context);
      const box = metrics.box;
      const textColor = shape.textColor || shape.color || colorEl.value || "#111111";
      const textY = box.y + box.h / 2;
      const bgAlpha = shape.textBg ? Math.max(0.12, Math.min(0.95, metrics.opacity * 0.28)) : 0;
      if (shape.textBg) {
        context.save();
        context.fillStyle = hexToRgba(shape.textBgColor || DEFAULT_TEXT_BG_COLOR, bgAlpha);
        drawRoundedRectPath(context, box.x, box.y, box.w, box.h, 14);
        context.fill();
        context.restore();
      }
      context.globalAlpha = metrics.opacity;
      context.fillStyle = textColor;
      context.textBaseline = "middle";
      context.textAlign = metrics.textAlignCanvas;
      context.font = `${metrics.fontStyle} ${metrics.fontWeight} ${metrics.fontSize}px ${metrics.fontFamily}`.trim();
      context.fillText(metrics.textValue, metrics.textX, textY);
      if (shape.textUnderline) {
        const underlineY = textY + Math.max(6, metrics.fontSize * 0.32);
        let startX = metrics.textX;
        let endX = metrics.textX + metrics.textWidth;
        if (metrics.textAlignCanvas === "center") {
          startX = metrics.textX - metrics.textWidth / 2;
          endX = metrics.textX + metrics.textWidth / 2;
        } else if (metrics.textAlignCanvas === "right") {
          startX = metrics.textX - metrics.textWidth;
          endX = metrics.textX;
        }
        context.lineWidth = Math.max(1.5, metrics.fontSize * 0.06);
        context.beginPath();
        context.moveTo(startX, underlineY);
        context.lineTo(endX, underlineY);
        context.strokeStyle = textColor;
        context.stroke();
      }
      context.globalAlpha = 1;
    } else if (shape.type === "line") {
      context.lineCap = "round";
      context.setLineDash(shape.lineStyle === "dashed" ? [14, 10] : []);
      context.moveTo(shape.x1, shape.y1);
      context.lineTo(shape.x2, shape.y2);
      context.stroke();
      context.setLineDash([]);
    } else if (shape.type === "arrow") {
      context.lineCap = "round";
      context.setLineDash(shape.lineStyle === "dashed" ? [14, 10] : []);
      context.moveTo(shape.x1, shape.y1);
      context.lineTo(shape.x2, shape.y2);
      context.stroke();
      context.setLineDash([]);
      const dx = shape.x2 - shape.x1;
      const dy = shape.y2 - shape.y1;
      const angle = Math.atan2(dy, dx);
      const headLength = Math.max(16, Math.min(36, (Math.hypot(dx, dy) || 0) * 0.16));
      const headAngle = Math.PI / 7;
      const drawHead = (x, y, headAngleValue) => {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(
          x - Math.cos(headAngleValue - headAngle) * headLength,
          y - Math.sin(headAngleValue - headAngle) * headLength
        );
        context.moveTo(x, y);
        context.lineTo(
          x - Math.cos(headAngleValue + headAngle) * headLength,
          y - Math.sin(headAngleValue + headAngle) * headLength
        );
        context.stroke();
      };
      drawHead(shape.x2, shape.y2, angle);
      if (shape.arrowType === "double") {
        drawHead(shape.x1, shape.y1, angle + Math.PI);
      }
    }
    context.restore();
  }

  function renderSelectionForContext(shape, targetCtx) {
    if (!shape || !targetCtx) return;
    const { x, y, w, h } = normalizeRect(shape);
    targetCtx.save();
    targetCtx.strokeStyle = "#6ee7ff";
    targetCtx.lineWidth = 2;
    targetCtx.setLineDash([8, 6]);
    targetCtx.strokeRect(x, y, w, h);
    targetCtx.setLineDash([]);
    for (const handle of getShapeHandles(shape)) {
      targetCtx.fillStyle = handle.name === "cross"
        ? "#a78bfa"
        : (handle.name === "curveV" || handle.name === "curveH" ? "#f59e0b" : "#6ee7ff");
      targetCtx.strokeStyle = "#0b0c10";
      targetCtx.lineWidth = 1.5;
      targetCtx.beginPath();
      if (handle.name === "cross") {
        targetCtx.arc(handle.x, handle.y, HANDLE_SIZE * 0.52, 0, Math.PI * 2);
      } else {
        targetCtx.rect(handle.x - HANDLE_SIZE / 2, handle.y - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE);
      }
      targetCtx.fill();
      targetCtx.stroke();
    }
    targetCtx.restore();
  }

  function renderSelection(shape) {
    if (!shape) return;
    renderSelectionForContext(shape, ctx);
  }

  function renderScene() {
    clearDisplayCanvas();
    ctx.drawImage(baseCanvas, 0, 0);
    const shot = getActiveShot();
    if (!shot) {
      hideTextToolbar();
      return;
    }
    shot.shapes.forEach((shape) => renderShape(shape, ctx));
    const selected = getSelectedShape();
    if (selected) renderSelection(selected);
    updateTextToolbar();
  }

  function hideTextToolbar() {
    if (!textToolbarEl) return;
    textToolbarEl.hidden = true;
    closeTextAlignMenu();
    closeTextOpacityPopover();
  }

  function closeTextAlignMenu() {
    if (textAlignMenuEl) textAlignMenuEl.hidden = true;
    if (textAlignToggleEl) textAlignToggleEl.setAttribute("aria-expanded", "false");
  }

  function closeTextOpacityPopover() {
    if (textOpacityPopoverEl) textOpacityPopoverEl.hidden = true;
    if (textOpacityToggleEl) textOpacityToggleEl.setAttribute("aria-expanded", "false");
  }

  function toggleTextAlignMenu(force) {
    if (!textAlignMenuEl || !textAlignToggleEl) return;
    const nextState = typeof force === "boolean" ? force : textAlignMenuEl.hidden;
    textAlignMenuEl.hidden = !nextState;
    textAlignToggleEl.setAttribute("aria-expanded", nextState ? "true" : "false");
    if (nextState) closeTextOpacityPopover();
  }

  function toggleTextOpacityPopover(force) {
    if (!textOpacityPopoverEl || !textOpacityToggleEl) return;
    const nextState = typeof force === "boolean" ? force : textOpacityPopoverEl.hidden;
    textOpacityPopoverEl.hidden = !nextState;
    textOpacityToggleEl.setAttribute("aria-expanded", nextState ? "true" : "false");
    if (nextState) closeTextAlignMenu();
  }

  function updateTextToolbar() {
    if (!textToolbarEl || !canvasStageEl || !canvas) return;
    const shape = getSelectedShape();
    if (!shape || shape.type !== "text") {
      hideTextToolbar();
      return;
    }
    const box = normalizeRect(shape);
    const isMobileToolbar = window.matchMedia("(max-width: 560px)").matches;
    if (isMobileToolbar) {
      textToolbarEl.style.left = "";
      textToolbarEl.style.top = "";
    } else {
      const scaleX = canvas.clientWidth / canvas.width;
      const scaleY = canvas.clientHeight / canvas.height;
      const toolbarWidth = textToolbarEl.offsetWidth || 280;
      const toolbarHeight = textToolbarEl.offsetHeight || 44;
      const desiredLeft = (box.x + box.w / 2) * scaleX - toolbarWidth / 2;
      const desiredTop = box.y * scaleY - toolbarHeight - 10;
      const maxLeft = Math.max(8, canvasStageEl.clientWidth - toolbarWidth - 8);
      const left = Math.max(8, Math.min(desiredLeft, maxLeft));
      const top = desiredTop < 8 ? Math.min(canvasStageEl.clientHeight - toolbarHeight - 8, (box.y + box.h) * scaleY + 10) : desiredTop;
      textToolbarEl.style.left = `${left}px`;
      textToolbarEl.style.top = `${Math.max(8, top)}px`;
    }
    if (textSizeEl) textSizeEl.value = String(Math.round(Number(shape.fontSize) || 42));
    if (textFontEl) textFontEl.value = shape.fontFamily || "Arial";
    if (textColorEl) textColorEl.value = shape.textColor || shape.color || "#111111";
    if (textBgColorEl) textBgColorEl.value = shape.textBgColor || DEFAULT_TEXT_BG_COLOR;
    const opacityPercent = Math.round((Math.max(0.2, Math.min(1, Number(shape.textOpacity) || 1))) * 100);
    if (textOpacityEl) textOpacityEl.value = String(opacityPercent);
    if (textOpacityValueEl) textOpacityValueEl.textContent = `${opacityPercent}%`;
    if (textOpacityToggleEl) textOpacityToggleEl.textContent = `${opacityPercent}%`;
    const align = shape.textAlign || "left";
    if (textAlignToggleEl) textAlignToggleEl.dataset.align = align;
    textAlignOptionEls.forEach((button) => {
      const active = button.dataset.align === align;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (textLabelEl) {
      const active = Boolean(shape.textBg);
      const bgColor = shape.textBgColor || DEFAULT_TEXT_BG_COLOR;
      textLabelEl.classList.toggle("is-active", active);
      textLabelEl.setAttribute("aria-pressed", active ? "true" : "false");
      textLabelEl.style.background = active ? hexToRgba(bgColor, 0.28) : "";
      textLabelEl.style.borderColor = active ? hexToRgba(bgColor, 0.92) : "";
      textLabelEl.style.boxShadow = active ? `0 0 0 2px ${hexToRgba(bgColor, 0.20)} inset` : "";
    }
    if (textDuplicateEl) textDuplicateEl.disabled = false;
    if (textBoldEl) {
      const active = (shape.fontWeight || "400") === "700";
      textBoldEl.classList.toggle("is-active", active);
      textBoldEl.setAttribute("aria-pressed", active ? "true" : "false");
    }
    if (textItalicEl) {
      const active = (shape.fontStyle || "normal") === "italic";
      textItalicEl.classList.toggle("is-active", active);
      textItalicEl.setAttribute("aria-pressed", active ? "true" : "false");
    }
    if (textUnderlineEl) {
      const active = Boolean(shape.textUnderline);
      textUnderlineEl.classList.toggle("is-active", active);
      textUnderlineEl.setAttribute("aria-pressed", active ? "true" : "false");
    }
    textToolbarEl.hidden = false;
  }

  function updateTextShapeStyle(mutator) {
    const shape = getSelectedShape();
    if (!shape || shape.type !== "text") return;
    pushHistory();
    mutator(shape);
    renderScene();
    persistCurrentState();
  }

  function updateDeleteShapeButton() {
    const hasSelection = activeSurface === "decoupage"
      ? Boolean(getActiveDecShape() || ((decoupage.items || []).find((item) => item.id === decSelectedItemId)))
      : Boolean(getSelectedShape());
    if (btnDeleteShape) {
      btnDeleteShape.disabled = !hasSelection;
      btnDeleteShape.classList.toggle("is-active", hasSelection);
    }
    if (btnDuplicateShape) {
      btnDuplicateShape.disabled = !hasSelection;
      btnDuplicateShape.classList.toggle("is-active", hasSelection);
    }
    updateHistoryButtons();
  }


  function getSelectedShape() {
    const shot = getActiveShot();
    return shot?.shapes?.find((shape) => shape.id === selectedShapeId) || null;
  }

  function normalizeRect(shape) {
    if (shape.type === "line" || shape.type === "arrow") {
      const x = Math.min(shape.x1, shape.x2);
      const y = Math.min(shape.y1, shape.y2);
      const w = Math.abs(shape.x2 - shape.x1);
      const h = Math.abs(shape.y2 - shape.y1);
      return { x, y, w, h };
    }
    const x = Math.min(shape.x, shape.x + shape.w);
    const y = Math.min(shape.y, shape.y + shape.h);
    const w = Math.abs(shape.w);
    const h = Math.abs(shape.h);
    return { x, y, w, h };
  }

  function getCircleCrossControl(shape) {
    const crossX = typeof shape.crossX === "number" ? shape.crossX : 0.5;
    const crossY = typeof shape.crossY === "number" ? shape.crossY : 0.5;
    return {
      crossX,
      crossY,
      x: shape.x + shape.w * crossX,
      y: shape.y + shape.h * crossY
    };
  }

  function getEllipseAxisEndpoints(shape) {
    const cx = shape.x + shape.w / 2;
    const cy = shape.y + shape.h / 2;
    const rx = Math.abs(shape.w) / 2 || 1;
    const ry = Math.abs(shape.h) / 2 || 1;
    const control = getCircleCrossControl(shape);

    return {
      control,
      top: { x: cx, y: cy - ry },
      bottom: { x: cx, y: cy + ry },
      left: { x: cx - rx, y: cy },
      right: { x: cx + rx, y: cy },
      cx,
      cy,
      rx,
      ry
    };
  }

  function clampCircleCrossControl(shape, point) {
    const cx = shape.x + shape.w / 2;
    const cy = shape.y + shape.h / 2;
    const rx = Math.abs(shape.w) / 2 || 1;
    const ry = Math.abs(shape.h) / 2 || 1;
    let nx = (point.x - cx) / rx;
    let ny = (point.y - cy) / ry;
    const distance = Math.hypot(nx, ny);
    const maxDistance = 0.72;
    if (distance > maxDistance && distance > 0) {
      const scale = maxDistance / distance;
      nx *= scale;
      ny *= scale;
    }
    shape.crossX = Math.max(0.08, Math.min(0.92, (cx + nx * rx - shape.x) / shape.w));
    shape.crossY = Math.max(0.08, Math.min(0.92, (cy + ny * ry - shape.y) / shape.h));
  }

  function getShapeHandles(shape) {
    if (shape.type === "line" || shape.type === "arrow") {
      return [
        { name: "start", x: shape.x1, y: shape.y1 },
        { name: "end", x: shape.x2, y: shape.y2 }
      ];
    }
    const { x, y, w, h } = normalizeRect(shape);
    const handles = [
      { name: "nw", x, y },
      { name: "ne", x: x + w, y },
      { name: "se", x: x + w, y: y + h },
      { name: "sw", x, y: y + h }
    ];
    if (shape.type === "circleCross") {
      const control = getCircleCrossControl(shape);
      const rx = Math.abs(shape.w) / 2 || 1;
      const ry = Math.abs(shape.h) / 2 || 1;
      const curveV = Math.max(-1.2, Math.min(1.2, Number(shape.curveV) || 0));
      const curveH = Math.max(-1.2, Math.min(1.2, Number(shape.curveH) || 0));
      handles.push({ name: "cross", x: control.x, y: control.y });
      handles.push({ name: "curveV", x: control.x + curveV * rx, y: control.y });
      handles.push({ name: "curveH", x: control.x, y: control.y + curveH * ry });
    }
    return handles;
  }

  function hitHandle(shape, point) {
    const half = HANDLE_SIZE / 2 + 4;
    for (const handle of getShapeHandles(shape)) {
      if (point.x >= handle.x - half && point.x <= handle.x + half &&
          point.y >= handle.y - half && point.y <= handle.y + half) {
        return handle.name;
      }
    }
    return null;
  }

  function pointInTriangle(point, a, b, c) {
    const area = (p1, p2, p3) => (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2;
    const A = Math.abs(area(a, b, c));
    const A1 = Math.abs(area(point, b, c));
    const A2 = Math.abs(area(a, point, c));
    const A3 = Math.abs(area(a, b, point));
    return Math.abs(A - (A1 + A2 + A3)) < 1;
  }

  function distancePointToSegment(point, a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    if (dx === 0 && dy === 0) {
      return Math.hypot(point.x - a.x, point.y - a.y);
    }
    const t = Math.max(0, Math.min(1, ((point.x - a.x) * dx + (point.y - a.y) * dy) / (dx * dx + dy * dy)));
    const projX = a.x + t * dx;
    const projY = a.y + t * dy;
    return Math.hypot(point.x - projX, point.y - projY);
  }

  function hitShape(point) {
    const shot = getActiveShot();
    if (!shot) return null;
    for (let i = shot.shapes.length - 1; i >= 0; i -= 1) {
      const shape = shot.shapes[i];
      const { x, y, w, h } = normalizeRect(shape);
      if (shape.type === "line" || shape.type === "arrow") {
        const minX = x - LINE_HIT_TOLERANCE;
        const maxX = x + w + LINE_HIT_TOLERANCE;
        const minY = y - LINE_HIT_TOLERANCE;
        const maxY = y + h + LINE_HIT_TOLERANCE;
        if (point.x < minX || point.x > maxX || point.y < minY || point.y > maxY) continue;
        const distance = distancePointToSegment(point, { x: shape.x1, y: shape.y1 }, { x: shape.x2, y: shape.y2 });
        if (distance <= LINE_HIT_TOLERANCE) return shape;
        continue;
      }
      if (point.x < x || point.x > x + w || point.y < y || point.y > y + h) continue;
      if (shape.type === "rect" || shape.type === "text") return shape;
      if (shape.type === "triangle") {
        const a = { x: x + w / 2, y };
        const b = { x: x + w, y: y + h };
        const c = { x, y: y + h };
        if (pointInTriangle(point, a, b, c)) return shape;
      }
      if (shape.type === "circle" || shape.type === "circleCross") {
        const rx = w / 2 || 1;
        const ry = h / 2 || 1;
        const cx = x + rx;
        const cy = y + ry;
        const nx = (point.x - cx) / rx;
        const ny = (point.y - cy) / ry;
        if ((nx * nx) + (ny * ny) <= 1) return shape;
      }
    }
    return null;
  }

  function selectShape(shapeId) {
    selectedShapeId = shapeId || null;
    renderScene();
    updateDeleteShapeButton();
    persistCurrentState();
  }

  function addShape(type) {
    const context = getActiveShapeContext();
    const targetCanvas = context.canvas;
    const shapes = context.getShapes();
    if (!targetCanvas || !shapes) return;
    let shape;
    if (type === "line" || type === "arrow") {
      const length = Math.round(Math.min(targetCanvas.width, targetCanvas.height) * 0.34);
      const x1 = Math.round((targetCanvas.width - length) / 2);
      const y1 = Math.round(targetCanvas.height / 2);
      shape = {
        id: nextShapeId++,
        type,
        x1,
        y1,
        x2: x1 + length,
        y2: y1,
        color: colorEl.value || "#111111",
        lineStyle: currentLineStyle,
        arrowType: type === "arrow" ? currentArrowType : undefined
      };
    } else {
      const isText = type === "text";
      const w = isText ? Math.round(Math.min(260, targetCanvas.width * 0.56)) : Math.round(Math.min(240, targetCanvas.width * 0.46));
      const h = isText ? 72 : Math.round(Math.min(160, targetCanvas.height * 0.34));
      shape = {
        id: nextShapeId++,
        type,
        x: Math.round((targetCanvas.width - w) / 2),
        y: Math.round((targetCanvas.height - h) / 2),
        w,
        h,
        color: colorEl.value || "#111111"
      };
      if (type === "circleCross") {
        shape.crossX = 0.5;
        shape.crossY = 0.5;
        shape.curveV = 0;
        shape.curveH = 0;
      }
      if (isText) {
        shape.text = "Testo";
        shape.fontSize = 42;
        shape.fontFamily = "Arial";
        shape.fontWeight = "400";
        shape.fontStyle = "normal";
        shape.textUnderline = false;
        shape.textAlign = "left";
        shape.textColor = shape.color || colorEl.value || "#111111";
        shape.textBg = false;
        shape.textBgColor = DEFAULT_TEXT_BG_COLOR;
        shape.textOpacity = 1;
        shape.padding = 14;
      }
    }
    shapes.push(shape);
    context.setSelectedId(shape.id);
    if (context.surface === "decoupage") decSelectedItemId = null;
    context.render();
    updateDeleteShapeButton();
    context.pushHistory();
  }

  function updateShapeFromResize(shape, handle, point, originRect) {
    if (shape.type === "line" || shape.type === "arrow") {
      if (handle === "start") {
        let dx = originRect.x2 - point.x;
        let dy = originRect.y2 - point.y;
        const length = Math.hypot(dx, dy);
        if (length < MIN_SHAPE_SIZE) {
          const angle = Math.atan2(originRect.y2 - originRect.y1, originRect.x2 - originRect.x1);
          shape.x1 = originRect.x2 - Math.cos(angle) * MIN_SHAPE_SIZE;
          shape.y1 = originRect.y2 - Math.sin(angle) * MIN_SHAPE_SIZE;
        } else {
          shape.x1 = point.x;
          shape.y1 = point.y;
        }
      } else if (handle === "end") {
        let dx = point.x - originRect.x1;
        let dy = point.y - originRect.y1;
        const length = Math.hypot(dx, dy);
        if (length < MIN_SHAPE_SIZE) {
          const angle = Math.atan2(originRect.y2 - originRect.y1, originRect.x2 - originRect.x1);
          shape.x2 = originRect.x1 + Math.cos(angle) * MIN_SHAPE_SIZE;
          shape.y2 = originRect.y1 + Math.sin(angle) * MIN_SHAPE_SIZE;
        } else {
          shape.x2 = point.x;
          shape.y2 = point.y;
        }
      }
      return;
    }

    let x1 = originRect.x;
    let y1 = originRect.y;
    let x2 = originRect.x + originRect.w;
    let y2 = originRect.y + originRect.h;

    if (handle.includes("n")) y1 = point.y;
    if (handle.includes("s")) y2 = point.y;
    if (handle.includes("w")) x1 = point.x;
    if (handle.includes("e")) x2 = point.x;

    let width = x2 - x1;
    let height = y2 - y1;

    if (Math.abs(width) < MIN_SHAPE_SIZE) width = Math.sign(width || 1) * MIN_SHAPE_SIZE;
    if (Math.abs(height) < MIN_SHAPE_SIZE) height = Math.sign(height || 1) * MIN_SHAPE_SIZE;

    shape.x = width >= 0 ? x1 : x1 + width;
    shape.y = height >= 0 ? y1 : y1 + height;
    shape.w = Math.abs(width);
    shape.h = Math.abs(height);
  }

  function deleteSelectedShape() {
    if (activeSurface === "decoupage") {
      const shape = getActiveDecShape();
      if (shape) {
        const shapes = decoupage.shapes || [];
        const index = shapes.findIndex((entry) => entry.id === decSelectedShapeId);
        if (index >= 0) {
          pushDecoupageHistory();
          shapes.splice(index, 1);
          decSelectedShapeId = null;
          renderDecoupageScene();
          updateDeleteShapeButton();
          persistCurrentState();
          return;
        }
      }
      if (decSelectedItemId != null) {
        const items = decoupage.items || [];
        const index = items.findIndex((entry) => entry.id === decSelectedItemId);
        if (index >= 0) {
          pushDecoupageHistory();
          items.splice(index, 1);
          decSelectedItemId = null;
          renderDecoupageScene();
          updateDeleteShapeButton();
          persistCurrentState();
        }
      }
      return;
    }
    const shot = getActiveShot();
    if (!shot || selectedShapeId == null) return;
    const index = shot.shapes.findIndex((shape) => shape.id === selectedShapeId);
    if (index === -1) {
      selectedShapeId = null;
      renderScene();
      updateDeleteShapeButton();
      persistCurrentState();
      return;
    }
    pushHistory();
    shot.shapes.splice(index, 1);
    selectedShapeId = null;
    renderScene();
    updateDeleteShapeButton();
    persistCurrentState();
  }


  function duplicateSelectedShape() {
    if (activeSurface === "decoupage") {
      const offset = 24;
      const shape = getActiveDecShape();
      if (shape) {
        let duplicated = { ...shape, id: nextShapeId++ };
        if (shape.type === "line" || shape.type === "arrow") {
          duplicated.x1 = Math.max(0, Math.min(decCanvas.width, shape.x1 + offset));
          duplicated.y1 = Math.max(0, Math.min(decCanvas.height, shape.y1 + offset));
          duplicated.x2 = Math.max(0, Math.min(decCanvas.width, shape.x2 + offset));
          duplicated.y2 = Math.max(0, Math.min(decCanvas.height, shape.y2 + offset));
        } else {
          duplicated.x = Math.max(0, Math.min(decCanvas.width - shape.w, shape.x + offset));
          duplicated.y = Math.max(0, Math.min(decCanvas.height - shape.h, shape.y + offset));
        }
        (decoupage.shapes || (decoupage.shapes = [])).push(duplicated);
        decSelectedShapeId = duplicated.id;
        decSelectedItemId = null;
        pushDecoupageHistory();
        renderDecoupageScene();
        updateDeleteShapeButton();
        persistCurrentState();
        return;
      }
      const item = (decoupage.items || []).find((entry) => entry.id === decSelectedItemId);
      if (item) {
        const duplicated = { ...item, id: decNextItemId++ };
        if (item.type === "ldc") {
          duplicated.x1 += offset; duplicated.y1 += offset; duplicated.x2 += offset; duplicated.y2 += offset;
        } else {
          duplicated.x += offset; duplicated.y += offset;
        }
        decoupage.items.push(duplicated);
        decSelectedItemId = duplicated.id;
        decSelectedShapeId = null;
        pushDecoupageHistory();
        renderDecoupageScene();
        updateDeleteShapeButton();
        persistCurrentState();
      }
      return;
    }
    const shot = getActiveShot();
    const shape = getSelectedShape();
    if (!shot || !shape) return;
    const offset = 24;
    let duplicated = { ...shape, id: nextShapeId++ };
    if (shape.type === "line" || shape.type === "arrow") {
      duplicated.x1 = Math.max(0, Math.min(canvas.width, shape.x1 + offset));
      duplicated.y1 = Math.max(0, Math.min(canvas.height, shape.y1 + offset));
      duplicated.x2 = Math.max(0, Math.min(canvas.width, shape.x2 + offset));
      duplicated.y2 = Math.max(0, Math.min(canvas.height, shape.y2 + offset));
    } else {
      duplicated.x = Math.max(0, Math.min(canvas.width - shape.w, shape.x + offset));
      duplicated.y = Math.max(0, Math.min(canvas.height - shape.h, shape.y + offset));
    }
    shot.shapes.push(duplicated);
    selectedShapeId = duplicated.id;
    pushHistory();
    renderScene();
    updateDeleteShapeButton();
    persistCurrentState();
  }

  function duplicateSelectedText() {
    duplicateSelectedShape();
  }

  async function exportZip() {
    saveActiveShotData();
    saveDecoupageData();
    if (!window.JSZip) {
      alert("La libreria ZIP non è disponibile. Riprova dopo aver ricaricato la pagina.");
      return;
    }
    const zip = new window.JSZip();
    for (let index = 0; index < shots.length; index += 1) {
      const shot = shots[index];
      const dataUrl = await exportShotDataUrl(shot);
      const base64 = dataUrl.split(",")[1];
      zip.file(fileNameForShot(shot, index), base64, { base64: true });
    }
    const decoupageDataUrl = await exportDecoupageDataUrl();
    if (decoupageDataUrl) {
      const decoupageBase64 = decoupageDataUrl.split(",")[1];
      zip.file(`${getSceneFileBase()}_decoupage.png`, decoupageBase64, { base64: true });
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = `${getSceneFileBase()}.zip`;
    a.href = url;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  function loadImageFromDataUrl(dataUrl) {
    return new Promise((resolve, reject) => {
      if (!dataUrl) {
        resolve(null);
        return;
      }
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("image-load-failed"));
      img.src = dataUrl;
    });
  }

  async function renderShotToCanvas(shot) {
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const exportCtx = exportCanvas.getContext("2d");
    exportCtx.fillStyle = "#ffffff";
    exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    if (shot?.baseDataUrl) {
      try {
        const img = await loadImageFromDataUrl(shot.baseDataUrl);
        if (img) exportCtx.drawImage(img, 0, 0, exportCanvas.width, exportCanvas.height);
      } catch {
        exportCtx.drawImage(baseCanvas, 0, 0);
      }
    } else {
      exportCtx.drawImage(baseCanvas, 0, 0);
    }
    (shot?.shapes || []).forEach((shape) => renderShape(shape, exportCtx));
    return exportCanvas;
  }

  async function exportShotDataUrl(shot) {
    return (await renderShotToCanvas(shot)).toDataURL("image/png");
  }

  async function exportDecoupageDataUrl() {
    if (!decCanvas || !decCtx || !decBaseCanvas) return null;
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = decCanvas.width;
    exportCanvas.height = decCanvas.height;
    const exportCtx = exportCanvas.getContext("2d");
    exportCtx.fillStyle = "#ffffff";
    exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    if (decoupage?.baseDataUrl) {
      try {
        const img = await loadImageFromDataUrl(decoupage.baseDataUrl);
        if (img) exportCtx.drawImage(img, 0, 0, exportCanvas.width, exportCanvas.height);
      } catch {
        exportCtx.drawImage(decBaseCanvas, 0, 0);
      }
    } else {
      exportCtx.drawImage(decBaseCanvas, 0, 0);
    }
    (decoupage.items || []).forEach((item) => renderDecItem(item, exportCtx));
    (decoupage.shapes || []).forEach((shape) => renderShape(shape, exportCtx));
    return exportCanvas.toDataURL("image/png");
  }

  function dataUrlToBlob(dataUrl) {
    const parts = String(dataUrl || "").split(",");
    if (parts.length < 2) return null;
    const mimeMatch = parts[0].match(/data:([^;]+);base64/);
    const mime = mimeMatch?.[1] || "application/octet-stream";
    const binary = atob(parts[1]);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i += 1) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], { type: mime });
  }

  function addPdfHeader(doc, title, subtitle) {
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(55, 65, 81);
    doc.text(String(title || ""), 36, 34);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128);
    doc.text(String(subtitle || ""), pageWidth - 36, 34, { align: "right" });
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(1);
    doc.line(36, 44, pageWidth - 36, 44);
  }

  function addPdfImagePage(doc, headerTitle, subtitle, imageDataUrl, options = {}) {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    addPdfHeader(doc, headerTitle, subtitle);
    if (!imageDataUrl) return;
    const top = options.top || 64;
    const bottom = options.bottom || 42;
    const side = options.side || 36;
    const naturalWidth = Number(options.width) || 1;
    const naturalHeight = Number(options.height) || 1;
    const maxWidth = Math.max(10, pageWidth - side * 2);
    const maxHeight = Math.max(10, pageHeight - top - bottom);
    const ratio = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);
    const drawWidth = naturalWidth * ratio;
    const drawHeight = naturalHeight * ratio;
    const x = (pageWidth - drawWidth) / 2;
    const y = top + ((maxHeight - drawHeight) / 2);
    doc.addImage(imageDataUrl, "PNG", x, y, drawWidth, drawHeight, undefined, "FAST");
  }

  async function buildScenePdfBlob() {
    saveActiveShotData();
    saveDecoupageData();
    const JsPdfCtor = window.jspdf?.jsPDF;
    if (!JsPdfCtor) {
      throw new Error("pdf-unavailable");
    }
    const safeSceneName = getSceneName() || "Scena senza nome";
    const doc = new JsPdfCtor({ orientation: "portrait", unit: "pt", format: "a4", compress: true });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    addPdfHeader(doc, "Titolo scena", safeSceneName);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(17, 24, 39);
    doc.text(safeSceneName, pageWidth / 2, pageHeight / 2, { align: "center", baseline: "middle", maxWidth: pageWidth - 96 });

    for (let index = 0; index < shots.length; index += 1) {
      const shot = shots[index];
      doc.addPage("a4", "portrait");
      addPdfImagePage(
        doc,
        `Shot ${index + 1}/${shots.length}`,
        safeSceneName,
        await exportShotDataUrl(shot),
        { width: canvas.width, height: canvas.height, top: 64, bottom: 38, side: 32 }
      );
    }

    if (decCanvas) {
      doc.addPage("a4", "portrait");
      addPdfImagePage(
        doc,
        "Decoupage",
        safeSceneName,
        await exportDecoupageDataUrl(),
        { width: decCanvas.width, height: decCanvas.height, top: 64, bottom: 38, side: 56 }
      );
    }

    return doc.output("blob");
  }

  async function shareScenePdf() {
    try {
      const pdfBlob = await buildScenePdfBlob();
      const fileName = `${getSceneFileBase()}.pdf`;
      const pdfFile = new File([pdfBlob], fileName, { type: "application/pdf" });
      const canNativeShare = typeof navigator !== "undefined"
        && typeof navigator.share === "function"
        && typeof navigator.canShare === "function"
        && navigator.canShare({ files: [pdfFile] });

      if (canNativeShare) {
        await navigator.share({
          title: getSceneName() || "Storyboard SDAC",
          text: getSceneName() || "Scena storyboard",
          files: [pdfFile]
        });
        return;
      }

      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.download = fileName;
      a.href = url;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      alert("Condivisione nativa non disponibile su questo dispositivo: ho scaricato il PDF della scena.");
    } catch (error) {
      if (error?.name === "AbortError") return;
      console.error("Condivisione PDF non riuscita", error);
      alert("Non sono riuscito a creare o condividere il PDF della scena.");
    }
  }

  function renderLibrary() {
    const library = readLibrary();
    libraryListEl.innerHTML = "";
    libraryStatusEl.textContent = getLibrarySummaryText(library);

    if (!library.length) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "Salva almeno una scena per trovarla qui nell'archivio.";
      libraryListEl.appendChild(empty);
      return;
    }

    library.forEach((item, index) => {
      const wrap = document.createElement("div");
      wrap.className = "storyboardLibraryItem";
      const name = item.sceneName?.trim() || "Scena senza nome";
      const shotTotal = Array.isArray(item.shots) ? item.shots.length : 0;
      const updatedLabel = item.updatedAt ? `Ultimo salvataggio: ${formatDateTime(item.updatedAt)}` : "Mai salvato";

      wrap.innerHTML = `
        <div class="storyboardLibraryItemTop">
          <div>
            <div class="storyboardLibraryName">${name}</div>
            <div class="storyboardLibraryMeta">${shotTotal} ${shotTotal === 1 ? "shot" : "shot"} · ${updatedLabel}</div>
          </div>
          <div class="storyboardLibraryControls">
            <div class="storyboardLibraryOrder">
              <button class="btnSmall" type="button" data-action="up">↑</button>
              <button class="btnSmall" type="button" data-action="down">↓</button>
            </div>
            <div class="storyboardLibraryActions">
              <button class="btnSmall" type="button" data-action="open">Apri</button>
              <button class="btnSmall" type="button" data-action="duplicate">Duplica</button>
              <button class="btnSmall" type="button" data-action="delete">Elimina</button>
            </div>
          </div>
        </div>
      `;

      wrap.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", async () => {
          const action = button.dataset.action;
          if (action === "open") {
            const loaded = applyState({ ...item, sceneRecordId: item.id, lastSavedAt: item.updatedAt });
            if (loaded) {
              await restoreActiveShotAfterStateLoad();
              if (libraryDialog?.open) libraryDialog.close();
            }
            return;
          }
          if (action === "delete") {
            const updated = readLibrary().filter((entry) => entry.id !== item.id);
            writeLibrary(updated);
            if (sceneRecordId === item.id) {
              sceneRecordId = null;
              lastSavedAt = null;
              persistCurrentState();
              renderShotList();
            }
            renderLibrary();
            return;
          }
if (action === "duplicate") {
  const updated = readLibrary();
  const sourceIndex = updated.findIndex((entry) => entry.id === item.id);
  if (sourceIndex === -1) return;
  const duplicated = duplicateLibraryScene(updated[sourceIndex]);
  updated.splice(sourceIndex + 1, 0, duplicated);
  writeLibrary(updated);
  renderLibrary();
  return;
}
          if (action === "up" && index > 0) {
            const updated = readLibrary();
            [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
            writeLibrary(updated);
            renderLibrary();
            return;
          }
          if (action === "down" && index < library.length - 1) {
            const updated = readLibrary();
            [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
            writeLibrary(updated);
            renderLibrary();
          }
        });
      });

      libraryListEl.appendChild(wrap);
    });
  }

  function saveSceneToLibrary() {
    saveActiveShotData();
    const now = Date.now();
    const library = readLibrary();
    const currentName = typeof sceneName === "string" ? sceneName : "";
    const existingIndex = sceneRecordId ? library.findIndex((item) => item.id === sceneRecordId) : -1;
    const existingItem = existingIndex >= 0 ? library[existingIndex] : null;
    const existingName = existingItem && typeof existingItem.sceneName === "string" ? existingItem.sceneName : "";
    const shouldSaveAsNew = Boolean(existingItem) && currentName !== existingName;


    const payload = {
      id: shouldSaveAsNew || !sceneRecordId ? `scene_${now}` : sceneRecordId,
      sceneName,
      activeShotId,
      nextShotId,
      nextShapeId,
      decNextItemId,
      updatedAt: now,
      showThirdsGrid,
      aspectRatioValue,
      shots: serializeShots(true),
      decoupage: {
        baseDataUrl: decoupage.baseDataUrl || null,
        items: cloneDecoupageItems(decoupage.items || []),
        shapes: cloneShapes(decoupage.shapes || []),
        history: [...(decoupage.history || [])],
        redo: [...(decoupage.redo || [])]
      }
    };

    if (shouldSaveAsNew || existingIndex < 0) library.unshift(payload);
    else library[existingIndex] = payload;

    sceneRecordId = payload.id;
    lastSavedAt = now;
    writeLibrary(library);
    persistCurrentState();
    renderShotList();
    renderLibrary();
  }

  function clearDecBaseCanvas() {
    if (!decBaseCtx || !decBaseCanvas) return;
    decBaseCtx.save();
    decBaseCtx.setTransform(1, 0, 0, 1, 0, 0);
    decBaseCtx.globalCompositeOperation = "source-over";
    decBaseCtx.fillStyle = "#ffffff";
    decBaseCtx.fillRect(0, 0, decBaseCanvas.width, decBaseCanvas.height);
    decBaseCtx.restore();
  }

  function clearDecDisplayCanvas() {
    if (!decCtx || !decCanvas) return;
    decCtx.save();
    decCtx.setTransform(1, 0, 0, 1, 0, 0);
    decCtx.globalCompositeOperation = "source-over";
    decCtx.fillStyle = "#ffffff";
    decCtx.fillRect(0, 0, decCanvas.width, decCanvas.height);
    decCtx.restore();
  }

  async function loadDecoupageBaseDataUrl(dataUrl) {
    if (!decBaseCtx || !decCanvas) return;
    await loadImageToContext(decBaseCtx, dataUrl);
    renderDecoupageScene();
  }

  function snapshotDecBaseCanvas() {
    return decBaseCanvas ? decBaseCanvas.toDataURL("image/png") : null;
  }

  function serializeDecoupageSnapshot(snapshot) {
    return JSON.stringify({
      baseDataUrl: snapshot?.baseDataUrl || null,
      items: cloneDecoupageItems(snapshot?.items || []),
      shapes: cloneShapes(snapshot?.shapes || [])
    });
  }

  function parseDecoupageSnapshot(entry) {
    if (!entry) return { baseDataUrl: null, items: [], shapes: [] };
    if (typeof entry === "string") {
      try {
        const parsed = JSON.parse(entry);
        return {
          baseDataUrl: typeof parsed.baseDataUrl === "string" ? parsed.baseDataUrl : null,
          items: cloneDecoupageItems(parsed.items || []),
          shapes: cloneShapes(parsed.shapes || [])
        };
      } catch {
        return { baseDataUrl: entry, items: [], shapes: [] };
      }
    }
    return {
      baseDataUrl: typeof entry.baseDataUrl === "string" ? entry.baseDataUrl : null,
      items: cloneDecoupageItems(entry.items || []),
      shapes: cloneShapes(entry.shapes || [])
    };
  }

  function getCurrentDecoupageSnapshot() {
    return {
      baseDataUrl: decoupage.baseDataUrl || snapshotDecBaseCanvas(),
      items: cloneDecoupageItems(decoupage.items || []),
      shapes: cloneShapes(decoupage.shapes || [])
    };
  }

  function getCurrentDecoupageSnapshotString() {
    return serializeDecoupageSnapshot(getCurrentDecoupageSnapshot());
  }

  function pushDecoupageHistory() {
    if (!decCanvas) return;
    decoupage.baseDataUrl = snapshotDecBaseCanvas();
    const snap = serializeDecoupageSnapshot({ baseDataUrl: decoupage.baseDataUrl, items: decoupage.items, shapes: decoupage.shapes });
    const history = decoupage.history || (decoupage.history = []);
    if (history[history.length - 1] === snap) return;
    history.push(snap);
    if (history.length > 40) history.shift();
    decoupage.redo = [];
    persistCurrentState();
  }

  function saveDecoupageData() {
    if (!decCanvas) return;
    decoupage.baseDataUrl = snapshotDecBaseCanvas();
    decoupage.items = cloneDecoupageItems(decoupage.items || []);
    decoupage.shapes = cloneShapes(decoupage.shapes || []);
  }

  function normalizeDecLine(item) {
    const points = [{ x: item.x1, y: item.y1 }, { x: item.x2, y: item.y2 }];
    if (item?.type === "dolly") {
      const control = getDecDollyCurveControl(item);
      points.push(control);
    }
    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  }

  function getDecDollyCurveControl(item) {
    return {
      x: Number.isFinite(Number(item?.cx)) ? Number(item.cx) : (Number(item?.x1 || 0) + Number(item?.x2 || 0)) / 2,
      y: Number.isFinite(Number(item?.cy)) ? Number(item.cy) : (Number(item?.y1 || 0) + Number(item?.y2 || 0)) / 2
    };
  }

  function getQuadraticPoint(start, control, end, t) {
    const inv = 1 - t;
    return {
      x: inv * inv * start.x + 2 * inv * t * control.x + t * t * end.x,
      y: inv * inv * start.y + 2 * inv * t * control.y + t * t * end.y
    };
  }

  function getQuadraticTangentAngle(start, control, end, t) {
    const dx = 2 * (1 - t) * (control.x - start.x) + 2 * t * (end.x - control.x);
    const dy = 2 * (1 - t) * (control.y - start.y) + 2 * t * (end.y - control.y);
    return Math.atan2(dy, dx);
  }

  function distancePointToDollyCurve(point, item) {
    const start = { x: item.x1, y: item.y1 };
    const control = getDecDollyCurveControl(item);
    const end = { x: item.x2, y: item.y2 };
    let minDistance = Infinity;
    let previous = start;
    const steps = 28;
    for (let index = 1; index <= steps; index += 1) {
      const current = getQuadraticPoint(start, control, end, index / steps);
      minDistance = Math.min(minDistance, distancePointToSegment(point, previous, current));
      previous = current;
    }
    return minDistance;
  }

  function getDecLabelFontSize(item) {
    return Math.max(18, Math.min(160, Number(item?.fontSize) || 26));
  }

  function getDecItemBounds(item) {
    if (!item) return { x: 0, y: 0, w: 0, h: 0 };
    if (item.type === "ldc" || item.type === "dolly") return normalizeDecLine(item);
    if (item.type === "label") {
      const fontSize = getDecLabelFontSize(item);
      const text = String(item.text || "");
      const estimatedWidth = Math.max(48, Math.round(text.length * fontSize * 0.72));
      const estimatedHeight = Math.max(36, Math.round(fontSize * 1.45));
      return { x: item.x - estimatedWidth / 2, y: item.y - estimatedHeight / 2, w: estimatedWidth, h: estimatedHeight };
    }
    const size = Number(item.size) || 56;
    return { x: item.x - size / 2, y: item.y - size / 2, w: size, h: size };
  }

  function getDecLineHandles(item) {
    if (!item || (item.type !== "ldc" && item.type !== "dolly")) return [];
    return [
      { name: "start", x: item.x1, y: item.y1 },
      { name: "end", x: item.x2, y: item.y2 }
    ];
  }

  function hitDecLineHandle(item, point) {
    const half = HANDLE_SIZE / 2 + 5;
    for (const handle of getDecLineHandles(item)) {
      if (point.x >= handle.x - half && point.x <= handle.x + half && point.y >= handle.y - half && point.y <= handle.y + half) {
        return handle.name;
      }
    }
    return null;
  }

  function getDecRotateHandle(item) {
    if (!item) return null;
    if (item.type === "camera" || item.type === "person") {
      const size = Number(item.size) || 56;
      const angle = Number(item.angle) || 0;
      const radius = size * 0.72;
      return {
        x: item.x + Math.cos(angle - Math.PI / 2) * radius,
        y: item.y + Math.sin(angle - Math.PI / 2) * radius
      };
    }
    if (item.type === "ldc") {
      const midX = (item.x1 + item.x2) / 2;
      const midY = (item.y1 + item.y2) / 2;
      const angle = Math.atan2(item.y2 - item.y1, item.x2 - item.x1);
      const radius = 34;
      return {
        x: midX + Math.cos(angle - Math.PI / 2) * radius,
        y: midY + Math.sin(angle - Math.PI / 2) * radius
      };
    }
    return null;
  }

  function getDecDollyCurveHandle(item) {
    if (!item || item.type !== "dolly") return null;
    return getDecDollyCurveControl(item);
  }

  function hitDecDollyCurveHandle(item, point) {
    const handle = getDecDollyCurveHandle(item);
    if (!handle) return false;
    return Math.hypot(point.x - handle.x, point.y - handle.y) <= 12;
  }

  function hitDecRotateHandle(item, point) {
    const handle = getDecRotateHandle(item);
    if (!handle) return false;
    return Math.hypot(point.x - handle.x, point.y - handle.y) <= 14;
  }

  function getDecLabelResizeHandle(item) {
    if (!item || item.type !== "label") return null;
    const b = getDecItemBounds(item);
    return { x: b.x + b.w + 10, y: b.y + b.h / 2 };
  }

  function hitDecLabelResizeHandle(item, point) {
    const handle = getDecLabelResizeHandle(item);
    if (!handle) return false;
    return Math.hypot(point.x - handle.x, point.y - handle.y) <= 12;
  }

  function hitDecItem(point) {
    const items = decoupage.items || [];
    for (let i = items.length - 1; i >= 0; i -= 1) {
      const item = items[i];
      if (item.type === "ldc" || item.type === "dolly") {
        const rotateHandle = hitDecRotateHandle(item, point);
        if (rotateHandle && item.type === "ldc") return { item, mode: "rotate" };
        if (item.type === "dolly" && hitDecDollyCurveHandle(item, point)) return { item, mode: "curve" };
        const handle = hitDecLineHandle(item, point);
        if (handle) return { item, mode: handle === "start" ? "move-start" : "move-end" };
        const b = getDecItemBounds(item);
        if (point.x < b.x - 16 || point.x > b.x + b.w + 16 || point.y < b.y - 16 || point.y > b.y + b.h + 16) continue;
        const d = item.type === "dolly"
          ? distancePointToDollyCurve(point, item)
          : distancePointToSegment(point, { x: item.x1, y: item.y1 }, { x: item.x2, y: item.y2 });
        if (d <= 12) return { item, mode: "move" };
        continue;
      }
      if (hitDecRotateHandle(item, point)) return { item, mode: "rotate" };
      if (hitDecLabelResizeHandle(item, point)) return { item, mode: "resize-label" };
      const b = getDecItemBounds(item);
      if (point.x >= b.x && point.x <= b.x + b.w && point.y >= b.y && point.y <= b.y + b.h) {
        return { item, mode: "move" };
      }
    }
    return null;
  }

  function renderDecItem(item, context) {
    context.save();
    context.strokeStyle = item.color || colorEl?.value || "#111111";
    context.fillStyle = item.color || colorEl?.value || "#111111";
    context.lineWidth = 3;
    if (item.type === "camera") {
      const size = Number(item.size) || 84;
      context.translate(item.x, item.y);
      context.rotate(Number(item.angle) || 0);
      context.strokeRect(-size * 0.24, -size * 0.18, size * 0.38, size * 0.36);
      context.beginPath();
      context.moveTo(size * 0.14, -size * 0.14);
      context.lineTo(size * 0.30, -size * 0.22);
      context.lineTo(size * 0.30, size * 0.22);
      context.lineTo(size * 0.14, size * 0.14);
      context.closePath();
      context.stroke();
      context.globalAlpha = 0.14;
      context.beginPath();
      context.moveTo(size * 0.30, 0);
      context.lineTo(size * 0.90, -size * 0.40);
      context.lineTo(size * 0.90, size * 0.40);
      context.closePath();
      context.fill();
      context.globalAlpha = 1;
      context.beginPath();
      context.moveTo(-size * 0.05, -size * 0.34);
      context.lineTo(size * 0.12, -size * 0.46);
      context.lineTo(size * 0.12, -size * 0.22);
      context.closePath();
      context.fill();
    } else if (item.type === "person") {
      const size = Number(item.size) || 54;
      context.translate(item.x, item.y);
      context.rotate(Number(item.angle) || 0);
      context.beginPath();
      context.arc(0, 0, size * 0.24, 0, Math.PI * 2);
      context.stroke();
      context.beginPath();
      context.moveTo(0, -size * 0.12);
      context.lineTo(0, -size * 0.55);
      context.lineTo(-size * 0.10, -size * 0.38);
      context.moveTo(0, -size * 0.55);
      context.lineTo(size * 0.10, -size * 0.38);
      context.stroke();
    } else if (item.type === "label") {
      context.font = `${item.fontWeight || 700} ${getDecLabelFontSize(item)}px Arial`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(String(item.text || ""), item.x, item.y);
    } else if (item.type === "ldc") {
      context.setLineDash([14, 10]);
      context.beginPath();
      context.moveTo(item.x1, item.y1);
      context.lineTo(item.x2, item.y2);
      context.stroke();
      context.setLineDash([]);
      const midX = (item.x1 + item.x2) / 2;
      const midY = (item.y1 + item.y2) / 2;
      const angle = Math.atan2(item.y2 - item.y1, item.x2 - item.x1);
      const labelOffset = 16;
      const labelX = midX + Math.cos(angle - Math.PI / 2) * labelOffset;
      const labelY = midY + Math.sin(angle - Math.PI / 2) * labelOffset;
      context.save();
      context.font = `700 24px Arial`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("LDC", labelX, labelY);
      context.restore();
    } else if (item.type === "dolly") {
      const start = { x: item.x1, y: item.y1 };
      const control = getDecDollyCurveControl(item);
      const end = { x: item.x2, y: item.y2 };
      const railOffset = 7;
      const sleeperHalf = 8;
      const sampleStep = 1 / 28;
      const sleeperStep = 0.12;

      const getOffsetPoint = (t, offset) => {
        const point = getQuadraticPoint(start, control, end, t);
        const angle = getQuadraticTangentAngle(start, control, end, t);
        const nx = -Math.sin(angle);
        const ny = Math.cos(angle);
        return { x: point.x + nx * offset, y: point.y + ny * offset };
      };

      const drawRail = (offset) => {
        context.beginPath();
        const p0 = getOffsetPoint(0, offset);
        context.moveTo(p0.x, p0.y);
        for (let t = sampleStep; t <= 1 + 1e-6; t += sampleStep) {
          const p = getOffsetPoint(Math.min(1, t), offset);
          context.lineTo(p.x, p.y);
        }
        context.stroke();
      };

      context.lineWidth = 2.5;
      drawRail(railOffset);
      drawRail(-railOffset);

      context.save();
      context.lineWidth = 1.8;
      for (let t = sleeperStep * 0.5; t < 1; t += sleeperStep) {
        const left = getOffsetPoint(t, railOffset);
        const right = getOffsetPoint(t, -railOffset);
        context.beginPath();
        if (Math.hypot(right.x - left.x, right.y - left.y) > sleeperHalf) {
          context.moveTo(left.x, left.y);
          context.lineTo(right.x, right.y);
        } else {
          const center = getQuadraticPoint(start, control, end, t);
          const angle = getQuadraticTangentAngle(start, control, end, t);
          const nx = -Math.sin(angle);
          const ny = Math.cos(angle);
          context.moveTo(center.x - nx * sleeperHalf, center.y - ny * sleeperHalf);
          context.lineTo(center.x + nx * sleeperHalf, center.y + ny * sleeperHalf);
        }
        context.stroke();
      }
      context.restore();
    }
    context.restore();
  }

  function renderDecSelection(item) {
    if (!decCtx || !item) return;
    const b = getDecItemBounds(item);
    decCtx.save();
    decCtx.strokeStyle = "#6ee7ff";
    decCtx.lineWidth = 2;
    decCtx.setLineDash([8, 6]);
    decCtx.strokeRect(b.x, b.y, b.w, b.h);
    decCtx.setLineDash([]);
    if (item.type === "ldc" || item.type === "dolly") {
      getDecLineHandles(item).forEach((handle) => {
        decCtx.beginPath();
        decCtx.rect(handle.x - HANDLE_SIZE / 2, handle.y - HANDLE_SIZE / 2, HANDLE_SIZE, HANDLE_SIZE);
        decCtx.fillStyle = "#6ee7ff";
        decCtx.fill();
        decCtx.strokeStyle = "#0b0c10";
        decCtx.stroke();
      });
      if (item.type === "dolly") {
        const curveHandle = getDecDollyCurveHandle(item);
        if (curveHandle) {
          decCtx.beginPath();
          decCtx.arc(curveHandle.x, curveHandle.y, 8, 0, Math.PI * 2);
          decCtx.fillStyle = "#f59e0b";
          decCtx.fill();
          decCtx.strokeStyle = "#0b0c10";
          decCtx.stroke();
        }
      }
    }
    const handle = getDecRotateHandle(item);
    if (handle) {
      decCtx.beginPath();
      decCtx.arc(handle.x, handle.y, 8, 0, Math.PI * 2);
      decCtx.fillStyle = "#a78bfa";
      decCtx.fill();
      decCtx.strokeStyle = "#0b0c10";
      decCtx.stroke();
    }
    const resizeHandle = getDecLabelResizeHandle(item);
    if (resizeHandle) {
      decCtx.beginPath();
      decCtx.arc(resizeHandle.x, resizeHandle.y, 8, 0, Math.PI * 2);
      decCtx.fillStyle = "#f59e0b";
      decCtx.fill();
      decCtx.strokeStyle = "#0b0c10";
      decCtx.stroke();
    }
    decCtx.restore();
  }

  function renderDecoupageScene() {
    if (!decCanvas || !decCtx || !decBaseCanvas) return;
    clearDecDisplayCanvas();
    decCtx.drawImage(decBaseCanvas, 0, 0);
    (decoupage.items || []).forEach((item) => renderDecItem(item, decCtx));
    (decoupage.shapes || []).forEach((shape) => renderShape(shape, decCtx));
    const selectedShape = getActiveDecShape();
    const selectedItem = (decoupage.items || []).find((item) => item.id === decSelectedItemId) || null;
    if (selectedShape) renderSelectionForContext(selectedShape, decCtx);
    else if (selectedItem) renderDecSelection(selectedItem);
  }

  function addDecoupageItem(kind, labelText = "") {
    if (!decCanvas) return;
    setActiveSurface("decoupage");
    let item;
    const color = colorEl?.value || "#111111";
    if (kind === "camera") {
      item = { id: decNextItemId++, type: "camera", x: decCanvas.width / 2, y: decCanvas.height / 2, angle: 0, size: 92, color };
    } else if (kind === "person") {
      item = { id: decNextItemId++, type: "person", x: decCanvas.width / 2, y: decCanvas.height / 2, angle: 0, size: 62, color };
    } else if (kind === "ldc") {
      item = { id: decNextItemId++, type: "ldc", x1: decCanvas.width * 0.2, y1: decCanvas.height * 0.7, x2: decCanvas.width * 0.8, y2: decCanvas.height * 0.35, color };
    } else if (kind === "dolly") {
      const x1 = decCanvas.width * 0.28;
      const y1 = decCanvas.height * 0.72;
      const x2 = decCanvas.width * 0.72;
      const y2 = decCanvas.height * 0.42;
      item = { id: decNextItemId++, type: "dolly", x1, y1, x2, y2, cx: (x1 + x2) / 2, cy: (y1 + y2) / 2, color };
    } else {
      const safeText = String(labelText || "").trim() || currentDecLetter || "A";
      item = { id: decNextItemId++, type: "label", x: decCanvas.width / 2, y: decCanvas.height / 2, text: safeText, fontWeight: 700, fontSize: 26, color };
    }
    decoupage.items.push(item);
    decSelectedShapeId = null;
    decSelectedItemId = item.id;
    renderDecoupageScene();
    updateDeleteShapeButton();
    pushDecoupageHistory();
    persistCurrentState();
  }

  function getPosFromCanvas(evt, targetCanvas) {
    const rect = targetCanvas.getBoundingClientRect();
    const touch = evt.touches ? evt.touches[0] : (evt.changedTouches ? evt.changedTouches[0] : null);
    const clientX = touch ? touch.clientX : evt.clientX;
    const clientY = touch ? touch.clientY : evt.clientY;
    return {
      x: (clientX - rect.left) * (targetCanvas.width / rect.width),
      y: (clientY - rect.top) * (targetCanvas.height / rect.height)
    };
  }


  function hitDecShape(point) {
    const shapes = decoupage.shapes || [];
    for (let i = shapes.length - 1; i >= 0; i -= 1) {
      const shape = shapes[i];
      const { x, y, w, h } = normalizeRect(shape);
      if (shape.type === "line" || shape.type === "arrow") {
        const minX = x - LINE_HIT_TOLERANCE;
        const maxX = x + w + LINE_HIT_TOLERANCE;
        const minY = y - LINE_HIT_TOLERANCE;
        const maxY = y + h + LINE_HIT_TOLERANCE;
        if (point.x < minX || point.x > maxX || point.y < minY || point.y > maxY) continue;
        const distance = distancePointToSegment(point, { x: shape.x1, y: shape.y1 }, { x: shape.x2, y: shape.y2 });
        if (distance <= LINE_HIT_TOLERANCE) return shape;
        continue;
      }
      if (point.x < x || point.x > x + w || point.y < y || point.y > y + h) continue;
      if (shape.type === "rect" || shape.type === "text") return shape;
      if (shape.type === "triangle") {
        const a = { x: x + w / 2, y };
        const b = { x: x + w, y: y + h };
        const c = { x, y: y + h };
        if (pointInTriangle(point, a, b, c)) return shape;
      }
      if (shape.type === "circle" || shape.type === "circleCross") {
        const rx = w / 2 || 1;
        const ry = h / 2 || 1;
        const cx = x + rx;
        const cy = y + ry;
        const nx = (point.x - cx) / rx;
        const ny = (point.y - cy) / ry;
        if ((nx * nx) + (ny * ny) <= 1) return shape;
      }
    }
    return null;
  }

  function startDecoupage(evt) {
    if (!decCanvas || !decBaseCtx) return;
    setActiveSurface("decoupage");
    const point = getPosFromCanvas(evt, decCanvas);
    const canInteractWithShapes = currentTool === "hand";
    const selectedShape = canInteractWithShapes ? getActiveDecShape() : null;
    const selectedHandle = canInteractWithShapes && selectedShape ? hitHandle(selectedShape, point) : null;

    if (selectedHandle && selectedShape) {
      decSelectedItemId = null;
      decInteraction = selectedHandle === "cross"
        ? { type: "move-cross-shape", shapeId: selectedShape.id }
        : (selectedHandle === "curveV" || selectedHandle === "curveH")
          ? { type: selectedHandle === "curveV" ? "curve-vertical-shape" : "curve-horizontal-shape", shapeId: selectedShape.id }
          : { type: "resize-shape", shapeId: selectedShape.id, handle: selectedHandle, originRect: normalizeRect(selectedShape) };
      pushDecoupageHistory();
      renderDecoupageScene();
      evt.preventDefault?.();
      return;
    }

    const shapeHit = canInteractWithShapes ? hitDecShape(point) : null;
    if (shapeHit) {
      decSelectedShapeId = shapeHit.id;
      decSelectedItemId = null;
      decInteraction = (shapeHit.type === "line" || shapeHit.type === "arrow")
        ? { type: "move-shape", shapeId: shapeHit.id, startPoint: point, origin: { x1: shapeHit.x1, y1: shapeHit.y1, x2: shapeHit.x2, y2: shapeHit.y2 } }
        : { type: "move-shape", shapeId: shapeHit.id, offsetX: point.x - shapeHit.x, offsetY: point.y - shapeHit.y };
      pushDecoupageHistory();
      renderDecoupageScene();
      evt.preventDefault?.();
      return;
    }

    const hit = canInteractWithShapes ? hitDecItem(point) : null;
    if (hit?.item) {
      decSelectedShapeId = null;
      decSelectedItemId = hit.item.id;
      if (hit.mode === "rotate") {
        decInteraction = { type: "rotate", itemId: hit.item.id };
      } else if (hit.mode === "resize-label") {
        decInteraction = { type: "resize-label", itemId: hit.item.id, startPoint: point, startFontSize: getDecLabelFontSize(hit.item) };
      } else if (hit.item.type === "ldc" || hit.item.type === "dolly") {
        if (hit.mode === "curve") {
          decInteraction = { type: "curve-dolly", itemId: hit.item.id };
        } else if (hit.mode === "move-start") {
          decInteraction = { type: "move-line-start", itemId: hit.item.id };
        } else if (hit.mode === "move-end") {
          decInteraction = { type: "move-line-end", itemId: hit.item.id };
        } else {
          decInteraction = { type: "move-line", itemId: hit.item.id, offsetX: point.x, offsetY: point.y };
        }
      } else {
        decInteraction = { type: "move-item", itemId: hit.item.id, offsetX: point.x - hit.item.x, offsetY: point.y - hit.item.y };
      }
      renderDecoupageScene();
      updateDeleteShapeButton();
      evt.preventDefault?.();
      return;
    }

    decSelectedItemId = null;
    decSelectedShapeId = null;
    const drawTool = currentTool;
    if (!isDrawTool(drawTool)) {
      renderDecoupageScene();
      updateDeleteShapeButton();
      return;
    }
    decInteraction = { type: "draw", tool: drawTool, last: point };
    decBaseCtx.lineCap = "round";
    decBaseCtx.lineJoin = "round";
    decBaseCtx.beginPath();
    decBaseCtx.moveTo(point.x, point.y);
    evt.preventDefault?.();
    renderDecoupageScene();
  }

  function moveDecoupage(evt) {
    if (!decCanvas || !decInteraction) return;
    const point = getPosFromCanvas(evt, decCanvas);
    if (decInteraction.type === "move-shape") {
      const shape = (decoupage.shapes || []).find((entry) => entry.id === decInteraction.shapeId);
      if (!shape) return;
      if (shape.type === "line" || shape.type === "arrow") {
        const dx = point.x - decInteraction.startPoint.x;
        const dy = point.y - decInteraction.startPoint.y;
        shape.x1 = decInteraction.origin.x1 + dx;
        shape.y1 = decInteraction.origin.y1 + dy;
        shape.x2 = decInteraction.origin.x2 + dx;
        shape.y2 = decInteraction.origin.y2 + dy;
      } else {
        shape.x = Math.max(0, Math.min(decCanvas.width - shape.w, point.x - decInteraction.offsetX));
        shape.y = Math.max(0, Math.min(decCanvas.height - shape.h, point.y - decInteraction.offsetY));
      }
      renderDecoupageScene();
      evt.preventDefault?.();
      return;
    }
    if (decInteraction.type === "resize-shape") {
      const shape = (decoupage.shapes || []).find((entry) => entry.id === decInteraction.shapeId);
      if (!shape) return;
      updateShapeFromResize(shape, decInteraction.handle, point, decInteraction.originRect);
      renderDecoupageScene();
      evt.preventDefault?.();
      return;
    }
    if (decInteraction.type === "move-cross-shape") {
      const shape = (decoupage.shapes || []).find((entry) => entry.id === decInteraction.shapeId);
      if (!shape || shape.type !== "circleCross") return;
      clampCircleCrossControl(shape, point);
      renderDecoupageScene();
      evt.preventDefault?.();
      return;
    }
    if (decInteraction.type === "curve-vertical-shape") {
      const shape = (decoupage.shapes || []).find((entry) => entry.id === decInteraction.shapeId);
      if (!shape || shape.type !== "circleCross") return;
      const control = getCircleCrossControl(shape);
      const rx = Math.abs(shape.w) / 2 || 1;
      shape.curveV = Math.max(-1.2, Math.min(1.2, (point.x - control.x) / rx));
      renderDecoupageScene();
      evt.preventDefault?.();
      return;
    }
    if (decInteraction.type === "curve-horizontal-shape") {
      const shape = (decoupage.shapes || []).find((entry) => entry.id === decInteraction.shapeId);
      if (!shape || shape.type !== "circleCross") return;
      const control = getCircleCrossControl(shape);
      const ry = Math.abs(shape.h) / 2 || 1;
      shape.curveH = Math.max(-1.2, Math.min(1.2, (point.y - control.y) / ry));
      renderDecoupageScene();
      evt.preventDefault?.();
      return;
    }
    if (decInteraction.type === "draw") {
      const tool = decInteraction.tool;
      decBaseCtx.save();
      if (tool === "eraser") {
        decBaseCtx.globalCompositeOperation = "destination-out";
        decBaseCtx.strokeStyle = "rgba(0,0,0,1)";
        decBaseCtx.globalAlpha = 1;
      } else {
        decBaseCtx.globalCompositeOperation = "source-over";
        decBaseCtx.strokeStyle = colorEl?.value || "#111111";
        decBaseCtx.globalAlpha = tool === "highlighter" ? 0.5 : 1;
      }
      decBaseCtx.lineWidth = Number(sizeEl?.value || 4);
      decBaseCtx.lineTo(point.x, point.y);
      decBaseCtx.stroke();
      decBaseCtx.restore();
      decInteraction.last = point;
      renderDecoupageScene();
      evt.preventDefault?.();
      return;
    }
    const item = (decoupage.items || []).find((entry) => entry.id === decInteraction.itemId);
    if (!item) return;
    if (decInteraction.type === "resize-label") {
      const delta = point.x - decInteraction.startPoint.x;
      item.fontSize = Math.max(18, Math.min(160, Math.round(decInteraction.startFontSize + delta * 0.35)));
    } else if (decInteraction.type === "move-item") {
      item.x = point.x - decInteraction.offsetX;
      item.y = point.y - decInteraction.offsetY;
    } else if (decInteraction.type === "move-line") {
      const dx = point.x - decInteraction.offsetX;
      const dy = point.y - decInteraction.offsetY;
      item.x1 += dx; item.y1 += dy; item.x2 += dx; item.y2 += dy;
      if (item.type === "dolly") {
        item.cx = getDecDollyCurveControl(item).x + dx;
        item.cy = getDecDollyCurveControl(item).y + dy;
      }
      decInteraction.offsetX = point.x; decInteraction.offsetY = point.y;
    } else if (decInteraction.type === "move-line-start") {
      item.x1 = point.x; item.y1 = point.y;
    } else if (decInteraction.type === "move-line-end") {
      item.x2 = point.x; item.y2 = point.y;
    } else if (decInteraction.type === "curve-dolly") {
      item.cx = point.x;
      item.cy = point.y;
    } else if (decInteraction.type === "rotate") {
      if (item.type === "ldc") {
        const midX = (item.x1 + item.x2) / 2;
        const midY = (item.y1 + item.y2) / 2;
        const halfLength = Math.max(MIN_SHAPE_SIZE / 2, Math.hypot(item.x2 - item.x1, item.y2 - item.y1) / 2);
        const angle = Math.atan2(point.y - midY, point.x - midX);
        item.x1 = midX - Math.cos(angle) * halfLength;
        item.y1 = midY - Math.sin(angle) * halfLength;
        item.x2 = midX + Math.cos(angle) * halfLength;
        item.y2 = midY + Math.sin(angle) * halfLength;
      } else {
        item.angle = Math.atan2(point.y - item.y, point.x - item.x) + Math.PI / 2;
      }
    }
    renderDecoupageScene();
    evt.preventDefault?.();
  }

  function endDecoupage(evt) {
    if (!decInteraction) return;
    const shouldPersist = Boolean(decInteraction);
    decInteraction = null;
    if (shouldPersist) {
      saveDecoupageData();
      pushDecoupageHistory();
      renderDecoupageScene();
      updateDeleteShapeButton();
    }
    evt?.preventDefault?.();
  }

  function clearDecoupageAll() {
    if (!decCanvas) return;
    setActiveSurface("decoupage");
    clearDecBaseCanvas();
    decoupage.items = [];
    decoupage.shapes = [];
    decSelectedItemId = null;
    decSelectedShapeId = null;
    renderDecoupageScene();
    pushDecoupageHistory();
  }

  function getPos(evt) {
    return getPosFromCanvas(evt, canvas);
  }

  function handleCanvasDoubleClick(evt) {
    if (currentTool !== "hand") return;
    const point = getPos(evt);
    const hit = hitShape(point);
    if (!hit || hit.type !== "text") return;
    if (selectedShapeId !== hit.id) {
      selectedShapeId = hit.id;
      renderScene();
      updateDeleteShapeButton();
    }
    editTextShape(hit);
    evt.preventDefault?.();
  }

  function handleDecCanvasDoubleClick(evt) {
    if (!decCanvas || currentTool !== "hand") return;
    const point = getPosFromCanvas(evt, decCanvas);
    const hit = hitDecShape(point);
    if (!hit || hit.type !== "text") return;
    if (decSelectedShapeId !== hit.id) {
      decSelectedShapeId = hit.id;
      decSelectedItemId = null;
      renderDecoupageScene();
      updateDeleteShapeButton();
    }
    editDecoupageTextShape(hit);
    evt.preventDefault?.();
  }

  function clearTextLongPress() {
    if (textLongPressTimer) {
      clearTimeout(textLongPressTimer);
      textLongPressTimer = null;
    }
    touchStartPoint = null;
  }

  function maybeStartTextLongPress(evt, point, hit) {
    if (!evt.touches || evt.touches.length !== 1) return;
    if (!hit || hit.type !== "text") return;
    touchStartPoint = { x: point.x, y: point.y, shapeId: hit.id };
    textLongPressFired = false;
    clearTextLongPress();
    touchStartPoint = { x: point.x, y: point.y, shapeId: hit.id };
    textLongPressTimer = setTimeout(() => {
      const activeHit = getSelectedShape();
      const target = activeHit && activeHit.id === hit.id ? activeHit : hit;
      if (!target || target.type !== "text") return;
      textLongPressFired = editTextShape(target);
      clearTextLongPress();
    }, 420);
  }

  function start(evt) {
    setActiveSurface("shot");
    const point = getPos(evt);
    const canInteractWithShapes = currentTool === "hand";
    const selected = canInteractWithShapes ? getSelectedShape() : null;
    const selectedHandle = canInteractWithShapes && selected ? hitHandle(selected, point) : null;

    if (selectedHandle && selected) {
      interaction = selectedHandle === "cross"
        ? {
            type: "move-cross",
            shapeId: selected.id
          }
        : (selectedHandle === "curveV" || selectedHandle === "curveH")
          ? {
              type: selectedHandle === "curveV" ? "curve-vertical" : "curve-horizontal",
              shapeId: selected.id
            }
          : {
              type: "resize-shape",
              shapeId: selected.id,
              handle: selectedHandle,
              originRect: normalizeRect(selected)
            };
      pushHistory();
      evt.preventDefault?.();
      return;
    }

    const hit = canInteractWithShapes ? hitShape(point) : null;
    if (hit) {
      maybeStartTextLongPress(evt, point, hit);
      if (selectedShapeId !== hit.id) {
        selectedShapeId = hit.id;
        renderScene();
        updateDeleteShapeButton();
      }
      interaction = (hit.type === "line" || hit.type === "arrow")
        ? {
            type: "move-shape",
            shapeId: hit.id,
            startPoint: point,
            origin: { x1: hit.x1, y1: hit.y1, x2: hit.x2, y2: hit.y2 }
          }
        : {
            type: "move-shape",
            shapeId: hit.id,
            offsetX: point.x - hit.x,
            offsetY: point.y - hit.y
          };
      pushHistory();
      evt.preventDefault?.();
      return;
    }

    selectedShapeId = null;
    renderScene();

    if (!isDrawTool(currentTool)) {
      last = null;
      return;
    }

    drawing = true;
    last = point;
    pushHistory();
    evt.preventDefault?.();
  }

  function move(evt) {
    const point = getPos(evt);

    if (touchStartPoint) {
      const moved = Math.hypot(point.x - touchStartPoint.x, point.y - touchStartPoint.y);
      if (moved > 10) clearTextLongPress();
    }

    if (interaction?.type === "move-shape") {
      const shape = getActiveShot()?.shapes?.find((item) => item.id === interaction.shapeId);
      if (!shape) return;
      if (shape.type === "line" || shape.type === "arrow") {
        const dx = point.x - interaction.startPoint.x;
        const dy = point.y - interaction.startPoint.y;
        shape.x1 = interaction.origin.x1 + dx;
        shape.y1 = interaction.origin.y1 + dy;
        shape.x2 = interaction.origin.x2 + dx;
        shape.y2 = interaction.origin.y2 + dy;
      } else {
        shape.x = Math.max(0, Math.min(canvas.width - shape.w, point.x - interaction.offsetX));
        shape.y = Math.max(0, Math.min(canvas.height - shape.h, point.y - interaction.offsetY));
      }
      renderScene();
      evt.preventDefault?.();
      return;
    }

    if (interaction?.type === "resize-shape") {
      const shape = getActiveShot()?.shapes?.find((item) => item.id === interaction.shapeId);
      if (!shape) return;
      updateShapeFromResize(shape, interaction.handle, point, interaction.originRect);
      renderScene();
      evt.preventDefault?.();
      return;
    }

    if (interaction?.type === "move-cross") {
      const shape = getActiveShot()?.shapes?.find((item) => item.id === interaction.shapeId);
      if (!shape || shape.type !== "circleCross") return;
      clampCircleCrossControl(shape, point);
      renderScene();
      evt.preventDefault?.();
      return;
    }

    if (interaction?.type === "curve-vertical") {
      const shape = getActiveShot()?.shapes?.find((item) => item.id === interaction.shapeId);
      if (!shape || shape.type !== "circleCross") return;
      const control = getCircleCrossControl(shape);
      const rx = Math.abs(shape.w) / 2 || 1;
      shape.curveV = Math.max(-1.2, Math.min(1.2, (point.x - control.x) / rx));
      renderScene();
      evt.preventDefault?.();
      return;
    }

    if (interaction?.type === "curve-horizontal") {
      const shape = getActiveShot()?.shapes?.find((item) => item.id === interaction.shapeId);
      if (!shape || shape.type !== "circleCross") return;
      const control = getCircleCrossControl(shape);
      const ry = Math.abs(shape.h) / 2 || 1;
      shape.curveH = Math.max(-1.2, Math.min(1.2, (point.y - control.y) / ry));
      renderScene();
      evt.preventDefault?.();
      return;
    }

    if (!drawing) return;
    const size = Number(sizeEl.value);
    const mode = currentTool;

    baseCtx.lineCap = "round";
    baseCtx.lineJoin = "round";
    baseCtx.lineWidth = size;

    if (mode === "eraser") {
      baseCtx.globalCompositeOperation = "destination-out";
      baseCtx.strokeStyle = "rgba(0,0,0,1)";
      baseCtx.globalAlpha = 1;
    } else if (mode === "highlighter") {
      baseCtx.globalCompositeOperation = "source-over";
      baseCtx.strokeStyle = colorEl.value;
      baseCtx.globalAlpha = 0.5;
    } else {
      baseCtx.globalCompositeOperation = "source-over";
      baseCtx.strokeStyle = colorEl.value;
      baseCtx.globalAlpha = 1;
    }

    baseCtx.beginPath();
    baseCtx.moveTo(last.x, last.y);
    baseCtx.lineTo(point.x, point.y);
    baseCtx.stroke();
    baseCtx.globalAlpha = 1;
    last = point;
    renderScene();
    evt.preventDefault?.();
  }

  function end() {
    const firedLongPress = textLongPressFired;
    if (!firedLongPress) {
      clearTextLongPress();
    } else {
      textLongPressFired = false
    }
    if (interaction) {
      interaction = null;
      pushHistory();
      renderScene();
      return;
    }
    if (firedLongPress) {
      textLongPressFired = false;
      return;
    }
    if (!drawing) return;
    drawing = false;
    last = null;
    baseCtx.globalCompositeOperation = "source-over";
    pushHistory();
    renderScene();
  }

  function ensureShotNotes(shot) {
    if (!shot) return createEmptyNotes();
    shot.notes = createEmptyNotes(shot.notes);
    return shot.notes;
  }

  function updateActiveShotNotes(key, value) {
    const activeShot = getActiveShot();
    if (!activeShot) return;
    const notes = ensureShotNotes(activeShot);
    notes[key] = value;
    persistCurrentState();
  }

  if (sceneNameEl) {
    updateSceneField();
    sceneNameEl.addEventListener("input", () => {
      sceneName = sceneNameEl.value;
      persistCurrentState();
      renderShotList();
    });
  }

  if (shotNameEl) {
    updateShotField();
    shotNameEl.addEventListener("input", () => {
      const activeShot = getActiveShot();
      if (!activeShot) return;
      activeShot.customName = shotNameEl.value;
      persistCurrentState();
      renderShotList();
    });
  }

  notesLocationEl?.addEventListener("input", () => { updateActiveShotNotes("location", notesLocationEl.value.trim()); });
  notesCharactersEl?.addEventListener("input", () => { updateActiveShotNotes("characters", notesCharactersEl.value.trim()); });
  notesDescriptionEl?.addEventListener("input", () => { updateActiveShotNotes("description", notesDescriptionEl.value); });
  notesDialogueEl?.addEventListener("input", () => { updateActiveShotNotes("dialogue", notesDialogueEl.value); });
  notesCameraEl?.addEventListener("input", () => { updateActiveShotNotes("camera", notesCameraEl.value); });
  notesAudioEl?.addEventListener("input", () => { updateActiveShotNotes("audio", notesAudioEl.value); });
  notesExtraEl?.addEventListener("input", () => { updateActiveShotNotes("notes", notesExtraEl.value); });

  updateStrokeUi();
  sizeEl?.addEventListener("input", updateStrokeUi);
  sizeEl?.addEventListener("change", updateStrokeUi);
  colorEl?.addEventListener("input", updateStrokeUi);
  colorEl?.addEventListener("change", updateStrokeUi);

  colorToggleEl?.addEventListener("click", (event) => {
    event.stopPropagation();
    colorEl?.click();
  });

  toolToggleEl?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!toolMenuEl) return;
    const nextHidden = !toolMenuEl.hidden;
    toolMenuEl.hidden = nextHidden;
    toolToggleEl.setAttribute("aria-expanded", nextHidden ? "false" : "true");
    closeSizePopover();
  });

  toolOptionEls.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      setCurrentTool(button.dataset.toolValue || "pen");
      closeToolMenu();
    });
  });

  sizeToggleEl?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!sizePopoverEl) return;
    const nextHidden = !sizePopoverEl.hidden;
    sizePopoverEl.hidden = nextHidden;
    sizeToggleEl.setAttribute("aria-expanded", nextHidden ? "false" : "true");
    closeToolMenu();
  });

  thirdsToggleEl?.addEventListener("click", () => {
    showThirdsGrid = !showThirdsGrid;
    updateThirdsToggle();
    persistCurrentState();
  });

  aspectToggleEl?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!aspectMenuEl) return;
    aspectMenuEl.hidden = !aspectMenuEl.hidden;
  });

  aspectOptionEls.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      aspectRatioValue = button.dataset.aspectValue || "off";
      updateAspectOverlay();
      closeAspectMenu();
      persistCurrentState();
    });
  });

  circleToggleEl?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!circleMenuEl) return;
    const nextHidden = !circleMenuEl.hidden;
    circleMenuEl.hidden = nextHidden;
    circleToggleEl.setAttribute("aria-pressed", nextHidden ? "true" : "false");
    circleToggleEl.classList.toggle("is-active", nextHidden);
  });

  circleOptionEls.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      addShape(button.dataset.circleValue || "circle");
      closeCircleMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (aspectMenuEl && !aspectMenuEl.hidden) {
      if (!(aspectMenuEl.contains(event.target) || aspectToggleEl?.contains(event.target))) {
        closeAspectMenu();
      }
    }
    if (circleMenuEl && !circleMenuEl.hidden) {
      if (!(circleMenuEl.contains(event.target) || circleToggleEl?.contains(event.target))) {
        closeCircleMenu();
      }
    }
    if (toolMenuEl && !toolMenuEl.hidden) {
      if (!(toolMenuEl.contains(event.target) || toolToggleEl?.contains(event.target))) {
        closeToolMenu();
      }
    }
    if (sizePopoverEl && !sizePopoverEl.hidden) {
      if (!(sizePopoverEl.contains(event.target) || sizeToggleEl?.contains(event.target))) {
        closeSizePopover();
      }
    }
  });

  window.addEventListener("resize", () => {
    updateAspectOverlay();
    renderScene();
  });

  const stopToolbarEvent = (event) => {
    event.stopPropagation();
  };

  const onToolbarPress = (element, handler) => {
    if (!element) return;
    element.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      handler(event);
    });
  };

  [textToolbarEl, textSizeEl, textSizeDownEl, textSizeUpEl, textFontEl, textBoldEl, textItalicEl, textUnderlineEl, textAlignToggleEl, textAlignMenuEl, ...textAlignOptionEls, textColorEl, textBgColorEl, textLabelEl, textOpacityToggleEl, textOpacityPopoverEl, textOpacityEl, textOpacityValueEl, textDuplicateEl]
    .filter(Boolean)
    .forEach((element) => {
      element.addEventListener("pointerdown", stopToolbarEvent);
      element.addEventListener("mousedown", stopToolbarEvent);
      element.addEventListener("click", stopToolbarEvent);
      element.addEventListener("touchstart", stopToolbarEvent, { passive: true });
    });

  document.addEventListener("pointerdown", (event) => {
    if (!textToolbarEl || textToolbarEl.hidden) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (textToolbarEl.contains(target)) return;
    closeTextAlignMenu();
    closeTextOpacityPopover();
  });

  const swallowToolbarClick = (event) => {
    event.stopPropagation();
  };
  [textAlignToggleEl, ...textAlignOptionEls, textBoldEl, textItalicEl, textUnderlineEl, textLabelEl, textOpacityToggleEl, textDuplicateEl, textSizeDownEl, textSizeUpEl]
    .filter(Boolean)
    .forEach((element) => element.addEventListener("click", swallowToolbarClick));

  const applyTextSize = () => {
    const value = Math.max(12, Math.min(120, Number(textSizeEl?.value) || 42));
    updateTextShapeStyle((shape) => {
      shape.fontSize = value;
    });
  };

  const applyTextFont = () => {
    updateTextShapeStyle((shape) => {
      shape.fontFamily = textFontEl?.value || "Arial";
    });
  };

  textSizeEl?.addEventListener("input", applyTextSize);
  textSizeEl?.addEventListener("change", applyTextSize);

  const clampTextSizeValue = (value) => Math.max(12, Math.min(120, Number(value) || 42));
  const nudgeTextSize = (delta) => {
    const shape = getSelectedShape();
    if (!shape || shape.type !== "text") return;
    const current = clampTextSizeValue(shape.fontSize);
    const next = clampTextSizeValue(current + delta);
    if (textSizeEl) textSizeEl.value = String(next);
    updateTextShapeStyle((target) => {
      target.fontSize = next;
    });
  };

  onToolbarPress(textSizeDownEl, () => {
    nudgeTextSize(-2);
  });
  onToolbarPress(textSizeUpEl, () => {
    nudgeTextSize(2);
  });

  textFontEl?.addEventListener("input", applyTextFont);
  textFontEl?.addEventListener("change", applyTextFont);

  onToolbarPress(textAlignToggleEl, () => {
    toggleTextAlignMenu();
  });

  onToolbarPress(textAlignLeftEl, () => {
    updateTextShapeStyle((shape) => {
      shape.textAlign = "left";
    });
    closeTextAlignMenu();
  });

  onToolbarPress(textAlignCenterEl, () => {
    updateTextShapeStyle((shape) => {
      shape.textAlign = "center";
    });
    closeTextAlignMenu();
  });

  onToolbarPress(textAlignRightEl, () => {
    updateTextShapeStyle((shape) => {
      shape.textAlign = "right";
    });
    closeTextAlignMenu();
  });

  const applyTextColor = () => {
    updateTextShapeStyle((shape) => {
      shape.textColor = textColorEl?.value || "#111111";
    });
  };
  textColorEl?.addEventListener("input", applyTextColor);
  textColorEl?.addEventListener("change", applyTextColor);

  const applyTextBgColor = () => {
    updateTextShapeStyle((shape) => {
      shape.textBgColor = textBgColorEl?.value || DEFAULT_TEXT_BG_COLOR;
    });
  };
  textBgColorEl?.addEventListener("input", applyTextBgColor);
  textBgColorEl?.addEventListener("change", applyTextBgColor);

  const applyTextOpacity = () => {
    const value = Math.max(20, Math.min(100, Number(textOpacityEl?.value) || 100));
    if (textOpacityValueEl) textOpacityValueEl.textContent = `${value}%`;
    if (textOpacityToggleEl) textOpacityToggleEl.textContent = `${value}%`;
    updateTextShapeStyle((shape) => {
      shape.textOpacity = value / 100;
    });
  };
  onToolbarPress(textOpacityToggleEl, () => {
    toggleTextOpacityPopover();
  });
  textOpacityEl?.addEventListener("input", applyTextOpacity);
  textOpacityEl?.addEventListener("change", applyTextOpacity);

  onToolbarPress(textLabelEl, () => {
    updateTextShapeStyle((shape) => {
      shape.textBg = !Boolean(shape.textBg);
      shape.textBgColor = shape.textBgColor || DEFAULT_TEXT_BG_COLOR;
    });
  });

  onToolbarPress(textDuplicateEl, () => {
    duplicateSelectedText();
  });

  onToolbarPress(textBoldEl, () => {
    updateTextShapeStyle((shape) => {
      shape.fontWeight = (shape.fontWeight || "400") === "700" ? "400" : "700";
    });
  });

  onToolbarPress(textItalicEl, () => {
    updateTextShapeStyle((shape) => {
      shape.fontStyle = (shape.fontStyle || "normal") === "italic" ? "normal" : "italic";
    });
  });

  onToolbarPress(textUnderlineEl, () => {
    updateTextShapeStyle((shape) => {
      shape.textUnderline = !Boolean(shape.textUnderline);
    });
  });

  populateDecQuickMenus();
  btnDecAddCamera?.addEventListener("click", () => addDecoupageItem("camera"));
  btnDecAddPerson?.addEventListener("click", () => addDecoupageItem("person"));
  btnDecAddDolly?.addEventListener("click", () => addDecoupageItem("dolly"));
  btnDecAddLdc?.addEventListener("click", () => addDecoupageItem("ldc"));
  btnDecAddMdp?.addEventListener("click", () => addDecoupageItem("label", "MDP"));
  btnDecLetterToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!decLetterMenuEl) return;
    const nextOpen = decLetterMenuEl.hidden;
    closeDecQuickMenus();
    decLetterMenuEl.hidden = !nextOpen;
    btnDecLetterToggle.setAttribute("aria-expanded", nextOpen ? "true" : "false");
  });
  btnDecNumberToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!decNumberMenuEl) return;
    const nextOpen = decNumberMenuEl.hidden;
    closeDecQuickMenus();
    decNumberMenuEl.hidden = !nextOpen;
    btnDecNumberToggle.setAttribute("aria-expanded", nextOpen ? "true" : "false");
  });
  btnDecClear?.addEventListener("click", () => clearDecoupageAll());

  btnAddRect?.addEventListener("click", () => addShape("rect"));
  btnAddTriangle?.addEventListener("click", () => addShape("triangle"));
  btnAddLine?.addEventListener("click", (evt) => {
    evt.preventDefault();
    closeArrowMenu();
    closeCircleMenu();
    const willOpen = Boolean(lineMenuEl?.hidden);
    if (lineMenuEl) lineMenuEl.hidden = !willOpen;
    btnAddLine?.setAttribute("aria-expanded", willOpen ? "true" : "false");
  });
  lineOptionEls.forEach((button) => {
    button.addEventListener("click", () => {
      currentLineStyle = button.dataset.lineValue === "dashed" ? "dashed" : "solid";
      updateShapeStyleUi();
      addShape("line");
      closeLineMenu();
    });
  });
  btnAddArrow?.addEventListener("click", (evt) => {
    evt.preventDefault();
    closeLineMenu();
    closeCircleMenu();
    const willOpen = Boolean(arrowMenuEl?.hidden);
    if (arrowMenuEl) arrowMenuEl.hidden = !willOpen;
    btnAddArrow?.setAttribute("aria-expanded", willOpen ? "true" : "false");
  });
  arrowOptionEls.forEach((button) => {
    button.addEventListener("click", () => {
      currentArrowType = button.dataset.arrowValue === "double" ? "double" : "single";
      updateShapeStyleUi();
      addShape("arrow");
      closeArrowMenu();
    });
  });
  btnAddText?.addEventListener("click", () => addShape("text"));
  btnDuplicateShape?.addEventListener("click", () => duplicateSelectedShape());
  btnDeleteShape?.addEventListener("click", () => deleteSelectedShape());

  btnNewScene?.addEventListener("click", async () => {
    const proceed = window.confirm("Creare un nuovo storyboard? Salva la scena corrente nell'archivio se vuoi conservarla.");
    if (!proceed) return;

    sceneRecordId = null;
    sceneName = "";
    lastSavedAt = null;
    showThirdsGrid = false;
    aspectRatioValue = "off";
    nextShotId = 2;
    nextShapeId = 1;
    activeShotId = 1;
    selectedShapeId = null;
    interaction = null;
    shots = [createEmptyShot(1, "Shot 1")];
    decoupage = createEmptyDecoupage();
    decSelectedItemId = null;
    decSelectedShapeId = null;
    decInteraction = null;
    decNextItemId = 1;
    clearBaseCanvas();
    clearDecBaseCanvas();
    renderScene();
    renderDecoupageScene();
    setActiveSurface("shot");
    pushHistory();
    renderShotList();
    updateThirdsToggle();
    updateAspectOverlay();
    persistCurrentState();
    if (libraryDialog?.open) libraryDialog.close();
  });

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("dblclick", handleCanvasDoubleClick);
  canvas.addEventListener("mousemove", move);
  window.addEventListener("mouseup", end);

  canvas.addEventListener("touchstart", start, { passive: false });
  canvas.addEventListener("touchmove", move, { passive: false });
  window.addEventListener("touchend", end);
  window.addEventListener("touchcancel", () => { clearTextLongPress(); textLongPressFired = false; });

  decCanvas?.addEventListener("mousedown", startDecoupage);
  decCanvas?.addEventListener("dblclick", handleDecCanvasDoubleClick);
  decCanvas?.addEventListener("mousemove", moveDecoupage);
  window.addEventListener("mouseup", endDecoupage);
  decCanvas?.addEventListener("touchstart", startDecoupage, { passive: false });
  decCanvas?.addEventListener("touchmove", moveDecoupage, { passive: false });
  window.addEventListener("touchend", endDecoupage);
  window.addEventListener("touchcancel", endDecoupage);

  canvas.addEventListener("pointerdown", () => setActiveSurface("shot"));
  decCanvas?.addEventListener("pointerdown", () => setActiveSurface("decoupage"));
  shotCanvasCardEl?.addEventListener("click", () => setActiveSurface("shot"));
  decCanvasCardEl?.addEventListener("click", () => setActiveSurface("decoupage"));

  btnClear.addEventListener("click", () => {
    const shot = getActiveShot();
    if (!shot) return;
    setActiveSurface("shot");
    clearBaseCanvas();
    shot.shapes = [];
    selectedShapeId = null;
    renderScene();
    pushHistory();
    renderShotList();
  });

  btnUndo.addEventListener("click", async () => {
    if (activeSurface === "decoupage") {
      const currentSnapshot = getCurrentDecoupageSnapshotString();
      while (decoupage.history.length && decoupage.history[decoupage.history.length - 1] === currentSnapshot) {
        decoupage.history.pop();
      }
      if (!decoupage.history.length) {
        updateHistoryButtons();
        return;
      }
      decoupage.redo = Array.isArray(decoupage.redo) ? decoupage.redo : [];
      decoupage.redo.push(currentSnapshot);
      const snapshot = decoupage.history[decoupage.history.length - 1] || null;
      const parsed = parseDecoupageSnapshot(snapshot);
      decoupage.baseDataUrl = parsed.baseDataUrl;
      decoupage.items = cloneDecoupageItems(parsed.items || []);
      decoupage.shapes = cloneShapes(parsed.shapes || []);
      decSelectedItemId = null;
      decSelectedShapeId = null;
      await loadDecoupageBaseDataUrl(decoupage.baseDataUrl || null);
      renderDecoupageScene();
      persistCurrentState();
      updateDeleteShapeButton();
      return;
    }
    const shot = getActiveShot();
    if (!shot) return;
    const currentSnapshot = getCurrentShotSnapshotString();
    while (shot.history.length && shot.history[shot.history.length - 1] === currentSnapshot) {
      shot.history.pop();
    }
    if (!shot.history.length) {
      updateHistoryButtons();
      return;
    }
    shot.redo = Array.isArray(shot.redo) ? shot.redo : [];
    shot.redo.push(currentSnapshot);
    const snapshot = shot.history[shot.history.length - 1] || null;
    await applySceneSnapshot(snapshot);
    persistCurrentState();
    renderShotList();
  });

  btnRedo?.addEventListener("click", async () => {
    if (activeSurface === "decoupage") {
      if (!Array.isArray(decoupage.redo) || !decoupage.redo.length) return;
      const currentSnapshot = getCurrentDecoupageSnapshotString();
      if (decoupage.history[decoupage.history.length - 1] !== currentSnapshot) {
        decoupage.history.push(currentSnapshot);
        if (decoupage.history.length > 40) decoupage.history.shift();
      }
      const snapshot = decoupage.redo.pop() || null;
      const parsed = parseDecoupageSnapshot(snapshot);
      decoupage.baseDataUrl = parsed.baseDataUrl;
      decoupage.items = cloneDecoupageItems(parsed.items || []);
      decoupage.shapes = cloneShapes(parsed.shapes || []);
      decSelectedItemId = null;
      decSelectedShapeId = null;
      await loadDecoupageBaseDataUrl(decoupage.baseDataUrl || null);
      renderDecoupageScene();
      persistCurrentState();
      updateDeleteShapeButton();
      return;
    }
    const shot = getActiveShot();
    if (!shot || !Array.isArray(shot.redo) || !shot.redo.length) return;
    const currentSnapshot = getCurrentShotSnapshotString();
    if (shot.history[shot.history.length - 1] !== currentSnapshot) {
      shot.history.push(currentSnapshot);
      if (shot.history.length > 40) shot.history.shift();
    }
    const snapshot = shot.redo.pop() || null;
    await applySceneSnapshot(snapshot);
    persistCurrentState();
    renderShotList();
  });

btnExportSingle.addEventListener("click", async () => {
  saveActiveShotData();
  const shotIndex = shots.findIndex((shot) => shot.id === activeShotId);
  const activeShot = getActiveShot();
  downloadDataUrl(fileNameForShot(activeShot, shotIndex >= 0 ? shotIndex : 0), await exportShotDataUrl(activeShot));
});

btnExportZip.addEventListener("click", () => {
  exportZip().catch(() => {
    alert("Non sono riuscito a creare lo ZIP della scena.");
  });
});

btnShareScene?.addEventListener("click", () => {
  shareScenePdf();
});

  btnAddShot.addEventListener("click", () => { addShot(false); });
  btnDuplicateShot.addEventListener("click", () => { addShot(true); });
  btnDeleteShot.addEventListener("click", () => { deleteCurrentShot(); });
  btnSaveScene?.addEventListener("click", () => { saveSceneToLibrary(); });

  btnOpenLibrary?.addEventListener("click", () => {
    renderLibrary();
    if (libraryDialog?.showModal) libraryDialog.showModal();
  });

  btnLibraryClose?.addEventListener("click", () => {
    if (libraryDialog?.open) libraryDialog.close();
  });

  document.addEventListener("click", (evt) => {
    const target = evt.target;
    if (!(target instanceof Element)) return;
    if (!target.closest(".storyboardShapeMenuWrap")) {
      closeLineMenu();
      closeArrowMenu();
      closeCircleMenu();
    }
  });

  setCurrentTool(currentTool);
  updateStrokeUi();
  updateShapeStyleUi();
  refreshStoryboardPremiumLabels();
  window.addEventListener("sdac:membership-change", refreshStoryboardPremiumLabels);
  clearBaseCanvas();
  clearDecBaseCanvas();
  renderScene();
  renderDecoupageScene();
  setActiveSurface("shot");
  updateDeleteShapeButton();
  pushHistory();
  pushDecoupageHistory();
  updateThirdsToggle();
  updateAspectOverlay();
  closeCircleMenu();
  loadCurrentStateFromStorage().then((loaded) => {
    if (!loaded) {
      renderShotList();
      persistCurrentState();
    }
    renderLibrary();
  });
})();