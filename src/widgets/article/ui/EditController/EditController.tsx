import { useState } from 'react'
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea
} from '@/shared'
import { EditorState, useCategoriesQuery } from '@/features'
import { ImageIcon } from 'lucide-react'

interface EditControllerProps {
  title: string
  description: string
  categoryId: string | null
  thumbnail: string | null
  onMetaChange: (
    fieldOrObject:
      | keyof Omit<EditorState, 'content' | 'isPreview'>
      | Partial<Omit<EditorState, 'content' | 'isPreview'>>,
    value?: string | null
  ) => void
}

const EditController = ({
  title,
  description,
  categoryId,
  thumbnail,
  onMetaChange
}: EditControllerProps) => {
  const [titleLength, setTitleLength] = useState(title.length)
  const [descriptionLength, setDescriptionLength] = useState(description.length)

  const { data: categories } = useCategoriesQuery()

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <Input
          type="text"
          placeholder="제목을 입력하세요"
          className="h-14 border-none p-0 text-3xl font-bold outline-none focus-visible:ring-0"
          maxLength={100}
          value={title}
          onChange={e => {
            onMetaChange('title', e.target.value)
            setTitleLength(e.target.value.length)
          }}
        />
        <div className="text-xs text-gray-500">{titleLength}/100</div>
      </div>

      <Select
        value={categoryId || ''}
        onValueChange={value => onMetaChange('categoryId', value || null)}>
        <SelectTrigger className="w-48 max-w-xs">
          <SelectValue placeholder="카테고리 선택" />
        </SelectTrigger>
        <SelectContent>
          {categories?.map(category => (
            <SelectItem
              key={category.id}
              value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="relative h-12 w-full">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt="thumbnail"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-md border border-slate-200 bg-slate-50">
            <ImageIcon className="h-4 w-4 text-slate-400" />
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <Textarea
          placeholder="설명을 입력하세요"
          className="resize-none border-none p-0 text-gray-600 outline-none focus-visible:ring-0"
          maxLength={200}
          value={description}
          onChange={e => {
            onMetaChange('description', e.target.value)
            setDescriptionLength(e.target.value.length)
          }}
        />
        <div className="text-xs text-gray-500">{descriptionLength}/200</div>
      </div>
    </div>
  )
}

export default EditController
