import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import { RootLayout } from '@/app/layouts/root-layout'
import { AuthLayout } from '@/app/layouts/auth-layout'
import { DashboardLayout } from '@/app/layouts/dashboard-layout'

import { ROUTES } from '@/lib/constants'

const HomePage = lazy(() => import('@/pages/home'))
const PropertiesPage = lazy(() => import('@/pages/properties'))
const AboutPage = lazy(() => import('@/pages/about'))
const ContactPage = lazy(() => import('@/pages/contact'))
const AuthPage = lazy(() => import('@/pages/auth'))
const DashboardPage = lazy(() => import('@/pages/dashboard'))
const TestPage = lazy(() => import('@/pages/testpage'))

const PageLoader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
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
          <Route path="/test" element={<TestPage />} />
        </Route>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<AuthPage />} />
          <Route path={ROUTES.REGISTER} element={<AuthPage />} />
        </Route>

        {/* DASHBOARD */}
        <Route element={<DashboardLayout />}>
          <Route
            path={ROUTES.DASHBOARD}
            element={<DashboardPage />}
          />
        </Route>

      </Routes>
    </Suspense>
  )
}