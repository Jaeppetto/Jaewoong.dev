import { createFileRoute } from '@tanstack/react-router'

const Post = () => {
  const category = Route.useParams().category
  const postTitle = Route.useParams().postTitle

  return (
    <div>
      Hello /article/$category/$postTitle! {category} - {postTitle}
    </div>
  )
}

export const Route = createFileRoute('/article_/$category_/$postTitle')({
  component: Post
})
