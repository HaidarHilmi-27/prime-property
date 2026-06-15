import { supabase } from '@/supabase/client'
import type { User } from '@/types'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const adminService = {
  async getAll(page = 1, limit = 25) {
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .in('role', ['admin', 'superadmin'])
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error

    return {
      data: data as User[],
      count: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    }
  },

  async create(emailInput: string, password: string, role: 'admin' | 'superadmin') {
    const email = emailInput.trim().toLowerCase()

    if (!EMAIL_REGEX.test(email)) {
      throw new Error('Format email tidak valid. Gunakan format: nama@domain.com')
    }

    if (password.length < 6) {
      throw new Error('Password minimal 6 karakter')
    }

    // Step 1: Buat user via signUp (GoTrue handle auth.users + identities correctly)
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role } },
    })

    if (signUpError && !signUpError.message.toLowerCase().includes('already')) {
      throw new Error(signUpError.message)
    }

    // Step 2: Confirm email & set role via RPC
    const { data: confirmData, error: confirmError } = await supabase.rpc('confirm_signup', {
      p_email: email,
      p_role: role,
    })

    if (confirmError) {
      throw new Error('Gagal konfirmasi: ' + confirmError.message)
    }

    if (confirmData?.error) {
      throw new Error(confirmData.error)
    }

    return confirmData
  },

  async toggleActive(id: string, isActive: boolean) {
    const { error } = await supabase
      .from('profiles')
      .update({ is_active: isActive })
      .eq('id', id)
    if (error) throw error
  },

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/agent/login`,
    })
    if (error) throw error
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id)
    if (error) throw error
  },
}
