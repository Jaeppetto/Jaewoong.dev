import { Link, Navigate } from '@tanstack/react-router'
import { cn } from '../shadcn-ui/util'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePagination } from '../hooks'
import { Button } from '../shadcn-ui/ui'

interface PaginationProps {
  page: number
  pageSize: number
  totalItems: number
  maxSize?: number
  className?: string
}

const Pagination = ({
  page = 1,
  pageSize = 4,
  totalItems,
  maxSize = 5,
  className
}: PaginationProps) => {
  const { pages, totalPages, startPage, endPage } = usePagination({
    page,
    pageSize,
    totalItems,
    maxSize
  })

  if (page > totalPages || page < 1) {
    return (
      <Navigate
        to="."
        search={{ page: 1 }}
      />
    )
  }

  return (
    <div
      className={cn('my-4 flex items-center justify-center gap-2', className)}>
      <Link
        to="."
        search={{ page: page - 1 }}
        disabled={startPage === page}>
        <Button
          variant="ghost"
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-transparent p-0"
          disabled={startPage === page}>
          <ChevronLeft
            color="#1e293b"
            className="h-4 w-4"
          />
        </Button>
      </Link>

      {pages.map(pageNum => (
        <Link
          key={pageNum}
          to="."
          search={{ page: pageNum }}
          className={cn(
            'flex h-12 min-w-12 items-center justify-center rounded-lg px-3 py-1',
            page === pageNum
              ? 'bg-slate-800 text-white hover:text-white'
              : 'bg-white text-slate-800 hover:bg-gray-100 hover:text-slate-800'
          )}>
          {pageNum}
        </Link>
      ))}

      <Link
        to="."
        search={{ page: page + 1 }}
        disabled={endPage === page}>
        <Button
          variant="ghost"
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-transparent p-0"
          disabled={endPage === page}>
          <ChevronRight
            color="#1e293b"
            className="h-4 w-4"
          />
        </Button>
      </Link>
    </div>
  )
}

export default Pagination
