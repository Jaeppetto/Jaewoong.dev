import { MDXProvider } from '@mdx-js/react'
import { createFileRoute, useParams } from '@tanstack/react-router'
import { MDXContent } from 'mdx/types'
import { useState, useEffect, Suspense } from 'react'

const Post = () => {
  const { postTitle, category } = useParams({
    from: '/article_/$category_/$postTitle'
  })
  const [Content, setContent] = useState<MDXContent | null>(null)

  useEffect(() => {
    import(`../../../content/article/${category}/${postTitle}.mdx`).then(
      module => {
        setContent(() => module.default)
      }
    )
  }, [postTitle, category])

  return (
    <div className="p-8">
      <MDXProvider>
        <div className="prose prose-slate lg:prose-lg">
          <Suspense fallback={<div>Loading...</div>}>
            {Content && <Content />}
          </Suspense>
        </div>
      </MDXProvider>
    </div>
  )
}

export const Route = createFileRoute('/article_/$category_/$postTitle')({
  component: Post
})
