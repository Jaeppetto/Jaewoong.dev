import { useTagsQuery } from '@/features/tag/api/queries'
import { cn } from '@/shared/shadcn-ui/util'
import TagListSkeleton from './TagListSkeleton'
import TagItem from '../TagItem/TagItem'

interface TagListProps {
  className?: string
}

const TagList = ({ className }: TagListProps) => {
  const { data: tags, isPending: isPendingTags } = useTagsQuery()

  return (
    <div className={cn('flex w-full flex-col gap-[2rem]', className)}>
      <h2 className="select-none text-[2rem] font-normal leading-[2rem] text-slate-900">
        태그로 모아보기
      </h2>
      <div className="flex flex-wrap gap-[0.8rem]">
        {/* TODO: Suspense로 대체, 데이터 없을 때 예외처리 */}
        {isPendingTags ? (
          <TagListSkeleton />
        ) : (
          tags?.map(tag => (
            <TagItem
              key={tag.id}
              tag={tag}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TagList
