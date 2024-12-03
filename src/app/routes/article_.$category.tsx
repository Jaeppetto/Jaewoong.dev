import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

/**
 * * /article/$category
 * 특정 카테고리에 속한 게시글 목록을 보여주는 페이지, 등록일 기준 정렬 가능
 */

const CategoryPage = () => {
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
  component: CategoryPage
})
