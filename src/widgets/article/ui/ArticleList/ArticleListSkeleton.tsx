import { ArticleCardSkeleton } from '@/entities'

const ArticleListSkeleton = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-[1.2rem] sm:grid-cols-2">
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
      <ArticleCardSkeleton />
    </div>
  )
}

export default ArticleListSkeleton
