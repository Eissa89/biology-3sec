/**
 * Core Educational Application Controller — Lesson 02: Cinematic Anatomical Atlas
 * Manages Reading Progress, Interactive SVGs, Breathing Simulation, and Active Recall Systems.
 */

// Embedded JSON Fallback to support file:// protocol without CORS errors
window.LESSON_DATA_FALLBACK = {
  "title": "الهيكل المحوري في الإنسان",
  "subtitle": "الصف الثالث الثانوي — أطلس تشريحي سينمائي",
  "hero": {
    "title": "الهيكل المحوري",
    "subtitle": "Axial Skeleton — ثلاثة محاور تحمي وتدعم جسمك",
    "cta": "ابدأ الرحلة التشريحية"
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  initReadingProgress();
  initThemeToggle();
  initBreathingSimulation();
  initActiveRecall();
  initSmoothScroll();
});

function initReadingProgress() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  });
}

function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('atlas_theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('atlas_theme', newTheme);
    });
  }
}

function initBreathingSimulation() {
  const btnInspiration = document.getElementById('btn-inspiration');
  const btnExpiration = document.getElementById('btn-expiration');
  const ribCageSvg = document.getElementById('ribcage-svg-anim');
  const simText = document.getElementById('sim-explanation');

  if (!btnInspiration || !btnExpiration || !ribCageSvg) return;

  btnInspiration.addEventListener('click', () => {
    btnInspiration.classList.add('active');
    btnExpiration.classList.remove('active');
    ribCageSvg.style.transform = 'scale(1.1) translateY(-5px)';
    ribCageSvg.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    if (simText) {
      simText.textContent = "الشهيق (Inspiration): تتحرك الضلوع للخارج والأمام متسعة لزيادة تجويف الصدر ينخفض الضغط ويدخل الهواء.";
    }
  });

  btnExpiration.addEventListener('click', () => {
    btnExpiration.classList.add('active');
    btnInspiration.classList.remove('active');
    ribCageSvg.style.transform = 'scale(1) translateY(0)';
    ribCageSvg.style.transition = 'transform 0.6s ease-out';
    if (simText) {
      simText.textContent = "الزفير (Expiration): تعود الضلوع للخلف والداخل لينكمش التجويف الصدري ويزداد الضغط ليخرج الهواء.";
    }
  });
}

function initActiveRecall() {
  const activeRecallItems = document.querySelectorAll('.active-recall-item');
  activeRecallItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('revealed');
      const answer = item.querySelector('.recall-answer');
      if (answer) {
        answer.style.display = item.classList.contains('revealed') ? 'block' : 'none';
      }
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
