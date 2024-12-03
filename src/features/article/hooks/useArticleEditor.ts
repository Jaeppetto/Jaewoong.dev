import { useCallback, useState } from 'react'

interface UseArticleEditorProps {
  initialValue?: string
  onChange?: (value: string) => void
}

export const useArticleEditor = ({
  initialValue = '# 제목을 입력하세요',
  onChange
}: UseArticleEditorProps = {}) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = useCallback(
    (newValue: string = '') => {
      setValue(newValue)
      onChange?.(newValue)
    },
    [onChange]
  )

  return {
    value,
    setValue,
    handleChange
  }
}
