import { Post, PostInsert, PostUpdate, PostWithRelations } from '@/entities'
import { supabase } from './supabase/client'

export const postApi = {
  getAll: async (): Promise<PostWithRelations[]> => {
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

  getById: async (id: string): Promise<PostWithRelations> => {
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

  getBySlug: async (slug: string): Promise<PostWithRelations> => {
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
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  },

  getByCategoryId: async (categoryId: string): Promise<PostWithRelations[]> => {
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

  getByCategorySlug: async (
    categorySlug: string
  ): Promise<PostWithRelations[]> => {
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
      .eq('categories.slug', categorySlug)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  create: async (post: PostInsert): Promise<PostWithRelations> => {
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

  update: async ({
    id,
    ...post
  }: PostUpdate & { id: string }): Promise<Post> => {
    const { data, error } = await supabase
      .from('posts')
      .update(post)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase.from('posts').delete().eq('id', id)

    if (error) throw error
  }
}
