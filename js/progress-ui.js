/**
 * Renders the "My Progress" panel and certificate on the hub page, reading
 * from window.BioProgress (js/progress.js). Re-renders on language toggle
 * via the 'langchange' event dispatched by js/main.js.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    if (!window.BioProgress) return;

    var LESSON_ORDER = ['lesson1', 'lesson2', 'lesson3'];
    var LESSON_TITLE_KEY = { lesson1: 'card1Title', lesson2: 'card2Title', lesson3: 'card3Title' };

    var listEl = document.getElementById('progressList');
    var nameInput = document.getElementById('studentNameInput');
    var printBtn = document.getElementById('printCertificateBtn');
    var resetBtn = document.getElementById('resetProgressBtn');
    var hintEl = document.getElementById('progressHint');
    var certName = document.getElementById('certificateName');
    var certScores = document.getElementById('certificateScores');
    var certDate = document.getElementById('certificateDate');

    if (!listEl) return;

    function currentDict() {
      var lang = document.documentElement.getAttribute('lang') || 'ar';
      // Minimal fallback dict in case main.js hasn't fired langchange yet
      var fallback = {
        card1Title: 'الدعامة في النبات',
        card2Title: 'الهيكل المحوري في الإنسان',
        card3Title: 'الحركة في النبات',
        progressNotStarted: 'لم يبدأ',
        progressCompleted: 'مكتمل',
        progressLockedHint: 'أكمل اختبارات الدروس الثلاثة لإصدار شهادة الإتمام.',
        progressUnlockedHint: 'أحسنت! أكملت الدروس الثلاثة — يمكنك الآن طباعة شهادتك.'
      };
      return { lang: lang, dict: window.__bio3secDict || fallback };
    }

    function render() {
      var ctx = currentDict();
      var dict = ctx.dict;
      var all = window.BioProgress.get();

      listEl.innerHTML = '';
      LESSON_ORDER.forEach(function (id, idx) {
        var result = all[id];
        var li = document.createElement('li');
        li.className = 'progress-item' + (result && result.completed ? ' is-complete' : '');

        var title = document.createElement('span');
        title.className = 'progress-item-title';
        title.textContent = (idx + 1) + '. ' + (dict[LESSON_TITLE_KEY[id]] || id);

        var status = document.createElement('span');
        status.className = 'progress-item-status';
        if (result && result.completed) {
          status.textContent = '✓ ' + (dict.progressCompleted || 'Completed') + ' — ' + result.score + '/' + result.total + ' (' + result.percentage + '%)';
        } else {
          status.textContent = '○ ' + (dict.progressNotStarted || 'Not started');
        }

        li.appendChild(title);
        li.appendChild(status);
        listEl.appendChild(li);
      });

      var allComplete = window.BioProgress.isAllComplete();
      if (printBtn) printBtn.disabled = !allComplete;
      if (hintEl) hintEl.textContent = allComplete
        ? (dict.progressUnlockedHint || 'Well done!')
        : (dict.progressLockedHint || 'Complete all lessons to unlock the certificate.');

      // Keep certificate content in sync even though it's only visible when printing
      var name = window.BioProgress.getStudentName();
      if (certName) certName.textContent = name || (ctx.lang === 'ar' ? 'اسم الطالب' : 'Student Name');
      if (certScores) {
        certScores.innerHTML = '';
        LESSON_ORDER.forEach(function (id, idx) {
          var result = all[id];
          var li = document.createElement('li');
          var title = dict[LESSON_TITLE_KEY[id]] || id;
          li.textContent = (idx + 1) + '. ' + title + (result ? ' — ' + result.score + '/' + result.total + ' (' + result.percentage + '%)' : '');
          certScores.appendChild(li);
        });
      }
      if (certDate) {
        certDate.textContent = new Date().toLocaleDateString(ctx.lang === 'ar' ? 'ar-EG' : 'en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        });
      }
    }

    if (nameInput) {
      nameInput.value = window.BioProgress.getStudentName();
      nameInput.addEventListener('input', () => {
        window.BioProgress.setStudentName(nameInput.value);
        render();
      });
    }

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        if (!printBtn.disabled) window.print();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        var lang = document.documentElement.getAttribute('lang') || 'ar';
        var msg = lang === 'ar'
          ? 'هل تريد مسح كل نتائج الاختبارات المحفوظة على هذا الجهاز؟'
          : 'Clear all saved quiz results on this device?';
        if (window.confirm(msg)) {
          window.BioProgress.clear();
          render();
        }
      });
    }

    document.addEventListener('langchange', (e) => {
      window.__bio3secDict = e.detail && e.detail.dict;
      render();
    });

    render();
  });
})();
