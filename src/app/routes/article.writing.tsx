import { createFileRoute } from '@tanstack/react-router'

import '@mdxeditor/editor/style.css'
import MdxEditor from '@/shared/editor/MdxEditor'
import { useRef, useState } from 'react'
import { MDXEditorMethods } from '@mdxeditor/editor'

const PostEditor = () => {
  const editorRef = useRef<MDXEditorMethods>(null)
  const [markdown, setMarkdown] = useState('# 제목을 입력하세요')

  const handleChange = async () => {
    const content = editorRef.current?.getMarkdown()
    if (content) setMarkdown(content)
  }
  return (
    <div className="flex flex-col gap-4">
      <MdxEditor
        markdown={markdown}
        onChange={handleChange}
      />
    </div>
  )
}

export default PostEditor

export const Route = createFileRoute('/article/writing')({
  component: PostEditor
})

// TODO: 카테고리, 제목, 해시태그, 한줄요약(description) 입력
// TODO: 게시글 자동 임시저장, 임시저장 시간 표시
// TODO: 해당 카테고리의 서버 저장
