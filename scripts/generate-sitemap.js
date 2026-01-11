import { createClient } from '@supabase/supabase-js'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT_DIR = process.cwd()
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')

const loadEnvFile = async filePath => {
  try {
    const content = await readFile(filePath, 'utf8')
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .reduce((acc, line) => {
        const index = line.indexOf('=')
        if (index === -1) return acc
        const key = line.slice(0, index).trim()
        const value = line.slice(index + 1).trim().replace(/^['"]|['"]$/g, '')
        acc[key] = value
        return acc
      }, {})
  } catch {
    return {}
  }
}

const loadEnv = async () => {
  const envLocal = await loadEnvFile(path.join(ROOT_DIR, '.env.local'))
  const envDefault = await loadEnvFile(path.join(ROOT_DIR, '.env'))
  return {
    ...envDefault,
    ...envLocal,
    ...process.env
  }
}

const normalizeSiteUrl = siteUrl => {
  if (!siteUrl) return ''
  return siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl
}

const xmlEscape = value =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const buildUrlEntry = ({ loc, lastmod }) => {
  const lines = [
    '  <url>',
    `    <loc>${xmlEscape(loc)}</loc>`
  ]

  if (lastmod) {
    lines.push(`    <lastmod>${xmlEscape(lastmod)}</lastmod>`)
  }

  lines.push('  </url>')
  return lines.join('\n')
}

const buildSitemap = ({ urls }) => {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(buildUrlEntry),
    '</urlset>',
    ''
  ].join('\n')
}

const buildRobots = siteUrl => {
  const disallowPaths = ['/auth/', '/article/edit/', '/article/writing']
  const lines = ['User-agent: *', 'Allow: /']
  disallowPaths.forEach(pathname => {
    lines.push(`Disallow: ${pathname}`)
  })
  if (siteUrl) {
    lines.push(`Sitemap: ${siteUrl}/sitemap.xml`)
  }
  lines.push('')
  return lines.join('\n')
}

const toIso = value => {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString()
}

const main = async () => {
  const env = await loadEnv()
  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL)
  const supabaseUrl = env.VITE_SUPABASE_URL
  const supabaseKey = env.VITE_SUPABASE_ANON_KEY

  if (!siteUrl) {
    console.warn(
      'VITE_SITE_URL is missing. Sitemap URLs will be relative.'
    )
  }

  const staticPaths = ['/article', '/about', '/archive']
  const urls = staticPaths.map(pathname => ({
    loc: siteUrl ? `${siteUrl}${pathname}` : pathname
  }))

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data, error } = await supabase
      .from('posts')
      .select('slug, updated_at, created_at, categories ( slug )')
      .eq('published', true)

    if (error) {
      console.warn('Failed to fetch posts for sitemap:', error.message)
    } else if (data) {
      data.forEach(post => {
        const categorySlug = post.categories?.slug
        if (!post.slug || !categorySlug) return
        const pathname = `/article/${encodeURIComponent(
          categorySlug
        )}/${encodeURIComponent(post.slug)}`
        const loc = siteUrl ? `${siteUrl}${pathname}` : pathname
        urls.push({
          loc,
          lastmod: toIso(post.updated_at || post.created_at)
        })
      })
    }
  } else {
    console.warn(
      'Supabase env is missing. Skipping post URLs in sitemap.'
    )
  }

  const sitemapXml = buildSitemap({ urls })
  const robotsTxt = buildRobots(siteUrl)

  await writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf8')
  await writeFile(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf8')
}

main().catch(error => {
  console.error('Failed to generate sitemap:', error)
  process.exit(1)
})
