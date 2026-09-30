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
      host: 'Только ведущий',
      host_dj: 'Ведущий + DJ',
      host_dj_sound: 'Ведущий + DJ + аппаратура',
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

  const form = document.querySelector('[data-seasonal-form]');
  const status = document.querySelector('[data-form-status]');
  const success = document.querySelector('[data-form-success]');
  if (!form || !status || !success) return;

  let formStarted = false;
  form.addEventListener('input', () => {
    if (formStarted) return;
    formStarted = true;
    reachGoal('corporate_form_start');
  });

  form.addEventListener('invalid', () => {
    status.textContent = 'Проверьте обязательные поля.';
    status.dataset.state = 'error';
  }, true);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = 'Проверьте обязательные поля.';
      status.dataset.state = 'error';
      return;
    }

    const data = new FormData(form);
    const phone = cleanPhone(data.get('phone'));
    if (phone.length < 12) {
      status.textContent = 'Проверьте номер телефона.';
      status.dataset.state = 'error';
      form.elements.phone.focus();
      return;
    }

    const submit = form.querySelector('button[type="submit"]');
    const company = String(data.get('company') || '').trim();
    const commentLines = [
      'Запрос: новогодний корпоратив 2026',
      `Дата: ${data.get('event_date')}`,
      `Гостей: ${data.get('guests_count')}`,
      `Комплект: ${equipmentLabel(data.get('equipment_needed'))}`
    ];
    if (company) commentLines.push(`Компания / площадка: ${company}`);

    const payload = {
      name: String(data.get('name') || '').trim(),
      phone,
      comment: commentLines.join('\n'),
      form_source: 'site_meeting_corporate',
      page_url: `${window.location.origin}${window.location.pathname}`.slice(0, 500),
      yclid: tracking.yclid || null,
      campaign_params: Object.keys(tracking.campaignParams || {}).length ? tracking.campaignParams : null,
      attribution_context: tracking.attributionContext || null
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
    } catch (_) {
      status.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз или позвоните по номеру выше.';
      status.dataset.state = 'error';
      submit.disabled = false;
      submit.textContent = 'Повторить отправку';
      reachGoal('corporate_form_error');
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
