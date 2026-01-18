import { CategoryDropdown } from '@/widgets/category'

interface ArticleListHeaderProps {
  type: 'recent' | 'category' | 'recommend'
}

const ArticleListHeader = ({ type }: ArticleListHeaderProps) => {
  if (type === 'recent') {
    return (
      <h1 className="select-none !text-h3 font-normal text-slate-900">
        최근 아티클
      </h1>
    )
  }

  if (type === 'category') {
    return (
      <div className="flex items-center gap-[0.8rem]">
        <CategoryDropdown />
        <span className="select-none !text-h3 font-normal text-slate-900">
          카테고리의 아티클들
        </span>
      </div>
    )
  }

  if (type === 'recommend') {
    return (
      <h2 className="select-none !text-h3 font-normal text-slate-900">
        🤔 이런 글은 어떠세요?
      </h2>
    )
  }
}

export default ArticleListHeader
