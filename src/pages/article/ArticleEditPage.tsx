import {
  EditorProvider,
  useEditorContext,
  usePostQueryById,
  useUpdatePost
} from '@/features'
import { Button, generateSlug } from '@/shared'
import { EditController, EditPanel, MdxRenderer } from '@/widgets'
import { useNavigate, useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import { cn } from '@/shared/shadcn-ui/util'
import { useEffect, useState } from 'react'

const ArticleEditContent = () => {
  const { postId } = useParams({ from: '/article_/edit_/$postId' })
  const navigate = useNavigate()

  const { data: post, isLoading, isError } = usePostQueryById(postId)
  const updatePost = useUpdatePost()

  const [isInitialized, setIsInitialized] = useState(false)

  const {
    isPreview,
    content,
    title,
    description,
    categoryId,
    thumbnail,
    handleContentChange,
    updateMeta
  } = useEditorContext()

  const handleSubmit = async () => {
    try {
      if (!post) return

      await updatePost.mutateAsync({
        id: post.id,
        title,
        content,
        description,
        category_id: categoryId,
        slug: generateSlug(title),
        updated_at: new Date().toISOString(),
        thumbnail
      })

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

  useEffect(() => {
    if (post && !isInitialized) {
      handleContentChange(post.content)
      updateMeta({
        title: post.title,
        description: post.description || '',
        categoryId: post.category_id || null,
        thumbnail: post.thumbnail || null
      })
      setIsInitialized(true)
    }
  }, [post, handleContentChange, updateMeta, isInitialized])

  if (isLoading) {
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
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                navigate({
                  to: '/article/$category/$postTitle',
                  params: {
                    category: post.categories?.slug || '',
                    postTitle: post.slug
                  }
                })
              }}
              className="rounded-2xl px-6 py-8 font-bold transition-all duration-300">
              취소
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={
                updatePost.isPending || !content.trim() || !title || !categoryId
              }
              className="rounded-2xl bg-black px-6 py-8 font-bold text-white transition-all duration-300 hover:bg-black/80 disabled:opacity-50">
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
