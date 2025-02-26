import { useCallback } from 'react'

import {
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/shadcn-ui/ui'
import { useCategoriesQuery } from '@/features/category/api/queries'

import { cn } from '@/shared/shadcn-ui/util'

interface EditControllerProps {
  title: string
  description: string
  categoryId: string | null
  onMetaChange: (
    field: 'title' | 'description' | 'categoryId',
    value: string | null
  ) => void
}

const EditController = ({
  title,
  description,
  categoryId,
  onMetaChange
}: EditControllerProps) => {
  const { data: categories, isLoading } = useCategoriesQuery()

  const handleChange = useCallback(
    (field: 'title' | 'description' | 'categoryId', value: string | null) => {
      onMetaChange(field, value)
    },
    [onMetaChange]
  )

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-4">
        <h3
          className={cn(
            'flex-shrink-0 select-none text-[2rem] font-bold leading-[2.4rem] text-slate-300 ',
            title && 'text-slate-900'
          )}>
          제목
        </h3>
        <Input
          value={title}
          onChange={e => handleChange('title', e.target.value)}
          placeholder="Enter article title"
          className="h-[3.6rem] rounded-2xl font-bold leading-[2.4rem] text-slate-900 placeholder:text-slate-300 md:text-[1.6rem]"
        />
      </div>
      <div className="flex items-center gap-4">
        <h3
          className={cn(
            'flex-shrink-0 text-[2rem] font-bold leading-[2.4rem] text-slate-300 ',
            description && 'text-slate-900'
          )}>
          한줄요약
        </h3>
        <Textarea
          value={description}
          onChange={e => handleChange('description', e.target.value)}
          placeholder="Enter article description"
          className="h-[3.6rem] min-h-0 resize-none rounded-2xl font-bold leading-[2.4rem] text-slate-900 placeholder:text-slate-300 md:text-[1.6rem]"
          rows={1}
        />
      </div>
      <div className="flex items-center gap-4">
        <h3
          className={cn(
            'flex-shrink-0 text-[2rem] font-bold leading-[2.4rem] text-slate-300 ',
            categoryId && 'text-slate-900'
          )}>
          카테고리
        </h3>
        <Select
          value={categoryId ?? ''}
          onValueChange={value => handleChange('categoryId', value)}
          disabled={isLoading}>
          <SelectTrigger className="h-[3.6rem] rounded-2xl font-bold leading-[2.4rem] text-slate-900 placeholder:text-slate-300 md:text-[1.6rem]">
            <SelectValue
              placeholder="Select category"
              className="text-slate-300 placeholder:text-slate-300"
            />
          </SelectTrigger>
          <SelectContent>
            {categories?.map(category => (
              <SelectItem
                className="text-[1.6rem] font-bold leading-[2.4rem] text-slate-900"
                key={category.id}
                value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default EditController
