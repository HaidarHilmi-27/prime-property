import { supabase } from '@/supabase/client'
import { LOCKOUT_CONFIG } from '@/lib/constants'
import type { User } from '@/types'

export const authService = {
  async checkLockout(email: string) {
    try {
      const since = new Date(
        Date.now() - LOCKOUT_CONFIG.WINDOW_MINUTES * 60 * 1000
      ).toISOString()

      const { count, error } = await supabase
        .from('login_attempts')
        .select('*', { count: 'exact', head: true })
        .eq('email', email)
        .eq('success', false)
        .gte('created_at', since)

      if (error) return 0

      if (count && count >= LOCKOUT_CONFIG.MAX_ATTEMPTS) {
        const { data: lastAttempt } = await supabase
          .from('login_attempts')
          .select('created_at')
          .eq('email', email)
          .eq('success', false)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (lastAttempt) {
          const lockUntil = new Date(
            new Date(lastAttempt.created_at).getTime() +
            LOCKOUT_CONFIG.LOCK_DURATION_MINUTES * 60 * 1000
          )

          if (lockUntil > new Date()) {
            const remaining = Math.ceil(
              (lockUntil.getTime() - Date.now()) / 1000 / 60
            )
            throw new Error(
              `Akun terkunci. Coba lagi dalam ${remaining} menit.`
            )
          }
        }
      }

      return count || 0
    } catch (err: any) {
      if (err?.message?.includes('terkunci')) throw err
      return 0
    }
  },

  async recordAttempt(email: string, success: boolean) {
    try {
      await supabase.from('login_attempts').insert({ email, success })
    } catch {
      // table might not exist yet
    }
  },

  async login(email: string, password: string) {
    await this.checkLockout(email)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      await this.recordAttempt(email, false)
      throw error
    }

    await this.recordAttempt(email, true)
    return data
  },

  async logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) return null

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle()

      if (profileError) return null
      if (!profile) return null
      if (!profile.is_active) return null

      return profile as User
    } catch {
      return null
    }
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle()

        if (!error && profile && profile.is_active) {
          callback(profile as User)
        } else {
          callback(null)
        }
      } else {
        callback(null)
      }
    })
  },
}
