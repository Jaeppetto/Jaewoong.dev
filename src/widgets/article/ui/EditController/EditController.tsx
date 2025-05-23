import { useState } from 'react'
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator
} from '@/shared'
import { EditorState, useCategoriesQuery } from '@/features'
import { TagSelector } from '@/entities/tag/ui'
import { ImageIcon } from 'lucide-react'
import { cn } from '@/shared/shadcn-ui/util'

interface EditControllerProps {
  title: string
  description: string
  categoryId: string | null
  thumbnail: string | null
  tagIds: string[] // 태그 ID 목록 추가
  onMetaChange: (
    fieldOrObject:
      | keyof Omit<EditorState, 'content' | 'isPreview'>
      | Partial<Omit<EditorState, 'content' | 'isPreview'>>,
    value?: string | null | string[] // any 대신 구체적인 타입 사용
  ) => void
}

const EditController = ({
  title,
  description,
  categoryId,
  thumbnail,
  tagIds,
  onMetaChange
}: EditControllerProps) => {
  const [titleLength, setTitleLength] = useState(title.length)

  const { data: categories } = useCategoriesQuery()

  const handleTagsChange = (selectedTagIds: string[]) => {
    onMetaChange('tagIds', selectedTagIds)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full items-center justify-between">
        <Select
          value={categoryId || ''}
          onValueChange={value => onMetaChange('categoryId', value || null)}>
          <SelectTrigger className="w-48 max-w-xs text-lg outline-none">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map(category => (
              <SelectItem
                className={cn(
                  'text-lg',
                  category.id === categoryId && 'bg-slate-100 font-bold'
                )}
                key={category.id}
                value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {thumbnail ? (
          <img
            src={thumbnail}
            alt="thumbnail"
            className="h-20 w-20 rounded-md border border-slate-200 object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-md border border-slate-200 bg-slate-50">
            <ImageIcon className="h-10 w-10 text-slate-300" />
          </div>
        )}
      </div>

      <Separator />

      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="제목"
          className="border-none p-0 text-4xl font-bold outline-none focus-visible:ring-0 md:text-4xl"
          maxLength={100}
          value={title}
          onChange={e => {
            onMetaChange('title', e.target.value)
            setTitleLength(e.target.value.length)
          }}
        />
        <div className="text-xl text-gray-500">{titleLength}/100</div>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="한줄 요약.."
          className="border-none p-0 text-3xl font-bold outline-none focus-visible:ring-0 md:text-3xl"
          maxLength={200}
          value={description}
          onChange={e => onMetaChange('description', e.target.value)}
        />
      </div>

      <Separator />

      <div className="flex flex-col gap-2">
        <label className="text-lg font-medium text-slate-800">태그</label>
        <TagSelector
          selectedTags={tagIds}
          onChange={handleTagsChange}
        />
      </div>

      <Separator />
    </div>
  )
}

export default EditController
