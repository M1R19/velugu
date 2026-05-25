// ============================================================
// Telugu Learning App — conversational, English-led
// ============================================================

const STORE_KEY = "telugu30days_v2";

const defaultState = {
  completed: {},
  unlockedDay: 1,
  streak: 0,
  lastStudyDate: null,
  theme: "system",
  font: "normal",
  showScript: "off",
  voice: "",
  rate: 0.85,
  currentView: { tab: "dashboard", day: 1 },
  srs: {},
  character: "anu",
  hasOnboarded: false,
  interests: [],            // ["travel","family","film","food","work","music","romance"]
  todayMood: null,          // "slow" | "good" | "bright"
  todayMoodDate: null,      // iso date string
  scenariosDone: {},        // scenarioId -> { completedAt, choices: [] }
  notifyEnabled: false,     // user opted in to soft reminders
  lastNudgeDate: null       // last date we surfaced a re-engagement notification
};

// ============================================================
// Velugu world — characters & regions
// ============================================================

const CHARACTERS = {
  anu: {
    name: "Anu",
    initial: "అ",
    lines: {
      morning: [
        "Tea's still warm. Ready for a small walk?",
        "Welcome back. Two minutes is all we need.",
        "The sun's up — and so is one new phrase."
      ],
      afternoon: [
        "The market is loud today. Want to come along?",
        "Let's add one more diya.",
        "Afternoon's a nice time to learn something tiny."
      ],
      evening: [
        "Quiet evening. Perfect for a phrase or two.",
        "Pull up a chair. One small lesson.",
        "The sky's getting soft. Stay a moment."
      ],
      night: [
        "Late one? A tiny session and we're done.",
        "Don't strain — pick the lightest mission.",
        "Just one word tonight is plenty."
      ],
      streak: [
        "{n} days in a row. I'm proud.",
        "{n}-day streak — your diyas are beautiful.",
        "You're becoming part of the village."
      ],
      first: [
        "Glad you came. Let's light your first diya.",
        "Don't worry about getting it right. Just say something."
      ],
      returningSoon: [
        "Welcome back. Yesterday's diya is still warm.",
        "Hey! You came back. Two minutes is all we need."
      ],
      returningFew: [
        "Been wondering about you. {d} days isn't a lot — let's pick up softly.",
        "Anu's tea is fresh. Glad you're here."
      ],
      returningWeek: [
        "It's been a quiet week. No pressure — just one phrase if you have one.",
        "{d} days away is fine. Let's start small."
      ],
      returningLong: [
        "{d} days. The chai went cold but I made a fresh pot.",
        "Welcome back home. We start wherever you are."
      ]
    }
  },
  amma: {
    name: "Saraswati amma",
    initial: "స",
    lines: {
      morning: [
        "Wake up gently, child. We start small.",
        "Have your tea first. Then we'll learn.",
        "మంచి ఉదయం — good morning."
      ],
      afternoon: [
        "Slow down. Two phrases today is enough.",
        "No rush — Telugu has been here for centuries.",
        "Come, sit with amma."
      ],
      evening: [
        "Evening light is best for learning, they say.",
        "Sit, sit. Tell me how your day was.",
        "A little practice, then go and rest."
      ],
      night: [
        "Don't push yourself. Rest is also progress.",
        "One word tonight. That's all.",
        "Tomorrow morning, fresh."
      ],
      streak: [
        "{n} days! You're becoming part of our family.",
        "Look at your diyas — {n} days of light.",
        "Amma is happy to see you again."
      ],
      first: [
        "Welcome, child. We will go slowly together.",
        "Don't be afraid. Even one word is brave."
      ],
      returningSoon: [
        "There you are, child. Sit, sit.",
        "Back already? Good. Have you eaten?"
      ],
      returningFew: [
        "Just {d} days — nothing at all. Come, no questions today.",
        "We missed you, but life is busy. One small thing today is plenty."
      ],
      returningWeek: [
        "Whatever kept you, it's fine. Take it slow.",
        "{d} days. Don't apologise — just sit a while."
      ],
      returningLong: [
        "Welcome home. Take your time settling back in.",
        "{d} days is nothing. We start wherever you are."
      ]
    }
  },
  rohan: {
    name: "Rohan",
    initial: "ర",
    lines: {
      morning: [
        "Yo, early bird. Quick one?",
        "Coffee on me later. Let's go.",
        "Morning energy — let's not waste it."
      ],
      afternoon: [
        "Hey, free for a quick session?",
        "Bro, let's get one diya lit.",
        "Quick break, quick lesson."
      ],
      evening: [
        "Chill evening for learning? I'm in.",
        "5 minutes max, promise.",
        "Got time? Got Telugu."
      ],
      night: [
        "Late night vibes. Short one tonight.",
        "One phrase, then sleep."
      ],
      streak: [
        "{n} days, you're killing it!",
        "{n}-day streak, certified Telugu-curious.",
        "Watch out, Tollywood, here you come."
      ],
      first: [
        "Welcome to the village. I'll keep it light.",
        "No pressure. We'll vibe through it."
      ],
      returningSoon: [
        "Yo, you're back. Quick one?",
        "Knew you'd swing by. Two minutes?"
      ],
      returningFew: [
        "Where've you been? {d} days. Let's get back into it, easy.",
        "Vibe's still here. Pick up where you left off."
      ],
      returningWeek: [
        "Long time. No worries, let's start light.",
        "{d} days off — happens. One phrase, then bounce."
      ],
      returningLong: [
        "{d} days! Plot twist. Let's pick up easy.",
        "Welcome back, stranger. Light mode today."
      ]
    }
  }
};

const REGIONS = [
  { id: 1, name: "The Lane You Live On",   sub: "Greetings and first chats",         days: [1, 7]  },
  { id: 2, name: "The Morning Market",     sub: "Daily life — family, food, home",   days: [8, 14] },
  { id: 3, name: "Streets & Bus Stops",    sub: "Out and about — getting around",    days: [15, 21] },
  { id: 4, name: "The Festival of Lights", sub: "Real conversations",                days: [22, 30] }
];

function getRegionForDay(day) {
  return REGIONS.find(r => day >= r.days[0] && day <= r.days[1]) || REGIONS[REGIONS.length - 1];
}

function getTimeGreeting() {
  const h = new Date().getHours();
  if (h < 5) return "Late night";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Good night";
}

function applySkyByTime() {
  const village = document.getElementById("village-scene");
  if (!village) return;
  const h = new Date().getHours();
  let s1, s2, s3;
  if (h < 5)         { s1 = "#1F2444"; s2 = "#3A2D5A"; s3 = "#1A1B2E"; }
  else if (h < 9)    { s1 = "#FFD9B0"; s2 = "#FFB0A0"; s3 = "#C9A4D4"; }
  else if (h < 17)   { s1 = "#FFE5C7"; s2 = "#FFCBB6"; s3 = "#F4B0BB"; }
  else if (h < 19)   { s1 = "#FFBE94"; s2 = "#E89280"; s3 = "#8A6FA8"; }
  else if (h < 22)   { s1 = "#7A5F8B"; s2 = "#4D406B"; s3 = "#2A2A4A"; }
  else               { s1 = "#1F2444"; s2 = "#3A2D5A"; s3 = "#1A1B2E"; }
  village.style.setProperty("--sky-1", s1);
  village.style.setProperty("--sky-2", s2);
  village.style.setProperty("--sky-3", s3);
}

function injectFireflies() {
  const v = document.getElementById("village-scene");
  if (!v) return;
  v.querySelectorAll(".firefly").forEach(f => f.remove());
  const hour = new Date().getHours();
  // More fireflies at dusk/night
  const count = (hour < 7 || hour > 18) ? 10 : 5;
  for (let i = 0; i < count; i++) {
    const f = document.createElement("div");
    f.className = "firefly";
    f.style.left = (5 + Math.random() * 90) + "%";
    f.style.top  = (30 + Math.random() * 60) + "%";
    f.style.animationDelay = (Math.random() * 9) + "s";
    f.style.animationDuration = (8 + Math.random() * 6) + "s";
    v.appendChild(f);
  }
}

function daysSinceLastStudy(st) {
  if (!st.lastStudyDate) return 0;
  const today = new Date(isoDate() + "T00:00:00");
  const last = new Date(st.lastStudyDate + "T00:00:00");
  const diff = Math.floor((today - last) / 86400000);
  return Math.max(0, diff);
}

function getCharacterLine(char, st) {
  const h = new Date().getHours();
  const completedCount = Object.keys(st.completed).length;
  const daysAway = daysSinceLastStudy(st);

  let pool;
  if (completedCount === 0) {
    pool = char.lines.first;
  }
  // Re-engagement: detected gap since last visit
  else if (daysAway === 1 && char.lines.returningSoon) pool = char.lines.returningSoon;
  else if (daysAway <= 3 && daysAway > 0 && char.lines.returningFew) pool = char.lines.returningFew;
  else if (daysAway <= 7 && daysAway > 0 && char.lines.returningWeek) pool = char.lines.returningWeek;
  else if (daysAway > 7 && char.lines.returningLong) pool = char.lines.returningLong;
  // Streak celebration
  else if (st.streak >= 3 && Math.random() < 0.35) pool = char.lines.streak;
  // Time-of-day default
  else if (h < 12) pool = char.lines.morning;
  else if (h < 17) pool = char.lines.afternoon;
  else if (h < 21) pool = char.lines.evening;
  else             pool = char.lines.night;

  let line = pool[Math.floor(Math.random() * pool.length)];
  return line.replace("{n}", String(st.streak)).replace("{d}", String(daysAway));
}

let state = loadState();

// --------- persistence ---------
function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return { ...defaultState };
    const saved = JSON.parse(raw);
    const merged = { ...defaultState, ...saved };
    // Migration: existing users with progress skip onboarding
    if (!("hasOnboarded" in saved) && saved.completed && Object.keys(saved.completed).length > 0) {
      merged.hasOnboarded = true;
    }
    return merged;
  } catch (e) {
    return { ...defaultState };
  }
}
function saveState() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }

// --------- streaks ---------
function isoDate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function bumpStreakIfNeeded() {
  const today = isoDate();
  if (state.lastStudyDate === today) return;
  const yesterday = isoDate(new Date(Date.now() - 86400000));
  state.streak = state.lastStudyDate === yesterday ? state.streak + 1 : 1;
  state.lastStudyDate = today;
  saveState();
}

// ============================================================
// SRS (spaced repetition) — SM-2 lite
// ============================================================

// Key any phrase by its romanised form (stable & unique enough across deck).
function srsKey(phrase) { return (phrase.te || "").toLowerCase().trim(); }

function srsUpdate(phrase, isCorrect) {
  const key = srsKey(phrase);
  if (!key) return;
  if (!state.srs) state.srs = {};
  const now = Date.now();
  const r = state.srs[key] || { interval: 1, ease: 2.5, n: 0, nextDue: now, wrong: 0, right: 0, lastSeen: 0 };
  if (isCorrect) {
    if (r.n === 0)      r.interval = 1;
    else if (r.n === 1) r.interval = 3;
    else                r.interval = Math.round(r.interval * r.ease);
    r.n++;
    r.ease = Math.min(3.0, r.ease + 0.05);
    r.right++;
  } else {
    r.n = 0;
    r.interval = 1;
    r.ease = Math.max(1.3, r.ease - 0.2);
    r.wrong++;
  }
  r.lastSeen = now;
  r.nextDue = now + r.interval * 86400000;
  state.srs[key] = r;
  saveState();
}

// Build an index from key -> phrase so SRS records can resolve back.
let PHRASE_INDEX = null;
function getPhraseIndex() {
  if (PHRASE_INDEX) return PHRASE_INDEX;
  PHRASE_INDEX = {};
  LESSONS.forEach(l => l.sections.forEach(s => {
    if (s.type === "phrases") s.items.forEach(it => {
      const k = (it.te || "").toLowerCase().trim();
      if (k && !PHRASE_INDEX[k]) PHRASE_INDEX[k] = { en: it.en, te: it.te, script: it.script || it.te };
    });
  }));
  return PHRASE_INDEX;
}

function srsDueCards() {
  const now = Date.now();
  const idx = getPhraseIndex();
  const out = [];
  for (const [key, info] of Object.entries(state.srs || {})) {
    if (info.nextDue <= now && idx[key]) out.push({ ...idx[key], ...info });
  }
  // Most overdue first
  out.sort((a, b) => a.nextDue - b.nextDue);
  return out;
}

function srsWeakSpots(limit = 20) {
  const idx = getPhraseIndex();
  const list = Object.entries(state.srs || {})
    .map(([k, info]) => idx[k] ? { ...idx[k], ...info } : null)
    .filter(p => p && p.wrong > 0);
  list.sort((a, b) => (b.wrong - a.wrong) || ((b.wrong / (b.wrong + b.right)) - (a.wrong / (a.wrong + a.right))));
  return list.slice(0, limit);
}

// ============================================================
// Speech Recognition — Web Speech API
// ============================================================

const SR_CTOR = window.SpeechRecognition || window.webkitSpeechRecognition;
const SR_SUPPORTED = !!SR_CTOR;

function recognizeSpeech() {
  return new Promise((resolve, reject) => {
    if (!SR_SUPPORTED) return reject(new Error("not-supported"));
    const recog = new SR_CTOR();
    recog.lang = "te-IN";
    recog.interimResults = false;
    recog.maxAlternatives = 3;
    let resolved = false;
    recog.onresult = e => {
      const alts = [];
      for (let i = 0; i < e.results[0].length; i++) alts.push(e.results[0][i].transcript);
      resolved = true;
      resolve(alts);
    };
    recog.onerror = e => { if (!resolved) reject(e.error || new Error("recognition-error")); };
    recog.onend = () => { if (!resolved) reject(new Error("no-result")); };
    try { recog.start(); } catch (e) { reject(e); }
    // Hand back the recogniser handle via the promise's "abort" property
    resolve.__recog = recog;
  });
}

function levenshtein(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array(n + 1).fill(0).map((_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur.push(Math.min(
        cur[j - 1] + 1,
        prev[j] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      ));
    }
    prev = cur;
  }
  return prev[n];
}

function normalizeForCompare(s) {
  // Keep Telugu (U+0C00..U+0C7F) and Latin letters; lower-case Latin.
  return (s || "")
    .toLowerCase()
    .replace(/[̣̱̇̄]/g, "") // remove combining diacritics
    .replace(/[^ఀ-౿a-z]/g, "")
    .trim();
}

function similarityScore(expected, got) {
  const a = normalizeForCompare(expected);
  const b = normalizeForCompare(got);
  if (!a || !b) return 0;
  const d = levenshtein(a, b);
  const m = Math.max(a.length, b.length);
  return Math.max(0, 1 - d / m);
}

// Score each alternative the API gave us, return best.
function bestSimilarity(expected, alternatives) {
  let best = 0, bestAlt = "";
  for (const alt of alternatives) {
    const s = similarityScore(expected, alt);
    if (s > best) { best = s; bestAlt = alt; }
  }
  return { score: best, text: bestAlt };
}

// --------- speech synthesis ---------
let voices = [];
function loadVoices() {
  voices = speechSynthesis.getVoices();
  const sel = document.getElementById("voice-select");
  if (!sel) return;
  sel.innerHTML = "";
  const teluguVoices = voices.filter(v => /te[-_]?in|telugu/i.test(v.lang + " " + v.name));
  const others = voices.filter(v => !teluguVoices.includes(v));
  const ordered = [...teluguVoices, ...others];
  if (ordered.length === 0) {
    const opt = document.createElement("option");
    opt.value = ""; opt.textContent = "(No voices available)";
    sel.appendChild(opt);
    return;
  }
  ordered.forEach(v => {
    const opt = document.createElement("option");
    opt.value = v.name;
    opt.textContent = `${v.name} (${v.lang})${teluguVoices.includes(v) ? " ⭐" : ""}`;
    if (state.voice === v.name) opt.selected = true;
    sel.appendChild(opt);
  });
  if (!state.voice && teluguVoices.length > 0) {
    state.voice = teluguVoices[0].name;
    sel.value = state.voice;
    saveState();
  }
}

function pickVoice() {
  if (!voices || voices.length === 0) voices = speechSynthesis.getVoices();
  if (state.voice) {
    const v = voices.find(v => v.name === state.voice);
    if (v) return v;
  }
  const tv = voices.find(v => /te[-_]?in|telugu/i.test(v.lang + " " + v.name));
  if (tv) return tv;
  const iv = voices.find(v => /hi[-_]?in|hindi|en[-_]?in/i.test(v.lang + " " + v.name));
  if (iv) return iv;
  return null;
}

let speakNotified = false;
function notifyNoVoice() {
  if (speakNotified) return;
  speakNotified = true;
  const msg = document.createElement("div");
  msg.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--danger);color:white;padding:12px 18px;border-radius:8px;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,0.2);max-width:90vw;text-align:center;font-size:14px;";
  msg.innerHTML = 'No Telugu voice is installed on this device.<br/>On Windows: <b>Settings → Time &amp; Language → Speech → Add voices → తెలుగు</b>. Then restart the browser.';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 8000);
}

// speak() expects the Telugu script for proper pronunciation.
// If only romanised passed, the engine will still try, just less accurate.
function speak(scriptOrText) {
  if (!("speechSynthesis" in window) || !scriptOrText) return;
  speechSynthesis.cancel();
  setTimeout(() => {
    const utter = new SpeechSynthesisUtterance(scriptOrText);
    utter.rate = Math.max(0.3, Math.min(2, state.rate || 0.85));
    const v = pickVoice();
    if (v) { utter.voice = v; utter.lang = v.lang; }
    else { utter.lang = "te-IN"; notifyNoVoice(); }
    utter.onerror = (e) => {
      if (e.error && e.error !== "interrupted" && e.error !== "canceled") {
        console.warn("Speech error:", e.error);
      }
    };
    speechSynthesis.speak(utter);
  }, 60);
}

if ("speechSynthesis" in window) {
  speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
}

// --------- routing / tabs ---------
function switchTab(name) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("tab-" + name).classList.add("active");
  document.querySelector(`.nav-btn[data-tab="${name}"]`).classList.add("active");
  state.currentView.tab = name;
  saveState();
  if (name === "dashboard")  renderDashboard();
  if (name === "lesson")     renderLesson(state.currentView.day);
  if (name === "practice")   renderPracticeHub();
  if (name === "scenarios")  renderScenariosHub();
  if (name === "phrasebook") renderPhrasebook();
  if (name === "settings")   renderSettings();
  window.scrollTo(0, 0);
}
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => switchTab(btn.dataset.tab));
});

// --------- DOM helper ---------
function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") e.className = v;
    else if (k === "html") e.innerHTML = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2).toLowerCase(), v);
    else e.setAttribute(k, v);
  }
  for (const c of children.flat()) {
    if (c == null) continue;
    e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return e;
}

function makeSpeakBtn(scriptText) {
  const b = el("button", { class: "speak-btn", title: "Listen" }, "🔊 Play");
  b.addEventListener("click", e => { e.stopPropagation(); speak(scriptText); });
  return b;
}

// --------- DASHBOARD (village home) ---------
function renderDashboard() {
  applySkyByTime();
  injectFireflies();

  const character = CHARACTERS[state.character] || CHARACTERS.anu;
  const completed = Object.keys(state.completed).length;
  const total = LESSONS.length;
  const nextDay = Math.min(state.unlockedDay, total);
  const lesson = LESSONS[nextDay - 1];

  // Greeting + character line
  document.getElementById("greet-text").textContent = `${getTimeGreeting()}.`;
  document.getElementById("greet-sub").textContent =
    completed === 0
      ? "Welcome to Velugu — a small world for learning Telugu."
      : "";
  document.getElementById("char-avatar").textContent = character.initial;
  document.getElementById("char-name").textContent = character.name;
  document.getElementById("char-line").textContent = getCharacterLine(character, state);

  // CTA
  const ctaLabel = document.getElementById("cta-label");
  if (completed === total) ctaLabel.textContent = "Review today's phrases";
  else if (completed === 0) ctaLabel.textContent = "Light your first diya";
  else ctaLabel.textContent = `Continue: ${lesson.topic}`;

  // Streak chip
  const streakChip = document.getElementById("streak-chip");
  if (state.streak > 0) {
    document.getElementById("streak-num").textContent = state.streak;
    streakChip.style.display = "inline-flex";
  } else {
    streakChip.style.display = "none";
  }

  // Current region diya path
  const region = getRegionForDay(nextDay);
  const lit = LESSONS.slice(region.days[0] - 1, region.days[1]).filter((_, i) => state.completed[region.days[0] + i]).length;
  const size = region.days[1] - region.days[0] + 1;
  document.getElementById("path-title").textContent = region.name;
  document.getElementById("path-meta").textContent = `${lit} of ${size} lit`;
  renderDiyaRow(region, nextDay);

  // Side cards
  const dueCount = srsDueCards().length;
  document.getElementById("review-meta").textContent = dueCount > 0 ? `${dueCount} due today` : "All caught up";
  document.getElementById("card-review").classList.toggle("disabled", dueCount === 0);

  // Region list
  renderRegions();

  // Mood bar
  setupMoodBar();
  // CTA time hint
  const timeEl = document.getElementById("cta-time");
  if (timeEl) {
    timeEl.textContent = state.todayMood === "slow" ? "~1 min" : state.todayMood === "bright" ? "~4 min" : "~2 min";
  }
}

function diyaSvgMarkup() {
  // Small diya: clay bowl + wick + flame + glow halo. References shared gradient defs.
  return `<svg class="diya-icon" viewBox="0 0 32 38" xmlns="http://www.w3.org/2000/svg">
    <circle class="d-glow" cx="16" cy="12" r="13"/>
    <path class="d-bowl" d="M3 26 L29 26 L25 36 L7 36 Z"/>
    <ellipse class="d-oil" cx="16" cy="26" rx="13" ry="1.2"/>
    <rect class="d-wick" x="15" y="20" width="2" height="6"/>
    <path class="d-flame" d="M16 5 Q12 13 16 21 Q20 13 16 5"/>
  </svg>`;
}

function renderDiyaRow(region, nextDay) {
  const row = document.getElementById("diya-row");
  if (!row) return;
  row.innerHTML = "";
  for (let d = region.days[0]; d <= region.days[1]; d++) {
    const lit = !!state.completed[d];
    const current = d === nextDay && !lit;
    const locked = d > state.unlockedDay;
    const diya = el("div", {
      class: "diya" + (lit ? " lit" : "") + (current ? " current" : "") + (locked ? " locked" : ""),
      onclick: () => {
        if (locked) return;
        state.currentView.day = d;
        switchTab("lesson");
      },
      title: `Day ${d}: ${LESSONS[d - 1] ? LESSONS[d - 1].topic : ""}`
    });
    const svgWrap = el("div", { html: diyaSvgMarkup() });
    diya.appendChild(svgWrap.firstChild);
    diya.appendChild(el("div", { class: "diya-day" }, `Day ${d}`));
    row.appendChild(diya);
  }
}

function renderRegions() {
  const host = document.getElementById("region-list");
  if (!host) return;
  host.innerHTML = "";
  REGIONS.forEach(region => {
    const regionSize = region.days[1] - region.days[0] + 1;
    const completedInRegion = LESSONS
      .slice(region.days[0] - 1, region.days[1])
      .filter((_, i) => state.completed[region.days[0] + i]).length;

    const wrap = el("div", { class: "chapter-region" });
    const header = el("div", { class: "region-header" });
    header.appendChild(el("span", { class: "region-name" }, region.name));
    header.appendChild(el("span", { class: "region-sub" }, `${region.sub} · ${completedInRegion}/${regionSize}`));
    wrap.appendChild(header);

    const grid = el("div", { class: "mission-grid" });
    for (let d = region.days[0]; d <= region.days[1]; d++) {
      const lesson = LESSONS[d - 1];
      if (!lesson) continue;
      const isCompleted = !!state.completed[d];
      const isCurrent = d === state.unlockedDay && !isCompleted;
      const isLocked = d > state.unlockedDay;
      const card = el("div", {
        class: "mission-card"
          + (isCompleted ? " completed" : "")
          + (isCurrent ? " current" : "")
          + (isLocked ? " locked" : ""),
        onclick: () => {
          if (isLocked) return;
          state.currentView.day = d;
          switchTab("lesson");
        }
      });
      card.appendChild(el("div", { class: "mission-num" }, `Day ${d}`));
      card.appendChild(el("div", { class: "mission-title" }, lesson.topic));
      card.appendChild(el("div", { class: "mission-desc" }, lesson.goal));
      grid.appendChild(card);
    }
    wrap.appendChild(grid);
    host.appendChild(wrap);
  });
}

document.getElementById("continue-btn").addEventListener("click", () => {
  state.currentView.day = Math.min(state.unlockedDay, LESSONS.length);
  switchTab("lesson");
});

// Side card handlers
document.getElementById("card-review").addEventListener("click", () => {
  if (srsDueCards().length === 0) return;
  switchTab("practice");
  setTimeout(() => openPracticeMode("review"), 50);
});
document.getElementById("card-rest").addEventListener("click", () => {
  // Rest mode: lightweight — just 3 random phrases as flashcards
  switchTab("practice");
  setTimeout(() => openPracticeMode("flash"), 50);
});
document.getElementById("card-phrasebook").addEventListener("click", () => {
  switchTab("phrasebook");
});

// --------- LESSON VIEW ---------
function renderLesson(day) {
  const view = document.getElementById("lesson-view");
  view.innerHTML = "";
  const idx = day - 1;
  if (idx < 0 || idx >= LESSONS.length) return;
  const lesson = LESSONS[idx];

  // Header
  const region = getRegionForDay(day);
  const header = el("div", { class: "lesson-header" });
  const left = el("div");
  left.appendChild(el("div", { class: "day-num" }, `Day ${day} · ${region.name}`));
  left.appendChild(el("h2", {}, lesson.topic));
  left.appendChild(el("p", { class: "focus" }, lesson.goal));
  header.appendChild(left);

  const navBox = el("div", { class: "lesson-nav" });
  if (day > 1) {
    navBox.appendChild(el("button", {
      class: "btn btn-ghost",
      onclick: () => { state.currentView.day = day - 1; renderLesson(day - 1); window.scrollTo(0,0); }
    }, "← Previous"));
  }
  if (day < LESSONS.length && day < state.unlockedDay) {
    navBox.appendChild(el("button", {
      class: "btn btn-ghost",
      onclick: () => { state.currentView.day = day + 1; renderLesson(day + 1); window.scrollTo(0,0); }
    }, "Next →"));
  }
  header.appendChild(navBox);
  view.appendChild(header);

  // Sections
  for (const sec of lesson.sections) {
    view.appendChild(renderSection(sec));
  }

  // Quiz
  if (lesson.quiz && lesson.quiz.length) {
    view.appendChild(renderQuiz(day, lesson.quiz));
  }
}

function renderSection(sec) {
  if (sec.type === "intro") {
    return el("div", { class: "section-block" }, el("p", {}, sec.body));
  }
  if (sec.type === "tip") {
    return el("div", { class: "section-block tip" }, el("p", {}, sec.body));
  }
  if (sec.type === "phrases") {
    const block = el("div", { class: "section-block" });
    if (sec.title) block.appendChild(el("h4", {}, sec.title));
    const list = el("div", { class: "phrase-list" });
    for (const p of sec.items) list.appendChild(renderPhraseRow(p));
    block.appendChild(list);
    return block;
  }
  if (sec.type === "dialog") {
    const block = el("div", { class: "section-block" });
    if (sec.title) block.appendChild(el("h4", {}, sec.title));
    const wrap = el("div", { class: "dialog-list" });
    for (const line of sec.lines) {
      const row = el("div", { class: "dialog-row" });
      row.appendChild(el("div", { class: "dialog-who" }, line.who + ":"));
      const body = el("div", { class: "dialog-body" });
      body.appendChild(el("div", { class: "dialog-en" }, line.en));
      body.appendChild(el("div", { class: "dialog-te" }, line.te));
      row.appendChild(body);
      row.appendChild(makeSpeakBtn(line.te));
      wrap.appendChild(row);
    }
    block.appendChild(wrap);
    return block;
  }
  if (sec.type === "table") {
    const block = el("div", { class: "section-block" });
    if (sec.title) block.appendChild(el("h4", {}, sec.title));
    const tbl = el("table", { class: "tbl" });
    if (sec.headers) {
      const thead = el("thead");
      const tr = el("tr");
      sec.headers.forEach(h => tr.appendChild(el("th", {}, h)));
      thead.appendChild(tr);
      tbl.appendChild(thead);
    }
    const tbody = el("tbody");
    sec.rows.forEach(row => {
      const tr = el("tr");
      row.forEach(c => tr.appendChild(el("td", {}, c)));
      tbody.appendChild(tr);
    });
    tbl.appendChild(tbody);
    block.appendChild(tbl);
    return block;
  }
  return document.createTextNode("");
}

function renderPhraseRow(p) {
  const item = el("div", { class: "phrase-item" });
  item.appendChild(el("div", { class: "phrase-en" }, p.en));
  const teRow = el("div", { class: "phrase-te" }, p.te);
  item.appendChild(teRow);
  if (state.showScript === "on" && p.script) {
    item.appendChild(el("div", { class: "phrase-script te" }, p.script));
  }
  if (p.note) item.appendChild(el("div", { class: "phrase-note" }, p.note));
  item.appendChild(makeSpeakBtn(p.script || p.te));
  return item;
}

// --------- QUIZ (English → romanised options) ---------
function renderQuiz(day, questions) {
  const block = el("div", { class: "quiz-block" });
  block.appendChild(el("h3", {}, `Quiz — Day ${day}`));
  block.appendChild(el("p", { class: "subtle" },
    "Take your time. Pick the warmest way to say each one — ≥60% lights this diya."));

  const correctSet = {};
  const answers = {};

  questions.forEach((q, qi) => {
    const qBox = el("div", { class: "quiz-question" });
    qBox.appendChild(el("div", { class: "q-text" }, `${qi + 1}. ${q.q}`));
    const optsBox = el("div", { class: "quiz-options" });
    q.opts.forEach((opt, oi) => {
      const btn = el("button", { class: "quiz-opt" });
      // Each option also has a small speak button so user can hear it
      btn.appendChild(el("span", { class: "opt-text" }, opt));
      const hear = el("span", { class: "opt-hear", title: "Listen" }, "🔊");
      hear.addEventListener("click", ev => {
        ev.stopPropagation();
        // Pronounce the romanised option directly — works ok with TTS.
        speak(opt);
      });
      btn.appendChild(hear);

      btn.addEventListener("click", () => {
        if (answers[qi] !== undefined) return;
        answers[qi] = oi;
        const isCorrect = oi === q.a;
        if (isCorrect) { btn.classList.add("correct"); correctSet[qi] = true; }
        else {
          btn.classList.add("wrong"); correctSet[qi] = false;
          optsBox.querySelectorAll(".quiz-opt")[q.a].classList.add("correct");
        }
        // SRS: the correct option is the phrase being tested.
        const idx = getPhraseIndex();
        const tested = idx[(q.opts[q.a] || "").toLowerCase().trim()];
        if (tested) srsUpdate(tested, isCorrect);
        optsBox.querySelectorAll(".quiz-opt").forEach(b => b.setAttribute("disabled", "true"));
        if (Object.keys(answers).length === questions.length) showQuizResult();
      });
      optsBox.appendChild(btn);
    });
    qBox.appendChild(optsBox);
    block.appendChild(qBox);
  });

  const resultBox = el("div", { class: "quiz-result", style: "display:none;" });
  block.appendChild(resultBox);

  function showQuizResult() {
    const score = Object.values(correctSet).filter(v => v).length;
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 60;
    resultBox.innerHTML = "";
    resultBox.classList.toggle("pass", passed);
    resultBox.appendChild(el("h4", {}, `${score} / ${total} correct (${pct}%)`));
    resultBox.appendChild(el("p", { class: "subtle" },
      passed
        ? "Nice — lesson marked complete and next day unlocked."
        : "Below 60%. Review the lesson and retry; nothing was saved."
    ));
    const actions = el("div", { class: "quiz-actions" });
    if (passed) {
      const wasNew = !state.completed[day];
      state.completed[day] = { score, total, completedAt: Date.now() };
      if (day === state.unlockedDay && state.unlockedDay < LESSONS.length) state.unlockedDay = day + 1;
      bumpStreakIfNeeded();
      saveState();
      if (wasNew) celebrate(`Day ${day} complete!`,
        day < LESSONS.length ? `Day ${day + 1} is unlocked.` : "All 30 days finished!");
      if (day < LESSONS.length) {
        actions.appendChild(el("button", { class: "btn btn-primary",
          onclick: () => { state.currentView.day = day + 1; renderLesson(day + 1); window.scrollTo(0,0); }
        }, `Continue to Day ${day + 1} →`));
      } else {
        actions.appendChild(el("button", { class: "btn btn-primary",
          onclick: () => switchTab("dashboard")
        }, "Back to dashboard"));
      }
    } else {
      actions.appendChild(el("button", { class: "btn btn-primary",
        onclick: () => renderLesson(day)
      }, "Retry"));
    }
    resultBox.appendChild(actions);
    resultBox.style.display = "block";
    resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return block;
}

// --------- PHRASEBOOK ---------
function renderPhrasebook(filter = "") {
  const v = document.getElementById("phrasebook-view");
  v.innerHTML = "";
  const f = filter.toLowerCase().trim();
  PHRASEBOOK.forEach(g => {
    const matching = g.items.filter(it =>
      !f || it.en.toLowerCase().includes(f) || it.te.toLowerCase().includes(f) || (it.script || "").includes(f)
    );
    if (!matching.length) return;
    const group = el("div", { class: "phrase-group" });
    group.appendChild(el("h3", {}, g.cat));
    const list = el("div", { class: "phrase-list" });
    matching.forEach(it => list.appendChild(renderPhraseRow(it)));
    group.appendChild(list);
    v.appendChild(group);
  });
  if (!v.children.length) {
    v.appendChild(el("p", { class: "subtle" }, "No phrases matched. Try a different search."));
  }
}

const phraseSearch = document.getElementById("phrase-search");
if (phraseSearch) phraseSearch.addEventListener("input", e => renderPhrasebook(e.target.value));

// --------- SETTINGS ---------
function renderSettings() {
  document.querySelectorAll(".chip[data-theme]").forEach(c => c.classList.toggle("active", c.dataset.theme === state.theme));
  document.querySelectorAll(".chip[data-font]").forEach(c => c.classList.toggle("active", c.dataset.font === state.font));
  document.querySelectorAll(".chip[data-translit]").forEach(c => c.classList.toggle("active", c.dataset.translit === state.showScript));
  document.querySelectorAll(".chip[data-character]").forEach(c => c.classList.toggle("active", c.dataset.character === state.character));
  document.querySelectorAll(".chip[data-notify]").forEach(c => c.classList.toggle("active", c.dataset.notify === (state.notifyEnabled ? "on" : "off")));
  const status = document.getElementById("notify-status");
  if (status) {
    if (!("Notification" in window)) status.textContent = "(your browser doesn't support notifications)";
    else if (Notification.permission === "denied") status.textContent = "(permission blocked — re-enable in browser settings)";
    else if (state.notifyEnabled) status.textContent = "Will gently nudge if you've been away.";
    else status.textContent = "Fires when you open the browser after a gap — best-effort.";
  }
  const rate = document.getElementById("speech-rate");
  if (rate) {
    rate.value = state.rate;
    document.getElementById("speech-rate-val").textContent = state.rate + "x";
  }
  loadVoices();
}

function applySettings() {
  if (state.theme === "system") {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  } else {
    document.documentElement.setAttribute("data-theme", state.theme);
  }
  document.documentElement.setAttribute("data-font", state.font);
  document.documentElement.setAttribute("data-show-script", state.showScript);
}

document.querySelectorAll(".chip[data-theme]").forEach(c =>
  c.addEventListener("click", () => { state.theme = c.dataset.theme; saveState(); applySettings(); renderSettings(); }));
document.querySelectorAll(".chip[data-font]").forEach(c =>
  c.addEventListener("click", () => { state.font = c.dataset.font; saveState(); applySettings(); renderSettings(); }));
document.querySelectorAll(".chip[data-translit]").forEach(c =>
  c.addEventListener("click", () => {
    state.showScript = c.dataset.translit;
    saveState(); applySettings(); renderSettings();
    if (state.currentView.tab === "lesson") renderLesson(state.currentView.day);
    if (state.currentView.tab === "phrasebook") renderPhrasebook();
  }));
document.querySelectorAll(".chip[data-character]").forEach(c =>
  c.addEventListener("click", () => {
    state.character = c.dataset.character;
    saveState();
    renderSettings();
    if (state.currentView.tab === "dashboard") renderDashboard();
  }));
document.querySelectorAll(".chip[data-notify]").forEach(c =>
  c.addEventListener("click", async () => {
    const want = c.dataset.notify === "on";
    if (want && "Notification" in window) {
      let perm = Notification.permission;
      if (perm === "default") perm = await Notification.requestPermission();
      if (perm === "granted") {
        state.notifyEnabled = true;
        // Fire a confirmation notification so they see what it looks like
        try {
          new Notification("🪔 Soft reminders on", {
            body: "We'll gently nudge you when you open this device after a few quiet days.",
            icon: "./icons/icon-192.png",
            silent: false
          });
        } catch (e) { /* some browsers throw on insecure origins */ }
      } else {
        state.notifyEnabled = false;
      }
    } else {
      state.notifyEnabled = false;
    }
    saveState();
    renderSettings();
  }));

const rateInput = document.getElementById("speech-rate");
if (rateInput) rateInput.addEventListener("input", e => {
  state.rate = parseFloat(e.target.value);
  document.getElementById("speech-rate-val").textContent = state.rate.toFixed(2) + "x";
  saveState();
});

const voiceSelect = document.getElementById("voice-select");
if (voiceSelect) voiceSelect.addEventListener("change", e => { state.voice = e.target.value; saveState(); });

const voiceTest = document.getElementById("voice-test");
if (voiceTest) voiceTest.addEventListener("click", () => speak("నమస్కారం, ఇది తెలుగు పరీక్ష."));

const settingsReset = document.getElementById("settings-reset");
if (settingsReset) settingsReset.addEventListener("click", () => {
  if (confirm("Clear all progress and reset settings?")) {
    localStorage.removeItem(STORE_KEY);
    state = { ...defaultState };
    applySettings(); renderSettings(); renderDashboard();
  }
});

if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (state.theme === "system") applySettings();
  });
}

// ============================================================
// PRACTICE — conversational drills
// ============================================================

// Build a pooled deck of all phrases across all lessons (deduped on .te)
function buildPhrasePool() {
  const seen = new Set();
  const out = [];
  LESSONS.forEach(l => l.sections.forEach(s => {
    if (s.type === "phrases") s.items.forEach(it => {
      const key = it.te.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      out.push({ en: it.en, te: it.te, script: it.script || it.te });
    });
  }));
  return out;
}

function buildDecksForWeek() {
  const weeks = [
    { id: "w1", label: "Week 1 — Greetings & Self",   range: [1, 7]  },
    { id: "w2", label: "Week 2 — Daily Life",         range: [8, 14] },
    { id: "w3", label: "Week 3 — Out & About",        range: [15, 21]},
    { id: "w4", label: "Week 4 — Conversations",      range: [22, 30]},
    { id: "all",label: "All phrases",                 range: [1, 30] }
  ];
  return weeks.map(w => {
    const items = [];
    const seen = new Set();
    LESSONS.slice(w.range[0] - 1, w.range[1]).forEach(l => l.sections.forEach(s => {
      if (s.type === "phrases") s.items.forEach(it => {
        const key = it.te.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        items.push({ en: it.en, te: it.te, script: it.script || it.te });
      });
    }));
    return { ...w, items };
  });
}

const DECKS = buildDecksForWeek();

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderPracticeHub() {
  const v = document.getElementById("practice-view");
  v.innerHTML = "";
  v.appendChild(el("h2", {}, "Practice"));
  v.appendChild(el("p", { class: "subtle" },
    "Bite-sized drills built around speaking. Pick a mode — choose a week, then hear, repeat, and pick."));

  const dueCount = srsDueCards().length;
  const weakCount = srsWeakSpots(999).length;

  const tiles = [
    { id: "review", icon: "🔄", title: "Daily Review", desc: dueCount > 0
        ? `${dueCount} phrase${dueCount === 1 ? "" : "s"} due today — surface what you're about to forget.`
        : "No phrases due yet. Play any mode and items will start scheduling automatically.",
      badge: dueCount > 0 ? String(dueCount) : null },
    { id: "weak",   icon: "🎯", title: "Weak Spots",   desc: weakCount > 0
        ? `${weakCount} phrase${weakCount === 1 ? "" : "s"} you've missed — drill them directly.`
        : "No mistakes yet. Try a lesson quiz or Listen & Pick first.",
      badge: weakCount > 0 ? String(weakCount) : null },
    { id: "speak",  icon: "🗣️", title: "Say It (with mic)", desc: SR_SUPPORTED
        ? "See English, speak Telugu out loud. We grade your pronunciation in real time."
        : "See English, speak Telugu out loud. Mic grading needs Chrome or Edge." },
    { id: "flash",  icon: "🃏", title: "Flashcards",   desc: "English on front → flip to reveal Telugu. Hear and repeat aloud." },
    { id: "listen", icon: "👂", title: "Listen & Pick", desc: "Hear a Telugu phrase, pick its English meaning. Trains your ear." },
    { id: "match",  icon: "🧩", title: "Match Pairs",  desc: "Connect English phrases with their Telugu pronunciation." }
  ];

  const hub = el("div", { class: "practice-hub" });
  tiles.forEach(t => {
    const disabled = (t.id === "review" && dueCount === 0) || (t.id === "weak" && weakCount === 0);
    const tile = el("div", { class: "practice-tile" + (disabled ? " disabled" : ""), onclick: () => { if (!disabled) openPracticeMode(t.id); } });
    if (t.badge) tile.appendChild(el("div", { class: "pt-badge" }, t.badge));
    tile.appendChild(el("div", { class: "pt-icon" }, t.icon));
    tile.appendChild(el("h3", {}, t.title));
    tile.appendChild(el("p", {}, t.desc));
    hub.appendChild(tile);
  });
  v.appendChild(hub);
}

function openPracticeMode(id) {
  const v = document.getElementById("practice-view");
  v.innerHTML = "";
  v.appendChild(el("button", { class: "practice-back", onclick: renderPracticeHub }, "← Back to practice menu"));
  if (id === "flash")  return renderFlashcards(v);
  if (id === "listen") return renderListenPick(v);
  if (id === "speak")  return renderSayIt(v);
  if (id === "match")  return renderMatchPairs(v);
  if (id === "review") return renderSayIt(v, null, srsDueCards(), "🔄 Daily Review");
  if (id === "weak")   return renderSayIt(v, null, srsWeakSpots(20), "🎯 Weak Spots");
}

function deckPicker(host, currentId, onPick) {
  const picker = el("div", { class: "deck-picker" });
  DECKS.forEach(d => {
    const c = el("button", {
      class: "chip" + (d.id === currentId ? " active" : ""),
      onclick: () => onPick(d.id)
    }, d.label);
    picker.appendChild(c);
  });
  host.appendChild(picker);
}

function getDeck(id) { return DECKS.find(d => d.id === id) || DECKS[0]; }

// --------- FLASHCARDS ---------
function renderFlashcards(host, deckId = "w1") {
  const head = el("div", { class: "practice-head" });
  head.appendChild(el("h2", {}, "🃏 Flashcards"));
  host.appendChild(head);
  deckPicker(host, deckId, id => {
    host.innerHTML = ""; host.appendChild(el("button", { class: "practice-back", onclick: renderPracticeHub }, "← Back"));
    renderFlashcards(host, id);
  });

  const deck = shuffle(getDeck(deckId).items);
  if (!deck.length) { host.appendChild(el("p", { class: "subtle" }, "No phrases yet for this deck.")); return; }
  let idx = 0;

  const wrap = el("div", { class: "flashcard-wrap" });
  const progress = el("div", { class: "deck-progress" });
  const card = el("div", { class: "flashcard" });
  const inner = el("div", { class: "flashcard-inner" });
  const front = el("div", { class: "flashcard-face flashcard-front" });
  const back  = el("div", { class: "flashcard-face back flashcard-back" });
  inner.append(front, back); card.appendChild(inner);

  const controls = el("div", { class: "flashcard-controls" });
  const prevBtn  = el("button", { class: "btn btn-ghost" }, "← Previous");
  const flipBtn  = el("button", { class: "btn btn-primary" }, "Flip card");
  const speakBtn = el("button", { class: "btn btn-ghost" }, "🔊 Hear");
  const nextBtn  = el("button", { class: "btn btn-primary" }, "Next →");
  controls.append(prevBtn, flipBtn, speakBtn, nextBtn);

  wrap.append(progress, card, controls);
  host.appendChild(wrap);

  function paint() {
    const item = deck[idx];
    front.innerHTML = ""; back.innerHTML = "";
    front.appendChild(el("div", { class: "fc-en" }, item.en));
    front.appendChild(el("div", { class: "hint" }, "How would you say this in Telugu? Tap to reveal."));
    back.appendChild(el("div", { class: "fc-te" }, item.te));
    if (state.showScript === "on" && item.script)
      back.appendChild(el("div", { class: "fc-script te" }, item.script));
    progress.textContent = `Card ${idx + 1} of ${deck.length}`;
    card.classList.remove("flipped");
  }
  card.addEventListener("click", () => card.classList.toggle("flipped"));
  flipBtn.addEventListener("click", () => card.classList.toggle("flipped"));
  speakBtn.addEventListener("click", () => speak(deck[idx].script || deck[idx].te));
  nextBtn.addEventListener("click", () => {
    if (idx < deck.length - 1) { idx++; paint(); }
    else { celebrate("Deck complete!", `Went through all ${deck.length} cards.`); bumpStreakIfNeeded(); }
  });
  prevBtn.addEventListener("click", () => { if (idx > 0) { idx--; paint(); } });
  paint();
}

// --------- LISTEN & PICK (hear Telugu, pick English meaning) ---------
function renderListenPick(host, deckId = "w1") {
  const head = el("div", { class: "practice-head" });
  head.appendChild(el("h2", {}, "👂 Listen & Pick"));
  const scoreTag = el("div", { class: "score-tag" }, "0 / 0");
  head.appendChild(scoreTag);
  host.appendChild(head);
  deckPicker(host, deckId, id => {
    host.innerHTML = ""; host.appendChild(el("button", { class: "practice-back", onclick: renderPracticeHub }, "← Back"));
    renderListenPick(host, id);
  });

  const pool = getDeck(deckId).items;
  if (pool.length < 4) { host.appendChild(el("p", { class: "subtle" }, "Need at least 4 phrases for this mode. Pick another deck.")); return; }
  const rounds = Math.min(10, pool.length);
  let round = 0, score = 0, current = null;

  const stage = el("div", { class: "listen-stage" });
  const playBtn = el("button", { class: "listen-play-btn", title: "Replay" }, "🔊");
  const hint = el("div", { class: "listen-hint" }, "Listen to the Telugu phrase and pick what it means in English.");
  const optsBox = el("div", { class: "listen-options listen-options-text" });
  stage.append(playBtn, hint, optsBox);
  host.appendChild(stage);

  function newRound() {
    if (round >= rounds) {
      const pct = Math.round((score / rounds) * 100);
      stage.innerHTML = "";
      stage.appendChild(el("h2", {}, `Score: ${score} / ${rounds}`));
      stage.appendChild(el("p", { class: "subtle" },
        pct >= 70 ? "Sharp ear!" : pct >= 50 ? "Good — keep practising." : "Keep going — listening builds slowly."));
      stage.appendChild(el("button", { class: "btn btn-primary", onclick: () => {
        host.innerHTML = ""; host.appendChild(el("button", { class: "practice-back", onclick: renderPracticeHub }, "← Back"));
        renderListenPick(host, deckId);
      }}, "Play again"));
      if (pct >= 70) { celebrate(`Great work — ${pct}%!`, "Your listening is sharpening."); bumpStreakIfNeeded(); }
      return;
    }
    round++;
    current = pool[Math.floor(Math.random() * pool.length)];
    const distractors = shuffle(pool.filter(p => p.te !== current.te)).slice(0, 3);
    const options = shuffle([current, ...distractors]);
    optsBox.innerHTML = "";
    options.forEach(o => {
      const btn = el("button", { class: "listen-opt listen-opt-text" }, o.en);
      btn.addEventListener("click", () => {
        if (btn.hasAttribute("disabled")) return;
        const correct = o.en === current.en;
        if (correct) { btn.classList.add("correct"); score++; }
        else {
          btn.classList.add("wrong");
          [...optsBox.children].forEach(b => { if (b.textContent === current.en) b.classList.add("correct"); });
        }
        srsUpdate(current, correct);
        [...optsBox.children].forEach(b => b.setAttribute("disabled", "true"));
        scoreTag.textContent = `${score} / ${round}`;
        setTimeout(newRound, 1100);
      });
      optsBox.appendChild(btn);
    });
    scoreTag.textContent = `${score} / ${rounds} (round ${round})`;
    setTimeout(() => speak(current.script || current.te), 200);
  }

  playBtn.addEventListener("click", () => current && speak(current.script || current.te));
  newRound();
}

// --------- SAY IT (see English, speak Telugu with mic grading) ---------
function renderSayIt(host, deckId = "w1", customPool = null, title = "🗣️ Say It") {
  const head = el("div", { class: "practice-head" });
  head.appendChild(el("h2", {}, title));
  const status = el("div", { class: "score-tag" }, SR_SUPPORTED ? "🎤 mic ready" : "🎤 not supported");
  head.appendChild(status);
  host.appendChild(head);

  if (!customPool) {
    deckPicker(host, deckId, id => {
      host.innerHTML = ""; host.appendChild(el("button", { class: "practice-back", onclick: renderPracticeHub }, "← Back"));
      renderSayIt(host, id);
    });
  }

  const deck = customPool ? customPool.slice() : shuffle(getDeck(deckId).items);
  if (!deck.length) { host.appendChild(el("p", { class: "subtle" }, "No phrases.")); return; }
  let idx = 0;
  let listening = false;
  let activeRecog = null;

  const stage = el("div", { class: "sayit-stage" });
  const counter = el("div", { class: "sayit-counter" });
  const promptEl = el("div", { class: "sayit-prompt" });
  const tellMe = el("div", { class: "sayit-task" });
  const revealBox = el("div", { class: "sayit-reveal" });
  const feedback = el("div", { class: "sayit-feedback" });
  const controls = el("div", { class: "flashcard-controls" });

  const micBtn    = el("button", { class: "btn btn-primary mic-btn" }, "🎤 Say it");
  const hearBtn   = el("button", { class: "btn btn-ghost" }, "🔊 Hear correct");
  const revealBtn = el("button", { class: "btn btn-ghost" }, "Reveal");
  const skipBtn   = el("button", { class: "btn btn-ghost" }, "Skip");
  const nextBtn   = el("button", { class: "btn btn-primary" }, "Next →");
  controls.append(micBtn, hearBtn, revealBtn, skipBtn, nextBtn);
  stage.append(counter, promptEl, tellMe, feedback, revealBox, controls);
  host.appendChild(stage);

  if (!SR_SUPPORTED) {
    micBtn.setAttribute("disabled", "true");
    micBtn.title = "Speech recognition not supported in this browser. Use Chrome or Edge.";
    tellMe.innerHTML = `Speech grading needs Chrome or Edge. You can still self-grade with the buttons below.`;
  }

  function paint() {
    const item = deck[idx];
    counter.textContent = `Card ${idx + 1} of ${deck.length}`;
    promptEl.textContent = item.en;
    tellMe.textContent = SR_SUPPORTED
      ? "Tap 🎤 and say this in Telugu out loud. We'll listen and score you."
      : "Say it out loud, then tap Reveal and self-grade.";
    revealBox.innerHTML = "";
    revealBox.style.visibility = "hidden";
    revealBox.appendChild(el("div", { class: "sayit-te" }, item.te));
    if (state.showScript === "on" && item.script) {
      revealBox.appendChild(el("div", { class: "sayit-script te" }, item.script));
    }
    feedback.innerHTML = "";
    micBtn.classList.remove("listening");
    micBtn.textContent = "🎤 Say it";
    listening = false;
  }

  async function startListening() {
    if (!SR_SUPPORTED || listening) return;
    listening = true;
    micBtn.classList.add("listening");
    micBtn.textContent = "● Listening…";
    feedback.innerHTML = "";
    feedback.appendChild(el("div", { class: "feedback-pending" }, "Listening — speak now…"));
    const expected = deck[idx];
    try {
      const alts = await recognizeSpeech();
      const { score, text } = bestSimilarity(expected.script || expected.te, alts);
      showFeedback(expected, score, text, alts);
      srsUpdate(expected, score >= 0.6);
    } catch (err) {
      const msg = String(err && err.message ? err.message : err);
      feedback.innerHTML = "";
      const errBox = el("div", { class: "feedback-err" });
      if (msg.includes("not-allowed") || msg.includes("denied")) {
        errBox.textContent = "Microphone permission denied. Allow mic access and try again.";
      } else if (msg.includes("language-not-supported")) {
        errBox.textContent = "Your browser doesn't have a Telugu speech model. Switch to Chrome or Edge.";
      } else if (msg.includes("no-speech") || msg.includes("no-result")) {
        errBox.textContent = "Didn't catch that — try speaking louder.";
      } else if (msg.includes("not-supported")) {
        errBox.textContent = "Speech recognition not supported in this browser.";
      } else {
        errBox.textContent = "Microphone error: " + msg;
      }
      feedback.appendChild(errBox);
    } finally {
      listening = false;
      micBtn.classList.remove("listening");
      micBtn.textContent = "🎤 Try again";
    }
  }

  function showFeedback(expected, score, gotText, alts) {
    feedback.innerHTML = "";
    const pct = Math.round(score * 100);
    let cls = "feedback-ok", label = "Good!";
    if (score < 0.4) { cls = "feedback-bad"; label = "Not quite"; }
    else if (score < 0.7) { cls = "feedback-meh"; label = "Close — try again"; }
    else if (score >= 0.85) { cls = "feedback-great"; label = "Excellent!"; }
    const box = el("div", { class: "feedback-box " + cls });
    box.appendChild(el("div", { class: "fb-title" }, `${label} (${pct}% match)`));
    box.appendChild(el("div", { class: "fb-row" },
      el("span", { class: "fb-tag" }, "You said:"),
      el("span", { class: "fb-said" }, gotText || "(nothing recognised)")));
    box.appendChild(el("div", { class: "fb-row" },
      el("span", { class: "fb-tag" }, "Target:"),
      el("span", { class: "fb-target" }, expected.te)));
    feedback.appendChild(box);
    // Auto-reveal for low scores
    if (score < 0.7) {
      revealBox.style.visibility = "visible";
    }
  }

  micBtn.addEventListener("click", startListening);
  hearBtn.addEventListener("click", () => speak(deck[idx].script || deck[idx].te));
  revealBtn.addEventListener("click", () => {
    revealBox.style.visibility = "visible";
    speak(deck[idx].script || deck[idx].te);
  });
  skipBtn.addEventListener("click", () => {
    srsUpdate(deck[idx], false);
    advance();
  });
  nextBtn.addEventListener("click", advance);

  function advance() {
    if (idx < deck.length - 1) { idx++; paint(); }
    else { celebrate("Deck complete!", "Speaking gets easier every rep."); bumpStreakIfNeeded(); }
  }

  paint();
}

// --------- MATCH PAIRS (English ↔ Romanised Telugu) ---------
function renderMatchPairs(host, deckId = "w1") {
  const head = el("div", { class: "practice-head" });
  head.appendChild(el("h2", {}, "🧩 Match Pairs"));
  const moves = el("div", { class: "score-tag" }, "0 moves");
  head.appendChild(moves);
  host.appendChild(head);
  deckPicker(host, deckId, id => {
    host.innerHTML = ""; host.appendChild(el("button", { class: "practice-back", onclick: renderPracticeHub }, "← Back"));
    renderMatchPairs(host, id);
  });

  const pool = getDeck(deckId).items;
  if (pool.length < 4) { host.appendChild(el("p", { class: "subtle" }, "Not enough phrases.")); return; }
  const SET = 6;
  const round = shuffle(pool).slice(0, Math.min(SET, pool.length));

  const board = el("div", { class: "match-board" });
  const enCol = el("div", { class: "match-col" });
  const teCol = el("div", { class: "match-col" });
  enCol.appendChild(el("div", { class: "col-label" }, "English"));
  teCol.appendChild(el("div", { class: "col-label" }, "Telugu (say it)"));
  board.append(enCol, teCol);
  host.appendChild(board);

  const enTiles = shuffle(round);
  const teTiles = shuffle(round);
  let selectedEn = null, selectedTe = null, matched = 0, moveCount = 0;

  function checkMatch() {
    if (!selectedEn || !selectedTe) return;
    moveCount++; moves.textContent = `${moveCount} moves`;
    const a = selectedEn, b = selectedTe;
    if (a.dataset.key === b.dataset.key) {
      a.classList.remove("selected"); b.classList.remove("selected");
      a.classList.add("matched"); b.classList.add("matched");
      a.setAttribute("disabled", "true"); b.setAttribute("disabled", "true");
      matched++;
      selectedEn = null; selectedTe = null;
      const item = round.find(r => r.te === b.dataset.key || r.en === a.dataset.key);
      if (item) { speak(item.script || item.te); srsUpdate(item, true); }
      if (matched === round.length) {
        setTimeout(() => { celebrate("All matched!", `Solved in ${moveCount} moves.`); bumpStreakIfNeeded(); }, 400);
      }
    } else {
      a.classList.add("wrong-flash"); b.classList.add("wrong-flash");
      setTimeout(() => {
        a.classList.remove("wrong-flash", "selected");
        b.classList.remove("wrong-flash", "selected");
      }, 450);
      selectedEn = null; selectedTe = null;
    }
  }

  enTiles.forEach(item => {
    const tile = el("button", { class: "match-tile match-tile-en", "data-key": item.te }, item.en);
    tile.addEventListener("click", () => {
      if (tile.classList.contains("matched")) return;
      if (selectedEn) selectedEn.classList.remove("selected");
      selectedEn = tile; tile.classList.add("selected");
      checkMatch();
    });
    enCol.appendChild(tile);
  });
  teTiles.forEach(item => {
    const tile = el("button", { class: "match-tile match-tile-te", "data-key": item.te }, item.te);
    tile.addEventListener("click", () => {
      if (tile.classList.contains("matched")) return;
      if (selectedTe) selectedTe.classList.remove("selected");
      selectedTe = tile; tile.classList.add("selected");
      speak(item.script || item.te);
      checkMatch();
    });
    teCol.appendChild(tile);
  });
}

// ============================================================
// MOOD BAR
// ============================================================
function setupMoodBar() {
  const bar = document.getElementById("mood-bar");
  if (!bar) return;
  const today = isoDate();
  // Reset mood if it's a new day
  if (state.todayMoodDate !== today) {
    state.todayMood = null;
    state.todayMoodDate = today;
    saveState();
  }
  bar.querySelectorAll(".mood-opt").forEach(b => {
    b.classList.toggle("selected", state.todayMood === b.dataset.mood);
    b.onclick = () => {
      state.todayMood = b.dataset.mood;
      state.todayMoodDate = today;
      saveState();
      bar.querySelectorAll(".mood-opt").forEach(x => x.classList.toggle("selected", x.dataset.mood === state.todayMood));
      // Update CTA time hint
      const timeEl = document.getElementById("cta-time");
      if (timeEl) {
        timeEl.textContent = state.todayMood === "slow" ? "~1 min" : state.todayMood === "bright" ? "~4 min" : "~2 min";
      }
      // Update character line to acknowledge mood
      const ch = CHARACTERS[state.character] || CHARACTERS.anu;
      const ackByMood = {
        slow:   { anu: "Take it slow today. Just one phrase is plenty.", amma: "Slowly, child. We rest as we go.", rohan: "Easy day, got it. Tiny session." },
        good:   { anu: "Glad to hear. Let's get going.",                  amma: "Good. Come, sit with amma.",       rohan: "Let's vibe through it." },
        bright: { anu: "Beautiful — let's stretch a little today.",        amma: "Such energy! Be careful not to burn out.", rohan: "Bring it. Bonus challenge incoming." }
      };
      const line = ackByMood[state.todayMood][state.character] || "";
      if (line) document.getElementById("char-line").textContent = line;
    };
  });
}

// ============================================================
// SCENARIOS
// ============================================================
function renderScenariosHub() {
  const v = document.getElementById("scenarios-view");
  v.innerHTML = "";
  v.appendChild(el("h2", {}, "Scenarios"));
  v.appendChild(el("p", { class: "subtle" },
    "Short interactive scenes. Pick a place — every choice you make is something you might really say."));

  const hub = el("div", { class: "scenarios-hub" });
  SCENARIOS.forEach(s => {
    const done = !!state.scenariosDone[s.id];
    const card = el("div", { class: "scenario-card", onclick: () => openScenario(s.id) });
    const icon = el("div", { class: "scenario-icon" }, s.icon);
    card.appendChild(icon);
    const body = el("div");
    body.appendChild(el("div", { class: "scenario-loc" }, s.location));
    body.appendChild(el("h3", {}, s.title));
    body.appendChild(el("div", { class: "scenario-desc" }, s.desc));
    const meta = el("div", { class: "scenario-meta" });
    meta.appendChild(el("span", {}, `~${s.estMinutes} min · ${s.npc.name}`));
    if (done) meta.appendChild(el("span", { style: "color:var(--accent);font-weight:600;" }, "✓ played"));
    body.appendChild(meta);
    card.appendChild(body);
    hub.appendChild(card);
  });
  v.appendChild(hub);
}

function openScenario(id) {
  const v = document.getElementById("scenarios-view");
  v.innerHTML = "";
  v.appendChild(el("button", { class: "practice-back", onclick: renderScenariosHub }, "← Back to scenarios"));
  const scen = SCENARIOS.find(s => s.id === id);
  if (!scen) return;

  const stage = el("div", { class: "scenario-stage" });
  const head = el("div", { class: "scenario-headline" });
  head.appendChild(el("h2", {}, `${scen.icon} ${scen.title}`));
  head.appendChild(el("div", { class: "scenario-loc" }, scen.location));
  stage.appendChild(head);

  const stream = el("div", { class: "dialog-stream" });
  stage.appendChild(stream);

  const interaction = el("div", { class: "scenario-interaction" });
  stage.appendChild(interaction);

  v.appendChild(stage);

  let i = 0;
  const userChoices = [];

  function addNpcBubble(turn) {
    const row = el("div", { class: "bubble-row npc-row" });
    const avatar = el("div", { class: "bubble-avatar", style: `background:${scen.npc.color}` }, scen.npc.initial);
    const bubble = el("div", { class: "bubble npc" });
    bubble.appendChild(el("div", { class: "bubble-en" }, turn.en));
    bubble.appendChild(el("div", { class: "bubble-te" }, turn.te));
    const sp = el("button", { class: "bubble-speak" }, "🔊 Hear");
    sp.onclick = () => speak(turn.script || turn.te);
    bubble.appendChild(sp);
    row.appendChild(avatar);
    row.appendChild(bubble);
    stream.appendChild(row);
    // Auto-speak NPC line on display
    speak(turn.script || turn.te);
    stream.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  function addYouBubble(choice) {
    const row = el("div", { class: "bubble-row you-row" });
    const avatar = el("div", { class: "bubble-avatar you-avatar" }, "You");
    const bubble = el("div", { class: "bubble you" });
    bubble.appendChild(el("div", { class: "bubble-en" }, choice.en));
    bubble.appendChild(el("div", { class: "bubble-te" }, choice.te));
    const sp = el("button", { class: "bubble-speak" }, "🔊 Hear");
    sp.onclick = () => speak(choice.script || choice.te);
    bubble.appendChild(sp);
    row.appendChild(avatar);
    row.appendChild(bubble);
    stream.appendChild(row);
    // Also speak the user's line back so they hear how it sounds
    speak(choice.script || choice.te);
  }

  function showChoice(turn) {
    interaction.innerHTML = "";
    if (turn.prompt) interaction.appendChild(el("div", { class: "choice-prompt" }, turn.prompt));
    const opts = el("div", { class: "choice-options" });
    turn.options.forEach(o => {
      const btn = el("button", { class: "choice-opt" });
      btn.appendChild(el("div", { class: "opt-en" }, o.en));
      btn.appendChild(el("div", { class: "opt-te" }, o.te));
      btn.onclick = () => {
        addYouBubble(o);
        userChoices.push({ at: i, choice: o.en });
        // Try to mark this phrase as 'right' in SRS — they spoke it (kind of).
        const idx = getPhraseIndex();
        const key = (o.te || "").toLowerCase().trim();
        if (idx[key]) srsUpdate(idx[key], true);
        interaction.innerHTML = "";
        i = (typeof o.next === "number") ? o.next : i + 1;
        setTimeout(advance, 700);
      };
      opts.appendChild(btn);
    });
    interaction.appendChild(opts);
  }

  function showEnd(turn) {
    interaction.innerHTML = "";
    const box = el("div", { class: "scenario-end" });
    box.appendChild(el("h3", {}, "🎉 Scene complete"));
    box.appendChild(el("p", {}, turn.message || "Well done."));
    const actions = el("div", { class: "quiz-actions" });
    actions.appendChild(el("button", { class: "btn btn-primary", onclick: renderScenariosHub }, "Back to scenarios"));
    actions.appendChild(el("button", { class: "btn btn-ghost", onclick: () => openScenario(scen.id) }, "Replay"));
    box.appendChild(actions);
    interaction.appendChild(box);
    state.scenariosDone[scen.id] = { completedAt: Date.now(), choices: userChoices };
    bumpStreakIfNeeded();
    saveState();
    celebrate("Nicely played!", `You finished "${scen.title}".`);
  }

  function advance() {
    if (i >= scen.turns.length) return;
    const turn = scen.turns[i];
    if (turn.type === "npc") {
      addNpcBubble(turn);
      i++;
      setTimeout(advance, 1400);
    } else if (turn.type === "choice") {
      showChoice(turn);
    } else if (turn.type === "end") {
      showEnd(turn);
    }
  }

  advance();
}

// ============================================================
// ONBOARDING
// ============================================================
function startOnboarding() {
  const overlay = document.getElementById("onboarding");
  if (!overlay) return;
  overlay.style.display = "flex";

  let step = 0;
  const draft = {
    interests: [],
    character: "anu",
    mood: "good"
  };

  function diyaSvg() {
    return `<svg class="onboard-diya" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="34" r="34" fill="url(#diya-glow)"/>
      <path d="M50 10 Q40 30 50 54 Q60 30 50 10" fill="url(#diya-flame)" style="filter:drop-shadow(0 0 4px rgba(244,184,96,0.7))"/>
      <rect x="48" y="50" width="4" height="10" fill="#2A2620"/>
      <path d="M14 64 L86 64 L74 92 L26 92 Z" fill="url(#diya-clay)" stroke="#5A3318" stroke-width="2"/>
      <ellipse cx="50" cy="64" rx="36" ry="3" fill="#1A1008" opacity="0.55"/>
    </svg>`;
  }

  function dots(active, total) {
    let h = '<div class="onboard-dots">';
    for (let n = 0; n < total; n++) h += `<div class="dot${n === active ? " active" : ""}"></div>`;
    h += '</div>';
    return h;
  }

  function render() {
    overlay.innerHTML = "";
    const card = el("div", { class: "onboard-card" });
    overlay.appendChild(card);

    if (step === 0) {
      card.innerHTML = `
        ${diyaSvg()}
        <div class="step-num">Welcome</div>
        <h2>Welcome to Velugu.</h2>
        <p class="lead">A small world for learning Telugu — one diya at a time. No quizzes to fear, no streaks to lose.</p>
        <div class="onboard-actions">
          <button class="cta-primary" id="ob-next">Begin</button>
        </div>
        ${dots(0, 4)}
      `;
      card.querySelector("#ob-next").onclick = () => { step = 1; render(); };
    }

    else if (step === 1) {
      card.innerHTML = `
        <div class="step-num">Step 1 of 3</div>
        <h2>Why Telugu?</h2>
        <p class="lead">Pick what excites you. We'll tilt your lessons that way.</p>
        <div class="onboard-grid" id="ob-interests"></div>
        <div class="onboard-actions">
          <button class="btn btn-ghost" id="ob-back">Back</button>
          <button class="cta-primary" id="ob-next">Continue</button>
        </div>
        ${dots(1, 4)}
      `;
      const interests = [
        { id: "travel",  icon: "✈️", label: "Travel"   },
        { id: "family",  icon: "👪", label: "Family"   },
        { id: "film",    icon: "🎬", label: "Films"    },
        { id: "food",    icon: "🍛", label: "Food"     },
        { id: "work",    icon: "💼", label: "Work"     },
        { id: "romance", icon: "❤️", label: "Romance"  },
        { id: "music",   icon: "🎵", label: "Music"    },
        { id: "curious", icon: "✨", label: "Curiosity"}
      ];
      const host = card.querySelector("#ob-interests");
      interests.forEach(it => {
        const b = el("button", { class: "onboard-opt" + (draft.interests.includes(it.id) ? " selected" : "") });
        b.innerHTML = `<span class="icon">${it.icon}</span><span class="opt-text">${it.label}</span>`;
        b.onclick = () => {
          if (draft.interests.includes(it.id)) draft.interests = draft.interests.filter(x => x !== it.id);
          else if (draft.interests.length < 3) draft.interests.push(it.id);
          render();
        };
        host.appendChild(b);
      });
      card.querySelector("#ob-back").onclick = () => { step = 0; render(); };
      card.querySelector("#ob-next").onclick = () => { step = 2; render(); };
    }

    else if (step === 2) {
      card.innerHTML = `
        <div class="step-num">Step 2 of 3</div>
        <h2>Pick your guide</h2>
        <p class="lead">Someone to greet you each day. You can change them later.</p>
        <div class="onboard-options" id="ob-chars"></div>
        <div class="onboard-actions">
          <button class="btn btn-ghost" id="ob-back">Back</button>
          <button class="cta-primary" id="ob-next">Continue</button>
        </div>
        ${dots(2, 4)}
      `;
      const chars = [
        { id: "anu",   icon: "💁🏻‍♀️", name: "Anu",              sub: "Cheerful, your first friend" },
        { id: "amma",  icon: "👵🏽",   name: "Saraswati amma",  sub: "Warm, slower pace" },
        { id: "rohan", icon: "🧑🏽",   name: "Rohan",            sub: "Casual, slangy" }
      ];
      const host = card.querySelector("#ob-chars");
      chars.forEach(c => {
        const b = el("button", { class: "onboard-opt" + (draft.character === c.id ? " selected" : "") });
        b.innerHTML = `<span class="icon">${c.icon}</span><span class="opt-text">${c.name}<div class="opt-sub">${c.sub}</div></span>`;
        b.onclick = () => { draft.character = c.id; render(); };
        host.appendChild(b);
      });
      card.querySelector("#ob-back").onclick = () => { step = 1; render(); };
      card.querySelector("#ob-next").onclick = () => { step = 3; render(); };
    }

    else if (step === 3) {
      card.innerHTML = `
        <div class="step-num">Step 3 of 3</div>
        <h2>How are you today?</h2>
        <p class="lead">This sets the pace for today's session. You can change it any time.</p>
        <div class="onboard-grid" id="ob-mood"></div>
        <div class="onboard-actions">
          <button class="btn btn-ghost" id="ob-back">Back</button>
          <button class="cta-primary" id="ob-next">Light my first diya →</button>
        </div>
        ${dots(3, 4)}
      `;
      const moods = [
        { id: "slow",   icon: "☁️", label: "Slow",   sub: "1 min, very gentle" },
        { id: "good",   icon: "☀️", label: "Good",   sub: "~2 min standard" },
        { id: "bright", icon: "✨", label: "Bright", sub: "~4 min, stretch goal" }
      ];
      const host = card.querySelector("#ob-mood");
      moods.forEach(m => {
        const b = el("button", { class: "onboard-opt" + (draft.mood === m.id ? " selected" : "") });
        b.innerHTML = `<span class="icon">${m.icon}</span><span class="opt-text">${m.label}<div class="opt-sub">${m.sub}</div></span>`;
        b.onclick = () => { draft.mood = m.id; render(); };
        host.appendChild(b);
      });
      card.querySelector("#ob-back").onclick = () => { step = 2; render(); };
      card.querySelector("#ob-next").onclick = () => {
        state.interests = draft.interests;
        state.character = draft.character;
        state.todayMood = draft.mood;
        state.todayMoodDate = isoDate();
        state.hasOnboarded = true;
        saveState();
        overlay.style.display = "none";
        renderDashboard();
        celebrate("Welcome to Velugu!", `${CHARACTERS[draft.character].name} is excited to meet you.`);
      };
    }
  }

  render();
}

// --------- Celebration / Confetti ---------
function celebrate(title, sub) {
  const overlay = document.createElement("div");
  overlay.className = "celebrate-overlay";
  const colors = ["#E8896B", "#F4B860", "#7DA88A", "#D88FA0", "#B8A4D4", "#FFD4A3"];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDuration = (1.6 + Math.random() * 1.6) + "s";
    c.style.animationDelay = (Math.random() * 0.4) + "s";
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    overlay.appendChild(c);
  }
  document.body.appendChild(overlay);
  const box = document.createElement("div");
  box.className = "celebrate-msg";
  box.innerHTML = `<h3>🎉 ${title}</h3><p>${sub || ""}</p>`;
  document.body.appendChild(box);
  box.addEventListener("click", () => { box.remove(); overlay.remove(); });
  setTimeout(() => { box.remove(); overlay.remove(); }, 4000);
}

// --------- service worker (PWA) ---------
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(err => {
      console.warn("SW registration failed:", err);
    });
  });
}

function maybeFireSoftReminder() {
  if (!state.notifyEnabled) return;
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  const today = isoDate();
  if (state.lastNudgeDate === today) return; // already nudged today
  const gap = daysSinceLastStudy(state);
  if (gap < 2) return;                       // only after at least 2 days away

  const char = CHARACTERS[state.character] || CHARACTERS.anu;
  const messages = {
    anu:   `Anu's diya flickered for you. ${gap} days — two minutes today?`,
    amma:  `Saraswati amma left tea on the bench. ${gap} days, no rush.`,
    rohan: `Yo, ${gap} days! Pick up easy — one phrase?`
  };
  try {
    const n = new Notification("🪔 Velugu", {
      body: messages[state.character] || messages.anu,
      icon: "./icons/icon-192.png",
      tag: "velugu-reminder",
      renotify: false
    });
    n.onclick = () => { window.focus(); n.close(); };
    state.lastNudgeDate = today;
    saveState();
  } catch (e) { /* ignore */ }
}

// --------- boot ---------
applySettings();
const startTab = state.currentView.tab && document.getElementById("tab-" + state.currentView.tab) ? state.currentView.tab : "dashboard";
switchTab(startTab);
renderDashboard();

// Show onboarding on first visit
if (!state.hasOnboarded) {
  setTimeout(startOnboarding, 200);
} else {
  // Fire a soft reminder if user opted in and they've been away
  setTimeout(maybeFireSoftReminder, 800);
}
