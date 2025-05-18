import { Link } from '@tanstack/react-router'
import { PostWithRelations } from '../../constant'
import dayjs from 'dayjs'
import { Button, useAuth } from '@/shared'
import { useTogglePostPublished } from '@/features'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface ArticleDetailHeaderProps {
  post?: PostWithRelations
}

const ArticleDetailHeader = ({ post }: ArticleDetailHeaderProps) => {
  const { isAdmin } = useAuth()
  const [isPublished, setIsPublished] = useState(post?.published || false)

  const togglePublished = useTogglePostPublished()

  if (!post) return null

  // TODO: 어느 시점에서 필터링해주어야 하는지?
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
        {/* {post.tags && (
            <div className="flex items-center gap-[0.4rem]">
              {post.tags.map(tag => (
                <Link to={`/article/${tag.slug}`}>{tag.name}</Link>
              ))}
            </div>
          )} */}

        <div className="flex items-center gap-2">
          <h1 className="break-all text-[3.2rem] font-extrabold leading-[3.8rem] text-slate-900">
            {post.title}
          </h1>
          {isAdmin && (
            <Button
              variant="ghost"
              size="icon"
              className="h-fit p-1 px-2"
              onClick={handleTogglePublished}>
              {isPublished ? (
                <EyeOff
                  className="text-slate-500"
                  size={16}
                />
              ) : (
                <Eye
                  className="text-slate-500"
                  size={16}
                />
              )}
            </Button>
          )}
        </div>

        {post.description && (
          <span className="break-all text-[1.4rem] font-normal leading-[2rem] text-slate-900">
            {post.description}
          </span>
        )}

        {post.created_at && (
          <time className="text-[1.2rem] font-normal leading-[1.4rem] text-slate-500">
            {dayjs(post.created_at).format('YYYY.MM.DD')}
          </time>
        )}
      </div>
    </header>
  )
}

export default ArticleDetailHeader
