import { useTagsQuery } from '@/features/tag/api/queries'
import { cn } from '@/shared/shadcn-ui/util'
import { Link } from '@tanstack/react-router'
import { Tag as TagIcon } from 'lucide-react'

interface TagListProps {
  className?: string
}

const TagList = ({ className }: TagListProps) => {
  const { data: tags, isLoading } = useTagsQuery()

  if (isLoading) {
    return <div className="text-slate-500">태그 로딩 중...</div>
  }

  if (!tags || tags.length === 0) {
    return <div className="text-slate-500">태그가 없습니다.</div>
  }

  return (
    <div className={cn('flex w-full flex-col gap-[2rem]', className)}>
      <h2 className="select-none text-[2rem] font-normal leading-[2rem] text-slate-900">
        태그로 모아보기
      </h2>
      <div className="flex flex-wrap gap-[0.8rem]">
        {tags.map(tag => (
          <Link
            key={tag.id}
            to="/article/tag/$tagSlug"
            params={{ tagSlug: tag.slug }}
            search={{ page: 1 }}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-1 text-[1.4rem] shadow-default transition-all duration-300 hover:scale-105">
            <TagIcon className="h-5 w-5 text-slate-500" />
            <span className="text-slate-800">{tag.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TagList
