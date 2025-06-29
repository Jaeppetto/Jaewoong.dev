import { useAuth } from '@/shared/auth/hooks/useAuth'
import { useGetAllDrafts, useDeleteDraft } from '../api/draftQueries'
import { Button } from '@/shared'
import { Trash2, FileText, Clock } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/shadcn-ui/ui/dialog'

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
  open: boolean
}

export const DraftsList = ({ onLoadDraft, onClose, open }: DraftsListProps) => {
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

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="text-xl text-slate-500">임시저장 목록을 불러오는 중...</div>
        </div>
      )
    }

    if (!draftsWithCategory || draftsWithCategory.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center py-12 text-slate-500">
          <FileText className="mb-4 w-16 h-16 opacity-50" />
          <p className="text-xl">저장된 임시글이 없습니다</p>
        </div>
      )
    }

    return (
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {draftsWithCategory.map((draft) => (
          <div
            key={draft.id}
            className="p-6 rounded-xl border shadow-sm transition-colors border-slate-200 hover:bg-slate-50"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="flex gap-3 items-center mb-3">
                  <h4 className="text-2xl font-bold truncate text-slate-900">
                    {draft.title || '제목 없음'}
                  </h4>
                  <span className="px-2 font-medium rounded-md text-md bg-slate-100 text-slate-700">
                    {getDraftTypeLabel(draft.draft_type)}
                  </span>
                </div>

                <p className="mb-3 text-xl leading-relaxed text-slate-600">
                  {getDraftPreview(draft.content)}
                </p>

                <div className="flex gap-6 items-center text-sm text-slate-500">
                  <div className="flex gap-2 items-center">
                    <Clock className="w-5 h-5" />
                    <span className="text-xl">{draft.updated_at ? new Date(draft.updated_at).toLocaleString('ko-KR') : '시간 정보 없음'}</span>
                  </div>
                  {draft.categories && (
                    <div className="flex gap-2 items-center">
                      <span className="text-xl">{draft.categories.emoji}</span>
                      <span className="text-xl font-medium">{draft.categories.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 items-center ml-6">
                <Button
                  size="default"
                  variant="outline"
                  onClick={() => handleDeleteDraft(draft.id)}
                  disabled={deleteDraft.isPending}
                  className="px-2 text-black bg-transparent border-none shadow-none"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  onClick={() => onLoadDraft(draft)}
                  className="px-6 py-2 text-xl font-medium text-white bg-black rounded-full border-none shadow-none hover:bg-black/80 disabled:opacity-50 hover:text-white"
                >
                  불러오기
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[85vh]">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-3xl font-bold text-slate-900">임시저장 목록</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}