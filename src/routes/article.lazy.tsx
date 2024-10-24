import { createLazyFileRoute, Link, Outlet } from '@tanstack/react-router'

const Article = () => {
  return (
    <div>
      Hello /article!
      <Link
        to="/article/$category"
        params={{ category: 'hello' }}>
        Go to category
      </Link>
      <Outlet />
    </div>
  )
}

export const Route = createLazyFileRoute('/article')({
  component: Article
})
