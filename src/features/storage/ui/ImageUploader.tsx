import { cn } from '@/shared/shadcn-ui/util'
import { useImageUpload } from '../api'

interface ImageUploaderProps {
  tempId: string
  type?: 'thumbnail' | 'content'
  onUploadComplete: (imageUrl: string) => void
  onUploadError?: (error: Error) => void
  className?: string
}

export const ImageUploader = ({
  tempId,
  type = 'content',
  onUploadComplete,
  onUploadError,
  className
}: ImageUploaderProps) => {
  const uploadImage = useImageUpload()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const imageUrl = await uploadImage.mutateAsync({
        file,
        tempId,
        type
      })
      onUploadComplete(imageUrl)
    } catch (error) {
      onUploadError?.(
        error instanceof Error
          ? error
          : new Error('이미지 업로드에 실패했습니다.')
      )
    }
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      disabled={uploadImage.isPending}
      className={cn(
        'file:cursor-pointer file:rounded-md file:border-none file:bg-slate-900 file:px-4 file:py-2 file:!text-body3 file:font-bold file:text-white file:hover:bg-slate-700',
        className
      )}
      aria-label={`${type} 이미지 업로드`}
    />
  )
}
export default ImageUploader
