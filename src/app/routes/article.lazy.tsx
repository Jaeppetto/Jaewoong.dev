import { CategoryAccordion } from '@/features/category/ui/CategoryAccordion'
import { createLazyFileRoute, Link, Outlet } from '@tanstack/react-router'

const Article = () => {
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
  component: Article
})
