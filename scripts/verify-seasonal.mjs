import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');

async function read(relativePath) {
  return readFile(resolve(root, relativePath), 'utf8');
}

function expectText(source, expected, label) {
  if (!source.includes(expected)) {
    throw new Error(`${label}: missing ${JSON.stringify(expected)}`);
  }
}

function rejectText(source, unexpected, label) {
  if (source.includes(unexpected)) {
    throw new Error(`${label}: unexpected ${JSON.stringify(unexpected)}`);
  }
}

function expectCount(source, expected, count, label) {
  const actual = source.split(expected).length - 1;
  if (actual !== count) {
    throw new Error(`${label}: expected ${count}, got ${actual}`);
  }
}

const [rootHtml, seasonalHtml, privacyHtml, sharedScript, seasonalScript, sitemap] = await Promise.all([
  read('dist/index.html'),
  read('dist/novogodniy-korporativ/index.html'),
  read('dist/privacy/index.html'),
  read('public/script.js'),
  read('public/seasonal.js'),
  read('public/sitemap.xml')
]);

expectText(rootHtml, 'Интеллигентный ведущий на корпоратив в Москве', 'root regression');
expectText(rootHtml, 'Обсудить корпоратив', 'root regression');
expectText(rootHtml, 'Назначить встречу', 'root regression');
expectText(rootHtml, 'Перейти к новогодним корпоративам', 'root seasonal promo');
expectText(rootHtml, 'data-testid="proof-cases"', 'root proof cases');
expectText(rootHtml, 'data-proof-cases-grid', 'root proof case grid');
expectText(rootHtml, 'Корпоративы глазами заказчиков', 'root proof heading');
expectText(rootHtml, 'data-testid="faq-section"', 'root FAQ');

expectText(seasonalHtml, 'Ведущий на новогодний корпоратив 2026 в Москве', 'seasonal route');
expectText(seasonalHtml, 'Тимур Громов — ведущий, который держит темп вечера, бережно вовлекает гостей и собирает программу под характер вашей компании.', 'seasonal offer');
expectText(seasonalHtml, 'data-testid="seasonal-primary-cta"', 'seasonal route');
expectText(seasonalHtml, 'data-testid="seasonal-lead-form"', 'seasonal route');
expectText(seasonalHtml, 'data-testid="service-formats"', 'seasonal formats');
expectText(seasonalHtml, 'data-testid="proof-cases"', 'seasonal proof cases');
expectText(seasonalHtml, 'data-proof-cases-grid', 'seasonal proof case grid');
expectText(seasonalHtml, 'data-proof-case', 'seasonal proof case card');
expectText(seasonalHtml, 'Корпоративы глазами заказчиков', 'seasonal proof heading');
expectText(seasonalHtml, 'НПФ «Экопром»', 'fourth proof case');
expectText(seasonalHtml, '/assets/letters/L3.webp', 'fourth proof letter');
expectCount(seasonalHtml, 'data-proof-case>', 4, 'seasonal proof case count');
expectText(seasonalHtml, 'class="letters-slider', 'seasonal full letter archive');
expectText(seasonalHtml, 'Все 13 писем', 'seasonal proof archive link');
rejectText(seasonalHtml, 'data-proof-priority="featured"', 'seasonal proof hierarchy');
expectText(seasonalHtml, 'data-testid="faq-section"', 'seasonal FAQ');
expectText(seasonalHtml, 'Ведущий + DJ + аппаратура + кавер-группа', 'seasonal premium package');
rejectText(seasonalHtml, '<option value="host">Только ведущий</option>', 'seasonal package contract');
expectText(seasonalHtml, 'https://corp.timurgromov.ru/novogodniy-korporativ/', 'seasonal canonical');
expectText(seasonalHtml, '/style.css?v=astro_5', 'main site stylesheet');
expectText(seasonalHtml, '/mobile.css?v=astro_2', 'main site mobile stylesheet');
expectText(seasonalHtml, '/script.js?v=astro_4', 'main site script');
expectText(seasonalHtml, '/seasonal.css?v=20260930c', 'seasonal form stylesheet');
expectText(seasonalHtml, '/seasonal.js?v=20260930d', 'seasonal script');
expectText(seasonalHtml, '/privacy/', 'seasonal privacy link');
rejectText(seasonalHtml, 'TELEGRAM_LEAD_ENDPOINT', 'seasonal route');

expectText(privacyHtml, 'Политика конфиденциальности', 'privacy route');
expectText(privacyHtml, 'Согласие на обработку персональных данных', 'privacy route');

expectText(seasonalScript, 'https://calcul.timurgromov.ru/api/v1/site/consultation-request', 'lead contract');
expectText(seasonalScript, "form_source: 'site_meeting_corporate'", 'lead contract');
expectText(seasonalScript, "host_dj_sound_band: 'Ведущий + DJ + аппаратура + кавер-группа'", 'lead package contract');
expectText(seasonalScript, 'response.status !== 201', 'confirmed lead gate');
expectText(seasonalScript, "reachGoal('corporate_lead_submit_success')", 'confirmed lead goal');
expectText(seasonalScript, 'window.location.origin}${window.location.pathname}', 'sanitized page URL');

expectText(sharedScript, 'https://calcul.timurgromov.ru/api/v1/site/consultation-request', 'shared lead contract');
expectText(sharedScript, "form_source: 'site_meeting_corporate'", 'shared lead contract');
expectText(sharedScript, 'response.status === 201', 'shared confirmed lead gate');
expectText(sharedScript, "reachGoal', 'corporate_lead_submit_success'", 'shared confirmed lead goal');
expectText(sharedScript, '[data-proof-cases-grid]', 'shared proof lightbox contract');
rejectText(sharedScript, 'TELEGRAM_LEAD_ENDPOINT', 'shared lead contract');

expectText(sitemap, 'https://corp.timurgromov.ru/novogodniy-korporativ/', 'sitemap');
expectText(sitemap, 'https://corp.timurgromov.ru/privacy/', 'sitemap');

console.log('PASS: seasonal landing, lead contract, privacy route, sitemap and root regression');
