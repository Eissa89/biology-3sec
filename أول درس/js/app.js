/**
 * Core Educational Dashboard Application Controller
 * Manages theme toggling, search & highlights, reading progress, active recall, sidebar highlight, and mobile navigation.
 */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Themes (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Load saved theme or default to Dark mode
  const savedTheme = localStorage.getItem('biology_dashboard_theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('biology_dashboard_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    themeToggleBtn.innerHTML = theme === 'light' ? '🌙' : '☀️';
    themeToggleBtn.setAttribute('title', theme === 'light' ? 'الوضع المظلم' : 'الوضع المضيء');
  }

  // 2. Mobile Responsive Menu Toggle
  const menuToggleBtn = document.getElementById('menu-toggle');
  const sidebar = document.querySelector('.sidebar');

  if (menuToggleBtn && sidebar) {
    menuToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });

    // Close sidebar on tapping main content or links
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });

    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('open');
      });
    });
  }

  // 3. Dynamic Progress Bar (Reading Progress)
  const progressBar = document.getElementById('reading-progress');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrolled}%`;
    }
  });

  // 4. Sidebar Link Highlighting on Scroll (Intersection Observer)
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.sidebar-nav li');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.remove('active');
          const link = item.querySelector('a');
          if (link && link.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  // 5. Active Recall Interactive Assessment
  const activeRecallItems = document.querySelectorAll('.recall-item');
  activeRecallItems.forEach(item => {
    const verifyBtn = item.querySelector('.btn-verify');
    const answerBox = item.querySelector('.recall-answer-box');
    const textarea = item.querySelector('.recall-textarea');

    if (verifyBtn && answerBox) {
      verifyBtn.addEventListener('click', () => {
        // Toggle the answer box visibility
        const isHidden = answerBox.classList.contains('hidden');
        answerBox.classList.toggle('hidden', !isHidden);
        verifyBtn.textContent = isHidden ? 'إخفاء الإجابة النموذجية' : 'عرض وتقييم الإجابة النموذجية';

        // Save text in local storage to persist state
        const qId = item.getAttribute('data-id');
        if (textarea) {
          localStorage.setItem(`recall_text_${qId}`, textarea.value);
        }
      });

      // Load saved active recall inputs
      const qId = item.getAttribute('data-id');
      const savedText = localStorage.getItem(`recall_text_${qId}`);
      if (savedText && textarea) {
        textarea.value = savedText;
      }
    }
  });

  // 6. Dynamic Realtime Search Engine with Highlight
  const searchInput = document.getElementById('search-input');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      const contentCards = document.querySelectorAll('.lesson-card, .grid-2 > .lesson-card');

      contentCards.forEach(card => {
        const cardText = card.textContent.toLowerCase();

        if (query === '') {
          // Reset highlights and display status
          card.classList.remove('hidden');
          removeHighlights(card);
        } else if (cardText.includes(query)) {
          card.classList.remove('hidden');
          highlightText(card, query);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  }

  function highlightText(element, query) {
    removeHighlights(element); // Reset previous highlights first

    // Recursive search inside text nodes
    const walkTextNodes = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue;
        const index = text.toLowerCase().indexOf(query);

        if (index !== -1 && node.parentNode &&
            node.parentNode.nodeName !== 'SCRIPT' &&
            node.parentNode.nodeName !== 'STYLE' &&
            !node.parentNode.classList.contains('highlight-match')) {

          const span = document.createElement('span');
          span.className = 'highlight-match';
          span.style.backgroundColor = 'rgba(245, 158, 11, 0.3)';
          span.style.color = 'var(--warning-color)';
          span.style.fontWeight = 'bold';
          span.style.borderRadius = '3px';
          span.style.padding = '1px 3px';

          const match = text.substring(index, index + query.length);
          const before = text.substring(0, index);
          const after = text.substring(index + query.length);

          node.nodeValue = before;
          span.textContent = match;

          const nextNode = document.createTextNode(after);
          node.parentNode.insertBefore(span, node.nextSibling);
          node.parentNode.insertBefore(nextNode, span.nextSibling);
        }
      } else {
        for (let i = 0; i < node.childNodes.length; i++) {
          walkTextNodes(node.childNodes[i]);
        }
      }
    };
    walkTextNodes(element);
  }

  function removeHighlights(element) {
    const highlights = element.querySelectorAll('.highlight-match');
    highlights.forEach(hl => {
      const parent = hl.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(hl.textContent), hl);
        parent.normalize(); // Merges adjacent text nodes
      }
    });
  }

  // 7. Initialize Sub-modules
  if (window.FlashcardModule) {
    const flashcardController = new window.FlashcardModule('flashcard-grid-container', 'flashcard-progress-summary');
    await flashcardController.init();

    const resetFlashBtn = document.getElementById('reset-flashcards-btn');
    if (resetFlashBtn) {
      resetFlashBtn.addEventListener('click', () => {
        flashcardController.resetAll();
      });
    }
  }

  if (window.QuizModule) {
    const quizController = new window.QuizModule('quiz-questions-container', 'quiz-results-summary');
    await quizController.init();
  }

  // 8. Custom Modal Overlay for Educational Image Zoom
  const imagesToZoom = document.querySelectorAll('.zoomable-image');
  const modalOverlay = document.getElementById('zoom-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');

  if (modalOverlay && modalImg) {
    imagesToZoom.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        modalOverlay.style.display = 'grid';
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Biology Illustration';
      });
    });

    const closeModal = () => {
      modalOverlay.style.display = 'none';
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }
});
