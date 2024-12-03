import { createFileRoute } from '@tanstack/react-router'
import { adminGuard } from '@/shared/auth/guards/adminGuard'

import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'

import { articleModel } from '@/features/article/model/articleModel'
import ArticleSubmitButton from '@/features/article/ui/ArticleSubmitButton'
import { useArticleEditor } from '@/features/article/hooks/useArticleEditor'

/**
 * * /article/writing
 * 게시글 작성 페이지
 */

const WritingPage = () => {
  const { value, handleChange } = useArticleEditor()

  return (
    <div className="flex flex-col gap-4">
      <MDEditor
        value={value}
        onChange={handleChange}
        preview="edit"
        className="min-h-[40rem]"
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]]
        }}
      />
      <ArticleSubmitButton
        onClick={() => articleModel.downloadMarkdown(value, 'post')}
      />
    </div>
  )
}
export const Route = createFileRoute('/article_/writing')({
  beforeLoad: async () => {
    return await adminGuard()
  },
  component: WritingPage
})

// TODO: 카테고리, 제목, 해시태그, 한줄요약(description) 입력
// TODO: 게시글 자동 임시저장, 임시저장 시간 표시
// TODO: 해당 카테고리의 서버 저장
