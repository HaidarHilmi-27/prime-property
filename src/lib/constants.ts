export const APP_NAME = 'Prime Property'

export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: '/properties/:id',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/agent/login',
  REGISTER: '/agent/register',
  DASHBOARD: '/dashboard',
  DASHBOARD_PROPERTIES: '/dashboard/properties',
  DASHBOARD_ADD_PROPERTY: '/dashboard/properties/add',
  DASHBOARD_EDIT_PROPERTY: '/dashboard/properties/:id/edit',
  DASHBOARD_PROFILE: '/dashboard/profile',
} as const

export const QUERY_KEYS = {
  PROPERTIES: ['properties'] as const,
  PROPERTY: (id: string) => ['property', id] as const,
  USER: ['user'] as const,
} as const
