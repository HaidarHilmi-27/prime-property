import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { RootLayout } from '@/app/layouts/root-layout'
import { AuthLayout } from '@/app/layouts/auth-layout'
import { DashboardLayout } from '@/app/layouts/dashboard-layout'

import { ProtectedRoute } from './protected-route'

import { ROUTES } from '@/lib/constants'

const HomePage = lazy(() => import('@/pages/home'))
const PropertiesPage = lazy(() => import('@/pages/properties'))
const AboutPage = lazy(() => import('@/pages/about'))
const ContactPage = lazy(() => import('@/pages/contact'))

const AuthPage = lazy(() => import('@/pages/auth'))

const DashboardPage = lazy(() => import('@/pages/dashboard'))
const CreatePropertyPage = lazy(() => import('@/pages/dashboard/properties/create'))
const EditPropertyPage = lazy(() => import('@/pages/dashboard/properties/edit'))
const AuditLogPage = lazy(() => import('@/pages/dashboard/audit-log'))
const AdminsPage = lazy(() => import('@/pages/dashboard/admins'))

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-neutral-950">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
  </div>
)

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* PUBLIC */}
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.PROPERTIES} element={<PropertiesPage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        </Route>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<AuthPage />} />
        </Route>

        {/* PROTECTED DASHBOARD */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.DASHBOARD_PROPERTIES} element={<DashboardPage />} />
            <Route path={ROUTES.DASHBOARD_ADD_PROPERTY} element={<CreatePropertyPage />} />
            <Route path={ROUTES.DASHBOARD_EDIT_PROPERTY} element={<EditPropertyPage />} />
            <Route path={ROUTES.DASHBOARD_AUDIT_LOG} element={<AuditLogPage />} />
            <Route path={ROUTES.DASHBOARD_ADMINS} element={<AdminsPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}
