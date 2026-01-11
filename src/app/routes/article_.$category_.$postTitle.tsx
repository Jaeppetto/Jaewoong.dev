import { ArticleDetailPage } from '@/pages/article'
import { postApi } from '@/shared/api/posts'
import {
  buildArticleJsonLd,
  buildJsonLdScript,
  buildMeta
} from '@/shared/util'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/article_/$category_/$postTitle')({
  component: ArticleDetailPage,
  loader: async ({ params }) => {
    try {
      const post = await postApi.getBySlug(params.postTitle)
      return {
        postTitle: params.postTitle,
        category: params.category,
        post
      }
    } catch {
      return {
        postTitle: params.postTitle,
        category: params.category,
        post: null
      }
    }
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post ?? null
    const path = `/article/${params.category}/${params.postTitle}`
    const meta = buildMeta({
      title: post?.title || params.postTitle,
      description: post?.description,
      image: post?.thumbnail,
      path,
      type: post ? 'article' : 'website',
      publishedTime: post?.created_at,
      modifiedTime: post?.updated_at
    })

    if (!post) {
      return meta
    }

    const jsonLd = buildArticleJsonLd({
      title: post.title,
      description: post.description,
      url: path,
      image: post.thumbnail,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at
    })

    return {
      ...meta,
      scripts: [buildJsonLdScript(jsonLd)]
    }
  }
})
