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
  tagIds: string[]
  onMetaChange: (
    fieldOrObject:
      | keyof Omit<EditorState, 'content' | 'isPreview'>
      | Partial<Omit<EditorState, 'content' | 'isPreview'>>,
    value?: string | null | string[]
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
  const { data: categories } = useCategoriesQuery()

  const handleTagsChange = (selectedTagIds: string[]) => {
    onMetaChange('tagIds', selectedTagIds)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end w-full">
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
            className="object-cover w-20 h-20 rounded-md border border-slate-200"
          />
        ) : (
          <div className="flex justify-center items-center w-20 h-20 rounded-md border border-slate-200 bg-slate-50">
            <ImageIcon className="w-10 h-10 text-slate-300" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 items-center">
        <Input
          type="text"
          placeholder="제목"
          className="p-0 text-4xl font-bold border-none outline-none focus-visible:ring-0 md:text-4xl"
          maxLength={100}
          value={title}
          onChange={e => onMetaChange('title', e.target.value)}
        />
        <Input
          placeholder="한줄 요약.."
          className="break-all border-none p-0 text-3xl font-normal leading-[1.8rem] text-slate-900 outline-none focus-visible:ring-0 md:text-3xl"
          maxLength={200}
          value={description}
          onChange={e => onMetaChange('description', e.target.value)}
        />
      </div>

      <Separator />

      <TagSelector
        selectedTags={tagIds}
        onChange={handleTagsChange}
      />
    </div>
  )
}

export default EditController
