import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.css'

import ArticleCard from './ArticleCard'
import dayjs from 'dayjs'

const meta = {
  title: 'Common/ArticleCard',
  component: ArticleCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {}
} satisfies Meta<typeof ArticleCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    category: '📚 회고',
    title: '조코딩 해커톤 본선 진출 후기',
    description: '인생 첫 해커톤을 다녀오다.',
    date: dayjs('2024-01-01').toDate()
  }
}
