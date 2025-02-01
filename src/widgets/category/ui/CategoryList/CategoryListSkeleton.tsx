import { CategoryButtonSkeleton } from '@/entities'

const CategoryListSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-[1.2rem]">
      <CategoryButtonSkeleton />
      <CategoryButtonSkeleton />
      <CategoryButtonSkeleton />
      <CategoryButtonSkeleton />
      <CategoryButtonSkeleton />
    </div>
  )
}

export default CategoryListSkeleton
