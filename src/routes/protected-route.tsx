import {
  Navigate,
  Outlet,
} from 'react-router-dom'

import { useAuthStore } from '@/store/auth-store'

export function ProtectedRoute() {
  const {
    isAuthenticated,
    isLoading,
  } = useAuthStore()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold-500 border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/agent/login"
        replace
      />
    )
  }

  return <Outlet />
}