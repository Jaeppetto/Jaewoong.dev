import { cn } from '@/shared/shadcn-ui/util'
import colorMap from '../../constant/highlight-color-map'

export interface HighlightProps {
  children: React.ReactNode
  color?: keyof typeof colorMap
}

export const Highlight = ({ children, color = 'yellow' }: HighlightProps) => {
  return (
    <span
      className={cn(
        'rounded-md border px-2 py-1 text-lg font-bold',
        colorMap[color]
      )}>
      {children}
    </span>
  )
}
