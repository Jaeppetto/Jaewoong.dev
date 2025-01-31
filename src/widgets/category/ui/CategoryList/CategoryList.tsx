import { CategoryButton } from '@/entities'
import { useCategoriesQuery } from '@/features'
import CategoryListSkeleton from './CategoryListSkeleton'

const CategoryList = () => {
  const { data: categories, isLoading, isPending } = useCategoriesQuery()

  if (isLoading || isPending) return <CategoryListSkeleton />

  return (
    <div className="flex w-full flex-col gap-[2rem]">
      <h2 className="select-none text-[2rem] font-normal leading-[2rem] text-slate-900">
        카테고리로 모아보기
      </h2>
      <div className="flex flex-wrap gap-[1.2rem]">
        {categories?.map(category => (
          <CategoryButton
            key={category.id}
            slug={category.slug}
            name={category.name}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryList
