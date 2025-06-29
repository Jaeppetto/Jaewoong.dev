import { ArticleCard } from '@/entities'

import ArticleListSkeleton from './ArticleListSkeleton'
import { Pagination } from '@/shared/ui'
import { usePostsByCategorySlugQuery } from '@/features/article/api/queries'
import { usePostsByTagPaginatedQuery } from '@/features/tag'

interface ArticleListProps {
  type: 'recent' | 'category' | 'recommend' | 'tag'
  categorySlug?: string
  tagSlug?: string
  page?: number
  pageSize?: number
}

const ArticleList = ({
  type,
  categorySlug,
  tagSlug,
  page = 1,
  pageSize = 4
}: ArticleListProps) => {
  const isTagType = type === 'tag' && tagSlug

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isPending: isCategoryPending
  } = usePostsByCategorySlugQuery(categorySlug, page, pageSize)

  const {
    data: tagData,
    isLoading: isTagLoading,
    isPending: isTagPending
  } = usePostsByTagPaginatedQuery(tagSlug || '', page, pageSize)

  const isLoading = isTagType
    ? isTagLoading || isTagPending
    : isCategoryLoading || isCategoryPending
  const data = isTagType ? tagData?.data : categoryData?.data
  const total = isTagType ? tagData?.total : categoryData?.total

  if (isLoading)
    return <ArticleListSkeleton length={type === 'recommend' ? 2 : undefined} />

  if (data?.length === 0)
    return (
      <div className="mt-12 flex h-full w-full items-center justify-center">
        <p className="text-lg text-slate-500">게시글이 존재하지 않습니다</p>
      </div>
    )

  if (type === 'recommend')
    return (
      <div className="grid w-full grid-cols-1 gap-[1.2rem] sm:grid-cols-2">
        {data
          ?.sort(() => Math.random() - 0.5)
          .slice(0, 2)
          .map(post => (
            <ArticleCard
              key={post.id}
              post={post}
              category={post.categories}
            />
          ))}
      </div>
    )

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-[1.2rem] sm:grid-cols-2">
        {data?.map(post => (
          <ArticleCard
            key={post.id}
            post={post}
            category={post.categories}
          />
        ))}
      </div>
      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={total ?? 0}
        className="flex w-full justify-center"
      />
    </>
  )
}

export default ArticleList
