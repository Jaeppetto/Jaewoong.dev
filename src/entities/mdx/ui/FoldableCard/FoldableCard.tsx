import { Button } from '@/shared'
import { cn } from '@/shared/shadcn-ui/util'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import { foldableCardColorMap } from '../../constant'

export interface FoldableCardProps {
  isFoldable: boolean
  color: 'yellow' | 'navy' | 'blue' | 'red'
  label?: string
  title?: string
  content?: string
}

const FoldableCard = ({
  isFoldable,
  color,
  label,
  title,
  content
}: FoldableCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Button
      variant="secondary"
      onClick={() => isFoldable && setIsOpen(!isOpen)}
      className={cn(
        'my-2 flex h-auto w-full flex-col gap-2 rounded-xl border p-4'
      )}
      style={{
        backgroundColor: foldableCardColorMap[color].bg,
        borderColor: foldableCardColorMap[color].border
      }}>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-start justify-between">
          <div className="flex w-full flex-col items-start gap-2">
            {label && (
              <span
                className="text-2xl font-extrabold"
                style={{
                  color: foldableCardColorMap[color].title
                }}>
                {label}
              </span>
            )}
            {title && <span className="text-2xl font-bold">{title}</span>}
          </div>
          {isFoldable && (
            <div
              className={cn(
                'flex h-auto items-center gap-1 rounded-full px-4 py-1 text-white'
              )}
              style={{
                backgroundColor: foldableCardColorMap[color].title
              }}>
              <ChevronDownIcon
                className={cn(
                  'h-5 w-5 origin-center transition-transform duration-300',
                  isOpen && 'rotate-180'
                )}
              />
            </div>
          )}
        </div>
      </div>

      {isFoldable && isOpen && content && (
        <span className="w-full text-left text-2xl">{content}</span>
      )}
    </Button>
  )
}

export default FoldableCard
