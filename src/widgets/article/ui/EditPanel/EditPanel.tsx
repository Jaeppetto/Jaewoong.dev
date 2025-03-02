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
        'flex fixed left-10 top-1/2 flex-col gap-2 justify-center items-center p-3 bg-white rounded-2xl border border-gray-200 -translate-y-1/2 shadow-default',
        className
      )}>
      {EDIT_PANEL_MODEL.map((item, index) => (
        <React.Fragment key={index}>
          <EditPanelButton
            icon={item.icon}
            onClick={item.onClick}
            subPanel={item.subPanel}
          />
          {item.showDividerAfter && index < EDIT_PANEL_MODEL.length - 1 && (
            <Separator orientation="horizontal" />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default EditPanel
