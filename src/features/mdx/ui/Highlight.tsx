export interface HighlightProps {
  children: React.ReactNode
  color?: 'yellow' | 'green' | 'blue' | 'pink'
}

export const Highlight = ({ children, color = 'yellow' }: HighlightProps) => {
  const colorMap = {
    yellow: 'bg-yellow-200 dark:bg-yellow-900',
    green: 'bg-green-200 dark:bg-green-900',
    blue: 'bg-blue-200 dark:bg-blue-900',
    pink: 'bg-pink-200 dark:bg-pink-900'
  }

  return <span className={`rounded px-1 ${colorMap[color]}`}>{children}</span>
}
