import { ArticleList } from '@/widgets/article'
import { useTagBySlugQuery } from '@/features/tag/api'
import { TagItemSkeleton, TagList } from '@/entities/tag/ui'
import { useParams, useSearch } from '@tanstack/react-router'

const ArticleTagPage = () => {
  const { tagSlug } = useParams({ from: '/article_/tag_/$tagSlug' })
  const { page = 1 } = useSearch({ from: '/article_/tag_/$tagSlug' })
  const { data: tag, isLoading } = useTagBySlugQuery(tagSlug)

  return (
    <div className="flex h-full w-full max-w-[108rem] flex-col gap-[8rem] py-[2rem] pb-[4rem]">
      <section className="flex flex-col gap-[2rem]">
        <h1 className="flex select-none items-center gap-2 text-[2rem] font-normal leading-[2rem] text-slate-900">
          <span className="font-bold">
            {isLoading ? <TagItemSkeleton /> : `#${tag?.name}`}
          </span>
          <span>태그를 갖고 있는 아티클</span>
        </h1>

        <ArticleList
          type="tag"
          tagSlug={tagSlug}
          page={page}
          pageSize={6}
        />
      </section>

      <TagList />
    </div>
  )
}

export default ArticleTagPage
