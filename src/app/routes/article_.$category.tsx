import { ArticleCategoryPage } from '@/pages/article'
import { createFileRoute } from '@tanstack/react-router'

/**
 * * /article/$category
 * 특정 카테고리에 속한 게시글 목록을 보여주는 페이지, 등록일 기준 정렬 가능
 */

export const Route = createFileRoute('/article_/$category')({
  component: ArticleCategoryPage
})
