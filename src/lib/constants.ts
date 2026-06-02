export const APP_NAME = 'Prime Property'

export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: '/properties/:id',
  ABOUT: '/about',
  CONTACT: '/contact',

  LOGIN: '/agent/login',

  DASHBOARD: '/dashboard',
  DASHBOARD_PROPERTIES: '/dashboard/properties',
  DASHBOARD_ADD_PROPERTY: '/dashboard/properties/add',
  DASHBOARD_EDIT_PROPERTY: '/dashboard/properties/:id/edit',
  DASHBOARD_AUDIT_LOG: '/dashboard/audit-log',
  DASHBOARD_ADMINS: '/dashboard/admins',
  DASHBOARD_PROFILE: '/dashboard/profile',
} as const

export const QUERY_KEYS = {
  PROPERTIES: ['properties'] as const,
  PROPERTY: (id: string) => ['property', id] as const,
  USER: ['user'] as const,
  AUDIT_LOGS: ['audit-logs'] as const,
  ADMINS: ['admins'] as const,
} as const

export const LOCKOUT_CONFIG = {
  MAX_ATTEMPTS: 5,
  WINDOW_MINUTES: 30,
  LOCK_DURATION_MINUTES: 15,
} as const
