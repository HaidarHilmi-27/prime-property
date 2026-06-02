import { useAuthStore } from '@/store/auth-store'
import type { UserRole } from '@/types'

export function useRole() {
  const { user } = useAuthStore()

  const role = user?.role ?? null

  const isSuperAdmin = role === 'superadmin'
  const isAdmin = role === 'admin'
  const isAuthenticated = !!user

  const hasRole = (roles: UserRole[]) => roles.includes(role as UserRole)

  return {
    role,
    isSuperAdmin,
    isAdmin,
    isAuthenticated,
    hasRole,
  }
}
