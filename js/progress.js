/**
 * BioProgress — shared cross-lesson progress tracker.
 *
 * A single localStorage record (`bio3sec_progress_v1`) is written to by each
 * lesson's quiz on completion, and read by the hub page to render the
 * "My Progress" panel and the printable certificate. Client-side only —
 * no backend, no account system — but it turns three independent lesson
 * pages into one platform that remembers the learner across visits.
 */
(function (window) {
  'use strict';

  var STORAGE_KEY = 'bio3sec_progress_v1';
  var NAME_KEY = 'bio3sec_student_name';

  var LESSON_META = {
    lesson1: { order: 1, path: 'أول درس/index.html' },
    lesson2: { order: 2, path: 'ثاني درس/index.html' },
    lesson3: { order: 3, path: 'ثالث درس/index.html' }
  };

  function readAll() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn('BioProgress: could not read stored progress', e);
      return {};
    }
  }

  function writeAll(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('BioProgress: could not persist progress', e);
    }
  }

  /**
   * Record (or improve) a lesson result. Keeps the best score seen so a
   * retake never erases a better previous attempt.
   */
  function save(lessonId, score, total) {
    if (!LESSON_META[lessonId] || !total) return;
    var all = readAll();
    var pct = Math.round((score / total) * 100);
    var existing = all[lessonId];

    if (!existing || pct >= existing.percentage) {
      all[lessonId] = {
        score: score,
        total: total,
        percentage: pct,
        completed: true,
        date: new Date().toISOString()
      };
      writeAll(all);
    }
    return all[lessonId];
  }

  function get(lessonId) {
    var all = readAll();
    return lessonId ? (all[lessonId] || null) : all;
  }

  function isAllComplete() {
    var all = readAll();
    return Object.keys(LESSON_META).every(function (id) {
      return all[id] && all[id].completed;
    });
  }

  function getStudentName() {
    try {
      return localStorage.getItem(NAME_KEY) || '';
    } catch (e) {
      return '';
    }
  }

  function setStudentName(name) {
    try {
      localStorage.setItem(NAME_KEY, (name || '').trim());
    } catch (e) { /* no-op */ }
  }

  function clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* no-op */ }
  }

  window.BioProgress = {
    LESSON_META: LESSON_META,
    save: save,
    get: get,
    isAllComplete: isAllComplete,
    getStudentName: getStudentName,
    setStudentName: setStudentName,
    clear: clear
  };
})(window);
