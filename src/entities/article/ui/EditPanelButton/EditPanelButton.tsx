import React from 'react'
import { Button } from '@/shared'
import { cn } from '@/shared/shadcn-ui/util'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/shadcn-ui/ui/popover'

interface EditPanelButtonProps {
  icon: React.ReactNode
  onClick?: (value?: string) => void
  subPanel?: React.ReactNode
}

const EditPanelButton: React.FC<EditPanelButtonProps> = ({
  icon,
  onClick,
  subPanel
}) => {
  const ButtonComponent = (
    <Button
      variant="ghost"
      className={cn('p-0 w-12 h-12')}
      onClick={() => onClick && onClick()}>
      {icon}
    </Button>
  )

  if (!subPanel) {
    return ButtonComponent
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{ButtonComponent}</PopoverTrigger>
      <PopoverContent
        className="p-2 w-auto"
        side="right"
        align="center">
        <div className="flex flex-wrap gap-2">{subPanel}</div>
      </PopoverContent>
    </Popover>
  )
}

export default EditPanelButton
