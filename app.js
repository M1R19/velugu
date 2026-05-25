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
  lastNudgeDate: null,      // last date we surfaced a re-engagement notification
  unlockedTreasures: [],    // ids of surprise envelopes the user has opened
  lastSurpriseDate: null,   // ensures at most one surprise per day
  translateDirection: "te-en", // "te-en" or "en-te"
  translationHistory: [],   // [{ src, dst, dir, at }]
  streakFreezesUsed: {},    // monthKey ("2026-05") -> count, max 3/month
  installBannerDismissed: false
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
  const twoDaysAgo = isoDate(new Date(Date.now() - 2 * 86400000));

  const monthKey = today.slice(0, 7); // "2026-05"
  state.streakFreezesUsed = state.streakFreezesUsed || {};
  const usedThisMonth = state.streakFreezesUsed[monthKey] || 0;
  const freezesAvailable = 3 - usedThisMonth;

  if (state.lastStudyDate === yesterday) {
    state.streak += 1;
  } else if (state.lastStudyDate === twoDaysAgo && state.streak >= 2 && freezesAvailable > 0) {
    // Auto-apply a freeze: missed one day, but we keep the streak alive.
    state.streakFreezesUsed[monthKey] = usedThisMonth + 1;
    state.streak += 1;
    setTimeout(() => showFreezeToast(state.streak, freezesAvailable - 1), 500);
  } else {
    state.streak = 1;
  }

  state.lastStudyDate = today;
  saveState();
}

function showFreezeToast(streak, remaining) {
  const toast = document.createElement("div");
  toast.className = "freeze-toast";
  toast.innerHTML = `
    <div class="freeze-icon">❄️🪔</div>
    <div class="freeze-body">
      <div class="freeze-title">Your diya stayed lit</div>
      <div class="freeze-sub">You missed a day — a freeze kept your <strong>${streak}-day</strong> streak going. ${remaining} ${remaining === 1 ? "freeze" : "freezes"} left this month.</div>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("dismiss"), 6500);
  setTimeout(() => toast.remove(), 7200);
  toast.addEventListener("click", () => toast.remove());
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
  if (name === "translator") renderTranslator();
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
document.getElementById("card-translator").addEventListener("click", () => {
  switchTab("translator");
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
      if (wasNew) {
        if (day === LESSONS.length) {
          // Day 30 finale — special treatment
          setTimeout(() => showDay30Finale(), 400);
        } else {
          celebrate(`Day ${day} complete!`, `Day ${day + 1} is unlocked.`);
        }
      }
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

const WEEKLY_DECKS = buildDecksForWeek();

// Decks shown to the user = personalised interest packs first, then weekly.
function getDecks() {
  const personal = (state.interests || [])
    .map(i => INTEREST_PACKS[i])
    .filter(Boolean)
    .map(p => ({ id: p.id, label: p.label, items: buildInterestDeck(p) }))
    .filter(p => p.items.length >= 4);
  return [...personal, ...WEEKLY_DECKS];
}
const DECKS = WEEKLY_DECKS; // legacy alias (unused after this refactor)

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
  getDecks().forEach(d => {
    const c = el("button", {
      class: "chip" + (d.id === currentId ? " active" : ""),
      onclick: () => onPick(d.id)
    }, d.label);
    picker.appendChild(c);
  });
  host.appendChild(picker);
}

function getDeck(id) { const all = getDecks(); return all.find(d => d.id === id) || all[0]; }

// --------- FLASHCARDS ---------
function renderFlashcards(host, deckId = getDecks()[0]?.id || "w1") {
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
function renderListenPick(host, deckId = getDecks()[0]?.id || "w1") {
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
function renderSayIt(host, deckId = getDecks()[0]?.id || "w1", customPool = null, title = "🗣️ Say It") {
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
function renderMatchPairs(host, deckId = getDecks()[0]?.id || "w1") {
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
function scenarioMatchScore(s) {
  if (!state.interests || !state.interests.length) return 0;
  if (!s.interests) return 0;
  let hits = 0;
  for (const i of s.interests) if (state.interests.includes(i)) hits++;
  return hits;
}

function renderScenariosHub() {
  const v = document.getElementById("scenarios-view");
  v.innerHTML = "";
  v.appendChild(el("h2", {}, "Scenarios"));
  v.appendChild(el("p", { class: "subtle" },
    "Short interactive scenes. Pick a place — every choice you make is something you might really say."));

  // Sort: matching interests first, then unplayed, then the rest.
  const sorted = SCENARIOS.slice().sort((a, b) => {
    const scoreA = scenarioMatchScore(a);
    const scoreB = scenarioMatchScore(b);
    if (scoreB !== scoreA) return scoreB - scoreA;
    const aDone = !!state.scenariosDone[a.id];
    const bDone = !!state.scenariosDone[b.id];
    return Number(aDone) - Number(bDone);
  });

  const hub = el("div", { class: "scenarios-hub" });
  sorted.forEach(s => {
    const done = !!state.scenariosDone[s.id];
    const match = scenarioMatchScore(s) > 0;
    const card = el("div", { class: "scenario-card", onclick: () => openScenario(s.id) });
    const icon = el("div", { class: "scenario-icon" }, s.icon);
    card.appendChild(icon);
    const body = el("div");
    body.appendChild(el("div", { class: "scenario-loc" }, s.location));
    const h = el("h3", {}, s.title);
    if (match) {
      const badge = el("span", { class: "for-you-badge" }, "✨ for you");
      h.appendChild(badge);
    }
    body.appendChild(h);
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

// ============================================================
// INTEREST PACKS — curated phrase decks per interest
// ============================================================
const INTEREST_PACKS = {
  travel: {
    id: "i-travel", label: "✈️ On the Road", interest: "travel",
    phraseKeys: [
      "mīru ekkaḍa uṇṭāru?", "mīru ekkaḍi nuṇḍi?",
      "___ ekkaḍa undi?", "enta dūram?", "daggaragā undā?",
      "nērugā veḷḷaṇḍi", "eḍama vaipu tiragaṇḍi", "kuḍi vaipu tiragaṇḍi",
      "āṭō", "bassu", "railu", "ṭyāksī",
      "nannu ___ ki tīsukoṇṭāru", "___ ki enta?",
      "mīṭaru veyyaṇḍi", "ikkaḍa āpaṇḍi", "konchem āgaṇḍi",
      "mellagā naḍapaṇḍi", "nēnu tappipōyānu", "rēpu vastānu"
    ]
  },
  food: {
    id: "i-food", label: "🍛 Food & Tea", interest: "food",
    phraseKeys: [
      "annam", "pappu", "kūra", "perugu", "chapātī",
      "chai", "kāphī", "nīḷḷu", "pālu", "guḍḍu",
      "nāku ākali", "nāku dāham", "menu ivvaṇḍi",
      "idi rucigā undi", "kāram takkuva", "billu ivvaṇḍi",
      "nāku idi kāvāli", "nāku idi vaddu"
    ]
  },
  family: {
    id: "i-family", label: "👪 Family & Home", interest: "family",
    phraseKeys: [
      "amma", "nānna", "annayya", "akka", "tammuḍu", "chelli",
      "koḍuku", "kūturu", "bhartā", "bhārya",
      "mīku annāchellelu unnārā?", "nāku okka tammuḍu uṇḍu",
      "illu", "gadi", "vanṭa illu",
      "lōpaliki raṇḍi", "kūrchōṇḍi", "bāthrūm ekkaḍa?"
    ]
  },
  work: {
    id: "i-work", label: "💼 Work & Phone", interest: "work",
    phraseKeys: [
      "mīru ēmi chēstāru?", "nēnu pani chēstānu",
      "nēnu vidyārthi", "nēnu upādhyāyuḍini",
      "nēnu iñjinīr-ni", "nēnu ḍākṭaruni", "nēnu IT lō pani chēstānu",
      "āphisu", "kampenī", "yajamāni",
      "halō", "evaru?", "mī namberu enta?",
      "tarvāta phōnu chēstānu", "nāku messāj paṅpiṇchaṇḍi",
      "peddagā māṭlāḍaṇḍi", "konchem āgaṇḍi"
    ]
  },
  romance: {
    id: "i-romance", label: "❤️ Sweet Things", interest: "romance",
    phraseKeys: [
      "namaskāram", "mī pēru ēmiṭi?", "nā pēru ___",
      "mimmalni kalavaḍam santhōsham", "nēnu kūḍā",
      "mīku ishṭamā?", "nāku ___ chālā ishṭam",
      "chālā bāgundi", "ad'bhutam",
      "nēnu santhōshamgā unnānu", "mīru bāgunnārā?",
      "chinta cheyyakaṇḍi", "malli kalusukundām"
    ]
  },
  film: {
    id: "i-film", label: "🎬 Films & Stories", interest: "film",
    phraseKeys: [
      "nāku saṅgītam ishṭam", "nēnu cinemālu chūstānu",
      "nēnu pāṭalu vintānu", "nēnu pustakālu chaduvutānu",
      "ī cinemā chūshārā?", "chālā bāgundi", "ad'bhutam",
      "borgā undi", "ēdi best?",
      "nēnu santhōshamgā unnānu", "nāku ishṭam"
    ]
  },
  music: {
    id: "i-music", label: "🎵 Songs & Sounds", interest: "music",
    phraseKeys: [
      "nāku saṅgītam ishṭam", "nēnu pāṭalu vintānu",
      "chālā bāgundi", "ad'bhutam", "ēdi best?",
      "nāku ishṭam", "borgā undi"
    ]
  },
  curious: {
    id: "i-curious", label: "✨ Just Curious", interest: "curious",
    phraseKeys: [
      "namaskāram", "dhanyavādālu", "kṣaminchaṇḍi",
      "ēmiṭi?", "ekkaḍa?", "eppuḍu?", "enduku?", "elā?",
      "nāku artham ayyindi", "nāku artham kāledu",
      "mellagā cheppaṇḍi", "marokasāri cheppaṇḍi",
      "mīku iṅglīsh vacchā?", "dāni artham ēmiṭi?"
    ]
  }
};

function buildInterestDeck(packDef) {
  const idx = getPhraseIndex();
  const items = [];
  const seen = new Set();
  packDef.phraseKeys.forEach(k => {
    const key = k.toLowerCase().trim();
    const phrase = idx[key];
    if (phrase && !seen.has(key)) {
      items.push(phrase);
      seen.add(key);
    }
  });
  return items;
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
// LIVE TRANSLATOR — Telugu ↔ English
// Uses MyMemory's free public API (no auth required).
// ============================================================
async function translateText(text, fromLang, toLang) {
  const trimmed = (text || "").trim();
  if (!trimmed) throw new Error("empty");
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=${fromLang}|${toLang}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`network ${resp.status}`);
  const data = await resp.json();
  if (!data || !data.responseData) throw new Error("bad response");
  return {
    translation: data.responseData.translatedText || "(no translation)",
    quality: data.responseData.match || 0
  };
}

function recordTranslation(src, dst, dir) {
  state.translationHistory = state.translationHistory || [];
  state.translationHistory.unshift({ src, dst, dir, at: Date.now() });
  state.translationHistory = state.translationHistory.slice(0, 20);
  saveState();
}

function renderTranslator() {
  const v = document.getElementById("translator-view");
  v.innerHTML = "";
  v.appendChild(el("h2", {}, "Translator"));
  v.appendChild(el("p", { class: "subtle" },
    "Heard a Telugu phrase you don't recognise? Tap the mic, or paste the text — get the English meaning."));

  // Direction toggle
  const direction = state.translateDirection || "te-en";
  const isTeToEn = direction === "te-en";
  const dirRow = el("div", { class: "deck-picker" });
  const teEnChip = el("button", {
    class: "chip" + (isTeToEn ? " active" : ""),
    onclick: () => { state.translateDirection = "te-en"; saveState(); renderTranslator(); }
  }, "తెలుగు → English");
  const enTeChip = el("button", {
    class: "chip" + (!isTeToEn ? " active" : ""),
    onclick: () => { state.translateDirection = "en-te"; saveState(); renderTranslator(); }
  }, "English → తెలుగు");
  dirRow.appendChild(teEnChip);
  dirRow.appendChild(enTeChip);
  v.appendChild(dirRow);

  const fromLang = isTeToEn ? "te" : "en";
  const toLang   = isTeToEn ? "en" : "te";

  // Input card
  const card = el("div", { class: "translate-card" });

  // Mic button — only enabled when speech recognition supports the input language well (te-IN, en-US)
  const micBtn = el("button", { class: "btn btn-primary mic-btn translate-mic" });
  micBtn.innerHTML = `🎤 ${isTeToEn ? "Tap and listen" : "Tap and speak"}`;
  micBtn.onclick = async () => {
    if (!SR_SUPPORTED) {
      setResult({ error: "Speech recognition isn't supported in this browser. Use Chrome or Edge — or just type below." });
      return;
    }
    micBtn.classList.add("listening");
    micBtn.innerHTML = "● Listening…";
    try {
      // Reuse the speech recognition helper but force language to source
      const result = await new Promise((resolve, reject) => {
        const recog = new SR_CTOR();
        recog.lang = isTeToEn ? "te-IN" : "en-US";
        recog.interimResults = false;
        recog.maxAlternatives = 1;
        recog.onresult = e => resolve(e.results[0][0].transcript);
        recog.onerror = e => reject(e.error || new Error("recognition"));
        recog.onend = () => {};
        try { recog.start(); } catch (e) { reject(e); }
      });
      input.value = result;
      await runTranslate(result);
    } catch (err) {
      const msg = String(err && err.message ? err.message : err);
      let friendly = "Didn't catch that — try again.";
      if (msg.includes("not-allowed") || msg.includes("denied")) friendly = "Microphone permission denied.";
      else if (msg.includes("language-not-supported")) friendly = "Your browser doesn't have a model for that language.";
      else if (msg.includes("no-speech")) friendly = "Didn't hear anything — try speaking louder.";
      setResult({ error: friendly });
    } finally {
      micBtn.classList.remove("listening");
      micBtn.innerHTML = `🎤 ${isTeToEn ? "Tap and listen" : "Tap and speak"}`;
    }
  };
  card.appendChild(micBtn);

  card.appendChild(el("div", { class: "translate-or" }, "— or type —"));

  const input = document.createElement("textarea");
  input.className = "translate-input";
  input.rows = 3;
  input.placeholder = isTeToEn
    ? "Paste or type Telugu…  e.g.  నీళ్ళు తాగుతావా?"
    : "Type English…  e.g.  Will you have water?";
  card.appendChild(input);

  const translateBtn = el("button", { class: "btn btn-primary translate-go" }, "Translate →");
  translateBtn.onclick = () => runTranslate(input.value);
  card.appendChild(translateBtn);

  v.appendChild(card);

  // Result placeholder
  const resultBox = el("div", { id: "translate-result", class: "translate-result" });
  v.appendChild(resultBox);

  // Recent history
  if (state.translationHistory && state.translationHistory.length) {
    const histWrap = el("div", { class: "translate-history" });
    histWrap.appendChild(el("h3", { class: "section-title" }, "Recent"));
    state.translationHistory.slice(0, 8).forEach(h => {
      const row = el("div", { class: "history-row" });
      row.appendChild(el("div", { class: "history-src" }, h.src));
      row.appendChild(el("div", { class: "history-arrow" }, "→"));
      row.appendChild(el("div", { class: "history-dst" }, h.dst));
      const tePart = h.dir === "te-en" ? h.src : h.dst;
      row.appendChild(makeSpeakBtn(tePart));
      histWrap.appendChild(row);
    });
    // Clear history button
    const clearBtn = el("button", { class: "btn btn-ghost", style: "margin-top:12px;" }, "Clear history");
    clearBtn.onclick = () => {
      if (!confirm("Clear all translation history?")) return;
      state.translationHistory = [];
      saveState();
      renderTranslator();
    };
    histWrap.appendChild(clearBtn);
    v.appendChild(histWrap);
  }

  function setResult(payload) {
    resultBox.innerHTML = "";
    if (payload.error) {
      resultBox.appendChild(el("div", { class: "translate-err" }, "⚠ " + payload.error));
      return;
    }
    if (payload.loading) {
      resultBox.appendChild(el("div", { class: "translate-loading" }, "Translating…"));
      return;
    }
    const out = el("div", { class: "translate-output" });
    out.appendChild(el("div", { class: "translate-label" }, isTeToEn ? "ENGLISH" : "తెలుగు"));
    const text = el("div", { class: "translate-text" + (isTeToEn ? "" : " te") }, payload.translation);
    out.appendChild(text);
    if (payload.quality !== undefined && payload.quality < 0.7) {
      out.appendChild(el("div", { class: "translate-warn" },
        "ℹ Low confidence — this is a rough machine translation, may not be exact."));
    }
    const actions = el("div", { class: "translate-actions" });
    // Play audio if Telugu side
    const teText = isTeToEn ? payload.source : payload.translation;
    actions.appendChild(makeSpeakBtn(teText));
    const copyBtn = el("button", { class: "btn btn-ghost" }, "Copy");
    copyBtn.onclick = () => {
      navigator.clipboard?.writeText(payload.translation);
      copyBtn.textContent = "Copied!";
      setTimeout(() => copyBtn.textContent = "Copy", 1200);
    };
    actions.appendChild(copyBtn);
    out.appendChild(actions);
    resultBox.appendChild(out);
  }

  async function runTranslate(text) {
    const trimmed = (text || "").trim();
    if (!trimmed) return;
    setResult({ loading: true });
    try {
      const { translation, quality } = await translateText(trimmed, fromLang, toLang);
      setResult({ translation, quality, source: trimmed });
      recordTranslation(trimmed, translation, direction);
    } catch (err) {
      setResult({ error: "Couldn't reach the translation service. Check your connection and try again." });
    }
  }
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
        celebrate("Welcome to Velugu!", `${CHARACTERS[draft.character].name} is excited to meet you.`, { skipSurprise: true });
      };
    }
  }

  render();
}

// ============================================================
// DAY 30 FINALE
// ============================================================
function showDay30Finale() {
  // Big confetti
  const overlay = document.createElement("div");
  overlay.className = "celebrate-overlay";
  const colors = ["#E8896B", "#F4B860", "#7DA88A", "#D88FA0", "#B8A4D4", "#FFD4A3", "#FFF1C2"];
  for (let i = 0; i < 160; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDuration = (2.2 + Math.random() * 2.2) + "s";
    c.style.animationDelay = (Math.random() * 0.8) + "s";
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    overlay.appendChild(c);
  }
  document.body.appendChild(overlay);

  const character = CHARACTERS[state.character] || CHARACTERS.anu;
  const scenariosPlayed = Object.keys(state.scenariosDone || {}).length;
  const treasuresFound = (state.unlockedTreasures || []).length;

  const finaleLines = {
    anu:   `30 days. I knew you could. You came back through every quiet evening, every busy morning. Telugu lives in you now — not because you mastered it, but because you stayed with it. Promise me you'll keep using what you've learned.`,
    amma:  `Look at you, child. Thirty days ago you were a stranger to Telugu. Today you can ask for tea, tell me your name, walk through my courtyard. The grammar is rusty, the words come slowly — but you are a Telugu speaker now. Don't stop.`,
    rohan: `Yo. 30 days. I won't lie, I had bets you'd quit by day 12. You crushed it. Now go USE this — order chai in Telugu, message your friend something cheeky, watch a Tollywood film without subtitles for a scene or two. The app gave you the foundation; the world is where the real Telugu lives.`
  };

  const card = document.createElement("div");
  card.className = "finale-card";
  card.innerHTML = `
    <div class="finale-glow"></div>
    <div class="finale-content">
      <div class="finale-icon">🪔🪔🪔</div>
      <div class="finale-eyebrow">30 days complete</div>
      <h1 class="finale-title">Welcome to the festival of lights.</h1>
      <div class="finale-character">
        <div class="finale-avatar" style="background:linear-gradient(135deg,var(--rose),var(--primary))">${character.initial}</div>
        <div class="finale-line">${finaleLines[state.character] || finaleLines.anu}</div>
      </div>
      <div class="finale-stats">
        <div class="finale-stat"><div class="fs-value">30</div><div class="fs-label">days</div></div>
        <div class="finale-stat"><div class="fs-value">${state.streak}</div><div class="fs-label">streak</div></div>
        <div class="finale-stat"><div class="fs-value">${scenariosPlayed}</div><div class="fs-label">scenarios</div></div>
        <div class="finale-stat"><div class="fs-value">${treasuresFound}</div><div class="fs-label">treasures</div></div>
      </div>
      <div class="finale-next">
        <h3>Where to go next</h3>
        <ul>
          <li>📺 Watch a Tollywood film with subtitles — try to catch one full sentence</li>
          <li>🗣️ Find a language partner on Tandem or HelloTalk</li>
          <li>☕ Order chai in Telugu next time you're at a stall</li>
          <li>📖 Re-read scenarios that gave you trouble — they're permanent</li>
          <li>🎯 Daily Review keeps phrases alive — open it once a week</li>
        </ul>
      </div>
      <div class="finale-actions">
        <button class="btn btn-primary finale-done">మంచిది — close</button>
      </div>
    </div>
  `;
  document.body.appendChild(card);
  card.querySelector(".finale-done").addEventListener("click", () => {
    card.classList.add("dismissed");
    overlay.classList.add("dismissed");
    setTimeout(() => { card.remove(); overlay.remove(); }, 500);
  });
}

// ============================================================
// SURPRISE ENVELOPES — variable rewards (~1 in 3, max once per day)
// ============================================================
function maybeShowSurprise() {
  if (typeof TREASURES === "undefined" || !TREASURES.length) return;
  const today = isoDate();
  if (state.lastSurpriseDate === today) return; // once per day
  if (Math.random() > 0.33) return;             // ~1 in 3 chance

  const seen = state.unlockedTreasures || [];
  const fresh = TREASURES.filter(t => !seen.includes(t.id));
  const pool = fresh.length > 0 ? fresh : TREASURES;
  const treasure = pool[Math.floor(Math.random() * pool.length)];

  state.unlockedTreasures = [...new Set([...seen, treasure.id])];
  state.lastSurpriseDate = today;
  saveState();
  // Tiny delay so it lands AFTER the celebrate confetti
  setTimeout(() => showTreasureEnvelope(treasure), 600);
}

function showTreasureEnvelope(t) {
  const overlay = document.createElement("div");
  overlay.className = "treasure-overlay";
  overlay.innerHTML = `
    <div class="treasure-card" role="dialog" aria-label="A small gift">
      <button class="treasure-close" aria-label="Close">×</button>
      <div class="treasure-envelope">
        <div class="treasure-flap"></div>
        <div class="treasure-icon">${t.icon || "✨"}</div>
      </div>
      <div class="treasure-tap-hint">Tap to open</div>
      <div class="treasure-content" style="display:none">
        <div class="treasure-type">${t.title || "A small gift"}</div>
        <div class="treasure-te te">${t.te || ""}</div>
        <div class="treasure-tr">${t.tr || ""}</div>
        <div class="treasure-en">"${t.en || ""}"</div>
        ${t.note ? `<div class="treasure-note">${t.note}</div>` : ""}
        <div class="treasure-actions">
          <button class="btn btn-ghost treasure-hear">🔊 Hear it</button>
          <button class="btn btn-primary treasure-done">Beautiful</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const card = overlay.querySelector(".treasure-card");
  const envelope = overlay.querySelector(".treasure-envelope");
  const hint = overlay.querySelector(".treasure-tap-hint");
  const content = overlay.querySelector(".treasure-content");

  function open() {
    if (envelope.classList.contains("opened")) return;
    envelope.classList.add("opened");
    hint.style.display = "none";
    setTimeout(() => {
      envelope.style.display = "none";
      content.style.display = "block";
      content.scrollIntoView({ block: "nearest" });
    }, 700);
  }

  envelope.addEventListener("click", open);
  card.querySelector(".treasure-hear")?.addEventListener("click", () => speak(t.te));
  card.querySelector(".treasure-done")?.addEventListener("click", () => overlay.remove());
  overlay.querySelector(".treasure-close").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
}

// --------- Celebration / Confetti ---------
function celebrate(title, sub, opts = {}) {
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
  if (!opts.skipSurprise) maybeShowSurprise();
}

// --------- service worker (PWA) ---------
if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(err => {
      console.warn("SW registration failed:", err);
    });
  });
}

// --------- install prompt ---------
let deferredInstallPrompt = null;
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredInstallPrompt = e;
  setTimeout(maybeShowInstallBanner, 1500);
});
window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  removeInstallBanner();
  state.installBannerDismissed = true;
  saveState();
});

function isAppInstalled() {
  return window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
}

function maybeShowInstallBanner() {
  if (state.installBannerDismissed) return;
  if (isAppInstalled()) return;
  if (!state.hasOnboarded) return;
  if (document.getElementById("install-banner")) return;

  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const canPrompt = !!deferredInstallPrompt;
  if (!canPrompt && !isIos) return; // nothing useful to offer

  const banner = document.createElement("div");
  banner.id = "install-banner";
  banner.className = "install-banner";
  if (isIos && !canPrompt) {
    banner.innerHTML = `
      <div class="ib-icon">🪔</div>
      <div class="ib-body">
        <div class="ib-title">Install Velugu</div>
        <div class="ib-sub">Tap <strong>Share</strong> ↑, then <strong>Add to Home Screen</strong>.</div>
      </div>
      <button class="ib-close" aria-label="Dismiss">×</button>
    `;
  } else {
    banner.innerHTML = `
      <div class="ib-icon">🪔</div>
      <div class="ib-body">
        <div class="ib-title">Install Velugu</div>
        <div class="ib-sub">Works offline, lives on your home screen.</div>
      </div>
      <button class="btn btn-primary ib-install">Install</button>
      <button class="ib-close" aria-label="Dismiss">×</button>
    `;
  }
  document.body.appendChild(banner);

  banner.querySelector(".ib-close").addEventListener("click", () => {
    state.installBannerDismissed = true;
    saveState();
    removeInstallBanner();
  });
  banner.querySelector(".ib-install")?.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    if (outcome === "accepted") {
      state.installBannerDismissed = true;
      saveState();
    }
    deferredInstallPrompt = null;
    removeInstallBanner();
  });
}

function removeInstallBanner() {
  const b = document.getElementById("install-banner");
  if (b) b.remove();
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
  // On iOS Safari, beforeinstallprompt never fires — surface the banner ourselves.
  setTimeout(maybeShowInstallBanner, 2500);
}
