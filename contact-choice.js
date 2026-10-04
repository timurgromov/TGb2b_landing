function initContactChoice() {
  const dialog = document.getElementById('contact-choice-dialog');
  const sheet = dialog?.querySelector('.contact-choice__sheet');
  const fab = document.querySelector('[data-contact-fab]');
  const description = dialog?.querySelector('[data-contact-description]');
  const callback = dialog?.querySelector('[data-contact-callback]');
  const contactFormTrigger = document.querySelector('[data-contact-form-trigger]');
  const videoFormTrigger = document.querySelector('[data-contact-video-trigger]');
  if (!dialog || !sheet || !fab || !callback) return;

  let opener = null;
  let formSource = 'contact_popup';
  let formKind = 'contact';

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
    description.textContent = trigger.dataset.contactIntent === 'materials'
      ? 'Напишите мне, позвоните или оставьте номер. Я лично отвечу и поделюсь подходящими материалами.'
      : 'Выберите удобный способ связи. Я отвечу лично.';
    dialog.hidden = false;
    lockPageScroll();
    sheet.focus();
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
    close({ restoreFocus: false });
    trigger.click();
    window.setTimeout(() => {
      document.querySelector(formKind === 'video' ? '#video-consult-name' : '#contact-name')?.focus();
    }, 80);
  });
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
