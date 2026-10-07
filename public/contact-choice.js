function initContactChoice() {
  const dialog = document.getElementById('contact-choice-dialog');
  const sheet = dialog?.querySelector('.contact-choice__sheet');
  const fab = document.querySelector('[data-contact-fab]');
  const description = dialog?.querySelector('[data-contact-description]');
  const callback = dialog?.querySelector('[data-contact-callback]');
  const telegram = dialog?.querySelector('[data-contact-telegram]');
  const phone = dialog?.querySelector('[data-contact-phone]');
  const contactFormTrigger = document.querySelector('[data-contact-form-trigger]');
  const videoFormTrigger = document.querySelector('[data-contact-video-trigger]');
  if (!dialog || !sheet || !fab || !callback) return;

  let opener = null;
  let formSource = 'contact_popup';
  let formKind = 'contact';
  let ctaContext = { site: 'corporate', page: 'corporate', intent: 'consultation', placement: 'contact_panel' };

  function track(goal) {
    window.tgCtaAnalytics?.track(goal, ctaContext);
  }

  function contextFrom(trigger) {
    const base = {
      site: trigger.dataset.ctaSite || 'corporate',
      page: trigger.dataset.ctaPage || dialog.dataset.ctaPage || 'corporate',
      intent: trigger.dataset.contactIntent || 'consultation',
      placement: trigger.dataset.contactPlacement || 'contact_panel'
    };
    return window.tgCtaAnalytics?.normalize(base) || base;
  }

  function updateFab() {
    fab.classList.toggle('is-visible', window.scrollY > window.innerHeight);
  }

  function close({ restoreFocus = true } = {}) {
    if (dialog.hidden) return;
    const focusTarget = opener;
    dialog.hidden = true;
    unlockPageScroll();
    updateFab();
    if (restoreFocus && focusTarget?.isConnected) {
      window.setTimeout(() => focusTarget.focus(), 80);
    }
    opener = null;
  }

  function open(trigger) {
    opener = trigger;
    formSource = trigger.dataset.contactSource || trigger.dataset.formSource || 'contact_popup';
    formKind = trigger.dataset.contactForm || 'contact';
    ctaContext = contextFrom(trigger);
    const source = `site_meeting_corporate__${ctaContext.page === 'new_year' ? 'new_year' : 'corporate'}__${ctaContext.placement}`;
    telegram.dataset.botSource = source;
    telegram.href = `https://calcul.timurgromov.ru/api/v1/site/messenger-start?provider=telegram&mode=start&payload=${encodeURIComponent(source)}`;
    description.textContent = trigger.dataset.contactIntent === 'materials'
      ? 'Запустите бот, позвоните или оставьте номер. Я лично отвечу и поделюсь подходящими материалами.'
      : 'Запустите бот, позвоните или оставьте номер. Я лично отвечу на запрос.';
    dialog.hidden = false;
    lockPageScroll();
    sheet.focus();
    track('cta_open');
    if (ctaContext.intent === 'materials') track('materials_request');
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest?.('[data-contact-open]');
    if (!trigger) return;
    event.preventDefault();
    open(trigger);
  }, true);
  dialog.querySelectorAll('[data-contact-close]').forEach(control => {
    control.addEventListener('click', () => close());
  });
  callback.addEventListener('click', () => {
    const trigger = formKind === 'video' ? videoFormTrigger : contactFormTrigger;
    if (!trigger) return;
    trigger.dataset.formSource = formSource;
    trigger.dataset.ctaSite = ctaContext.site;
    trigger.dataset.ctaPage = ctaContext.page;
    trigger.dataset.ctaIntent = ctaContext.intent;
    trigger.dataset.ctaPlacement = ctaContext.placement;
    close({ restoreFocus: false });
    trigger.click();
    window.setTimeout(() => {
      document.querySelector(formKind === 'video' ? '#video-consult-name' : '#contact-name')?.focus();
    }, 80);
  });
  telegram?.addEventListener('click', () => track('telegram_click'));
  phone?.addEventListener('click', () => track('phone_click'));
  document.addEventListener('keydown', event => {
    if (dialog.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const focusable = [...sheet.querySelectorAll('a[href],button:not([disabled])')];
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === sheet)) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
  window.addEventListener('scroll', updateFab, { passive: true });
  window.addEventListener('resize', updateFab);
  updateFab();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactChoice, { once: true });
} else {
  initContactChoice();
}
