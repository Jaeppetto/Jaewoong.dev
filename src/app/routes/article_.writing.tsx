import { createFileRoute } from '@tanstack/react-router'
import { adminGuard } from '@/shared/auth/guards/adminGuard'

import { ArticleWritingPage } from '@/pages'

export const Route = createFileRoute('/article_/writing')({
  beforeLoad: async () => {
    return await adminGuard()
  },
  component: ArticleWritingPage
})
