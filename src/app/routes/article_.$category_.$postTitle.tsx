import { ArticleDetailPage } from '@/pages/article'
import { PostNotFoundError, postApi } from '@/shared/api/posts'
import {
  buildArticleJsonLd,
  buildJsonLdScript,
  buildMeta,
  buildOgImagePath
} from '@/shared/util'
import { createFileRoute, notFound } from '@tanstack/react-router'

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
    } catch (error) {
      if (error instanceof PostNotFoundError) {
        throw notFound()
      }
      throw error
    }
  },
  head: ({ loaderData, params }) => {
    const post = loaderData?.post ?? null
    const path = `/article/${params.category}/${params.postTitle}`
    const ogImagePath = buildOgImagePath(
      `${params.category}/${post?.slug || params.postTitle}`
    )
    const meta = buildMeta({
      title: post?.title || params.postTitle,
      description: post?.description,
      image: post?.thumbnail || ogImagePath,
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
      image: post.thumbnail || ogImagePath,
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      category: post.categories?.name ?? null,
      tags: post.tags?.map(tag => tag.name) ?? null
    })

    return {
      ...meta,
      scripts: [buildJsonLdScript(jsonLd)]
    }
  }
})
