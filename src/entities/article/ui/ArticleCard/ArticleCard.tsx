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
    <div
      onClick={handleCardClick}
      className={cn(
        'ease-[cubic-bezier(0.34,1.56,0.64,1)] flex h-[14.2rem] w-full cursor-pointer flex-col items-start justify-center gap-3 rounded-[1.2rem] border border-slate-200 bg-white px-[1.4rem] shadow-default transition-all duration-300 hover:bg-slate-50',
        className
      )}>
      <button
        className="rounded-[0.8rem] bg-transparent px-4 py-1 text-[1.2rem] font-normal leading-[2rem] text-slate-900 underline-offset-[6px] transition-colors hover:bg-slate-200/50"
        onClick={handleCategoryClick}>
        {category?.name ?? '-'}
      </button>

      <h3 className="line-clamp-1 text-ellipsis px-4 text-[2rem] font-bold leading-[2.4rem] text-slate-900">
        {post?.title ?? '-'}
      </h3>

      <p className="line-clamp-1 text-ellipsis px-4 text-[1.4rem] font-normal leading-[2rem] text-slate-600">
        {post?.description ?? '-'}
      </p>

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
  )
}

export default ArticleCard
