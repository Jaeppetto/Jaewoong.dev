import { Link } from '@tanstack/react-router'
import { PostWithRelations } from '../../constant'
import dayjs from 'dayjs'

interface ArticleDetailHeaderProps {
  post?: PostWithRelations
}

const ArticleDetailHeader = ({ post }: ArticleDetailHeaderProps) => {
  if (!post) return null

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

        <h1 className="break-all text-[3.2rem] font-extrabold leading-[3.8rem] text-slate-900">
          {post.title}
        </h1>

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
