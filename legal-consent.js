/* Explicit form consent. Receipt uses the existing CRM comment/details contract. */
(function () {
  'use strict';
  var receipts = new WeakMap();
  window.tgConsentReceipt = function (form) {
    var checkbox = form && form.querySelector('[data-legal-consent]');
    if (!checkbox || !checkbox.checked) return '';
    if (!receipts.has(form)) {
      var url = new URL(checkbox.dataset.consentUrl, window.location.origin);
      receipts.set(form, 'Согласие на обработку ПДн: ' + checkbox.value +
        '; документ: ' + url.href + '; отправлено: ' + new Date().toISOString());
    }
    return receipts.get(form);
  };
  document.addEventListener('submit', function (event) {
    var form = event.target;
    var checkbox = form.querySelector && form.querySelector('[data-legal-consent]');
    if (!checkbox) return;
    receipts.delete(form);
    if (!checkbox.checked) {
      event.preventDefault();
      event.stopImmediatePropagation();
      checkbox.focus();
      checkbox.reportValidity();
    }
  }, true);
  document.addEventListener('formdata', function (event) {
    var receipt = window.tgConsentReceipt(event.target);
    if (!receipt) return;
    var key = event.target.matches('[data-tripwire-form]') ? 'details' : 'comment';
    var value = String(event.formData.get(key) || '').trim();
    // Existing backend limit is 3000 characters. Never silently truncate a user's text.
    event.formData.set(key, [value, receipt].filter(Boolean).join('\n'));
  }, true);
  document.addEventListener('reset', function (event) { receipts.delete(event.target); }, true);
  document.addEventListener('change', function (event) {
    if (event.target.matches('[data-legal-consent]')) receipts.delete(event.target.form);
  }, true);
}());
