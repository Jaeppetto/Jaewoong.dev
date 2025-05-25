import { Link } from '@tanstack/react-router'
import { PostWithRelations } from '../../constant'
import dayjs from 'dayjs'
import { Button, useAuth } from '@/shared'
import { useTogglePostPublished } from '@/features'
import { useState } from 'react'
import { toast } from 'sonner'
import { Separator } from '@radix-ui/react-separator'

interface ArticleDetailHeaderProps {
  post?: PostWithRelations
}

const ArticleDetailHeader = ({ post }: ArticleDetailHeaderProps) => {
  const { isAdmin } = useAuth()
  const [isPublished, setIsPublished] = useState(post?.published || false)

  const togglePublished = useTogglePostPublished()

  if (!post) return null

  const handleTogglePublished = async () => {
    try {
      await togglePublished.mutateAsync({
        id: post.id,
        currentState: isPublished
      })
      setIsPublished(!isPublished)
      toast.success(
        isPublished
          ? '게시글이 활성화되었습니다.'
          : '게시글이 비활성화되었습니다.'
      )
    } catch (error) {
      console.error('Failed to toggle published status:', error)
    }
  }

  return (
    <header className="flex flex-col gap-3">
      {post.categories && (
        <div className="inline">
          <Link
            to={`/article/${post.categories.slug}`}
            className="rounded-[0.8rem] px-4 py-2 text-[1.6rem] font-normal leading-[2rem] text-slate-900 hover:bg-slate-50 hover:text-slate-900">
            {post.categories.emoji} {post.categories.name}
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-[0.6rem] px-[1rem]">
        <h1 className="break-all text-[3.2rem] font-extrabold leading-[3.8rem] text-slate-900">
          {post.title}
        </h1>

        {post.description && (
          <span className="break-all text-[1.6rem] font-normal leading-[1.8rem] text-slate-900">
            {post.description}
          </span>
        )}

        <div className="flex gap-2 justify-between items-center">
          {post.created_at && (
            <time className="text-[1.4rem] font-normal leading-[1.6rem] text-slate-400">
              {dayjs(post.created_at).format('YYYY.MM.DD')}
            </time>
          )}
          {isAdmin && (
            <div className="flex gap-4 items-center">
              <Button
                variant="ghost"
                size="icon"
                className="bg-transparent p-0 text-[1.4rem] font-normal leading-[1.6rem] text-slate-400 transition-none hover:bg-transparent"
                onClick={handleTogglePublished}>
                {isPublished ? <span>전체공개</span> : <span>비공개</span>}
              </Button>
              <Link
                to="/article/edit/$postId"
                params={{ postId: post.id }}
                className="bg-transparent p-0 text-[1.4rem] font-normal leading-[1.6rem] text-slate-400 transition-none hover:bg-transparent hover:text-slate-900">
                <span>수정하기</span>
              </Link>
            </div>
          )}
        </div>

        <Separator className="mt-[1.4rem] h-[0.1rem] bg-slate-200" />
      </div>
    </header>
  )
}

export default ArticleDetailHeader
