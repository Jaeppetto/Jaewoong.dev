import { EditorProvider, useCreatePost, useEditorContext } from '@/features'
import { Button, generateSlug, ScrollArea, useAuth } from '@/shared'

import { EditController, EditPanel, MdxRenderer } from '@/widgets'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import { cn } from '@/shared/shadcn-ui/util'
import { useUpdatePostTags } from '@/features/tag'
import { useAutoSave } from '@/features/article/hooks/useAutoSave'
import { useDeleteDraftByType } from '@/features/article/api/draftQueries'
import { DraftsList } from '@/features/article/components/DraftsList'
import { Save, FolderOpen } from 'lucide-react'
import { useState } from 'react'
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

const ArticleWritingPageContent = () => {
  const { user } = useAuth()
  const createPost = useCreatePost()
  const updatePostTags = useUpdatePostTags()
  const deleteDraftByType = useDeleteDraftByType()
  const navigate = useNavigate()
  const [showDraftsList, setShowDraftsList] = useState(false)

  const {
    isPreview,
    content,
    title,
    description,
    categoryId,
    thumbnail,
    tagIds,
    handleContentChange,
    updateMeta
  } = useEditorContext()

  useAutoSave({
    title,
    content,
    description: description || '',
    categoryId,
    thumbnail,
    draftType: 'auto',
    enabled: true,
  })

  const manualSave = useAutoSave({
    title,
    content,
    description: description || '',
    categoryId,
    thumbnail,
    draftType: 'manual',
    enabled: true,
  })

  const handleSubmit = async () => {
    try {
      const newPost = await createPost.mutateAsync({
        title,
        content,
        description,
        category_id: categoryId,
        slug: generateSlug(title),
        published: true,
        author_id: user?.id,
        thumbnail: thumbnail
      })

      if (tagIds.length > 0) {
        await updatePostTags.mutateAsync({
          postId: newPost.id,
          tagIds: tagIds
        })
      }

      if (user?.id) {
        await Promise.all([
          deleteDraftByType.mutateAsync({ authorId: user.id, draftType: 'auto' }),
          deleteDraftByType.mutateAsync({ authorId: user.id, draftType: 'manual' })
        ])
      }

      toast.success('게시글이 성공적으로 작성되었습니다.')

      navigate({
        to: '/article/$category/$postTitle',
        params: {
          category: newPost.categories?.slug || '',
          postTitle: newPost.slug
        }
      })
    } catch (error) {
      console.error('Failed to create post:', error)
      toast.error('게시글 작성에 실패했습니다.')
    }
  }

  const handleManualSave = async () => {
    try {
      await manualSave.manualSave()
      toast.success('임시저장이 완료되었습니다.')
    } catch (error) {
      console.error('Failed to save draft:', error)
      toast.error('임시저장에 실패했습니다.')
    }
  }

  const handleLoadDraft = (draft: DraftWithCategory) => {
    if (draft.title) updateMeta({ title: draft.title })
    if (draft.content) handleContentChange(draft.content)
    if (draft.description) updateMeta({ description: draft.description })
    if (draft.category_id) updateMeta({ categoryId: draft.category_id })
    if (draft.thumbnail) updateMeta({ thumbnail: draft.thumbnail })

    setShowDraftsList(false)
    toast.success('임시저장된 글을 불러왔습니다.')
  }

  return (
    <>
      <main className="mx-auto flex w-full max-w-[80dvw] gap-6 p-4">
        <section
          className={cn('flex w-full flex-col gap-6', isPreview && 'w-1/2')}>
          <EditController
            title={title}
            description={description}
            categoryId={categoryId}
            thumbnail={thumbnail}
            tagIds={tagIds}
            onMetaChange={(field, value) => updateMeta(field, value)}
          />
          <MDEditor
            value={content}
            highlightEnable
            onChange={handleContentChange}
            preview="edit"
            className="min-h-[40rem]"
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]]
            }}
          />
          <div className="flex justify-between gap-2">
            <div className="flex items-center justify-center gap-2">
              <Button
                onClick={handleManualSave}
                disabled={manualSave.isLoading}
                variant="outline"
                className="px-6 py-8 !text-body3 font-bold text-black rounded-2xl border-none shadow-none transition-all duration-300 bg-slate-100 hover:bg-slate-200 disabled:opacity-50">
                <Save className="w-6 h-6" />
                {manualSave.isLoading ? '저장 중...' : '임시저장'}
              </Button>
              <Button
                onClick={() => setShowDraftsList(true)}
                variant="outline"
                className="px-6 py-8 !text-body3 font-bold text-black rounded-2xl border-none shadow-none transition-all duration-300 bg-slate-100 hover:bg-slate-200 disabled:opacity-50">
                <FolderOpen className="w-6 h-6" />
                임시저장 목록
              </Button>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={
                createPost.isPending || !content.trim() || !title || !categoryId
              }
              className="px-6 py-8 !text-body3 font-bold text-white bg-black rounded-2xl transition-all duration-300 hover:bg-black/80 disabled:opacity-50">
              {createPost.isPending ? '저장 중...' : '발행'}
            </Button>
          </div>
        </section>
        {isPreview && (
          <ScrollArea className="w-1/2 max-h-[60rem]">
            <MdxRenderer content={content}/>
          </ScrollArea>
        )}
      </main>

      <EditPanel />

      <DraftsList
        open={showDraftsList}
        onLoadDraft={handleLoadDraft}
        onClose={() => setShowDraftsList(false)}
      />
    </>
  )
}

const ArticleWritingPage = () => {
  return (
    <EditorProvider>
      <ArticleWritingPageContent />
    </EditorProvider>
  )
}

export default ArticleWritingPage
