import type { Meta, StoryObj } from '@storybook/react-vite'
import TagItemSkeleton from './TagItemSkeleton'

const meta: Meta<typeof TagItemSkeleton> = {
  title: 'entities/tag/TagItemSkeleton',
  component: TagItemSkeleton,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <TagItemSkeleton />
      <TagItemSkeleton />
      <TagItemSkeleton />
      <TagItemSkeleton />
    </div>
  )
}
