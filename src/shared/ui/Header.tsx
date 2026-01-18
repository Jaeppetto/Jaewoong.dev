import { cn } from '@/shared/shadcn-ui/util'
import { useScrollPosition } from '@/shared/hooks'
import { useHeaderContext } from '@/shared/context'
import { Link, useLocation, useRouter } from '@tanstack/react-router'
import { ArrowUp, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { MobileSidebar } from '@/widgets/navigation'

const Header = () => {
  const router = useRouter()
  const { pathname } = useLocation()
  const [, subPath, category, postTitle] = pathname.split('/')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { isScrolled, scrollToTop } = useScrollPosition({ threshold: 200 })
  const { articleTitle } = useHeaderContext()

  const isArticleDetailPage =
    subPath === 'article' && Boolean(category) && Boolean(postTitle)
  const shouldShowArticleTitle =
    isArticleDetailPage && isScrolled && articleTitle

  useEffect(() => {
    const img = new Image()
    img.onload = () => setImageLoaded(true)
    img.src = '/signature.png'
  }, [])

  return (
    <div
      className={cn(
        'fixed left-0 right-0 top-0 z-50 flex h-[6.2rem] w-[100dvw] items-center justify-center border-b border-none bg-white/70 backdrop-blur-sm transition-shadow duration-300'
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
              onClick={() => {
                if (pathname === '/article') {
                  scrollToTop()
                } else {
                  router.navigate({ to: '/article', search: { page: 1 } })
                }
              }}
              disabled={isArticleDetailPage && isScrolled}
              className={cn(
                'hidden bg-transparent p-0 transition-transform duration-300 ease-in-out hover:scale-105 sm:block',
                isScrolled && isArticleDetailPage && 'cursor-default'
              )}>
              <img
                src="/signature.png"
                alt="signature"
                width={120}
                height={100}
                className={cn(
                  'translate-y-[0.4rem] rotate-[20deg] select-none transition-all duration-500 ease-in-out',
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                )}
              />
            </button>
            <div className="flex w-[20rem] flex-shrink-0 select-none justify-between">
              <Link
                to="/article"
                disabled={isArticleDetailPage && isScrolled}
                search={{ page: 1 }}
                className={cn(
                  '!text-body1 font-normal text-slate-300 transition-colors duration-300 ease-in-out hover:text-slate-900',
                  subPath === 'article' && 'font-extrabold text-slate-900',
                  isScrolled && isArticleDetailPage && 'cursor-default'
                )}>
                Article
              </Link>
            </div>
          </div>

          <div
            className={cn(
              'flex absolute inset-0 justify-center items-center transition-all duration-500 ease-in-out',
              shouldShowArticleTitle
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-full pointer-events-none'
            )}>
            <button
              onClick={scrollToTop}
              className="group flex max-w-[60rem] cursor-pointer items-center justify-center gap-2 truncate border-none bg-transparent px-4 text-center !text-body1 font-bold text-slate-900 transition-colors hover:text-slate-700">
              {articleTitle}
              <ArrowUp
                size={14}
                strokeWidth={3}
                className="opacity-50 transition-opacity text-slate-400 group-hover:opacity-100"
              />
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="block p-2 bg-transparent hover:bg-slate-50 sm:hidden"
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
