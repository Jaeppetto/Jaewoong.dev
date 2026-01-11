import { ArticleCategoryPage } from '@/pages/article'
import { buildMeta } from '@/shared/util'
import { createFileRoute } from '@tanstack/react-router'

/**
 * * /article/$category
 * 특정 카테고리에 속한 게시글 목록을 보여주는 페이지, 등록일 기준 정렬 가능
 */

export const Route = createFileRoute('/article_/$category')({
  component: ArticleCategoryPage,
  loader: ({ params }) => ({
    categorySlug: params.category
  }),
  head: ({ params }) =>
    buildMeta({
      title: `${params.category} 카테고리`,
      description: `${params.category} 카테고리의 게시글 목록입니다.`,
      path: `/article/${params.category}`
    }),
  validateSearch: (search: Record<string, unknown>): { page: number } => {
    return { page: Number(search?.page ?? 1) }
  }
})
