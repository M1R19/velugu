// Surprise envelopes — small dopamine rewards that drop ~1 in 3 sessions.
// Mix of Telugu proverbs, Tollywood quotes, cultural notes, and tiny delights.

const TREASURES = [
  // ---------- Proverbs ----------
  {
    id: "prov-1",
    type: "proverb",
    icon: "🌿",
    title: "Telugu proverb",
    te: "ఆకలి రుచి ఎరుగదు",
    tr: "ākali ruci erugadu",
    en: "Hunger doesn't know taste.",
    note: "When you're hungry, even simple food is delicious."
  },
  {
    id: "prov-2",
    type: "proverb",
    icon: "🌿",
    title: "Telugu proverb",
    te: "మాట్లాడేకన్నా మౌనం మేలు",
    tr: "māṭlāḍēkanā maunaṁ mēlu",
    en: "Silence is better than speech.",
    note: "Sometimes the wisest words are unspoken."
  },
  {
    id: "prov-3",
    type: "proverb",
    icon: "🌿",
    title: "Telugu proverb",
    te: "చేసుకున్నవారికి చేసుకున్నంత",
    tr: "chēsukunnavāriki chēsukunnanta",
    en: "You reap what you sow.",
    note: "Effort and patience grow into rewards."
  },
  {
    id: "prov-4",
    type: "proverb",
    icon: "🌿",
    title: "Telugu proverb",
    te: "నీళ్ళు తాగితే నిప్పులు చల్లారతాయి",
    tr: "nīḷḷu tāgitē nippulu callārutāyi",
    en: "Even fire cools when given water.",
    note: "Anger softens with patience and small kindness."
  },
  {
    id: "prov-5",
    type: "proverb",
    icon: "🌿",
    title: "Telugu proverb",
    te: "చిన్నది చిన్నదేగా అనుకుంటే పెద్దది చిన్నదిగానే ఉంటుంది",
    tr: "chinnadi chinnadēgā anukunṭē peddadi chinnadigānē uṇṭundi",
    en: "If you call small things small, the big stays small too.",
    note: "Pay attention to small wins — they're how everything grows."
  },

  // ---------- Tollywood / film quotes ----------
  {
    id: "film-1",
    type: "film",
    icon: "🎬",
    title: "From a beloved film",
    te: "మన పని మనం చేస్తే ఫలితం దానంతటదే వస్తుంది",
    tr: "mana pani manaṁ chēstē phalitaṁ dānantaṭadē vastundi",
    en: "Do your work, and results come on their own.",
    note: "A line every Telugu film hero says at least once."
  },
  {
    id: "film-2",
    type: "film",
    icon: "🎬",
    title: "Tollywood classic",
    te: "నేను చేస్తే అదొక స్టైల్",
    tr: "nēnu chēstē adoka style",
    en: "When I do it, that's a style.",
    note: "The most quoted swagger line in Telugu cinema."
  },
  {
    id: "film-3",
    type: "film",
    icon: "🎬",
    title: "From the silver screen",
    te: "మన ఇంట్లో పెళ్ళి అంటే అది పండగే",
    tr: "mana iṇṭlō peḷḷi anṭē adi paṇḍagē",
    en: "A wedding in our family is a festival.",
    note: "Heard at every Telugu wedding reception."
  },

  // ---------- Cultural notes ----------
  {
    id: "cult-1",
    type: "culture",
    icon: "🪔",
    title: "About diyas",
    te: "దీపం",
    tr: "dīpaṁ",
    en: "Diya / oil lamp",
    note: "Telugu families light diyas every evening at sunset — a daily ritual called sandhya dīpaṁ. Diwali multiplies it by hundreds."
  },
  {
    id: "cult-2",
    type: "culture",
    icon: "🌾",
    title: "About Ugadi",
    te: "ఉగాది",
    tr: "ugādi",
    en: "Telugu New Year",
    note: "Spring festival, usually in March or April. Families eat a six-flavor chutney representing the full taste of a year ahead."
  },
  {
    id: "cult-3",
    type: "culture",
    icon: "🍛",
    title: "About biryani",
    te: "హైదరాబాదీ బిర్యానీ",
    tr: "haidarābādī biryānī",
    en: "Hyderabadi biryani",
    note: "Slow-cooked rice with marinated meat and saffron — Hyderabad invented it. Asking 'spicy or mild?' is part of every order."
  },
  {
    id: "cult-4",
    type: "culture",
    icon: "💃",
    title: "About Kuchipudi",
    te: "కూచిపూడి",
    tr: "kūchipūḍi",
    en: "Kuchipudi dance",
    note: "Classical Telugu dance form, ~500 years old. Named after the village where it was born."
  },
  {
    id: "cult-5",
    type: "culture",
    icon: "🎬",
    title: "About Tollywood",
    te: "టాలీవుడ్",
    tr: "ṭālīwuḍ",
    en: "Telugu cinema",
    note: "Bigger than Bollywood by ticket sales. Hyderabad's Ramoji Film City is the largest film studio complex in the world."
  },

  // ---------- Tiny delights ----------
  {
    id: "fact-1",
    type: "fact",
    icon: "✨",
    title: "Did you know?",
    te: "తెలుగు",
    tr: "telugu",
    en: "Telugu",
    note: "Telugu was officially declared a classical language by the Indian government in 2008. The earliest inscriptions are from the 1st century BC."
  },
  {
    id: "fact-2",
    type: "fact",
    icon: "✨",
    title: "Italian of the East",
    te: "తెలుగు",
    tr: "telugu",
    en: "Telugu",
    note: "Niccolò da Conti, a 15th-century Italian traveller, called Telugu 'the Italian of the East' because almost every word ends in a vowel — making it sing."
  },
  {
    id: "fact-3",
    type: "fact",
    icon: "✨",
    title: "By the numbers",
    te: "95 మిలియన్లు",
    tr: "95 millionlu",
    en: "95 million",
    note: "That's roughly how many Telugu speakers there are — more than French, German, or Italian speakers worldwide."
  },
  {
    id: "fact-4",
    type: "fact",
    icon: "🌶️",
    title: "Chilli capital",
    te: "గుంటూరు",
    tr: "guṇṭūru",
    en: "Guntur",
    note: "The Guntur district produces about 30% of India's chillies. Telugu food is famously spicy — that's why."
  },

  // ---------- Compliments / pep talks ----------
  {
    id: "pep-1",
    type: "pep",
    icon: "🌟",
    title: "A small note",
    te: "మీరు బాగా చేస్తున్నారు",
    tr: "mīru bāgā chēstunnāru",
    en: "You're doing well.",
    note: "Said by every Telugu grandparent to every grandchild ever. Now it's your turn to hear it."
  },
  {
    id: "pep-2",
    type: "pep",
    icon: "🌟",
    title: "A wish for you",
    te: "మీ ప్రయాణం వెలుగుగా ఉండాలి",
    tr: "mī prayāṇaṁ velugugā uṇḍāli",
    en: "May your journey be bright.",
    note: "A traditional Telugu farewell blessing. Take it with you today."
  },
  {
    id: "pep-3",
    type: "pep",
    icon: "🌟",
    title: "From Anu",
    te: "మీరు ఇప్పటికే చాలా దూరం వచ్చారు",
    tr: "mīru ippaṭikē chālā dūram vacchāru",
    en: "You've already come a long way.",
    note: "Even one Telugu phrase is more than you knew last week. Keep going."
  }
];
