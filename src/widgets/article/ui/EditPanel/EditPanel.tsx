import { EditPanelButton } from '@/entities'
import { Separator } from '@/shared'
import { cn } from '@/shared/shadcn-ui/util'
import { EDIT_PANEL_MODEL } from '@/widgets'
import React from 'react'

interface EditPanelProps {
  className?: string
}

export const EditPanel: React.FC<EditPanelProps> = ({ className = '' }) => {
  return (
    <div
      className={cn(
        'fixed left-10 top-1/2 flex -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-default',
        className
      )}>
      {EDIT_PANEL_MODEL.map(item => {
        return (
          <React.Fragment key={item.type}>
            <EditPanelButton
              icon={item.icon}
              onClick={() => {}}
              subPanel={item.subPanel}
            />
            {item.showDividerAfter && <Separator orientation="horizontal" />}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default EditPanel
