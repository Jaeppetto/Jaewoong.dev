import { highlightColorMap } from '@/entities'
import { Button } from '@/shared'
import { cn } from '@/shared/shadcn-ui/util'

interface HighlighterSubPanelProps {
  onClick: (color: keyof typeof highlightColorMap) => void
}

const HighlighterSubPanel = ({ onClick }: HighlighterSubPanelProps) => {
  return (
    <>
      {Object.entries(highlightColorMap).map(([key, value]) => (
        <Button
          key={key}
          variant="ghost"
          className="p-0 w-8 h-8 bg-white"
          onClick={() => onClick(key as keyof typeof highlightColorMap)}>
          <div className={cn('h-6 w-6 rounded-sm border-[#E3E2E0]', value)} />
        </Button>
      ))}
    </>
  )
}

export default HighlighterSubPanel
