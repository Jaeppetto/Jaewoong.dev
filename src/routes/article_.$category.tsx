import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

const Category = () => {
  const category = Route.useParams().category

  return (
    <div>
      Hello /article/$category! {category}
      <Link
        to="/article/$category/$postTitle"
        params={{ category, postTitle: 'postTitle' }}>
        Go to title
      </Link>
      <Outlet />
    </div>
  )
}

export const Route = createFileRoute('/article_/$category')({
  component: Category
})
