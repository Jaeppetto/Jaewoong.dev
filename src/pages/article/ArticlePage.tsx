import { ArticleList } from '@/widgets/article'
import { CategoryList } from '@/widgets/category'

const ArticlePage = () => {
  return (
    <div className="h-full w-full max-w-[108rem] bg-fuchsia-50">
      <ArticleList />
      <CategoryList />
    </div>
  )
}

export default ArticlePage
