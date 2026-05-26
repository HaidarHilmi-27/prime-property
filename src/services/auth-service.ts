import { supabase } from '@/supabase/client'
import type { User } from '@/types'

export const authService = {
  async login(email: string, password: string) {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error) throw error

    return data
  },

  async logout() {
    const { error } =
      await supabase.auth.signOut()

    if (error) throw error
  },

  async getCurrentUser(): Promise<User | null> {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile, error } =
      await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (error) return null

    return profile as User
  },

  onAuthStateChange(
    callback: (user: User | null) => void
  ) {
    return supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const user =
            await this.getCurrentUser()

          callback(user)
        } else {
          callback(null)
        }
      }
    )
  },
}