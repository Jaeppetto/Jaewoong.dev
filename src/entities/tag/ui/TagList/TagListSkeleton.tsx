import TagItemSkeleton from '../TagItem/TagItemSkeleton'

const TagListSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-[.8rem]">
      <TagItemSkeleton />
      <TagItemSkeleton />
      <TagItemSkeleton />
      <TagItemSkeleton />
    </div>
  )
}

export default TagListSkeleton
