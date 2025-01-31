import { Route } from '@/app/routes/article_.$category'
import { ArticleList, ArticleListHeader } from '@/widgets'

const ArticleCategoryPage = () => {
  const { categorySlug } = Route.useLoaderData()
  const { page } = Route.useSearch()

  return (
    <div className="flex h-full w-full max-w-[108rem] flex-col gap-[8rem] py-[6rem]">
      <section className="flex flex-col gap-[2rem]">
        <ArticleListHeader type="category" />
        <ArticleList
          type="category"
          categorySlug={categorySlug}
          page={page}
          pageSize={6}
        />
      </section>
      <section className="flex flex-col gap-[2rem]">
        <ArticleListHeader type="recommend" />
        <ArticleList type="recommend" />
      </section>
    </div>
  )
}

export default ArticleCategoryPage
