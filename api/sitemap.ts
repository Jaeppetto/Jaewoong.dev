import { createClient } from '@supabase/supabase-js'

export const config = {
  runtime: 'edge'
}

const normalizeSiteUrl = (siteUrl: string) =>
  siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl

const resolveSiteUrl = (origin: string) => {
  const envUrl = process.env.VITE_SITE_URL
  return normalizeSiteUrl(envUrl && envUrl.length > 0 ? envUrl : origin)
}

const xmlEscape = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const toIso = (value?: string | null) => {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString()
}

export default async function handler(req: Request) {
  const requestUrl = new URL(req.url)
  const siteUrl = resolveSiteUrl(requestUrl.origin)

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
      slug,
      created_at,
      updated_at,
      categories!inner (
        slug
      )
    `
    )
    .eq('published', true)

  if (error) {
    return new Response('Failed to fetch posts', { status: 500 })
  }

  const staticPaths = ['/', '/article', '/about', '/archive']
  const urls: Array<{ loc: string; lastmod?: string }> = staticPaths.map(
    pathname => ({
      loc: `${siteUrl}${pathname === '/' ? '' : pathname}`
    })
  )

  data?.forEach(post => {
    const categorySlug = post.categories?.slug
    if (!post.slug || !categorySlug) return
    const pathname = `/article/${encodeURIComponent(
      categorySlug
    )}/${encodeURIComponent(post.slug)}`
    urls.push({
      loc: `${siteUrl}${pathname}`,
      lastmod: toIso(post.updated_at || post.created_at) || undefined
    })
  })

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ]

  urls.forEach(({ loc, lastmod }) => {
    lines.push('  <url>')
    lines.push(`    <loc>${xmlEscape(loc)}</loc>`)
    if (lastmod) {
      lines.push(`    <lastmod>${xmlEscape(lastmod)}</lastmod>`)
    }
    lines.push('  </url>')
  })

  lines.push('</urlset>')
  lines.push('')

  return new Response(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400'
    }
  })
}
