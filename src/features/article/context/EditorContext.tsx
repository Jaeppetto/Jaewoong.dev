import React, { createContext, useState, ReactNode, useCallback } from 'react'

export interface EditorState {
  isPreview: boolean
  content: string
  title: string
  description: string
  categoryId: string | null
  thumbnail: string | null
}

export interface EditorContextType extends EditorState {
  tempId: string
  setIsPreview: (value: boolean) => void
  togglePreview: () => void

  handleContentChange: (newContent?: string) => void
  appendContent: (value: string) => void
  updateMeta: (
    fieldOrObject:
      | keyof Omit<EditorState, 'content' | 'isPreview'>
      | Partial<Omit<EditorState, 'content' | 'isPreview'>>,
    value?: string | null
  ) => void
}

const defaultContext: EditorContextType = {
  isPreview: false,
  content: '# 제목을 입력하세요',
  title: '',
  description: '',
  categoryId: null,
  thumbnail: null,
  tempId: `temp-${Date.now()}`,

  setIsPreview: () => {},
  togglePreview: () => {},
  handleContentChange: () => {},
  appendContent: () => {},
  updateMeta: () => {}
}

export const EditorContext = createContext<EditorContextType>(defaultContext)

interface EditorProviderProps {
  children: ReactNode
  initialState?: Partial<EditorState>
}

export const EditorProvider: React.FC<EditorProviderProps> = ({
  children,
  initialState = {}
}) => {
  const [state, setState] = useState<EditorState>({
    isPreview: false,
    content: initialState.content ?? '# 제목을 입력하세요',
    title: initialState.title ?? '',
    description: initialState.description ?? '',
    categoryId: initialState.categoryId ?? null,
    thumbnail: initialState.thumbnail ?? null
  })

  const tempId = `temp-${Date.now()}`

  const setIsPreview = useCallback((value: boolean) => {
    setState(prev => ({
      ...prev,
      isPreview: value
    }))
  }, [])

  const togglePreview = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPreview: !prev.isPreview
    }))
  }, [])

  const handleContentChange = useCallback((newContent?: string) => {
    if (newContent !== undefined) {
      setState(prev => ({
        ...prev,
        content: newContent
      }))
    }
  }, [])

  const appendContent = useCallback((value: string) => {
    setState(prev => ({
      ...prev,
      content: `${prev.content}${value}`
    }))
  }, [])

  const updateMeta = useCallback(
    (
      fieldOrObject:
        | keyof Omit<EditorState, 'content' | 'isPreview'>
        | Partial<Omit<EditorState, 'content' | 'isPreview'>>,
      value?: string | null
    ) => {
      if (typeof fieldOrObject === 'string' && value !== undefined) {
        setState(prev => ({
          ...prev,
          [fieldOrObject]: value
        }))
      } else if (typeof fieldOrObject === 'object') {
        setState(prev => ({
          ...prev,
          ...fieldOrObject
        }))
      }
    },
    []
  )

  const contextValue: EditorContextType = {
    ...state,
    tempId,

    setIsPreview,
    togglePreview,
    handleContentChange,
    appendContent,
    updateMeta
  }

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  )
}

export default EditorContext
