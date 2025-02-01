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
    category: { id: '1', name: '', slug: '' },
    post: {
      author_id: null,
      category_id: '1',
      content: '',
      created_at: dayjs().format('yyyy-mm-dd'),
      description: '인생 첫 해커톤을 다녀오다',
      id: '1',
      published: null,
      slug: 'sample-post-title',
      title: '조코딩 해커톤 본선 진출 후기',
      updated_at: null
    }
  }
}
