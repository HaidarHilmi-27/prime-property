import { supabase } from '@/supabase/client'
import type { Property, PropertyFilters } from '@/types'

export const propertyService = {
  async getAll(filters?: PropertyFilters) {
    let query = supabase.from('properties').select('*', { count: 'exact' })

    if (filters?.type) query = query.eq('type', filters.type)
    if (filters?.status) query = query.eq('status', filters.status)
    if (filters?.city) query = query.ilike('city', `%${filters.city}%`)
    if (filters?.province) query = query.ilike('province', `%${filters.province}%`)
    if (filters?.minPrice) query = query.gte('price', filters.minPrice)
    if (filters?.maxPrice) query = query.lte('price', filters.maxPrice)
    if (filters?.bedrooms) query = query.gte('bedrooms', filters.bedrooms)

    const page = filters?.page || 1
    const limit = filters?.limit || 12
    const from = (page - 1) * limit
    const to = from + limit - 1

    query = query.range(from, to).order('created_at', { ascending: false })

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
      .single()

    if (error) throw error
    return data as Property
  },

  async create(property: Omit<Property, 'id' | 'created_at' | 'updated_at'>) {
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

  async delete(id: string) {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}
