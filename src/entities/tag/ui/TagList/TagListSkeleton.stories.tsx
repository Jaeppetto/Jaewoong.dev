import type { Meta, StoryObj } from '@storybook/react-vite'
import TagListSkeleton from './TagListSkeleton'

const meta: Meta<typeof TagListSkeleton> = {
  title: 'entities/tag/TagListSkeleton',
  component: TagListSkeleton,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
