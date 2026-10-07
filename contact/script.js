// ===== АНАЛИТИКА: ОТСЛЕЖИВАНИЕ КЛИКОВ ПО КНОПКАМ =====
(function trackContactButtons() {
  const METRIKA_ID = 104468814;

  function sendGoal(name) {
    try {
      if (typeof ym === 'function') {
        ym(METRIKA_ID, 'reachGoal', name);
      }
    } catch (e) {
      console.error('Метрика недоступна:', e);
    }
  }

  // Отслеживание кликов по кнопкам
  document.querySelectorAll('[data-cta]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cta = btn.getAttribute('data-cta');
      if (cta) {
        sendGoal(cta);
      }
    }, { once: true });
  });
})();
