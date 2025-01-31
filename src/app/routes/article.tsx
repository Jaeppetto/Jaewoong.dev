import ArticlePage from '@/pages/article/ArticlePage'
import { createFileRoute } from '@tanstack/react-router'

/**
 * * /article
 * 최근 게시글과 카테고리 목록을 보여주는 페이지
 */

export const Route = createFileRoute('/article')({
  component: ArticlePage,
  validateSearch: (search: Record<string, unknown>): { page: number } => {
    return { page: Number(search?.page ?? 1) }
  }
})
