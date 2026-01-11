import { buildMeta } from '@/shared/util'
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: lazyRouteComponent(() => import('@/pages/about/AboutPage')),
  head: () =>
    buildMeta({
      title: '소개',
      description: '블로그와 작성자 소개 페이지입니다.',
      path: '/about'
    })
})
