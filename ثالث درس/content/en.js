/**
 * English Translation & Content Dictionary — Lesson 03: Movement in Plants
 */

window.LESSON_CONTENT_EN = {
  meta: {
    title: "Movement in Plants | CINEMATIC BOTANICAL LAB",
    subtitle: "3rd Secondary Biology — Egyptian Curriculum",
    lang: "en",
    dir: "ltr"
  },

  nav: {
    brandTitle: "Biology Lab 3rd Sec",
    brandSubtitle: "BOTANICAL LAB",
    hero: "Home",
    sec01: "Concept of Movement",
    sec02: "Three Forms of Movement",
    sec03: "Plant Movements",
    sec04: "Mimosa Lab",
    sec05: "Tropism Lab",
    sec06: "Auxin Engine",
    sec07: "Boysen-Jensen Lab",
    sec08: "Tendril Lab",
    sec09: "Contractile Roots",
    sec10: "Exam Mode",
    sec11: "Exam Traps",
    sec12: "Final Recall"
  },

  hero: {
    title: "Movement in Plants",
    subtitle: "How do plants respond to stimuli without shifting their entire body?",
    cta: "Start Experiment 🌿",
    badge: "Unit 1 — Chapter 1 — Lesson 3"
  },

  sec01: {
    title: "What is Movement?",
    subtitle: "Definition & Response Types",
    desc: "Movement is an inherent biological phenomenon self-initiated in response to internal stimuli (e.g. hunger) or external stimuli (e.g. light, heat, touch).",
    positiveTitle: "Positive Response (+)",
    positiveDesc: "Movement or growth directly toward the stimulus (e.g., stem bending toward light).",
    negativeTitle: "Negative Response (-)",
    negativeDesc: "Movement or growth away from the stimulus (e.g., root growing away from light).",
    quickRecallQ: "Quick Check: What do we call a response directed away from a stimulus?",
    quickRecallA: "Negative Response (-)."
  },

  sec02: {
    title: "Three Forms of Movement",
    subtitle: "Classification based on the moving part",
    desc: "Movement is classified based on the moving body part into three main forms:",
    types: {
      continuous: {
        title: "01 — Continuous Movement",
        desc: "Ongoing cellular activity inside every cell to sustain vital transport and metabolism.",
        example: "Example: Cytoplasmic Streaming."
      },
      positional: {
        title: "02 — Positional Movement",
        desc: "Movement of a specific organ or body part relative to the stationary rest of the body.",
        example: "Example: Intestinal Peristalsis and Mimosa leaflet drooping."
      },
      locomotion: {
        title: "03 — Locomotion",
        desc: "Movement of the entire organism from one location to another for food, mating, or hazard avoidance.",
        example: "Example: Amoeba locomotion and sea turtle migration."
      }
    },
    ameobaTitle: "Amoeba System Model",
    ameobaNote: "Amoeba demonstrates all three types: continuous cytoplasmic streaming, positional pseudopodia extension, and total locomotion toward bacterial food."
  },

  sec03: {
    title: "Plant Movement Systems",
    subtitle: "Four Primary Plant Movements",
    desc: "Despite being anchored in soil, plants possess four precise interactive movement mechanisms:",
    items: [
      { id: "touch", title: "Touch Movement", desc: "Instant response to tactile stimulus in Mimosa." },
      { id: "sleep", title: "Sleep & Wakefulness", desc: "Diurnal osmotic leaflet changes in legumes." },
      { id: "tropism", title: "Tropism", desc: "Directional growth responses to unilateral light, gravity, or moisture." },
      { id: "pulling", title: "Pulling Movements", desc: "Stem pulling via tendrils or bulb pulling via contractile roots." }
    ]
  },

  sec04: {
    title: "Mimosa Laboratory",
    subtitle: "Touch & Turgor Pressure Mechanism",
    instructions: "Tap the leaflet to trigger touch and observe osmotic turgor pressure loss:",
    btnTouch: "Touch Leaflet 🖐️",
    btnReset: "Reset Turgor 🔄",
    statusNormal: "Status: Leaflets expanded and turgid (physiological support intact).",
    statusTouched: "Status: Leaflets drooping due to osmotic water exiting lower pulvinus cells.",
    explanation: "Scientific Mechanism: Pulvini act as biological joints. Touch stimulates osmotic exit of water from the thinner lower half cells into upper cells and intercellular spaces, causing turgor loss and leaf collapse."
  },

  sec05: {
    title: "Tropism Laboratory",
    subtitle: "Directional Growth Responses",
    instructions: "Select a unilateral stimulus to observe Stem vs Root response:",
    btnPhoto: "Light (Phototropism) ☀️",
    btnGeo: "Gravity (Geotropism) 🌍",
    btnHydro: "Water (Hydrotropism) 💧",
    matrix: {
      photo: {
        title: "Phototropism",
        stem: "Stem: Positive (+), bends toward light due to higher cell elongation on the shaded side.",
        root: "Root: Negative (-), bends away from light because Auxins inhibit root cell elongation."
      },
      geo: {
        title: "Geotropism",
        stem: "Stem: Negative (-), bends upward away from gravity.",
        root: "Root: Positive (+), bends downward toward gravity."
      },
      hydro: {
        title: "Hydrotropism",
        stem: "Stem: Not affected by unilateral soil moisture in this curriculum.",
        root: "Root: Positive (+), grows toward moist soil regions."
      }
    }
  },

  sec06: {
    title: "Auxin Engine",
    subtitle: "Visualizing Auxin Migration & Growth Rate",
    instructions: "Adjust the slider to alter Auxin distribution and observe stem curvature:",
    sliderLabel: "Auxin Distribution (Shaded vs Illuminated Side):",
    low: "Symmetrical (Equal)",
    med: "Moderate Gradient",
    high: "High Gradient (Full Migration)",
    ruleTitle: "Golden Rule of Auxins:",
    ruleText: "In Stems: Higher Auxin concentration = Faster cell elongation. In Roots: Higher Auxin concentration = Inhibited growth."
  },

  sec07: {
    title: "Boysen-Jensen Experiment",
    subtitle: "Proving the Chemical Nature of Phototropism",
    instructions: "Select an experiment condition to test Auxin diffusion from the coleoptile tip:",
    btnCut: "01 — Cut Tip",
    btnGelatin: "02 — Tip + Gelatin",
    btnMica: "03 — Tip + Mica",
    cutRes: "Result: Phototropism completely ceases because the growing tip is the Auxin source.",
    gelatinRes: "Result: Response is restored (bends toward light) because permeable gelatin allows Auxin diffusion.",
    micaRes: "Result: Response blocked because impermeable mica barrier prevents Auxin diffusion.",
    conclusion: "Key Conclusion: The growing tip secretes chemical messengers (Auxins) that diffuse downward to induce tropism."
  },

  sec08: {
    title: "Tendril Laboratory",
    subtitle: "Climbing Mechanism in Weak Stems",
    steps: [
      { num: "01", title: "Weak Stem", desc: "Stem is unable to remain erect independently." },
      { num: "02", title: "Searching", desc: "Tendril rotates in air seeking solid support." },
      { num: "03", title: "Contact", desc: "Tendril touches support; Auxins migrate to non-contact side." },
      { num: "04", title: "Coiling", desc: "Slower contact-side growth + faster non-contact growth induces coiling." },
      { num: "05", title: "Pulling", desc: "Spiral coiling shortens tendril length, pulling stem erect." }
    ],
    examples: "Common Examples: Grapevine, Pea, Ivy, Luffa."
  },

  sec09: {
    title: "Contractile Roots",
    subtitle: "Underground Anchorage & Protection",
    desc: "In Narcissus bulbs and corms, roots contract vertically downward to pull the organ to an optimal soil depth.",
    depthLabel: "Bulb Depth in Soil:",
    shallow: "Shallow (Unsafe against wind)",
    deep: "Suitable Depth (Optimal anchorage & protection)",
    benefitTitle: "Physiological Benefits of Contractile Roots:",
    benefits: [
      "Firmly anchors aerial plant parts against wind gusts.",
      "Protects underground storage bulbs/corms from desiccation and weather fluctuations."
    ]
  },

  sec10: {
    title: "Exam Mode",
    subtitle: "Interactive Recall & Comprehensive Testing",
    scoreText: "Current Score:",
    btnSubmit: "Submit Answer",
    btnNext: "Next Question"
  },

  sec11: {
    title: "Exam Traps",
    subtitle: "DON'T FALL FOR IT — 5 Critical Mistakes",
    traps: [
      {
        title: "Trap 01: Stem vs Root in Phototropism",
        mistake: "Assuming Auxin always increases cell elongation equally in all plant organs.",
        correct: "High Auxin concentration stimulates stem elongation, but inhibits root elongation at the exact same level!"
      },
      {
        title: "Trap 02: Gelatin vs Mica Barrier",
        mistake: "Confusing mica plates with gelatin blocks.",
        correct: "Gelatin is a permeable aqueous gel that allows Auxin flow; mica is an impermeable mineral plate that blocks Auxins."
      },
      {
        title: "Trap 03: Growth Rates of Tendril Sides",
        mistake: "Thinking the contact side grows faster to wrap around the support.",
        correct: "The contact side grows slower (Auxins leave it), while the non-contact side grows faster, wrapping the tendril."
      },
      {
        title: "Trap 04: Movement vs Locomotion",
        mistake: "Classifying Mimosa drooping as locomotion.",
        correct: "Mimosa drooping is positional movement only; the plant body remains stationary."
      },
      {
        title: "Trap 05: What if a tendril finds no support?",
        mistake: "Assuming a tendril continues growing indefinitely.",
        correct: "If a searching tendril fails to touch a solid support, it wilts, dies, and drops off!"
      }
    ]
  },

  sec12: {
    title: "Final Recall",
    subtitle: "Master Architecture of Movement in Plants",
    treeTitle: "Concept Map Tree:",
    formulaTitle: "Golden Movement Formula:",
    formulaText: "STIMULUS → MECHANISM (Osmotic / Auxin) → RESPONSE (Positive / Negative)"
  }
};
