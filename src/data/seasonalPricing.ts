export interface SeasonalPriceRow {
  label: string;
  weekdays: string;
  fromDay: number;
  toDay: number;
  hostDj: number;
  hostDjSound: number;
  liveMusic: number;
  extension: number;
  extensionOverride?: { fromDay: number; toDay: number; price: number };
}

export const seasonalPriceRows: SeasonalPriceRow[] = [
  {
    label: '1–6 декабря', weekdays: 'вт–вс', fromDay: 1, toDay: 6,
    hostDj: 145_000, hostDjSound: 170_000, liveMusic: 320_000, extension: 20_000,
    extensionOverride: { fromDay: 4, toDay: 5, price: 25_000 }
  },
  { label: '7–10 декабря', weekdays: 'пн–чт', fromDay: 7, toDay: 10, hostDj: 145_000, hostDjSound: 170_000, liveMusic: 330_000, extension: 20_000 },
  { label: '11–12 декабря', weekdays: 'пт–сб', fromDay: 11, toDay: 12, hostDj: 175_000, hostDjSound: 220_000, liveMusic: 410_000, extension: 25_000 },
  { label: '13 декабря', weekdays: 'вс', fromDay: 13, toDay: 13, hostDj: 145_000, hostDjSound: 170_000, liveMusic: 340_000, extension: 20_000 },
  { label: '14–17 декабря', weekdays: 'пн–чт', fromDay: 14, toDay: 17, hostDj: 155_000, hostDjSound: 180_000, liveMusic: 370_000, extension: 25_000 },
  { label: '18–19 декабря', weekdays: 'пт–сб', fromDay: 18, toDay: 19, hostDj: 175_000, hostDjSound: 220_000, liveMusic: 440_000, extension: 25_000 },
  { label: '20 декабря', weekdays: 'вс', fromDay: 20, toDay: 20, hostDj: 155_000, hostDjSound: 180_000, liveMusic: 380_000, extension: 25_000 },
  { label: '21–24 декабря', weekdays: 'пн–чт', fromDay: 21, toDay: 24, hostDj: 165_000, hostDjSound: 190_000, liveMusic: 410_000, extension: 25_000 },
  { label: '25–26 декабря', weekdays: 'пт–сб', fromDay: 25, toDay: 26, hostDj: 175_000, hostDjSound: 220_000, liveMusic: 470_000, extension: 25_000 },
  { label: '27–28 декабря', weekdays: 'вс–пн', fromDay: 27, toDay: 28, hostDj: 155_000, hostDjSound: 180_000, liveMusic: 400_000, extension: 25_000 },
  { label: '29–30 декабря', weekdays: 'вт–ср', fromDay: 29, toDay: 30, hostDj: 165_000, hostDjSound: 190_000, liveMusic: 440_000, extension: 25_000 },
  { label: '31 декабря', weekdays: 'чт', fromDay: 31, toDay: 31, hostDj: 280_000, hostDjSound: 330_000, liveMusic: 630_000, extension: 35_000 }
];

export function formatRubles(value: number): string {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
}
