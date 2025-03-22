import { useState } from 'react'
import { useArticleEditor, useCreatePost } from '@/features'
import { Button, generateSlug } from '@/shared'
import { useAuth } from '@/shared/auth/hooks/useAuth'
import { EditController, EditPanel, MdxRenderer } from '@/widgets'

import MDEditor from '@uiw/react-md-editor'

import rehypeSanitize from 'rehype-sanitize'
import { cn } from '@/shared/shadcn-ui/util'

const ArticleWritingPage = () => {
  const [isPreview, setIsPreview] = useState(false)

  const { user } = useAuth()

  const {
    content,
    title,
    description,
    categoryId,
    thumbnail,
    handleContentChange,
    updateMeta
  } = useArticleEditor()
  const createPost = useCreatePost()

  const handleSubmit = async () => {
    try {
      await createPost.mutateAsync({
        title,
        content,
        description,
        category_id: categoryId,
        slug: generateSlug(title),
        published: true,
        author_id: user?.id,
        thumbnail: thumbnail
      })
    } catch (error) {
      console.error('Failed to create post:', error)
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
            onMetaChange={updateMeta}
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
              onClick={handleSubmit}
              disabled={createPost.isPending || !content.trim() || !title}
              className="w-full rounded-2xl bg-black px-6 py-8 font-bold text-white transition-none hover:bg-black/80">
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

export default ArticleWritingPage
