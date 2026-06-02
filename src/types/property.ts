export type PropertyStatus = 'in stock' | 'sold_out'
export type ReadyStatus = 'siap_huni' | 'siap_kosong' | 'siap_huni_renovasi'
export type TipeProperty = 'Ruko' | 'Villa'

export interface Property {
  id: string
  nama_property: string
  group: string
  lebar: number
  panjang: number
  hadap: string[]
  tipe: TipeProperty
  tingkat: number
  price: number
  carport: boolean
  status: PropertyStatus
  siap: ReadyStatus
  kawasan: string[]
  maps_link: string | null
  unit: string | null
  created_by: string
  deleted_at: string | null
  created_at: string
  updated_at: string
}

export interface PropertyFilters {
  search?: string
  status?: PropertyStatus
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
