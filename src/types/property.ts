export type PropertyStatus = 'available' | 'sold' | 'rented' | 'pending'
export type PropertyType = 'house' | 'apartment' | 'condo' | 'land' | 'commercial'

export interface Property {
  id: string
  title: string
  description: string
  price: number
  type: PropertyType
  status: PropertyStatus
  bedrooms: number
  bathrooms: number
  area: number
  address: string
  city: string
  province: string
  zip_code: string
  latitude?: number
  longitude?: number
  images: string[]
  features: string[]
  agent_id: string
  created_at: string
  updated_at: string
}

export interface PropertyFilters {
  type?: PropertyType
  status?: PropertyStatus
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  city?: string
  province?: string
  page?: number
  limit?: number
}
