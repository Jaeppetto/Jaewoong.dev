import { createFileRoute } from '@tanstack/react-router'

import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import Button from '@/shared/ui/button'

interface MdxEditorProps {
  initialValue?: string
  onChange?: (value: string) => void
}

const MdxEditor = ({
  initialValue = '# 제목을 입력하세요',
  onChange
}: MdxEditorProps) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (newValue: string = '') => {
    setValue(newValue)
    onChange?.(newValue)
  }

  const handleSave = (content: string) => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'post.mdx'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-4">
      <MDEditor
        value={value}
        onChange={handleChange}
        preview="edit"
        className="min-h-[40rem]"
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]]
        }}
      />
      <Button
        onClick={() => handleSave(value)}
        className="w-[10rem] self-end rounded-[2rem]">
        탈고
      </Button>
    </div>
  )
}

export default MdxEditor

export const Route = createFileRoute('/article/writing')({
  component: MdxEditor
})

// TODO: 카테고리, 제목, 해시태그, 한줄요약(description) 입력
// TODO: 게시글 자동 임시저장, 임시저장 시간 표시
// TODO: 해당 카테고리의 서버 저장
