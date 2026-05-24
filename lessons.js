// 30-Day SPOKEN Telugu — Conversational Curriculum
// Focus: learn to SPEAK. No script in the learning surface.
// We keep the Telugu script ONLY internally so TTS pronounces correctly.

// Each lesson has:
//   day, topic, goal
//   sections[]: { type: "intro" | "tip" | "phrases" | "dialog" | "table" }
//   quiz[]:    { q (English question), opts (romanised), a }

const LESSONS = [

  // ============ WEEK 1: GREETINGS & SELF ============
  {
    day: 1,
    topic: "Hello & Thank You",
    goal: "Greet people and thank them naturally.",
    sections: [
      { type: "intro", body: "Telugu is spoken by about 95 million people in southern India. The good news: you don't need to read the script to start speaking. We'll learn everything in 'romanised' Telugu — Telugu sounds written in the English alphabet." },
      { type: "tip", body: "Two big tips for sounding natural: (1) keep sentences short, (2) Telugu speakers love politeness — adding '-aṇḍi' to anything (like 'sare-aṇḍi' = 'okay sir') instantly sounds respectful." },
      { type: "phrases", title: "The essentials", items: [
        { en: "Hello (anyone, polite)", te: "namaskāram", script: "నమస్కారం" },
        { en: "Hi (casual)", te: "hai", script: "హాయ్" },
        { en: "Thank you", te: "dhanyavādālu", script: "ధన్యవాదాలు" },
        { en: "Thanks (casual)", te: "thanks-aṇḍi", script: "థాంక్స్ అండి" },
        { en: "Sorry / Excuse me", te: "kṣaminchaṇḍi", script: "క్షమించండి" },
        { en: "It's okay / No problem", te: "parvāledu", script: "పర్వాలేదు" },
        { en: "Goodbye", te: "selavu", script: "సెలవు" },
        { en: "See you later", te: "malli kalusukundām", script: "మళ్ళీ కలుసుకుందాం" }
      ]},
      { type: "dialog", title: "Tiny first conversation", lines: [
        { who: "A", en: "Hello!", te: "namaskāram!" },
        { who: "B", en: "Hello!", te: "namaskāram!" },
        { who: "A", en: "Thank you.", te: "dhanyavādālu." },
        { who: "B", en: "It's okay.", te: "parvāledu." }
      ]}
    ],
    quiz: [
      { q: "How do you say 'Hello' politely?", opts: ["namaskāram", "selavu", "parvāledu", "dhanyavādālu"], a: 0 },
      { q: "How do you say 'Thank you'?", opts: ["kṣaminchaṇḍi", "parvāledu", "dhanyavādālu", "hai"], a: 2 },
      { q: "How do you say 'Sorry / Excuse me'?", opts: ["selavu", "kṣaminchaṇḍi", "namaskāram", "dhanyavādālu"], a: 1 },
      { q: "How do you say 'No problem' / 'It's okay'?", opts: ["parvāledu", "dhanyavādālu", "hai", "selavu"], a: 0 },
      { q: "How do you say 'Goodbye'?", opts: ["namaskāram", "selavu", "parvāledu", "thanks-aṇḍi"], a: 1 }
    ]
  },

  {
    day: 2,
    topic: "How Are You?",
    goal: "Ask about and respond to wellbeing.",
    sections: [
      { type: "phrases", title: "Asking", items: [
        { en: "How are you? (polite)", te: "mīru bāgunnārā?", script: "మీరు బాగున్నారా?" },
        { en: "How are you? (casual)", te: "nuvvu bāgunnāvā?", script: "నువ్వు బాగున్నావా?" },
        { en: "And you?", te: "mīrū?", script: "మీరూ?" }
      ]},
      { type: "phrases", title: "Answering", items: [
        { en: "I'm well", te: "nēnu bāgunnānu", script: "నేను బాగున్నాను" },
        { en: "I'm fine, thanks", te: "bāgunnānu, dhanyavādālu", script: "బాగున్నాను, ధన్యవాదాలు" },
        { en: "Not bad", te: "parvāledu", script: "పర్వాలేదు" },
        { en: "Not so good", te: "antā baagāledu", script: "అంతా బాగాలేదు" },
        { en: "I'm tired", te: "alasipoyānu", script: "అలసిపోయాను" },
        { en: "I'm happy", te: "santhōshamgā unnānu", script: "సంతోషంగా ఉన్నాను" }
      ]},
      { type: "tip", body: "Telugu has two 'you's: 'mīru' (formal — strangers, elders) and 'nuvvu' (casual — friends, kids). When in doubt, always use 'mīru' first. You won't offend anyone by being too polite." },
      { type: "dialog", title: "Example", lines: [
        { who: "A", en: "Hello! How are you?", te: "namaskāram! mīru bāgunnārā?" },
        { who: "B", en: "I'm well, thanks. And you?", te: "bāgunnānu, dhanyavādālu. mīrū?" },
        { who: "A", en: "I'm a little tired.", te: "konchem alasipoyānu." }
      ]}
    ],
    quiz: [
      { q: "How do you ask 'How are you?' politely?", opts: ["mīru bāgunnārā?", "nuvvu bāgunnāvā?", "mīru evaru?", "mīru ekkaḍa?"], a: 0 },
      { q: "How do you say 'I'm well'?", opts: ["nēnu bāgunnānu", "nēnu alasipoyānu", "nēnu vellutānu", "nēnu unnānu"], a: 0 },
      { q: "Which 'you' is polite/formal?", opts: ["nuvvu", "mīru", "atanu", "āme"], a: 1 },
      { q: "How do you say 'I'm tired'?", opts: ["santhōshamgā unnānu", "bāgunnānu", "alasipoyānu", "ākali unnānu"], a: 2 },
      { q: "How do you say 'And you?'", opts: ["mīrū?", "ēmīṭi?", "evaru?", "ekkaḍa?"], a: 0 }
    ]
  },

  {
    day: 3,
    topic: "What's Your Name?",
    goal: "Introduce yourself and ask about others.",
    sections: [
      { type: "phrases", title: "Names", items: [
        { en: "What is your name?", te: "mī pēru ēmiṭi?", script: "మీ పేరు ఏమిటి?" },
        { en: "My name is ___", te: "nā pēru ___", script: "నా పేరు ___" },
        { en: "Nice to meet you", te: "mimmalni kalavaḍam santhōsham", script: "మిమ్మల్ని కలవడం సంతోషం" },
        { en: "Me too", te: "nēnu kūḍā", script: "నేను కూడా" }
      ]},
      { type: "phrases", title: "Where from?", items: [
        { en: "Where are you from?", te: "mīru ekkaḍi nuṇḍi?", script: "మీరు ఎక్కడి నుండి?" },
        { en: "I'm from ___", te: "nēnu ___ nuṇḍi", script: "నేను ___ నుండి" },
        { en: "I live in Hyderabad", te: "nēnu hyderābāḍ-lō uṇṭānu", script: "నేను హైదరాబాద్‌లో ఉంటాను" },
        { en: "Where do you live?", te: "mīru ekkaḍa uṇṭāru?", script: "మీరు ఎక్కడ ఉంటారు?" }
      ]},
      { type: "dialog", title: "First meeting", lines: [
        { who: "A", en: "What's your name?", te: "mī pēru ēmiṭi?" },
        { who: "B", en: "My name is Anil. And yours?", te: "nā pēru anil. mīdi?" },
        { who: "A", en: "I'm Priya. Nice to meet you.", te: "nēnu priya. mimmalni kalavaḍam santhōsham." },
        { who: "B", en: "Me too.", te: "nēnu kūḍā." }
      ]}
    ],
    quiz: [
      { q: "How do you ask 'What is your name?'", opts: ["mī pēru ēmiṭi?", "mīru ekkaḍa?", "mīru evaru?", "ēmīṭi?"], a: 0 },
      { q: "How do you say 'My name is Ram'?", opts: ["nēnu rām", "nā pēru rām", "rām nēnu", "rām pēru"], a: 1 },
      { q: "How do you say 'Where are you from?'", opts: ["mīru ekkaḍa uṇṭāru?", "mīru ekkaḍi nuṇḍi?", "mī pēru ēmiṭi?", "mīrū?"], a: 1 },
      { q: "How do you say 'Nice to meet you'?", opts: ["dhanyavādālu", "mimmalni kalavaḍam santhōsham", "namaskāram", "selavu"], a: 1 },
      { q: "How do you say 'Me too'?", opts: ["nēnu kūḍā", "nēnu lēnu", "nēnu mātrame", "nēnu okkaḍini"], a: 0 }
    ]
  },

  {
    day: 4,
    topic: "Yes, No, Maybe",
    goal: "Confirm, deny, and hedge.",
    sections: [
      { type: "phrases", title: "Saying yes/no", items: [
        { en: "Yes", te: "avunu", script: "అవును" },
        { en: "No (it isn't)", te: "kādu", script: "కాదు" },
        { en: "No (it doesn't exist / I don't have)", te: "lēdu", script: "లేదు" },
        { en: "Maybe", te: "ēmō", script: "ఏమో" },
        { en: "I don't know", te: "nāku teliyadu", script: "నాకు తెలియదు" },
        { en: "I know", te: "nāku telusu", script: "నాకు తెలుసు" },
        { en: "I understand", te: "nāku artham ayyindi", script: "నాకు అర్థం అయ్యింది" },
        { en: "I don't understand", te: "nāku artham kāledu", script: "నాకు అర్థం కాలేదు" }
      ]},
      { type: "tip", body: "Two kinds of 'no': 'kādu' contradicts an identity ('that's not it'), 'lēdu' denies existence ('there isn't / I don't have'). 'Are you a doctor?' → 'kādu'. 'Do you have water?' → 'lēdu'." },
      { type: "phrases", title: "Asking for clarity", items: [
        { en: "Please speak slowly", te: "mellagā cheppaṇḍi", script: "మెల్లగా చెప్పండి" },
        { en: "Say it again, please", te: "marokasāri cheppaṇḍi", script: "మరోసారి చెప్పండి" },
        { en: "What does that mean?", te: "dāni artham ēmiṭi?", script: "దాని అర్థం ఏమిటి?" },
        { en: "Do you speak English?", te: "mīku iṅglīsh vacchā?", script: "మీకు ఇంగ్లీష్ వచ్చా?" }
      ]}
    ],
    quiz: [
      { q: "How do you say 'Yes'?", opts: ["avunu", "kādu", "lēdu", "ēmō"], a: 0 },
      { q: "How do you say 'I don't know'?", opts: ["nāku telusu", "nāku teliyadu", "nāku artham kāledu", "nāku kāvāli"], a: 1 },
      { q: "How do you say 'I don't understand'?", opts: ["nāku artham ayyindi", "nāku artham kāledu", "nāku teliyadu", "nāku kāvāli"], a: 1 },
      { q: "How do you ask 'Please speak slowly'?", opts: ["mellagā cheppaṇḍi", "marokasāri cheppaṇḍi", "ēmiṭi cheppāru?", "mīku iṅglīsh vacchā?"], a: 0 },
      { q: "Which 'no' means 'I don't have / there isn't'?", opts: ["kādu", "lēdu", "ēmō", "avunu"], a: 1 }
    ]
  },

  {
    day: 5,
    topic: "Numbers 1–10",
    goal: "Count to ten — needed for time, money, age.",
    sections: [
      { type: "phrases", title: "1 to 10", items: [
        { en: "one",   te: "okaṭi",    script: "ఒకటి" },
        { en: "two",   te: "reṇḍu",    script: "రెండు" },
        { en: "three", te: "mūḍu",     script: "మూడు" },
        { en: "four",  te: "nālugu",   script: "నాలుగు" },
        { en: "five",  te: "aidu",     script: "ఐదు" },
        { en: "six",   te: "āru",      script: "ఆరు" },
        { en: "seven", te: "ēḍu",      script: "ఏడు" },
        { en: "eight", te: "enimidi",  script: "ఎనిమిది" },
        { en: "nine",  te: "tommidi",  script: "తొమ్మిది" },
        { en: "ten",   te: "padi",     script: "పది" }
      ]},
      { type: "phrases", title: "Using numbers", items: [
        { en: "How many?", te: "enni?", script: "ఎన్ని?" },
        { en: "two cups of tea", te: "reṇḍu chai", script: "రెండు చాయ్" },
        { en: "five rupees", te: "aidu rūpāyalu", script: "ఐదు రూపాయలు" },
        { en: "I have three", te: "nā daggara mūḍu unnāyi", script: "నా దగ్గర మూడు ఉన్నాయి" }
      ]},
      { type: "tip", body: "Memory hack: 'okaṭi reṇḍu mūḍu' sounds rhythmic. Say it out loud ten times in a row — by tomorrow you'll have the bottom three locked in." }
    ],
    quiz: [
      { q: "How do you say 'three'?", opts: ["reṇḍu", "mūḍu", "nālugu", "aidu"], a: 1 },
      { q: "How do you say 'seven'?", opts: ["āru", "ēḍu", "enimidi", "tommidi"], a: 1 },
      { q: "How do you say 'ten'?", opts: ["enimidi", "tommidi", "padi", "okaṭi"], a: 2 },
      { q: "How do you ask 'How many?'", opts: ["enta?", "enni?", "ēmīṭi?", "ekkaḍa?"], a: 1 },
      { q: "How do you say 'five'?", opts: ["nālugu", "aidu", "āru", "ēḍu"], a: 1 }
    ]
  },

  {
    day: 6,
    topic: "Numbers 11–100",
    goal: "Handle prices, ages, time.",
    sections: [
      { type: "phrases", title: "Useful numbers above 10", items: [
        { en: "eleven", te: "padakoṇḍu", script: "పదకొండు" },
        { en: "twelve", te: "panneṇḍu", script: "పన్నెండు" },
        { en: "fifteen", te: "padihēnu", script: "పదిహేను" },
        { en: "twenty", te: "iravai", script: "ఇరవై" },
        { en: "twenty-five", te: "iravai aidu", script: "ఇరవై ఐదు" },
        { en: "thirty", te: "muppai", script: "ముప్పై" },
        { en: "fifty", te: "yābhai", script: "యాభై" },
        { en: "one hundred", te: "vanda", script: "వంద" },
        { en: "two hundred", te: "reṇḍu vandalu", script: "రెండు వందలు" },
        { en: "one thousand", te: "veyyi", script: "వెయ్యి" }
      ]},
      { type: "tip", body: "After 20, Telugu is built like English: 'twenty-five' = 'iravai aidu' (twenty five), 'fifty-three' = 'yābhai mūḍu' (fifty three). Master the tens and you can say any number." },
      { type: "phrases", title: "Money & age", items: [
        { en: "How much?", te: "enta?", script: "ఎంత?" },
        { en: "100 rupees", te: "vanda rūpāyalu", script: "వంద రూపాయలు" },
        { en: "How old are you?", te: "mī vayasu enta?", script: "మీ వయసు ఎంత?" },
        { en: "I am 25 years old", te: "nāku iravai aidu sanvatsarālu", script: "నాకు ఇరవై ఐదు సంవత్సరాలు" }
      ]}
    ],
    quiz: [
      { q: "How do you say 'fifty'?", opts: ["iravai", "muppai", "yābhai", "vanda"], a: 2 },
      { q: "How do you ask 'How much?'", opts: ["enni?", "enta?", "ēmīṭi?", "evaru?"], a: 1 },
      { q: "How do you say 'one hundred'?", opts: ["padi", "vanda", "veyyi", "iravai"], a: 1 },
      { q: "How do you say 'twenty-five'?", opts: ["iravai aidu", "muppai aidu", "padihēnu", "iravai mūḍu"], a: 0 },
      { q: "How do you say 'one thousand'?", opts: ["vanda", "veyyi", "lakṣa", "muppai"], a: 1 }
    ]
  },

  {
    day: 7,
    topic: "Week 1 Review — Small Talk",
    goal: "Combine everything from Week 1.",
    sections: [
      { type: "intro", body: "A full week of Telugu under your belt. You can now: greet, introduce yourself, say yes/no, ask & answer 'how are you', count to 100, ask 'how much'. That's enough for a real (short) chat." },
      { type: "dialog", title: "Pulling it together", lines: [
        { who: "A", en: "Hello!", te: "namaskāram!" },
        { who: "B", en: "Hello!", te: "namaskāram!" },
        { who: "A", en: "How are you?", te: "mīru bāgunnārā?" },
        { who: "B", en: "I'm well, thanks. What's your name?", te: "bāgunnānu, dhanyavādālu. mī pēru ēmiṭi?" },
        { who: "A", en: "My name is Sita. And yours?", te: "nā pēru sīta. mīdi?" },
        { who: "B", en: "I'm Ravi. Where are you from?", te: "nēnu ravi. mīru ekkaḍi nuṇḍi?" },
        { who: "A", en: "I'm from Vijayawada.", te: "nēnu vijayawāḍa nuṇḍi." },
        { who: "B", en: "Nice to meet you.", te: "mimmalni kalavaḍam santhōsham." }
      ]},
      { type: "tip", body: "Don't aim for perfect. Telugu speakers are delighted when foreigners try — even a basic 'namaskāram, nā pēru ___' will get warm responses." }
    ],
    quiz: [
      { q: "How do you say 'How are you?' politely?", opts: ["mīru bāgunnārā?", "mī pēru ēmiṭi?", "mīru ekkaḍa?", "namaskāram"], a: 0 },
      { q: "How do you say 'My name is Ram'?", opts: ["nēnu rām", "nā pēru rām", "rām pēru", "pēru rām"], a: 1 },
      { q: "How do you say 'eight'?", opts: ["āru", "ēḍu", "enimidi", "tommidi"], a: 2 },
      { q: "How do you say 'I don't understand'?", opts: ["nāku artham ayyindi", "nāku artham kāledu", "nāku teliyadu", "nāku kāvāli"], a: 1 },
      { q: "Which is the casual 'you'?", opts: ["nuvvu", "mīru", "atanu", "vāru"], a: 0 }
    ]
  },

  // ============ WEEK 2: DAILY LIFE ============
  {
    day: 8,
    topic: "Family",
    goal: "Talk about your relatives.",
    sections: [
      { type: "phrases", title: "Close family", items: [
        { en: "mother", te: "amma", script: "అమ్మ" },
        { en: "father", te: "nānna", script: "నాన్న" },
        { en: "elder brother", te: "annayya", script: "అన్నయ్య" },
        { en: "elder sister", te: "akka", script: "అక్క" },
        { en: "younger brother", te: "tammuḍu", script: "తమ్ముడు" },
        { en: "younger sister", te: "chelli", script: "చెల్లి" },
        { en: "son", te: "koḍuku", script: "కొడుకు" },
        { en: "daughter", te: "kūturu", script: "కూతురు" },
        { en: "husband", te: "bhartā", script: "భర్త" },
        { en: "wife", te: "bhārya", script: "భార్య" }
      ]},
      { type: "phrases", title: "Talking about them", items: [
        { en: "Do you have brothers/sisters?", te: "mīku annāchellelu unnārā?", script: "మీకు అన్నాచెల్లెళ్ళు ఉన్నారా?" },
        { en: "I have one brother", te: "nāku okka tammuḍu uṇḍu", script: "నాకు ఒక తమ్ముడు ఉన్నాడు" },
        { en: "I have two sisters", te: "nāku iddaru chellellu unnāru", script: "నాకు ఇద్దరు చెల్లెళ్ళు ఉన్నారు" },
        { en: "I'm an only child", te: "nēnu okkaḍine", script: "నేను ఒక్కడిని" }
      ]},
      { type: "tip", body: "Telugu (like Tamil) distinguishes elder vs younger siblings. There's no general word for 'brother' — you must say elder ('annayya') or younger ('tammuḍu')." }
    ],
    quiz: [
      { q: "How do you say 'mother'?", opts: ["amma", "nānna", "akka", "chelli"], a: 0 },
      { q: "How do you say 'younger brother'?", opts: ["annayya", "tammuḍu", "akka", "chelli"], a: 1 },
      { q: "How do you say 'daughter'?", opts: ["koḍuku", "kūturu", "bhārya", "amma"], a: 1 },
      { q: "How do you say 'I have one brother'?", opts: ["nāku okka tammuḍu uṇḍu", "nāku okka akka uṇḍu", "nāku reṇḍu tammuḍu uṇḍu", "nēnu tammuḍu"], a: 0 },
      { q: "How do you say 'father'?", opts: ["amma", "tāta", "nānna", "annayya"], a: 2 }
    ]
  },

  {
    day: 9,
    topic: "I Want / I Don't Want",
    goal: "Express what you do and don't want — pure survival Telugu.",
    sections: [
      { type: "phrases", title: "Core verbs", items: [
        { en: "I want this", te: "nāku idi kāvāli", script: "నాకు ఇది కావాలి" },
        { en: "I don't want this", te: "nāku idi vaddu", script: "నాకు ఇది వద్దు" },
        { en: "I want water", te: "nāku nīḷḷu kāvāli", script: "నాకు నీళ్ళు కావాలి" },
        { en: "I want tea", te: "nāku chai kāvāli", script: "నాకు చాయ్ కావాలి" },
        { en: "Give me ___ please", te: "nāku ___ ivvaṇḍi", script: "నాకు ___ ఇవ్వండి" },
        { en: "I need help", te: "nāku sahāyam kāvāli", script: "నాకు సహాయం కావాలి" }
      ]},
      { type: "phrases", title: "Likes & loves", items: [
        { en: "I like it", te: "nāku ishṭam", script: "నాకు ఇష్టం" },
        { en: "I don't like it", te: "nāku ishṭam lēdu", script: "నాకు ఇష్టం లేదు" },
        { en: "Do you like it?", te: "mīku ishṭamā?", script: "మీకు ఇష్టమా?" },
        { en: "Very nice", te: "chālā bāgundi", script: "చాలా బాగుంది" }
      ]},
      { type: "tip", body: "The pattern is super useful: '[person]-ku [thing] kāvāli' = '[person] wants [thing]'. 'nāku' = 'to me'. 'mīku' = 'to you'. Plug in any noun." }
    ],
    quiz: [
      { q: "How do you say 'I want water'?", opts: ["nāku nīḷḷu kāvāli", "nāku nīḷḷu vaddu", "nāku chai kāvāli", "nīḷḷu unnāyi"], a: 0 },
      { q: "How do you say 'I don't want this'?", opts: ["nāku idi kāvāli", "nāku idi vaddu", "nāku ishṭam", "nāku teliyadu"], a: 1 },
      { q: "How do you say 'I like it'?", opts: ["nāku ishṭam", "nāku ishṭam lēdu", "nāku kāvāli", "nāku artham"], a: 0 },
      { q: "How do you say 'Very nice / very good'?", opts: ["chālā bāgundi", "bāgāledu", "ishṭam lēdu", "vaddu"], a: 0 },
      { q: "How do you say 'I need help'?", opts: ["nāku sahāyam kāvāli", "nāku ishṭam", "sahāyam lēdu", "mīku sahāyam"], a: 0 }
    ]
  },

  {
    day: 10,
    topic: "Food & Drinks",
    goal: "Order, ask, compliment food.",
    sections: [
      { type: "phrases", title: "Food vocab", items: [
        { en: "rice (cooked)", te: "annam", script: "అన్నం" },
        { en: "dal / lentils", te: "pappu", script: "పప్పు" },
        { en: "curry / vegetable", te: "kūra", script: "కూర" },
        { en: "curd / yogurt", te: "perugu", script: "పెరుగు" },
        { en: "roti / flatbread", te: "chapātī", script: "చపాతీ" },
        { en: "tea", te: "chai", script: "చాయ్" },
        { en: "coffee", te: "kāphī", script: "కాఫీ" },
        { en: "water", te: "nīḷḷu", script: "నీళ్ళు" },
        { en: "milk", te: "pālu", script: "పాలు" },
        { en: "egg", te: "guḍḍu", script: "గుడ్డు" }
      ]},
      { type: "phrases", title: "At a restaurant", items: [
        { en: "I'm hungry", te: "nāku ākali", script: "నాకు ఆకలి" },
        { en: "I'm thirsty", te: "nāku dāham", script: "నాకు దాహం" },
        { en: "Menu please", te: "menu ivvaṇḍi", script: "మెను ఇవ్వండి" },
        { en: "This is tasty", te: "idi rucigā undi", script: "ఇది రుచిగా ఉంది" },
        { en: "Less spicy please", te: "kāram takkuva", script: "కారం తక్కువ" },
        { en: "Bill please", te: "billu ivvaṇḍi", script: "బిల్లు ఇవ్వండి" }
      ]},
      { type: "tip", body: "'idi' = 'this'. Point at the menu and say 'idi okkaṭi' (one of these) — bulletproof ordering hack." }
    ],
    quiz: [
      { q: "How do you say 'water'?", opts: ["pālu", "nīḷḷu", "chai", "kāphī"], a: 1 },
      { q: "How do you say 'I'm hungry'?", opts: ["nāku dāham", "nāku ākali", "nāku ishṭam", "nāku kāvāli"], a: 1 },
      { q: "How do you say 'This is tasty'?", opts: ["idi rucigā undi", "idi kāvāli", "chālā bāgundi", "kāram takkuva"], a: 0 },
      { q: "How do you say 'Bill please'?", opts: ["menu ivvaṇḍi", "billu ivvaṇḍi", "nīḷḷu ivvaṇḍi", "okkaṭi ivvaṇḍi"], a: 1 },
      { q: "How do you say 'tea'?", opts: ["chai", "kāphī", "pālu", "perugu"], a: 0 }
    ]
  },

  {
    day: 11,
    topic: "At Home",
    goal: "Talk about rooms and household objects.",
    sections: [
      { type: "phrases", title: "Rooms & objects", items: [
        { en: "house", te: "illu", script: "ఇల్లు" },
        { en: "room", te: "gadi", script: "గది" },
        { en: "kitchen", te: "vanṭa illu", script: "వంట ఇల్లు" },
        { en: "bathroom", te: "bāthrūm", script: "బాత్రూమ్" },
        { en: "bed", te: "manchaṁ", script: "మంచం" },
        { en: "chair", te: "kurchi", script: "కుర్చి" },
        { en: "table", te: "ṭebul", script: "టేబుల్" },
        { en: "door", te: "talupu", script: "తలుపు" },
        { en: "window", te: "kiṭikī", script: "కిటికీ" },
        { en: "light", te: "laiṭ", script: "లైట్" }
      ]},
      { type: "phrases", title: "Useful at home", items: [
        { en: "Please come in", te: "lōpaliki raṇḍi", script: "లోపలికి రండి" },
        { en: "Please sit", te: "kūrchōṇḍi", script: "కూర్చోండి" },
        { en: "Turn on the light", te: "laiṭ veyyi", script: "లైట్ వెయ్యి" },
        { en: "Close the door", te: "talupu vēyaṇḍi", script: "తలుపు వేయండి" },
        { en: "Where is the bathroom?", te: "bāthrūm ekkaḍa?", script: "బాత్రూమ్ ఎక్కడ?" }
      ]}
    ],
    quiz: [
      { q: "How do you say 'house'?", opts: ["illu", "gadi", "talupu", "manchaṁ"], a: 0 },
      { q: "How do you ask 'Where is the bathroom?'", opts: ["bāthrūm ekkaḍa?", "talupu ekkaḍa?", "illu ekkaḍa?", "gadi ekkaḍa?"], a: 0 },
      { q: "How do you say 'Please come in'?", opts: ["kūrchōṇḍi", "lōpaliki raṇḍi", "talupu vēyaṇḍi", "ivvaṇḍi"], a: 1 },
      { q: "How do you say 'chair'?", opts: ["ṭebul", "kurchi", "manchaṁ", "talupu"], a: 1 },
      { q: "How do you say 'kitchen'?", opts: ["vanṭa illu", "gadi", "bāthrūm", "illu"], a: 0 }
    ]
  },

  {
    day: 12,
    topic: "Time & Days",
    goal: "Schedule and reference days.",
    sections: [
      { type: "phrases", title: "Time words", items: [
        { en: "today", te: "īrōju", script: "ఈరోజు" },
        { en: "yesterday", te: "ninna", script: "నిన్న" },
        { en: "tomorrow", te: "rēpu", script: "రేపు" },
        { en: "now", te: "ippuḍu", script: "ఇప్పుడు" },
        { en: "later", te: "tarvāta", script: "తర్వాత" },
        { en: "morning", te: "udayam", script: "ఉదయం" },
        { en: "afternoon", te: "madhyāhnam", script: "మధ్యాహ్నం" },
        { en: "evening", te: "sāyantram", script: "సాయంత్రం" },
        { en: "night", te: "rātri", script: "రాత్రి" }
      ]},
      { type: "phrases", title: "Days of week", items: [
        { en: "Monday", te: "sōmavāram", script: "సోమవారం" },
        { en: "Tuesday", te: "maṅgaḷavāram", script: "మంగళవారం" },
        { en: "Wednesday", te: "budhavāram", script: "బుధవారం" },
        { en: "Thursday", te: "guruvāram", script: "గురువారం" },
        { en: "Friday", te: "śukravāram", script: "శుక్రవారం" },
        { en: "Saturday", te: "śanivāram", script: "శనివారం" },
        { en: "Sunday", te: "ādivāram", script: "ఆదివారం" }
      ]},
      { type: "phrases", title: "Asking", items: [
        { en: "What time is it?", te: "ippuḍu enni gaṇṭalu?", script: "ఇప్పుడు ఎన్ని గంటలు?" },
        { en: "When?", te: "eppuḍu?", script: "ఎప్పుడు?" },
        { en: "I'll come tomorrow", te: "nēnu rēpu vastānu", script: "నేను రేపు వస్తాను" }
      ]}
    ],
    quiz: [
      { q: "How do you say 'tomorrow'?", opts: ["ninna", "īrōju", "rēpu", "ippuḍu"], a: 2 },
      { q: "How do you say 'now'?", opts: ["ippuḍu", "tarvāta", "udayam", "rātri"], a: 0 },
      { q: "How do you ask 'When?'", opts: ["ekkaḍa?", "eppuḍu?", "evaru?", "ēmīṭi?"], a: 1 },
      { q: "How do you say 'morning'?", opts: ["sāyantram", "rātri", "udayam", "madhyāhnam"], a: 2 },
      { q: "How do you say 'Sunday'?", opts: ["sōmavāram", "śanivāram", "ādivāram", "śukravāram"], a: 2 }
    ]
  },

  {
    day: 13,
    topic: "Weather & Small Talk",
    goal: "Comment on weather like a local.",
    sections: [
      { type: "phrases", title: "Weather", items: [
        { en: "It's hot", te: "vēḍigā undi", script: "వేడిగా ఉంది" },
        { en: "It's cold", te: "chaligā undi", script: "చలిగా ఉంది" },
        { en: "It's raining", te: "varsham padutōndi", script: "వర్షం పడుతోంది" },
        { en: "Sunny / lots of sun", te: "eṇḍa ekkuva", script: "ఎండ ఎక్కువ" },
        { en: "Cloudy", te: "mēghālu unnāyi", script: "మేఘాలు ఉన్నాయి" },
        { en: "Nice weather", te: "vātāvaraṇam bāgundi", script: "వాతావరణం బాగుంది" },
        { en: "Take an umbrella", te: "guḍāram tīsukōṇḍi", script: "గొడుగు తీసుకోండి" }
      ]},
      { type: "phrases", title: "Reactions", items: [
        { en: "Really?", te: "nijaṅgānā?", script: "నిజంగానా?" },
        { en: "Wow!", te: "ārā!", script: "ఆరా!" },
        { en: "That's nice", te: "adi bāgundi", script: "అది బాగుంది" },
        { en: "Too bad", te: "viṣādam", script: "విషాదం" }
      ]}
    ],
    quiz: [
      { q: "How do you say 'It's hot'?", opts: ["vēḍigā undi", "chaligā undi", "bāgundi", "varsham padutōndi"], a: 0 },
      { q: "How do you say 'It's raining'?", opts: ["eṇḍa ekkuva", "varsham padutōndi", "chaligā undi", "mēghālu unnāyi"], a: 1 },
      { q: "How do you say 'Really?'", opts: ["nijaṅgānā?", "ēmīṭi?", "eppuḍu?", "evaru?"], a: 0 },
      { q: "How do you say 'It's cold'?", opts: ["vēḍigā undi", "chaligā undi", "eṇḍa ekkuva", "mēghālu undi"], a: 1 },
      { q: "How do you say 'Nice weather'?", opts: ["adi bāgundi", "vātāvaraṇam bāgundi", "varsham bāgundi", "ārā!"], a: 1 }
    ]
  },

  {
    day: 14,
    topic: "Week 2 Review",
    goal: "Combine week 2 vocabulary in real chats.",
    sections: [
      { type: "intro", body: "You can now describe your family, order food, talk about the weather, and handle basic time references. That's a lot in 2 weeks!" },
      { type: "dialog", title: "Visiting a friend's home", lines: [
        { who: "Host", en: "Welcome! Please come in.", te: "swāgatam! lōpaliki raṇḍi." },
        { who: "You",  en: "Thanks. Nice house!", te: "dhanyavādālu. illu chālā bāgundi!" },
        { who: "Host", en: "Please sit. Would you like tea?", te: "kūrchōṇḍi. chai kāvālā?" },
        { who: "You",  en: "Yes please. Less sugar.", te: "avunu. chakkera takkuva." },
        { who: "Host", en: "Are you hungry?", te: "mīku ākali undā?" },
        { who: "You",  en: "A little. Thanks.", te: "konchem. dhanyavādālu." }
      ]}
    ],
    quiz: [
      { q: "How do you say 'I'm thirsty'?", opts: ["nāku ākali", "nāku dāham", "nāku ishṭam", "nāku kāvāli"], a: 1 },
      { q: "How do you say 'today'?", opts: ["ninna", "īrōju", "rēpu", "ippuḍu"], a: 1 },
      { q: "How do you say 'Tuesday'?", opts: ["sōmavāram", "maṅgaḷavāram", "budhavāram", "guruvāram"], a: 1 },
      { q: "How do you say 'kitchen'?", opts: ["bāthrūm", "vanṭa illu", "gadi", "manchaṁ"], a: 1 },
      { q: "How do you say 'My family is good'?", opts: ["nā kuṭumbam bāgundi", "nā illu bāgundi", "nā pēru bāgundi", "nā vayasu bāgundi"], a: 0 }
    ]
  },

  // ============ WEEK 3: OUT & ABOUT ============
  {
    day: 15,
    topic: "Going Places",
    goal: "Talk about where you go and want to go.",
    sections: [
      { type: "phrases", title: "Movement verbs", items: [
        { en: "I'm going", te: "nēnu veḷutunnānu", script: "నేను వెళ్తున్నాను" },
        { en: "I'm coming", te: "nēnu vastunnānu", script: "నేను వస్తున్నాను" },
        { en: "I want to go", te: "nāku veḷḷāli", script: "నాకు వెళ్ళాలి" },
        { en: "Let's go", te: "veḷḍām", script: "వెళదాం" },
        { en: "Wait a minute", te: "konchem āgaṇḍi", script: "కొంచెం ఆగండి" },
        { en: "I'll come tomorrow", te: "rēpu vastānu", script: "రేపు వస్తాను" }
      ]},
      { type: "phrases", title: "Destinations", items: [
        { en: "Where are you going?", te: "mīru ekkaḍiki veḷutunnāru?", script: "మీరు ఎక్కడికి వెళ్తున్నారు?" },
        { en: "I'm going home", te: "iṇṭiki veḷutunnānu", script: "ఇంటికి వెళ్తున్నాను" },
        { en: "to office", te: "āphisuku", script: "ఆఫీసుకు" },
        { en: "to the market", te: "bajāruku", script: "బజారుకు" },
        { en: "to the hospital", te: "āspatriki", script: "ఆస్పత్రికి" }
      ]},
      { type: "tip", body: "The '-ku' or '-ki' ending on a place means 'to that place'. 'illu' (house) → 'iṇṭiki' (to the house). 'āphisu' → 'āphisuku' (to the office)." }
    ],
    quiz: [
      { q: "How do you say 'Let's go'?", opts: ["veḷḍām", "vastunnānu", "veḷutunnānu", "āgaṇḍi"], a: 0 },
      { q: "How do you say 'I'm going home'?", opts: ["āphisuku veḷutunnānu", "iṇṭiki veḷutunnānu", "bajāruku veḷutunnānu", "vastunnānu"], a: 1 },
      { q: "How do you say 'Wait a minute'?", opts: ["konchem āgaṇḍi", "vēgaṅgā raṇḍi", "veḷḍām", "tarvāta"], a: 0 },
      { q: "How do you ask 'Where are you going?'", opts: ["mīru ekkaḍiki veḷutunnāru?", "mīru ekkaḍa uṇṭāru?", "mīru evaru?", "mīru ēmīṭi?"], a: 0 },
      { q: "How do you say 'I want to go'?", opts: ["nāku veḷḷāli", "nēnu vastunnānu", "veḷḍām", "veḷutunnānu"], a: 0 }
    ]
  },

  {
    day: 16,
    topic: "Asking Directions",
    goal: "Survive in any new place.",
    sections: [
      { type: "phrases", title: "Asking", items: [
        { en: "Where is ___?", te: "___ ekkaḍa undi?", script: "___ ఎక్కడ ఉంది?" },
        { en: "How far is it?", te: "enta dūram?", script: "ఎంత దూరం?" },
        { en: "Is it nearby?", te: "daggaragā undā?", script: "దగ్గరగా ఉందా?" },
        { en: "Can you show me?", te: "chūpiṇchagalarā?", script: "చూపించగలరా?" }
      ]},
      { type: "phrases", title: "Understanding the reply", items: [
        { en: "Go straight", te: "nērugā veḷḷaṇḍi", script: "నేరుగా వెళ్ళండి" },
        { en: "Turn left", te: "eḍama vaipu tiragaṇḍi", script: "ఎడమ వైపు తిరగండి" },
        { en: "Turn right", te: "kuḍi vaipu tiragaṇḍi", script: "కుడి వైపు తిరగండి" },
        { en: "It's nearby", te: "daggaragā undi", script: "దగ్గరగా ఉంది" },
        { en: "It's far", te: "chālā dūram", script: "చాలా దూరం" },
        { en: "Next to the temple", te: "gudi pakkana", script: "గుడి పక్కన" }
      ]}
    ],
    quiz: [
      { q: "How do you ask 'How far is it?'", opts: ["enta dūram?", "ekkaḍa undi?", "daggaragā undā?", "ekkaḍiki?"], a: 0 },
      { q: "How do you say 'Turn left'?", opts: ["eḍama vaipu tiragaṇḍi", "kuḍi vaipu tiragaṇḍi", "nērugā veḷḷaṇḍi", "venukki raṇḍi"], a: 0 },
      { q: "How do you say 'Go straight'?", opts: ["nērugā veḷḷaṇḍi", "kuḍiki", "eḍamaki", "venukki"], a: 0 },
      { q: "How do you say 'It's far'?", opts: ["daggaragā undi", "chālā dūram", "pakkana", "ekkaḍa"], a: 1 },
      { q: "How do you ask 'Where is the hotel?'", opts: ["hōṭalu ekkaḍa undi?", "hōṭalu enta?", "hōṭalu eppuḍu?", "hōṭalu evaru?"], a: 0 }
    ]
  },

  {
    day: 17,
    topic: "Transport",
    goal: "Take an auto, bus, train, taxi.",
    sections: [
      { type: "phrases", title: "Vehicles", items: [
        { en: "auto-rickshaw", te: "āṭō", script: "ఆటో" },
        { en: "bus", te: "bassu", script: "బస్సు" },
        { en: "train", te: "railu", script: "రైలు" },
        { en: "taxi / cab", te: "ṭyāksī", script: "టాక్సీ" },
        { en: "bike / scooter", te: "baiku", script: "బైకు" },
        { en: "airport", te: "vimānāśrayam", script: "విమానాశ్రయం" },
        { en: "station", te: "sṭēshanu", script: "స్టేషను" }
      ]},
      { type: "phrases", title: "At the auto/taxi", items: [
        { en: "Take me to ___", te: "nannu ___ ki tīsukoṇṭāru", script: "నన్ను ___ కి తీసుకొంటారు" },
        { en: "How much to ___?", te: "___ ki enta?", script: "___ కి ఎంత?" },
        { en: "Use the meter", te: "mīṭaru veyyaṇḍi", script: "మీటర్ వెయ్యండి" },
        { en: "Stop here", te: "ikkaḍa āpaṇḍi", script: "ఇక్కడ ఆపండి" },
        { en: "Wait for me", te: "nā kosam āgaṇḍi", script: "నా కోసం ఆగండి" },
        { en: "Drive slowly please", te: "mellagā naḍapaṇḍi", script: "మెల్లగా నడపండి" }
      ]},
      { type: "tip", body: "Auto drivers often refuse the meter. 'mīṭaru veyyaṇḍi' said firmly works ~70% of the time. Otherwise agree on a price BEFORE you sit." }
    ],
    quiz: [
      { q: "How do you say 'Stop here'?", opts: ["ikkaḍa āpaṇḍi", "nērugā veḷḷaṇḍi", "konchem āgaṇḍi", "venukki"], a: 0 },
      { q: "How do you say 'auto-rickshaw'?", opts: ["bassu", "āṭō", "railu", "ṭyāksī"], a: 1 },
      { q: "How do you ask 'How much to the airport?'", opts: ["vimānāśrayam ekkaḍa?", "vimānāśrayam ki enta?", "vimānāśrayam eppuḍu?", "vimānāśrayam bāgundi?"], a: 1 },
      { q: "How do you say 'Drive slowly please'?", opts: ["vēgaṅgā naḍapaṇḍi", "mellagā naḍapaṇḍi", "ikkaḍa āpaṇḍi", "nērugā veḷḷaṇḍi"], a: 1 },
      { q: "How do you say 'Use the meter'?", opts: ["mīṭaru veyyaṇḍi", "mīṭaru lēdu", "ikkaḍa āpaṇḍi", "nā kosam āgaṇḍi"], a: 0 }
    ]
  },

  {
    day: 18,
    topic: "Shopping",
    goal: "Browse, choose, and pay.",
    sections: [
      { type: "phrases", title: "In a shop", items: [
        { en: "How much is this?", te: "idi enta?", script: "ఇది ఎంత?" },
        { en: "That's too much", te: "chālā ekkuva", script: "చాలా ఎక్కువ" },
        { en: "Reduce a little", te: "konchem taggiṇchaṇḍi", script: "కొంచెం తగ్గించండి" },
        { en: "Last price?", te: "chivari dhara enta?", script: "చివరి ధర ఎంత?" },
        { en: "I'll take this", te: "nēnu idi tīsukuntānu", script: "నేను ఇది తీసుకుంటాను" },
        { en: "I don't want this", te: "nāku idi vaddu", script: "నాకు ఇది వద్దు" },
        { en: "Show me another", te: "marokati chūpiṇchaṇḍi", script: "మరొకటి చూపించండి" },
        { en: "Do you have a bag?", te: "sanchi undā?", script: "సంచి ఉందా?" }
      ]},
      { type: "phrases", title: "Sizes & quantities", items: [
        { en: "big", te: "pedda", script: "పెద్ద" },
        { en: "small", te: "chinna", script: "చిన్న" },
        { en: "more", te: "ekkuva", script: "ఎక్కువ" },
        { en: "less", te: "takkuva", script: "తక్కువ" },
        { en: "one kilo", te: "okka kilō", script: "ఒక కిలో" },
        { en: "half kilo", te: "ara kilō", script: "అర కిలో" }
      ]}
    ],
    quiz: [
      { q: "How do you ask 'How much is this?'", opts: ["idi enta?", "idi ēmīṭi?", "idi ekkaḍa?", "idi eppuḍu?"], a: 0 },
      { q: "How do you say 'Reduce a little'?", opts: ["chālā ekkuva", "konchem taggiṇchaṇḍi", "marokati", "chivari dhara"], a: 1 },
      { q: "How do you say 'I'll take this'?", opts: ["nēnu idi tīsukuntānu", "nāku idi vaddu", "idi enta?", "idi ekkaḍa?"], a: 0 },
      { q: "How do you say 'big'?", opts: ["chinna", "pedda", "ekkuva", "takkuva"], a: 1 },
      { q: "How do you ask 'Do you have a bag?'", opts: ["sanchi undā?", "sanchi ekkaḍa?", "sanchi enta?", "sanchi pedda"], a: 0 }
    ]
  },

  {
    day: 19,
    topic: "Money & Paying",
    goal: "Handle cash transactions confidently.",
    sections: [
      { type: "phrases", title: "Money basics", items: [
        { en: "money", te: "ḍabbu", script: "డబ్బు" },
        { en: "rupees", te: "rūpāyalu", script: "రూపాయలు" },
        { en: "change (coins)", te: "chillara", script: "చిల్లర" },
        { en: "I'll pay by card", te: "kārḍu-tō kaṭṭutānu", script: "కార్డుతో కట్టుతాను" },
        { en: "I'll pay cash", te: "naġadu-tō kaṭṭutānu", script: "నగదుతో కట్టుతాను" },
        { en: "Do you take UPI?", te: "UPI tīsukunṭārā?", script: "UPI తీసుకుంటారా?" }
      ]},
      { type: "phrases", title: "Common money phrases", items: [
        { en: "I don't have change", te: "nā daggara chillara lēdu", script: "నా దగ్గర చిల్లర లేదు" },
        { en: "Keep the change", te: "chillara mīrē tīsukōṇḍi", script: "చిల్లర మీరే తీసుకోండి" },
        { en: "Give me the receipt", te: "rasīdu ivvaṇḍi", script: "రసీదు ఇవ్వండి" },
        { en: "Is this the correct amount?", te: "idi sariga undā?", script: "ఇది సరిగా ఉందా?" }
      ]},
      { type: "tip", body: "UPI (Phone-Pe, Google Pay, Paytm) is everywhere in India. 'UPI tīsukunṭārā?' (do you take UPI?) saves you from running out of cash." }
    ],
    quiz: [
      { q: "How do you say 'money'?", opts: ["ḍabbu", "chillara", "rasīdu", "rūpāyalu"], a: 0 },
      { q: "How do you say 'I'll pay cash'?", opts: ["kārḍu-tō kaṭṭutānu", "naġadu-tō kaṭṭutānu", "UPI tīsukunṭārā?", "chillara lēdu"], a: 1 },
      { q: "How do you ask 'Do you take UPI?'", opts: ["UPI undā?", "UPI tīsukunṭārā?", "UPI ekkaḍa?", "UPI enta?"], a: 1 },
      { q: "How do you say 'Keep the change'?", opts: ["chillara lēdu", "chillara mīrē tīsukōṇḍi", "rasīdu ivvaṇḍi", "ḍabbu ivvaṇḍi"], a: 1 },
      { q: "How do you say 'Give me the receipt'?", opts: ["rasīdu ivvaṇḍi", "chillara ivvaṇḍi", "ḍabbu ivvaṇḍi", "billu ivvaṇḍi"], a: 0 }
    ]
  },

  {
    day: 20,
    topic: "Asking for Help",
    goal: "Get help in emergencies and small troubles.",
    sections: [
      { type: "phrases", title: "Emergencies", items: [
        { en: "Help!", te: "sahāyam!", script: "సహాయం!" },
        { en: "I'm lost", te: "nēnu tappipōyānu", script: "నేను తప్పిపోయాను" },
        { en: "Call the police", te: "pōlīsuni pilavaṇḍi", script: "పోలీసుని పిలవండి" },
        { en: "I need a doctor", te: "nāku ḍākṭaru kāvāli", script: "నాకు డాక్టర్ కావాలి" },
        { en: "I'm sick", te: "nāku oḍalu bāledu", script: "నాకు ఒళ్ళు బాగాలేదు" },
        { en: "Where is the hospital?", te: "āspatri ekkaḍa undi?", script: "ఆస్పత్రి ఎక్కడ ఉంది?" }
      ]},
      { type: "phrases", title: "Smaller troubles", items: [
        { en: "I lost my phone", te: "nā phōnu pōyindi", script: "నా ఫోను పోయింది" },
        { en: "I forgot", te: "marchipōyānu", script: "మర్చిపోయాను" },
        { en: "Can you help me?", te: "nāku sahāyam cheyyagalarā?", script: "నాకు సహాయం చేయగలరా?" },
        { en: "I need water", te: "nāku nīḷḷu kāvāli", script: "నాకు నీళ్ళు కావాలి" }
      ]}
    ],
    quiz: [
      { q: "How do you say 'I'm lost'?", opts: ["nēnu tappipōyānu", "marchipōyānu", "sahāyam!", "ḍākṭaru kāvāli"], a: 0 },
      { q: "How do you say 'I need a doctor'?", opts: ["nāku ḍākṭaru kāvāli", "nāku sahāyam kāvāli", "nāku nīḷḷu kāvāli", "nāku ākali"], a: 0 },
      { q: "How do you say 'Call the police'?", opts: ["sahāyam cheyyaṇḍi", "pōlīsuni pilavaṇḍi", "ḍākṭaru pilavaṇḍi", "tappipōyānu"], a: 1 },
      { q: "How do you ask 'Can you help me?'", opts: ["nāku sahāyam cheyyagalarā?", "nāku sahāyam vaddu", "ekkaḍa sahāyam?", "sahāyam undā?"], a: 0 },
      { q: "How do you say 'I'm sick'?", opts: ["nāku ākali", "nāku oḍalu bāledu", "nēnu tappipōyānu", "nāku dāham"], a: 1 }
    ]
  },

  {
    day: 21,
    topic: "Week 3 Review",
    goal: "All travel and shopping situations.",
    sections: [
      { type: "intro", body: "Three weeks. You can now navigate streets, shops, transport, and emergencies. From here on, we go deeper into proper conversations." },
      { type: "dialog", title: "Auto + shop run", lines: [
        { who: "You",    en: "Auto! Take me to the market.", te: "āṭō! nannu bajāruki tīsukoṇṭāru?" },
        { who: "Driver", en: "100 rupees.", te: "vanda rūpāyalu." },
        { who: "You",    en: "Use the meter please.", te: "mīṭaru veyyaṇḍi." },
        { who: "Driver", en: "Okay, get in.", te: "sare, ekkaṇḍi." },
        { who: "You",    en: "(At market) How much is this?", te: "idi enta?" },
        { who: "Seller", en: "200 rupees.", te: "reṇḍu vandalu." },
        { who: "You",    en: "Too much. Reduce a little.", te: "chālā ekkuva. konchem taggiṇchaṇḍi." },
        { who: "Seller", en: "150, last price.", te: "vanda yābhai, chivari dhara." },
        { who: "You",    en: "Okay, I'll take it.", te: "sare, tīsukuntānu." }
      ]}
    ],
    quiz: [
      { q: "How do you ask 'How much to the market?'", opts: ["bajāru ekkaḍa?", "bajāruki enta?", "bajāru eppuḍu?", "bajāruki veḷḍām"], a: 1 },
      { q: "How do you say 'Reduce a little'?", opts: ["chillara lēdu", "konchem taggiṇchaṇḍi", "ekkuva", "takkuva"], a: 1 },
      { q: "How do you say 'I'm lost'?", opts: ["marchipōyānu", "nēnu tappipōyānu", "nēnu vastunnānu", "nēnu āgānu"], a: 1 },
      { q: "How do you ask 'Where is the hospital?'", opts: ["āspatri eppuḍu?", "āspatri ekkaḍa undi?", "āspatri evaru?", "āspatri enta?"], a: 1 },
      { q: "How do you say 'Turn right'?", opts: ["eḍama vaipu tiragaṇḍi", "kuḍi vaipu tiragaṇḍi", "nērugā veḷḷaṇḍi", "venukki"], a: 1 }
    ]
  },

  // ============ WEEK 4: REAL CONVERSATIONS ============
  {
    day: 22,
    topic: "Work & Study",
    goal: "Tell people what you do.",
    sections: [
      { type: "phrases", title: "About work", items: [
        { en: "What do you do?", te: "mīru ēmi chēstāru?", script: "మీరు ఏమి చేస్తారు?" },
        { en: "I work", te: "nēnu pani chēstānu", script: "నేను పని చేస్తాను" },
        { en: "I'm a student", te: "nēnu vidyārthi", script: "నేను విద్యార్థి" },
        { en: "I'm a teacher", te: "nēnu upādhyāyuḍini", script: "నేను ఉపాధ్యాయుడిని" },
        { en: "I'm an engineer", te: "nēnu iñjinīr-ni", script: "నేను ఇంజినీర్‌ని" },
        { en: "I'm a doctor", te: "nēnu ḍākṭaruni", script: "నేను డాక్టర్‌ని" },
        { en: "I work in IT", te: "nēnu IT lō pani chēstānu", script: "నేను ఐటీలో పని చేస్తాను" },
        { en: "I'm retired", te: "nēnu retire ayyānu", script: "నేను రిటైర్ అయ్యాను" }
      ]},
      { type: "phrases", title: "Workplace words", items: [
        { en: "office", te: "āphisu", script: "ఆఫీసు" },
        { en: "company", te: "kampenī", script: "కంపెనీ" },
        { en: "boss", te: "yajamāni", script: "యజమాని" },
        { en: "colleague", te: "sahōdyōgi", script: "సహోద్యోగి" }
      ]}
    ],
    quiz: [
      { q: "How do you ask 'What do you do?'", opts: ["mīru ēmi chēstāru?", "mīru evaru?", "mīru ekkaḍa?", "mī pēru?"], a: 0 },
      { q: "How do you say 'I'm a student'?", opts: ["nēnu vidyārthi", "nēnu pani chēstānu", "nēnu ḍākṭaruni", "nēnu upādhyāyuḍini"], a: 0 },
      { q: "How do you say 'I work in IT'?", opts: ["nēnu ḍākṭaruni", "nēnu IT lō pani chēstānu", "nēnu yajamāni", "nēnu āphisu"], a: 1 },
      { q: "How do you say 'office'?", opts: ["kampenī", "āphisu", "illu", "gadi"], a: 1 },
      { q: "How do you say 'I'm a teacher'?", opts: ["nēnu ḍākṭaruni", "nēnu upādhyāyuḍini", "nēnu vidyārthi", "nēnu iñjinīr-ni"], a: 1 }
    ]
  },

  {
    day: 23,
    topic: "Likes & Dislikes",
    goal: "Express opinions and preferences.",
    sections: [
      { type: "phrases", title: "Liking things", items: [
        { en: "I like Telugu food", te: "nāku telugu food ishṭam", script: "నాకు తెలుగు ఫుడ్ ఇష్టం" },
        { en: "I love music", te: "nāku saṅgītam ishṭam", script: "నాకు సంగీతం ఇష్టం" },
        { en: "I really like ___", te: "nāku ___ chālā ishṭam", script: "నాకు ___ చాలా ఇష్టం" },
        { en: "I hate ___", te: "nāku ___ ishṭam lēdu", script: "నాకు ___ ఇష్టం లేదు" }
      ]},
      { type: "phrases", title: "Asking", items: [
        { en: "Do you like ___?", te: "mīku ___ ishṭamā?", script: "మీకు ___ ఇష్టమా?" },
        { en: "What do you like?", te: "mīku ēmi ishṭam?", script: "మీకు ఏమి ఇష్టం?" },
        { en: "Which one is best?", te: "ēdi best?", script: "ఏది బెస్ట్?" }
      ]},
      { type: "phrases", title: "Common opinions", items: [
        { en: "Very nice", te: "chālā bāgundi", script: "చాలా బాగుంది" },
        { en: "Not bad", te: "parvāledu", script: "పర్వాలేదు" },
        { en: "Boring", te: "borgā undi", script: "బోర్‌గా ఉంది" },
        { en: "Excellent", te: "adbhutam", script: "అద్భుతం" }
      ]}
    ],
    quiz: [
      { q: "How do you say 'I like Telugu food'?", opts: ["nāku telugu food ishṭam", "nāku telugu food vaddu", "nāku telugu food kāvāli", "nāku telugu food teliyadu"], a: 0 },
      { q: "How do you say 'I don't like it'?", opts: ["nāku ishṭam", "nāku ishṭam lēdu", "nāku kāvāli", "nāku vaddu"], a: 1 },
      { q: "How do you ask 'Do you like music?'", opts: ["mīku saṅgītam ishṭamā?", "mīku saṅgītam kāvālā?", "mīku saṅgītam teliyadā?", "saṅgītam ekkaḍa?"], a: 0 },
      { q: "How do you say 'Boring'?", opts: ["chālā bāgundi", "adbhutam", "borgā undi", "ishṭam lēdu"], a: 2 },
      { q: "How do you say 'Excellent'?", opts: ["bāgundi", "adbhutam", "borgā undi", "parvāledu"], a: 1 }
    ]
  },

  {
    day: 24,
    topic: "Feelings",
    goal: "Say how you feel.",
    sections: [
      { type: "phrases", title: "Feelings", items: [
        { en: "I'm happy", te: "nēnu santhōshamgā unnānu", script: "నేను సంతోషంగా ఉన్నాను" },
        { en: "I'm sad", te: "nēnu duḥkhamgā unnānu", script: "నేను దుఃఖంగా ఉన్నాను" },
        { en: "I'm tired", te: "nēnu alasipōyānu", script: "నేను అలసిపోయాను" },
        { en: "I'm excited", te: "nēnu uthsāhamgā unnānu", script: "నేను ఉత్సాహంగా ఉన్నాను" },
        { en: "I'm angry", te: "nāku kōpam vacchindi", script: "నాకు కోపం వచ్చింది" },
        { en: "I'm scared", te: "nāku bhayam ga undi", script: "నాకు భయంగా ఉంది" },
        { en: "I'm bored", te: "nāku borgā undi", script: "నాకు బోర్‌గా ఉంది" },
        { en: "I'm proud", te: "nāku garvam undi", script: "నాకు గర్వం ఉంది" }
      ]},
      { type: "phrases", title: "Asking others", items: [
        { en: "Why are you sad?", te: "mīru enduku duḥkhamgā unnāru?", script: "మీరు ఎందుకు దుఃఖంగా ఉన్నారు?" },
        { en: "Don't worry", te: "chinta cheyyakaṇḍi", script: "చింత చేయకండి" },
        { en: "Are you okay?", te: "mīru bāgunnārā?", script: "మీరు బాగున్నారా?" }
      ]}
    ],
    quiz: [
      { q: "How do you say 'I'm happy'?", opts: ["nēnu santhōshamgā unnānu", "nēnu duḥkhamgā unnānu", "nēnu alasipōyānu", "nāku kōpam vacchindi"], a: 0 },
      { q: "How do you say 'I'm angry'?", opts: ["nāku bhayam ga undi", "nāku kōpam vacchindi", "nāku garvam undi", "nāku borgā undi"], a: 1 },
      { q: "How do you say 'Don't worry'?", opts: ["chinta cheyyakaṇḍi", "bhayam vaddu", "kōpam vaddu", "santhōsham"], a: 0 },
      { q: "How do you say 'I'm scared'?", opts: ["nāku bhayam ga undi", "nāku kōpam vacchindi", "nēnu duḥkhamgā unnānu", "nēnu alasipōyānu"], a: 0 },
      { q: "How do you ask 'Are you okay?'", opts: ["mīru bāgunnārā?", "mīru evaru?", "mīru ekkaḍa?", "mīru ēmīṭi?"], a: 0 }
    ]
  },

  {
    day: 25,
    topic: "Past — What I Did",
    goal: "Talk about yesterday and last week.",
    sections: [
      { type: "phrases", title: "Past actions (I-form)", items: [
        { en: "I ate", te: "nēnu tinnānu", script: "నేను తిన్నాను" },
        { en: "I drank", te: "nēnu tāgānu", script: "నేను తాగాను" },
        { en: "I went", te: "nēnu veḷḷānu", script: "నేను వెళ్ళాను" },
        { en: "I came", te: "nēnu vacchānu", script: "నేను వచ్చాను" },
        { en: "I saw", te: "nēnu chūshānu", script: "నేను చూశాను" },
        { en: "I did", te: "nēnu chēsānu", script: "నేను చేశాను" },
        { en: "I slept", te: "nēnu pāḍukunnānu", script: "నేను పడుకున్నాను" },
        { en: "I talked", te: "nēnu māṭlāḍānu", script: "నేను మాట్లాడాను" }
      ]},
      { type: "phrases", title: "Putting it together", items: [
        { en: "Yesterday I went to office", te: "ninna nēnu āphisuki veḷḷānu", script: "నిన్న నేను ఆఫీసుకి వెళ్ళాను" },
        { en: "I ate rice", te: "nēnu annam tinnānu", script: "నేను అన్నం తిన్నాను" },
        { en: "I called you", te: "nēnu mīku phōnu chēsānu", script: "నేను మీకు ఫోను చేశాను" }
      ]},
      { type: "tip", body: "All Telugu past tense I-forms end in '-ānu' or '-nānu'. Memorise 5–6 common ones and you can talk about any past event." }
    ],
    quiz: [
      { q: "How do you say 'I went'?", opts: ["nēnu vacchānu", "nēnu veḷḷānu", "nēnu chūshānu", "nēnu chēsānu"], a: 1 },
      { q: "How do you say 'I ate'?", opts: ["nēnu tinnānu", "nēnu tāgānu", "nēnu chūshānu", "nēnu māṭlāḍānu"], a: 0 },
      { q: "How do you say 'I came'?", opts: ["nēnu veḷḷānu", "nēnu vacchānu", "nēnu vastānu", "nēnu unnānu"], a: 1 },
      { q: "How do you say 'Yesterday I went to office'?", opts: ["rēpu nēnu āphisuki vastānu", "ninna nēnu āphisuki veḷḷānu", "īrōju nēnu āphisuki veḷutunnānu", "ninna nēnu illuki veḷḷānu"], a: 1 },
      { q: "How do you say 'I called you'?", opts: ["nēnu mīku phōnu chēsānu", "nēnu mīku phōnu chēstānu", "mīku phōnu undi", "mīku phōnu kāvāli"], a: 0 }
    ]
  },

  {
    day: 26,
    topic: "Future — What I'll Do",
    goal: "Talk about plans.",
    sections: [
      { type: "phrases", title: "Future / habitual I-form", items: [
        { en: "I'll go", te: "nēnu veḷtānu", script: "నేను వెళ్తాను" },
        { en: "I'll come", te: "nēnu vastānu", script: "నేను వస్తాను" },
        { en: "I'll eat", te: "nēnu tiṇṭānu", script: "నేను తింటాను" },
        { en: "I'll see / I'll look", te: "nēnu chūstānu", script: "నేను చూస్తాను" },
        { en: "I'll do it", te: "nēnu chēstānu", script: "నేను చేస్తాను" },
        { en: "I'll call you", te: "nēnu mīku phōnu chēstānu", script: "నేను మీకు ఫోను చేస్తాను" },
        { en: "I won't go", te: "nēnu veḷḷanu", script: "నేను వెళ్ళను" },
        { en: "I won't eat", te: "nēnu tinanu", script: "నేను తినను" }
      ]},
      { type: "phrases", title: "Plans", items: [
        { en: "Tomorrow I'll go to Hyderabad", te: "rēpu hyderābāḍ veḷtānu", script: "రేపు హైదరాబాద్ వెళ్తాను" },
        { en: "Next week I'll come", te: "vachhe vāram vastānu", script: "వచ్చే వారం వస్తాను" },
        { en: "What will you do?", te: "mīru ēmi chēstāru?", script: "మీరు ఏమి చేస్తారు?" }
      ]}
    ],
    quiz: [
      { q: "How do you say 'I'll come'?", opts: ["nēnu vacchānu", "nēnu vastānu", "nēnu veḷtānu", "nēnu unnānu"], a: 1 },
      { q: "How do you say 'I'll eat'?", opts: ["nēnu tinnānu", "nēnu tiṇṭānu", "nēnu tāgānu", "nēnu chēstānu"], a: 1 },
      { q: "How do you say 'I won't go'?", opts: ["nēnu veḷḷānu", "nēnu veḷtānu", "nēnu veḷḷanu", "nēnu vastānu"], a: 2 },
      { q: "How do you say 'Tomorrow I'll go to Hyderabad'?", opts: ["ninna hyderābāḍ veḷḷānu", "rēpu hyderābāḍ veḷtānu", "īrōju hyderābāḍ veḷutunnānu", "rēpu hyderābāḍ vastānu"], a: 1 },
      { q: "How do you say 'I'll call you'?", opts: ["nēnu mīku phōnu chēsānu", "nēnu mīku phōnu chēstānu", "nēnu mīku phōnu undi", "mīku phōnu kāvāli"], a: 1 }
    ]
  },

  {
    day: 27,
    topic: "Hobbies & Free Time",
    goal: "Talk about what you enjoy doing.",
    sections: [
      { type: "phrases", title: "Common hobbies", items: [
        { en: "I read books", te: "nēnu pustakālu chaduvutānu", script: "నేను పుస్తకాలు చదువుతాను" },
        { en: "I watch movies", te: "nēnu cinemālu chūstānu", script: "నేను సినిమాలు చూస్తాను" },
        { en: "I listen to music", te: "nēnu pāṭalu vintānu", script: "నేను పాటలు వింటాను" },
        { en: "I play cricket", te: "nēnu cricket āḍtānu", script: "నేను క్రికెట్ ఆడతాను" },
        { en: "I cook", te: "nēnu vanṭa chēstānu", script: "నేను వంట చేస్తాను" },
        { en: "I travel", te: "nēnu prayāṇam chēstānu", script: "నేను ప్రయాణం చేస్తాను" }
      ]},
      { type: "phrases", title: "Asking", items: [
        { en: "What do you do in your free time?", te: "khāḷī samayamlō ēmi chēstāru?", script: "ఖాళీ సమయంలో ఏమి చేస్తారు?" },
        { en: "Do you play cricket?", te: "mīru cricket āḍutārā?", script: "మీరు క్రికెట్ ఆడుతారా?" },
        { en: "Have you seen this movie?", te: "ī cinemā chūshārā?", script: "ఈ సినిమా చూశారా?" }
      ]}
    ],
    quiz: [
      { q: "How do you say 'I watch movies'?", opts: ["nēnu cinemālu chūstānu", "nēnu pāṭalu vintānu", "nēnu pustakālu chaduvutānu", "nēnu vanṭa chēstānu"], a: 0 },
      { q: "How do you say 'I read books'?", opts: ["nēnu cinemālu chūstānu", "nēnu pustakālu chaduvutānu", "nēnu pāṭalu vintānu", "nēnu cricket āḍtānu"], a: 1 },
      { q: "How do you ask 'Do you play cricket?'", opts: ["mīru cricket āḍutārā?", "mīku cricket ishṭamā?", "mīru cricket chūstārā?", "cricket ekkaḍa?"], a: 0 },
      { q: "How do you say 'I cook'?", opts: ["nēnu vanṭa chēstānu", "nēnu pāṭalu vintānu", "nēnu prayāṇam chēstānu", "nēnu cinemālu chūstānu"], a: 0 },
      { q: "How do you say 'I travel'?", opts: ["nēnu cricket āḍtānu", "nēnu prayāṇam chēstānu", "nēnu cinemālu chūstānu", "nēnu pustakālu chaduvutānu"], a: 1 }
    ]
  },

  {
    day: 28,
    topic: "On The Phone",
    goal: "Handle a quick phone call.",
    sections: [
      { type: "phrases", title: "Starting", items: [
        { en: "Hello (on phone)", te: "halō", script: "హలో" },
        { en: "Who is this?", te: "evaru?", script: "ఎవరు?" },
        { en: "This is ___", te: "nēnu ___ ni", script: "నేను ___ ని" },
        { en: "Speak louder", te: "peddagā māṭlāḍaṇḍi", script: "పెద్దగా మాట్లాడండి" },
        { en: "I can't hear you", te: "mīru vinabaḍaṭam lēdu", script: "మీరు వినబడటం లేదు" }
      ]},
      { type: "phrases", title: "Common phone phrases", items: [
        { en: "Hold on a minute", te: "konchem āgaṇḍi", script: "కొంచెం ఆగండి" },
        { en: "I'll call back later", te: "tarvāta phōnu chēstānu", script: "తర్వాత ఫోను చేస్తాను" },
        { en: "Send me a message", te: "nāku messāj paṅpiṇchaṇḍi", script: "నాకు మెసేజ్ పంపించండి" },
        { en: "What's your number?", te: "mī namberu enta?", script: "మీ నంబర్ ఎంత?" }
      ]}
    ],
    quiz: [
      { q: "How do you ask 'Who is this?' (on the phone)?", opts: ["evaru?", "ekkaḍa?", "ēmīṭi?", "eppuḍu?"], a: 0 },
      { q: "How do you say 'I'll call back later'?", opts: ["tarvāta phōnu chēstānu", "ippuḍu phōnu chēsānu", "phōnu lēdu", "phōnu kāvāli"], a: 0 },
      { q: "How do you say 'Send me a message'?", opts: ["messāj kāvāli", "nāku messāj paṅpiṇchaṇḍi", "messāj lēdu", "phōnu chēyandi"], a: 1 },
      { q: "How do you say 'Speak louder'?", opts: ["mellagā māṭlāḍaṇḍi", "peddagā māṭlāḍaṇḍi", "konchem āgaṇḍi", "vinabaḍaṭam lēdu"], a: 1 },
      { q: "How do you say 'I can't hear you'?", opts: ["mīru vinabaḍaṭam lēdu", "peddagā māṭlāḍaṇḍi", "mīru evaru?", "konchem āgaṇḍi"], a: 0 }
    ]
  },

  {
    day: 29,
    topic: "Polite Conversation Glue",
    goal: "Make speech flow naturally.",
    sections: [
      { type: "phrases", title: "Filler & connectors", items: [
        { en: "and", te: "mariyu / -kūḍā", script: "మరియు" },
        { en: "but", te: "kānī", script: "కానీ" },
        { en: "because", te: "endukanṭē", script: "ఎందుకంటే" },
        { en: "so / therefore", te: "kābaṭṭi", script: "కాబట్టి" },
        { en: "for example", te: "udāharaṇaki", script: "ఉదాహరణకి" },
        { en: "I think", te: "nāku anipistundi", script: "నాకు అనిపిస్తుంది" }
      ]},
      { type: "phrases", title: "Polite asks", items: [
        { en: "Please", te: "dayachēsi", script: "దయచేసి" },
        { en: "Excuse me sir", te: "kṣaminchaṇḍi-aṇḍi", script: "క్షమించండి అండి" },
        { en: "Could you...", te: "mīru ... cheyyagalarā?", script: "మీరు ... చేయగలరా?" },
        { en: "If possible", te: "vīlaite", script: "వీలైతే" }
      ]},
      { type: "tip", body: "Sprinkling 'aṇḍi' at the end of any phrase makes it polite. 'sare aṇḍi' (okay sir/madam), 'avunu aṇḍi' (yes sir/madam). Use freely with strangers and elders." }
    ],
    quiz: [
      { q: "How do you say 'but'?", opts: ["mariyu", "kānī", "endukanṭē", "kābaṭṭi"], a: 1 },
      { q: "How do you say 'because'?", opts: ["kānī", "endukanṭē", "kābaṭṭi", "mariyu"], a: 1 },
      { q: "How do you say 'Please'?", opts: ["dayachēsi", "kṣaminchaṇḍi", "ivvaṇḍi", "raṇḍi"], a: 0 },
      { q: "How do you say 'I think'?", opts: ["nāku ishṭam", "nāku anipistundi", "nāku telusu", "nāku teliyadu"], a: 1 },
      { q: "How do you say 'for example'?", opts: ["kābaṭṭi", "endukanṭē", "udāharaṇaki", "mariyu"], a: 2 }
    ]
  },

  {
    day: 30,
    topic: "Putting It All Together",
    goal: "Hold a real conversation top-to-bottom.",
    sections: [
      { type: "intro", body: "Congratulations on completing all 30 days! You now have enough Telugu to: greet, introduce yourself, order food, ask directions, shop, take transport, talk about family, hobbies, work, feelings, and handle simple phone calls. Real fluency comes from USE, not study — find a Telugu speaker and talk." },
      { type: "dialog", title: "A full small conversation", lines: [
        { who: "A", en: "Hello! How are you?", te: "namaskāram! mīru bāgunnārā?" },
        { who: "B", en: "I'm well. And you?", te: "bāgunnānu. mīrū?" },
        { who: "A", en: "I'm fine. What's your name?", te: "bāgunnānu. mī pēru ēmiṭi?" },
        { who: "B", en: "My name is Anil. What do you do?", te: "nā pēru anil. mīru ēmi chēstāru?" },
        { who: "A", en: "I'm a student. Where are you from?", te: "nēnu vidyārthi. mīru ekkaḍi nuṇḍi?" },
        { who: "B", en: "I'm from Vijayawada. Do you like Telugu food?", te: "nēnu vijayawāḍa nuṇḍi. mīku telugu food ishṭamā?" },
        { who: "A", en: "I love it! Especially biryani.", te: "nāku chālā ishṭam! mukhyangā biryāni." },
        { who: "B", en: "Me too. Let's eat sometime!", te: "nēnu kūḍā. eppuḍainā kalisi tindām!" },
        { who: "A", en: "Sure. Call me. My number is...", te: "sare. nāku phōnu cheyyaṇḍi. nā namberu..." },
        { who: "B", en: "Okay, see you later.", te: "sare, malli kalusukundām." }
      ]},
      { type: "tip", body: "What's next: (1) Watch Telugu films with subtitles (Tollywood is massive). (2) Find a language partner on Tandem or HelloTalk. (3) Speak with shopkeepers, drivers — they LOVE when foreigners try. Even broken Telugu wins instant warmth." }
    ],
    quiz: [
      { q: "How do you say 'How are you?' politely?", opts: ["mīru bāgunnārā?", "mīru evaru?", "mīru ekkaḍa?", "mī pēru ēmiṭi?"], a: 0 },
      { q: "How do you say 'I'm a student'?", opts: ["nēnu vidyārthi", "nēnu upādhyāyuḍini", "nēnu ḍākṭaruni", "nēnu pani chēstānu"], a: 0 },
      { q: "How do you say 'I love it'?", opts: ["nāku ishṭam lēdu", "nāku chālā ishṭam", "nāku kāvāli", "nāku teliyadu"], a: 1 },
      { q: "How do you say 'See you later'?", opts: ["selavu", "malli kalusukundām", "namaskāram", "dhanyavādālu"], a: 1 },
      { q: "How do you ask 'What do you do?'", opts: ["mīru ēmi chēstāru?", "mīru ekkaḍa?", "mīru evaru?", "mīru eppuḍu?"], a: 0 },
      { q: "How do you say 'I'll call you'?", opts: ["nēnu mīku phōnu chēsānu", "nēnu mīku phōnu chēstānu", "phōnu undi", "phōnu lēdu"], a: 1 },
      { q: "How do you say 'I went yesterday'?", opts: ["rēpu veḷtānu", "ninna veḷḷānu", "īrōju veḷutunnānu", "veḷḍām"], a: 1 },
      { q: "How do you say 'Thank you'?", opts: ["dhanyavādālu", "parvāledu", "selavu", "namaskāram"], a: 0 }
    ]
  }
];

// Build phrasebook from lessons (grouped by week)
const PHRASEBOOK = (() => {
  const groups = [
    { cat: "Week 1 — Greetings & Self",   range: [1, 7] },
    { cat: "Week 2 — Daily Life",         range: [8, 14] },
    { cat: "Week 3 — Out & About",        range: [15, 21] },
    { cat: "Week 4 — Real Conversations", range: [22, 30] }
  ];
  return groups.map(g => {
    const items = [];
    LESSONS.slice(g.range[0] - 1, g.range[1]).forEach(l => {
      l.sections.forEach(s => {
        if (s.type === "phrases") {
          s.items.forEach(it => items.push({ en: it.en, te: it.te, script: it.script }));
        }
      });
    });
    return { cat: g.cat, items };
  });
})();
