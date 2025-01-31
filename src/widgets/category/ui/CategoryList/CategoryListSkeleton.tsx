import { CategoryButtonSkeleton } from '@/entities'

const CategoryListSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-[2rem]">
      <h2 className="select-none text-[2rem] font-normal leading-[2rem] text-slate-900">
        카테고리로 모아보기
      </h2>
      <div className="flex flex-wrap gap-[1.2rem]">
        <CategoryButtonSkeleton />
        <CategoryButtonSkeleton />
        <CategoryButtonSkeleton />
        <CategoryButtonSkeleton />
        <CategoryButtonSkeleton />
      </div>
    </div>
  )
}

export default CategoryListSkeleton
