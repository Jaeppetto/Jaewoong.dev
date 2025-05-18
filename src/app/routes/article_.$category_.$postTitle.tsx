import { ArticleDetailPage } from '@/pages/article'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/article_/$category_/$postTitle')({
  component: ArticleDetailPage,
  loader: ({ params }) => ({
    postTitle: params.postTitle,
    category: params.category
  })
})
