(function () {
  const counterId = 104468814;
  const endpoint = location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? 'http://127.0.0.1:8000/api/v1/site/metrika-attribution'
    : 'https://calcul.timurgromov.ru/api/v1/site/metrika-attribution';
  const campaignKeys = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
    'direct_campaign_id', 'direct_source_type', 'direct_region_id'
  ];

  function visitKey() {
    try {
      let key = sessionStorage.getItem('tg_corporate_visit_key');
      if (key && /^[A-Za-z0-9_-]{20,80}$/.test(key)) return key;
      const bytes = crypto.getRandomValues(new Uint8Array(24));
      key = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
      sessionStorage.setItem('tg_corporate_visit_key', key);
      return key;
    } catch (_) {
      return Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    }
  }

  function tracking() {
    const query = new URLSearchParams(location.search);
    let stored = {};
    try { stored = JSON.parse(sessionStorage.getItem('tg_corporate_campaign') || '{}'); } catch (_) {}
    const campaign = {};
    for (const key of campaignKeys) {
      const value = query.get(key) || stored.campaign?.[key];
      if (value) campaign[key] = String(value).slice(0, 500);
    }
    const yclid = String(query.get('yclid') || stored.yclid || '').slice(0, 255);
    try { sessionStorage.setItem('tg_corporate_campaign', JSON.stringify({ campaign, yclid })); } catch (_) {}
    return { campaign, yclid };
  }

  function clientId() {
    return new Promise(resolve => {
      let complete = false;
      const finish = value => {
        if (complete) return;
        complete = true;
        resolve(String(value || '').trim());
      };
      try { window.ym?.(counterId, 'getClientID', finish); } catch (_) { finish(''); }
      setTimeout(() => finish(''), 2500);
    });
  }

  async function attributedUrl(source) {
    const fallback = `https://t.me/gromov_wedding_bot?start=${encodeURIComponent(source)}`;
    const info = tracking();
    const cid = await clientId();
    if (!cid && !info.yclid) return fallback;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        credentials: 'omit',
        signal: controller.signal,
        body: JSON.stringify({
          visit_key: visitKey(),
          source_code: source,
          provider: 'telegram',
          client_id: cid || null,
          yclid: info.yclid || null,
          campaign_params: info.campaign,
          landing_url: location.href,
          cta_code: source
        })
      });
      if (!response.ok) return fallback;
      const payload = await response.json();
      return /^yd_[A-Za-z0-9_-]{20,40}$/.test(payload.start_payload || '')
        ? `https://t.me/gromov_wedding_bot?start=${payload.start_payload}`
        : fallback;
    } catch (_) {
      return fallback;
    } finally {
      clearTimeout(timer);
    }
  }

  tracking();
  document.addEventListener('click', event => {
    const anchor = event.target.closest?.('a[data-bot-source]');
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const source = anchor.dataset.botSource || '';
    if (!/^site_meeting_corporate__(corporate|new_year)__[a-z0-9_]{1,20}$/.test(source)) return;
    event.preventDefault();
    const popup = window.open('about:blank', '_blank');
    if (popup) popup.opener = null;
    attributedUrl(source).then(url => {
      if (popup && !popup.closed) popup.location.href = url;
      else location.href = url;
    });
  }, true);
}());
