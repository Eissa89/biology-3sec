/**
 * Quiz Engine Controller — Lesson 02: Cinematic Anatomical Atlas
 */

window.QUESTIONS_DATA_FALLBACK = [
  {
    "id": "q1",
    "chapter": 1,
    "question": "كم عدد مكونات الجهاز الهيكلي في الإنسان؟",
    "options": ["3 components", "5 components", "206 components", "33 components"],
    "correctIndex": 1,
    "explanation": "الجهاز الهيكلي يتكون من 5 مكونات: العظام، الغضاريف، المفاصل، الأربطة، والأوتار.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "EASY"
  },
  {
    "id": "q2",
    "chapter": 2,
    "question": "أي من الأجزاء التالية يعتبر عضواً محوريًا رئيسياً في الهيكل المحوري؟",
    "options": ["عظم الحوض", "عظم الفخذ", "العمود الفقري", "عظم العضد"],
    "correctIndex": 2,
    "explanation": "العمود الفقري هو المحور الأساسي للهيكل المحوري والجسم ككل.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "EASY"
  },
  {
    "id": "q3",
    "chapter": 3,
    "question": "كم يبلغ عدد عظام العمود الفقري في الإنسان البالغ بعد التحام الفقرات العجزية والعصعصية؟",
    "options": ["33 عظمة", "26 عظمة", "24 عظمة", "20 عظمة"],
    "correctIndex": 1,
    "explanation": "33 فقرة تلتحم العجزية (5 في 1) والعصعصية (4 في 1)، لتصبح 26 عظمة مستقلة.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "MEDIUM"
  },
  {
    "id": "q4",
    "chapter": 3,
    "question": "ما التجويف الذى يمر بداخل الفقرة لحماية الحبل الشوكي؟",
    "options": ["الثقب الأعظم", "القناة العصبية (Neural Canal)", "التجويف الأروح", "التجويف الحقي"],
    "correctIndex": 1,
    "explanation": "القناة العصبية تمتد داخل العمود الفقري ليمر بها الحبل الشوكي لحمايته.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "EASY"
  },
  {
    "id": "q5",
    "chapter": 4,
    "question": "كم عدد عظام الجزء المخي (الخلفي) للجمجمة؟",
    "options": ["14 عظمة", "8 عظام", "22 عظمة", "29 عظمة"],
    "correctIndex": 1,
    "explanation": "يتكون الجزء الخلفي (المخي) للجمجمة من 8 عظام تتصل ببعضها أطرافاً مشرشرة.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "EASY"
  },
  {
    "id": "q6",
    "chapter": 5,
    "question": "ما هي حركة الضلوع الصحيحة أثناء عملية الشهيق؟",
    "options": ["تتحرك للداخل والخلف", "تتحرك للخارج والأمام", "تبقى ثابتة لا تتحرك", "تتحرك لأسفل فقط"],
    "correctIndex": 1,
    "explanation": "تتحرك الضلوع أثناء الشهيق للخارج والأمام لزيادة سعة التجويف الصدري.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "EASY"
  },
  {
    "id": "q7",
    "chapter": 8,
    "question": "كيف يتصل الطرف العلوي بالعمود الفقري؟",
    "options": ["مباشرة عبر الفقرات الصدرية", "غير مباشر عبر الحزام الصدري", "غير مباشر عبر الحزام الحوضي", "مباشرة عبر الثقب الأعظم"],
    "correctIndex": 1,
    "explanation": "الطرفان العلويان يرتبطان بالهيكل المحوري بطريقة غير مباشرة عبر الحزام الصدري.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "MEDIUM"
  },
  {
    "id": "q8",
    "chapter": 9,
    "question": "رغم وجود الحزام الحوضي في منتصف الجسم، لماذا يصنف ضمن الهيكل الطرفي؟",
    "options": ["لأنه يتكون من عظمين ناتجين عن التحام عظام الحزام ويصل الأطراف السفلى بالمحور", "لأنه يحتوي على 33 فقرة", "لأنه غير متصل بالعجز", "لأنه يحتوي على القناة العصبية"],
    "correctIndex": 0,
    "explanation": "الحزام الحوضي يمثل حزام ربط الأطراف التابعة للهيكل الطرفي ويتكون من عظمتين متماثلتين.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "HARD"
  },
  {
    "id": "q9",
    "chapter": 6,
    "question": "كم عدد عظام الحزام الصدري (الكتفي) في جسم الإنسان؟",
    "options": ["2 عظمتان", "4 عظام", "6 عظام", "8 عظام"],
    "correctIndex": 1,
    "explanation": "الحزام الصدري يتكون من 4 عظام: عظمتا ترقوة + عظمتا لوح كتف (واحدة من كل نوع في كل جانب).",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "EASY"
  },
  {
    "id": "q10",
    "chapter": 6,
    "question": "أي عظمتين تشكلان الساعد وتسمحان بحركتي الكب والبسط؟",
    "options": ["العضد والزند", "الزند والكعبرة", "الكعبرة والرسغ", "العضد والكعبرة"],
    "correctIndex": 1,
    "explanation": "الزند (من جهة الخنصر) والكعبرة (من جهة الإبهام) هما عظمتا الساعد، وتدور الكعبرة حول الزند لتحريك كف اليد.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "MEDIUM"
  },
  {
    "id": "q11",
    "chapter": 7,
    "question": "كم عدد العظام التي يتكون منها الحزام الحوضي؟",
    "options": ["عظمة واحدة", "عظمتان", "4 عظام", "3 عظام"],
    "correctIndex": 1,
    "explanation": "الحزام الحوضي يتكون من عظمتي حوض فقط، وكل عظمة حوض ناتجة عن التحام 3 عظام جنينية (حرقفة، وركي، عانة).",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "EASY"
  },
  {
    "id": "q12",
    "chapter": 7,
    "question": "ما هي العظمة السمسمية التي تحمي مفصل الركبة من الأمام؟",
    "options": ["القصبة", "الشظية", "الرضفة", "عظمة الفخذ"],
    "correctIndex": 2,
    "explanation": "الرضفة (Patella) عظمة سمسمية منغرسة داخل وتر العضلة الرباعية، تحمي مقدمة مفصل الركبة.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "MEDIUM"
  },
  {
    "id": "q13",
    "chapter": 9,
    "question": "أي وصف صحيح لـ«الحوض» في مقابل «الحزام الحوضي»؟",
    "options": ["مصطلحان متطابقان تماماً", "الحوض الكامل يشمل العجز والعصعص (محوريان) بالإضافة لعظمتي الحوض، أما الحزام الحوضي فهو عظمتا الحوض فقط", "الحزام الحوضي جزء من العمود الفقري", "الحوض لا يحتوي على أي عظام طرفية"],
    "correctIndex": 1,
    "explanation": "الحوض التشريحي الكامل يضم عظمتي الحوض (طرفي) بالإضافة إلى العجز والعصعص (محوري ضمن العمود الفقري)، بينما الحزام الحوضي يقصد به عظمتا الحوض فقط.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "HARD"
  }
];

document.addEventListener('DOMContentLoaded', async () => {
  let questions = window.QUESTIONS_DATA_FALLBACK;

  try {
    const res = await fetch('data/questions.json');
    if (res.ok) {
      questions = await res.json();
    }
  } catch (e) {
    console.log('Using embedded questions fallback');
  }

  initQuizEngine(questions);
});

function initQuizEngine(questions) {
  let currentIndex = 0;
  let score = 0;
  let answered = false;

  const questionEl = document.getElementById('quiz-question');
  const optionsContainer = document.getElementById('quiz-options');
  const explanationEl = document.getElementById('quiz-explanation');
  const nextBtn = document.getElementById('quiz-next-btn');
  const progressEl = document.getElementById('quiz-progress');

  if (!questionEl || !optionsContainer) return;

  function renderQuestion() {
    answered = false;
    const q = questions[currentIndex];

    if (progressEl) progressEl.textContent = `سؤال ${currentIndex + 1} من ${questions.length}`;
    questionEl.textContent = q.question;
    optionsContainer.innerHTML = '';

    if (explanationEl) {
      explanationEl.style.display = 'none';
      explanationEl.textContent = '';
    }

    if (nextBtn) {
      nextBtn.style.display = 'none';
    }

    q.options.forEach((optText, index) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = optText;
      btn.addEventListener('click', () => handleOptionSelect(index, q));
      optionsContainer.appendChild(btn);
    });
  }

  function handleOptionSelect(selectedIndex, q) {
    if (answered) return;
    answered = true;

    const optionButtons = optionsContainer.querySelectorAll('.quiz-option');

    optionButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctIndex) {
        btn.classList.add('correct');
      }
      if (idx === selectedIndex && selectedIndex !== q.correctIndex) {
        btn.classList.add('wrong');
      }
    });

    if (selectedIndex === q.correctIndex) {
      score++;
    }

    if (explanationEl && q.explanation) {
      explanationEl.textContent = q.explanation;
      explanationEl.style.display = 'block';
    }

    if (nextBtn) {
      nextBtn.style.display = 'inline-block';
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex++;
      if (currentIndex < questions.length) {
        renderQuestion();
      } else {
        renderResults();
      }
    });
  }

  function renderResults() {
    const quizBox = document.querySelector('.quiz-box');
    if (!quizBox) return;

    const percentage = Math.round((score / questions.length) * 100);

    if (window.BioProgress) {
      window.BioProgress.save('lesson2', score, questions.length);
    }

    quizBox.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <h3 style="font-size: 2rem; color: var(--xray-cyan); margin-bottom: 1rem;">اكتمل الامتحان التشريحي</h3>
        <p style="font-size: 1.5rem; color: var(--medical-gold); margin-bottom: 1.5rem;">النتيجة: ${score} من ${questions.length} (${percentage}%)</p>
        <button class="btn-cta" onclick="location.reload()">إعادة المحاولة</button>
      </div>
    `;
  }

  renderQuestion();
}
