import { createClient } from '@supabase/supabase-js'

export const config = {
  runtime: 'edge'
}

const SITE_NAME = 'Jaewoong.dev'
const DEFAULT_DESCRIPTION = '개발기록과 경험을 공유하는 개발자 황재웅의 블로그.'
const DEFAULT_IMAGE = '/signature.png'
const DEFAULT_LOCALE = 'ko_KR'

const normalizeSiteUrl = (siteUrl: string) =>
  siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl

const resolveSiteUrl = (origin: string) => {
  const envUrl = process.env.VITE_SITE_URL
  return normalizeSiteUrl(envUrl && envUrl.length > 0 ? envUrl : origin)
}

const resolveUrl = (siteUrl: string, pathOrUrl?: string | null) => {
  if (!pathOrUrl) return ''
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }
  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${siteUrl}${normalizedPath}`
}

const buildOgImagePath = (title: string) => {
  const segments = title
    .split(/[\s/]+/)
    .map(segment => segment.trim())
    .filter(Boolean)
    .map(segment => encodeURIComponent(segment))
  const path = segments.length ? segments.join('/') : encodeURIComponent(SITE_NAME)
  return `/api/og/${path}`
}

const formatTitle = (title: string) => {
  if (!title) return SITE_NAME
  return title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`
}

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const stripMarkdown = (input: string) => {
  let text = input || ''
  text = text.replace(/```[\s\S]*?```/g, ' ')
  text = text.replace(/`{1,3}[^`]*`{1,3}/g, ' ')
  text = text.replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
  text = text.replace(/\[([^\]]+)]\([^)]+\)/g, '$1')
  text = text.replace(/<[^>]+>/g, ' ')
  text = text.replace(/[#>*_~\-]{1,}/g, ' ')
  text = text.replace(/\s+/g, ' ').trim()
  return text
}

const truncate = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength).trim()}…` : text

const buildHtml = ({
  pageTitle,
  displayTitle,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  category,
  tags,
  content,
  jsonLd
}: {
  pageTitle: string
  displayTitle: string
  description: string
  url: string
  image: string
  publishedTime?: string | null
  modifiedTime?: string | null
  category?: string | null
  tags?: string[] | null
  content?: string | null
  jsonLd?: Record<string, unknown> | null
}) => {
  const safePageTitle = escapeHtml(pageTitle)
  const safeDisplayTitle = escapeHtml(displayTitle)
  const safeDescription = escapeHtml(description)
  const safeUrl = escapeHtml(url)
  const safeImage = escapeHtml(image)
  const safeCategory = category ? escapeHtml(category) : ''
  const safeTags = (tags ?? []).map(tag => escapeHtml(tag))
  const safeContent = content ? escapeHtml(content) : ''

  const tagMeta = safeTags.map(
    tag => `<meta property="article:tag" content="${tag}" />`
  )

  const jsonLdTag = jsonLd
    ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
    : ''

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safePageTitle}</title>
    <meta name="description" content="${safeDescription}" />
    <link rel="canonical" href="${safeUrl}" />
    <meta property="og:title" content="${safePageTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${safeUrl}" />
    <meta property="og:image" content="${safeImage}" />
    <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />
    <meta property="og:locale" content="${DEFAULT_LOCALE}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safePageTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${safeImage}" />
    ${publishedTime ? `<meta property="article:published_time" content="${escapeHtml(publishedTime)}" />` : ''}
    ${modifiedTime ? `<meta property="article:modified_time" content="${escapeHtml(modifiedTime)}" />` : ''}
    ${safeCategory ? `<meta property="article:section" content="${safeCategory}" />` : ''}
    ${tagMeta.join('\n    ')}
    ${jsonLdTag}
  </head>
  <body>
    <main style="max-width: 720px; margin: 40px auto; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6;">
      <h1>${safeDisplayTitle}</h1>
      <p>${safeDescription}</p>
      ${safeContent ? `<article>${safeContent}</article>` : ''}
      <p><a href="${safeUrl}">Jaewoong.dev에서 보기</a></p>
    </main>
  </body>
</html>`
}

const buildArticleJsonLd = ({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  category,
  tags
}: {
  title: string
  description: string
  url: string
  image: string
  publishedTime?: string | null
  modifiedTime?: string | null
  category?: string | null
  tags?: string[] | null
}) => {
  const keywords = [
    ...(tags ?? []),
    ...(category ? [category] : [])
  ].filter(Boolean)

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image ? [image] : undefined,
    datePublished: publishedTime || undefined,
    dateModified: modifiedTime || undefined,
    articleSection: category || undefined,
    keywords: keywords.length ? keywords.join(', ') : undefined,
    author: {
      '@type': 'Person',
      name: SITE_NAME
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME
    }
  }
}

const toIso = (value?: string | null) => {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString()
}

const isPostNotFoundError = (error: { code?: string; status?: number }) =>
  error.code === 'PGRST116' || error.status === 404

export default async function handler(req: Request) {
  const requestUrl = new URL(req.url)
  const pathParam = requestUrl.searchParams.get('path') ?? ''

  const segments = pathParam.split('?')[0].split('/').filter(Boolean)
  if (segments.length < 3 || segments[0] !== 'article') {
    return new Response('Invalid path', { status: 400 })
  }

  const categorySlug = decodeURIComponent(segments[1] || '')
  const slug = decodeURIComponent(segments[2] || '')

  const supabaseUrl = process.env.VITE_SUPABASE_URL
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return new Response('Supabase env missing', { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  })

  const { data, error } = await supabase
    .from('posts')
    .select(
      `
      title,
      description,
      slug,
      content,
      thumbnail,
      created_at,
      updated_at,
      categories!inner (
        name,
        slug
      ),
      tags (
        name
      )
    `
    )
    .eq('slug', slug)
    .eq('published', true)
    .eq('categories.slug', categorySlug)
    .single()

  if (error) {
    const status = isPostNotFoundError(error) ? 404 : 500
    return new Response('Post not found', { status })
  }

  const siteUrl = resolveSiteUrl(requestUrl.origin)
  const pathname = `/article/${encodeURIComponent(categorySlug)}/${encodeURIComponent(slug)}`
  const url = resolveUrl(siteUrl, pathname)

  const ogTitle = `${categorySlug}/${slug}`
  const ogImagePath = buildOgImagePath(ogTitle)
  const image = resolveUrl(
    siteUrl,
    data.thumbnail || ogImagePath || DEFAULT_IMAGE
  )

  const contentText = truncate(stripMarkdown(data.content || ''), 4000)
  const descriptionSource =
    data.description?.trim() || contentText.slice(0, 180) || DEFAULT_DESCRIPTION
  const description = descriptionSource || DEFAULT_DESCRIPTION

  const jsonLd = buildArticleJsonLd({
    title: data.title || SITE_NAME,
    description,
    url,
    image,
    publishedTime: toIso(data.created_at),
    modifiedTime: toIso(data.updated_at || data.created_at),
    category: data.categories?.name ?? null,
    tags: data.tags?.map(tag => tag.name) ?? null
  })

  const html = buildHtml({
    pageTitle: formatTitle(data.title || SITE_NAME),
    displayTitle: data.title || SITE_NAME,
    description,
    url,
    image,
    publishedTime: toIso(data.created_at) || null,
    modifiedTime: toIso(data.updated_at || data.created_at) || null,
    category: data.categories?.name ?? null,
    tags: data.tags?.map(tag => tag.name) ?? null,
    content: contentText,
    jsonLd
  })

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400'
    }
  })
}
