import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.css'
import CategoryButton from './CategoryButton'

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
