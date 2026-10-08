(function initSeasonalCorporatePage() {
  'use strict';

  const COUNTER_ID = 104468814;
  const ENDPOINT = 'https://calcul.timurgromov.ru/api/v1/site/consultation-request';
  const TRACKING_KEY = 'corp_seasonal_tracking_v1';
  const CAMPAIGN_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'yclid',
    'direct_campaign_id',
    'direct_source_type',
    'direct_region_id',
    'creative_id'
  ];

  function reachGoal(name) {
    if (typeof window.ym === 'function') {
      window.ym(COUNTER_ID, 'reachGoal', name);
    }
  }

  const seasonalCtaContext = {
    site: 'corporate',
    page: 'new_year',
    intent: 'date_check',
    placement: 'seasonal_form'
  };

  function trackCtaGoal(name, context = seasonalCtaContext) {
    window.tgCtaAnalytics?.track(name, context);
  }

  function getReferrerHost() {
    if (!document.referrer) return '';
    try {
      return new URL(document.referrer).hostname.toLowerCase();
    } catch (_) {
      return '';
    }
  }

  function getChannel(params, referrerHost) {
    const medium = (params.get('utm_medium') || '').toLowerCase();
    if (params.get('yclid') || params.get('direct_campaign_id') || /cpc|paid|ppc/.test(medium)) return 'paid';
    if (/yandex\.|google\./.test(referrerHost)) return 'organic';
    if (referrerHost && referrerHost !== window.location.hostname) return 'referral';
    return 'direct';
  }

  function getEngine(referrerHost, params) {
    const source = (params.get('utm_source') || '').toLowerCase();
    if (source.includes('yandex') || referrerHost.includes('yandex.')) return 'yandex';
    if (source.includes('google') || referrerHost.includes('google.')) return 'google';
    return '';
  }

  function collectTracking() {
    const params = new URLSearchParams(window.location.search);
    const referrerHost = getReferrerHost();
    const campaignParams = {};

    CAMPAIGN_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) campaignParams[key] = value.slice(0, 500);
    });

    const current = {
      campaignParams,
      yclid: (params.get('yclid') || '').slice(0, 255),
      attributionContext: {
        channel: getChannel(params, referrerHost),
        engine: getEngine(referrerHost, params),
        referrer_host: referrerHost,
        landing_path: window.location.pathname
      }
    };

    try {
      const saved = JSON.parse(window.sessionStorage.getItem(TRACKING_KEY) || 'null');
      if (saved && typeof saved === 'object') return saved;
      window.sessionStorage.setItem(TRACKING_KEY, JSON.stringify(current));
    } catch (_) {
      return current;
    }

    return current;
  }

  function cleanPhone(value) {
    const digits = String(value || '').replace(/\D/g, '');
    if (digits.length === 11 && digits.startsWith('8')) return `+7${digits.slice(1)}`;
    if (digits.length === 10) return `+7${digits}`;
    return digits ? `+${digits}` : '';
  }

  function equipmentLabel(value) {
    return {
      host_dj: 'Ведущий + DJ',
      host_dj_sound: 'Ведущий + DJ + аппаратура',
      host_dj_sound_vocalists: 'Ведущий + DJ + аппаратура + 3 блока по 30 минут: два вокалиста',
      host_dj_sound_vocalists_sax: 'Ведущий + DJ + аппаратура + 3 блока по 30 минут: два вокалиста и саксофонист',
      host_dj_sound_vocalists_sax_guitar: 'Ведущий + DJ + аппаратура + 3 блока по 30 минут: два вокалиста, саксофонист и гитарист',
      unknown: 'Нужна консультация по составу'
    }[value] || 'Не указано';
  }

  const tracking = collectTracking();
  reachGoal('corporate_seasonal_view');

  document.querySelectorAll('[data-seasonal-goal]').forEach((element) => {
    element.addEventListener('click', () => reachGoal(element.dataset.seasonalGoal));
  });

  document.querySelectorAll('[data-seasonal-video]').forEach((videoWrapper) => {
    videoWrapper.addEventListener('click', (event) => {
      if (event.target.closest('.play-button')) reachGoal('corporate_video_play');
    }, { once: true });
  });

  function formatRubles(value) {
    return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
  }

  function parseEventDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ''))) return null;
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return null;
    const localValue = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
    return localValue === value ? date : null;
  }

  function isFutureEventDate(value) {
    const eventDate = parseEventDate(value);
    if (!eventDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  }

  function initSeasonalPricing() {
    const root = document.querySelector('[data-seasonal-pricing]');
    if (!root) return null;

    const dateInput = root.querySelector('[data-pricing-date]');
    const selectedDate = root.querySelector('[data-pricing-selected-date]');
    const dateAction = root.querySelector('[data-pricing-date-action]');
    const rows = Array.from(document.querySelectorAll('[data-pricing-row]')).map((row) => ({
      fromDay: Number(row.dataset.dateFrom),
      toDay: Number(row.dataset.dateTo),
      hostDj: Number(row.dataset.hostDj),
      hostDjSound: Number(row.dataset.hostDjSound),
      extension: Number(row.dataset.extension)
    }));
    const cards = Array.from(document.querySelectorAll('[data-pricing-package]'));
    const extensionOutputs = Array.from(root.querySelectorAll('[data-pricing-extension]'));
    const leadDate = document.querySelector('[data-seasonal-form] [name="event_date"]');
    const liveMusicAddon = 150000;
    const annualQuote = {
      hostDj: Number(root.dataset.annualHostDj),
      hostDjSound: Number(root.dataset.annualHostDjSound),
      extension: Number(root.dataset.annualExtension)
    };
    let currentQuote = null;

    function readDay(value) {
      const match = /^2026-12-(\d{2})$/.exec(String(value || ''));
      if (!match) return null;
      const day = Number(match[1]);
      return day >= 1 && day <= 31 ? day : null;
    }

    function getQuote(value) {
      if (!isFutureEventDate(value)) return null;
      const day = readDay(value);
      if (!day) return {
        ...annualQuote,
        liveMusic: annualQuote.hostDjSound + liveMusicAddon,
        fromPrice: true,
        annual: true
      };
      const row = rows.find((item) => day >= item.fromDay && day <= item.toDay);
      if (!row) return null;
      return {
        ...row,
        day,
        liveMusic: row.hostDjSound + liveMusicAddon,
        fromPrice: day === 31,
        annual: false
      };
    }

    function getPublicPrice(value, packageValue) {
      const quote = getQuote(value);
      if (!quote) return null;
      if (packageValue === 'host_dj') return { value: quote.hostDj, fromPrice: quote.fromPrice };
      if (packageValue === 'host_dj_sound') return { value: quote.hostDjSound, fromPrice: quote.fromPrice };
      if (String(packageValue || '').startsWith('host_dj_sound_vocalists')) return { value: quote.liveMusic, fromPrice: true };
      return null;
    }

    function formatSelectedDate(value) {
      const date = parseEventDate(value);
      return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric', month: 'long', year: 'numeric', weekday: 'long'
      }).format(date);
    }

    function update(value, { syncLead = true } = {}) {
      currentQuote = getQuote(value);
      if (!currentQuote) {
        selectedDate.textContent = 'Базовая цена на даты вне декабря 2026';
        if (dateAction) dateAction.textContent = 'Выбрать дату';
        extensionOutputs.forEach((output) => { output.textContent = output.dataset.pricingInitial || '—'; });
        cards.forEach((card) => {
          const price = card.querySelector('[data-pricing-value]');
          const caption = card.querySelector('[data-pricing-caption]');
          if (price) price.textContent = price.dataset.pricingInitial || '—';
          if (caption) {
            caption.textContent = '';
            caption.hidden = true;
          }
        });
        return;
      }

      const dateLabel = formatSelectedDate(value);
      selectedDate.textContent = `Выбрана дата: ${dateLabel}${currentQuote.annual ? ' · базовая цена' : ''}`;
      if (dateAction) dateAction.textContent = 'Изменить дату';
      extensionOutputs.forEach((output) => { output.textContent = `${currentQuote.annual ? 'от ' : ''}${formatRubles(currentQuote.extension)}`; });

      cards.forEach((card) => {
        const key = card.dataset.pricingPackage;
        const amount = currentQuote[key];
        const prefix = key === 'liveMusic' || currentQuote.fromPrice ? 'от ' : '';
        const price = card.querySelector('[data-pricing-value]');
        const caption = card.querySelector('[data-pricing-caption]');
        if (price) price.textContent = `${prefix}${formatRubles(amount)}`;
        if (caption) {
          caption.textContent = dateLabel;
          caption.hidden = false;
        }
      });

      if (syncLead && leadDate) leadDate.value = value;
    }

    function openDatePicker() {
      if (!dateInput) return;
      dateInput.focus({ preventScroll: false });
      if (typeof dateInput.showPicker === 'function') {
        try {
          dateInput.showPicker();
        } catch {}
      }
    }

    dateInput?.addEventListener('input', () => update(dateInput.value));
    dateInput?.addEventListener('change', () => update(dateInput.value));
    dateInput?.addEventListener('click', openDatePicker);
    dateInput?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openDatePicker();
      }
    });
    leadDate?.addEventListener('input', () => {
      if (dateInput) dateInput.value = leadDate.value;
      update(leadDate.value, { syncLead: false });
    });

    if (leadDate?.value && dateInput) {
      dateInput.value = leadDate.value;
      update(leadDate.value, { syncLead: false });
    }
    return { getQuote, getPublicPrice };
  }

  const pricingController = initSeasonalPricing();

  const form = document.querySelector('[data-seasonal-form]');
  const status = document.querySelector('[data-form-status]');
  const success = document.querySelector('[data-form-success]');
  if (!form || !status || !success) return;

  let formStarted = false;
  form.addEventListener('input', () => {
    if (formStarted) return;
    formStarted = true;
    reachGoal('corporate_form_start');
    trackCtaGoal('form_start');
  });

  form.addEventListener('invalid', () => {
    status.textContent = 'Проверьте обязательные поля.';
    status.dataset.state = 'error';
  }, true);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      const invalidField = Array.from(form.querySelectorAll('[required]')).find((field) => !field.validity.valid);
      form.reportValidity();
      status.textContent = {
        event_date: 'Укажите дату мероприятия.',
        guests_count: 'Укажите количество гостей от 10 до 1000.',
        equipment_needed: 'Выберите состав или вариант «Пока не знаю».',
        name: 'Укажите, как к вам обращаться.',
        phone: 'Укажите номер телефона.'
      }[invalidField?.name] || 'Проверьте заполненные поля.';
      status.dataset.state = 'error';
      return;
    }

    const data = new FormData(form);
    if (!isFutureEventDate(data.get('event_date'))) {
      status.textContent = 'Выберите сегодняшнюю или будущую дату мероприятия.';
      status.dataset.state = 'error';
      form.querySelector('[name="event_date"]').focus();
      return;
    }
    if (!String(data.get('name') || '').trim()) {
      status.textContent = 'Укажите, как к вам обращаться.';
      status.dataset.state = 'error';
      form.querySelector('[name="name"]').focus();
      return;
    }
    const phone = cleanPhone(data.get('phone'));
    const phoneDigits = phone.replace(/\D/g, '');
    const subscriber = phoneDigits.length === 11 && /^[78]/.test(phoneDigits) ? phoneDigits.slice(1) : phoneDigits;
    if (phoneDigits.length < 10 || phoneDigits.length > 15 || /^(\d)\1+$/.test(subscriber)) {
      status.textContent = 'Укажите действующий номер телефона из 10–15 цифр.';
      status.dataset.state = 'error';
      form.elements.phone.focus();
      return;
    }

    const submit = form.querySelector('button[type="submit"]');
    const company = String(data.get('company') || '').trim();
    const commentLines = [
      'Запрос: новогодний корпоратив',
      `Дата: ${data.get('event_date')}`,
      `Гостей: ${data.get('guests_count')}`,
      `Комплект: ${equipmentLabel(data.get('equipment_needed'))}`
    ];
    const quote = pricingController?.getQuote(data.get('event_date'));
    const publicPrice = pricingController?.getPublicPrice(data.get('event_date'), data.get('equipment_needed'));
    if (quote && publicPrice) {
      commentLines.push(`Ориентир на сайте за 5 часов: ${publicPrice.fromPrice ? 'от ' : ''}${formatRubles(publicPrice.value)}`);
      commentLines.push(`Ориентир за 6 часов: ${publicPrice.fromPrice ? 'от ' : ''}${formatRubles(publicPrice.value + quote.extension)}`);
      commentLines.push(`Дополнительный час: ${quote.annual ? 'от ' : ''}${formatRubles(quote.extension)} за каждый начатый час`);
    }
    if (company) commentLines.push(`Компания / площадка: ${company}`);

    const payload = {
      name: String(data.get('name') || '').trim(),
      phone,
      comment: commentLines.join('\n'),
      form_source: 'site_meeting_corporate__new_year__date_check__seasonal_form',
      page_url: `${window.location.origin}${window.location.pathname}`.slice(0, 500),
      yclid: tracking.yclid || null,
      campaign_params: Object.keys(tracking.campaignParams || {}).length ? tracking.campaignParams : null,
      attribution_context: tracking.attributionContext || null,
      cta_site: seasonalCtaContext.site,
      cta_page: seasonalCtaContext.page,
      cta_intent: seasonalCtaContext.intent,
      cta_placement: seasonalCtaContext.placement
    };

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 12000);

    submit.disabled = true;
    submit.textContent = 'Отправляем…';
    status.textContent = 'Передаём заявку в рабочий контур.';
    status.dataset.state = 'sending';

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'omit',
        signal: controller.signal,
        body: JSON.stringify(payload)
      });

      if (response.status !== 201) throw new Error('lead_not_created');

      form.hidden = true;
      success.hidden = false;
      reachGoal('corporate_lead_submit_success');
      trackCtaGoal('lead_submit_success');
    } catch (_) {
      status.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз или позвоните по номеру выше.';
      status.dataset.state = 'error';
      submit.disabled = false;
      submit.textContent = 'Повторить отправку';
      reachGoal('corporate_form_error');
      trackCtaGoal('lead_submit_error');
    } finally {
      window.clearTimeout(timeoutId);
    }
  });

  const previewState = new URLSearchParams(window.location.search).get('preview_form_state');
  const isLocalPreview = ['127.0.0.1', 'localhost'].includes(window.location.hostname);
  if (isLocalPreview && previewState === 'success') {
    form.hidden = true;
    success.hidden = false;
  }
  if (isLocalPreview && previewState === 'error') {
    status.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз или позвоните по номеру выше.';
    status.dataset.state = 'error';
  }
})();
