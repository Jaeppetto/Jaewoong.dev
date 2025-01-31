import { Route } from '@/app/routes/article'
import { ArticleList, ArticleListHeader } from '@/widgets/article'
import { CategoryList } from '@/widgets/category'

const ArticlePage = () => {
  const { page } = Route.useSearch()

  return (
    <div className="flex h-full w-full max-w-[108rem] flex-col gap-[8rem] py-[6rem]">
      <section className="flex flex-col gap-[2rem]">
        <ArticleListHeader type="recent" />
        <ArticleList
          type="recent"
          page={page}
          pageSize={6}
        />
      </section>
      <CategoryList />
    </div>
  )
}

export default ArticlePage
