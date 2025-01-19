import { useCategoriesQuery } from '@/features'
import { Route as ArticleCategoryRoute } from '@/app/routes/article_.$category'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/shared'
import { Link, useLocation } from '@tanstack/react-router'
import { Check, ChevronDown } from 'lucide-react'

const CategoryDropdown = () => {
  const { data: categories } = useCategoriesQuery()
  const location = useLocation()
  const [, , currentCategory] = location.pathname.split('/')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-1 items-center bg-transparent focus:outline-none">
        <span className="text-[2rem] font-extrabold leading-[2rem] text-slate-900">
          {categories?.find(c => c.slug === currentCategory)?.name}
        </span>
        <ChevronDown className="size-4 text-slate-900" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-full rounded-[1.2rem]">
        {categories?.map(category => (
          <DropdownMenuItem
            key={category.id}
            className="w-full rounded-[1rem]">
            <Link
              to={ArticleCategoryRoute.to}
              params={{ category: category.slug }}
              className="flex w-full items-center justify-between gap-[1.2rem] px-[0.8rem] py-[0.4rem] text-[1.4rem] font-normal leading-[1.6rem] text-slate-900 hover:text-slate-900">
              {category.name}
              {currentCategory === category.slug && (
                <Check className="size-4 text-slate-900" />
              )}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CategoryDropdown
