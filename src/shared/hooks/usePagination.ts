export interface UsePaginationProps {
  page: number
  pageSize: number
  totalItems: number
  maxSize?: number
}

export interface UsePaginationReturn {
  pages: number[]
  totalPages: number
  startPage: number
  endPage: number
  prevSetPage: number
  nextSetPage: number
  canGoPrevSet: boolean
  canGoNextSet: boolean
}

export const usePagination = ({
  page,
  pageSize,
  totalItems,
  maxSize = 5
}: UsePaginationProps): UsePaginationReturn => {
  const totalPages = Math.ceil(totalItems / pageSize)

  const halfMaxSize = Math.floor(maxSize / 2)
  let startPage = Math.max(page - halfMaxSize, 1)
  const endPage = Math.min(startPage + maxSize - 1, totalPages)

  if (endPage - startPage + 1 < maxSize) {
    startPage = Math.max(endPage - maxSize + 1, 1)
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  )

  const prevSetPage = Math.max(startPage - maxSize, 1)
  const nextSetPage = Math.min(endPage + 1, totalPages)

  return {
    pages,
    totalPages,
    startPage,
    endPage,
    prevSetPage,
    nextSetPage,
    canGoPrevSet: startPage > 1,
    canGoNextSet: endPage < totalPages
  }
}
