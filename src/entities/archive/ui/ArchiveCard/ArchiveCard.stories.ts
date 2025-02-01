import type { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.css'

import dayjs from 'dayjs'
import ArchiveCard from './ArchiveCard'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Common/ArchiveCard',
  component: ArchiveCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {}
} satisfies Meta<typeof ArchiveCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '마실가실',
    description: '실시간 산책 기록 & 공유 서비스',
    logoImage: 'Project Image',
    bgImage: 'Project Image',
    date: {
      from: dayjs('2024-01-01').toDate(),
      to: dayjs('2024-01-01').toDate()
    },
    stacks: ['React', 'Next.js', 'TypeScript'],
    links: {
      github: 'https://github.com/example',
      website: 'https://example.com',
      blog: 'https://example.com/blog',
      video: 'https://example.com/video'
    },
    themeColor: '#A4D24D'
  }
}
