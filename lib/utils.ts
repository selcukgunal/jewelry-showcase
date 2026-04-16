export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function withBP(path: string): string {
  return `${basePath}${path}`
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR').format(price) + ' ₺'
}

export const categoryLabel: Record<string, string> = {
  bileklik: 'Bileklik',
  kolye: 'Kolye',
  yuzuk: 'Yüzük',
  kupe: 'Küpe',
}
