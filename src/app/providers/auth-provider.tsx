import { useEffect } from 'react'

import { authService } from '../../services/auth-service'
import { useAuthStore } from '../../store/auth-store'

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    setUser,
    setIsLoading,
  } = useAuthStore()

  useEffect(() => {
    initializeAuth()

    const {
      data: { subscription },
    } = authService.onAuthStateChange(
      (user) => {
        setUser(user)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function initializeAuth() {
    try {
      const user =
        await authService.getCurrentUser()

      setUser(user)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return children
}