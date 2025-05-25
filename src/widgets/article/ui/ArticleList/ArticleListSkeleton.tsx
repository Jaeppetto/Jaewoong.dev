import { ArticleCardSkeleton } from '@/entities'

interface ArticleListSkeletonProps {
  length?: number
}

const ArticleListSkeleton = ({ length }: ArticleListSkeletonProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-[1.2rem] sm:grid-cols-2">
      {Array.from({ length: length ?? 6 }).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  )
}

export default ArticleListSkeleton
