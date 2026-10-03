import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const heroSlideIds = ['01-smile', '02-microphone', '03-full-length', '04-grey-suit', '05-gesture'];

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

async function verifyDistinctHeroAssets() {
  const hashes = await Promise.all(heroSlideIds.map(async (slideId) => {
    const asset = await readFile(resolve(root, `public/assets/hero/slider/hero-${slideId}-1024.avif`));
    return createHash('sha256').update(asset).digest('hex');
  }));
  if (new Set(hashes).size !== heroSlideIds.length) {
    throw new Error('hero slider: duplicate 1024px AVIF assets detected');
  }
}

await verifyDistinctHeroAssets();

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
expectText(rootHtml, 'data-hero-slider', 'root hero slider');
expectCount(rootHtml, 'data-hero-slide ', 5, 'root hero slide count');
expectText(rootHtml, '/assets/hero/slider/hero-01-smile-1024.avif', 'root hero AVIF');
expectText(rootHtml, '/assets/hero/slider/hero-01-smile-1024.webp', 'root hero WebP fallback');
expectText(rootHtml, 'hero-01-smile-1024.avif?v=crop-20261003b', 'root hero cache-busted smile crop');
for (const slideId of heroSlideIds) {
  expectText(rootHtml, `data-slide-id=\"${slideId}\"`, `root hero slide ${slideId}`);
}
for (const slideId of heroSlideIds.slice(1)) {
  expectText(rootHtml, `hero-${slideId}-1024.avif?v=crop-20261003a`, `root hero cache-busted crop ${slideId}`);
}
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
expectText(rootHtml, 'Ведущий + DJ + звук + два вокалиста', 'root vocalists package title');
expectText(rootHtml, 'С живой музыкой', 'root live music package name');
expectText(rootHtml, 'Подробнее о живой музыке', 'root live music package link');
expectText(rootHtml, 'Техническое оснащение площадки', 'root technical package inclusion');
expectText(rootHtml, 'Три вокальных блока по 30 минут в исполнении двух вокалистов — под профессиональные аранжировки', 'root vocalists package duration copy');
expectText(rootHtml, 'Эффект живой группы — без затрат на полный состав', 'root music program economy heading');
expectText(rootHtml, 'Музыкальную часть можно дополнить саксофоном или гитарой', 'root vocalists package expansion');
rejectText(rootHtml, 'Три полноценных музыкальных блока по 30 минут с профессиональными аранжировками.', 'root obsolete vocalists package subtitle');
rejectText(rootHtml, 'Всё из состава «Ведущий + DJ»', 'root abstract package inclusion copy');
rejectText(rootHtml, 'Ведущий + DJ + звук + 3 музыкальных блока по 30 минут', 'root obsolete vocalists package title');
rejectText(rootHtml, 'Всё из среднего состава', 'root technical vocalists package copy');
expectText(rootHtml, 'data-testid="music-program"', 'root music program');
expectText(rootHtml, 'Два вокалиста: три музыкальных блока по 30 минут', 'root music program');
expectText(rootHtml, 'Третий пакет — с живой музыкой', 'root music program package context');
rejectText(rootHtml, 'class="music-program__options-title">Состав третьего пакета', 'root obsolete music program package heading');
expectText(rootHtml, 'Смотреть шоу-рил', 'root music showreel caption');
expectText(rootHtml, 'Хиты разных десятилетий', 'root music program repertoire tag');
expectText(rootHtml, 'Welcome с саксофоном', 'root music program saxophone tag');
expectText(rootHtml, 'Два вокалиста + саксофонист + гитарист', 'root music program');
rejectText(rootHtml, 'Что такое бэклайн?', 'root obsolete music jargon');
expectText(rootHtml, '/assets/music/music-program-max.avif', 'root music program image');
expectText(rootHtml, '/assets/music/music-program-max.webp', 'root music program image fallback');
expectBefore(rootHtml, 'data-testid="music-program"', 'data-testid="proof-cases"', 'root music program placement');

expectText(seasonalHtml, 'Ведущий на новогодний корпоратив в Москве', 'seasonal route');
rejectText(seasonalHtml, 'Ведущий на новогодний корпоратив 2026', 'seasonal public offer');
rejectText(seasonalHtml, 'Декабрь 2026', 'seasonal public offer');
expectText(seasonalHtml, '<span class="tag">Декабрь</span>', 'seasonal month tag');
expectText(seasonalHtml, 'Тимур Громов — ведущий, который держит темп вечера, бережно вовлекает гостей и собирает программу под характер вашей компании.', 'seasonal offer');
expectText(seasonalHtml, 'data-testid="seasonal-primary-cta"', 'seasonal route');
expectText(seasonalHtml, 'data-testid="seasonal-lead-form"', 'seasonal route');
expectText(seasonalHtml, 'data-hero-slider', 'seasonal hero slider');
expectCount(seasonalHtml, 'data-hero-slide ', 5, 'seasonal hero slide count');
expectText(seasonalHtml, '/assets/hero/slider/hero-01-smile-1024.avif', 'seasonal hero AVIF');
expectText(seasonalHtml, '/assets/hero/slider/hero-01-smile-1024.webp', 'seasonal hero WebP fallback');
expectText(seasonalHtml, 'hero-01-smile-1024.avif?v=crop-20261003b', 'seasonal hero cache-busted smile crop');
for (const slideId of heroSlideIds) {
  expectText(seasonalHtml, `data-slide-id=\"${slideId}\"`, `seasonal hero slide ${slideId}`);
}
for (const slideId of heroSlideIds.slice(1)) {
  expectText(seasonalHtml, `hero-${slideId}-1024.avif?v=crop-20261003a`, `seasonal hero cache-busted crop ${slideId}`);
}
expectText(seasonalHtml, 'data-testid="service-formats"', 'seasonal formats');
expectText(seasonalHtml, 'Ведущий + DJ + звук + два вокалиста', 'seasonal vocalists package title');
expectText(seasonalHtml, 'С живой музыкой', 'seasonal live music package name');
expectText(seasonalHtml, 'Подробнее о живой музыке', 'seasonal live music package link');
expectText(seasonalHtml, 'Техническое оснащение площадки', 'seasonal technical package inclusion');
expectText(seasonalHtml, 'Три вокальных блока по 30 минут в исполнении двух вокалистов — под профессиональные аранжировки', 'seasonal vocalists package duration copy');
expectText(seasonalHtml, 'Эффект живой группы — без затрат на полный состав', 'seasonal music program economy heading');
expectText(seasonalHtml, 'Музыкальную часть можно дополнить саксофоном или гитарой', 'seasonal vocalists package expansion');
rejectText(seasonalHtml, 'Три полноценных музыкальных блока по 30 минут с профессиональными аранжировками.', 'seasonal obsolete vocalists package subtitle');
rejectText(seasonalHtml, 'Всё из состава «Ведущий + DJ»', 'seasonal abstract package inclusion copy');
rejectText(seasonalHtml, 'Ведущий + DJ + звук + 3 музыкальных блока по 30 минут', 'seasonal obsolete vocalists package title');
rejectText(seasonalHtml, 'Всё из среднего состава', 'seasonal technical vocalists package copy');
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
expectText(seasonalHtml, 'Два вокалиста: три музыкальных блока по 30 минут', 'seasonal music program');
expectText(seasonalHtml, 'Третий пакет — с живой музыкой', 'seasonal music program package context');
rejectText(seasonalHtml, 'class="music-program__options-title">Состав третьего пакета', 'seasonal obsolete music program package heading');
expectText(seasonalHtml, 'Смотреть шоу-рил', 'seasonal music showreel caption');
expectText(seasonalHtml, 'Хиты разных десятилетий', 'seasonal music program repertoire tag');
expectText(seasonalHtml, 'Welcome с саксофоном', 'seasonal music program saxophone tag');
expectText(seasonalHtml, 'Два вокалиста + саксофонист + гитарист', 'seasonal music program');
rejectText(seasonalHtml, 'Что такое бэклайн?', 'seasonal obsolete music jargon');
expectText(seasonalHtml, '/assets/music/music-program-max.avif', 'seasonal music program image');
expectText(seasonalHtml, '/assets/music/music-program-max.webp', 'seasonal music program image fallback');
expectText(seasonalHtml, 'href="#proverit-datu">Обсудить музыкальный состав', 'seasonal music CTA');
expectBefore(seasonalHtml, 'data-testid="music-program"', 'data-testid="proof-cases"', 'seasonal music program placement');
expectText(seasonalHtml, 'Ведущий + DJ + аппаратура + 3 блока по 30 минут: два вокалиста', 'seasonal vocalists package');
expectText(seasonalHtml, 'Ведущий + DJ + аппаратура + 3 блока по 30 минут: два вокалиста и саксофонист', 'seasonal saxophone package');
expectText(seasonalHtml, 'Ведущий + DJ + аппаратура + 3 блока по 30 минут: два вокалиста, саксофонист и гитарист', 'seasonal guitar package');
rejectText(seasonalHtml, '<option value="host">Только ведущий</option>', 'seasonal package contract');
expectText(seasonalHtml, 'https://corp.timurgromov.ru/novogodniy-korporativ/', 'seasonal canonical');
expectText(seasonalHtml, '/style.css?v=astro_17', 'main site stylesheet');
expectText(seasonalHtml, '/mobile.css?v=astro_7', 'main site mobile stylesheet');
expectText(seasonalHtml, '/script.js?v=astro_5', 'main site script');
expectText(seasonalHtml, '/seasonal.css?v=20260930c', 'seasonal form stylesheet');
expectText(seasonalHtml, '/seasonal.js?v=20261001b', 'seasonal script');
expectText(seasonalHtml, '/privacy/', 'seasonal privacy link');
rejectText(seasonalHtml, 'TELEGRAM_LEAD_ENDPOINT', 'seasonal route');

expectText(rootHtml, 'aria-label="Новогодние корпоративы"', 'root seasonal promo');
expectText(rootHtml, '>Новогодний сезон</p>', 'root seasonal promo');
rejectText(rootHtml, 'Новогодние корпоративы 2026', 'root seasonal promo');
rejectText(rootHtml, 'Новогодний сезон 2026', 'root seasonal promo');

for (const [html, label] of [[rootHtml, 'root'], [seasonalHtml, 'seasonal']]) {
  expectText(html, 'data-testid="corporate-format-photo"', `${label} current format photograph`);
  expectText(html, '/assets/photos/feature/corporate-format-outpaint-v3-768.avif', `${label} responsive format photograph`);
  rejectText(html, 'section-photo--zoomed-out', `${label} obsolete blurred format-photo backdrop`);
  rejectText(html, 'data-testid="corporate-workflow-photo"', `${label} removed pre-gallery photograph`);
  expectText(html, '/assets/photos/gal/current/current-07-stage-floor-640.avif', `${label} first gallery photograph`);
  expectText(html, '/assets/photos/gal/P2.webp', `${label} documentary gallery photograph`);
  expectText(html, '/assets/photos/gal/current/current-09-with-guests-640.avif', `${label} third gallery photograph`);
  expectText(html, '/assets/photos/gal/current/current-08-gray-mic-640.avif', `${label} current gallery portrait`);
  rejectText(html, '/assets/photos/gal/current/current-02-smile-mic-', `${label} duplicate smiling portrait`);
  rejectText(html, '/assets/photos/gal/current/current-06-closeup-', `${label} duplicate close-up portrait`);
}

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
