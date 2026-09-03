/**
 * Main Lessons Hub JavaScript
 * Language System (i18n), Mobile Menu & Accessibility Controls
 */

document.addEventListener('DOMContentLoaded', () => {
  // Translations Dictionary
  const translations = {
    ar: {
      docTitle: 'أحياء — الصف الثالث الثانوي | المنصة التعليمية',
      skipLink: 'الانتقال إلى المحتوى الرئيسي',
      navLessons: 'الدروس',
      navReview: 'المراجعة',
      heroBadge: 'منصة الأحياء التفاعلية',
      heroTitle: 'أحياء — الصف الثالث الثانوي',
      heroSubtitle: 'مختبر تفاعلي لفهم الأحياء وليس مجرد حفظها.',
      heroPrimaryCta: 'ابدأ المذاكرة',
      heroSecondaryCta: 'استكشف الدروس',
      lessonsTag: 'وحدات المنهج',
      lessonsTitle: 'اختر الدرس للبدء',
      lessonsDesc: 'دروس تفاعلية مدعومة بالنماذج والمحاكاة العلمية الدقيقة',
      card1Badge: 'الدرس الأول',
      card1Title: 'الدعامة في النبات',
      card1Desc: 'دراسة آليات الدعامة الفسيولوجية والتركيبية وتأثير الضغط الأسموزي والتركيب الجداري في الخلايا النباتية.',
      card2Badge: 'الدرس الثاني',
      card2Title: 'الهيكل المحوري في الإنسان',
      card2Desc: 'استكشاف أجزاء الهيكل العظمي المحوري: الجمجمة، العمود الفقري، والقفص الصدري بوصف تشريحي دقيق.',
      card3Badge: 'الدرس الثالث',
      card3Title: 'الحركة في النبات',
      card3Desc: 'تحليل أنواع الحركة في النباتات كالشد بالمحاليق، الانتحاء الضوئي، وحركة اللمس والإظلام.',
      enterLessonBtn: 'دخول الدرس',
      pathTag: 'تسلسل الدراسة',
      pathTitle: 'اختر درسك وابدأ',
      pathSubtitle: 'مسار تعليمي تفاعلي يربط المفاهيم البيولوجية بأسلوب سلس',
      step1Sub: 'التركيب والضغط الأسموزي',
      step2Sub: 'التشريح العظمي والوظائف',
      step3Sub: 'الانتحاء والاستجابة الفسيولوجية',
      progressTag: 'تتبع الأداء',
      progressTitle: 'تقدّمي في المنهج',
      progressDesc: 'نتائج اختباراتك تُحفظ تلقائياً على هذا الجهاز بعد كل اختبار تكمله.',
      progressNameLabel: 'اسم الطالب (للشهادة)',
      progressNamePlaceholder: 'اكتب اسمك هنا',
      progressPrintBtn: '🖨️ طباعة شهادة الإتمام',
      progressResetBtn: 'مسح التقدم المحفوظ',
      progressLockedHint: 'أكمل اختبارات الدروس الثلاثة لإصدار شهادة الإتمام.',
      progressUnlockedHint: 'أحسنت! أكملت الدروس الثلاثة — يمكنك الآن طباعة شهادتك.',
      progressNotStarted: 'لم يبدأ',
      progressCompleted: 'مكتمل',
      certificateBody: 'أتمّ بنجاح منهج الأحياء التفاعلي — الصف الثالث الثانوي، ويشمل الدروس الثلاثة التالية:'
    },
    en: {
      docTitle: 'Biology — Grade 12 | Educational Platform',
      skipLink: 'Skip to main content',
      navLessons: 'Lessons',
      navReview: 'Review',
      heroBadge: 'Interactive Biology Hub',
      heroTitle: 'Biology — Grade 12',
      heroSubtitle: 'An interactive lab to understand biology, not just memorize it.',
      heroPrimaryCta: 'Start Studying',
      heroSecondaryCta: 'Explore Lessons',
      lessonsTag: 'Curriculum Units',
      lessonsTitle: 'Select a Lesson to Begin',
      lessonsDesc: 'Interactive lessons supported by precise scientific models and simulations',
      card1Badge: 'Lesson 01',
      card1Title: 'Support in Plants',
      card1Desc: 'Study physiological and structural support mechanisms, osmotic pressure, and cell wall composition.',
      card2Badge: 'Lesson 02',
      card2Title: 'Human Axial Skeleton',
      card2Desc: 'Explore the axial skeleton: skull, vertebral column, and thoracic cage with anatomical accuracy.',
      card3Badge: 'Lesson 03',
      card3Title: 'Plant Movement',
      card3Desc: 'Analyze movement types in plants: tendril coiling, phototropism, touch and nictinastic movements.',
      enterLessonBtn: 'Enter Lesson',
      pathTag: 'Learning Sequence',
      pathTitle: 'Choose Your Lesson & Begin',
      pathSubtitle: 'An interactive learning pathway seamlessly connecting biological concepts',
      step1Sub: 'Structure & Osmotic Pressure',
      step2Sub: 'Skeletal Anatomy & Function',
      step3Sub: 'Tropism & Physiological Response',
      progressTag: 'Performance Tracking',
      progressTitle: 'My Progress',
      progressDesc: 'Your quiz results are saved automatically on this device after each quiz you complete.',
      progressNameLabel: 'Student Name (for certificate)',
      progressNamePlaceholder: 'Type your name here',
      progressPrintBtn: '🖨️ Print Certificate',
      progressResetBtn: 'Clear Saved Progress',
      progressLockedHint: 'Complete all three lesson quizzes to unlock your certificate.',
      progressUnlockedHint: 'Well done! You completed all three lessons — you can print your certificate now.',
      progressNotStarted: 'Not started',
      progressCompleted: 'Completed',
      certificateBody: 'Has successfully completed the Interactive Biology curriculum — Grade 12, covering the following three lessons:'
    }
  };

  const STORAGE_KEY = 'biology_hub_lang';
  const htmlElement = document.documentElement;
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langText = document.getElementById('langText');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  // Initialize Language State
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'ar';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    htmlElement.setAttribute('lang', lang);
    htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Button label toggles to opposite option
    if (langText) {
      langText.textContent = lang === 'ar' ? 'EN' : 'العربية';
    }

    // Update all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        if (key === 'docTitle') {
          document.title = translations[lang][key];
        } else {
          el.textContent = translations[lang][key];
        }
      }
    });

    // Update placeholder text for elements with data-i18n-placeholder
    const placeholderEls = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderEls.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // Let other modules (e.g. the progress panel) know the language changed
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang, dict: translations[lang] } }));
  }

  // Language Toggle Listener
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextLang = currentLang === 'ar' ? 'en' : 'ar';
      applyLanguage(nextLang);
    });
  }

  // Mobile Navigation Toggle
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileNav.hidden = isExpanded;
    });

    // Close mobile nav on link click
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      });
    });
  }

  // Initial Language Setup
  applyLanguage(currentLang);

  // PWA: register the service worker so a returning student can reopen a
  // previously visited page while offline (e.g. no signal at school).
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(err => {
        console.warn('Service worker registration failed:', err);
      });
    });
  }
});
