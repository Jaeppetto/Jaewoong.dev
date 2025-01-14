import { Category } from '@/entities/category'
import { cn } from '@/shared/shadcn-ui/util'
import { useRouter } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { CalendarDays } from 'lucide-react'
import { Post } from '../../constant'

interface ArticleCardProps {
  category?: Pick<Category, 'id' | 'slug' | 'name'> | null
  post: Post
  className?: string
}

const ArticleCard = ({ category, post, className }: ArticleCardProps) => {
  if (!post || !category) return null

  const router = useRouter()

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    return router.navigate({ to: `/article/${category.slug}` })
  }

  const handleCardClick = () => {
    return router.navigate({ to: `/article/${category.slug}/${post.slug}` })
  }

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        'ease-[cubic-bezier(0.34,1.56,0.64,1)] flex h-[14.2rem] w-full cursor-pointer items-center justify-between rounded-[1.2rem] border border-slate-200 bg-white p-[2.4rem] shadow-default transition-all duration-500 hover:scale-[1.03]',
        className
      )}>
      <div className="flex h-full w-2/3 flex-grow flex-col items-start justify-center gap-[0.6rem]">
        <button
          className="bg-transparent text-[1.4rem] font-normal leading-[2rem] text-slate-900 underline-offset-2 hover:underline"
          onClick={handleCategoryClick}>
          {category?.name ?? '-'}
        </button>

        <h3 className="relative my-[0.3rem] inline-block text-[2rem] font-bold leading-[2rem] text-slate-900">
          {post?.title ?? '-'}
        </h3>

        <p className="text-[1.4rem] font-normal leading-[2rem]">
          {post?.description ?? '-'}
        </p>

        {post?.created_at && dayjs(post.created_at).isValid() && (
          <div className="flex items-center gap-[0.4rem] text-[1.4rem] leading-[2rem]">
            <CalendarDays
              size={16}
              className="text-[1.2rem] font-normal leading-[1.6rem] text-slate-500"
            />
            <span className="text-slate-500">
              {post?.created_at && dayjs(post.created_at).isValid()
                ? dayjs(post.created_at).format('YYYY.MM.DD')
                : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArticleCard
