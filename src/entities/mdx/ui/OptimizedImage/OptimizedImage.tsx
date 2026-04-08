import { useEffect, useState } from 'react'
import { cn } from '@/shared/shadcn-ui/util'
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

  useEffect(() => {
    setIsLoaded(false)
    setIsError(false)
  }, [src])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setIsError(true)
  }

  if (isError) {
    return (
      <span
        className={cn(
          'flex w-fit items-center gap-2 rounded-lg bg-slate-50 p-2 !text-body3 font-semibold text-slate-500',
          className
        )}>
        <ImageIcon className="size-10" />
        이미지를 불러올 수 없습니다
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      className={cn(
        'block h-auto max-w-full rounded-lg transition-opacity duration-300',
        isLoaded ? 'opacity-100' : 'opacity-30',
        className
      )}
    />
  )
}

export default OptimizedImage
