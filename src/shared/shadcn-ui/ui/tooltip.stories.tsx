import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './tooltip'
import Button from './button'

const meta: Meta<typeof Tooltip> = {
  title: 'shared/shadcn-ui/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    )
  ]
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">마우스를 올려보세요</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>기본 툴팁입니다</p>
      </TooltipContent>
    </Tooltip>
  )
}

export const Top: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">위쪽 툴팁</Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>위쪽에 표시됩니다</p>
      </TooltipContent>
    </Tooltip>
  )
}

export const Bottom: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">아래쪽 툴팁</Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>아래쪽에 표시됩니다</p>
      </TooltipContent>
    </Tooltip>
  )
}

export const Left: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">왼쪽 툴팁</Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>왼쪽에 표시됩니다</p>
      </TooltipContent>
    </Tooltip>
  )
}

export const Right: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">오른쪽 툴팁</Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>오른쪽에 표시됩니다</p>
      </TooltipContent>
    </Tooltip>
  )
}

export const AllSides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-8 p-20">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">위쪽</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">오른쪽</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">아래쪽</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">왼쪽</TooltipContent>
      </Tooltip>
    </div>
  )
}

export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">긴 내용 툴팁</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>
          이것은 긴 내용을 가진 툴팁입니다. 툴팁은 사용자에게 추가 정보를
          제공하는 데 유용합니다.
        </p>
      </TooltipContent>
    </Tooltip>
  )
}
