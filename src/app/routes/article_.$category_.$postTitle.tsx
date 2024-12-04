import { usePostBySlugQuery } from '@/features/article/api/queries'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { MdxRenderer } from '@/features/mdx/ui/MdxRenderer'

const PostDetailPage = () => {
  const { postTitle } = Route.useLoaderData()
  const { data: post, isLoading, isError } = usePostBySlugQuery(postTitle)

  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-red-500">
          아티클을 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    )
  }

  if (isLoading || !post) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="animate-pulse">로딩 중...</div>
      </div>
    )
  }

  return (
    <article className="container mx-auto max-w-3xl px-4 py-8">
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        {post.categories && (
          <div className="text-sm text-gray-600">
            Category: {post.categories.name}
          </div>
        )}
        {post.created_at && (
          <time className="text-sm text-gray-600">
            {new Date(post.created_at).toLocaleDateString()}
          </time>
        )}
      </header>

      <main className="prose prose-slate lg:prose-lg">
        <Suspense fallback={<div className="animate-pulse">로딩 중...</div>}>
          <MdxRenderer content={post.content} />
        </Suspense>
      </main>
    </article>
  )
}

export const Route = createFileRoute('/article_/$category_/$postTitle')({
  component: PostDetailPage,
  loader: ({ params }) => ({
    postTitle: params.postTitle,
    category: params.category
  })
})
