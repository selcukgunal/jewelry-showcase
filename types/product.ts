export interface Product {
  id: string
  name: string
  category: 'bileklik' | 'kolye' | 'yuzuk' | 'kupe'
  images: string[]
  price: number
  currency: 'TRY'
  specs: {
    material?: string
    weight?: string
    stone?: string
    stoneCut?: string
    sizes?: string[]
    origin?: string
  }
  description?: string
  vatIncluded: boolean
}
