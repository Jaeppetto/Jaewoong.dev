import { Skeleton } from '@/shared/shadcn-ui/ui/skeleton'

const CategoryAccordionSkeleton = () => {
  return (
    <article className="flex h-full w-full max-w-[16.5rem] flex-col gap-[2rem] py-[2rem] pb-[4rem]">
      <Skeleton className="h-[4rem] w-full" />
      <Skeleton className="h-[4rem] w-full" />
      <Skeleton className="h-[4rem] w-full" />
      <Skeleton className="h-[4rem] w-full" />
    </article>
  )
}

export default CategoryAccordionSkeleton
