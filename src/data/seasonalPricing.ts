export interface SeasonalPriceRow {
  label: string;
  weekdays: string;
  fromDay: number;
  toDay: number;
  hostDj: number;
  hostDjSound: number;
  extension: number;
}

export const liveMusicAddon = 150_000;

export const seasonalPriceRows: SeasonalPriceRow[] = [
  { label: '1–2 декабря', weekdays: 'вт–ср', fromDay: 1, toDay: 2, hostDj: 135_000, hostDjSound: 160_000, extension: 20_000 },
  { label: '3 декабря', weekdays: 'чт', fromDay: 3, toDay: 3, hostDj: 140_000, hostDjSound: 165_000, extension: 20_000 },
  { label: '4–5 декабря', weekdays: 'пт–сб', fromDay: 4, toDay: 5, hostDj: 155_000, hostDjSound: 180_000, extension: 25_000 },
  { label: '6–9 декабря', weekdays: 'вс–ср', fromDay: 6, toDay: 9, hostDj: 145_000, hostDjSound: 170_000, extension: 20_000 },
  { label: '10 декабря', weekdays: 'чт', fromDay: 10, toDay: 10, hostDj: 155_000, hostDjSound: 180_000, extension: 20_000 },
  { label: '11–12 декабря', weekdays: 'пт–сб', fromDay: 11, toDay: 12, hostDj: 170_000, hostDjSound: 195_000, extension: 25_000 },
  { label: '13–16 декабря', weekdays: 'вс–ср', fromDay: 13, toDay: 16, hostDj: 160_000, hostDjSound: 185_000, extension: 20_000 },
  { label: '17 декабря', weekdays: 'чт', fromDay: 17, toDay: 17, hostDj: 175_000, hostDjSound: 200_000, extension: 20_000 },
  { label: '18–19 декабря', weekdays: 'пт–сб', fromDay: 18, toDay: 19, hostDj: 200_000, hostDjSound: 230_000, extension: 25_000 },
  { label: '20–23 декабря', weekdays: 'вс–ср', fromDay: 20, toDay: 23, hostDj: 175_000, hostDjSound: 205_000, extension: 25_000 },
  { label: '24 декабря', weekdays: 'чт', fromDay: 24, toDay: 24, hostDj: 190_000, hostDjSound: 220_000, extension: 25_000 },
  { label: '25–26 декабря', weekdays: 'пт–сб', fromDay: 25, toDay: 26, hostDj: 220_000, hostDjSound: 250_000, extension: 25_000 },
  { label: '27–30 декабря', weekdays: 'вс–ср', fromDay: 27, toDay: 30, hostDj: 190_000, hostDjSound: 220_000, extension: 25_000 },
  { label: '31 декабря', weekdays: 'чт', fromDay: 31, toDay: 31, hostDj: 280_000, hostDjSound: 330_000, extension: 35_000 }
];

export function formatRubles(value: number): string {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
}
