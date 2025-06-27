import { createContext, useState, ReactNode } from 'react'

interface HeaderContextType {
  articleTitle: string | null
  setArticleTitle: (title: string | null) => void
}

export const HeaderContext = createContext<HeaderContextType | undefined>(
  undefined
)

interface HeaderProviderProps {
  children: ReactNode
}

export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [articleTitle, setArticleTitle] = useState<string | null>(null)

  return (
    <HeaderContext.Provider value={{ articleTitle, setArticleTitle }}>
      {children}
    </HeaderContext.Provider>
  )
}
