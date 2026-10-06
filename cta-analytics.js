(function initCorporateCtaAnalytics() {
  const COUNTER_ID = 104468814;
  const goalNames = new Set([
    'cta_open',
    'telegram_click',
    'phone_click',
    'form_start',
    'lead_submit_success',
    'lead_submit_error',
    'materials_request'
  ]);
  const contextFields = ['site', 'page', 'intent', 'placement'];

  function token(value, fallback) {
    const normalized = String(value || '').trim().toLowerCase();
    return /^[a-z0-9][a-z0-9_-]{0,63}$/.test(normalized) ? normalized : fallback;
  }

  function normalize(context) {
    const value = context || {};
    return {
      site: token(value.site, 'corporate'),
      page: token(value.page, 'corporate'),
      intent: token(value.intent, 'consultation'),
      placement: token(value.placement, 'contact_panel')
    };
  }

  window.tgCtaAnalytics = {
    contextFields,
    normalize,
    track(goal, context) {
      if (!goalNames.has(goal)) return;
      const cta = normalize(context);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: goal, cta });
      if (typeof window.ym === 'function') {
        window.ym(COUNTER_ID, 'reachGoal', goal, { cta });
      }
    }
  };
}());
