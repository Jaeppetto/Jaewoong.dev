import type { Meta, StoryObj } from '@storybook/react'
import '@/index.css'

import { CategoryButton } from '@/components/about'

const meta = {
  title: 'Common/CategoryButton',
  component: CategoryButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof CategoryButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    category: '📚 회고'
  }
}
