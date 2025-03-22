import { foldableCardColorMap } from '@/entities'
import { Button } from '@/shared'
import { cn } from '@/shared/shadcn-ui/util'

interface FoldableCardSubPanelProps {
  onClick: (color: keyof typeof foldableCardColorMap) => void
}

const FoldableCardSubPanel = ({ onClick }: FoldableCardSubPanelProps) => {
  return (
    <>
      {Object.entries(foldableCardColorMap).map(([key, value]) => (
        <Button
          key={key}
          variant="ghost"
          className="h-8 w-8 bg-white p-0"
          onClick={() => onClick(key as keyof typeof foldableCardColorMap)}>
          <div
            className={cn('h-6 w-6 rounded-sm border-[#E3E2E0]')}
            style={{
              backgroundColor: value.bg,
              borderColor: value.border
            }}
          />
        </Button>
      ))}
    </>
  )
}

export default FoldableCardSubPanel
