export const siteMeta = {
  title: 'Ведущий на корпоратив в Москве — Тимур Громов',
  description:
    'Ведущий на корпоратив в Москве — Тимур Громов. 15+ лет опыта. Спокойный, интеллигентный формат без пошлости. Ведущий + DJ + звук — под ключ.',
  shortDescription: '15+ лет опыта. Интеллигентный формат. Без пошлости и кринжа. Ведущий + DJ + звук.',
  url: 'https://corp.timurgromov.ru/',
  ogImage: 'https://corp.timurgromov.ru/assets/og_og.jpg?v=4',
  themeColor: '#0c0f14'
};

export const contact = {
  name: 'Тимур Громов',
  phoneHuman: '+7 (925) 390-07-72',
  phoneHref: 'tel:+79253900772',
  phoneSchema: '+7-925-390-07-72',
  email: 'timurgromov.showman@gmail.com',
  whatsappUrl:
    'https://wa.me/79253900772?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BA%D0%BE%D1%80%D0%BF%D0%BE%D1%80%D0%B0%D1%82%D0%B8%D0%B2%21',
  telegramUrl: 'https://t.me/timurgromovv',
  maxUrl: 'https://max.ru/u/f9LHodD0cOIvnExDiltaWpLlPOHIr5y0qyb51SeYWFVvQJP5FUivyzS2fRM?clckid=c487e7dc',
  instagramUrl: 'https://instagram.com/timurgromov',
  vkUrl: 'https://vk.com/timurgromovvv',
  youtubeUrl: 'https://www.youtube.com/@timurgromovv'
};

export const hero = {
  title: 'Интеллигентный ведущий на корпоратив в Москве',
  subtitle: 'Современный формат — динамика и атмосфера, в которой комфортно каждому.',
  image: '/assets/hero/portrait.webp',
  imageAlt: 'Тимур Громов — ведущий на корпоратив',
  tags: [
    { label: '15+ лет опыта' },
    { label: '800+ мероприятий' },
    { label: 'Ведущий Love Radio', className: 'tag-radio' },
    { label: '10 лет КВН' },
    { label: 'Импровизация' },
    { label: 'Добрый юмор', className: 'tag-humor' },
    { label: 'Договор ИП' }
  ]
};

export const videos = [
  { video: 'https://cdnv.boomstream.com/balancer/o3LLb1w5-SxJPiQup.mp4', cover: '/assets/photos/cover1.webp' },
  { video: 'https://cdnv.boomstream.com/balancer/mutbwKHj-SxJPiQup.mp4', cover: '/assets/photos/cover2.webp' },
  { video: 'https://cdnv.boomstream.com/balancer/x1xsDQws-SxJPiQup.mp4', cover: '/assets/photos/cover3.webp' },
  { video: 'https://cdnv.boomstream.com/balancer/QCDV8bgf-EuQeQgfF.mp4', cover: '/assets/photos/cover4.webp' }
];

export const benefits = [
  ['Ведущий + DJ + звук', 'Одна команда и один договор.'],
  ['Организация процесса', 'Чёткий тайминг, согласование с подачей блюд и артистами.'],
  ['Комфортная атмосфера', 'Добрый юмор, внимание к гостям, тёплый формат.'],
  ['Официальный договор ИП', 'Быстрое согласование у бухгалтерии/юристов.'],
  ['Проверенные подрядчики', 'Кавер-группы, шоу-программы, фото и видео — только надёжные люди.'],
  ['20 лет в профессии', '800+ событий, 3 года Love Radio, 10 лет КВН.']
];

export const workflowSteps = [
  ['Знакомство', 'Созвон или сообщение — обсуждаем задачу и формат.'],
  ['Встреча / консультация', 'Лично или онлайн — 20–25 минут, только по делу.'],
  ['Концепция и смета', 'Предлагаю форматы, подбираю подрядчиков, готовлю расчёт.'],
  ['Договор и организация', 'Бухгалтерия, юристы, тайминг, согласование площадки.'],
  ['Мероприятие', 'Всё по плану: комфорт, атмосфера и результат.']
];

export const photos = Array.from({ length: 14 }, (_, index) => {
  const number = index + 1;
  return {
    src: `/assets/photos/gal/P${number}.webp`,
    alt: `Момент ${number}`,
    loading: number === 1 ? 'eager' : 'lazy',
    fetchpriority: number === 1 ? 'high' : undefined
  };
});

export const letters = Array.from({ length: 13 }, (_, index) => {
  const number = index + 1;
  return {
    src: `/assets/letters/L${number}.webp`,
    alt: `Благодарственное письмо ${number}`
  };
});

export const contactPage = {
  title: 'Свяжитесь со мной — Тимур Громов',
  description: 'Выберите удобный мессенджер для связи. Отвечу лично и пришлю материалы.',
  url: 'https://corp.timurgromov.ru/contact/',
  heading: 'ВЫБЕРИТЕ УДОБНЫЙ МЕССЕНДЖЕР',
  subtitle: 'Я ПРИШЛЮ МАТЕРИАЛЫ ПО ПОДГОТОВКЕ К КОРПОРАТИВУ',
  footer: 'ОТВЕЧУ ЛИЧНО И ПРИШЛЮ МАТЕРИАЛЫ'
};

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: contact.name,
  description: 'Ведущий на корпоратив в Москве. Интеллигентный формат, DJ и звук под ключ.',
  url: siteMeta.url,
  image: siteMeta.ogImage,
  telephone: contact.phoneSchema,
  email: contact.email,
  areaServed: {
    '@type': 'City',
    name: 'Москва'
  }
};
