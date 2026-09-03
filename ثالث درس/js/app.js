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
