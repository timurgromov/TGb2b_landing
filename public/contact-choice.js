function initContactChoice() {
  const dialog = document.getElementById('contact-choice-dialog');
  const sheet = dialog?.querySelector('.contact-choice__sheet');
  const fab = document.querySelector('[data-contact-fab]');
  const description = dialog?.querySelector('[data-contact-description]');
  const selectionBox = dialog?.querySelector('[data-contact-selection]');
  const selectionTitle = dialog?.querySelector('[data-contact-selection-title]');
  const selectionDate = dialog?.querySelector('[data-contact-selection-date]');
  const selectionPrice = dialog?.querySelector('[data-contact-selection-price]');
  const callback = dialog?.querySelector('[data-contact-callback]');
  const actions = dialog?.querySelector('[data-contact-actions]');
  const note = dialog?.querySelector('[data-contact-note]');
  const form = dialog?.querySelector('[data-contact-lead-form]');
  const status = dialog?.querySelector('[data-contact-form-status]');
  const success = dialog?.querySelector('[data-contact-success]');
  const telegram = dialog?.querySelector('[data-contact-telegram]');
  const phone = dialog?.querySelector('[data-contact-phone]');
  if (!dialog || !sheet || !fab || !callback || !actions || !note || !form || !status || !success) return;

  let opener = null;
  let formSource = 'contact_popup';
  let currentSelection = null;
  let formStarted = false;
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

  function numericValue(value) {
    const digits = String(value || '').replace(/\D/g, '');
    return digits ? Number(digits) : 0;
  }

  function selectionFrom(trigger) {
    const rawCode = trigger?.dataset.packageCode;
    if (!rawCode) return null;
    const card = trigger.closest('[data-pricing-package]');
    if (!card) return null;
    const code = { hostDj: 'host_dj', hostDjSound: 'host_dj_sound', liveMusic: 'live_music' }[rawCode];
    const priceText = card.querySelector('[data-pricing-value]')?.textContent?.trim() || '';
    const extensionText = card.querySelector('[data-pricing-extension]')?.textContent?.trim() || '';
    const dateInput = document.querySelector('[data-seasonal-pricing] [data-pricing-date]');
    const dateCaption = card.querySelector('[data-pricing-caption]');
    const price = numericValue(priceText);
    const extension = numericValue(extensionText);
    if (!code || !price || !extension) return null;
    const date = dateInput?.value || '';
    const label = trigger.dataset.packageLabel || card.dataset.packageLabel || 'Выбранный вариант';
    const mode = /^от\s/i.test(priceText) ? 'from' : 'exact';
    const dateLabel = date && dateCaption?.textContent?.trim()
      ? dateCaption.textContent.trim()
      : 'Дата пока не выбрана';
    const summary = [
      `Выбранный вариант: ${label}`,
      date ? `Дата: ${dateLabel}` : '',
      `Цена на сайте: ${priceText}`,
      `Дополнительный час: ${extensionText}`
    ].filter(Boolean).join('\n');
    return {
      label,
      date,
      dateLabel,
      priceText,
      extensionText,
      summary,
      ctaCode: `package:${code}:${date || 'none'}:${price}:${extension}:${mode}`
    };
  }

  function renderSelection(selection) {
    if (!selectionBox || !selectionTitle || !selectionDate || !selectionPrice) return;
    selectionBox.hidden = !selection;
    if (!selection) return;
    selectionTitle.textContent = selection.label;
    selectionDate.textContent = selection.dateLabel;
    selectionPrice.textContent = `${selection.priceText} · доп. час ${selection.extensionText}`;
  }

  function updateFab() {
    fab.classList.toggle('is-visible', window.scrollY > window.innerHeight);
  }

  function resetForm() {
    form.reset();
    form.hidden = true;
    success.hidden = true;
    actions.hidden = false;
    note.hidden = false;
    status.textContent = '';
    delete status.dataset.state;
    formStarted = false;
    const submit = form.querySelector('button[type="submit"]');
    if (submit) {
      submit.disabled = false;
      submit.textContent = 'Отправить номер';
    }
  }

  function close({ restoreFocus = true } = {}) {
    if (dialog.hidden) return;
    const focusTarget = opener;
    dialog.hidden = true;
    unlockPageScroll();
    updateFab();
    resetForm();
    if (restoreFocus && focusTarget?.isConnected) {
      window.setTimeout(() => focusTarget.focus(), 80);
    }
    opener = null;
  }

  function open(trigger) {
    opener = trigger;
    formSource = trigger.dataset.contactSource || trigger.dataset.formSource || 'contact_popup';
    ctaContext = contextFrom(trigger);
    currentSelection = selectionFrom(trigger);
    const source = `site_meeting_corporate__${ctaContext.page === 'new_year' ? 'new_year' : 'corporate'}__${ctaContext.placement}`;
    telegram.dataset.botSource = source;
    if (currentSelection) telegram.dataset.botContext = currentSelection.ctaCode;
    else delete telegram.dataset.botContext;
    telegram.href = `https://calcul.timurgromov.ru/api/v1/site/messenger-start?provider=telegram&mode=start&payload=${encodeURIComponent(source)}`;
    description.textContent = trigger.dataset.contactIntent === 'materials'
      ? 'Запустите бот, позвоните или оставьте номер. Я лично отвечу и поделюсь подходящими материалами.'
      : 'Запустите бот, позвоните или оставьте номер. Я лично отвечу на запрос.';
    resetForm();
    renderSelection(currentSelection);
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
    actions.hidden = true;
    note.hidden = true;
    form.hidden = false;
    form.querySelector('input[name="name"]')?.focus();
  });
  telegram?.addEventListener('click', () => track('telegram_click'));
  phone?.addEventListener('click', () => track('phone_click'));
  form.addEventListener('input', () => {
    if (formStarted) return;
    formStarted = true;
    track('form_start');
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const digits = phone.replace(/\D/g, '');
    const submit = form.querySelector('button[type="submit"]');
    if (!name || digits.length < 10 || digits.length > 15) {
      status.textContent = 'Проверьте имя и номер телефона.';
      status.dataset.state = 'error';
      (!name ? form.elements.name : form.elements.phone).focus();
      return;
    }
    if (submit) {
      submit.disabled = true;
      submit.textContent = 'Отправляем…';
    }
    status.textContent = 'Передаём заявку в рабочий контур.';
    status.dataset.state = 'sending';
    const created = await window.sendCorporateLead?.(name, phone, formSource, {
      ...ctaContext,
      selectionSummary: currentSelection?.summary || ''
    });
    if (!created) {
      status.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз или позвоните по номеру выше.';
      status.dataset.state = 'error';
      if (submit) {
        submit.disabled = false;
        submit.textContent = 'Повторить отправку';
      }
      track('lead_submit_error');
      return;
    }
    form.hidden = true;
    success.hidden = false;
    status.textContent = '';
    track('lead_submit_success');
  });
  document.addEventListener('keydown', event => {
    if (dialog.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const focusable = [...sheet.querySelectorAll('a[href],button:not([disabled]),input:not([disabled])')]
      .filter(element => !element.hidden && !element.closest('[hidden]'));
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
