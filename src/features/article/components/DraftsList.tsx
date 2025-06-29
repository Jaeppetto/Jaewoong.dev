import { useAuth } from '@/shared/auth/hooks/useAuth'
import { useGetAllDrafts, useDeleteDraft } from '../api/draftQueries'
import { Button } from '@/shared'
import { Trash2, FileText, Clock } from 'lucide-react'

type DraftWithCategory = {
  id: string
  title: string | null
  content: string | null
  description: string | null
  category_id: string | null
  thumbnail: string | null
  author_id: string | null
  draft_type: string
  created_at: string | null
  updated_at: string | null
  expires_at: string | null
  categories?: {
    id: string
    name: string
    slug: string
    emoji: string | null
  } | null
}

interface DraftsListProps {
  onLoadDraft: (draft: DraftWithCategory) => void
  onClose: () => void
}

export const DraftsList = ({ onLoadDraft, onClose }: DraftsListProps) => {
  const { user } = useAuth()
  const { data: drafts, isLoading } = useGetAllDrafts(user?.id || '')
  const deleteDraft = useDeleteDraft()

  const draftsWithCategory = drafts as DraftWithCategory[] | undefined

  const handleDeleteDraft = async (id: string) => {
    if (confirm('이 임시저장을 삭제하시겠습니까?')) {
      try {
        await deleteDraft.mutateAsync(id)
      } catch (error) {
        console.error('Failed to delete draft:', error)
      }
    }
  }

  const getDraftPreview = (content: string | null) => {
    if (!content) return '내용 없음'
    const text = content.replace(/[#*`[\]]/g, '').trim()
    return text.length > 100 ? text.substring(0, 100) + '...' : text
  }

  const getDraftTypeLabel = (type: string) => {
    return type === 'auto' ? '자동저장' : '수동저장'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">임시저장 목록을 불러오는 중...</div>
      </div>
    )
  }

  if (!draftsWithCategory || draftsWithCategory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <FileText className="w-12 h-12 mb-2 opacity-50" />
        <p>저장된 임시글이 없습니다</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">임시저장 목록</h3>
        <Button variant="outline" onClick={onClose}>
          닫기
        </Button>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {draftsWithCategory.map((draft) => (
          <div
            key={draft.id}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-gray-900 truncate">
                    {draft.title || '제목 없음'}
                  </h4>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    {getDraftTypeLabel(draft.draft_type)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">
                  {getDraftPreview(draft.content)}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {draft.updated_at ? new Date(draft.updated_at).toLocaleString('ko-KR') : '시간 정보 없음'}
                  </div>
                  {draft.categories && (
                    <span className="flex items-center gap-1">
                      {draft.categories.emoji} {draft.categories.name}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onLoadDraft(draft)}
                >
                  불러오기
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteDraft(draft.id)}
                  disabled={deleteDraft.isPending}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}