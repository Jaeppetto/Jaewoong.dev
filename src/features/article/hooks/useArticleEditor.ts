import { useCallback, useState } from 'react'

interface ArticleEditorState {
  content: string
  title: string
  description: string
  categoryId: string | null
}

interface UseArticleEditorProps {
  initialState?: Partial<ArticleEditorState>
}

export const useArticleEditor = ({
  initialState = {}
}: UseArticleEditorProps = {}) => {
  const [state, setState] = useState<ArticleEditorState>({
    content: initialState.content ?? '# 제목을 입력하세요',
    title: initialState.title ?? '',
    description: initialState.description ?? '',
    categoryId: initialState.categoryId ?? null
  })

  const handleContentChange = useCallback((newContent: string = '') => {
    setState(prev => ({
      ...prev,
      content: newContent
    }))
  }, [])

  const updateMeta = useCallback(
    (
      field: keyof Omit<ArticleEditorState, 'content'>,
      value: string | null
    ) => {
      setState(prev => ({
        ...prev,
        [field]: value
      }))
    },
    []
  )

  return {
    content: state.content,
    title: state.title,
    description: state.description,
    categoryId: state.categoryId,
    handleContentChange,
    updateMeta
  }
}
