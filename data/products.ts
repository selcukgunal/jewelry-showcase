import type { Product } from '@/types/product'

export const products: Product[] = [
  {
    id: '501262',
    name: 'Gümüş Bileklik',
    category: 'bileklik',
    images: ['/products/501262/1.jpg', '/products/501262/2.jpg'],
    price: 7890,
    currency: 'TRY',
    specs: {
      material: 'Gümüş',
      weight: '9,58 gr',
      stone: 'SoCHIC Zirkon',
      stoneCut: '2,5 mm Yuvarlak',
      sizes: ['16', '17', '18', '19'],
      origin: 'Çin',
    },
    vatIncluded: true,
  },
  {
    id: '501263',
    name: 'Altın Kolye',
    category: 'kolye',
    images: ['/products/501263/1.jpg'],
    price: 12500,
    currency: 'TRY',
    specs: {
      material: '14 Ayar Altın',
      weight: '3,2 gr',
      stone: 'Doğal Zümrüt',
      stoneCut: '4 mm Oval',
      origin: 'Türkiye',
    },
    vatIncluded: true,
  },
  {
    id: '501264',
    name: 'Gümüş Yüzük',
    category: 'yuzuk',
    images: ['/products/501264/1.jpg', '/products/501264/2.jpg'],
    price: 4200,
    currency: 'TRY',
    specs: {
      material: '925 Ayar Gümüş',
      weight: '5,1 gr',
      stone: 'Doğal Ametist',
      stoneCut: '6 mm Yuvarlak',
      sizes: ['50', '52', '54', '56', '58'],
      origin: 'Türkiye',
    },
    description:
      'Doğal ametist taşı ile süslenmiş, el işçiliği gümüş yüzük. Her beden için ayrı sipariş gereklidir.',
    vatIncluded: true,
  },
  {
    id: '516356',
    name: 'Gümüş Yüzük',
    category: 'yuzuk',
    images: ['/products/516356/1.jpg'],
    price: 2790,
    currency: 'TRY',
    specs: {
      material: 'Gümüş',
      weight: '2,8 gr',
      stone: 'SoCHIC Zirkon',
      sizes: ['52', '54', '56', '58'],
      origin: 'Çin',
    },
    vatIncluded: true,
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
