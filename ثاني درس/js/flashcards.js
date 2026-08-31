/**
 * Flashcards Controller — Lesson 02: Cinematic Anatomical Atlas
 */

window.FLASHCARDS_DATA_FALLBACK = [
  {
    "id": "fc1",
    "chapter": 1,
    "term": "الجهاز الهيكلي (Skeletal System)",
    "definition": "منظومة حيوية تتكون من 5 مكونات: العظام، الغضاريف، المفاصل، الأربطة، والأوتار.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "EASY",
    "tag": "منظومة الدعامة"
  },
  {
    "id": "fc2",
    "chapter": 2,
    "term": "الهيكل المحوري (Axial Skeleton)",
    "definition": "المحور الرئيسي للجسم ويتكون من 80 عظمة تشمل: الجمجمة، العمود الفقري، والقفص الصدري.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "EASY",
    "tag": "الهيكل المحوري"
  },
  {
    "id": "fc3",
    "chapter": 3,
    "term": "القناة العصبية (Neural Canal)",
    "definition": "تجويف داخل الفقرات يمر من خلاله الحبل الشوكي لحمايته وتوفير ممر مأمون للأعصاب الشوكية.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "MEDIUM",
    "tag": "العمود الفقري"
  },
  {
    "id": "fc4",
    "chapter": 3,
    "term": "عدد عظام العمود الفقري في البالغين",
    "definition": "26 عظمة (24 فقرة متمفصلة + 1 عظمة عجزية + 1 عظمة عصعصية).",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "MEDIUM",
    "tag": "أرقام تشريحية"
  },
  {
    "id": "fc5",
    "chapter": 4,
    "term": "الثقب الأعظم (Foramen Magnum)",
    "definition": "ثقب يقع في قاع الجزء المخي للجمجمة يربط المخ بالحبل الشوكي.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "MEDIUM",
    "tag": "الجمجمة"
  },
  {
    "id": "fc6",
    "chapter": 5,
    "term": "حركة الضلوع أثناء الشهيق والزفير",
    "definition": "في الشهيق: تتحرك الضلوع للخارج والأمام لزيادة حجم التجويف الصدري. في الزفير: تعود للخلف والداخل.",
    "sourceStatus": "OFFICIAL_CURRICULUM",
    "difficulty": "EASY",
    "tag": "القفص الصدري"
  }
];

document.addEventListener('DOMContentLoaded', async () => {
  let flashcards = window.FLASHCARDS_DATA_FALLBACK;

  try {
    const res = await fetch('data/flashcards.json');
    if (res.ok) {
      flashcards = await res.json();
    }
  } catch (e) {
    console.log('Using embedded flashcards fallback');
  }

  initFlashcardsEngine(flashcards);
});

function initFlashcardsEngine(cards) {
  let currentIndex = 0;
  const termEl = document.getElementById('fc-term');
  const defEl = document.getElementById('fc-def');
  const tagEl = document.getElementById('fc-tag');
  const cardEl = document.getElementById('flashcard-element');
  const prevBtn = document.getElementById('fc-prev');
  const nextBtn = document.getElementById('fc-next');
  const counterEl = document.getElementById('fc-counter');

  if (!cardEl || !termEl || !defEl) return;

  function renderCard() {
    const card = cards[currentIndex];
    cardEl.classList.remove('flipped');

    setTimeout(() => {
      termEl.textContent = card.term;
      defEl.textContent = card.definition;
      if (tagEl) tagEl.textContent = card.tag || `فصل 0${card.chapter}`;
      if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${cards.length}`;
    }, 150);
  }

  cardEl.addEventListener('click', () => {
    cardEl.classList.toggle('flipped');
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + cards.length) % cards.length;
      renderCard();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % cards.length;
      renderCard();
    });
  }

  renderCard();
}
