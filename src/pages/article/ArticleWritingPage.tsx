import { useArticleEditor, useCreatePost } from '@/features'
import { Button, generateSlug } from '@/shared'
import { useAuth } from '@/shared/auth/hooks/useAuth'
import { EditController, MdxRenderer } from '@/widgets'

import MDEditor from '@uiw/react-md-editor'
import {
  Code,
  Code2,
  EyeIcon,
  Highlighter,
  ImagePlusIcon,
  ImagesIcon
} from 'lucide-react'

import rehypeSanitize from 'rehype-sanitize'
import { CardStackIcon } from '@radix-ui/react-icons'

interface EditPanelButtonProps {
  icon: React.ReactNode
  onClick: (mdx: string) => void
  subPanel?: React.ReactNode
}

const EditPanelButton = ({ icon, onClick, subPanel }: EditPanelButtonProps) => {
  if (subPanel) {
    return <div className="flex flex-col gap-2">{subPanel}</div>
  }

  return (
    <Button
      variant="ghost"
      className="h-12 w-12 p-0"
      onClick={() => onClick('')}>
      {icon}
    </Button>
  )
}

type EditPanelMenu = {
  icon: React.ReactNode
  subPanel?: React.ReactNode
  onClick: (mdx: string) => void
}

const ArticleWritingPage = () => {
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

  const EDIT_PANEL_MENU: EditPanelMenu[] = [
    {
      icon: (
        <ImagesIcon
          width={20}
          height={20}
          className="text-gray-500"
        />
      ),
      onClick: () => {}
    },
    {
      icon: (
        <ImagePlusIcon
          width={20}
          height={20}
          className="text-gray-500"
        />
      ),
      onClick: () => {}
    },
    {
      icon: (
        <EyeIcon
          width={20}
          height={20}
          className="text-gray-500"
        />
      ),
      onClick: () => {}
    },
    {
      icon: (
        <Highlighter
          width={20}
          height={20}
          className="text-gray-500"
        />
      ),
      onClick: () => {}
    },
    {
      icon: (
        <CardStackIcon
          width={20}
          height={20}
          className="text-gray-500"
        />
      ),
      onClick: () => {}
    },
    {
      icon: (
        <Code
          width={20}
          height={20}
          className="text-gray-500"
        />
      ),
      onClick: () => {}
    },
    {
      icon: (
        <Code2
          width={20}
          height={20}
          className="text-gray-500"
        />
      ),
      onClick: () => {}
    }
  ]

  return (
    <>
      <main className="mx-auto flex w-full max-w-[80dvw] gap-6 p-4">
        <section className="flex w-1/2 flex-col gap-6">
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
              className="w-full rounded-2xl bg-black px-6 py-8 font-bold text-white transition-none hover:bg-black">
              {createPost.isPending ? '저장 중...' : '작성하기'}
            </Button>
          </div>
        </section>
        <section className="w-1/2">
          <MdxRenderer content={content} />
        </section>
      </main>
      <div className="fixed left-10 top-1/2 flex -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-default">
        {/* <ImageUploader
          tempId="thumbnail"
          onUploadComplete={imageUrl => updateMeta('thumbnail', imageUrl)}
        /> */}
        {EDIT_PANEL_MENU.map(({ icon, onClick, subPanel }) => (
          <EditPanelButton
            key={icon?.toString()}
            icon={icon}
            onClick={onClick}
            subPanel={subPanel}
          />
        ))}
      </div>
    </>
  )
}

export default ArticleWritingPage
