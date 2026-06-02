import type { UserRole } from '@/types'

type Permission =
  | 'properties:create'
  | 'properties:edit'
  | 'properties:delete'
  | 'properties:view'
  | 'audit:view'
  | 'admin:manage'
  | 'admin:create'
  | 'admin:disable'
  | 'admin:reset-password'

const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    'properties:view',
  ],
  superadmin: [
    'properties:view',
    'properties:create',
    'properties:edit',
    'properties:delete',
    'audit:view',
    'admin:manage',
    'admin:create',
    'admin:disable',
    'admin:reset-password',
  ],
}

export function hasPermission(role: UserRole | null, permission: Permission): boolean {
  if (!role) return false
  return rolePermissions[role]?.includes(permission) ?? false
}

export function can(permission: Permission) {
  return (role: UserRole | null) => hasPermission(role, permission)
}
