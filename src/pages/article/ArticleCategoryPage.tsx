import { ArticleList, ArticleListHeader } from '@/widgets'

const ArticleCategoryPage = () => {
  return (
    <div className="flex h-full w-full max-w-[108rem] flex-col gap-[8rem] py-[6rem]">
      <section className="flex flex-col gap-[2rem]">
        <ArticleListHeader type="category" />
        <ArticleList />
      </section>
      <section className="flex flex-col gap-[2rem]">
        <ArticleListHeader type="recommend" />
        <ArticleList />
      </section>
    </div>
  )
}

export default ArticleCategoryPage
