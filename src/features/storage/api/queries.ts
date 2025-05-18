import { useMutation } from '@tanstack/react-query'
import { storageApi, UploadImageOptions } from '@/shared/api/storage'

export const useImageUpload = () => {
  return useMutation({
    mutationFn: (options: UploadImageOptions) => storageApi.uploadImage(options)
  })
}
