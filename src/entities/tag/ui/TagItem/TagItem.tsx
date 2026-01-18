import { Link } from '@tanstack/react-router'
import { Tag } from '../../constant'
import { cn } from '@/shared/shadcn-ui/util'
import { X } from 'lucide-react'

interface TagItemProps {
  tag: Tag
  mode?: 'link' | 'button'
  isSelected?: boolean
  onSelect?: (id: string) => void
  onDeselect?: (id: string) => void
}

const TagItem = ({
  tag,
  mode = 'link',
  isSelected,
  onSelect,
  onDeselect
}: TagItemProps) => {
  const commonClasses = cn(
    'flex cursor-pointer items-center gap-2 rounded-full px-5 py-1 !text-body3',
    mode === 'link'
      ? 'bg-slate-950 hover:bg-slate-800'
      : isSelected
        ? 'bg-slate-950 text-white hover:bg-slate-800'
        : 'bg-slate-100 text-slate-950 hover:bg-slate-200'
  )

  if (mode === 'link') {
    return (
      <Link
        to="/article/tag/$tagSlug"
        params={{ tagSlug: tag.slug }}
        search={{ page: 1 }}
        className={commonClasses}>
        <span className="font-bold text-white">#</span>
        <span className="text-white">{tag.name}</span>
      </Link>
    )
  }

  return (
    <div
      className={commonClasses}
      onClick={() => (isSelected ? onDeselect?.(tag.id) : onSelect?.(tag.id))}>
      <span className="font-bold">#</span>
      <span>{tag.name}</span>
      {isSelected && <X className="ml-1 w-4 h-4" />}
    </div>
  )
}

export default TagItem
