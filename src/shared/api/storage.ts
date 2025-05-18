import imageCompression from 'browser-image-compression'

import { supabase } from './supabase/client'
import { convertToWebP } from '../util'

export interface UploadImageOptions {
  file: File
  tempId: string
  type: 'thumbnail' | 'content'
  maxSizeMB?: number
  maxWidth?: number
}

export const storageApi = {
  uploadImage: async ({
    file,
    tempId,
    type,
    maxSizeMB = 1,
    maxWidth = type === 'thumbnail' ? 800 : 1200
  }: UploadImageOptions): Promise<string> => {
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB,
        maxWidthOrHeight: maxWidth,
        useWebWorker: true
      })

      const webpBlob = await convertToWebP(compressedFile)

      const fileName =
        type === 'thumbnail' ? 'thumbnail.webp' : `${crypto.randomUUID()}.webp`

      const filePath = `posts/${tempId}/${type === 'thumbnail' ? fileName : `content/${fileName}`}`

      const { error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, webpBlob, {
          upsert: type === 'thumbnail',
          contentType: 'image/webp'
        })

      if (error) throw error

      const {
        data: { publicUrl }
      } = supabase.storage.from('blog-images').getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Image upload failed:', error)
      throw new Error('이미지 업로드에 실패했습니다.')
    }
  }
}
