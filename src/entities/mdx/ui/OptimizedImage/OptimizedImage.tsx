import { useState, useRef, useEffect } from 'react'
import { cn } from '@/shared/shadcn-ui/util'
import {
  generateResponsiveImageSet,
  getImageSizes,
  getOptimizedImageUrl
} from '@/shared/util'
import { ImageIcon } from 'lucide-react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: string | number
  height?: string | number
  priority?: boolean
}

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px'
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setIsError(true)
  }

  const optimizedSrc = getOptimizedImageUrl(src, {
    width: typeof width === 'number' ? width : undefined,
    height: typeof height === 'number' ? height : undefined,
    quality: 100
  })

  const srcSet = generateResponsiveImageSet(src)
  const sizes = getImageSizes()

  if (isError) {
    return (
      <span
        className={cn(
          'flex gap-2 items-center text-sm text-slate-500',
          className
        )}>
        <ImageIcon className="size-4" />
        이미지를 불러올 수 없습니다
      </span>
    )
  }

  return (
    <img
      ref={imgRef}
      src={isInView ? optimizedSrc : undefined}
      srcSet={isInView ? srcSet : undefined}
      sizes={isInView ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      className={cn(
        'block max-w-full h-auto rounded-lg transition-opacity duration-300',
        isLoaded ? 'opacity-100' : 'opacity-30',
        className
      )}
    />
  )
}

export default OptimizedImage
