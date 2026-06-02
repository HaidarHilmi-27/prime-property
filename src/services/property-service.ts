import { supabase } from '@/supabase/client'
import type { Property, PropertyFilters } from '@/types'

export const propertyService = {
  async getAll(filters?: PropertyFilters) {
    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .is('deleted_at', null)

    if (filters?.search) {
      query = query.or(
        `nama_property.ilike.%${filters.search}%,group.ilike.%${filters.search}%`
      )
    }

    if (filters?.status) query = query.eq('status', filters.status)

    const page = filters?.page || 1
    const limit = filters?.limit || 25
    const from = (page - 1) * limit
    const to = from + limit - 1

    const sortBy = filters?.sortBy || 'created_at'
    const sortOrder = filters?.sortOrder || 'desc'
    query = query.range(from, to).order(sortBy, { ascending: sortOrder === 'asc' })

    const { data, error, count } = await query
    if (error) throw error

    return {
      data: data as Property[],
      count: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    }
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .is('deleted_at', null)
      .single()
    if (error) throw error
    return data as Property
  },

  async create(property: Omit<Property, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>) {
    const { data, error } = await supabase
      .from('properties')
      .insert(property)
      .select()
      .single()
    if (error) throw error
    return data as Property
  },

  async update(id: string, property: Partial<Property>) {
    const { data, error } = await supabase
      .from('properties')
      .update(property)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data as Property
  },

  async softDelete(id: string) {
    const { error } = await supabase
      .from('properties')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)
    if (error) throw error
  },
}
