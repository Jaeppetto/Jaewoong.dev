import { ArticleDetailHeader, ArticleDetailSkeleton } from '@/entities'
import { usePostBySlugQuery } from '@/features'
import { cn } from '@/shared/shadcn-ui/util'
import { MdxRenderer } from '@/widgets'
import { Navigate, useParams } from '@tanstack/react-router'
import { Suspense } from 'react'

const ArticleDetailPage = () => {
  const { postTitle } = useParams({ from: '/article_/$category_/$postTitle' })
  const { data: post, isLoading, isError } = usePostBySlugQuery(postTitle)

  if (isError) {
    return (
      <Navigate
        to="/article"
        search={{ page: 1 }}
      />
    )
  }

  if (isLoading || !post) {
    return <ArticleDetailSkeleton />
  }

  return (
    <article className="flex h-full w-full max-w-[88rem] flex-col gap-[4rem] py-[2rem]">
      <ArticleDetailHeader post={post} />

      <main
        className={cn(
          'prose prose-slate dark:prose-invert',
          'max-w-none px-[1rem]'
        )}>
        <Suspense fallback={<div className="animate-pulse">로딩 중...</div>}>
          <MdxRenderer content={post.content} />
        </Suspense>
      </main>
    </article>
  )
}

export default ArticleDetailPage
