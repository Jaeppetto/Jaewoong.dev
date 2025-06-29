import { supabase } from './supabase/client'
import type { Tables, TablesInsert, TablesUpdate } from './supabase/types'

export type Draft = Tables<'drafts'>
export type DraftInsert = TablesInsert<'drafts'>
export type DraftUpdate = TablesUpdate<'drafts'>

export const draftsApi = {
  async save(draft: DraftInsert): Promise<Draft> {
    const { data: existingDraft, error: selectError } = await supabase
      .from('drafts')
      .select('id')
      .eq('author_id', draft.author_id!)
      .eq('draft_type', draft.draft_type!)
      .maybeSingle()

    if (selectError) {
      throw selectError
    }

    if (existingDraft) {
      const { data, error } = await supabase
        .from('drafts')
        .update({
          title: draft.title,
          content: draft.content,
          description: draft.description,
          category_id: draft.category_id,
          thumbnail: draft.thumbnail,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingDraft.id)
        .select()
        .single()

      if (error) throw error
      return data
    } else {
      const { data, error } = await supabase
        .from('drafts')
        .insert(draft)
        .select()
        .single()

      if (error) throw error
      return data
    }
  },

  async get(
    authorId: string,
    draftType: 'auto' | 'manual'
  ): Promise<Draft | null> {
    const { data, error } = await supabase
      .from('drafts')
      .select()
      .eq('author_id', authorId)
      .eq('draft_type', draftType)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()

    if (error) throw error
    return data
  },

  async getAll(authorId: string): Promise<Draft[]> {
    const { data, error } = await supabase
      .from('drafts')
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
      .eq('author_id', authorId)
      .order('updated_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('drafts').delete().eq('id', id)

    if (error) throw error
  },

  async deleteByAuthorAndType(
    authorId: string,
    draftType: 'auto' | 'manual'
  ): Promise<void> {
    const { error } = await supabase
      .from('drafts')
      .delete()
      .eq('author_id', authorId)
      .eq('draft_type', draftType)

    if (error) throw error
  }
}
