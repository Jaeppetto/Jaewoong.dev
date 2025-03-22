import React from 'react'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared'
import { cn } from '@/shared/shadcn-ui/util'

interface EditPanelButtonProps {
  icon: React.ReactNode
  subPanel?: React.ReactNode
  onClick?: (value?: string) => void
}

const EditPanelButton = ({ icon, onClick, subPanel }: EditPanelButtonProps) => {
  const ButtonComponent = (
    <Button
      variant="ghost"
      className={cn('h-12 w-12 p-0')}
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
        className="w-auto p-2"
        side="right"
        align="center">
        <div className="flex flex-wrap gap-2">{subPanel}</div>
      </PopoverContent>
    </Popover>
  )
}

export default EditPanelButton
