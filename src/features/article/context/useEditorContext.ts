import { useContext } from 'react'
import { EditorContext } from './EditorContext'

export const useEditorContext = () => {
  const context = useContext(EditorContext)
  if (context === undefined) {
    throw new Error('Provier 내부에서 사용해주세요.')
  }
  return context
}

export default useEditorContext
