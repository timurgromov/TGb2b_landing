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

// ===== УМНОЕ ПЕРЕНАПРАВЛЕНИЕ ДЛЯ ТЕЛЕФОНА =====
(function initSmartPhoneRedirect() {
  function isMobilePhone() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = /ipad|android(?=.*tablet)|kindle|silk/i.test(userAgent);
    return isMobile && !isTablet;
  }

  const phoneBtn = document.querySelector('.contact-btn--phone');
  if (!phoneBtn) return;

  phoneBtn.addEventListener('click', function(e) {
    const isMobile = isMobilePhone();
    
    if (!isMobile) {
      // На планшете/компьютере — переходим в WhatsApp
      e.preventDefault();
      const phoneNumber = '+79253900772';
      const message = 'Здравствуйте, хочу обсудить корпоратив!';
      const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
    // На мобильном телефоне — обычный звонок (tel: ссылка работает автоматически)
  });
})();
