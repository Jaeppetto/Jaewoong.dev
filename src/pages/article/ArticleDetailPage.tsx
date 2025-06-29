import {
  ArticleDetailHeader,
  ArticleDetailSkeleton,
  CategoryAccordion,
  CategoryAccordionSkeleton,
  PostTags
} from '@/entities'
import { usePostBySlugQuery } from '@/features'
import { cn } from '@/shared/shadcn-ui/util'
import { useHeaderContext } from '@/shared/context'
import { MdxRenderer } from '@/widgets'
import { Separator } from '@radix-ui/react-separator'
import { Navigate, useParams } from '@tanstack/react-router'
import { useEffect } from 'react'

const ArticleDetailPage = () => {
  const { postTitle, category } = useParams({
    from: '/article_/$category_/$postTitle'
  })
  const { data: post, isLoading, isError } = usePostBySlugQuery(postTitle)
  const { setArticleTitle } = useHeaderContext()

  useEffect(() => {
    if (post?.title) {
      setArticleTitle(post.title)
    }

    return () => {
      setArticleTitle(null)
    }
  }, [post?.title, setArticleTitle])

  if (isError) {
    return (
      <Navigate
        to="/article"
        search={{ page: 1 }}
      />
    )
  }

  if (isLoading || !post) {
    return (
      <div className="flex w-full justify-center gap-[2rem]">
        <CategoryAccordionSkeleton />
        <ArticleDetailSkeleton />
      </div>
    )
  }

  return (
    <div className="flex justify-center w-full">
      <aside className="sticky top-[6.2rem] hidden h-fit py-[2rem] pr-[2rem] sm:block">
        <CategoryAccordion
          currentCategory={category}
          currentPost={postTitle}
        />
      </aside>

      <main className="flex h-full w-full max-w-[88rem] flex-col gap-[2rem] py-[2rem] pb-[4rem]">
        <ArticleDetailHeader post={post} />

        <article
          className={cn(
            'prose prose-slate dark:prose-invert',
            'max-w-none px-[1rem]'
          )}>
          <MdxRenderer content={post.content} />
        </article>

        <Separator className="h-[0.1rem] bg-slate-200" />

        <PostTags postId={post.id} />
      </main>
    </div>
  )
}

export default ArticleDetailPage
