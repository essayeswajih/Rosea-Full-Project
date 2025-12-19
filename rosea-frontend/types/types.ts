export type ColorVariant = {
  name: string
  label: string
  hex: string
}

export interface Product {
  id: number
  name: string
  description?: string
  price: number
  stock_quantity: number
  in_stock?: boolean
  category_id: number
  discounted_price?: number
  image_url?: string
  image2_url?: string
  image3_url?: string
  image4_url?: string
  promo?: boolean
  buzzent?: string
  rating?: number
  num_ratings?: number
  sizes?: string[]
  colors?: ColorVariant[]
  materials?: string[]
  care?: string[]
  features?: string[]
  sku?: string
  colorImages?: Record<string, string[]>
  slug: string
}

export type ProductPayload = Omit<Product, "id" | "rating" | "num_ratings">
