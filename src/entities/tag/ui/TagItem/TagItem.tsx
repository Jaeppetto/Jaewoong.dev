import { Link } from '@tanstack/react-router'
import { Tag } from '../../constant'

interface TagItemProps {
  tag: Tag
}

const TagItem = ({ tag }: TagItemProps) => {
  return (
    <Link
      key={tag.id}
      to="/article/tag/$tagSlug"
      params={{ tagSlug: tag.slug }}
      search={{ page: 1 }}
      className="flex cursor-pointer items-center gap-2 rounded-full bg-slate-950 px-5 py-1 text-[1.2rem] hover:bg-slate-800">
      <span className="font-bold text-white">#</span>
      <span className="text-white">{tag.name}</span>
    </Link>
  )
}

export default TagItem
