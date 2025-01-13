import { Button } from '@/shared'
import { cn } from '@/shared/shadcn-ui/util'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

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

  const colorMap = {
    yellow: {
      bg: '#EDF3ED',
      border: '#DBEDDB',
      title: '#4F8969'
    },
    navy: {
      bg: '#E7F3F8',
      border: '#D3E5EF',
      title: '#347EA9'
    },
    blue: {
      bg: '#F7F3F8',
      border: '#EDE5F2',
      title: '#9065B0'
    },
    red: {
      bg: '#FDEBEC',
      border: '#FFE2DD',
      title: '#D44C47'
    }
  }

  return (
    <section
      className={cn(
        'flex flex-col gap-2 rounded-md border p-4',
        `bg-[${colorMap[color].bg}]`,
        `border-[${colorMap[color].border}]`
      )}>
      <div className="flex flex-col">
        <span className={`text-[${colorMap[color].title}]`}>{label}</span>
        <span className="text-slate-950">{title}</span>
      </div>

      <Button
        variant="secondary"
        size="icon"
        className={cn(
          'flex h-auto w-[6rem] items-center gap-2 rounded-full bg-[#D44C47] p-0 py-2 text-white',
          'hover:bg-[#D44C47]/80'
          //   `bg-[${colorMap[color].title}]`
        )}
        onClick={() => setIsOpen(!isOpen)}>
        <ChevronDownIcon
          className={cn(
            'h-4 w-4 transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />

        <span>{isOpen ? '접기' : '펼치기'}</span>
      </Button>

      {isFoldable && isOpen && content && <div>{content}</div>}
    </section>
  )
}

export default FoldableCard
