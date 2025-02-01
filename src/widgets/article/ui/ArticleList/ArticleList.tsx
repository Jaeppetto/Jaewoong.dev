import { ArticleCard } from '@/entities'
import { usePostsByCategorySlugQuery } from '@/features/article/api/queries'
import ArticleListSkeleton from './ArticleListSkeleton'
import { Pagination } from '@/shared/ui'

interface ArticleListProps {
  type: 'recent' | 'category' | 'recommend'
  categorySlug?: string
  page?: number
  pageSize?: number
}

const ArticleList = ({
  type,
  categorySlug,
  page,
  pageSize
}: ArticleListProps) => {
  const { data, isLoading, isPending } = usePostsByCategorySlugQuery(
    categorySlug,
    page,
    pageSize
  )

  // TODO: 에러 또는 리스트가 없을 때 예외처리

  if (isLoading || isPending) return <ArticleListSkeleton />

  if (type === 'recommend')
    return (
      <div className="grid w-full grid-cols-1 gap-[1.2rem] sm:grid-cols-2">
        {data?.posts
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
        {data?.posts.map(post => (
          <ArticleCard
            key={post.id}
            post={post}
            category={post.categories}
          />
        ))}
      </div>
      <Pagination
        page={page ?? 1}
        pageSize={pageSize ?? 4}
        totalItems={data?.total ?? 0}
        className="flex w-full justify-center"
      />
    </>
  )
}

export default ArticleList
