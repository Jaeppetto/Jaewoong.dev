import { ArticleCard } from '@/entities'
import { usePostsByCategorySlugQuery } from '@/features/article/api/queries'
import ArticleListSkeleton from './ArticleListSkeleton'

interface ArticleListProps {
  type: 'recent' | 'category' | 'recommend'
  categorySlug?: string
}

const ArticleList = ({ type, categorySlug }: ArticleListProps) => {
  const {
    data: posts,
    isLoading,
    isPending
  } = usePostsByCategorySlugQuery(categorySlug)

  // TODO: 로딩 중 스켈레톤 처리
  // TODO: 에러 또는 리스트가 없을 때 예외처리
  // TODO: 무한 스크롤 또는 페이지네이션

  if (isLoading || isPending) return <ArticleListSkeleton />

  if (type === 'recommend')
    return (
      <div className="grid w-full grid-cols-1 gap-[1.2rem] sm:grid-cols-2">
        {posts
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
    <div className="grid w-full grid-cols-1 gap-[1.2rem] sm:grid-cols-2">
      {posts?.map(post => (
        <ArticleCard
          key={post.id}
          post={post}
          category={post.categories}
        />
      ))}
    </div>
  )
}

export default ArticleList
