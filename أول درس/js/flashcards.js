/**
 * Biology Educational Flashcards Controller
 * Implements interactive 3D card flipping, dynamic rendering, and progress tracking.
 */

class FlashcardController {
  constructor(containerId, progressId) {
    this.container = document.getElementById(containerId);
    this.progressText = document.getElementById(progressId);
    this.flashcards = [];
    this.flippedCards = new Set();

    // Robust local fallback in case of CORS restrictions during direct local file loading (file://)
    this.fallbackData = [
      {
        "id": 1,
        "question": "ما المادة الوحيدة المنفذة للماء بين مواد الجدار الخلوي المترسبة؟",
        "answer": "السليلوز."
      },
      {
        "id": 2,
        "question": "ما المفهوم العلمي لـ \"الضغط الناشئ عن زيادة حجم العصير الخلوي داخل الفجوة الخلوية\"؟",
        "answer": "ضغط الامتلاء (Turgor Pressure)."
      },
      {
        "id": 3,
        "question": "ما النسيج الذي يجمع بين المرونة والدعامة الفسيولوجية والتركيبية؟",
        "answer": "النسيج الكولانشيمي."
      },
      {
        "id": 4,
        "question": "أين يترسب السيوبرين في النبات؟",
        "answer": "في خلايا النسيج الفليني بالسيقان الخشبية، وفي شريط كاسبري بخلايا الاندوديرمس بالجذور."
      },
      {
        "id": 5,
        "question": "ما المادة الصلبة المترسبة في الخلايا الحجرية بالكمثرى؟",
        "answer": "اللجنين (بالإضافة للسليلوز)."
      },
      {
        "id": 6,
        "question": "لماذا الدعامة الفسيولوجية دعامة مؤقتة؟",
        "answer": "لأنها تعتمد على وجود الماء ودخوله بالفجوة العصارية بالأسموزية؛ فتوجد بوجود الماء وتزول بزواله."
      }
    ];
  }

  async init() {
    try {
      const response = await fetch('data/flashcards.json');
      if (!response.ok) throw new Error('Failed to load flashcards JSON');
      this.flashcards = await response.json();
    } catch (error) {
      console.warn('Direct fetch failed. Loading secure local fallback flashcard data.', error);
      this.flashcards = this.fallbackData;
    }

    this.loadState();
    this.render();
    this.updateProgress();
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = '';

    this.flashcards.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = 'flashcard-perspective';

      // Check if card was previously flipped
      const isFlipped = this.flippedCards.has(card.id);
      if (isFlipped) {
        cardEl.classList.add('flipped');
      }

      cardEl.innerHTML = `
        <div class="flashcard-inner" data-id="${card.id}">
          <div class="flashcard-face front">
            <h4>${card.question}</h4>
          </div>
          <div class="flashcard-face back">
            <h4>${card.answer}</h4>
          </div>
        </div>
      `;

      // Click to flip handler
      cardEl.addEventListener('click', () => {
        cardEl.classList.toggle('flipped');

        if (cardEl.classList.contains('flipped')) {
          this.flippedCards.add(card.id);
        } else {
          this.flippedCards.delete(card.id);
        }

        this.saveState();
        this.updateProgress();
      });

      this.container.appendChild(cardEl);
    });
  }

  updateProgress() {
    if (!this.progressText) return;
    const total = this.flashcards.length;
    const flippedCount = this.flippedCards.size;
    this.progressText.textContent = `تم استكشاف ${flippedCount} من أصل ${total} بطاقات تعليمية`;
  }

  resetAll() {
    this.flippedCards.clear();
    const cards = this.container.querySelectorAll('.flashcard-perspective');
    cards.forEach(c => c.classList.remove('flipped'));
    this.saveState();
    this.updateProgress();
  }

  saveState() {
    localStorage.setItem('flipped_flashcards_set', JSON.stringify(Array.from(this.flippedCards)));
  }

  loadState() {
    const saved = localStorage.getItem('flipped_flashcards_set');
    if (saved) {
      try {
        const arr = JSON.parse(saved);
        this.flippedCards = new Set(arr);
      } catch (e) {
        console.error('Error loading saved flashcard state', e);
      }
    }
  }
}

// Instantiate and expose globally or hook into window load
window.FlashcardModule = FlashcardController;
