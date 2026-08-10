/**
 * Interactive Biology MCQ Quiz Controller
 * Features instant feedback, custom score calculation, state persistence, and full explanations.
 */

class QuizController {
  constructor(containerId, resultsId) {
    this.container = document.getElementById(containerId);
    this.resultsContainer = document.getElementById(resultsId);
    this.questions = [];
    this.userAnswers = {}; // Map of question index -> selected option index
    this.score = 0;
    this.isSubmitted = false;

    // Secure local fallback in case of CORS restrictions
    this.fallbackData = [
      {
        "id": 1,
        "question": "أي الأنسجة التالية مسؤولة عن إكساب أغصان الأشجار الحديثة المرونة اللازمة لمقاومة الرياح دون أن تنكسر؟",
        "options": [
          "أ) النسيج البارنشيمي",
          "ب) النسيج الكولانشيمي",
          "ج) النسيج الاسكلارنشيمي",
          "د) النسيج الفليني"
        ],
        "answer": 1,
        "explanation": "النسيج الكولانشيمي يحتوي على سليلوز مغلظ بالأركان يمنح النبات المرونة والقوة اللازمة لمقاومة الرياح دون انكسار."
      },
      {
        "id": 2,
        "question": "عند نقل خلية نباتية تركيز العصير الخلوي بفجوتها 3% إلى إناء به محلول سكري تركيزه 10%، ماذا يحدث لضغط الامتلاء وتوتر الجدار الخلوي للخلية؟",
        "options": [
          "أ) يزداد ضغط الامتلاء ويزداد توتر الجدار.",
          "ب) يقل ضغط الامتلاء ويقل توتر الجدار.",
          "ج) يزداد ضغط الامتلاء ويقل توتر الجدار.",
          "د) يقل ضغط الامتلاء ويزداد توتر الجدار."
        ],
        "answer": 1,
        "explanation": "لأن المحلول الخارجي (10%) أعلى تركيزاً من الفجوة (3%)، فيخرج الماء من الخلية بالأسموزية وينكمش حجم العصير الخلوي فيقل ضغط الامتلاء ويقل توتر الجدار."
      },
      {
        "id": 3,
        "question": "المادة التي تترسب في جدر خلايا الاندوديرمس بالجذر وتجبر الماء على المرور عبر الغشاء الخلوي هي:",
        "options": [
          "أ) الكيوتين",
          "ب) اللجنين",
          "ج) السيوبرين",
          "د) السليلوز"
        ],
        "answer": 2,
        "explanation": "تترسب مادة السيوبرين في خلايا الاندوديرمس على هيئة شريط كاسبري لمنع مرور الماء بين الجدر وإجباره على المرور عبر الغشاء والبروتوبلازم."
      },
      {
        "id": 4,
        "question": "أي المواد التالية المترسبة في جدر الخلايا النباتية تعتبر مادة منفذة للماء؟",
        "options": [
          "أ) السليلوز",
          "ب) الكيوتين",
          "ج) اللجنين",
          "د) السيوبرين"
        ],
        "answer": 0,
        "explanation": "السليلوز هو المادة الوحيدة المنفذة للماء بين جميع مواد الجدار الخلوي المترسبة."
      },
      {
        "id": 5,
        "question": "التتابع الصحيح للأحداث عند ري نبات عشب يعاني من الجفاف هو:",
        "options": [
          "أ) توتر الجدار ← امتصاص الماء بالأسموزية ← زيادة ضغط الامتلاء ← زيادة حجم العصير الخلوي.",
          "ب) امتصاص الماء بالأسموزية ← زيادة حجم العصير الخلوي ← زيادة ضغط الامتلاء ← توتر الجدار الخلوي.",
          "ج) زيادة حجم العصير الخلوي ← توتر الجدار ← زيادة ضغط الامتلاء ← امتصاص الماء بالأسموزية.",
          "د) زيادة ضغط الامتلاء ← امتصاص الماء بالأسموزية ← توتر الجدار ← زيادة حجم العصير الخلوي."
        ],
        "answer": 1,
        "explanation": "هذا هو التسلسل التزمني للآلية الفسيولوجية لاكتساب الدعامة: امتصاص الماء بالأسموزية أولاً، يليه زيادة حجم العصير الخلوي، ثم تولد ضغط الامتلاء، وأخيراً تمدد وتوتر الجدار الخلوي."
      },
      {
        "id": 6,
        "question": "تم وضع 4 قطع متساوية الوزن (10 جرام) من البطاطس في 4 أوانٍ بها محاليل سكرية مختلفة التركيز (أ، ب، ج، د). وبعد ساعتين تم قياس أوزان القطع فكانت: (أ): 12 جرام، (ب): 10 جرام، (ج): 8 جرام، (د): 14 جرام. أي المحاليل هو الأعلى تركيزاً للذائبات؟",
        "options": [
          "أ) المحلول (أ)",
          "ب) المحلول (ب)",
          "ج) المحلول (ج)",
          "د) المحلول (د)"
        ],
        "answer": 2,
        "explanation": "المحلول الأعلى تركيزاً للذائبات هو المحلول الذي يسحب أكبر كمية من الماء من شريحة البطاطس بالأسموزية، مما يؤدي إلى انكماشها ونقصان وزنها من 10 جرام إلى 8 جرام وهو المحلول (ج)."
      },
      {
        "id": 7,
        "question": "أي الأنسجة التالية لا تتأثر دعامتها إطلاقاً عند تعرض النبات لموجة جفاف شديدة؟",
        "options": [
          "أ) خلايا بشرة الورقة.",
          "ب) النسيج الكولانشيمي في ساق الخس.",
          "ج) الخلايا الحجرية في ثمرة الكمثرى.",
          "د) النسيج البارنشيمي في الثمار."
        ],
        "answer": 2,
        "explanation": "الخلايا الحجرية في ثمرة الكمثرى هي نسيج اسكلارنشيمي غير حي يعتمد بالكامل على الدعامة التركيبية الدائمة (بترسيب اللجنين والسليلوز)، وهي دعامة صلبة لا تتأثر بوجود أو فقد الماء."
      }
    ];
  }

  async init() {
    try {
      const response = await fetch('data/questions.json');
      if (!response.ok) throw new Error('Failed to load questions JSON');
      this.questions = await response.json();
    } catch (error) {
      console.warn('Direct fetch failed. Loading secure local fallback MCQ questions.', error);
      this.questions = this.fallbackData;
    }

    this.loadState();
    this.render();
    this.updateScoreUI();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    this.questions.forEach((q, qIndex) => {
      const questionCard = document.createElement('div');
      questionCard.className = 'quiz-question-card fade-in';
      questionCard.style.animationDelay = `${qIndex * 0.05}s`;

      const answeredOptionIndex = this.userAnswers[qIndex];
      const isAnswered = answeredOptionIndex !== undefined;

      let optionsHTML = '';
      q.options.forEach((opt, optIndex) => {
        let stateClass = '';
        let checkedAttr = '';

        if (isAnswered) {
          if (optIndex === q.answer) {
            stateClass = 'correct';
          } else if (optIndex === answeredOptionIndex) {
            stateClass = 'incorrect';
          }
          checkedAttr = optIndex === answeredOptionIndex ? 'checked' : 'disabled';
        }

        optionsHTML += `
          <label class="quiz-option-label ${stateClass}">
            <input type="radio" name="q_${qIndex}" value="${optIndex}" ${checkedAttr} ${isAnswered ? 'disabled' : ''}>
            <span>${opt}</span>
          </label>
        `;
      });

      let explanationHTML = '';
      if (isAnswered) {
        explanationHTML = `
          <div class="quiz-explanation fade-in">
            <strong>💡 التفسير العلمي:</strong>
            <p>${q.explanation}</p>
          </div>
        `;
      }

      questionCard.innerHTML = `
        <div class="quiz-header">
          <span>سؤال ${qIndex + 1} من ${this.questions.length}</span>
          <span>درجة واحدة</span>
        </div>
        <div class="quiz-text">${q.question}</div>
        <div class="quiz-options" data-qindex="${qIndex}">
          ${optionsHTML}
        </div>
        ${explanationHTML}
      `;

      // Option selection handler (Instant Correction)
      if (!isAnswered) {
        const optionInputs = questionCard.querySelectorAll('input[type="radio"]');
        optionInputs.forEach(input => {
          input.addEventListener('change', (e) => {
            const selectedOptIndex = parseInt(e.target.value);
            this.handleAnswer(qIndex, selectedOptIndex);
          });
        });
      }

      this.container.appendChild(questionCard);
    });

    this.renderQuizFooter();
  }

  handleAnswer(qIndex, selectedOptIndex) {
    if (this.userAnswers[qIndex] !== undefined) return; // Prevent re-answering
    this.userAnswers[qIndex] = selectedOptIndex;

    this.saveState();
    this.calculateScore();
    this.render(); // Re-render to show correct/incorrect overlays and explanations
    this.updateScoreUI();
  }

  calculateScore() {
    let rawScore = 0;
    this.questions.forEach((q, qIndex) => {
      if (this.userAnswers[qIndex] === q.answer) {
        rawScore++;
      }
    });
    this.score = rawScore;
  }

  updateScoreUI() {
    if (!this.resultsContainer) return;
    const total = this.questions.length;
    const answeredCount = Object.keys(this.userAnswers).length;

    if (answeredCount === 0) {
      this.resultsContainer.innerHTML = `<span class="badge warning">لم تقم بحل أي أسئلة بعد</span>`;
      return;
    }

    const percentage = Math.round((this.score / total) * 100);
    let appreciation = 'استمر في المراجعة!';
    if (percentage === 100) appreciation = 'ممتاز! درجة كاملة وطاقة استيعاب جبارة 🏆';
    else if (percentage >= 80) appreciation = 'رائع جداً! فهمك للدرس قوي ومتين 🌟';
    else if (percentage >= 50) appreciation = 'جيد، لكن يُنصح بمراجعة المواد والأنسجة مجدداً 👍';

    this.resultsContainer.innerHTML = `
      <div class="quiz-score-badge fade-in">
        النتيجة: ${this.score} / ${total} (${percentage}%) — ${appreciation}
      </div>
    `;
  }

  renderQuizFooter() {
    // Add reset/restart button at the bottom of the quiz
    const footerWrap = document.createElement('div');
    footerWrap.className = 'quiz-submit-section';

    const answeredCount = Object.keys(this.userAnswers).length;
    const total = this.questions.length;

    footerWrap.innerHTML = `
      <div class="quiz-status-summary">
        <span>تم حل ${answeredCount} من أصل ${total} أسئلة</span>
      </div>
      <button class="btn-secondary" id="restart-quiz-btn">
        <i class="icon">🔄</i> إعادة خوض الاختبار
      </button>
    `;

    this.container.appendChild(footerWrap);

    const restartBtn = document.getElementById('restart-quiz-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => this.resetQuiz());
    }
  }

  resetQuiz() {
    this.userAnswers = {};
    this.score = 0;
    this.saveState();
    this.render();
    this.updateScoreUI();
  }

  saveState() {
    localStorage.setItem('student_quiz_answers', JSON.stringify(this.userAnswers));
    localStorage.setItem('student_quiz_score', this.score.toString());
  }

  loadState() {
    const savedAnswers = localStorage.getItem('student_quiz_answers');
    if (savedAnswers) {
      try {
        this.userAnswers = JSON.parse(savedAnswers);
        this.calculateScore();
      } catch (e) {
        console.error('Error parsing saved quiz answers', e);
      }
    }
  }
}

// Bind to window module namespace
window.QuizModule = QuizController;
