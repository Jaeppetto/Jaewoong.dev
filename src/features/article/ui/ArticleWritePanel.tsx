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

interface ArticleWritePanelProps {
  title: string
  description: string
  categoryId: string | null
  onMetaChange: (
    field: 'title' | 'description' | 'categoryId',
    value: string | null
  ) => void
}

const ArticleWritePanel = ({
  title,
  description,
  categoryId,
  onMetaChange
}: ArticleWritePanelProps) => {
  const { data: categories, isLoading } = useCategoriesQuery()

  const handleChange = useCallback(
    (field: 'title' | 'description' | 'categoryId', value: string | null) => {
      onMetaChange(field, value)
    },
    [onMetaChange]
  )

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">제목</label>
        <Input
          value={title}
          onChange={e => handleChange('title', e.target.value)}
          placeholder="Enter article title"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">한줄요약</label>
        <Textarea
          value={description}
          onChange={e => handleChange('description', e.target.value)}
          placeholder="Enter article description"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">카테고리</label>
        <Select
          value={categoryId ?? ''}
          onValueChange={value => handleChange('categoryId', value)}
          disabled={isLoading}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
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
      </div>
    </div>
  )
}

export default ArticleWritePanel
