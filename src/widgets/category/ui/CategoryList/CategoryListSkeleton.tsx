import { CategoryButtonSkeleton } from '@/entities'

const CategoryListSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-[.8rem]">
      {Array.from({ length: 4 }).map((_, index) => (
        <CategoryButtonSkeleton key={index} />
      ))}
    </div>
  )
}

export default CategoryListSkeleton
