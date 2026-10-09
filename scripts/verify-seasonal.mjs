import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const heroSlideIds = ['01-smile', '02-microphone', '03-full-length', '04-grey-suit', '05-gesture'];
const seasonalPriceRows = [
  [1, 3, 145000, 170000, 150000, 20000],
  [4, 5, 155000, 180000, 170000, 25000],
  [6, 6, 145000, 170000, 150000, 20000],
  [7, 10, 155000, 180000, 160000, 20000],
  [11, 12, 175000, 200000, 190000, 25000],
  [13, 13, 155000, 180000, 170000, 20000],
  [14, 17, 175000, 205000, 190000, 25000],
  [18, 19, 200000, 230000, 220000, 25000],
  [20, 20, 175000, 205000, 200000, 25000],
  [21, 24, 190000, 220000, 220000, 25000],
  [25, 26, 220000, 250000, 250000, 25000],
  [27, 28, 190000, 220000, 220000, 25000],
  [29, 30, 210000, 240000, 250000, 25000],
  [31, 31, 280000, 330000, 300000, 35000]
];

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

const [rootHtml, seasonalHtml, privacyHtml, sharedStyle, sharedScript, seasonalScript, sitemap] = await Promise.all([
  read('dist/index.html'),
  read('dist/novogodniy-korporativ/index.html'),
  read('dist/privacy/index.html'),
  read('public/style.css'),
  read('public/script.js'),
  read('public/seasonal.js'),
  read('public/sitemap.xml')
]);

expectText(sharedStyle, '.music-program__photo img', 'shared music poster style');
expectText(sharedStyle, 'object-position: 50% 0;', 'shared music poster head-safe framing');
expectText(sharedStyle, '@media (min-width: 769px) and (max-width: 1180px)', 'shared music poster tablet breakpoint');
expectText(sharedStyle, 'grid-template-areas: "media copy";', 'shared music poster tablet composition');
expectText(sharedStyle, 'aspect-ratio: 1200 / 843;', 'shared music poster source ratio');

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
expectBefore(rootHtml, 'data-testid="faq-section"', 'data-testid="corporate-format-photo"', 'root context photo follows FAQ');
expectBefore(rootHtml, 'data-testid="corporate-format-photo"', 'id="cta"', 'root context photo precedes final CTA');
expectBefore(rootHtml, 'id="benefits"', 'data-testid="service-formats"', 'root packages follow benefits directly');
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
expectText(seasonalHtml, 'data-testid="seasonal-pricing"', 'seasonal pricing picker');
expectText(seasonalHtml, 'Посмотреть цены на все даты декабря', 'seasonal full pricing disclosure');
expectText(seasonalHtml, 'data-pricing-package="hostDj"', 'seasonal host DJ live price');
expectText(seasonalHtml, 'data-pricing-package="hostDjSound"', 'seasonal sound live price');
expectText(seasonalHtml, 'data-pricing-package="liveMusic"', 'seasonal music live price');
expectCount(seasonalHtml, 'data-pricing-extension', 3, 'extension price shown inside every seasonal package');
expectCount(seasonalHtml, '<span>Доп. час</span>', 3, 'extension label shown inside every seasonal package');
rejectText(seasonalHtml, 'Все цены — за 5 часов · Дополнительный час', 'retired shared extension line');
expectCount(seasonalHtml, 'data-pricing-row', seasonalPriceRows.length, 'seasonal public pricing row count');
for (const [fromDay, toDay, hostDj, hostDjSound, liveMusicAddon, extension] of seasonalPriceRows) {
  expectText(
    seasonalHtml,
    `data-date-from="${fromDay}" data-date-to="${toDay}" data-host-dj="${hostDj}" data-host-dj-sound="${hostDjSound}" data-live-music-addon="${liveMusicAddon}" data-extension="${extension}"`,
    `seasonal price row ${fromDay}-${toDay}`
  );
}
expectText(seasonalHtml, '<th scope="col">С живой музыкой</th>', 'seasonal live music matrix column');
expectText(seasonalHtml, 'data-label="С живой музыкой">от 490 000 ₽', 'seasonal 29-30 live music total');
expectText(seasonalHtml, 'data-label="С живой музыкой">от 630 000 ₽', 'seasonal 31 December live music total');
expectText(seasonalHtml, 'Цена пакета с двумя вокалистами уже учитывает декабрьскую ставку музыкального состава на выбранную дату.', 'seasonal live music matrix explanation');
expectCount(seasonalHtml, 'В цену входит комплект звука и DJ-оборудования.', 2, 'seasonal equipment boundary in relevant cards');
expectText(rootHtml, 'data-testid="seasonal-pricing"', 'root shared pricing picker');
expectText(rootHtml, 'data-testid="seasonal-lead-form"', 'root shared lead form');
expectCount(rootHtml, 'data-pricing-row', seasonalPriceRows.length, 'root December pricing row count');
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
expectBefore(seasonalHtml, 'data-testid="faq-section"', 'data-testid="corporate-format-photo"', 'seasonal context photo follows FAQ');
expectBefore(seasonalHtml, 'data-testid="corporate-format-photo"', 'id="proverit-datu"', 'seasonal context photo precedes final CTA');
expectBefore(seasonalHtml, 'id="benefits"', 'data-testid="service-formats"', 'seasonal packages follow benefits directly');
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
expectText(seasonalHtml, 'Ведущий + DJ + аппаратура + два вокалиста: 3 блока по 30 минут', 'seasonal vocalists package');
expectText(seasonalHtml, 'Ведущий + DJ + аппаратура + два вокалиста и саксофонист: 3 блока по 30 минут', 'seasonal saxophone package');
expectText(seasonalHtml, 'Ведущий + DJ + аппаратура + два вокалиста, саксофонист и гитарист: 3 блока по 30 минут', 'seasonal guitar package');
rejectText(seasonalHtml, '<option value="host">Только ведущий</option>', 'seasonal package contract');
expectText(seasonalHtml, 'https://corp.timurgromov.ru/novogodniy-korporativ/', 'seasonal canonical');
expectText(seasonalHtml, '/style.css?v=astro_20', 'main site stylesheet');
expectText(seasonalHtml, '/contact-choice.css?v=3', 'contact panel stylesheet');
expectText(seasonalHtml, '/mobile.css?v=astro_10', 'main site mobile stylesheet');
expectText(seasonalHtml, '/script.js?v=astro_9', 'main site script');
expectText(seasonalHtml, '/cta-analytics.js?v=1', 'CTA analytics script');
for (const [html, label] of [[rootHtml, 'root'], [seasonalHtml, 'seasonal']]) {
  expectText(html, 'data-section-nav', `${label} shared section navigation`);
  expectText(html, 'href="#formats" data-nav-target="formats">Цены</a>', `${label} prices navigation`);
  expectText(html, 'href="#evening-flow" data-nav-target="evening-flow">Программа</a>', `${label} programme navigation`);
  expectText(html, 'href="#cases" data-nav-target="cases">Видео</a>', `${label} video navigation`);
  expectText(html, 'href="#letters" data-nav-target="letters">Отзывы</a>', `${label} reviews navigation`);
  expectText(html, '/header-nav.css?v=20261009a', `${label} header navigation stylesheet`);
  expectText(html, '/header-nav.js?v=20261009a', `${label} header navigation behavior`);
  expectText(html, 'data-contact-fab', `${label} labelled sticky contact`);
  expectText(html, '<p class="contact-choice__eyebrow">ТИМУР ГРОМОВ</p>', `${label} contact owner`);
  rejectText(html, 'КАЛЬКУЛЯТОР МЕРОПРИЯТИЙ · ТИМУР ГРОМОВ', `${label} removed calculator label`);
  expectText(html, 'https://calcul.timurgromov.ru/api/v1/site/messenger-start?provider=telegram', `${label} stable Telegram redirect`);
  rejectText(html, 'gromov_wedding_bot', `${label} retired Telegram handle`);
  expectText(html, 'data-contact-placement="header"', `${label} header contact button`);
  expectText(html, 'header-contact-btn', `${label} header contact style`);
  rejectText(html, 'wa.me/', `${label} must not expose WhatsApp CTA`);
  expectText(html, 'Написать в Telegram', `${label} personal Telegram choice`);
  expectText(html, 'Оставить номер', `${label} confirmed callback choice`);
  expectText(html, 'data-materials-card', `${label} materials card`);
  expectBefore(html, 'id="workflow"', 'data-materials-card', `${label} materials follows workflow`);
  rejectText(html, 'id="article-popup-modal"', `${label} obsolete checklist popup`);
}
expectText(seasonalHtml, 'data-testid="seasonal-primary-cta">Обсудить корпоратив', 'seasonal primary CTA');
expectText(seasonalHtml, 'data-contact-form="video" data-form-source="hero_video"', 'seasonal meeting CTA');
expectText(seasonalHtml, '>Назначить встречу</button>', 'seasonal meeting CTA label');
for (const [html, label] of [[rootHtml, 'root'], [seasonalHtml, 'seasonal']]) {
  expectText(html, '/seasonal.css?v=20261009b', `${label} pricing stylesheet`);
  expectText(html, '/seasonal.js?v=20261009b', `${label} pricing script`);
}
expectText(rootHtml, 'Праздники проходят, впечатления остаются.', 'root corrected CTA punctuation');
rejectText(seasonalHtml, 'data-testid="seasonal-package-details"', 'seasonal retired separate package details');
rejectText(seasonalHtml, 'Что входит в каждый пакет', 'seasonal retired shared package disclosure');
expectText(seasonalHtml, 'Стоимость трёх вариантов на выбранную дату', 'seasonal compact price comparison');
expectText(seasonalHtml, 'Выбрать дату', 'seasonal date action');
expectText(seasonalHtml, 'Базовая цена на даты вне декабря 2026', 'seasonal initial price explanation');
expectText(seasonalHtml, 'data-annual-host-dj="145000" data-annual-host-dj-sound="170000" data-annual-live-music-addon="150000" data-annual-extension="20000"', 'year-round pricing baseline');
rejectText(seasonalHtml, 'name="event_date" min="2026-12-01"', 'lead date must accept non-December dates');
rejectText(seasonalHtml, 'id="seasonal-pricing-date" type="date" min=', 'pricing date must accept non-December dates');
expectText(seasonalHtml, 'data-pricing-initial="от 145 000 ₽"', 'seasonal initial host DJ price');
expectText(seasonalHtml, 'data-pricing-initial="от 170 000 ₽"', 'seasonal initial sound price');
expectText(seasonalHtml, 'data-pricing-initial="от 320 000 ₽"', 'seasonal initial live music price');
expectCount(seasonalHtml, 'data-pricing-package=', 3, 'seasonal compact price options');
expectCount(seasonalHtml, 'data-pricing-value', 3, 'seasonal compact price values');
expectCount(seasonalHtml, 'data-pricing-extension', 3, 'seasonal per-card extension prices');
expectCount(seasonalHtml, 'data-pricing-date', 2, 'seasonal single date control and action label');
rejectText(seasonalHtml, 'data-pricing-date-trigger', 'seasonal redundant inline date buttons');
rejectText(seasonalHtml, 'data-pricing-check-date', 'seasonal redundant lower date button');
expectCount(seasonalHtml, 'seasonal-price-option__toggle-closed', 3, 'seasonal package detail toggles');
expectCount(seasonalHtml, 'seasonal-price-option__details"', 3, 'seasonal inline package details');
rejectText(seasonalHtml, 'data-pricing-package-select', 'seasonal package selection button');
rejectText(seasonalHtml, 'Выбрать состав', 'seasonal redundant package selection label');
expectText(seasonalHtml, '/privacy/', 'seasonal privacy link');
rejectText(seasonalHtml, 'TELEGRAM_LEAD_ENDPOINT', 'seasonal route');

expectText(rootHtml, 'aria-label="Новогодние корпоративы"', 'root seasonal promo');
expectText(rootHtml, '>Новогодний сезон</p>', 'root seasonal promo');
rejectText(rootHtml, 'Новогодние корпоративы 2026', 'root seasonal promo');
rejectText(rootHtml, 'Новогодний сезон 2026', 'root seasonal promo');

for (const [html, label] of [[rootHtml, 'root'], [seasonalHtml, 'seasonal']]) {
  expectText(html, '/assets/photos/evening-flow/corporate-evening-flow-wide-v4-768.avif', `${label} responsive evening-flow photograph`);
  rejectText(html, '/assets/photos/evening-flow/corporate-evening-flow-wide-v3-768.avif', `${label} superseded evening-flow photograph`);
  expectText(html, 'data-testid="corporate-format-photo"', `${label} current format photograph`);
  expectText(html, '/assets/photos/feature/corporate-format-wide-v4-768.avif', `${label} responsive format photograph`);
  rejectText(html, 'corporate-workflow-expanded-v2', `${label} rejected expanded format photograph`);
  rejectText(html, 'section-photo--zoomed-out', `${label} rejected blurred format-photo backdrop`);
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
expectText(seasonalScript, "'site_meeting_corporate__new_year__date_check__seasonal_form'", 'preserved New Year lead source');
expectText(seasonalScript, "'site_meeting_corporate__corporate__date_check__pricing_form'", 'ordinary corporate pricing lead source');
expectText(seasonalScript, 'cta_site: seasonalCtaContext.site', 'seasonal CRM CTA context');
expectText(seasonalScript, "host_dj_sound_vocalists: 'Ведущий + DJ + аппаратура + два вокалиста: 3 блока по 30 минут'", 'lead vocalists package contract');
expectText(seasonalScript, "host_dj_sound_vocalists_sax: 'Ведущий + DJ + аппаратура + два вокалиста и саксофонист: 3 блока по 30 минут'", 'lead saxophone package contract');
expectText(seasonalScript, "host_dj_sound_vocalists_sax_guitar: 'Ведущий + DJ + аппаратура + два вокалиста, саксофонист и гитарист: 3 блока по 30 минут'", 'lead guitar package contract');
expectText(seasonalScript, 'response.status !== 201', 'confirmed lead gate');
expectText(seasonalScript, 'Ориентир на сайте за 5 часов:', 'seasonal public quote in CRM comment');
expectText(seasonalScript, 'Ориентир за 6 часов:', 'seasonal six-hour quote in CRM comment');
expectText(seasonalScript, 'Дополнительный час:', 'seasonal extension quote in CRM comment');
rejectText(seasonalScript, 'selectedPackage', 'seasonal redundant package selection state');
rejectText(seasonalScript, 'data-pricing-package-select', 'seasonal redundant package selection handler');
expectText(seasonalScript, "reachGoal('corporate_lead_submit_success')", 'confirmed lead goal');
expectText(seasonalScript, 'window.location.origin}${window.location.pathname}', 'sanitized page URL');

expectText(sharedScript, 'https://calcul.timurgromov.ru/api/v1/site/consultation-request', 'shared lead contract');
expectText(sharedScript, 'form_source: `site_meeting_corporate__${context.page}__${context.intent}__${context.placement}`', 'shared lead contract');
expectText(sharedScript, 'cta_placement: context.placement', 'shared CRM CTA context');
expectText(sharedScript, 'response.status === 201', 'shared confirmed lead gate');
expectText(sharedScript, "reachGoal', 'corporate_lead_submit_success'", 'shared confirmed lead goal');
expectText(sharedScript, '[data-proof-cases-grid]', 'shared proof lightbox contract');
rejectText(sharedScript, 'TELEGRAM_LEAD_ENDPOINT', 'shared lead contract');

expectText(sitemap, 'https://corp.timurgromov.ru/novogodniy-korporativ/', 'sitemap');
expectText(sitemap, 'https://corp.timurgromov.ru/privacy/', 'sitemap');

console.log('PASS: seasonal landing, lead contract, privacy route, sitemap and root regression');
