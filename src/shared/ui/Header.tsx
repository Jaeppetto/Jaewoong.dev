import { cn } from '@/shared/shadcn-ui/util'
import { useScrollPosition } from '@/shared/hooks'
import { useHeaderContext } from '@/shared/context'
import { Link, useLocation, useRouter } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { MobileSidebar } from '@/widgets/navigation'

const Header = () => {
  const router = useRouter()
  const { pathname } = useLocation()
  const [, subPath, category, postTitle] = pathname.split('/')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { isScrolled } = useScrollPosition({ threshold: 200 })
  const { articleTitle } = useHeaderContext()

  const isArticleDetailPage = subPath === 'article' && category && postTitle
  const shouldShowArticleTitle =
    isArticleDetailPage && isScrolled && articleTitle

  return (
    <div
      className={cn(
        'fixed left-0 right-0 top-0 z-50 flex h-[7.6rem] w-[100dvw] items-center justify-center border-b border-none bg-white/70 backdrop-blur-sm transition-shadow duration-300'
      )}>
      <div className="flex h-full w-full max-w-[108rem] items-center justify-between px-10">
        <div className="relative flex w-full items-center gap-[3.2rem]">
          <div
            className={cn(
              'flex w-full items-center gap-[3.2rem] transition-all duration-500 ease-in-out',
              shouldShowArticleTitle
                ? '-translate-y-full opacity-0'
                : 'translate-y-0 opacity-100'
            )}>
            <button
              onClick={() =>
                router.navigate({ to: '/article', search: { page: 1 } })
              }
              className="hidden p-0 bg-transparent transition-transform duration-300 ease-in-out hover:scale-105 sm:block">
              <img
                src="/signature.png"
                alt="signature"
                width={120}
                height={100}
                className="translate-y-[0.4rem] rotate-[20deg] select-none"
              />
            </button>
            <div className="flex w-[20rem] flex-shrink-0 select-none justify-between">
              <Link
                to="/article"
                search={{ page: 1 }}
                className={cn(
                  'text-[1.8rem] font-normal leading-[2.1rem] text-slate-300 transition-colors duration-300 ease-in-out hover:text-slate-900',
                  subPath === 'article' && 'font-extrabold text-slate-900'
                )}>
                Article
              </Link>
            </div>
          </div>

          <div
            className={cn(
              'flex absolute inset-0 justify-center items-center transition-all duration-500 ease-in-out',
              shouldShowArticleTitle
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-full'
            )}>
            <h1 className="max-w-[60rem] truncate px-4 text-center text-[1.8rem] font-bold text-slate-900">
              {articleTitle}
            </h1>
          </div>
        </div>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="block p-2 sm:hidden"
          aria-label="메뉴 열기">
          <Menu
            size={24}
            className="text-slate-700"
          />
        </button>
      </div>

      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentCategory={category || ''}
        currentPost={postTitle || ''}
      />
    </div>
  )
}

export default Header
