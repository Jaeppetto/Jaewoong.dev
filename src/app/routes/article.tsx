import ArticlePage from '@/pages/article/ArticlePage'
import { buildMeta } from '@/shared/util'
import { createFileRoute } from '@tanstack/react-router'

/**
 * * /article
 * 최근 게시글과 카테고리 목록을 보여주는 페이지
 */

export const Route = createFileRoute('/article')({
  component: ArticlePage,
  head: () =>
    buildMeta({
      title: '글 목록',
      description: '최근 게시글과 카테고리 목록을 확인할 수 있습니다.',
      path: '/article'
    }),
  validateSearch: (search: Record<string, unknown>): { page: number } => {
    return { page: Number(search?.page ?? 1) }
  }
})
