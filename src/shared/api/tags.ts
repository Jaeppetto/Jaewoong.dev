import { Tag, TagInsert, TagUpdate, PostTagInsert, Post } from '@/entities'
import { supabase } from './supabase/client'

export const tagApi = {
  getAll: async (): Promise<Tag[]> => {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data
  },

  getById: async (id: string): Promise<Tag> => {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  getBySlug: async (slug: string): Promise<Tag> => {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  },

  create: async (tag: TagInsert): Promise<Tag> => {
    const { data, error } = await supabase
      .from('tags')
      .insert(tag)
      .select()
      .single()

    if (error) throw error
    return data
  },

  update: async ({ id, ...tag }: TagUpdate & { id: string }): Promise<Tag> => {
    const { data, error } = await supabase
      .from('tags')
      .update(tag)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase.from('tags').delete().eq('id', id)

    if (error) throw error
  },

  getPostTags: async (postId: string): Promise<Tag[]> => {
    const { data, error } = await supabase
      .from('post_tags')
      .select(
        `
        tag_id,
        tags (*)
      `
      )
      .eq('post_id', postId)
    if (error) throw error
    return data.map(item => item.tags as Tag)
  },

  addPostTag: async (postTag: PostTagInsert): Promise<void> => {
    const { error } = await supabase.from('post_tags').insert(postTag)

    if (error) throw error
  },

  removePostTag: async (postId: string, tagId: string): Promise<void> => {
    const { error } = await supabase
      .from('post_tags')
      .delete()
      .match({ post_id: postId, tag_id: tagId })

    if (error) throw error
  },

  updatePostTags: async (postId: string, tagIds: string[]): Promise<void> => {
    const { error: deleteError } = await supabase
      .from('post_tags')
      .delete()
      .eq('post_id', postId)

    if (deleteError) throw deleteError

    if (tagIds.length > 0) {
      const postTags = tagIds.map(tagId => ({
        post_id: postId,
        tag_id: tagId
      }))

      const { error: insertError } = await supabase
        .from('post_tags')
        .insert(postTags)

      if (insertError) throw insertError
    }
  },

  getPostsByTag: async (tagSlug: string): Promise<Post[]> => {
    const { data, error } = await supabase
      .from('tags')
      .select(
        `
        id,
        name,
        slug,
        post_tags (
          posts (
            *,
            categories (
              id,
              name,
              slug,
              emoji
            )
          )
        )
      `
      )
      .eq('slug', tagSlug)
      .single()

    if (error) throw error

    return data.post_tags.map(pt => pt.posts as Post)
  },

  getPostsByTagPaginated: async (
    tagSlug: string,
    page: number,
    pageSize: number
  ) => {
    // 먼저 해당 태그 ID 가져오기
    const { data: tagData, error: tagError } = await supabase
      .from('tags')
      .select('id')
      .eq('slug', tagSlug)
      .single()

    if (tagError) throw tagError

    // 해당 태그가 포함된 포스트 ID 목록 가져오기
    const {
      data: postIds,
      error: postIdsError,
      count
    } = await supabase
      .from('post_tags')
      .select('post_id', { count: 'exact' })
      .eq('tag_id', tagData.id)
      .range((page - 1) * pageSize, page * pageSize - 1)

    if (postIdsError) throw postIdsError

    if (postIds.length === 0) {
      return { data: [], total: 0 }
    }

    // 포스트 ID 목록으로 포스트 데이터 가져오기
    const postIdList = postIds.map(item => item.post_id)
    const { data: posts, error: postsError } = await supabase
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
      .in('id', postIdList)
      .order('created_at', { ascending: false })

    if (postsError) throw postsError

    return {
      data: posts,
      total: count || 0
    }
  }
}
