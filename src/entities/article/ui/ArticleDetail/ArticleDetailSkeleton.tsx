import { Skeleton } from '@/shared/shadcn-ui/ui/skeleton'

const ArticleDetailSkeleton = () => {
  return (
    <article className="flex h-full w-full max-w-[88rem] flex-col gap-[2rem] py-[2rem] pb-[4rem]">
      <Skeleton className="h-[4rem] w-2/12" />
      <Skeleton className="h-[10rem] w-full" />
      <Skeleton className="h-[4rem] w-full" />
      <Skeleton className="h-[4rem] w-full" />
      <Skeleton className="h-[4rem] w-full" />
      <Skeleton className="h-[4rem] w-full" />
      <Skeleton className="h-[4rem] w-full" />
      <Skeleton className="h-[4rem] w-full" />
      <Skeleton className="h-[4rem] w-full" />
    </article>
  )
}

export default ArticleDetailSkeleton
