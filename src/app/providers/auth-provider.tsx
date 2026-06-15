import { useEffect, useRef } from 'react'

import { supabase } from '@/supabase/client'
import { useAuthStore } from '@/store/auth-store'
import type { User } from '@/types'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser)
  const setLoading = useAuthStore((s) => s.setLoading)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let cancelled = false

    timerRef.current = setTimeout(() => {
      if (!cancelled) {
        setLoading(false)
      }
    }, 15_000)

    async function initAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (cancelled) return

        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle()

          if (cancelled) return

          if (profile?.is_active) {
            setUser(profile as User)
          } else {
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } catch {
        if (!cancelled) setUser(null)
      }
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (cancelled) return

        if (event === 'SIGNED_OUT') {
          setUser(null)
          return
        }

        if (session?.user) {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle()

            if (cancelled) return

            if (profile?.is_active) {
              setUser(profile as User)
            } else {
              setUser(null)
            }
          } catch {
            if (!cancelled) setUser(null)
          }
        } else {
          if (!cancelled) setUser(null)
        }
      }
    )

    return () => {
      cancelled = true
      clearTimeout(timerRef.current!)
      subscription.unsubscribe()
    }
  }, [setUser, setLoading])

  return children
}
