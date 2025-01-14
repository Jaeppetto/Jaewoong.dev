import { ArticleList } from '@/widgets/article'
import { CategoryList } from '@/widgets/category'

const ArticlePage = () => {
  return (
    <div className="flex h-full w-full max-w-[108rem] flex-col gap-[8rem] py-[6rem]">
      <ArticleList />
      <CategoryList />
    </div>
  )
}

export default ArticlePage
