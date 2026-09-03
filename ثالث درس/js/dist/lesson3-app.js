/**
 * Core Application Controller — Lesson 03: Movement in Plants
 * CINEMATIC BOTANICAL LAB
 */

// Global State
window.CURRENT_LANG = localStorage.getItem('lesson3_lang') || 'ar';

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initReadingProgress();
  initMimosaLab();
  initTropismLab();
  initAuxinEngine();
  initBoysenJensenLab();
  initTendrilLab();
  initContractileRoots();
  initQuickRecall();
  initSmoothScroll();
  applyLanguageStrings(window.CURRENT_LANG);
});

/* ==========================================================================
   Language / i18n Controller
   ========================================================================== */
function initLanguageSwitcher() {
  document.querySelectorAll('#btn-lang-ar, .lang-btn[id*="ar"]').forEach(btn => {
    btn.addEventListener('click', () => setLanguage('ar'));
  });
  document.querySelectorAll('#btn-lang-en, .lang-btn[id*="en"]').forEach(btn => {
    btn.addEventListener('click', () => setLanguage('en'));
  });
}

function setLanguage(lang) {
  window.CURRENT_LANG = lang;
  localStorage.setItem('lesson3_lang', lang);
  applyLanguageStrings(lang);

  // Re-render active labs and widgets to update string references
  if (typeof window.renderActiveQuiz === 'function') {
    window.renderActiveQuiz();
  }
  if (typeof window.renderFlashcard === 'function') {
    window.renderFlashcard();
  }
}

function applyLanguageStrings(lang) {
  const dictionary = (lang === 'en') ? window.LESSON_CONTENT_EN : window.LESSON_CONTENT_AR;
  if (!dictionary) return;

  // Set document direction
  document.documentElement.setAttribute('lang', dictionary.meta.lang);
  document.documentElement.setAttribute('dir', dictionary.meta.dir);

  // Update active state on all language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isEnBtn = btn.id.includes('en') || btn.innerText.includes('EN') || btn.innerText.includes('English');
    if (lang === 'en') {
      btn.classList.toggle('active', isEnBtn);
    } else {
      btn.classList.toggle('active', !isEnBtn);
    }
  });

  // Query all data-i18n elements and update inner text
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const keyPath = element.getAttribute('data-i18n');
    const text = getNestedValue(dictionary, keyPath);
    if (text) {
      element.innerText = text;
    }
  });
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

/* ==========================================================================
   Reading Progress Bar
   ========================================================================== */
function initReadingProgress() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;
  let scrollTicking = false;

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (totalHeight > 0) ? (window.scrollY / totalHeight) * 100 : 0;
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   04 — Mimosa Lab Controller
   ========================================================================== */
function initMimosaLab() {
  const btnTouch = document.getElementById('mimosa-touch-btn');
  const btnReset = document.getElementById('mimosa-reset-btn');
  const leafletsG = document.getElementById('mimosa-leaflets-svg');
  const statusText = document.getElementById('mimosa-status');
  const waterFlowPath = document.getElementById('mimosa-water-flow');

  if (!btnTouch || !btnReset) return;

  btnTouch.addEventListener('click', () => {
    if (leafletsG) {
      leafletsG.style.transform = 'scaleY(0.2) translateY(30px)';
      leafletsG.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
    if (waterFlowPath) {
      waterFlowPath.style.opacity = '1';
      waterFlowPath.style.strokeDashoffset = '0';
    }
    if (statusText) {
      const dict = (window.CURRENT_LANG === 'en') ? window.LESSON_CONTENT_EN : window.LESSON_CONTENT_AR;
      statusText.innerText = dict.sec04.statusTouched;
    }
  });

  btnReset.addEventListener('click', () => {
    if (leafletsG) {
      leafletsG.style.transform = 'scaleY(1) translateY(0)';
      leafletsG.style.transition = 'transform 0.5s ease-out';
    }
    if (waterFlowPath) {
      waterFlowPath.style.opacity = '0';
    }
    if (statusText) {
      const dict = (window.CURRENT_LANG === 'en') ? window.LESSON_CONTENT_EN : window.LESSON_CONTENT_AR;
      statusText.innerText = dict.sec04.statusNormal;
    }
  });
}

/* ==========================================================================
   05 — Tropism Lab Controller
   ========================================================================== */
function initTropismLab() {
  const btnPhoto = document.getElementById('trop-btn-photo');
  const btnGeo = document.getElementById('trop-btn-geo');
  const btnHydro = document.getElementById('trop-btn-hydro');

  const stemSvg = document.getElementById('trop-stem-svg');
  const rootSvg = document.getElementById('trop-root-svg');
  const tropTitle = document.getElementById('trop-display-title');
  const tropStemText = document.getElementById('trop-stem-text');
  const tropRootText = document.getElementById('trop-root-text');

  if (!btnPhoto || !btnGeo || !btnHydro) return;

  const updateTropism = (type) => {
    [btnPhoto, btnGeo, btnHydro].forEach(b => b.classList.remove('active'));
    const dict = (window.CURRENT_LANG === 'en') ? window.LESSON_CONTENT_EN : window.LESSON_CONTENT_AR;

    if (type === 'photo') {
      btnPhoto.classList.add('active');
      if (stemSvg) stemSvg.setAttribute('d', 'M 100 150 Q 100 80 130 30'); // Bends toward light (Right)
      if (rootSvg) rootSvg.setAttribute('d', 'M 100 150 Q 100 220 70 270');  // Bends away from light (Left)
      if (tropTitle) tropTitle.innerText = dict.sec05.matrix.photo.title;
      if (tropStemText) tropStemText.innerText = dict.sec05.matrix.photo.stem;
      if (tropRootText) tropRootText.innerText = dict.sec05.matrix.photo.root;
    } else if (type === 'geo') {
      btnGeo.classList.add('active');
      if (stemSvg) stemSvg.setAttribute('d', 'M 100 150 Q 90 80 80 30');   // Bends up (-)
      if (rootSvg) rootSvg.setAttribute('d', 'M 100 150 Q 100 220 100 280'); // Bends down (+)
      if (tropTitle) tropTitle.innerText = dict.sec05.matrix.geo.title;
      if (tropStemText) tropStemText.innerText = dict.sec05.matrix.geo.stem;
      if (tropRootText) tropRootText.innerText = dict.sec05.matrix.geo.root;
    } else if (type === 'hydro') {
      btnHydro.classList.add('active');
      if (stemSvg) stemSvg.setAttribute('d', 'M 100 150 L 100 30');       // Straight stem
      if (rootSvg) rootSvg.setAttribute('d', 'M 100 150 Q 120 220 150 270'); // Bends toward water (Right)
      if (tropTitle) tropTitle.innerText = dict.sec05.matrix.hydro.title;
      if (tropStemText) tropStemText.innerText = dict.sec05.matrix.hydro.stem;
      if (tropRootText) tropRootText.innerText = dict.sec05.matrix.hydro.root;
    }
  };

  btnPhoto.addEventListener('click', () => updateTropism('photo'));
  btnGeo.addEventListener('click', () => updateTropism('geo'));
  btnHydro.addEventListener('click', () => updateTropism('hydro'));
}

/* ==========================================================================
   06 — Auxin Engine Controller
   ========================================================================== */
function initAuxinEngine() {
  const slider = document.getElementById('auxin-slider');
  const auxinStemSvg = document.getElementById('auxin-stem-path');
  const gradientVal = document.getElementById('auxin-gradient-val');

  if (!slider) return;

  slider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    const dict = (window.CURRENT_LANG === 'en') ? window.LESSON_CONTENT_EN : window.LESSON_CONTENT_AR;

    // Calculate stem curvature path
    const curveAmount = (val / 100) * 45;
    if (auxinStemSvg) {
      auxinStemSvg.setAttribute('d', `M 100 180 Q 100 90 ${100 + curveAmount} 20`);
    }

    if (gradientVal) {
      if (val < 30) gradientVal.innerText = dict.sec06.low;
      else if (val < 70) gradientVal.innerText = dict.sec06.med;
      else gradientVal.innerText = dict.sec06.high;
    }
  });
}

/* ==========================================================================
   07 — Boysen-Jensen Lab Controller
   ========================================================================== */
function initBoysenJensenLab() {
  const btnCut = document.getElementById('bj-btn-cut');
  const btnGelatin = document.getElementById('bj-btn-gelatin');
  const btnMica = document.getElementById('bj-btn-mica');

  const bjTip = document.getElementById('bj-tip-svg');
  const bjStem = document.getElementById('bj-stem-svg');
  const bjBarrier = document.getElementById('bj-barrier-svg');
  const bjResultText = document.getElementById('bj-result-text');

  if (!btnCut || !btnGelatin || !btnMica) return;

  const updateBJ = (mode) => {
    [btnCut, btnGelatin, btnMica].forEach(b => b.classList.remove('active'));
    const dict = (window.CURRENT_LANG === 'en') ? window.LESSON_CONTENT_EN : window.LESSON_CONTENT_AR;

    if (mode === 'cut') {
      btnCut.classList.add('active');
      if (bjTip) bjTip.style.display = 'none';
      if (bjBarrier) bjBarrier.style.display = 'none';
      if (bjStem) bjStem.setAttribute('d', 'M 100 160 L 100 60'); // Straight
      if (bjResultText) bjResultText.innerText = dict.sec07.cutRes;
    } else if (mode === 'gelatin') {
      btnGelatin.classList.add('active');
      if (bjTip) bjTip.style.display = 'block';
      if (bjBarrier) {
        bjBarrier.style.display = 'block';
        bjBarrier.setAttribute('fill', '#70E8FF'); // Translucent Cyan Gelatin
      }
      if (bjStem) bjStem.setAttribute('d', 'M 100 160 Q 100 100 130 50'); // Bends toward light
      if (bjResultText) bjResultText.innerText = dict.sec07.gelatinRes;
    } else if (mode === 'mica') {
      btnMica.classList.add('active');
      if (bjTip) bjTip.style.display = 'block';
      if (bjBarrier) {
        bjBarrier.style.display = 'block';
        bjBarrier.setAttribute('fill', '#D4AF37'); // Shiny Mica Foil
      }
      if (bjStem) bjStem.setAttribute('d', 'M 100 160 L 100 60'); // Blocked
      if (bjResultText) bjResultText.innerText = dict.sec07.micaRes;
    }
  };

  btnCut.addEventListener('click', () => updateBJ('cut'));
  btnGelatin.addEventListener('click', () => updateBJ('gelatin'));
  btnMica.addEventListener('click', () => updateBJ('mica'));
}

/* ==========================================================================
   08 — Tendril Lab Controller
   ========================================================================== */
function initTendrilLab() {
  const buttons = document.querySelectorAll('.tendril-step-btn');
  const tendrilPath = document.getElementById('tendril-svg-path');
  const stepTitle = document.getElementById('tendril-step-title');
  const stepDesc = document.getElementById('tendril-step-desc');

  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const stepIndex = parseInt(btn.getAttribute('data-step'), 10);
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const dict = (window.CURRENT_LANG === 'en') ? window.LESSON_CONTENT_EN : window.LESSON_CONTENT_AR;
      const stepData = dict.sec08.steps[stepIndex - 1];

      if (stepTitle) stepTitle.innerText = `${stepData.num} — ${stepData.title}`;
      if (stepDesc) stepDesc.innerText = stepData.desc;

      if (tendrilPath) {
        if (stepIndex === 1) tendrilPath.setAttribute('d', 'M 50 150 Q 80 140 100 130'); // Straight line
        else if (stepIndex === 2) tendrilPath.setAttribute('d', 'M 50 150 Q 90 120 120 140 T 150 120'); // Waves in air
        else if (stepIndex === 3) tendrilPath.setAttribute('d', 'M 50 150 Q 100 100 120 100'); // Touches rod
        else if (stepIndex === 4) tendrilPath.setAttribute('d', 'M 50 150 C 80 120 120 80 120 60 C 120 40 100 40 100 60'); // Spiral coil
        else if (stepIndex === 5) tendrilPath.setAttribute('d', 'M 50 150 S 110 90 110 40'); // Tightly pulled
      }
    });
  });
}

/* ==========================================================================
   09 — Contractile Roots Depth Controller
   ========================================================================== */
function initContractileRoots() {
  const depthSlider = document.getElementById('contractile-slider');
  const bulbG = document.getElementById('contractile-bulb-svg');
  const depthText = document.getElementById('contractile-depth-text');

  if (!depthSlider) return;

  depthSlider.addEventListener('input', (e) => {
    const depthVal = parseInt(e.target.value, 10);
    const translateY = (depthVal / 100) * 80;

    if (bulbG) {
      bulbG.style.transform = `translateY(${translateY}px)`;
      bulbG.style.transition = 'transform 0.1s linear';
    }

    if (depthText) {
      const dict = (window.CURRENT_LANG === 'en') ? window.LESSON_CONTENT_EN : window.LESSON_CONTENT_AR;
      depthText.innerText = (depthVal > 60) ? dict.sec09.deep : dict.sec09.shallow;
    }
  });
}

/* ==========================================================================
   Quick Recall Cards & Smooth Scroll
   ========================================================================== */
function initQuickRecall() {
  document.querySelectorAll('.quick-recall-box').forEach(box => {
    box.addEventListener('click', () => {
      box.classList.toggle('revealed');
    });
  });

  document.querySelectorAll('.trap-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('revealed');
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
/**
 * Interactive Exam Engine Controller — Lesson 03: Movement in Plants
 */

const QUIZ_QUESTIONS = {
  ar: [
    {
      id: 1,
      type: "اختر",
      question: "01. أي مما يلي يُمثل حركة موضعية في الكائنات الحية؟",
      options: [
        "انتقال الأميبا نحو البكتيريا",
        "تدلي وريقات نبات المستحية عند لمسها",
        "الحركة الدورانية السيتوبلازمية داخل الخلايا",
        "سباحة الحيوانات المنوية نحو البويضة"
      ],
      correctIndex: 1,
      explanation: "تدلي وريقات المستحية عند لمسها حركة موضعية لعضو معين مع ثبات الكائن الحي في مكانه."
    },
    {
      id: 2,
      type: "علل",
      question: "02. علل: تدلي وريقات نبات المستحية عند لمسها وكأنها أصابها الذبول؟",
      options: [
        "بسبب تبخر الماء الفوري من الأوراق",
        "بسبب خروج الماء اسموزيًا من خلايا النصف السفلي للانتفاخات فتفقد امتلاءها",
        "بسبب الهجرة المباشرة للأوكسينات إلى الجذور",
        "بسبب انكسار الخلايا الخشبية في المحاور"
      ],
      correctIndex: 1,
      explanation: "تعمل الانتفاخات كمفاصل اسموزية؛ عند اللمس يخرج الماء من خلايا النصف السفلي للانتفاخ فتفقد الامتلاء والدعامة الفسيولوجية وتتدلى."
    },
    {
      id: 3,
      type: "ماذا يحدث إذا",
      question: "03. ماذا يحدث إذا: وُضِعَت صفيحة مايكا بين القمة النامية لبادرة الشوفان وباقي الساق في تجربة الانتحاء الضوئي؟",
      options: [
        "تزداد سرعة انحناء الساق نحو الضوء",
        "ينحني الساق بعيدًا عن الضوء",
        "يتوقف الانتحاء تمامًا لأن صفيحة المايكا تمنع نفاذ الأوكسينات",
        "ينحني الجذر نحو الأعلى"
      ],
      correctIndex: 2,
      explanation: "المايكا مادة غير نافذة تمنع عبور الأوكسينات من القمة النامية إلى منطقة الاستطالة."
    },
    {
      id: 4,
      type: "استنتج",
      question: "04. استنتج الآلية التي تجعل الساق موجب الانتحاء الضوئي بينما الجذر سالب الانتحاء الضوئي؟",
      options: [
        "الأوكسينات تنعدم تمامًا في الجذر وتتركز في الساق فقط",
        "تركيز الأوكسينات العالي يسبب زيادة استطالة خلايا الساق وتثبيط استطالة خلايا الجذر",
        "الضوء يقتل خلايا الجذر بينما يغذي خلايا الساق",
        "الجذر لا يحتوي على أي مستقبلات ضوئية"
      ],
      correctIndex: 1,
      explanation: "نفس التركيز العالي من الأوكسينات يُمثل محفزًا لاستطالة خلايا الساق ومُثبطًا لاستطالة خلايا الجذر."
    },
    {
      id: 5,
      type: "قارن",
      question: "05. قارن بين معدل نمو جانبي الحالق أثناء الالتفاف حول الدعامة الصلبة؟",
      options: [
        "الجانب الملامس ينمو أسرع من الجانب غير الملامس",
        "الجانبان ينموان بنفس السرعة تمامًا",
        "الجانب غير الملامس ينمو أسرع من الجانب الملامس بسبب هجرة الأوكسينات بعيدًا عن التلامس",
        "الجانب الملامس يتوقف تمامًا عن الانقسام بينما الجانب غير الملامس يموت"
      ],
      correctIndex: 2,
      explanation: "هجرة الأوكسينات بعيدًا عن منطقة التلامس تسبب بطء نمو الجانب الملامس وسرعة نمو الجانب غير الملامس للدعامة."
    },
    {
      id: 6,
      type: "ماذا يحدث إذا",
      question: "06. ماذا يحدث إذا: لم يجد حالق النبات المتسلق (مثل العنب) دعامة صلبة أثناء دورانه في الهواء؟",
      options: [
        "يتحول إلى جذر شاد تحت الأرض",
        "يزداد طوله للأبد حتى يجد الدعامة",
        "يذبل ويموت ويسقط",
        "ينتج أبصالاً وكورمات جديدة"
      ],
      correctIndex: 2,
      explanation: "إذا لم يجد الحالق دعامة صلبة يلتف حولها يتوقف عن النمو ويزبل ثم يموت ويسقط."
    },
    {
      id: 7,
      type: "علل",
      question: "07. علل: الأهمية الفسيولوجية للجذور الشادة في كرمات وأبصال النرجس؟",
      options: [
        "امتصاص الماء من الهواء الجوي مباشرًا",
        "شد البصلة لأسفل إلى عمق مناسب لتأمينها ضد الرياح وحمايتها من الجفاف",
        "تكوين المحاليق العلوية لتسلق الأشجار",
        "طرد الحشرات المفترسة بعيدًا عن النبات"
      ],
      correctIndex: 1,
      explanation: "تقلص الجذور الشادة يسحب البصلة لعمق مناسب بالتربة لمزيد من التثبيت والتأمين."
    },
    {
      id: 8,
      type: "اختر",
      question: "08. أي العبارات التالية صحيحة بالنسبة لحركة النوم واليقظة في النباتات البقولية؟",
      options: [
        "تعتمد على التغيرات الاسموزية في انتفاخات الوريقات والمحاور",
        "تعتمد على الهجرة الموسمية للأوكسينات للجذور",
        "تعتمد على انقسام الميوزي في الخلايا الجنينية",
        "تعد حركة كلية للانتقال نحو الشمس"
      ],
      correctIndex: 0,
      explanation: "حركة النوم واليقظة حركة موضعية دورية قائمة على تغير التورم والامتلاء الاسموزي بالانتفاخات."
    },
    {
      id: 9,
      type: "قارن",
      question: "09. قارن بين تجربة الجيلاتين وتجربة المايكا في أبحاث بويسون جونسون؟",
      options: [
        "الجيلاتين والمايكا كلاهما يمنع عبور الأوكسين",
        "الجيلاتين يمنع عبور الأوكسين بينما المايكا تسمح بنفاذه",
        "الجيلاتين مادة نافذة تنفذ الأوكسينات من خلالها بينما المايكا مادة غير نافذة تحجبها",
        "الجيلاتين مادة سامة تقتل القمة النامية"
      ],
      correctIndex: 2,
      explanation: "الجيلاتين ينفذ الأوكسين ويسمح بالانتحاء، بينما صفيحة المايكا تعزل الأوكسين وتمنع الاستجابة."
    },
    {
      id: 10,
      type: "اختر",
      question: "10. أي الكائنات التالية يجمع بين الأنواع الثلاثة للحركة (الدائبة والموضعية والكلية)؟",
      options: [
        "نبات المستحية",
        "الأميبا (Amoeba)",
        "نبات العنب",
        "بصلة النرجس"
      ],
      correctIndex: 1,
      explanation: "تجمع الأميبا بين الحركة الدورانية السيتوبلازمية (دائبة)، والأقدام الكاذبة (موضعية)، والانتقال نحو الغذاء (كلية)."
    }
  ],

  en: [
    {
      id: 1,
      type: "Multiple Choice",
      question: "01. Which of the following represents positional movement?",
      options: [
        "Amoeba moving toward bacteria",
        "Mimosa leaflets drooping upon touch",
        "Cytoplasmic streaming inside leaf cells",
        "Sperm swimming toward an egg"
      ],
      correctIndex: 1,
      explanation: "Mimosa drooping is positional movement because a specific organ moves while the plant remains anchored."
    },
    {
      id: 2,
      type: "Reasoning",
      question: "02. Why do Mimosa leaflets collapse and droop upon being touched?",
      options: [
        "Due to instant water evaporation from leaf surface",
        "Due to osmotic exit of water from the lower half cells of pulvini",
        "Due to direct auxin migration into roots",
        "Due to mechanical breakage of xylem tissue"
      ],
      correctIndex: 1,
      explanation: "Touch triggers water to exit lower pulvinus cells osmose, causing loss of turgor pressure and leaf collapse."
    },
    {
      id: 3,
      type: "Prediction",
      question: "03. What happens if a mica plate is inserted between an oat coleoptile tip and its stem during a phototropism test?",
      options: [
        "Stem curvature toward light accelerates",
        "Stem curves away from light",
        "Phototropism completely ceases because mica blocks auxin diffusion",
        "Root bends upward"
      ],
      correctIndex: 2,
      explanation: "Mica is an impermeable barrier that blocks downward Auxin diffusion."
    },
    {
      id: 4,
      type: "Conclusion",
      question: "04. Conclude why the stem is positively phototropic while the root is negatively phototropic?",
      options: [
        "Auxins exist only in stems and are absent in roots",
        "High Auxin concentration stimulates stem cell elongation but inhibits root cell elongation",
        "Light kills root cells while feeding stem cells",
        "Roots lack photoreceptors completely"
      ],
      correctIndex: 1,
      explanation: "The same high concentration of Auxin promotes stem cell elongation but inhibits root cell elongation."
    },
    {
      id: 5,
      type: "Comparison",
      question: "05. Compare the growth rates of tendril sides during coiling around a support?",
      options: [
        "Contact side grows faster than non-contact side",
        "Both sides grow at the exact same rate",
        "Non-contact side grows faster than contact side due to Auxin migration away from contact",
        "Contact side stops dividing while non-contact side dies"
      ],
      correctIndex: 2,
      explanation: "Auxins migrate away from the contact side, making the non-contact side grow faster and induce coiling."
    },
    {
      id: 6,
      type: "Prediction",
      question: "06. What happens if a climbing tendril (e.g. grapevine) fails to find a solid support?",
      options: [
        "It transforms into an underground contractile root",
        "It continues growing endlessly",
        "It wilts, dies, and drops off",
        "It generates new bulbs and corms"
      ],
      correctIndex: 2,
      explanation: "A searching tendril that finds no solid support wilts, dies, and falls off."
    },
    {
      id: 7,
      type: "Reasoning",
      question: "07. What is the physiological importance of contractile roots in Narcissus bulbs?",
      options: [
        "Absorbing water directly from air moisture",
        "Pulling the bulb down to a safe depth for wind protection and drought prevention",
        "Forming aerial tendrils for tree climbing",
        "Repelling predators"
      ],
      correctIndex: 1,
      explanation: "Root contraction pulls the bulb deeper into soil for firm anchorage and protection."
    },
    {
      id: 8,
      type: "Multiple Choice",
      question: "08. Which statement is correct regarding sleep and wakefulness in legumes?",
      options: [
        "It depends on diurnal osmotic turgor changes in pulvini",
        "It depends on seasonal Auxin migration to roots",
        "It depends on meiotic division in embryonic tissues",
        "It is locomotion toward the sun"
      ],
      correctIndex: 0,
      explanation: "Sleep and wakefulness is driven by reversible diurnal turgor changes in leaf pulvini."
    },
    {
      id: 9,
      type: "Comparison",
      question: "09. Compare the gelatin block vs mica plate in Boysen-Jensen's experiment?",
      options: [
        "Both gelatin and mica block Auxin flow",
        "Gelatin blocks Auxin while mica allows diffusion",
        "Gelatin is permeable allowing Auxin diffusion, while mica is impermeable blocking Auxin flow",
        "Gelatin is a toxic substance"
      ],
      correctIndex: 2,
      explanation: "Gelatin is a permeable hydrogel allowing tropism; mica is impermeable blocking the response."
    },
    {
      id: 10,
      type: "Multiple Choice",
      question: "10. Which organism combines all three movement forms (continuous, positional, locomotion)?",
      options: [
        "Mimosa plant",
        "Amoeba",
        "Grapevine",
        "Narcissus bulb"
      ],
      correctIndex: 1,
      explanation: "Amoeba exhibits continuous cytoplasmic streaming, positional pseudopodia, and locomotion toward food."
    }
  ]
};

let currentQuestionIndex = 0;
let userScore = 0;
let selectedOption = null;

document.addEventListener('DOMContentLoaded', () => {
  window.renderActiveQuiz = renderQuiz;
  renderQuiz();
});

function renderQuiz() {
  const container = document.getElementById('exam-quiz-container');
  if (!container) return;

  const lang = window.CURRENT_LANG || 'ar';
  const questions = QUIZ_QUESTIONS[lang];
  const dict = (lang === 'en') ? window.LESSON_CONTENT_EN : window.LESSON_CONTENT_AR;

  if (currentQuestionIndex >= questions.length) {
    // Final Quiz Summary
    const summaryMsg = (lang === 'en')
      ? (userScore >= 8 ? "Excellent! You have mastered all plant movement concepts." : "Good effort! Review the exam traps and interactive labs, then try again.")
      : (userScore >= 8 ? "ممتاز! لقد أتقنت جميع مفاهيم درس الحركة في النبات بنجاح." : "أداء جيد! يمكنك مراجعة فخاخ الامتحانات والتجارب التفاعلية ثم إعادة الاختبار.");
    const resetBtnTxt = (lang === 'en') ? "Retake Quiz 🔄" : "إعادة الاختبار 🔄";

    if (window.BioProgress) {
      window.BioProgress.save('lesson3', userScore, questions.length);
    }

    container.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <h3 style="font-size: 1.8rem; color: var(--gold-highlight); margin-bottom: 1rem;">
          🎉 ${dict.sec10.title} — ${dict.sec10.scoreText} ${userScore} / ${questions.length}
        </h3>
        <p style="color: var(--text-muted); margin-bottom: 2rem;">
          ${summaryMsg}
        </p>
        <button onclick="resetQuiz()" class="btn-action btn-gold">${resetBtnTxt}</button>
      </div>
    `;
    return;
  }

  const q = questions[currentQuestionIndex];
  selectedOption = null;

  container.innerHTML = `
    <div class="quiz-header">
      <span class="badge">${q.type}</span>
      <span style="color: var(--cyan-scientific);">${dict.sec10.scoreText} ${userScore} / ${questions.length}</span>
    </div>

    <div class="quiz-question-text">${q.question}</div>

    <div class="quiz-options">
      ${q.options.map((opt, idx) => `
        <button class="quiz-option" data-idx="${idx}">${opt}</button>
      `).join('')}
    </div>

    <div id="quiz-feedback-box" class="quiz-feedback"></div>

    <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
      <button id="btn-submit-answer" class="btn-action" disabled>${dict.sec10.btnSubmit}</button>
      <button id="btn-next-question" class="btn-action btn-gold" style="display: none;">${dict.sec10.btnNext}</button>
    </div>
  `;

  // Attach option click handlers
  const optionBtns = container.querySelectorAll('.quiz-option');
  const submitBtn = document.getElementById('btn-submit-answer');
  const nextBtn = document.getElementById('btn-next-question');
  const feedbackBox = document.getElementById('quiz-feedback-box');

  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      optionBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedOption = parseInt(btn.getAttribute('data-idx'), 10);
      submitBtn.removeAttribute('disabled');
    });
  });

  submitBtn.addEventListener('click', () => {
    if (selectedOption === null) return;

    const isCorrect = (selectedOption === q.correctIndex);
    if (isCorrect) userScore++;

    optionBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctIndex) btn.classList.add('correct');
      else if (idx === selectedOption) btn.classList.add('wrong');
    });

    feedbackBox.style.display = 'block';
    feedbackBox.className = `quiz-feedback show ${isCorrect ? 'correct' : 'wrong'}`;
    feedbackBox.style.background = isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(248, 113, 113, 0.2)';
    feedbackBox.style.border = `1px solid ${isCorrect ? 'var(--chlorophyll-vibrant)' : '#f87171'}`;
    feedbackBox.innerHTML = `
      <strong>${isCorrect ? '✅ إجابة صحيحة!' : '❌ إجابة خاطئة!'}</strong><br>
      ${q.explanation}
    `;

    submitBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
  });

  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    renderQuiz();
  });
}

function resetQuiz() {
  currentQuestionIndex = 0;
  userScore = 0;
  renderQuiz();
}
/**
 * Interactive Flashcards Controller — Lesson 03: Movement in Plants
 */

const FLASHCARDS_DATA = [
  {
    q_ar: "ما هي الحركة الكلية (Locomotion) وما أمثلتها؟",
    a_ar: "انتقال الكائن الحي بجسمه كاملاً من مكان لآخر لأغراض البحث عن الغذاء أو التزاوج أو تلافي الأخطار. مثال: حركة الأميبا والسلاحف البحرية.",
    q_en: "What is Locomotion and what are its examples?",
    a_en: "Movement of the entire organism from one location to another to seek food, mate, or avoid hazards. Example: Amoeba locomotion and sea turtle migration."
  },
  {
    q_ar: "ما الآلية العلمية لحركة اللمس في نبات المستحية؟",
    a_ar: "خروج الماء اسموزيًا من خلايا النصف السفلي للانتفاخات (المفاصل الاسموزية) إلى النصف العلوي، فتفقد خلايا النصف السفلي تماسكها وتتدلى الوريقات.",
    q_en: "What is the mechanism of touch movement in Mimosa?",
    a_en: "Osmotic water movement out of lower thin-walled cells of pulvini into upper cells, causing turgor pressure loss and leaflet drooping."
  },
  {
    q_ar: "ما دور الأوكسينات في الانتحاء الضوئي للساق؟",
    a_ar: "تهاجر الأوكسينات من الجانب المضيء إلى الجانب المظلم فتسبب زيادة استطالة خلايا الجانب المظلم بدرجة أكبر فينحني الساق نحو الضوء.",
    q_en: "What is the role of Auxins in stem phototropism?",
    a_en: "Auxins migrate to the shaded side, promoting greater cell elongation on the shaded side and causing stem curvature toward light."
  },
  {
    q_ar: "لماذا ينحني الجذر بعيدًا عن الضوء رغم زيادة الأوكسينات بالجانب المظلم؟",
    a_ar: "لأن تركيز الأوكسينات العالي يسبب تأثيرًا عكسيًا في الجذر (تثبيط النمو)، بينما تستمر خلايا الجانب المضيء في الاستطالة فيلتف الجذر بعيدًا.",
    q_en: "Why does the root curve away from light despite high Auxin on the shaded side?",
    a_en: "High Auxin concentration inhibits cell elongation in roots, so the illuminated side elongates faster, bending the root away from light."
  },
  {
    q_ar: "كيف تسبب الأوكسينات التفاف الحالق حول الدعامة الصلبة؟",
    a_ar: "تهاجر الأوكسينات بعيدًا عن منطقة التلامس، فيبطُؤ نمو الجانب الملامس بينما يسرع نمو الجانب غير الملامس مما يسبب الالتفاف.",
    q_en: "How do Auxins induce tendril coiling around a support?",
    a_en: "Auxins migrate away from the contact zone, causing slower growth on the contact side and faster growth on the non-contact side."
  }
];

let currentCardIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  renderFlashcard();
});

// Re-render when language changes
window.renderFlashcard = renderFlashcard;

function renderFlashcard() {
  const container = document.getElementById('flashcard-container');
  if (!container) return;

  const card = FLASHCARDS_DATA[currentCardIndex];
  const lang = window.CURRENT_LANG || 'ar';
  const question = (lang === 'en') ? card.q_en : card.q_ar;
  const answer = (lang === 'en') ? card.a_en : card.a_ar;
  const cardLabel = (lang === 'en')
    ? `Flashcard ${currentCardIndex + 1} of ${FLASHCARDS_DATA.length} (Click to reveal)`
    : `بطاقة ${currentCardIndex + 1} من ${FLASHCARDS_DATA.length} (اضغط للكشف)`;
  const prevBtnText = (lang === 'en') ? "◄ Prev" : "السابق ◀";
  const nextBtnText = (lang === 'en') ? "Next ►" : "التالي ▶";

  container.innerHTML = `
    <div class="flashcard-box" id="active-flashcard" style="
      background: var(--bg-card-hover);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 2rem;
      text-align: center;
      min-height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      position: relative;
    ">
      <div style="font-size: 0.8rem; color: var(--gold-subtle); margin-bottom: 0.5rem;">
        ${cardLabel}
      </div>
      <div id="card-q" style="font-size: 1.1rem; font-weight: bold; color: var(--text-primary);">
        ${question}
      </div>
      <div id="card-a" style="display: none; font-size: 1rem; color: var(--cyan-scientific); margin-top: 1rem; border-top: 1px dashed var(--border-subtle); padding-top: 1rem;">
        ${answer}
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
      <button onclick="prevFlashcard()" class="btn-action">${prevBtnText}</button>
      <button onclick="nextFlashcard()" class="btn-action">${nextBtnText}</button>
    </div>
  `;

  const flashcardEl = document.getElementById('active-flashcard');
  if (flashcardEl) {
    flashcardEl.addEventListener('click', () => {
      const answerEl = document.getElementById('card-a');
      if (answerEl) {
        answerEl.style.display = (answerEl.style.display === 'none') ? 'block' : 'none';
      }
    });
  }
}

function nextFlashcard() {
  currentCardIndex = (currentCardIndex + 1) % FLASHCARDS_DATA.length;
  renderFlashcard();
}

function prevFlashcard() {
  currentCardIndex = (currentCardIndex - 1 + FLASHCARDS_DATA.length) % FLASHCARDS_DATA.length;
  renderFlashcard();
}
