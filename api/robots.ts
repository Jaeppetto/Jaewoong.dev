export const config = {
  runtime: 'edge'
}

const normalizeSiteUrl = (siteUrl: string) =>
  siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl

const resolveSiteUrl = (origin: string) => {
  const envUrl = process.env.VITE_SITE_URL
  return normalizeSiteUrl(envUrl && envUrl.length > 0 ? envUrl : origin)
}

export default async function handler(req: Request) {
  const requestUrl = new URL(req.url)
  const siteUrl = resolveSiteUrl(requestUrl.origin)

  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /auth/',
    'Disallow: /article/edit/',
    'Disallow: /article/writing',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    ''
  ]

  return new Response(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400'
    }
  })
}
