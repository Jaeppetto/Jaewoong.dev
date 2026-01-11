import { ArticleTagPage } from '@/pages'
import { buildMeta } from '@/shared/util'
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
  head: ({ params }) =>
    buildMeta({
      title: `#${params.tagSlug} 태그`,
      description: `${params.tagSlug} 태그가 포함된 게시글 목록입니다.`,
      path: `/article/tag/${params.tagSlug}`
    }),
  validateSearch: (search: Record<string, unknown>): { page: number } => {
    return { page: Number(search?.page ?? 1) }
  }
})
