const convertToWebP = async (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async () => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('캔버스를 사용할 수 없습니다.'))
          return
        }

        ctx.drawImage(img, 0, 0)
        canvas.toBlob(
          blob => {
            if (!blob) {
              reject(new Error('WebP 변환에 실패하였습니다.'))
              return
            }
            resolve(blob)
          },
          'image/webp',
          0.9
        )
      }
      img.onerror = () => reject(new Error('이미지 로드에 실패하였습니다.'))
      img.src = reader.result as string
    }
    reader.onerror = () => reject(new Error('파일 읽기에 실패하였습니다.'))
    reader.readAsDataURL(file)
  })
}

export default convertToWebP
