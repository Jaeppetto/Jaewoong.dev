import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/shared/shadcn-ui/ui/tooltip'
import { cn } from '@/shared/shadcn-ui/util'
import dayjs from 'dayjs'
import { CalendarDays } from 'lucide-react'

/**
 * ArticleCard의 Storybook 버전
 * 실제 컴포넌트는 @/entities/category를 import하고,
 * 이 모듈이 Route를 import하는 CategoryButton을 포함하여 순환 참조가 발생하므로
 * 스토리용 mock 컴포넌트를 사용합니다.
 */

interface Category {
  id: string
  slug: string
  name: string
  emoji: string
}

interface Post {
  id: string
  title: string
  description: string | null
  slug: string
  content: string
  author_id: string | null
  category_id: string | null
  created_at: string | null
  updated_at: string | null
  published: boolean | null
  thumbnail: string | null
}

interface ArticleCardProps {
  category?: Pick<Category, 'id' | 'slug' | 'name' | 'emoji'> | null
  post: Post
  className?: string
}

const ArticleCardMock = ({ category, post, className }: ArticleCardProps) => {
  if (!post || !category) return null

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'flex h-[14.2rem] w-full cursor-pointer rounded-[1.2rem] border border-slate-200 bg-white p-[1.4rem] shadow-default transition-all duration-300 ease-in-out hover:bg-slate-50',
              className
            )}>
            <div className="flex flex-1 flex-col items-start justify-between gap-3">
              <div className="flex flex-col items-start gap-1">
                <button className="rounded-[0.8rem] bg-transparent px-4 py-1 !text-body3 font-normal text-slate-900 underline-offset-[6px] transition-colors hover:bg-slate-200/50">
                  {category?.emoji ?? '-'} {category?.name ?? '-'}
                </button>

                <h3 className="line-clamp-1 text-ellipsis px-4 !text-h3 font-bold text-slate-900">
                  {post?.title ?? '-'}
                </h3>

                <p className="line-clamp-1 text-ellipsis px-4 !text-body2 font-normal text-slate-600">
                  {post?.description ?? '-'}
                </p>
              </div>

              {post?.created_at && dayjs(post.created_at).isValid() && (
                <div className="flex items-center gap-[0.4rem] px-4 !text-body3">
                  <CalendarDays
                    size={16}
                    className="!text-body3 font-normal text-slate-600"
                  />
                  <span className="text-slate-600">
                    {dayjs(post.created_at).format('YYYY.MM.DD')}
                  </span>
                </div>
              )}
            </div>
            {post?.thumbnail && (
              <img
                src={post?.thumbnail ?? ''}
                alt={post?.title ?? ''}
                className="hidden rounded-lg object-cover object-fit sm:block"
              />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <span className="!text-body3">{post?.title ?? '-'}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const mockCategory = {
  id: '1',
  slug: 'frontend',
  name: 'Frontend',
  emoji: '🎨'
}

const mockPost: Post = {
  id: '1',
  title: 'React 19의 새로운 기능 살펴보기',
  description:
    'React 19에서 추가된 새로운 기능들과 개선사항을 알아봅니다. Server Components, Actions 등 주요 변경사항을 다룹니다.',
  slug: 'react-19-new-features',
  content: '',
  author_id: null,
  category_id: '1',
  created_at: '2024-01-15T09:00:00Z',
  updated_at: null,
  published: true,
  thumbnail: 'https://picsum.photos/200/150'
}

const meta: Meta<typeof ArticleCardMock> = {
  title: 'entities/article/ArticleCard',
  component: ArticleCardMock,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    category: mockCategory,
    post: mockPost
  }
}

export const WithoutThumbnail: Story = {
  args: {
    category: mockCategory,
    post: {
      ...mockPost,
      thumbnail: null
    }
  }
}

export const LongTitle: Story = {
  args: {
    category: mockCategory,
    post: {
      ...mockPost,
      title:
        '아주 긴 제목의 아티클입니다. 이 제목은 한 줄에 다 표시되지 않고 말줄임표로 처리됩니다.'
    }
  }
}

export const LongDescription: Story = {
  args: {
    category: mockCategory,
    post: {
      ...mockPost,
      description:
        '이것은 매우 긴 설명입니다. 아티클의 내용을 간략하게 요약하여 보여주는 부분으로, 한 줄을 초과하면 말줄임표로 처리됩니다. 사용자가 아티클의 내용을 미리 파악할 수 있도록 돕습니다.'
    }
  }
}

export const DifferentCategory: Story = {
  args: {
    category: {
      id: '2',
      slug: 'backend',
      name: 'Backend',
      emoji: '🔧'
    },
    post: {
      ...mockPost,
      title: 'Node.js 성능 최적화 가이드',
      description: 'Node.js 애플리케이션의 성능을 향상시키는 방법을 알아봅니다.'
    }
  }
}
