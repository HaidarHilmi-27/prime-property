export type { User, UserRole } from './user'
export type { Property, PropertyStatus, PropertyType, PropertyFilters } from './property'

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  limit: number
  totalPages: number
}

export interface ApiError {
  message: string
  code?: string
  status?: number
}
