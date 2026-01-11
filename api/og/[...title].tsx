import { ImageResponse } from '@vercel/og'

export const config = {
  runtime: 'edge'
}

const SITE_LABEL = 'jaewoong.dev'
const WIDTH = 1200
const HEIGHT = 630
const TITLE_FONT_URL =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/Pretendard-Bold.woff2'
const BODY_FONT_URL =
  'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/Pretendard-Regular.woff2'

const getTitleFromPath = (pathname: string) => {
  const raw = pathname.replace(/^\/api\/og\/?/, '')
  if (!raw) return SITE_LABEL

  return raw
    .split('/')
    .filter(Boolean)
    .map(segment => decodeURIComponent(segment))
    .join(' ')
}

export default async function handler(req: Request) {
  const { pathname, origin } = new URL(req.url)
  const title = getTitleFromPath(pathname)

  const [titleFont, bodyFont] = await Promise.all([
    fetch(TITLE_FONT_URL).then(res => {
      if (!res.ok) throw new Error(`Failed to fetch title font: ${res.status}`)
      return res.arrayBuffer()
    }),
    fetch(BODY_FONT_URL).then(res => {
      if (!res.ok) throw new Error(`Failed to fetch body font: ${res.status}`)
      return res.arrayBuffer()
    })
  ]).catch(error => {
    console.error('Font fetch failed:', error)
    throw new Response('Failed to load fonts', { status: 500 })
  })

  const siteUrl = process.env.VITE_SITE_URL || origin
  const faviconUrl = `${siteUrl.replace(/\/$/, '')}/favicon.svg`

  return new ImageResponse(
    (
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px 96px',
          backgroundColor: '#ffffff'
        }}>
        <div
          style={{
            fontFamily: 'Pretendard',
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.2,
            color: '#111111',
            maxWidth: 1000,
            whiteSpace: 'pre-wrap'
          }}>
          {title}
        </div>
        <div
          style={{
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Pretendard',
            fontSize: 28,
            fontWeight: 400,
            color: '#444444'
          }}>
          <img
            src={faviconUrl}
            width={32}
            height={32}
            style={{ marginRight: 12 }}
          />
          {SITE_LABEL}
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: 'Pretendard',
          data: titleFont,
          weight: 700,
          style: 'normal'
        },
        {
          name: 'Pretendard',
          data: bodyFont,
          weight: 400,
          style: 'normal'
        }
      ]
    }
  )
}
