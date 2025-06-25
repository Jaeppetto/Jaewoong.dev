import { cn } from '@/shared/shadcn-ui/util'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import { CategoryAccordion } from '@/entities/category/ui/CategoryAccordion/CategoryAccordion'

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
  currentCategory: string
  currentPost: string
}

export const MobileSidebar = ({ 
  isOpen, 
  onClose, 
  currentCategory, 
  currentPost 
}: MobileSidebarProps) => {
  return createPortal(
    <>
      <div
        className={cn(
          'fixed inset-0 transition-opacity duration-300 z-[999] bg-black/10 sm:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          'fixed top-0 right-0 w-80 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-[1000] sm:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">메뉴</h2>
            <button
              onClick={onClose}
              className="p-1"
              aria-label="메뉴 닫기">
              <X
                size={20}
                className="text-slate-700"
              />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 p-4">
            <div
              onClick={e => {
                if (
                  (e.target as HTMLElement).closest(
                    'button[data-post-link]'
                  )
                ) {
                  onClose()
                }
              }}>
              <div className="w-full [&>div]:!w-full">
                <CategoryAccordion
                  currentCategory={currentCategory}
                  currentPost={currentPost}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}