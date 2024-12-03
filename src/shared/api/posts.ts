import { supabase } from './supabase/client'
import type { Database } from './supabase/types'

export type Post = Database['public']['Tables']['posts']['Row']
export type PostInsert = Database['public']['Tables']['posts']['Insert']
export type PostUpdate = Database['public']['Tables']['posts']['Update']

export const postApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        *,
        categories (
          id,
          name,
          slug
        )
      `
      )
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        *,
        categories (
          id,
          name,
          slug
        )
      `
      )
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  getByCategoryId: async (categoryId: string) => {
    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        *,
        categories (
          id,
          name,
          slug
        )
      `
      )
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  create: async (post: PostInsert) => {
    const { data, error } = await supabase
      .from('posts')
      .insert(post)
      .select(
        `
        *,
        categories (
          id,
          name,
          slug
        )
      `
      )
      .single()

    if (error) throw error
    return data
  },

  update: async ({ id, ...post }: PostUpdate & { id: string }) => {
    const { data, error } = await supabase
      .from('posts')
      .update(post)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  delete: async (id: string) => {
    const { error } = await supabase.from('posts').delete().eq('id', id)

    if (error) throw error
  }
}
