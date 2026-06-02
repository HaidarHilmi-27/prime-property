export type UserRole =
  | 'admin'
  | 'superadmin'

export interface User {
  id: string
  email: string

  role: UserRole

  is_active: boolean

  created_at: string
}