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
