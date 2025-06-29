import { useCallback, useEffect, useRef } from 'react'
import { useAuth } from '@/shared/auth/hooks/useAuth'
import { useSaveDraft } from '../api/draftQueries'
import type { DraftInsert } from '@/shared/api/drafts'

interface UseAutoSaveProps {
  title: string
  content: string
  description: string
  categoryId: string | null
  thumbnail: string | null
  draftType: 'auto' | 'manual'
  interval?: number
  enabled?: boolean
}

export const useAutoSave = ({
  title,
  content,
  description,
  categoryId,
  thumbnail,
  draftType,
  interval = 5 * 60 * 1000,
  enabled = true
}: UseAutoSaveProps) => {
  const { user } = useAuth()
  const saveDraft = useSaveDraft()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastSavedRef = useRef<string>('')

  const saveDraftData = useCallback(async () => {
    if (!user?.id || !enabled) return

    if (!title.trim() && !content.trim() && !description?.trim()) {
      return
    }

    const currentData = JSON.stringify({
      title,
      content,
      description,
      categoryId,
      thumbnail
    })
    if (currentData === lastSavedRef.current) {
      return
    }

    const draftData: DraftInsert = {
      title: title || null,
      content: content || null,
      description: description || null,
      category_id: categoryId,
      thumbnail: thumbnail,
      author_id: user.id,
      draft_type: draftType
    }

    try {
      await saveDraft.mutateAsync(draftData)
      lastSavedRef.current = currentData
    } catch (error) {
      console.error('Failed to save draft:', error)
    }
  }, [
    user?.id,
    title,
    content,
    description,
    categoryId,
    thumbnail,
    draftType,
    enabled,
    saveDraft
  ])

  const manualSave = useCallback(async () => {
    if (!user?.id) {
      console.log('No user ID for manual save')
      return
    }

    const draftData: DraftInsert = {
      title: title || null,
      content: content || null,
      description: description || null,
      category_id: categoryId,
      thumbnail: thumbnail,
      author_id: user.id,
      draft_type: draftType
    }

    try {
      const result = await saveDraft.mutateAsync(draftData)
      console.log('수동 저장됨:', result)

      if (draftType === 'manual') {
        const currentData = JSON.stringify({
          title,
          content,
          description,
          categoryId,
          thumbnail
        })
        lastSavedRef.current = currentData
      }
    } catch (error) {
      console.error('Manual save failed:', error)
      throw error
    }
  }, [
    user?.id,
    title,
    content,
    description,
    categoryId,
    thumbnail,
    draftType,
    saveDraft
  ])

  useEffect(() => {
    if (!enabled || draftType !== 'auto') return

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(saveDraftData, interval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [saveDraftData, interval, enabled, draftType])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return {
    manualSave,
    isLoading: saveDraft.isPending,
    error: saveDraft.error
  }
}
