import { ArticleTagPage } from '@/pages'
import { createFileRoute } from '@tanstack/react-router'

/**
 * * /article/tag/$tagSlug
 * 특정 태그에 속한 게시글 목록을 보여주는 페이지
 */

export const Route = createFileRoute('/article_/tag_/$tagSlug')({
  component: ArticleTagPage,
  loader: ({ params }) => ({
    tagSlug: params.tagSlug
  }),
  validateSearch: (search: Record<string, unknown>): { page: number } => {
    return { page: Number(search?.page ?? 1) }
  }
})
