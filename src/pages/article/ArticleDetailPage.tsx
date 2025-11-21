import {
  ArticleDetailHeader,
  ArticleDetailSkeleton,
  CategoryAccordion,
  CategoryAccordionSkeleton,
  PostTags
} from '@/entities'
import { usePostBySlugQuery } from '@/features'
import { cn } from '@/shared/shadcn-ui/util'
import { scrollIntoViewWithOffset } from '@/shared/util'
import { useHeaderContext } from '@/shared/context'
import { MdxRenderer } from '@/widgets'
import { Navigate, useParams } from '@tanstack/react-router'
import { useCallback, useEffect } from 'react'

const ArticleDetailPage = () => {
  const { postTitle, category } = useParams({
    from: '/article_/$category_/$postTitle'
  })
  const { data: post, isLoading, isError } = usePostBySlugQuery(postTitle)
  const { setArticleTitle } = useHeaderContext()

  const scrollToHash = useCallback((attempt = 0) => {
    if (typeof window === 'undefined') {
      return
    }

    const rawHash = window.location.hash
    if (!rawHash) {
      return
    }

    const targetId = decodeURIComponent(rawHash.replace('#', ''))
    if (!targetId) {
      return
    }

    const target = document.getElementById(targetId)
    if (target) {
      scrollIntoViewWithOffset(target)

      if ('focus' in target && typeof target.focus === 'function') {
        target.focus({ preventScroll: true })
      }

      return
    }

    if (attempt < 10) {
      window.setTimeout(() => scrollToHash(attempt + 1), 100)
    }
  }, [])

  useEffect(() => {
    if (post?.title) {
      setArticleTitle(post.title)
    }

    return () => {
      setArticleTitle(null)
    }
  }, [post?.title, setArticleTitle])

  useEffect(() => {
    if (!post?.content) {
      return
    }

    scrollToHash()

    if (typeof window === 'undefined') {
      return
    }

    const handleHashChange = () => {
      scrollToHash()
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [post?.content, scrollToHash])

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
        <PostTags postId={post.id} />
      </main>
    </div>
  )
}

export default ArticleDetailPage
