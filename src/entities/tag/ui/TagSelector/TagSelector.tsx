import { useState } from 'react'
import { useTagsQuery, useCreateTag } from '@/features/tag/api/queries'
import { Button, Input } from '@/shared'
import { Plus } from 'lucide-react'
import { cn } from '@/shared/shadcn-ui/util'
import { generateSlug } from '@/shared/util'
import TagItem from '../TagItem/TagItem'

interface TagSelectorProps {
  selectedTags: string[]
  onChange: (tags: string[]) => void
  className?: string
}

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
      <div className="flex items-center h-10 text-sm text-slate-500">
        태그 로딩 중...
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="flex flex-wrap gap-2 items-center">
        {tags?.map(tag => (
          <TagItem
            key={tag.id}
            tag={tag}
            mode="button"
            isSelected={selectedTags.includes(tag.id)}
            onSelect={handleSelectTag}
            onDeselect={handleDeselectTag}
          />
        ))}

        {isAddingTag ? (
          <div className="flex gap-2 items-center">
            <Input
              autoFocus
              placeholder="새 태그 이름"
              value={newTagName}
              onChange={e => setNewTagName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-[2.9rem] w-40 p-0 px-3 text-xl font-bold placeholder:text-xl"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCreateTag}
              disabled={!newTagName.trim()}
              className="px-2 py-0 h-8 text-xl font-bold">
              추가
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsAddingTag(false)
                setNewTagName('')
              }}
              className="px-2 py-0 h-8 text-xl font-bold">
              취소
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => setIsAddingTag(true)}
            className="flex h-[2.9rem] w-12 items-center gap-1 rounded-full p-0 text-sm">
            <Plus className="w-6 h-6" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default TagSelector
