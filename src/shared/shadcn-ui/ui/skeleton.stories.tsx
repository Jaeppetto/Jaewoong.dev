import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'shared/shadcn-ui/Skeleton',
  component: Skeleton,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Skeleton className="h-10 w-[200px]" />
}

export const Circle: Story = {
  render: () => <Skeleton className="h-12 w-12 rounded-full" />
}

export const Text: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[150px]" />
    </div>
  )
}

export const Card: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-4 rounded-lg border p-4">
      <Skeleton className="h-[150px] w-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}

export const Profile: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
    </div>
  )
}

export const ArticleCard: Story = {
  render: () => <Skeleton className="h-[14.2rem] w-full" />
}

export const List: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export const Grid: Story = {
  render: () => (
    <div className="grid w-[600px] grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-2">
          <Skeleton className="h-[120px] w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  )
}
