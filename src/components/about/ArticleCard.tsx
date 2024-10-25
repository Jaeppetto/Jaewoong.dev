import { cn } from '@/lib/utils'
import { useRouter } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { CalendarDays } from 'lucide-react'

interface ArticleCardProps {
  category: string // or CategoryCode
  title: string
  description: string
  date: Date
  icon?: string
  className?: string
}

const ArticleCard = ({
  category,
  title,
  description,
  date,
  icon,
  className
}: ArticleCardProps) => {
  const router = useRouter()

  return (
    <div
      className={cn(
        'ease-[cubic-bezier(0.34,1.56,0.64,1)] flex h-[14.2rem] w-[46.1rem] cursor-pointer items-center justify-between rounded-[1.2rem] border border-slate-200 bg-white p-[2.4rem] shadow-default transition-all duration-500 hover:scale-[1.03]',
        className
      )}>
      <div className="flex h-full w-2/3 flex-grow flex-col items-start justify-center gap-[0.6rem]">
        <button
          className="bg-transparent text-[1.4rem] font-normal leading-[2rem] text-slate-900 underline-offset-2 hover:underline"
          onClick={() => router.navigate({ to: `/archive/${category}` })}>
          {category}
        </button>
        <h3 className="relative mb-[0.5rem] inline-block text-[2rem] font-bold leading-[2rem] text-slate-900">
          {title}
        </h3>
        <p className="text-[1.4rem] font-normal leading-[2rem]">
          {description}
        </p>
        <div className="flex items-center gap-[0.4rem] text-[1.4rem] leading-[2rem]">
          <CalendarDays
            size={16}
            className="text-[1.2rem] font-normal leading-[1.6rem] text-slate-500"
          />
          <span className="text-slate-500">
            {dayjs(date).format('YYYY.MM.DD')}
          </span>
        </div>
      </div>

      {icon && (
        <div className="flex h-full w-1/3 items-center justify-center">
          <img
            src={icon}
            alt="icon"
            className="h-[13rem] w-[13rem] flex-shrink-0"
          />
        </div>
      )}
    </div>
  )
}

export default ArticleCard
