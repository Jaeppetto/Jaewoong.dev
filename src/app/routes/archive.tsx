import { buildMeta } from '@/shared/util'
import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'

export const Route = createFileRoute('/archive')({
  component: lazyRouteComponent(() => import('@/pages/archive/ArchivePage')),
  head: () =>
    buildMeta({
      title: '아카이브',
      description: '프로젝트 및 기록 아카이브입니다.',
      path: '/archive'
    })
})
