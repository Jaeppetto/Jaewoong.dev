interface ImageTransformOptions {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'jpg' | 'png'
  resize?: 'cover' | 'contain' | 'fill'
}

export const getOptimizedImageUrl = (
  originalUrl: string,
  options: ImageTransformOptions = {}
): string => {
  if (!originalUrl.includes('supabase')) {
    return originalUrl
  }

  const {
    width,
    height,
    quality = 80,
    format = 'webp',
    resize = 'cover'
  } = options

  const url = new URL(originalUrl)
  const params = new URLSearchParams()

  if (width) params.set('width', width.toString())
  if (height) params.set('height', height.toString())
  params.set('quality', quality.toString())
  params.set('format', format)
  params.set('resize', resize)

  url.search = params.toString()
  return url.toString()
}

export const generateResponsiveImageSet = (
  originalUrl: string,
  sizes: number[] = [400, 800, 1200, 1600]
): string => {
  if (!originalUrl.includes('supabase')) {
    return originalUrl
  }

  return sizes
    .map(size => `${getOptimizedImageUrl(originalUrl, { width: size })} ${size}w`)
    .join(', ')
}

export const getImageSizes = (
  breakpoints: Record<string, string> = {
    'max-width: 640px': '100vw',
    'max-width: 1024px': '80vw',
    default: '70vw'
  }
): string => {
  const entries = Object.entries(breakpoints)
  const mediaQueries = entries
    .filter(([key]) => key !== 'default')
    .map(([key, value]) => `(${key}) ${value}`)
  
  const defaultSize = breakpoints.default || '100vw'
  return [...mediaQueries, defaultSize].join(', ')
}

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

export const generateImagePlaceholder = (
  width: number,
  height: number,
  color: string = '#f1f5f9'
): string => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  
  ctx.fillStyle = color
  ctx.fillRect(0, 0, width, height)
  
  return canvas.toDataURL()
}