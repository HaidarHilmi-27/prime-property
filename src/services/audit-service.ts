import { supabase } from '@/supabase/client'

export interface AuditLog {
  id: string
  action: string
  entity_type: string
  entity_id: string
  changed_by: string
  details: Record<string, unknown>
  created_at: string
}

export const auditService = {
  async getAll(page = 1, limit = 25) {
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('audit_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error

    return {
      data: data as AuditLog[],
      count: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    }
  },

  async create(log: Omit<AuditLog, 'id' | 'created_at'>) {
    const { error } = await supabase
      .from('audit_logs')
      .insert(log)
    if (error) throw error
  },
}
