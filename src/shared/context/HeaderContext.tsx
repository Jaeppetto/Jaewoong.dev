import { useContext } from 'react'
import { HeaderContext } from './HeaderProvider'

export const useHeaderContext = () => {
  const context = useContext(HeaderContext)
  if (context === undefined) {
    throw new Error('useHeaderContext must be used within a HeaderProvider')
  }
  return context
}
