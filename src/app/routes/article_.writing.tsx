import { createFileRoute } from '@tanstack/react-router'
import { adminGuard } from '@/shared/auth/guards/adminGuard'
import { useAuth } from '@/shared/auth/hooks/useAuth'

import { useArticleEditor } from '@/features/article/hooks/useArticleEditor'
import { Button } from '@/shared/shadcn-ui/ui'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import ArticleWritePanel from '@/features/article/ui/ArticleWritePanel'
import { useCreatePost } from '@/features/article/api/queries'
import generateSlug from '@/shared/util/generateSlug'

const WritingPage = () => {
  const { user } = useAuth()

  const {
    content,
    title,
    description,
    categoryId,
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
        author_id: user?.id
      })
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-4">
      <ArticleWritePanel
        title={title}
        description={description}
        categoryId={categoryId}
        onMetaChange={updateMeta}
      />
      <MDEditor
        value={content}
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
          disabled={createPost.isPending || !content.trim() || !title}>
          {createPost.isPending ? 'Saving...' : 'Publish'}
        </Button>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/article_/writing')({
  beforeLoad: async () => {
    return await adminGuard()
  },
  component: WritingPage
})
