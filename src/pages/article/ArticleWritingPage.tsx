import { EditorProvider, useCreatePost, useEditorContext } from '@/features'
import { Button, generateSlug, useAuth } from '@/shared'

import { EditController, EditPanel, MdxRenderer } from '@/widgets'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import { cn } from '@/shared/shadcn-ui/util'
import { useUpdatePostTags } from '@/features/tag'

const ArticleWritingPageContent = () => {
  const { user } = useAuth()
  const createPost = useCreatePost()
  const updatePostTags = useUpdatePostTags()
  const navigate = useNavigate()

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
              onClick={handleSubmit}
              disabled={
                createPost.isPending || !content.trim() || !title || !categoryId
              }
              className="px-6 py-8 w-full font-bold text-white bg-black rounded-2xl transition-all duration-300 hover:bg-black/80 disabled:opacity-50">
              {createPost.isPending ? '저장 중...' : '작성하기'}
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

const ArticleWritingPage = () => {
  return (
    <EditorProvider>
      <ArticleWritingPageContent />
    </EditorProvider>
  )
}

export default ArticleWritingPage
