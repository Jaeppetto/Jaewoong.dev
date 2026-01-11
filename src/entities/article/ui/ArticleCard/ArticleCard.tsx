import { Category } from '@/entities/category'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/shared/shadcn-ui/ui/tooltip'
import { cn } from '@/shared/shadcn-ui/util'
import { useRouter } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { CalendarDays } from 'lucide-react'
import { Post } from '../../constant'

interface ArticleCardProps {
  category?: Pick<Category, 'id' | 'slug' | 'name' | 'emoji'> | null
  post: Post
  className?: string
}

const ArticleCard = ({ category, post, className }: ArticleCardProps) => {
  const router = useRouter()

  if (!post || !category) return null

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    return router.navigate({ to: `/article/${category.slug}` })
  }

  const handleCardClick = () => {
    return router.navigate({ to: `/article/${category.slug}/${post.slug}` })
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={handleCardClick}
            className={cn(
              'flex h-[14.2rem] w-full cursor-pointer rounded-[1.2rem] border border-slate-200 bg-white p-[1.4rem] shadow-default transition-all duration-300 ease-in-out hover:bg-slate-50',
              className
            )}>
            <div className="flex flex-1 flex-col items-start justify-between gap-3">
              <div className="flex flex-col items-start gap-1">
                <button
                  className="rounded-[0.8rem] bg-transparent px-4 py-1 text-[1.2rem] font-normal leading-[2rem] text-slate-900 underline-offset-[6px] transition-colors hover:bg-slate-200/50"
                  onClick={handleCategoryClick}>
                  {category?.emoji ?? '-'} {category?.name ?? '-'}
                </button>

                <h3 className="line-clamp-1 text-ellipsis px-4 text-[2rem] font-bold leading-[2.4rem] text-slate-900">
                  {post?.title ?? '-'}
                </h3>

                <p className="line-clamp-1 text-ellipsis px-4 text-[1.4rem] font-normal leading-[2rem] text-slate-600">
                  {post?.description ?? '-'}
                </p>
              </div>

              {post?.created_at && dayjs(post.created_at).isValid() && (
                <div className="flex items-center gap-[0.4rem] px-4 text-[1.4rem] leading-[2rem]">
                  <CalendarDays
                    size={16}
                    className="text-[1.2rem] font-normal leading-[1.6rem] text-slate-600"
                  />
                  <span className="text-slate-600">
                    {post?.created_at && dayjs(post.created_at).isValid()
                      ? dayjs(post.created_at).format('YYYY.MM.DD')
                      : ''}
                  </span>
                </div>
              )}
            </div>
            {post?.thumbnail && (
              <img
                src={post?.thumbnail ?? ''}
                alt={post?.title ?? ''}
                className="object-fit hidden rounded-lg object-cover sm:block"
              />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <span className="text-[1.3rem] leading-[1.8rem]">
            {post?.title ?? '-'}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ArticleCard
