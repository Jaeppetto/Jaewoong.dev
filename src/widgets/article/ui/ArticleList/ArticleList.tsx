import { ArticleCard } from '@/entities'
import { usePostsQuery } from '@/features'

const ArticleList = () => {
  const { data: posts } = usePostsQuery()

  // TODO: 로딩 중 스켈레톤 처리
  // TODO: 에러 또는 리스트가 없을 때 예외처리

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
