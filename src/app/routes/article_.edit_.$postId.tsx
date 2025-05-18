import { ArticleEditPage } from '@/pages'
import { adminGuard } from '@/shared/auth/guards/adminGuard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/article_/edit_/$postId')({
  beforeLoad: async () => {
    return await adminGuard()
  },
  component: ArticleEditPage
})
