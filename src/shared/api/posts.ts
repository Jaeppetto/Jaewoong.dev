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

  getPaginatedAll: async (
    page: number,
    pageSize: number
  ): Promise<{ data: PostWithRelations[]; total: number }> => {
    const { data, error, count } = await supabase
      .from('posts')
      .select(
        `
        *,
        categories (
          id,
          name,
          slug,
          emoji
        )
      `,
        { count: 'exact' }
      )
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1)

    if (error) throw error
    return {
      data: data || [],
      total: count || 0
    }
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
          slug,
          emoji
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
          slug,
          emoji
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
          slug,
          emoji
        )
      `
      )
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  getByCategorySlug: async (
    categorySlug: string,
    page: number,
    pageSize: number
  ): Promise<{ data: PostWithRelations[]; total: number }> => {
    const { data, error, count } = await supabase
      .from('posts')
      .select(
        `
        *,
        categories!inner (
          id,
          name,
          slug,
          emoji
        )
      `,
        { count: 'exact' }
      )
      .eq('categories.slug', categorySlug)
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1)

    if (error) throw error
    return {
      data: data || [],
      total: count || 0
    }
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
          slug,
          emoji
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
  },

  togglePublished: async (id: string, currentState: boolean): Promise<Post> => {
    const { data, error } = await supabase
      .from('posts')
      .update({ published: !currentState })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  }
}
