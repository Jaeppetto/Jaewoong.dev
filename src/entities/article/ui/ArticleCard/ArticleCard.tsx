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
            <div className="flex flex-col items-start justify-between flex-1 gap-3">
              <div className="flex flex-col items-start gap-1">
                <button
                  className="rounded-[0.8rem] bg-transparent px-4 py-1 !text-body3 font-normal text-slate-900 underline-offset-[6px] transition-colors hover:bg-slate-200/50"
                  onClick={handleCategoryClick}>
                  {category?.emoji ?? '-'} {category?.name ?? '-'}
                </button>

                <h3 className="line-clamp-1 text-ellipsis px-4 !text-h3 font-bold text-slate-900">
                  {post?.title ?? '-'}
                </h3>

                <p className="line-clamp-1 text-ellipsis px-4 !text-body2 font-normal text-slate-600">
                  {post?.description ?? '-'}
                </p>
              </div>

              {post?.created_at && dayjs(post.created_at).isValid() && (
                <div className="flex items-center gap-[0.4rem] px-4 !text-body3">
                  <CalendarDays
                    size={16}
                    className="!text-body3 font-normal text-slate-600"
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
                className="hidden object-cover rounded-lg object-fit sm:block"
              />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <span className="!text-body3">
            {post?.title ?? '-'}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ArticleCard
