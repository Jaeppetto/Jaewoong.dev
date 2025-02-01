import { cn } from '@/shared/shadcn-ui/util'
import { Route as ArticleCategoryRoute } from '@/app/routes/article_.$category'
import { Link } from '@tanstack/react-router'
interface CategoryButtonProps {
  slug: string
  name: string
  className?: string
}

const CategoryButton = ({ slug, name, className }: CategoryButtonProps) => {
  return (
    <Link
      to={ArticleCategoryRoute.to}
      params={{ category: slug }}
      search={{ page: 1 }}
      className={cn(
        'ease-[cubic-bezier(0.34,1.56,0.64,1)] flex cursor-pointer items-center justify-center rounded-[10rem] border border-slate-200 bg-white p-[2.4rem] px-[2.8rem] py-[1.6rem] shadow-default transition-all duration-500 hover:scale-[1.03]',
        className
      )}>
      <p className="text-[2rem] font-extrabold leading-[2rem] text-slate-900">
        {name}
      </p>
    </Link>
  )
}

export default CategoryButton
