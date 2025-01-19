import { ArticleCard } from '@/entities'
import { usePostsQuery } from '@/features'

const ArticleList = () => {
  const { data: posts } = usePostsQuery()

  // TODO: 로딩 중 스켈레톤 처리
  // TODO: 에러 또는 리스트가 없을 때 예외처리

  return (
    <div className="flex w-full flex-col gap-[2rem]">
      <h1 className="select-none text-[3.2rem] font-extrabold text-slate-900">
        최근 아티클
      </h1>
      <div className="grid grid-cols-1 gap-[1.2rem] sm:grid-cols-2">
        {posts?.map(post => (
          <ArticleCard
            key={post.id}
            post={post}
            category={post.categories}
          />
        ))}
      </div>
    </div>
  )
}

export default ArticleList
