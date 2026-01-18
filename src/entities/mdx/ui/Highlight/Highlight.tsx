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
        'px-2 py-1 !text-body3 font-bold rounded-md border',
        colorMap[color]
      )}>
      {children}
    </span>
  )
}
