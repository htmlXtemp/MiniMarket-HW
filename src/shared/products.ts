export type ProductCategory = 'Аудио' | 'Компьютеры' | 'Дом';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: ProductCategory;
  isNew?: boolean;
}

export const CATEGORIES: ProductCategory[] = ['Аудио', 'Компьютеры', 'Дом'];

export const PRODUCTS: Product[] = [
  { id: 1, title: 'Беспроводные наушники', price: 7990, category: 'Аудио', isNew: true },
  { id: 2, title: 'Портативная колонка', price: 5490, category: 'Аудио' },
  { id: 3, title: 'Механическая клавиатура', price: 11490, category: 'Компьютеры', isNew: true },
  { id: 4, title: 'Беспроводная мышь', price: 3490, category: 'Компьютеры' },
  { id: 5, title: 'Монитор 27 дюймов', price: 24990, category: 'Компьютеры' },
  { id: 6, title: 'Настольная лампа', price: 2590, category: 'Дом', isNew: true },
  { id: 7, title: 'Кресло для работы', price: 18990, category: 'Дом' },
  { id: 8, title: 'Керамическая кружка', price: 890, category: 'Дом' },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);
