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
