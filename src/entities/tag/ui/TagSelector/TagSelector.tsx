import { useState } from 'react'
import { useTagsQuery, useCreateTag } from '@/features/tag/api/queries'
import { Button, Input } from '@/shared'
import { X, Plus, Tag as TagIcon } from 'lucide-react'
import { cn } from '@/shared/shadcn-ui/util'
import { generateSlug } from '@/shared/util'

interface TagSelectorProps {
  selectedTags: string[]
  onChange: (tags: string[]) => void
  className?: string
}

interface TagItemProps {
  id: string
  name: string
  isSelected: boolean
  onSelect: (id: string) => void
  onDeselect: (id: string) => void
}

const TagItem = ({
  id,
  name,
  isSelected,
  onSelect,
  onDeselect
}: TagItemProps) => (
  <div
    className={cn(
      'flex cursor-pointer items-center gap-1 rounded-full px-3 py-1 text-sm transition-colors',
      isSelected
        ? 'bg-slate-800 text-white hover:bg-slate-700'
        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
    )}
    onClick={() => (isSelected ? onDeselect(id) : onSelect(id))}>
    <TagIcon className="h-3 w-3" />
    <span>{name}</span>
    {isSelected && <X className="ml-1 h-3 w-3" />}
  </div>
)

const TagSelector = ({
  selectedTags,
  onChange,
  className
}: TagSelectorProps) => {
  const { data: tags, isLoading } = useTagsQuery()
  const createTag = useCreateTag()

  const [newTagName, setNewTagName] = useState('')
  const [isAddingTag, setIsAddingTag] = useState(false)

  const handleSelectTag = (tagId: string) => {
    onChange([...selectedTags, tagId])
  }

  const handleDeselectTag = (tagId: string) => {
    onChange(selectedTags.filter(id => id !== tagId))
  }

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return

    try {
      const newTag = await createTag.mutateAsync({
        name: newTagName.trim(),
        slug: generateSlug(newTagName.trim())
      })

      handleSelectTag(newTag.id)

      setNewTagName('')
      setIsAddingTag(false)
    } catch (error) {
      console.error('태그 생성 실패:', error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCreateTag()
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-10 items-center text-sm text-slate-500">
        태그 로딩 중...
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex flex-wrap gap-2">
        {tags?.map(tag => (
          <TagItem
            key={tag.id}
            id={tag.id}
            name={tag.name}
            isSelected={selectedTags.includes(tag.id)}
            onSelect={handleSelectTag}
            onDeselect={handleDeselectTag}
          />
        ))}

        {isAddingTag ? (
          <div className="flex items-center gap-2">
            <Input
              autoFocus
              placeholder="새 태그 이름"
              value={newTagName}
              onChange={e => setNewTagName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-8 w-40 text-sm"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCreateTag}
              disabled={!newTagName.trim()}
              className="h-8 px-2 py-0">
              추가
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsAddingTag(false)
                setNewTagName('')
              }}
              className="h-8 px-2 py-0">
              취소
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingTag(true)}
            className="flex h-7 items-center gap-1 rounded-full px-3 py-1 text-sm">
            <Plus className="h-3 w-3" />
            <span>태그 추가</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default TagSelector
