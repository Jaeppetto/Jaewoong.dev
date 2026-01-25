import type { Meta, StoryObj } from '@storybook/react-vite'
import { cn } from '@/shared/shadcn-ui/util'

/**
 * CategoryButton의 Storybook 버전
 * 실제 컴포넌트는 TanStack Router의 Route를 import하여 순환 참조 문제가 발생하므로
 * 스토리용 mock 컴포넌트를 사용합니다.
 */
interface CategoryButtonProps {
  slug: string
  name: string
  className?: string
}

const CategoryButtonMock = ({ name, className }: CategoryButtonProps) => {
  return (
    <div
      className={cn(
        'ease-[cubic-bezier(0.34,1.56,0.64,1)] flex cursor-pointer items-center justify-center rounded-[10rem] border border-slate-200 bg-white p-[2.4rem] px-[2.8rem] py-[1.6rem] shadow-default transition-all duration-500 hover:scale-[1.03]',
        className
      )}>
      <p className="!text-h3 font-extrabold text-slate-900">{name}</p>
    </div>
  )
}

const meta: Meta<typeof CategoryButtonMock> = {
  title: 'entities/category/CategoryButton',
  component: CategoryButtonMock,
  tags: ['autodocs'],
  argTypes: {
    slug: {
      control: 'text'
    },
    name: {
      control: 'text'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    slug: 'frontend',
    name: 'Frontend'
  }
}

export const Backend: Story = {
  args: {
    slug: 'backend',
    name: 'Backend'
  }
}

export const DevOps: Story = {
  args: {
    slug: 'devops',
    name: 'DevOps'
  }
}

export const LongName: Story = {
  args: {
    slug: 'machine-learning',
    name: 'Machine Learning & AI'
  }
}

export const AllCategories: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <CategoryButtonMock slug="frontend" name="Frontend" />
      <CategoryButtonMock slug="backend" name="Backend" />
      <CategoryButtonMock slug="devops" name="DevOps" />
      <CategoryButtonMock slug="database" name="Database" />
    </div>
  )
}
