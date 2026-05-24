// Branching scenario simulations.
// Each turn is either a NPC line (auto-advance) or a PLAYER choice.
// Player choices each carry their own Telugu line that the user "says".

const SCENARIOS = [
  {
    id: "chai-stall",
    title: "Morning chai",
    location: "Ravi's stall · 7:30am",
    icon: "☕",
    desc: "Your first stop. Order tea, ask the price, leave with a smile.",
    npc: { name: "Ravi anna", initial: "ర", color: "#7DA88A" },
    estMinutes: 2,
    turns: [
      {
        type: "npc",
        en: "Welcome, sir! Tea or coffee?",
        te: "swāgatam! chai-ā kāphī-ā?",
        script: "స్వాగతం! చాయా కాఫీయా?"
      },
      {
        type: "choice",
        prompt: "Order tea.",
        options: [
          { en: "One tea, please.",        te: "okka chai ivvaṇḍi",      script: "ఒక చాయ్ ఇవ్వండి",     reaction: "okay", next: 2 },
          { en: "Two teas.",               te: "reṇḍu chai",              script: "రెండు చాయ్",          reaction: "okay", next: 2 },
          { en: "Coffee, please.",         te: "kāphī ivvaṇḍi",           script: "కాఫీ ఇవ్వండి",        reaction: "switch-coffee", next: 2 }
        ]
      },
      {
        type: "npc",
        en: "Sugar normal or less?",
        te: "chakkera mamūlā takkuvā?",
        script: "చక్కెర మామూలా తక్కువా?"
      },
      {
        type: "choice",
        prompt: "Tell him your preference.",
        options: [
          { en: "Less sugar, please.", te: "chakkera takkuva", script: "చక్కెర తక్కువ", reaction: "good", next: 4 },
          { en: "Normal is fine.",     te: "mamūlu sare",       script: "మామూలు సరే",     reaction: "good", next: 4 },
          { en: "No sugar.",           te: "chakkera vaddu",    script: "చక్కెర వద్దు",   reaction: "surprise-nosugar", next: 4 }
        ]
      },
      {
        type: "npc",
        en: "Here you go. Ten rupees.",
        te: "idigō. padi rūpāyalu.",
        script: "ఇదిగో. పది రూపాయలు."
      },
      {
        type: "choice",
        prompt: "Pay and say something nice.",
        options: [
          { en: "Here. Thank you!",         te: "idigō. dhanyavādālu!",     script: "ఇదిగో. ధన్యవాదాలు!",   reaction: "end-warm",  next: 6 },
          { en: "Keep the change.",         te: "chillara mīrē uṇchukōṇḍi", script: "చిల్లర మీరే ఉంచుకోండి", reaction: "end-tip",   next: 6 },
          { en: "Do you take UPI?",         te: "UPI tīsukunṭārā?",         script: "UPI తీసుకుంటారా?",     reaction: "end-upi",   next: 6 }
        ]
      },
      {
        type: "npc",
        en: "Come again, anytime. The tea will be ready.",
        te: "eppuḍainā raṇḍi. chai siddhamgā uṇṭundi.",
        script: "ఎప్పుడైనా రండి. చాయ్ సిద్ధంగా ఉంటుంది."
      },
      { type: "end", message: "You ordered tea, picked sweetness, and tipped like a local. Nicely done." }
    ]
  },

  {
    id: "market-bargain",
    title: "Tomatoes at the market",
    location: "Lakshmi auntie's stall",
    icon: "🍅",
    desc: "Pick out a kilo, ask the price, and bargain just a little.",
    npc: { name: "Lakshmi auntie", initial: "ల", color: "#D88FA0" },
    estMinutes: 3,
    turns: [
      {
        type: "npc",
        en: "Tomatoes are fresh today. Want some?",
        te: "ī rōju ṭamāṭālu tāzāgā unnāyi. kāvālā?",
        script: "ఈ రోజు టమాటాలు తాజాగా ఉన్నాయి. కావాలా?"
      },
      {
        type: "choice",
        prompt: "Greet and ask the price.",
        options: [
          { en: "How much per kilo?",       te: "kilō enta?",          script: "కిలో ఎంత?",           next: 2 },
          { en: "One kilo, please.",        te: "okka kilō ivvaṇḍi",   script: "ఒక కిలో ఇవ్వండి",     next: 2 },
          { en: "Just looking, thanks.",    te: "chustunnānu, thanks", script: "చూస్తున్నాను, థాంక్స్", next: 7 }
        ]
      },
      {
        type: "npc",
        en: "Sixty rupees per kilo.",
        te: "kilō aravai rūpāyalu.",
        script: "కిలో అరవై రూపాయలు."
      },
      {
        type: "choice",
        prompt: "Bargain a little.",
        options: [
          { en: "Too much. Reduce a little.", te: "chālā ekkuva. konchem taggiṇchaṇḍi", script: "చాలా ఎక్కువ. కొంచెం తగ్గించండి", next: 4 },
          { en: "Okay, give me one kilo.",    te: "sare, okka kilō ivvaṇḍi",             script: "సరే, ఒక కిలో ఇవ్వండి",            next: 5 },
          { en: "Half a kilo only.",          te: "ara kilō chālu",                       script: "అర కిలో చాలు",                    next: 5 }
        ]
      },
      {
        type: "npc",
        en: "Last price — fifty. That's it, sir.",
        te: "chivari dhara — yābhai. anthē.",
        script: "చివరి ధర — యాభై. అంతే."
      },
      {
        type: "choice",
        prompt: "Accept or walk?",
        options: [
          { en: "Okay, I'll take a kilo.",    te: "sare, okka kilō tīsukuntānu", script: "సరే, ఒక కిలో తీసుకుంటాను", next: 5 },
          { en: "No thanks, too much.",        te: "vaddu, chālā ekkuva",         script: "వద్దు, చాలా ఎక్కువ",         next: 7 }
        ]
      },
      {
        type: "npc",
        en: "Here. Anything else, sir?",
        te: "idigō. inka ēmainā kāvālā?",
        script: "ఇదిగో. ఇంకా ఏమైనా కావాలా?"
      },
      {
        type: "choice",
        prompt: "Finish up.",
        options: [
          { en: "That's all. Thanks.",  te: "anthē. dhanyavādālu",     script: "అంతే. ధన్యవాదాలు",     next: 7 },
          { en: "Also one onion.",       te: "okka ulli kūḍā ivvaṇḍi", script: "ఒక ఉల్లి కూడా ఇవ్వండి", next: 7 }
        ]
      },
      { type: "end", message: "You priced, bargained, and bought. Real Telugu market energy." }
    ]
  },

  {
    id: "auto-ride",
    title: "Auto to MG Road",
    location: "On the kerb · evening",
    icon: "🛺",
    desc: "Wave one down, name your stop, agree a price.",
    npc: { name: "Auto driver", initial: "ఆ", color: "#F4B860" },
    estMinutes: 2,
    turns: [
      {
        type: "npc",
        en: "Sir! Where to?",
        te: "ayyā! ekkaḍiki?",
        script: "అయ్యా! ఎక్కడికి?"
      },
      {
        type: "choice",
        prompt: "Name your stop.",
        options: [
          { en: "MG Road.",          te: "MG Road",                 script: "ఎమ్‌జీ రోడ్",              next: 2 },
          { en: "Railway station.",   te: "railway sṭēshanuki",     script: "రైల్వే స్టేషనుకి",         next: 2 },
          { en: "Airport.",          te: "vimānāśrayāniki",          script: "విమానాశ్రయానికి",          next: 2 }
        ]
      },
      {
        type: "npc",
        en: "Two hundred rupees.",
        te: "reṇḍu vandalu.",
        script: "రెండు వందలు."
      },
      {
        type: "choice",
        prompt: "Negotiate or insist on meter.",
        options: [
          { en: "Use the meter, please.", te: "mīṭaru veyyaṇḍi",          script: "మీటర్ వెయ్యండి",         next: 4 },
          { en: "Too much. One hundred.",  te: "chālā ekkuva. okka vanda", script: "చాలా ఎక్కువ. ఒక వంద",   next: 5 },
          { en: "Okay, let's go.",         te: "sare, veḷḍām",             script: "సరే, వెళదాం",            next: 6 }
        ]
      },
      {
        type: "npc",
        en: "Meter is broken. One eighty, fine?",
        te: "mīṭaru paaḍai poyindi. vanda enabhai sare-ā?",
        script: "మీటర్ పాడై పోయింది. వంద ఎనభై సరేనా?"
      },
      {
        type: "choice",
        prompt: "Final reply.",
        options: [
          { en: "Okay, let's go.",     te: "sare, veḷḍām",       script: "సరే, వెళదాం",     next: 6 },
          { en: "No, I'll find another.", te: "vaddu, vēre chūstānu", script: "వద్దు, వేరే చూస్తాను", next: 7 }
        ]
      },
      {
        type: "npc",
        en: "Okay, get in. We'll go.",
        te: "sare, ekkaṇḍi. veḷtām.",
        script: "సరే, ఎక్కండి. వెళ్తాం."
      },
      { type: "end", message: "You agreed a fair price and got moving. The classic Indian commute." }
    ]
  },

  {
    id: "meeting-amma",
    title: "Meeting Anu's grandmother",
    location: "Family courtyard · weekend",
    icon: "🏡",
    desc: "Polite greeting, accept tea, compliment the home.",
    npc: { name: "Saraswati amma", initial: "స", color: "#D88FA0" },
    estMinutes: 3,
    turns: [
      {
        type: "npc",
        en: "Come, come. Welcome to our home.",
        te: "raṇḍi, raṇḍi. mā iṇṭiki swāgatam.",
        script: "రండి, రండి. మా ఇంటికి స్వాగతం."
      },
      {
        type: "choice",
        prompt: "Greet politely.",
        options: [
          { en: "Hello, ma'am. Thank you.",   te: "namaskāram aṇḍi. dhanyavādālu", script: "నమస్కారం అండి. ధన్యవాదాలు", next: 2 },
          { en: "Hello! Nice to meet you.",   te: "namaskāram! mimmalni kalavaḍam santhōsham", script: "నమస్కారం! మిమ్మల్ని కలవడం సంతోషం", next: 2 }
        ]
      },
      {
        type: "npc",
        en: "Sit, sit. Will you have tea?",
        te: "kūrchōṇḍi. chai tāgutārā?",
        script: "కూర్చోండి. చాయ్ తాగుతారా?"
      },
      {
        type: "choice",
        prompt: "Accept warmly.",
        options: [
          { en: "Yes please, thank you.", te: "avunu aṇḍi, dhanyavādālu", script: "అవును అండి, ధన్యవాదాలు", next: 4 },
          { en: "Just water, please.",     te: "kēvalam nīḷḷu ivvaṇḍi",   script: "కేవలం నీళ్ళు ఇవ్వండి",     next: 4 },
          { en: "No thank you, I'm full.", te: "vaddu aṇḍi, kaḍupu niṇḍi", script: "వద్దు అండి, కడుపు నిండి",  next: 4 }
        ]
      },
      {
        type: "npc",
        en: "Your Telugu is improving! Anu mentioned.",
        te: "mī telugu bāgupaḍutōndi! anu cheppindi.",
        script: "మీ తెలుగు బాగుపడుతోంది! అను చెప్పింది."
      },
      {
        type: "choice",
        prompt: "Compliment back.",
        options: [
          { en: "Thank you. Your home is lovely.", te: "dhanyavādālu. mī illu chālā bāgundi", script: "ధన్యవాదాలు. మీ ఇల్లు చాలా బాగుంది", next: 6 },
          { en: "Slowly, slowly I'm learning.",     te: "mellagā nērchukuṇṭunnānu",            script: "మెల్లగా నేర్చుకుంటున్నాను",         next: 6 }
        ]
      },
      {
        type: "npc",
        en: "Come again. Always welcome here.",
        te: "malli raṇḍi. eppuḍainā mā iṇṭlō swāgatam.",
        script: "మళ్ళీ రండి. ఎప్పుడైనా మా ఇంట్లో స్వాగతం."
      },
      { type: "end", message: "You won amma over. That's harder than any quiz." }
    ]
  },

  {
    id: "lost-direction",
    title: "Lost near the temple",
    location: "Old town · 6pm",
    icon: "🗺️",
    desc: "Ask a stranger for directions to the train station.",
    npc: { name: "A kind stranger", initial: "?", color: "#B8A4D4" },
    estMinutes: 2,
    turns: [
      {
        type: "choice",
        prompt: "Start by getting their attention politely.",
        options: [
          { en: "Excuse me, sir.",     te: "kṣaminchaṇḍi aṇḍi", script: "క్షమించండి అండి",  next: 1 },
          { en: "Hello, can you help?", te: "namaskāram, sahāyam cheyyagalarā?", script: "నమస్కారం, సహాయం చేయగలరా?", next: 1 }
        ]
      },
      {
        type: "npc",
        en: "Yes, tell me. What do you need?",
        te: "cheppaṇḍi. ēmi kāvāli?",
        script: "చెప్పండి. ఏమి కావాలి?"
      },
      {
        type: "choice",
        prompt: "Ask for the station.",
        options: [
          { en: "Where is the train station?",  te: "railway sṭēshanu ekkaḍa?", script: "రైల్వే స్టేషను ఎక్కడ?", next: 3 },
          { en: "How far is the station?",       te: "sṭēshanu enta dūram?",      script: "స్టేషను ఎంత దూరం?",       next: 3 }
        ]
      },
      {
        type: "npc",
        en: "Go straight, then left after the temple. About ten minutes' walk.",
        te: "nērugā veḷḷaṇḍi, gudi tarvāta eḍama vaipu. padi nimishālu naḍavāli.",
        script: "నేరుగా వెళ్ళండి, గుడి తర్వాత ఎడమ వైపు. పది నిమిషాలు నడవాలి."
      },
      {
        type: "choice",
        prompt: "Confirm or ask once more.",
        options: [
          { en: "Got it. Thank you.",          te: "artham ayyindi. dhanyavādālu", script: "అర్థం అయ్యింది. ధన్యవాదాలు", next: 5 },
          { en: "One more time, slowly?",      te: "marokasāri, mellagā?",         script: "మరోసారి, మెల్లగా?",          next: 5 },
          { en: "Can you show me on a map?",    te: "māpulō chūpiṇchagalarā?",     script: "మ్యాపులో చూపించగలరా?",       next: 5 }
        ]
      },
      {
        type: "npc",
        en: "Of course. Walk safely.",
        te: "tappakuṇḍā. jāgrattagā naḍavaṇḍi.",
        script: "తప్పకుండా. జాగ్రత్తగా నడవండి."
      },
      { type: "end", message: "Polite, clear, and you got real directions. Travel-ready." }
    ]
  }
];
