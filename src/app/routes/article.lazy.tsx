import { CategoryAccordion } from '@/features/category/ui/CategoryAccordion'
import { createLazyFileRoute, Link, Outlet } from '@tanstack/react-router'

/**
 * * /article
 * 최근 게시글과 카테고리 목록을 보여주는 페이지
 */

const ArticlePage = () => {
  return (
    <div className="h-full w-full max-w-[108rem]">
      Hello /article!
      <Link
        to="/article/$category"
        params={{ category: 'hello' }}>
        Go to category
      </Link>
      <CategoryAccordion />
      <Outlet />
    </div>
  )
}

export const Route = createLazyFileRoute('/article')({
  component: ArticlePage
})
