type MetaInput = {
  title: string
  description?: string | null
  path?: string
  url?: string
  image?: string | null
  type?: 'website' | 'article'
  publishedTime?: string | null
  modifiedTime?: string | null
}

const SITE_NAME = 'Jaewoong.dev'
const DEFAULT_DESCRIPTION = '개발기록과 경험을 공유하는 개발자 황재웅의 블로그.'
const DEFAULT_IMAGE = '/signature.png'

const normalizeSiteUrl = () => {
  const raw = import.meta.env.VITE_SITE_URL ?? ''
  return raw.endsWith('/') ? raw.slice(0, -1) : raw
}

const resolveUrl = (pathOrUrl?: string) => {
  if (!pathOrUrl) {
    return ''
  }

  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }

  const baseUrl = normalizeSiteUrl()
  const normalizedPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`

  return baseUrl ? `${baseUrl}${normalizedPath}` : normalizedPath
}

const formatTitle = (title: string) => {
  if (!title) {
    return SITE_NAME
  }

  return title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`
}

const compactMeta = (
  items: Array<{ name?: string; property?: string; content?: string }>
) => items.filter(item => item.content)

export const buildMeta = ({
  title,
  description,
  path,
  url,
  image,
  type = 'website',
  publishedTime,
  modifiedTime
}: MetaInput) => {
  const resolvedTitle = formatTitle(title)
  const resolvedDescription = description?.trim() || DEFAULT_DESCRIPTION
  const resolvedUrl = resolveUrl(url || path)
  const resolvedImage = resolveUrl(image || DEFAULT_IMAGE)

  return {
    title: resolvedTitle,
    meta: compactMeta([
      { name: 'description', content: resolvedDescription },
      { property: 'og:title', content: resolvedTitle },
      { property: 'og:description', content: resolvedDescription },
      { property: 'og:type', content: type },
      { property: 'og:url', content: resolvedUrl },
      { property: 'og:image', content: resolvedImage },
      { property: 'og:site_name', content: SITE_NAME },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: resolvedTitle },
      { name: 'twitter:description', content: resolvedDescription },
      { name: 'twitter:image', content: resolvedImage },
      {
        property: 'article:published_time',
        content: publishedTime || undefined
      },
      { property: 'article:modified_time', content: modifiedTime || undefined }
    ]),
    links: resolvedUrl ? [{ rel: 'canonical', href: resolvedUrl }] : []
  }
}

export const buildArticleJsonLd = ({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime
}: {
  title: string
  description?: string | null
  url?: string
  image?: string | null
  publishedTime?: string | null
  modifiedTime?: string | null
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description?.trim() || DEFAULT_DESCRIPTION,
    image: image ? [resolveUrl(image)] : undefined,
    datePublished: publishedTime || undefined,
    dateModified: modifiedTime || undefined,
    mainEntityOfPage: url
      ? {
          '@type': 'WebPage',
          '@id': resolveUrl(url)
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME
    }
  }
}

export const buildJsonLdScript = (jsonLd: Record<string, unknown>) => ({
  type: 'application/ld+json',
  children: JSON.stringify(jsonLd)
})

export const getSiteName = () => SITE_NAME
export const getDefaultDescription = () => DEFAULT_DESCRIPTION
export const getDefaultImage = () => DEFAULT_IMAGE
export const getSiteUrl = () => normalizeSiteUrl()
