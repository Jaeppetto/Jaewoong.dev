import { usePostTagsQuery } from '@/features/tag/api/queries'
import { cn } from '@/shared/shadcn-ui/util'
import { Link } from '@tanstack/react-router'
import { Tag as TagIcon } from 'lucide-react'

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
        <Link
          key={tag.id}
          to="/article/tag/$tagSlug"
          params={{ tagSlug: tag.slug }}
          search={{ page: 1 }}
          className="flex cursor-pointer items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[1.2rem] shadow-sm transition-all duration-300 hover:bg-slate-50">
          <TagIcon className="h-3 w-3 text-slate-500" />
          <span className="text-slate-800">{tag.name}</span>
        </Link>
      ))}
    </div>
  )
}

export default PostTags
