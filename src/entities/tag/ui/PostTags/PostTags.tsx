import { usePostTagsQuery } from '@/features/tag/api/queries'
import { cn } from '@/shared/shadcn-ui/util'
import TagItem from '../TagItem/TagItem'

interface PostTagsProps {
  postId: string
  className?: string
}

const PostTags = ({ postId, className }: PostTagsProps) => {
  const { data: tags, isLoading } = usePostTagsQuery(postId)

  if (isLoading || !tags || tags.length === 0) {
    return null
  }

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map(tag => (
        <TagItem
          key={tag.id}
          tag={tag}
        />
      ))}
    </div>
  )
}

export default PostTags
