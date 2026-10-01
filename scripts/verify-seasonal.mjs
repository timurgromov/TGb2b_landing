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

function expectBefore(source, first, second, label) {
  if (source.indexOf(first) === -1 || source.indexOf(second) === -1 || source.indexOf(first) >= source.indexOf(second)) {
    throw new Error(`${label}: expected ${JSON.stringify(first)} before ${JSON.stringify(second)}`);
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
expectText(rootHtml, 'data-testid="evening-flow"', 'root evening flow');
expectText(rootHtml, 'Как проходит корпоратив', 'root evening flow');
expectText(rootHtml, 'data-proof-cases-grid', 'root proof case grid');
expectText(rootHtml, 'Корпоративы глазами заказчиков', 'root proof heading');
expectCount(rootHtml, 'data-proof-case>', 4, 'root proof case count');
expectText(rootHtml, 'Все 13 писем', 'root proof archive link');
rejectText(rootHtml, 'Четыре мероприятия — коротко о формате и обратной связи.', 'root technical proof subtitle');
expectText(rootHtml, 'data-testid="faq-section"', 'root FAQ');
expectText(rootHtml, 'data-testid="music-program"', 'root music program');
expectText(rootHtml, 'Три музыкальных блока по 30 минут', 'root music program');
expectText(rootHtml, 'Два вокалиста + саксофонист + гитарист', 'root music program');
expectText(rootHtml, 'Что такое бэклайн?', 'root music program');
expectBefore(rootHtml, 'data-testid="music-program"', 'data-testid="proof-cases"', 'root music program placement');

expectText(seasonalHtml, 'Ведущий на новогодний корпоратив в Москве', 'seasonal route');
rejectText(seasonalHtml, 'Ведущий на новогодний корпоратив 2026', 'seasonal public offer');
rejectText(seasonalHtml, 'Декабрь 2026', 'seasonal public offer');
expectText(seasonalHtml, '<span class="tag">Декабрь</span>', 'seasonal month tag');
expectText(seasonalHtml, 'Тимур Громов — ведущий, который держит темп вечера, бережно вовлекает гостей и собирает программу под характер вашей компании.', 'seasonal offer');
expectText(seasonalHtml, 'data-testid="seasonal-primary-cta"', 'seasonal route');
expectText(seasonalHtml, 'data-testid="seasonal-lead-form"', 'seasonal route');
expectText(seasonalHtml, 'data-testid="service-formats"', 'seasonal formats');
expectText(seasonalHtml, 'data-testid="evening-flow"', 'seasonal evening flow');
expectText(seasonalHtml, 'Как проходит корпоратив', 'seasonal evening flow');
expectText(seasonalHtml, 'data-testid="proof-cases"', 'seasonal proof cases');
expectText(seasonalHtml, 'data-proof-cases-grid', 'seasonal proof case grid');
expectText(seasonalHtml, 'data-proof-case', 'seasonal proof case card');
expectText(seasonalHtml, 'Корпоративы глазами заказчиков', 'seasonal proof heading');
expectText(seasonalHtml, 'НПФ «Экопром»', 'fourth proof case');
expectText(seasonalHtml, '/assets/letters/L3.webp', 'fourth proof letter');
expectCount(seasonalHtml, 'data-proof-case>', 4, 'seasonal proof case count');
expectText(seasonalHtml, 'class="letters-slider', 'seasonal full letter archive');
expectText(seasonalHtml, 'Все 13 писем', 'seasonal proof archive link');
rejectText(seasonalHtml, 'Четыре мероприятия — коротко о формате и обратной связи.', 'seasonal technical proof subtitle');
rejectText(seasonalHtml, 'data-proof-priority="featured"', 'seasonal proof hierarchy');
expectText(seasonalHtml, 'data-testid="faq-section"', 'seasonal FAQ');
expectText(seasonalHtml, 'data-testid="music-program"', 'seasonal music program');
expectText(seasonalHtml, 'Три музыкальных блока по 30 минут', 'seasonal music program');
expectText(seasonalHtml, 'Два вокалиста + саксофонист + гитарист', 'seasonal music program');
expectText(seasonalHtml, 'href="#proverit-datu">Обсудить музыкальный состав', 'seasonal music CTA');
expectBefore(seasonalHtml, 'data-testid="music-program"', 'data-testid="proof-cases"', 'seasonal music program placement');
expectText(seasonalHtml, 'Ведущий + DJ + аппаратура + 3 блока по 30 минут: два вокалиста', 'seasonal vocalists package');
expectText(seasonalHtml, 'Ведущий + DJ + аппаратура + 3 блока по 30 минут: два вокалиста и саксофонист', 'seasonal saxophone package');
expectText(seasonalHtml, 'Ведущий + DJ + аппаратура + 3 блока по 30 минут: два вокалиста, саксофонист и гитарист', 'seasonal guitar package');
rejectText(seasonalHtml, '<option value="host">Только ведущий</option>', 'seasonal package contract');
expectText(seasonalHtml, 'https://corp.timurgromov.ru/novogodniy-korporativ/', 'seasonal canonical');
expectText(seasonalHtml, '/style.css?v=astro_8', 'main site stylesheet');
expectText(seasonalHtml, '/mobile.css?v=astro_3', 'main site mobile stylesheet');
expectText(seasonalHtml, '/script.js?v=astro_4', 'main site script');
expectText(seasonalHtml, '/seasonal.css?v=20260930c', 'seasonal form stylesheet');
expectText(seasonalHtml, '/seasonal.js?v=20261001b', 'seasonal script');
expectText(seasonalHtml, '/privacy/', 'seasonal privacy link');
rejectText(seasonalHtml, 'TELEGRAM_LEAD_ENDPOINT', 'seasonal route');

expectText(rootHtml, 'aria-label="Новогодние корпоративы"', 'root seasonal promo');
expectText(rootHtml, '>Новогодний сезон</p>', 'root seasonal promo');
rejectText(rootHtml, 'Новогодние корпоративы 2026', 'root seasonal promo');
rejectText(rootHtml, 'Новогодний сезон 2026', 'root seasonal promo');

expectText(privacyHtml, 'Политика конфиденциальности', 'privacy route');
expectText(privacyHtml, 'Согласие на обработку персональных данных', 'privacy route');

expectText(seasonalScript, 'https://calcul.timurgromov.ru/api/v1/site/consultation-request', 'lead contract');
expectText(seasonalScript, "form_source: 'site_meeting_corporate'", 'lead contract');
expectText(seasonalScript, "host_dj_sound_vocalists: 'Ведущий + DJ + аппаратура + 3 блока по 30 минут: два вокалиста'", 'lead vocalists package contract');
expectText(seasonalScript, "host_dj_sound_vocalists_sax: 'Ведущий + DJ + аппаратура + 3 блока по 30 минут: два вокалиста и саксофонист'", 'lead saxophone package contract');
expectText(seasonalScript, "host_dj_sound_vocalists_sax_guitar: 'Ведущий + DJ + аппаратура + 3 блока по 30 минут: два вокалиста, саксофонист и гитарист'", 'lead guitar package contract');
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
