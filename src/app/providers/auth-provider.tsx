import { useEffect } from 'react'

import { supabase } from '@/supabase/client'
import { useAuthStore } from '@/store/auth-store'
import type { User } from '@/types'

function clearSupabaseStorage() {
  const keys = Object.keys(localStorage).filter((k) => k.startsWith('sb-'))
  keys.forEach((k) => localStorage.removeItem(k))
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((s) => s.setUser)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle()
          .then(({ data: profile }) => {
            if (profile?.is_active) {
              setUser(profile as User)
            } else {
              clearSupabaseStorage()
              setUser(null)
            }
          })
      } else {
        clearSupabaseStorage()
        setUser(null)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null)
        return
      }

      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle()

        if (profile?.is_active) {
          setUser(profile as User)
        } else {
          clearSupabaseStorage()
          setUser(null)
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [setUser])

  return children
}
