import {
  EditorProvider,
  useEditorContext,
  usePostQueryById,
  useUpdatePost
} from '@/features'
import { Button, generateSlug, useAuth } from '@/shared'
import { EditController, EditPanel, MdxRenderer } from '@/widgets'
import { useNavigate, useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import { cn } from '@/shared/shadcn-ui/util'
import { useEffect, useState } from 'react'
import { usePostTagsQuery, useUpdatePostTags } from '@/features/tag'
import { useAutoSave } from '@/features/article/hooks/useAutoSave'
import { useDeleteDraftByType } from '@/features/article/api/draftQueries'
import { DraftsList } from '@/features/article/components/DraftsList'
import { Save, FolderOpen } from 'lucide-react'
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

const ArticleEditContent = () => {
  const { postId } = useParams({ from: '/article_/edit_/$postId' })
  const navigate = useNavigate()
  const { user } = useAuth()

  const { data: post, isLoading, isError } = usePostQueryById(postId)
  const { data: postTags, isLoading: isTagsLoading } = usePostTagsQuery(postId)

  const updatePost = useUpdatePost()
  const updatePostTags = useUpdatePostTags()
  const deleteDraftByType = useDeleteDraftByType()

  const [isInitialized, setIsInitialized] = useState(false)
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

  // 자동 저장
  useAutoSave({
    title,
    content,
    description: description || '',
    categoryId,
    thumbnail,
    draftType: 'auto',
    enabled: isInitialized,
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
      if (!post) return

      const updatedPost = await updatePost.mutateAsync({
        id: post.id,
        title,
        content,
        description,
        category_id: categoryId,
        slug: generateSlug(title),
        updated_at: new Date().toISOString(),
        thumbnail
      })

      console.log(tagIds)

      await updatePostTags.mutateAsync({
        postId: updatedPost.id,
        tagIds: tagIds
      })

      if (user?.id) {
        await Promise.all([
          deleteDraftByType.mutateAsync({ authorId: user.id, draftType: 'auto' }),
          deleteDraftByType.mutateAsync({ authorId: user.id, draftType: 'manual' })
        ])
      }

      toast.success('게시글이 성공적으로 수정되었습니다.')
      navigate({
        to: '/article/$category/$postTitle',
        params: {
          category: post.categories?.slug || '',
          postTitle: generateSlug(title)
        }
      })
    } catch (error) {
      console.error('게시글 수정 실패:', error)
      toast.error('게시글 수정에 실패했습니다.')
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

  useEffect(() => {
    if (post && postTags && !isInitialized) {
      handleContentChange(post.content)
      updateMeta({
        title: post.title,
        description: post.description || '',
        categoryId: post.category_id || null,
        thumbnail: post.thumbnail || null,
        tagIds: postTags.map(tag => tag.id)
      })
      setIsInitialized(true)
    }
  }, [post, postTags, handleContentChange, updateMeta, isInitialized])

  if (isLoading || isTagsLoading) {
    return <div className="py-10 text-center">게시글을 불러오는 중...</div>
  }

  if (isError || !post) {
    return <div className="py-10 text-center">게시글을 찾을 수 없습니다.</div>
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
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => {
                navigate({
                  to: '/article/$category/$postTitle',
                  params: {
                    category: post.categories?.slug || '',
                    postTitle: post.slug
                  }
                })
              }}
              className="px-6 py-8 font-bold rounded-2xl border-none shadow-none transition-all duration-300 bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50">
              취소
            </Button>
            <Button
              onClick={() => setShowDraftsList(true)}
              variant="outline"
              className="px-6 py-8 font-bold rounded-2xl transition-all duration-300 hover:bg-gray-50">
              <FolderOpen className="mr-2 w-4 h-4" />
              임시저장 목록
            </Button>
            <Button
              onClick={handleManualSave}
              disabled={manualSave.isLoading}
              variant="outline"
              className="px-6 py-8 font-bold rounded-2xl transition-all duration-300 hover:bg-gray-50 disabled:opacity-50">
              <Save className="mr-2 w-4 h-4" />
              {manualSave.isLoading ? '저장 중...' : '임시저장'}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={
                updatePost.isPending || !content.trim() || !title || !categoryId
              }
              className="px-6 py-8 font-bold text-white bg-black rounded-2xl transition-all duration-300 hover:bg-black/80 disabled:opacity-50">
              {updatePost.isPending ? '저장 중...' : '수정 완료'}
            </Button>
          </div>
        </section>
        {isPreview && (
          <section className="w-1/2">
            <MdxRenderer content={content} />
          </section>
        )}
      </main>

      <EditPanel />

      {showDraftsList && (
        <div className="flex fixed inset-0 z-50 justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-auto m-4">
            <DraftsList
              onLoadDraft={handleLoadDraft}
              onClose={() => setShowDraftsList(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}

const ArticleEditPage = () => {
  return (
    <EditorProvider>
      <ArticleEditContent />
    </EditorProvider>
  )
}

export default ArticleEditPage
